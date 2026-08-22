// lib/trackingEngine.js
// ============================================================
// 🔥 محرك التتبع الذكي - Smart Tracking Engine
// يسجل جميع سلوكيات الطالب أثناء الاختبار بدقة عالية
// ============================================================

/**
 * ═══════════════════════════════════════════════════════════════
 * 📊 البيانات التي يتم تتبعها:
 * 
 * 1. الوقت: وقت القراءة، التفكير، القرار
 * 2. الحركة: hover، click، scroll، leave
 * 3. السلوك: تغيير الخيارات، التبديل بين التابات
 * 4. النفسي: التردد، الثقة، التركيز، التعب
 * 5. السياق: وقت اليوم، رقم الجلسة، نوع السؤال
 * ═══════════════════════════════════════════════════════════════
 */

// ============================================================
// 🔷 الثوابت والإعدادات
// ============================================================

const CONFIG = {
  MAX_HISTORY: 1000, // الحد الأقصى للأحداث المخزنة
  HESITATION_THRESHOLD: 3000, // 3 ثواني = تردد
  FOCUS_DURATION: 15, // 15 دقيقة قبل التشتت
  BOREDOM_THRESHOLD: 5, // 5 أخطاء متتالية = ملل
};

// ============================================================
// 🔷 الكلاس الرئيسي - TrackingEngine
// ============================================================

class TrackingEngine {
  constructor(userId, sessionId) {
    this.userId = userId;
    this.sessionId = sessionId;
    this.events = [];
    this.startTime = Date.now();
    this.questionStartTime = Date.now();
    this.currentQuestionId = null;
    this.previousAnswers = [];
    this.mouseMovements = [];
    this.tabSwitches = 0;
    this.scrollEvents = 0;
    this.hoverEvents = [];
    this.optionChanges = [];
    this.isActive = true;
    
    // إحصائيات الجلسة
    this.stats = {
      totalTime: 0,
      averageTimePerQuestion: 0,
      fastestAnswer: Infinity,
      slowestAnswer: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      skippedQuestions: 0,
      hesitations: 0,
      focusBreaks: 0,
    };
  }

  // ============================================================
  // 🔷 دوال تتبع الأحداث
  // ============================================================

  /**
   * بدء سؤال جديد
   * @param {string} questionId - معرف السؤال
   * @param {Object} questionData - بيانات السؤال
   */
  startQuestion(questionId, questionData) {
    this.currentQuestionId = questionId;
    this.questionStartTime = Date.now();
    this.events.push({
      type: 'question_start',
      questionId,
      timestamp: this.questionStartTime,
      questionData: {
        topic: questionData.topic,
        difficulty: questionData.difficulty,
        cognitiveLevel: questionData.cognitiveLevel,
        isWriting: questionData.isWriting || false,
      }
    });
  }

  /**
   * تسجيل اختيار خيار (لأسئلة الاختيار من متعدد)
   * @param {number} optionIndex - رقم الخيار المختار
   * @param {boolean} isCorrect - هل هو صحيح؟
   */
  selectOption(optionIndex, isCorrect) {
    const timeTaken = Date.now() - this.questionStartTime;
    const event = {
      type: 'select_option',
      questionId: this.currentQuestionId,
      optionIndex,
      isCorrect,
      timeTaken,
      timestamp: Date.now(),
      hesitationScore: this.calculateHesitation(timeTaken),
    };
    
    this.events.push(event);
    this.updateStats(event);
    
    // التحقق من الأنماط السلوكية
    this.detectBehavioralPatterns();
    
    return event;
  }

  /**
   * تسجيل إجابة كتابية
   * @param {string} answer - النص المكتوب
   * @param {boolean} isCorrect - هل هو صحيح؟
   */
  submitWritingAnswer(answer, isCorrect) {
    const timeTaken = Date.now() - this.questionStartTime;
    const event = {
      type: 'writing_answer',
      questionId: this.currentQuestionId,
      answer: answer.substring(0, 200), // حفظ أول 200 حرف فقط
      isCorrect,
      timeTaken,
      wordCount: answer.split(/\s+/).length,
      timestamp: Date.now(),
    };
    
    this.events.push(event);
    this.updateStats(event);
    this.detectBehavioralPatterns();
    
    return event;
  }

