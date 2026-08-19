// pages/api/generate-report.js
// ============================================================
// 🧠 محرك توليد التقارير الذكية - Smart Report Generator v3.0
// يستخدم الذكاء الاصطناعي لإنشاء تقارير شخصية ودقيقة
// ============================================================

/**
 * ═══════════════════════════════════════════════════════════════
 * 📊 مكونات التقرير الذكي:
 * 
 * 1. ملخص الأداء العام (Score, Level, Progress)
 * 2. تحليل البصمة المعرفية (Learning Style, Cognitive Patterns)
 * 3. تحليل الثغرات العميق (Root Causes, Error Patterns)
 * 4. الخطة العلاجية المخصصة (Actionable Plan, Timeline)
 * 5. التنبؤات المستقبلية (Predictions, Career Path)
 * 6. توصيات شخصية جداً (Personalized Recommendations)
 * 7. رسالة تحفيزية مخصصة (Motivational Message)
 * ═══════════════════════════════════════════════════════════════
 */

// ============================================================
// 🔷 الثوابت والإعدادات
// ============================================================

// قائمة مقدمي خدمات الذكاء الاصطناعي المدعومين
const AI_PROVIDERS = {
  DEEPSEEK: 'deepseek',
  OPENAI: 'openai',
  GROQ: 'groq',
};

// ============================================================
// 🔷 دوال مساعدة للتحقق من البيانات
// ============================================================

const hasValidData = (data) => {
  return data && typeof data === 'object' && Object.keys(data).length > 0;
};

const getScore = (data) => data?.score || data?.quickStats?.score || 0;
const getTotalQuestions = (data) => data?.totalQuestions || data?.quickStats?.total || 0;
const getCorrectAnswers = (data) => data?.correctAnswers || data?.quickStats?.correct || 0;
const getWrongAnswers = (data) => data?.wrongAnswers || data?.quickStats?.wrong || 0;

// ============================================================
// 🔷 توليد التقرير الاحتياطي (Fallback Report)
// ============================================================

