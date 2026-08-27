// ============================================================
// SmartLab AI - Scenario Engine v3.0
// Fully AI-powered Client Simulator with 5-stage workflow
// DeepSeek LLM Integration | Guardrails | 3 Personas | Mock Fallback
// ============================================================

const STAGE_NAMES = {
  1: 'تحديد الاحتياجات',
  2: 'التفاوض على السعر',
  3: 'أسئلة التسليم',
  4: 'تنفيذ التصميم ورفع المشروع',
  5: 'التسليم النهائي'
};

const STAGE_DESCRIPTIONS = {
  1: 'يجب على المهندس أن يسأل العميل 5 أسئلة إلزامية لاستكشاف المتطلبات',
  2: 'تقديم عرض السعر والتفاوض مع العميل للوصول إلى اتفاق مناسب',
  3: 'الإجابة على 3 أسئلة إلزامية من العميل حول التسليم والدعم',
  4: 'رفع ملف تصميم الشبكة (Packet Tracer .pkt/.pka) للمراجعة',
  5: 'الختام الإيجابي وإغلاق الصفحة مع العميل'
};

const MANDATORY_QUESTIONS_STAGE1 = [
  {
    id: 'devices',
    label: 'كم عدد الأجهزة ونقاط الوصول المتوقعة؟',
    shortLabel: 'عدد الأجهزة',
    keywords: ['جهاز', 'اجهزه', 'أجهزة', 'كم عدد', 'نقطة وصول', 'اكسس بوينت', 'access point', 'ap', 'سويتش', 'switch', 'راوتر', 'router']
  },
  {
    id: 'internet',
    label: 'ما نوع الإنترنت المتاح وسرعته؟',
    shortLabel: 'نوع الإنترنت',
    keywords: ['انترنت', 'إنتيرنيت', 'إنترنت', 'internet', 'اتصال', 'سرعه', 'سرعة', 'ميجا', 'جيجا', 'mbps', 'gbps', 'الىاف', 'ألياف', 'dsl', 'stc', 'mobily', 'زين']
  },
  {
    id: 'guest_vlan',
    label: 'هل تحتاج شبكة منفصلة للضيوف أو الزوار؟',
    shortLabel: 'شبكة الضيوف',
    keywords: ['ضيف', 'ضيوف', 'guest', 'زلاء', 'زوار', 'vlan', 'منفصل', 'عزل', 'شبكة عامة', 'wifi عام']
  },
  {
    id: 'budget',
    label: 'ما الميزانية التقريبية للمشروع؟',
    shortLabel: 'الميزانية',
    keywords: ['ميزانيه', 'ميزانية', 'budget', 'سعر', 'تكلفه', 'تكلفة', 'بكم', 'كم يكلف', 'المبلغ', 'دفع', 'ريال', 'رس']
  },
  {
    id: 'space',
    label: 'كم مساحة المكان وعدد الطوابق؟',
    shortLabel: 'مساحة المكان',
    keywords: ['مساحه', 'مساحة', 'طابق', 'طوابق', 'متر', 'متر مربع', 'area', 'space', 'حجم المكان', 'مبنى', 'موقع']
  }
];

const DELIVERY_QUESTIONS_STAGE3 = [
  {
    id: 'delivery_time',
    label: 'متى سيكون موعد التسليم المتوقع؟',
    shortLabel: 'موعد التسليم',
    keywords: ['متى', 'توقيت', 'تاريخ', 'تسليم', 'المده', 'المدة', 'يوم', 'ايام', 'أيام', 'اسبوع', 'أسبوع', 'شهر', 'delivery', 'deadline']
  },
  {
    id: 'free_changes',
    label: 'كم مدة التعديلات المجانية والضمان؟',
    shortLabel: 'مدة الضمان',
    keywords: ['تعديل', 'تعديلات', 'مجاني', 'ضمان', 'صيانه', 'صيانة', 'الدعم', 'support', 'warranty', 'صيانة', 'فترة']
  },
  {
    id: 'allowed_changes',
    label: 'ما التعديلات المسموحة بعد التسليم؟',
    shortLabel: 'التعديلات المسموحة',
    keywords: ['مسموح', 'مسموحة', 'ما بعد', 'بعد التسليم', 'يشمل', 'شامل', 'المضمنة', 'سوف يتم', 'تغيير', 'تحديث', 'ترقية']
  }
];

