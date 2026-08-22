// lib/engine/AdaptiveItemSelector.ts
// ============================================================
// Adaptive Item Selector — Multi-factor CAT-style selection
//
// Factors considered:
//   1. Skill uncertainty (highest weight — find where we need evidence)
//   2. Item difficulty vs current mastery (Max Information)
//   3. Prerequisite coverage
//   4. Recent exposure (avoid repetition)
//   5. Content balancing
//   6. Assessment objective
//
// Returns full ItemSelectionResult including "Why this question?" rationale.
// ============================================================

import type {
  AssessmentItem,
  LearnerSkillState,
  ItemSelectionResult,
  ItemSelectionConstraints,
  I18nString,
  Skill,
} from '../domain/types';

interface ScoredItem {
  item: AssessmentItem;
  score: number;
  targetedSkills: string[];
  reasons: string[];
  expectedInformationGain: number;
}

export class AdaptiveItemSelector {

  /**
   * Select the next best item for a learner.
   * Always returns a full rationale for transparency ("Why this question?").
   */
  select(
    learnerStates: LearnerSkillState[],
    candidateItems: AssessmentItem[],
    constraints: ItemSelectionConstraints,
    skills: Skill[],
  ): ItemSelectionResult | null {

    if (candidateItems.length === 0) return null;

    const recentItems = new Set(constraints.excludeItemIds ?? []);

    // Filter by constraints
    let pool = candidateItems.filter(item => !recentItems.has(item.id));

    if (constraints.targetSkills && constraints.targetSkills.length > 0) {
      pool = pool.filter(item =>
        item.skillMappings.some(m => constraints.targetSkills!.includes(m.skillId))
      );
    }

    if (constraints.difficultyBounds) {
      const { min, max } = constraints.difficultyBounds;
      pool = pool.filter(i => i.difficulty >= min && i.difficulty <= max);
    }

    if (pool.length === 0) {
      // Relax constraints — fall back to full candidate list
      pool = candidateItems.filter(item => !recentItems.has(item.id));
    }

    if (pool.length === 0) pool = candidateItems; // Ultimate fallback

    // Score each item
    const stateMap = new Map<string, LearnerSkillState>(
      learnerStates.map(s => [s.skillId, s])
    );

    const scored: ScoredItem[] = pool.map(item =>
      this.scoreItem(item, stateMap, skills, constraints)
    );

    // Sort by descending score
    scored.sort((a, b) => b.score - a.score);

    const best = scored[0];

    return {
      item: best.item,
      targetedSkills: best.targetedSkills,
      reason: this.buildReason(best, constraints),
      expectedInformationGain: best.expectedInformationGain,
      preLearnerStates: best.targetedSkills
        .map(id => stateMap.get(id))
        .filter((s): s is LearnerSkillState => s !== undefined),
    };
  }

  private scoreItem(
    item: AssessmentItem,
    stateMap: Map<string, LearnerSkillState>,
    skills: Skill[],
    constraints: ItemSelectionConstraints,
  ): ScoredItem {

    let score = 0;
    const reasons: string[] = [];
    const targetedSkills: string[] = [];
    let informationGain = 0;

    for (const mapping of item.skillMappings) {
      const state = stateMap.get(mapping.skillId);
      if (!state) {
        // Unknown skill — high value to gather initial evidence
        score += mapping.weight * 0.8;
        reasons.push(`No evidence yet for ${mapping.skillId}`);
        targetedSkills.push(mapping.skillId);
        informationGain += 0.8 * mapping.weight;
        continue;
      }

      // Factor 1: Uncertainty — prioritize high-uncertainty skills
      const uncertaintyScore = state.masteryUncertainty * 1.5 * mapping.weight;
      score += uncertaintyScore;

      // Factor 2: Max Information — items near current mastery are most informative
      const difficultyMatch = 1 - Math.abs(item.difficulty - state.mastery);
      const infoScore = difficultyMatch * 4 * state.mastery * (1 - state.mastery);
      score += infoScore * mapping.weight;
      informationGain += infoScore * mapping.weight;

      // Factor 3: Needs attention bonus
      if (state.status === 'needs_attention') {
        score += 0.3 * mapping.weight;
        reasons.push(`${mapping.skillId} needs attention (mastery ${(state.mastery * 100).toFixed(0)}%)`);
      } else if (state.status === 'uncertain') {
        score += 0.5 * mapping.weight;
        reasons.push(`${mapping.skillId} needs more evidence (confidence ${(state.confidence * 100).toFixed(0)}%)`);
      }

      // Factor 4: Prerequisite coverage
      const skill = skills.find(s => s.id === mapping.skillId);
      if (skill && skill.prerequisites.length > 0) {
        const allPrereqsMet = skill.prerequisites.every(pId => {
          const prereqState = stateMap.get(pId);
          return prereqState && prereqState.mastery >= 0.6;
        });
        if (allPrereqsMet) {
          score += 0.2 * mapping.weight;
        } else {
          // Prefer prerequisite items instead (Heavy penalty)
          score -= 2.0 * mapping.weight;
        }
      }

      // Factor 5: Objective bonus
      if (constraints.objective === 'diagnostic' && state.evidenceCount < 3) {
        score += 0.4 * mapping.weight;
        reasons.push(`Low evidence count for ${mapping.skillId}`);
      }

      if (mapping.role === 'primary') targetedSkills.push(mapping.skillId);
    }

    return {
      item,
      score: Math.max(0, score),
      targetedSkills: targetedSkills.length > 0 ? targetedSkills : [item.skillMappings[0]?.skillId].filter(Boolean) as string[],
      reasons,
      expectedInformationGain: informationGain,
    };
  }

  private buildReason(scored: ScoredItem, constraints: ItemSelectionConstraints): I18nString {
    const mainReason = scored.reasons.slice(0, 2).join('; ');
    const objective = constraints.objective;

    const en = `This ${objective} question was selected because: ${mainReason || 'it covers target skills at appropriate difficulty'}. Expected information gain: ${scored.expectedInformationGain.toFixed(2)}.`;

    const ar = `تم اختيار هذا السؤال (${objective}) لأن: ${mainReason || 'يغطي المهارات المستهدفة بصعوبة مناسبة'}. معلومات متوقعة: ${scored.expectedInformationGain.toFixed(2)}.`;

    return { en, ar };
  }
}
