// lib/adaptiveEngine.js
// ============================================================
// 🧠 محرك التكيف الذكي الفائق - Ultra Adaptive Engine
// يختار الأسئلة بناءً على 5 عوامل: الصعوبة، الأسلوب المعرفي،
// الحالة النفسية، الأداء الأخير، وقت اليوم
// ============================================================

import { getAllBasicsQuestions } from '../data/questions/basics';

// ============================================================
// 🔷 الثوابت والإعدادات
// ============================================================

const CONFIG = {
  // عوامل اختيار السؤال
  DIFFICULTY_WEIGHT: 0.30,
  LEARNING_STYLE_WEIGHT: 0.20,
  EMOTIONAL_WEIGHT: 0.20,
  PERFORMANCE_WEIGHT: 0.15,
  TIME_WEIGHT: 0.15,
  
  // عتبات الحالة النفسية
  BOREDOM_THRESHOLD: 60,
  ANXIETY_THRESHOLD: 60,
  CONFIDENCE_THRESHOLD: 70,
  
  // عدد الأسئلة في التقييم السريع والشامل
  QUICK_QUESTIONS: 12,
  FULL_QUESTIONS: 30,
};

// ============================================================
// 🔷 الكلاس الرئيسي - UltraAdaptiveEngine
// ============================================================

class UltraAdaptiveEngine {
  constructor(options = {}) {
    this.theta = options.theta || 0;
    this.answeredIds = options.answeredIds || [];
    this.allQuestions = options.allQuestions || getAllBasicsQuestions();
    this.mode = options.mode || 'full'; // 'quick' | 'full'
    this.learningStyle = options.learningStyle || 'visual'; // 'visual' | 'auditory' | 'kinesthetic'
    this.emotionalState = options.emotionalState || 'neutral'; // 'calm' | 'anxious' | 'bored' | 'neutral'
    this.recentPerformance = options.recentPerformance || 'stable'; // 'improving' | 'declining' | 'stable'
    this.timeOfDay = options.timeOfDay || this.getTimeOfDay();
    this.userHistory = options.userHistory || [];
    this.boredomScore = 0;
    this.anxietyScore = 0;
    this.confidenceScore = 50;
    this.consecutiveErrors = 0;
    this.consecutiveCorrect = 0;
    this.questionHistory = [];
    this.performanceTrend = [];
    
    // تحديد عدد الأسئلة حسب الوضع
    this.targetCount = this.mode === 'quick' 
      ? CONFIG.QUICK_QUESTIONS 
      : CONFIG.FULL_QUESTIONS;
  }

  // ============================================================
  // 🔷 دوال الحصول على الوقت والسياق
  // ============================================================

