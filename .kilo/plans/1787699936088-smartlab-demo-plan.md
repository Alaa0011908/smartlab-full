# SmartLab - خطة التشغيل للعرض على لجنة التحليل

## نظرة عامة على المشروع

**SmartLab** منصة تعليمية ذكية تستخدم الذكاء الاصطناعي لتقديم تجربة تعلم مخصصة في مجال هندسة الشبكات. الميزات الأساسية:

1. نظام تقييم تكيفي (Bayesian Knowledge Tracing)
2. محرك اكتشاف المفاهيم الخاطئة (Misconception Detection)
3. مختبر افتراضي لاستكشاف أخطاء الشبكات
4. سيناريوهات تفاعلية مع عملاء افتراضيين
5. تحليلات متقدمة للأداء (زمنية، معرفية، عاطفية)
6. تقارير AI مخصصة

---

## المتطلبات المسبقة

### 1. التحقق من البيئة
- [ ] تثبيت Node.js (v18+)
- [ ] تثبيت npm
- [ ] التحقق من وجود `node_modules`

### 2. التحقق من ملفات التكوين
- [ ] `.env.local` يحتوي على `DEEPSEEK_API_KEY`
- [ ] `package.json` موجود ومحدث
- [ ] `.env.example` يوضح المتغيرات المطلوبة

---

## خطوات التشغيل

### الخطوة 1: تثبيت الاعتماديات (إذا لزم الأمر)

```bash
cd C:\Users\L O Q\Desktop\smartlab-full-main
npm install
```

**ملاحظة:** `node_modules` غير موجود حالياً، يجب تشغيل `npm install` أولاً.

### الخطوة 2: تشغيل خادم التطوير

```bash
npm run dev
```

**النتيجة المتوقعة:**
- الخادم يعمل على `http://localhost:3000`
- لا توجد أخطاء في الكونسول

### الخطوة 3: التحقق من الصحة

```bash
curl http://localhost:3000/api/health
```

**النتيجة المتوقعة:**
```json
{
  "status": "healthy",
  "engine": "online",
  "database": "demo-mode",
  "version": "1.0.0",
  "timestamp": "2026-08-25T..."
}
```

---

## ختبار الميزات الأساسية

### 1. صفحة تسجيل الدخول (Login)
- **الرابط:** `http://localhost:3000/auth/login`
- **الاختبار:**
  - عرض الصفحة بشكل صحيح (RTL)
  - وجود زر "Load SfeerTech Demo"
  - النقر على الزر يوجه إلى Dashboard

### 2. لوحة القيادة (Dashboard)
- **الرابط:** `http://localhost:3000/dashboard`
- **الاختبار:**
  - عرض احتمالية إتقان المهارات (Probability of Mastery)
  - محرك اكتشاف المفاهيم الخاطئة (Misconception Engine)
  - توصيات الخطوة التالية
  - الوصول السريع للأقسام المختلفة

### 3. التقييم التكيفي (Assessment)
- **الرابط:** `http://localhost:3000/assessment/categories`
- **الاختبار:**
  - عرض 8 فئات تقييم
  - زر "سريع" و "شامل" لكل فئة
  - أسئلة تتكيف مع مستوى المستخدم

### 4. المختبر الافتراضي (Lab)
- **الرابط:** `http://localhost:3000/lab`
- **الاختبار:**
  - عرض التوبولوجيا (PC1 → Switch → Router → Switch → PC2)
  - تنفيذ الأوامر: `ping`, `show ip route`, `fix route`
  - التحقق من إصلاح العطل

### 5. السيناريوهات (Scenarios)
- **الرابط:** `http://localhost:3000/scenarios`
- **الاختبار:**
  - عرض 3 سيناريوهات (مقهى، مستشفى، شركة)
  - محادثة مع العميل الافتراضي
  - ردود ذكية حسب السياق

### 6. صفحة النتائج (Result)
- **الرابط:** `http://localhost:3000/result`
- **الاختبار:**
  - عرض دائرة النتيجة المتحركة
  - تبويبات التحليل المتعددة
  - اكتشاف المفاهيم الخاطئة

### 7. مركز الذكاء (Intelligence)
- **الرابط:** `http://localhost:3000/intelligence`
- **الاختبار:**
  - عرض شريط المهارات
  - توصيات المعلم الذكي
  - ملف التعلم الشخصي

### 8. صفحة الكورس (Course)
- **الرابط:** `http://localhost:3000/course`
- **الاختبار:**
  - دروس مخصصة بناءً على نقاط الضعف
  - شجرة المهارات
  - روابط يوتيوب

### 9. مركز الخصوصية (Consent)
- **الرابط:** `http://localhost:3000/consent`
- **الاختبار:**
  - أزرار تبديل الصلاحيات
  - حفظ التفضيلات

### 10. API Endpoints
- **الصحة:** `/api/health`
- **حالة المتعلم:** `/api/learner/state?userId=demo_alex_001`
- **التوصيات:** `/api/learner/recommendation?userId=demo_alex_001`
- **التالي:** `/api/assessment/next-item?userId=demo_alex_001`
- **السيناريو:** `/api/scenario` (POST)
- **تحليل:** `/api/analyze` (POST)
- **توليد التقرير:** `/api/generate-report` (POST)

