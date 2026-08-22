// pages/api/analyze.js
// ============================================================
// 🧠 محرك تحليل التعلم - Learning Analytics Engine v3.0
// يحلل أداء الطالب بأبعاد تعليمية متعددة
// ============================================================

import { getAllBasicsQuestions } from '../../data/questions/basics';
import { estimateTheta } from '../../lib/adaptiveEngine';

// ============================================================
// 🔷 الثوابت والإعدادات
// ============================================================

const CONFIG = {
  // عتبات المهارات
  MASTERY_THRESHOLD: 70,
  LEARNING_THRESHOLD: 40,
  WEAK_THRESHOLD: 30,
  
  // عتبات السلوك
  HESITATION_THRESHOLD: 3000, // 3 ثواني
  CONFIDENCE_HIGH: 70,
  CONFIDENCE_LOW: 40,
  HESITATION_THRESHOLD: 60,
  BOREDOM_THRESHOLD: 60,
  
  // عتبات الأداء
  EXCELLENT_SCORE: 80,
  GOOD_SCORE: 65,
  AVERAGE_SCORE: 50,
  POOR_SCORE: 35,
};

// ============================================================
// 🔷 دوال مساعدة (توحيد المهارات)
// ============================================================

// جدول توحيد المهارات (للتجميع)
const SKILL_UNIFICATION = {
  // أساسيات الشبكات
  'net_concepts': 'net_concepts',
  'net_models': 'net_models',
  'net_topologies': 'net_topologies',
  'net_media_cables': 'net_media_cables',
  'net_tcp_vs_udp': 'net_tcp_vs_udp',
  'net_vlan': 'net_vlan',
  'net_vpn': 'net_vpn',
  
  // IPv4
  'ipv4_structure': 'ipv4_structure',
  'ipv4_classes': 'ipv4_classes',
  'ipv4_public_private': 'ipv4_public_private',
  'ipv4_subnet_mask': 'ipv4_subnet_mask',
  'ipv4_subnetting_calc': 'ipv4_subnetting_calc',
  'ipv4_network_id': 'ipv4_network_id',
  'ipv4_broadcast': 'ipv4_broadcast',
  
  // Subnetting
  'subnet_cidr': 'subnet_cidr',
  'subnet_calculation': 'subnet_calculation',
  'subnet_network_id': 'subnet_network_id',
  'subnet_broadcast': 'subnet_broadcast',
  'subnet_hosts': 'subnet_hosts',
  'subnet_vlsm': 'subnet_vlsm',
  
  // IPv6
  'ipv6_structure': 'ipv6_structure',
  'ipv6_types': 'ipv6_types',
  'ipv6_shorten': 'ipv6_shorten',
  'ipv6_vs_ipv4': 'ipv6_vs_ipv4',
  
  // TCP/IP
  'tcpip_layers': 'tcpip_layers',
  'tcpip_tcp_vs_udp': 'tcpip_tcp_vs_udp',
  'tcpip_handshake': 'tcpip_handshake',
  'tcpip_http': 'tcpip_http',
  'tcpip_ports': 'tcpip_ports',
  
  // أجهزة الشبكات
  'device_switch': 'device_switch',
  'device_router': 'device_router',
  'device_firewall': 'device_firewall',
  'device_access_point': 'device_access_point',
  'device_hub_bridge': 'device_hub_bridge',
  
  // البريد الإلكتروني
  'email_smtp': 'email_smtp',
  'email_pop3': 'email_pop3',
  'email_imap': 'email_imap',
  'email_ports': 'email_ports',
  
  // الأمن واللاسلكي
  'wireless_principles': 'wireless_principles',
  'wireless_security': 'wireless_security',
  'security_acls': 'security_acls',
  'security_vpn': 'security_vpn',
};

function unifySkill(skill) {
  return SKILL_UNIFICATION[skill] || skill;
}

function getSkillDisplayName(skillId) {
  const names = {
    'net_concepts': 'مفاهيم الشبكات الأساسية',
    'net_models': 'نماذج الشبكات',
    'net_topologies': 'طبولوجيا الشبكات',
    'net_media_cables': 'وسائط النقل والكابلات',
    'net_tcp_vs_udp': 'الفرق بين TCP و UDP',
    'net_vlan': 'شبكات VLAN',
    'net_vpn': 'شبكات VPN',
    'ipv4_structure': 'بنية عنوان IPv4',
    'ipv4_classes': 'تصنيفات عناوين IPv4',
    'ipv4_public_private': 'العناوين العامة والخاصة',
    'ipv4_subnet_mask': 'أقنعة الشبكات الفرعية',
    'ipv4_subnetting_calc': 'حسابات الشبكات الفرعية',
    'ipv4_network_id': 'تحديد عنوان الشبكة',
    'ipv4_broadcast': 'تحديد عنوان البث',
    'subnet_cidr': 'ترميز CIDR',
    'subnet_calculation': 'حسابات Subnetting',
    'subnet_network_id': 'تحديد Network ID',
    'subnet_broadcast': 'تحديد Broadcast Address',
    'subnet_hosts': 'حساب عدد المضيفين',
    'subnet_vlsm': 'تقسيم VLSM',
    'ipv6_structure': 'بنية عنوان IPv6',
    'ipv6_types': 'أنواع عناوين IPv6',
    'ipv6_shorten': 'اختصار عناوين IPv6',
    'ipv6_vs_ipv4': 'المقارنة بين IPv4 و IPv6',
    'tcpip_layers': 'طبقات TCP/IP',
    'tcpip_tcp_vs_udp': 'TCP مقابل UDP',
    'tcpip_handshake': 'المصافحة الثلاثية',
    'tcpip_http': 'بروتوكولات HTTP/HTTPS',
    'tcpip_ports': 'المنافذ الشائعة',
    'device_switch': 'المبدل Switch',
    'device_router': 'الموجه Router',
    'device_firewall': 'جدار الحماية Firewall',
    'device_access_point': 'نقطة الوصول Access Point',
    'device_hub_bridge': 'الفرق بين Hub و Bridge',
    'email_smtp': 'بروتوكول SMTP',
    'email_pop3': 'بروتوكول POP3',
    'email_imap': 'بروتوكول IMAP',
    'email_ports': 'منافذ البريد الإلكتروني',
    'wireless_principles': 'مبادئ الشبكات اللاسلكية',
    'wireless_security': 'أمان الشبكات اللاسلكية',
    'security_acls': 'قوائم التحكم بالوصول ACLs',
    'security_vpn': 'شبكات VPN للأمان',
  };
  return names[skillId] || skillId.replace(/_/g, ' ');
}

