// lib/domain/types.ts
// ============================================================
// Core Domain Types — Adaptive Educational Intelligence Engine
// All IDs, API contracts, and business logic are language-independent.
// UI text is localized via i18n keys, never embedded in logic.
// ============================================================

// ============================================================
// I18N
// ============================================================

export interface I18nString {
  en: string;
  ar: string;
}

// ============================================================
// SKILLS & KNOWLEDGE GRAPH
// ============================================================

export type SkillStatus =
  | 'mastered'
  | 'developing'
  | 'needs_attention'
  | 'uncertain';

export interface Skill {
  id: string;
  name: I18nString;
  description: I18nString;
  domain: string;
  parent?: string;
  prerequisites: string[]; // skill IDs
  difficulty: number;      // 0.0–1.0 (IRT b-parameter approximation)
  tags: string[];
}

export interface SkillPrerequisiteEdge {
  skillId: string;
  requiresSkillId: string;
  strength: 'required' | 'recommended';
}

// ============================================================
// MISCONCEPTIONS
// ============================================================

export interface Misconception {
  id: string;
  name: I18nString;
  description: I18nString;
  associatedSkills: string[];
  evidenceThreshold: number; // minimum evidence count before declaring
  remediation: I18nString;
}

export interface MisconceptionEvidence {
  misconceptionId: string;
  evidenceCount: number;
  confidence: number; // 0.0–1.0 — system confidence this is real
  firstObservedAt: Date;
  lastObservedAt: Date;
}

// ============================================================
// ASSESSMENT ITEMS
// ============================================================

export type ItemType =
  | 'mcq'
  | 'short_answer'
  | 'numerical'
  | 'scenario'
  | 'troubleshooting'
  | 'practical_task';

export interface ItemOption {
  id: string;
  text: I18nString;
  misconceptionId?: string; // if selecting this option suggests a misconception
}

export interface ItemSkillMapping {
  skillId: string;
  weight: number; // 0.0–1.0 how strongly this item measures this skill
  role: 'primary' | 'secondary';
}

export interface AssessmentItem {
  id: string;
  text: I18nString;
  type: ItemType;
  options?: ItemOption[];
  correctAnswer: string | string[];
  skillMappings: ItemSkillMapping[];
  difficulty: number;         // 0.0–1.0 (provisional if not calibrated)
  discrimination?: number;    // IRT a-parameter — optional, provisional
  explanation: I18nString;
  hints: I18nString[];
  domain: string;
  calibrationStatus: 'provisional' | 'calibrated' | 'validated';
  tags: string[];
}

// ============================================================
// EVIDENCE
// ============================================================

export type EvidenceSource =
  | 'mcq'
  | 'short_answer'
  | 'simulation'
  | 'interaction'
  | 'self_report'
  | 'practical_task';

export interface ActionEvent {
  actionType: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface Evidence {
  id: string;
  learnerId: string;
  itemId?: string;
  source: EvidenceSource;
  skillId?: string;
  correctness?: number;          // 0.0–1.0 (partial credit possible)
  responseTimeMs?: number;
  userReportedConfidence?: number; // Self-reported: 0.0–1.0
  actionSequence?: ActionEvent[];
  rawResponse?: string;
  createdAt: Date;
  sessionId?: string;
}

// ============================================================
// MEASUREMENT
// ============================================================

export type CalibrationStatus = 'provisional' | 'calibrated' | 'validated';

export interface MeasurementResult {
  estimate: number;           // point estimate of ability/mastery (0.0–1.0)
  uncertainty: number;        // standard error / uncertainty (0.0–1.0)
  information: number;        // Fisher information at this estimate
  model: string;              // e.g. "ProvisionalRasch", "ClassicalScoring"
  calibrationStatus: CalibrationStatus;
  evidenceCount: number;
}

// ============================================================
// LEARNER STATE — EXPANDED
// ============================================================

export interface LearnerSkillState {
  userId: string;
  skillId: string;

  mastery: number;            // Probability of knowing skill (0.0–1.0)
  masteryUncertainty: number; // Uncertainty on mastery estimate (0.0–1.0)

  confidence: number;         // SYSTEM confidence in its own estimate (0.0–1.0)
  calibrationGap?: number;    // learner self-confidence minus accuracy (can be negative)

  evidenceCount: number;

  recentPerformance: number;  // avg correctness over last N attempts
  trend: 'improving' | 'declining' | 'stable';

  retention?: number;         // estimate from delayed re-assessment
  transfer?: number;          // estimate from structurally different problems

  lastObservedAt: Date;

  misconceptions: MisconceptionEvidence[];

  status: SkillStatus;        // derived from mastery + uncertainty

