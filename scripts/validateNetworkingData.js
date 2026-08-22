const fs = require('fs');
const path = require('path');

// A simple utility to load TS objects by removing import/export/types
function loadTsData(filePath, varName) {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/import\s+type\s+.*?;\n?/g, '');
  content = content.replace(/import\s+.*?;\n?/g, '');
  content = content.replace(/export\s+const\s+(\w+)\s*(?::\s*[^=]+)?\s*=/g, 'const $1 =');
  const script = content + `\n\nreturn ${varName};`;
  return new Function(script)();
}

function runValidation() {
  console.log("==========================================");
  console.log("   DATA CONSISTENCY & Q-MATRIX AUDIT      ");
  console.log("==========================================");

  let skills = [];
  let items = [];
  let misconceptions = [];

  try {
    skills = loadTsData(path.join(__dirname, '../data/networking/skills.ts'), 'NETWORKING_SKILLS');
    items = loadTsData(path.join(__dirname, '../data/networking/items.ts'), 'NETWORKING_ITEMS');
    misconceptions = loadTsData(path.join(__dirname, '../data/networking/misconceptions.ts'), 'NETWORKING_MISCONCEPTIONS');
    console.log(`[OK] Loaded ${skills.length} skills, ${items.length} items, ${misconceptions.length} misconceptions.`);
  } catch (e) {
    console.error("[FAILED] Could not load data files. Structurally invalid or parsing error.");
    console.error(e.message);
    process.exit(1);
  }

  let errors = 0;
  let warnings = 0;

  // Build maps for quick lookup
  const skillMap = new Map(skills.map(s => [s.id, s]));
  const itemMap = new Map(items.map(i => [i.id, i]));
  const miscMap = new Map(misconceptions.map(m => [m.id, m]));

  // 1. Validate Skills
  console.log("\n--- Validating Skills ---");
  for (const skill of skills) {
    // Check prerequisites exist
    if (skill.prerequisites) {
      for (const req of skill.prerequisites) {
        if (!skillMap.has(req)) {
          console.error(`[ERROR] Skill '${skill.id}' has unknown prerequisite '${req}'`);
          errors++;
        }
      }
    }
    // Check parent exists
    if (skill.parent && !skillMap.has(skill.parent)) {
      console.error(`[ERROR] Skill '${skill.id}' has unknown parent '${skill.parent}'`);
      errors++;
    }
    // Check difficulty bounds
    if (skill.difficulty < 0 || skill.difficulty > 1) {
      console.error(`[ERROR] Skill '${skill.id}' has invalid difficulty ${skill.difficulty}`);
      errors++;
    }
  }

  // 2. Validate Items & Q-Matrix
  console.log("\n--- Validating Items & Q-Matrix ---");
  const mappedSkills = new Set();
  
  for (const item of items) {
    // Check difficulty bounds
    if (item.difficulty < 0 || item.difficulty > 1) {
      console.error(`[ERROR] Item '${item.id}' has invalid difficulty ${item.difficulty}`);
      errors++;
    }

    if (!item.skillMappings || item.skillMappings.length === 0) {
      console.error(`[ERROR] Item '${item.id}' has no skill mappings (Q-Matrix orphan)`);
      errors++;
    } else {
      const seenSkills = new Set();
      for (const mapping of item.skillMappings) {
        // Check skill existence
        if (!skillMap.has(mapping.skillId)) {
          console.error(`[ERROR] Item '${item.id}' maps to unknown skill '${mapping.skillId}'`);
          errors++;
        }
        // Check duplicate mappings
        if (seenSkills.has(mapping.skillId)) {
          console.error(`[ERROR] Item '${item.id}' has duplicate mapping to skill '${mapping.skillId}'`);
          errors++;
        }
        seenSkills.add(mapping.skillId);
        mappedSkills.add(mapping.skillId);
      }
    }

    // Check options and misconceptions
    if (item.options) {
      for (const opt of item.options) {
        if (opt.misconceptionId && !miscMap.has(opt.misconceptionId)) {
          console.error(`[ERROR] Item '${item.id}' option '${opt.id}' references unknown misconception '${opt.misconceptionId}'`);
          errors++;
        }
      }
    }
  }

  // 3. Check for Orphan Skills
  console.log("\n--- Checking for Orphan Skills (No items mapped) ---");
  for (const skill of skills) {
    if (!mappedSkills.has(skill.id)) {
      console.warn(`[WARNING] Skill '${skill.id}' is an orphan (no assessment items map to it)`);
      warnings++;
    }
  }

  // Summary
  console.log("\n==========================================");
  if (errors > 0) {
    console.error(`[FAILURE] Data Validation Failed with ${errors} errors and ${warnings} warnings.`);
    process.exit(1);
  } else {
    console.log(`[SUCCESS] Data Validation Passed with 0 errors and ${warnings} warnings.`);
  }
}

runValidation();