// ============================================================
// 🔷 1. التحليل الزمني الدقيق (Micro-temporal Analysis)
// ============================================================

function analyzeMicroTemporal(events, timePerQuestion) {
  if (!events || events.length === 0) {
    return {
      readingTime: 0,
      processingTime: 0,
      decisionTime: 0,
      hesitationPoints: [],
      pattern: { type: 'unknown', interpretation: 'لا توجد بيانات كافية' },
      deviationFromAverage: {},
    };
  }

  // استخراج أحداث التوقيت
  const questionEvents = events.filter(e => e.type === 'question_start' || e.type === 'select_option');
  
  if (questionEvents.length < 2) {
    return {
      readingTime: 0,
      processingTime: 0,
      decisionTime: 0,
      hesitationPoints: [],
      pattern: { type: 'insufficient', interpretation: 'بيانات غير كافية' },
      deviationFromAverage: {},
    };
  }

  // حساب متوسط الأوقات
  const times = timePerQuestion || [];
  const avgTime = times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;
  
  // تحديد نقاط التردد
  const hesitationPoints = events
    .filter(e => e.type === 'hover_option' || e.type === 'change_option')
    .map(e => ({
      second: (e.timestamp - (events[0]?.timestamp || Date.now())) / 1000,
      action: e.type,
      optionIndex: e.optionIndex || e.oldOption,
    }));

  // تحديد النمط الزمني
  let patternType = 'stable';
  let interpretation = 'أداء زمني مستقر';
  
  if (times.length >= 3) {
    const firstThird = times.slice(0, Math.floor(times.length / 3));
    const lastThird = times.slice(Math.floor(times.length * 2 / 3));
    
    const avgFirst = firstThird.length > 0 ? firstThird.reduce((a, b) => a + b, 0) / firstThird.length : 0;
    const avgLast = lastThird.length > 0 ? lastThird.reduce((a, b) => a + b, 0) / lastThird.length : 0;
    
    if (avgLast < avgFirst * 0.7) {
      patternType = 'accelerating';
      interpretation = 'يزداد سرعة مع التقدم (يتحسن)';
    } else if (avgLast > avgFirst * 1.3) {
      patternType = 'decelerating';
      interpretation = 'يبطئ مع التقدم (قد يكون متعباً)';
    }
  }

  return {
    readingTime: avgTime * 0.3,
    processingTime: avgTime * 0.5,
    decisionTime: avgTime * 0.2,
    hesitationPoints: hesitationPoints.slice(0, 10),
    pattern: {
      type: patternType,
      interpretation,
      recommendation: patternType === 'decelerating' 
        ? 'لاحظت أنك تبطئ مع الوقت. خذ استراحة قصيرة في المنتصف.' 
        : patternType === 'accelerating'
        ? 'أنت تتحسن مع التقدم. حاول الحفاظ على هذا الزخم!'
        : 'أداؤك مستقر. استمر على هذا المنوال!',
    },
    deviationFromAverage: {
      readingTime: `${Math.round(((avgTime * 0.3) / 5) * 100)}%`,
      processingTime: `${Math.round(((avgTime * 0.5) / 10) * 100)}%`,
      decisionTime: `${Math.round(((avgTime * 0.2) / 3) * 100)}%`,
    },
  };
}

// ============================================================
// 🔷 2. تحليل المسار المعرفي (Cognitive Path Analysis)
// ============================================================

