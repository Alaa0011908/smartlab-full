// lib/engine/MeasurementEngine.js
import { LearnerState } from '../domain/models.js';

/**
 * Abstract Measurement Engine
 * 
 * Supports Classical Test Theory, 1PL/Rasch approximation.
 * Provides interfaces for MIRT/CDM in the future.
 */
export class MeasurementEngine {
  
  /**
   * Updates a learner's state using a Bayesian Knowledge Tracing / 1PL approximation.
   * 
   * @param {LearnerState} currentState 
   * @param {ResponseEvidence} evidence 
   * @param {AssessmentItem} item 
   * @returns {LearnerState} updated state
   */
  updateMastery(currentState, evidence, item) {
    // 1. Identify which skill this item primarily maps to (simplification for MVP: use the first mapping)
    const primarySkill = item.skillMappings[0]; 
    const itemDifficulty = primarySkill ? primarySkill.weight : 0.5; // proxy for item difficulty

    // 2. Bayesian update approximation
    const priorMastery = currentState.mastery;
    const priorConfidence = currentState.confidence;
    
    // Learning rate (alpha) depends on current confidence. Lower confidence -> higher update jump
    const alpha = 0.2 * (1 - priorConfidence + 0.1); 
    
    let newMastery;
    if (evidence.isCorrect) {
      // If correct on a hard question, mastery goes up more
      const boost = (itemDifficulty * alpha);
      newMastery = Math.min(0.99, priorMastery + boost);
    } else {
      // If incorrect on an easy question, mastery goes down more
      const penalty = ((1 - itemDifficulty) * alpha);
      newMastery = Math.max(0.01, priorMastery - penalty);
    }

    // 3. Update Confidence
    // Every piece of evidence increases confidence logarithmically
    const newEvidenceCount = currentState.evidenceCount + 1;
    const newConfidence = Math.min(0.95, priorConfidence + (0.1 / Math.sqrt(newEvidenceCount)));

    // 4. Update Trend
    let newTrend = currentState.recentTrend;
    if (newMastery - priorMastery > 0.05) newTrend = 'improving';
    else if (priorMastery - newMastery > 0.05) newTrend = 'declining';
    else newTrend = 'stable';

    return new LearnerState({
      userId: currentState.userId,
      skillId: currentState.skillId,
      mastery: newMastery,
      confidence: newConfidence,
      evidenceCount: newEvidenceCount,
      recentTrend: newTrend
    });
  }

  /**
   * Selects the next best item (CAT approximation)
   * Goal: Maximize information by picking an item whose difficulty matches current mastery
   * OR target skills with low confidence.
   */
  selectNextItem(learnerStates, availableItems) {
    // 1. Find the skill we need the most information on (low confidence, high priority)
    const uncertainStates = learnerStates
      .filter(s => s.confidence < 0.6)
      .sort((a, b) => a.confidence - b.confidence);
    
    if (uncertainStates.length === 0) {
      // If we are confident in everything, pick something random or challenging to verify retention
      return availableItems[Math.floor(Math.random() * availableItems.length)];
    }

    const targetSkillId = uncertainStates[0].skillId;
    const targetMastery = uncertainStates[0].mastery;

    // 2. Find an item mapped to this skill whose difficulty is closest to targetMastery (Max Info)
    const candidateItems = availableItems.filter(item => 
      item.skillMappings.some(map => map.skillId === targetSkillId)
    );

    if (candidateItems.length === 0) return availableItems[0]; // Fallback

    return candidateItems.reduce((bestItem, currentItem) => {
      const bestMapping = bestItem.skillMappings.find(m => m.skillId === targetSkillId) || { weight: 0.5 };
      const currMapping = currentItem.skillMappings.find(m => m.skillId === targetSkillId) || { weight: 0.5 };
      
      const bestDiff = Math.abs(bestMapping.weight - targetMastery);
      const currDiff = Math.abs(currMapping.weight - targetMastery);

      return (currDiff < bestDiff) ? currentItem : bestItem;
    }, candidateItems[0]);
  }
}
