# خطة تحسين محاكي العميل (Scenario Simulator)

## المشكلات الحالية المكتشفة

### 1. جودة الردود - سطحية جداً
**المشكلة**: النظام يستخدم `message.includes()` البسيط فقط
```javascript
// الحالي: يتحقق فقط إذا كانت الكلمة موجودة
if (message.includes('كم') && message.includes('access point')) {
    return "ممتاز سؤال!...";
}
```

**مثال على الفشل**:
- "ما في أي access point" (نفي) → يتطابق ويُعتبر سؤال صحيح!
- "كم عدد نقاط الوصول" → لا يتطابق (لا يحتوي على "access point")
- "أريد شرح الـ VLAN" → لا يتطابق "vlan" مع "VLAN" (case sensitive)

### 2. الردود الافتراضية عشوائية وغير مفيدة
```javascript
// الحالي: ردود عشوائية لا علاقة لها بالسياق
const responses = [
    "فكرة جيدة! لكن هل فكرت في متطلبات الأمان؟",
    "ممتاز، استمر. ماذا عن بقية التجهيزات؟",
    // ...
];
return responses[Math.floor(Math.random() * responses.length)];
```

### 3. لا يوجد تقييم للإجابات
- لا يوجد `feedback` object
- لا يوجد `score`
- لا يوجد `suggestions`
- لا يوجد تتبع للتقدم

### 4. لا يوجد ذاكرة للمحادثة
```javascript
// الحالي: يتحقق فقط من history.length < 2
if (history.length < 2) {
    return "أهلاً بك! قبل ما نبدأ...";
}
// بعد أول سؤالين، كل شيء يصبح رد عشوائي!
```

### 5. السرعة عالية لكن بدون قيمة
- الرد فوري (لا يوجد async)
- لكنه مجرد نص ثابت من مصفوفة
- لا يوجد معالجة حقيقية

---

## خطة التحسين المطلوبة

### المرحلة 1: تحسين فهم الرسائل (NLP بسيط)

#### 1.1 تطبيع النص (Text Normalization)
```javascript
function normalizeArabic(text) {
    return text
        .toLowerCase()
        .replace(/[إأآا]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .replace(/[ًٌٍَُِّْ]/g, '') // إزالة التشكيل
        .replace(/[^\w\s]/g, ' ')  // إزالة علامات الترقيم
        .trim();
}
```

#### 1.2 كشف النية (Intent Detection)
```javascript
const intents = {
    question: ['كم', 'كيف', 'ما', 'ايش', 'شو', 'وين', 'متى', 'ليش'],
    answer: ['اريد', 'اعتقد', 'اظن', 'الحل', 'نقترح', 'نستخدم'],
    greeting: ['مرحبا', 'اهلا', 'سلام', 'هلا'],
    thanks: ['شكرا', 'ممتاز', 'رائع', 'يسلمو'],
    confusion: ['مش', 'ما فهمت', 'صعب', 'معقد']
};
```

#### 1.3 كشف الموضوع (Topic Detection) محسن
```javascript
const topicKeywords = {
    access_point: {
        keywords: ['access point', 'ap', 'نقطه وصول', 'واي فاي', 'wifi', 'تغطيه', ' coverage'],
        weight: 1.0
    },
    vlan: {
        keywords: ['vlan', 'شبكت', 'تقسيم', 'عزل', 'فصل'],
        weight: 1.0
    }
    // ...
};
```

### المرحلة 2: نظام التقييم والتغذية الراجعة

#### 2.1 كشف جودة الإجابة
```javascript
function evaluateAnswer(topic, message, scenarioData) {
    const normalizedMsg = normalizeArabic(message);
    
    // التحقق من الكلمات المفتاحية الصحيحة
    const correctKeywords = scenarioData.keyAnswers[topic].correct;
    const idealKeywords = scenarioData.keyAnswers[topic].ideal;
    
    const hasCorrect = correctKeywords.some(kw => normalizedMsg.includes(normalizeArabic(kw)));
    const hasIdeal = idealKeywords.some(kw => normalizedMsg.includes(normalizeArabic(kw)));
    
    // التحقق من النفي
    const hasNegation = ['ما', 'مش', 'لا', 'ليس'].some(n => normalizedMsg.startsWith(n) || 
        normalizedMsg.includes(' ' + n + ' '));
    
    if (hasIdeal && !hasNegation) {
        return { type: 'excellent', score: 0.9 };
    } else if (hasCorrect && !hasNegation) {
        return { type: 'good_incomplete', score: 0.6 };
    } else if (hasNegation) {
        return { type: 'incorrect', score: 0.2 };
    }
    
    return { type: 'neutral', score: 0.5 };
}
```