function analyzeCognitivePath(questions, answers, timePerQuestion) {
  // بناء تسلسل الأخطاء
  const errorSequence = [];
  let lastTopic = '';
  let consecutiveErrors = 0;
  let patternShift = null;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const isCorrect = answers[i] === q.correct;
    
    if (!isCorrect) {
      const topic = q.topic || 'عام';
      const errorType = q.errorPattern || 'conceptual';
      
      errorSequence.push({
        question: i + 1,
        topic,
        errorType,
        timeSpent: timePerQuestion?.[i] || 0,
      });
      
      if (topic === lastTopic) {
        consecutiveErrors++;
      } else {
        consecutiveErrors = 1;
        lastTopic = topic;
      }
      
      // اكتشاف تحول النمط (3 أخطاء متتالية في نفس الموضوع)
      if (consecutiveErrors >= 3 && !patternShift) {
        patternShift = {
          detected: true,
          atQuestion: i + 1,
          from: errorSequence[errorSequence.length - 2]?.errorType || 'unknown',
          to: errorType,
          interpretation: `بعد ${consecutiveErrors} أخطاء متتالية في "${topic}"، بدأ الطالب يفقد الثقة`,
          criticalPoint: true,
        };
      }
    } else {
      consecutiveErrors = 0;
    }
  }

  // اكتشاف التشتت الذهني (Mental Drift)
  const mentalDrift = detectMentalDrift(questions, answers, timePerQuestion);

  return {
    errorSequence: errorSequence.slice(0, 20),
    patternShift: patternShift || { detected: false },
    mentalDrift,
    totalErrors: errorSequence.length,
    errorDensity: questions.length > 0 ? (errorSequence.length / questions.length) * 100 : 0,
  };
}

function detectMentalDrift(questions, answers, timePerQuestion) {
  if (questions.length < 10) {
    return { detected: false };
  }

  // تقسيم الاختبار إلى ثلاثة أثلاث
  const third = Math.floor(questions.length / 3);
  const firstThird = questions.slice(0, third);
  const lastThird = questions.slice(third * 2);

  // حساب وقت الإجابة في الثلثين
  const firstTimes = timePerQuestion?.slice(0, third) || [];
  const lastTimes = timePerQuestion?.slice(third * 2) || [];

  const avgFirst = firstTimes.length > 0 ? firstTimes.reduce((a, b) => a + b, 0) / firstTimes.length : 0;
  const avgLast = lastTimes.length > 0 ? lastTimes.reduce((a, b) => a + b, 0) / lastTimes.length : 0;

  // حساب الأخطاء في الثلثين
  const firstErrors = firstThird.filter((_, i) => answers[i] !== questions[i]?.correct).length;
  const lastErrors = lastThird.filter((_, i) => answers[third * 2 + i] !== questions[third * 2 + i]?.correct).length;

  const detected = (avgLast > avgFirst * 1.4) && (lastErrors > firstErrors + 1);

  return {
    detected,
    startQuestion: detected ? Math.floor(questions.length * 0.6) : 0,
    symptoms: detected ? [
      `زيادة وقت الإجابة بنسبة ${Math.round((avgLast / avgFirst - 1) * 100)}%`,
      `زيادة الأخطاء في الثلث الأخير`,
    ] : [],
    interpretation: detected 
      ? 'يظهر علامات الإرهاق الذهني في النصف الثاني من الاختبار'
      : 'لا تظهر علامات التشتت الذهني',
    recommendation: detected 
      ? 'يحتاج استراحة قصيرة بعد كل 15 سؤال'
      : 'يبدو أن التركيز جيد طوال الاختبار',
  };
}

// ============================================================
// 🔷 3. تحليل الأخطاء العميق (Deep Error Analysis)
// ============================================================

function analyzeDeepErrors(questions, answers, timePerQuestion) {
  const errorTypes = {
    cognitive: { conceptual: 0, procedural: 0 },
    behavioral: { rushing: 0, hesitation: 0 },
    behavioral: { attention: 0, rushing: 0 },
  };

  const errorClusters = {};
  const errorDetails = [];

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const isCorrect = answers[i] === q.correct;
    const timeSpent = timePerQuestion?.[i] || 0;
    
    if (!isCorrect) {
      const errorType = q.errorPattern || 'conceptual';
      const topic = q.topic || 'عام';
      
      // تصنيف الخطأ
      if (['conceptual', 'understanding', 'remembering'].includes(errorType)) {
        errorTypes.cognitive.conceptual++;
      } else if (['application', 'analyzing', 'applying'].includes(errorType)) {
        errorTypes.cognitive.procedural++;
      }
      
      // تحليل نفسي
      if (timeSpent < 5000 && q.difficulty >= 2) {
        errorTypes.behavioral.rushing++;
      } else if (timeSpent > 20000 && q.question.length > 100) {
        errorTypes.behavioral.hesitation++;
      }
      
      // تحليل سلوكي
      if (i > questions.length * 0.7 && timeSpent < 3000) {
        errorTypes.behavioral.rushing++;
      }
      
      // تجميع الأخطاء حسب الموضوع
      if (!errorClusters[topic]) {
        errorClusters[topic] = { errors: [], count: 0, pattern: '' };
      }
      errorClusters[topic].errors.push(i + 1);
      errorClusters[topic].count++;
      
      // تفاصيل الخطأ
      errorDetails.push({
        question: i + 1,
        topic,
        errorType,
        timeSpent,
        cognitiveLevel: q.cognitiveLevel || 'remembering',
        difficulty: q.difficulty || 1,
      });
    }
  }

  // تحديد أنماط الأخطاء المتكررة
  const clusters = Object.entries(errorClusters)
    .filter(([_, data]) => data.count >= 2)
    .map(([topic, data]) => ({
      cluster: topic,
      errors: data.errors,
      count: data.count,
      pattern: detectErrorPattern(data.errors),
      severity: data.count >= 4 ? 'عالية' : data.count >= 3 ? 'متوسطة' : 'منخفضة',
      action: data.count >= 4 ? 'تدخل فوري' : 'مراجعة',
    }))
    .sort((a, b) => b.count - a.count);

  return {
    errorTypes,
    errorClusters: clusters.slice(0, 5),
    errorDetails: errorDetails.slice(0, 20),
    totalErrors: errorDetails.length,
    errorBreakdown: {
      cognitive: errorTypes.cognitive.conceptual + errorTypes.cognitive.procedural,
      behavioral: errorTypes.behavioral.rushing + errorTypes.behavioral.hesitation,
      behavioral: errorTypes.behavioral.attention + errorTypes.behavioral.rushing,
    },
  };
}