const SCENARIOS = {
  cafe: {
    id: 'cafe',
    name: 'مقهى كوفي شوب',
    client: 'أبو أحمد',
    role: 'صاحب المقهى',
    avatarEmoji: '☕',
    difficulty: 'سهل',
    personality: 'رجل أعمال متوسطي العمر، يُهتم بالميزانية جداً، صبور لكنه متردد في اتخاذ القرارات. يتحدث لغة عربية بسيطة مع بعض العامية الخليفة. أحياناً يسأل خصم على السعر ولا يحب المبالغة في التفاصيل التقنية.',
    background: 'أبقى مقهى في شارع رئيسي. أستقبل حوالي 50-70 زبون يومياً. لدي كاشير واحد، مكاتب إدارية صغيرة، وصالة جلوس داخلية وخارجية. ميزانيتي محدودة وأبحث عن أفضل قيمة مقابل المال.',
    budgetRange: { min: 1500, max: 3000 },
    expectations: ['تغطية WiFi قوية في جميع مناطق الجلوس', 'شبكة منفصلة للزبائن عن الكاشير', 'استقرار الاتصال لساعات الذروة'],
    sampleAnswers: {
      devices: 'أنا توقعت أنا بحاجة لـ 3 أو 4 نقاط وصول على الأقل، بجانب راوتر وسويتش 16 منفذ للكاشير والأجهزة الإدارية. عندي كاشير واحد وجهاز لابتوب للإدارة وطابعة فواتير. ما رأيك يا باش مهندس؟ هذا يكفي ولا تحتاج أجهزة إضافية؟',
      internet: 'عندي اتصال DSL من STC بسرعة 100 ميجا. سؤالي: هذا يكفي ولا أحتاج ترقية؟ أحياناً في ساعات الذروة (من 4 إلى 8 مساءً) تشتكي الزبائن من بطء الإنترنت.',
      guest_vlan: 'إيه نعم طبعاً! زبائن المقهى ما لهم يدخلون شبكة الكاشير أو المكاتب الإدارية أبداً. هذي خدمة زبائن أساسية وأنا خائف من أي مشكلة أمنية أو سرعة تنخفض بسببهم.',
      budget: 'توقعاتي المالية من 1500 إلى 2500 ريال كحد أقصى. أقدر أدفع أكثر بقليل لو التجهيزات جودة عالية وضمنت لي سرعة واستقرار.',
      space: 'المقهى في طابق واحد، مساحته تقريباً 180 متر مربع. عندي صالة داخلية للجلوس وفناء خارجي صغير بجانب المقهى (40 متر) أحتاج تغطيته بنفس الوقت.'
    }
  },
  hospital: {
    id: 'hospital',
    name: 'مركز طبي',
    client: 'د. خالد',
    role: 'مدير المركز الطبي',
    avatarEmoji: '🏥',
    difficulty: 'متوسط',
    personality: 'شخص محترف ودقيق للغاية، يتحدث لغة عربية فصحى محترفة. أهم شيء عنده هو الأمان وسرعة البيانات. يناقش التفاصيل التقنية بعمق ويرفض أي حل دون تبرير منطقي.',
    background: 'أنا مدير مركز طبي متكامل به عيادات خارجية، مختبر، ووحدة رعاية نهارية. لدينا نظام HIS و PACS للصور الطبية. الأمان وسرعة الوصول للصور الطبية أولوية قصوى، ولا نقبل أي انقطاع للخدمة.',
    budgetRange: { min: 8000, max: 15000 },
    expectations: ['شبكة طبية معزولة تماماً عن شبكة الزوار', 'سرعة فائقة لنظام PACS والصور الطبية', 'نسخ احتياطي واستمرارية الخدمة'],
    sampleAnswers: {
      devices: 'المركز يحتاج 25 جهاز كمبيوتر للأطباء والاستقبال، 5 طابعات طبية (فواتير ووصفات)، 3 أجهزة أشعة رقمية متصلة بالشبكة، ونقاط وصول لتغطية جميع الأقسام بما فيهم غرف المرضى. ما التقدير المناسب لك؟',
      internet: 'لدينا خط ألياف بصرية بسرعة 1 جيجا من شركتنا مع خط احتياطي ثانوي 500 ميجا من شركة أخرى. هذا كافٍ أم نحتاج أكثر؟ نحتاج سرعة عالية جداً لنقل الصور الطبية.',
      guest_vlan: 'طبعاً شبكة مرضى وزوار يجب أن تكون معزولة تماماً (100%) عن الشبكة الطبية. هذا غير قابل للنقاش وشرط أساسي. هل تضمن عزل كامل بلا أي ثغرات؟',
      budget: 'ميزانيتنا للشبكة تبدأ من 8000 ريال فما فوق، مع عقد دعم سنوي منفصل. الجودة والأمان أهم من السعر بلا منازع، ولا نمثل الحلول الرخيصة.',
      space: 'المركز يمتد على طابقين، كل طابق مساحة 300 متر مربع. الطابق الأرضي: الاستقبال، عيادات خارجية، الصيدلية، والمختبر. الطابق الأول: غرف المرضى، إدارة، وقسم الأشعة.'
    }
  },
  office: {
    id: 'office',
    name: 'شركة ناشئة',
    client: 'أ. سارة',
    role: 'مسؤولة التقنية',
    avatarEmoji: '💼',
    difficulty: 'متقدم',
    personality: 'شابة ملمة بالتقنية، تتحدث بطلاقة وتفهم المصطلحات التقنية بعمق. سريعة البديهة، تحب الأسئلة المتقدمة والمبتكرة، وتتوقع حلاً قابلاً للتوسع السريع.',
    background: 'شركة ناشئة في مجال التكنولوجيا بها 80 موظفاً حالياً وننمو بسرعة. نحتاج VPN آمن للعمل عن بعد، VLANs منفصلة للإدارات المختلفة، وبيئة قابلة للتوسع السريع خلال 6 أشهر القادمة.',
    budgetRange: { min: 10000, max: 20000 },
    expectations: ['شبكة قابلة للتوسع السريع', 'VPN آمن للعمل عن بعد', 'VLANs منفصلة لكل إدارة'],
    sampleAnswers: {
      devices: 'الآن لدينا 80 موظفاً، كل واحد جهاز لابتوب، بالإضافة إلى 6 طابعات شبكية، 12 نقطة وصول للطابق الحالي، 4 سويتشات إدارية، و خوادم صغيرة للملفات والتطبيقات. التقدير للشطر التالي؟',
      internet: 'خط ألياف بصري 1Gbps دائم، مع خط ثانوي كاحتياطي 500Mbps. هل تحتاج أي شيء إضافي؟ نحتاج أيضاً اتصال VPN آمن للموظفين اللي يعملون من البيت.',
      guest_vlan: 'نعم، شبكة زوار في منطقة الاستقبال، مع شبكة IoT للمباني الذكية (مفاتيح إضاءة، كاميرات) معزولة تماماً عن شبكة الموظفين الإنتاجية. عندنا 3 إدارات رئيسية نحتاج VLAN منفصل لكل وحدة.',
      budget: 'ميزانية السنة الأولى 10,000 إلى 15,000 ريال، مع قابلية زيادة الميزانية كل سنة حسب نمو الشركة. الأهم أن تكون التجهيزات قابلة للتوسع من دون الحاجة لاستبدالها بالكامل.',
      space: 'مقرنا الحالي طابق واحد مساحته 400 متر مربع، مقسوم إلى 3 إدارات رئيسية + منطقة مفتوحة + 5 غرف اجتماعات. لكننا نخطط للانتقال لمبنى بثلاثة طوابق خلال 6 أشهر، لذا الحل لازم يكون مرن.'
    }
  }
};

const FEEDBACK_TYPES = {
  excellent: { label: 'ممتاز 🌟', minScore: 0.85 },
  good: { label: 'جيد جداً ✅', minScore: 0.7 },
  good_incomplete: { label: 'جيد مع نقص 🟡', minScore: 0.55 },
  positive: { label: 'إيجابي 👍', minScore: 0.45 },
  neutral: { label: 'محايد ➖', minScore: 0.3 },
  incorrect: { label: 'بحاجة لمراجعة ❌', minScore: 0 }
};

class ScenarioEngine {
  constructor(scenarioId, history = [], userLevel = 'beginner', conversationStage = 1, stageData = null) {
    this.scenarioId = scenarioId || 'cafe';
    this.history = Array.isArray(history) ? history : [];
    this.userLevel = userLevel || 'beginner';
    this.scenario = SCENARIOS[this.scenarioId] || SCENARIOS.cafe;
    this.stage = Number(conversationStage) || 1;
    this.stageData = stageData || this.initializeStageData();
    this.conversationMetrics = {
      totalTurns: 0,
      stageTurns: {},
      averageResponseTime: []
    };
  }

  initializeStageData() {
    return {
      stage1: {
        answeredQuestionIds: [],
        lastAnsweredId: null,
        budgetAnswer: null,
        detectedAnswers: {}
      },
      stage2: {
        negotiationStarted: false,
        agreed: false,
        proposedPrice: null,
        lastOffer: null,
        round: 0,
        offersHistory: []
      },
      stage3: {
        answeredQuestionIds: [],
        lastAnsweredId: null,
        detectedAnswers: {}
      },
      stage4: {
        fileUploaded: false,
        fileName: null,
        fileSize: null,
        uploadTime: null,
        fileReviewed: false
      },
      stage5: {
        completed: false,
        completionTime: null,
        finalRemarks: []
      }
    };
  }

  static hydrateStageData(snapshot) {
    if (!snapshot) return null;
    const s = typeof snapshot === 'string' ? JSON.parse(snapshot) : snapshot;
    return {
      stage1: {
        answeredQuestionIds: Array.isArray(s.stage1?.answeredQuestionIds) ? s.stage1.answeredQuestionIds : [],
        lastAnsweredId: s.stage1?.lastAnsweredId ?? null,
        budgetAnswer: s.stage1?.budgetAnswer ?? null,
        detectedAnswers: s.stage1?.detectedAnswers ?? {}
      },
      stage2: {
        negotiationStarted: s.stage2?.negotiationStarted ?? false,
        agreed: s.stage2?.agreed ?? false,
        proposedPrice: s.stage2?.proposedPrice ?? null,
        lastOffer: s.stage2?.lastOffer ?? null,
        round: s.stage2?.round ?? 0,
        offersHistory: Array.isArray(s.stage2?.offersHistory) ? s.stage2.offersHistory : []
      },
      stage3: {
        answeredQuestionIds: Array.isArray(s.stage3?.answeredQuestionIds) ? s.stage3.answeredQuestionIds : [],
        lastAnsweredId: s.stage3?.lastAnsweredId ?? null,
        detectedAnswers: s.stage3?.detectedAnswers ?? {}
      },
      stage4: {
        fileUploaded: s.stage4?.fileUploaded ?? false,
        fileName: s.stage4?.fileName ?? null,
        fileSize: s.stage4?.fileSize ?? null,
        uploadTime: s.stage4?.uploadTime ?? null,
        fileReviewed: s.stage4?.fileReviewed ?? false
      },
      stage5: {
        completed: s.stage5?.completed ?? false,
        completionTime: s.stage5?.completionTime ?? null,
        finalRemarks: Array.isArray(s.stage5?.finalRemarks) ? s.stage5.finalRemarks : []
      }
    };
  }

  serializeStageData() {
    return {
      stage1: { ...this.stageData.stage1 },
      stage2: { ...this.stageData.stage2 },
      stage3: { ...this.stageData.stage3 },
      stage4: { ...this.stageData.stage4 },
      stage5: { ...this.stageData.stage5 }
    };
  }

