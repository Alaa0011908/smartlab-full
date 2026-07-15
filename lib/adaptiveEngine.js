// lib/adaptiveEngine.js
import { getAllBasicsQuestions } from '../data/questions/basics';

export const getNextQuestion = (currentLevel, answeredIds) => {
  const allQuestions = getAllBasicsQuestions();
  const availableQuestions = allQuestions.filter(q => !answeredIds.includes(q.id));
  if (availableQuestions.length === 0) return null;

  let levelQuestions = availableQuestions.filter(q => q.difficulty === currentLevel);
  if (levelQuestions.length === 0) {
    const availableLevels = [...new Set(availableQuestions.map(q => q.difficulty))].sort();
    const nearestLevel = availableLevels.reduce((prev, curr) => 
      Math.abs(curr - currentLevel) < Math.abs(prev - currentLevel) ? curr : prev
    );
    levelQuestions = availableQuestions.filter(q => q.difficulty === nearestLevel);
  }
  if (levelQuestions.length === 0) return availableQuestions[0];

  const randomIndex = Math.floor(Math.random() * levelQuestions.length);
  return levelQuestions[randomIndex];
};

export const updateLevel = (currentLevel, isCorrect) => {
  if (isCorrect && currentLevel < 3) return currentLevel + 1;
  if (!isCorrect && currentLevel > 1) return currentLevel - 1;
  return currentLevel;
};

// دالة تحليل المهارات الفرعية
const analyzeSubSkills = (answers, questions) => {
  const subSkillMap = {};

  answers.forEach((answer, index) => {
    const q = questions[index];
    if (!q || !q.subSkill) return;

    if (!subSkillMap[q.subSkill]) {
      subSkillMap[q.subSkill] = {
        total: 0,
        correct: 0,
        topic: q.topic || 'عام',
        skillName: q.subSkill.replace(/_/g, ' ')
      };
    }
    subSkillMap[q.subSkill].total++;
    if (answer === q.correct) subSkillMap[q.subSkill].correct++;
  });

  const result = {};
  for (const [skill, stats] of Object.entries(subSkillMap)) {
    const percentage = Math.round((stats.correct / stats.total) * 100);
    result[skill] = {
      percentage,
      correct: stats.correct,
      total: stats.total,
      topic: stats.topic,
      skillName: stats.skillName,
      level: percentage >= 70 ? 'قوي' : percentage >= 50 ? 'متوسط' : 'ضعيف',
      recommendation: getRecommendation(skill, percentage)
    };
  }
  return result;
};

// دالة التوصيات حسب المهارة
const getRecommendation = (skill, percentage) => {
  const recommendations = {
    'IP_Classification': '📘 راجع تصنيف عناوين IPv4 (Class A, B, C, D, E) مع أمثلة',
    'IP_Private_vs_Public': '📘 راجع الفرق بين العناوين الخاصة والعامة وأمثلتها العملية',
    'Subnet_Calculation': '📘 راجع حسابات الـ Subnetting وطريقة تحديد الـ Network ID',
    'Subnet_Mask_Calculation': '📘 راجع طريقة حساب الـ Subnet Mask من الـ CIDR',
    'Host_Calculation': '📘 راجع طريقة حساب عدد المضيفين الصالحين في الشبكة',
    'Broadcast_Calculation': '📘 راجع طريقة حساب عنوان البث (Broadcast Address)',
    'Network_ID_Determination': '📘 راجع طريقة تحديد عنوان الشبكة (Network ID)',
    'Subnet_Count': '📘 راجع طريقة حساب عدد الـ Subnets الممكنة',
    'Increment_Calculation': '📘 راجع طريقة حساب الـ Increment في الـ Subnetting',
    'IPv6_Addressing': '📘 راجع بنية عناوين IPv6 وأنواعها',
    'IPv6_Shortening': '📘 راجع طريقة اختصار عناوين IPv6',
    'IPv6_Types': '📘 راجع أنواع عناوين IPv6 (Unicast, Multicast, Anycast)',
    'IPv6_vs_IPv4': '📘 راجع مقارنة شاملة بين IPv4 و IPv6',
    'OSI_Layers': '📘 راجع طبقات نموذج OSI وترتيبها ووظائفها',
    'OSI_Functions': '📘 راجع وظائف كل طبقة في نموذج OSI',
    'OSI_Protocols': '📘 راجع البروتوكولات المرتبطة بكل طبقة في OSI'
  };
  if (percentage < 50) return recommendations[skill] || '📘 راجع هذا المفهوم من الأساس';
  if (percentage < 70) return recommendations[skill] || '📘 راجع التمارين العملية لهذا المفهوم';
  return '🌟 ممتاز! أنت متقن لهذه المهارة';
};