function detectErrorPattern(errors) {
  if (errors.length < 2) return 'متفرقة';
  
  const gaps = [];
  for (let i = 1; i < errors.length; i++) {
    gaps.push(errors[i] - errors[i - 1]);
  }
  
  const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;
  
  if (avgGap <= 2) return 'متتالية (فقدان تركيز)';
  if (avgGap <= 5) return 'متقاربة (صعوبة في الموضوع)';
  return 'متفرقة (أخطاء عشوائية)';
}

// ============================================================
// 🔷 4. التحليل السياقي (Contextual Analysis)
// ============================================================

function analyzeContext(questions, answers, timePerQuestion, events, timeOfDay) {
  // تحليل زمني
  const temporalContext = {
    timeOfDay: timeOfDay || 'unknown',
    interpretation: '',
    recommendation: '',
  };

  if (timeOfDay === 'morning') {
    temporalContext.interpretation = 'أداء جيد في الصباح';
    temporalContext.recommendation = 'أنصحك بإجراء الاختبارات في الصباح الباكر';
  } else if (timeOfDay === 'afternoon') {
    temporalContext.interpretation = 'أداء متوسط بعد الظهر';
    temporalContext.recommendation = 'حاول الاختبار في الصباح للحصول على أداء أفضل';
  } else if (timeOfDay === 'evening') {
    temporalContext.interpretation = 'أداء جيد في المساء';
    temporalContext.recommendation = 'المساء وقت مناسب للاختبار';
  } else {
    temporalContext.interpretation = 'وقت غير محدد';
    temporalContext.recommendation = 'اختر وقتاً مناسباً للاختبار';
  }

  // تحليل نوع السؤال
  const questionTypeContext = {
    multipleChoice: { count: 0, correct: 0, avgTime: 0 },
    writing: { count: 0, correct: 0, avgTime: 0 },
    diagram: { count: 0, correct: 0, avgTime: 0 },
  };

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const isCorrect = answers[i] === q.correct;
    const timeSpent = timePerQuestion?.[i] || 0;
    
    let type = 'multipleChoice';
    if (q.isWriting) type = 'writing';
    else if (q.hasDiagram) type = 'diagram';
    
    questionTypeContext[type].count++;
    if (isCorrect) questionTypeContext[type].correct++;
    questionTypeContext[type].avgTime += timeSpent;
  }

  // حساب النسب المئوية
  for (const key of ['multipleChoice', 'writing', 'diagram']) {
    const data = questionTypeContext[key];
    if (data.count > 0) {
      data.percentage = Math.round((data.correct / data.count) * 100);
      data.avgTime = Math.round(data.avgTime / data.count);
    }
  }

  return {
    temporalContext,
    questionTypeContext,
  };
}

// ============================================================
// 🔷 5. تحليل التعلم (Learning Trajectory Analysis)
// ============================================================

function analyzeLearningTrajectory(historicalData) {
  if (!historicalData || historicalData.length === 0) {
    return {
      learningCurve: { data: [], analysis: { improvementRate: 0, prediction: 'لا توجد بيانات كافية' } },
      turningPoints: [],
      trajectoryPrediction: { nextSession: { predictedScore: 0, confidence: 0 } },
    };
  }

  // ترتيب الجلسات حسب التاريخ
  const sessions = [...historicalData].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // حساب منحنى التعلم
  const curveData = sessions.map((s, i) => ({
    session: i + 1,
    score: s.score || 0,
    time: s.time || 0,
    date: s.date,
  }));

  // حساب معدل التحسن
  let improvementRate = 0;
  if (sessions.length >= 2) {
    const firstScore = sessions[0].score || 0;
    const lastScore = sessions[sessions.length - 1].score || 0;
    const improvement = lastScore - firstScore;
    improvementRate = sessions.length > 1 ? improvement / (sessions.length - 1) : 0;
  }

  // التنبؤ بالجلسة القادمة
  const lastScore = sessions[sessions.length - 1]?.score || 0;
  const predictedScore = Math.min(100, lastScore + improvementRate * 0.8);

  // نقاط التحول
  const turningPoints = [];
  for (let i = 1; i < sessions.length; i++) {
    const diff = (sessions[i].score || 0) - (sessions[i - 1].score || 0);
    if (diff > 10) {
      turningPoints.push({
        session: i + 1,
        event: 'تحسن ملحوظ',
        trigger: sessions[i].notes || 'غير معروف',
        impact: `زيادة ${diff} نقطة`,
      });
    } else if (diff < -10) {
      turningPoints.push({
        session: i + 1,
        event: 'تراجع ملحوظ',
        trigger: sessions[i].notes || 'غير معروف',
        impact: `انخفاض ${Math.abs(diff)} نقطة`,
      });
    }
  }

  return {
    learningCurve: {
      data: curveData,
      analysis: {
        improvementRate: Math.round(improvementRate * 10) / 10,
        trend: improvementRate > 2 ? 'متحسن' : improvementRate < -2 ? 'متراجع' : 'مستقر',
        prediction: `من المتوقع أن تصل إلى ${Math.round(predictedScore)}% في الجلسة القادمة`,
      },
    },
    turningPoints: turningPoints.slice(0, 5),
    trajectoryPrediction: {
      nextSession: {
        predictedScore: Math.round(predictedScore),
        confidence: sessions.length > 3 ? 85 : 60,
      },
      timeToMastery: sessions.length > 2 
        ? `${Math.max(1, Math.ceil((80 - lastScore) / (improvementRate || 1)))} جلسات`
        : 'غير محدد',
    },
  };
}

