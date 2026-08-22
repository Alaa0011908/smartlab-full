const fs = require('fs');

console.log("==================================================");
console.log("   MISCONCEPTION DETECTOR VERIFICATION");
console.log("==================================================\n");

// Abstracted Misconception logic
class MisconceptionDetector {
  constructor(library) {
    this.library = library;
  }

  detect(evidenceHistory, items) {
    const evidenceMap = new Map();

    for (const ev of evidenceHistory) {
      if (!ev.itemId || ev.correctness === undefined) continue;
      if (ev.correctness >= 0.5) continue; // correct response

      const item = items.find(i => i.id === ev.itemId);
      if (!item) continue;

      let specificMisconceptionId = null;
      if (ev.rawResponse && item.options) {
        const selectedOption = item.options.find(o => o.id === ev.rawResponse);
        if (selectedOption && selectedOption.misconceptionId) {
          specificMisconceptionId = selectedOption.misconceptionId;
        }
      }

      if (specificMisconceptionId) {
        const misc = this.library.find(m => m.id === specificMisconceptionId);
        if (misc) {
          const existing = evidenceMap.get(misc.id);
          if (existing) {
            evidenceMap.set(misc.id, {
              ...existing,
              evidenceCount: existing.evidenceCount + 1,
              confidence: Math.min(0.95, existing.confidence + 0.25)
            });
          } else {
            evidenceMap.set(misc.id, {
              misconceptionId: misc.id,
              evidenceCount: 1,
              confidence: 0.3
            });
          }
        }
      } else {
        // Fallback
        for (const mapping of item.skillMappings) {
          const relatedMisconceptions = this.library.filter(m =>
            m.associatedSkills.includes(mapping.skillId)
          );

          for (const misc of relatedMisconceptions) {
            const existing = evidenceMap.get(misc.id);
            if (existing) {
              evidenceMap.set(misc.id, {
                ...existing,
                confidence: Math.min(0.95, existing.confidence + 0.05)
              });
            } else {
              evidenceMap.set(misc.id, {
                misconceptionId: misc.id,
                evidenceCount: 0.5,
                confidence: 0.1
              });
            }
          }
        }
      }
    }

    const confirmed = [];
    const suspected = [];

    for (const [id, evidence] of evidenceMap) {
      const definition = this.library.find(m => m.id === id);
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

const MOCK_LIBRARY = [
  { id: 'misc_subnet_physical', associatedSkills: ['skill_subnetting'], evidenceThreshold: 2 }
];

const MOCK_ITEMS = [
  { 
    id: 'item_1', 
    skillMappings: [{ skillId: 'skill_subnetting' }],
    options: [
      { id: 'opt_A', misconceptionId: 'misc_subnet_physical' },
      { id: 'opt_B' } // generic wrong
    ]
  },
  { 
    id: 'item_2', 
    skillMappings: [{ skillId: 'skill_subnetting' }],
    options: [
      { id: 'opt_C', misconceptionId: 'misc_subnet_physical' }
    ]
  }
];

function runTest(name, evidenceHistory) {
  console.log(`--- ${name} ---`);
  const detector = new MisconceptionDetector(MOCK_LIBRARY);
  const result = detector.detect(evidenceHistory, MOCK_ITEMS);
  console.log(`Confirmed: ${JSON.stringify(result.confirmed)}`);
  console.log(`Suspected: ${JSON.stringify(result.suspected)}\n`);
}

// 1. Explicit mapping (Should not trigger on just 1)
runTest("Test 1: Single Explicit Misconception (Below Threshold)", [
  { itemId: 'item_1', correctness: 0, rawResponse: 'opt_A' }
]);

// 2. Explicit mapping repeated (Should trigger)
runTest("Test 2: Repeated Explicit Misconception (Should Confirm)", [
  { itemId: 'item_1', correctness: 0, rawResponse: 'opt_A' },
  { itemId: 'item_2', correctness: 0, rawResponse: 'opt_C' }
]);

// 3. Incorrect answer without mapping (Should be suspected but very low confidence)
runTest("Test 3: Generic wrong answers without specific mapping", [
  { itemId: 'item_1', correctness: 0, rawResponse: 'opt_B' },
  { itemId: 'item_1', correctness: 0, rawResponse: 'opt_B' },
  { itemId: 'item_1', correctness: 0, rawResponse: 'opt_B' }
]);

// 4. Conflicting/Mixed evidence (1 explicit, 2 generic)
runTest("Test 4: Mixed evidence (1 explicit, 2 generic)", [
  { itemId: 'item_1', correctness: 0, rawResponse: 'opt_A' },
  { itemId: 'item_1', correctness: 0, rawResponse: 'opt_B' },
  { itemId: 'item_1', correctness: 0, rawResponse: 'opt_B' }
]);

console.log("==================================================");
