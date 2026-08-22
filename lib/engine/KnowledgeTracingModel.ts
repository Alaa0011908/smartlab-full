// lib/engine/KnowledgeTracingModel.ts
// ============================================================
// Knowledge Tracing — Abstract interface + BKT implementation
//
// Architecture:
//   KnowledgeTracingModel (interface)
//     ├── BKTModel   (Interpretable Bayesian Knowledge Tracing)
//     [Future: DKTModel, DKVMNModel, SAKTModel, AKTModel]
//
// NOTE: We do not assume deep learning is superior.
// The architecture allows model comparison when calibration data exists.
// ============================================================

import type { Evidence, LearnerSkillState } from '../domain/types';

// ── Abstract Interface ────────────────────────────────────────

export interface KnowledgeTracingModel {
  readonly modelName: string;

  /**
   * Predict probability of correct response on next item.
   */
  predictNext(state: LearnerSkillState): number;

  /**
   * Update knowledge state after observing new evidence.
   */
  updateState(
    state: LearnerSkillState,
    evidence: Evidence,
  ): LearnerSkillState;

  /**
   * Fit model parameters from historical evidence.
   * Returns whether fitting was successful.
   */
  fit?(historicalEvidence: Evidence[]): Promise<boolean>;
}

// ── BKT Model ─────────────────────────────────────────────────

/**
 * Bayesian Knowledge Tracing (Corbett & Anderson, 1994)
 *
 * Parameters (all provisional — not calibrated on real data yet):
 *   L0 — Initial knowledge probability
 *   T  — Probability of learning (transition)
 *   G  — Probability of guess (correct without knowledge)
 *   S  — Probability of slip (incorrect despite knowledge)
 *
 * These are per-skill in a real calibrated system.
 * For MVP we use global defaults with calibrationStatus: "provisional".
 */
export class BKTModel implements KnowledgeTracingModel {
  readonly modelName = 'BKT';

  // Global defaults — provisional
  private readonly defaults = {
    L0: 0.1,   // initial knowledge
    T: 0.10,   // learning rate
    G: 0.20,   // guess probability
    S: 0.10,   // slip probability
  };

  predictNext(state: LearnerSkillState): number {
    const L = state.mastery;
    const G = this.defaults.G;
    const S = this.defaults.S;
    return L * (1 - S) + (1 - L) * G;
  }

  updateState(
    state: LearnerSkillState,
    evidence: Evidence,
  ): LearnerSkillState {
    const L = state.mastery;
    const G = this.defaults.G;
    const S = this.defaults.S;
    const T = this.defaults.T;

    const correct = (evidence.correctness ?? 0) >= 0.5;

    // Posterior: P(K | obs)
    let posterior: number;
    if (correct) {
      const pCorrect = L * (1 - S) + (1 - L) * G;
      posterior = (L * (1 - S)) / pCorrect;
    } else {
      const pIncorrect = L * S + (1 - L) * (1 - G);
      posterior = (L * S) / pIncorrect;
    }

    // Apply learning transition
    const updated = posterior + (1 - posterior) * T;

    // Uncertainty decreases logarithmically with evidence
    const newEvidenceCount = state.evidenceCount + 1;
    const newUncertainty = Math.max(0.05, 0.5 / Math.sqrt(newEvidenceCount));
    const trend =
      updated - state.mastery > 0.03
        ? 'improving'
        : updated - state.mastery < -0.03
        ? 'declining'
        : 'stable';

    return {
      ...state,
      mastery: Math.max(0.01, Math.min(0.99, updated)),
      masteryUncertainty: newUncertainty,
      confidence: 1 - newUncertainty,
      evidenceCount: newEvidenceCount,
      recentPerformance: correct
        ? Math.min(1, state.recentPerformance + 0.1)
        : Math.max(0, state.recentPerformance - 0.1),
      trend,
      lastObservedAt: new Date(),
      status:
        newUncertainty > 0.4
          ? 'uncertain'
          : updated >= 0.8
          ? 'mastered'
          : updated >= 0.5
          ? 'developing'
          : 'needs_attention',
    };
  }

  async fit(historicalEvidence: Evidence[]): Promise<boolean> {
    // TODO: Implement EM algorithm for parameter estimation when data is available.
    console.warn('BKTModel.fit(): Not yet implemented. Using provisional defaults.');
    return false;
  }
}

// ── Model Registry ────────────────────────────────────────────

export type KnowledgeTracingModelName = 'BKT'; // | 'DKT' | 'DKVMN' | 'SAKT' | 'AKT'

export function createKnowledgeTracingModel(
  name: KnowledgeTracingModelName = 'BKT',
): KnowledgeTracingModel {
  switch (name) {
    case 'BKT':
      return new BKTModel();
    default:
      console.warn(`Model ${name} not implemented. Falling back to BKT.`);
      return new BKTModel();
  }
}
