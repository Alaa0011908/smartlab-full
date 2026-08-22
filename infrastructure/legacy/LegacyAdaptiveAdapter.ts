// infrastructure/legacy/LegacyAdaptiveAdapter.ts
import { AdaptiveEngine as CoreAdaptiveEngine } from '../../core/intelligence/adaptive/AdaptiveEngine';
import { AdaptiveItemSelector as LegacySelector } from '../../lib/engine/AdaptiveItemSelector';
import { LearnerSkillState, AssessmentItem, ItemSelectionConstraints, Skill, ItemSelectionResult } from '../../lib/domain/types';

export class LegacyAdaptiveAdapter implements CoreAdaptiveEngine {
  private legacyEngine: LegacySelector;

  constructor() {
    this.legacyEngine = new LegacySelector();
  }

  select(
    learnerStates: LearnerSkillState[],
    candidateItems: AssessmentItem[],
    constraints: ItemSelectionConstraints,
    skills: Skill[],
  ): ItemSelectionResult | null {
    return this.legacyEngine.select(learnerStates, candidateItems, constraints, skills);
  }
}
