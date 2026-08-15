// pages/api/analyze.js - النسخة العملية (بدون حشو)
import { getAllBasicsQuestions } from '../../data/questions/basics';

// ============================================================
// 🔷 الثوابت والأقسام التعليمية
// ============================================================
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
// 🔷 الدوال الأساسية (الموروثة)
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

function getMostCommon(arr) {
  if (!arr || arr.length === 0) return null;
  const counts = {};
  arr.forEach(item => { counts[item] = (counts[item]||0)+1; });
  return Object.keys(counts).reduce((a,b) => counts[a] > counts[b] ? a : b);
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

// ============================================================
// 🔷 الدوال الجديدة للتحليل العملي (بدون حشو)
// ============================================================

function getSubSkillName(skillId) {
  const names = {
    'net_concepts': 'المفاهيم العامة للشبكات',
    'net_models': 'نماذج Client-Server و P2P',
    'net_topologies': 'طبولوجيا الشبكات',
    'net_media_cables': 'وسائط النقل والكابلات',
    'net_tcp_vs_udp': 'الفرق بين TCP و UDP',
    'net_vlan': 'مفهوم VLAN',
    'net_vpn': 'مفهوم VPN',
    'ipv4_structure': 'بنية عنوان IPv4',
    'ipv4_classes': 'تصنيفات عناوين IPv4',
    'ipv4_public_private': 'العناوين العامة والخاصة',
    'ipv4_subnet_mask': 'Subnet Mask',
    'ipv4_subnetting_calc': 'حسابات Subnetting',
    'ipv4_network_id': 'تحديد Network ID',
    'ipv4_broadcast': 'حساب Broadcast Address',
    'ipv6_structure': 'بنية عنوان IPv6',
    'ipv6_types': 'أنواع عناوين IPv6',
    'ipv6_shorten': 'اختصار عناوين IPv6',
    'ipv6_vs_ipv4': 'مقارنة IPv4 و IPv6',
    'subnet_cidr': 'ترميز CIDR',
    'subnet_calculation': 'حسابات الشبكات الفرعية',
    'subnet_network_id': 'تحديد Network ID في Subnetting',
    'subnet_broadcast': 'حساب Broadcast في Subnetting',
    'subnet_hosts': 'حساب عدد المضيفين',
    'subnet_vlsm': 'VLSM (التقسيم المتغير)',
    'tcpip_layers': 'طبقات TCP/IP',
    'tcpip_handshake': 'Three-Way Handshake',
    'tcpip_http': 'بروتوكول HTTP/HTTPS',
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
    'wireless_security': 'بروتوكولات الأمان اللاسلكي',
    'security_acls': 'Access Control Lists (ACLs)',
    'security_vpn': 'VPN للأمان',
    'general': 'مهارة عامة'
  };
  return names[skillId] || skillId.replace(/_/g, ' ');
}

function getTrueRootCause(dominantError, percentage, dominantCognitive) {
  if (percentage >= 80) return 'ممتاز! أنت متقن لهذه المهارة.';
  if (dominantError === 'conceptual') {
    return 'ضعف في فهم المفهوم الأساسي. تحتاج إلى إعادة بناء الفهم النظري من الصفر.';
  }
  if (dominantError === 'calculation') {
    return 'أخطاء في العمليات الحسابية. تحتاج إلى تدريب منهجي على الحسابات خطوة بخطوة.';
  }
  if (dominantError === 'application') {
    return 'صعوبة في تطبيق المعلومة على سيناريوهات جديدة. تحتاج إلى حل تمارين تطبيقية متنوعة.';
  }
  if (dominantError === 'memorization') {
    return 'اعتماد على الحفظ بدون فهم عميق. حاول إعادة صياغة المعلومة بكلماتك الخاصة.';
  }
  if (dominantCognitive === 'analyzing' && percentage < 50) {
    return 'صعوبة في تحليل المعلومات وربطها ببعضها. تحتاج إلى تدريب على ربط المفاهيم.';
  }
  return 'يحتاج مراجعة عامة للمهارة مع حل تمارين إضافية.';
}

function getSmartSolution(dominantError, skillId) {
  const skillName = getSubSkillName(skillId);
  const solutions = {
    conceptual: `راجع الشرح النظري لـ "${skillName}" من مصادر موثوقة. ابدأ بالأساسيات ثم انتقل للمفاهيم المتقدمة. استخدم الرسوم التوضيحية لفهم العلاقات بين المفاهيم.`,
    calculation: `تدرب على حل مسائل "${skillName}" خطوة بخطوة. استخدم ورقة وقلم لحل كل مسألة، وتحقق من صحة إجاباتك باستخدام طريقة مختلفة. كرر التمارين حتى تتقنها.`,
    application: `ابحث عن سيناريوهات واقعية لتطبيق "${skillName}". حل تمارين متنوعة من مصادر مختلفة (كتب، مواقع، فيديوهات). حاول تصميم حلول لمشاكل حقيقية.`,
    memorization: `حاول فهم العلاقات بين مفاهيم "${skillName}" بدلاً من حفظها. اكتب شرحاً لها بكلماتك الخاصة. علمها لشخص آخر. استخدم خرائط ذهنية لربط المعلومات.`
  };
  return solutions[dominantError] || `راجع "${skillName}" من الأساسيات وقم بحل تمارين تطبيقية.`;
}

function generateSmartYouTubeSearch(skillId, dominantError) {
  const skillName = getSubSkillName(skillId);
  const errorMap = {
    conceptual: `شرح ${skillName} بالعربي مفهوم`,
    calculation: `تمارين ${skillName} بالعربي`,
    application: `تطبيقات ${skillName} بالعربي`,
    memorization: `فهم ${skillName} بالعربي`
  };
  return errorMap[dominantError] || `شرح ${skillName} بالعربي`;
}

function classifyErrorFromQuestion(question, rawAnswer, numericAnswer) {
  const cognitive = question.cognitiveLevel || 'remembering';
  const subSkill = question.subSkill || '';
  if (cognitive === 'remembering') return 'memorization';
  if (cognitive === 'applying' || cognitive === 'analyzing') return 'application';
  if (subSkill.includes('calc') || subSkill.includes('subnet') || subSkill.includes('host')) {
    return 'calculation';
  }
  return 'conceptual';
}

function analyzeSubSkillsBrilliantly(questions, numericAnswers, rawAnswers) {
  const subSkillMap = {};

  questions.forEach((q, idx) => {
    const subSkill = q.subSkill || 'general';
    if (!subSkillMap[subSkill]) {
      subSkillMap[subSkill] = {
        total: 0,
        correct: 0,
        errors: [],
        times: [],
        topic: q.topic || 'عام',
        skillName: getSubSkillName(subSkill),
        cognitiveLevels: [],
        errorPatterns: []
      };
    }

    const stats = subSkillMap[subSkill];
    stats.total++;
    const isCorrect = q.isWriting 
      ? (rawAnswers[idx] || '').toString().trim().toLowerCase() === (q.expectedAnswer || '').trim().toLowerCase()
      : numericAnswers[idx] === q.correct;

    if (isCorrect) {
      stats.correct++;
    } else {
      const errorType = q.errorPattern || classifyErrorFromQuestion(q, rawAnswers[idx], numericAnswers[idx]);
      stats.errors.push({
        question: q.question,
        yourAnswer: rawAnswers[idx] || numericAnswers[idx],
        correctAnswer: q.expectedAnswer || q.options?.[q.correct - 1] || '',
        errorType: errorType,
        cognitiveLevel: q.cognitiveLevel || 'remembering'
      });
      stats.errorPatterns.push(errorType);
    }
    if (q.cognitiveLevel) stats.cognitiveLevels.push(q.cognitiveLevel);
  });

  const result = {};
  for (const [skillId, stats] of Object.entries(subSkillMap)) {
    const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    const errorPatterns = stats.errorPatterns;
    const dominantError = getMostCommon(errorPatterns) || 'none';
    const cognitiveLevels = stats.cognitiveLevels;
    const dominantCognitive = getMostCommon(cognitiveLevels) || 'remembering';

    const rootCause = getTrueRootCause(dominantError, pct, dominantCognitive);
    const solution = getSmartSolution(dominantError, skillId);
    const youtubeSearch = generateSmartYouTubeSearch(skillId, dominantError);

    result[skillId] = {
      name: stats.skillName,
      topic: stats.topic,
      percentage: pct,
      correct: stats.correct,
      total: stats.total,
      level: pct >= 80 ? 'متقن' : pct >= 50 ? 'قيد التعلم' : 'ضعيف',
      errors: stats.errors,
      errorCount: stats.errors.length,
      dominantError: dominantError,
      dominantCognitive: dominantCognitive,
      rootCause: rootCause,
      solution: solution,
      youtubeSearch: youtubeSearch,
      priority: pct < 40 ? 'حرجة' : pct < 70 ? 'متوسطة' : 'منخفضة'
    };
  }

  return result;
}

function generateTrueSurgicalMap(subSkillAnalysis) {
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
      exercises: Math.max(5, Math.round((100 - data.percentage) / 8)),
      priority: 'عالية جداً'
    })),
    moderate: moderateSkills.map(([id, data]) => ({
      skillId: id,
      name: data.name,
      percentage: data.percentage,
      rootCause: data.rootCause,
      solution: data.solution,
      youtubeSearch: data.youtubeSearch,
      exercises: Math.max(3, Math.round((100 - data.percentage) / 12)),
      priority: 'متوسطة'
    })),
    mastered: Object.entries(subSkillAnalysis)
      .filter(([_, data]) => data.percentage >= 80)
      .map(([id, data]) => ({
        skillId: id,
        name: data.name,
        percentage: data.percentage,
        priority: 'مكتمل 🏆'
      }))
  };
}

