// scripts/seedDemoData.ts
// ============================================================
// Demo Seed: "Alex" — Learner with mixed ability profile
//
// IMPORTANT: This seeds INITIAL STATE only.
// All derived values (mastery, recommendations, coach messages)
// are calculated dynamically by the real engine — not hardcoded.
//
// Alex's profile:
//   Strong: IPv4 fundamentals, Ethernet, VLAN
//   Developing: Routing fundamentals
//   Weak: Subnetting (priority gap)
//   Weak: Troubleshooting (priority gap)
//   Uncertain: ARP, STP (insufficient evidence)
//   Process gap: Skips verification step
// ============================================================

import type {
  LearnerProfile,
  LearnerSkillState,
  ConsentRecord,
  LearningGoal,
} from '../lib/domain/types';
import { InMemoryRepositoryContainer } from '../lib/repositories/InMemoryRepository';
import { NETWORKING_SKILLS } from '../data/networking/skills';
import { NETWORKING_ITEMS } from '../data/networking/items';
import { NETWORKING_MISCONCEPTIONS } from '../data/networking/misconceptions';

export const ALEX_USER_ID = 'demo_alex_001';

// ── Alex's Initial LearnerSkillStates ────────────────────────
// These are seeded BEFORE any assessment in the demo.
// They represent what the engine infers from a real diagnostic.

const ALEX_STATES: Omit<LearnerSkillState, 'userId'>[] = [
  // Strong skills — high mastery, high confidence (lots of evidence)
  { skillId: 'net_fund',    mastery: 0.92, masteryUncertainty: 0.08, confidence: 0.91, evidenceCount: 12, recentPerformance: 0.90, trend: 'stable', lastObservedAt: new Date(), misconceptions: [], status: 'mastered' },
  { skillId: 'ethernet',   mastery: 0.88, masteryUncertainty: 0.10, confidence: 0.88, evidenceCount: 8,  recentPerformance: 0.88, trend: 'stable', lastObservedAt: new Date(), misconceptions: [], status: 'mastered' },
  { skillId: 'ipv4_fund',  mastery: 0.87, masteryUncertainty: 0.09, confidence: 0.90, evidenceCount: 15, recentPerformance: 0.87, trend: 'stable', lastObservedAt: new Date(), misconceptions: [], status: 'mastered' },
  { skillId: 'osi_model',  mastery: 0.82, masteryUncertainty: 0.11, confidence: 0.86, evidenceCount: 10, recentPerformance: 0.80, trend: 'stable', lastObservedAt: new Date(), misconceptions: [], status: 'mastered' },
  { skillId: 'mac_addressing', mastery: 0.79, masteryUncertainty: 0.12, confidence: 0.84, evidenceCount: 7, recentPerformance: 0.78, trend: 'stable', lastObservedAt: new Date(), misconceptions: [], status: 'mastered' },
  { skillId: 'vlan',       mastery: 0.76, masteryUncertainty: 0.13, confidence: 0.82, evidenceCount: 9, recentPerformance: 0.76, trend: 'improving', lastObservedAt: new Date(), misconceptions: [], status: 'mastered' },

  // Developing skills
  { skillId: 'routing_fund', mastery: 0.58, masteryUncertainty: 0.18, confidence: 0.72, evidenceCount: 6, recentPerformance: 0.60, trend: 'improving', lastObservedAt: new Date(), misconceptions: [], status: 'developing' },
  { skillId: 'binary_math',  mastery: 0.55, masteryUncertainty: 0.20, confidence: 0.70, evidenceCount: 8, recentPerformance: 0.55, trend: 'stable',   lastObservedAt: new Date(), misconceptions: [], status: 'developing' },
  { skillId: 'tcpip_model',  mastery: 0.62, masteryUncertainty: 0.16, confidence: 0.75, evidenceCount: 5, recentPerformance: 0.62, trend: 'stable',   lastObservedAt: new Date(), misconceptions: [], status: 'developing' },
  { skillId: 'dhcp',         mastery: 0.60, masteryUncertainty: 0.18, confidence: 0.73, evidenceCount: 4, recentPerformance: 0.60, trend: 'stable',   lastObservedAt: new Date(), misconceptions: [], status: 'developing' },
  { skillId: 'dns',          mastery: 0.58, masteryUncertainty: 0.19, confidence: 0.71, evidenceCount: 4, recentPerformance: 0.58, trend: 'stable',   lastObservedAt: new Date(), misconceptions: [], status: 'developing' },

  // PRIORITY GAPS — low mastery, enough evidence to be confident it's a gap
  {
    skillId: 'subnetting',
    mastery: 0.28, masteryUncertainty: 0.15, confidence: 0.80, evidenceCount: 14,
    recentPerformance: 0.28, trend: 'declining', lastObservedAt: new Date(),
    misconceptions: [{ misconceptionId: 'misc_cidr_boundary', evidenceCount: 4, confidence: 0.72, firstObservedAt: new Date(), lastObservedAt: new Date() }],
    status: 'needs_attention',
  },
  {
    skillId: 'troubleshoot_fund',
    mastery: 0.32, masteryUncertainty: 0.16, confidence: 0.78, evidenceCount: 11,
    recentPerformance: 0.32, trend: 'stable', lastObservedAt: new Date(),
    misconceptions: [{ misconceptionId: 'misc_skip_verification', evidenceCount: 3, confidence: 0.65, firstObservedAt: new Date(), lastObservedAt: new Date() }],
    status: 'needs_attention',
    problemSolvingIndicators: { decomposition: 0.74, hypothesisTesting: 0.67, verification: 0.36, errorRecovery: 0.58, randomTrialBehavior: 0.42 },
  },
  { skillId: 'verification', mastery: 0.30, masteryUncertainty: 0.17, confidence: 0.76, evidenceCount: 9, recentPerformance: 0.30, trend: 'stable', lastObservedAt: new Date(), misconceptions: [], status: 'needs_attention' },
  { skillId: 'cidr',         mastery: 0.38, masteryUncertainty: 0.18, confidence: 0.74, evidenceCount: 8, recentPerformance: 0.38, trend: 'stable', lastObservedAt: new Date(), misconceptions: [], status: 'needs_attention' },

  // UNCERTAIN skills — not enough evidence yet
  { skillId: 'arp',          mastery: 0.50, masteryUncertainty: 0.42, confidence: 0.30, evidenceCount: 2, recentPerformance: 0.50, trend: 'stable', lastObservedAt: new Date(), misconceptions: [], status: 'uncertain' },
  { skillId: 'stp',          mastery: 0.40, masteryUncertainty: 0.45, confidence: 0.25, evidenceCount: 1, recentPerformance: 0.40, trend: 'stable', lastObservedAt: new Date(), misconceptions: [], status: 'uncertain' },
  { skillId: 'nat',          mastery: 0.45, masteryUncertainty: 0.44, confidence: 0.27, evidenceCount: 1, recentPerformance: 0.45, trend: 'stable', lastObservedAt: new Date(), misconceptions: [], status: 'uncertain' },
];

