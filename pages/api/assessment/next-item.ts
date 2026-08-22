// pages/api/assessment/next-item.ts
// GET /api/assessment/next-item?userId=xxx&sessionId=xxx&objective=diagnostic
// Returns the next best item + "Why this question?" rationale.

import type { NextApiRequest, NextApiResponse } from 'next';
import { demoRepository } from '../../../lib/repositories/InMemoryRepository';
import { AdaptiveItemSelector } from '../../../lib/engine/AdaptiveItemSelector';
import { NETWORKING_SKILLS } from '../../../data/networking/skills';
import { seedDemoData, ALEX_USER_ID } from '../../../scripts/seedDemoData';
import type { AssessmentObjective } from '../../../lib/domain/types';

let seeded = false;
async function ensureSeeded() {
  if (!seeded) { await seedDemoData(demoRepository); seeded = true; }
}

const selector = new AdaptiveItemSelector();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  await ensureSeeded();

  const userId = (req.query.userId as string) ?? ALEX_USER_ID;
  const objective = (req.query.objective as AssessmentObjective) ?? 'diagnostic';
  const excludeRaw = req.query.exclude as string | undefined;
  const excludeIds = excludeRaw ? excludeRaw.split(',') : [];

  try {
    const [states, allItems] = await Promise.all([
      demoRepository.learnerStates.getAllStates(userId, 'networking'),
      demoRepository.items.getItemsByDomain('networking'),
    ]);

    const result = selector.select(states, allItems, {
      objective,
      excludeItemIds: excludeIds,
    }, NETWORKING_SKILLS);

    if (!result) {
      return res.status(404).json({ error: 'No suitable item found' });
    }

    return res.status(200).json({
      item: {
        id: result.item.id,
        text: result.item.text,
        type: result.item.type,
        options: result.item.options,
        hints: result.item.hints,
        difficulty: result.item.difficulty,
      },
      selection: {
        targetedSkills: result.targetedSkills,
        reason: result.reason,
        expectedInformationGain: result.expectedInformationGain,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('/api/assessment/next-item error:', error);
    return res.status(500).json({ error: 'Failed to select next item' });
  }
}