  /**
   * تسجيل تغيير الخيار (تردد)
   * @param {number} oldOption - الخيار القديم
   * @param {number} newOption - الخيار الجديد
   */
  changeOption(oldOption, newOption) {
    const event = {
      type: 'change_option',
      questionId: this.currentQuestionId,
      oldOption,
      newOption,
      timestamp: Date.now(),
      timeFromStart: Date.now() - this.questionStartTime,
    };
    
    this.events.push(event);
    this.optionChanges.push(event);
    
    return event;
  }

  /**
   * تسجيل تمرير الماوس فوق خيار
   * @param {number} optionIndex - رقم الخيار
   */
  hoverOption(optionIndex) {
    const event = {
      type: 'hover_option',
      questionId: this.currentQuestionId,
      optionIndex,
      timestamp: Date.now(),
      duration: 0, // سيتم تحديثه عند المغادرة
    };
    
    // بدء التتبع
    const startTime = Date.now();
    this.hoverEvents.push({
      ...event,
      startTime,
    });
    
    return event;
  }

  /**
   * تسجيل مغادرة الماوس لخيار
   * @param {number} optionIndex - رقم الخيار
   */
  unhoverOption(optionIndex) {
    const endTime = Date.now();
    const hoverEvent = this.hoverEvents.find(
      h => h.optionIndex === optionIndex && !h.endTime
    );
    
    if (hoverEvent) {
      hoverEvent.endTime = endTime;
      hoverEvent.duration = endTime - hoverEvent.startTime;
      
      this.events.push({
        type: 'unhover_option',
        questionId: this.currentQuestionId,
        optionIndex,
        duration: hoverEvent.duration,
        timestamp: endTime,
      });
    }
  }

  /**
   * تسجيل التبديل بين التابات (تشتت)
   */
  tabSwitch() {
    this.tabSwitches++;
    const event = {
      type: 'tab_switch',
      count: this.tabSwitches,
      timestamp: Date.now(),
      timeFromStart: Date.now() - this.questionStartTime,
    };
    
    this.events.push(event);
    this.stats.focusBreaks++;
    
    return event;
  }

  /**
   * تسجيل التمرير (بحث)
   */
  scroll() {
    this.scrollEvents++;
    const event = {
      type: 'scroll',
      count: this.scrollEvents,
      timestamp: Date.now(),
    };
    
    this.events.push(event);
    return event;
  }

  /**
   * تسجيل فقدان التركيز (التركيز على شيء آخر)
   */
  focusLost() {
    const event = {
      type: 'focus_lost',
      timestamp: Date.now(),
      duration: 0, // سيتم تحديثه عند العودة
    };
    
    this.events.push(event);
    this.stats.focusBreaks++;
    
    return event;
  }

  /**
   * تسجيل العودة للتركيز
   */
  focusGained() {
    const lastEvent = this.events[this.events.length - 1];
    if (lastEvent && lastEvent.type === 'focus_lost') {
      lastEvent.duration = Date.now() - lastEvent.timestamp;
    }
    
    this.events.push({
      type: 'focus_gained',
      timestamp: Date.now(),
    });
  }

  // ============================================================
  // 🔷 دوال التحليل والاستنتاج
  // ============================================================

  /**
   * حساب درجة التردد
   * @param {number} timeTaken - الوقت المستغرق
   * @returns {number} درجة التردد (0-100)
   */
  calculateHesitation(timeTaken) {
    // إذا كان الوقت طويلاً جداً (أكثر من 30 ثانية) = تردد عالٍ
    if (timeTaken > 30000) return 90;
    if (timeTaken > 20000) return 70;
    if (timeTaken > CONFIG.HESITATION_THRESHOLD) return 50;
    if (timeTaken > 5000) return 30;
    return 10;
  }