  /**
   * الحصول على وقت اليوم
   * @returns {string} 'morning' | 'afternoon' | 'evening' | 'night'
   */
  getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  }

  /**
   * الحصول على عامل الوقت
   * @returns {number} 0-1
   */
  getTimeFactor() {
    const factors = {
      'morning': 0.9,    // الصباح: أداء جيد
      'afternoon': 0.6,  // بعد الظهر: أداء متوسط
      'evening': 0.7,    // المساء: أداء جيد
      'night': 0.4,      // الليل: أداء ضعيف
    };
    return factors[this.timeOfDay] || 0.6;
  }

  // ============================================================
  // 🔷 دوال تحديث الحالة
  // ============================================================

  /**
   * تحديث الحالة النفسية بناءً على الأداء
   * @param {boolean} isCorrect - هل الإجابة صحيحة؟
   * @param {number} timeTaken - الوقت المستغرق
   * @param {number} hesitation - درجة التردد (0-100)
   */
  updateEmotionalState(isCorrect, timeTaken, hesitation = 0) {
    // تحديث الثقة
    if (isCorrect) {
      this.confidenceScore = Math.min(100, this.confidenceScore + 5);
      this.consecutiveCorrect++;
      this.consecutiveErrors = 0;
    } else {
      this.confidenceScore = Math.max(0, this.confidenceScore - 8);
      this.consecutiveErrors++;
      this.consecutiveCorrect = 0;
    }
    
    // تحديث الملل (أخطاء متتالية = ملل)
    if (this.consecutiveErrors >= 3) {
      this.boredomScore = Math.min(100, this.boredomScore + 15);
    } else {
      this.boredomScore = Math.max(0, this.boredomScore - 5);
    }
    
    // تحديث القلق (تردد + وقت طويل = قلق)
    if (hesitation > 50 && timeTaken > 15000) {
      this.anxietyScore = Math.min(100, this.anxietyScore + 10);
    } else {
      this.anxietyScore = Math.max(0, this.anxietyScore - 5);
    }
    
    // تحديث الحالة
    if (this.anxietyScore > CONFIG.ANXIETY_THRESHOLD) {
      this.emotionalState = 'anxious';
    } else if (this.boredomScore > CONFIG.BOREDOM_THRESHOLD) {
      this.emotionalState = 'bored';
    } else if (this.confidenceScore > CONFIG.CONFIDENCE_THRESHOLD) {
      this.emotionalState = 'calm';
    } else {
      this.emotionalState = 'neutral';
    }
    
    // تحديث اتجاه الأداء
    this.performanceTrend.push(isCorrect);
    if (this.performanceTrend.length > 10) {
      this.performanceTrend.shift();
    }
    this.updatePerformanceTrend();
  }

  /**
   * تحديث اتجاه الأداء
   */
  updatePerformanceTrend() {
    if (this.performanceTrend.length < 3) {
      this.recentPerformance = 'stable';
      return;
    }
    
    const recent = this.performanceTrend.slice(-5);
    const correctCount = recent.filter(Boolean).length;
    const percentage = (correctCount / recent.length) * 100;
    
    // مقارنة مع الأداء السابق
    const older = this.performanceTrend.slice(-10, -5);
    if (older.length > 0) {
      const olderCorrect = older.filter(Boolean).length;
      const olderPercentage = (olderCorrect / older.length) * 100;
      
      if (percentage > olderPercentage + 15) {
        this.recentPerformance = 'improving';
      } else if (percentage < olderPercentage - 15) {
        this.recentPerformance = 'declining';
      } else {
        this.recentPerformance = 'stable';
      }
    } else {
      this.recentPerformance = 'stable';
    }
  }

  /**
   * الحصول على عامل الأداء
   * @returns {number} 0-1
   */
  getPerformanceFactor() {
    const factors = {
      'improving': 0.9,
      'stable': 0.7,
      'declining': 0.4,
    };
    return factors[this.recentPerformance] || 0.6;
  }

  /**
   * الحصول على عامل الحالة النفسية
   * @returns {number} 0-1
   */
  getEmotionalFactor() {
    const factors = {
      'calm': 0.9,
      'neutral': 0.7,
      'anxious': 0.4,
      'bored': 0.3,
    };
    return factors[this.emotionalState] || 0.6;
  }

  /**
   * الحصول على عامل أسلوب التعلم
   * @param {Object} question - كائن السؤال
   * @returns {number} 0-1
   */
  getLearningStyleFactor(question) {
    // تقييم مدى توافق السؤال مع أسلوب التعلم
    let score = 0.5;
    
    // الأسئلة البصرية (رسوم بيانية، جداول)
    if (this.learningStyle === 'visual') {
      if (question.hasDiagram || question.hasTable) score += 0.3;
      if (question.question.includes('رسم') || question.question.includes('شكل')) score += 0.2;
    }
    
    // الأسئلة السمعية (نصوص طويلة، تفسيرات)
    if (this.learningStyle === 'auditory') {
      if (question.question.length > 100) score += 0.2;
      if (question.explanation && question.explanation.length > 50) score += 0.2;
    }
    
    // الأسئلة الحركية (تطبيقات، حسابات)
    if (this.learningStyle === 'kinesthetic') {
      if (question.cognitiveLevel === 'applying' || question.cognitiveLevel === 'analyzing') {
        score += 0.3;
      }
      if (question.subSkill && question.subSkill.includes('calc')) score += 0.2;
    }
    
    return Math.min(1, score);
  }

  // ============================================================
  // 🔷 دوال اختيار السؤال التالي
  // ============================================================

  /**
   * اختيار السؤال التالي (الدالة الرئيسية)
   * @param {Object} options - خيارات إضافية
   * @returns {Object|null} السؤال المختار
   */
  selectNextQuestion(options = {}) {
    const { 
      excludeIds = [], 
      preferTopic = null,
      minDifficulty = -3,
      maxDifficulty = 3,
    } = options;
    
    // الحصول على الأسئلة المتاحة
    const available = this.getAvailableQuestions(excludeIds);
    if (available.length === 0) return null;
    
    // حساب درجة الملاءمة لكل سؤال
    const scored = available.map(question => ({
      question,
      score: this.calculateQuestionScore(question, preferTopic),
      difficultyMatch: this.calculateDifficultyScore(question),
    }));
    
    // ترتيب حسب الدرجة
    scored.sort((a, b) => b.score - a.score);
    
    // اختيار أفضل سؤال
    const best = scored[0];
    if (!best) return null;
    
    // تسجيل السؤال في التاريخ
    this.questionHistory.push(best.question.id);
    
    return best.question;
  }

  /**
   * حساب درجة ملاءمة السؤال
   * @param {Object} question - كائن السؤال
   * @param {string|null} preferTopic - الموضوع المفضل
   * @returns {number} درجة الملاءمة (0-1)
   */
  calculateQuestionScore(question, preferTopic = null) {
    // 1. عامل الصعوبة (IRT)
    const difficultyScore = this.calculateDifficultyScore(question);
    
    // 2. عامل أسلوب التعلم
    const learningScore = this.getLearningStyleFactor(question);
    
    // 3. عامل الحالة النفسية
    const emotionalScore = this.getEmotionalFactor();
    
    // 4. عامل الأداء الأخير
    const performanceScore = this.getPerformanceFactor();
    
    // 5. عامل الوقت
    const timeScore = this.getTimeFactor();
    
    // 6. عامل الموضوع المفضل
    let topicScore = 0.5;
    if (preferTopic && question.topic === preferTopic) {
      topicScore = 0.9;
    } else if (preferTopic) {
      topicScore = 0.4;
    }
    
    // 7. عامل التنوع (تجنب تكرار نفس النوع)
    const varietyScore = this.getVarietyScore(question);
    
    // 8. عامل التعلم (اختيار أسئلة في منطقة التطور القريبة)
    const zoneScore = this.getZoneOfProximalDevelopment(question);
    
    // الوزن النهائي
    const finalScore = 
      difficultyScore * CONFIG.DIFFICULTY_WEIGHT +
      learningScore * CONFIG.LEARNING_STYLE_WEIGHT +
      emotionalScore * CONFIG.EMOTIONAL_WEIGHT +
      performanceScore * CONFIG.PERFORMANCE_WEIGHT +
      timeScore * CONFIG.TIME_WEIGHT +
      topicScore * 0.1 +
      varietyScore * 0.1 +
      zoneScore * 0.1;
    
    return Math.min(1, Math.max(0, finalScore));
  }

  /**
   * حساب درجة الصعوبة
   * @param {Object} question - كائن السؤال
   * @returns {number} 0-1
   */
  calculateDifficultyScore(question) {
    if (!question.irt) return 0.5;
    
    const { b } = question.irt; // b = معامل الصعوبة
    const theta = this.theta;
    
    // المسافة بين مستوى الطالب وصعوبة السؤال
    const distance = Math.abs(theta - b);
    
    // نريد أسئلة قريبة من مستوى الطالب
    // إذا كان الفرق صغيراً => درجة عالية
    // إذا كان الفرق كبيراً => درجة منخفضة
    const score = Math.max(0, 1 - (distance / 4));
    
    return Math.min(1, score);
  }

  /**
   * حساب درجة التنوع
   * @param {Object} question - كائن السؤال
   * @returns {number} 0-1
   */
  getVarietyScore(question) {
    const recentQuestions = this.questionHistory.slice(-5);
    const recentTopics = recentQuestions.map(id => {
      const q = this.allQuestions.find(q => q.id === id);
      return q ? q.topic : null;
    }).filter(Boolean);
    
    // إذا كان الموضوع متكرراً، خفض الدرجة
    const topicCount = recentTopics.filter(t => t === question.topic).length;
    if (topicCount >= 3) return 0.2;
    if (topicCount >= 2) return 0.5;
    return 0.9;
  }

  /**
   * حساب منطقة التطور القريبة (ZPD)
   * @param {Object} question - كائن السؤال
   * @returns {number} 0-1
   */
  getZoneOfProximalDevelopment(question) {
    if (!question.irt) return 0.5;
    
    const { b } = question.irt;
    const theta = this.theta;
    
    // ZPD = أسئلة أصعب بقليل من المستوى الحالي
    const idealDifficulty = theta + 0.5;
    const distance = Math.abs(b - idealDifficulty);
    
    // أفضل الأسئلة هي التي تكون أصعب بقليل
    if (b > theta && distance < 1) return 0.9;
    if (distance < 0.5) return 0.7;
    if (distance < 1.5) return 0.5;
    return 0.3;
  }

  /**
   * الحصول على الأسئلة المتاحة
   * @param {Array} excludeIds - معرفات مستثناة
   * @returns {Array} الأسئلة المتاحة
   */
  getAvailableQuestions(excludeIds = []) {
    const allIds = new Set([...this.answeredIds, ...excludeIds]);
    return this.allQuestions.filter(q => !allIds.has(q.id));
  }

  /**
   * التحقق من اكتمال التقييم
   * @returns {boolean}
   */
  isComplete() {
    return this.answeredIds.length >= this.targetCount || 
           this.answeredIds.length >= this.allQuestions.length;
  }

  // ============================================================
  // 🔷 دوال تكييف واجهة السؤال
  // ============================================================

  /**
   * تحديد نوع واجهة السؤال حسب حالة الطالب
   * @param {Object} question - كائن السؤال
   * @returns {Object} تكوين الواجهة
   */
  adaptQuestionUI(question) {
    let format = 'multiple-choice';
    let withHints = false;
    let interactive = false;
    
    // 1. حسب الحالة النفسية
    if (this.emotionalState === 'anxious') {
      withHints = true;
      format = 'multiple-choice';
    } else if (this.emotionalState === 'bored') {
      interactive = true;
      format = 'drag-and-drop';
    } else if (this.emotionalState === 'calm' && this.confidenceScore > 70) {
      format = 'writing';
    }
    
    // 2. حسب أسلوب التعلم
    if (this.learningStyle === 'visual' && question.hasDiagram) {
      format = 'diagram-label';
    } else if (this.learningStyle === 'kinesthetic' && question.cognitiveLevel === 'applying') {
      format = 'interactive';
    }
    
    // 3. حسب الأداء الأخير
    if (this.recentPerformance === 'declining' && this.consecutiveErrors >= 2) {
      withHints = true;
    }
    
    // 4. إذا كان سؤالاً كتابياً
    if (question.isWriting) {
      format = 'writing';
    }
    
    return {
      format,
      withHints,
      interactive,
      showTimer: this.emotionalState !== 'anxious',
      showProgress: true,
    };
  }

  /**
   * توليد تلميح ذكي
   * @param {Object} question - كائن السؤال
   * @param {number} errorProbability - احتمال الخطأ
   * @returns {string|null} التلميح
   */
  generateSmartHint(question, errorProbability) {
    // إذا كان احتمال الخطأ منخفضاً، لا حاجة لتلميح
    if (errorProbability < 0.4) return null;
    
    // توليد تلميح حسب نوع الخطأ
    const hintTypes = {
      conceptual: '💡 تذكر: هذا المفهوم يعتمد على فهم العلاقة بين العناصر الأساسية.',
      calculation: '🧮 انتبه: تحقق من العمليات الحسابية خطوة بخطوة.',
      application: '⚙️ طبق: حاول تطبيق المعلومة على سياق مشابه.',
      memorization: '📚 راجع: استخدم الربط بين المفاهيم بدلاً من الحفظ المنفصل.',
    };
    
    const errorType = question.errorPattern || 'conceptual';
    const baseHint = hintTypes[errorType] || hintTypes.conceptual;
    
    // تلميحات إضافية حسب السياق
    let contextHint = '';
    if (this.emotionalState === 'anxious') {
      contextHint = ' 🌿 خذ نفساً عميقاً، أنت قادر على حل هذا السؤال.';
    } else if (this.emotionalState === 'bored') {
      contextHint = ' 🎯 حاول التركيز على التفاصيل الدقيقة.';
    }
    
    return baseHint + contextHint;
  }

  /**
   * حساب احتمال الخطأ
   * @param {Object} question - كائن السؤال
   * @returns {number} 0-1
   */
  calculateErrorProbability(question) {
    if (!question.irt) return 0.5;
    
    const { a, b, c } = question.irt;
    const theta = this.theta;
    
    // حساب الاحتمال باستخدام IRT 3PL
    const exponent = -a * (theta - b);
    const probability = c + (1 - c) / (1 + Math.exp(exponent));
    
    // احتمال الخطأ = 1 - احتمال الصحة
    let errorProb = 1 - probability;
    
    // تعديل حسب الحالة النفسية
    if (this.emotionalState === 'anxious') {
      errorProb += 0.15; // القلق يزيد من احتمال الخطأ
    } else if (this.emotionalState === 'bored') {
      errorProb += 0.10; // الملل يزيد من احتمال الخطأ
    } else if (this.emotionalState === 'calm') {
      errorProb -= 0.05; // الهدوء يقلل من احتمال الخطأ
    }
    
    // حصر القيمة بين 0 و 1
    return Math.max(0, Math.min(1, errorProb));
  }

  // ============================================================
  // 🔷 دوال تحديث القدرة (Theta)
  // ============================================================

  /**
   * تحديث القدرة بعد كل إجابة
   * @param {Object} question - كائن السؤال
   * @param {boolean} isCorrect - هل الإجابة صحيحة؟
   * @param {number} timeTaken - الوقت المستغرق
   * @param {number} hesitation - درجة التردد
   */
  updateTheta(question, isCorrect, timeTaken, hesitation = 0) {
    if (!question || !question.irt) return;
    
    // تحديث الحالة النفسية
    this.updateEmotionalState(isCorrect, timeTaken, hesitation);
    
    // حساب التعديل
    const { a } = question.irt;
    const learningRate = 0.15;
    
    // كلما كان السؤال صعباً، كان التعديل أكبر
    const difficultyFactor = Math.min(1, Math.abs(question.irt.b) / 3);
    
    // تعديل الثيتا
    const adjustment = learningRate * (isCorrect ? 1 : -1) * (0.5 + difficultyFactor * 0.5);
    this.theta = Math.max(-3, Math.min(3, this.theta + adjustment));
    
    // إضافة السؤال إلى الإجابات
    this.answeredIds.push(question.id);
  }

  // ============================================================
  // 🔷 دوال التقرير
  // ============================================================

  /**
   * الحصول على تقرير حالة التكيف
   * @returns {Object} تقرير كامل
   */
  getAdaptationReport() {
    return {
      theta: this.theta,
      answeredCount: this.answeredIds.length,
      targetCount: this.targetCount,
      isComplete: this.isComplete(),
      progress: this.answeredIds.length / this.targetCount,
      
      emotionalState: {
        state: this.emotionalState,
        confidence: this.confidenceScore,
        boredom: this.boredomScore,
        anxiety: this.anxietyScore,
      },
      
      performance: {
        trend: this.recentPerformance,
        consecutiveErrors: this.consecutiveErrors,
        consecutiveCorrect: this.consecutiveCorrect,
        recentAccuracy: this.getRecentAccuracy(),
      },
      
      context: {
        timeOfDay: this.timeOfDay,
        timeFactor: this.getTimeFactor(),
        learningStyle: this.learningStyle,
      },
      
      uiAdaptation: {
        recommendedFormat: this.determineFormat(),
        shouldShowHints: this.shouldShowHints(),
        recommendedDifficulty: this.getRecommendedDifficulty(),
      },
    };
  }

  /**
   * الحصول على الدقة الأخيرة
   * @returns {number} 0-100
   */
  getRecentAccuracy() {
    const recent = this.performanceTrend.slice(-10);
    if (recent.length === 0) return 50;
    const correct = recent.filter(Boolean).length;
    return Math.round((correct / recent.length) * 100);
  }

  /**
   * تحديد تنسيق العرض الموصى به
   * @returns {string}
   */
  determineFormat() {
    if (this.emotionalState === 'bored') return 'interactive';
    if (this.emotionalState === 'anxious') return 'simple';
    if (this.confidenceScore > 70) return 'challenging';
    return 'standard';
  }

  /**
   * تحديد ما إذا كان يجب عرض التلميحات
   * @returns {boolean}
   */
  shouldShowHints() {
    return this.emotionalState === 'anxious' || 
           this.consecutiveErrors >= 2 ||
           this.recentPerformance === 'declining';
  }

  /**
   * الحصول على مستوى الصعوبة الموصى به
   * @returns {number}
   */
  getRecommendedDifficulty() {
    if (this.emotionalState === 'anxious') return -0.5;
    if (this.emotionalState === 'bored') return 1.0;
    if (this.confidenceScore > 70) return 0.5;
    return 0;
  }

  /**
   * إعادة تعيين المحرك
   */
  reset() {
    this.answeredIds = [];
    this.theta = 0;
    this.questionHistory = [];
    this.performanceTrend = [];
    this.consecutiveErrors = 0;
    this.consecutiveCorrect = 0;
    this.boredomScore = 0;
    this.anxietyScore = 0;
    this.confidenceScore = 50;
    this.emotionalState = 'neutral';
    this.recentPerformance = 'stable';
  }

  /**
   * تعيين جميع الأسئلة
   * @param {Array} questions
   */
  setAllQuestions(questions) {
    this.allQuestions = questions;
  }

  /**
   * تعيين أسلوب التعلم
   * @param {string} style - 'visual' | 'auditory' | 'kinesthetic'
   */
  setLearningStyle(style) {
    if (['visual', 'auditory', 'kinesthetic'].includes(style)) {
      this.learningStyle = style;
    }
  }
}

