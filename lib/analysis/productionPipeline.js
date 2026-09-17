import { MeasurementEngine } from '../engine/MeasurementEngine';
import { BKTModel } from '../engine/KnowledgeTracingModel';
import { MisconceptionDetector } from '../misconceptions/MisconceptionDetector';
import { RecommendationEngine } from '../recommendation/RecommendationEngine';
import { NETWORKING_SKILLS } from '../../data/networking/skills';
import { NETWORKING_MISCONCEPTIONS } from '../../data/networking/misconceptions';
import {
  mapQuestionToSkillIds,
  toAssessmentItem,
  resolveDiagnosticCopy,
  getSkillDisplayName,
  inferMisconceptionId,
} from './arabicSkillMap';
import { DiagnosticTracker } from './diagnosticTracker';

const INSUFFICIENT = 'لم تُجمع بيانات كافية';

function emptyLearnerState(userId, skillId) {
  return {
    userId,
    skillId,
    mastery: 0.4,
    masteryUncertainty: 0.55,
    confidence: 0.45,
    evidenceCount: 0,
    recentPerformance: 0.5,
    trend: 'stable',
    lastObservedAt: new Date(),
    misconceptions: [],
    status: 'uncertain',
  };
}

function scoreItem(question, answer) {
  if (question?.isWriting) {
    const expected = (question.expectedAnswer || '').trim().toLowerCase();
    const given = (answer || '').toString().trim().toLowerCase();
    return { isCorrect: expected.length > 0 && given === expected, selectedIndex: null };
  }
  const num = Number(answer);
  const selectedIndex = Number.isInteger(num) && num >= 1 ? num - 1 : num;
  return { isCorrect: selectedIndex === question.correct, selectedIndex };
}

