// lib/ai/LearningCoach.ts
// ============================================================
// Learning Coach — formats engine decisions for the learner.
//
// ARCHITECTURE:
//   Measurement → LearnerState → RecommendationEngine → LearningAction
//                                                              ↓
//                                                      LearningCoach
//                                                              ↓
//                                                    Human-readable explanation
//
// The Coach:
//   ✅ Reads LearnerState (not raw DB)
//   ✅ Explains recommendations in chosen style
//   ✅ Respects Consent for what data it can reference
//   ✅ Falls back to deterministic templates if LLM unavailable
//   ❌ Does NOT decide what to recommend (RecommendationEngine does)
//   ❌ Does NOT claim psychological/emotional diagnosis
//   ❌ Does NOT invent learner history
//   ❌ Does NOT produce IQ scores
// ============================================================

import type {
  LearnerSkillState,
  Recommendation,
  CoachingStyle,
  ConsentRecord,
  ConsentCategory,
} from '../domain/types';
import type { LLMProvider } from './LLMProvider';

// ── Safety Guards ─────────────────────────────────────────────

const FORBIDDEN_CLAIMS = [
  'IQ', 'intelligence quotient', 'depression', 'anxiety', 'stress', 'emotion',
  'mental health', 'personality disorder', 'ADHD', 'autistic', 'neurological',
  'psychologically', 'clinically', 'diagnosed',
];

function containsForbiddenClaim(text: string): boolean {
  const lower = text.toLowerCase();
  return FORBIDDEN_CLAIMS.some(term => lower.includes(term.toLowerCase()));
}

// ── Coach Message ─────────────────────────────────────────────

export interface CoachMessage {
  text: string;
  locale: 'en' | 'ar';
  coachingStyle: CoachingStyle;
  usedFallback: boolean;
  safetyChecked: boolean;
  recommendation?: Recommendation;
  evidenceSummary?: string[];
}

// ── Consent Guard ─────────────────────────────────────────────

function isDataAllowed(
  category: ConsentCategory,
  consents: ConsentRecord[],
): boolean {
  const record = consents.find(c => c.category === category);
  return record?.granted === true;
}

// ── Style Directives ──────────────────────────────────────────

const STYLE_DIRECTIVES: Record<CoachingStyle, string> = {
  encouraging: 'Be warm, supportive and celebratory. Highlight progress first.',
  direct: 'Be concise and factual. State what needs to happen and why.',
  socratic: 'Ask guiding questions to lead the learner to the insight.',
  detailed: 'Provide thorough explanation with the underlying reasoning.',
  concise: 'Keep the message under 2 sentences. Be precise.',
  challenge_oriented: 'Frame the recommendation as a challenge to rise to.',
  goal_focused: 'Tie the recommendation directly to the learner\'s stated goal.',
};

// ── Learning Coach ─────────────────────────────────────────────

export class LearningCoach {
  constructor(
    private readonly llm: LLMProvider,
    private readonly locale: 'en' | 'ar' = 'en',
  ) {}

  /**
   * Generate a coach message explaining a recommendation.
   * Reads LearnerState — never raw database.
   * Respects Consent for data access.
   */
  async explain(
    recommendation: Recommendation,
    learnerStates: LearnerSkillState[],
    coachingStyle: CoachingStyle,
    consents: ConsentRecord[],
  ): Promise<CoachMessage> {

    // Build consent-gated context
    const canUseKnowledgeData = isDataAllowed('knowledge_data', consents);
    const canUseHistory = isDataAllowed('assessment_history', consents);
    const canUseAI = isDataAllowed('ai_analysis', consents);

    // If AI is not consented, fall back to deterministic
    if (!canUseAI) {
      return this.deterministicFallback(recommendation, coachingStyle, false);
    }

    // Prepare evidence payload — only consented data
    const evidenceContext = canUseKnowledgeData
      ? recommendation.evidenceSummary.join('\n')
      : 'Learning profile data not shared.';

    const historyNote = canUseHistory
      ? `Recent trend: ${learnerStates.find(s => s.skillId === recommendation.targetSkills[0])?.trend ?? 'unknown'}`
      : '';

    const prompt = `
You are a learning coach for an adaptive educational platform.
Your role is to explain a recommendation to the learner in the "${coachingStyle}" style.

Coaching style directive: ${STYLE_DIRECTIVES[coachingStyle]}

Recommended action: ${recommendation.action.title[this.locale]}
Reason: ${recommendation.reason[this.locale]}
Expected benefit: ${recommendation.expectedBenefit[this.locale]}
Evidence: ${evidenceContext}
${historyNote}

IMPORTANT RULES:
- Do NOT claim to diagnose emotions, stress, anxiety, or mental state.
- Do NOT produce an IQ score or intelligence label.
- Do NOT invent details not present in the evidence.
- Keep the message focused and evidence-grounded.
- Write in ${this.locale === 'ar' ? 'Arabic' : 'English'}.
- Maximum 3 sentences.
`.trim();

    try {
      const result = await this.llm.complete({
        messages: [
          { role: 'system', content: 'You are a personal learning coach. Be evidence-based and helpful.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.5,
        maxTokens: 256,
        promptVersion: 'coach-explain-v1',
      });

      if (result.usedFallback || !result.content) {
        return this.deterministicFallback(recommendation, coachingStyle, true);
      }

      const text = result.content;

      // Safety gate — reject forbidden claims
      if (containsForbiddenClaim(text)) {
        console.warn('Coach output contained forbidden claim. Using fallback.');
        return this.deterministicFallback(recommendation, coachingStyle, true);
      }

      return {
        text,
        locale: this.locale,
        coachingStyle,
        usedFallback: false,
        safetyChecked: true,
        recommendation,
        evidenceSummary: recommendation.evidenceSummary,
      };

    } catch {
      return this.deterministicFallback(recommendation, coachingStyle, true);
    }
  }

  private deterministicFallback(
    rec: Recommendation,
    style: CoachingStyle,
    aiUnavailable: boolean,
  ): CoachMessage {
    const actionTitle = rec.action.title[this.locale];
    const reason = rec.reason[this.locale];
    const benefit = rec.expectedBenefit[this.locale];

    const templates: Partial<Record<CoachingStyle, string>> = {
      encouraging: `Great progress! Your next step is: ${actionTitle}. ${benefit}`,
      direct: `Next action: ${actionTitle}. Reason: ${reason}.`,
      socratic: `What do you think would help most with your current gap? Consider: ${actionTitle}.`,
      concise: `${actionTitle}: ${reason}.`,
      detailed: `Based on your learning profile, the recommended action is "${actionTitle}". ${reason}. ${benefit}`,
      challenge_oriented: `Ready for a challenge? Try: ${actionTitle}. ${reason}.`,
      goal_focused: `To reach your goal, prioritize: ${actionTitle}. ${benefit}`,
    };

    return {
      text: templates[style] ?? `Recommended: ${actionTitle}. ${reason}`,
      locale: this.locale,
      coachingStyle: style,
      usedFallback: aiUnavailable,
      safetyChecked: true,
      recommendation: rec,
      evidenceSummary: rec.evidenceSummary,
    };
  }
}