// ============================================================
// 🔷 6. تحليل الثغرات الجذرية (Root Cause Analysis)
// ============================================================

function analyzeRootCauses(skillStats, questions, answers) {
  const weakSkills = skillStats.filter(s => s.percentage < 50);
  
  if (weakSkills.length === 0) {
    return {
      causeTree: { symptom: 'لا توجد ثغرات حرجة', causes: [] },
      crossAnalysis: { relationship: 'جميع المهارات في مستوى جيد' },
    };
  }

  // بناء شجرة الأسباب
  const causeTree = {
    symptom: weakSkills[0]?.name || 'ضعف عام',
    causes: [],
  };

  for (const skill of weakSkills.slice(0, 3)) {
    // البحث عن الأسئلة الخاطئة في هذه المهارة
    const wrongQuestions = [];
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const isCorrect = answers[i] === q.correct;
      const skillList = q.subSkills || [q.subSkill || 'general'];
      if (!isCorrect && skillList.some(s => unifySkill(s) === skill.id)) {
        wrongQuestions.push(q);
      }
    }

    const cause = {
      cause: skill.name,
      subCauses: wrongQuestions.slice(0, 3).map(q => q.question?.substring(0, 50) || 'غير محدد'),
      severity: skill.percentage < 30 ? 'حرجة' : skill.percentage < 50 ? 'عالية' : 'متوسطة',
      fix: skill.percentage < 30 ? 'تدخل فوري: راجع الأساسيات' : 'مراجعة وتمارين إضافية',
    };
    
    causeTree.causes.push(cause);
  }

  // تحليل متقاطع
  const crossAnalysis = {
    relationship: 'ضعف في المهارات الأساسية يؤثر على المهارات المتقدمة',
    chain: weakSkills.map(s => s.name).join(' → '),
    interventionPoint: weakSkills[0]?.name || 'غير محدد',
    recommendation: `ركز على ${weakSkills[0]?.name || 'المهارات الأساسية'} قبل أي شيء آخر`,
  };

  return { causeTree, crossAnalysis };
}

// ============================================================
// 🔷 7. التحليل التنبؤي المتقدم (Predictive Analysis)
// ============================================================

function analyzePredictions(skillStats, historicalData) {
  const weakSkills = skillStats.filter(s => s.percentage < 50);
  const strongSkills = skillStats.filter(s => s.percentage >= 70);
  
  // سيناريوهات الأداء المستقبلي
  const scenarios = [];
  
  if (weakSkills.length > 0) {
    const avgWeak = weakSkills.reduce((sum, s) => sum + s.percentage, 0) / weakSkills.length;
    const improvementPotential = Math.min(30, 100 - avgWeak);
    
    scenarios.push({
      scenario: 'الأفضل (مع مراجعة مركزة)',
      probability: 0.25,
      score: Math.min(100, Math.round(avgWeak + improvementPotential * 0.8)),
      condition: `إذا ركزت على ${weakSkills.slice(0, 2).map(s => s.name).join(' و ')}`,
    });
    
    scenarios.push({
      scenario: 'الأكثر احتمالاً (وتيرة حالية)',
      probability: 0.55,
      score: Math.min(100, Math.round(avgWeak + improvementPotential * 0.4)),
      condition: 'إذا تابعت بالوتيرة الحالية',
    });
    
    scenarios.push({
      scenario: 'الأسوأ (بدون مراجعة)',
      probability: 0.20,
      score: Math.round(avgWeak * 0.9),
      condition: 'إذا لم تراجع نقاط الضعف',
    });
  } else {
    scenarios.push({
      scenario: 'تحسين مستمر',
      probability: 0.70,
      score: Math.min(100, Math.round(skillStats.reduce((sum, s) => sum + s.percentage, 0) / skillStats.length + 5)),
      condition: 'استمرار في الممارسة',
    });
  }

  // التنبؤ بالمسار الوظيفي
  const careerPaths = [
    { path: 'مهندس شبكات', probability: 0.75, requirements: ['ipv4_subnetting_calc', 'device_router', 'subnet_vlsm'] },
    { path: 'أخصائي أمن سيبراني', probability: 0.45, requirements: ['device_firewall', 'security_acls', 'security_vpn'] },
    { path: 'فني دعم فني', probability: 0.60, requirements: ['email_smtp', 'tcpip_ports', 'device_access_point'] },
  ];

  // حساب التوافق مع كل مسار
  const skillMap = {};
  skillStats.forEach(s => { skillMap[s.id] = s.percentage; });

  const scoredPaths = careerPaths.map(path => {
    let total = 0;
    let matched = 0;
    path.requirements.forEach(req => {
      total++;
      if (skillMap[req] && skillMap[req] >= 60) matched++;
    });
    const matchPercentage = total > 0 ? Math.round((matched / total) * 100) : 0;
    return { ...path, matchPercentage };
  });

  const bestMatch = scoredPaths.sort((a, b) => b.matchPercentage - a.matchPercentage)[0];

  return {
    performancePrediction: { scenarios },
    behaviorPrediction: {
      willDropout: false,
      willImprove: weakSkills.length > 0,
      willNeedHelp: weakSkills.length > 2,
      timeToNextAssessment: weakSkills.length > 0 ? '3-5 أيام' : 'أسبوع',
    },
    careerPrediction: {
      paths: scoredPaths,
      bestMatch: bestMatch?.path || 'غير محدد',
      matchPercentage: bestMatch?.matchPercentage || 0,
      recommendation: bestMatch ? `أنت مناسب أكثر لـ ${bestMatch.path} (${bestMatch.matchPercentage}% توافق)` : 'قم بمزيد من التقييمات',
    },
  };
}