export function buildProductionReport({
  questions,
  answers,
  times = [],
  events = [],
  assessmentId,
  mode,
  userId = 'anonymous',
  attemptId,
  hintedItemIds = [],
  historicalData = [],
  tabAnalyses = {},
}) {
  const measurement = new MeasurementEngine();
  const bkt = new BKTModel();
  const detector = new MisconceptionDetector(NETWORKING_MISCONCEPTIONS);
  const recommender = new RecommendationEngine();
  const tracker = new DiagnosticTracker();

  const evidence = [];
  const items = [];
  const hintedSet = new Set(hintedItemIds);
  let correctCount = 0;

  questions.forEach((question, index) => {
    const { isCorrect, selectedIndex } = scoreItem(question, answers[index]);
    if (isCorrect) correctCount += 1;
    const skillIds = mapQuestionToSkillIds(question);
    const item = toAssessmentItem(question);
    items.push(item);
    const misconceptionId = inferMisconceptionId(question, selectedIndex, isCorrect);
    const hinted = hintedSet.has(question.id);
    skillIds.forEach((skillId, skillIndex) => {
      evidence.push({
        id: `${attemptId}_${question.id}_${skillId}`,
        learnerId: userId,
        itemId: question.id,
        source: 'mcq',
        skillId,
        correctness: isCorrect ? 1 : 0,
        responseTimeMs: Math.round((times[index] || 0) * 1000),
        rawResponse: selectedIndex == null ? String(answers[index] ?? '') : `opt_${selectedIndex}`,
        createdAt: new Date(),
        sessionId: attemptId,
      });
      if (skillIndex === 0) {
        tracker.observe({
          itemId: question.id,
          skillId,
          misconceptionId,
          isCorrect,
          selectedOptionId: `opt_${selectedIndex}`,
          hinted,
        });
      }
    });
  });

  const states = [];
  const skillIds = [...new Set(evidence.map(e => e.skillId))];
  for (const skillId of skillIds) {
    const skillEvidence = evidence.filter(e => e.skillId === skillId);
    let state = emptyLearnerState(userId, skillId);
    const { updatedState } = measurement.processEvidence(
      state,
      skillEvidence,
      items.find(i => i.skillMappings.some(m => m.skillId === skillId)),
    );
    state = updatedState;
    for (const ev of skillEvidence) {
      state = bkt.updateState(state, ev);
    }
    states.push(state);
  }

  const detection = detector.detect(userId, evidence, items);
  const diagnosticLog = tracker.snapshot();

  const confirmedGapSkills = states.filter(s =>
    s.status === 'needs_attention' && s.evidenceCount >= 2 && s.masteryUncertainty <= 0.45
  );
  const uncertainSkills = states.filter(s => s.status === 'uncertain' || s.evidenceCount < 2);

  const flatSkills = states.map(state => {
    const sampleQuestion = questions.find(q => mapQuestionToSkillIds(q)[0] === state.skillId) || questions[0];
    const copy = resolveDiagnosticCopy(sampleQuestion, state.skillId);
    const percentage = Math.round(state.recentPerformance * 100);
    return {
      id: state.skillId,
      name: getSkillDisplayName(state.skillId),
      percentage,
      level: state.status === 'mastered' ? 'متقن' : state.status === 'developing' ? 'قيد التعلم' : state.status === 'uncertain' ? 'غير محسوم' : 'ضعيف',
      total: state.evidenceCount,
      correct: Math.round(state.recentPerformance * state.evidenceCount),
      errorPattern: copy.errorPattern,
      rootCause: copy.rootCause,
      futureImpact: `قد يسبب صعوبة عند المهارات اللاحقة المرتبطة — ${copy.futureImpact}`,
      remediationVideoQuery: copy.remediationVideoQuery,
      learningObjective: copy.learningObjective,
      status: state.status,
      calibrationStatus: 'provisional',
      evidenceCount: state.evidenceCount,
    };
  }).sort((a, b) => a.percentage - b.percentage);

  const weakestSkills = flatSkills.filter(s =>
    confirmedGapSkills.some(g => g.skillId === s.id)
  );

  const availableActions = weakestSkills.map(skill => ({
    id: `act_${skill.id}`,
    type: 'review',
    title: { en: skill.name, ar: skill.name },
    description: { en: skill.learningObjective, ar: skill.learningObjective },
    targetSkills: [skill.id],
    estimatedDurationMinutes: 20,
    difficulty: 0.4,
  }));
  if (uncertainSkills.length > 0) {
    availableActions.push({
      id: 'act_more_evidence',
      type: 'practice',
      title: { en: 'Additional diagnostic items', ar: 'تقييم إضافي' },
      description: { en: 'Collect more evidence', ar: 'جمع أدلة إضافية' },
      targetSkills: uncertainSkills.map(s => s.skillId),
      estimatedDurationMinutes: 10,
      difficulty: 0.3,
    });
  }

  const recommendation = recommender.generate({
    learnerStates: states,
    goal: null,
    availableActions,
    skills: NETWORKING_SKILLS,
    locale: 'ar',
  });

  const courseModules = weakestSkills.map(skill => ({
    skillId: skill.id,
    topic: skill.name,
    reason: skill.rootCause,
    learningObjective: skill.learningObjective,
    searchQuery: skill.remediationVideoQuery,
    futureImpact: skill.futureImpact,
    percentage: skill.percentage,
    reviewedContent: false,
    passedCheckpoint: false,
  }));

  const confirmedNetBits = detection.confirmed.some(c => c.misconceptionId === 'misc_net_bits_host_bits');
  const score = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;

  let insight;
  if (!questions.length) {
    insight = 'المجال غير متاح لنقص أسئلته';
  } else if (weakestSkills.length === 0 && uncertainSkills.length > 0) {
    insight = 'الحالة الحقيقية: لا فجوة مثبتة، أو نحتاج تقييمًا إضافيًا';
  } else if (weakestSkills.length === 0) {
    insight = 'الحالة الحقيقية: لا فجوة مثبتة ضمن نطاق هذا التقييم. حدود التقييم: لم تُختبر كل المهارات اللاحقة.';
  } else {
    insight = `أهم فجوة مدعومة: ${weakestSkills[0].name}. ${weakestSkills[0].rootCause}`;
  }

  const careerReady = confirmedGapSkills.length === 0 && states.some(s => s.status === 'mastered' && s.evidenceCount >= 3);

  return {
    success: true,
    attemptId,
    analysisVersion: 'production-core-v1',
    assessmentId,
    mode: mode || 'full',
    isQuick: mode === 'quick',
    score,
    totalQuestions: questions.length,
    correctAnswers: correctCount,
    wrongAnswers: questions.length - correctCount,
    microTemporal: tabAnalyses.microTemporal,
    cognitivePath: tabAnalyses.cognitivePath,
    deepErrors: tabAnalyses.deepErrors,
    contextual: tabAnalyses.contextual,
    learningTrajectory: tabAnalyses.learningTrajectory,
    rootCauses: tabAnalyses.rootCauses || {
      causeTree: {
        symptom: weakestSkills[0]?.name || 'لا توجد ثغرات حرجة',
        causes: weakestSkills.map(s => ({
          cause: s.name,
          subCauses: [s.rootCause],
          severity: s.percentage < 30 ? 'حرجة' : 'عالية',
          fix: s.learningObjective,
        })),
      },
      crossAnalysis: {
        relationship: weakestSkills.length
          ? 'ضعف مدعوم في مهارة سابقة قد يظهر لاحقاً عند المهارة المعتمدة عليها'
          : INSUFFICIENT,
        chain: weakestSkills.map(s => s.name).join(' → '),
        interventionPoint: weakestSkills[0]?.name,
        recommendation: weakestSkills[0]?.learningObjective || 'الحالة الحقيقية: لا فجوة مثبتة، أو نحتاج تقييمًا إضافيًا',
      },
    },
    predictions: {
      ...tabAnalyses.predictions,
      careerPrediction: careerReady ? tabAnalyses.predictions?.careerPrediction : null,
      performancePrediction: tabAnalyses.predictions?.performancePrediction,
      limits: 'الآثار المحتملة مشروطة باختبار المهارة اللاحقة نفسها.',
    },
    affective: {
      ...tabAnalyses.affective,
      disclosureNote: 'ما يظهر هنا سلوك مرصود من التوقيت والتبديل، وليس تصريحاً من الطالب.',
    },
    evolution: tabAnalyses.evolution,
    flatSkills,
    weakestSkills,
    uncertainSkills: uncertainSkills.map(s => ({
      id: s.skillId,
      name: getSkillDisplayName(s.skillId),
      evidenceCount: s.evidenceCount,
      status: s.status,
    })),
    insight,
    courseModules,
    courseStatus: weakestSkills.length > 0
      ? 'has_gaps'
      : uncertainSkills.length > 0
        ? 'needs_more_assessment'
        : 'no_confirmed_gap',
    courseStatusText: weakestSkills.length > 0
      ? insight
      : 'الحالة الحقيقية: لا فجوة مثبتة، أو نحتاج تقييمًا إضافيًا',
    diagnosticLog,
    misconceptionDetection: {
      confirmed: detection.confirmed,
      suspected: detection.suspected,
    },
    networkBitsHostBitsMisconception: confirmedNetBits
      ? {
          confirmed: true,
          title: 'اكتشاف المحرك (Engine): خلط بين Network Bits و Host Bits',
          body: 'في أسئلة Subnetting المرتبطة بهذه المحاولة، تكررت إجابات تؤيد حساب المضيفين من الجزء الخطأ من القناع.',
          explanation: NETWORKING_MISCONCEPTIONS.find(m => m.id === 'misc_net_bits_host_bits')?.remediation?.ar,
        }
      : {
          confirmed: false,
          title: 'اكتشاف المحرك (Engine): خلط بين Network Bits و Host Bits',
          body: 'بيانات غير كافية',
          explanation: 'لم تُؤكد هذه الفرضية من إجابات هذه المحاولة.',
        },
    recommendation,
    labProfile: {
      attemptId,
      gapSkillIds: weakestSkills.map(s => s.id),
      scenarioId: weakestSkills.some(s => ['routing_fund', 'default_gateway', 'static_routing', 'l3_troubleshoot'].includes(s.id))
        ? 'lab_static_route_fault'
        : weakestSkills.some(s => ['subnetting', 'cidr', 'subnet_mask'].includes(s.id))
          ? 'lab_subnet_scope'
          : 'lab_static_route_fault',
    },
    quickStats: {
      score,
      correct: correctCount,
      wrong: questions.length - correctCount,
      total: questions.length,
      accuracy: score,
      timeSpent: times.reduce((a, b) => a + b, 0),
      avgTimePerQuestion: times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0,
    },
    analyzedAt: new Date().toISOString(),
  };
}

export function selectDiagnosticQuestion(pool, excludeIds, tracker) {
  const remaining = pool.filter(q => !excludeIds.includes(q.id));
  if (!remaining.length) return null;
  const targets = tracker?.targetSkills?.() || [];
  const hypotheses = tracker?.competingIds?.() || [];
  const scored = remaining.map(question => {
    const skills = mapQuestionToSkillIds(question);
    let score = 0;
    if (skills.some(id => targets.includes(id))) score += 2;
    const item = toAssessmentItem(question);
    if (item.options?.some(o => o.misconceptionId && hypotheses.includes(o.misconceptionId))) score += 3;
    return { question, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored[0].question;
}