  /**
   * حساب درجة الثقة
   * @param {number} timeTaken - الوقت المستغرق
   * @param {boolean} isCorrect - هل الإجابة صحيحة؟
   * @param {number} changes - عدد تغييرات الخيارات
   * @returns {number} درجة الثقة (0-100)
   */
  calculateConfidence(timeTaken, isCorrect, changes = 0) {
    let confidence = 50; // بداية متوسطة
    
    // الثقة تزيد مع السرعة (لكن ليس بسرعة مفرطة)
    if (timeTaken < 3000) confidence += 20;
    else if (timeTaken < 7000) confidence += 10;
    else if (timeTaken > 15000) confidence -= 10;
    else if (timeTaken > 25000) confidence -= 20;
    
    // الثقة تزيد مع الصحة
    if (isCorrect) confidence += 15;
    else confidence -= 15;
    
    // الثقة تقل مع كثرة التغييرات
    if (changes > 3) confidence -= 20;
    else if (changes > 1) confidence -= 10;
    
    // حصر القيمة بين 0 و 100
    return Math.max(0, Math.min(100, confidence));
  }

  /**
   * حساب درجة التركيز
   * @param {number} sessionTime - وقت الجلسة بالدقائق
   * @param {number} breaks - عدد مرات فقدان التركيز
   * @param {number} errors - عدد الأخطاء المتتالية
   * @returns {number} درجة التركيز (0-100)
   */
  calculateFocus(sessionTime, breaks, errors) {
    let focus = 80; // بداية عالية
    
    // التركيز يقل مع طول الجلسة
    if (sessionTime > 30) focus -= 15;
    else if (sessionTime > 20) focus -= 10;
    else if (sessionTime > 10) focus -= 5;
    
    // التركيز يقل مع كثرة الانقطاعات
    if (breaks > 5) focus -= 20;
    else if (breaks > 3) focus -= 10;
    else if (breaks > 1) focus -= 5;
    
    // التركيز يقل مع كثرة الأخطاء المتتالية
    if (errors > 5) focus -= 20;
    else if (errors > 3) focus -= 10;
    
    return Math.max(0, Math.min(100, focus));
  }

  /**
   * تحديث الإحصائيات
   * @param {Object} event - الحدث المسجل
   */
  updateStats(event) {
    if (event.type === 'select_option' || event.type === 'writing_answer') {
      // تحديث الوقت الإجمالي
      this.stats.totalTime += event.timeTaken || 0;
      
      // تحديث متوسط الوقت
      const totalQuestions = this.stats.correctAnswers + this.stats.wrongAnswers;
      this.stats.averageTimePerQuestion = this.stats.totalTime / totalQuestions;
      
      // تحديث أسرع وأبطأ إجابة
      if (event.timeTaken < this.stats.fastestAnswer) {
        this.stats.fastestAnswer = event.timeTaken;
      }
      if (event.timeTaken > this.stats.slowestAnswer) {
        this.stats.slowestAnswer = event.timeTaken;
      }
      
      // تحديث الإجابات الصحيحة والخاطئة
      if (event.isCorrect) {
        this.stats.correctAnswers++;
      } else {
        this.stats.wrongAnswers++;
      }
    }
  }

