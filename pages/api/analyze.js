// pages/api/analyze.js - النسخة النهائية مع التحليل الذكي المتقدم والتنبؤ المهني
import { getAllBasicsQuestions } from '../../data/questions/basics';

const LEARNING_STAGES = {
  'concepts': [
    { id: 'net_def', concept: 'تعريف الشبكة', icon: '🌐', topic: 'Network Basics' },
    { id: 'net_types', concept: 'أنواع الشبكات', icon: '📡', topic: 'Network Basics' },
    { id: 'client_server', concept: 'Client-Server', icon: '🖥️', topic: 'Network Basics' },
    { id: 'p2p', concept: 'Peer-to-Peer', icon: '🔗', topic: 'Network Basics' },
    { id: 'transmission', concept: 'وسائط النقل', icon: '📡', topic: 'Network Basics' },
    { id: 'vlan_vpn', concept: 'VLAN و VPN', icon: '🔒', topic: 'Network Basics' },
  ],
  'ipv4': [
    { id: 'ip_def', concept: 'تعريف عنوان IP', icon: '🌍', topic: 'IPv4' },
    { id: 'ip_structure', concept: 'أجزاء عنوان IPv4', icon: '🧩', topic: 'IPv4' },
    { id: 'ip_classes', concept: 'تصنيفات IPv4', icon: '🏷️', topic: 'IPv4' },
    { id: 'public_private', concept: 'العناوين العامة والخاصة', icon: '🔐', topic: 'IPv4' },
    { id: 'subnet_mask', concept: 'Subnet Mask', icon: '🎭', topic: 'IPv4' },
    { id: 'gateway_loopback', concept: 'Gateway و Loopback', icon: '🚪', topic: 'IPv4' },
  ],
  'subnetting': [
    { id: 'subnet_concept', concept: 'مفهوم Subnetting', icon: '✂️', topic: 'Subnetting' },
    { id: 'cidr', concept: 'ترميز CIDR', icon: '📐', topic: 'Subnetting' },
    { id: 'network_id', concept: 'تحديد Network ID', icon: '🎯', topic: 'Subnetting' },
    { id: 'broadcast', concept: 'عناوين البث', icon: '📢', topic: 'Subnetting' },
    { id: 'host_calc', concept: 'حساب المضيفين', icon: '🔢', topic: 'Subnetting' },
    { id: 'flsm_vlsm', concept: 'FLSM و VLSM', icon: '📊', topic: 'Subnetting' },
  ],
  'ipv6': [
    { id: 'ipv6_def', concept: 'تعريف IPv6', icon: '🌐', topic: 'IPv6' },
    { id: 'ipv6_structure', concept: 'بنية عنوان IPv6', icon: '🧬', topic: 'IPv6' },
    { id: 'ipv6_types', concept: 'أنواع عناوين IPv6', icon: '🏷️', topic: 'IPv6' },
    { id: 'ipv6_shorten', concept: 'اختصار العناوين', icon: '✂️', topic: 'IPv6' },
    { id: 'ipv6_vs_ipv4', concept: 'مقارنة IPv4 و IPv6', icon: '⚖️', topic: 'IPv6' },
  ],
  'osi': [
    { id: 'osi_def', concept: 'تعريف OSI Model', icon: '🏗️', topic: 'OSI Model' },
    { id: 'osi_layers', concept: 'الطبقات السبع', icon: '🍰', topic: 'OSI Model' },
    { id: 'osi_layer_func', concept: 'وظائف الطبقات', icon: '⚙️', topic: 'OSI Model' },
    { id: 'osi_pdu', concept: 'وحدات البيانات PDU', icon: '📦', topic: 'OSI Model' },
    { id: 'osi_protocols', concept: 'البروتوكولات في OSI', icon: '📋', topic: 'OSI Model' },
    { id: 'osi_vs_tcpip', concept: 'OSI vs TCP/IP', icon: '🔄', topic: 'OSI Model' },
  ],
  'devices': [
    { id: 'switch', concept: 'المبدل Switch', icon: '🔀', topic: 'Network Devices' },
    { id: 'router', concept: 'الموجه Router', icon: '🚦', topic: 'Network Devices' },
    { id: 'hub', concept: 'الموزع Hub', icon: '🔌', topic: 'Network Devices' },
    { id: 'bridge', concept: 'الجسر Bridge', icon: '🌉', topic: 'Network Devices' },
    { id: 'firewall', concept: 'جدار الحماية', icon: '🔥', topic: 'Network Devices' },
    { id: 'access_point', concept: 'نقطة الوصول', icon: '📶', topic: 'Network Devices' },
  ],
  'email': [
    { id: 'smtp', concept: 'بروتوكول SMTP', icon: '📤', topic: 'Email Protocols' },
    { id: 'pop3', concept: 'بروتوكول POP3', icon: '📥', topic: 'Email Protocols' },
    { id: 'imap', concept: 'بروتوكول IMAP', icon: '📧', topic: 'Email Protocols' },
    { id: 'ports', concept: 'المنافذ الافتراضية', icon: '🚪', topic: 'Email Protocols' },
    { id: 'ssl_tls', concept: 'تأمين SSL/TLS', icon: '🔒', topic: 'Email Protocols' },
  ],
  'tcpip': [
    { id: 'tcpip_layers', concept: 'طبقات TCP/IP', icon: '🍰', topic: 'TCP/IP' },
    { id: 'tcp_vs_udp', concept: 'TCP مقابل UDP', icon: '⚖️', topic: 'TCP/IP' },
    { id: 'handshake', concept: 'المصافحة الثلاثية', icon: '🤝', topic: 'TCP/IP' },
    { id: 'http', concept: 'بروتوكول HTTP', icon: '🌐', topic: 'TCP/IP' },
    { id: 'ports_tcpip', concept: 'منافذ TCP/IP', icon: '🚪', topic: 'TCP/IP' },
  ],
  'full': [
    { id: 'net_def', concept: 'تعريف الشبكة', icon: '🌐', topic: 'Network Basics' },
    { id: 'net_types', concept: 'أنواع الشبكات', icon: '📡', topic: 'Network Basics' },
    { id: 'client_server', concept: 'Client-Server', icon: '🖥️', topic: 'Network Basics' },
    { id: 'p2p', concept: 'Peer-to-Peer', icon: '🔗', topic: 'Network Basics' },
    { id: 'ip_def', concept: 'تعريف عنوان IP', icon: '🌍', topic: 'IPv4' },
    { id: 'ip_structure', concept: 'أجزاء عنوان IPv4', icon: '🧩', topic: 'IPv4' },
    { id: 'ip_classes', concept: 'تصنيفات IPv4', icon: '🏷️', topic: 'IPv4' },
    { id: 'public_private', concept: 'العناوين العامة والخاصة', icon: '🔐', topic: 'IPv4' },
    { id: 'subnet_mask', concept: 'Subnet Mask', icon: '🎭', topic: 'IPv4' },
    { id: 'subnet_concept', concept: 'مفهوم Subnetting', icon: '✂️', topic: 'Subnetting' },
    { id: 'cidr', concept: 'ترميز CIDR', icon: '📐', topic: 'Subnetting' },
    { id: 'network_id', concept: 'تحديد Network ID', icon: '🎯', topic: 'Subnetting' },
    { id: 'broadcast', concept: 'عناوين البث', icon: '📢', topic: 'Subnetting' },
    { id: 'host_calc', concept: 'حساب المضيفين', icon: '🔢', topic: 'Subnetting' },
    { id: 'ipv6_def', concept: 'تعريف IPv6', icon: '🌐', topic: 'IPv6' },
    { id: 'ipv6_structure', concept: 'بنية عنوان IPv6', icon: '🧬', topic: 'IPv6' },
    { id: 'ipv6_types', concept: 'أنواع عناوين IPv6', icon: '🏷️', topic: 'IPv6' },
    { id: 'osi_def', concept: 'تعريف OSI Model', icon: '🏗️', topic: 'OSI Model' },
    { id: 'osi_layers', concept: 'الطبقات السبع', icon: '🍰', topic: 'OSI Model' },
    { id: 'osi_layer_func', concept: 'وظائف الطبقات', icon: '⚙️', topic: 'OSI Model' },
    { id: 'switch', concept: 'المبدل Switch', icon: '🔀', topic: 'Network Devices' },
    { id: 'router', concept: 'الموجه Router', icon: '🚦', topic: 'Network Devices' },
    { id: 'firewall', concept: 'جدار الحماية', icon: '🔥', topic: 'Network Devices' },
    { id: 'smtp', concept: 'بروتوكول SMTP', icon: '📤', topic: 'Email Protocols' },
    { id: 'pop3', concept: 'بروتوكول POP3', icon: '📥', topic: 'Email Protocols' },
    { id: 'imap', concept: 'بروتوكول IMAP', icon: '📧', topic: 'Email Protocols' },
    { id: 'tcpip_layers', concept: 'طبقات TCP/IP', icon: '🍰', topic: 'TCP/IP' },
    { id: 'tcp_vs_udp', concept: 'TCP مقابل UDP', icon: '⚖️', topic: 'TCP/IP' },
    { id: 'handshake', concept: 'المصافحة الثلاثية', icon: '🤝', topic: 'TCP/IP' },
  ],
};