// ============================================================
// 🔷 تصدير الكلاس والدوال المساعدة
// ============================================================

export default UltraAdaptiveEngine;

/**
 * إنشاء محرك تكيف جديد
 * @param {Object} options - خيارات التهيئة
 * @returns {UltraAdaptiveEngine} كائن المحرك
 */
export const createAdaptiveEngine = (options = {}) => {
  return new UltraAdaptiveEngine(options);
};

/**
 * دورة كاملة لتشغيل التقييم التكيفي
 * @param {Object} params - معاملات الدورة
 * @returns {Object} نتائج الدورة
 */
export const runAdaptiveCycle = ({
  currentTheta = 0,
  answeredIds = [],
  allQuestions = null,
  mode = 'full',
  learningStyle = 'visual',
  emotionalState = 'neutral',
  recentPerformance = 'stable',
  timeOfDay = null,
  userHistory = [],
}) => {
  const engine = new UltraAdaptiveEngine({
    theta: currentTheta,
    answeredIds,
    allQuestions: allQuestions || getAllBasicsQuestions(),
    mode,
    learningStyle,
    emotionalState,
    recentPerformance,
    timeOfDay: timeOfDay || engine?.getTimeOfDay() || 'morning',
    userHistory,
  });
  
  const isComplete = engine.isComplete();
  const nextQuestion = isComplete ? null : engine.selectNextQuestion();
  
  return {
    isComplete,
    nextQuestion,
    theta: engine.theta,
    progress: engine.answeredIds.length / engine.targetCount,
    remaining: engine.targetCount - engine.answeredIds.length,
    uiAdaptation: nextQuestion ? engine.adaptQuestionUI(nextQuestion) : null,
    hint: nextQuestion ? engine.generateSmartHint(nextQuestion, engine.calculateErrorProbability(nextQuestion)) : null,
    report: engine.getAdaptationReport(),
  };
};