  /**
   * اكتشاف الأنماط السلوكية
   */
  detectBehavioralPatterns() {
    const recentEvents = this.events.slice(-10);
    const errors = recentEvents.filter(e => e.isCorrect === false).length;
    const changes = this.optionChanges.slice(-5).length;
    const focusBreaks = this.stats.focusBreaks;
    const sessionTime = (Date.now() - this.startTime) / 60000; // بالدقائق
    
    // 1. اكتشاف الملل (5 أخطاء متتالية)
    if (errors >= CONFIG.BOREDOM_THRESHOLD) {
      this.events.push({
        type: 'pattern_detected',
        pattern: 'boredom',
        description: `ملاحظ: ${errors} أخطاء متتالية. قد يكون الطالب يشعر بالملل`,
        severity: 'high',
        timestamp: Date.now(),
      });
    }
    
    // 2. اكتشاف التردد (تغييرات كثيرة)
    if (changes >= 3) {
      this.events.push({
        type: 'pattern_detected',
        pattern: 'hesitation',
        description: `تردد عالٍ: ${changes} تغييرات في آخر 5 أسئلة`,
        severity: 'medium',
        timestamp: Date.now(),
      });
    }
    
    // 3. اكتشاف التعب (فقدان التركيز المتكرر)
    if (focusBreaks >= 3 && sessionTime > 15) {
      this.events.push({
        type: 'pattern_detected',
        pattern: 'fatigue',
        description: `تعب ملحوظ: ${focusBreaks} انقطاعات في ${Math.round(sessionTime)} دقيقة`,
        severity: 'medium',
        timestamp: Date.now(),
      });
    }
  }

  // ============================================================
  // 🔷 دوال التقرير والتصدير
  // ============================================================

  /**
   * الحصول على جميع البيانات المجمعة
   * @returns {Object} تقرير كامل عن الجلسة
   */
  getFullReport() {
    const sessionTime = (Date.now() - this.startTime) / 60000; // بالدقائق
    const totalAttempts = this.stats.correctAnswers + this.stats.wrongAnswers;
    
    // حساب مؤشرات إضافية
    const hesitationIndex = this.optionChanges.length / Math.max(1, totalAttempts);
    const focusScore = this.calculateFocus(sessionTime, this.stats.focusBreaks, this.stats.wrongAnswers);
    const confidenceScore = this.calculateAverageConfidence();
    const boredomScore = this.calculateBoredomScore();
    
    // تحليل النمط الزمني
    const temporalPattern = this.analyzeTemporalPattern();
    
    return {
      // معلومات أساسية
      userId: this.userId,
      sessionId: this.sessionId,
      startTime: this.startTime,
      endTime: Date.now(),
      duration: sessionTime,
      
      // الإحصائيات الأساسية
      stats: {
        ...this.stats,
        totalAttempts,
        accuracy: totalAttempts > 0 ? (this.stats.correctAnswers / totalAttempts) * 100 : 0,
      },
      
      // المؤشرات السلوكية
      behavioralIndicators: {
        hesitationIndex: Math.round(hesitationIndex * 100),
        focusScore: Math.round(focusScore),
        confidenceScore: Math.round(confidenceScore),
        boredomScore: Math.round(boredomScore),
        tabSwitches: this.tabSwitches,
        scrollEvents: this.scrollEvents,
        totalEvents: this.events.length,
      },
      
      // الأنماط المكتشفة
      detectedPatterns: this.events
        .filter(e => e.type === 'pattern_detected')
        .map(e => ({
          pattern: e.pattern,
          description: e.description,
          severity: e.severity,
          timestamp: e.timestamp,
        })),
      
      // النمط الزمني
      temporalPattern,
      
      // جميع الأحداث (للتخزين الكامل)
      events: this.events,
    };
  }

  /**
   * حساب متوسط الثقة
   * @returns {number} متوسط الثقة
   */
  calculateAverageConfidence() {
    const events = this.events.filter(
      e => e.type === 'select_option' || e.type === 'writing_answer'
    );
    
    if (events.length === 0) return 50;
    
    let totalConfidence = 0;
    let count = 0;
    
    for (const event of events) {
      const confidence = this.calculateConfidence(
        event.timeTaken,
        event.isCorrect,
        0 // سنحسب التغييرات بشكل منفصل
      );
      totalConfidence += confidence;
      count++;
    }
    
    return totalConfidence / count;
  }