// ============================================================
// 🔷 8. التحليل العاطفي-السلوكي (Affective-Behavioral Analysis)
// ============================================================

function analyzeAffectiveBehavior(events, answers, timePerQuestion, questions) {
  // تحليل الحالة المزاجية
  const moodAnalysis = {
    confidence: { score: 50, trend: 'مستقر', interpretation: '' },
    hesitation: { score: 30, trend: 'مستقر', interpretation: '' },
    motivation: { score: 70, trend: 'مستقر', interpretation: '' },
  };

  // حساب الثقة من السلوك
  let confidenceScores = [];
  let hesitationScores = [];
  
  for (let i = 0; i < questions.length; i++) {
    const isCorrect = answers[i] === questions[i]?.correct;
    const timeSpent = timePerQuestion?.[i] || 0;
    const difficulty = questions[i]?.difficulty || 1;
    
    // الثقة: الإجابات الصحيحة السريعة = ثقة عالية
    if (isCorrect && timeSpent < 5000) confidenceScores.push(80);
    else if (isCorrect) confidenceScores.push(60);
    else if (!isCorrect && timeSpent < 3000) confidenceScores.push(30); // خطأ سريع = ثقة زائدة
    else confidenceScores.push(40);
    
    // القلق: الوقت الطويل والتردد = قلق
    if (timeSpent > 20000) hesitationScores.push(70);
    else if (timeSpent > 12000) hesitationScores.push(50);
    else hesitationScores.push(30);
  }

  moodAnalysis.confidence.score = confidenceScores.length > 0 
    ? Math.round(confidenceScores.reduce((a, b) => a + b, 0) / confidenceScores.length)
    : 50;
  
  moodAnalysis.hesitation.score = hesitationScores.length > 0
    ? Math.round(hesitationScores.reduce((a, b) => a + b, 0) / hesitationScores.length)
    : 30;

  // تفسير النتائج
  if (moodAnalysis.confidence.score > 70) {
    moodAnalysis.confidence.interpretation = 'واثق جداً (قد يكون مفرطاً)';
    moodAnalysis.confidence.trend = 'مرتفع';
  } else if (moodAnalysis.confidence.score > 50) {
    moodAnalysis.confidence.interpretation = 'واثق معتدل';
    moodAnalysis.confidence.trend = 'مستقر';
  } else {
    moodAnalysis.confidence.interpretation = 'ثقة منخفضة (يحتاج تشجيع)';
    moodAnalysis.confidence.trend = 'منخفض';
  }

  if (moodAnalysis.hesitation.score > 60) {
    moodAnalysis.hesitation.interpretation = 'قلق ملحوظ (يحتاج طمأنة)';
    moodAnalysis.hesitation.trend = 'مرتفع';
  } else if (moodAnalysis.hesitation.score > 40) {
    moodAnalysis.hesitation.interpretation = 'قلق معتدل';
    moodAnalysis.hesitation.trend = 'متوسط';
  } else {
    moodAnalysis.hesitation.interpretation = 'هدوء واستقرار نفسي';
    moodAnalysis.hesitation.trend = 'منخفض';
  }

  // تحليل الإجهاد
  const stressLevels = [
    { time: 'start', level: 20 },
    { time: 'middle', level: 30 },
    { time: 'end', level: 25 },
  ];

  // تحليل التعب
  const fatigueAnalysis = {
    onsetPoint: null,
    symptoms: [],
    recoveryTime: 0,
    recommendation: '',
  };

  // اكتشاف التعب من خلال زيادة وقت الإجابة والأخطاء
  const halfIndex = Math.floor(questions.length / 2);
  const firstHalf = timePerQuestion?.slice(0, halfIndex) || [];
  const secondHalf = timePerQuestion?.slice(halfIndex) || [];
  
  const avgFirst = firstHalf.length > 0 ? firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length : 0;
  const avgSecond = secondHalf.length > 0 ? secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length : 0;
  
  if (avgSecond > avgFirst * 1.3 && questions.length > 10) {
    fatigueAnalysis.onsetPoint = Math.floor(questions.length * 0.6);
    fatigueAnalysis.symptoms = [
      'زيادة وقت الإجابة',
      'أخطاء في أسئلة كانت سهلة',
    ];
    fatigueAnalysis.recoveryTime = 5;
    fatigueAnalysis.recommendation = 'أضف استراحة قصيرة بعد السؤال 15';
  }

  return {
    moodAnalysis,
    stressAnalysis: {
      stressLevels,
      peakStress: 'في منتصف الاختبار',
      stressTriggers: ['الأسئلة الطويلة', 'الأسئلة المتكررة'],
      recommendations: ['خذ استراحة قصيرة في المنتصف', 'نوع الأسئلة'],
    },
    fatigueAnalysis,
  };
}

