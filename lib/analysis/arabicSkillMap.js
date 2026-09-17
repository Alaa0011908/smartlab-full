// Maps live Arabic bank items onto the granular networking skill graph.
// Question text is the authority when the bank still tags everything as net_fund.

import { NETWORKING_SKILLS } from '../../data/networking/skills';

const RULES = [
  { skillId: 'network_geographic_scope', pattern: /جغرافي|LAN|WAN|MAN|PAN|المساحة الجغراف/i },
  { skillId: 'client_server_architecture', pattern: /Client[- ]?Server|عميل.*خادم|خادم مركزي|client[- ]?server/i },
  { skillId: 'p2p_roles', pattern: /Peer[- ]?to[- ]?Peer|P2P|ند[- ]للند|الند للند/i },
  { skillId: 'centralized_management', pattern: /إدارة مركزية|صلاحيات موحدة|central(ized)? (admin|management)|مؤسسة تحتاج/i },
  { skillId: 'subnetting', pattern: /subnet|تقسيم الشبك|VLSM|عدد المضيف|host bits|network bits|الشبكة الفرعية/i },
  { skillId: 'cidr', pattern: /CIDR|\/\d{1,2}\b|بادئة/i },
  { skillId: 'subnet_mask', pattern: /Subnet Mask|قناع|subnet mask/i },
  { skillId: 'binary_math', pattern: /ثنائي|binary|تحويل.*عشري/i },
  { skillId: 'ipv4_fund', pattern: /IPv4|فئات العناوين|عنوان IP|APIPA|عنوان خاص/i },
  { skillId: 'nat', pattern: /\bNAT\b|ترجمة عناوين/i },
  { skillId: 'default_gateway', pattern: /بوابة افتراضية|default gateway|Default Gateway/i },
  { skillId: 'dns', pattern: /\bDNS\b|أسماء النطاق/i },
  { skillId: 'dhcp', pattern: /\bDHCP\b|DORA/i },
  { skillId: 'arp', pattern: /\bARP\b/i },
  { skillId: 'osi_model', pattern: /OSI|طبقات|طبقة/i },
  { skillId: 'tcpip_model', pattern: /TCP\/IP|نموذج TCP/i },
  { skillId: 'switching', pattern: /Switch|سويتش|مبدل/i },
  { skillId: 'vlan', pattern: /\bVLAN\b/i },
  { skillId: 'routing_fund', pattern: /توجيه|Router|موجه|routing/i },
  { skillId: 'static_routing', pattern: /مسار ثابت|static route/i },
  { skillId: 'ethernet', pattern: /Ethernet|إيثرنت/i },
  { skillId: 'mac_addressing', pattern: /\bMAC\b/i },
  { skillId: 'ping_traceroute', pattern: /ping|traceroute/i },
  { skillId: 'acl', pattern: /\bACL\b|قوائم التحكم/i },
];

