# SmartLab - دليل النشر والتشغيل

## متطلبات النظام

- Node.js 18+ 
- npm 9+ 
- ذاكرة: 2GB RAM على الأقل
- تخزين: 500MB

## النشر السريع على Vercel

### الطريقة 1: نشر تلقائي (موصى به)

1. ارفع المشروع على GitHub
2. اذهب إلى [vercel.com](https://vercel.com)
3. اختر "New Project"
4. اختر المستودع من GitHub
5. اضغط "Deploy"

### الطريقة 2: نشر يدوي

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel --prod
```

## النشر المحلي

```bash
# تثبيت الاعتماديات
npm install

# بناء المشروع
npm run build

# تشغيل الإنتاج
npm start
```

## متغيرات البيئة

أنشئ ملف `.env.local`:

```env
# اختياري: مفتاح DeepSeek AI للتقارير المخصصة
# بدونه، النظام يعمل في وضع mock
DEEPSEEK_API_KEY=your_key_here

# اختياري: وضع LLM (mock أو deepseek)
LLM_PROVIDER=mock

# اختياري: Supabase للإنتاج
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
```

## هيكل المشروع

```
smartlab-full/
├── pages/          # صفحات Next.js
│   ├── api/        # نقاط النهاية API
│   ├── auth/       # صفحات المصادقة
│   └── assessment/ # صفحات التقييم
├── components/     # مكونات React
├── lib/            # المكتبات والمحركات
│   ├── engine/     # محركات الذكاء
│   ├── domain/     # أنواع المجال
│   └── analytics/  # التحليلات
├── data/           # البيانات والمحتوى
├── core/           # واجهات الذكاء
├── public/         # الملفات الثابتة
└── docs/           # التوثيق
```

## الميزات المتاحة

### وضع Demo (بدون إعداد):
- ✅ صفحة تسجيل الدخول مع وضع Demo
- ✅ لوحة القيادة مع بيانات تجريبية
- ✅ التقييم التكيفي
- ✅ المختبر الافتراضي
- ✅ السيناريوهات التفاعلية
- ✅ تحليل النتائج
- ✅ تقارير AI (وضع mock)

### الإنتاج (مع Supabase):
- ✅ مصادقة حقيقية
- ✅ حفظ البيانات
- ✅ تقارير AI حقيقية
- ✅ تحليلات متقدمة

## استكشاف الأخطاء

### المشكلة: الخادم لا يبدأ
```bash
# تأكد من تثبيت الاعتماديات
npm install

# تحقق من عدم وجود أخطاء في البناء
npm run build
```

### المشكلة: صفحة فارغة
- تحقق من الكونسول للأخطاء
- تأكد من دعم المتصفح لـ JavaScript

### المشكلة: بطء في التحميل
- استخدم `npm run build` للإنتاج
- فعّل التخزين المؤقت

## الدعم

للمساعدة، راجع:
- `docs/Architecture.md` - نظرة عامة على البنية
- `docs/SCIENTIFIC_SCOPE.md` - النطاق العلمي
- `docs/RUNTIME_READINESS.md` - جاهزية التشغيل