// ============================================================
// 🔷 9. التحليل التطوري (Evolutionary Analysis)
// ============================================================

function analyzeEvolution(historicalData) {
  if (!historicalData || historicalData.length === 0) {
    return {
      evolution: {
        sessions: [],
        analysis: {
          improvement: '0%',
          weakAreasTrend: 'لا توجد بيانات كافية',
        },
      },
      peerComparison: {
        percentile: 50,
        strengths: [],
        weaknesses: [],
      },
    };
  }

  const sessions = historicalData.map((s, i) => ({
    number: i + 1,
    date: s.date || new Date().toISOString(),
    totalScore: s.score || 0,
    weakAreas: s.weakAreas || [],
    timeSpent: s.time || 0,
  }));

  // تحليل التطور
  const firstScore = sessions[0]?.totalScore || 0;
  const lastScore = sessions[sessions.length - 1]?.totalScore || 0;
  const improvement = lastScore - firstScore;
  
  const analysis = {
    improvement: `${improvement > 0 ? '+' : ''}${Math.round(improvement)}% في ${sessions.length} جلسة`,
    weakAreasTrend: sessions.length > 1 
      ? 'تختفي نقاط الضعف تدريجياً' 
      : 'جلسة واحدة فقط، استمر في التقييم',
    consistency: sessions.length > 2 ? 'مستقر' : 'غير مؤكد',
    prediction: sessions.length > 1 
      ? `سيصل إلى ${Math.min(100, lastScore + improvement * 0.5)}% في الجلسة القادمة`
      : 'قم بمزيد من التقييمات للتنبؤ الدقيق',
  };

  return {
    evolution: { sessions, analysis },
    peerComparison: {
      percentile: Math.min(95, Math.max(5, 50 + improvement * 0.3)),
      strengths: sessions.length > 1 ? ['تحسن مستمر'] : [],
      weaknesses: sessions.length > 1 ? ['بحاجة للمزيد من البيانات'] : [],
      recommendation: 'استمر في التقييم لتحديد نقاط القوة والضعف بدقة',
    },
  };
}

// ============================================================
// 🔷 10. المولد الرئيسي للتقرير
// ============================================================

export default async function handler(req, res) {
  // التأكد من أن الطلب POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // استقبال البيانات
    const {
      answers,
      questions: sentQuestions,
      assessmentId,
      timePerQuestion,
      eventsLog,
      theta,
      mode,
      userId,
      historicalData,
    } = req.body;

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: 'No answers provided' });
    }

    // جلب الأسئلة
    const questions = sentQuestions?.length > 0 ? sentQuestions : getAllBasicsQuestions();
    if (!questions || questions.length === 0) {
      return res.status(404).json({ error: 'No questions found' });
    }

    // تحويل الإجابات
    const numericAnswers = answers.map((a, i) => {
      const q = questions[i];
      if (q?.isWriting) {
        const num = Number(a);
        return isNaN(num) ? 1 : num === 1 ? 1 : 2;
      }
      const num = Number(a);
      return isNaN(num) || num < 1 || num > 4 ? 1 : num;
    });

    // تحليل الأحداث
    const events = typeof eventsLog === 'string' ? JSON.parse(eventsLog || '[]') : (eventsLog || []);
    const times = typeof timePerQuestion === 'string' ? JSON.parse(timePerQuestion || '[]') : (timePerQuestion || []);
    const timeOfDay = new Date().getHours();

    // ============================================================
    // 1. حساب النتيجة الأساسية
    // ============================================================
    let correctCount = 0;
    questions.forEach((q, i) => {
      const isCorrect = q.isWriting
        ? (answers[i] || '').toString().trim().toLowerCase() === (q.expectedAnswer || '').trim().toLowerCase()
        : numericAnswers[i] === q.correct;
      if (isCorrect) correctCount++;
    });
    const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

    // ============================================================
    // 2. تحليل المهارات
    // ============================================================
    const skillStats = computeSkillStats(questions, numericAnswers, answers);

    // ============================================================
    // 3. التحليل الزمني
    // ============================================================
    const microTemporal = analyzeMicroTemporal(events, times);

    // ============================================================
    // 4. تحليل المسار المعرفي
    // ============================================================
    const cognitivePath = analyzeCognitivePath(questions, numericAnswers, times);

    // ============================================================
    // 5. تحليل الأخطاء العميق
    // ============================================================
    const deepErrors = analyzeDeepErrors(questions, numericAnswers, times);

    // ============================================================
    // 6. التحليل السياقي
    // ============================================================
    const contextual = analyzeContext(questions, numericAnswers, times, events, timeOfDay);

    // ============================================================
    // 7. تحليل التعلم
    // ============================================================
    const learningTrajectory = analyzeLearningTrajectory(historicalData);

    // ============================================================
    // 8. تحليل الثغرات الجذرية
    // ============================================================
    const rootCauses = analyzeRootCauses(skillStats, questions, numericAnswers);

    // ============================================================
    // 9. التحليل التنبؤي
    // ============================================================
    const predictions = analyzePredictions(skillStats, historicalData);

    // ============================================================
    // 10. التحليل العاطفي-السلوكي
    // ============================================================
    const affective = analyzeAffectiveBehavior(events, numericAnswers, times, questions);

    // ============================================================
    // 11. التحليل التطوري
    // ============================================================
    const evolution = analyzeEvolution(historicalData);

    // ============================================================
    // بناء التقرير النهائي
    // ============================================================
    const finalReport = {
      success: true,
      mode: mode || 'full',
      isQuick: mode === 'quick',

      // النتيجة الأساسية
      score,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      wrongAnswers: questions.length - correctCount,

      // 1. التحليل الزمني الدقيق
      microTemporal,

      // 2. تحليل المسار المعرفي
      cognitivePath,

      // 3. تحليل الأخطاء العميق
      deepErrors,

      // 4. التحليل السياقي
      contextual,

      // 5. تحليل التعلم
      learningTrajectory,

      // 6. تحليل الثغرات الجذرية
      rootCauses,

      // 7. التحليل التنبؤي
      predictions,

      // 8. التحليل العاطفي-السلوكي
      affective,

      // 9. التحليل التطوري
      evolution,

      // المهارات المسطحة
      flatSkills: skillStats,

      // أضعف المهارات
      weakestSkills: skillStats
        .filter(s => s.percentage < 70)
        .sort((a, b) => a.percentage - b.percentage)
        .slice(0, 5),

      // توليد رؤية مختصرة
      insight: generateInsight(score, skillStats, deepErrors),

      // إحصائيات سريعة
      quickStats: {
        score,
        correct: correctCount,
        wrong: questions.length - correctCount,
        total: questions.length,
        accuracy: Math.round((correctCount / questions.length) * 100),
        timeSpent: times.reduce((a, b) => a + b, 0),
        avgTimePerQuestion: times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0,
      },

      //timestamp
      analyzedAt: new Date().toISOString(),
    };

    return res.status(200).json(finalReport);
  } catch (error) {
    console.error('❌ خطأ في تحليل النتائج:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'حدث خطأ غير متوقع أثناء التحليل',
    });
  }
}

