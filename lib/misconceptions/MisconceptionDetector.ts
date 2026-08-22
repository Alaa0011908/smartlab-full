// lib/misconceptions/MisconceptionDetector.ts
// ============================================================
// Misconception Detection Engine
//
// Rules:
// 1. A misconception is NEVER declared from a single wrong answer.
// 2. LLM may *suggest* a misconception; it is NOT the authority.
// 3. Evidence accumulation must reach evidenceThreshold before flagging.
// 4. Confidence in the misconception grows with evidence.
// ============================================================

import type {
  Evidence,
  Misconception,
  MisconceptionEvidence,
  AssessmentItem,
} from '../domain/types';

export interface MisconceptionSuggestion {
  misconceptionId: string;
  confidence: number;    // 0.0–1.0 — system's belief this is real
  triggeringItemId?: string;
  reason: string;
}

export interface MisconceptionDetectionResult {
  confirmed: MisconceptionEvidence[];   // above threshold
  suspected: MisconceptionSuggestion[]; // below threshold — not yet flagged
}

export class MisconceptionDetector {
  constructor(private readonly library: Misconception[]) {}

  /**
   * Analyze a batch of evidence for a learner and detect misconceptions.
   * Does NOT use LLM — pure deterministic rule engine.
   * LLM suggestions can be passed via llmHints parameter to supplement.
   */
  detect(
    learnerId: string,
    evidenceHistory: Evidence[],
    items: AssessmentItem[],
    llmHints: MisconceptionSuggestion[] = [],
  ): MisconceptionDetectionResult {
    const evidenceMap = new Map<string, MisconceptionEvidence>();

    for (const ev of evidenceHistory) {
      if (!ev.itemId || ev.correctness === undefined) continue;
      if (ev.correctness >= 0.5) continue; // correct response — no misconception signal

      const item = items.find(i => i.id === ev.itemId);
      if (!item) continue;

      // Check if the selected answer maps to a misconception
      // We look at the selected option ID in ev.rawResponse
      let specificMisconceptionId = null;
      if (ev.rawResponse && item.options) {
        const selectedOption = item.options.find(o => o.id === ev.rawResponse);
        if (selectedOption?.misconceptionId) {
          specificMisconceptionId = selectedOption.misconceptionId;
        }
      }

      // If a specific misconception was triggered by the option selected
      if (specificMisconceptionId) {
        const misc = this.library.find(m => m.id === specificMisconceptionId);
        if (misc) {
          const existing = evidenceMap.get(misc.id);
          const now = new Date();

          if (existing) {
            evidenceMap.set(misc.id, {
              ...existing,
              evidenceCount: existing.evidenceCount + 1,
              confidence: Math.min(0.95, existing.confidence + 0.25), // Stronger signal from specific option
              lastObservedAt: now,
            });
          } else {
            evidenceMap.set(misc.id, {
              misconceptionId: misc.id,
              evidenceCount: 1,
              confidence: 0.3, // Single observation from specific option
              firstObservedAt: ev.createdAt,
              lastObservedAt: now,
            });
          }
        }
      } else {
        // Fallback: If no specific option was selected (e.g., short answer),
        // we lightly increment suspected misconceptions for the related skills.
        for (const mapping of item.skillMappings) {
          const relatedMisconceptions = this.library.filter(m =>
            m.associatedSkills.includes(mapping.skillId)
          );

          for (const misc of relatedMisconceptions) {
            const existing = evidenceMap.get(misc.id);
            const now = new Date();

            if (existing) {
              evidenceMap.set(misc.id, {
                ...existing,
                // Do not increment evidenceCount as heavily since this is just circumstantial
                confidence: Math.min(0.95, existing.confidence + 0.05),
                lastObservedAt: now,
              });
            } else {
              evidenceMap.set(misc.id, {
                misconceptionId: misc.id,
                evidenceCount: 0.5, // Partial evidence
                confidence: 0.1, // Very low confidence
                firstObservedAt: ev.createdAt,
                lastObservedAt: now,
              });
            }
          }
        }
      }
    }

    // Incorporate LLM hints (lower weight — LLM cannot be sole authority)
    for (const hint of llmHints) {
      const existing = evidenceMap.get(hint.misconceptionId);
      if (existing) {
        evidenceMap.set(hint.misconceptionId, {
          ...existing,
          confidence: Math.min(0.95, existing.confidence + hint.confidence * 0.2),
        });
      }
    }

    const misc = this.library;
    const confirmed: MisconceptionEvidence[] = [];
    const suspected: MisconceptionSuggestion[] = [];

    for (const [id, evidence] of evidenceMap) {
      const definition = misc.find(m => m.id === id);
      const threshold = definition?.evidenceThreshold ?? 2;

      if (evidence.evidenceCount >= threshold && evidence.confidence >= 0.4) {
        confirmed.push(evidence);
      } else {
        suspected.push({
          misconceptionId: id,
          confidence: evidence.confidence,
          reason: `${evidence.evidenceCount} observations below threshold of ${threshold}`,
        });
      }
    }

    return { confirmed, suspected };
  }
}