const ALL_ASSESSMENTS = [
  { id: 'concepts', name: 'المفاهيم العامة', icon: '📘', topic: 'Network Basics' },
  { id: 'ipv4', name: 'IPv4', icon: '🌍', topic: 'IPv4' },
  { id: 'subnetting', name: 'Subnetting', icon: '🔢', topic: 'Subnetting' },
  { id: 'ipv6', name: 'IPv6', icon: '🛜', topic: 'IPv6' },
  { id: 'osi', name: 'OSI Model', icon: '📡', topic: 'OSI Model' },
  { id: 'devices', name: 'أجهزة الشبكات', icon: '💻', topic: 'Network Devices' },
  { id: 'email', name: 'بروتوكولات البريد', icon: '📧', topic: 'Email Protocols' },
  { id: 'tcpip', name: 'TCP/IP', icon: '🔗', topic: 'TCP/IP' },
];

const DIAGNOSTIC_SKILLS = {
  'Network_Basics': 'أساسيات الشبكات', 'IPv4_Addressing': 'عنونة IPv4', 'Subnet_Mask_Calc': 'حساب قناع الشبكة الفرعية',
  'Network_Broadcast_ID': 'تحديد الشبكة والبث', 'VLSM_Application': 'تطبيق VLSM', 'IPv6_Basics': 'أساسيات IPv6',
  'OSI_Layers': 'طبقات OSI', 'TCP_IP_Protocols': 'بروتوكولات TCP/IP', 'Network_Devices': 'أجهزة الشبكات', 'Email_Protocols': 'بروتوكولات البريد',
};

// ============================================================
// 🧠 التحليل الذكي المتقدم (المهارات الفرعية + الأخطاء الذكية)
// ============================================================

const SUB_SKILLS = {
  'IPv4': [
    { id: 'ipv4_structure', name: 'بنية عنوان IPv4 (الأوكتتات)', keywords: ['octet', 'بنية', 'أجزاء', 'تقسيم'] },
    { id: 'ipv4_binary', name: 'تحويل الأنظمة (ثنائي/عشري)', keywords: ['تحويل', 'ثنائي', 'عشري', 'binary'] },
    { id: 'ipv4_classes', name: 'تصنيفات العناوين (Class A/B/C)', keywords: ['class', 'تصنيف', 'فئة'] },
    { id: 'ipv4_public_private', name: 'العناوين العامة والخاصة', keywords: ['خاصة', 'عامة', 'private', 'public'] },
    { id: 'ipv4_subnetting', name: 'حسابات Subnetting', keywords: ['subnet', 'شبكة فرعية', 'cidr'] },
    { id: 'ipv4_vlsm', name: 'VLSM و CIDR', keywords: ['vlsm', 'cidr', 'تلخيص'] },
  ],
  'Subnetting': [
    { id: 'subnet_concept', name: 'مفهوم Subnetting', keywords: ['مفهوم', 'فكرة'] },
    { id: 'subnet_cidr', name: 'ترميز CIDR', keywords: ['cidr', '/', 'ترميز'] },
    { id: 'subnet_network_id', name: 'تحديد Network ID', keywords: ['network id', 'معرف الشبكة'] },
    { id: 'subnet_broadcast', name: 'حساب عنوان البث', keywords: ['broadcast', 'بث'] },
    { id: 'subnet_hosts', name: 'حساب عدد المضيفين', keywords: ['hosts', 'مضيفين', 'عدد'] },
    { id: 'subnet_flsm_vlsm', name: 'FLSM و VLSM', keywords: ['flsm', 'vlsm'] },
  ],
  'IPv6': [
    { id: 'ipv6_structure', name: 'بنية عنوان IPv6', keywords: ['بنية', 'أجزاء'] },
    { id: 'ipv6_types', name: 'أنواع عناوين IPv6', keywords: ['types', 'أنواع'] },
    { id: 'ipv6_shorten', name: 'اختصار عناوين IPv6', keywords: ['اختصار', 'shorten'] },
    { id: 'ipv6_comparison', name: 'مقارنة IPv4 و IPv6', keywords: ['مقارنة', 'comparison'] },
  ],
  'OSI Model': [
    { id: 'osi_layers', name: 'طبقات OSI السبع', keywords: ['طبقات', 'layers'] },
    { id: 'osi_functions', name: 'وظائف كل طبقة', keywords: ['وظائف', 'functions'] },
    { id: 'osi_protocols', name: 'البروتوكولات في OSI', keywords: ['بروتوكولات', 'protocols'] },
    { id: 'osi_pdu', name: 'وحدات البيانات PDU', keywords: ['pdu', 'وحدات'] },
  ],
  'Network Devices': [
    { id: 'device_switch', name: 'المبدل Switch', keywords: ['switch', 'مبدل'] },
    { id: 'device_router', name: 'الموجه Router', keywords: ['router', 'موجه'] },
    { id: 'device_firewall', name: 'جدار الحماية', keywords: ['firewall', 'جدار'] },
    { id: 'device_access_point', name: 'نقطة الوصول AP', keywords: ['access point', 'ap'] },
  ],
  'Email Protocols': [
    { id: 'email_smtp', name: 'بروتوكول SMTP', keywords: ['smtp'] },
    { id: 'email_pop3', name: 'بروتوكول POP3', keywords: ['pop3'] },
    { id: 'email_imap', name: 'بروتوكول IMAP', keywords: ['imap'] },
    { id: 'email_ports', name: 'المنافذ الافتراضية', keywords: ['ports', 'منافذ'] },
  ],
  'TCP/IP': [
    { id: 'tcpip_layers', name: 'طبقات TCP/IP', keywords: ['طبقات', 'layers'] },
    { id: 'tcpip_tcp_vs_udp', name: 'الفرق بين TCP و UDP', keywords: ['tcp', 'udp'] },
    { id: 'tcpip_handshake', name: 'المصافحة الثلاثية', keywords: ['handshake', 'مصافحة'] },
    { id: 'tcpip_http', name: 'بروتوكول HTTP', keywords: ['http'] },
  ],
};

