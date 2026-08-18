// pages/api/analyze.js
// ============================================================
// 🧠 محرك التشخيص العصبي (Neuro-Diagnostic Engine)
// الإصدار: 2.0 - ديناميكي بالكامل
// ============================================================

import { getAllBasicsQuestions } from '../../data/questions/basics';
import { estimateTheta } from '../../lib/adaptiveEngine';

// ============================================================
// 🔷 دوال مساعدة (توحيد المهارات، الأسماء، إلخ)
// ============================================================

// جدول توحيد المهارات (للتجميع)
const SKILL_UNIFICATION = {
  // أساسيات
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
  // أجهزة
  'device_switch': 'device_switch',
  'device_router': 'device_router',
  'device_firewall': 'device_firewall',
  'device_access_point': 'device_access_point',
  'device_hub_bridge': 'device_hub_bridge',
  // البريد
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
// 🔷 1. تحليل الإجابات وتجميع المهارات
// ============================================================

function computeSkillStats(questions, numericAnswers, rawAnswers) {
  const skillMap = {};

  questions.forEach((q, idx) => {
    const isCorrect = q.isWriting
      ? (rawAnswers[idx] || '').toString().trim().toLowerCase() === (q.expectedAnswer || '').trim().toLowerCase()
      : numericAnswers[idx] === q.correct;

    // استخدام subSkills (مصفوفة) أو subSkill (نص) للتوافق مع الإصدارات القديمة
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
        // تجميع معلومات التشخيص من السؤال (إذا وجدت)
        if (q.diagnostic) {
          skillMap[unified].errorPatterns.push(q.diagnostic.errorPattern || 'general');
          skillMap[unified].rootCauses.push(q.diagnostic.rootCause || '');
          skillMap[unified].futureImpacts.push(q.diagnostic.futureImpact || '');
          skillMap[unified].remediationQueries.push(q.diagnostic.remediationVideoQuery || '');
        }
      }
    });
  });

  // تحويل إلى مصفوفة ونسب مئوية
  const results = Object.entries(skillMap).map(([id, stats]) => {
    const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    // استخراج أكثر الأخطاء شيوعاً لهذه المهارة
    const mostCommonError = stats.errorPatterns.length > 0
      ? stats.errorPatterns.sort((a, b) =>
          stats.errorPatterns.filter(v => v === a).length -
          stats.errorPatterns.filter(v => v === b).length
        ).pop()
      : 'general';

    const rootCause = stats.rootCauses.length > 0
      ? stats.rootCauses.sort((a, b) => a.length - b.length)[0] // أقصر سبب (الأكثر تحديداً)
      : 'يحتاج مراجعة عامة';

    const futureImpact = stats.futureImpacts.length > 0
      ? stats.futureImpacts.sort((a, b) => a.length - b.length)[0]
      : 'سيؤثر على فهم الموضوعات المتقدمة';

    const remediationQuery = stats.remediationQueries.length > 0
      ? stats.remediationQueries.sort((a, b) => a.length - b.length)[0]
      : `شرح ${stats.name}`;

    return {
      id,
      name: stats.name,
      percentage,
      level: percentage >= 70 ? 'متقن' : percentage >= 50 ? 'قيد التعلم' : 'ضعيف',
      total: stats.total,
      correct: stats.correct,
      errorPattern: mostCommonError,
      rootCause,
      futureImpact,
      remediationVideoQuery: remediationQuery,
    };
  });

  // ترتيب من الأضعف إلى الأقوى
  return results.sort((a, b) => a.percentage - b.percentage);
}

// ============================================================
// 🔷 2. بناء شجرة المهارات الهرمية (Skill Tree)
// ============================================================

function buildSkillTree(skillStats, questions) {
  // إنشاء عقدة لكل مهارة
  const nodes = {};
  skillStats.forEach(stat => {
    nodes[stat.id] = {
      name: stat.name,
      percentage: stat.percentage,
      level: stat.level,
      children: {},
      // نضيف معلومات تشخيصية للعقدة
      rootCause: stat.rootCause,
      futureImpact: stat.futureImpact,
      remediationQuery: stat.remediationVideoQuery,
    };
  });

  // بناء العلاقات باستخدام prerequisites من الأسئلة
  questions.forEach(q => {
    const prereqs = q.prerequisites || [];
    const skills = q.subSkills || [q.subSkill || 'general'];
    skills.forEach(skill => {
      const unified = unifySkill(skill);
      if (nodes[unified]) {
        prereqs.forEach(pre => {
          const preUnified = unifySkill(pre);
          if (nodes[preUnified]) {
            // إضافة العقدة الحالية كطفل للعقدة السابقة
            nodes[preUnified].children[unified] = nodes[unified];
          }
        });
      }
    });
  });

  // إزالة العقد المكررة (يمكن تحسينها)
  // نعيد الكائن مع العقد الجذرية (التي ليس لها آباء)
  // هنا نبسط: نعيد الكائن كاملاً، وسيتم عرضه بشكل متكرر في SkillTree.js
  return nodes;
}

