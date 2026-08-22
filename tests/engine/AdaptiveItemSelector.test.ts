// tests/engine/AdaptiveItemSelector.test.ts
// Unit tests for multi-factor adaptive item selection

import { AdaptiveItemSelector } from '../../lib/engine/AdaptiveItemSelector';
import type { LearnerSkillState, AssessmentItem, Skill } from '../../lib/domain/types';

const selector = new AdaptiveItemSelector();

function makeState(skillId: string, overrides: Partial<LearnerSkillState> = {}): LearnerSkillState {
  return {
    userId: 'u1', skillId,
    mastery: 0.5, masteryUncertainty: 0.3,
    confidence: 0.5, evidenceCount: 3,
    recentPerformance: 0.5, trend: 'stable',
    lastObservedAt: new Date(), misconceptions: [], status: 'developing',
    ...overrides,
  };
}

function makeItem(id: string, skillId: string, difficulty: number): AssessmentItem {
  return {
    id, domain: 'networking', type: 'mcq',
    text: { en: 'Test question', ar: 'سؤال اختبار' },
    correctAnswer: 'a',
    skillMappings: [{ skillId, weight: 1.0, role: 'primary' }],
    difficulty,
    explanation: { en: '', ar: '' },
    hints: [],
    calibrationStatus: 'provisional',
    tags: [],
  };
}

const skills: Skill[] = [
  { id: 'skill_a', name: { en: 'A', ar: 'أ' }, description: { en: '', ar: '' }, domain: 'networking', prerequisites: [], difficulty: 0.5, tags: [] },
  { id: 'skill_b', name: { en: 'B', ar: 'ب' }, description: { en: '', ar: '' }, domain: 'networking', prerequisites: ['skill_a'], difficulty: 0.7, tags: [] },
];

describe('AdaptiveItemSelector', () => {

  it('selects an item — basic case', () => {
    const states = [makeState('skill_a')];
    const items = [makeItem('i1', 'skill_a', 0.5)];
    const result = selector.select(states, items, { objective: 'diagnostic' }, skills);
    expect(result).not.toBeNull();
    expect(result!.item.id).toBe('i1');
  });

  it('prefers item targeting uncertain skill over mastered skill', () => {
    const states = [
      makeState('skill_a', { mastery: 0.9, masteryUncertainty: 0.05, status: 'mastered' }),
      makeState('skill_b', { mastery: 0.3, masteryUncertainty: 0.5, status: 'uncertain' }),
    ];
    const items = [
      makeItem('item_a', 'skill_a', 0.9),
      makeItem('item_b', 'skill_b', 0.3),
    ];
    const result = selector.select(states, items, { objective: 'diagnostic' }, skills);
    // Should select item targeting uncertain skill_b
    expect(result!.targetedSkills).toContain('skill_b');
  });

  it('returns Why-this-question reason in both locales', () => {
    const states = [makeState('skill_a')];
    const items = [makeItem('i1', 'skill_a', 0.5)];
    const result = selector.select(states, items, { objective: 'diagnostic' }, skills);
    expect(result!.reason.en).toBeTruthy();
    expect(result!.reason.ar).toBeTruthy();
  });

  it('excludes recently seen items', () => {
    const states = [makeState('skill_a')];
    const items = [makeItem('i1', 'skill_a', 0.5), makeItem('i2', 'skill_a', 0.5)];
    const result = selector.select(states, items, { objective: 'practice', excludeItemIds: ['i1'] }, skills);
    expect(result!.item.id).toBe('i2');
  });

  it('returns null when no items available', () => {
    const result = selector.select([], [], { objective: 'diagnostic' }, skills);
    expect(result).toBeNull();
  });

  it('includes expectedInformationGain in result', () => {
    const states = [makeState('skill_a', { mastery: 0.5 })];
    const items = [makeItem('i1', 'skill_a', 0.5)]; // difficulty = mastery = max info
    const result = selector.select(states, items, { objective: 'diagnostic' }, skills);
    expect(result!.expectedInformationGain).toBeGreaterThan(0);
  });
});
