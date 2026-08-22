// infrastructure/legacy/LegacyKnowledgeAdapter.ts
import { KnowledgeTracingEngine as CoreEngine } from '../../core/intelligence/knowledge/KnowledgeTracingEngine';
import { BKTModel as LegacyEngine } from '../../lib/engine/KnowledgeTracingModel';
import { LearnerSkillState, Evidence } from '../../lib/domain/types';

export class LegacyKnowledgeAdapter implements CoreEngine {
  private legacyEngine: LegacyEngine;

  constructor() {
    this.legacyEngine = new LegacyEngine();
  }

  get modelName(): string {
    return this.legacyEngine.modelName;
  }

  predictNext(state: LearnerSkillState): number {
    return this.legacyEngine.predictNext(state);
  }

  updateState(state: LearnerSkillState, evidence: Evidence): LearnerSkillState {
    return this.legacyEngine.updateState(state, evidence);
  }

  async fit(historicalEvidence: Evidence[]): Promise<boolean> {
    if (this.legacyEngine.fit) {
      return this.legacyEngine.fit(historicalEvidence);
    }
    return false;
  }
}
