const fs = require('fs');

console.log("==================================================");
console.log("   ALEX END-TO-END CORE SIMULATION");
console.log("==================================================\n");

// --- CORE ENGINE LOGIC COPIED FOR OFFLINE SIMULATION ---

function updateMeasurement(mastery, uncertainty, difficulty, correct) {
  const safeMastery = Math.max(0.01, Math.min(0.99, mastery));
  const theta = Math.log(safeMastery / (1 - safeMastery));
  
  const safeDiff = Math.max(0.01, Math.min(0.99, difficulty));
  const b = Math.log(safeDiff / (1 - safeDiff));

  const pCorrect = 1 / (1 + Math.exp(-(theta - b)));
  
  const learningRate = 0.5 + uncertainty;
  const actual = correct ? 1 : 0;
  
  const newTheta = theta + learningRate * (actual - pCorrect);
  const newMastery = 1 / (1 + Math.exp(-newTheta));
  const newUncertainty = Math.max(0.05, uncertainty * Math.exp(-0.1));
  
  return { newMastery, newUncertainty };
}

function scoreRecommendationAction(action, states) {
  let score = 0;
  let targetSkills = action.targetSkills;
  
  for (const skillId of targetSkills) {
    const state = states.find(s => s.skillId === skillId);
    if (!state) { score += 0.5; continue; }
    
    if (state.mastery < 0.6 && state.confidence >= 0.5) score += 0.9;
    if (state.evidenceCount < 3) score += 0.7;
    if (state.mastery >= 0.6 && state.mastery < 0.8) score += 0.4;
  }

  if (targetSkills.length > 0) score = score / targetSkills.length;
  return { action, score };
}

// --- SIMULATION DATA ---

const MOCK_ITEMS = [
  { id: 'item_1', difficulty: 0.5, skillMappings: [{skillId: 'skill_subnetting'}] },
  { id: 'item_2', difficulty: 0.6, skillMappings: [{skillId: 'skill_subnetting'}] },
  { id: 'item_3', difficulty: 0.7, skillMappings: [{skillId: 'skill_subnetting'}] }
];

const MOCK_ACTIONS = [
  { id: 'act_practice', type: 'practice', title: 'Subnetting Practice', targetSkills: ['skill_subnetting'] },
  { id: 'act_diag', type: 'diagnostic', title: 'Diagnostic Test', targetSkills: ['skill_subnetting', 'skill_routing'] }
];

let alexState = {
  skillId: 'skill_subnetting',
  mastery: 0.5,
  masteryUncertainty: 0.5,
  confidence: 0.1,
  evidenceCount: 0,
  misconceptions: []
};

console.log("--- INITIAL STATE ---");
console.log(JSON.stringify(alexState, null, 2));

// 1. Initial Recommendation
console.log("\n--- STEP 1: Initial Recommendation ---");
let recs = MOCK_ACTIONS.map(a => scoreRecommendationAction(a, [alexState])).sort((a, b) => b.score - a.score);
console.log(`Recommended: ${recs[0].action.title} (Score: ${recs[0].score.toFixed(2)})`);

// 2. Alex takes a diagnostic test and gets item 1 correct
console.log("\n--- STEP 2: Alex answers item_1 (diff 0.5) CORRECTLY ---");
let m1 = updateMeasurement(alexState.mastery, alexState.masteryUncertainty, 0.5, true);
alexState.mastery = m1.newMastery;
alexState.masteryUncertainty = m1.newUncertainty;
alexState.evidenceCount += 1;
alexState.confidence = 0.5;
console.log(JSON.stringify(alexState, null, 2));

// 3. Alex gets item 2 wrong (triggering misconception logic implicitly)
console.log("\n--- STEP 3: Alex answers item_2 (diff 0.6) WRONG with Misconception option ---");
let m2 = updateMeasurement(alexState.mastery, alexState.masteryUncertainty, 0.6, false);
alexState.mastery = m2.newMastery;
alexState.masteryUncertainty = m2.newUncertainty;
alexState.evidenceCount += 1;
alexState.misconceptions.push({ misconceptionId: 'misc_subnet_physical', confidence: 0.3, evidenceCount: 1 });
console.log(JSON.stringify(alexState, null, 2));

// 4. Recommendation updates based on new state
console.log("\n--- STEP 4: Updated Recommendation ---");
recs = MOCK_ACTIONS.map(a => scoreRecommendationAction(a, [alexState])).sort((a, b) => b.score - a.score);
console.log(`Recommended: ${recs[0].action.title} (Score: ${recs[0].score.toFixed(2)})`);

console.log("\n==================================================");