#### 2.2 توليد تغذية راجعة مخصصة
```javascript
function generateFeedback(evaluation, topic, scenarioData) {
    const feedback = {
        type: evaluation.type,
        score: evaluation.score,
        points: [],
        suggestions: []
    };
    
    switch (evaluation.type) {
        case 'excellent':
            feedback.points.push('إجابة شاملة ودقيقة');
            feedback.points.push('فهمت المتطلبات بشكل صحيح');
            feedback.suggestions.push('استمر في هذا الأداء');
            break;
        case 'good_incomplete':
            feedback.points.push('فهم أساسي صحيح');
            feedback.points.push('ينقصه بعض التفاصيل');
            feedback.suggestions.push(...getMissingPoints(topic));
            break;
        case 'incorrect':
            feedback.points.push('فهم غير كامل');
            feedback.points.push('يحتاج مراجعة للأساسيات');
            feedback.suggestions.push(...getCorrection(topic));
            break;
    }
    
    return feedback;
}
```

### المرحلة 3: نظام تتبع المحادثة

#### 3.1 حالة المحادثة
```javascript
function extractConversationState(history, scenario) {
    const state = {
        askedTopics: new Set(),
        answeredTopics: new Set(),
        correctAnswers: 0,
        incorrectAnswers: 0,
        currentPhase: 'greeting', // greeting, questions, design, closing
        askedQuestions: new Set()
    };
    
    history.forEach(msg => {
        if (msg.role === 'user') {
            const topics = detectTopics(msg.content);
            topics.forEach(t => state.askedTopics.add(t));
        }
    });
    
    return state;
}
```

#### 3.2 توليد السؤال التالي
```javascript
function getNextQuestion(state, scenario) {
    const remainingQuestions = scenario.requiredQuestions.filter(q => {
        const keyword = q.split(' ')[0];
        return !state.askedQuestions.has(keyword);
    });
    
    if (remainingQuestions.length > 0) {
        return remainingQuestions[0];
    }
    
    return null; // تم الإجابة على جميع الأسئلة
}
```

### المرحلة 4: تحسين واجهة المستخدم

#### 4.1 عرض التغذية الراجعة
- إضافة toast ملون حسب نوع التغذية الراجعة
- إبقاؤه مرئياً لمدة 30 ثانية (ليس 5)
- إضافة زر "فهمت" لإغلاقه

#### 4.2 شريط التقدم
- عرض عدد الأسئلة المجاب عليها / الإجمالي
- عرض النقاط الحالية
- عرض المرحلة الحالية

#### 4.3 الاقتراحات السريعة
- عرض الأسئلة المقترحة للنقر
- تحديثها بعد كل رد

---

## الملفات المتأثرة

| الملف | التغيير |
|-------|---------|
| `pages/api/scenario.js` | إعادة كتابة كاملة |
| `pages/scenarios/[id].js` | تحسين عرض التغذية الراجعة |
| `lib/scenarioEngine.js` | ملف جديد للمنطق |

---

## معايير النجاح

1. **دقة الفهم**: 90%+ من الرسائل تُفهم بشكل صحيح
2. **جودة التغذية الراجعة**: مخصصة ومفيدة
3. **سرعة الاستجابة**: أقل من 500ms
4. **تجربة المستخدم**: تدفق محادثة طبيعي

---

## المخاطر والتخفيف

| المخاطرة | التخفيف |
|----------|---------|
| تعقيد الكود | تقسيم لملفات صغيرة |
| بطء الاستجابة | تخزين مؤقت للبيانات |
| أخطاء في الفهم | fallback للرد الافتراضي |