const SKILL_CATALOG = {
  network_geographic_scope: {
    rootCause: 'خلط بين تصنيف الشبكة حسب المساحة الجغرافية وتصنيفها حسب البنية أو التقنية.',
    futureImpact: 'قد يسبب صعوبة عند تصميم نطاق تغطية أو اختيار نوع شبكة لموقع فعلي.',
    remediationVideoQuery: 'الفرق بين LAN WAN MAN حسب المساحة الجغرافية',
    learningObjective: 'يميّز الطالب تصنيف الشبكة الجغرافي عن بنية Client–Server أو P2P.',
  },
  client_server_architecture: {
    rootCause: 'عدم تثبيت دور الخادم المركزي مقابل الأجهزة الطرفية في تقديم الخدمة.',
    futureImpact: 'قد يسبب صعوبة عند اختيار أين تُدار الحسابات والخدمات في المؤسسة.',
    remediationVideoQuery: 'شرح بنية Client Server بالعربية ومتى نستخدمها',
    learningObjective: 'يحدد الطالب متى تعتمد الخدمة على خادم مركزي يقدمها للعملاء.',
  },
  p2p_roles: {
    rootCause: 'اعتبار أجهزة الند-للند متخصصة كما في العميل–الخادم، أو العكس.',
    futureImpact: 'قد يسبب صعوبة عند توزيع الأدوار في شبكة صغيرة بلا خادم مخصص.',
    remediationVideoQuery: 'أدوار الأجهزة في شبكة Peer to Peer',
    learningObjective: 'يصف الطالب تساوي الأدوار في P2P دون افتراض خادم دائم.',
  },
  centralized_management: {
    rootCause: 'اختيار بنية لأن خصائصها التقنية مألوفة، لا لأنها تناسب متطلبات الإدارة والصلاحيات.',
    futureImpact: 'قد يسبب صعوبة عند تصميم شبكة مؤسسة تحتاج إدارة مركزية للصلاحيات.',
    remediationVideoQuery: 'متى نختار Client Server بدل P2P للإدارة المركزية',
    learningObjective: 'يختار الطالب Client–Server عندما تتطلب المؤسسة إدارة مركزية للصلاحيات.',
  },
  subnetting: {
    rootCause: 'تطبيق قاعدة عدد المضيفين أو حدود الشبكة على الجزء الخطأ من العنوان أو القناع.',
    futureImpact: 'قد يسبب صعوبة عند حساب نطاق المضيفين وعنوان البث في شبكة فرعية.',
    remediationVideoQuery: 'حساب Host Bits و Network Bits في Subnetting',
    learningObjective: 'يحسب الطالب عدد المضيفين من بتات المضيف لا من بتات الشبكة.',
  },
  cidr: {
    rootCause: 'الخلط بين طول البادئة وعدد المضيفين أو حجم الكتلة.',
    futureImpact: 'قد يسبب صعوبة عند قراءة حدود الشبكة من بادئة CIDR.',
    remediationVideoQuery: 'شرح CIDR وحساب حجم الكتلة',
    learningObjective: 'يربط الطالب طول البادئة بحجم الكتلة دون الخلط مع عدد المضيفين.',
  },
  subnet_mask: {
    rootCause: 'عكس دلالة الواحدات والأصفار في القناع.',
    futureImpact: 'قد يسبب صعوبة عند استخراج معرف الشبكة من العنوان والقناع.',
    remediationVideoQuery: 'ما الذي تمثله أصفار قناع الشبكة الفرعية',
    learningObjective: 'يربط الطالب أصفار القناع ببتات المضيف وواحداته ببتات الشبكة.',
  },
  ipv4_fund: {
    rootCause: 'عدم تثبيت بنية عنوان IPv4 أو دلالات الفئات والعناوين الخاصة.',
    futureImpact: 'قد يسبب صعوبة عند تعيين عنوان صالح داخل شبكة محلية.',
    remediationVideoQuery: 'بنية عنوان IPv4 والفئات والعناوين الخاصة',
    learningObjective: 'يميّز الطالب أجزاء عنوان IPv4 والاستخدام الصحيح للعناوين الخاصة.',
  },
  default_gateway: {
    rootCause: 'الخلط بين دور البوابة الافتراضية ودور خدمة أخرى مثل DNS.',
    futureImpact: 'قد يسبب صعوبة عند تشخيص جهاز يتصل محلياً ولا يصل إلى شبكة أخرى.',
    remediationVideoQuery: 'دور البوابة الافتراضية مقابل DNS',
    learningObjective: 'يفسّر الطالب أن البوابة تُستخدم للخروج من الشبكة المحلية.',
  },
  osi_model: {
    rootCause: 'خلط مسؤوليات الطبقات أو ربط بروتوكول/جهاز بالطبقة الخطأ.',
    futureImpact: 'قد يسبب صعوبة عند عزل العطل طبقة بطبقة.',
    remediationVideoQuery: 'وظائف طبقات OSI والفرق بين الطبقة 2 والطبقة 3',
    learningObjective: 'يربط الطالب كل طبقة بمسؤوليتها دون خلط العنونة أو الأجهزة.',
  },
  routing_fund: {
    rootCause: 'اعتبار التوجيه وظيفة الطبقة الثانية أو تجاهل جدول التوجيه.',
    futureImpact: 'قد يسبب صعوبة عند تفسير مسار لا يصل إلى شبكة بعيدة.',
    remediationVideoQuery: 'كيف يتخذ الراوتر قرار التوجيه',
    learningObjective: 'يربط الطالب إعادة توجيه الحزم بجدول التوجيه لا بجدول MAC.',
  },
};

const DEFAULT_CATALOG = {
  rootCause: 'أداء ضعيف على مهارة محددة دون دليل كافٍ لتحديد آلية الخلط.',
  futureImpact: 'الأثر على المهارات اللاحقة يبقى مشروطاً حتى تُختبر تلك المهارات.',
  remediationVideoQuery: 'شرح المهارة من أدلة التقييم',
  learningObjective: 'يثبت الطالب المهارة بمهمة جديدة بعد المراجعة.',
};

export function getSkillDisplayName(skillId) {
  const skill = NETWORKING_SKILLS.find(s => s.id === skillId);
  return skill?.name?.ar || skillId.replace(/_/g, ' ');
}

