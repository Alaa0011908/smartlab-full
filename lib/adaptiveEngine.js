// lib/adaptiveEngine.js
// ============================================================
// 🔥 محرك التقييم التكيفي الذكي - SmartLab Adaptive Engine
// يعتمد على نظرية الاستجابة للمفردة (IRT) ونموذج 3PL
// ============================================================

/**
 * ═══════════════════════════════════════════════════════════════
 * 📚 المصطلحات الأساسية:
 * 
 * Theta (θ)      : تقدير القدرة المعرفية للطالب (تتراوح بين -3 و +3)
 * IRT 3PL Model  : P(θ) = c + (1-c) / (1 + e^(-a(θ-b)))
 *   - a : معامل التمييز (Discrimination) - يحدد مدى قدرة السؤال على تمييز الطلاب
 *   - b : معامل الصعوبة (Difficulty) - موقع السؤال على مقياس القدرة
 *   - c : معامل التخمين (Guessing) - احتمال الإجابة الصحيحة عن طريق الصدفة
 * 
 * Fisher Information: مقدار المعلومات التي يقدمها السؤال عن قدرة الطالب
 * MLE (Maximum Likelihood Estimation): تقدير القدرة الأكثر احتمالاً
 * ═══════════════════════════════════════════════════════════════
 */

import { getAllBasicsQuestions } from '../data/questions/basics';

// =============================================================
// 🔷 الثوابت والإعدادات
// =============================================================

const THETA_RANGE = { min: -3, max: 3 };
const MAX_MLE_ITERATIONS = 20;
const MLE_CONVERGENCE_THRESHOLD = 0.001;
const DEFAULT_IRT = { a: 1.0, b: 0.0, c: 0.2 };

// =============================================================
// 🔷 الدوال الأساسية (Core Functions)
// =============================================================

/**
 * 1. تهيئة القدرة الأولية
 * تبدأ من 0 (متوسط القدرة)، مع إمكانية البدء من قيمة محددة
 * 
 * @param {number} initialValue - قيمة البداية (افتراضي 0)
 * @returns {number} قيمة القدرة الأولية
 */
export const initializeTheta = (initialValue = 0) => {
  return clampTheta(initialValue);
};

/**
 * 2. حساب نموذج 3PL لـ IRT
 * تحسب احتمالية الإجابة الصحيحة على سؤال معين بناءً على قدرة الطالب
 * 
 * @param {Object} question - كائن السؤال (يحتوي على irt.a, irt.b, irt.c)
 * @param {number} theta - قدرة الطالب الحالية
 * @returns {number} احتمال الإجابة الصحيحة (بين 0 و 1)
 */
export const calculateProbability = (question, theta) => {
  if (!question || !question.irt) {
    // احتياطي: استخدام القيم الافتراضية
    const { a, b, c } = DEFAULT_IRT;
    const exponent = -a * (theta - b);
    return c + (1 - c) / (1 + Math.exp(exponent));
  }

  const { a, b, c } = question.irt;
  
  // منع القيم غير المنطقية
  const safeA = Math.max(0.1, a);
  const safeB = Math.max(-4, Math.min(4, b));
  const safeC = Math.max(0, Math.min(0.35, c));
  
  const exponent = -safeA * (theta - safeB);
  const probability = safeC + (1 - safeC) / (1 + Math.exp(exponent));
  
  return Math.max(0.001, Math.min(0.999, probability));
};

/**
 * 3. حساب معلومات فيشر (Fisher Information)
 * تقيس مقدار المعلومات التي يقدمها السؤال عن قدرة الطالب
 * كلما زادت المعلومات، كان السؤال أفضل لتحديد القدرة
 * 
 * @param {Object} question - كائن السؤال
 * @param {number} theta - قدرة الطالب الحالية
 * @returns {number} قيمة المعلومات (كلما زادت كلما كان السؤال أفضل)
 */
export const calculateInformation = (question, theta) => {
  if (!question || !question.irt) {
    return 0;
  }

  const { a, b, c } = question.irt;
  const safeA = Math.max(0.1, a);
  const safeC = Math.max(0, Math.min(0.35, c));
  
  // حساب الاحتمال
  const p = calculateProbability(question, theta);
  
  // معادلة معلومات فيشر لنموذج 3PL
  const info = Math.pow(safeA, 2) * (Math.pow(p - safeC, 2) / Math.pow(1 - safeC, 2)) * ((1 - p) / p);
  
  // منع القيم اللانهائية أو السالبة
  return Math.max(0, isNaN(info) ? 0 : info);
};

/**
 * 4. تقدير القدرة باستخدام MLE (Maximum Likelihood Estimation)
 * تستخدم خوارزمية Newton-Raphson لتقدير القدرة الأكثر احتمالاً
 * 
 * @param {Array} answeredQuestions - مصفوفة من الكائنات { questionId, isCorrect }
 * @param {Array} allQuestions - قائمة جميع الأسئلة المتاحة
 * @returns {number} تقدير القدرة (Theta) المُحسَّب
 */