// ============================================================
// 🔥 الدوال الجديدة للتحليل العملي (Actionable Analysis)
// ============================================================

function generateActionablePlan(questions, numericAnswers, rawAnswers, timePerQuestion) {
  const plan = {
    priority: null,
    priorityLevel: null,
    specificError: null,
    errorPattern: null,
    rootCause: null,
    solution: null,
    videoLink: null,
    exercises: [],
    timeRequired: null,
    nextStep: null,
    hasWeakness: false
  };

  // 1. تحليل المهارات الفرعية
  const subSkills = analyzeSubSkillsBrilliantly(questions, numericAnswers, rawAnswers);
  const weakSkills = Object.entries(subSkills)
    .filter(([_, data]) => data.percentage < 50)
    .sort((a, b) => a[1].percentage - b[1].percentage);

  if (weakSkills.length === 0) {
    return {
      ...plan,
      priority: "🎉 ماشاء الله! أنت متقن جميع المهارات",
      priorityLevel: "ممتاز",
      nextStep: "جرب التحدي المتقدم أو ابدأ بمشروع تطبيقي",
      hasWeakness: false
    };
  }

  const [skillId, skillData] = weakSkills[0];
  const errors = analyzeErrors(questions, numericAnswers, rawAnswers);
  const skillErrors = errors.filter(e => e.subSkill === skillId);
  
  // استخراج أكثر خطأ متكرر
  const errorCounts = {};
  skillErrors.forEach(e => {
    const key = e.question.substring(0, 40) + '...';
    errorCounts[key] = (errorCounts[key] || 0) + 1;
  });
  
  const mostCommonErrorKey = Object.keys(errorCounts).sort((a, b) => errorCounts[b] - errorCounts[a])[0];
  const mostCommonError = mostCommonErrorKey || "خطأ متكرر غير محدد";
  const errorPattern = skillData.dominantError || 'conceptual';
  const solution = getSmartSolution(errorPattern, skillId);
  const videoSearch = generateSmartYouTubeSearch(skillId, errorPattern);
  const rootCause = skillData.rootCause || getTrueRootCause(errorPattern, skillData.percentage, skillData.dominantCognitive);

  // توليد تمارين محددة
  const exercises = generateSpecificExercises(skillId, errorPattern, skillData.percentage);

  return {
    priority: skillData.name,
    priorityLevel: skillData.percentage < 30 ? 'حرجة 🚨' : skillData.percentage < 50 ? 'متوسطة ⚠️' : 'منخفضة ✅',
    specificError: mostCommonError,
    errorPattern: errorPattern,
    rootCause: rootCause,
    solution: solution,
    videoLink: `https://www.youtube.com/results?search_query=${encodeURIComponent(videoSearch)}`,
    exercises: exercises,
    timeRequired: Math.max(15, Math.ceil((100 - skillData.percentage) / 5) * 5),
    nextStep: skillData.percentage < 40 ? '📖 راجع الأساسيات أولاً ثم حل التمارين' : '💪 حل التمارين ثم اختبر نفسك',
    hasWeakness: true,
    currentPercentage: skillData.percentage
  };
}

