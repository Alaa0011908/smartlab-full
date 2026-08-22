// lib/repositories/InMemoryRepository.ts
// ============================================================
// In-Memory Repository — For demo and testing.
// Seeds "Alex" via seedDemoData(). Real calculations, not mock outputs.
// ============================================================

import type {
  Skill, AssessmentItem, Evidence, LearnerSkillState, LearnerProfile,
  Recommendation, ConsentRecord, ConsentCategory, AssessmentSession,
  LabAttempt, LearningGoal,
} from '../domain/types';
import type {
  UserRepository, SkillRepository, ItemRepository, EvidenceRepository,
  LearnerStateRepository, AssessmentRepository, RecommendationRepository,
  ConsentRepository, LabRepository, GoalRepository, RepositoryContainer,
} from './interfaces';

// ── Helpers ──────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

// ── Users ────────────────────────────────────────────────────

class InMemoryUserRepository implements UserRepository {
  readonly name = 'InMemoryUserRepository';
  private store = new Map<string, LearnerProfile>();

  async getProfile(userId: string) {
    return this.store.get(userId) ?? null;
  }

  async createProfile(profile: Omit<LearnerProfile, 'createdAt' | 'updatedAt'>) {
    const now = new Date();
    const full: LearnerProfile = { ...profile, createdAt: now, updatedAt: now };
    this.store.set(profile.userId, full);
    return full;
  }

  async updateProfile(userId: string, updates: Partial<LearnerProfile>) {
    const existing = this.store.get(userId);
    if (!existing) throw new Error(`User ${userId} not found`);
    const updated = { ...existing, ...updates, updatedAt: new Date() };
    this.store.set(userId, updated);
    return updated;
  }

  // For seeding
  seed(profile: LearnerProfile) { this.store.set(profile.userId, profile); }
}

// ── Skills ───────────────────────────────────────────────────

class InMemorySkillRepository implements SkillRepository {
  readonly name = 'InMemorySkillRepository';
  private store = new Map<string, Skill>();

  seed(skills: Skill[]) { skills.forEach(s => this.store.set(s.id, s)); }

  async getAllSkills(domain: string) {
    return Array.from(this.store.values()).filter(s => s.domain === domain);
  }

  async getSkillById(id: string) {
    return this.store.get(id) ?? null;
  }

  async getPrerequisites(skillId: string) {
    const skill = this.store.get(skillId);
    if (!skill) return [];
    return skill.prerequisites
      .map(id => this.store.get(id))
      .filter((s): s is Skill => s !== undefined);
  }

  async getDependents(skillId: string) {
    return Array.from(this.store.values()).filter(s => s.prerequisites.includes(skillId));
  }
}

// ── Items ─────────────────────────────────────────────────────

class InMemoryItemRepository implements ItemRepository {
  readonly name = 'InMemoryItemRepository';
  private store = new Map<string, AssessmentItem>();

  seed(items: AssessmentItem[]) { items.forEach(i => this.store.set(i.id, i)); }

  async getItemById(id: string) { return this.store.get(id) ?? null; }

  async getItemsBySkill(skillId: string) {
    return Array.from(this.store.values()).filter(
      i => i.skillMappings.some(m => m.skillId === skillId)
    );
  }

  async getItemsByDomain(domain: string) {
    return Array.from(this.store.values()).filter(i => i.domain === domain);
  }

  async getItemsByIds(ids: string[]) {
    return ids.map(id => this.store.get(id)).filter((i): i is AssessmentItem => i !== undefined);
  }
}

// ── Evidence ─────────────────────────────────────────────────

class InMemoryEvidenceRepository implements EvidenceRepository {
  readonly name = 'InMemoryEvidenceRepository';
  private store: Evidence[] = [];

  async saveEvidence(e: Omit<Evidence, 'id'>) {
    const evidence: Evidence = { ...e, id: generateId() };
    this.store.push(evidence);
    return evidence;
  }

  async getEvidenceForUser(userId: string, options?: { skillId?: string; since?: Date; limit?: number }) {
    let result = this.store.filter(e => e.learnerId === userId);
    if (options?.skillId) result = result.filter(e => e.skillId === options.skillId);
    if (options?.since) result = result.filter(e => e.createdAt >= options.since!);
    if (options?.limit) result = result.slice(-options.limit);
    return result;
  }

  async getEvidenceForItem(itemId: string) {
    return this.store.filter(e => e.itemId === itemId);
  }

  seed(evidence: Evidence[]) { this.store.push(...evidence); }
}

// ── Learner States ────────────────────────────────────────────

class InMemoryLearnerStateRepository implements LearnerStateRepository {
  readonly name = 'InMemoryLearnerStateRepository';
  private store = new Map<string, LearnerSkillState>();

  private key(userId: string, skillId: string) { return `${userId}::${skillId}`; }

  async getState(userId: string, skillId: string) {
    return this.store.get(this.key(userId, skillId)) ?? null;
  }

  async getAllStates(userId: string, domain: string) {
    // domain filter is handled at engine level — return all for user for now
    return Array.from(this.store.values()).filter(s => s.userId === userId);
  }

  async saveState(state: LearnerSkillState) {
    this.store.set(this.key(state.userId, state.skillId), state);
    return state;
  }

