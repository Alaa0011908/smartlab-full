const fs = require('fs');

console.log("==================================================");
console.log("   BKT KNOWLEDGE TRACING VERIFICATION");
console.log("==================================================\n");

const BKT_DEFAULTS = {
  L0: 0.1,   // initial knowledge
  T: 0.10,   // learning rate
  G: 0.20,   // guess probability
  S: 0.10,   // slip probability
};

function bktPredictNext(mastery) {
  const L = mastery;
  const G = BKT_DEFAULTS.G;
  const S = BKT_DEFAULTS.S;
  return L * (1 - S) + (1 - L) * G;
}

function bktUpdate(mastery, correct) {
  const L = mastery;
  const G = BKT_DEFAULTS.G;
  const S = BKT_DEFAULTS.S;
  const T = BKT_DEFAULTS.T;

  let posterior;
  if (correct) {
    const pCorrect = L * (1 - S) + (1 - L) * G;
    posterior = (L * (1 - S)) / pCorrect;
  } else {
    const pIncorrect = L * S + (1 - L) * (1 - G);
    posterior = (L * S) / pIncorrect;
  }

  // Apply learning transition
  const updated = posterior + (1 - posterior) * T;
  return Math.max(0.01, Math.min(0.99, updated));
}

function runBKTTrajectory(name, sequence) {
  let mastery = BKT_DEFAULTS.L0;
  console.log(`Trajectory: ${name}`);
  console.log(`Initial Mastery = ${mastery.toFixed(4)}`);
  
  sequence.forEach((correct, i) => {
    const pNext = bktPredictNext(mastery);
    const newMastery = bktUpdate(mastery, correct);
    console.log(`  Step ${i+1} [${correct ? 'CORRECT' : 'WRONG  '}] P(next)=${pNext.toFixed(4)} -> Mastery = ${newMastery.toFixed(4)}`);
    mastery = newMastery;
  });
  console.log();
}

runBKTTrajectory("Case A: W -> W -> W -> C -> C -> C", [false, false, false, true, true, true]);
runBKTTrajectory("Case B: C -> C -> C -> W -> W", [true, true, true, false, false]);
runBKTTrajectory("Case C: Alternating", [true, false, true, false, true, false]);
runBKTTrajectory("Case D: All Correct (7)", [true, true, true, true, true, true, true]);
runBKTTrajectory("Case E: All Incorrect (7)", [false, false, false, false, false, false, false]);

console.log("==================================================");
