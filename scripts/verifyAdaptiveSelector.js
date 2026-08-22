const fs = require('fs');

console.log("==================================================");
console.log("   ADAPTIVE ITEM SELECTOR VERIFICATION");
console.log("==================================================\n");

function scoreItem(item, stateMap, skills, constraints) {
  let score = 0;
  let reasons = [];
  let targetedSkills = [];
  let informationGain = 0;

  for (const mapping of item.skillMappings) {
    const state = stateMap.get(mapping.skillId);
    if (!state) {
      score += mapping.weight * 0.8;
      reasons.push(`No evidence yet for ${mapping.skillId}`);
      targetedSkills.push(mapping.skillId);
      informationGain += 0.8 * mapping.weight;
      continue;
    }

    const uncertaintyScore = state.masteryUncertainty * 1.5 * mapping.weight;
    score += uncertaintyScore;

    const difficultyMatch = 1 - Math.abs(item.difficulty - state.mastery);
    const infoScore = difficultyMatch * 4 * state.mastery * (1 - state.mastery);
    score += infoScore * mapping.weight;
    informationGain += infoScore * mapping.weight;

    if (state.status === 'needs_attention') {
      score += 0.3 * mapping.weight;
      reasons.push(`${mapping.skillId} needs attention`);
    } else if (state.status === 'uncertain') {
      score += 0.5 * mapping.weight;
      reasons.push(`${mapping.skillId} needs more evidence`);
    }

    const skill = skills.find(s => s.id === mapping.skillId);
    if (skill && skill.prerequisites && skill.prerequisites.length > 0) {
      const allPrereqsMet = skill.prerequisites.every(pId => {
        const prereqState = stateMap.get(pId);
        return prereqState && prereqState.mastery >= 0.6;
      });
      if (allPrereqsMet) {
        score += 0.2 * mapping.weight;
      } else {
        score -= 2.0 * mapping.weight;
      }
    }

    if (constraints && constraints.objective === 'diagnostic' && state.evidenceCount < 3) {
      score += 0.4 * mapping.weight;
      reasons.push(`Low evidence count for ${mapping.skillId}`);
    }

    if (mapping.role === 'primary') targetedSkills.push(mapping.skillId);
  }

  return { item, score, reasons, targetedSkills, expectedInformationGain: informationGain };
}

function runSelection(scenarioName, items, states, skills, constraints = {}) {
  console.log(`\n--- ${scenarioName} ---`);
  
  const stateMap = new Map(states.map(s => [s.skillId, s]));
  
  const recentItems = new Set(constraints.excludeItemIds || []);
  let pool = items.filter(i => !recentItems.has(i.id));

  const scored = pool.map(item => scoreItem(item, stateMap, skills, constraints));
  // Sort descending by score, tiebreaker by id for determinism
  scored.sort((a, b) => b.score !== a.score ? b.score - a.score : b.item.id.localeCompare(a.item.id));
  
  scored.forEach((s, idx) => {
    console.log(`${idx === 0 ? '=> SELECTED' : '   Ignored '}: Item [${s.item.id}] (Diff: ${s.item.difficulty}) -> Score: ${s.score.toFixed(4)}`);
    if (idx === 0) console.log(`   Reasons: ${s.reasons.join('; ')}`);
  });
}

// Mocks
const MOCK_SKILLS = [
  { id: 'skill_A', prerequisites: [] },
  { id: 'skill_B', prerequisites: ['skill_A'] },
  { id: 'skill_C', prerequisites: [] }
];

const MOCK_ITEMS = [
  { id: 'item_A_easy', difficulty: 0.2, skillMappings: [{ skillId: 'skill_A', weight: 1, role: 'primary' }] },
  { id: 'item_A_hard', difficulty: 0.8, skillMappings: [{ skillId: 'skill_A', weight: 1, role: 'primary' }] },
  { id: 'item_B_med', difficulty: 0.5, skillMappings: [{ skillId: 'skill_B', weight: 1, role: 'primary' }] },
  { id: 'item_C_med', difficulty: 0.5, skillMappings: [{ skillId: 'skill_C', weight: 1, role: 'primary' }] },
  { id: 'item_C_med_2', difficulty: 0.5, skillMappings: [{ skillId: 'skill_C', weight: 1, role: 'primary' }] }
];

// Scenario 1: One skill is highly uncertain.
runSelection("Scenario 1: Skill C is highly uncertain", MOCK_ITEMS, [
  { skillId: 'skill_A', mastery: 0.8, masteryUncertainty: 0.1, status: 'mastered', evidenceCount: 10 },
  { skillId: 'skill_B', mastery: 0.5, masteryUncertainty: 0.1, status: 'developing', evidenceCount: 5 },
  { skillId: 'skill_C', mastery: 0.5, masteryUncertainty: 0.8, status: 'uncertain', evidenceCount: 1 }
], MOCK_SKILLS);

// Scenario 2: A skill is highly mastered and low uncertainty.
// Should pick item_C over item_A
runSelection("Scenario 2: Skill A mastered (should not dominate)", MOCK_ITEMS, [
  { skillId: 'skill_A', mastery: 0.9, masteryUncertainty: 0.05, status: 'mastered', evidenceCount: 20 },
  { skillId: 'skill_C', mastery: 0.4, masteryUncertainty: 0.5, status: 'needs_attention', evidenceCount: 2 }
], MOCK_SKILLS);

// Scenario 3: A prerequisite is weak.
runSelection("Scenario 3: Weak Prereq (Skill A is weak, Item B should be penalized)", MOCK_ITEMS, [
  { skillId: 'skill_A', mastery: 0.3, masteryUncertainty: 0.1, status: 'needs_attention', evidenceCount: 10 },
  { skillId: 'skill_B', mastery: 0.5, masteryUncertainty: 0.5, status: 'uncertain', evidenceCount: 2 }
], MOCK_SKILLS);

// Scenario 4: Exposure penalty
runSelection("Scenario 4: Exposure penalty (item_C_med was just seen)", MOCK_ITEMS, [
  { skillId: 'skill_C', mastery: 0.5, masteryUncertainty: 0.5, status: 'uncertain', evidenceCount: 2 }
], MOCK_SKILLS, { excludeItemIds: ['item_C_med'] });

// Scenario 5: Two equally useful items (item_C_med vs item_C_med_2)
runSelection("Scenario 5: Tie-breaker determinism", MOCK_ITEMS.filter(i => i.id.startsWith('item_C')), [
  { skillId: 'skill_C', mastery: 0.5, masteryUncertainty: 0.5, status: 'uncertain', evidenceCount: 2 }
], MOCK_SKILLS);

console.log("\n==================================================");
