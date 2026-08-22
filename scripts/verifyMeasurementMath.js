const fs = require('fs');

console.log("==================================================");
console.log("   PROVISIONAL 1PL LOGISTIC MEASUREMENT VERIFICATION");
console.log("==================================================\n");

function calculatePCorrect(mastery, difficulty) {
  const safeMastery = Math.max(0.01, Math.min(0.99, mastery));
  const theta = Math.log(safeMastery / (1 - safeMastery));
  
  const safeDiff = Math.max(0.01, Math.min(0.99, difficulty));
  const b = Math.log(safeDiff / (1 - safeDiff));
  
  return 1 / (1 + Math.exp(-(theta - b)));
}

function simulateUpdate(mastery, uncertainty, difficulty, correct) {
  const safeMastery = Math.max(0.01, Math.min(0.99, mastery));
  const theta = Math.log(safeMastery / (1 - safeMastery));
  
  const safeDiff = Math.max(0.01, Math.min(0.99, difficulty));
  const b = Math.log(safeDiff / (1 - safeDiff));

  const pCorrect = 1 / (1 + Math.exp(-(theta - b)));
  
  const learningRate = 0.5 + uncertainty;
  const actual = correct ? 1 : 0;
  
  const newTheta = theta + learningRate * (actual - pCorrect);
  const newMastery = 1 / (1 + Math.exp(-newTheta));
  
  return { newMastery, newTheta, pCorrect, theta, b };
}

console.log("--- PART 1: P(correct) Verification ---");

// Case A: Learner ability == item difficulty
console.log("Case A: Ability == Difficulty");
console.log(`Mastery 0.5, Diff 0.5 -> P(correct): ${calculatePCorrect(0.5, 0.5).toFixed(4)}`);
console.log(`Mastery 0.8, Diff 0.8 -> P(correct): ${calculatePCorrect(0.8, 0.8).toFixed(4)}`);

// Case B: Learner ability >> item difficulty
console.log("\nCase B: Ability >> Difficulty");
console.log(`Mastery 0.9, Diff 0.2 -> P(correct): ${calculatePCorrect(0.9, 0.2).toFixed(4)}`);

// Case C: Learner ability << item difficulty
console.log("\nCase C: Ability << Difficulty");
console.log(`Mastery 0.2, Diff 0.9 -> P(correct): ${calculatePCorrect(0.2, 0.9).toFixed(4)}`);

// Case D: Same learner, different item difficulties
console.log("\nCase D: Same learner, diff item difficulties (Mastery = 0.5)");
[0.1, 0.3, 0.5, 0.7, 0.9].forEach(diff => {
  console.log(`  Item Diff ${diff.toFixed(1)} -> P(correct) = ${calculatePCorrect(0.5, diff).toFixed(4)}`);
});

// Case E: Same item, different learner abilities
console.log("\nCase E: Same item, diff learner abilities (Difficulty = 0.7)");
[0.1, 0.3, 0.5, 0.7, 0.9].forEach(mast => {
  console.log(`  Mastery ${mast.toFixed(1)} -> P(correct) = ${calculatePCorrect(mast, 0.7).toFixed(4)}`);
});

// Case F: Extreme values
console.log("\nCase F: Extreme values (Check for NaN / Infinity)");
console.log(`Mastery 1.0 (capped), Diff 0.0 -> P(correct): ${calculatePCorrect(1.0, 0.0).toFixed(4)}`);
console.log(`Mastery 0.0 (capped), Diff 1.0 -> P(correct): ${calculatePCorrect(0.0, 1.0).toFixed(4)}`);


console.log("\n--- PART 2: Update Rule Trajectories ---");
function runTrajectory(name, sequence, diff) {
  let mastery = 0.5;
  let uncertainty = 0.5;
  console.log(`\nTrajectory: ${name} (Item Difficulty = ${diff.toFixed(1)})`);
  console.log(`Initial Mastery = ${mastery.toFixed(4)}`);
  
  sequence.forEach((correct, i) => {
    const res = simulateUpdate(mastery, uncertainty, diff, correct);
    mastery = res.newMastery;
    uncertainty = Math.max(0.05, uncertainty * Math.exp(-0.1));
    console.log(`  Step ${i+1} [${correct ? 'CORRECT' : 'WRONG  '}] P(c)=${res.pCorrect.toFixed(4)} -> Mastery = ${mastery.toFixed(4)}`);
  });
}

runTrajectory("5 Correct Answers", [true, true, true, true, true], 0.5);
runTrajectory("5 Incorrect Answers", [false, false, false, false, false], 0.5);
runTrajectory("Alternating", [true, false, true, false, true], 0.5);
runTrajectory("Difficult Item (Correct Surprise)", [true], 0.9);
runTrajectory("Easy Item (Wrong Surprise)", [false], 0.1);

console.log("\n==================================================");