  /**
   * حساب درجة الملل
   * @returns {number} درجة الملل (0-100)
   */
  calculateBoredomScore() {
    const recentEvents = this.events.slice(-20);
    const errors = recentEvents.filter(e => e.isCorrect === false).length;
    const changes = this.optionChanges.slice(-5).length;
    
    let boredom = 0;
    
    // أخطاء متتالية = ملل
    if (errors >= 5) boredom += 40;
    else if (errors >= 3) boredom += 20;
    
    // تغييرات كثيرة = ملل
    if (changes >= 3) boredom += 20;
    else if (changes >= 2) boredom += 10;
    
    // طول الجلسة = ملل
    const sessionTime = (Date.now() - this.startTime) / 60000;
    if (sessionTime > 30) boredom += 20;
    else if (sessionTime > 20) boredom += 10;
    
    return Math.min(100, boredom);
  }

  /**
   * تحليل النمط الزمني
   * @returns {Object} النمط الزمني للطالب
   */
  analyzeTemporalPattern() {
    const events = this.events.filter(
      e => e.type === 'select_option' || e.type === 'writing_answer'
    );
    
    if (events.length < 3) {
      return { type: 'insufficient_data', description: 'لا توجد بيانات كافية' };
    }
    
    // تقسيم الوقت إلى ثلاثة أثلاث
    const third = Math.floor(events.length / 3);
    const firstThird = events.slice(0, third);
    const secondThird = events.slice(third, third * 2);
    const lastThird = events.slice(third * 2);
    
    const avgTimes = [
      firstThird.reduce((sum, e) => sum + e.timeTaken, 0) / firstThird.length || 0,
      secondThird.reduce((sum, e) => sum + e.timeTaken, 0) / secondThird.length || 0,
      lastThird.reduce((sum, e) => sum + e.timeTaken, 0) / lastThird.length || 0,
    ];
    
    // تحديد النمط
    let type = 'stable';
    let description = 'أداء زمني مستقر';
    
    if (avgTimes[0] < avgTimes[1] && avgTimes[1] < avgTimes[2]) {
      type = 'accelerating';
      description = 'يزداد السرعة مع التقدم (يتحسن)';
    } else if (avgTimes[0] > avgTimes[1] && avgTimes[1] > avgTimes[2]) {
      type = 'decelerating';
      description = 'يبطئ مع التقدم (قد يكون متعباً)';
    } else if (avgTimes[0] < avgTimes[1] && avgTimes[1] > avgTimes[2]) {
      type = 'peaked';
      description = 'أداء متوسط (ذروة في المنتصف)';
    } else if (avgTimes[0] > avgTimes[1] && avgTimes[1] < avgTimes[2]) {
      type = 'valley';
      description = 'أداء غير مستقر (انخفاض في المنتصف)';
    }
    
    return {
      type,
      description,
      avgTimes,
      recommendation: this.getTemporalRecommendation(type),
    };
  }

  /**
   * الحصول على توصية زمنية
   * @param {string} type - النمط الزمني
   * @returns {string} التوصية
   */
  getTemporalRecommendation(type) {
    const recommendations = {
      accelerating: 'أنت تتحسن مع التقدم. حاول الحفاظ على هذا الزخم!',
      decelerating: 'لاحظت أنك تبطئ مع الوقت. خذ استراحة قصيرة في المنتصف.',
      peaked: 'أداؤك أفضل في المنتصف. ركز على الحفاظ على هذا المستوى.',
      valley: 'لديك انخفاض في المنتصف. حاول تغيير استراتيجيتك في منتصف الاختبار.',
      stable: 'أداؤك مستقر. استمر على هذا المنوال!',
    };
    return recommendations[type] || 'استمر في تحسين أدائك الزمني.';
  }

  /**
   * تصدير البيانات كـ JSON
   * @returns {string} البيانات بتنسيق JSON
   */
  exportJSON() {
    return JSON.stringify(this.getFullReport(), null, 2);
  }

