// lib/repositories/interfaces.ts
// ============================================================
// Repository Interfaces — Business logic is decoupled from storage.
// Same logic runs over SupabaseRepository or InMemoryRepository.
// ============================================================

import type {
  Skill,
  AssessmentItem,
  Evidence,
  LearnerSkillState,
  LearnerProfile,
  Recommendation,
  ConsentRecord,
  ConsentCategory,
  AssessmentSession,
  LabAttempt,
  LearningGoal,
} from '../domain/types';

// ============================================================
// Base
// ============================================================

export interface Repository {
  readonly name: string;
}

// ============================================================
// User / Learner
// ============================================================

export interface UserRepository extends Repository {
  getProfile(userId: string): Promise<LearnerProfile | null>;
  createProfile(profile: Omit<LearnerProfile, 'createdAt' | 'updatedAt'>): Promise<LearnerProfile>;
  updateProfile(userId: string, updates: Partial<LearnerProfile>): Promise<LearnerProfile>;
}

// ============================================================
// Skills / Domain
// ============================================================

export interface SkillRepository extends Repository {
  getAllSkills(domain: string): Promise<Skill[]>;
  getSkillById(id: string): Promise<Skill | null>;
  getPrerequisites(skillId: string): Promise<Skill[]>;
  getDependents(skillId: string): Promise<Skill[]>;
}

// ============================================================
// Assessment Items
// ============================================================

export interface ItemRepository extends Repository {
  getItemById(id: string): Promise<AssessmentItem | null>;
  getItemsBySkill(skillId: string): Promise<AssessmentItem[]>;
  getItemsByDomain(domain: string): Promise<AssessmentItem[]>;
  getItemsByIds(ids: string[]): Promise<AssessmentItem[]>;
}

// ============================================================
// Evidence
// ============================================================

export interface EvidenceRepository extends Repository {
  saveEvidence(evidence: Omit<Evidence, 'id'>): Promise<Evidence>;
  getEvidenceForUser(userId: string, options?: {
    skillId?: string;
    since?: Date;
    limit?: number;
  }): Promise<Evidence[]>;
  getEvidenceForItem(itemId: string): Promise<Evidence[]>;
}

// ============================================================
// Learner State
// ============================================================

export interface LearnerStateRepository extends Repository {
  getState(userId: string, skillId: string): Promise<LearnerSkillState | null>;
  getAllStates(userId: string, domain: string): Promise<LearnerSkillState[]>;
  saveState(state: LearnerSkillState): Promise<LearnerSkillState>;
  bulkSaveStates(states: LearnerSkillState[]): Promise<void>;
}

// ============================================================
// Assessment Session
// ============================================================

export interface AssessmentRepository extends Repository {
  createSession(session: Omit<AssessmentSession, 'id'>): Promise<AssessmentSession>;
  updateSession(id: string, updates: Partial<AssessmentSession>): Promise<AssessmentSession>;
  getSession(id: string): Promise<AssessmentSession | null>;
  getSessionsForUser(userId: string): Promise<AssessmentSession[]>;
}

// ============================================================
// Recommendation
// ============================================================

export interface RecommendationRepository extends Repository {
  saveRecommendation(rec: Recommendation & { userId: string }): Promise<void>;
  getLatestRecommendation(userId: string): Promise<(Recommendation & { userId: string }) | null>;
  getRecommendationHistory(userId: string, limit?: number): Promise<(Recommendation & { userId: string })[]>;
}

// ============================================================
// Consent
// ============================================================

export interface ConsentRepository extends Repository {
  getConsent(userId: string, category: ConsentCategory): Promise<ConsentRecord | null>;
  getAllConsents(userId: string): Promise<ConsentRecord[]>;
  grantConsent(userId: string, category: ConsentCategory): Promise<ConsentRecord>;
  revokeConsent(userId: string, category: ConsentCategory): Promise<ConsentRecord>;
}

// ============================================================
// Lab
// ============================================================

export interface LabRepository extends Repository {
  saveAttempt(attempt: Omit<LabAttempt, 'id'>): Promise<LabAttempt>;
  getAttempts(userId: string, scenarioId: string): Promise<LabAttempt[]>;
}

// ============================================================
// Goals
// ============================================================

export interface GoalRepository extends Repository {
  saveGoal(goal: Omit<LearningGoal, 'id' | 'createdAt'>): Promise<LearningGoal>;
  getActiveGoal(userId: string): Promise<LearningGoal | null>;
}

// ============================================================
// Composite Repository Container
// ============================================================

export interface RepositoryContainer {
  users: UserRepository;
  skills: SkillRepository;
  items: ItemRepository;
  evidence: EvidenceRepository;
  learnerStates: LearnerStateRepository;
  assessments: AssessmentRepository;
  recommendations: RecommendationRepository;
  consent: ConsentRepository;
  lab: LabRepository;
  goals: GoalRepository;
}
