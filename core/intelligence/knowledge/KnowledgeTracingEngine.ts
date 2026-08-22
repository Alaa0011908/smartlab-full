// core/intelligence/knowledge/KnowledgeTracingEngine.ts
import { LearnerSkillState, Evidence } from '../../../lib/domain/types';

export interface KnowledgeTracingEngine {
  readonly modelName: string;
  predictNext(state: LearnerSkillState): number;
  updateState(state: LearnerSkillState, evidence: Evidence): LearnerSkillState;
  fit?(historicalEvidence: Evidence[]): Promise<boolean>;
}
