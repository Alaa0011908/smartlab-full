// infrastructure/legacy/LegacyMeasurementAdapter.ts
import { MeasurementEngine as CoreMeasurementEngine } from '../../core/intelligence/measurement/MeasurementEngine';
import { MeasurementEngine as LegacyEngine } from '../../lib/engine/MeasurementEngine';
import { LearnerSkillState, Evidence } from '../../lib/domain/types';

export class LegacyMeasurementAdapter implements CoreMeasurementEngine {
  private legacyEngine: LegacyEngine;

  constructor() {
    this.legacyEngine = new LegacyEngine();
  }

  processEvidence(
    priorState: LearnerSkillState,
    newEvidence: Evidence[],
    item?: any,
  ): { result: any; updatedState: LearnerSkillState } {
    return this.legacyEngine.processEvidence(priorState, newEvidence, item);
  }
}