function identifySubSkill(question) {
  const topic = question.topic || '';
  const subSkill = question.subSkill || '';
  const questionText = question.question || '';
  const skills = SUB_SKILLS[topic] || [];
  for (const skill of skills) {
    for (const keyword of skill.keywords) {
      if (subSkill.toLowerCase().includes(keyword) || 
          questionText.toLowerCase().includes(keyword) ||
          topic.toLowerCase().includes(keyword)) {
        return skill.id;
      }
    }
  }
  return null;
}

function analyzeSubSkillsDeeply(questions, numericAnswers, rawAnswers) {
  const subSkillResults = {};
  questions.forEach((q, i) => {
    const skillId = identifySubSkill(q);
    if (!skillId) return;
    if (!subSkillResults[skillId]) {
      subSkillResults[skillId] = {
        total: 0,
        correct: 0,
        errors: [],
        times: [],
        name: skillId,
        topic: q.topic || 'عام'
      };
    }
    const stats = subSkillResults[skillId];
    stats.total++;
    const isCorrect = q.isWriting ? 
      (rawAnswers[i] || '').toString().trim().toLowerCase() === (q.expectedAnswer || '').trim().toLowerCase() : 
      numericAnswers[i] === q.correct;
    if (isCorrect) {
      stats.correct++;
    } else {
      const errorType = classifyError(q, rawAnswers[i], numericAnswers[i]);
      stats.errors.push({
        question: q.question,
        yourAnswer: rawAnswers[i] || numericAnswers[i],
        correctAnswer: q.expectedAnswer || q.options?.[q.correct - 1] || '',
        errorType: errorType,
        subSkill: skillId
      });
    }
  });
  const result = {};
  for (const [skillId, stats] of Object.entries(subSkillResults)) {
    const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    const errorTypes = stats.errors.map(e => e.errorType);
    const dominantError = getMostCommon(errorTypes);
    let rootCause = '', solution = '', youtubeSearch = '';
    if (dominantError === 'conceptual') {
      rootCause = 'ضعف في فهم المفهوم الأساسي';
      solution = 'راجع الشرح النظري للمفهوم من المصادر الموثوقة';
      youtubeSearch = `شرح ${stats.name} بالعربي مفهوم`;
    } else if (dominantError === 'calculation') {
      rootCause = 'أخطاء في العمليات الحسابية';
      solution = 'تدرب على الحسابات خطوة بخطوة واستخدم آلة حاسبة للتحقق';
      youtubeSearch = `تمارين ${stats.name} بالعربي`;
    } else if (dominantError === 'application') {
      rootCause = 'صعوبة في تطبيق المعلومة على سيناريوهات جديدة';
      solution = 'حل تمارين تطبيقية متنوعة تغطي سيناريوهات مختلفة';
      youtubeSearch = `تطبيقات ${stats.name} بالعربي`;
    } else if (dominantError === 'memorization') {
      rootCause = 'اعتماد على الحفظ بدون فهم عميق';
      solution = 'حاول إعادة صياغة المعلومة بكلماتك الخاصة وربطها بمفاهيم أخرى';
      youtubeSearch = `فهم ${stats.name} بالعربي`;
    } else {
      rootCause = 'يحتاج مراجعة عامة للمهارة';
      solution = 'راجع الأساسيات وقم بحل تمارين متنوعة';
      youtubeSearch = `شرح ${stats.name} بالعربي`;
    }
    result[skillId] = {
      name: stats.name,
      topic: stats.topic,
      percentage: pct,
      correct: stats.correct,
      total: stats.total,
      level: pct >= 80 ? 'متقن' : pct >= 50 ? 'قيد التعلم' : 'ضعيف',
      errors: stats.errors,
      errorCount: stats.errors.length,
      dominantError: dominantError || 'none',
      rootCause: rootCause,
      solution: solution,
      youtubeSearch: youtubeSearch,
      priority: pct < 50 ? 'حرجة' : pct < 70 ? 'متوسطة' : 'منخفضة'
    };
  }
  return result;
}

function classifyError(question, rawAnswer, numericAnswer) {
  const q = question;
  const subSkill = q.subSkill || '';
  const cognitiveLevel = q.cognitiveLevel || 'remembering';
  if (cognitiveLevel === 'remembering') return 'memorization';
  if (cognitiveLevel === 'applying' || cognitiveLevel === 'analyzing') return 'application';
  if (subSkill.includes('Subnet') || subSkill.includes('Calculation') || subSkill.includes('Network_ID')) {
    return 'calculation';
  }
  if (cognitiveLevel === 'understanding' || cognitiveLevel === 'evaluating' || cognitiveLevel === 'creating') {
    return 'conceptual';
  }
  return 'conceptual';
}

function generateSurgicalLearningMap(subSkillAnalysis, topicAnalysis) {
  const weakSkills = Object.entries(subSkillAnalysis)
    .filter(([_, data]) => data.percentage < 70)
    .sort((a, b) => a[1].percentage - b[1].percentage);
  const criticalSkills = weakSkills.filter(([_, data]) => data.percentage < 40);
  const moderateSkills = weakSkills.filter(([_, data]) => data.percentage >= 40 && data.percentage < 70);
  return {
    critical: criticalSkills.map(([id, data]) => ({
      skillId: id,
      name: data.name,
      percentage: data.percentage,
      rootCause: data.rootCause,
      solution: data.solution,
      youtubeSearch: data.youtubeSearch,
      exercises: Math.max(5, Math.round((100 - data.percentage) / 10)),
      priority: 'عالية جداً'
    })),
    moderate: moderateSkills.map(([id, data]) => ({
      skillId: id,
      name: data.name,
      percentage: data.percentage,
      rootCause: data.rootCause,
      solution: data.solution,
      youtubeSearch: data.youtubeSearch,
      exercises: Math.max(3, Math.round((100 - data.percentage) / 15)),
      priority: 'متوسطة'
    })),
    mastered: Object.entries(subSkillAnalysis)
      .filter(([_, data]) => data.percentage >= 80)
      .map(([id, data]) => ({
        skillId: id,
        name: data.name,
        percentage: data.percentage,
        priority: 'منخفضة (مكتمل)'
      }))
  };
}

function generatePreciseLessons(subSkillAnalysis, weaknesses) {
  const lessons = [];
  for (const [skillId, data] of Object.entries(subSkillAnalysis)) {
    if (data.percentage < 70) {
      lessons.push({
        skillId: skillId,
        topic: data.name,
        percentage: data.percentage,
        reason: data.rootCause || 'يحتاج مراجعة',
        solution: data.solution || 'راجع الأساسيات',
        youtubeSearch: data.youtubeSearch || `شرح ${data.name} بالعربي`,
        exercises: Math.max(3, Math.round((100 - data.percentage) / 10)),
        priority: data.percentage < 40 ? 'عالية' : 'متوسطة'
      });
    }
  }
  for (const w of weaknesses) {
    const exists = lessons.some(l => l.topic.includes(w.topic));
    if (!exists) {
      lessons.push({
        skillId: w.topic,
        topic: w.topic,
        percentage: w.percentage,
        reason: w.reason || 'ضعف عام في الموضوع',
        solution: w.solution || 'راجع الموضوع من البداية',
        youtubeSearch: `شرح ${w.topic} بالعربي`,
        exercises: 5,
        priority: w.percentage < 40 ? 'عالية' : 'متوسطة'
      });
    }
  }
  return lessons.sort((a, b) => {
    const priorityOrder = { 'عالية': 0, 'متوسطة': 1, 'منخفضة': 2 };
    return (priorityOrder[a.priority] || 1) - (priorityOrder[b.priority] || 1);
  });
}

