// lib/engine/MeasurementEngine.ts
// ============================================================
// Abstract Measurement Engine + ProvisionalRasch + ClassicalScoring
//
// CRITICAL: Every result carries calibrationStatus = "provisional"
// until real calibration data is available. We NEVER claim validated
// psychometric performance without evidence.
//
// Architecture:
//   MeasurementModel (interface)
//     ├── ProvisionalRaschModel   (1PL approximation)
//     └── ClassicalScoringModel   (CTT fallback)
//     [Future: 2PLModel, MIRTModel, CDMModel]
// ============================================================

import type {
  Evidence,
  LearnerSkillState,
  AssessmentItem,
  MeasurementResult,
  CalibrationStatus,
  SkillStatus,
  MisconceptionEvidence,
} from '../domain/types';

// ── Abstract Interface ────────────────────────────────────────

export interface MeasurementModel {
  readonly modelName: string;
  readonly calibrationStatus: CalibrationStatus;

  /**
   * Given a batch of evidence for a single skill, compute a MeasurementResult.
   */
  estimate(
    priorState: LearnerSkillState,
    newEvidence: Evidence[],
    item?: AssessmentItem,
  ): MeasurementResult;
}

// ── Provisional Rasch (1PL approximation) ────────────────────

/**
 * ProvisionalRaschModel:
 *   - Uses item difficulty as a proxy for b-parameter.
 *   - Bayesian update inspired by BKT.
 *   - calibrationStatus = "provisional" always until real data.
 *
 * The update rule:
 *   P(mastery | correct) proportional to P(correct | mastery) * P(mastery)
 *   Simplified to a closed-form Bayesian step.
 */
export class ProvisionalRaschModel implements MeasurementModel {
  readonly modelName = 'ProvisionalRasch';
  readonly calibrationStatus: CalibrationStatus = 'provisional';

  // BKT-style parameters (provisional — not empirically calibrated)
  private readonly P_TRANSIT = 0.1;   // P(learn) per exposure
  private readonly P_GUESS   = 0.2;   // P(correct | not mastered)
  private readonly P_SLIP    = 0.1;   // P(incorrect | mastered)

  estimate(
    priorState: LearnerSkillState,
    newEvidence: Evidence[],
    item?: AssessmentItem,
  ): MeasurementResult {
    let mastery = priorState.mastery;
    const priorUncertainty = priorState.masteryUncertainty;

    for (const ev of newEvidence) {
      const correct = (ev.correctness ?? 0) >= 0.5;

      // Map 0-1 mastery to theta using log-odds (logit)
      // Bound mastery to avoid Infinity
      const safeMastery = Math.max(0.01, Math.min(0.99, mastery));
      const theta = Math.log(safeMastery / (1 - safeMastery));
      
      // Map 0-1 difficulty to b using log-odds
      // If no item is provided, assume average difficulty (0.5 -> b = 0)
      const difficulty = Math.max(0.01, Math.min(0.99, item?.difficulty ?? 0.5));
      const b = Math.log(difficulty / (1 - difficulty));

      // Rasch 1PL formula: P(X=1) = 1 / (1 + exp(-(theta - b)))
      const pCorrect = 1 / (1 + Math.exp(-(theta - b)));

      // Bayesian update approximation (simplified)
      // We adjust theta based on the surprise: (actual - predicted)
      // A learning rate is applied based on uncertainty
      const learningRate = 0.5 + priorUncertainty; // Higher uncertainty = bigger jumps
      const actual = correct ? 1 : 0;
      
      const newTheta = theta + learningRate * (actual - pCorrect);
      
      // Map back to 0-1 mastery using standard logistic function
      mastery = 1 / (1 + Math.exp(-newTheta));
    }

    // Uncertainty decreases with evidence count
    const evidenceCount = priorState.evidenceCount + newEvidence.length;
    const uncertainty = Math.max(0.05, priorUncertainty * Math.exp(-0.1 * newEvidence.length));

    // Fisher information for 1PL is P(X=1) * (1 - P(X=1))
    // We approximate it around the final mastery
    const safeFinalMastery = Math.max(0.01, Math.min(0.99, mastery));
    const finalTheta = Math.log(safeFinalMastery / (1 - safeFinalMastery));
    const safeDiff = item ? Math.max(0.01, Math.min(0.99, item.difficulty)) : 0.5;
    const finalB = Math.log(safeDiff / (1 - safeDiff));
    const pFinal = 1 / (1 + Math.exp(-(finalTheta - finalB)));
    const information = pFinal * (1 - pFinal);

    return {
      estimate: Math.max(0.01, Math.min(0.99, mastery)),
      uncertainty,
      information,
      model: this.modelName,
      calibrationStatus: this.calibrationStatus,
      evidenceCount,
    };
  }
}