export const estimateTheta = (answeredQuestions, allQuestions) => {
  if (!answeredQuestions || answeredQuestions.length === 0) {
    return 0;
  }

  let theta = 0;
  const maxIterations = MAX_MLE_ITERATIONS;

  for (let iter = 0; iter < maxIterations; iter++) {
    let firstDerivative = 0;
    let secondDerivative = 0;
    let hasValidData = false;

    for (const item of answeredQuestions) {
      const question = allQuestions.find(q => q.id === item.questionId);
      if (!question) continue;

      try {
        const p = calculateProbability(question, theta);
        const isCorrect = item.isCorrect ? 1 : 0;
        
        // المشتقة الأولى (Log-Likelihood)
        const diff = isCorrect - p;
        firstDerivative += diff;
        
        // المشتقة الثانية (سالبة معلومات فيشر التقريبية)
        secondDerivative -= p * (1 - p);
        hasValidData = true;
      } catch (error) {
        // تجاهل الأسئلة التي تسبب خطأ
        continue;
      }
    }

    if (!hasValidData || secondDerivative === 0) {
      break;
    }

    // تحديث ثيتا باستخدام Newton-Raphson
    const step = firstDerivative / secondDerivative;
    theta -= step;

    // حصر القيمة ضمن النطاق المسموح
    theta = clampTheta(theta);

    // التحقق من التقارب
    if (Math.abs(step) < MLE_CONVERGENCE_THRESHOLD) {
      break;
    }
  }

  return clampTheta(theta);
};

/**
 * 5. اختيار السؤال التالي (أعلى معلومات)
 * يستخدم استراتيجية Maximum Information لتقليل عدم اليقين
 * 
 * @param {number} theta - قدرة الطالب الحالية
 * @param {Array} answeredIds - قائمة معرفات الأسئلة المجاب عنها
 * @param {Array} allQuestions - قائمة جميع الأسئلة المتاحة
 * @param {Object} options - خيارات إضافية (مثل: عدد الأسئلة المتبقية)
 * @returns {Object|null} السؤال المختار، أو null إذا لم يبقَ أسئلة
 */
export const getNextQuestion = (theta, answeredIds, allQuestions, options = {}) => {
  const { 
    randomizeTie = true,  // إذا تساوت المعلومات، اختر عشوائياً
    minInformation = 0.01 // أقل معلومات مقبولة لاختيار السؤال
  } = options;

  // تصفية الأسئلة غير المجاب عنها
  const available = allQuestions.filter(q => !answeredIds.includes(q.id));
  
  if (available.length === 0) {
    return null;
  }

  let bestQuestion = null;
  let maxInfo = -Infinity;
  const candidates = [];

  // حساب المعلومات لكل سؤال متاح
  for (const question of available) {
    try {
      const info = calculateInformation(question, theta);
      
      // تجاهل الأسئلة ذات المعلومات المنخفضة جداً
      if (info < minInformation) continue;
      
      if (info > maxInfo) {
        maxInfo = info;
        bestQuestion = question;
        candidates.length = 0;
        candidates.push(question);
      } else if (Math.abs(info - maxInfo) < 0.0001) {
        candidates.push(question);
      }
    } catch (error) {
      // تجاهل الأسئلة التي تسبب خطأ
      continue;
    }
  }

  // في حال تعدد المرشحين بنفس المعلومات
  if (candidates.length > 1 && randomizeTie) {
    const randomIndex = Math.floor(Math.random() * candidates.length);
    bestQuestion = candidates[randomIndex];
  }

  // إذا لم نجد سؤالاً بمعلومات كافية، خذ أي سؤال متاح
  if (!bestQuestion && available.length > 0) {
    bestQuestion = available[Math.floor(Math.random() * available.length)];
  }

  return bestQuestion;
};

/**
 * 6. تحديث القدرة بعد كل إجابة (نسخة سريعة)
 * تستخدم تحديثاً تقريبياً سريعاً بدلاً من MLE الكامل
 * مناسب للاستخدام أثناء الاختبار (لتقليل زمن المعالجة)
 * 
 * @param {number} currentTheta - القدرة الحالية
 * @param {Object} question - السؤال الذي تمت الإجابة عليه
 * @param {boolean} isCorrect - هل الإجابة صحيحة؟
 * @param {number} learningRate - معدل التعلم (افتراضي 0.15)
 * @returns {number} القدرة المُحدَّثة
 */
export const updateThetaAfterAnswer = (currentTheta, question, isCorrect, learningRate = 0.15) => {
  if (!question || !question.irt) {
    return currentTheta;
  }

  try {
    const p = calculateProbability(question, currentTheta);
    // الاحتمال الفعلي (1 إذا صحيحة، 0 إذا خاطئة)
    const actual = isCorrect ? 1 : 0;
    // الفرق بين التوقع والواقع
    const error = actual - p;
    // حساب معامل التعديل (يعتمد على معلومات السؤال)
    const info = calculateInformation(question, currentTheta);
    const adjustment = learningRate * error / (1 + info * 0.1);
    
    let newTheta = currentTheta + adjustment;
    return clampTheta(newTheta);
  } catch (error) {
    return currentTheta;
  }
};