// ============================================================
// 🧭 نظام التنبؤ بالمستقبل المهني (Career Prediction)
// ============================================================

function predictCareerPath(subSkillDeepAnalysis, topicAnalysis) {
  const skills = Object.entries(subSkillDeepAnalysis).map(([id, data]) => ({
    id,
    name: data.name,
    percentage: data.percentage,
    level: data.level,
    topic: data.topic,
  }));

  const careerPaths = [
    {
      title: 'مهندس شبكات (Network Engineer)',
      icon: '🌐',
      description: 'تصميم وإدارة الشبكات المحلية والواسعة، وإعداد أجهزة التوجيه والمبدلات.',
      requiredSkills: ['ipv4_subnetting', 'ipv4_vlsm', 'subnet_cidr', 'subnet_network_id', 'device_router', 'device_switch'],
      salaryRange: '8,000 - 15,000 $',
      growth: 'متزايد',
      companies: ['Cisco', 'Huawei', 'Juniper', 'شركات الاتصالات'],
    },
    {
      title: 'مهندس أمن سيبراني (Security Engineer)',
      icon: '🔒',
      description: 'حماية الشبكات والأنظمة من الهجمات الإلكترونية، إعداد جدران الحماية وأنظمة كشف التسلل.',
      requiredSkills: ['device_firewall', 'tcpip_tcp_vs_udp', 'tcpip_handshake', 'ipv4_public_private'],
      salaryRange: '10,000 - 20,000 $',
      growth: 'عال جداً',
      companies: ['Fortinet', 'Palo Alto', 'Cisco', 'البنوك والشركات الكبرى'],
    },
    {
      title: 'مهندس أنظمة (Systems Engineer)',
      icon: '🖥️',
      description: 'إدارة الخوادم وأنظمة التشغيل، وتكوين البنية التحتية للتقنية.',
      requiredSkills: ['osi_layers', 'tcpip_layers', 'device_router', 'ipv4_structure'],
      salaryRange: '7,000 - 14,000 $',
      growth: 'مستقر',
      companies: ['Microsoft', 'Linux', 'IBM', 'شركات التقنية'],
    },
    {
      title: 'مهندس اتصالات (Telecom Engineer)',
      icon: '📡',
      description: 'تصميم وإدارة شبكات الاتصالات، الألياف البصرية، والاتصالات اللاسلكية.',
      requiredSkills: ['ipv6_structure', 'ipv6_types', 'osi_layers', 'device_access_point'],
      salaryRange: '9,000 - 16,000 $',
      growth: 'متزايد',
      companies: ['STC', 'Zain', 'Mobily', 'Ericsson'],
    },
    {
      title: 'مهندس شبكات سحابية (Cloud Network Engineer)',
      icon: '☁️',
      description: 'تصميم وإدارة الشبكات في بيئات الحوسبة السحابية (AWS، Azure، GCP).',
      requiredSkills: ['ipv4_subnetting', 'tcpip_tcp_vs_udp', 'device_firewall', 'ipv4_public_private'],
      salaryRange: '12,000 - 22,000 $',
      growth: 'عال جداً',
      companies: ['Amazon', 'Microsoft', 'Google', 'Oracle'],
    },
    {
      title: 'مهندس شبكات لاسلكية (Wireless Engineer)',
      icon: '📶',
      description: 'تصميم وإدارة شبكات الواي فاي، تحسين التغطية، وحل مشاكل الاتصال اللاسلكي.',
      requiredSkills: ['device_access_point', 'ipv4_subnetting', 'ipv6_structure', 'osi_layers'],
      salaryRange: '8,000 - 15,000 $',
      growth: 'متزايد',
      companies: ['Ubiquiti', 'Ruckus', 'Aruba', 'شركات الاتصالات'],
    },
  ];

  const scores = careerPaths.map(path => {
    let totalSkills = 0, matchedSkills = 0, skillDetails = [];
    path.requiredSkills.forEach(skillId => {
      totalSkills++;
      const skill = skills.find(s => s.id === skillId);
      if (skill) {
        skillDetails.push({ name: skill.name, percentage: skill.percentage, level: skill.level });
        if (skill.percentage >= 60) matchedSkills++;
      } else {
        skillDetails.push({ name: skillId, percentage: 0, level: 'غير محدد' });
      }
    });
    const matchPercentage = totalSkills > 0 ? Math.round((matchedSkills / totalSkills) * 100) : 0;
    return { ...path, matchPercentage, skillDetails };
  });

  const sorted = scores.sort((a, b) => b.matchPercentage - a.matchPercentage);
  const top3 = sorted.slice(0, 3);

  const generateLearningPlan = (path) => {
    const weakSkills = path.skillDetails.filter(s => s.percentage < 60).map(s => s.name);
    if (weakSkills.length === 0) return 'أنت جاهز لهذا المسار! قم بتطوير مهاراتك العملية من خلال مشاريع تطبيقية.';
    let plan = '📚 **خطة التعلم المقترحة:**\n\n';
    weakSkills.forEach((skill, index) => {
      plan += `${index + 1}. **${skill}**: ابدأ بمراجعة الأساسيات، ثم حل تمارين تطبيقية، واختبر نفسك. يمكنك البحث عن دروس في يوتيوب باستخدام "شرح ${skill} بالعربي".\n`;
    });
    plan += '\n⏱️ **الوقت المتوقع:** 2-4 أسابيع حسب الجهد المبذول.';
    return plan;
  };

  return {
    topPaths: top3.map(path => ({
      title: path.title,
      icon: path.icon,
      description: path.description,
      matchPercentage: path.matchPercentage,
      salaryRange: path.salaryRange,
      growth: path.growth,
      companies: path.companies,
      learningPlan: generateLearningPlan(path),
      skillDetails: path.skillDetails,
    })),
    bestMatch: top3[0] || null,
    summary: top3.length > 0
      ? `🌟 بناءً على مهاراتك، أنت الأكثر توافقاً مع مسار "${top3[0].title}" بنسبة ${top3[0].matchPercentage}%.`
      : 'لم نتمكن من تحديد مسار مهني محدد، ننصحك بتطوير مهاراتك في المجالات الأساسية.',
  };
}

// ============================================================
// الدوال الأصلية (غير معدلة)
// ============================================================

function buildQMatrix(questions) {
  const qMatrix = {};
  questions.forEach(q => {
    const skills = [];
    const subSkill = q.subSkill || '';
    const topic = q.topic || '';
    if (subSkill.includes('Network_Basics') || topic.includes('Network Basics')) skills.push('Network_Basics');
    if (subSkill.includes('IPv4') || topic.includes('IPv4')) skills.push('IPv4_Addressing');
    if (subSkill.includes('Subnet') || topic.includes('Subnetting')) skills.push('Subnet_Mask_Calc');
    if (subSkill.includes('Broadcast') || subSkill.includes('Network_ID')) skills.push('Network_Broadcast_ID');
    if (subSkill.includes('VLSM') || topic.includes('VLSM')) skills.push('VLSM_Application');
    if (subSkill.includes('IPv6') || topic.includes('IPv6')) skills.push('IPv6_Basics');
    if (subSkill.includes('OSI') || topic.includes('OSI')) skills.push('OSI_Layers');
    if (subSkill.includes('TCP') || topic.includes('TCP')) skills.push('TCP_IP_Protocols');
    if (subSkill.includes('Device') || topic.includes('Network Devices')) skills.push('Network_Devices');
    if (subSkill.includes('Email') || topic.includes('Email Protocols')) skills.push('Email_Protocols');
    if (skills.length === 0) skills.push('Network_Basics');
    qMatrix[q.id || q.question] = [...new Set(skills)];
  });
  return qMatrix;
}