// ============================================================
// 🔷 3. استنتاج الثقة والأسلوب المعرفي من السلوك
// ============================================================

function inferBehavioralMetrics(eventsLog, timePerQuestion, totalQuestions) {
  const events = Array.isArray(eventsLog) ? eventsLog : (typeof eventsLog === 'string' ? JSON.parse(eventsLog) : []);
  const times = Array.isArray(timePerQuestion) ? timePerQuestion : (typeof timePerQuestion === 'string' ? JSON.parse(timePerQuestion) : []);

  // عدد أحداث التردد (تمرير الماوس، تغيير الخيارات)
  const hoverEvents = events.filter(e => e.type === 'hover_option' || e.type === 'unhover_option').length;
  const changeEvents = events.filter(e => e.type === 'select_option').length; // قد تحتاج لتحسين
  const avgTime = times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;

  // مؤشر التردد
  const hesitationIndex = totalQuestions > 0 ? hoverEvents / totalQuestions : 0;

  let confidenceLevel = 'متوسطة';
  let speedIndex = 'متوسط';

  if (avgTime < 10 && hesitationIndex < 0.2) {
    confidenceLevel = 'عالية (واثق)';
    speedIndex = 'سريع';
  } else if (avgTime > 25 || hesitationIndex > 0.6) {
    confidenceLevel = 'منخفضة (متردد)';
    speedIndex = 'بطيء';
  } else {
    confidenceLevel = 'متوسطة';
    speedIndex = 'متوسط';
  }

  return { confidenceLevel, hesitationIndex, speedIndex, avgTime };
}

function inferCognitiveStyle(avgTime, confidenceLevel) {
  let style = 'متوازن';
  let description = 'لديك توازن جيد بين السرعة والدقة.';

  if (avgTime < 10 && confidenceLevel === 'عالية (واثق)') {
    style = 'حدسي سريع (مندفع)';
    description = 'أنت سريع في الإجابة وتعتمد على البديهة. قد تخطئ في الأسئلة المعقدة التي تحتاج إلى تفكير عميق. نصيحة: تأن قليلاً في الأسئلة الصعبة.';
  } else if (avgTime > 25 && confidenceLevel === 'منخفضة (متردد)') {
    style = 'تحليلي متعمق (متردد)';
    description = 'أنت تفكر بعمق وتدقق في التفاصيل، مما يجعلك دقيقاً لكن بطيئاً. نصيحة: تدرب على حل الأسئلة بسرعة ضمن وقت محدد.';
  } else if (avgTime < 10 && confidenceLevel === 'منخفضة (متردد)') {
    style = 'متردد وسريع (غير مستقر)';
    description = 'تجاوب بسرعة لكنك غير واثق من إجاباتك. قد يكون ذلك بسبب عدم الاستقرار المعرفي. حاول مراجعة الأساسيات بانتظام.';
  } else if (avgTime > 25 && confidenceLevel === 'عالية (واثق)') {
    style = 'استراتيجي متأنٍ';
    description = 'تأخذ وقتك في التفكير وإجاباتك صحيحة غالباً. هذا أسلوب مثالي للامتحانات التي تتطلب دقة عالية.';
  }

  return { style, description };
}

// ============================================================
// 🔷 4. تحليل الأخطاء واستخراج أضعف المهارات
// ============================================================

function extractWeakestSkills(skillStats, limit = 3) {
  // نأخذ المهارات الأضعف (أقل نسبة)
  const weakest = skillStats
    .filter(s => s.percentage < 70) // أقل من 70% تعتبر ضعيفة
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, limit);

  return weakest.map(s => ({
    name: s.name,
    percentage: s.percentage,
    rootCause: s.rootCause || 'يحتاج مراجعة عامة',
    futureImpact: s.futureImpact || 'سيؤثر على فهم الموضوعات المتقدمة',
    remediationVideoQuery: s.remediationVideoQuery || `شرح ${s.name}`,
    errorPattern: s.errorPattern || 'general',
  }));
}

