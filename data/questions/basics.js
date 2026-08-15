// data/questions/basics.js
// ============================================================
// 📚 بنك الأسئلة - SmartLab
// المصمم: خبير شبكات CCNA & CompTIA Network+
// عدد الأسئلة: 200 سؤال (8 محاور رئيسية)
// ============================================================

/**
 * دالة مساعدة لإرجاع جميع الأسئلة
 * يمكن استخدامها في الصفحات المختلفة (التقييم السريع، التقييم الشامل)
 */
export function getAllBasicsQuestions() {
  return QUESTIONS;
}

/**
 * دالة للحصول على أسئلة تقييم معين حسب المعرف (id)
 */
export function getAssessmentQuestions(assessmentId) {
  // تصفية الأسئلة حسب المعرف (topic أو subSkill)
  const filtered = QUESTIONS.filter(q => {
    if (assessmentId === 'concepts') return q.topic === 'Network Basics';
    if (assessmentId === 'ipv4') return q.topic === 'IPv4';
    if (assessmentId === 'subnetting') return q.topic === 'Subnetting';
    if (assessmentId === 'ipv6') return q.topic === 'IPv6';
    if (assessmentId === 'osi') return q.topic === 'OSI Model' || q.topic === 'TCP/IP';
    if (assessmentId === 'devices') return q.topic === 'Network Devices';
    if (assessmentId === 'email') return q.topic === 'Email Protocols';
    if (assessmentId === 'tcpip') return q.topic === 'TCP/IP';
    // التقييم الشامل (full) يعيد جميع الأسئلة
    if (assessmentId === 'full') return true;
    return q.topic === 'Network Basics'; // افتراضي
  });
  return filtered;
}

/**
 * دالة للحصول على اسم التقييم من المعرف
 */
export function getAssessmentName(assessmentId) {
  const names = {
    'concepts': 'المفاهيم العامة للشبكات',
    'ipv4': 'IPv4 - العنونة والشبكات الفرعية',
    'subnetting': 'Subnetting المتقدم',
    'ipv6': 'IPv6',
    'osi': 'OSI Model و TCP/IP',
    'devices': 'أجهزة الشبكات',
    'email': 'بروتوكولات البريد الإلكتروني',
    'tcpip': 'TCP/IP',
    'full': 'التقييم الشامل'
  };
  return names[assessmentId] || 'تقييم الشبكات';
}

// ============================================================
// 🔷 المحور الأول: أساسيات الشبكات والمفاهيم العامة (30 سؤال)
// المهارات الفرعية: net_concepts, net_models, net_topologies, 
// net_media_cables, net_tcp_vs_udp, net_vlan, net_vpn
// ============================================================

