// pages/api/analyze.js - النسخة النهائية (Surgical AI Engine)
import { getAllBasicsQuestions } from '../../data/questions/basics';

// ============================================================
// 🔷 جدول توحيد المهارات (SubSkill Unification)
// ============================================================
const SKILL_UNIFICATION = {
  'net_concepts': 'net_concepts',
  'net_models': 'net_models',
  'net_topologies': 'net_topologies',
  'net_media_cables': 'net_media_cables',
  'net_tcp_vs_udp': 'net_tcp_vs_udp',
  'net_vlan': 'net_vlan',
  'net_vpn': 'net_vpn',
  'ipv4_structure': 'ipv4_structure',
  'ipv4_classes': 'ipv4_classes',
  'ipv4_public_private': 'ipv4_public_private',
  'ipv4_subnet_mask': 'ipv4_subnet_mask',
  'ipv4_subnetting_calc': 'ipv4_subnetting_calc',
  'ipv4_network_id': 'ipv4_network_id',
  'ipv4_broadcast': 'ipv4_broadcast',
  'subnet_cidr': 'subnet_cidr',
  'subnet_calculation': 'subnet_calculation',
  'subnet_network_id': 'subnet_network_id',
  'subnet_broadcast': 'subnet_broadcast',
  'subnet_hosts': 'subnet_hosts',
  'subnet_vlsm': 'subnet_vlsm',
  'ipv6_structure': 'ipv6_structure',
  'ipv6_types': 'ipv6_types',
  'ipv6_shorten': 'ipv6_shorten',
  'ipv6_vs_ipv4': 'ipv6_vs_ipv4',
  'tcpip_layers': 'tcpip_layers',
  'tcpip_tcp_vs_udp': 'tcpip_tcp_vs_udp',
  'tcpip_handshake': 'tcpip_handshake',
  'tcpip_http': 'tcpip_http',
  'tcpip_ports': 'tcpip_ports',
  'device_switch': 'device_switch',
  'device_router': 'device_router',
  'device_firewall': 'device_firewall',
  'device_access_point': 'device_access_point',
  'device_hub_bridge': 'device_hub_bridge',
  'email_smtp': 'email_smtp',
  'email_pop3': 'email_pop3',
  'email_imap': 'email_imap',
  'email_ports': 'email_ports',
  'wireless_principles': 'wireless_principles',
  'wireless_security': 'wireless_security',
  'security_acls': 'security_acls',
  'security_vpn': 'security_vpn',
};

function unifySkill(skill) {
  return SKILL_UNIFICATION[skill] || skill;
}