  async bulkSaveStates(states: LearnerSkillState[]) {
    for (const s of states) this.store.set(this.key(s.userId, s.skillId), s);
  }

  seed(states: LearnerSkillState[]) {
    for (const s of states) this.store.set(this.key(s.userId, s.skillId), s);
  }
}

// ── Assessment Sessions ────────────────────────────────────────

class InMemoryAssessmentRepository implements AssessmentRepository {
  readonly name = 'InMemoryAssessmentRepository';
  private store = new Map<string, AssessmentSession>();

  async createSession(session: Omit<AssessmentSession, 'id'>) {
    const full: AssessmentSession = { ...session, id: generateId() };
    this.store.set(full.id, full);
    return full;
  }

  async updateSession(id: string, updates: Partial<AssessmentSession>) {
    const existing = this.store.get(id);
    if (!existing) throw new Error(`Session ${id} not found`);
    const updated = { ...existing, ...updates };
    this.store.set(id, updated);
    return updated;
  }

  async getSession(id: string) { return this.store.get(id) ?? null; }

  async getSessionsForUser(userId: string) {
    return Array.from(this.store.values()).filter(s => s.userId === userId);
  }
}

// ── Recommendations ────────────────────────────────────────────

type StoredRec = Recommendation & { userId: string };

class InMemoryRecommendationRepository implements RecommendationRepository {
  readonly name = 'InMemoryRecommendationRepository';
  private store: StoredRec[] = [];

  async saveRecommendation(rec: StoredRec) { this.store.push(rec); }

  async getLatestRecommendation(userId: string) {
    const recs = this.store.filter(r => r.userId === userId);
    return recs.length > 0 ? recs[recs.length - 1] : null;
  }

  async getRecommendationHistory(userId: string, limit = 10) {
    return this.store.filter(r => r.userId === userId).slice(-limit);
  }
}

// ── Consent ───────────────────────────────────────────────────

class InMemoryConsentRepository implements ConsentRepository {
  readonly name = 'InMemoryConsentRepository';
  private store = new Map<string, ConsentRecord>();

  private key(userId: string, category: ConsentCategory) { return `${userId}::${category}`; }

  async getConsent(userId: string, category: ConsentCategory) {
    return this.store.get(this.key(userId, category)) ?? null;
  }

  async getAllConsents(userId: string) {
    return Array.from(this.store.values()).filter(c => c.userId === userId);
  }

  async grantConsent(userId: string, category: ConsentCategory) {
    const existing = await this.getConsent(userId, category);
    const record: ConsentRecord = {
      userId,
      category,
      granted: true,
      purpose: existing?.purpose ?? { en: '', ar: '' },
      grantedAt: new Date(),
      revokedAt: undefined,
    };
    this.store.set(this.key(userId, category), record);
    return record;
  }

  async revokeConsent(userId: string, category: ConsentCategory) {
    const existing = await this.getConsent(userId, category);
    const record: ConsentRecord = {
      ...(existing ?? {
        userId,
        category,
        granted: false,
        purpose: { en: '', ar: '' },
      }),
      granted: false,
      revokedAt: new Date(),
    } as ConsentRecord;
    this.store.set(this.key(userId, category), record);
    return record;
  }

  seed(records: ConsentRecord[]) {
    records.forEach(r => this.store.set(this.key(r.userId, r.category), r));
  }
}

// ── Lab ───────────────────────────────────────────────────────

class InMemoryLabRepository implements LabRepository {
  readonly name = 'InMemoryLabRepository';
  private store: LabAttempt[] = [];

  async saveAttempt(attempt: Omit<LabAttempt, 'id'>) {
    const full: LabAttempt = { ...attempt, id: generateId() };
    this.store.push(full);
    return full;
  }

  async getAttempts(userId: string, scenarioId: string) {
    return this.store.filter(a => a.userId === userId && a.scenarioId === scenarioId);
  }
}

// ── Goals ─────────────────────────────────────────────────────

class InMemoryGoalRepository implements GoalRepository {
  readonly name = 'InMemoryGoalRepository';
  private store: LearningGoal[] = [];

  async saveGoal(goal: Omit<LearningGoal, 'id' | 'createdAt'>) {
    const full: LearningGoal = { ...goal, id: generateId(), createdAt: new Date() };
    this.store.push(full);
    return full;
  }

  async getActiveGoal(userId: string) {
    return this.store.findLast(g => g.userId === userId) ?? null;
  }

  seed(goals: LearningGoal[]) { this.store.push(...goals); }
}

// ── Container ─────────────────────────────────────────────────

export class InMemoryRepositoryContainer implements RepositoryContainer {
  readonly users = new InMemoryUserRepository();
  readonly skills = new InMemorySkillRepository();
  readonly items = new InMemoryItemRepository();
  readonly evidence = new InMemoryEvidenceRepository();
  readonly learnerStates = new InMemoryLearnerStateRepository();
  readonly assessments = new InMemoryAssessmentRepository();
  readonly recommendations = new InMemoryRecommendationRepository();
  readonly consent = new InMemoryConsentRepository();
  readonly lab = new InMemoryLabRepository();
  readonly goals = new InMemoryGoalRepository();
}

// Singleton for demo/test use
export const demoRepository = new InMemoryRepositoryContainer();