function estimateMastery(questions, rawAnswers, numericAnswers) {
  const qMatrix = buildQMatrix(questions);
  const allSkills = Object.keys(DIAGNOSTIC_SKILLS);
  const slip = 0.1, guess = 0.2;
  let bestLikelihood = -Infinity;
  let bestAlpha = {};
  allSkills.forEach(s => bestAlpha[s] = false);
  const skillList = allSkills;
  const numCombinations = Math.pow(2, skillList.length);
  for (let i = 0; i < Math.min(numCombinations, 1024); i++) {
    const currentAlpha = {};
    skillList.forEach((s, idx) => { currentAlpha[s] = ((i >> idx) & 1) === 1; });
    let logLikelihood = 0;
    questions.forEach((q, idx) => {
      const requiredSkills = qMatrix[q.id || q.question] || [];
      const hasAllSkills = requiredSkills.every(s => currentAlpha[s]);
      let isCorrect = q.isWriting ? (rawAnswers[idx]||'').toString().trim().toLowerCase() === (q.expectedAnswer||'').trim().toLowerCase() : numericAnswers[idx] === q.correct;
      const pCorrect = hasAllSkills ? (1 - slip) : guess;
      logLikelihood += Math.log((isCorrect ? pCorrect : (1-pCorrect)) + 0.001);
    });
    if (logLikelihood > bestLikelihood) { bestLikelihood = logLikelihood; bestAlpha = { ...currentAlpha }; }
  }
  const masteryProbabilities = {};
  for (const skill of skillList) {
    let count = 0, total = 0;
    for (let i = 0; i < Math.min(numCombinations, 1024); i++) {
      const currentAlpha = {};
      skillList.forEach((s, idx) => { currentAlpha[s] = ((i >> idx) & 1) === 1; });
      let logLik = 0;
      questions.forEach((q, idx) => {
        const requiredSkills = qMatrix[q.id || q.question] || [];
        const hasAllSkills = requiredSkills.every(s => currentAlpha[s]);
        let isCorrect = q.isWriting ? (rawAnswers[idx]||'').toString().trim().toLowerCase() === (q.expectedAnswer||'').trim().toLowerCase() : numericAnswers[idx] === q.correct;
        const pCorrect = hasAllSkills ? (1 - slip) : guess;
        logLik += Math.log((isCorrect ? pCorrect : (1-pCorrect)) + 0.001);
      });
      const weight = Math.exp(logLik - bestLikelihood);
      if (currentAlpha[skill]) count += weight;
      total += weight;
    }
    masteryProbabilities[skill] = total > 0 ? count / total : 0;
  }
  return { skills: skillList.map(s => ({ id: s, name: DIAGNOSTIC_SKILLS[s], masteryProbability: Math.round(masteryProbabilities[s] * 100), level: masteryProbabilities[s] > 0.7 ? 'متقن' : masteryProbabilities[s] > 0.4 ? 'قيد التعلم' : 'ضعيف' })), logLikelihood: bestLikelihood };
}

function getMostCommon(arr) {
  if (!arr || arr.length === 0) return null;
  const counts = {};
  arr.forEach(item => { counts[item] = (counts[item]||0)+1; });
  return Object.keys(counts).reduce((a,b) => counts[a] > counts[b] ? a : b);
}

function analyzeTopicsEnhanced(questions, numericAnswers, rawAnswers, timePerQuestion, confidenceLevels) {
  const topicsMap = new Map();
  questions.forEach((q, i) => {
    const topic = q.topic || 'عام';
    if (!topicsMap.has(topic)) topicsMap.set(topic, { total:0, correct:0, totalWeight:0, earnedWeight:0, confidenceSum:0, timeSum:0, hardCorrect:0, hardTotal:0, easyCorrect:0, easyTotal:0 });
    const stats = topicsMap.get(topic);
    stats.total++;
    const weight = (q.difficulty||1) + (['analyzing','evaluating','creating'].includes(q.cognitiveLevel) ? 0.5 : 0);
    stats.totalWeight += weight;
    const isCorrect = q.isWriting ? (rawAnswers[i]||'').toString().trim().toLowerCase() === (q.expectedAnswer||'').trim().toLowerCase() : numericAnswers[i] === q.correct;
    if (isCorrect) { stats.correct++; stats.earnedWeight += weight; if (q.difficulty>=2) stats.hardCorrect++; if (q.difficulty<=1) stats.easyCorrect++; }
    stats.confidenceSum += confidenceLevels?.[i] || 50;
    stats.timeSum += timePerQuestion?.[i] || 0;
    if (q.difficulty>=2) stats.hardTotal++;
    if (q.difficulty<=1) stats.easyTotal++;
  });
  const result = {};
  for (const [topic, stats] of topicsMap.entries()) {
    const pct = stats.total>0 ? Math.round((stats.correct/stats.total)*100) : 0;
    const weightedPct = stats.totalWeight>0 ? Math.round((stats.earnedWeight/stats.totalWeight)*100) : 0;
    const avgConfidence = stats.total>0 ? Math.round(stats.confidenceSum/stats.total) : 50;
    const avgTime = stats.total>0 ? Math.round(stats.timeSum/stats.total) : 0;
    const hardPct = stats.hardTotal>0 ? Math.round((stats.hardCorrect/stats.hardTotal)*100) : null;
    const easyPct = stats.easyTotal>0 ? Math.round((stats.easyCorrect/stats.easyTotal)*100) : null;
    const predictedScore = Math.min(98, weightedPct + Math.round((100-weightedPct)*0.4));
    const level = weightedPct >= 70 ? 'قوي' : weightedPct >= 50 ? 'متوسط' : 'ضعيف';
    let badge = '🥉'; if (weightedPct>=80) badge='🥇'; else if (weightedPct>=65) badge='🥈';
    let tip = '';
    if (hardPct!==null && easyPct!==null && easyPct>=80 && hardPct<=50) tip = 'تفهم الأساسيات لكن تواجه صعوبة في الأسئلة المتقدمة. ركز على التمارين الصعبة.';
    else if (avgConfidence<40 && pct>60) tip = 'أنت تعرف أكثر مما تعتقد! ثق بنفسك وزد سرعتك.';
    else if (avgConfidence>80 && pct<50) tip = 'لديك ثقة مفرطة. راجع المفاهيم الأساسية قبل التقدم.';
    else if (avgTime>20) tip = 'تحتاج لتسريع وقت الإجابة. تدرب على الحل بوقت محدد.';
    else if (weightedPct>=80) tip = 'أداء ممتاز! حافظ على مستواك وجرب أسئلة أصعب.';
    else if (weightedPct<50) tip = 'ابدأ من الأساسيات. شاهد فيديوهات تعليمية وارجع للمراجع.';
    else tip = 'أنت في منتصف الطريق. استمر في التمارين التطبيقية.';
    result[topic] = { percentage: pct, weightedPercentage: weightedPct, correct: stats.correct, total: stats.total, level, badge, avgConfidence, avgTime, hardPct, easyPct, predictedScore, tip };
  }
  return result;
}

