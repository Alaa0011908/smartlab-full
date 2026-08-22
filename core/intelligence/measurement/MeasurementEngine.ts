// core/intelligence/measurement/MeasurementEngine.ts
import { LearnerSkillState, Evidence } from '../../../lib/domain/types';

export interface MeasurementEngine {
  processEvidence(
    priorState: LearnerSkillState,
    newEvidence: Evidence[],
    item?: any,
  ): { result: any; updatedState: LearnerSkillState };
}
