// pages/api/assessment/response.ts
// POST /api/assessment/response
// Submits a response → collects evidence → updates learner state via engine.
// Frontend NEVER updates mastery directly.

import type { NextApiRequest, NextApiResponse } from 'next';
import { demoRepository } from '../../../lib/repositories/InMemoryRepository';
import { EvidenceCollector } from '../../../lib/evidence/EvidenceCollector';
import { LegacyMeasurementAdapter as MeasurementEngine } from '../../../infrastructure/legacy/LegacyMeasurementAdapter';
import { LegacyKnowledgeAdapter as BKTModel } from '../../../infrastructure/legacy/LegacyKnowledgeAdapter';
import { seedDemoData, ALEX_USER_ID } from '../../../scripts/seedDemoData';
import type { LearnerSkillState } from '../../../lib/domain/types';

let seeded = false;
async function ensureSeeded() {
  if (!seeded) { await seedDemoData(demoRepository); seeded = true; }
}

const measurementEngine = new MeasurementEngine();
const evidenceCollector = new EvidenceCollector(demoRepository.evidence);
const ktModel = new BKTModel();

interface ResponseBody {
  userId?: string;
  itemId: string;
  skillId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  responseTimeMs: number;
  userReportedConfidence?: number;
  sessionId?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  await ensureSeeded();

  const body = req.body as ResponseBody;
  const userId = body.userId ?? ALEX_USER_ID;

  try {
    // 1. Collect evidence
    const evidence = await evidenceCollector.collectMCQResponse({
      learnerId: userId,
      itemId: body.itemId,
      skillId: body.skillId,
      selectedOptionId: body.selectedOptionId,
      isCorrect: body.isCorrect,
      responseTimeMs: body.responseTimeMs,
      userReportedConfidence: body.userReportedConfidence,
      sessionId: body.sessionId,
    });

    // 2. Get current state for this skill
    let priorState = await demoRepository.learnerStates.getState(userId, body.skillId);

    // Initialize state if not exists
    if (!priorState) {
      priorState = {
        userId,
        skillId: body.skillId,
        mastery: 0.1,
        masteryUncertainty: 0.5,
        confidence: 0.1,
        evidenceCount: 0,
        recentPerformance: 0.5,
        trend: 'stable',
        lastObservedAt: new Date(),
        misconceptions: [],
        status: 'uncertain',
      } as LearnerSkillState;
    }

    // 3. Update via Measurement Engine (Evidence → State)
    const { result, updatedState } = measurementEngine.processEvidence(
      priorState,
      [evidence],
    );

    // 4. Also apply BKT for comparison/logging
    const bktState = ktModel.updateState(priorState, evidence);

    // 5. Save updated state
    await demoRepository.learnerStates.saveState(updatedState);

    return res.status(200).json({
      evidenceId: evidence.id,
      correct: body.isCorrect,
      measurement: {
        model: result.model,
        calibrationStatus: result.calibrationStatus,
        masteryBefore: priorState.mastery,
        masteryAfter: updatedState.mastery,
        uncertainty: result.uncertainty,
      },
      updatedState: {
        skillId: updatedState.skillId,
        mastery: updatedState.mastery,
        masteryUncertainty: updatedState.masteryUncertainty,
        confidence: updatedState.confidence,
        trend: updatedState.trend,
        status: updatedState.status,
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('/api/assessment/response error:', error);
    return res.status(500).json({ error: 'Failed to process response' });
  }
}
