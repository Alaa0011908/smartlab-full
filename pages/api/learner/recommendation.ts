// pages/api/learner/recommendation.ts
// GET /api/learner/recommendation?userId=xxx
// RecommendationEngine → LearningAction → Coach message

import type { NextApiRequest, NextApiResponse } from 'next';
import { demoRepository } from '../../../lib/repositories/InMemoryRepository';
import { RecommendationEngine } from '../../../lib/recommendation/RecommendationEngine';
import { LearningCoach } from '../../../lib/ai/LearningCoach';
import { DeepseekProvider, MockLLMProvider } from '../../../lib/ai/LLMProvider';
import { NETWORKING_SKILLS } from '../../../data/networking/skills';
import { seedDemoData, ALEX_USER_ID } from '../../../scripts/seedDemoData';
import type { LearningAction } from '../../../lib/domain/types';

let seeded = false;
async function ensureSeeded() {
  if (!seeded) { await seedDemoData(demoRepository); seeded = true; }
}

// Available learning actions for networking domain
const AVAILABLE_ACTIONS: LearningAction[] = [
  {
    id: 'action_subnet_practice',
    type: 'practice',
    title: { en: 'Subnetting Targeted Practice', ar: 'تدريب مكثّف على تقسيم الشبكات' },
    description: { en: '10 subnetting problems focused on CIDR boundary calculation', ar: '10 مسائل لتقسيم الشبكات مركّزة على حساب حدود CIDR' },
    targetSkills: ['subnetting', 'cidr', 'binary_math'],
    estimatedDurationMinutes: 15,
    difficulty: 0.75,
  },
  {
    id: 'action_troubleshoot_lab',
    type: 'troubleshooting_lab',
    title: { en: '8-Minute Network Troubleshooting Lab', ar: 'مختبر استكشاف أخطاء الشبكة (8 دقائق)' },
    description: { en: 'Simulate and fix a real network fault — PC1→Router→PC2', ar: 'محاكاة وإصلاح عطل شبكة حقيقي — PC1→Router→PC2' },
    targetSkills: ['troubleshoot_fund', 'verification', 'layer_diagnosis'],
    estimatedDurationMinutes: 8,
    difficulty: 0.65,
    url: '/lab',
  },
  {
    id: 'action_routing_lesson',
    type: 'lesson',
    title: { en: 'Routing Fundamentals Lesson', ar: 'درس أساسيات التوجيه' },
    description: { en: 'Interactive lesson on routing table, static routes, and longest prefix match', ar: 'درس تفاعلي حول جدول التوجيه والمسارات الثابتة وتطابق أطول بادئة' },
    targetSkills: ['routing_fund', 'static_routing', 'routing_table'],
    estimatedDurationMinutes: 20,
    difficulty: 0.55,
  },
  {
    id: 'action_binary_review',
    type: 'review',
    title: { en: 'Binary Math Review', ar: 'مراجعة الرياضيات الثنائية' },
    description: { en: 'Quick review of decimal-binary conversion for subnet work', ar: 'مراجعة سريعة للتحويل بين العشري والثنائي لعمل الشبكات الفرعية' },
    targetSkills: ['binary_math'],
    estimatedDurationMinutes: 10,
    difficulty: 0.45,
  },
  {
    id: 'action_diagnostic',
    type: 'diagnostic_question',
    title: { en: 'Skill Diagnostic Assessment', ar: 'تقييم تشخيصي للمهارات' },
    description: { en: 'Gather more evidence on uncertain skills', ar: 'جمع المزيد من الأدلة على المهارات غير المؤكدة' },
    targetSkills: ['arp', 'stp', 'nat'],
    estimatedDurationMinutes: 5,
    difficulty: 0.50,
  },
  {
    id: 'action_transfer_subnet',
    type: 'transfer_task',
    title: { en: 'Network Design Challenge', ar: 'تحدي تصميم الشبكة' },
    description: { en: 'Design subnet allocation for a 5-department company network', ar: 'تصميم تخصيص الشبكات الفرعية لشبكة شركة من 5 أقسام' },
    targetSkills: ['subnetting', 'problem_decomposition'],
    estimatedDurationMinutes: 12,
    difficulty: 0.85,
  },
];

const recommendationEngine = new RecommendationEngine();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  await ensureSeeded();

  const userId = (req.query.userId as string) ?? ALEX_USER_ID;
  const locale = (req.query.locale as 'en' | 'ar') ?? 'en';

  try {
    const [states, goal, consents, profile] = await Promise.all([
      demoRepository.learnerStates.getAllStates(userId, 'networking'),
      demoRepository.goals.getActiveGoal(userId),
      demoRepository.consent.getAllConsents(userId),
      demoRepository.users.getProfile(userId),
    ]);

    // 1. Run Recommendation Engine (deterministic)
    const recommendation = recommendationEngine.generate({
      learnerStates: states,
      goal,
      availableActions: AVAILABLE_ACTIONS,
      skills: NETWORKING_SKILLS,
      locale,
    });

    if (!recommendation) {
      return res.status(200).json({ recommendation: null, coachMessage: null });
    }

    // 2. Save recommendation
    await demoRepository.recommendations.saveRecommendation({
      ...recommendation,
      userId,
    });

    // 3. Coach formats recommendation for learner
    const useMockLLM = process.env.LLM_PROVIDER === 'mock' || !process.env.DEEPSEEK_API_KEY;
    const llm = useMockLLM
      ? new MockLLMProvider()
      : new DeepseekProvider(process.env.DEEPSEEK_API_KEY!);
    const coach = new LearningCoach(llm, locale);
    const coachMessage = await coach.explain(
      recommendation,
      states,
      profile?.coachingStyle ?? 'direct',
      consents,
    );

    return res.status(200).json({
      recommendation: {
        action: recommendation.action,
        reason: recommendation.reason,
        priority: recommendation.priority,
        expectedBenefit: recommendation.expectedBenefit,
        confidence: recommendation.confidence,
        targetSkills: recommendation.targetSkills,
        evidenceSummary: recommendation.evidenceSummary,
      },
      coachMessage: {
        text: coachMessage.text,
        style: coachMessage.coachingStyle,
        usedFallback: coachMessage.usedFallback,
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('/api/learner/recommendation error:', error);
    return res.status(500).json({ error: 'Failed to generate recommendation' });
  }
}