/**
 * 7. حساب مستوى الطالب النصي (تصنيف)
 * يحول قيمة ثيتا إلى مستوى وصفي مفهوم
 * 
 * @param {number} theta - قيمة القدرة
 * @returns {Object} { level, label, description }
 */
export const getStudentLevel = (theta) => {
  const levels = [
    { min: -Infinity, max: -1.5, label: 'مبتدئ', emoji: '🌱', description: 'يحتاج إلى بناء الأساسيات' },
    { min: -1.5, max: -0.5, label: 'تحت المتوسط', emoji: '📖', description: 'يفهم الأساسيات لكن يحتاج ممارسة' },
    { min: -0.5, max: 0.5, label: 'متوسط', emoji: '📚', description: 'لديه فهم جيد للمفاهيم الأساسية' },
    { min: 0.5, max: 1.5, label: 'فوق المتوسط', emoji: '🌟', description: 'فهم عميق مع قدرة على التطبيق' },
    { min: 1.5, max: Infinity, label: 'متقدم', emoji: '🏆', description: 'إتقان عالٍ للموضوع' }
  ];

  for (const level of levels) {
    if (theta >= level.min && theta < level.max) {
      return { 
        theta, 
        level: level.label, 
        emoji: level.emoji, 
        description: level.description 
      };
    }
  }
  
  // احتياطي
  return { theta, level: 'متوسط', emoji: '📚', description: 'مستوى متوسط' };
};

// =============================================================
// 🔷 دوال مساعدة (Helper Functions)
// =============================================================

/**
 * 8. حساب الانحراف المعياري لتقدير القدرة (Standard Error)
 * يقيس دقة تقدير القدرة
 * 
 * @param {Array} answeredQuestions - الأسئلة المجاب عنها
 * @param {Array} allQuestions - جميع الأسئلة
 * @param {number} theta - القدرة الحالية
 * @returns {number} الانحراف المعياري
 */
export const calculateStandardError = (answeredQuestions, allQuestions, theta) => {
  let totalInfo = 0;
  
  for (const item of answeredQuestions) {
    const question = allQuestions.find(q => q.id === item.questionId);
    if (question) {
      totalInfo += calculateInformation(question, theta);
    }
  }
  
  return totalInfo > 0 ? 1 / Math.sqrt(totalInfo) : 1;
};

/**
 * 9. حصر قيمة ثيتا ضمن النطاق المسموح
 * 
 * @param {number} theta - قيمة القدرة
 * @returns {number} القيمة المحصورة بين -3 و +3
 */
const clampTheta = (theta) => {
  return Math.max(THETA_RANGE.min, Math.min(THETA_RANGE.max, theta));
};

/**
 * 10. توليد تقييم سريع للثقة (بناءً على الانحراف المعياري)
 * 
 * @param {number} standardError - الانحراف المعياري
 * @returns {string} مستوى الثقة في التقدير
 */
export const getConfidenceLevel = (standardError) => {
  if (standardError < 0.3) return 'عالية جداً';
  if (standardError < 0.5) return 'عالية';
  if (standardError < 0.7) return 'متوسطة';
  return 'منخفضة';
};

/**
 * 11. الدالة الرئيسية لتشغيل دورة كاملة من CAT
 * تجمع كل الدوال في عملية واحدة
 * 
 * @param {Object} params - معاملات الدورة
 * @returns {Object} نتائج الدورة
 */
export const runCATCycle = ({
  currentTheta = 0,
  answeredQuestions = [],
  allQuestions = null,
  mode = 'full' // 'full' | 'quick'
}) => {
  // جلب الأسئلة إذا لم تُمرر
  const questions = allQuestions || getAllBasicsQuestions();
  const answeredIds = answeredQuestions.map(item => item.questionId);
  
  // تحديد عدد الأسئلة حسب الوضع
  const targetCount = mode === 'quick' ? 12 : 30;
  const isComplete = answeredIds.length >= targetCount || answeredIds.length >= questions.length;
  
  // إذا اكتمل الاختبار
  if (isComplete) {
    const theta = estimateTheta(answeredQuestions, questions);
    const se = calculateStandardError(answeredQuestions, questions, theta);
    const level = getStudentLevel(theta);
    
    return {
      isComplete: true,
      theta,
      standardError: se,
      confidence: getConfidenceLevel(se),
      level,
      nextQuestion: null,
      progress: answeredIds.length / Math.min(targetCount, questions.length)
    };
  }
  
  // إذا لم يكتمل، اختر السؤال التالي
  const theta = currentTheta;
  const nextQuestion = getNextQuestion(theta, answeredIds, questions);
  
  return {
    isComplete: false,
    theta,
    nextQuestion,
    progress: answeredIds.length / Math.min(targetCount, questions.length),
    remaining: Math.min(targetCount, questions.length) - answeredIds.length
  };
};

// =============================================================
// 🔷 تصدير الدوال (للاستخدام في باقي التطبيق)
// =============================================================

export default {
  initializeTheta,
  calculateProbability,
  calculateInformation,
  estimateTheta,
  getNextQuestion,
  updateThetaAfterAnswer,
  getStudentLevel,
  calculateStandardError,
  getConfidenceLevel,
  runCATCycle
};