// ============================================================
// 🔷 5. توليد خطة علاجية ديناميكية
// ============================================================

function generateDynamicPlan(weakestSkills, score) {
  if (!weakestSkills || weakestSkills.length === 0) {
    return {
      hasWeakness: false,
      priority: '🎉 ممتاز! لا توجد ثغرات حرجة',
      priorityLevel: 'ممتاز',
      rootCause: 'لا توجد ثغرات',
      solution: 'استمر في التطوير والممارسة',
      timeRequired: 0,
      today: ['حافظ على مستواك بمراجعة أسبوعية'],
      thisWeek: ['جرب تحديات متقدمة'],
      videoLink: '#',
    };
  }

  const topWeakness = weakestSkills[0];
  const timeRequired = Math.max(15, Math.ceil((100 - topWeakness.percentage) / 5) * 5);

  return {
    hasWeakness: true,
    priority: topWeakness.name,
    priorityLevel: topWeakness.percentage < 30 ? 'حرجة 🚨' : topWeakness.percentage < 50 ? 'متوسطة ⚠️' : 'منخفضة ✅',
    rootCause: topWeakness.rootCause,
    solution: `راجع الفيديوهات التعليمية حول ${topWeakness.name}، وحل تمارين عملية لتثبيت الفهم.`,
    timeRequired: timeRequired,
    today: [
      `شاهد: ${topWeakness.remediationVideoQuery}`,
      `حل 3 تمارين على ${topWeakness.name}`,
    ],
    thisWeek: [
      `أكمل 10 تمارين على ${topWeakness.name}`,
      `اختبر نفسك في ${topWeakness.name} مرة أخرى`,
      ...(weakestSkills.length > 1 ? [`راجع ${weakestSkills[1].name}`] : []),
    ],
    videoLink: `https://www.youtube.com/results?search_query=${encodeURIComponent(topWeakness.remediationVideoQuery)}`,
    currentPercentage: topWeakness.percentage,
  };
}

// ============================================================
// 🔷 6. التنبؤ المهني (Career Fit) محسّن
// ============================================================

