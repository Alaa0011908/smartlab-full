// data/questions/basics.js
// ============================================================
// بنك الأسئلة - SmartLab (نسخة هندسة الشبكات)
// عدد الأسئلة: 126 سؤالاً (8 محاور رئيسية)
// ============================================================

export function getAllBasicsQuestions() {
  return QUESTIONS;
}

const TOPIC_TO_CATEGORY = {
  'general-concepts': 'general-concepts',
  'ipv4': 'ipv4',
  'subnetting': 'subnetting',
  'ipv6': 'ipv6',
  'osi-model': 'osi-model',
  'network-devices': 'network-devices',
  'email-protocols': 'email-protocols',
  'tcp-ip': 'tcp-ip',
};

export function getAssessmentQuestions(assessmentId, mode = 'full') {
  let filtered = [];
  if (assessmentId === 'full') {
    filtered = [...QUESTIONS];
  } else {
    filtered = QUESTIONS.filter(q => TOPIC_TO_CATEGORY[q.topic] === assessmentId);
  }
  if (filtered.length === 0) filtered = [...QUESTIONS];
  if (mode === 'quick') {
    const quick = filtered.filter(q => q.isQuick);
    return shuffleArray(quick).slice(0, assessmentId === 'full' ? 20 : 12);
  }
  return filtered.filter(q => !q.isQuick);
}

export function getAssessmentInfo(assessmentId) {
  const info = {
    'general-concepts': { name: 'المفاهيم العامة للشبكات', icon: '📡', description: 'أساسيات الشبكات، أنواع الشبكات، نماذج الشبكات', topics: ['تعريف الشبكات', 'أنواع الشبكات', 'VPN', 'P2P', 'Client-Server'] },
    'ipv4': { name: 'IPv4', icon: '🌐', description: 'عناوين IPv4، الفئات، الأقنعة، NAT', topics: ['بنية IPv4', 'الفئات', 'العناوين الخاصة', 'Subnet Mask', 'NAT'] },
    'subnetting': { name: 'Subnetting', icon: '🔢', description: 'تقسيم الشبكات، CIDR، VLSM', topics: ['Subnetting', 'CIDR', 'VLSM', 'حساب الشبكات', 'Wildcard Mask'] },
    'ipv6': { name: 'IPv6', icon: '🌍', description: 'عناوين IPv6، الأنواع، الانتقال', topics: ['بنية IPv6', 'أنواع العناوين', 'SLAAC', 'Dual Stack', 'NDP'] },
    'osi-model': { name: 'نموذج OSI', icon: '📚', description: 'طبقات OSI السبع، البروتوكولات، PDUs', topics: ['الطبقات السبع', 'البروتوكولات', 'PDUs', 'Encapsulation'] },
    'network-devices': { name: 'أجهزة الشبكات', icon: '🔧', description: 'الراوتر، السويتش، Firewall، أجهزة أخرى', topics: ['Router', 'Switch', 'Firewall', 'Access Point', 'VLAN'] },
    'email-protocols': { name: 'بروتوكولات البريد الإلكتروني', icon: '📧', description: 'SMTP, POP3, IMAP, التشفير', topics: ['SMTP', 'POP3', 'IMAP', 'SMTPS', 'IMAPS'] },
    'tcp-ip': { name: 'TCP/IP', icon: '🔗', description: 'نموذج TCP/IP، البروتوكولات، المنافذ', topics: ['TCP', 'UDP', 'Three-Way Handshake', 'Ports', 'DHCP'] },
    'full': { name: 'التقييم الشامل', icon: '🏆', description: 'جميع المحاور', topics: ['المفاهيم العامة', 'IPv4', 'Subnetting', 'IPv6', 'OSI', 'أجهزة الشبكات', 'البريد', 'TCP/IP'] },
  };
  return info[assessmentId] || { name: 'التقييم الشامل', icon: '📝', description: '', topics: [] };
}

