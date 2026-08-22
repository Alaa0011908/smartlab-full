const fs = require('fs');

console.log("==========================================");
console.log("   LOCAL ENGINE VERIFICATION (BKT/Rasch)  ");
console.log("==========================================\n");

// --- BKT Logic Extracted ---
const BKT_DEFAULTS = {
  L0: 0.1,   // initial knowledge
  T: 0.10,   // learning rate
  G: 0.20,   // guess probability
  S: 0.10,   // slip probability
};

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

function runSequence(name, sequence) {
  let mastery = BKT_DEFAULTS.L0;
  console.log(`Sequence: ${name}`);
  console.log(`Initial Mastery: ${mastery.toFixed(4)}`);
  
  sequence.forEach((correct, idx) => {
    mastery = bktUpdate(mastery, correct);
    console.log(`  Step ${idx + 1} (${correct ? 'CORRECT' : 'WRONG  '}): Mastery = ${mastery.toFixed(4)}`);
  });
  console.log();
}

console.log("--- 1. BKT Numerical Stability Tests ---");
runSequence("Steady Correct", [true, true, true, true, true]);
runSequence("Steady Wrong", [false, false, false, false, false]);
runSequence("Mixed 1 (W, W, C, C, C, C)", [false, false, true, true, true, true]);
runSequence("Mixed 2 (C, W, C, W, W)", [true, false, true, false, false]);

console.log("--- 2. Provisional Rasch Model Audit ---");
console.log("[WARNING] The current ProvisionalRaschModel does NOT incorporate item difficulty (b-parameter)!");
console.log("          It currently acts identical to a simplified BKT model.");
console.log("          Action Required: Must update `MeasurementEngine.ts` to actually use `item.difficulty` in a logistic function.");

console.log("\n--- 3. Misconception Engine Audit ---");
console.log("MisconceptionDetector requires `evidenceThreshold`. If threshold = 2, a single wrong answer will NOT trigger it.");
console.log("Action Required: Ensure UI displays 'possible misconception' if threshold is barely met.");

console.log("\n==========================================");
console.log("   AUDIT COMPLETE   ");
console.log("==========================================");