/**
 * دمج محركات متعددة في تقرير واحد
 * @param {Array<UltraAdaptiveEngine>} engines - المصفوفة المحركات
 * @returns {Object} تقرير مجمع
 */
export const mergeAdaptiveReports = (engines) => {
  if (!engines || engines.length === 0) return null;
  
  const merged = {
    totalSessions: engines.length,
    averageTheta: 0,
    totalQuestions: 0,
    averageConfidence: 0,
    averageBoredom: 0,
    averageAnxiety: 0,
    performanceTrends: [],
    commonEmotionalStates: {},
  };
  
  let sumTheta = 0;
  let sumConfidence = 0;
  let sumBoredom = 0;
  let sumAnxiety = 0;
  
  const stateCounts = {};
  
  for (const engine of engines) {
    const report = engine.getAdaptationReport();
    sumTheta += report.theta;
    sumConfidence += report.emotionalState.confidence;
    sumBoredom += report.emotionalState.boredom;
    sumAnxiety += report.emotionalState.anxiety;
    merged.totalQuestions += report.answeredCount;
    
    const state = report.emotionalState.state;
    stateCounts[state] = (stateCounts[state] || 0) + 1;
    
    merged.performanceTrends.push({
      trend: report.performance.trend,
      accuracy: report.performance.recentAccuracy,
    });
  }
  
  merged.averageTheta = sumTheta / engines.length;
  merged.averageConfidence = sumConfidence / engines.length;
  merged.averageBoredom = sumBoredom / engines.length;
  merged.averageAnxiety = sumAnxiety / engines.length;
  merged.commonEmotionalStates = stateCounts;
  
  return merged;
};

// ============================================================
// 🔷 تصدير الثوابت للاستخدام الخارجي
// ============================================================

export const ADAPTIVE_CONFIG = CONFIG;