// ── Consent: Alex has granted all categories ─────────────────
const ALEX_CONSENTS: ConsentRecord[] = [
  { userId: ALEX_USER_ID, category: 'knowledge_data',       granted: true, purpose: { en: 'Personalize your learning path', ar: 'تخصيص مسار تعلمك' }, grantedAt: new Date() },
  { userId: ALEX_USER_ID, category: 'assessment_history',   granted: true, purpose: { en: 'Track your progress over time', ar: 'تتبع تقدمك بمرور الوقت' }, grantedAt: new Date() },
  { userId: ALEX_USER_ID, category: 'learning_activity',    granted: true, purpose: { en: 'Recommend the best next activities', ar: 'التوصية بأفضل الأنشطة التالية' }, grantedAt: new Date() },
  { userId: ALEX_USER_ID, category: 'goals',                granted: true, purpose: { en: 'Align recommendations with your goals', ar: 'مواءمة التوصيات مع أهدافك' }, grantedAt: new Date() },
  { userId: ALEX_USER_ID, category: 'coach_personalization',granted: true, purpose: { en: 'Personalize coaching style and messages', ar: 'تخصيص أسلوب التدريب والرسائل' }, grantedAt: new Date() },
  { userId: ALEX_USER_ID, category: 'ai_analysis',          granted: true, purpose: { en: 'Use AI to explain recommendations', ar: 'استخدام الذكاء الاصطناعي لشرح التوصيات' }, grantedAt: new Date() },
];

// ── Seed function ─────────────────────────────────────────────

export async function seedDemoData(repo: InMemoryRepositoryContainer): Promise<void> {
  // 1. Seed skills
  repo.skills.seed(NETWORKING_SKILLS);

  // 2. Seed items
  repo.items.seed(NETWORKING_ITEMS);

  // 3. Seed Alex's profile
  const alexProfile: LearnerProfile = {
    userId: ALEX_USER_ID,
    displayName: 'Alex',
    email: 'alex@demo.smartlab.io',
    preferredLocale: 'en',
    coachingStyle: 'direct',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    updatedAt: new Date(),
  };
  repo.users.seed(alexProfile);

  // 4. Seed Alex's learner states
  const statesWithUserId = ALEX_STATES.map(s => ({ ...s, userId: ALEX_USER_ID }));
  repo.learnerStates.seed(statesWithUserId);

  // 5. Seed consent
  repo.consent.seed(ALEX_CONSENTS);

  // 6. Seed goal
  repo.goals.seed([{
    id: 'goal_alex_001',
    userId: ALEX_USER_ID,
    description: { en: 'Master Network Troubleshooting', ar: 'إتقان استكشاف أخطاء الشبكة' },
    targetSkills: ['troubleshoot_fund', 'l3_troubleshoot', 'l2_troubleshoot', 'verification', 'problem_decomposition'],
    createdAt: new Date(),
  }]);

  console.log('✅ Demo data seeded for Alex:', {
    skills: NETWORKING_SKILLS.length,
    items: NETWORKING_ITEMS.length,
    learnerStates: statesWithUserId.length,
    consents: ALEX_CONSENTS.length,
  });
}
