// pages/api/lab/complete.ts
// POST /api/lab/complete
// Records lab action sequence as evidence → updates LearnerState

import type { NextApiRequest, NextApiResponse } from 'next';
import { demoRepository } from '../../../lib/repositories/InMemoryRepository';
import { EvidenceCollector } from '../../../lib/evidence/EvidenceCollector';
import { MeasurementEngine } from '../../../lib/engine/MeasurementEngine';
import { seedDemoData, ALEX_USER_ID } from '../../../scripts/seedDemoData';

let seeded = false;
async function ensureSeeded() {
  if (!seeded) { await seedDemoData(demoRepository); seeded = true; }
}

const collector = new EvidenceCollector(demoRepository.evidence);
const engine = new MeasurementEngine();

interface LabCompleteBody {
  userId?: string;
  scenarioId: string;
  actions: Array<{ command: string; timestamp: string; timeFromStart: number }>;
  solved: boolean;
  verified: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  await ensureSeeded();

  const body = req.body as LabCompleteBody;
  const userId = body.userId ?? ALEX_USER_ID;

  // Derive process-level indicators from action sequence
  const usedRoutingTable = body.actions.some(a => a.command.includes('show ip route'));
  const didVerify = body.actions.some(a => a.command.includes('verify'));
  const randomCommands = body.actions.filter(a =>
    !['ping', 'show', 'fix', 'help'].some(valid => a.command.startsWith(valid))
  ).length;
  const totalTimeMs = body.actions.length > 0
    ? body.actions[body.actions.length - 1].timeFromStart
    : 0;

  // Collect practical task evidence for multiple skills
  const targetSkills = ['troubleshoot_fund', 'verification', 'layer_diagnosis', 'routing_table'];

  try {
    const evidences = await collector.collectPracticalTaskEvidence({
      learnerId: userId,
      scenarioId: body.scenarioId,
      skillIds: targetSkills,
      actionSequence: body.actions.map(a => ({
        actionType: a.command.startsWith('show') ? 'diagnostic_command'
          : a.command.startsWith('fix') ? 'configuration_change'
          : 'ping_test',
        timestamp: new Date(a.timestamp),
        metadata: {
          command: a.command,
          timeFromStartMs: a.timeFromStart,
          isCorrect: body.solved
        },
      })),
      solved: body.solved,
      totalTimeMs,
    });

    // Update learner states
    const updates = [];
    for (const ev of evidences) {
      const priorState = await demoRepository.learnerStates.getState(userId, ev.skillId!);
      if (priorState) {
        const { updatedState } = engine.processEvidence(priorState, [ev]);

        // Override: set process indicators from lab behavior
        if (ev.skillId === 'troubleshoot_fund') {
          updatedState.problemSolvingIndicators = {
            decomposition: usedRoutingTable ? 0.8 : 0.5,
            hypothesisTesting: usedRoutingTable ? 0.75 : 0.4,
            verification: didVerify ? 0.85 : 0.2,
            errorRecovery: body.solved ? 0.7 : 0.4,
            randomTrialBehavior: Math.min(1, randomCommands / 5),
          };
        }

        await demoRepository.learnerStates.saveState(updatedState);
        updates.push({ skillId: updatedState.skillId, newMastery: updatedState.mastery });
      }
    }

    return res.status(200).json({
      success: true,
      evidenceCount: evidences.length,
      processIndicators: { usedRoutingTable, didVerify, randomCommands, totalTimeMs },
      stateUpdates: updates,
    });

  } catch (error) {
    console.error('/api/lab/complete error:', error);
    return res.status(500).json({ error: 'Failed to process lab evidence' });
  }
}