// ============================================================
// 🔷 أسماء المهارات بالعربية
// ============================================================
function getSkillDisplayName(skillId) {
  const names = {
    'net_concepts': 'مفاهيم الشبكات الأساسية',
    'net_models': 'نماذج الشبكات (Client-Server/P2P)',
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
// 🔷 مصفوفة التشخيص (Q-Matrix)
// ============================================================
function buildQMatrix(questions) {
  const qMatrix = {};
  questions.forEach(q => {
    const unifiedSkill = unifySkill(q.subSkill);
    qMatrix[q.id] = [unifiedSkill];
  });
  return qMatrix;
}

// ============================================================
// 🔷 محرك الإتقان السريع (Fast Mastery Engine)
// ============================================================
function estimateMasteryFast(questions, numericAnswers, rawAnswers) {
  const qMatrix = buildQMatrix(questions);
  const skillStats = {};

  questions.forEach((q, idx) => {
    const isCorrect = q.isWriting 
      ? (rawAnswers[idx] || '').toString().trim().toLowerCase() === (q.expectedAnswer || '').trim().toLowerCase()
      : numericAnswers[idx] === q.correct;

    const skill = qMatrix[q.id] ? qMatrix[q.id][0] : 'general';
    const unifiedSkill = unifySkill(skill);
    
    if (!skillStats[unifiedSkill]) {
      skillStats[unifiedSkill] = { total: 0, correct: 0 };
    }
    skillStats[unifiedSkill].total++;
    if (isCorrect) skillStats[unifiedSkill].correct++;
  });

  const skills = Object.entries(skillStats).map(([skill, stats]) => {
    const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    return {
      id: skill,
      name: getSkillDisplayName(skill),
      percentage: percentage,
      level: percentage >= 80 ? 'متقن' : percentage >= 50 ? 'قيد التعلم' : 'ضعيف',
      total: stats.total,
      correct: stats.correct,
    };
  }).sort((a, b) => a.percentage - b.percentage);

  return skills;
}

// ============================================================
// 🔷 تحليل الأخطاء الذكي
// ============================================================
function analyzeErrorsSmart(questions, numericAnswers, rawAnswers) {
  const errors = [];
  
  questions.forEach((q, idx) => {
    const isCorrect = q.isWriting 
      ? (rawAnswers[idx] || '').toString().trim().toLowerCase() === (q.expectedAnswer || '').trim().toLowerCase()
      : numericAnswers[idx] === q.correct;

    if (!isCorrect) {
      errors.push({
        question: q.question.substring(0, 80),
        topic: q.topic,
        subSkill: q.subSkill,
        yourAnswer: q.isWriting ? (rawAnswers[idx] || '(فارغة)').toString() : (q.options ? q.options[numericAnswers[idx] - 1] : 'غير معروف'),
        correctAnswer: q.isWriting ? (q.expectedAnswer || '') : (q.options ? q.options[q.correct - 1] : ''),
        errorPattern: q.errorPattern || 'conceptual',
        cognitiveLevel: q.cognitiveLevel || 'remembering',
        explanation: q.explanation || '',
      });
    }
  });

  return errors;
}

// ============================================================
// 🔷 توليد الخطة العملية (Actionable Plan)
// ============================================================
function generateActionablePlan(masteryResults, errors, score) {
  if (!masteryResults || masteryResults.length === 0) {
    return {
      priority: 'لا توجد بيانات كافية',
      priorityLevel: 'غير محدد',
      rootCause: 'أكمل التقييم للحصول على تحليل',
      solution: 'أعد التقييم',
      videoLink: '#',
      exercises: [],
      timeRequired: 0,
      today: [],
      thisWeek: [],
      hasWeakness: false,
    };
  }

  const weakSkills = masteryResults.filter(s => s.percentage < 70);
  
  if (weakSkills.length === 0) {
    return {
      priority: '🎉 ممتاز! أنت متقن لجميع المهارات',
      priorityLevel: 'ممتاز',
      rootCause: 'لا توجد ثغرات حرجة',
      solution: 'استمر في التطوير والممارسة',
      videoLink: '#',
      exercises: [],
      timeRequired: 0,
      today: ['حافظ على مستواك بمراجعة أسبوعية'],
      thisWeek: ['جرب تحديات متقدمة'],
      hasWeakness: false,
    };
  }

  const topWeakness = weakSkills[0];
  const relatedErrors = errors.filter(e => e.subSkill === topWeakness.id);
  const dominantError = relatedErrors.length > 0 
    ? (relatedErrors[0].errorPattern || 'conceptual')
    : 'conceptual';

  const rootCauseMap = {
    conceptual: 'خطأ مفاهيمي - تحتاج إلى فهم أعمق للمفهوم الأساسي',
    calculation: 'خطأ حسابي - تحتاج إلى تدريب على الحسابات خطوة بخطوة',
    application: 'صعوبة في التطبيق - تحتاج إلى حل تمارين عملية متنوعة',
    memorization: 'اعتماد على الحفظ - تحتاج إلى فهم العلاقات بدلاً من الحفظ',
  };

  const solutionMap = {
    conceptual: 'راجع الشرح النظري من مصادر موثوقة، وافهم العلاقات بين المفاهيم',
    calculation: 'تدرب على حل المسائل خطوة بخطوة، واستخدم ورقة وقلم',
    application: 'حل سيناريوهات عملية متنوعة، وجرب تطبيق المفهوم في مواقف مختلفة',
    memorization: 'حاول فهم "لماذا" بدلاً من حفظ "ماذا"، واشرح المفهوم بكلماتك',
  };

  const youtubeQuery = `شرح ${topWeakness.name} بالعربي`;
  const videoLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(youtubeQuery)}`;

  const timeRequired = Math.max(15, Math.ceil((100 - topWeakness.percentage) / 5) * 5);

  return {
    priority: topWeakness.name,
    priorityLevel: topWeakness.percentage < 30 ? 'حرجة 🚨' : topWeakness.percentage < 50 ? 'متوسطة ⚠️' : 'منخفضة ✅',
    rootCause: rootCauseMap[dominantError] || 'يحتاج مراجعة عامة',
    solution: solutionMap[dominantError] || 'راجع الأساسيات وحل تمارين',
    videoLink: videoLink,
    timeRequired: timeRequired,
    today: [
      `شاهد فيديو: ${youtubeQuery}`,
      `حل 3 تمارين على ${topWeakness.name}`,
    ],
    thisWeek: [
      `أكمل 20 تمرين على ${topWeakness.name}`,
      `اختبر نفسك في ${topWeakness.name} مرة أخرى`,
      ...(weakSkills.length > 1 ? [`راجع ${weakSkills[1].name}`] : []),
    ],
    hasWeakness: true,
    currentPercentage: topWeakness.percentage,
  };
}

// ============================================================
// 🔷 التنبؤ المهني (Career Fit)
// ============================================================
function generateCareerFit(masteryResults, topicAnalysis) {
  const careerPaths = [
    {
      title: 'فني دعم فني (Help Desk)',
      icon: '🎧',
      requiredSkills: ['email_smtp', 'email_pop3', 'email_imap', 'tcpip_ports', 'device_access_point'],
      salaryRange: '$400 - $800',
    },
    {
      title: 'مهندس دعم تقني (Technical Support)',
      icon: '🔧',
      requiredSkills: ['device_switch', 'device_router', 'device_firewall', 'tcpip_handshake', 'tcpip_tcp_vs_udp'],
      salaryRange: '$800 - $1500',
    },
    {
      title: 'مهندس شبكات (Network Engineer)',
      icon: '🌐',
      requiredSkills: ['ipv4_subnetting_calc', 'subnet_vlsm', 'subnet_cidr', 'subnet_network_id', 'device_router'],
      salaryRange: '$1500 - $3500',
    },
    {
      title: 'مهندس أمن سيبراني (Security Engineer)',
      icon: '🔒',
      requiredSkills: ['device_firewall', 'security_acls', 'security_vpn', 'wireless_security', 'tcpip_ports'],
      salaryRange: '$2000 - $5000',
    },
    {
      title: 'مهندس شبكات سحابية (Cloud Network Engineer)',
      icon: '☁️',
      requiredSkills: ['ipv4_subnetting_calc', 'tcpip_handshake', 'device_firewall', 'ipv4_public_private', 'subnet_vlsm'],
      salaryRange: '$2500 - $6000',
    },
  ];

  const skillMap = {};
  masteryResults.forEach(s => {
    skillMap[s.id] = s.percentage;
  });

  const scored = careerPaths.map(path => {
    let total = 0;
    let matched = 0;
    path.requiredSkills.forEach(skill => {
      total++;
      if (skillMap[skill] && skillMap[skill] >= 60) matched++;
    });
    const matchPercentage = total > 0 ? Math.round((matched / total) * 100) : 0;
    return { ...path, matchPercentage };
  });

  const sorted = scored.sort((a, b) => b.matchPercentage - a.matchPercentage);
  const bestMatch = sorted[0] || null;

  let nextStep = '';
  if (bestMatch) {
    const weakSkillsForPath = bestMatch.requiredSkills.filter(s => !skillMap[s] || skillMap[s] < 60);
    if (weakSkillsForPath.length > 0) {
      nextStep = `لتقوية مسارك "${bestMatch.title}"، ركز على: ${weakSkillsForPath.map(s => getSkillDisplayName(s)).join('، ')}`;
    } else {
      nextStep = `أنت جاهز لمسار "${bestMatch.title}"!`;
    }
  }

  return {
    bestMatch: bestMatch ? bestMatch.title : 'غير محدد بعد',
    bestMatchIcon: bestMatch ? bestMatch.icon : '📊',
    matchPercentage: bestMatch ? bestMatch.matchPercentage : 0,
    nextStep: nextStep,
    salaryRange: bestMatch ? bestMatch.salaryRange : 'غير محدد',
  };
}

// ============================================================
// 🔷 معالج الطلب الرئيسي
// ============================================================
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  try {
    const { answers, questions: sentQuestions, assessmentId, timePerQuestion, confidenceLevels, mode } = req.body;
    
    if (!answers || !Array.isArray(answers)) return res.status(400).json({ error: 'No answers' });
    
    const questions = sentQuestions?.length > 0 ? sentQuestions : getAllBasicsQuestions();
    if (!questions.length) return res.status(404).json({ error: 'No questions' });

    const numericAnswers = answers.map((a, i) => {
      const q = questions[i];
      if (q?.isWriting) {
        const num = Number(a);
        return isNaN(num) ? 1 : (num === 1 ? 1 : 2);
      }
      const num = Number(a);
      return (isNaN(num) || num < 1 || num > 4) ? 1 : num;
    });

    // ============ النتيجة ============
    let totalWeight = 0, earnedWeight = 0, correctCount = 0;
    const questionResults = [];
    
    questions.forEach((q, i) => {
      const weight = (q.difficulty || 1) + (['analyzing', 'evaluating', 'creating'].includes(q.cognitiveLevel) ? 0.5 : 0);
      totalWeight += weight;
      
      const isCorrect = q.isWriting 
        ? (answers[i] || '').toString().trim().toLowerCase() === (q.expectedAnswer || '').trim().toLowerCase()
        : numericAnswers[i] === q.correct;
      
      if (isCorrect) {
        earnedWeight += weight;
        correctCount++;
      }
      
      questionResults.push({
        isCorrect,
        weight,
        time: timePerQuestion?.[i] || 0,
        confidence: confidenceLevels?.[i] || 50,
        difficulty: q.difficulty || 1,
        topic: q.topic || 'عام',
        cognitiveLevel: q.cognitiveLevel || 'remembering',
        subSkill: q.subSkill || 'عام',
        errorPattern: q.errorPattern || 'conceptual',
      });
    });

    const weightedScore = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
    const simpleScore = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    const isQuickMode = mode === 'quick';
    let assessmentType = 'topic';
    if (assessmentId === 'full' && !isQuickMode) assessmentType = 'full';
    else if (isQuickMode) assessmentType = 'quick';

    // ============ التحليلات الذكية الجديدة ============
    const masteryResults = estimateMasteryFast(questions, numericAnswers, answers);
    const errorsSmart = analyzeErrorsSmart(questions, numericAnswers, answers);
    const actionablePlan = generateActionablePlan(masteryResults, errorsSmart, weightedScore);
    
    // ============ مصفوفة الثقة ============
    let highConfCorrect = 0, lowConfCorrect = 0, highConfWrong = 0, lowConfWrong = 0;
    questionResults.forEach(q => {
      if (q.confidence >= 70) { if (q.isCorrect) highConfCorrect++; else highConfWrong++; }
      else { if (q.isCorrect) lowConfCorrect++; else lowConfWrong++; }
    });
    const totalConf = questionResults.length || 1;
    const confidenceAnalysis = {
      highConfCorrect: Math.round((highConfCorrect / totalConf) * 100),
      lowConfCorrect: Math.round((lowConfCorrect / totalConf) * 100),
      highConfWrong: Math.round((highConfWrong / totalConf) * 100),
      lowConfWrong: Math.round((lowConfWrong / totalConf) * 100),
      insight: highConfWrong > 20 
        ? 'لديك ثقة مفرطة في إجابات خاطئة. راجع المفاهيم الأساسية.'
        : lowConfCorrect > 30
        ? 'أنت تعرف أكثر مما تعتقد! ثق بمعرفتك.'
        : 'مستوى ثقتك متوازن مع أدائك.',
    };

    // ============ البصمة المعرفية ============
    const avgTime = timePerQuestion?.length > 0 
      ? timePerQuestion.reduce((a, b) => a + b, 0) / timePerQuestion.length 
      : null;
    const correctPct = questions.length > 0 ? (correctCount / questions.length) * 100 : 0;
    
    let learningStyle = 'متوازن';
    let styleDescription = 'لديك توازن جيد بين السرعة والدقة.';
    if (avgTime && avgTime < 8 && correctPct > 60) {
      learningStyle = 'حدسي سريع';
      styleDescription = 'أنت سريع في الإجابة وتعتمد على البديهة. تدرب على التمهل في الأسئلة المعقدة.';
    } else if (avgTime && avgTime > 15 && correctPct > 70) {
      learningStyle = 'تحليلي متعمق';
      styleDescription = 'أنت تفكر بعمق وتدقق في التفاصيل. تدرب على زيادة سرعتك.';
    }
    
    const cognitiveProfile = {
      learningStyle,
      styleDescription,
      confidenceLevel: Math.round(correctPct),
    };

    // ============ التنبؤ المهني ============
    const careerFit = generateCareerFit(masteryResults, null);

    // ============ الملخص الجراحي ============
    const surgicalSummary = {
      score: weightedScore,
      topPriority: actionablePlan.priority,
      rootCause: actionablePlan.rootCause,
      impact: actionablePlan.hasWeakness 
        ? `هذه الثغرة تؤثر على ${actionablePlan.currentPercentage}% من أدائك في هذا المجال`
        : 'لا توجد ثغرات حرجة',
      treatmentTime: actionablePlan.timeRequired,
      confidenceLevel: confidenceAnalysis.insight,
    };

    // ============ الاستجابة النهائية ============
    return res.status(200).json({
      success: true,
      mode: mode || 'full',
      isQuickMode,
      assessmentType,
      
      // النتيجة الأساسية
      score: weightedScore,
      simpleScore,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      wrongAnswers: questions.length - correctCount,
      
      // الملخص الجراحي (الأهم)
      surgicalSummary,
      
      // الخطة العملية
      actionablePlan,
      
      // التنبؤ المهني
      careerFit,
      
      // التحليلات الذكية
      masteryResults,
      errors: errorsSmart,
      weakSkills: masteryResults.filter(s => s.percentage < 70),
      strongSkills: masteryResults.filter(s => s.percentage >= 70),
      
      // البصمة المعرفية
      cognitiveProfile,
      
      // مصفوفة الثقة
      confidenceAnalysis,
      
      // الرؤية المختصرة
      insight: surgicalSummary.topPriority !== 'لا توجد بيانات كافية'
        ? `🎯 أولويتك: ${surgicalSummary.topPriority}. ${surgicalSummary.rootCause}. خصص ${surgicalSummary.treatmentTime} دقيقة للعلاج.`
        : 'أكمل التقييم للحصول على تحليل',
      
      // تحليلات إضافية (متوافقة مع الصفحة)
      topicAnalysis: {},
      learningProfile: {},
      diagnosticMastery: { skills: masteryResults },
      recommendedLessons: masteryResults.filter(s => s.percentage < 70).slice(0, 5).map(s => ({
        topic: s.name,
        percentage: s.percentage,
        reason: 'يحتاج مراجعة',
        solution: actionablePlan.solution,
      })),
      learningStages: [],
      allAssessmentsSummary: [],
    });
    
  } catch (error) {
    console.error('خطأ:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
