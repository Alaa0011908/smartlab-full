const fs = require('fs');

console.log("==================================================");
console.log("   RECOMMENDATION ENGINE VERIFICATION");
console.log("==================================================\n");

// Abstracted Recommendation logic
function scoreAction(action, states, goal, skills) {
  let score = 0;
  const evidenceSummary = [];
  const targetSkills = [];

  const stateMap = new Map(states.map(s => [s.skillId, s]));

  for (const skillId of action.targetSkills) {
    const state = stateMap.get(skillId);
    if (!state) {
      score += 0.5; // Unknown — diagnostic value
      evidenceSummary.push(`No data yet for ${skillId}`);
      targetSkills.push(skillId);
      continue;
    }

    targetSkills.push(skillId);

    // HIGH PRIORITY: Needs attention + enough evidence to be confident in that
    if (state.status === 'needs_attention' && state.confidence >= 0.5) {
      score += 0.9;
      evidenceSummary.push(`${skillId}: mastery ${(state.mastery * 100).toFixed(0)}% (needs attention)`);
    }

    // HIGH PRIORITY: Uncertain — need more evidence
    if (state.status === 'uncertain') {
      score += 0.7;
      evidenceSummary.push(`${skillId}: only ${state.evidenceCount} evidence point(s) — uncertain`);
    }

    // MEDIUM: Developing — useful to push forward
    if (state.status === 'developing') {
      score += 0.4;
      evidenceSummary.push(`${skillId}: mastery ${(state.mastery * 100).toFixed(0)}% — developing`);
    }

    // BONUS: Declining trend
    if (state.trend === 'declining') {
      score += 0.3;
      evidenceSummary.push(`${skillId}: declining trend observed`);
    }

    // BONUS: Goal alignment
    if (goal && goal.targetSkills.includes(skillId)) {
      score += 0.4;
      evidenceSummary.push(`${skillId}: aligned with your goal`);
    }

    // BONUS: Prerequisite check — don't recommend advanced before prerequisite ready
    const skill = skills.find(s => s.id === skillId);
    if (skill) {
      const prereqsReady = skill.prerequisites.every(pId => {
        const pState = stateMap.get(pId);
        return !pState || pState.mastery >= 0.55;
      });
      if (!prereqsReady) score -= 0.5; // Penalize if prereqs not ready
    }

    // Action type match
    if (action.type === 'troubleshooting_lab' && state.skillId.includes('troubleshoot')) {
      score += 0.3;
    }
    if (action.type === 'review' && state.trend === 'declining') {
      score += 0.2;
    }
    if (action.type === 'challenge' && state.status === 'mastered') {
      score += 0.3;
    }
  }

  if (action.targetSkills.length > 0) {
    score = score / action.targetSkills.length;
  }

  const confidence = Math.min(0.95, states.filter(s => s.confidence >= 0.5).length / Math.max(1, states.length));

  return { action, score: Math.max(0, score), evidenceSummary, targetSkills, confidence };
}

function runRecommendation(name, states, actions, goal, skills) {
  console.log(`--- ${name} ---`);
  
  if (actions.length === 0) return console.log("No actions available\n");

  const scored = actions.map(action => scoreAction(action, states, goal, skills));
  scored.sort((a, b) => b.score !== a.score ? b.score - a.score : b.action.id.localeCompare(a.action.id));

  scored.forEach((s, idx) => {
    console.log(`${idx === 0 ? '=> RECOMMENDED' : '   Ignored    '}: [${s.action.type}] ${s.action.title.en} -> Score: ${s.score.toFixed(2)}`);
    if (idx === 0) console.log(`   Reasons: ${s.evidenceSummary.join('; ')}`);
  });
  console.log();
}

const MOCK_SKILLS = [
  { id: 'skill_subnetting', prerequisites: [] },
  { id: 'skill_troubleshooting', prerequisites: ['skill_subnetting'] }
];

const MOCK_ACTIONS = [
  { id: 'act_1', type: 'practice', title: { en: 'Subnetting Practice' }, targetSkills: ['skill_subnetting'] },
  { id: 'act_2', type: 'troubleshooting_lab', title: { en: 'Troubleshooting Lab' }, targetSkills: ['skill_troubleshooting'] },
  { id: 'act_3', type: 'diagnostic', title: { en: 'Diagnostic Test' }, targetSkills: ['skill_subnetting', 'skill_troubleshooting'] }
];

// 1. Weak subnetting -> subnetting practice.
runRecommendation("1. Weak Subnetting (Needs Attention)", [
  { skillId: 'skill_subnetting', mastery: 0.2, confidence: 0.8, status: 'needs_attention' },
  { skillId: 'skill_troubleshooting', mastery: 0.2, confidence: 0.8, status: 'needs_attention' } // Prereq subnetting is weak, should penalize act_2
], MOCK_ACTIONS, null, MOCK_SKILLS);

// 2. Strong subnetting + weak troubleshooting -> troubleshooting lab.
runRecommendation("2. Strong Subnetting, Weak Troubleshooting", [
  { skillId: 'skill_subnetting', mastery: 0.9, confidence: 0.9, status: 'mastered' },
  { skillId: 'skill_troubleshooting', mastery: 0.3, confidence: 0.8, status: 'needs_attention' }
], MOCK_ACTIONS, null, MOCK_SKILLS);

// 3. Low evidence -> diagnostic assessment.
runRecommendation("3. Low Evidence (Uncertain everywhere)", [
  { skillId: 'skill_subnetting', mastery: 0.5, confidence: 0.2, status: 'uncertain', evidenceCount: 1 },
  { skillId: 'skill_troubleshooting', mastery: 0.5, confidence: 0.2, status: 'uncertain', evidenceCount: 1 }
], MOCK_ACTIONS, null, MOCK_SKILLS);

console.log("==================================================");
