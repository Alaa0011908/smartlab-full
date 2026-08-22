// pages/api/learner/state.ts
// GET /api/learner/state?userId=xxx
// Returns learner's full skill states, goal, and recent recommendation.
// The frontend NEVER computes mastery — it reads from here.

import type { NextApiRequest, NextApiResponse } from 'next';
import { demoRepository } from '../../../lib/repositories/InMemoryRepository';
import { seedDemoData, ALEX_USER_ID } from '../../../scripts/seedDemoData';

let seeded = false;

async function ensureSeeded() {
  if (!seeded) {
    await seedDemoData(demoRepository);
    seeded = true;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  await ensureSeeded();

  const userId = (req.query.userId as string) ?? ALEX_USER_ID;

  try {
    const [states, goal, profile] = await Promise.all([
      demoRepository.learnerStates.getAllStates(userId, 'networking'),
      demoRepository.goals.getActiveGoal(userId),
      demoRepository.users.getProfile(userId),
    ]);

    return res.status(200).json({
      userId,
      profile,
      goal,
      skillStates: states,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('/api/learner/state error:', error);
    return res.status(500).json({ error: 'Failed to retrieve learner state' });
  }
}