function generateFallbackReport(analysisData) {
  const score = getScore(analysisData);
  const total = getTotalQuestions(analysisData);
  const correct = getCorrectAnswers(analysisData);
  const wrong = getWrongAnswers(analysisData);
  const isQuick = analysisData?.isQuick || false;

  // استخراج أضعف المهارات
  const weakSkills = analysisData?.weakestSkills || [];
  const weakNames = weakSkills.map(s => s.name).join('، ') || 'لا توجد مهارات ضعيفة محددة';

  // استخراج النمط المعرفي
  const cognitiveStyle = analysisData?.cognitiveProfile?.style || 'متوازن';
  const cognitiveDesc = analysisData?.cognitiveProfile?.description || 'لديك أسلوب متوازن في التعلم.';

  // استخراج التوصيات
  const recommendations = analysisData?.actionablePlan || {};

  // بناء التقرير
  let report = '';

  // المقدمة
  report += `📊 **مرحباً بك في تقريرك التشخيصي الشخصي!**\n\n`;
  report += `أولاً، نبارك لك إتمام هذا التقييم ${isQuick ? 'السريع' : 'الشامل'}.\n\n`;

  // الانطباع العام
  report += `🎯 **الانطباع العام:**\n`;
  if (score >= 80) {
    report += `لقد حصلت على نتيجة ممتازة (${score}%) من ${total} سؤال، حيث أجبت بشكل صحيح على ${correct} سؤالاً. هذا أداء رائع جداً! 🌟\n\n`;
  } else if (score >= 65) {
    report += `لقد حصلت على نتيجة جيدة جداً (${score}%) من ${total} سؤال، حيث أجبت بشكل صحيح على ${correct} سؤالاً. أنت على الطريق الصحيح! 📈\n\n`;
  } else if (score >= 50) {
    report += `لقد حصلت على نتيجة متوسطة (${score}%) من ${total} سؤال، حيث أجبت بشكل صحيح على ${correct} سؤالاً. هناك مجال للتحسين! 💪\n\n`;
  } else {
    report += `لقد حصلت على نتيجة (${score}%) من ${total} سؤال، حيث أجبت بشكل صحيح على ${correct} سؤالاً. لا تقلق، الجميع يبدأ من مكان ما! 🌱\n\n`;
  }

  // البصمة المعرفية
  report += `🧠 **بصمتك المعرفية (أسلوبك في التعلم):**\n`;
  report += `لديك أسلوب تعلم "${cognitiveStyle}"، وهذا يعني أن ${cognitiveDesc}\n`;
  report += `نصيحتنا لك: حاول الاستفادة من نقاط قوتك في هذا الأسلوب، وتدرب على الجوانب التي قد تكون أقل قوة فيها.\n\n`;

  // نقاط الضعف
  if (weakSkills.length > 0) {
    report += `🔍 **نقاط الضعف التي تم رصدها:**\n`;
    report += `بناءً على إجاباتك، لاحظنا أنك تحتاج إلى تركيز إضافي على المجالات التالية:\n`;
    report += `**${weakNames}**\n\n`;

    weakSkills.slice(0, 3).forEach((skill, index) => {
      report += `${index + 1}. **${skill.name}** (${skill.percentage}%):\n`;
      report += `   - السبب الجذري: ${skill.rootCause || 'يحتاج مراجعة'}\n`;
      report += `   - التأثير المستقبلي: ${skill.futureImpact || 'سيؤثر على فهمك للموضوعات المتقدمة'}\n`;
      if (skill.remediationVideoQuery) {
        report += `   - رابط مفيد: https://www.youtube.com/results?search_query=${encodeURIComponent(skill.remediationVideoQuery)}\n`;
      }
      report += '\n';
    });
  }

  // الخطة العلاجية
  if (recommendations.hasWeakness !== undefined) {
    report += `📝 **خطتك العلاجية المقترحة:**\n`;
    if (recommendations.hasWeakness) {
      report += `🎯 الأولوية: ${recommendations.priority}\n`;
      report += `⏱️ الوقت المقترح: ${recommendations.timeRequired || 30} دقيقة يومياً\n`;
      report += `📚 الحل: ${recommendations.solution || 'راجع الأساسيات وحل تمارين تطبيقية'}\n\n`;

      if (recommendations.today && recommendations.today.length > 0) {
        report += `**اليوم:**\n`;
        recommendations.today.forEach(task => {
          report += `  - ${task}\n`;
        });
        report += '\n';
      }

      if (recommendations.thisWeek && recommendations.thisWeek.length > 0) {
        report += `**هذا الأسبوع:**\n`;
        recommendations.thisWeek.forEach(task => {
          report += `  - ${task}\n`;
        });
        report += '\n';
      }
    } else {
      report += `🎉 ممتاز! لا توجد ثغرات حرجة. استمر في التطوير والممارسة.\n\n`;
    }
  }

  // التنبؤات
  if (analysisData?.predictions?.careerPrediction?.bestMatch) {
    report += `💼 **المسار الوظيفي المناسب لك:**\n`;
    report += `بناءً على مهاراتك، أنسب مسار لك هو: **${analysisData.predictions.careerPrediction.bestMatch}**\n`;
    report += `نسبة التوافق: ${analysisData.predictions.careerPrediction.matchPercentage || 0}%\n`;
    if (analysisData.predictions.careerPrediction.recommendation) {
      report += `📌 ${analysisData.predictions.careerPrediction.recommendation}\n`;
    }
    report += '\n';
  }

  // التحليل العاطفي
  if (analysisData?.affective?.moodAnalysis) {
    const mood = analysisData.affective.moodAnalysis;
    report += `😊 **حالتك العاطفية أثناء الاختبار:**\n`;
    if (mood.confidence) {
      report += `- الثقة: ${Math.round(mood.confidence.score || 50)}% (${mood.confidence.interpretation || 'متوسطة'})\n`;
    }
    if (mood.anxiety) {
      report += `- القلق: ${Math.round(mood.anxiety.score || 30)}% (${mood.anxiety.interpretation || 'منخفض'})\n`;
    }
    if (mood.motivation) {
      report += `- التحفيز: ${Math.round(mood.motivation.score || 70)}%\n`;
    }
    report += '\n';
  }

  // الخاتمة
  report += `💡 **رسالة أخيرة:**\n`;
  report += `تذكر أن التعلم رحلة، وليس سباقاً. كل خطوة تخطوها نحو التحسين هي إنجاز بحد ذاتها.\n`;
  report += `نحن هنا لدعمك في كل خطوة على الطريق. استخدم الكورس المخصص والمحاكي العملي لتعزيز مهاراتك.\n\n`;
  report += `نتمنى لك التوفيق! 🚀`;

  return report;
}

