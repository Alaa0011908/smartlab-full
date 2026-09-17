const { ScenarioEngine, STAGE_NAMES, MANDATORY_QUESTIONS_STAGE1, SCENARIOS } = require('./lib/scenarioEngine');

async function runTests() {
  console.log('============================================');
  console.log('SmartLab AI - Scenario Engine Smoke Test');
  console.log('============================================\n');

  let passed = 0, failed = 0;

  try {
    console.log('1. Testing STAGE_NAMES constant...');
    if (Object.keys(STAGE_NAMES).length === 5) { console.log('   ✅ PASS: 5 stages defined'); passed++; }
    else { console.log('   ❌ FAIL: expected 5 stages, got', Object.keys(STAGE_NAMES).length); failed++; }

    console.log('\n2. Testing MANDATORY_QUESTIONS_STAGE1...');
    if (MANDATORY_QUESTIONS_STAGE1.length === 5) { console.log('   ✅ PASS: 5 mandatory questions for stage 1'); passed++; }
    else { console.log('   ❌ FAIL: expected 5, got', MANDATORY_QUESTIONS_STAGE1.length); failed++; }

    console.log('\n3. Testing 3 SCENARIOS (cafe, hospital, office)...');
    const expectedScenarios = ['cafe', 'hospital', 'office'];
    const scenarioKeys = Object.keys(SCENARIOS);
    const allScenariosPresent = expectedScenarios.every(s => scenarioKeys.includes(s));
    if (allScenariosPresent && scenarioKeys.length === 3) {
      console.log('   ✅ PASS: 3 scenarios present (cafe, hospital, office)');
      passed++;
    } else {
      console.log('   ❌ FAIL: scenarios mismatch, got:', scenarioKeys);
      failed++;
    }

    console.log('\n4. Testing ScenarioEngine instantiation...');
    const engine = new ScenarioEngine('cafe', [], 'beginner', 1, null);
    if (engine && engine.scenarioId === 'cafe') {
      console.log('   ✅ PASS: Engine created for scenario "cafe"');
      passed++;
    } else {
      console.log('   ❌ FAIL: Engine not properly instantiated');
      failed++;
    }

    console.log('\n5. Testing stageDataSnapshot initialization...');
    const data = engine.serializeStageData();
    if (data && data.stage === 1 && Array.isArray(data.stage1AnsweredQuestionIds)) {
      console.log('   ✅ PASS: stageData initialized correctly (stage=1, stage1 answers array)');
      passed++;
    } else {
      console.log('   ❌ FAIL: stageData bad:', JSON.stringify(data));
      failed++;
    }

    console.log('\n6. Testing normalizeArabic + Stage1 question detection...');
    const normalized = engine.normalizeArabic('كم عدد الأجهزة ونقاط الوصول في المقهى؟');
    const detected = engine.detectStage1Questions('كم عدد الأجهزة ونقاط الوصول المتوقعة؟');
    if (typeof normalized === 'string' && normalized.length > 0 && detected.includes('devices')) {
      console.log('   ✅ PASS: normalizeArabic works; detected "devices" question correctly');
      passed++;
    } else {
      console.log('   ❌ FAIL: normalized=', normalized, 'detected=', detected);
      failed++;
    }

    console.log('\n7. Testing hydrateStageData (static)...');
    const rehydrated = ScenarioEngine.hydrateStageData({ stage:1, stage1AnsweredQuestionIds:['devices'], stage3AnsweredQuestionIds:[] });
    if (rehydrated.stage === 1 && rehydrated.stage1AnsweredQuestionIds.includes('devices')) {
      console.log('   ✅ PASS: hydrateStageData works correctly');
      passed++;
    } else {
      console.log('   ❌ FAIL: rehydrated=', JSON.stringify(rehydrated));
      failed++;
    }

    console.log('\n8. Testing Mock LLM Fallback (callLLM without network)...');
    const mockResult = await engine.fallbackMockResponse(1, 'ما هي مساحة المقهى؟', null);
    if (mockResult && typeof mockResult.reply === 'string' && typeof mockResult.recommendedStage === 'number') {
      console.log('   ✅ PASS: Mock fallback works (reply length=' + mockResult.reply.length + ', recommendedStage=' + mockResult.recommendedStage + ')');
      passed++;
    } else {
      console.log('   ❌ FAIL: mockResult=', JSON.stringify(mockResult));
      failed++;
    }

    console.log('\n9. Testing Guardrails (prevent stage jump from 1→3)...');
    const newEngine = new ScenarioEngine('cafe', [], 'beginner', 1, null);
    newEngine.stageData.stage1AnsweredQuestionIds = ['devices'];
    const guardedStage = newEngine.applyGuardrails(3);
    if (guardedStage === 1) {
      console.log('   ✅ PASS: Guardrails blocked invalid jump 1→3 (1 answered only)');
      passed++;
    } else {
      console.log('   ❌ FAIL: expected stage 1, got', guardedStage, ' (should have blocked stage 3 with only 1 question answered)');
      failed++;
    }

    console.log('\n10. Testing Guardrails (allow stage 1→2 with ALL 5 answered)...');
    const newEngine2 = new ScenarioEngine('cafe', [], 'beginner', 1, null);
    newEngine2.stageData.stage1AnsweredQuestionIds = ['devices','internet','guest_vlan','budget','space'];
    const guardedStage2 = newEngine2.applyGuardrails(2);
    if (guardedStage2 === 2) {
      console.log('   ✅ PASS: Guardrails allowed 1→2 when all 5 questions answered');
      passed++;
    } else {
      console.log('   ❌ FAIL: expected stage 2, got', guardedStage2);
      failed++;
    }

    console.log('\n11. Testing full analyzeAndRespond flow with Mock...');
    const fullEngine = new ScenarioEngine('cafe', [
      { role: 'assistant', content: 'أهلاً وسهلاً بك يا باش مهندس! أنا أبو أحمد.' }
    ], 'beginner', 1, null);
    const result = await fullEngine.analyzeAndRespond('كم عدد الأجهزة ونقاط الوصول المتوقعة في المقهى؟', { forceMock: true });
    if (result && result.reply && typeof result.score === 'number' && result.stage >= 1 && result.stage <= 5) {
      console.log('   ✅ PASS: analyzeAndRespond returned valid shape:');
      console.log('       • stage:', result.stage, '| stageChanged:', result.stageChanged);
      console.log('       • score:', result.score, '| feedbackType:', result.feedback?.type);
      console.log('       • reply preview:', result.reply.substring(0, 80) + '...');
      passed++;
    } else {
      console.log('   ❌ FAIL: result =', JSON.stringify(result, null, 2));
      failed++;
    }

    console.log('\n12. Testing price extraction regex...');
    const prices = [
      ['الميزانية حوالي 2500 ريال', 2500],
      ['المبلغ تقريباً 1,500 ريال', 1500],
      ['حوالي 3 الاف ريال', 3000],
      ['لا يوجد رقم هنا', null]
    ];
    let pricePass = true;
    for (const [msg, expected] of prices) {
      const got = fullEngine.extractPriceFromMessage(msg);
      if (got !== expected) { console.log('       FAIL price:', msg, '→ expected', expected, 'got', got); pricePass = false; }
    }
    if (pricePass) { console.log('   ✅ PASS: Price extraction works for all samples'); passed++; }
    else { console.log('   ❌ FAIL: Price extraction failures'); failed++; }

  } catch (e) {
    console.log('\n   ❌ UNEXPECTED EXCEPTION:', e.message);
    console.log(e.stack);
    failed++;
  }

  console.log('\n============================================');
  console.log('RESULTS: ' + passed + ' PASSED | ' + failed + ' FAILED');
  console.log('============================================');
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