export function getAssessmentName(assessmentId) {
  return getAssessmentInfo(assessmentId).name;
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const QUESTIONS = [
  {
    "id": "gc_001",
    "question": "ما هو تعريف الشبكة (Network)؟",
    "options": [
      "مجموعة من الأجهزة المتصلة ببعضها البعض لتبادل البيانات والموارد",
      "جهاز واحد يقوم بمعالجة البيانات",
      "برنامج يستخدم للاتصال بالإنترنت",
      "نظام تشغيل خاص بالخوادم"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو تعريف الشبكة (Network)؟",
    "irt": {
      "a": 1.0204530001678327,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_002",
    "question": "أي من التالي يعتبر نوعاً من أنواع الشبكات حسب المساحة الجغرافية؟",
    "options": [
      "LAN",
      "VPN",
      "P2P",
      "Client-Server"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: أي من التالي يعتبر نوعاً من أنواع الشبكات حسب المساحة الجغرافية؟",
    "irt": {
      "a": 1.213229161831494,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_003",
    "question": "ما هو النموذج الذي يعتمد على خادم مركزي يقدم الخدمات للأجهزة الأخرى؟",
    "options": [
      "Peer-to-Peer (P2P)",
      "Client-Server",
      "VPN",
      "Mesh"
    ],
    "correct": 1,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو النموذج الذي يعتمد على خادم مركزي يقدم الخدمات للأجهزة الأخرى؟",
    "irt": {
      "a": 1.1338587822471788,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_004",
    "question": "ما هي الشبكة التي تغطي مدينة كاملة؟",
    "options": [
      "LAN",
      "MAN",
      "WAN",
      "PAN"
    ],
    "correct": 1,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هي الشبكة التي تغطي مدينة كاملة؟",
    "irt": {
      "a": 1.2277241953113958,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_005",
    "question": "أي من التالي يمثل شبكة مخصصة (VPN)؟",
    "options": [
      "شبكة داخلية في شركة",
      "شبكة آمنة تعمل عبر الإنترنت",
      "شبكة لاسلكية في منزل",
      "شبكة بين حاسوبين فقط"
    ],
    "correct": 1,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: أي من التالي يمثل شبكة مخصصة (VPN)؟",
    "irt": {
      "a": 1.0847240794662192,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_006",
    "question": "في نموذج P2P، كيف تتعامل الأجهزة مع بعضها؟",
    "options": [
      "يوجد خادم مركزي",
      "جميع الأجهزة متساوية وتشارك الموارد",
      "جهاز واحد يتحكم بالباقي",
      "لا يمكن مشاركة الموارد"
    ],
    "correct": 1,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: في نموذج P2P، كيف تتعامل الأجهزة مع بعضها؟",
    "irt": {
      "a": 1.2228109671145813,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_007",
    "question": "ما هي الشبكة التي تغطي مساحة كبيرة مثل دول أو قارات؟",
    "options": [
      "LAN",
      "MAN",
      "WAN",
      "PAN"
    ],
    "correct": 2,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هي الشبكة التي تغطي مساحة كبيرة مثل دول أو قارات؟",
    "irt": {
      "a": 1.0639157445501546,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_008",
    "question": "أي من التالي يعتبر من مزايا شبكات Client-Server؟",
    "options": [
      "سهولة الإدارة المركزية",
      "لا يحتاج خادم",
      "جميع الأجهزة متساوية",
      "تنفيذ بسيط"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: أي من التالي يعتبر من مزايا شبكات Client-Server؟",
    "irt": {
      "a": 1.0333484619204822,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_009",
    "question": "ما هو الفرق الرئيسي بين شبكات LAN و WAN من حيث سرعة النقل؟",
    "options": [
      "LAN أسرع من WAN",
      "WAN أسرع من LAN",
      "السرعة متساوية",
      "لا يمكن المقارنة"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو الفرق الرئيسي بين شبكات LAN و WAN من حيث سرعة النقل؟",
    "irt": {
      "a": 1.084589697814311,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_010",
    "question": "أي من التالي يمثل استخداماً مناسباً لشبكة VPN؟",
    "options": [
      "مشاركة الملفات في مكتب صغير",
      "الاتصال الآمن بشركة من المنزل",
      "إنشاء شبكة داخلية في مدرسة",
      "توصيل طابعة بحاسوب"
    ],
    "correct": 1,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: أي من التالي يمثل استخداماً مناسباً لشبكة VPN؟",
    "irt": {
      "a": 1.1222940409557816,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_011",
    "question": "ما هو عدد الأجهزة الذي يمكن أن تعمل في شبكة P2P بشكل فعال؟",
    "options": [
      "عدد غير محدود",
      "من 2 إلى 10 أجهزة تقريباً",
      "من 100 إلى 500 جهاز",
      "تعتمد على المساحة فقط"
    ],
    "correct": 1,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو عدد الأجهزة الذي يمكن أن تعمل في شبكة P2P بشكل فعال؟",
    "irt": {
      "a": 1.0648319991987891,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_012",
    "question": "أي من التالي ليس من مكونات الشبكة الأساسية؟",
    "options": [
      "الأجهزة (Hosts)",
      "وسائط النقل (Media)",
      "نظام التشغيل (OS)",
      "البروتوكولات (Protocols)"
    ],
    "correct": 2,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: أي من التالي ليس من مكونات الشبكة الأساسية؟",
    "irt": {
      "a": 1.1820395505570196,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_013",
    "question": "في نموذج Client-Server، ما هو الجهاز الذي يطلب الخدمات؟",
    "options": [
      "Server",
      "Client",
      "Router",
      "Switch"
    ],
    "correct": 1,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: في نموذج Client-Server، ما هو الجهاز الذي يطلب الخدمات؟",
    "irt": {
      "a": 1.0283072365635992,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_014",
    "question": "ما هو الفرق بين شبكة LAN والشبكة اللاسلكية WLAN؟",
    "options": [
      "LAN سلكية و WLAN لاسلكية",
      "LAN لاسلكية و WLAN سلكية",
      "لا فرق بينهما",
      "WLAN تغطي مساحة أكبر"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو الفرق بين شبكة LAN والشبكة اللاسلكية WLAN؟",
    "irt": {
      "a": 1.0945807275976172,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_015",
    "question": "أي من التالي يعتبر مثالاً على شبكة WAN؟",
    "options": [
      "شبكة في مبنى شركة",
      "الإنترنت",
      "شبكة في مدرسة",
      "شبكة في منزل"
    ],
    "correct": 1,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: أي من التالي يعتبر مثالاً على شبكة WAN؟",
    "irt": {
      "a": 1.2333345017705857,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_016",
    "question": "ما هي التقنية المستخدمة لإنشاء VPN آمنة؟",
    "options": [
      "HTTP",
      "FTP",
      "IPsec",
      "DHCP"
    ],
    "correct": 2,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هي التقنية المستخدمة لإنشاء VPN آمنة؟",
    "irt": {
      "a": 1.000955352486124,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_017",
    "question": "في نموذج Client-Server، ما هو عيب الاعتماد على خادم مركزي؟",
    "options": [
      "تكلفة عالية",
      "نقطة فشل وحيدة (Single Point of Failure)",
      "صعوبة في الإدارة",
      "بطء في الأداء دائماً"
    ],
    "correct": 1,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: في نموذج Client-Server، ما هو عيب الاعتماد على خادم مركزي؟",
    "irt": {
      "a": 1.0336917587158163,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_018",
    "question": "ما هو نوع الشبكة الذي يستخدمه نظام التورنت (BitTorrent)؟",
    "options": [
      "Client-Server",
      "P2P",
      "VPN",
      "Hybrid"
    ],
    "correct": 1,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هو نوع الشبكة الذي يستخدمه نظام التورنت (BitTorrent)؟",
    "irt": {
      "a": 1.17375813243051,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_019",
    "question": "أي من التالي يمثل الفرق الرئيسي بين VPN و VLAN؟",
    "options": [
      "VPN مخصصة و VLAN آمنة",
      "VPN تعمل عبر الإنترنت و VLAN داخل شبكة محلية",
      "VPN للصوت و VLAN للبيانات",
      "لا فرق بينهما"
    ],
    "correct": 1,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: أي من التالي يمثل الفرق الرئيسي بين VPN و VLAN؟",
    "irt": {
      "a": 1.2202093673079488,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_020",
    "question": "ما هو عدد طبقات نموذج OSI مقارنة بنموذج TCP/IP؟",
    "options": [
      "OSI 7 طبقات، TCP/IP 4 طبقات",
      "OSI 4 طبقات، TCP/IP 7 طبقات",
      "كلاهما 7 طبقات",
      "كلاهما 4 طبقات"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هو عدد طبقات نموذج OSI مقارنة بنموذج TCP/IP؟",
    "irt": {
      "a": 1.1799110190236957,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_021",
    "question": "أي من التالي يعد تحدياً رئيسياً في شبكات WAN؟",
    "options": [
      "سرعة عالية",
      "تأخير (Latency) عالٍ",
      "تكلفة منخفضة",
      "سهولة الصيانة"
    ],
    "correct": 1,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: أي من التالي يعد تحدياً رئيسياً في شبكات WAN؟",
    "irt": {
      "a": 1.1338531487169803,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_022",
    "question": "ما هو البروتوكول المستخدم عادةً في إنشاء VPN؟",
    "options": [
      "PPTP",
      "L2TP",
      "OpenVPN",
      "جميع ما سبق"
    ],
    "correct": 3,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هو البروتوكول المستخدم عادةً في إنشاء VPN؟",
    "irt": {
      "a": 1.0134480909600068,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_023",
    "question": "في شبكة Hybrid، ما هو المزيج المستخدم؟",
    "options": [
      "سلكي ولاسلكي",
      "P2P و Client-Server",
      "LAN و WAN",
      "VPN و VLAN"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: في شبكة Hybrid، ما هو المزيج المستخدم؟",
    "irt": {
      "a": 1.061690567885212,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_024",
    "question": "ما هو الفرق بين Intranet و Extranet؟",
    "options": [
      "Intranet داخلية و Extranet خارجية جزئياً",
      "Extranet داخلية و Intranet خارجية",
      "كلاهما داخلي",
      "كلاهما خارجي"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هو الفرق بين Intranet و Extranet؟",
    "irt": {
      "a": 1.0676541456578592,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_025",
    "question": "ما هي تقنية MPLS المستخدمة في؟",
    "options": [
      "شبكات LAN فقط",
      "شبكات WAN عالية الأداء",
      "شبكات P2P",
      "الشبكات اللاسلكية"
    ],
    "correct": 1,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "applying",
    "difficulty": 4,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هي تقنية MPLS المستخدمة في؟",
    "irt": {
      "a": 1.0765707122559716,
      "b": 1.5,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_026",
    "question": "أي من التالي يعتبر من عيوب نموذج P2P؟",
    "options": [
      "تكلفة عالية",
      "صعوبة في الأمن والإدارة",
      "يحتاج خادم قوي",
      "بطء في الشبكات الصغيرة"
    ],
    "correct": 1,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "applying",
    "difficulty": 4,
    "errorPattern": "conceptual",
    "explanation": "شرح: أي من التالي يعتبر من عيوب نموذج P2P؟",
    "irt": {
      "a": 1.095308619605285,
      "b": 1.5,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_027",
    "question": "ما هو الفرق بين شبكة PAN و LAN؟",
    "options": [
      "PAN تغطي مساحة أصغر (شخصية)",
      "LAN تغطي مساحة أصغر",
      "لا فرق بينهما",
      "PAN تغطي مدينة"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "applying",
    "difficulty": 4,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هو الفرق بين شبكة PAN و LAN؟",
    "irt": {
      "a": 1.1292102513259497,
      "b": 1.5,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_028",
    "question": "ما هي الطبقة في نموذج OSI المسؤولة عن تشفير البيانات؟",
    "options": [
      "Physical",
      "Data Link",
      "Presentation",
      "Application"
    ],
    "correct": 2,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "applying",
    "difficulty": 4,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هي الطبقة في نموذج OSI المسؤولة عن تشفير البيانات؟",
    "irt": {
      "a": 1.1528533604192552,
      "b": 1.5,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_029",
    "question": "ما هي تقنية SD-WAN؟",
    "options": [
      "شبكة WAN تقليدية",
      "شبكة WAN معتمدة على البرمجيات",
      "شبكة LAN متطورة",
      "شبكة VPN جديدة"
    ],
    "correct": 1,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "applying",
    "difficulty": 5,
    "errorPattern": "calculation",
    "explanation": "شرح: ما هي تقنية SD-WAN؟",
    "irt": {
      "a": 1.0674958169987165,
      "b": 3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_030",
    "question": "ما هو الفرق بين الشبكة النشطة والشبكة السلبية؟",
    "options": [
      "النشطة تحتوي على مكونات إلكترونية، السلبية لا",
      "النشطة أسرع، السلبية أبطأ",
      "النشطة لاسلكية، السلبية سلكية",
      "لا فرق بينهما"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "applying",
    "difficulty": 5,
    "errorPattern": "calculation",
    "explanation": "شرح: ما هو الفرق بين الشبكة النشطة والشبكة السلبية؟",
    "irt": {
      "a": 1.1429253968416475,
      "b": 3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "gc_q01",
    "question": "ما هو تعريف الشبكة؟",
    "options": [
      "مجموعة أجهزة متصلة لتبادل البيانات",
      "جهاز واحد",
      "برنامج",
      "نظام تشغيل"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو تعريف الشبكة؟",
    "irt": {
      "a": 1.1929502091533788,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "gc_q02",
    "question": "أي من التالي يمثل شبكة محلية؟",
    "options": [
      "LAN",
      "WAN",
      "MAN",
      "VPN"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: أي من التالي يمثل شبكة محلية؟",
    "irt": {
      "a": 1.0753463130130483,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "gc_q03",
    "question": "نموذج Client-Server يعتمد على:",
    "options": [
      "خادم مركزي",
      "أجهزة متساوية",
      "اتصال لاسلكي فقط",
      "شبكة خاصة"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: نموذج Client-Server يعتمد على:",
    "irt": {
      "a": 1.1164224456589684,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "gc_q04",
    "question": "VPN تستخدم لـ:",
    "options": [
      "اتصال آمن عبر الإنترنت",
      "شبكة محلية",
      "شبكة لاسلكية",
      "شبكة P2P"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: VPN تستخدم لـ:",
    "irt": {
      "a": 1.2066224899969964,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "gc_q05",
    "question": "أي شبكة تغطي مدينة كاملة؟",
    "options": [
      "LAN",
      "MAN",
      "WAN",
      "PAN"
    ],
    "correct": 1,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: أي شبكة تغطي مدينة كاملة؟",
    "irt": {
      "a": 1.0896313294013453,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "gc_q06",
    "question": "في P2P، الأجهزة تكون:",
    "options": [
      "متساوية",
      "خادم وعميل",
      "خادم فقط",
      "عميل فقط"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: في P2P، الأجهزة تكون:",
    "irt": {
      "a": 1.121476481229315,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "gc_q07",
    "question": "WAN تغطي مساحة:",
    "options": [
      "كبيرة",
      "صغيرة",
      "شخصية",
      "محلية"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: WAN تغطي مساحة:",
    "irt": {
      "a": 1.079879740624173,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "gc_q08",
    "question": "ميزة Client-Server هي:",
    "options": [
      "إدارة مركزية",
      "لا يحتاج خادم",
      "أجهزة متساوية",
      "تنفيذ بسيط"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: ميزة Client-Server هي:",
    "irt": {
      "a": 1.295233065323409,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "gc_q09",
    "question": "أي شبكة أسرع LAN أم WAN؟",
    "options": [
      "LAN",
      "WAN",
      "متساوية",
      "تعتمد على البروتوكول"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: أي شبكة أسرع LAN أم WAN؟",
    "irt": {
      "a": 1.1879674598056793,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "gc_q10",
    "question": "VPN توفر:",
    "options": [
      "تشفير وأمان",
      "سرعة عالية",
      "اتصال مجاني",
      "شبكة محلية"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: VPN توفر:",
    "irt": {
      "a": 1.1338829337224856,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "gc_q11",
    "question": "P2P مناسب لـ:",
    "options": [
      "شبكات صغيرة",
      "شبكات كبيرة",
      "خوادم مركزية",
      "شبكات WAN"
    ],
    "correct": 0,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: P2P مناسب لـ:",
    "irt": {
      "a": 1.119914795277821,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "gc_q12",
    "question": "أي مما يلي ليس مكوناً أساسياً للشبكة؟",
    "options": [
      "الأجهزة",
      "نظام التشغيل",
      "وسائط النقل",
      "البروتوكولات"
    ],
    "correct": 1,
    "topic": "general-concepts",
    "subSkill": "net_fund",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: أي مما يلي ليس مكوناً أساسياً للشبكة؟",
    "irt": {
      "a": 1.1802924234945267,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "net_fund"
    ],
    "diagnostic": {
      "errorPattern": "misc_net_fund",
      "rootCause": "سبب net_fund",
      "futureImpact": "تأثير net_fund",
      "remediationVideoQuery": "شرح net_fund"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "ipv4_001",
    "question": "ما هي بنية عنوان IPv4؟",
    "options": [
      "4 بايت (32 بت)",
      "6 بايت (48 بت)",
      "8 بايت (64 بت)",
      "16 بايت (128 بت)"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هي بنية عنوان IPv4؟",
    "irt": {
      "a": 1.175983825184022,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_002",
    "question": "كم عدد البتات في عنوان IPv4؟",
    "options": [
      "32 بت",
      "64 بت",
      "128 بت",
      "16 بت"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: كم عدد البتات في عنوان IPv4؟",
    "irt": {
      "a": 1.0859389880617056,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_003",
    "question": "كم عدد الثمانيات (Octets) في عنوان IPv4؟",
    "options": [
      "4",
      "2",
      "8",
      "16"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: كم عدد الثمانيات (Octets) في عنوان IPv4؟",
    "irt": {
      "a": 1.0938785872510741,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_004",
    "question": "أي فئة من فئات IPv4 تبدأ بـ 0 أو 10؟",
    "options": [
      "Class A",
      "Class B",
      "Class C",
      "Class D"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: أي فئة من فئات IPv4 تبدأ بـ 0 أو 10؟",
    "irt": {
      "a": 1.1986934193551255,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_005",
    "question": "أي فئة من فئات IPv4 تبدأ بـ 110؟",
    "options": [
      "Class A",
      "Class B",
      "Class C",
      "Class D"
    ],
    "correct": 2,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: أي فئة من فئات IPv4 تبدأ بـ 110؟",
    "irt": {
      "a": 1.157385033349484,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_006",
    "question": "ما هو نطاق عناوين Class A؟",
    "options": [
      "1.0.0.0 إلى 126.255.255.255",
      "128.0.0.0 إلى 191.255.255.255",
      "192.0.0.0 إلى 223.255.255.255",
      "224.0.0.0 إلى 239.255.255.255"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو نطاق عناوين Class A؟",
    "irt": {
      "a": 1.1288240763612154,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_007",
    "question": "ما هو نطاق عناوين Class B؟",
    "options": [
      "1.0.0.0 إلى 126.255.255.255",
      "128.0.0.0 إلى 191.255.255.255",
      "192.0.0.0 إلى 223.255.255.255",
      "224.0.0.0 إلى 239.255.255.255"
    ],
    "correct": 1,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو نطاق عناوين Class B؟",
    "irt": {
      "a": 1.1587006005660159,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_008",
    "question": "أي فئة محجوزة للبث المتعدد (Multicast)؟",
    "options": [
      "Class A",
      "Class B",
      "Class C",
      "Class D"
    ],
    "correct": 3,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: أي فئة محجوزة للبث المتعدد (Multicast)؟",
    "irt": {
      "a": 1.241717462905851,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_009",
    "question": "أي فئة محجوزة للبحث التجريبي (Experimental)؟",
    "options": [
      "Class A",
      "Class B",
      "Class C",
      "Class E"
    ],
    "correct": 3,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: أي فئة محجوزة للبحث التجريبي (Experimental)؟",
    "irt": {
      "a": 1.0368108273865941,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_010",
    "question": "ما هو عنوان loopback في IPv4؟",
    "options": [
      "127.0.0.1",
      "192.168.1.1",
      "10.0.0.1",
      "224.0.0.1"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو عنوان loopback في IPv4؟",
    "irt": {
      "a": 1.2284583000256737,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_011",
    "question": "ما هو نطاق عناوين APIPA؟",
    "options": [
      "169.254.0.0 إلى 169.254.255.255",
      "10.0.0.0 إلى 10.255.255.255",
      "172.16.0.0 إلى 172.31.255.255",
      "192.168.0.0 إلى 192.168.255.255"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو نطاق عناوين APIPA؟",
    "irt": {
      "a": 1.2894018829938378,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_012",
    "question": "ما هي الفائدة من عنوان loopback؟",
    "options": [
      "اختبار التطبيقات والبروتوكولات محلياً",
      "الاتصال بالإنترنت",
      "توجيه الحزم بين الشبكات",
      "تخصيص عنوان خاص"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هي الفائدة من عنوان loopback؟",
    "irt": {
      "a": 1.0543231047264694,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_013",
    "question": "أي من التالي يعتبر عنواناً خاصاً (Private)؟",
    "options": [
      "10.0.0.1",
      "8.8.8.8",
      "1.1.1.1",
      "127.0.0.1"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: أي من التالي يعتبر عنواناً خاصاً (Private)؟",
    "irt": {
      "a": 1.0520353182384408,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_014",
    "question": "أي من التالي يعتبر عنواناً عاماً (Public)؟",
    "options": [
      "8.8.8.8",
      "192.168.1.1",
      "10.0.0.1",
      "172.16.0.1"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: أي من التالي يعتبر عنواناً عاماً (Public)؟",
    "irt": {
      "a": 1.0528065866606737,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_015",
    "question": "ما هو نطاق عناوين Class C الخاصة؟",
    "options": [
      "192.168.0.0 إلى 192.168.255.255",
      "10.0.0.0 إلى 10.255.255.255",
      "172.16.0.0 إلى 172.31.255.255",
      "169.254.0.0 إلى 169.254.255.255"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو نطاق عناوين Class C الخاصة؟",
    "irt": {
      "a": 1.110450662555126,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_016",
    "question": "ما هو نطاق عناوين Class A الخاصة؟",
    "options": [
      "10.0.0.0 إلى 10.255.255.255",
      "172.16.0.0 إلى 172.31.255.255",
      "192.168.0.0 إلى 192.168.255.255",
      "169.254.0.0 إلى 169.254.255.255"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو نطاق عناوين Class A الخاصة؟",
    "irt": {
      "a": 1.092401608487965,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_017",
    "question": "ما هو نطاق عناوين Class B الخاصة؟",
    "options": [
      "172.16.0.0 إلى 172.31.255.255",
      "10.0.0.0 إلى 10.255.255.255",
      "192.168.0.0 إلى 192.168.255.255",
      "169.254.0.0 إلى 169.254.255.255"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو نطاق عناوين Class B الخاصة؟",
    "irt": {
      "a": 1.1115896336210598,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_018",
    "question": "ما هو الغرض من NAT (Network Address Translation)؟",
    "options": [
      "تحويل عناوين خاصة إلى عامة للوصول للإنترنت",
      "تشفير البيانات",
      "توجيه الحزم بين الشبكات",
      "تخصيص العناوين تلقائياً"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هو الغرض من NAT (Network Address Translation)؟",
    "irt": {
      "a": 1.2988929963109253,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_019",
    "question": "ما هو الجهاز الذي يقوم عادةً بتنفيذ NAT؟",
    "options": [
      "Router",
      "Switch",
      "Hub",
      "Firewall"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هو الجهاز الذي يقوم عادةً بتنفيذ NAT؟",
    "irt": {
      "a": 1.1844821300393429,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_020",
    "question": "ما هو Default Gateway؟",
    "options": [
      "عنوان IP للراوتر الذي يتصل به الجهاز",
      "عنوان IP للخادم",
      "عنوان loopback",
      "عنوان البث"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو Default Gateway؟",
    "irt": {
      "a": 1.2063623245540933,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_021",
    "question": "ما هو عنوان Broadcast في شبكة؟",
    "options": [
      "يصل إلى جميع الأجهزة في الشبكة",
      "يصل إلى راوتر واحد فقط",
      "يصل إلى خادم واحد",
      "يصل إلى العميل فقط"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو عنوان Broadcast في شبكة؟",
    "irt": {
      "a": 1.034545857467243,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_022",
    "question": "ما هو عنوان الشبكة (Network Address)؟",
    "options": [
      "أول عنوان في الشبكة لا يمكن استخدامه",
      "آخر عنوان في الشبكة",
      "عنوان الراوتر",
      "عنوان البث"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو عنوان الشبكة (Network Address)؟",
    "irt": {
      "a": 1.2592858351961755,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_023",
    "question": "ما هو عنوان أول جهاز قابل للاستخدام في الشبكة؟",
    "options": [
      "أول عنوان بعد عنوان الشبكة",
      "عنوان الشبكة نفسه",
      "عنوان البث",
      "عنوان الراوتر"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو عنوان أول جهاز قابل للاستخدام في الشبكة؟",
    "irt": {
      "a": 1.0658084987198755,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_024",
    "question": "كم عدد العناوين القابلة للاستخدام في شبكة /24؟",
    "options": [
      "254",
      "255",
      "256",
      "253"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: كم عدد العناوين القابلة للاستخدام في شبكة /24؟",
    "irt": {
      "a": 1.2383026485585011,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_025",
    "question": "ما هي قناع الشبكة الافتراضية لـ Class A؟",
    "options": [
      "255.0.0.0",
      "255.255.0.0",
      "255.255.255.0",
      "255.255.255.255"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هي قناع الشبكة الافتراضية لـ Class A؟",
    "irt": {
      "a": 1.0909218339563787,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_026",
    "question": "ما هي قناع الشبكة الافتراضية لـ Class B؟",
    "options": [
      "255.0.0.0",
      "255.255.0.0",
      "255.255.255.0",
      "255.255.255.255"
    ],
    "correct": 1,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هي قناع الشبكة الافتراضية لـ Class B؟",
    "irt": {
      "a": 1.106914026751384,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_027",
    "question": "ما هي قناع الشبكة الافتراضية لـ Class C؟",
    "options": [
      "255.0.0.0",
      "255.255.0.0",
      "255.255.255.0",
      "255.255.255.255"
    ],
    "correct": 2,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هي قناع الشبكة الافتراضية لـ Class C؟",
    "irt": {
      "a": 1.2524606617767404,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_028",
    "question": "ماذا يعني وجود 1 في قناع الشبكة؟",
    "options": [
      "جزء من عنوان الشبكة",
      "جزء من عنوان المضيف",
      "جزء محجوز",
      "لا معنى"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: ماذا يعني وجود 1 في قناع الشبكة؟",
    "irt": {
      "a": 1.1069526138342713,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_029",
    "question": "ماذا يعني وجود 0 في قناع الشبكة؟",
    "options": [
      "جزء من عنوان المضيف",
      "جزء من عنوان الشبكة",
      "جزء محجوز",
      "لا معنى"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: ماذا يعني وجود 0 في قناع الشبكة؟",
    "irt": {
      "a": 1.2658689773117393,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_030",
    "question": "ما هو الفرق بين عنوان خاص وعام؟",
    "options": [
      "الخاص للاستخدام الداخلي والعام للإنترنت",
      "لا فرق",
      "العام أسرع",
      "الخاص أكثر أماناً"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "applying",
    "difficulty": 4,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هو الفرق بين عنوان خاص وعام؟",
    "irt": {
      "a": 1.1468396700224162,
      "b": 1.5,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "ipv4_q01",
    "question": "كم بت في عنوان IPv4؟",
    "options": [
      "32",
      "64",
      "128",
      "16"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: كم بت في عنوان IPv4؟",
    "irt": {
      "a": 1.0662987584719554,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "ipv4_q02",
    "question": "كم ثمانية (Octet) في IPv4؟",
    "options": [
      "4",
      "2",
      "8",
      "16"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: كم ثمانية (Octet) في IPv4؟",
    "irt": {
      "a": 1.1822730494194096,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "ipv4_q03",
    "question": "أي فئة تبدأ بـ 10؟",
    "options": [
      "Class A",
      "Class B",
      "Class C",
      "Class D"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: أي فئة تبدأ بـ 10؟",
    "irt": {
      "a": 1.0787992909750839,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "ipv4_q04",
    "question": "عنوان loopback هو:",
    "options": [
      "127.0.0.1",
      "192.168.1.1",
      "10.0.0.1",
      "8.8.8.8"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: عنوان loopback هو:",
    "irt": {
      "a": 1.2250129853433904,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "ipv4_q05",
    "question": "نطاق APIPA هو:",
    "options": [
      "169.254.x.x",
      "10.x.x.x",
      "172.16.x.x",
      "192.168.x.x"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: نطاق APIPA هو:",
    "irt": {
      "a": 1.0962123686192384,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "ipv4_q06",
    "question": "NAT يحول عناوين:",
    "options": [
      "خاصة إلى عامة",
      "عامة إلى خاصة",
      "محلية إلى loopback",
      "خاصة إلى loopback"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: NAT يحول عناوين:",
    "irt": {
      "a": 1.2851274507115624,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "ipv4_q07",
    "question": "Default Gateway هو:",
    "options": [
      "عنوان الراوتر",
      "عنوان الخادم",
      "عنوان البث",
      "عنوان الشبكة"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: Default Gateway هو:",
    "irt": {
      "a": 1.2262066856469542,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "ipv4_q08",
    "question": "قناع Class C الافتراضية:",
    "options": [
      "255.255.255.0",
      "255.255.0.0",
      "255.0.0.0",
      "255.255.255.255"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: قناع Class C الافتراضية:",
    "irt": {
      "a": 1.1254016881751645,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "ipv4_q09",
    "question": "عدد العناوين القابلة للاستخدام في /24:",
    "options": [
      "254",
      "255",
      "256",
      "253"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: عدد العناوين القابلة للاستخدام في /24:",
    "irt": {
      "a": 1.216955807500443,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "ipv4_q10",
    "question": "Class D مخصصة لـ:",
    "options": [
      "Multicast",
      "Experimental",
      "Private",
      "Public"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: Class D مخصصة لـ:",
    "irt": {
      "a": 1.1975123099987357,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "ipv4_q11",
    "question": "Class E مخصصة لـ:",
    "options": [
      "Experimental",
      "Multicast",
      "Private",
      "Public"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: Class E مخصصة لـ:",
    "irt": {
      "a": 1.0726870484209197,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "ipv4_q12",
    "question": "عنوان broadcast يصل إلى:",
    "options": [
      "جميع الأجهزة",
      "الراوتر فقط",
      "الخادم فقط",
      "جهاز واحد"
    ],
    "correct": 0,
    "topic": "ipv4",
    "subSkill": "ipv4_addr",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: عنوان broadcast يصل إلى:",
    "irt": {
      "a": 1.0677746183255494,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "ipv4_addr"
    ],
    "diagnostic": {
      "errorPattern": "misc_ipv4_addr",
      "rootCause": "سبب ipv4_addr",
      "futureImpact": "تأثير ipv4_addr",
      "remediationVideoQuery": "شرح ipv4_addr"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "sub_001",
    "question": "ما هو CIDR (Classless Inter-Domain Routing)؟",
    "options": [
      "طريقة تمثيل القناع باستخدام عدد البتات بعد /",
      "نوع من أنواع عناوين IP",
      "بروتوكول لتوجيه الحزم",
      "نظام لتخصيص العناوين تلقائياً"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو CIDR (Classless Inter-Domain Routing)؟",
    "irt": {
      "a": 1.1958177314311733,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_002",
    "question": "ماذا يعني /24 في CIDR؟",
    "options": [
      "24 بت لشبكة و 8 بت لمضيفين",
      "24 بت لمضيفين و 8 بت لشبكة",
      "32 بت كلها للشبكة",
      "32 بت كلها للمضيفين"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: ماذا يعني /24 في CIDR؟",
    "irt": {
      "a": 1.0737622723317857,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_003",
    "question": "كم عدد المضيفين الممكنين في شبكة /24؟",
    "options": [
      "254",
      "255",
      "256",
      "253"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: كم عدد المضيفين الممكنين في شبكة /24؟",
    "irt": {
      "a": 1.2022845938976756,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_004",
    "question": "كم عدد المضيفين الممكنين في شبكة /25؟",
    "options": [
      "126",
      "127",
      "128",
      "125"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: كم عدد المضيفين الممكنين في شبكة /25؟",
    "irt": {
      "a": 1.2617205608485975,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_005",
    "question": "كم عدد المضيفين الممكنين في شبكة /26؟",
    "options": [
      "62",
      "63",
      "64",
      "61"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: كم عدد المضيفين الممكنين في شبكة /26؟",
    "irt": {
      "a": 1.073859964610231,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_006",
    "question": "كم عدد المضيفين الممكنين في شبكة /30؟",
    "options": [
      "2",
      "4",
      "1",
      "3"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: كم عدد المضيفين الممكنين في شبكة /30؟",
    "irt": {
      "a": 1.1577565336788984,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_007",
    "question": "كم عدد العناوين الكلية في شبكة /24؟",
    "options": [
      "256",
      "254",
      "255",
      "253"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: كم عدد العناوين الكلية في شبكة /24؟",
    "irt": {
      "a": 1.1421470553843318,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_008",
    "question": "ما هي Wildcard Mask للقناع 255.255.255.0؟",
    "options": [
      "0.0.0.255",
      "255.255.255.0",
      "0.0.255.255",
      "255.255.0.0"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هي Wildcard Mask للقناع 255.255.255.0؟",
    "irt": {
      "a": 1.2546698147214748,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_009",
    "question": "كيف نحسب Wildcard Mask من القناع؟",
    "options": [
      "نعكس البتات (255 - القناع)",
      "نضيف 1 لكل بت",
      "نضرب القناع في 256",
      "نقسم القناع على 255"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: كيف نحسب Wildcard Mask من القناع؟",
    "irt": {
      "a": 1.2108261017101494,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_010",
    "question": "ما هو عنوان الشبكة (Network Address) لعنوان 192.168.1.10/24؟",
    "options": [
      "192.168.1.0",
      "192.168.1.1",
      "192.168.1.255",
      "192.168.0.0"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو عنوان الشبكة (Network Address) لعنوان 192.168.1.10/24؟",
    "irt": {
      "a": 1.1449892067900846,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_011",
    "question": "ما هو عنوان Broadcast لعنوان 192.168.1.10/24؟",
    "options": [
      "192.168.1.255",
      "192.168.1.0",
      "192.168.2.255",
      "192.168.0.255"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو عنوان Broadcast لعنوان 192.168.1.10/24؟",
    "irt": {
      "a": 1.0518632969057449,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_012",
    "question": "كم عدد الأجزاء الفرعية (Subnets) الممكنة من /24 باستخدام /26؟",
    "options": [
      "4",
      "2",
      "8",
      "16"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: كم عدد الأجزاء الفرعية (Subnets) الممكنة من /24 باستخدام /26؟",
    "irt": {
      "a": 1.2409064866250499,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_013",
    "question": "ما هو VLSM (Variable Length Subnet Mask)؟",
    "options": [
      "استخدام أقنعة فرعية مختلفة الأحجام في الشبكة",
      "قناع ثابت لجميع الأجزاء",
      "طريقة لحساب العناوين الخاصة",
      "بروتوكول لتوجيه الحزم"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو VLSM (Variable Length Subnet Mask)؟",
    "irt": {
      "a": 1.1264077737067848,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_014",
    "question": "ما هو FLSM (Fixed Length Subnet Mask)؟",
    "options": [
      "استخدام قناع واحد لجميع الأجزاء",
      "استخدام أقنعة مختلفة",
      "طريقة لحساب المضيفين",
      "بروتوكول لحساب الشبكات"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو FLSM (Fixed Length Subnet Mask)؟",
    "irt": {
      "a": 1.1792864767869304,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_015",
    "question": "لماذا نستخدم VLSM بدلاً من FLSM؟",
    "options": [
      "لتوفير عناوين IP بشكل أكثر كفاءة",
      "لأنه أسهل",
      "لأنه أسرع",
      "لأنه أكثر أماناً"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: لماذا نستخدم VLSM بدلاً من FLSM؟",
    "irt": {
      "a": 1.2318097429708856,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_016",
    "question": "ما هو Supernetting؟",
    "options": [
      "تجميع شبكات متعددة في شبكة واحدة أكبر",
      "تقسيم شبكة إلى شبكات أصغر",
      "حذف شبكات غير مستخدمة",
      "دمج عناوين IP"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هو Supernetting؟",
    "irt": {
      "a": 1.0645535617353583,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_017",
    "question": "ما هو الفرق بين Subnetting و Supernetting؟",
    "options": [
      "Subnetting يقسم شبكة كبيرة، Supernetting يجمع شبكات صغيرة",
      "لا فرق",
      "Supernetting يقسم و Subnetting يجمع",
      "كلاهما يقسم الشبكات"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هو الفرق بين Subnetting و Supernetting؟",
    "irt": {
      "a": 1.1029374830030674,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_018",
    "question": "كم بت نستعير من المضيفين لإنشاء 8 أجزاء فرعية؟",
    "options": [
      "3",
      "2",
      "4",
      "1"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: كم بت نستعير من المضيفين لإنشاء 8 أجزاء فرعية؟",
    "irt": {
      "a": 1.04511244093096,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_019",
    "question": "كم بت نستعير من المضيفين لإنشاء 16 جزء فرعي؟",
    "options": [
      "4",
      "3",
      "2",
      "5"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: كم بت نستعير من المضيفين لإنشاء 16 جزء فرعي؟",
    "irt": {
      "a": 1.0536166558617786,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_020",
    "question": "كم بت نستعير من المضيفين لإنشاء 32 جزء فرعي؟",
    "options": [
      "5",
      "4",
      "3",
      "6"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: كم بت نستعير من المضيفين لإنشاء 32 جزء فرعي؟",
    "irt": {
      "a": 1.1287558460208413,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_021",
    "question": "كم بت نستعير من المضيفين لإنشاء 64 جزء فرعي؟",
    "options": [
      "6",
      "5",
      "4",
      "7"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: كم بت نستعير من المضيفين لإنشاء 64 جزء فرعي؟",
    "irt": {
      "a": 1.1266212286533606,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_022",
    "question": "ما هو أول عنوان قابل للاستخدام في شبكة فرعية؟",
    "options": [
      "أول عنوان بعد عنوان الشبكة",
      "عنوان الشبكة",
      "عنوان البث",
      "عنوان الراوتر"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو أول عنوان قابل للاستخدام في شبكة فرعية؟",
    "irt": {
      "a": 1.0731618731851174,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_023",
    "question": "ما هو آخر عنوان قابل للاستخدام في شبكة فرعية؟",
    "options": [
      "عنوان البث",
      "عنوان الشبكة",
      "أول عنوان",
      "عنوان الراوتر"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 2,
    "errorPattern": "memorization",
    "explanation": "شرح: ما هو آخر عنوان قابل للاستخدام في شبكة فرعية؟",
    "irt": {
      "a": 1.217899689204775,
      "b": -1.5,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_024",
    "question": "كم عدد المضيفين الممكنين في شبكة /23؟",
    "options": [
      "510",
      "512",
      "511",
      "509"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: كم عدد المضيفين الممكنين في شبكة /23؟",
    "irt": {
      "a": 1.1455377691919717,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_025",
    "question": "كم عدد المضيفين الممكنين في شبكة /22؟",
    "options": [
      "1022",
      "1024",
      "1023",
      "1021"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: كم عدد المضيفين الممكنين في شبكة /22؟",
    "irt": {
      "a": 1.2159014639432928,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_026",
    "question": "كم عدد المضيفين الممكنين في شبكة /21؟",
    "options": [
      "2046",
      "2048",
      "2047",
      "2045"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: كم عدد المضيفين الممكنين في شبكة /21؟",
    "irt": {
      "a": 1.0970757814391818,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_027",
    "question": "ما هو CIDR لقناع 255.255.254.0؟",
    "options": [
      "/23",
      "/24",
      "/22",
      "/25"
    ],
    "correct": 2,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هو CIDR لقناع 255.255.254.0؟",
    "irt": {
      "a": 1.0413407369066998,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_028",
    "question": "ما هو CIDR لقناع 255.255.252.0؟",
    "options": [
      "/22",
      "/21",
      "/23",
      "/24"
    ],
    "correct": 2,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هو CIDR لقناع 255.255.252.0؟",
    "irt": {
      "a": 1.1095159950987696,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_029",
    "question": "ما هو CIDR لقناع 255.255.248.0؟",
    "options": [
      "/21",
      "/20",
      "/22",
      "/23"
    ],
    "correct": 2,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "understanding",
    "difficulty": 3,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هو CIDR لقناع 255.255.248.0؟",
    "irt": {
      "a": 1.056551670066434,
      "b": 0,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_030",
    "question": "ما هو CIDR لقناع 255.255.240.0؟",
    "options": [
      "/20",
      "/19",
      "/21",
      "/22"
    ],
    "correct": 2,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "applying",
    "difficulty": 4,
    "errorPattern": "conceptual",
    "explanation": "شرح: ما هو CIDR لقناع 255.255.240.0؟",
    "irt": {
      "a": 1.1244223843002452,
      "b": 1.5,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": false
  },
  {
    "id": "sub_q01",
    "question": "CIDR يعني:",
    "options": [
      "Classless Inter-Domain Routing",
      "Class ID Routing",
      "CID Router",
      "Computer ID Routing"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: CIDR يعني:",
    "irt": {
      "a": 1.1776931215725543,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "sub_q02",
    "question": "/24 يعني:",
    "options": [
      "24 بت شبكة و 8 مضيف",
      "24 مضيف و 8 شبكة",
      "32 شبكة",
      "32 مضيف"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: /24 يعني:",
    "irt": {
      "a": 1.2451613846318463,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "sub_q03",
    "question": "عدد المضيفين في /24:",
    "options": [
      "254",
      "255",
      "256",
      "253"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: عدد المضيفين في /24:",
    "irt": {
      "a": 1.0584957051319683,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "sub_q04",
    "question": "عدد المضيفين في /25:",
    "options": [
      "126",
      "127",
      "128",
      "125"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: عدد المضيفين في /25:",
    "irt": {
      "a": 1.2804953358399362,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "sub_q05",
    "question": "عدد المضيفين في /26:",
    "options": [
      "62",
      "63",
      "64",
      "61"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: عدد المضيفين في /26:",
    "irt": {
      "a": 1.0787779670488262,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "sub_q06",
    "question": "Wildcard Mask لـ 255.255.255.0:",
    "options": [
      "0.0.0.255",
      "255.255.255.0",
      "0.0.255.255",
      "255.255.0.0"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: Wildcard Mask لـ 255.255.255.0:",
    "irt": {
      "a": 1.099984025005643,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "sub_q07",
    "question": "كيف نحسب Wildcard:",
    "options": [
      "255 - القناع",
      "255 + القناع",
      "القناع × 2",
      "القناع ÷ 2"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: كيف نحسب Wildcard:",
    "irt": {
      "a": 1.224037146373246,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "sub_q08",
    "question": "عنوان الشبكة لـ 192.168.1.10/24:",
    "options": [
      "192.168.1.0",
      "192.168.1.1",
      "192.168.1.255",
      "192.168.0.0"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: عنوان الشبكة لـ 192.168.1.10/24:",
    "irt": {
      "a": 1.1933651439132258,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "sub_q09",
    "question": "عنوان Broadcast لـ 192.168.1.10/24:",
    "options": [
      "192.168.1.255",
      "192.168.1.0",
      "192.168.2.255",
      "192.168.0.255"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: عنوان Broadcast لـ 192.168.1.10/24:",
    "irt": {
      "a": 1.2724930148578475,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "sub_q10",
    "question": "كم جزء فرعي من /24 إلى /26:",
    "options": [
      "4",
      "2",
      "8",
      "16"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: كم جزء فرعي من /24 إلى /26:",
    "irt": {
      "a": 1.2550352184315756,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "sub_q11",
    "question": "VLSM تعني:",
    "options": [
      "أقنعة فرعية مختلفة الأحجام",
      "قناع ثابت",
      "طريقة حجز",
      "بروتوكول توجيه"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: VLSM تعني:",
    "irt": {
      "a": 1.1158801672654024,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": true
  },
  {
    "id": "sub_q12",
    "question": "Supernetting هو:",
    "options": [
      "تجميع شبكات",
      "تقسيم شبكة",
      "حذف شبكات",
      "دمج عناوين"
    ],
    "correct": 0,
    "topic": "subnetting",
    "subSkill": "subnet_calc",
    "cognitiveLevel": "remembering",
    "difficulty": 1,
    "errorPattern": "memorization",
    "explanation": "شرح: Supernetting هو:",
    "irt": {
      "a": 1.2261646324403488,
      "b": -3,
      "c": 0.2
    },
    "subSkills": [
      "subnet_calc"
    ],
    "diagnostic": {
      "errorPattern": "misc_subnet_calc",
      "rootCause": "سبب subnet_calc",
      "futureImpact": "تأثير subnet_calc",
      "remediationVideoQuery": "شرح subnet_calc"
    },
    "prerequisites": [],
    "isQuick": true
  }
];