// ============================================================
// 🔷 بناء الـ Prompt المثالي
// ============================================================

function buildDynamicPrompt(analysisData) {
  const score = getScore(analysisData);
  const total = getTotalQuestions(analysisData);
  const correct = getCorrectAnswers(analysisData);
  const wrong = getWrongAnswers(analysisData);
  const isQuick = analysisData?.isQuick || false;

  // استخراج المهارات الضعيفة
  const weakSkills = analysisData?.weakestSkills || [];
  const weakNames = weakSkills.map(s => s.name).join('، ');
  const weakDetails = weakSkills.slice(0, 3).map(s => 
    `- **${s.name}**: النسبة ${s.percentage}%. السبب الجذري: ${s.rootCause || 'غير محدد'}. التأثير المستقبلي: ${s.futureImpact || 'سيؤثر على فهمك للموضوعات المتقدمة.'}`
  ).join('\n');

  // استخراج النمط المعرفي
  const cognitiveStyle = analysisData?.cognitiveProfile?.style || 'متوازن';
  const cognitiveDesc = analysisData?.cognitiveProfile?.description || 'لديك توازن جيد بين السرعة والدقة.';
  const confidenceLevel = analysisData?.cognitiveProfile?.confidenceLevel || 'متوسطة';

  // استخراج التحليل الزمني
  const temporalPattern = analysisData?.microTemporal?.pattern?.type || 'stable';
  const temporalDesc = analysisData?.microTemporal?.pattern?.interpretation || 'أداء زمني مستقر';

  // استخراج التحليل العاطفي
  const anxiety = analysisData?.affective?.moodAnalysis?.anxiety?.score || 30;
  const anxietyInterpretation = analysisData?.affective?.moodAnalysis?.anxiety?.interpretation || 'منخفض';
  const confidenceScore = analysisData?.affective?.moodAnalysis?.confidence?.score || 50;

  // استخراج التوصيات
  const recommendations = analysisData?.actionablePlan || {};

  // استخراج التنبؤات
  const careerPath = analysisData?.predictions?.careerPrediction?.bestMatch || 'غير محدد';
  const careerMatch = analysisData?.predictions?.careerPrediction?.matchPercentage || 0;

  // بناء الـ Prompt
  return `
أنت خبير تربوي ونفسي متخصص في تحليل أداء الطلاب وتقديم تقارير شخصية ودافعة.

📊 **بيانات الطالب:**
- النتيجة العامة: ${score}%
- عدد الأسئلة: ${total} (الإجابات الصحيحة: ${correct}، الخاطئة: ${wrong})
- نوع التقييم: ${isQuick ? 'سريع (12 سؤالاً)' : 'شامل (30 سؤالاً)'}
- الأسلوب المعرفي: ${cognitiveStyle} - ${cognitiveDesc}
- مستوى الثقة المستنتج: ${confidenceLevel}%

📉 **المهارات الضعيفة (مع الأسباب الجذرية والتأثير المستقبلي):**
${weakDetails || 'لا توجد مهارات ضعيفة محددة.'}

⏱️ **النمط الزمني:**
- النوع: ${temporalPattern}
- التفسير: ${temporalDesc}

😊 **الحالة العاطفية:**
- مستوى القلق: ${anxiety}% (${anxietyInterpretation})
- مستوى الثقة: ${confidenceScore}%

${careerPath ? `💼 **المسار الوظيفي المقترح:** ${careerPath} (${careerMatch}% توافق)` : ''}

${recommendations.hasWeakness !== undefined ? `📝 **الخطة العلاجية:** ${recommendations.hasWeakness ? 'موجودة' : 'لا توجد ثغرات حرجة'}` : ''}

---

**المطلوب منك (التعليمات):**

اكتب تقريراً تشخيصياً **ودوداً ومحفزاً** باللغة العربية الفصحى، موجهاً للطالب مباشرة (استخدم ضمير "أنت").

يجب أن يحتوي التقرير على الأقسام التالية بالترتيب:

1. **🎯 المقدمة والانطباع العام**: ابدأ بتحية دافئة وملخص سريع لأدائه العام. اذكر نتيجته بطريقة إيجابية ومشجعة.

2. **🧠 البصمة المعرفية (أسلوبك في التعلم)**: تحدث عن أسلوبه المعرفي المستنتج (${cognitiveStyle})، واشرح له كيف يؤثر هذا الأسلوب على أدائه. امنحه نصيحة مخصصة لتحسين أسلوبه.

3. **🔍 تحليل الثغرات (نقاط الضعف)**: اشرح له نقاط الضعف الرئيسية (${weakNames || 'لا توجد'}) بطريقة بسيطة ومفهومة. اذكر السبب الجذري لكل ضعف وتأثير ذلك على مستقبله التعليمي أو المهني.

4. **⏱️ النمط الزمني وأسلوب الأداء**: تحدث عن النمط الزمني للطالب (${temporalDesc}) وقدم له نصيحة لتحسين أدائه الزمني.

5. **😊 الجانب العاطفي**: تحدث عن حالته العاطفية أثناء الاختبار (القلق، الثقة، التحفيز) وقدم له نصائح للتعامل معها.

6. **📝 خطة علاجية عملية**: اقترح له خطة عمل ملموسة (3-4 نقاط) تشمل: مراجعة مفاهيم محددة، مشاهدة مقاطع فيديو، حل تمارين تطبيقية، وإعادة الاختبار.

7. **💼 المسار الوظيفي**: إذا كان هناك مسار وظيفي مقترح (${careerPath})، اشرح له لماذا هذا المسار مناسب له وماذا يحتاج لتطويره.

8. **💡 الخاتمة**: أنهِ التقرير برسالة تشجيعية مخصصة، تذكره فيها بأن التطور بالتدريب والممارسة، وادعه لاستخدام الكورس المخصص والمحاكي العملي.

**تعليمات حاسمة:**
- لا تذكر أبداً أنك تحلل أرقاماً أو نسباً مئوية بطريقة جافة. اجعل النص يبدو كأنه مكتوب بواسطة خبير بشري.
- استخدم لغة إيجابية ومشجعة في كل فقرة.
- استخدم إيموجي مناسب (🎯 📚 ✅ 🔍 💡 🌟 🚀) لجعل التقرير بصرياً وجذاباً.
- اجعل التقرير متوسط الطول (حوالي 500-700 كلمة).
- لا تختلق معلومات خارج البيانات المقدمة.
- التقرير يجب أن يكون شخصياً جداً، كأنك تتحدث مع الطالب وجهاً لوجه.
`;
}