---

## معايير النجاح للعرض

### الحد الأدنى للعرض (MVP):
1. ✅ الصفحة الرئيسية تعمل
2. ✅ تسجيل الدخول يعمل (وضع Demo)
3. ✅ Dashboard يعرض البيانات
4. ✅ Assessment يعرض الأسئلة
5. ✅ Lab يعمل بشكل تفاعلي
6. ✅ Scenarios تعرض السيناريوهات

### الميزات المتقدمة للعرض:
1. ✅ اكتشاف المفاهيم الخاطئة
2. ✅ التوصيات الذكية
3. ✅ تحليل النتائج
4. ✅ تقارير AI
5. ✅ مركز الخصوصية

---

## التسلسل المقترح للعرض

### المرحلة 1: المقدمة (2 دقيقة)
- فتح `http://localhost:3000`
- عرض الصفحة الرئيسية
- شرح المنصة

### المرحلة 2: تسجيل الدخول (1 دقيقة)
- الانتقال إلى `/auth/login`
- النقر على "Load SfeerTech Demo"
- الانتقال التلقائي إلى Dashboard

### المرحلة 3: لوحة القيادة (3 دقائق)
- عرض Probability of Mastery
- شرح Misconception Engine
- عرض التوصيات

### المرحلة 4: التقييم (5 دقائق)
- فتح Assessment
- اختيار فئة "المفاهيم العامة"
- الإجابة على بعض الأسئلة
- عرض النتائج

### المرحلة 5: المختبر (3 دقائق)
- فتح Lab
- تنفيذ بعض الأوامر
- إصلاح العطل

### المرحلة 6: السيناريوهات (3 دقائق)
- فتح Scenarios
- اختيار سيناريو "مقهى"
- محادثة مع العميل

### المرحلة 7: النتائج والتحليل (3 دقائق)
- عرض صفحة النتائج
- شرح التبويبات المختلفة
- عرض اكتشاف المفاهيم الخاطئة

### المرحلة 8: الخاتمة (2 دقيقة)
- عرض مركز الخصوصية
- تلخيص الميزات

---

## المخاطر المحتملة والحلول

### المخاطر:
1. **عدم وجود node_modules** - يتطلب `npm install`
2. **أخطاء TypeScript** - قد تحتاج لتعديلات
3. **DeepSeek API** - قد يكون المفتاح غير صالح (يوجد fallback mock)
4. **أداء الخادم** - قد يكون بطيئاً في البداية

### الحلول المسبقة:
1. تشغيل `npm install` قبل العرض بساعة
2. التحقق من `npm run build` لاكتشاف الأخطاء
3. النظام يعمل في `mock` وضع بدون API حقيقي
4. إعادة تشغيل الخادم قبل العرض مباشرة

---

## التحقق قبل العرض (Checklist)

```bash
# 1. تثبيت الاعتماديات
npm install

# 2. التحقق من البناء
npm run build

# 3. تشغيل الخادم
npm run dev

# 4. اختبار الصحة
curl http://localhost:3000/api/health

# 5. اختبار Dashboard
curl http://localhost:3000/api/learner/state?userId=demo_alex_001
```

---

## ملخص الملفات الرئيسية

### Frontend Pages:
- `pages/index.js` - الصفحة الرئيسية
- `pages/auth/login.js` - تسجيل الدخول
- `pages/dashboard.js` - لوحة القيادة
- `pages/assessment/[id].js` - التقييم التكيفي
- `pages/lab.js` - المختبر الافتراضي
- `pages/scenarios/[id].js` - السيناريوهات
- `pages/result.js` - النتائج
- `pages/intelligence.js` - مركز الذكاء
- `pages/course/index.js` - الكورس المخصص
- `pages/consent.js` - مركز الخصوصية

### Backend APIs:
- `pages/api/health.ts` - فحص الصحة
- `pages/api/learner/state.ts` - حالة المتعلم
- `pages/api/learner/recommendation.ts` - التوصيات
- `pages/api/analyze.js` - تحليل النتائج
- `pages/api/assessment/response.ts` - استجابة التقييم
- `pages/api/lab/complete.ts` - إكمال المختبر

### Core Intelligence:
- `core/intelligence/measurement/MeasurementEngine.ts`
- `core/intelligence/knowledge/KnowledgeTracingEngine.ts`
- `core/intelligence/recommendation/RecommendationEngine.ts`

### Data:
- `data/questions/basics.js` - بنك الأسئلة
- `data/networking/skills.ts` - المهارات
- `data/networking/items.ts` - عناصر التقييم
- `data/networking/misconceptions.ts` - المفاهيم الخاطئة

---

## ملاحظات للجنة

### نقاط القوة:
1. بنية تحتية نظيفة (Hexagonal Architecture)
2. فصل كامل بين Frontend و Backend
3. نظام تتبع ذكي للمتعلم
4. اكتشاف المفاهيم الخاطئة
5. واجهة مستخدم احترافية RTL
6. نظام موافقة للخصوصية

### التقنيات المستخدمة:
- Next.js 14 (React 18)
- TypeScript + JavaScript
- Supabase (للإنتاج)
- DeepSeek AI (للتقارير)
- Bayesian Knowledge Tracing
- Item Response Theory (IRT)
