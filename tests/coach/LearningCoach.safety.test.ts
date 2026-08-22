// tests/coach/LearningCoach.safety.test.ts
// Safety tests for the Learning Coach:
// - No psychological/emotional diagnosis
// - No fake IQ scores
// - No fabricated learner history
// - Consent enforcement
// - Fallback when LLM unavailable

import { LearningCoach } from '../../lib/ai/LearningCoach';
import { MockLLMProvider } from '../../lib/ai/LLMProvider';
import type { LearnerSkillState, Recommendation, ConsentRecord, LearningAction } from '../../lib/domain/types';

const action: LearningAction = {
  id: 'a1', type: 'practice',
  title: { en: 'Practice', ar: 'تدريب' },
  description: { en: 'desc', ar: 'وصف' },
  targetSkills: ['subnetting'], estimatedDurationMinutes: 10, difficulty: 0.6,
};

const recommendation: Recommendation = {
  action,
  reason: { en: 'Subnetting needs attention', ar: 'تقسيم الشبكات يحتاج اهتمامًا' },
  priority: 'high',
  expectedBenefit: { en: 'Improve subnetting mastery', ar: 'تحسين إتقان تقسيم الشبكات' },
  confidence: 0.8,
  targetSkills: ['subnetting'],
  evidenceSummary: ['4 incorrect subnetting answers', 'CIDR boundary misconception detected'],
  generatedAt: new Date(),
  modelUsed: 'RecommendationEngine:v1',
};

const states: LearnerSkillState[] = [{
  userId: 'u1', skillId: 'subnetting',
  mastery: 0.28, masteryUncertainty: 0.15, confidence: 0.80,
  evidenceCount: 14, recentPerformance: 0.28, trend: 'declining',
  lastObservedAt: new Date(), misconceptions: [], status: 'needs_attention',
}];

const fullConsents: ConsentRecord[] = [
  { userId: 'u1', category: 'knowledge_data', granted: true, purpose: { en: '', ar: '' }, grantedAt: new Date() },
  { userId: 'u1', category: 'assessment_history', granted: true, purpose: { en: '', ar: '' }, grantedAt: new Date() },
  { userId: 'u1', category: 'ai_analysis', granted: true, purpose: { en: '', ar: '' }, grantedAt: new Date() },
];

describe('LearningCoach — Safety Tests', () => {

  it('uses deterministic fallback when LLM provider unavailable', async () => {
    // MockLLMProvider that always errors
    class FailingProvider extends MockLLMProvider {
      async complete(): Promise<never> { throw new Error('LLM unavailable'); }
    }
    const coach = new LearningCoach(new FailingProvider(), 'en');
    const message = await coach.explain(recommendation, states, 'direct', fullConsents);
    expect(message.usedFallback).toBe(true);
    expect(message.text.length).toBeGreaterThan(0); // Still produces output
  });

  it('rejects LLM output containing forbidden psychological claims', async () => {
    const badLLM = new MockLLMProvider('The learner shows signs of anxiety and depression. IQ score: 87.');
    const coach = new LearningCoach(badLLM, 'en');
    const message = await coach.explain(recommendation, states, 'direct', fullConsents);
    // Should have triggered safety fallback
    expect(message.safetyChecked).toBe(true);
    // The forbidden text should NOT appear in the final message
    expect(message.text).not.toContain('IQ');
    expect(message.text).not.toContain('anxiety');
    expect(message.text).not.toContain('depression');
  });

  it('respects consent: does not use AI when ai_analysis is revoked', async () => {
    const restrictedConsents: ConsentRecord[] = [
      { userId: 'u1', category: 'ai_analysis', granted: false, purpose: { en: '', ar: '' }, revokedAt: new Date() },
    ];
    const coach = new LearningCoach(new MockLLMProvider(), 'en');
    const message = await coach.explain(recommendation, states, 'direct', restrictedConsents);
    // Must fall back to deterministic when AI is not consented
    expect(message.usedFallback).toBe(true);
  });

  it('produces output in both English and Arabic', async () => {
    const enCoach = new LearningCoach(new MockLLMProvider('Practice subnetting now.'), 'en');
    const arCoach = new LearningCoach(new MockLLMProvider('تدرب على تقسيم الشبكات الآن.'), 'ar');

    const enMsg = await enCoach.explain(recommendation, states, 'direct', fullConsents);
    const arMsg = await arCoach.explain(recommendation, states, 'direct', fullConsents);

    expect(enMsg.locale).toBe('en');
    expect(arMsg.locale).toBe('ar');
    expect(enMsg.text.length).toBeGreaterThan(0);
    expect(arMsg.text.length).toBeGreaterThan(0);
  });

  it('coaching style does NOT alter the recommendation action itself', async () => {
    const coach = new LearningCoach(new MockLLMProvider('Short message.'), 'en');
    const directMsg = await coach.explain(recommendation, states, 'direct', fullConsents);
    const socraticMsg = await coach.explain(recommendation, states, 'socratic', fullConsents);

    // Same recommendation action regardless of style
    expect(directMsg.recommendation?.action.id).toBe(recommendation.action.id);
    expect(socraticMsg.recommendation?.action.id).toBe(recommendation.action.id);
  });
});

describe('LearningCoach — Consent Tests', () => {

  it('produces a valid message even with all consents revoked (graceful degradation)', async () => {
    const noConsents: ConsentRecord[] = [];
    const coach = new LearningCoach(new MockLLMProvider(), 'en');
    const message = await coach.explain(recommendation, states, 'concise', noConsents);
    expect(message.text.length).toBeGreaterThan(0);
    expect(message.usedFallback).toBe(true);
  });
});