  // Process indicators (from practical tasks)
  problemSolvingIndicators?: {
    decomposition?: number;
    hypothesisTesting?: number;
    verification?: number;
    errorRecovery?: number;
    randomTrialBehavior?: number;
  };
}

// ============================================================
// ENTERPRISE & PRIVACY MODELS (PHASE 1)
// ============================================================

export interface Organization {
  id: string;
  name: string;
  type: 'bootcamp' | 'university' | 'corporate' | 'demo';
}

export interface UserIdentity {
  id: string;
  email: string;
  organizationId: string;
}

export interface LearningEventEnvelope {
  id: string;
  timestamp: Date;
  learner_id: string;
  event_type: 'ANSWER_SUBMITTED' | 'HINT_REQUESTED' | 'REVIEW_STARTED';
  payload: {
    question_id?: string;
    skill?: string;
    correct?: boolean;
    response_time?: number;
    [key: string]: any;
  };
  context: {
    device?: string;
    session?: string;
    model_version: string;
    engine_version: string;
    [key: string]: any;
  };
}

export interface FeatureFlags {
  newAdaptiveEngine: boolean;
  eventStore: boolean;
  newRecommendation: boolean;
}

// ============================================================
// LEARNER PROFILE
// ============================================================

export interface LearnerProfile {
  anonymous_id: string; // Primary ID for intelligence engine
  userId: string;       // Legacy ID for backwards compatibility
  displayName: string;
  email?: string;       // Deprecated: Moving to UserIdentity
  preferredLocale: 'en' | 'ar';
  coachingStyle: CoachingStyle;
  activeGoal?: LearningGoal;
  createdAt: Date;
  updatedAt: Date;
}

export interface LearningGoal {
  id: string;
  userId: string;
  description: I18nString;
  targetSkills: string[];
  deadline?: Date;
  createdAt: Date;
}

// ============================================================
// COACHING
// ============================================================

export type CoachingStyle =
  | 'encouraging'
  | 'direct'
  | 'socratic'
  | 'detailed'
  | 'concise'
  | 'challenge_oriented'
  | 'goal_focused';

// ============================================================
// CONSENT
// ============================================================

export type ConsentCategory =
  | 'knowledge_data'
  | 'assessment_history'
  | 'learning_activity'
  | 'goals'
  | 'coach_personalization'
  | 'ai_analysis';

export interface ConsentRecord {
  userId: string;
  category: ConsentCategory;
  granted: boolean;
  purpose: I18nString;
  grantedAt?: Date;
  revokedAt?: Date;
}

// ============================================================
// RECOMMENDATIONS
// ============================================================

export type LearningActionType =
  | 'lesson'
  | 'worked_example'
  | 'practice'
  | 'review'
  | 'simulation'
  | 'diagnostic_question'
  | 'challenge'
  | 'transfer_task'
  | 'troubleshooting_lab';

export interface LearningAction {
  id: string;
  type: LearningActionType;
  title: I18nString;
  description: I18nString;
  targetSkills: string[];
  estimatedDurationMinutes: number;
  difficulty: number;
  url?: string;
}

export interface Recommendation {
  action: LearningAction;
  reason: I18nString;
  priority: 'high' | 'medium' | 'low';
  expectedBenefit: I18nString;
  confidence: number;         // System confidence in this recommendation (0.0–1.0)
  targetSkills: string[];
  evidenceSummary: string[];  // Human-readable evidence bullets for "Why am I seeing this?"
  generatedAt: Date;
  modelUsed: string;
}

// ============================================================
// ADAPTIVE ITEM SELECTION
// ============================================================

export type AssessmentObjective =
  | 'diagnostic'
  | 'practice'
  | 'verification'
  | 'transfer';

export interface ItemSelectionConstraints {
  objective: AssessmentObjective;
  maxItems?: number;
  targetSkills?: string[];
  excludeItemIds?: string[];
  difficultyBounds?: { min: number; max: number };
}

export interface ItemSelectionResult {
  item: AssessmentItem;
  targetedSkills: string[];
  reason: I18nString;               // "Why this question?" panel
  expectedInformationGain: number;
  preLearnerStates: LearnerSkillState[];
}

// ============================================================
// ASSESSMENT SESSION
// ============================================================

export interface AssessmentSession {
  id: string;
  userId: string;
  objective: AssessmentObjective;
  domain: string;
  startedAt: Date;
  completedAt?: Date;
  itemsDelivered: string[];
  evidenceIds: string[];
  finalStates?: LearnerSkillState[];
}

// ============================================================
// PRACTICAL LAB
// ============================================================

export interface LabAction {
  command: string;
  timestamp: Date;
  output: string;
  relevantToFault: boolean;
}

export interface LabAttempt {
  id: string;
  userId: string;
  scenarioId: string;
  actions: LabAction[];
  startedAt: Date;
  completedAt?: Date;
  solved: boolean;
  hintsUsed: number;
  processIndicators: {
    systematicApproach: boolean;
    verifiedFix: boolean;
    randomTrials: number;
    timeToFix?: number;
  };
}