  normalizeArabic(text) {
    if (!text || typeof text !== 'string') return '';
    return text
      .toLowerCase()
      .replace(/[إأآا]/g, 'ا')
      .replace(/[ئؤ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/[ًٌٍَُِّْ]/g, '')
      .replace(/[^\w\s\u0600-\u06FF]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  detectStage1Questions(message) {
    const norm = this.normalizeArabic(message);
    const detected = [];
    const detectedWithDetails = [];

    MANDATORY_QUESTIONS_STAGE1.forEach((q) => {
      const matches = q.keywords.filter((kw) => norm.includes(this.normalizeArabic(kw)));
      if (matches.length > 0) {
        detected.push(q.id);
        detectedWithDetails.push({
          id: q.id,
          label: q.label,
          matchedKeywords: matches,
          strength: Math.min(1, matches.length / Math.max(2, Math.floor(q.keywords.length / 2)))
        });
      }
    });

    return { ids: detected, details: detectedWithDetails };
  }

  detectStage3Questions(message) {
    const norm = this.normalizeArabic(message);
    const detected = [];
    const detectedWithDetails = [];

    DELIVERY_QUESTIONS_STAGE3.forEach((q) => {
      const matches = q.keywords.filter((kw) => norm.includes(this.normalizeArabic(kw)));
      if (matches.length > 0) {
        detected.push(q.id);
        detectedWithDetails.push({
          id: q.id,
          label: q.label,
          matchedKeywords: matches,
          strength: Math.min(1, matches.length / Math.max(2, Math.floor(q.keywords.length / 2)))
        });
      }
    });

    return { ids: detected, details: detectedWithDetails };
  }

  extractPriceFromMessage(message) {
    if (!message) return null;
    const patterns = [
      /(\d{1,3}(?:[.,\s]\d{3})+)/g,
      /(\d{4,})/g
    ];
    let match = null;
    for (const pattern of patterns) {
      const matches = message.match(pattern);
      if (matches && matches.length > 0) {
        const raw = matches[matches.length - 1].replace(/[.,\s]/g, '');
        const num = parseInt(raw, 10);
        if (!isNaN(num) && num > 0 && num < 1000000) {
          match = num;
          break;
        }
      }
    }
    return match;
  }

  hasAllStage1Answered() {
    return MANDATORY_QUESTIONS_STAGE1.every((q) =>
      this.stageData.stage1.answeredQuestionIds.includes(q.id)
    );
  }

  hasAllStage3Answered() {
    return DELIVERY_QUESTIONS_STAGE3.every((q) =>
      this.stageData.stage3.answeredQuestionIds.includes(q.id)
    );
  }

  getRemainingStage1Questions() {
    return MANDATORY_QUESTIONS_STAGE1.filter(
      (q) => !this.stageData.stage1.answeredQuestionIds.includes(q.id)
    );
  }

  getRemainingStage3Questions() {
    return DELIVERY_QUESTIONS_STAGE3.filter(
      (q) => !this.stageData.stage3.answeredQuestionIds.includes(q.id)
    );
  }

  getAnsweredStage1Ids() {
    return this.stageData.stage1.answeredQuestionIds;
  }

  getAnsweredStage3Ids() {
    return this.stageData.stage3.answeredQuestionIds;
  }

  getRecentHistoryForLLM(count = 10) {
    const recent = this.history.slice(-count);
    return recent
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: (m.content || m.text || '').toString().slice(0, 800)
      }))
      .filter((m) => m.content && m.content.trim().length > 0);
  }

