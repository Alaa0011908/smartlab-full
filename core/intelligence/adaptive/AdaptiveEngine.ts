// core/intelligence/adaptive/AdaptiveEngine.ts
import { LearnerSkillState, AssessmentItem, ItemSelectionConstraints, Skill, ItemSelectionResult } from '../../../lib/domain/types';

export interface AdaptiveEngine {
  select(
    learnerStates: LearnerSkillState[],
    candidateItems: AssessmentItem[],
    constraints: ItemSelectionConstraints,
    skills: Skill[],
  ): ItemSelectionResult | null;
}