export function getSkillCatalog(skillId) {
  return SKILL_CATALOG[skillId] || {
    ...DEFAULT_CATALOG,
    remediationVideoQuery: `شرح ${getSkillDisplayName(skillId)} بالعربي`,
    learningObjective: `يثبت الطالب فهم ${getSkillDisplayName(skillId)} بمهمة جديدة.`,
  };
}

export function isPlaceholderDiagnostic(text) {
  if (!text || typeof text !== 'string') return true;
  return /سبب net_|تأثير net_|شرح net_|يحتاج مراجعة عامة/.test(text);
}

export function mapQuestionToSkillIds(question) {
  const blob = [
    question?.question,
    question?.text?.ar,
    ...(question?.options || []).map(o => typeof o === 'string' ? o : o?.text?.ar || o?.text),
    question?.subSkill,
    question?.topic,
  ].filter(Boolean).join(' ');

  const hits = RULES.filter(rule => rule.pattern.test(blob)).map(rule => rule.skillId);
  if (hits.length > 0) return [...new Set(hits)];

  const tagged = (question?.subSkills || [question?.subSkill]).filter(Boolean);
  if (tagged.length && !tagged.every(id => id === 'net_fund')) return tagged;
  return ['net_fund'];
}

export function inferMisconceptionId(question, selectedIndex, isCorrect) {
  if (isCorrect) return null;
  const blob = [
    question?.question,
    ...(question?.options || []).map(o => typeof o === 'string' ? o : o?.text?.ar || ''),
  ].join(' ');

  const selected = question?.options?.[selectedIndex];
  const selectedText = typeof selected === 'string' ? selected : selected?.text?.ar || '';

  if (/Host Bits|Network Bits|subnet|تقسيم|قناع|CIDR|مضيف/i.test(blob)) {
    if (/شبكة|network bits|بتات الشبكة|واحدات/i.test(selectedText) || /host|مضيف|أصفار/i.test(blob)) {
      return 'misc_net_bits_host_bits';
    }
    return 'misc_cidr_boundary';
  }
  if (/P2P|Client|خادم|ند/i.test(blob) && /إدارة|صلاحيات|مؤسسة|شركة/i.test(blob)) {
    return 'misc_architecture_choice';
  }
  if (/بوابة|gateway/i.test(blob) && /DNS/i.test(blob + selectedText)) {
    return 'misc_gw_dns_confusion';
  }
  if (/Switch|سويتش/i.test(blob) && /توجيه|IP|طبقة 3|layer 3/i.test(selectedText)) {
    return 'misc_switch_routes';
  }
  if (/MAC|IP|طبقة/i.test(blob)) return 'misc_l2_l3';
  return null;
}

export function toAssessmentItem(question) {
  const skillIds = mapQuestionToSkillIds(question);
  const options = (question.options || []).map((opt, index) => {
    const text = typeof opt === 'string' ? opt : opt?.text?.ar || String(opt);
    return {
      id: `opt_${index}`,
      text: { en: text, ar: text },
      misconceptionId: inferMisconceptionId(question, index, index === question.correct) || undefined,
    };
  });

  const difficulty = typeof question.difficulty === 'number'
    ? Math.max(0.05, Math.min(0.95, question.difficulty / 5))
    : 0.5;

  return {
    id: question.id,
    text: { en: question.question, ar: question.question },
    type: question.isWriting ? 'short_answer' : 'mcq',
    options,
    correctAnswer: `opt_${question.correct}`,
    skillMappings: skillIds.map((skillId, i) => ({
      skillId,
      weight: i === 0 ? 1 : 0.4,
      role: i === 0 ? 'primary' : 'secondary',
    })),
    difficulty,
    explanation: { en: question.explanation || '', ar: question.explanation || '' },
    hints: [],
    domain: 'networking',
    calibrationStatus: 'provisional',
    tags: [question.topic].filter(Boolean),
  };
}

export function resolveDiagnosticCopy(question, skillId) {
  const catalog = getSkillCatalog(skillId);
  const diagnostic = question?.diagnostic || {};
  return {
    errorPattern: !isPlaceholderDiagnostic(diagnostic.errorPattern) ? diagnostic.errorPattern : `misc_${skillId}`,
    rootCause: !isPlaceholderDiagnostic(diagnostic.rootCause) ? diagnostic.rootCause : catalog.rootCause,
    futureImpact: !isPlaceholderDiagnostic(diagnostic.futureImpact) ? diagnostic.futureImpact : catalog.futureImpact,
    remediationVideoQuery: !isPlaceholderDiagnostic(diagnostic.remediationVideoQuery)
      ? diagnostic.remediationVideoQuery
      : catalog.remediationVideoQuery,
    learningObjective: catalog.learningObjective,
  };
}