// ===== دالة تحليل المستويات المعرفية (تصنيف بلوم) =====
const analyzeCognitiveLevels = (answers, questions) => {
  const levels = {
    remembering: { total: 0, correct: 0, label: 'تذكر' },
    understanding: { total: 0, correct: 0, label: 'فهم' },
    applying: { total: 0, correct: 0, label: 'تطبيق' },
    analyzing: { total: 0, correct: 0, label: 'تحليل' },
    evaluating: { total: 0, correct: 0, label: 'تقييم' },
    creating: { total: 0, correct: 0, label: 'إبداع' }
  };

  answers.forEach((answer, index) => {
    const q = questions[index];
    if (!q || !q.cognitiveLevel) return;
    const level = q.cognitiveLevel;
    if (levels[level]) {
      levels[level].total++;
      if (answer === q.correct) levels[level].correct++;
    }
  });

  const result = {};
  for (const [key, stats] of Object.entries(levels)) {
    const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    result[key] = {
      ...stats,
      percentage,
      level: percentage >= 70 ? 'قوي' : percentage >= 50 ? 'متوسط' : 'ضعيف'
    };
  }
  return result;
};

// ===== توليد رؤية الذكاء الاصطناعي للتحليل المعرفي =====
const generateCognitiveInsight = (cognitiveAnalysis) => {
  let strongest = '';
  let weakest = '';
  let strongestScore = 0;
  let weakestScore = 100;

  for (const [key, data] of Object.entries(cognitiveAnalysis)) {
    if (data.percentage > strongestScore && data.total > 0) {
      strongestScore = data.percentage;
      strongest = data.label;
    }
    if (data.percentage < weakestScore && data.total > 0) {
      weakestScore = data.percentage;
      weakest = data.label;
    }
  }

  if (!strongest || !weakest) {
    return '💡 أكمل المزيد من التقييمات للحصول على تحليل دقيق لمستويات التفكير لديك.';
  }

  if (weakestScore < 50) {
    return `💡 أنت قوي في "${strongest}" (${strongestScore}%) لكنك تحتاج تحسين في "${weakest}" (${weakestScore}%). نوصي بتمارين تركز على مهارات ${weakest}.`;
  }
  if (weakestScore < 70) {
    return `💡 أنت قوي في "${strongest}" (${strongestScore}%) ويمكنك تحسين "${weakest}" (${weakestScore}%) عبر ممارسة إضافية.`;
  }
  return `🎉 ممتاز! أداؤك متوازن في جميع مستويات التفكير. أنت جاهز للتحديات المتقدمة.`;
};

// ===== دالة حساب النتيجة النهائية =====
export const calculateAdaptiveScore = (answers, questions) => {
  let correctCount = 0;
  let totalWeight = 0;
  let earnedWeight = 0;

  answers.forEach((answer, index) => {
    const q = questions[index];
    if (q) {
      const weight = q.difficulty || 1;
      totalWeight += weight;
      if (answer === q.correct) { correctCount++; earnedWeight += weight; }
    }
  });

  const weightedScore = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
  const avgLevel = answers.length > 0
    ? Math.round(answers.reduce((sum, a, i) => sum + (questions[i]?.difficulty || 1), 0) / answers.length)
    : 1;

  // تحليل حسب الموضوع
  const topicAnalysis = {};
  answers.forEach((answer, index) => {
    const q = questions[index];
    if (!q) return;
    if (!topicAnalysis[q.topic]) topicAnalysis[q.topic] = { total: 0, correct: 0 };
    topicAnalysis[q.topic].total++;
    if (answer === q.correct) topicAnalysis[q.topic].correct++;
  });
  for (const [topic, stats] of Object.entries(topicAnalysis)) {
    const percentage = Math.round((stats.correct / stats.total) * 100);
    topicAnalysis[topic] = { percentage, correct: stats.correct, total: stats.total, level: percentage >= 70 ? 'قوي' : percentage >= 50 ? 'متوسط' : 'ضعيف' };
  }

  // تحليل المهارات الفرعية
  const subSkillAnalysis = analyzeSubSkills(answers, questions);

  // تحليل المستويات المعرفية (الجديد)
  const cognitiveAnalysis = analyzeCognitiveLevels(answers, questions);
  const cognitiveInsight = generateCognitiveInsight(cognitiveAnalysis);

  return {
    score: weightedScore,
    correctCount,
    totalQuestions: answers.length,
    averageLevel: avgLevel,
    levelName: avgLevel === 1 ? 'مبتدئ' : avgLevel === 2 ? 'متوسط' : 'متقدم',
    topicAnalysis,
    subSkillAnalysis,
    cognitiveAnalysis,
    cognitiveInsight
  };
};