const QUESTIONS = [
  // ===== net_concepts (تعريف الشبكة وأنواعها) =====
  {
    id: 'net_001',
    question: 'ما هو تعريف الشبكة (Network) في عالم الحاسوب؟',
    options: [
      'جهاز واحد يقوم بمعالجة البيانات',
      'مجموعة من الأجهزة المتصلة معًا لتبادل البيانات والموارد',
      'برنامج يستخدم لإدارة الملفات',
      'نظام تشغيل متخصص للخوادم'
    ],
    correct: 2,
    topic: 'Network Basics',
    subSkill: 'net_concepts',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'conceptual',
    explanation: 'الشبكة هي مجموعة من الأجهزة (حواسيب، طابعات، خوادم) المتصلة معًا بغرض تبادل البيانات ومشاركة الموارد.'
  },
  {
    id: 'net_002',
    question: 'أي من التالي يُعد مثالاً على شبكة WAN؟',
    options: [
      'شبكة داخل مبنى واحد',
      'شبكة داخل حرم جامعي',
      'شبكة تربط عدة مدن أو دول',
      'شبكة لاسلكية داخل مقهى'
    ],
    correct: 3,
    topic: 'Network Basics',
    subSkill: 'net_concepts',
    cognitiveLevel: 'understanding',
    difficulty: 1,
    errorPattern: 'conceptual',
    explanation: 'WAN (Wide Area Network) هي شبكة واسعة النطاق تربط مناطق جغرافية متباعدة، مثل شبكات الإنترنت أو شبكات الشركات العالمية.'
  },
  {
    id: 'net_003',
    question: 'ما هي شبكة PAN (Personal Area Network)؟',
    options: [
      'شبكة تغطي منطقة واسعة مثل مدينة',
      'شبكة صغيرة جدًا تغطي مساحة شخصية مثل اتصال البلوتوث بين هاتف وساعة',
      'شبكة تغطي حرم جامعي',
      'شبكة تستخدم للألعاب عبر الإنترنت'
    ],
    correct: 2,
    topic: 'Network Basics',
    subSkill: 'net_concepts',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'PAN هي شبكة شخصية تغطي مساحة محدودة جدًا (عادة بضعة أمتار) وتستخدم لتوصيل الأجهزة الشخصية مثل الهواتف والساعات الذكية.'
  },
  {
    id: 'net_004',
    question: 'أي من التالي يمثل الفرق الرئيسي بين شبكة LAN و WAN؟',
    options: [
      'السرعة فقط هي الفرق',
      'المساحة الجغرافية التي تغطيها الشبكة',
      'نوع الكابلات المستخدمة',
      'عدد المستخدمين'
    ],
    correct: 2,
    topic: 'Network Basics',
    subSkill: 'net_concepts',
    cognitiveLevel: 'understanding',
    difficulty: 1,
    errorPattern: 'conceptual',
    explanation: 'الفرق الرئيسي بين LAN و WAN هو المساحة الجغرافية: LAN تغطي منطقة محدودة (مبنى، حرم جامعي)، بينما WAN تغطي مناطق واسعة (مدن، دول).'
  },

  // ===== net_models (Client-Server vs Peer-to-Peer) =====
  {
    id: 'net_005',
    question: 'في نموذج Client-Server، ما هو الدور الأساسي للخادم (Server)؟',
    options: [
      'تقديم الخدمات والموارد للعملاء',
      'طلب الخدمات من العملاء الآخرين',
      'توزيع البيانات فقط',
      'تشغيل الألعاب'
    ],
    correct: 1,
    topic: 'Network Basics',
    subSkill: 'net_models',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'conceptual',
    explanation: 'في نموذج Client-Server، الخادم هو المزود للخدمات (مثل الملفات، البريد، قواعد البيانات) والعملاء هم المستفيدون من هذه الخدمات.'
  },
  {
    id: 'net_006',
    question: 'أي من التالي يُمثل ميزة لنموذج Peer-to-Peer (P2P)؟',
    options: [
      'مركزية في إدارة البيانات',
      'أمان عالي للبيانات',
      'لا يحتاج إلى خادم مركزي',
      'يدعم أعدادًا كبيرة من المستخدمين'
    ],
    correct: 3,
    topic: 'Network Basics',
    subSkill: 'net_models',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'في نموذج P2P، لا يوجد خادم مركزي، بل كل جهاز يعمل كعميل وخادم في نفس الوقت. هذا النموذج بسيط لكنه أقل أمانًا ولا يدعم أعدادًا كبيرة من المستخدمين بكفاءة.'
  },
  {
    id: 'net_007',
    question: 'أي من التالي يُعد عيبًا رئيسيًا لنموذج Client-Server؟',
    options: [
      'صعوبة في إدارة الشبكة',
      'تكلفة عالية للخوادم وصيانتها',
      'بطء في نقل البيانات',
      'عدم وجود أمان'
    ],
    correct: 2,
    topic: 'Network Basics',
    subSkill: 'net_models',
    cognitiveLevel: 'analyzing',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'العيب الرئيسي لنموذج Client-Server هو التكلفة العالية للخوادم (Hardware و Software) بالإضافة إلى تكاليف الصيانة والتشغيل.'
  },
  {
    id: 'net_008',
    question: 'في أي سيناريو يكون نموذج Peer-to-Peer هو الخيار الأنسب؟',
    options: [
      'شركة تضم 1000 موظف',
      'مكتبة عامة تحتاج لإدارة قاعدة بيانات مركزية',
      'شبكة منزلية صغيرة لتبادل الملفات والطابعة',
      'بنك يحتاج إلى أعلى مستويات الأمان'
    ],
    correct: 3,
    topic: 'Network Basics',
    subSkill: 'net_models',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'application',
    explanation: 'نموذج P2P مناسب للشبكات الصغيرة (مثل الشبكات المنزلية) حيث لا تتوفر ميزانية لخادم مركزي ويكون عدد المستخدمين قليلاً.'
  },

  // ===== net_topologies (طبولوجيا الشبكات) =====
  {
    id: 'net_009',
    question: 'في طبولوجيا Star، كيف تتصل الأجهزة ببعضها؟',
    options: [
      'كل جهاز متصل بالجهاز الذي يليه في حلقة',
      'جميع الأجهزة متصلة بجهاز مركزي (Hub/Switch)',
      'كل جهاز متصل بجميع الأجهزة الأخرى',
      'الأجهزة متصلة في خط مستقيم'
    ],
    correct: 2,
    topic: 'Network Basics',
    subSkill: 'net_topologies',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'conceptual',
    explanation: 'في طبولوجيا Star، تتصل جميع الأجهزة بجهاز مركزي (مثل Switch أو Hub)، وإذا تعطل جهاز واحد لا يؤثر ذلك على بقية الأجهزة.'
  },
  {
    id: 'net_010',
    question: 'ما هو العيب الرئيسي لطبولوجيا Bus؟',
    options: [
      'تكلفة عالية للكابلات',
      'إذا تعطل الكابل الرئيسي، تتوقف الشبكة بأكملها',
      'صعوبة في إضافة أجهزة جديدة',
      'بطء في نقل البيانات'
    ],
    correct: 2,
    topic: 'Network Basics',
    subSkill: 'net_topologies',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'العيب الرئيسي لطبولوجيا Bus هو أن الكابل الرئيسي (Backbone) يمثل نقطة فشل واحدة (Single Point of Failure). إذا تعطل، تتوقف الشبكة بأكملها.'
  },
  {
    id: 'net_011',
    question: 'أي من التالي يُمثل ميزة لطبولوجيا Mesh (التشابكية)؟',
    options: [
      'تكلفة منخفضة',
      'سهولة التركيب',
      'تعدد المسارات بين الأجهزة (Redundancy)',
      'كابلات قليلة'
    ],
    correct: 3,
    topic: 'Network Basics',
    subSkill: 'net_topologies',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'طبولوجيا Mesh توفر مسارات متعددة بين الأجهزة، مما يعني أنه إذا تعطل مسار واحد، يمكن للبيانات أن تسلك مسارًا آخر، مما يزيد من موثوقية الشبكة.'
  },
  {
    id: 'net_012',
    question: 'في شبكة تستخدم طبولوجيا Ring، ماذا يحدث إذا تعطل أحد الأجهزة؟',
    options: [
      'لا يتأثر أي جهاز آخر',
      'يتوقف الجهاز المتعطل فقط',
      'تتوقف الشبكة بأكملها',
      'يتم إعادة توجيه البيانات تلقائيًا'
    ],
    correct: 3,
    topic: 'Network Basics',
    subSkill: 'net_topologies',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'application',
    explanation: 'في طبولوجيا Ring، تمر البيانات عبر كل جهاز في حلقة. إذا تعطل جهاز واحد، تنقطع الحلقة وتتوقف الشبكة بأكملها (ما لم تكن هناك آلية تجاوز).'
  },

  // ===== net_media_cables (وسائط النقل والكابلات) =====
  {
    id: 'net_013',
    question: 'ما هو نوع الكابل الذي يستخدم موصل RJ45؟',
    options: [
      'كابل الألياف البصرية',
      'كابل UTP (النحاسي)',
      'كابل محوري (Coaxial)',
      'كابل USB'
    ],
    correct: 2,
    topic: 'Network Basics',
    subSkill: 'net_media_cables',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'موصل RJ45 يُستخدم مع كابلات UTP (النحاسية) في شبكات Ethernet، وهو الموصل الأكثر شيوعًا في الشبكات المحلية.'
  },
  {
    id: 'net_014',
    question: 'ما هو الفرق الرئيسي بين كابل UTP و STP؟',
    options: [
      'UTP أسرع من STP',
      'STP يحتوي على درع حماية (Shield) ضد التداخل الكهرومغناطيسي',
      'UTP أغلى سعرًا من STP',
      'STP يستخدم في الشبكات اللاسلكية'
    ],
    correct: 2,
    topic: 'Network Basics',
    subSkill: 'net_media_cables',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'STP (Shielded Twisted Pair) يحتوي على درع معدني يحمي الكابل من التداخل الكهرومغناطيسي، بينما UTP (Unshielded Twisted Pair) لا يحتوي على هذا الدرع.'
  },
  {
    id: 'net_015',
    question: 'ما هو نوع الألياف البصرية الذي يستخدم لنقل البيانات لمسافات طويلة جدًا (أكثر من 10 كم)؟',
    options: [
      'Single-mode Fiber (SMF)',
      'Multi-mode Fiber (MMF)',
      'Coaxial Cable',
      'UTP Cable'
    ],
    correct: 1,
    topic: 'Network Basics',
    subSkill: 'net_media_cables',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'الألياف أحادية النمط (Single-mode) تُستخدم للمسافات الطويلة جدًا (تصل إلى 100 كم) لأنها تسمح بمرور شعاع ضوئي واحد فقط، مما يقلل من التشتت.'
  },
  {
    id: 'net_016',
    question: 'ما هي تقنية PoE (Power over Ethernet)؟',
    options: [
      'تقنية لنقل البيانات عبر خطوط الكهرباء',
      'تقنية لتزويد الأجهزة بالطاقة الكهربائية عبر كابل Ethernet',
      'تقنية لزيادة سرعة الإنترنت',
      'تقنية لتوصيل الأجهزة لاسلكيًا'
    ],
    correct: 2,
    topic: 'Network Basics',
    subSkill: 'net_media_cables',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'PoE تسمح بنقل الطاقة الكهربائية (التيار) مع البيانات عبر كابل Ethernet واحد، مما يلغي الحاجة إلى أسلاك طاقة منفصلة للأجهزة مثل كاميرات IP ونقاط الوصول.'
  },
  {
    id: 'net_017',
    question: 'أي من التالي يُعد موصلًا شائعًا لكابلات الألياف البصرية؟',
    options: [
      'RJ45',
      'USB-C',
      'LC (Lucent Connector)',
      'HDMI'
    ],
    correct: 3,
    topic: 'Network Basics',
    subSkill: 'net_media_cables',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'موصل LC هو واحد من أكثر الموصلات شيوعًا في شبكات الألياف البصرية، ويتميز بحجمه الصغير وسهولة استخدامه.'
  },
  {
    id: 'net_018',
    question: 'ما هو الفرق بين كابل Straight-Through و Crossover في شبكات Ethernet؟',
    options: [
      'لا يوجد فرق، كلاهما متماثل',
      'Straight-Through يربط أجهزة مختلفة (مثل كمبيوتر وسويتش)، بينما Crossover يربط أجهزة متماثلة (مثل كمبيوتر بكمبيوتر)',
      'Straight-Through أسرع من Crossover',
      'Crossover يستخدم في الشبكات اللاسلكية'
    ],
    correct: 2,
    topic: 'Network Basics',
    subSkill: 'net_media_cables',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'application',
    explanation: 'Straight-Through يستخدم لتوصيل أجهزة مختلفة (مثل PC-Switch، Router-Switch)، بينما Crossover يستخدم لتوصيل أجهزة متماثلة (مثل PC-PC، Switch-Switch).'
  },

  // ===== net_tcp_vs_udp (الفرق بين TCP و UDP) =====
  {
    id: 'net_019',
    question: 'ما هو البروتوكول الذي يُستخدم لنقل البريد الإلكتروني (SMTP)؟',
    options: [
      'UDP',
      'TCP',
      'HTTP',
      'FTP'
    ],
    correct: 2,
    topic: 'Network Basics',
    subSkill: 'net_tcp_vs_udp',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'SMTP (Simple Mail Transfer Protocol) يستخدم بروتوكول TCP لأنه يحتاج إلى اتصال موثوق (Reliable) لضمان وصول الرسائل بشكل صحيح.'
  },
  {
    id: 'net_020',
    question: 'ما هو الفرق الرئيسي بين TCP و UDP؟',
    options: [
      'TCP أسرع من UDP',
      'UDP يوفر اتصالاً موثوقًا (Reliable) بينما TCP لا يوفر',
      'TCP يوفر اتصالاً موثوقًا (Reliable) بينما UDP لا يوفر',
      'لا يوجد فرق بينهما'
    ],
    correct: 3,
    topic: 'Network Basics',
    subSkill: 'net_tcp_vs_udp',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'TCP يوفر اتصالاً موثوقًا (مضمون) مع إعادة إرسال الحزم المفقودة، بينما UDP لا يوفر ضمانًا للوصول (غير موثوق) لكنه أسرع.'
  },
  {
    id: 'net_021',
    question: 'أي من التالي يُعد مثالاً لتطبيق يستخدم بروتوكول UDP؟',
    options: [
      'البريد الإلكتروني (SMTP)',
      'تصفح الويب (HTTP)',
      'نقل الملفات (FTP)',
      'مكالمات الفيديو عبر الإنترنت (VoIP)'
    ],
    correct: 4,
    topic: 'Network Basics',
    subSkill: 'net_tcp_vs_udp',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'application',
    explanation: 'VoIP (مكالمات الصوت والفيديو) تستخدم UDP لأن السرعة مهمة أكثر من الموثوقية، وفقدان بعض الحزم مقبول مقارنة بالتأخير.'
  },
  {
    id: 'net_022',
    question: 'لماذا يُفضل استخدام UDP في تطبيقات البث المباشر (Streaming) والألعاب عبر الإنترنت؟',
    options: [
      'لأن UDP يوفر موثوقية عالية',
      'لأن UDP أسرع ولا ينتظر تأكيد وصول الحزم',
      'لأن UDP يستخدم تشفيرًا أفضل',
      'لأن UDP يدعم اتصالات متعددة في نفس الوقت'
    ],
    correct: 2,
    topic: 'Network Basics',
    subSkill: 'net_tcp_vs_udp',
    cognitiveLevel: 'analyzing',
    difficulty: 3,
    errorPattern: 'conceptual',
    explanation: 'UDP أسرع لأنه لا يقوم بإعادة إرسال الحزم المفقودة ولا ينتظر تأكيدًا، مما يقلل من التأخير (Latency) وهو أمر مهم جدًا للألعاب والبث المباشر.'
  },

  // ===== net_vlan (مفهوم VLAN) =====
  {
    id: 'net_023',
    question: 'ما هي VLAN (Virtual Local Area Network)؟',
    options: [
      'شبكة لاسلكية افتراضية',
      'شبكة محلية افتراضية تعزل حركة المرور داخل نفس السويتش',
      'نوع من أنواع الكابلات',
      'بروتوكول توجيه'
    ],
    correct: 2,
    topic: 'Network Basics',
    subSkill: 'net_vlan',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'VLAN هي شبكة محلية افتراضية تسمح بتقسيم شبكة سويتش واحدة إلى شبكات منطقية منفصلة، مما يحسن الأمان والأداء ويقلل من حركة البث (Broadcast).'
  },
  {
    id: 'net_024',
    question: 'ما هي الفائدة الرئيسية من استخدام VLANs في الشبكة؟',
    options: [
      'زيادة سرعة الإنترنت',
      'تحسين الأمان وتقليل حركة البث (Broadcast)',
      'توصيل أجهزة بمسافات بعيدة',
      'توفير الطاقة'
    ],
    correct: 2,
    topic: 'Network Basics',
    subSkill: 'net_vlan',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'VLANs تحسن الأمان (بعزل الأقسام المختلفة) وتقلل من حركة البث (Broadcast) التي قد تستهلك عرض النطاق الترددي وتؤثر على الأداء.'
  },
  {
    id: 'net_025',
    question: 'كيف يتم التواصل بين شبكتي VLAN مختلفتين؟',
    options: [
      'لا يمكن التواصل بين VLANs أبدًا',
      'من خلال راوتر (Router) أو سويتش متعدد الطبقات (L3 Switch)',
      'من خلال كابل خاص',
      'من خلال بروتوكول STP'
    ],
    correct: 2,
    topic: 'Network Basics',
    subSkill: 'net_vlan',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'application',
    explanation: 'لتواصل VLANs مع بعضها البعض (Inter-VLAN Routing)، نحتاج إلى راوتر أو سويتش من الطبقة الثالثة (L3 Switch) يقوم بتوجيه حركة المرور بين الـ VLANs المختلفة.'
  },
  {
    id: 'net_026',
    question: 'أي من التالي يُمثل استخدامًا عمليًا لـ VLANs في شركة؟',
    options: [
      'فصل شبكة الموظفين عن شبكة الضيوف',
      'توصيل جميع الأجهزة بنفس الشبكة',
      'زيادة سرعة الـ Wi-Fi',
      'تقليل عدد الكابلات المستخدمة'
    ],
    correct: 1,
    topic: 'Network Basics',
    subSkill: 'net_vlan',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'application',
    explanation: 'من أكثر الاستخدامات شيوعًا لـ VLANs هو فصل شبكة الموظفين عن شبكة الضيوف، مما يعزز الأمان ويمنع وصول الضيوف إلى موارد الشركة الحساسة.'
  },

  // ===== net_vpn (مفهوم VPN) =====
  {
    id: 'net_027',
    question: 'ما هي VPN (Virtual Private Network)؟',
    options: [
      'شبكة خاصة افتراضية تؤمن الاتصال عبر الإنترنت',
      'نوع من أنواع الكابلات',
      'بروتوكول توجيه داخلي',
      'شبكة لاسلكية'
    ],
    correct: 1,
    topic: 'Network Basics',
    subSkill: 'net_vpn',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'conceptual',
    explanation: 'VPN هي شبكة خاصة افتراضية تنشئ نفقًا مشفرًا (Encrypted Tunnel) عبر شبكة عامة مثل الإنترنت، مما يضمن خصوصية وأمان البيانات.'
  },
  {
    id: 'net_028',
    question: 'ما هي الفائدة الرئيسية من استخدام VPN للموظفين الذين يعملون عن بُعد؟',
    options: [
      'زيادة سرعة الإنترنت',
      'تأمين الاتصال بالشبكة الداخلية للشركة وحماية البيانات',
      'تقليل تكلفة الإنترنت',
      'زيادة عدد المستخدمين'
    ],
    correct: 2,
    topic: 'Network Basics',
    subSkill: 'net_vpn',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'VPN تسمح للموظفين عن بُعد بالاتصال بشبكة الشركة الداخلية بشكل آمن ومشفر، مما يحمي البيانات الحساسة من التنصت أو الاختراق.'
  },
  {
    id: 'net_029',
    question: 'أي من التالي يُمثل نوعًا من أنواع VPN؟',
    options: [
      'SSL VPN',
      'UTP VPN',
      'HTTP VPN',
      'FTP VPN'
    ],
    correct: 1,
    topic: 'Network Basics',
    subSkill: 'net_vpn',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'SSL VPN (Secure Sockets Layer VPN) هو أحد أنواع VPN التي تستخدم بروتوكول SSL لتأمين الاتصال، وعادةً ما يتم الوصول إليها عبر متصفح الويب.'
  },
  {
    id: 'net_030',
    question: 'في VPN، ما هو مفهوم "النفق" (Tunneling)؟',
    options: [
      'نقل البيانات عبر كابل خاص',
      'تغليف البيانات داخل حزم أخرى لنقلها عبر شبكة عامة بأمان',
      'تشفير البيانات فقط',
      'ضغط البيانات لتسريع النقل'
    ],
    correct: 2,
    topic: 'Network Basics',
    subSkill: 'net_vpn',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'النفق (Tunneling) في VPN يعني تغليف حزم البيانات الأصلية داخل حزم أخرى (Encapsulation) بحيث يتم نقلها عبر شبكة عامة بشكل آمن ومشفر، وكأنها تمر عبر نفق خاص.'

  // ============================================================
  // 🔷 المحور الثاني: IPv4 (30 سؤال)
  // المهارات الفرعية: ipv4_structure, ipv4_classes, ipv4_public_private,
  // ipv4_subnet_mask, ipv4_subnetting_calc, ipv4_network_id, ipv4_broadcast
  // ============================================================
  // ===== ipv4_structure (بنية عنوان IPv4) =====
  {
    id: 'ipv4_001',
    question: 'كم عدد الأوكتتات (Octets) في عنوان IPv4؟',
    options: ['2', '4', '6', '8'],
    correct: 2,
    topic: 'IPv4',
    subSkill: 'ipv4_structure',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'عنوان IPv4 يتكون من 4 أوكتتات، كل أوكتت يتكون من 8 بتات، مما يعطي عنوانًا بطول 32 بت.'
  },
  {
    id: 'ipv4_002',
    question: 'أي من التالي يُمثل تمثيلاً صحيحًا لعنوان IPv4 بالنظام العشري المنقط؟',
    options: ['192.168.1.1', '192.168.1.256', '192.168.1.1.1', '192.168.1'],
    correct: 1,
    topic: 'IPv4',
    subSkill: 'ipv4_structure',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'conceptual',
    explanation: 'عنوان IPv4 الصحيح يتكون من 4 أرقام عشرية (0-255) مفصولة بنقاط، مثل 192.168.1.1'
  },
  {
    id: 'ipv4_003',
    question: 'ما هو المدى الصحيح لقيمة كل أوكتت في عنوان IPv4؟',
    options: ['0-127', '0-255', '1-256', '0-512'],
    correct: 2,
    topic: 'IPv4',
    subSkill: 'ipv4_structure',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'كل أوكتت في IPv4 يتكون من 8 بتات، لذا فإن قيمته تتراوح بين 0 و 255 (أي 2^8 - 1).'
  },
  {
    id: 'ipv4_004',
    question: 'ما هو التمثيل الثنائي للعدد العشري 192؟',
    options: ['11000000', '10101010', '11110000', '10000000'],
    correct: 1,
    topic: 'IPv4',
    subSkill: 'ipv4_structure',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: '192 في النظام الثنائي = 11000000 (128 + 64)'
  },
  {
    id: 'ipv4_005',
    question: 'ما هو التمثيل العشري للعدد الثنائي 10101100؟',
    options: ['172', '128', '200', '150'],
    correct: 1,
    topic: 'IPv4',
    subSkill: 'ipv4_structure',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: '10101100 = 128 + 32 + 8 + 4 = 172'
  },

  // ===== ipv4_classes (تصنيفات العناوين) =====
  {
    id: 'ipv4_006',
    question: 'أي من العناوين التالية ينتمي إلى الفئة Class A؟',
    options: ['10.0.0.1', '192.168.1.1', '172.16.0.1', '224.0.0.1'],
    correct: 1,
    topic: 'IPv4',
    subSkill: 'ipv4_classes',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'الفئة Class A تشمل العناوين من 0.0.0.0 إلى 127.255.255.255، لذا 10.0.0.1 هو عنوان Class A.'
  },
  {
    id: 'ipv4_007',
    question: 'ما هو نطاق العناوين الخاصة بالفئة Class C حسب RFC 1918؟',
    options: ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', '169.254.0.0/16'],
    correct: 3,
    topic: 'IPv4',
    subSkill: 'ipv4_public_private',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'العناوين الخاصة Class C هي 192.168.0.0/16 (من 192.168.0.0 إلى 192.168.255.255)'
  },
  {
    id: 'ipv4_008',
    question: 'أي من التالي يُمثل قناع الشبكة الافتراضي (Default Subnet Mask) للفئة Class B؟',
    options: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.255'],
    correct: 2,
    topic: 'IPv4',
    subSkill: 'ipv4_subnet_mask',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'القناع الافتراضي للفئة Class B هو 255.255.0.0 (/16)'
  },
  {
    id: 'ipv4_009',
    question: 'ما هو عنوان Loopback في IPv4؟',
    options: ['127.0.0.1', '0.0.0.0', '255.255.255.255', '192.0.2.1'],
    correct: 1,
    topic: 'IPv4',
    subSkill: 'ipv4_public_private',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'عنوان Loopback هو 127.0.0.1 ويستخدم لاختبار اتصال الجهاز بنفسه.'
  },

  // ===== ipv4_subnetting_calc (حسابات Subnetting) =====
  {
    id: 'ipv4_010',
    question: 'ما هو عنوان الشبكة (Network ID) للعنوان 192.168.1.45/24؟',
    options: ['192.168.1.0', '192.168.1.45', '192.168.0.0', '192.168.1.255'],
    correct: 1,
    topic: 'IPv4',
    subSkill: 'ipv4_network_id',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: 'لحساب Network ID، نقوم بعمل AND بين IP وقناع الشبكة. 192.168.1.45 AND 255.255.255.0 = 192.168.1.0'
  },
  {
    id: 'ipv4_011',
    question: 'ما هو عنوان البث (Broadcast Address) للشبكة 192.168.1.0/24؟',
    options: ['192.168.1.0', '192.168.1.255', '192.168.1.1', '192.168.0.255'],
    correct: 2,
    topic: 'IPv4',
    subSkill: 'ipv4_broadcast',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: 'عنوان البث هو أعلى عنوان في الشبكة، حيث تكون جميع بتات Host = 1. للشبكة /24، البث = 192.168.1.255'
  },
  {
    id: 'ipv4_012',
    question: 'كم عدد العناوين الصالحة (Usable Hosts) في شبكة /24؟',
    options: ['254', '255', '256', '253'],
    correct: 1,
    topic: 'IPv4',
    subSkill: 'ipv4_subnetting_calc',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: '2^(عدد بتات Host) - 2 = 2^8 - 2 = 256 - 2 = 254 عنواناً صالحاً (Network ID و Broadcast محجوزان).'
  },
  {
    id: 'ipv4_013',
    question: 'إذا كان لدينا قناع شبكة 255.255.255.240، فما هو عدد بتات Host؟',
    options: ['4', '8', '12', '16'],
    correct: 1,
    topic: 'IPv4',
    subSkill: 'ipv4_subnet_mask',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: '240 = 11110000، إذن عدد بتات Host = 4 بتات (الأصفار).'
  },
  {
    id: 'ipv4_014',
    question: 'ما هو ترميز CIDR لقناع الشبكة 255.255.255.0؟',
    options: ['/8', '/16', '/24', '/32'],
    correct: 3,
    topic: 'IPv4',
    subSkill: 'ipv4_subnet_mask',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: '255.255.255.0 = 24 بت من 1، لذا الترميز هو /24'
  },
  {
    id: 'ipv4_015',
    question: 'ما هو العدد الإجمالي للشبكات الفرعية في عنوان Class C مع قناع /27؟',
    options: ['4', '6', '8', '12'],
    correct: 3,
    topic: 'IPv4',
    subSkill: 'ipv4_subnetting_calc',
    cognitiveLevel: 'applying',
    difficulty: 3,
    errorPattern: 'calculation',
    explanation: 'في Class C، بتات الشبكة = 24 بت. /27 يعني استلاف 3 بتات (27-24=3). عدد الشبكات = 2^3 = 8 شبكات.'
  },
  {
    id: 'ipv4_016',
    question: 'ما هو Increment (الزيادة) في عنوان IP عند استخدام قناع 255.255.255.240؟',
    options: ['16', '32', '64', '128'],
    correct: 1,
    topic: 'IPv4',
    subSkill: 'ipv4_subnetting_calc',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: 'القناع 255.255.255.240 = /28، 2^(28-24) = 2^4 = 16. الزيادة = 16.'
  },
  {
    id: 'ipv4_017',
    question: 'ما هو عنوان الشبكة (Network ID) للعنوان 172.16.5.10/20؟',
    options: ['172.16.0.0', '172.16.5.0', '172.16.16.0', '172.16.5.10'],
    correct: 1,
    topic: 'IPv4',
    subSkill: 'ipv4_network_id',
    cognitiveLevel: 'applying',
    difficulty: 3,
    errorPattern: 'calculation',
    explanation: 'القناع /20 = 255.255.240.0، نقوم بعمل AND: 172.16.5.10 AND 255.255.240.0 = 172.16.0.0'
  },
  {
    id: 'ipv4_018',
    question: 'ما هو عنوان البث (Broadcast) للشبكة 172.16.0.0/20؟',
    options: ['172.16.15.255', '172.16.255.255', '172.16.0.255', '172.16.16.255'],
    correct: 1,
    topic: 'IPv4',
    subSkill: 'ipv4_broadcast',
    cognitiveLevel: 'applying',
    difficulty: 3,
    errorPattern: 'calculation',
    explanation: 'الشبكة /20 تمتد من 172.16.0.0 إلى 172.16.15.255، لذا البث = 172.16.15.255'
  },
  {
    id: 'ipv4_019',
    question: 'كم عدد العناوين الصالحة في شبكة 172.16.0.0/20؟',
    options: ['4094', '4096', '2046', '8190'],
    correct: 1,
    topic: 'IPv4',
    subSkill: 'ipv4_subnetting_calc',
    cognitiveLevel: 'applying',
    difficulty: 3,
    errorPattern: 'calculation',
    explanation: '2^(32-20) - 2 = 2^12 - 2 = 4096 - 2 = 4094'
  },

  // ===== ipv4_public_private (عناوين عامة وخاصة) =====
  {
    id: 'ipv4_020',
    question: 'أي من العناوين التالية هو عنوان خاص (Private)؟',
    options: ['8.8.8.8', '172.16.0.1', '192.0.2.1', '203.0.113.1'],
    correct: 2,
    topic: 'IPv4',
    subSkill: 'ipv4_public_private',
    cognitiveLevel: 'understanding',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: '172.16.0.1 يقع ضمن النطاق الخاص 172.16.0.0/12 (من 172.16.0.0 إلى 172.31.255.255)'
  },
  {
    id: 'ipv4_021',
    question: 'ما هو عنوان Link-Local (APIPA) في IPv4؟',
    options: ['169.254.0.0/16', '127.0.0.0/8', '10.0.0.0/8', '192.168.0.0/16'],
    correct: 1,
    topic: 'IPv4',
    subSkill: 'ipv4_public_private',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'Link-Local (APIPA) هو النطاق 169.254.0.0/16، ويُخصص تلقائيًا عندما لا يتمكن الجهاز من الحصول على عنوان من DHCP.'
  },
  {
    id: 'ipv4_022',
    question: 'ما هو الفرق بين العنوان العام (Public) والعنوان الخاص (Private)؟',
    options: [
      'العنوان العام لا يمكن تكراره، بينما الخاص يمكن تكراره داخليًا',
      'العنوان الخاص لا يمكن تكراره، بينما العام يمكن تكراره',
      'كلاهما يمكن تكراره',
      'العام يستخدم داخل الشركات فقط'
    ],
    correct: 1,
    topic: 'IPv4',
    subSkill: 'ipv4_public_private',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'العناوين العامة فريدة على الإنترنت ولا يمكن تكرارها، بينما العناوين الخاصة يمكن تكرارها داخل شبكات داخلية مختلفة (مثل استخدام 192.168.1.0 في آلاف الشركات).'
  },

  // ============================================================
  // 🔷 المحور الثالث: IPv6 (20 سؤال)
  // المهارات الفرعية: ipv6_structure, ipv6_types, ipv6_shorten, ipv6_vs_ipv4
  // ============================================================
  {
    id: 'ipv6_001',
    question: 'كم عدد البتات في عنوان IPv6؟',
    options: ['32', '64', '128', '256'],
    correct: 3,
    topic: 'IPv6',
    subSkill: 'ipv6_structure',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'عنوان IPv6 يتكون من 128 بت (أي 16 بايت) مقارنة بـ 32 بت في IPv4.'
  },
  {
    id: 'ipv6_002',
    question: 'كم عدد المجموعات (التي تفصلها النقطتان : ) في عنوان IPv6؟',
    options: ['4', '6', '8', '10'],
    correct: 3,
    topic: 'IPv6',
    subSkill: 'ipv6_structure',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'عنوان IPv6 يتكون من 8 مجموعات، كل مجموعة مكونة من 4 أرقام سداسية عشرية (16 بت).'
  },
  {
    id: 'ipv6_003',
    question: 'ما هو التمثيل الصحيح لعنوان IPv6 مع اختصار الأصفار المتتالية؟',
    options: ['2001:0db8::1', '2001:0db8:0000:0000:0000:0000:0000:0001', '2001:db8::1', '2001:0db8:0:0:0:0:0:1'],
    correct: 1,
    topic: 'IPv6',
    subSkill: 'ipv6_shorten',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'application',
    explanation: 'يمكن اختصار الأصفار المتتالية في IPv6 باستخدام :: مرة واحدة فقط. 2001:0db8::1 هو الشكل الصحيح.'
  },
  {
    id: 'ipv6_004',
    question: 'ما هو نوع عنوان IPv6 الذي يبدأ بـ FE80::؟',
    options: ['Global Unicast', 'Unique Local', 'Link-Local', 'Multicast'],
    correct: 3,
    topic: 'IPv6',
    subSkill: 'ipv6_types',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'FE80::/10 هو نطاق Link-Local في IPv6، يُستخدم للاتصال داخل نفس الشبكة المحلية فقط.'
  },
  {
    id: 'ipv6_005',
    question: 'ما هو الفرق بين IPv4 و IPv6 من حيث عدد العناوين؟',
    options: [
      'IPv6 يوفر عناوين أكثر بـ 2^96 مرة من IPv4',
      'IPv6 يوفر ضعف عناوين IPv4',
      'IPv6 يوفر 10 أضعاف عناوين IPv4',
      'IPv6 و IPv4 لهما نفس عدد العناوين'
    ],
    correct: 1,
    topic: 'IPv6',
    subSkill: 'ipv6_vs_ipv4',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'IPv4 يوفر 2^32 عنوان (~4.3 مليار)، بينما IPv6 يوفر 2^128 عنوان (~3.4 × 10^38)، أي أكبر بـ 2^96 مرة.'
  },
  {
    id: 'ipv6_006',
    question: 'ما هو عنوان IPv6 الخاص بـ Loopback؟',
    options: ['::1', '::', 'FE80::1', 'FF02::1'],
    correct: 1,
    topic: 'IPv6',
    subSkill: 'ipv6_types',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'عنوان Loopback في IPv6 هو ::1 (أي 0:0:0:0:0:0:0:1).'
  },
  {
    id: 'ipv6_007',
    question: 'ما هو عنوان IPv6 غير المحدد (Unspecified Address)؟',
    options: ['::1', '::', 'FE80::1', 'FF02::1'],
    correct: 2,
    topic: 'IPv6',
    subSkill: 'ipv6_types',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'العنوان غير المحدد (::) يُستخدم عندما لا يكون للجهاز عنوان بعد، مثل طلب DHCPv6.'
  },
  {
    id: 'ipv6_008',
    question: 'ما هو نوع عنوان IPv6 الذي يبدأ بـ 2001::؟',
    options: ['Global Unicast', 'Link-Local', 'Unique Local', 'Multicast'],
    correct: 1,
    topic: 'IPv6',
    subSkill: 'ipv6_types',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: '2001:: هو نطاق Global Unicast (العناوين العامة القابلة للتوجيه على الإنترنت).'
  },
  {
    id: 'ipv6_009',
    question: 'ما هو عنوان IPv6 Multicast لجميع الأجهزة في الشبكة المحلية؟',
    options: ['FF02::1', 'FF02::2', 'FF02::1:1', 'FE80::1'],
    correct: 1,
    topic: 'IPv6',
    subSkill: 'ipv6_types',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'FF02::1 هو عنوان Multicast الذي يصل إلى جميع الأجهزة في الشبكة المحلية (All-nodes multicast).'
  },
  {
    id: 'ipv6_010',
    question: 'ما هو اختصار العنوان 2001:0db8:0000:0000:0000:0000:0000:0001؟',
    options: ['2001:db8::1', '2001:0db8::0001', '2001:db8:0:0:0:0:0:1', '2001:db8::01'],
    correct: 1,
    topic: 'IPv6',
    subSkill: 'ipv6_shorten',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'application',
    explanation: 'يمكن اختصار الأصفار المتتالية باستخدام ::، والقيام بحذف الأصفار غير المهمة. 2001:db8::1 هو الشكل المختصر الصحيح.'
  },
  {
    id: 'ipv6_011',
    question: 'ما هو الفرق بين SLAAC و DHCPv6 في IPv6؟',
    options: [
      'SLAAC هو بروتوكول توجيه، DHCPv6 بروتوكول عنونة',
      'SLAAC يوزع العناوين تلقائيًا بدون خادم، بينما DHCPv6 يحتاج خادم',
      'كلاهما نفس الشيء',
      'SLAAC أسرع من DHCPv6'
    ],
    correct: 2,
    topic: 'IPv6',
    subSkill: 'ipv6_vs_ipv4',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'SLAAC (Stateless Address Autoconfiguration) يسمح للأجهزة بتوليد عناوينها تلقائيًا باستخدام RA (Router Advertisement)، بينما DHCPv6 يحتاج خادمًا لتوزيع العناوين والمعلومات الإضافية.'
  },
  {
    id: 'ipv6_012',
    question: 'ما هو الفرق بين IPv6 و IPv4 في آلية الحصول على عنوان؟',
    options: [
      'IPv6 يستخدم DHCP حصريًا',
      'IPv6 يدعم SLAAC لتعيين العناوين تلقائيًا',
      'IPv4 يدعم SLAAC',
      'كلاهما يستخدم نفس الآلية'
    ],
    correct: 2,
    topic: 'IPv6',
    subSkill: 'ipv6_vs_ipv4',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'IPv6 يدعم SLAAC للحصول على عنوان تلقائيًا، بالإضافة إلى DHCPv6، بينما IPv4 يعتمد أساسًا على DHCP (مع وجود APIPA كحل احتياطي).'
  },
  {
    id: 'ipv6_013',
    question: 'ما هو المدى الصحيح لعنوان IPv6 2001:db8:1:2::3؟',
    options: [
      'Global Unicast',
      'Unique Local',
      'Link-Local',
      'Multicast'
    ],
    correct: 1,
    topic: 'IPv6',
    subSkill: 'ipv6_types',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'application',
    explanation: '2001:db8::/32 هو نطاق مخصص للتوثيق في Global Unicast، لذا هذا العنوان هو Global Unicast.'
  },
  {
    id: 'ipv6_014',
    question: 'ما هو الاختلاف في حجم عنوان IPv6 مقارنة بـ IPv4 بالبتات؟',
    options: [
      'IPv6 أكبر بـ 96 بت',
      'IPv6 أكبر بـ 64 بت',
      'IPv6 أصغر بـ 32 بت',
      'كلاهما متساويان'
    ],
    correct: 1,
    topic: 'IPv6',
    subSkill: 'ipv6_vs_ipv4',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'IPv6 = 128 بت، IPv4 = 32 بت، الفرق = 96 بت.'
  },
  {
    id: 'ipv6_015',
    question: 'أي من التالي يُعد عنوان IPv6 صحيحًا بعد الاختصار؟',
    options: ['2001:db8::1', '2001:0db8:0:0:0:0:0:1', '2001:db8:0:0:0:0:0:1', '2001:db8::0001'],
    correct: 1,
    topic: 'IPv6',
    subSkill: 'ipv6_shorten',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'application',
    explanation: '2001:db8::1 هو الشكل المختصر الصحيح والأكثر شيوعًا.'
  },

  // ============================================================
  // 🔷 المحور الرابع: Subnetting متقدم (30 سؤال)
  // المهارات الفرعية: subnet_cidr, subnet_calculation, subnet_network_id,
  // subnet_broadcast, subnet_hosts, subnet_vlsm
  // ============================================================
  {
    id: 'sub_001',
    question: 'ما هو قناع الشبكة (Subnet Mask) لـ /27؟',
    options: ['255.255.255.224', '255.255.255.240', '255.255.255.192', '255.255.255.248'],
    correct: 1,
    topic: 'Subnetting',
    subSkill: 'subnet_cidr',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: '/27 = 27 بت من 1، أي 255.255.255.224 (128+64+32).'
  },
  {
    id: 'sub_002',
    question: 'ما هو ترميز CIDR للقناع 255.255.255.240؟',
    options: ['/26', '/27', '/28', '/29'],
    correct: 3,
    topic: 'Subnetting',
    subSkill: 'subnet_cidr',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: '255.255.255.240 = 11111111.11111111.11111111.11110000، عدد البتات = 24 + 4 = 28، أي /28'
  },
  {
    id: 'sub_003',
    question: 'ما هو عدد الشبكات الفرعية في Class C عند استخدام قناع /28؟',
    options: ['8', '16', '32', '64'],
    correct: 2,
    topic: 'Subnetting',
    subSkill: 'subnet_calculation',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: 'Class C = 24 بت. /28 يعني استلاف 4 بتات (28-24=4). عدد الشبكات = 2^4 = 16.'
  },
  {
    id: 'sub_004',
    question: 'ما هو Increment (الزيادة) في عنوان IP عند استخدام قناع /28 في Class C؟',
    options: ['8', '16', '32', '64'],
    correct: 2,
    topic: 'Subnetting',
    subSkill: 'subnet_calculation',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: 'Increment = 2^(عدد بتات Host) = 2^(32-28) = 2^4 = 16.'
  },
  {
    id: 'sub_005',
    question: 'ما هو عنوان الشبكة (Network ID) للعنوان 192.168.1.45/28؟',
    options: ['192.168.1.32', '192.168.1.48', '192.168.1.40', '192.168.1.44'],
    correct: 1,
    topic: 'Subnetting',
    subSkill: 'subnet_network_id',
    cognitiveLevel: 'applying',
    difficulty: 3,
    errorPattern: 'calculation',
    explanation: 'القناع /28 = 255.255.255.240، الزيادة = 16. أقرب مضاعف لـ 16 أقل من 45 هو 32، Network ID = 192.168.1.32.'
  },
  {
    id: 'sub_006',
    question: 'ما هو عنوان البث (Broadcast) للشبكة 192.168.1.32/28؟',
    options: ['192.168.1.47', '192.168.1.48', '192.168.1.31', '192.168.1.63'],
    correct: 1,
    topic: 'Subnetting',
    subSkill: 'subnet_broadcast',
    cognitiveLevel: 'applying',
    difficulty: 3,
    errorPattern: 'calculation',
    explanation: 'الشبكة من 192.168.1.32 إلى 192.168.1.47، البث = 192.168.1.47.'
  },
  {
    id: 'sub_007',
    question: 'كم عدد العناوين الصالحة في شبكة 192.168.1.32/28؟',
    options: ['14', '16', '15', '13'],
    correct: 1,
    topic: 'Subnetting',
    subSkill: 'subnet_hosts',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: '2^(32-28) - 2 = 2^4 - 2 = 16 - 2 = 14 عنوانًا صالحًا.'
  },
  {
    id: 'sub_008',
    question: 'ما هو أصغر قناع شبكة (Subnet Mask) يمكن استخدامه لإيواء 50 جهازًا؟',
    options: ['/24', '/25', '/26', '/27'],
    correct: 3,
    topic: 'Subnetting',
    subSkill: 'subnet_hosts',
    cognitiveLevel: 'applying',
    difficulty: 3,
    errorPattern: 'application',
    explanation: 'لإيواء 50 جهازًا، نحتاج إلى 2^6 - 2 = 62 (أكبر من 50). إذن 6 بتات Host = /26. /26 يعطي 62 عنوانًا صالحًا.'
  },
  {
    id: 'sub_009',
    question: 'في VLSM، لماذا نستخدم أقنعة متغيرة الطول؟',
    options: [
      'لتوفير العناوين وتقليل الهدر',
      'زيادة سرعة الشبكة',
      'تقليل عدد الأجهزة',
      'تسهيل تركيب الكابلات'
    ],
    correct: 1,
    topic: 'Subnetting',
    subSkill: 'subnet_vlsm',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'VLSM (Variable Length Subnet Mask) يسمح باستخدام أقنعة مختلفة حسب حاجة كل شبكة فرعية، مما يقلل من هدر العناوين ويوفر كفاءة أفضل.'
  },
  {
    id: 'sub_010',
    question: 'ما هو عدد الشبكات الفرعية في Class B مع قناع /20؟',
    options: ['4', '8', '16', '32'],
    correct: 3,
    topic: 'Subnetting',
    subSkill: 'subnet_calculation',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: 'Class B = 16 بت. /20 يعني استلاف 4 بتات (20-16=4). عدد الشبكات = 2^4 = 16.'
  },
  {
    id: 'sub_011',
    question: 'ما هو عنوان الشبكة للعنوان 172.16.5.10/20؟',
    options: ['172.16.0.0', '172.16.5.0', '172.16.4.0', '172.16.8.0'],
    correct: 1,
    topic: 'Subnetting',
    subSkill: 'subnet_network_id',
    cognitiveLevel: 'applying',
    difficulty: 3,
    errorPattern: 'calculation',
    explanation: '/20 = 255.255.240.0، الزيادة = 16 في الأوكتت الثالث. 5 في الأوكتت الثالث أقل من 16، لذا Network ID = 172.16.0.0.'
  },
  {
    id: 'sub_012',
    question: 'ما هو نطاق العناوين الصالحة في الشبكة 172.16.0.0/20؟',
    options: [
      '172.16.0.1 - 172.16.15.254',
      '172.16.0.0 - 172.16.15.255',
      '172.16.0.1 - 172.16.16.254',
      '172.16.0.1 - 172.16.15.255'
    ],
    correct: 1,
    topic: 'Subnetting',
    subSkill: 'subnet_hosts',
    cognitiveLevel: 'applying',
    difficulty: 3,
    errorPattern: 'application',
    explanation: 'الشبكة من 172.16.0.0 إلى 172.16.15.255. العناوين الصالحة: من 172.16.0.1 إلى 172.16.15.254 (4094 عنوان).'
  },
  {
    id: 'sub_013',
    question: 'ما هو قناع الشبكة المناسب لشبكة تحتاج 30 عنوانًا صالحًا؟',
    options: ['/26', '/27', '/28', '/29'],
    correct: 2,
    topic: 'Subnetting',
    subSkill: 'subnet_hosts',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: '/27 = 2^5 - 2 = 30 عنوانًا صالحًا (لأن 2^5 = 32، ناقص 2 = 30).'
  },
  {
    id: 'sub_014',
    question: 'في VLSM، إذا كان لدينا شبكة 192.168.1.0/24 وأردنا تقسيمها إلى 4 شبكات بأحجام مختلفة (60، 30، 20، 10 أجهزة)، ما هو الترتيب الصحيح للتقسيم؟',
    options: [
      '/26، /27، /28، /29',
      '/25، /26، /27، /28',
      '/27، /28، /29، /30',
      '/24، /25، /26، /27'
    ],
    correct: 1,
    topic: 'Subnetting',
    subSkill: 'subnet_vlsm',
    cognitiveLevel: 'applying',
    difficulty: 3,
    errorPattern: 'application',
    explanation: 'لتوفير العناوين، نبدأ بالأكبر: 60 جهاز → /26 (62 عنوان)، 30 جهاز → /27 (30 عنوان)، 20 جهاز → /28 (14 عنوان غير كافٍ، لذا /27 أفضل)، 10 جهاز → /28 (14 عنوان). الترتيب الصحيح: /26، /27، /27، /28.'
  },
  {
    id: 'sub_015',
    question: 'ما هو ترميز CIDR الذي يعطي 8 شبكات فرعية في Class C؟',
    options: ['/25', '/26', '/27', '/28'],
    correct: 3,
    topic: 'Subnetting',
    subSkill: 'subnet_calculation',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: 'في Class C (24 بت)، عدد الشبكات = 2^(س - 24). نريد 8 = 2^3، إذن س-24=3، س=27.'
  },
  {
    id: 'sub_016',
    question: 'ما هو عنوان البث للشبكة 192.168.10.0/26؟',
    options: ['192.168.10.63', '192.168.10.64', '192.168.10.31', '192.168.10.255'],
    correct: 1,
    topic: 'Subnetting',
    subSkill: 'subnet_broadcast',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: 'زيادة /26 = 64. الشبكة الأولى: 192.168.10.0 - 192.168.10.63، البث = 192.168.10.63.'
  },
  {
    id: 'sub_017',
    question: 'ما هو Network ID للعنوان 192.168.10.70/26؟',
    options: ['192.168.10.64', '192.168.10.68', '192.168.10.72', '192.168.10.128'],
    correct: 1,
    topic: 'Subnetting',
    subSkill: 'subnet_network_id',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: 'زيادة /26 = 64. 70 تقع بين 64 و 128، لذا Network ID = 192.168.10.64.'
  },
  {
    id: 'sub_018',
    question: 'كم عدد العناوين الصالحة في شبكة /30؟',
    options: ['2', '4', '6', '8'],
    correct: 1,
    topic: 'Subnetting',
    subSkill: 'subnet_hosts',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: '/30 = 2^2 - 2 = 4 - 2 = 2 عنوانًا صالحًا (غالبًا ما يستخدم لربط نقطة إلى نقطة).'
  },
  {
    id: 'sub_019',
    question: 'ما هو القناع /29 في النظام العشري؟',
    options: ['255.255.255.248', '255.255.255.240', '255.255.255.252', '255.255.255.224'],
    correct: 1,
    topic: 'Subnetting',
    subSkill: 'subnet_cidr',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: '/29 = 255.255.255.248 (لأن 8 بتات للأوكتت الأخير، 8-3=5، 2^5=32، 256-8=248).'
  },
  {
    id: 'sub_020',
    question: 'ما هو الفرق بين FLSM و VLSM؟',
    options: [
      'FLSM يستخدم أقنعة ثابتة، بينما VLSM يستخدم أقنعة متغيرة حسب الحاجة',
      'FLSM أسرع من VLSM',
      'VLSM أقدم من FLSM',
      'لا يوجد فرق'
    ],
    correct: 1,
    topic: 'Subnetting',
    subSkill: 'subnet_vlsm',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'FLSM (Fixed Length Subnet Mask) يستخدم نفس القناع لجميع الشبكات الفرعية، بينما VLSM يسمح باستخدام أقنعة مختلفة حسب احتياجات كل شبكة فرعية.'
  },

  // ============================================================
  // 🔷 المحور الخامس: TCP/IP (25 سؤال)
  // المهارات الفرعية: tcpip_layers, tcpip_tcp_vs_udp, tcpip_handshake,
  // tcpip_http, tcpip_ports
  // ============================================================
  {
    id: 'tcpip_001',
    question: 'كم عدد طبقات نموذج TCP/IP؟',
    options: ['4', '5', '6', '7'],
    correct: 1,
    topic: 'TCP/IP',
    subSkill: 'tcpip_layers',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'نموذج TCP/IP يتكون من 4 طبقات: Network Access، Internet، Transport، Application.'
  },
  {
    id: 'tcpip_002',
    question: 'أي من التالي يمثل الطبقات الأربع لنموذج TCP/IP بالترتيب الصحيح من الأعلى إلى الأسفل؟',
    options: [
      'Application, Transport, Internet, Network Access',
      'Network Access, Internet, Transport, Application',
      'Application, Internet, Transport, Network Access',
      'Transport, Application, Internet, Network Access'
    ],
    correct: 1,
    topic: 'TCP/IP',
    subSkill: 'tcpip_layers',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'الترتيب الصحيح من الأعلى (الأقرب للمستخدم) إلى الأسفل: Application → Transport → Internet → Network Access.'
  },
  {
    id: 'tcpip_003',
    question: 'أي من البروتوكولات التالية يعمل في طبقة Application في TCP/IP؟',
    options: ['TCP', 'UDP', 'HTTP', 'IP'],
    correct: 3,
    topic: 'TCP/IP',
    subSkill: 'tcpip_layers',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'HTTP (Hypertext Transfer Protocol) يعمل في طبقة Application، بينما TCP و UDP في طبقة Transport، و IP في طبقة Internet.'
  },
  {
    id: 'tcpip_004',
    question: 'أي من البروتوكولات التالية يعمل في طبقة Transport في TCP/IP؟',
    options: ['HTTP', 'FTP', 'TCP', 'IP'],
    correct: 3,
    topic: 'TCP/IP',
    subSkill: 'tcpip_layers',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'TCP (Transmission Control Protocol) يعمل في طبقة Transport، بينما HTTP و FTP في طبقة Application، و IP في طبقة Internet.'
  },
  {
    id: 'tcpip_005',
    question: 'ما هو المنفذ الافتراضي لبروتوكول HTTP؟',
    options: ['21', '25', '80', '443'],
    correct: 3,
    topic: 'TCP/IP',
    subSkill: 'tcpip_ports',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'المنفذ الافتراضي لـ HTTP هو 80، بينما HTTPS يستخدم 443.'
  },
  {
    id: 'tcpip_006',
    question: 'ما هو المنفذ الافتراضي لبروتوكول HTTPS؟',
    options: ['80', '443', '8080', '8443'],
    correct: 2,
    topic: 'TCP/IP',
    subSkill: 'tcpip_ports',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'HTTPS يستخدم المنفذ 443 (المشفر).'
  },
  {
    id: 'tcpip_007',
    question: 'في Three-Way Handshake لـ TCP، ما هو الترتيب الصحيح للرسائل؟',
    options: [
      'SYN, SYN-ACK, ACK',
      'SYN-ACK, SYN, ACK',
      'ACK, SYN-ACK, SYN',
      'SYN, ACK, FIN'
    ],
    correct: 1,
    topic: 'TCP/IP',
    subSkill: 'tcpip_handshake',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'المصافحة الثلاثية: (1) SYN من العميل، (2) SYN-ACK من الخادم، (3) ACK من العميل.'
  },
  {
    id: 'tcpip_008',
    question: 'ما هو الهدف من Three-Way Handshake في TCP؟',
    options: [
      'تأسيس اتصال موثوق بين العميل والخادم',
      'إنهاء الاتصال',
      'نقل البيانات',
      'تشفير البيانات'
    ],
    correct: 1,
    topic: 'TCP/IP',
    subSkill: 'tcpip_handshake',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'Three-Way Handshake يُستخدم لتأسيس اتصال موثوق (Reliable) بين العميل والخادم قبل بدء نقل البيانات.'
  },
  {
    id: 'tcpip_009',
    question: 'أي من التالي هو الفرق بين TCP و UDP في آلية نقل البيانات؟',
    options: [
      'TCP يستخدم Three-Way Handshake، بينما UDP لا يستخدم',
      'UDP يستخدم Three-Way Handshake، بينما TCP لا يستخدم',
      'كلاهما يستخدم Three-Way Handshake',
      'كلاهما لا يستخدم Three-Way Handshake'
    ],
    correct: 1,
    topic: 'TCP/IP',
    subSkill: 'tcpip_tcp_vs_udp',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'TCP يستخدم Three-Way Handshake لتأسيس اتصال موثوق، بينما UDP هو بروتوكول غير موثوق (Connectionless) ولا يستخدم المصافحة.'
  },
  {
    id: 'tcpip_010',
    question: 'ما هو المنفذ الافتراضي لبروتوكول FTP؟',
    options: ['20', '21', '22', '23'],
    correct: 2,
    topic: 'TCP/IP',
    subSkill: 'tcpip_ports',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'FTP يستخدم المنفذ 21 للتحكم (Control) والمنفذ 20 للبيانات (Data).'
  },
  {
    id: 'tcpip_011',
    question: 'ما هو المنفذ الافتراضي لبروتوكول SSH؟',
    options: ['21', '22', '23', '25'],
    correct: 2,
    topic: 'TCP/IP',
    subSkill: 'tcpip_ports',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'SSH (Secure Shell) يستخدم المنفذ 22 للاتصال الآمن.'
  },
  {
    id: 'tcpip_012',
    question: 'ما هو المنفذ الافتراضي لبروتوكول DNS؟',
    options: ['53', '80', '443', '25'],
    correct: 1,
    topic: 'TCP/IP',
    subSkill: 'tcpip_ports',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'DNS (Domain Name System) يستخدم المنفذ 53.'
  },
  {
    id: 'tcpip_013',
    question: 'ما هو المنفذ الافتراضي لبروتوكول DHCP؟',
    options: ['67/68', '80', '443', '53'],
    correct: 1,
    topic: 'TCP/IP',
    subSkill: 'tcpip_ports',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'DHCP يستخدم المنفذ 67 (للخادم) والمنفذ 68 (للعميل).'
  },
  {
    id: 'tcpip_014',
    question: 'أي من التالي يُمثل ميزة UDP على TCP؟',
    options: [
      'موثوقية أعلى',
      'سرعة أعلى بسبب عدم وجود تأكيدات (Acknowledgments)',
      'إعادة إرسال الحزم المفقودة',
      'تأسيس اتصال قبل نقل البيانات'
    ],
    correct: 2,
    topic: 'TCP/IP',
    subSkill: 'tcpip_tcp_vs_udp',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'UDP أسرع من TCP لأنه لا ينتظر تأكيدات (ACK) ولا يعيد إرسال الحزم المفقودة، مما يقلل من التأخير.'
  },
  {
    id: 'tcpip_015',
    question: 'ما هو الفرق بين HTTP و HTTPS؟',
    options: [
      'HTTPS يستخدم تشفيرًا (SSL/TLS) بينما HTTP لا يستخدم',
      'HTTP أسرع من HTTPS',
      'HTTPS يستخدم منفذ مختلف',
      'جميع ما سبق صحيح'
    ],
    correct: 4,
    topic: 'TCP/IP',
    subSkill: 'tcpip_http',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'HTTPS = HTTP + SSL/TLS (تشفير). يستخدم المنفذ 443 (بينما HTTP يستخدم 80)، ويوفر أمانًا أعلى مع بعض التأخير في السرعة.'
  },

  // ============================================================
  // 🔷 المحور السادس: أجهزة الشبكات (25 سؤال)
  // المهارات الفرعية: device_switch, device_router, device_firewall,
  // device_access_point, device_hub_bridge
  // ============================================================
  {
    id: 'dev_001',
    question: 'ما هو الجهاز الذي يعمل في الطبقة الثانية (Layer 2) من نموذج OSI؟',
    options: ['Router', 'Switch', 'Hub', 'Firewall'],
    correct: 2,
    topic: 'Network Devices',
    subSkill: 'device_switch',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'الـ Switch يعمل في الطبقة الثانية (طبقة ربط البيانات) ويستخدم عناوين MAC لتوجيه الإطارات.'
  },
  {
    id: 'dev_002',
    question: 'ما هو الجهاز الذي يعمل في الطبقة الثالثة (Layer 3) من نموذج OSI؟',
    options: ['Switch', 'Hub', 'Router', 'Access Point'],
    correct: 3,
    topic: 'Network Devices',
    subSkill: 'device_router',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'الـ Router يعمل في الطبقة الثالثة (طبقة الشبكة) ويستخدم عناوين IP لتوجيه الحزم بين الشبكات.'
  },
  {
    id: 'dev_003',
    question: 'ما هو الفرق الرئيسي بين Hub و Switch؟',
    options: [
      'Hub أذكى من Switch',
      'Switch يتعلم عناوين MAC ويوجه الإطارات، بينما Hub يبث الإطارات إلى جميع المنافذ',
      'Hub يدعم VLANs بينما Switch لا يدعم',
      'لا يوجد فرق'
    ],
    correct: 2,
    topic: 'Network Devices',
    subSkill: 'device_hub_bridge',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'الـ Hub يبث البيانات إلى جميع المنافذ (غير ذكي)، بينما الـ Switch يتعلم عناوين MAC ويوجه الإطارات إلى المنفذ الصحيح فقط، مما يقلل من حركة المرور.'
  },
  {
    id: 'dev_004',
    question: 'ما هو الجدار الناري (Firewall)؟',
    options: [
      'جهاز لزيادة سرعة الإنترنت',
      'جهاز أو برنامج يتحكم في حركة المرور بين الشبكات بناءً على قواعد أمنية',
      'جهاز لتوزيع الشبكة اللاسلكية',
      'كابل خاص'
    ],
    correct: 2,
    topic: 'Network Devices',
    subSkill: 'device_firewall',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'conceptual',
    explanation: 'الجدار الناري هو جهاز أو برنامج يتحكم في حركة المرور الواردة والصادرة بناءً على مجموعة من القواعد الأمنية (ACLs).'
  },
  {
    id: 'dev_005',
    question: 'ما هو Access Point (AP) في الشبكات اللاسلكية؟',
    options: [
      'جهاز يوزع عناوين IP',
      'جهاز يربط الشبكات السلكية باللاسلكية',
      'جهاز لتوجيه الحزم بين الشبكات',
      'كابل خاص للواي فاي'
    ],
    correct: 2,
    topic: 'Network Devices',
    subSkill: 'device_access_point',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'Access Point هو جهاز يسمح للأجهزة اللاسلكية بالاتصال بشبكة سلكية، ويعمل كجسر بين الشبكتين.'
  },
  {
    id: 'dev_006',
    question: 'ما هو جدول MAC Address Table في الـ Switch؟',
    options: [
      'جدول يخزن عناوين IP',
      'جدول يربط عناوين MAC بالمنافذ (Ports) في السويتش',
      'جدول لتوجيه الحزم',
      'جدول لتشفير البيانات'
    ],
    correct: 2,
    topic: 'Network Devices',
    subSkill: 'device_switch',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'MAC Address Table (أو CAM Table) يربط كل عنوان MAC بمنفذ (Port) في السويتش، مما يسمح بتوجيه الإطارات إلى الوجهة الصحيحة فقط.'
  },
  {
    id: 'dev_007',
    question: 'ما هو الفرق بين Static Routing و Dynamic Routing؟',
    options: [
      'Static Routing يتم تكوينه يدويًا، بينما Dynamic Routing يتعلم المسارات تلقائيًا',
      'Dynamic Routing يتم تكوينه يدويًا، بينما Static يتعلم تلقائيًا',
      'كلاهما يتم تكوينه يدويًا',
      'لا يوجد فرق'
    ],
    correct: 1,
    topic: 'Network Devices',
    subSkill: 'device_router',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'Static Routing: يقوم المسؤول بتكوين المسارات يدويًا. Dynamic Routing: تستخدم بروتوكولات مثل OSPF و EIGRP لتعلم المسارات تلقائيًا.'
  },
  {
    id: 'dev_008',
    question: 'ما هو البروتوكول المستخدم لتوجيه الحزم بين الشبكات في الـ Router؟',
    options: ['ARP', 'IP', 'MAC', 'HTTP'],
    correct: 2,
    topic: 'Network Devices',
    subSkill: 'device_router',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'الـ Router يستخدم بروتوكول IP (Internet Protocol) لتوجيه الحزم بين الشبكات المختلفة.'
  },
  {
    id: 'dev_009',
    question: 'ما هي وظيفة Bridge في الشبكات؟',
    options: [
      'توصيل شبكتين مختلفتين من نفس النوع (مثل Ethernet إلى Ethernet)',
      'توجيه الحزم بين شبكات مختلفة',
      'توزيع الشبكة اللاسلكية',
      'توفير عناوين IP'
    ],
    correct: 1,
    topic: 'Network Devices',
    subSkill: 'device_hub_bridge',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'Bridge هو جهاز يربط بين شبكتين من نفس النوع (مثل Ethernet-Ethernet) ويعمل على تصفية حركة المرور بناءً على عناوين MAC.'
  },
  {
    id: 'dev_010',
    question: 'ما هو الفرق بين Switch من الطبقة الثانية (L2) و Switch من الطبقة الثالثة (L3)؟',
    options: [
      'L2 Switch يدعم التوجيه (Routing) بينما L3 لا يدعم',
      'L3 Switch يدعم التوجيه (Routing) بينما L2 لا يدعم',
      'كلاهما يدعم التوجيه',
      'كلاهما لا يدعم التوجيه'
    ],
    correct: 2,
    topic: 'Network Devices',
    subSkill: 'device_switch',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'L3 Switch يجمع بين وظائف السويتش (التوصيل) والراوتر (التوجيه)، حيث يمكنه توجيه حركة المرور بين VLANs المختلفة.'
  },
  {
    id: 'dev_011',
    question: 'ما هو نوع جدار الحماية الذي يُستخدم لحماية الشبكة الداخلية من الإنترنت؟',
    options: [
      'Firewall من نوع Next-Gen',
      'Firewall من نوع Stateful',
      'Firewall من نوع Network-based (يُوضع بين الشبكة الداخلية والإنترنت)',
      'Firewall من نوع Host-based'
    ],
    correct: 3,
    topic: 'Network Devices',
    subSkill: 'device_firewall',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'application',
    explanation: 'Network-based Firewall (أو Perimeter Firewall) يُوضع بين الشبكة الداخلية والإنترنت لحماية الشبكة بأكملها من الهجمات الخارجية.'
  },

  // ============================================================
  // 🔷 المحور السابع: بروتوكولات البريد الإلكتروني (20 سؤال)
  // المهارات الفرعية: email_smtp, email_pop3, email_imap, email_ports
  // ============================================================
  {
    id: 'email_001',
    question: 'ما هو بروتوكول SMTP المستخدم له؟',
    options: [
      'إرسال البريد الإلكتروني',
      'استقبال البريد الإلكتروني',
      'تصفح الويب',
      'نقل الملفات'
    ],
    correct: 1,
    topic: 'Email Protocols',
    subSkill: 'email_smtp',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'SMTP (Simple Mail Transfer Protocol) يُستخدم لإرسال البريد الإلكتروني من العميل إلى الخادم، وبين الخوادم.'
  },
  {
    id: 'email_002',
    question: 'ما هو بروتوكول POP3 المستخدم له؟',
    options: [
      'إرسال البريد الإلكتروني',
      'استقبال البريد الإلكتروني وتنزيله على الجهاز',
      'تصفح الويب',
      'تشفير البريد'
    ],
    correct: 2,
    topic: 'Email Protocols',
    subSkill: 'email_pop3',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'POP3 (Post Office Protocol 3) يُستخدم لاستقبال البريد الإلكتروني وتنزيله من الخادم إلى الجهاز (عادةً يتم حذفه من الخادم بعد التنزيل).'
  },
  {
    id: 'email_003',
    question: 'ما هو الفرق الرئيسي بين POP3 و IMAP؟',
    options: [
      'POP3 يحتفظ بالبريد على الخادم دائمًا، بينما IMAP ينزله على الجهاز',
      'IMAP يحتفظ بالبريد على الخادم ويسمح بالمزامنة بين الأجهزة، بينما POP3 ينزل البريد على جهاز واحد',
      'POP3 أسرع من IMAP',
      'لا يوجد فرق'
    ],
    correct: 2,
    topic: 'Email Protocols',
    subSkill: 'email_imap',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'IMAP (Internet Message Access Protocol) يحتفظ بالبريد على الخادم ويسمح بالوصول من عدة أجهزة مع المزامنة، بينما POP3 ينزل البريد إلى جهاز واحد (عادةً مع حذفه من الخادم).'
  },
  {
    id: 'email_004',
    question: 'ما هو المنفذ الافتراضي لـ SMTP غير المشفر؟',
    options: ['25', '465', '587', '995'],
    correct: 1,
    topic: 'Email Protocols',
    subSkill: 'email_ports',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'SMTP غير المشفر يستخدم المنفذ 25.'
  },
  {
    id: 'email_005',
    question: 'ما هو المنفذ الافتراضي المشفر (SSL/TLS) لـ SMTP؟',
    options: ['25', '465', '587', '995'],
    correct: 2,
    topic: 'Email Protocols',
    subSkill: 'email_ports',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'SMTP المشفر (SMTPS) يستخدم المنفذ 465 (SSL) أو 587 (TLS).'
  },
  {
    id: 'email_006',
    question: 'ما هو المنفذ الافتراضي لـ POP3 غير المشفر؟',
    options: ['110', '143', '993', '995'],
    correct: 1,
    topic: 'Email Protocols',
    subSkill: 'email_ports',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'POP3 غير المشفر يستخدم المنفذ 110.'
  },
  {
    id: 'email_007',
    question: 'ما هو المنفذ الافتراضي المشفر (SSL/TLS) لـ POP3؟',
    options: ['110', '143', '993', '995'],
    correct: 4,
    topic: 'Email Protocols',
    subSkill: 'email_ports',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'POP3 المشفر (POP3S) يستخدم المنفذ 995.'
  },
  {
    id: 'email_008',
    question: 'ما هو المنفذ الافتراضي لـ IMAP غير المشفر؟',
    options: ['110', '143', '993', '995'],
    correct: 2,
    topic: 'Email Protocols',
    subSkill: 'email_ports',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'IMAP غير المشفر يستخدم المنفذ 143.'
  },
  {
    id: 'email_009',
    question: 'ما هو المنفذ الافتراضي المشفر (SSL/TLS) لـ IMAP؟',
    options: ['110', '143', '993', '995'],
    correct: 3,
    topic: 'Email Protocols',
    subSkill: 'email_ports',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'IMAP المشفر (IMAPS) يستخدم المنفذ 993.'
  },
  {
    id: 'email_010',
    question: 'في أي سيناريو يُفضل استخدام IMAP بدلاً من POP3؟',
    options: [
      'عند استخدام جهاز واحد فقط',
      'عند الوصول إلى البريد من عدة أجهزة (هاتف، جهاز لوحي، كمبيوتر)',
      'عند الحاجة إلى سرعة عالية',
      'عند عدم توفر اتصال بالإنترنت'
    ],
    correct: 2,
    topic: 'Email Protocols',
    subSkill: 'email_imap',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'application',
    explanation: 'IMAP مثالي للمستخدمين الذين يصلون إلى البريد من عدة أجهزة لأنه يحتفظ بالبريد على الخادم ويوفر المزامنة بين الأجهزة.'
  },

  // ============================================================
  // 🔷 المحور الثامن: الشبكات اللاسلكية والأمن (20 سؤال)
  // المهارات الفرعية: wireless_principles, wireless_security,
  // security_acls, security_vpn
  // ============================================================
  {
    id: 'sec_001',
    question: 'ما هو SSID في الشبكات اللاسلكية؟',
    options: [
      'اسم الشبكة اللاسلكية',
      'كلمة مرور الشبكة',
      'نوع التشفير المستخدم',
      'عنوان MAC للـ Access Point'
    ],
    correct: 1,
    topic: 'Wireless & Security',
    subSkill: 'wireless_principles',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'SSID (Service Set Identifier) هو اسم الشبكة اللاسلكية الذي يظهر للمستخدمين عند البحث عن شبكات Wi-Fi.'
  },
  {
    id: 'sec_002',
    question: 'ما هو بروتوكول الأمان اللاسلكي الأحدث والأكثر أمانًا؟',
    options: ['WEP', 'WPA', 'WPA2', 'WPA3'],
    correct: 4,
    topic: 'Wireless & Security',
    subSkill: 'wireless_security',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'WPA3 هو أحدث بروتوكول أمان لاسلكي، يوفر تشفيرًا أقوى وحماية أفضل ضد هجمات القوة العمياء (Brute-Force).'
  },
  {
    id: 'sec_003',
    question: 'ما هي القنوات غير المتداخلة في نطاق 2.4 GHz؟',
    options: [
      'القنوات 1، 6، 11',
      'القنوات 1، 3، 5',
      'القنوات 1، 4، 7',
      'جميع القنوات غير متداخلة'
    ],
    correct: 1,
    topic: 'Wireless & Security',
    subSkill: 'wireless_principles',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'في نطاق 2.4 GHz، القنوات 1، 6، و11 هي الوحيدة غير المتداخلة، مما يسمح باستخدامها دون تداخل مع بعضها البعض.'
  },
  {
    id: 'sec_004',
    question: 'ما هي الفائدة من استخدام نطاق 5 GHz مقارنة بـ 2.4 GHz في الـ Wi-Fi؟',
    options: [
      'نطاق 5 GHz يوفر سرعة أعلى ولكن مدى أقصر',
      'نطاق 5 GHz يوفر مدى أطول ولكن سرعة أقل',
      'نطاق 5 GHz هو الأقدم',
      'لا يوجد فرق'
    ],
    correct: 1,
    topic: 'Wireless & Security',
    subSkill: 'wireless_principles',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'نطاق 5 GHz يوفر سرعات أعلى (Bandwidth أكبر) وتداخلاً أقل، لكن مداه أقصر مقارنة بـ 2.4 GHz الذي يخترق الجدران بشكل أفضل.'
  },
  {
    id: 'sec_005',
    question: 'ما هي وظيفة ACLs (Access Control Lists) في جدار الحماية؟',
    options: [
      'تحديد عناوين IP المسموح بها فقط',
      'تحديد قواعد التحكم في حركة المرور (من يسمح له ومن يمنع)',
      'تشفير البيانات',
      'توزيع عناوين IP'
    ],
    correct: 2,
    topic: 'Wireless & Security',
    subSkill: 'security_acls',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'ACLs هي قواعد تُستخدم في جدران الحماية والراوترات لتحديد حركة المرور المسموح بها والممنوعة بناءً على عناوين IP، المنافذ، والبروتوكولات.'
  },
  {
    id: 'sec_006',
    question: 'ما هو الفرق بين Standard ACL و Extended ACL؟',
    options: [
      'Standard ACL يتحكم بناءً على عنوان IP المصدر فقط، بينما Extended يتحكم بناءً على المصدر، الوجهة، والمنفذ',
      'Extended ACL أقدم من Standard',
      'Standard ACL أكثر أمانًا',
      'لا يوجد فرق'
    ],
    correct: 1,
    topic: 'Wireless & Security',
    subSkill: 'security_acls',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'Standard ACL يتحكم في حركة المرور بناءً على عنوان IP المصدر فقط، بينما Extended ACL يتحكم بناءً على المصدر، الوجهة، المنفذ، والبروتوكول (أكثر دقة ومرونة).'
  },
  {
    id: 'sec_007',
    question: 'ما هو نوع VPN الذي يُستخدم لتأمين الاتصال بين فروع شركة مختلفة عبر الإنترنت؟',
    options: [
      'Site-to-Site VPN',
      'Remote Access VPN',
      'SSL VPN',
      'IPSec VPN'
    ],
    correct: 1,
    topic: 'Wireless & Security',
    subSkill: 'security_vpn',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'application',
    explanation: 'Site-to-Site VPN يُستخدم لربط شبكات كاملة (مثل فروع شركة) ببعضها البعض عبر الإنترنت بشكل آمن.'
  },
  {
    id: 'sec_008',
    question: 'ما هو بروتوكول التشفير المستخدم في WPA2؟',
    options: ['WEP', 'TKIP', 'AES', 'RC4'],
    correct: 3,
    topic: 'Wireless & Security',
    subSkill: 'wireless_security',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'WPA2 يستخدم تشفير AES (Advanced Encryption Standard) وهو أقوى من TKIP المستخدم في WPA.'
  },
  {
    id: 'sec_009',
    question: 'ما هو الهدف من استخدام VLANs في الشبكات اللاسلكية؟',
    options: [
      'فصل حركة المرور بين مجموعات المستخدمين المختلفة (مثل الموظفين والضيوف)',
      'زيادة سرعة الـ Wi-Fi',
      'تقليل عدد نقاط الوصول',
      'توسيع نطاق التغطية'
    ],
    correct: 1,
    topic: 'Wireless & Security',
    subSkill: 'wireless_principles',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'application',
    explanation: 'في الشبكات اللاسلكية، تُستخدم VLANs لفصل حركة مرور مجموعات المستخدمين المختلفة (مثل شبكة الموظفين وشبكة الضيوف) لأسباب أمنية وتنظيمية.'
  },
  {
    id: 'sec_010',
    question: 'ما هو الفرق بين WPA2-Personal و WPA2-Enterprise؟',
    options: [
      'WPA2-Personal يستخدم مفتاح مشترك مسبق (PSK)، بينما WPA2-Enterprise يستخدم مصادقة 802.1X مع خادم RADIUS',
      'WPA2-Enterprise يستخدم مفتاح مشترك مسبق',
      'كلاهما يستخدم نفس الآلية',
      'WPA2-Personal أكثر أمانًا'
    ],
    correct: 1,
    topic: 'Wireless & Security',
    subSkill: 'wireless_security',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'WPA2-Personal يستخدم مفتاحًا مشتركًا مسبقًا (PSK - كلمة مرور)، بينما WPA2-Enterprise يستخدم مصادقة 802.1X مع خادم RADIUS، مما يوفر أمانًا أعلى للمؤسسات.'
  }
];

// ============================================================
// 🏁 نهاية الملف
// ============================================================

export default QUESTIONS;