function generateCareerFit(skillStats) {
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
  skillStats.forEach(s => {
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
// 🔷 7. المولد الاحتياطي للتقرير (Fallback)
// ============================================================

function generateFallbackReport(score, cognitiveStyle, weakestSkills) {
  let report = `📊 **تحليل أدائك:**\n`;
  report += `- النتيجة: ${score}%\n`;
  report += `- أسلوبك المعرفي: ${cognitiveStyle.style}\n`;
  report += `- ${cognitiveStyle.description}\n\n`;

  if (weakestSkills && weakestSkills.length > 0) {
    report += `🔍 **نقاط الضعف الرئيسية:**\n`;
    weakestSkills.forEach(s => {
      report += `  - ${s.name} (${s.percentage}%): ${s.rootCause}\n`;
      report += `    التأثير المستقبلي: ${s.futureImpact}\n`;
    });
    report += `\n📝 **خطة علاجية مقترحة:**\n`;
    report += `  - شاهد الفيديوهات التعليمية حول ${weakestSkills[0].name}\n`;
    report += `  - حل تمارين عملية لتثبيت الفهم\n`;
  } else {
    report += `🎉 **ممتاز!** أنت متقن لجميع المهارات التي تم اختبارها.`;
  }

  return report;
}

// ============================================================
// 🔷 المعالج الرئيسي (Handler)
// ============================================================

export default async function handler(req, res) {
  // التأكد من أن الطلب POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // استقبال البيانات من الطلب
    const {
      answers,
      questions: sentQuestions,
      assessmentId,
      timePerQuestion,
      eventsLog,
      theta,
      mode,
    } = req.body;

    // التحقق من وجود إجابات
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: 'No answers provided' });
    }

    // جلب الأسئلة (إما المرسلة أو جميع الأسئلة)
    const questions = sentQuestions?.length > 0 ? sentQuestions : getAllBasicsQuestions();
    if (!questions || questions.length === 0) {
      return res.status(404).json({ error: 'No questions found' });
    }

    // تحويل الإجابات إلى أرقام (للمقارنة)
    const numericAnswers = answers.map((a, i) => {
      const q = questions[i];
      if (q?.isWriting) {
        const num = Number(a);
        return isNaN(num) ? 1 : num === 1 ? 1 : 2;
      }
      const num = Number(a);
      return isNaN(num) || num < 1 || num > 4 ? 1 : num;
    });

    // ============================================================
    // 1. حساب النتيجة المئوية الأساسية (للمقارنة)
    // ============================================================
    let correctCount = 0;
    questions.forEach((q, i) => {
      const isCorrect = q.isWriting
        ? (answers[i] || '').toString().trim().toLowerCase() === (q.expectedAnswer || '').trim().toLowerCase()
        : numericAnswers[i] === q.correct;
      if (isCorrect) correctCount++;
    });
    const simpleScore = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

    // ============================================================
    // 2. تحليل المهارات (إحصائي)
    // ============================================================
    const skillStats = computeSkillStats(questions, numericAnswers, answers);

    // ============================================================
    // 3. تقدير القدرة باستخدام IRT (إذا كان هناك معاملات)
    // ============================================================
    let estimatedTheta = 0;
    try {
      // بناء مصفوفة الإجابات مع معرفات الأسئلة
      const answeredItems = questions.map((q, i) => ({
        questionId: q.id,
        isCorrect: q.isWriting
          ? (answers[i] || '').toString().trim().toLowerCase() === (q.expectedAnswer || '').trim().toLowerCase()
          : numericAnswers[i] === q.correct,
      }));
      estimatedTheta = estimateTheta(answeredItems, questions);
    } catch (e) {
      console.warn('فشل تقدير ثيتا، استخدام القيمة الافتراضية 0', e);
      estimatedTheta = 0;
    }

    // ============================================================
    // 4. استنتاج الثقة والأسلوب المعرفي من السلوك
    // ============================================================
    const behavior = inferBehavioralMetrics(eventsLog, timePerQuestion, questions.length);
    const cognitive = inferCognitiveStyle(behavior.avgTime, behavior.confidenceLevel);

    // ============================================================
    // 5. بناء شجرة المهارات
    // ============================================================
    const skillTree = buildSkillTree(skillStats, questions);

    // ============================================================
    // 6. استخراج أضعف المهارات
    // ============================================================
    const weakestSkills = extractWeakestSkills(skillStats, 3);

    // ============================================================
    // 7. توليد خطة علاجية
    // ============================================================
    const actionablePlan = generateDynamicPlan(weakestSkills, simpleScore);

    // ============================================================
    // 8. التنبؤ المهني
    // ============================================================
    const careerFit = generateCareerFit(skillStats);

    // ============================================================
    // 9. توليد تقرير احتياطي (في حال فشل الـ AI)
    // ============================================================
    const fallbackReport = generateFallbackReport(simpleScore, cognitive, weakestSkills);

    // ============================================================
    // 10. بناء JSON النهائي (خام)
    // ============================================================
    const rawAnalysis = {
      success: true,
      mode: mode || 'full',
      isQuick: mode === 'quick',

      // النتيجة الأساسية
      score: simpleScore,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      wrongAnswers: questions.length - correctCount,

      // تقدير القدرة (IRT)
      estimatedTheta,

      // التحليلات السلوكية
      cognitiveProfile: {
        style: cognitive.style,
        description: cognitive.description,
        confidenceLevel: behavior.confidenceLevel,
        hesitationIndex: behavior.hesitationIndex,
        speedIndex: behavior.speedIndex,
        avgTime: behavior.avgTime,
      },

      // شجرة المهارات الهرمية
      skillTree,

      // أضعف المهارات مع التشخيص
      weakestSkills,

      // الخطة العلاجية
      actionablePlan,

      // التنبؤ المهني
      careerFit,

      // المهارات المسطحة (للتوافق مع العرض القديم إن أردت)
      flatSkills: skillStats,

      // التقرير الاحتياطي (نص)
      fallbackReport,

      // رؤية مختصرة
      insight: actionablePlan.hasWeakness
        ? `🎯 أولويتك: ${actionablePlan.priority}. ${actionablePlan.rootCause}. خصص ${actionablePlan.timeRequired} دقيقة للعلاج.`
        : '🎉 ممتاز! لا توجد ثغرات حرجة.',
    };

    // ============================================================
    // 11. إرجاع النتيجة
    // ============================================================
    return res.status(200).json(rawAnalysis);
  } catch (error) {
    console.error('❌ خطأ في تحليل النتائج:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'حدث خطأ غير متوقع أثناء التحليل',
    });
  }
}