// ============================================================
// 🔷 استدعاء واجهة الذكاء الاصطناعي
// ============================================================

async function callAI(prompt, apiKey, provider = 'deepseek') {
  const configs = {
    deepseek: {
      url: 'https://api.deepseek.com/v1/chat/completions',
      model: 'deepseek-chat',
    },
    openai: {
      url: 'https://api.openai.com/v1/chat/completions',
      model: 'gpt-3.5-turbo',
    },
    groq: {
      url: 'https://api.groq.com/openai/v1/chat/completions',
      model: 'mixtral-8x7b-32768',
    },
  };

  const config = configs[provider] || configs.deepseek;

  const response = await fetch(config.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { 
          role: 'system', 
          content: `أنت خبير تربوي ومحلل بيانات نفسي في مجال التعليم والتدريب.
                    مهمتك هي كتابة تقارير تشخيصية ودودة ومحفزة باللغة العربية الفصحى.
                    يجب أن يكون التقرير شخصياً، موجهاً للطالب، مع التركيز على نقاط القوة،
                    نقاط الضعف، الأسباب الجذرية، والتأثير المستقبلي، وخطة علاجية عملية.
                    استخدم لغة إيجابية ومشجعة. تجنب المصطلحات التقنية الجافة.` 
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.75,
      max_tokens: 1500,
      top_p: 0.9,
      frequency_penalty: 0.3,
      presence_penalty: 0.3,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || null;
}

// ============================================================
// 🔷 المعالج الرئيسي (Handler)
// ============================================================

export default async function handler(req, res) {
  // السماح فقط بـ POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'الطريقة غير مسموحة. استخدم POST.' 
    });
  }

  try {
    const { analysisData, provider = 'deepseek' } = req.body;

    // التحقق من صحة البيانات
    if (!analysisData || typeof analysisData !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'بيانات التحليل غير صالحة أو مفقودة.'
      });
    }

    // التحقق من وجود مفتاح API
    const apiKey = process.env.AI_API_KEY || 
                   process.env.DEEPSEEK_API_KEY || 
                   process.env.OPENAI_API_KEY || 
                   process.env.GROQ_API_KEY;

    // إذا لم يوجد مفتاح API، نستخدم النص الاحتياطي المدمج
    if (!apiKey) {
      console.warn('⚠️ لم يتم العثور على مفتاح API للذكاء الاصطناعي. استخدم النص الاحتياطي.');
      const fallbackReport = generateFallbackReport(analysisData);
      return res.status(200).json({ 
        success: true, 
        report: fallbackReport,
        note: 'تم استخدام النص الاحتياطي لعدم وجود مفتاح API.',
        usedFallback: true,
      });
    }

    // بناء الـ Prompt المثالي
    const prompt = buildDynamicPrompt(analysisData);

    // محاولة استدعاء الذكاء الاصطناعي
    let aiReport = null;
    let usedFallback = false;

    try {
      aiReport = await callAI(prompt, apiKey, provider);
    } catch (aiError) {
      console.error('❌ خطأ في استدعاء AI:', aiError.message);
      usedFallback = true;
    }

    // إذا فشل الذكاء الاصطناعي، استخدم النص الاحتياطي
    const finalReport = aiReport || generateFallbackReport(analysisData);

    return res.status(200).json({ 
      success: true, 
      report: finalReport.trim(),
      model: provider,
      usedFallback,
    });

  } catch (error) {
    console.error('❌ خطأ في واجهة توليد التقرير:', error);
    
    // في حال حدوث أي خطأ غير متوقع، نستخدم النص الاحتياطي
    try {
      const fallbackReport = generateFallbackReport(req.body?.analysisData || {});
      return res.status(200).json({ 
        success: true, 
        report: fallbackReport,
        note: 'تم استخدام النص الاحتياطي بسبب خطأ في السيرفر.',
        usedFallback: true,
      });
    } catch (fallbackError) {
      return res.status(500).json({ 
        success: false, 
        error: 'حدث خطأ داخلي في توليد التقرير.' 
      });
    }
  }
}

// ============================================================
// 🔷 دوال مساعدة للاستخدام الخارجي
// ============================================================

/**
 * توليد تقرير مباشر (بدون استدعاء API)
 * @param {Object} analysisData - بيانات التحليل
 * @returns {string} التقرير
 */
export const generateDirectReport = (analysisData) => {
  return generateFallbackReport(analysisData);
};

/**
 * التحقق من توفر الذكاء الاصطناعي
 * @returns {Object} حالة التوفر
 */
export const checkAIAvailability = () => {
  const hasKey = !!(process.env.AI_API_KEY || 
                   process.env.DEEPSEEK_API_KEY || 
                   process.env.OPENAI_API_KEY || 
                   process.env.GROQ_API_KEY);
  
  const providers = [];
  if (process.env.DEEPSEEK_API_KEY) providers.push('deepseek');
  if (process.env.OPENAI_API_KEY) providers.push('openai');
  if (process.env.GROQ_API_KEY) providers.push('groq');
  if (process.env.AI_API_KEY) providers.push('default');

  return {
    available: hasKey,
    providers,
    defaultProvider: providers[0] || 'none',
  };
};