  async callLLM(systemPrompt, userPrompt, options = {}) {
    const { temperature = 0.7, maxTokens = 1024, expectJSON = false } = options;
    const apiKey = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || '';
    const useMock = !apiKey || apiKey.trim().length < 10;

    if (useMock) {
      return this.fallbackMockResponse(systemPrompt, userPrompt, expectJSON);
    }

    const messages = [
      { role: 'system', content: systemPrompt },
      ...this.getRecentHistoryForLLM(8),
      { role: 'user', content: userPrompt }
    ];

    const startTime = Date.now();
    try {
      const endpoint = 'https://api.deepseek.com/v1/chat/completions';
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages,
          temperature,
          max_tokens: maxTokens,
          top_p: 0.95,
          frequency_penalty: 0.1,
          presence_penalty: 0.1,
          response_format: expectJSON ? { type: 'json_object' } : undefined
        })
      });

      const elapsed = Date.now() - startTime;
      this.conversationMetrics.averageResponseTime.push(elapsed);

      if (!resp.ok) {
        const errorBody = await resp.text().catch(() => '');
        console.warn(`[ScenarioEngine] LLM HTTP ${resp.status}: ${errorBody.slice(0, 200)}`);
        throw new Error(`LLM HTTP ${resp.status}`);
      }

      const data = await resp.json();
      const content = data.choices?.[0]?.message?.content || '';

      return {
        content,
        usedFallback: false,
        provider: 'DeepSeek',
        model: data.model || 'deepseek-chat',
        tokens: {
          prompt: data.usage?.prompt_tokens || 0,
          completion: data.usage?.completion_tokens || 0,
          total: data.usage?.total_tokens || 0
        },
        responseTimeMs: elapsed
      };
    } catch (err) {
      console.warn('[ScenarioEngine] LLM call failed, using mock fallback:', err.message);
      return this.fallbackMockResponse(systemPrompt, userPrompt, expectJSON);
    }
  }

  fallbackMockResponse(systemPrompt, userPrompt, expectJSON) {
    const stage = this.stage;
    const scenario = this.scenario;
    let replyText = '';
    let suggestedStageChange = null;
    let feedbackType = 'neutral';
    let feedbackScore = 0.5;
    let feedbackNote = 'رد تجريبي (وضع Mock)';
    let feedbackPoints = ['استمر في التفاعل لإكمال المرحلة'];

    switch (stage) {
      case 1: {
        const remaining = this.getRemainingStage1Questions();
        const answered = this.getAnsweredStage1Ids();

        if (remaining.length > 0) {
          const currentQ = remaining[0];
          const sample = scenario.sampleAnswers[currentQ.id] ||
            `بالنسبة لسؤالك عن "${currentQ.label}"، هذه تفاصيلي: لدينا تجهيزات أساسية تحتاج تطوير...`;
          replyText =
            `سؤال ممتاز! هذا يساعدنا كثيراً في تحديد المتطلبات بدقة. 👍\n\n` +
            `${sample}\n\n` +
            (remaining.length > 1
              ? `💡 تلميح: مازلت أحتاج أن تسألني عن: ${remaining.slice(1).map((r) => r.shortLabel).join('، ')}.`
              : `✅ أحسنت! لقد استكملت جميع الأسئلة الإلزامية الخمسة. يمكننا الآن الانتقال لمناقشة السعر!`);

          feedbackType = answered.length >= 4 ? 'good' : 'positive';
          feedbackScore = 0.55 + answered.length * 0.08;
          feedbackNote = answered.length >= 4
            ? 'تقدم ممتاز في استكشاف المتطلبات!'
            : 'طريقة سؤال جيدة، استمر في استكشاف الباقي.';
          feedbackPoints = [
            'طرحت أسئلة مناسبة لاستكشاف المتطلبات',
            `تبقى ${remaining.length} أسئلة إلزامية قبل الانتقال`
          ];

          if (this.hasAllStage1Answered()) {
            suggestedStageChange = 2;
            feedbackType = 'excellent';
            feedbackScore = 0.9;
            feedbackNote = 'أحسنت! تم استكشاف جميع المتطلبات بنجاح.';
          }
        } else {
          replyText = '✅ أحسنت! لقد أجبت على جميع الأسئلة الإلزامية الخمسة. الآن سأنتقل معك للمرحلة التالية — التفاوض على السعر والتكلفة. تفضل وقدم عرض السعر الخاص بك مع ذكر تفاصيل التجهيزات.';
          suggestedStageChange = 2;
          feedbackType = 'excellent';
          feedbackScore = 0.92;
          feedbackNote = 'اكتمل المرحلة الأولى بنجاح!';
        }
        break;
      }

      case 2: {
        const proposedPrice = this.extractPriceFromMessage(userPrompt) || this.stageData.stage2.lastOffer;
        const round = this.stageData.stage2.round;
        const { min, max } = scenario.budgetRange;

        if (round === 0 && !proposedPrice) {
          replyText = '🤔 حسناً يا باش مهندس. الآن أريد أن تسمع منك عرض السعر التفصيلي. كم السعر الإجمالي للمشروع كاملاً؟ وما التجهيزات التي ستقوم بتوفيرها؟ لا تنسَ أن تذكر الضمان والدعم أيضاً.';
          feedbackType = 'neutral';
          feedbackScore = 0.4;
          feedbackNote = 'في انتظار عرض السعر الأول.';
        } else {
          const isReasonable = proposedPrice && proposedPrice >= min * 0.9 && proposedPrice <= max * 1.1;
          const isTooHigh = proposedPrice && proposedPrice > max * 1.1;
          const isTooLow = proposedPrice && proposedPrice < min * 0.9;

          if (round === 0) {
            if (isTooHigh) {
              replyText = `واواو السعر ${proposedPrice} ريال مرتفع جداً عن توقعاتي يا باش مهندس! أنا متوقع شيء في حدود ${min} إلى ${max} ريال. هل بإمكانك شرح لماذا السعر بهذا الارتفاع؟ وما هي التجهيزات بالضبط اللي تدفع للسعر هذا؟ ممكن تخفيض السعر شوي لو اختصرت بعض التفاصيل غير الضرورية؟`;
              feedbackType = 'good_incomplete';
              feedbackScore = 0.55;
              feedbackNote = 'السعر أعلى من توقعات العميل، حاول التفاوض.';
              feedbackPoints = ['قدم عرض سعر واضح', 'السعر أعلى من الميزانية المتوقعة'];
            } else if (isTooLow) {
              replyText = `هذا السعر ${proposedPrice} ريال منخفض بشكل مريب! هل التجهيزات أصلية ولا مستعملة؟ هل الضمان شامل؟ ما نوع الدعم اللي بتعطيني؟ أخشى أن يكون السعر المنخفض يعني جودة منخفضة. أريد أمان وجودة!`;
              feedbackType = 'good_incomplete';
              feedbackScore = 0.5;
              feedbackNote = 'السعر أقل من المتوقع، العميل يشك في الجودة.';
              feedbackPoints = ['السعر جذاب لكن منخفض', 'يعاني العميل من قلق بشأن الجودة'];
            } else {
              replyText = `حسناً السعر ${proposedPrice || 'المعروض'} ريال منطقي إلى حد ما. لكن قبل ما أوافق، أريد منك أن تشرح لماذا هذا السعر مناسب؟ وما الفائدة العملية التي سأحصل عليها مقابل هذا المبلغ؟ وكم مدة الضمان والدعم الفني المشمولين؟`;
              feedbackType = 'good';
              feedbackScore = 0.7;
              feedbackNote = 'السعر منطقي، العميل يبحث عن مبررات إضافية.';
              feedbackPoints = ['عرض سعر ضمن الميزانية المقبولة', 'العميل يطلب تبريراً منطقياً للسعر'];
            }
          } else if (round === 1) {
            if (isReasonable) {
              replyText = `كلامك مقنع يا باش مهندس! اتفقنا على السعر ${proposedPrice ? proposedPrice + ' ريال' : ''}. 👍 أنا راضٍ عن التجهيزات والعرض. والآن قبل أن ننتهي، عندي ثلاثة أسئلة بسيطة عن التسليم والدعم بعد التسليم. تفضل أبدأ بالسؤال الأول: متى يمكن أن يسلم المشروع؟`;
              suggestedStageChange = 3;
              feedbackType = 'excellent';
              feedbackScore = 0.88;
              feedbackNote = 'تم الاتفاق على السعر بنجاح!';
              feedbackPoints = ['حجج التفاوض قوية ومقنعة', 'تم الوصول إلى اتفاق مناسب للطرفين'];
            } else {
              replyText = `حاولت أقنع بنفسك يا باش مهندس، لكن السعر ما زال بعيد عن نطاقي. هل بإمكانك تعديل العرض قليلاً؟ أو تزيد مدة الضمان والدعم لتبرير السعر الحالي؟`;
              feedbackType = 'good_incomplete';
              feedbackScore = 0.6;
              feedbackNote = 'التفاوض مستمر، حاول تحسين العرض.';
            }
          } else {
            replyText = `تمام كلامك مقنع يا باش مهندس! اتفقنا. 👍\n\nالآن قبل ما ننتقل للتنفيذ، عندي ثلاثة أسئلة مهمة عن التسليم والدعم: 1) متى التسليم؟ 2) كم مدة التعديلات المجانية والضمان؟ 3) ما التعديلات المسموحة بعد التسليم؟`;
            suggestedStageChange = 3;
            feedbackType = 'excellent';
            feedbackScore = 0.85;
            feedbackNote = 'اكتملت مرحلة التفاوض بنجاح.';
          }
        }
        break;
      }

      case 3: {
        const remaining = this.getRemainingStage3Questions();
        const answered = this.getAnsweredStage3Ids();

        if (remaining.length > 0) {
          const nextQ = remaining[0];
          const sampleAnswers = {
            delivery_time: 'التسليم خلال أسبوعين عمل كحد أقصى، وبإمكاني البدء فوراً بعد توقيع العقد.',
            free_changes: 'الضمان سنة كاملة على الأجهزة، وشهرين تعديلات مجانية على التصميم والبرمجة بعد التسليم.',
            allowed_changes: 'التعديلات المشمولة: برمجة الأجهزة، إعادة ضبط الشبكة، و إضافة مستخدمين جدد. أي تغيير في الأجهزة الفعلية يكون بتكلفة إضافية.'
          };

          replyText =
            `إجابة واضحة ومقبولة! 👍\n\n` +
            `الآن السؤال التالي: "${nextQ.label}"\n\n` +
            `💡 مثال إجابة: "${sampleAnswers[nextQ.id] || 'وضح الإجابة بدقة وتفاصيل عملية.'}"\n\n` +
            (remaining.length > 1
              ? `⚠️ مازلت أحتاج إجابات على: ${remaining.slice(1).map((r) => r.shortLabel).join('، ')}.`
              : `✅ هذا هو آخر سؤال! بعد إجابتك سننتقل مباشرة لمرحلة رفع التصميم.`);

          feedbackType = answered.length >= 2 ? 'good' : 'positive';
          feedbackScore = 0.6 + answered.length * 0.1;
          feedbackNote = `تم الإجابة على ${answered.length} من 3 أسئلة التسليم.`;
          feedbackPoints = [
            `وضوح في إجابة أسئلة التسليم`,
            `تبقى ${remaining.length} أسئلة قبل الانتقال`
          ];

          if (this.hasAllStage3Answered()) {
            suggestedStageChange = 4;
            feedbackType = 'excellent';
            feedbackScore = 0.9;
            feedbackNote = 'أحسنت! تم الإجابة على جميع أسئلة التسليم.';
          }
        } else {
          replyText = '✅ ممتاز! لقد أجبت على جميع أسئلة التسليم الثلاثة بوضوح. والآن حان وقت التنفيذ العملي: أرفق لي ملف تصميم الشبكة (ملف Packet Tracer بصيغة .pkt أو .pka) وأنا أراجعه معك فوراً ثم نتجه للتسليم النهائي.';
          suggestedStageChange = 4;
          feedbackType = 'excellent';
          feedbackScore = 0.91;
          feedbackNote = 'اكتملت مرحلة التسليم بنجاح!';
        }
        break;
      }

      case 4: {
        const uploaded = this.stageData.stage4.fileUploaded;
        if (uploaded) {
          replyText =
            `✅ تم استلام ملف المشروع (${this.stageData.stage4.fileName || 'ملف تصميم الشبكة'}) بنجاح! شكراً جزيلاً على الجهد المبذول في التصميم.\n\n` +
            `📋 ملاحظاتي سريعة على التصميم: يبدو التنظيم جيداً، وفصل الأجهزة واضح، وربط الشبكات منظم. ممتاز!\n\n` +
            `🎉 سأنتقل الآن معك إلى التسليم النهائي والختام.`;
          suggestedStageChange = 5;
          feedbackType = 'excellent';
          feedbackScore = 0.93;
          feedbackNote = 'تم رفع واستلام ملف التصميم بنجاح.';
        } else {
          replyText = '💡 الآن نحن في مرحلة تنفيذ المشروع وتسليم التصميم. تفضل وأرفق لي ملف Packet Tracer (.pkt أو .pka) يحتوي على تصميم الشبكة الكامل (الأجهزة، الربط، عناوين IP، VLANs، الخ). يمكنك سحب الملف وإفلاته في المنطقة المخصصة أو الضغط عليها لاختيار الملف.';
          feedbackType = 'neutral';
          feedbackScore = 0.4;
          feedbackNote = 'في انتظار رفع ملف Packet Tracer.';
        }
        break;
      }

      case 5:
      default: {
        replyText =
          `🎉 تم تسليم المشروع بنجاح! 🎉\n\n` +
          `أشكرك يا باش مهندس على التصميم الاحترافي والمتابعة الممتازة طوال المشروع.\n\n` +
          `📊 ملخص ما تم إنجازه:\n` +
          `   • ✅ تم استكشاف المتطلبات بشكل شامل\n` +
          `   • ✅ تم الاتفاق على السعر المناسب\n` +
          `   • ✅ تم توضيح تفاصيل التسليم والدعم\n` +
          `   • ✅ تم استلام ملف تصميم الشبكة\n` +
          `   • ✅ تم التوقيع النهائي على التسليم\n\n` +
          `🚀 بالتوفيق في مشاريعك القادمة، ونتطلع للتعاون مستقبلاً معك على مشاريع جديدة. مع خالص التقدير، ${scenario.client}.`;

        if (!this.stageData.stage5.completed) {
          this.stageData.stage5.completed = true;
          this.stageData.stage5.completionTime = new Date().toISOString();
        }
        feedbackType = 'excellent';
        feedbackScore = 0.95;
        feedbackNote = 'أحسنت! تم إكمال المحاكاة بنجاح كامل!';
        feedbackPoints = ['الختام الإيجابي والمهني', 'تغطية جميع مراحل المحادثة'];
        break;
      }
    }

    if (expectJSON) {
      const jsonResult = {
        reply: replyText,
        stageChange: suggestedStageChange,
        stageFeedback: {
          score: feedbackScore,
          type: feedbackType,
          note: feedbackNote,
          points: feedbackPoints
        },
        aiMeta: {
          mandatoryAnswered: this.stage === 1
            ? this.getAnsweredStage1Ids()
            : this.stage === 3
              ? this.getAnsweredStage3Ids()
              : [],
          remainingNeeded: this.stage === 1
            ? this.getRemainingStage1Questions().map((q) => q.id)
            : this.stage === 3
              ? this.getRemainingStage3Questions().map((q) => q.id)
              : [],
          usedFallback: true
        }
      };
      return {
        content: JSON.stringify(jsonResult),
        usedFallback: true,
        provider: 'MockFallback',
        responseTimeMs: 100 + Math.floor(Math.random() * 400)
      };
    }

    return {
      content: replyText,
      usedFallback: true,
      provider: 'MockFallback',
      responseTimeMs: 100 + Math.floor(Math.random() * 400),
      suggestedStageChange,
      feedback: { score: feedbackScore, type: feedbackType, note: feedbackNote, points: feedbackPoints }
    };
  }

  buildSystemPromptForStage(stage) {
    const scenario = this.scenario;
    const basePersona =
`أنت ${scenario.client}، ${scenario.role} في مشروع ${scenario.name}.

الشخصية: ${scenario.personality}

الخلفية والسياق: ${scenario.background}

نطاق الميزانية المتوقع: ${scenario.budgetRange.min} - ${scenario.budgetRange.max} ريال.

أهم المتطلبات التي تركز عليها:
${scenario.expectations.map((e, i) => `  ${i + 1}. ${e}`).join('\n')}

القواعد العامة الهامة:
1. تجيب باللغة العربية الفصحى المبسطة مع طابع شخصيتك المميز (لا تكن نموذجياً أو روبوتياً).
2. لا تكشف للمستخدم أبداً أنك نموذج ذكاء اصطناعي أو جزء من نظام تعليمي.
3. أبدِ ردود واقعية تتناسب مع شخصيتك، مشروعك، وميزانيتك.
4. لا تعطي إجابات مفرطة في المثالية، كن إنسانياً: تحفظ، تتردد، أحياناً تطلب توضيح.
5. إذا كان السؤال غير واضح أو مبهم، اطلب توضيحاً بدلاً من تخمين الإجابة.
6. لا تذكر أرقام هواتف أو عناوين فعليه، أبقى ضمن السياق.
7. لا تقدم أي تشخيصات طبية أو نفسية أو ادعاءات تتعلق بالذكاء (IQ) أو الصحة النفسية أبداً — هذا ممنوع صراحةً.`;

    const s1Answered = this.getAnsweredStage1Ids();
    const s1Remaining = this.getRemainingStage1Questions();
    const s3Answered = this.getAnsweredStage3Ids();
    const s3Remaining = this.getRemainingStage3Questions();

    switch (stage) {
      case 1:
        return `${basePersona}

== المرحلة 1: تحديد الاحتياجات (5 أسئلة إلزامية) ==

مهمتك في هذه المرحلة:
المستخدم هو المهندس، يجب أن يسألك 5 أسئلة إلزامية (بالترتيب أو غيره) لتحديد متطلبات المشروع:
  1. كم عدد الأجهزة ونقاط الوصول المتوقعة؟
  2. ما نوع الإنترنت المتاح وسرعته؟
  3. هل تحتاج شبكة منفصلة للضيوف أو الزوار؟
  4. ما الميزانية التقريبية للمشروع؟
  5. كم مساحة المكان وعدد الطوابق؟

الأسئلة التي تمت الإجابة عليها بالفعل: ${s1Answered.length > 0 ? s1Answered.join('، ') : '(لا شيء حتى الآن)'}
الأسئلة الإلزامية المتبقية: ${s1Remaining.length > 0 ? s1Remaining.map((q) => q.id + ' - ' + q.shortLabel).join('، ') : '(تم الكل!)'}

دليل تقييم ردودك:
- إذا سأل أحد الأسئلة الخمسة: أجب عليه بتفاصيل واقعية من شخصيتك، وأضف عبارة تشجيعية مثل "سؤال ذكي! هذا يساعد كثيراً".
- إذا سأل عن شيء غير مهم الآن (تفاصيل دقيقة قبل فهم الاحتياجات): قل له بهدوء "هذا مهم لاحقاً، لكن الآن الأهم أن تسألني عن X" مع ذكر أحد الأسئلة المتبقية.
- إذا طرح سؤالاً ذكياً خارج القائمة لكنه ذو صلة: أجب عليه وقل "نقطة ذكية! سيساعدنا هذا أيضاً".
- لا تنتقل للمرحلة التالية إلا بعد الإجابة على جميع الأسئلة الخمسة الإلزامية.

عند إكمال جميع الأسئلة الخمسة: أخبره أن جميع الاحتياجات واضحة الآن، واطلب منه تقديم عرض سعر تفصيلي للبدء بالتفاوض.`;

      case 2:
        return `${basePersona}

== المرحلة 2: التفاوض على السعر ==

الميزانية التي ذكرتها في المرحلة السابقة: ${this.stageData.stage1.budgetAnswer ? this.stageData.stage1.budgetAnswer + ' ريال' : 'في حدود ' + scenario.budgetRange.min + '-' + scenario.budgetRange.max + ' ريال'}

عدد جولات التفاوض حتى الآن: ${this.stageData.stage2.round}
العروض السابقة: ${this.stageData.stage2.offersHistory.length > 0 ? this.stageData.stage2.offersHistory.join('، ') + ' ريال' : '(لا يوجد حتى الآن)'}

مهمتك في هذه المرحلة:
أنت عميل يبحث عن أفضل قيمة مقابل السعر. عندما يقدم المستخدم السعر:
  • في الجولة الأولى (Round 0): أبدِ تحفظاً معقولاً حتى لو كان السعر جيداً — هذا أسلوب تفاوض طبيعي.
  • اطلب تبريراً منطقياً للمبلغ: "لماذا السعر بهذا المستوى؟ ما الفائدة التي سأحصل عليها؟"
  • إذا كانت الحجة ضعيفة (مجرد "هذا هو السعر" بدون مبرر): أجب "حاول أن تشرح لماذا هذا السعر مناسب؟" وانتظر المزيد.
  • إذا كانت الحجج قوية ومبررة بشكل جيد (ذكر جودة الأجهزة، الضمان، الدعم، خطة الصيانة، سرعة التنفيذ): وافق عليه بخلاصة "كلامك مقنع، اتفقنا" مع إبداء ارتياحك.
  • بعد الاتفاق: أخبره أنك موافق، ثم انتقل للمرحلة التالية واطلب منه الإجابة على ثلاثة أسئلة بسيطة عن التسليم.

مستوى المستخدم: ${this.userLevel}. خفف الحجج إذا كان مبتدئاً، واشدد عليها إذا كان متقدماً.`;

      case 3:
        return `${basePersona}

== المرحلة 3: أسئلة التسليم (3 أسئلة إلزامية) ==

مهمتك في هذه المرحلة:
أنت تسأل المستخدم (المهندس) ثلاثة أسئلة حول التسليم والدعم ولا تكتفي بدون إجابة واضحة لكل واحد:
  1. متى سيكون موعد التسليم المتوقع؟
  2. كم مدة التعديلات المجانية والضمان؟
  3. ما التعديلات المسموحة بعد التسليم؟

الأسئلة التي تمت الإجابة عليها بالفعل: ${s3Answered.length > 0 ? s3Answered.join('، ') : '(لا شيء حتى الآن)'}
الأسئلة المتبقية: ${s3Remaining.length > 0 ? s3Remaining.map((q) => q.id + ' - ' + q.shortLabel).join('، ') : '(تم الكل!)'}

- اسأل الأسئلة بالتتابع: الأولى أولاً، وبعد إجابة واضحة اسأل الثانية، إلخ.
- تأكد من أن إجابات المستخدم واضحة وغير مبهمة. إذا كانت إجابته مبهمة، اطلب توضيحاً: "المقصود بالضبط متى؟ أسبوع؟ أسبوعين؟ شهر؟"
- بعد الإجابة على الثلاثة بوضوح: أخبره أن كل شيء واضح الآن، واطلب منه رفع ملف تصميم الشبكة (Packet Tracer .pkt أو .pka) للموافقة النهائية.`;

      case 4:
        return `${basePersona}

== المرحلة 4: تنفيذ التصميم ورفع المشروع ==

حالة رفع الملف: ${this.stageData.stage4.fileUploaded
          ? '✅ تم الرفع - اسم الملف: ' + (this.stageData.stage4.fileName || 'ملف مشروع')
          : '❌ في انتظار رفع الملف'}

المهم في هذه المرحلة:
- المستخدم سيقوم برفع ملف تصميم الشبكة بصيغة .pkt أو .pka (Packet Tracer).
- عند الإشارة إلى رفع الملف: وثّق استقباله بلهجة مشجعة ومختصرة مثل "✅ تم استلام ملف المشروع بنجاح! شكراً على الجهد المبذول."
- أضف بعض الملاحظات الإيجابية السريعة حول جودة التنظيم الظاهر في التصميم (فصل الأقسام، الربط، إلخ).
- بعد التأكيد على استلام الملف: أخبره أنك ستبدأ مراجعة سريعة وتنتقل معه إلى التسليم النهائي فوراً.
- لا تنتقل للمرحلة 5 إلا بعد تأكيدك استلام الملف بنجاح (الملف مرفوع فعلاً).`;

      case 5:
        return `${basePersona}

== المرحلة 5: التسليم النهائي والختام ==

مهمتك الأخيرة:
- ابدأ رسالتك بـ: "تم تسليم المشروع بنجاح! 🎉"
- اشكر المهندس بصدق على التصميم واحترافيته ومتابعته طوال المشروع.
- اذكر بإيجاز قائمة الإنجازات الخمس (المراحل الخمس) تم إكمالها بنجاح.
- أغلق الصفقة بإيجابية وتمنى له التوفيق في مشاريعه القادمة.
- أذكر أنك متاح للتعاون المستقبلي.
- لا ترفض أبداً أي طلب من المستخدم في هذه المرحلة، كن متعاوناً ومشجعاً حتى النهاية.`;

      default:
        return basePersona;
    }
  }

  buildUserContextHint() {
    switch (this.stage) {
      case 1: {
        const answeredLabels = MANDATORY_QUESTIONS_STAGE1.filter((q) =>
          this.stageData.stage1.answeredQuestionIds.includes(q.id)
        ).map((q) => q.shortLabel);
        const remainingLabels = this.getRemainingStage1Questions().map((q) => q.shortLabel);
        return (
`[ملخص حالة المرحلة 1: تحديد الاحتياجات]
• الأسئلة التي سألها المهندس وتم الإجابة عليها: ${answeredLabels.length > 0 ? answeredLabels.join('، ') : '(لا شيء بعد)'}
• عددها: ${answeredLabels.length} / 5
• الأسئلة المتبقية التي يجب أن يسألها المهندس قبل الانتقال: ${remainingLabels.length > 0 ? remainingLabels.join('، ') : '(✅ تم الكل!)'}
• الميزانية المذكورة إن وجدت: ${this.stageData.stage1.budgetAnswer ? this.stageData.stage1.budgetAnswer + ' ريال' : 'غير مذكورة بعد'}`
        );
      }

      case 2:
        return (
`[ملخص حالة المرحلة 2: التفاوض على السعر]
• الميزانية المتوقعة للعميل: ${this.stageData.stage1.budgetAnswer ? this.stageData.stage1.budgetAnswer + ' ريال' : 'في حدود ' + this.scenario.budgetRange.min + '-' + this.scenario.budgetRange.max + ' ريال'}
• عدد جولات التفاوض حتى الآن: ${this.stageData.stage2.round}
• آخر عرض سعر قدمه المهندس: ${this.stageData.stage2.lastOffer ? this.stageData.stage2.lastOffer + ' ريال' : 'لا يوجد بعد'}
• حالة الاتفاق: ${this.stageData.stage2.agreed ? '✅ تم الاتفاق' : '⏳ لم يتم الاتفاق بعد'}`
        );

      case 3: {
        const answeredLabels = DELIVERY_QUESTIONS_STAGE3.filter((q) =>
          this.stageData.stage3.answeredQuestionIds.includes(q.id)
        ).map((q) => q.shortLabel);
        const remainingLabels = this.getRemainingStage3Questions().map((q) => q.shortLabel);
        return (
`[ملخص حالة المرحلة 3: أسئلة التسليم]
• الأسئلة التي أجاب عليها المهندس: ${answeredLabels.length > 0 ? answeredLabels.join('، ') : '(لا شيء بعد)'}
• عددها: ${answeredLabels.length} / 3
• الأسئلة المتبقية التي يجب الإجابة عليها: ${remainingLabels.length > 0 ? remainingLabels.join('، ') : '(✅ تم الكل!)'}`
        );
      }

      case 4:
        return (
`[ملخص حالة المرحلة 4: تنفيذ التصميم ورفع المشروع]
• هل تم رفع ملف Packet Tracer؟ ${this.stageData.stage4.fileUploaded ? '✅ نعم - ' + (this.stageData.stage4.fileName || 'ملف مشروع') : '❌ لا - ينتظر رفع ملف .pkt أو .pka'}
• حجم الملف: ${this.stageData.stage4.fileSize ? Math.round(this.stageData.stage4.fileSize / 1024) + ' كيلوبايت' : 'غير متوفر بعد'}
• وقت الرفع: ${this.stageData.stage4.uploadTime || 'لا يوجد بعد'}`
        );

      case 5:
        return (
`[المرحلة 5: التسليم النهائي والختام]
• حالة إكمال المرحلة: ${this.stageData.stage5.completed ? '✅ تم الإغلاق بنجاح' : '⏳ في الختام...'}
• وقت الإغلاق: ${this.stageData.stage5.completionTime || '—'}`
        );

      default:
        return '';
    }
  }

  buildSuggestions() {
    switch (this.stage) {
      case 1: {
        const remaining = this.getRemainingStage1Questions();
        if (remaining.length === 0) {
          return [
            '✅ جميع الأسئلة مكتملة - قدم عرض السعر الآن',
            '🔢 قدم السعر الإجمالي مع تفاصيل التجهيزات',
            '📋 اذكر الضمان والدعم الفني ضمن العرض'
          ];
        }
        return remaining.map((q) => `اسأل العميل عن: ${q.shortLabel}`);
      }

      case 2: {
        const round = this.stageData.stage2.round;
        if (this.stageData.stage2.agreed || round >= 2) {
          return [
            '📦 انتقل للأسئلة الثلاثة عن التسليم',
            '🗓️ اسأل عن موعد التسليم المفضل',
            '🛡️ اذكر مدة الضمان والتعديلات المجانية'
          ];
        }
        return [
          '💸 ابِتْر السعر مع ذكر تفاصيل التجهيزات',
          '✅ أبرز جودة الأجهزة والعلامات التجارية',
          '🛡️ اذكر الضمان والدعم السنوي والصيانة',
          '🎯 وضح الفوائد العملية للمشروع على العميل'
        ];
      }

      case 3: {
        const remaining = this.getRemainingStage3Questions();
        if (remaining.length === 0) {
          return [
            '📤 ارفع ملف Packet Tracer الآن',
            '✅ تأكد من إدخال IPs الصحيحة للجميع',
            '📝 أضف تعليقات توضيحية داخل الملف'
          ];
        }
        return remaining.map((q) => `وضح إجابتك عن: ${q.shortLabel}`);
      }

      case 4:
        return [
          '📤 اسحب وأفلت ملف .pkt/.pka في المنطقة المخصصة',
          '🔍 تأكد من أن جميع الأجهزة متصلة بشكل صحيح',
          '🌐 تحقق من عناوين IP و VLANs لكل جهاز',
          '💬 أضف تعليقات داخل الملف شرحاً للتصميم'
        ];

      case 5:
        return [
          '🤝 أغلق الصفقة بإيجابية واشكر العميل',
          '📞 أذكر أنك متاح للدعم المستقبلي',
          '⭐ اطلب مراجعة أو تقييم الخدمة (اختياري)'
        ];

      default:
        return [];
    }
  }

  updateStageDataPreLLM(message, { fileUploaded = false, fileName = null, fileSize = null } = {}) {
    const prevStage = this.stage;

    if (this.stage === 1) {
      const { ids: detected } = this.detectStage1Questions(message);
      detected.forEach((id) => {
        if (!this.stageData.stage1.answeredQuestionIds.includes(id)) {
          this.stageData.stage1.answeredQuestionIds.push(id);
          this.stageData.stage1.detectedAnswers[id] = message.slice(0, 300);
          this.stageData.stage1.lastAnsweredId = id;
        }
      });
      const price = this.extractPriceFromMessage(message);
      if (detected.includes('budget') && price) {
        this.stageData.stage1.budgetAnswer = price;
      }
    }

    if (this.stage === 2) {
      this.stageData.stage2.negotiationStarted = true;
      const offer = this.extractPriceFromMessage(message);
      if (offer) {
        this.stageData.stage2.lastOffer = offer;
        if (!this.stageData.stage2.offersHistory.includes(offer)) {
          this.stageData.stage2.offersHistory.push(offer);
        }
      }
    }

    if (this.stage === 3) {
      const { ids: detected } = this.detectStage3Questions(message);
      detected.forEach((id) => {
        if (!this.stageData.stage3.answeredQuestionIds.includes(id)) {
          this.stageData.stage3.answeredQuestionIds.push(id);
          this.stageData.stage3.detectedAnswers[id] = message.slice(0, 300);
          this.stageData.stage3.lastAnsweredId = id;
        }
      });
    }

    if (this.stage === 4 && fileUploaded) {
      this.stageData.stage4.fileUploaded = true;
      this.stageData.stage4.fileName = fileName || 'ملف مشروع Packet Tracer';
      this.stageData.stage4.fileSize = fileSize || null;
      this.stageData.stage4.uploadTime = new Date().toISOString();
    }

    return prevStage;
  }

  applyGuardrails(llmRecommendedStage) {
    if (!llmRecommendedStage) return null;
    const recommended = Number(llmRecommendedStage);
    if (!recommended || recommended < 1 || recommended > 5) return null;
    if (recommended === this.stage) return null;
    if (recommended < this.stage) return null;

    if (this.stage === 1 && !this.hasAllStage1Answered()) return null;
    if (this.stage === 2 && this.stageData.stage2.round < 1) return null;
    if (this.stage === 3 && !this.hasAllStage3Answered()) return null;
    if (this.stage === 4 && !this.stageData.stage4.fileUploaded) return null;
    if (this.stage === 5) return null;

    return recommended;
  }

  computeRuleBasedStage() {
    if (this.stage === 1 && this.hasAllStage1Answered() && this.stageData.stage1.answeredQuestionIds.length >= 5) {
      return 2;
    }
    if (this.stage === 2 && this.stageData.stage2.round >= 2) {
      return 3;
    }
    if (this.stage === 3 && this.hasAllStage3Answered() && this.stageData.stage3.answeredQuestionIds.length >= 3) {
      return 4;
    }
    if (this.stage === 4 && this.stageData.stage4.fileUploaded) {
      return 5;
    }
    return null;
  }

  safeParseLLMJSON(content, usedFallback) {
    try {
      const trimmed = (content || '').trim();
      const firstBrace = trimmed.indexOf('{');
      const lastBrace = trimmed.lastIndexOf('}');

      if (firstBrace >= 0 && lastBrace > firstBrace) {
        const jsonStr = trimmed.substring(firstBrace, lastBrace + 1);
        const parsed = JSON.parse(jsonStr);

        const feedbackScore = Number(parsed.stageFeedback?.score);
        const feedbackType = (() => {
          const explicit = parsed.stageFeedback?.type;
          if (explicit && FEEDBACK_TYPES[explicit]) return explicit;
          const s = isNaN(feedbackScore) ? 0.5 : feedbackScore;
          if (s >= FEEDBACK_TYPES.excellent.minScore) return 'excellent';
          if (s >= FEEDBACK_TYPES.good.minScore) return 'good';
          if (s >= FEEDBACK_TYPES.good_incomplete.minScore) return 'good_incomplete';
          if (s >= FEEDBACK_TYPES.positive.minScore) return 'positive';
          if (s >= FEEDBACK_TYPES.neutral.minScore) return 'neutral';
          return 'incorrect';
        })();

        return {
          reply: (parsed.reply || content || '').toString(),
          stageChange: parsed.stageChange ? Number(parsed.stageChange) : null,
          stageFeedback: {
            score: isNaN(feedbackScore) ? 0.5 : Math.max(0, Math.min(1, feedbackScore)),
            type: feedbackType,
            note: (parsed.stageFeedback?.note || '').toString().slice(0, 200),
            points: Array.isArray(parsed.stageFeedback?.points)
              ? parsed.stageFeedback.points.slice(0, 4).map((p) => String(p).slice(0, 120))
              : []
          },
          aiMeta: parsed.aiMeta || { usedFallback: Boolean(usedFallback) }
        };
      }

      throw new Error('No valid JSON braces found in LLM response');
    } catch (parseErr) {
      if (usedFallback) {
        return {
          reply: (content || '').toString(),
          stageChange: this.computeRuleBasedStage(),
          stageFeedback: {
            score: 0.6,
            type: 'neutral',
            note: 'رد تلقائي - وضع Mock احتياطي',
            points: ['استمر في التفاعل لإكمال المرحلة']
          },
          aiMeta: { usedFallback: true }
        };
      }

      return {
        reply: (content || '').toString(),
        stageChange: null,
        stageFeedback: {
          score: 0.5,
          type: 'neutral',
          note: 'تعذر تحليل تقييم الذكاء الاصطناعي',
          points: ['أعد المحاولة مرة أخرى']
        },
        aiMeta: {}
      };
    }
  }

  async analyzeAndRespond(message, options = {}) {
    const { fileUploaded = false, fileName = null, fileSize = null } = options;
    const prevStage = this.stage;
    this.conversationMetrics.totalTurns++;
    this.conversationMetrics.stageTurns[this.stage] = (this.conversationMetrics.stageTurns[this.stage] || 0) + 1;

    const safeMessage = typeof message === 'string' ? message : String(message || '');

    this.updateStageDataPreLLM(safeMessage, { fileUploaded, fileName, fileSize });

    const systemPrompt = this.buildSystemPromptForStage(this.stage);
    const stageHint = this.buildUserContextHint();

    const userPrompt =
      `${stageHint ? stageHint + '\n\n' : ''}` +
      `📩 رسالة المستخدم (المهندس):\n"${safeMessage}"` +
      `${fileUploaded ? `\n\n📎 [ملف مرفق]: تم استلام الملف بنجاح من قبل النظام: اسم الملف = ${fileName || 'ملف تصميم Packet Tracer'}${fileSize ? ' | حجم الملف = ' + Math.round(fileSize / 1024) + ' كيلوبايت' : ''}. التعامل معه كأن العميل استلمه.` : ''}`;

    const evaluationPrompt =
      `${systemPrompt}\n\n` +
      `========== مهمتك الآن ==========\n` +
      `1. اقرأ ملخص حالة المرحلة الحالية والسياق أعلاه.\n` +
      `2. رد على رسالة المستخدم بناءً على شخصيتك وقواعد المرحلة (${STAGE_NAMES[this.stage]}).\n` +
      `3. قم بتقييم أداء المستخدم في هذه المرحلة.\n` +
      `4. رجّح الانتقال للمرحلة التالية إذا وجدت أن جميع الشروط مستوفاة.\n\n` +
      `${stageHint ? '===== ملخص حالة المرحلة =====\n' + stageHint + '\n\n' : ''}` +
      `===== رسالة المستخدم =====\n"${safeMessage}"\n` +
      `${fileUploaded ? `\n===== ملف مرفق =====\nتم رفع ملف بنجاح: ${fileName || 'Packet Tracer file'} (${fileSize ? Math.round(fileSize / 1024) + ' KB' : ''}).\n` : ''}\n` +
      `\n========== تنسيق الإجابة المطلوب (JSON STRICT) ==========\n` +
      `أرجع كائن JSON واحد فقط بدون أي نص إضافي أو شرح أو علامات markdown بالهيكل التالي:\n` +
      `{\n` +
      `  "reply": "نص ردك هنا بناءً على شخصيتك وقواعد المرحلة الحالية — كن إنسانياً واقعياً",\n` +
      `  "stageChange": null أو رقم المرحلة التالية (1-5) إذا وجدت أن جميع الشروط مستوفاة للانتقال، وإلا اتركها null,\n` +
      `  "stageFeedback": {\n` +
      `    "score": رقم عشري بين 0 و 1 (1 هو الأداء المثالي),\n` +
      `    "type": "excellent" أو "good" أو "good_incomplete" أو "positive" أو "neutral" أو "incorrect",\n` +
      `    "note": "ملاحظة تقويمية قصيرة واحدة تشرح سبب هذه الدرجة",\n` +
      `    "points": ["نقطة قوة واحدة على الأقل في أداء المستخدم", "نقطة واحدة تحتاج تحسين أو اقتراح"]\n` +
      `  },\n` +
      `  "aiMeta": {\n` +
      `    "mandatoryAnswered": ["قائمة المعرفات (ids) للأسئلة الإلزامية التي تم الإجابة عليها في هذه المرحلة"],\n` +
      `    "remainingNeeded": ["قائمة المعرفات للأسئلة/الإجراءات المتبقية قبل الانتقال للمرحلة التالية"]\n` +
      `  }\n` +
      `}\n` +
      `\nتنبيهات مهمة:\n` +
      `• لا تضف أي نص خارج الأقواس {}.\n` +
      `• لا تضع علامات \`\`\`json حول الكائن.\n` +
      `• تأكد من أن جميع الأرقام أرقام وليس سلاسل نصية.\n` +
      `• مرشح stageChange يجب أن يمر بفحص Guardrails — لا تقترحه إلا إذا تم تحقيق جميع الشروط الإلزامية للمرحلة.`;

    const llmResult = await this.callLLM(evaluationPrompt, userPrompt, {
      temperature: 0.65,
      maxTokens: 1200,
      expectJSON: true
    });

    let parsed = this.safeParseLLMJSON(llmResult.content, llmResult.usedFallback);

    if (!parsed.reply && !llmResult.usedFallback) {
      console.warn('[ScenarioEngine] JSON parse failed, retrying with plain-text mode...');
      const simpleResult = await this.callLLM(systemPrompt, userPrompt, {
        temperature: 0.7,
        maxTokens: 900,
        expectJSON: false
      });
      parsed = {
        reply: simpleResult.content || parsed.reply || 'عذراً، حاول مرة أخرى.',
        stageChange: this.computeRuleBasedStage(),
        stageFeedback: {
          score: 0.55,
          type: 'neutral',
          note: 'رد عادي — تعذر التحليل الدقيق',
          points: ['استمر في التفاعل']
        },
        aiMeta: {}
      };
    }

    let finalStageChange = this.applyGuardrails(parsed.stageChange);

    if (!finalStageChange) {
      finalStageChange = this.applyGuardrails(this.computeRuleBasedStage());
    }

    let stageChanged = false;
    if (finalStageChange && finalStageChange !== this.stage) {
      this.stage = finalStageChange;
      stageChanged = true;
    }

    if (prevStage === 2 && this.stage === 2) {
      this.stageData.stage2.round++;
      if (this.stageData.stage2.round >= 2) {
        const autoTo3 = this.applyGuardrails(3);
        if (autoTo3) {
          this.stage = 3;
          stageChanged = true;
        }
      }
    }

    const suggestions = this.buildSuggestions();
    const finalScore = Math.max(0, Math.min(1, Number(parsed.stageFeedback?.score) || 0.5));

    return {
      text: parsed.reply || '',
      reply: parsed.reply || '',
      feedback: {
        score: finalScore,
        type: parsed.stageFeedback?.type || 'neutral',
        note: parsed.stageFeedback?.note || '',
        points: parsed.stageFeedback?.points || []
      },
      score: finalScore,
      suggestions,
      stage: this.stage,
      stageName: STAGE_NAMES[this.stage],
      stageDescription: STAGE_DESCRIPTIONS[this.stage],
      stageChanged,
      previousStage: prevStage,
      stageDataSnapshot: this.serializeStageData(),
      meta: {
        provider: llmResult.provider,
        usedFallback: llmResult.usedFallback,
        model: llmResult.model || null,
        tokens: llmResult.tokens || null,
        responseTimeMs: llmResult.responseTimeMs || null,
        aiMeta: parsed.aiMeta || {},
        scenarioMeta: {
          scenarioId: this.scenarioId,
          scenarioName: this.scenario.name,
          clientName: this.scenario.client,
          clientRole: this.scenario.role,
          difficulty: this.scenario.difficulty,
          userLevel: this.userLevel
        },
        stageStats: {
          s1Answered: this.getAnsweredStage1Ids().length,
          s1Total: MANDATORY_QUESTIONS_STAGE1.length,
          s3Answered: this.getAnsweredStage3Ids().length,
          s3Total: DELIVERY_QUESTIONS_STAGE3.length,
          s4Uploaded: this.stageData.stage4.fileUploaded
        }
      }
    };
  }

  getStageInfo(stageId) {
    const id = stageId || this.stage;
    return {
      id,
      name: STAGE_NAMES[id],
      description: STAGE_DESCRIPTIONS[id]
    };
  }
}

export {
  ScenarioEngine,
  STAGE_NAMES,
  STAGE_DESCRIPTIONS,
  MANDATORY_QUESTIONS_STAGE1,
  DELIVERY_QUESTIONS_STAGE3,
  SCENARIOS,
  FEEDBACK_TYPES
};

export default ScenarioEngine;