function analyzeSubSkills(questions, numericAnswers, rawAnswers) {
  const subSkillMap = new Map();
  questions.forEach((q, i) => {
    if (!q.subSkill) return;
    if (!subSkillMap.has(q.subSkill)) subSkillMap.set(q.subSkill, { total: 0, correct: 0, topic: q.topic || 'عام', skillName: q.subSkill.replace(/_/g, ' ') });
    const stats = subSkillMap.get(q.subSkill);
    stats.total++;
    const isCorrect = q.isWriting ? (rawAnswers[i] || '').toString().trim().toLowerCase() === (q.expectedAnswer || '').trim().toLowerCase() : numericAnswers[i] === q.correct;
    if (isCorrect) stats.correct++;
  });
  const result = {};
  for (const [skill, stats] of subSkillMap.entries()) {
    const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    result[skill] = { percentage: pct, correct: stats.correct, total: stats.total, topic: stats.topic, skillName: stats.skillName, level: pct >= 70 ? 'قوي' : pct >= 50 ? 'متوسط' : 'ضعيف', recommendation: pct < 70 ? `ركز على ${stats.skillName}` : 'ممتاز!' };
  }
  return result;
}

function analyzeLearningProfile(questions, numericAnswers, rawAnswers) {
  const cognitiveMap = {
    remembering: { total: 0, correct: 0, label: 'التذكر' }, understanding: { total: 0, correct: 0, label: 'الفهم' },
    applying: { total: 0, correct: 0, label: 'التطبيق' }, analyzing: { total: 0, correct: 0, label: 'التحليل' },
    evaluating: { total: 0, correct: 0, label: 'التقييم' }, creating: { total: 0, correct: 0, label: 'الإبداع' },
  };
  questions.forEach((q, i) => {
    const level = q.cognitiveLevel;
    if (level && cognitiveMap[level]) { cognitiveMap[level].total++; const isCorrect = q.isWriting ? (rawAnswers[i] || '').toString().trim().toLowerCase() === (q.expectedAnswer || '').trim().toLowerCase() : numericAnswers[i] === q.correct; if (isCorrect) cognitiveMap[level].correct++; }
  });
  const result = {};
  for (const [key, stats] of Object.entries(cognitiveMap)) {
    const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    result[key] = { percentage: pct, label: stats.label, level: pct >= 70 ? 'قوي' : pct >= 50 ? 'متوسط' : 'ضعيف', stars: pct >= 80 ? '★★★' : pct >= 60 ? '★★' : pct >= 40 ? '★' : '☆' };
  }
  return result;
}

function analyzeErrors(questions, numericAnswers, rawAnswers) {
  const errors = [];
  questions.forEach((q, i) => {
    const isCorrect = q.isWriting ? (rawAnswers[i] || '').toString().trim().toLowerCase() === (q.expectedAnswer || '').trim().toLowerCase() : numericAnswers[i] === q.correct;
    if (!isCorrect) errors.push({ question: q.question, topic: q.topic, subSkill: q.subSkill, yourAnswer: q.isWriting ? (rawAnswers[i] || '(فارغة)').toString() : (q.options[numericAnswers[i] - 1] || 'غير معروف'), correctAnswer: q.isWriting ? (q.expectedAnswer || '') : (q.options[q.correct - 1] || ''), errorPattern: q.errorPattern || 'conceptual', cognitiveLevel: q.cognitiveLevel || 'remembering' });
  });
  return errors;
}

function analyzeRootCauses(weaknesses, topicAnalysis, errors) {
  const rootCauses = [];
  const allWeakTopics = weaknesses.map(w => w.topic);
  if (allWeakTopics.includes('IPv4') && allWeakTopics.includes('Subnetting')) rootCauses.push({ primaryTopic: 'Subnetting', description: 'ضعف Subnetting لديك مرتبط بضعف IPv4.', chain: ['IPv4 → Subnet Mask → Subnetting → VLSM'], solution: 'ابدأ بمراجعة أساسيات IPv4.' });
  if (allWeakTopics.includes('OSI Model') && allWeakTopics.includes('TCP/IP')) rootCauses.push({ primaryTopic: 'TCP/IP', description: 'ضعف TCP/IP نابع من ضعف OSI Model.', chain: ['OSI Layers → TCP/IP Stack → Protocols'], solution: 'ادرس طبقات OSI أولاً.' });
  return rootCauses;
}

function analyzeConfidence(questionResults) {
  let highConfCorrect = 0, lowConfCorrect = 0, highConfWrong = 0, lowConfWrong = 0;
  questionResults.forEach(q => { if (q.confidence >= 70) { if (q.isCorrect) highConfCorrect++; else highConfWrong++; } else { if (q.isCorrect) lowConfCorrect++; else lowConfWrong++; } });
  const total = questionResults.length || 1;
  return { highConfCorrect: Math.round((highConfCorrect / total) * 100), lowConfCorrect: Math.round((lowConfCorrect / total) * 100), highConfWrong: Math.round((highConfWrong / total) * 100), lowConfWrong: Math.round((lowConfWrong / total) * 100), insight: highConfWrong > 20 ? 'لديك مفاهيم خاطئة راسخة.' : lowConfCorrect > 30 ? 'أنت تعرف أكثر مما تعتقد.' : 'مستوى ثقتك متوازن.', recommendation: highConfWrong > 20 ? 'ركز على تصحيح المفاهيم.' : 'استمر في الممارسة.' };
}

function analyzeEffort(questionResults, timePerQuestion) {
  if (!timePerQuestion || timePerQuestion.length === 0) return { avgTime: 0, focusLevel: 'غير محدد', insight: 'لم يسجل الوقت.' };
  const avgTime = timePerQuestion.reduce((a,b) => a+b, 0) / timePerQuestion.length;
  let focusLevel = 'مرتفع'; if (avgTime > 25) focusLevel = 'منخفض'; else if (avgTime < 8) focusLevel = 'سريع جداً';
  return { avgTime: Math.round(avgTime), focusLevel };
}

function analyzeWeaknesses(topicAnalysis, questionResults) {
  const weaknesses = [];
  for (const [topic, data] of Object.entries(topicAnalysis)) {
    if (data.level === 'ضعيف') {
      const wrongQs = questionResults.filter(q => q.topic === topic && !q.isCorrect);
      const dominant = getMostCommon(wrongQs.map(q => q.cognitiveLevel));
      let reason = '', solution = '';
      if (dominant === 'remembering') { reason = 'صعوبة في تذكر المعلومات.'; solution = 'بطاقات تعليمية.'; }
      else if (dominant === 'applying') { reason = 'صعوبة في التطبيق.'; solution = 'تمارين تطبيقية.'; }
      else { reason = 'تحتاج مراجعة المفاهيم.'; solution = 'راجع الأساسيات.'; }
      weaknesses.push({ topic, percentage: data.percentage, reason, solution, priority: data.percentage < 40 ? 'عالية' : 'متوسطة' });
    }
  }
  return weaknesses.sort((a,b) => a.percentage - b.percentage);
}

