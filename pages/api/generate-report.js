// pages/api/generate-report.js
// ============================================================
// 🔥 واجهة برمجة لتوليد تقارير ذكية باستخدام الذكاء الاصطناعي
// يدعم: DeepSeek, Groq, OpenAI (اختر حسب متغيرات البيئة)
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
    const { analysisData } = req.body;

    // التحقق من صحة البيانات
    if (!analysisData || typeof analysisData !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'بيانات التحليل غير صالحة أو مفقودة.'
      });
    }

    // التحقق من وجود مفتاح API في متغيرات البيئة
    const apiKey = process.env.AI_API_KEY || process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY;
    const baseUrl = process.env.AI_BASE_URL || 'https://api.deepseek.com/v1/chat/completions';

    // إذا لم يوجد مفتاح API، نستخدم النص الاحتياطي المدمج
    if (!apiKey) {
      console.warn('⚠️ لم يتم العثور على مفتاح API للذكاء الاصطناعي. استخدم النص الاحتياطي.');
      const fallbackReport = generateFallbackReport(analysisData);
      return res.status(200).json({ 
        success: true, 
        report: fallbackReport,
        note: 'تم استخدام النص الاحتياطي لعدم وجود مفتاح API.'
      });
    }

    // ============================================================
    // 🔷 بناء الـ Prompt المثالي
    // ============================================================
    const prompt = buildPrompt(analysisData);

    // ============================================================
    // 🔷 استدعاء واجهة البرمجة (API)
    // ============================================================
    const aiResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || 'deepseek-chat',
        messages: [
          { 
            role: 'system', 
            content: `أنت خبير تربوي ومحلل بيانات نفسي في مجال الشبكات وتكنولوجيا المعلومات.
                      مهمتك هي كتابة تقارير تشخيصية ودودة ومحفزة باللغة العربية الفصحى.
                      يجب أن يكون التقرير شخصياً، موجهاً للطالب، مع التركيز على نقاط القوة،
                      نقاط الضعف، الأسباب الجذرية، والتأثير المستقبلي، وخطة علاجية عملية.
                      استخدم لغة إيجابية ومشجعة. تجنب المصطلحات التقنية الجافة،
                      وترجم الأرقام إلى كلمات مفهومة.` 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1200,
        top_p: 0.9,
        frequency_penalty: 0.3,
        presence_penalty: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('❌ خطأ في استدعاء AI:', errorText);
      
      // استخدام النص الاحتياطي في حال فشل الـ API
      const fallbackReport = generateFallbackReport(analysisData);
      return res.status(200).json({ 
        success: true, 
        report: fallbackReport,
        note: 'تم استخدام النص الاحتياطي بسبب فشل استدعاء AI.'
      });
    }

    const data = await aiResponse.json();
    const report = data.choices?.[0]?.message?.content || generateFallbackReport(analysisData);

    return res.status(200).json({ 
      success: true, 
      report: report.trim(),
      model: data.model || process.env.AI_MODEL || 'deepseek-chat'
    });

  } catch (error) {
    console.error('❌ خطأ في واجهة توليد التقرير:', error);
    
    // في حال حدوث أي خطأ غير متوقع، نستخدم النص الاحتياطي
    try {
      const fallbackReport = generateFallbackReport(req.body?.analysisData || {});
      return res.status(200).json({ 
        success: true, 
        report: fallbackReport,
        note: 'تم استخدام النص الاحتياطي بسبب خطأ في السيرفر.'
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
// 🔷 دوال مساعدة
// ============================================================

/**
 * بناء الـ Prompt المثالي بناءً على بيانات التحليل
 */
function buildPrompt(data) {
  const {
    score = 0,
    totalQuestions = 0,
    correctAnswers = 0,
    cognitiveProfile = {},
    weakestSkills = [],
    skillTree = {},
    isQuick = false
  } = data;

  // استخراج أسماء المهارات الضعيفة
  const weakNames = weakestSkills.map(s => s.name).join('، ') || 'لا توجد مهارات ضعيفة محددة';
  const weakDetails = weakestSkills.map(s => 
    `- **${s.name}**: النسبة ${s.percentage}%. السبب الجذري: ${s.rootCause || 'غير محدد'}. التأثير المستقبلي: ${s.futureImpact || 'سيؤثر على فهمك للموضوعات المتقدمة.'}`
  ).join('\n');

  // استخراج نمط التعلم
  const style = cognitiveProfile?.style || 'متوازن';
  const styleDesc = cognitiveProfile?.description || 'لديك توازن جيد بين السرعة والدقة.';
  const confidence = cognitiveProfile?.confidenceLevel || 'متوسطة';

  // بناء النص
  return `
📊 **بيانات الطالب:**
- النتيجة العامة: ${score}%
- عدد الأسئلة: ${totalQuestions} (الإجابات الصحيحة: ${correctAnswers})
- نوع التقييم: ${isQuick ? 'سريع (12 سؤالاً)' : 'شامل (30 سؤالاً)'}
- الأسلوب المعرفي: ${style} - ${styleDesc}
- مستوى الثقة المستنتج: ${confidence}

📉 **المهارات الضعيفة (مع الأسباب الجذرية والتأثير المستقبلي):**
${weakDetails || 'لا توجد مهارات ضعيفة محددة.'}

🌳 **شجرة المهارات (ملخص):**
${Object.keys(skillTree).length > 0 ? 'يوجد هيكل شجري للمهارات يمكن استخدامه لتخصيص التقرير.' : 'لا توجد بيانات كافية لشجرة المهارات.'}

---

**المطلوب منك (التعليمات):**
اكتب تقريراً تشخيصياً **ودوداً ومحفزاً** باللغة العربية الفصحى، موجهاً للطالب مباشرة (استخدم ضمير "أنت").
يجب أن يحتوي التقرير على الأقسام التالية:

1. **المقدمة والانطباع العام**: ابدأ بتحية دافئة وملخص سريع لأدائه العام. اذكر نتيجته بطريقة إيجابية (مثلاً: "نتيجة ${score}% تعكس ...").
2. **البصمة المعرفية (أسلوبك في التعلم)**: تحدث عن أسلوبه المعرفي المستنتج (${style})، واشرح له كيف يؤثر هذا الأسلوب على أدائه. امنحه نصيحة مخصصة لتحسين أسلوبه.
3. **تحليل الثغرات (نقاط الضعف)**: اشرح له نقاط الضعف الرئيسية (${weakNames}) بطريقة بسيطة ومفهومة. اذكر السبب الجذري لكل ضعف (كما هو مذكور في البيانات) وتأثير ذلك على مستقبله التعليمي أو المهني.
4. **خطة علاجية عملية**: اقترح له خطة عمل ملموسة (3-4 نقاط) تشمل: مراجعة مفاهيم محددة، مشاهدة مقاطع فيديو، حل تمارين تطبيقية، وإعادة الاختبار.
5. **الخاتمة**: أنهِ التقرير برسالة تشجيعية، تذكره فيها بأن التطور بالتدريب والممارسة، وادعه لاستخدام الكورس المخصص والمحاكي العملي.

**تعليمات حاسمة:**
- لا تذكر أبداً أنك تحلل أرقاماً أو نسباً مئوية بطريقة جافة. اجعل النص يبدو كأنه مكتوب بواسطة خبير بشري.
- لا تختلق معلومات خارج البيانات المقدمة. إذا كانت بعض البيانات مفقودة، تجاوزها بلطف.
- استخدم إيموجي مناسب (🎯 📚 ✅ 🔍 💡) لجعل التقرير بصرياً وجذاباً.
- اجعل التقرير متوسط الطول (حوالي 400-600 كلمة).
`;
}

/**
 * توليد تقرير احتياطي (Fallback) في حال فشل الذكاء الاصطناعي
 * هذا النص سيظهر للمستخدم إذا تعذر استدعاء الـ API
 */
function generateFallbackReport(data) {
  const {
    score = 0,
    totalQuestions = 0,
    correctAnswers = 0,
    cognitiveProfile = {},
    weakestSkills = [],
    isQuick = false
  } = data;

  const style = cognitiveProfile?.style || 'متوازن';
  const styleDesc = cognitiveProfile?.description || 'لديك أسلوب متوازن في التعلم.';
  const weakNames = weakestSkills.map(s => s.name).join('، ') || 'لا توجد مهارات ضعيفة محددة بوضوح.';

  return `
📊 **مرحباً بك في تقريرك التشخيصي الشخصي!**

أولاً، نبارك لك إتمام هذا التقييم ${isQuick ? 'السريع' : 'الشامل'}.

🎯 **الانطباع العام:**
لقد حصلت على نتيجة ${score}% من ${totalQuestions} سؤال، حيث أجبت بشكل صحيح على ${correctAnswers} سؤالاً. 
${score >= 70 ? 'هذا أداء جيد جداً، لكن هناك دائماً مجال للتحسين والتطور! 🌟' : score >= 50 ? 'هذا أداء جيد، ونحن هنا لمساعدتك في تجاوز التحديات التي واجهتك. 📈' : 'لا تقلق، الجميع يبدأ من مكان ما. هذا التقييم هو نقطة البداية لرحلة تحسين ممتعة. 🌱'}

🧠 **بصمتك المعرفية (أسلوبك في التعلم):**
لديك أسلوب تعلم "${style}"، وهذا يعني أن ${styleDesc}. نصيحتنا لك: حاول الاستفادة من نقاط قوتك في هذا الأسلوب، وتدرب على الجوانب التي قد تكون أقل قوة فيها.

🔍 **نقاط الضعف التي تم رصدها:**
بناءً على إجاباتك، لاحظنا أنك تحتاج إلى تركيز إضافي على المجالات التالية: 
**${weakNames}**
${weakestSkills.map(s => `\n- **${s.name}** (${s.percentage}%): السبب الجذري هو "${s.rootCause || 'يحتاج مراجعة'}"، وهذا قد يؤثر مستقبلاً على "${s.futureImpact || 'فهمك للموضوعات المتقدمة'}"`).join('')}

📝 **خطتك العلاجية المقترحة:**
1. ابدأ بمراجعة المفاهيم الأساسية للمواضيع المذكورة أعلاه.
2. ابحث عن مقاطع فيديو تعليمية (يمكنك استخدام زر "شاهد على يوتيوب" في الكورس المخصص).
3. حل أكبر عدد ممكن من التمارين التطبيقية.
4. لا تتردد في العودة وإجراء التقييم مرة أخرى بعد أسبوع من الممارسة لقياس تقدمك.

💡 **رسالة أخيرة:**
تذكر أن التعلم رحلة، وليس سباقاً. كل خطوة تخطوها نحو التحسين هي إنجاز بحد ذاتها. نحن هنا لدعمك في كل خطوة على الطريق. استخدم الكورس المخصص والمحاكي العملي لتعزيز مهاراتك.

نتمنى لك التوفيق! 🚀
`;
}
