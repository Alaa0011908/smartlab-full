// lib/adaptiveEngine.js
// ============================================================
// 🧠 محرك التكيف الذكي الفائق - Ultra Adaptive Engine
// ============================================================

import { getAllBasicsQuestions } from '../data/questions/basics';

// ============================================================
// 🔷 الثوابت والإعدادات
// ============================================================

const CONFIG = {
  DIFFICULTY_WEIGHT: 0.30,
  LEARNING_STYLE_WEIGHT: 0.20,
  EMOTIONAL_WEIGHT: 0.20,
  PERFORMANCE_WEIGHT: 0.15,
  TIME_WEIGHT: 0.15,
  BOREDOM_THRESHOLD: 60,
  ANXIETY_THRESHOLD: 60,
  CONFIDENCE_THRESHOLD: 70,
  QUICK_QUESTIONS: 12,
  FULL_QUESTIONS: 30,
};

// ============================================================
// 🔷 الكلاس الرئيسي
// ============================================================

class UltraAdaptiveEngine {
  constructor(options = {}) {
    this.theta = options.theta || 0;
    this.answeredIds = options.answeredIds || [];
    this.allQuestions = options.allQuestions || getAllBasicsQuestions();
    this.mode = options.mode || 'full';
    this.learningStyle = options.learningStyle || 'visual';
    this.emotionalState = options.emotionalState || 'neutral';
    this.recentPerformance = options.recentPerformance || 'stable';
    this.timeOfDay = options.timeOfDay || this.getTimeOfDay();
    this.userHistory = options.userHistory || [];
    this.boredomScore = 0;
    this.anxietyScore = 0;
    this.confidenceScore = 50;
    this.consecutiveErrors = 0;
    this.consecutiveCorrect = 0;
    this.questionHistory = [];
    this.performanceTrend = [];
    
    this.targetCount = this.mode === 'quick' 
      ? CONFIG.QUICK_QUESTIONS 
      : CONFIG.FULL_QUESTIONS;
  }

  // ============================================================
  // 🔷 دوال الوقت والسياق
  // ============================================================

  getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  }

  getTimeFactor() {
    const factors = {
      'morning': 0.9,
      'afternoon': 0.6,
      'evening': 0.7,
      'night': 0.4,
    };
    return factors[this.timeOfDay] || 0.6;
  }

  // ============================================================
  // 🔷 دوال تحديث الحالة
  // ============================================================

  updateEmotionalState(isCorrect, timeTaken, hesitation = 0) {
    if (isCorrect) {
      this.confidenceScore = Math.min(100, this.confidenceScore + 5);
      this.consecutiveCorrect++;
      this.consecutiveErrors = 0;
    } else {
      this.confidenceScore = Math.max(0, this.confidenceScore - 8);
      this.consecutiveErrors++;
      this.consecutiveCorrect = 0;
    }
    
    if (this.consecutiveErrors >= 3) {
      this.boredomScore = Math.min(100, this.boredomScore + 15);
    } else {
      this.boredomScore = Math.max(0, this.boredomScore - 5);
    }
    
    if (hesitation > 50 && timeTaken > 15000) {
      this.anxietyScore = Math.min(100, this.anxietyScore + 10);
    } else {
      this.anxietyScore = Math.max(0, this.anxietyScore - 5);
    }
    
    if (this.anxietyScore > CONFIG.ANXIETY_THRESHOLD) {
      this.emotionalState = 'anxious';
    } else if (this.boredomScore > CONFIG.BOREDOM_THRESHOLD) {
      this.emotionalState = 'bored';
    } else if (this.confidenceScore > CONFIG.CONFIDENCE_THRESHOLD) {
      this.emotionalState = 'calm';
    } else {
      this.emotionalState = 'neutral';
    }
    
    this.performanceTrend.push(isCorrect);
    if (this.performanceTrend.length > 10) {
      this.performanceTrend.shift();
    }
    this.updatePerformanceTrend();
  }

  updatePerformanceTrend() {
    if (this.performanceTrend.length < 3) {
      this.recentPerformance = 'stable';
      return;
    }
    
    const recent = this.performanceTrend.slice(-5);
    const correctCount = recent.filter(Boolean).length;
    const percentage = (correctCount / recent.length) * 100;
    
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

  getPerformanceFactor() {
    const factors = {
      'improving': 0.9,
      'stable': 0.7,
      'declining': 0.4,
    };
    return factors[this.recentPerformance] || 0.6;
  }

  getEmotionalFactor() {
    const factors = {
      'calm': 0.9,
      'neutral': 0.7,
      'anxious': 0.4,
      'bored': 0.3,
    };
    return factors[this.emotionalState] || 0.6;
  }

  getLearningStyleFactor(question) {
    let score = 0.5;
    
    if (this.learningStyle === 'visual') {
      if (question.hasDiagram || question.hasTable) score += 0.3;
      if (question.question && question.question.includes('رسم')) score += 0.2;
    }
    
    if (this.learningStyle === 'auditory') {
      if (question.question && question.question.length > 100) score += 0.2;
      if (question.explanation && question.explanation.length > 50) score += 0.2;
    }
    
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

  selectNextQuestion(options = {}) {
    const { 
      excludeIds = [], 
      preferTopic = null,
    } = options;
    
    const available = this.getAvailableQuestions(excludeIds);
    if (available.length === 0) return null;
    
    const scored = available.map(question => ({
      question,
      score: this.calculateQuestionScore(question, preferTopic),
      difficultyMatch: this.getDifficultyMatch(question),
    }));
    
    scored.sort((a, b) => b.score - a.score);
    
    const best = scored[0];
    if (!best) return null;
    
    this.questionHistory.push(best.question.id);
    
    return best.question;
  }

  calculateQuestionScore(question, preferTopic = null) {
    const difficultyScore = this.calculateDifficultyScore(question);
    const learningScore = this.getLearningStyleFactor(question);
    const emotionalScore = this.getEmotionalFactor();
    const performanceScore = this.getPerformanceFactor();
    const timeScore = this.getTimeFactor();
    
    let topicScore = 0.5;
    if (preferTopic && question.topic === preferTopic) {
      topicScore = 0.9;
    } else if (preferTopic) {
      topicScore = 0.4;
    }
    
    const varietyScore = this.getVarietyScore(question);
    const zoneScore = this.getZoneOfProximalDevelopment(question);
    
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

  // ✅ الدالة المفقودة - تم إضافتها هنا
  getDifficultyMatch(question) {
    if (!question || !question.irt) return 0.5;
    
    const { b } = question.irt;
    const theta = this.theta;
    const distance = Math.abs(theta - b);
    const score = Math.max(0, 1 - (distance / 4));
    return Math.min(1, score);
  }

  calculateDifficultyScore(question) {
    if (!question || !question.irt) return 0.5;
    
    const { b } = question.irt;
    const theta = this.theta;
    const distance = Math.abs(theta - b);
    const score = Math.max(0, 1 - (distance / 4));
    
    return Math.min(1, score);
  }

  getVarietyScore(question) {
    const recentQuestions = this.questionHistory.slice(-5);
    const recentTopics = recentQuestions.map(id => {
      const q = this.allQuestions.find(q => q.id === id);
      return q ? q.topic : null;
    }).filter(Boolean);
    
    const topicCount = recentTopics.filter(t => t === question.topic).length;
    if (topicCount >= 3) return 0.2;
    if (topicCount >= 2) return 0.5;
    return 0.9;
  }

  getZoneOfProximalDevelopment(question) {
    if (!question || !question.irt) return 0.5;
    
    const { b } = question.irt;
    const theta = this.theta;
    const idealDifficulty = theta + 0.5;
    const distance = Math.abs(b - idealDifficulty);
    
    if (b > theta && distance < 1) return 0.9;
    if (distance < 0.5) return 0.7;
    if (distance < 1.5) return 0.5;
    return 0.3;
  }

  getAvailableQuestions(excludeIds = []) {
    const allIds = new Set([...this.answeredIds, ...excludeIds]);
    return this.allQuestions.filter(q => !allIds.has(q.id));
  }

  isComplete() {
    return this.answeredIds.length >= this.targetCount || 
           this.answeredIds.length >= this.allQuestions.length;
  }

  // ============================================================
  // 🔷 دوال تكييف واجهة السؤال
  // ============================================================

  adaptQuestionUI(question) {
    let format = 'multiple-choice';
    let withHints = false;
    let interactive = false;
    
    if (this.emotionalState === 'anxious') {
      withHints = true;
      format = 'multiple-choice';
    } else if (this.emotionalState === 'bored') {
      interactive = true;
      format = 'drag-and-drop';
    } else if (this.emotionalState === 'calm' && this.confidenceScore > 70) {
      format = 'writing';
    }
    
    if (this.learningStyle === 'visual' && question && question.hasDiagram) {
      format = 'diagram-label';
    } else if (this.learningStyle === 'kinesthetic' && question && question.cognitiveLevel === 'applying') {
      format = 'interactive';
    }
    
    if (this.recentPerformance === 'declining' && this.consecutiveErrors >= 2) {
      withHints = true;
    }
    
    if (question && question.isWriting) {
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

  generateSmartHint(question, errorProbability) {
    if (!question || errorProbability < 0.4) return null;
    
    const hintTypes = {
      conceptual: '💡 تذكر: هذا المفهوم يعتمد على فهم العلاقة بين العناصر الأساسية.',
      calculation: '🧮 انتبه: تحقق من العمليات الحسابية خطوة بخطوة.',
      application: '⚙️ طبق: حاول تطبيق المعلومة على سياق مشابه.',
      memorization: '📚 راجع: استخدم الربط بين المفاهيم بدلاً من الحفظ المنفصل.',
    };
    
    const errorType = question.errorPattern || 'conceptual';
    const baseHint = hintTypes[errorType] || hintTypes.conceptual;
    
    let contextHint = '';
    if (this.emotionalState === 'anxious') {
      contextHint = ' 🌿 خذ نفساً عميقاً، أنت قادر على حل هذا السؤال.';
    } else if (this.emotionalState === 'bored') {
      contextHint = ' 🎯 حاول التركيز على التفاصيل الدقيقة.';
    }
    
    return baseHint + contextHint;
  }

  calculateErrorProbability(question) {
    if (!question || !question.irt) return 0.5;
    
    const { a, b, c } = question.irt;
    const theta = this.theta;
    
    const exponent = -a * (theta - b);
    const probability = c + (1 - c) / (1 + Math.exp(exponent));
    
    let errorProb = 1 - probability;
    
    if (this.emotionalState === 'anxious') {
      errorProb += 0.15;
    } else if (this.emotionalState === 'bored') {
      errorProb += 0.10;
    } else if (this.emotionalState === 'calm') {
      errorProb -= 0.05;
    }
    
    return Math.max(0, Math.min(1, errorProb));
  }

  // ============================================================
  // 🔷 دوال تحديث القدرة
  // ============================================================

  updateTheta(question, isCorrect, timeTaken, hesitation = 0) {
    if (!question || !question.irt) return;
    
    this.updateEmotionalState(isCorrect, timeTaken, hesitation);
    
    const { a } = question.irt;
    const learningRate = 0.15;
    const difficultyFactor = Math.min(1, Math.abs(question.irt.b) / 3);
    
    const adjustment = learningRate * (isCorrect ? 1 : -1) * (0.5 + difficultyFactor * 0.5);
    this.theta = Math.max(-3, Math.min(3, this.theta + adjustment));
    
    this.answeredIds.push(question.id);
  }

  // ============================================================
  // 🔷 دوال التقرير
  // ============================================================

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

  getRecentAccuracy() {
    const recent = this.performanceTrend.slice(-10);
    if (recent.length === 0) return 50;
    const correct = recent.filter(Boolean).length;
    return Math.round((correct / recent.length) * 100);
  }

  determineFormat() {
    if (this.emotionalState === 'bored') return 'interactive';
    if (this.emotionalState === 'anxious') return 'simple';
    if (this.confidenceScore > 70) return 'challenging';
    return 'standard';
  }

  shouldShowHints() {
    return this.emotionalState === 'anxious' || 
           this.consecutiveErrors >= 2 ||
           this.recentPerformance === 'declining';
  }

  getRecommendedDifficulty() {
    if (this.emotionalState === 'anxious') return -0.5;
    if (this.emotionalState === 'bored') return 1.0;
    if (this.confidenceScore > 70) return 0.5;
    return 0;
  }

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

  setAllQuestions(questions) {
    this.allQuestions = questions;
  }

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

export const createAdaptiveEngine = (options = {}) => {
  return new UltraAdaptiveEngine(options);
};

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

export const ADAPTIVE_CONFIG = CONFIG;
