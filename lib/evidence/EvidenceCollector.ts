// lib/evidence/EvidenceCollector.ts
// ============================================================
// Evidence Collector — First class citizen of the learning loop.
//
// Flow: RawInteraction → Evidence → EvidenceRepository
//       → MeasurementEngine → LearnerState
//
// The LLM NEVER directly mutates learner mastery.
// ============================================================

import type { Evidence, EvidenceSource, ActionEvent } from '../domain/types';
import type { EvidenceRepository } from '../repositories/interfaces';

export interface MCQResponseInput {
  learnerId: string;
  itemId: string;
  skillId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  responseTimeMs: number;
  userReportedConfidence?: number;
  sessionId?: string;
}

export interface PracticalTaskInput {
  learnerId: string;
  scenarioId: string;
  skillIds: string[];
  actionSequence: ActionEvent[];
  solved: boolean;
  totalTimeMs: number;
  sessionId?: string;
}

export interface SelfReportInput {
  learnerId: string;
  skillId: string;
  selfAssessedMastery: number;
  sessionId?: string;
}

export class EvidenceCollector {
  constructor(private readonly repo: EvidenceRepository) {}

  async collectMCQResponse(input: MCQResponseInput): Promise<Evidence> {
    const evidence: Omit<Evidence, 'id'> = {
      learnerId: input.learnerId,
      itemId: input.itemId,
      source: 'mcq' as EvidenceSource,
      skillId: input.skillId,
      correctness: input.isCorrect ? 1.0 : 0.0,
      responseTimeMs: input.responseTimeMs,
      userReportedConfidence: input.userReportedConfidence,
      createdAt: new Date(),
      sessionId: input.sessionId,
    };
    return this.repo.saveEvidence(evidence);
  }

  async collectPracticalTaskEvidence(input: PracticalTaskInput): Promise<Evidence[]> {
    const results: Evidence[] = [];
    for (const skillId of input.skillIds) {
      const evidence: Omit<Evidence, 'id'> = {
        learnerId: input.learnerId,
        source: 'practical_task' as EvidenceSource,
        skillId,
        correctness: input.solved ? 1.0 : 0.5, // Partial credit for attempt
        responseTimeMs: input.totalTimeMs,
        actionSequence: input.actionSequence,
        createdAt: new Date(),
        sessionId: input.sessionId,
      };
      results.push(await this.repo.saveEvidence(evidence));
    }
    return results;
  }

  async collectSelfReport(input: SelfReportInput): Promise<Evidence> {
    const evidence: Omit<Evidence, 'id'> = {
      learnerId: input.learnerId,
      source: 'self_report' as EvidenceSource,
      skillId: input.skillId,
      correctness: input.selfAssessedMastery,
      createdAt: new Date(),
      sessionId: input.sessionId,
    };
    return this.repo.saveEvidence(evidence);
  }
}
