// data/questions/basics.js
// ============================================================
// 📚 بنك الأسئلة - SmartLab (نسخة هندسة الشبكات للتجربة)
// المصمم: خبير شبكات - Network Engineer
// عدد الأسئلة: 32 سؤالاً (4 محاور رئيسية)
// ============================================================

export function getAllBasicsQuestions() {
  return QUESTIONS;
}

export function getAssessmentQuestions(assessmentId) {
  const filtered = QUESTIONS.filter(q => {
    if (assessmentId === 'net_basics') return q.topic === 'Fundamentals';
    if (assessmentId === 'osi') return q.topic === 'OSI Model';
    if (assessmentId === 'subnetting') return q.topic === 'Subnetting' || q.topic === 'Routing';
    if (assessmentId === 'ipv4') return q.topic === 'Fundamentals';
    if (assessmentId === 'devices') return q.topic === 'Switching';
    if (assessmentId === 'tcpip') return q.topic === 'Fundamentals' || q.topic === 'Troubleshooting';
    if (assessmentId === 'full') return true;
    return true; // إرجاع جميع الأسئلة افتراضياً لضمان اكتمال العرض
  });
  return filtered.length > 0 ? filtered : QUESTIONS;
}

export function getAssessmentName(assessmentId) {
  const names = {
    'net_basics': 'أساسيات الشبكات',
    'osi': 'نموذج OSI',
    'subnetting': 'حسابات الشبكات الفرعية',
    'ipv4': 'بروتوكول IPv4',
    'devices': 'أجهزة الشبكات',
    'tcpip': 'نموذج TCP/IP',
    'full': 'التقييم الشامل للشبكات'
  };
  return names[assessmentId] || 'التقييم الشامل';
}