function analyzeHiddenStrengthsDeep(questions, numericAnswers, rawAnswers, timePerQuestion) {
  const hiddenStrengths = [];
  const hardQs = questions.filter(q => q.difficulty === 3);
  const hardCorrect = hardQs.filter(q => { const idx = questions.indexOf(q); return q.isWriting ? (rawAnswers[idx]||'').trim().toLowerCase() === (q.expectedAnswer||'').trim().toLowerCase() : numericAnswers[idx] === q.correct; }).length;
  if (hardQs.length >= 3 && hardCorrect/hardQs.length >= 0.7) hiddenStrengths.push({ title: '🧠 إتقان الأسئلة الصعبة', description: 'تفوقت في الأسئلة المعقدة.', percentage: Math.round(hardCorrect/hardQs.length*100), icon: '🌟', discovery: 'أداء قوي في الأسئلة الصعبة', insight: 'لديك قدرة تحليلية عالية', evidence: `${hardCorrect}/${hardQs.length} أسئلة` });
  if (hiddenStrengths.length === 0) hiddenStrengths.push({ title: '💪 إمكانيات واعدة', description: 'لديك أساس جيد للبناء عليه.', percentage: 50, icon: '🌱', discovery: 'بداية موفقة', insight: 'مع التدريب ستصل لمستويات أعلى', evidence: 'استمر في التعلم' });
  return hiddenStrengths;
}

function generateCognitiveProfile(qr, timePerQuestion) {
  if (!qr || qr.length === 0) return { learningStyle: 'متوازن', styleDescription: 'لديك توازن بين السرعة والدقة.', confidenceLevel: 50 };
  const avg = timePerQuestion?.length ? timePerQuestion.reduce((a,b)=>a+b,0)/timePerQuestion.length : null;
  const correct = qr.filter(q=>q.isCorrect).length;
  const total = qr.length||1;
  let style = 'متوازن', desc = 'لديك توازن بين السرعة والدقة.';
  if (avg && avg<8 && correct/total>0.6) { style = 'حدسي سريع'; desc = 'تعتمد على البديهة.'; }
  else if (avg && avg>15 && correct/total>0.7) { style = 'تحليلي متعمق'; desc = 'تفكر بعمق وتدقق.'; }
  return { learningStyle: style, styleDescription: desc, confidenceLevel: Math.round(correct/total*100) };
}

function generateComparison(score) {
  const distribution = [5, 10, 15, 20, 20, 15, 10, 5];
  let cumulative = 0, percentile = 50;
  const bracket = Math.min(7, Math.floor(score / 12.5));
  for (let i = 0; i <= bracket; i++) cumulative += distribution[i];
  percentile = Math.round(cumulative);
  return { averageScore: 65, percentile, rank: percentile >= 80 ? 'أعلى 20%' : percentile >= 60 ? 'أعلى 40%' : 'المتوسط', totalStudents: 1234, insight: percentile >= 80 ? 'أنت من أفضل الطلاب!' : 'استمر في التعلم.' };
}

function generatePersonalizedPlan(weaknesses, learningProfile, score) {
  const top = weaknesses[0];
  return { days: [], summary: `ركز على ${top?.topic || 'الأساسيات'}.`, targetScore: Math.min(95, score+15) };
}

function generateLearningStages(assessmentId, topicAnalysis, subSkillAnalysis) {
  const stages = LEARNING_STAGES[assessmentId] || LEARNING_STAGES['concepts'];
  return stages.map(stage => {
    let percentage = 0;
    if (topicAnalysis && topicAnalysis[stage.topic]) percentage = topicAnalysis[stage.topic].weightedPercentage || topicAnalysis[stage.topic].percentage || 0;
    if (subSkillAnalysis && percentage === 0) {
      const matchedSkill = Object.entries(subSkillAnalysis).find(([key, data]) => data.skillName?.includes(stage.concept) || stage.concept.includes(data.skillName));
      if (matchedSkill) percentage = matchedSkill[1].percentage || 0;
    }
    return { ...stage, percentage, level: percentage >= 80 ? 'مكتمل' : percentage >= 40 ? 'جزئياً' : 'غير مكتمل' };
  });
}

function generateAllAssessmentsSummary(topicAnalysis) {
  return ALL_ASSESSMENTS.map(assessment => {
    const data = topicAnalysis[assessment.topic];
    const percentage = data ? (data.weightedPercentage || data.percentage || 0) : 0;
    const level = percentage >= 80 ? 'مكتمل' : percentage >= 40 ? 'مكتمل جزئياً' : 'غير مكتمل';
    const color = level === 'مكتمل' ? '#2ECC71' : level === 'مكتمل جزئياً' ? '#F39C12' : '#bdc3c7';
    const statusIcon = level === 'مكتمل' ? '✅' : level === 'مكتمل جزئياً' ? '⚠️' : '❌';
    return { ...assessment, percentage, level, color, statusIcon };
  });
}

