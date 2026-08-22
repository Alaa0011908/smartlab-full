// lib/recommendation/RecommendationEngine.ts
// ============================================================
// Recommendation Engine — Separate from LearningCoach.
//
// Architecture:
//   LearnerState → RecommendationEngine → LearningAction
//   LearningAction → LearningCoach (formats for human language)
//
// The Coach does NOT decide what to recommend.
// The Engine decides. The Coach explains.
// ============================================================

import type {
  LearnerSkillState,
  LearningGoal,
  LearningAction,
  Recommendation,
  Skill,
  I18nString,
} from '../domain/types';

export interface RecommendationInput {
  learnerStates: LearnerSkillState[];
  goal: LearningGoal | null;
  availableActions: LearningAction[];
  skills: Skill[];
  locale?: 'en' | 'ar';
}

interface ScoredAction {
  action: LearningAction;
  score: number;
  evidenceSummary: string[];
  targetSkills: string[];
  confidence: number;
}

export class RecommendationEngine {

  generate(input: RecommendationInput): Recommendation | null {
    const { learnerStates, goal, availableActions, skills } = input;

    if (availableActions.length === 0) return null;

    const scored = availableActions
      .map(action => this.scoreAction(action, learnerStates, goal, skills))
      .sort((a, b) => b.score - a.score);

    const best = scored[0];
    if (!best) return null;

    const priority = best.score >= 0.7 ? 'high' : best.score >= 0.4 ? 'medium' : 'low';

    return {
      action: best.action,
      reason: this.buildReason(best, learnerStates),
      priority,
      expectedBenefit: this.buildExpectedBenefit(best),
      confidence: best.confidence,
      targetSkills: best.targetSkills,
      evidenceSummary: best.evidenceSummary,
      generatedAt: new Date(),
      modelUsed: 'RecommendationEngine:v1',
    };
  }

  private scoreAction(
    action: LearningAction,
    states: LearnerSkillState[],
    goal: LearningGoal | null,
    skills: Skill[],
  ): ScoredAction {
    let score = 0;
    const evidenceSummary: string[] = [];
    const targetSkills: string[] = [];

    const stateMap = new Map<string, LearnerSkillState>(states.map(s => [s.skillId, s]));

    for (const skillId of action.targetSkills) {
      const state = stateMap.get(skillId);
      if (!state) {
        score += 0.5; // Unknown — diagnostic value
        evidenceSummary.push(`No data yet for ${skillId}`);
        targetSkills.push(skillId);
        continue;
      }

      targetSkills.push(skillId);

      // HIGH PRIORITY: Needs attention + enough evidence to be confident in that
      if (state.status === 'needs_attention' && state.confidence >= 0.5) {
        score += 0.9;
        evidenceSummary.push(`${skillId}: mastery ${(state.mastery * 100).toFixed(0)}% (needs attention)`);
      }

      // HIGH PRIORITY: Uncertain — need more evidence
      if (state.status === 'uncertain') {
        score += 0.7;
        evidenceSummary.push(`${skillId}: only ${state.evidenceCount} evidence point(s) — uncertain`);
      }

      // MEDIUM: Developing — useful to push forward
      if (state.status === 'developing') {
        score += 0.4;
        evidenceSummary.push(`${skillId}: mastery ${(state.mastery * 100).toFixed(0)}% — developing`);
      }

      // BONUS: Declining trend
      if (state.trend === 'declining') {
        score += 0.3;
        evidenceSummary.push(`${skillId}: declining trend observed`);
      }

      // BONUS: Goal alignment
      if (goal && goal.targetSkills.includes(skillId)) {
        score += 0.4;
        evidenceSummary.push(`${skillId}: aligned with your goal`);
      }

      // BONUS: Prerequisite check — don't recommend advanced before prerequisite ready
      const skill = skills.find(s => s.id === skillId);
      if (skill) {
        const prereqsReady = skill.prerequisites.every(pId => {
          const pState = stateMap.get(pId);
          return !pState || pState.mastery >= 0.55;
        });
        if (!prereqsReady) score -= 0.5; // Penalize if prereqs not ready
      }

      // Action type match
      if (action.type === 'troubleshooting_lab' && state.skillId.includes('troubleshoot')) {
        score += 0.3;
      }
      if (action.type === 'review' && state.trend === 'declining') {
        score += 0.2;
      }
      if (action.type === 'challenge' && state.status === 'mastered') {
        score += 0.3;
      }
    }
    if (action.targetSkills.length > 0) {
      score = score / action.targetSkills.length;
    }

    const confidence = Math.min(0.95, states.filter(s => s.confidence >= 0.5).length / Math.max(1, states.length));

    return {
      action,
      score: Math.max(0, score),
      evidenceSummary,
      targetSkills,
      confidence,
    };
  }

  private buildReason(best: ScoredAction, states: LearnerSkillState[]): I18nString {
    const summary = best.evidenceSummary.slice(0, 3).join('. ');
    return {
      en: summary || 'Based on your current learning profile.',
      ar: summary || 'بناءً على حالتك التعليمية الحالية.',
    };
  }

  private buildExpectedBenefit(best: ScoredAction): I18nString {
    const skills = best.targetSkills.slice(0, 2).join(', ');
    return {
      en: `Improve mastery in ${skills} and reduce uncertainty in your knowledge profile.`,
      ar: `تحسين مستوى الإتقان في ${skills} وتقليل حالة عدم اليقين في ملفك التعليمي.`,
    };
  }
}