// ============================================================
// 🔷 الأسئلة (32 سؤالاً تغطي 4 محاور: Fundamentals, Switching, Routing, Troubleshooting)
// ============================================================
const QUESTIONS = [
  // =============================================================
  // Fundamentals (OSI, TCP/IP, MAC/IP, ARP, DNS, DHCP)
  // =============================================================
  {
    id: 'net_001',
    question: 'أي طبقة في نموذج OSI مسؤولة عن العنونة المنطقية وتوجيه الحزم؟',
    options: [
      'طبقة ربط البيانات (Data Link)',
      'طبقة الشبكة (Network)',
      'طبقة النقل (Transport)',
      'الطبقة المادية (Physical)'
    ],
    correct: 1,
    topic: 'Fundamentals',
    subSkill: 'osi_l3',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'conceptual',
    explanation: 'طبقة الشبكة (الطبقة الثالثة) هي المسؤولة عن العنونة المنطقية (IP) وتوجيه الحزم.',
    irt: { a: 0.8, b: -2.0, c: 0.2 },
    subSkills: ['osi_model', 'net_fund'],
    diagnostic: {
      errorPattern: 'misc_l2_l3',
      rootCause: 'يخلط بين طبقة ربط البيانات (MAC) وطبقة الشبكة (IP)',
      futureImpact: 'سيواجه صعوبة في فهم التوجيه (Routing)',
      remediationVideoQuery: 'الفرق بين الطبقة الثانية والثالثة في OSI'
    },
    prerequisites: []
  },
  {
    id: 'net_002',
    question: 'في نموذج TCP/IP، أي بروتوكول يضمن تسليم البيانات بشكل موثوق وخالٍ من الأخطاء؟',
    options: [
      'UDP',
      'IP',
      'TCP',
      'ICMP'
    ],
    correct: 2,
    topic: 'Fundamentals',
    subSkill: 'tcp_reliability',
    cognitiveLevel: 'understanding',
    difficulty: 1,
    errorPattern: 'conceptual',
    explanation: 'بروتوكول TCP يعتمد على نظام الإشعارات (Acknowledgments) لضمان تسليم البيانات بدقة.',
    irt: { a: 0.9, b: -1.5, c: 0.2 },
    subSkills: ['tcpip_model', 'net_fund'],
    diagnostic: {
      errorPattern: 'misc_tcp_udp',
      rootCause: 'عدم التمييز بين البروتوكولات الموثوقة (Connection-oriented) وغير الموثوقة (Connectionless)',
      futureImpact: 'أخطاء في اختيار البروتوكول المناسب للتطبيقات',
      remediationVideoQuery: 'مقارنة بين TCP و UDP'
    },
    prerequisites: ['net_fund']
  },
  {
    id: 'net_003',
    question: 'ما هو البروتوكول المسؤول عن ترجمة أسماء النطاقات (Domain Names) إلى عناوين IP؟',
    options: [
      'DHCP',
      'ARP',
      'DNS',
      'NAT'
    ],
    correct: 2,
    topic: 'Fundamentals',
    subSkill: 'dns',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'نظام أسماء النطاقات (DNS) يعمل كدليل هاتف للإنترنت لتحويل الأسماء إلى أرقام IP.',
    irt: { a: 1.0, b: -1.8, c: 0.15 },
    subSkills: ['dns', 'net_fund'],
    diagnostic: {
      errorPattern: 'misc_dns_dhcp',
      rootCause: 'يخلط بين خدمات توزيع الـ IP (DHCP) وخدمات تحليل الأسماء (DNS)',
      futureImpact: 'صعوبة في استكشاف أخطاء التصفح',
      remediationVideoQuery: 'شرح كيف يعمل الـ DNS'
    },
    prerequisites: []
  },
  {
    id: 'net_004',
    question: 'جهاز يحتاج لمعرفة عنوان MAC المقابل لعنوان IP معين على نفس الشبكة المحلية، أي بروتوكول يستخدم؟',
    options: [
      'RARP',
      'ARP',
      'ICMP',
      'IGMP'
    ],
    correct: 1,
    topic: 'Fundamentals',
    subSkill: 'arp',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'بروتوكول Address Resolution Protocol (ARP) يستخدم لاكتشاف عنوان الطبقة الثانية (MAC) المرتبط بعنوان الطبقة الثالثة (IP).',
    irt: { a: 1.1, b: -0.5, c: 0.2 },
    subSkills: ['arp', 'mac_addressing'],
    diagnostic: {
      errorPattern: 'misc_arp_rarp',
      rootCause: 'عدم فهم آلية ربط العناوين المنطقية بالمادية',
      futureImpact: 'فهم خاطئ لآلية عمل الـ Switch',
      remediationVideoQuery: 'كيف يعمل بروتوكول ARP في الشبكات'
    },
    prerequisites: ['osi_l3']
  },
  {
    id: 'net_005',
    question: 'تتكون عناوين IPv4 من كم بت؟',
    options: [
      '16 بت',
      '32 بت',
      '64 بت',
      '128 بت'
    ],
    correct: 1,
    topic: 'Fundamentals',
    subSkill: 'ipv4_length',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'عنوان IPv4 يتكون من 32 بت مقسمة إلى 4 مقاطع (Octets).',
    irt: { a: 0.8, b: -2.5, c: 0.2 },
    subSkills: ['ipv4_fund'],
    diagnostic: {
      errorPattern: 'misc_ipv4_ipv6',
      rootCause: 'يخلط بين طول عنوان IPv4 و IPv6 أو MAC',
      futureImpact: 'أخطاء أساسية في حساب الشبكات الفرعية',
      remediationVideoQuery: 'بنية عنوان IPv4'
    },
    prerequisites: []
  },
  {
    id: 'net_006',
    question: 'أي خدمة توزع عناوين IP بشكل ديناميكي للأجهزة في الشبكة؟',
    options: [
      'DNS',
      'NAT',
      'DHCP',
      'WINS'
    ],
    correct: 2,
    topic: 'Fundamentals',
    subSkill: 'dhcp',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'بروتوكول DHCP يخصص العناوين الديناميكية (Dynamic Host Configuration Protocol).',
    irt: { a: 0.9, b: -2.0, c: 0.1 },
    subSkills: ['dhcp'],
    diagnostic: {
      errorPattern: 'misc_dns_dhcp',
      rootCause: 'خلط بين الخدمات الأساسية (DNS vs DHCP)',
      futureImpact: 'فشل في تشخيص مشاكل عدم الاتصال',
      remediationVideoQuery: 'شرح بروتوكول DHCP'
    },
    prerequisites: []
  },
  {
    id: 'net_007',
    question: 'ما هي الطبقة الموازية لطبقتي (Session و Presentation و Application) من الـ OSI في نموذج TCP/IP؟',
    options: [
      'Network Access',
      'Internet',
      'Transport',
      'Application'
    ],
    correct: 3,
    topic: 'Fundamentals',
    subSkill: 'tcpip_model',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'في نموذج TCP/IP المحدث، تدمج الثلاث طبقات العليا من نموذج OSI في طبقة واحدة تسمى Application.',
    irt: { a: 1.0, b: -0.2, c: 0.2 },
    subSkills: ['tcpip_model', 'osi_model'],
    diagnostic: {
      errorPattern: 'misc_osi_tcpip',
      rootCause: 'صعوبة في مطابقة الطبقات بين النموذجين',
      futureImpact: 'ارتباك عند قراءة وثائق البروتوكولات المختلفة',
      remediationVideoQuery: 'مقارنة بين OSI و TCP/IP'
    },
    prerequisites: ['osi_model']
  },
  {
    id: 'net_008',
    question: 'ما هو عنوان الـ MAC الذي يستخدم كـ Broadcast للشبكة المحلية؟',
    options: [
      '00:00:00:00:00:00',
      'FF:FF:FF:FF:FF:FF',
      '255.255.255.255',
      '01:00:5E:00:00:00'
    ],
    correct: 1,
    topic: 'Fundamentals',
    subSkill: 'mac_addressing',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'عنوان البث (Broadcast) للـ MAC يتكون من FFs (جميع البتات 1).',
    irt: { a: 1.2, b: 0.5, c: 0.2 },
    subSkills: ['mac_addressing', 'ethernet'],
    diagnostic: {
      errorPattern: 'misc_mac_ip_bcast',
      rootCause: 'يخلط بين الـ Broadcast للـ IP والـ MAC',
      futureImpact: 'أخطاء في فهم رسائل اكتشاف الشبكة (ARP Request)',
      remediationVideoQuery: 'أنواع رسائل البث في الشبكات'
    },
    prerequisites: ['mac_addressing']
  },

  // =============================================================
  // Switching (VLAN, Trunk, STP)
  // =============================================================
  {
    id: 'net_009',
    question: 'ما هو الغرض الأساسي من استخدام شبكات الـ VLAN؟',
    options: [
      'زيادة سرعة الإنترنت',
      'عزل مجالات البث (Broadcast Domains) منطقياً',
      'تشفير البيانات بين الأجهزة',
      'ربط شبكتين مختلفتين عبر الإنترنت'
    ],
    correct: 1,
    topic: 'Switching',
    subSkill: 'vlan_concept',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'تُستخدم الـ VLAN لتقسيم السويتش الواحد إلى عدة شبكات وهمية معزولة (Broadcast Domains).',
    irt: { a: 1.1, b: 0.0, c: 0.2 },
    subSkills: ['vlan', 'switching'],
    diagnostic: {
      errorPattern: 'misc_vlan_vpn',
      rootCause: 'يخلط بين مفهوم الشبكة الافتراضية (VLAN) والشبكة الخاصة الافتراضية (VPN)',
      futureImpact: 'تصميم غير آمن أو غير فعال للشبكات المحلية',
      remediationVideoQuery: 'ما هي الـ VLAN ولماذا نستخدمها'
    },
    prerequisites: ['osi_model']
  },
  {
    id: 'net_010',
    question: 'أي بروتوكول يمنع حدوث حلقات (Loops) في شبكات الطبقة الثانية (Layer 2)؟',
    options: [
      'VTP',
      'STP',
      'OSPF',
      'ARP'
    ],
    correct: 1,
    topic: 'Switching',
    subSkill: 'stp_concept',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'بروتوكول الشجرة الممتدة (Spanning Tree Protocol - STP) يمنع الحلقات بإغلاق المسارات الاحتياطية منطقياً.',
    irt: { a: 1.0, b: 0.5, c: 0.2 },
    subSkills: ['stp', 'switching'],
    diagnostic: {
      errorPattern: 'misc_stp_vtp',
      rootCause: 'عدم معرفة وظيفة بروتوكول STP الحيوية في الشبكات',
      futureImpact: 'احتمال التسبب في عواصف البث (Broadcast Storms) عند تصميم الشبكة',
      remediationVideoQuery: 'كيف يمنع بروتوكول STP حلقات الشبكة'
    },
    prerequisites: ['vlan']
  },
  {
    id: 'net_011',
    question: 'ما هو المعيار (Standard) المستخدم لتحديد الوسم (Tagging) لمنفذ الـ Trunk في شبكات الـ VLAN؟',
    options: [
      'IEEE 802.11',
      'IEEE 802.3',
      'IEEE 802.1Q',
      'IEEE 802.1X'
    ],
    correct: 2,
    topic: 'Switching',
    subSkill: 'vlan_tagging',
    cognitiveLevel: 'remembering',
    difficulty: 3,
    errorPattern: 'memorization',
    explanation: 'المعيار 802.1Q (أو dot1q) هو بروتوكول الوسم القياسي للـ VLAN عبر منافذ الـ Trunk.',
    irt: { a: 1.2, b: 1.0, c: 0.2 },
    subSkills: ['vlan', 'trunking'],
    diagnostic: {
      errorPattern: 'misc_ieee_standards',
      rootCause: 'لا يحفظ معايير IEEE للشبكات بدقة',
      futureImpact: 'صعوبة في إعداد السويتشات بين شركات مصنعة مختلفة',
      remediationVideoQuery: 'شرح مفهوم 802.1Q Trunking'
    },
    prerequisites: ['vlan']
  },
  {
    id: 'net_012',
    question: 'في سويتشات سيسكو، كيف يمر الترافيك الخاص بالـ Native VLAN عبر رابط الـ Trunk؟',
    options: [
      'موسوماً بـ Tag رقم 1',
      'مشفراً',
      'يُمنع مروره',
      'بدون وسم (Untagged)'
    ],
    correct: 3,
    topic: 'Switching',
    subSkill: 'native_vlan',
    cognitiveLevel: 'understanding',
    difficulty: 3,
    errorPattern: 'conceptual',
    explanation: 'الـ Native VLAN هي شبكة تُمرّر إطاراتها (Frames) بدون أي וسم (Untagged) عبر رابط الـ Trunk.',
    irt: { a: 1.1, b: 1.2, c: 0.15 },
    subSkills: ['vlan', 'trunking'],
    diagnostic: {
      errorPattern: 'misc_native_vlan',
      rootCause: 'سوء فهم لآلية عمل الـ Native VLAN وأهميتها',
      futureImpact: 'أخطاء عدم تطابق (VLAN Mismatch) وثغرات أمنية',
      remediationVideoQuery: 'ما هي الـ Native VLAN وكيف تعمل؟'
    },
    prerequisites: ['vlan_tagging']
  },
  {
    id: 'net_013',
    question: 'إذا كان منفذ السويتش متصلاً بجهاز حاسب آلي للمستخدم العادي، فيجب أن يُعد هذا المنفذ في وضع:',
    options: [
      'Trunk Mode',
      'Access Mode',
      'Dynamic Auto',
      'Dynamic Desirable'
    ],
    correct: 1,
    topic: 'Switching',
    subSkill: 'access_ports',
    cognitiveLevel: 'understanding',
    difficulty: 1,
    errorPattern: 'conceptual',
    explanation: 'منافذ الأجهزة النهائية (PCs, Printers) يجب أن تكون Access وتتبع لـ VLAN واحدة فقط.',
    irt: { a: 1.0, b: -1.0, c: 0.2 },
    subSkills: ['vlan', 'switching'],
    diagnostic: {
      errorPattern: 'misc_access_trunk',
      rootCause: 'يخلط بين متى يستخدم Access ومتى يستخدم Trunk',
      futureImpact: 'أجهزة المستخدمين قد لا تتصل بالشبكة أبداً',
      remediationVideoQuery: 'الفرق بين Access Port و Trunk Port'
    },
    prerequisites: ['vlan']
  },
  {
    id: 'net_014',
    question: 'ما هي الحالة التي يمر بها المنفذ في بروتوكول STP حيث يتعلم عناوين الـ MAC ولا يُرسل بيانات بعد؟',
    options: [
      'Blocking',
      'Listening',
      'Learning',
      'Forwarding'
    ],
    correct: 2,
    topic: 'Switching',
    subSkill: 'stp_states',
    cognitiveLevel: 'understanding',
    difficulty: 3,
    errorPattern: 'conceptual',
    explanation: 'في حالة Learning، يتعلم السويتش عناوين الماك ليملأ جدول الـ MAC لكنه لا يمرر بيانات فعلية للمستخدمين.',
    irt: { a: 1.3, b: 1.5, c: 0.15 },
    subSkills: ['stp', 'switching'],
    diagnostic: {
      errorPattern: 'misc_stp_states',
      rootCause: 'عدم التمييز بين حالات منفذ STP (Listening vs Learning)',
      futureImpact: 'صعوبة في تشخيص بطء اتصال المنافذ عند التشغيل',
      remediationVideoQuery: 'حالات منافذ STP المختلفة'
    },
    prerequisites: ['stp_concept']
  },
  {
    id: 'net_015',
    question: 'كيف يتخذ السويتش قرار إعادة التوجيه (Forwarding) لإطار (Frame) وارد؟',
    options: [
      'عن طريق فحص عنوان الـ IP الوجهة',
      'عن طريق فحص عنوان الـ MAC المَصدر',
      'عن طريق فحص عنوان الـ MAC الوجهة ومطابقته بجدول الـ MAC',
      'عن طريق إرساله دائماً لجميع المنافذ (Flooding)'
    ],
    correct: 2,
    topic: 'Switching',
    subSkill: 'mac_learning',
    cognitiveLevel: 'understanding',
    difficulty: 1,
    errorPattern: 'conceptual',
    explanation: 'السويتش يفحص الـ Destination MAC ويبحث عنه في جدول العناوين لديه لمعرفة أي منفذ يرسل الإطار منه.',
    irt: { a: 1.0, b: -1.2, c: 0.2 },
    subSkills: ['switching', 'mac_addressing'],
    diagnostic: {
      errorPattern: 'misc_switch_routing',
      rootCause: 'يخلط بين آلية عمل السويتش (MAC) والراوتر (IP)',
      futureImpact: 'عدم القدرة على تتبع تدفق البيانات (Traffic Flow) في الشبكة',
      remediationVideoQuery: 'كيف يبني السويتش جدول عناوين MAC'
    },
    prerequisites: []
  },
  {
    id: 'net_016',
    question: 'ماذا يفعل السويتش إذا استلم إطاراً (Frame) عنوان الوجهة فيه غير موجود في جدول عناوين الـ MAC الخاص به؟',
    options: [
      'يقوم بحذف الإطار (Drop)',
      'يرسله للراوتر الافتراضي (Default Gateway)',
      'يبثه من جميع المنافذ باستثناء المنفذ الذي ورد منه (Unknown Unicast Flooding)',
      'يرسل رسالة خطأ للمرسل'
    ],
    correct: 2,
    topic: 'Switching',
    subSkill: 'unknown_unicast',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'يقوم السويتش بعمل Flooding للإطار المجهول لجميع المنافذ عدا منفذ الاستلام ليضمن وصوله.',
    irt: { a: 1.1, b: 0.2, c: 0.2 },
    subSkills: ['switching'],
    diagnostic: {
      errorPattern: 'misc_switch_drop',
      rootCause: 'يظن أن السويتش يتجاهل الحزم التي لا يعرفها كما يفعل الراوتر',
      futureImpact: 'سوء فهم لسلوك الشبكة في حال عدم اكتمال جدول الـ MAC',
      remediationVideoQuery: 'ما هو الـ Unknown Unicast Flooding'
    },
    prerequisites: ['mac_learning']
  },

  // =============================================================
  // Routing (Static, Default Gateway, Subnetting)
  // =============================================================
  {
    id: 'net_017',
    question: 'تم تكوين شبكة بالعنوان 192.168.1.0 والقناع 255.255.255.0، ما هو قناع الشبكة المعادل بصيغة CIDR؟',
    options: [
      '/16',
      '/24',
      '/28',
      '/32'
    ],
    correct: 1,
    topic: 'Subnetting',
    subSkill: 'cidr_basics',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'procedural',
    explanation: 'القناع 255.255.255.0 يحتوي على 24 بت قيمتها "1" (8+8+8)، لذا يرمز له بـ /24.',
    irt: { a: 1.0, b: -0.5, c: 0.1 },
    subSkills: ['subnetting', 'ipv4_fund'],
    diagnostic: {
      errorPattern: 'misc_cidr_boundary',
      rootCause: 'لا يستطيع تحويل القناع العشري (Decimal) إلى صيغة البتات (CIDR)',
      futureImpact: 'فشل تام في إعداد عناوين الـ IP للأجهزة',
      remediationVideoQuery: 'حساب أقنعة الشبكة وصيغة CIDR'
    },
    prerequisites: ['ipv4_length']
  },
  {
    id: 'net_018',
    question: 'ما هو الغرض من إعداد الـ Default Gateway في جهاز الكمبيوتر؟',
    options: [
      'لتوزيع عناوين IP تلقائياً',
      'للتمكن من التواصل مع أجهزة خارج الشبكة المحلية',
      'لمنع الفيروسات من دخول الشبكة',
      'لتسريع نقل البيانات في نفس الـ VLAN'
    ],
    correct: 1,
    topic: 'Routing',
    subSkill: 'default_gateway',
    cognitiveLevel: 'understanding',
    difficulty: 1,
    errorPattern: 'conceptual',
    explanation: 'البوابة الافتراضية (Default Gateway) هي المخرج (الراوتر) الذي تلجأ إليه الأجهزة لإرسال بيانات لشبكات أخرى.',
    irt: { a: 0.9, b: -1.8, c: 0.2 },
    subSkills: ['routing_fund'],
    diagnostic: {
      errorPattern: 'misc_gateway_dns',
      rootCause: 'يخلط بين وظيفة الـ Gateway ووظيفة الـ DNS',
      futureImpact: 'لن يستطيع ربط الأجهزة بالإنترنت',
      remediationVideoQuery: 'ما هي البوابة الافتراضية Default Gateway'
    },
    prerequisites: ['ipv4_fund']
  },
  {
    id: 'net_019',
    question: 'في شبكة 192.168.10.0/26، كم عدد الأجهزة (Hosts) المتاحة للاستخدام في هذا الـ Subnet؟',
    options: [
      '64',
      '62',
      '32',
      '30'
    ],
    correct: 1,
    topic: 'Subnetting',
    subSkill: 'host_calculation',
    cognitiveLevel: 'applying',
    difficulty: 4,
    errorPattern: 'procedural',
    explanation: '/26 يترك 6 بت للأجهزة (32 - 26 = 6). العدد الكلي 2^6 = 64، ونطرح 2 (عنوان الشبكة والبث)، الباقي 62.',
    irt: { a: 1.4, b: 1.8, c: 0.2 },
    subSkills: ['subnetting', 'binary_math'],
    diagnostic: {
      errorPattern: 'misc_subnet_minus2',
      rootCause: 'النسيان الشائع لطرح عنوان الشبكة وعنوان البث (-2) أو خطأ في حساب القوى',
      futureImpact: 'تصميم شبكات بعناوين ناقصة أو متداخلة',
      remediationVideoQuery: 'كيفية حساب عدد الأجهزة المتاحة في الشبكات الفرعية'
    },
    prerequisites: ['cidr_basics']
  },
  {
    id: 'net_020',
    question: 'ما هو عنوان الشبكة (Network Address) للعنوان 10.1.1.50/28؟',
    options: [
      '10.1.1.0',
      '10.1.1.32',
      '10.1.1.48',
      '10.1.1.64'
    ],
    correct: 2,
    topic: 'Subnetting',
    subSkill: 'network_address_calc',
    cognitiveLevel: 'applying',
    difficulty: 5,
    errorPattern: 'procedural',
    explanation: '/28 تعني أن مقدار القفزة (Block Size) هو 16. مضاعفات 16 هي (0, 16, 32, 48, 64). العدد 50 يقع في شبكة 48.',
    irt: { a: 1.5, b: 2.2, c: 0.2 },
    subSkills: ['subnetting', 'binary_math'],
    diagnostic: {
      errorPattern: 'misc_block_size',
      rootCause: 'عدم القدرة على حساب المضاعفات (Block Size) لاكتشاف بداية الشبكة الفرعية',
      futureImpact: 'فشل في إعداد توجيه صحيح (Routing) للشبكة',
      remediationVideoQuery: 'حساب عنوان الشبكة بطريقة سريعة'
    },
    prerequisites: ['host_calculation']
  },
  {
    id: 'net_021',
    question: 'في جدول توجيه الراوتر (Routing Table)، ماذا يعني الرمز "C" بجانب مسار معين؟',
    options: [
      'Connected (شبكة متصلة مباشرة بالراوتر)',
      'Cisco (مسار مسجل عبر أجهزة سيسكو فقط)',
      'Closed (مسار مغلق ومعطل)',
      'Configured (مسار ثابت تم إعداده يدوياً)'
    ],
    correct: 0,
    topic: 'Routing',
    subSkill: 'routing_table',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'الرمز C يشير إلى Directly Connected Network، أي أن الراوتر يمتلك منفذاً مباشراً في هذه الشبكة.',
    irt: { a: 0.9, b: 0.3, c: 0.1 },
    subSkills: ['routing_fund'],
    diagnostic: {
      errorPattern: 'misc_routing_codes',
      rootCause: 'يجهل قراءة جدول التوجيه بشكل صحيح (خلط بين C و S)',
      futureImpact: 'صعوبة في استكشاف أخطاء التوجيه',
      remediationVideoQuery: 'قراءة جدول التوجيه للراوتر'
    },
    prerequisites: ['routing_fund']
  },
  {
    id: 'net_022',
    question: 'ما هو مسار التوجيه الافتراضي (Default Route) الثابت الذي يمثل "أي شبكة غير معروفة" في IPv4؟',
    options: [
      '255.255.255.255 255.255.255.255',
      '0.0.0.0 255.255.255.255',
      '0.0.0.0 0.0.0.0',
      '192.168.0.0 255.255.0.0'
    ],
    correct: 2,
    topic: 'Routing',
    subSkill: 'default_route',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'المسار 0.0.0.0 0.0.0.0 هو المسار الافتراضي (Default Route) والذي يطابق جميع العناوين غير الموجودة في جدول التوجيه.',
    irt: { a: 1.1, b: 0.0, c: 0.2 },
    subSkills: ['routing_fund', 'static_routing'],
    diagnostic: {
      errorPattern: 'misc_default_route',
      rootCause: 'عدم حفظ صيغة المسار الافتراضي',
      futureImpact: 'الراوتر لن يتمكن من إرسال البيانات للإنترنت',
      remediationVideoQuery: 'إعداد الـ Default Static Route'
    },
    prerequisites: ['routing_fund']
  },
  {
    id: 'net_023',
    question: 'أي من عناوين IP التالية يعتبر عنواناً خاصاً (Private IP)؟',
    options: [
      '8.8.8.8',
      '172.16.5.1',
      '192.169.1.1',
      '23.10.10.1'
    ],
    correct: 1,
    topic: 'Subnetting',
    subSkill: 'private_ips',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'العنوان 172.16.5.1 يقع ضمن النطاق الخاص بالفئة B (من 172.16.0.0 إلى 172.31.255.255).',
    irt: { a: 1.0, b: 0.2, c: 0.2 },
    subSkills: ['ipv4_fund'],
    diagnostic: {
      errorPattern: 'misc_private_public',
      rootCause: 'عدم حفظ نطاقات العناوين الخاصة (RFC 1918)',
      futureImpact: 'إعداد أجهزة بعناوين غير صالحة للتوجيه الداخلي أو العكس',
      remediationVideoQuery: 'الفرق بين الـ Public والـ Private IP'
    },
    prerequisites: ['ipv4_fund']
  },
  {
    id: 'net_024',
    question: 'تم إعداد راوتر بمسارين لنفس الوجهة، المسار الأول Static بـ Admin Distance=1، والثاني OSPF بـ Admin Distance=110، أيهما سيختار الراوتر لجدول التوجيه؟',
    options: [
      'مسار الـ OSPF لأن بروتوكولات التوجيه الديناميكية أقوى',
      'سيقوم بتوزيع الحمل (Load Balance) على المسارين',
      'المسار الـ Static لأن الـ Admin Distance الأقل هو الأفضل',
      'سيحدث تضارب ويتعطل التوجيه'
    ],
    correct: 2,
    topic: 'Routing',
    subSkill: 'admin_distance',
    cognitiveLevel: 'understanding',
    difficulty: 3,
    errorPattern: 'conceptual',
    explanation: 'الراوتر يفضل المسار ذو قيمة الـ Administrative Distance (AD) الأقل، وفي هذه الحالة المسار الثابت 1 يتفوق على 110.',
    irt: { a: 1.2, b: 1.4, c: 0.2 },
    subSkills: ['routing_fund'],
    diagnostic: {
      errorPattern: 'misc_admin_distance',
      rootCause: 'الاعتقاد الخاطئ بأن القيم الأكبر تعني أولوية أعلى في التوجيه',
      futureImpact: 'فشل في إعداد مسارات احتياطية (Floating Static Routes)',
      remediationVideoQuery: 'ما هو الـ Administrative Distance'
    },
    prerequisites: ['routing_table']
  },

  // =============================================================
  // Troubleshooting (Ping, Traceroute, Packet loss, DNS)
  // =============================================================
  {
    id: 'net_025',
    question: 'مستخدم يشتكي من عدم القدرة على تصفح موقع google.com، لكن عند قيامك بعمل ping لعنوان 8.8.8.8 فإنه ينجح. ما هو العطل المرجح؟',
    options: [
      'انقطاع سلك الشبكة بالكامل',
      'عطل في بروتوكول DNS',
      'الراوتر المحلي معطل',
      'بطاقة الشبكة تالفة'
    ],
    correct: 1,
    topic: 'Troubleshooting',
    subSkill: 'troubleshoot_dns',
    cognitiveLevel: 'analyzing',
    difficulty: 3,
    errorPattern: 'analytical',
    explanation: 'بما أن الاتصال بـ IP خارجي ينجح، فالاتصال بالإنترنت سليم. الفشل في تصفح الموقع باسم النطاق يدل على مشكلة في تحليل الاسم (DNS).',
    irt: { a: 1.3, b: 1.0, c: 0.2 },
    subSkills: ['troubleshoot_fund', 'dns'],
    diagnostic: {
      errorPattern: 'misc_troubleshoot_logic',
      rootCause: 'ضعف في مهارة حصر المشكلة (Isolation) بين الطبقات المختلفة',
      futureImpact: 'ضياع الوقت في تبديل الأسلاك والمعدات لمشكلة برمجية',
      remediationVideoQuery: 'خطوات استكشاف أخطاء الـ DNS'
    },
    prerequisites: ['dns', 'ping']
  },
  {
    id: 'net_026',
    question: 'أي أمر تستخدمه لمعرفة المسار (الراوترات المتعاقبة) الذي تسلكه البيانات للوصول إلى سيرفر بعيد؟',
    options: [
      'ping',
      'ipconfig',
      'nslookup',
      'tracert / traceroute'
    ],
    correct: 3,
    topic: 'Troubleshooting',
    subSkill: 'traceroute',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'أداة traceroute تُستخدم لتتبع المسار ومعرفة القفزات (Hops) التي تمر بها الحزمة للوصول للهدف.',
    irt: { a: 0.9, b: -1.0, c: 0.1 },
    subSkills: ['troubleshoot_fund'],
    diagnostic: {
      errorPattern: 'misc_ping_traceroute',
      rootCause: 'يخلط بين أداة فحص الاتصال (Ping) وأداة تتبع المسار (Traceroute)',
      futureImpact: 'عدم القدرة على تحديد أي راوتر بالتحديد هو المتسبب في قطع الاتصال',
      remediationVideoQuery: 'استخدام أمر Traceroute لاكتشاف الأعطال'
    },
    prerequisites: []
  },
  {
    id: 'net_027',
    question: 'عند قيامك بعمل Ping للمخرج الافتراضي (Default Gateway) وحصلت على رسالة "Request timed out"، ماذا يعني ذلك؟',
    options: [
      'جهاز الكمبيوتر الخاص بك لا يملك عنوان IP',
      'لا يوجد مسار للوصول إلى الهدف أو الهدف لا يرد (عطل محلي أو جدار حماية)',
      'خادم الـ DNS لا يعمل',
      'اسم المستخدم أو كلمة المرور للشبكة خاطئة'
    ],
    correct: 1,
    topic: 'Troubleshooting',
    subSkill: 'ping',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'رسالة Timeout تعني أن الحزمة أُرسلت ولكن لم نستلم رداً خلال الوقت المحدد، قد يكون الجهاز مغلقاً أو مسدوداً بجدار حماية.',
    irt: { a: 1.1, b: 0.2, c: 0.2 },
    subSkills: ['troubleshoot_fund', 'ping'],
    diagnostic: {
      errorPattern: 'misc_timeout_unreachable',
      rootCause: 'يخلط بين رسالة Destination Unreachable (لا يوجد مسار) و Request Timed Out (لا يوجد رد)',
      futureImpact: 'تشخيص خاطئ لسبب انقطاع الشبكة',
      remediationVideoQuery: 'شرح مخرجات أمر Ping'
    },
    prerequisites: ['default_gateway']
  },
  {
    id: 'net_028',
    question: 'إذا كان عنوان جهاز المستخدم 169.254.1.15، ماذا يشير هذا العنوان (APIPA)؟',
    options: [
      'تم إعداد العنوان بشكل صحيح وصالح للإنترنت',
      'الجهاز فشل في الحصول على عنوان من خادم الـ DHCP',
      'هذا عنوان يخص خادم الـ DNS المحلي',
      'تم إعداد الجهاز كـ Default Gateway للشبكة'
    ],
    correct: 1,
    topic: 'Troubleshooting',
    subSkill: 'apipa',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'نطاق 169.254.x.x هو APIPA، ويتم تخصيصه تلقائياً من قبل نظام التشغيل عندما يفشل في التواصل مع خادم DHCP.',
    irt: { a: 1.0, b: -0.3, c: 0.2 },
    subSkills: ['troubleshoot_fund', 'dhcp'],
    diagnostic: {
      errorPattern: 'misc_apipa',
      rootCause: 'لا يميز عناوين فشل الـ DHCP (APIPA)',
      futureImpact: 'فشل في تحديد أن المشكلة من خادم الـ DHCP وراء انقطاع الشبكة',
      remediationVideoQuery: 'ما هو APIPA وكيف تحل مشكلته'
    },
    prerequisites: ['dhcp']
  },
  {
    id: 'net_029',
    question: 'في منهجية استكشاف الأخطاء وإصلاحها (Troubleshooting Methodology)، ما هي الخطوة الأولى التي يجب عليك فعلها؟',
    options: [
      'تجربة الحلول الممكنة فوراً',
      'اختبار نظرية السبب المحتمل (Test the Theory)',
      'تحديد المشكلة بدقة (Identify the problem)',
      'توثيق المشكلة'
    ],
    correct: 2,
    topic: 'Troubleshooting',
    subSkill: 'troubleshoot_methodology',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'الخطوة الأولى والأهم في منهجية حل الأعطال هي جمع المعلومات وتحديد المشكلة بدقة قبل محاولة أي حل.',
    irt: { a: 0.8, b: -2.0, c: 0.1 },
    subSkills: ['troubleshoot_fund'],
    diagnostic: {
      errorPattern: 'misc_skip_verification',
      rootCause: 'أسلوب حل المشاكل بطريقة التجربة والخطأ العشوائي (Random Trial)',
      futureImpact: 'إضاعة الوقت في تغيير الإعدادات بدون خطة مما قد يكسر أجزاء أخرى',
      remediationVideoQuery: 'منهجية حل أخطاء الشبكات خطوة بخطوة'
    },
    prerequisites: []
  },
  {
    id: 'net_030',
    question: 'لديك تداخل في شبكة اللاسلكي وضعف في الإشارة، وقمت بتغيير قناة البث (Channel) في جهاز التوجيه كحل. ما هي الخطوة التالية وفق منهجية حل الأعطال؟',
    options: [
      'تحديث نظام التشغيل للراوتر',
      'إغلاق التذكرة فوراً',
      'التحقق من الوظائف الكاملة للنظام (Verify full system functionality)',
      'سؤال المستخدم عن كلمة مرور الشبكة'
    ],
    correct: 2,
    topic: 'Troubleshooting',
    subSkill: 'troubleshoot_methodology',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'procedural',
    explanation: 'بعد تطبيق الحل، يجب دائماً التحقق من أن الحل عمل بنجاح ولم يسبب مشاكل أخرى.',
    irt: { a: 1.1, b: 0.5, c: 0.15 },
    subSkills: ['troubleshoot_fund', 'verification'],
    diagnostic: {
      errorPattern: 'misc_skip_verification',
      rootCause: 'يترك الموقع بعد تطبيق الحل دون التأكد من أن المشكلة زالت بالفعل للمستخدم',
      futureImpact: 'عودة العطل مرة أخرى وعدم رضا المستخدمين',
      remediationVideoQuery: 'أهمية خطوة التحقق Verification'
    },
    prerequisites: ['troubleshoot_methodology']
  },
  {
    id: 'net_031',
    question: 'أي بروتوكول يتم استخدامه لتشغيل أوامر أداة الـ ping لاختبار الاتصال؟',
    options: [
      'TCP',
      'UDP',
      'ICMP',
      'IGMP'
    ],
    correct: 2,
    topic: 'Troubleshooting',
    subSkill: 'icmp',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'أوامر ping تعتمد على رسائل Echo Request و Echo Reply الخاصة ببروتوكول ICMP.',
    irt: { a: 0.9, b: -1.5, c: 0.2 },
    subSkills: ['ping', 'tcpip_model'],
    diagnostic: {
      errorPattern: 'misc_ping_tcp',
      rootCause: 'يظن أن الـ ping يستخدم بروتوكول TCP للاتصال',
      futureImpact: 'أخطاء في إعداد جدران الحماية (Firewall) للسماح بمرور الـ ping',
      remediationVideoQuery: 'ما هو بروتوكول ICMP'
    },
    prerequisites: []
  },
  {
    id: 'net_032',
    question: 'في سياق استكشاف الأخطاء وإصلاحها (Bottom-Up Approach)، من أين ستبدأ فحص العطل؟',
    options: [
      'من إعدادات متصفح الويب (Application Layer)',
      'من إعدادات الـ IP (Network Layer)',
      'من التوصيلات الفيزيائية للأسلاك (Physical Layer)',
      'من فحص نظام الـ DNS'
    ],
    correct: 2,
    topic: 'Troubleshooting',
    subSkill: 'bottom_up',
    cognitiveLevel: 'understanding',
    difficulty: 1,
    errorPattern: 'conceptual',
    explanation: 'النهج من الأسفل للأعلى (Bottom-Up) يعني البدء من الطبقة المادية (الطبقة 1: فحص الأسلاك، الكهرباء) ثم الصعود للطبقات الأعلى.',
    irt: { a: 0.8, b: -1.0, c: 0.1 },
    subSkills: ['troubleshoot_fund', 'osi_model'],
    diagnostic: {
      errorPattern: 'misc_troubleshoot_approach',
      rootCause: 'عدم فهم منهجيات حل المشاكل المرتبطة بنموذج OSI',
      futureImpact: 'فشل في حل مشاكل البنية التحتية البسيطة والتوجه فوراً للمشاكل البرمجية المعقدة',
      remediationVideoQuery: 'منهجيات استكشاف الأخطاء: Top-Down vs Bottom-Up'
    },
    prerequisites: ['osi_model']
  }
];