function generateSpecificExercises(skillId, errorPattern, percentage) {
  const baseExercises = {
    'subnet_calculation': {
      conceptual: [
        'افهم مفهوم الـ Subnet Mask: لماذا نستخدمه؟',
        'ارسم جدول يوضح العلاقة بين CIDR وعدد المضيفين',
        'اشرح بجملتك الخاصة الفرق بين Network ID و Broadcast'
      ],
      calculation: [
        'حل: أوجد Network ID و Broadcast لـ 192.168.1.0/26',
        'حل: كم مضيف صالح في شبكة /28؟',
        'حل: صمم شبكة بـ 3 شبكات فرعية لـ 192.168.0.0/24'
      ],
      application: [
        'صمم شبكة لشركة بـ 4 أقسام كل قسم يحتاج 30 مضيف',
        'كيف توفر عناوين IP في شبكة /24 لـ 6 شبكات فرعية؟'
      ],
      memorization: [
        'احفظ جدول CIDR من /8 إلى /30',
        'تدرب على تحويل الأرقام العشرية إلى ثنائية'
      ]
    },
    'ipv4_classes': {
      conceptual: [
        'ما الفرق بين Class A و Class C؟',
        'لماذا تم استبدال الـ Classes بـ CIDR؟'
      ],
      calculation: [
        'صنف هذه العناوين: 10.0.0.1، 172.16.0.1، 192.168.1.1',
        'ما هو نطاق العناوين الخاصة في Class B؟'
      ],
      application: [
        'أي Class تختار لشبكة بـ 1000 مضيف؟ ولماذا؟'
      ]
    },
    'ipv6_structure': {
      conceptual: [
        'ما هي مكونات عنوان IPv6؟',
        'اشرح الفرق بين IPv6 و IPv4'
      ],
      calculation: [
        'اختصر: 2001:0db8:0000:0000:0000:0000:0000:0001',
        'وسع: 2001:db8::1'
      ]
    },
    'osi_layers': {
      conceptual: [
        'ما هي الطبقات السبع لـ OSI؟',
        'أي طبقة مسؤولة عن التوجيه؟ وأي طبقة مسؤولة عن التشفير؟'
      ],
      application: [
        'في أي طبقة يعمل الـ Router؟ وفي أي طبقة يعمل الـ Switch؟'
      ]
    }
  };

  // الحصول على تمارين حسب المهارة
  let exercises = baseExercises[skillId];
  
  // إذا لم توجد تمارين محددة للمهارة، استخدم تمارين عامة
  if (!exercises) {
    return [
      `راجع الأساسيات في ${getSubSkillName(skillId)}`,
      'حل 3 مسائل تطبيقية على الأقل',
      'شاهد فيديو شرح ثم حاول حل المسائل مرة أخرى'
    ];
  }

  // اختيار التمارين حسب نوع الخطأ
  let selected = exercises[errorPattern] || exercises.conceptual || [];
  
  // إذا كانت النسبة منخفضة جداً، أضف تمارين أساسية إضافية
  if (percentage < 30 && exercises.conceptual) {
    selected = [...selected, ...exercises.conceptual.slice(0, 2)];
  }

  // إزالة التكرار وإرجاع 3-5 تمارين
  return [...new Set(selected)].slice(0, 5);
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

    const numericAnswers = answers.map((a,i) => { const q = questions[i]; if (q?.isWriting) { const num = Number(a); return isNaN(num) ? 1 : (num===1?1:2); } const num = Number(a); return (isNaN(num) || num<1 || num>4) ? 1 : num; });
    const getWeight = (q) => { let w = q.difficulty||1; if (['analyzing','evaluating','creating'].includes(q.cognitiveLevel)) w += 0.5; if (['Subnet_Calculation','Broadcast_Calculation','Network_ID_Determination'].includes(q.subSkill)) w += 0.3; return w; };

    let totalWeight = 0, earnedWeight = 0, correctCount = 0;
    const questionResults = [];
    questions.forEach((q,i) => { const w = getWeight(q); totalWeight += w; let isCorrect = q.isWriting ? (answers[i]||'').toString().trim().toLowerCase() === (q.expectedAnswer||'').trim().toLowerCase() : numericAnswers[i] === q.correct; if (isCorrect) { earnedWeight += w; correctCount++; } questionResults.push({ isCorrect, weight: w, time: timePerQuestion?.[i]||0, confidence: confidenceLevels?.[i]||50, difficulty: q.difficulty||1, topic: q.topic||'عام', cognitiveLevel: q.cognitiveLevel||'remembering', subSkill: q.subSkill||'عام', errorPattern: q.errorPattern||'conceptual' }); });

    const weightedScore = totalWeight>0 ? Math.round((earnedWeight/totalWeight)*100) : 0;
    const simpleScore = questions.length>0 ? Math.round((correctCount/questions.length)*100) : 0;
    const isQuickMode = mode === 'quick';
    let assessmentType = 'topic'; if (assessmentId === 'full' && !isQuickMode) assessmentType = 'full'; else if (isQuickMode) assessmentType = 'quick';

    // التحليلات الأساسية
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

    // ===== التحليل العبقري الجديد =====
    const subSkillAnalysisBrilliant = analyzeSubSkillsBrilliantly(questions, numericAnswers, answers);
    const weakSkills = Object.entries(subSkillAnalysisBrilliant)
      .filter(([_, data]) => data.percentage < 70)
      .sort((a, b) => a[1].percentage - b[1].percentage)
      .map(([id, data]) => data);
    const strongSkills = Object.entries(subSkillAnalysisBrilliant)
      .filter(([_, data]) => data.percentage >= 70)
      .sort((a, b) => b[1].percentage - a[1].percentage)
      .map(([id, data]) => data);
    const trueSurgicalMap = generateTrueSurgicalMap(subSkillAnalysisBrilliant);

    // ===== 🔥 التحليل العملي الجديد =====
    const actionablePlan = generateActionablePlan(questions, numericAnswers, answers, timePerQuestion);

    // ===== الرؤية المختصرة =====
    const quickInsight = actionablePlan.hasWeakness 
      ? `🔴 أولويتك الأولى: ${actionablePlan.priority} (${actionablePlan.currentPercentage}%). ${actionablePlan.rootCause} خصص ${actionablePlan.timeRequired} دقيقة لمراجعته.`
      : '🎉 أداء ممتاز! أنت متقن لجميع المهارات.';

    return res.status(200).json({
      success: true,
      mode: mode || 'full',
      isQuickMode,
      assessmentType,
      score: weightedScore,
      simpleScore,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      wrongAnswers: questions.length - correctCount,
      topicAnalysis,
      subSkillAnalysis: isQuickMode ? null : subSkillAnalysis,
      learningProfile,
      errors: isQuickMode ? [] : errors,
      weaknesses: isQuickMode ? [] : weaknesses,
      hiddenStrengths: isQuickMode ? [] : hiddenStrengths,
      learningStages,
      allAssessmentsSummary,
      writingAnswers: isQuickMode ? [] : writingAnswers,
      cognitiveProfile: generatedCognitiveProfile,
      recommendedLessons: isQuickMode ? [] : (weakSkills.slice(0, 5).map(s => ({
        topic: s.name,
        percentage: s.percentage,
        reason: s.rootCause || 'يحتاج مراجعة',
        solution: s.solution || 'راجع الأساسيات',
        youtubeSearch: s.youtubeSearch || `شرح ${s.name} بالعربي`,
        exercises: Math.max(3, Math.round((100 - s.percentage) / 10)),
        priority: s.percentage < 40 ? 'عالية' : 'متوسطة'
      }))),
      confidenceAnalysis,
      effortAnalysis,
      comparison,
      personalizedPlan: isQuickMode ? null : personalizedPlan,
      diagnosticMastery: isQuickMode ? null : diagnosticMastery,
      rootCauseAnalysis: isQuickMode ? [] : rootCauseAnalysis,
      insight: quickInsight,
      questionResults,
      subSkillAnalysisBrilliant: isQuickMode ? null : subSkillAnalysisBrilliant,
      trueSurgicalMap: isQuickMode ? null : trueSurgicalMap,
      careerPrediction: isQuickMode ? null : predictCareerPath(subSkillAnalysisBrilliant, topicAnalysis),
      weakSkills: isQuickMode ? [] : weakSkills,
      strongSkills: isQuickMode ? [] : strongSkills,
      // 🔥 الجديد: الخطة العملية
      actionablePlan: actionablePlan,
    });
  } catch (error) {
    console.error('خطأ:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

// ============================================================
// 🔷 التنبؤ المهني
// ============================================================

function predictCareerPath(subSkillAnalysis, topicAnalysis) {
  const skills = Object.entries(subSkillAnalysis).map(([id, data]) => ({
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
      requiredSkills: ['ipv4_subnetting_calc', 'subnet_vlsm', 'subnet_cidr', 'subnet_network_id', 'device_router', 'device_switch'],
      salaryRange: '8,000 - 15,000 $',
      growth: 'متزايد',
      companies: ['Cisco', 'Huawei', 'Juniper', 'شركات الاتصالات'],
    },
    {
      title: 'مهندس أمن سيبراني (Security Engineer)',
      icon: '🔒',
      description: 'حماية الشبكات والأنظمة من الهجمات الإلكترونية، إعداد جدران الحماية وأنظمة كشف التسلل.',
      requiredSkills: ['device_firewall', 'tcpip_handshake', 'ipv4_public_private', 'security_acls'],
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
      requiredSkills: ['ipv4_subnetting_calc', 'tcpip_handshake', 'device_firewall', 'ipv4_public_private'],
      salaryRange: '12,000 - 22,000 $',
      growth: 'عال جداً',
      companies: ['Amazon', 'Microsoft', 'Google', 'Oracle'],
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