// ============================================================
// 🔷 دوال مساعدة إضافية
// ============================================================

function computeSkillStats(questions, numericAnswers, rawAnswers) {
  const skillMap = {};

  questions.forEach((q, idx) => {
    const isCorrect = q.isWriting
      ? (rawAnswers[idx] || '').toString().trim().toLowerCase() === (q.expectedAnswer || '').trim().toLowerCase()
      : numericAnswers[idx] === q.correct;

    const skillList = q.subSkills || [q.subSkill || 'general'];
    skillList.forEach(skill => {
      const unified = unifySkill(skill);
      if (!skillMap[unified]) {
        skillMap[unified] = {
          total: 0,
          correct: 0,
          name: getSkillDisplayName(unified),
          errorPatterns: [],
          rootCauses: [],
          futureImpacts: [],
          remediationQueries: [],
        };
      }
      skillMap[unified].total++;
      if (isCorrect) {
        skillMap[unified].correct++;
      } else {
        if (q.diagnostic) {
          skillMap[unified].errorPatterns.push(q.diagnostic.errorPattern || 'general');
          skillMap[unified].rootCauses.push(q.diagnostic.rootCause || '');
          skillMap[unified].futureImpacts.push(q.diagnostic.futureImpact || '');
          skillMap[unified].remediationQueries.push(q.diagnostic.remediationVideoQuery || '');
        }
      }
    });
  });

  return Object.entries(skillMap).map(([id, stats]) => {
    const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    const mostCommonError = stats.errorPatterns.length > 0
      ? stats.errorPatterns.sort((a, b) =>
          stats.errorPatterns.filter(v => v === a).length -
          stats.errorPatterns.filter(v => v === b).length
        ).pop()
      : 'general';

    return {
      id,
      name: stats.name,
      percentage,
      level: percentage >= 70 ? 'متقن' : percentage >= 40 ? 'قيد التعلم' : 'ضعيف',
      total: stats.total,
      correct: stats.correct,
      errorPattern: mostCommonError,
      rootCause: stats.rootCauses.length > 0 ? stats.rootCauses[0] : 'يحتاج مراجعة عامة',
      futureImpact: stats.futureImpacts.length > 0 ? stats.futureImpacts[0] : 'سيؤثر على فهم الموضوعات المتقدمة',
      remediationVideoQuery: stats.remediationQueries.length > 0 ? stats.remediationQueries[0] : `شرح ${stats.name}`,
    };
  }).sort((a, b) => a.percentage - b.percentage);
}

function generateInsight(score, skillStats, deepErrors) {
  const weakCount = skillStats.filter(s => s.percentage < 50).length;
  const masteredCount = skillStats.filter(s => s.percentage >= 70).length;
  
  let insight = '';
  
  if (score >= 80) {
    insight = `🎉 ممتاز! أنت متقن لـ ${masteredCount} مهارة. استمر في التحدي!`;
  } else if (score >= 65) {
    insight = `🌟 أداء جيد جداً. لديك ${weakCount} مهارة تحتاج تحسيناً بسيطاً.`;
  } else if (score >= 50) {
    insight = `📈 أداء متوسط. ركز على ${weakCount} مهارة ضعيفة لتحسين مستواك.`;
  } else {
    insight = `📚 بداية جيدة. لديك ${weakCount} مهارة تحتاج تركيزاً عالياً. ابدأ بالأساسيات.`;
  }
  
  if (deepErrors.errorClusters.length > 0) {
    const topCluster = deepErrors.errorClusters[0];
    insight += ` 🎯 أولويتك: ${topCluster.cluster} (${topCluster.count} أخطاء).`;
  }
  
  return insight;
}