// ── Classical Scoring Model (CTT fallback) ────────────────────

export class ClassicalScoringModel implements MeasurementModel {
  readonly modelName = 'ClassicalScoring';
  readonly calibrationStatus: CalibrationStatus = 'provisional';

  estimate(
    priorState: LearnerSkillState,
    newEvidence: Evidence[],
  ): MeasurementResult {
    if (newEvidence.length === 0) {
      return {
        estimate: priorState.mastery,
        uncertainty: priorState.masteryUncertainty,
        information: 0,
        model: this.modelName,
        calibrationStatus: this.calibrationStatus,
        evidenceCount: priorState.evidenceCount,
      };
    }

    const correctness = newEvidence
      .filter(e => e.correctness !== undefined)
      .map(e => e.correctness as number);

    const avgCorrectness = correctness.length > 0
      ? correctness.reduce((a, b) => a + b, 0) / correctness.length
      : priorState.mastery;

    // Weighted blend with prior (Bayesian-lite)
    const weight = Math.min(1, newEvidence.length / 10);
    const estimate = priorState.mastery * (1 - weight) + avgCorrectness * weight;

    const evidenceCount = priorState.evidenceCount + newEvidence.length;
    const uncertainty = Math.max(0.05, 0.5 / Math.sqrt(evidenceCount));

    return {
      estimate: Math.max(0.01, Math.min(0.99, estimate)),
      uncertainty,
      information: 4 * estimate * (1 - estimate),
      model: this.modelName,
      calibrationStatus: this.calibrationStatus,
      evidenceCount,
    };
  }
}

// ── State Updater ─────────────────────────────────────────────

function deriveStatus(mastery: number, uncertainty: number): SkillStatus {
  if (uncertainty > 0.4) return 'uncertain';          // Not enough evidence
  if (mastery >= 0.8) return 'mastered';
  if (mastery >= 0.5) return 'developing';
  return 'needs_attention';
}

function deriveTrend(
  prior: number,
  current: number,
): LearnerSkillState['trend'] {
  const delta = current - prior;
  if (delta > 0.05) return 'improving';
  if (delta < -0.05) return 'declining';
  return 'stable';
}

/**
 * Applies a MeasurementResult onto an existing LearnerSkillState.
 * Returns a new immutable state object — never mutates.
 */
export function applyMeasurementToState(
  prior: LearnerSkillState,
  result: MeasurementResult,
  newEvidence: Evidence[],
): LearnerSkillState {
  // Detect calibration gap (overconfidence/underconfidence)
  const selfReported = newEvidence
    .filter(e => e.userReportedConfidence !== undefined)
    .map(e => e.userReportedConfidence as number);

  const avgSelfConfidence = selfReported.length > 0
    ? selfReported.reduce((a, b) => a + b, 0) / selfReported.length
    : undefined;

  const calibrationGap = avgSelfConfidence !== undefined
    ? avgSelfConfidence - result.estimate
    : prior.calibrationGap;

  // System confidence = 1 - uncertainty
  const systemConfidence = 1 - result.uncertainty;

  // Recent performance from this batch
  const recentPerformance = newEvidence.length > 0
    ? newEvidence.filter(e => (e.correctness ?? 0) >= 0.5).length / newEvidence.length
    : prior.recentPerformance;

  return {
    ...prior,
    mastery: result.estimate,
    masteryUncertainty: result.uncertainty,
    confidence: systemConfidence,
    calibrationGap,
    evidenceCount: result.evidenceCount,
    recentPerformance,
    trend: deriveTrend(prior.mastery, result.estimate),
    lastObservedAt: new Date(),
    status: deriveStatus(result.estimate, result.uncertainty),
  };
}

// ── Default Engine (factory) ──────────────────────────────────

export class MeasurementEngine {
  private model: MeasurementModel;

  constructor(model?: MeasurementModel) {
    // Default: ProvisionalRasch. Swap at runtime for A/B testing.
    this.model = model ?? new ProvisionalRaschModel();
  }

  get activeModel(): MeasurementModel { return this.model; }

  setModel(model: MeasurementModel) { this.model = model; }

  /**
   * Full pipeline: prior state + new evidence → updated state
   */
  processEvidence(
    priorState: LearnerSkillState,
    newEvidence: Evidence[],
    item?: AssessmentItem,
  ): { result: MeasurementResult; updatedState: LearnerSkillState } {
    const result = this.model.estimate(priorState, newEvidence, item);
    const updatedState = applyMeasurementToState(priorState, result, newEvidence);
    return { result, updatedState };
  }
}