function generateFinalInsight(score, simpleScore, weaknesses, hiddenStrengths, learningProfile, comparison, confidenceAnalysis, diagnosticMastery, topicAnalysis, effortAnalysis, questionResults, assessmentType, cognitiveProfile) {
  let insight = '';
  insight += `🎯 نتيجتك: ${score}% (الدرجة الخام: ${simpleScore}%). `;
  if (score >= 80) insight += `أداء ممتاز. تتقن المادة بعمق. `;
  else if (score >= 60) insight += `أداء جيد. أساسك قوي مع وجود فجوات بسيطة. `;
  else if (score >= 40) insight += `أنت في منتصف الطريق. تحتاج إلى تركيز أكبر على الأساسيات. `;
  else insight += `مستوى مبتدئ. لا تقلق، هذه انطلاقة قوية نحو التعلم. `;
  if (comparison.percentile >= 80) insight += `أداؤك يضعك بين أفضل 20% من المتعلمين. `;
  else if (comparison.percentile >= 50) insight += `أنت تؤدي أفضل من نصف المتعلمين. `;
  insight += '\n\n';
  if (cognitiveProfile && effortAnalysis) {
    if (effortAnalysis.avgTime < 8) insight += `⚡ أنت سريع جداً (${effortAnalysis.avgTime} ث). رائع، لكن تمهّل في الأسئلة المركبة. `;
    else if (effortAnalysis.avgTime > 20) insight += `⏳ تأخذ وقتاً طويلاً (${effortAnalysis.avgTime} ث). تحتاج لتسريع الإيقاع للامتحان. `;
    else insight += `⏱️ سرعة إجابتك متوازنة (${effortAnalysis.avgTime} ث). `;
  }
  if (confidenceAnalysis) {
    if (confidenceAnalysis.highConfWrong > 20) insight += `😟 ${confidenceAnalysis.highConfWrong}% من إجاباتك الواثقة خاطئة. لديك مفاهيم خاطئة تحتاج لتصحيح فوري. `;
    if (confidenceAnalysis.lowConfCorrect > 30) insight += `🤔 ${confidenceAnalysis.lowConfCorrect}% من إجاباتك الصحيحة كنت غير واثق بها. ثق بمعرفتك أكثر. `;
  }
  insight += '\n\n';
  if (topicAnalysis && Object.keys(topicAnalysis).length > 0) {
    if (assessmentType === 'topic') {
      const [topic, data] = Object.entries(topicAnalysis)[0];
      const pct = data.weightedPercentage || data.percentage;
      insight += `📌 تركيزك كان على "${topic}". `;
      if (data.level === 'قوي') insight += `نتيجتك ${pct}% تدل على إتقان جيد. ${data.tip} `;
      else if (data.level === 'متوسط') insight += `نتيجتك ${pct}% متوسطة. ${data.tip} `;
      else insight += `نتيجتك ${pct}% تحتاج تطويراً. ${data.tip} `;
    } else if (assessmentType === 'full') {
      const sorted = Object.entries(topicAnalysis).sort((a,b) => (b[1].weightedPercentage||b[1].percentage) - (a[1].weightedPercentage||a[1].percentage));
      const best = sorted[0]; const weakest = sorted[sorted.length-1];
      insight += `🌟 أفضل أداء: ${best[0]} (${best[1].weightedPercentage||best[1].percentage}%). `;
      insight += `⚠️ يحتاج تركيزاً: ${weakest[0]} (${weakest[1].weightedPercentage||weakest[1].percentage}%). `;
    }
  }
  if (weaknesses && weaknesses.length > 0) { const w = weaknesses[0]; insight += `\n💡 خطوتك القادمة: ابدأ بـ "${w.topic}" - ${w.reason}`; }
  else if (assessmentType === 'topic' && topicAnalysis) { const [topic, data] = Object.entries(topicAnalysis)[0]; if (data.level !== 'قوي') insight += `\n💡 ركز أكثر على تمارين "${topic}".`; }
  if (assessmentType !== 'quick') { const predicted = Math.min(98, Math.round(score + (100 - score) * 0.4)); insight += `\n📈 تقدير ذكي: مع مراجعة النظرية والتمارين، يمكنك بلوغ ${predicted}% قريباً. هذا ليس سقفاً، بل توقع متحفظ.`; }
  return insight;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { answers, questions: sentQuestions, assessmentId, timePerQuestion, confidenceLevels, mode } = req.body;
    if (!answers || !Array.isArray(answers)) return res.status(400).json({ error: 'No answers' });
    const questions = sentQuestions?.length > 0 ? sentQuestions : getAllBasicsQuestions();
    if (!questions.length) return res.status(404).json({ error: 'No questions' });

    const numericAnswers = answers.map((a,i) => { const q = questions[i]; if (q?.isWriting) { const num = Number(a); return isNaN(num) ? 1 : (num===1?1:2); } const num = Number(a); return (isNaN(num) || num<1 || num>4) ? 1 : num; });
    const getWeight = (q) => { let w = q.difficulty||1; if (['analyzing','evaluating','creating'].includes(q.cognitiveLevel)) w += 0.5; if (['Subnet_Calculation','Broadcast_Calculation','Network_ID_Determination'].includes(q.subSkill)) w += 0.3; return w; };

    let totalWeight = 0, earnedWeight = 0, correctCount = 0;
    const questionResults = [];
    questions.forEach((q,i) => { const w = getWeight(q); totalWeight += w; let isCorrect = q.isWriting ? (answers[i]||'').toString().trim().toLowerCase() === (q.expectedAnswer||'').trim().toLowerCase() : numericAnswers[i] === q.correct; if (isCorrect) { earnedWeight += w; correctCount++; } questionResults.push({ isCorrect, weight: w, time: timePerQuestion?.[i]||0, confidence: confidenceLevels?.[i]||50, difficulty: q.difficulty||1, topic: q.topic||'عام', cognitiveLevel: q.cognitiveLevel||'remembering', subSkill: q.subSkill||'عام', errorPattern: q.errorPattern||'conceptual' }); });

    const weightedScore = totalWeight>0 ? Math.round((earnedWeight/totalWeight)*100) : 0;
    const simpleScore = questions.length>0 ? Math.round((correctCount/questions.length)*100) : 0;
    const isQuickMode = mode === 'quick';
    let assessmentType = 'topic'; if (assessmentId === 'full' && !isQuickMode) assessmentType = 'full'; else if (isQuickMode) assessmentType = 'quick';

    const topicAnalysis = analyzeTopicsEnhanced(questions, numericAnswers, answers, timePerQuestion, confidenceLevels);
    const subSkillAnalysis = analyzeSubSkills(questions, numericAnswers, answers);
    const learningProfile = analyzeLearningProfile(questions, numericAnswers, answers);
    const errors = analyzeErrors(questions, numericAnswers, answers);
    const weaknesses = analyzeWeaknesses(topicAnalysis, questionResults);
    const hiddenStrengths = analyzeHiddenStrengthsDeep(questions, numericAnswers, answers, timePerQuestion);
    const confidenceAnalysis = analyzeConfidence(questionResults);
    const effortAnalysis = analyzeEffort(questionResults, timePerQuestion);
    const comparison = generateComparison(weightedScore);
    const personalizedPlan = generatePersonalizedPlan(weaknesses, learningProfile, weightedScore);
    const generatedCognitiveProfile = generateCognitiveProfile(questionResults, timePerQuestion);
    const diagnosticMastery = estimateMastery(questions, answers, numericAnswers);
    const rootCauseAnalysis = analyzeRootCauses(weaknesses, topicAnalysis, errors);
    const learningStages = generateLearningStages(assessmentId, topicAnalysis, subSkillAnalysis);
    const allAssessmentsSummary = assessmentType === 'full' ? generateAllAssessmentsSummary(topicAnalysis) : [];

    const writingAnswers = questions.filter(q => q.isWriting).map((q) => { const idx = questions.indexOf(q); return { question: q.question, userAnswer: answers[idx] !== undefined ? String(answers[idx]) : '', expectedAnswer: q.expectedAnswer || '', isCorrect: answers[idx]?.toString().trim().toLowerCase() === q.expectedAnswer?.toLowerCase() }; });
    
    // ===== التحليل الذكي المتقدم (المهارات الفرعية) =====
    const subSkillDeepAnalysis = analyzeSubSkillsDeeply(questions, numericAnswers, answers);
    const surgicalLearningMap = generateSurgicalLearningMap(subSkillDeepAnalysis, topicAnalysis);
    const preciseLessons = generatePreciseLessons(subSkillDeepAnalysis, weaknesses);
    const finalRecommendedLessons = preciseLessons.length > 0 ? preciseLessons : weaknesses.slice(0,3).map(w => ({ 
      topic: w.topic, 
      percentage: w.percentage, 
      reason: w.reason, 
      solution: w.solution, 
      priority: w.priority 
    }));
    
    // ===== التنبؤ بالمستقبل المهني =====
    const careerPrediction = predictCareerPath(subSkillDeepAnalysis, topicAnalysis);
    
    const insight = generateFinalInsight(weightedScore, simpleScore, weaknesses, hiddenStrengths, learningProfile, comparison, confidenceAnalysis, diagnosticMastery, topicAnalysis, effortAnalysis, questionResults, assessmentType, generatedCognitiveProfile);

    return res.status(200).json({
      success: true, mode: mode||'full', isQuickMode, assessmentType,
      score: weightedScore, simpleScore, totalQuestions: questions.length, correctAnswers: correctCount, wrongAnswers: questions.length-correctCount,
      topicAnalysis, subSkillAnalysis: isQuickMode ? null : subSkillAnalysis, learningProfile,
      errors: isQuickMode ? [] : errors, weaknesses: isQuickMode ? [] : weaknesses, hiddenStrengths: isQuickMode ? [] : hiddenStrengths,
      learningStages, allAssessmentsSummary,
      writingAnswers: isQuickMode ? [] : writingAnswers,
      cognitiveProfile: generatedCognitiveProfile,
      recommendedLessons: isQuickMode ? [] : finalRecommendedLessons,
      confidenceAnalysis, effortAnalysis, comparison,
      personalizedPlan: isQuickMode ? null : personalizedPlan,
      diagnosticMastery: isQuickMode ? null : diagnosticMastery,
      rootCauseAnalysis: isQuickMode ? [] : rootCauseAnalysis,
      insight, questionResults,
      subSkillDeepAnalysis: isQuickMode ? null : subSkillDeepAnalysis,
      surgicalLearningMap: isQuickMode ? null : surgicalLearningMap,
      careerPrediction: isQuickMode ? null : careerPrediction,
    });
  } catch (error) { 
    console.error('خطأ:', error); 
    return res.status(500).json({ success: false, error: error.message }); 
  }
}