  /**
   * تصدير البيانات للتخزين في Supabase
   * @returns {Object} البيانات الجاهزة للتخزين
   */
  exportForSupabase() {
    const report = this.getFullReport();
    return {
      user_id: this.userId,
      session_id: this.sessionId,
      start_time: new Date(this.startTime).toISOString(),
      end_time: new Date().toISOString(),
      duration_minutes: report.duration,
      stats: report.stats,
      behavioral_indicators: report.behavioralIndicators,
      detected_patterns: report.detectedPatterns,
      temporal_pattern: report.temporalPattern,
      events: report.events,
      created_at: new Date().toISOString(),
    };
  }

  /**
   * إعادة تعيين التتبع (لجلسة جديدة)
   */
  reset() {
    this.events = [];
    this.startTime = Date.now();
    this.questionStartTime = Date.now();
    this.currentQuestionId = null;
    this.previousAnswers = [];
    this.mouseMovements = [];
    this.tabSwitches = 0;
    this.scrollEvents = 0;
    this.hoverEvents = [];
    this.optionChanges = [];
    
    this.stats = {
      totalTime: 0,
      averageTimePerQuestion: 0,
      fastestAnswer: Infinity,
      slowestAnswer: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      skippedQuestions: 0,
      hesitations: 0,
      focusBreaks: 0,
    };
  }
}

// ============================================================
// 🔷 تصدير الكلاس
// ============================================================

export default TrackingEngine;

// ============================================================
// 🔷 دوال مساعدة (للاستخدام السريع)
// ============================================================

/**
 * إنشاء جلسة تتبع جديدة
 * @param {string} userId - معرف المستخدم
 * @returns {TrackingEngine} كائن التتبع
 */
export const createTrackingSession = (userId) => {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  return new TrackingEngine(userId, sessionId);
};

/**
 * دمج بيانات تتبع متعددة في تقرير واحد
 * @param {Array<TrackingEngine>} sessions - جلسات التتبع
 * @returns {Object} تقرير مجمع
 */
export const mergeTrackingSessions = (sessions) => {
  if (!sessions || sessions.length === 0) {
    return null;
  }
  
  const merged = {
    totalSessions: sessions.length,
    totalTime: 0,
    totalQuestions: 0,
    totalCorrect: 0,
    totalWrong: 0,
    averageAccuracy: 0,
    averageConfidence: 0,
    averageFocus: 0,
    commonPatterns: [],
    timeline: [],
  };
  
  let totalAccuracy = 0;
  let totalConfidence = 0;
  let totalFocus = 0;
  
  for (const session of sessions) {
    const report = session.getFullReport();
    merged.totalTime += report.duration;
    merged.totalQuestions += report.stats.totalAttempts;
    merged.totalCorrect += report.stats.correctAnswers;
    merged.totalWrong += report.stats.wrongAnswers;
    totalAccuracy += report.stats.accuracy;
    totalConfidence += report.behavioralIndicators.confidenceScore;
    totalFocus += report.behavioralIndicators.focusScore;
    
    merged.timeline.push({
      sessionId: report.sessionId,
      date: new Date(report.startTime).toISOString(),
      score: report.stats.accuracy,
      duration: report.duration,
    });
  }
  
  merged.averageAccuracy = totalAccuracy / sessions.length;
  merged.averageConfidence = totalConfidence / sessions.length;
  merged.averageFocus = totalFocus / sessions.length;
  
  // جمع الأنماط المتكررة
  const allPatterns = sessions.flatMap(s => 
    s.getFullReport().detectedPatterns.map(p => p.pattern)
  );
  const patternCounts = {};
  for (const pattern of allPatterns) {
    patternCounts[pattern] = (patternCounts[pattern] || 0) + 1;
  }
  merged.commonPatterns = Object.entries(patternCounts)
    .filter(([_, count]) => count > 1)
    .map(([pattern, count]) => ({ pattern, count }));
  
  return merged;
};
