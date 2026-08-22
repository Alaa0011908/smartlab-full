// data/questions/basics.js
// ============================================================
// 📚 بنك الأسئلة - SmartLab (نسخة المحاسبة للتجربة)
// المصمم: خبير محاسبة مالي
// عدد الأسئلة: 30 سؤالاً (8 محاور رئيسية)
// ============================================================

export function getAllBasicsQuestions() {
  return QUESTIONS;
}

export function getAssessmentQuestions(assessmentId) {
  const filtered = QUESTIONS.filter(q => {
    if (assessmentId === 'concepts') return q.topic === 'Accounting Basics';
    if (assessmentId === 'journal') return q.topic === 'Journal Entries';
    if (assessmentId === 'balance') return q.topic === 'Balance Sheet';
    if (assessmentId === 'income') return q.topic === 'Income Statement';
    if (assessmentId === 'assets') return q.topic === 'Assets & Liabilities';
    if (assessmentId === 'equity') return q.topic === 'Equity';
    if (assessmentId === 'analysis') return q.topic === 'Financial Analysis';
    if (assessmentId === 'principles') return q.topic === 'Accounting Principles';
    if (assessmentId === 'full') return true;
    return q.topic === 'Accounting Basics';
  });
  return filtered;
}

export function getAssessmentName(assessmentId) {
  const names = {
    'concepts': 'أساسيات المحاسبة',
    'journal': 'القيود اليومية',
    'balance': 'الميزانية العمومية',
    'income': 'قائمة الدخل',
    'assets': 'الأصول والخصوم',
    'equity': 'حقوق الملكية',
    'analysis': 'تحليل القوائم المالية',
    'principles': 'مبادئ المحاسبة',
    'full': 'التقييم الشامل للمحاسبة'
  };
  return names[assessmentId] || 'تقييم المحاسبة';
}

// ============================================================
// 🔷 الأسئلة (30 سؤالاً تغطي 8 محاور)
// ============================================================
const QUESTIONS = [
  // =============================================================
  // المحور 1: أساسيات المحاسبة (Accounting Basics) - 4 أسئلة
  // =============================================================
  {
    id: 'acc_001',
    question: 'ما هو التعريف الصحيح للمحاسبة المالية؟',
    options: [
      'تسجيل جميع المعاملات المالية فقط',
      'عملية تحديد وقياس وتسجيل وإبلاغ المعلومات المالية للمنشأة',
      'إدارة النقدية اليومية للشركة',
      'تحليل الأسواق المالية فقط'
    ],
    correct: 2,
    topic: 'Accounting Basics',
    subSkill: 'acc_definition',
    cognitiveLevel: 'understanding',
    difficulty: 1,
    errorPattern: 'conceptual',
    explanation: 'المحاسبة المالية هي عملية تحديد وقياس وتسجيل وإبلاغ المعلومات المالية للمنشأة إلى الأطراف المعنية.',
    irt: { a: 0.8, b: -2.0, c: 0.2 },
    subSkills: ['acc_definition', 'acc_basics'],
    diagnostic: {
      errorPattern: 'acc_def_error',
      rootCause: 'يخلط بين المحاسبة المالية وإدارة النقد أو التحليل المالي',
      futureImpact: 'سيؤثر على فهمه لدور المحاسبة في المنشأة',
      remediationVideoQuery: 'شرح تعريف المحاسبة المالية وأهميتها'
    },
    prerequisites: []
  },
  {
    id: 'acc_002',
    question: 'أي من التالي يُعد مستخدماً خارجياً للمعلومات المحاسبية؟',
    options: [
      'مدير التسويق',
      'المستثمرون والدائنون',
      'مدير الإنتاج',
      'رئيس قسم الموارد البشرية'
    ],
    correct: 2,
    topic: 'Accounting Basics',
    subSkill: 'acc_users',
    cognitiveLevel: 'understanding',
    difficulty: 1,
    errorPattern: 'conceptual',
    explanation: 'المستثمرون والدائنون هم مستخدمون خارجيون للمعلومات المحاسبية، بينما الإدارة الداخلية هي مستخدم داخلي.',
    irt: { a: 0.9, b: -1.8, c: 0.2 },
    subSkills: ['acc_users', 'acc_basics'],
    diagnostic: {
      errorPattern: 'acc_users_error',
      rootCause: 'يخلط بين المستخدمين الداخليين والخارجيين للمعلومات المحاسبية',
      futureImpact: 'سيؤثر على فهمه لأهداف التقارير المحاسبية',
      remediationVideoQuery: 'مستخدمي المعلومات المحاسبية الداخليين والخارجيين'
    },
    prerequisites: ['acc_definition']
  },
  {
    id: 'acc_003',
    question: 'ما هي المعادلة المحاسبية الأساسية؟',
    options: [
      'الأصول = الخصوم + حقوق الملكية',
      'الإيرادات - المصروفات = صافي الدخل',
      'الأصول = الخصوم - حقوق الملكية',
      'حقوق الملكية = الأصول + الخصوم'
    ],
    correct: 1,
    topic: 'Accounting Basics',
    subSkill: 'acc_equation',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'المعادلة المحاسبية الأساسية هي: الأصول = الخصوم + حقوق الملكية.',
    irt: { a: 0.7, b: -2.2, c: 0.25 },
    subSkills: ['acc_equation', 'acc_basics'],
    diagnostic: {
      errorPattern: 'acc_equation_error',
      rootCause: 'لا يحفظ المعادلة المحاسبية الأساسية أو يخلط بين طرفيها',
      futureImpact: 'سيؤثر على فهمه لجميع القيود المحاسبية والميزانيات',
      remediationVideoQuery: 'شرح المعادلة المحاسبية الأساسية'
    },
    prerequisites: ['acc_definition']
  },
  {
    id: 'acc_004',
    question: 'أي من التالي يمثل نظام القيد المزدوج؟',
    options: [
      'تسجيل كل معاملة في حساب واحد فقط',
      'لكل معاملة تأثير متساوٍ في طرفي المعادلة المحاسبية',
      'تسجيل المعاملات في دفتر اليومية فقط',
      'استخدام حسابات منفصلة لكل عملية'
    ],
    correct: 2,
    topic: 'Accounting Basics',
    subSkill: 'acc_double_entry',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'نظام القيد المزدوج ينص على أن لكل معاملة تأثير متساوٍ في طرفي المعادلة المحاسبية (مدين ودائن).',
    irt: { a: 1.0, b: -0.5, c: 0.15 },
    subSkills: ['acc_double_entry', 'acc_basics'],
    diagnostic: {
      errorPattern: 'double_entry_error',
      rootCause: 'لا يفهم مبدأ القيد المزدوج أو يخلط بينه وبين أنظمة أخرى',
      futureImpact: 'سيؤدي إلى أخطاء في تسجيل المعاملات المحاسبية',
      remediationVideoQuery: 'شرح نظام القيد المزدوج في المحاسبة'
    },
    prerequisites: ['acc_equation']
  },

  // =============================================================
  // المحور 2: القيود اليومية (Journal Entries) - 4 أسئلة
  // =============================================================
  {
    id: 'acc_005',
    question: 'ما هو القيد الصحيح لشراء بضاعة نقداً بقيمة 5,000 دينار؟',
    options: [
      'من حـ/ البضاعة 5,000 إلى حـ/ النقدية 5,000',
      'من حـ/ النقدية 5,000 إلى حـ/ البضاعة 5,000',
      'من حـ/ المشتريات 5,000 إلى حـ/ النقدية 5,000',
      'من حـ/ النقدية 5,000 إلى حـ/ المشتريات 5,000'
    ],
    correct: 3,
    topic: 'Journal Entries',
    subSkill: 'journal_purchases',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'application',
    explanation: 'شراء بضاعة نقداً: من حـ/ المشتريات (مدين) إلى حـ/ النقدية (دائن).',
    irt: { a: 1.2, b: -0.2, c: 0.15 },
    subSkills: ['journal_purchases', 'journal_entries'],
    diagnostic: {
      errorPattern: 'purchase_journal_error',
      rootCause: 'يخلط بين حساب المشتريات وحساب البضاعة أو يخطئ في تحديد الطرف الدائن والمدين',
      futureImpact: 'سيؤثر على تسجيل جميع عمليات الشراء في المستقبل',
      remediationVideoQuery: 'قيد شراء البضاعة نقداً في المحاسبة'
    },
    prerequisites: ['acc_double_entry']
  },
  {
    id: 'acc_006',
    question: 'ما هو القيد الصحيح لبيع بضاعة بقيمة 3,000 دينار نقداً (بفرض أن البضاعة مسجلة في حساب المبيعات)؟',
    options: [
      'من حـ/ النقدية 3,000 إلى حـ/ المبيعات 3,000',
      'من حـ/ المبيعات 3,000 إلى حـ/ النقدية 3,000',
      'من حـ/ النقدية 3,000 إلى حـ/ البضاعة 3,000',
      'من حـ/ البضاعة 3,000 إلى حـ/ النقدية 3,000'
    ],
    correct: 1,
    topic: 'Journal Entries',
    subSkill: 'journal_sales',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'application',
    explanation: 'بيع بضاعة نقداً: من حـ/ النقدية (مدين) إلى حـ/ المبيعات (دائن).',
    irt: { a: 1.2, b: -0.2, c: 0.15 },
    subSkills: ['journal_sales', 'journal_entries'],
    diagnostic: {
      errorPattern: 'sales_journal_error',
      rootCause: 'يخلط بين حساب المبيعات وحساب النقدية أو يخطئ في تحديد الطرف الدائن والمدين',
      futureImpact: 'سيؤثر على تسجيل جميع عمليات البيع في المستقبل',
      remediationVideoQuery: 'قيد بيع البضاعة نقداً في المحاسبة'
    },
    prerequisites: ['acc_double_entry']
  },
  {
    id: 'acc_007',
    question: 'ما هو القيد الصحيح لدفع إيجار مكتب بقيمة 1,000 دينار نقداً؟',
    options: [
      'من حـ/ الإيجار 1,000 إلى حـ/ النقدية 1,000',
      'من حـ/ النقدية 1,000 إلى حـ/ الإيجار 1,000',
      'من حـ/ الإيجار 1,000 إلى حـ/ البنك 1,000',
      'من حـ/ البنك 1,000 إلى حـ/ الإيجار 1,000'
    ],
    correct: 1,
    topic: 'Journal Entries',
    subSkill: 'journal_expenses',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'application',
    explanation: 'دفع إيجار نقداً: من حـ/ الإيجار (مدين) إلى حـ/ النقدية (دائن).',
    irt: { a: 1.1, b: -0.1, c: 0.15 },
    subSkills: ['journal_expenses', 'journal_entries'],
    diagnostic: {
      errorPattern: 'expense_journal_error',
      rootCause: 'يخلط بين حسابات المصروفات وطرق الدفع (نقداً أو بنك)',
      futureImpact: 'سيؤثر على تسجيل المصروفات بشكل صحيح',
      remediationVideoQuery: 'قيد دفع المصروفات في المحاسبة'
    },
    prerequisites: ['acc_double_entry']
  },
  {
    id: 'acc_008',
    question: 'ما هو القيد الصحيح لاستلام قرض من البنك بقيمة 10,000 دينار؟',
    options: [
      'من حـ/ النقدية 10,000 إلى حـ/ القروض 10,000',
      'من حـ/ القروض 10,000 إلى حـ/ النقدية 10,000',
      'من حـ/ النقدية 10,000 إلى حـ/ البنك 10,000',
      'من حـ/ البنك 10,000 إلى حـ/ النقدية 10,000'
    ],
    correct: 1,
    topic: 'Journal Entries',
    subSkill: 'journal_loans',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'application',
    explanation: 'استلام قرض: من حـ/ النقدية (مدين) إلى حـ/ القروض (دائن).',
    irt: { a: 1.1, b: -0.1, c: 0.15 },
    subSkills: ['journal_loans', 'journal_entries'],
    diagnostic: {
      errorPattern: 'loan_journal_error',
      rootCause: 'يخطئ في تحديد الطرف الدائن والمدين عند تسجيل القروض',
      futureImpact: 'سيؤثر على تسجيل الالتزامات المالية بشكل صحيح',
      remediationVideoQuery: 'قيد استلام قرض من البنك'
    },
    prerequisites: ['acc_double_entry']
  },

  // =============================================================
  // المحور 3: الميزانية العمومية (Balance Sheet) - 4 أسئلة
  // =============================================================
  {
    id: 'acc_009',
    question: 'أي من التالي يُصنف كأصل متداول؟',
    options: [
      'المباني',
      'المعدات الثقيلة',
      'المخزون من البضاعة',
      'براءات الاختراع'
    ],
    correct: 3,
    topic: 'Balance Sheet',
    subSkill: 'balance_current_assets',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'المخزون من البضاعة هو أصل متداول، بينما المباني والمعدات أصول ثابتة، وبراءات الاختراع أصول غير ملموسة.',
    irt: { a: 1.0, b: -0.5, c: 0.15 },
    subSkills: ['balance_current_assets', 'balance_sheet'],
    diagnostic: {
      errorPattern: 'current_assets_error',
      rootCause: 'يخلط بين الأصول المتداولة والثابتة وغير الملموسة',
      futureImpact: 'سيؤثر على تصنيف الأصول في الميزانية العمومية',
      remediationVideoQuery: 'تصنيف الأصول المتداولة والثابتة'
    },
    prerequisites: ['acc_equation']
  },
  {
    id: 'acc_010',
    question: 'أي من التالي يُصنف كخصم متداول؟',
    options: [
      'القروض طويلة الأجل',
      'الدائنون (الموردون)',
      'رأس المال',
      'الأرباح المحتجزة'
    ],
    correct: 2,
    topic: 'Balance Sheet',
    subSkill: 'balance_current_liabilities',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'الدائنون (الموردون) هم خصم متداول، بينما القروض طويلة الأجل خصم غير متداول، ورأس المال والأرباح المحتجزة ضمن حقوق الملكية.',
    irt: { a: 1.0, b: -0.5, c: 0.15 },
    subSkills: ['balance_current_liabilities', 'balance_sheet'],
    diagnostic: {
      errorPattern: 'current_liabilities_error',
      rootCause: 'يخلط بين الخصوم المتداولة وغير المتداولة وحقوق الملكية',
      futureImpact: 'سيؤثر على تصنيف الخصوم في الميزانية العمومية',
      remediationVideoQuery: 'تصنيف الخصوم المتداولة وغير المتداولة'
    },
    prerequisites: ['acc_equation']
  },
  {
    id: 'acc_011',
    question: 'إذا كانت الأصول = 100,000 دينار والخصوم = 60,000 دينار، فما هي حقوق الملكية؟',
    options: ['40,000', '60,000', '100,000', '160,000'],
    correct: 1,
    topic: 'Balance Sheet',
    subSkill: 'balance_equity',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: 'حقوق الملكية = الأصول - الخصوم = 100,000 - 60,000 = 40,000 دينار.',
    irt: { a: 1.3, b: 0.0, c: 0.15 },
    subSkills: ['balance_equity', 'balance_sheet'],
    diagnostic: {
      errorPattern: 'equity_calculation_error',
      rootCause: 'يخطئ في تطبيق معادلة حقوق الملكية (الأصول - الخصوم)',
      futureImpact: 'سيؤثر على فهمه لعلاقة الميزانية العمومية',
      remediationVideoQuery: 'حساب حقوق الملكية من الأصول والخصوم'
    },
    prerequisites: ['acc_equation']
  },
  {
    id: 'acc_012',
    question: 'أي من التالي يُعتبر التزاماً (خصماً) على المنشأة؟',
    options: [
      'المباني المملوكة للشركة',
      'الديون المستحقة للموردين',
      'رأس المال المدفوع من المالك',
      'الأرباح المحتجزة'
    ],
    correct: 2,
    topic: 'Balance Sheet',
    subSkill: 'balance_liabilities',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'الديون المستحقة للموردين هي التزام (خصم) على المنشأة، بينما المباني أصل، ورأس المال والأرباح المحتجزة ضمن حقوق الملكية.',
    irt: { a: 1.0, b: -0.5, c: 0.15 },
    subSkills: ['balance_liabilities', 'balance_sheet'],
    diagnostic: {
      errorPattern: 'liability_identification_error',
      rootCause: 'يخلط بين الأصول والخصوم وحقوق الملكية',
      futureImpact: 'سيؤثر على تصنيف العناصر في الميزانية العمومية',
      remediationVideoQuery: 'الفرق بين الأصول والخصوم وحقوق الملكية'
    },
    prerequisites: ['acc_equation']
  },

  // =============================================================
  // المحور 4: قائمة الدخل (Income Statement) - 4 أسئلة
  // =============================================================
  {
    id: 'acc_013',
    question: 'ما هو صافي الدخل إذا كانت الإيرادات = 50,000 دينار والمصروفات = 35,000 دينار؟',
    options: ['15,000', '25,000', '50,000', '85,000'],
    correct: 1,
    topic: 'Income Statement',
    subSkill: 'income_net',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: 'صافي الدخل = الإيرادات - المصروفات = 50,000 - 35,000 = 15,000 دينار.',
    irt: { a: 1.2, b: -0.2, c: 0.15 },
    subSkills: ['income_net', 'income_statement'],
    diagnostic: {
      errorPattern: 'net_income_calculation_error',
      rootCause: 'يخطئ في حساب صافي الدخل (الإيرادات - المصروفات)',
      futureImpact: 'سيؤثر على فهمه لقائمة الدخل ونتائج الأعمال',
      remediationVideoQuery: 'حساب صافي الدخل في قائمة الدخل'
    },
    prerequisites: ['acc_equation']
  },
  {
    id: 'acc_014',
    question: 'أي من التالي يُصنف كمصروف تشغيلي؟',
    options: [
      'إيرادات المبيعات',
      'رواتب الموظفين',
      'أرباح بيع أصول ثابتة',
      'الإيرادات من الاستثمارات'
    ],
    correct: 2,
    topic: 'Income Statement',
    subSkill: 'income_operating_expenses',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'رواتب الموظفين هي مصروف تشغيلي، بينما إيرادات المبيعات إيرادات، وأرباح بيع الأصول وإيرادات الاستثمارات هي إيرادات غير تشغيلية.',
    irt: { a: 1.0, b: -0.5, c: 0.15 },
    subSkills: ['income_operating_expenses', 'income_statement'],
    diagnostic: {
      errorPattern: 'operating_expenses_error',
      rootCause: 'يخلط بين المصروفات التشغيلية والإيرادات أو المصروفات غير التشغيلية',
      futureImpact: 'سيؤثر على تصنيف العناصر في قائمة الدخل',
      remediationVideoQuery: 'تصنيف المصروفات التشغيلية وغير التشغيلية'
    },
    prerequisites: ['acc_equation']
  },
  {
    id: 'acc_015',
    question: 'ما هو الفرق بين صافي الدخل وصافي الخسارة؟',
    options: [
      'صافي الدخل عندما الإيرادات > المصروفات، وصافي الخسارة عندما المصروفات > الإيرادات',
      'صافي الخسارة عندما الإيرادات > المصروفات، وصافي الدخل عندما المصروفات > الإيرادات',
      'كلاهما نفس الشيء',
      'صافي الدخل يُستخدم في الميزانية فقط'
    ],
    correct: 1,
    topic: 'Income Statement',
    subSkill: 'income_profit_loss',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'صافي الدخل يحدث عندما تكون الإيرادات أكبر من المصروفات، بينما صافي الخسارة يحدث عندما تكون المصروفات أكبر من الإيرادات.',
    irt: { a: 1.0, b: -0.3, c: 0.15 },
    subSkills: ['income_profit_loss', 'income_statement'],
    diagnostic: {
      errorPattern: 'profit_loss_confusion',
      rootCause: 'يخلط بين مفهوم صافي الدخل وصافي الخسارة',
      futureImpact: 'سيؤثر على فهمه لنتائج الأعمال',
      remediationVideoQuery: 'الفرق بين صافي الدخل وصافي الخسارة'
    },
    prerequisites: ['income_net']
  },
  {
    id: 'acc_016',
    question: 'أي من التالي لا يُظهر في قائمة الدخل؟',
    options: [
      'الإيرادات',
      'المصروفات',
      'الأصول',
      'صافي الدخل'
    ],
    correct: 3,
    topic: 'Income Statement',
    subSkill: 'income_statement_content',
    cognitiveLevel: 'remembering',
    difficulty: 1,
    errorPattern: 'memorization',
    explanation: 'الأصول لا تظهر في قائمة الدخل، بل تظهر في الميزانية العمومية.',
    irt: { a: 0.8, b: -1.8, c: 0.2 },
    subSkills: ['income_statement_content', 'income_statement'],
    diagnostic: {
      errorPattern: 'income_content_error',
      rootCause: 'يخلط بين محتويات قائمة الدخل والميزانية العمومية',
      futureImpact: 'سيؤثر على فهمه للقوائم المالية المختلفة',
      remediationVideoQuery: 'محتويات قائمة الدخل والميزانية العمومية'
    },
    prerequisites: ['acc_equation']
  },

  // =============================================================
  // المحور 5: الأصول والخصوم (Assets & Liabilities) - 4 أسئلة
  // =============================================================
  {
    id: 'acc_017',
    question: 'أي من التالي يُصنف كأصل غير ملموس؟',
    options: [
      'المباني',
      'الأراضي',
      'براءات الاختراع',
      'المعدات'
    ],
    correct: 3,
    topic: 'Assets & Liabilities',
    subSkill: 'assets_intangible',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'براءات الاختراع هي أصل غير ملموس، بينما المباني والأراضي والمعدات أصول ملموسة (ثابتة).',
    irt: { a: 1.0, b: -0.5, c: 0.15 },
    subSkills: ['assets_intangible', 'assets_liabilities'],
    diagnostic: {
      errorPattern: 'intangible_assets_error',
      rootCause: 'يخلط بين الأصول الملموسة وغير الملموسة',
      futureImpact: 'سيؤثر على تصنيف الأصول في القوائم المالية',
      remediationVideoQuery: 'الفرق بين الأصول الملموسة وغير الملموسة'
    },
    prerequisites: ['acc_equation']
  },
  {
    id: 'acc_018',
    question: 'ما هو الفرق بين الأصول المتداولة والأصول الثابتة؟',
    options: [
      'الأصول المتداولة تُستخدم في العمليات اليومية، والأصول الثابتة تُستخدم لفترة طويلة',
      'الأصول الثابتة تُستخدم في العمليات اليومية، والأصول المتداولة تُستخدم لفترة طويلة',
      'الأصول المتداولة هي النقدية فقط',
      'الأصول الثابتة هي المخزون فقط'
    ],
    correct: 1,
    topic: 'Assets & Liabilities',
    subSkill: 'assets_current_vs_fixed',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'الأصول المتداولة تُستخدم في العمليات اليومية (مثل المخزون والنقدية)، بينما الأصول الثابتة تُستخدم لفترة طويلة (مثل المباني والمعدات).',
    irt: { a: 1.1, b: -0.3, c: 0.15 },
    subSkills: ['assets_current_vs_fixed', 'assets_liabilities'],
    diagnostic: {
      errorPattern: 'current_fixed_assets_error',
      rootCause: 'يخلط بين مفهوم الأصول المتداولة والثابتة',
      futureImpact: 'سيؤثر على تصنيف الأصول في الميزانية العمومية',
      remediationVideoQuery: 'الفرق بين الأصول المتداولة والثابتة'
    },
    prerequisites: ['acc_equation']
  },
  {
    id: 'acc_019',
    question: 'أي من التالي يُعتبر خصماً غير متداول؟',
    options: [
      'الدائنون (الموردون)',
      'الأوراق التجارية المستحقة',
      'قرض بنكي طويل الأجل',
      'الرواتب المستحقة'
    ],
    correct: 3,
    topic: 'Assets & Liabilities',
    subSkill: 'liabilities_non_current',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'القرض البنكي طويل الأجل هو خصم غير متداول، بينما الباقي خصوم متداولة.',
    irt: { a: 1.0, b: -0.5, c: 0.15 },
    subSkills: ['liabilities_non_current', 'assets_liabilities'],
    diagnostic: {
      errorPattern: 'non_current_liabilities_error',
      rootCause: 'يخلط بين الخصوم المتداولة وغير المتداولة',
      futureImpact: 'سيؤثر على تصنيف الخصوم في الميزانية العمومية',
      remediationVideoQuery: 'الفرق بين الخصوم المتداولة وغير المتداولة'
    },
    prerequisites: ['acc_equation']
  },
  {
    id: 'acc_020',
    question: 'إذا كانت الخصوم = 40,000 دينار وحقوق الملكية = 30,000 دينار، فما هي الأصول؟',
    options: ['70,000', '10,000', '40,000', '30,000'],
    correct: 1,
    topic: 'Assets & Liabilities',
    subSkill: 'assets_calculation',
    cognitiveLevel: 'applying',
    difficulty: 2,
    errorPattern: 'calculation',
    explanation: 'الأصول = الخصوم + حقوق الملكية = 40,000 + 30,000 = 70,000 دينار.',
    irt: { a: 1.3, b: 0.0, c: 0.15 },
    subSkills: ['assets_calculation', 'assets_liabilities'],
    diagnostic: {
      errorPattern: 'assets_calculation_error',
      rootCause: 'يخطئ في تطبيق معادلة الأصول (الخصوم + حقوق الملكية)',
      futureImpact: 'سيؤثر على فهمه للمعادلة المحاسبية',
      remediationVideoQuery: 'حساب الأصول من الخصوم وحقوق الملكية'
    },
    prerequisites: ['acc_equation']
  },

  // =============================================================
  // المحور 6: حقوق الملكية (Equity) - 3 أسئلة
  // =============================================================
  {
    id: 'acc_021',
    question: 'ما هي مكونات حقوق الملكية في شركة مساهمة؟',
    options: [
      'رأس المال المدفوع والأرباح المحتجزة',
      'النقدية والمخزون',
      'الخصوم المتداولة وغير المتداولة',
      'الإيرادات والمصروفات'
    ],
    correct: 1,
    topic: 'Equity',
    subSkill: 'equity_components',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'حقوق الملكية في شركة مساهمة تتكون من رأس المال المدفوع والأرباح المحتجزة.',
    irt: { a: 1.0, b: -0.5, c: 0.15 },
    subSkills: ['equity_components', 'equity'],
    diagnostic: {
      errorPattern: 'equity_components_error',
      rootCause: 'يخلط بين مكونات حقوق الملكية والعناصر الأخرى في الميزانية',
      futureImpact: 'سيؤثر على فهمه لهيكل حقوق الملكية',
      remediationVideoQuery: 'مكونات حقوق الملكية في الشركات'
    },
    prerequisites: ['acc_equation']
  },
  {
    id: 'acc_022',
    question: 'ما هو تأثير تحقيق أرباح على حقوق الملكية؟',
    options: [
      'زيادة حقوق الملكية',
      'نقصان حقوق الملكية',
      'لا تأثير',
      'تأثير غير مؤكد'
    ],
    correct: 1,
    topic: 'Equity',
    subSkill: 'equity_effect',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'تحقيق الأرباح يزيد من حقوق الملكية (من خلال زيادة الأرباح المحتجزة).',
    irt: { a: 1.0, b: -0.5, c: 0.15 },
    subSkills: ['equity_effect', 'equity'],
    diagnostic: {
      errorPattern: 'equity_profit_effect_error',
      rootCause: 'لا يفهم العلاقة بين الأرباح وحقوق الملكية',
      futureImpact: 'سيؤثر على فهمه لعلاقة قائمة الدخل بالميزانية العمومية',
      remediationVideoQuery: 'تأثير الأرباح والخسائر على حقوق الملكية'
    },
    prerequisites: ['equity_components']
  },
  {
    id: 'acc_023',
    question: 'ما هو الفرق بين رأس المال المدفوع ورأس المال المصرح به؟',
    options: [
      'رأس المال المدفوع هو ما دفعه المساهمون فعلاً، والمصرح به هو الحد الأقصى المسموح به',
      'رأس المال المصرح به هو ما دفعه المساهمون فعلاً، والمدفوع هو الحد الأقصى',
      'كلاهما نفس الشيء',
      'رأس المال المدفوع يُستخدم في قائمة الدخل'
    ],
    correct: 1,
    topic: 'Equity',
    subSkill: 'equity_paid_vs_authorized',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'رأس المال المصرح به هو الحد الأقصى الذي تسمح به الشركة، بينما المدفوع هو ما دفعه المساهمون فعلاً.',
    irt: { a: 1.1, b: -0.3, c: 0.15 },
    subSkills: ['equity_paid_vs_authorized', 'equity'],
    diagnostic: {
      errorPattern: 'paid_authorized_error',
      rootCause: 'يخلط بين مفهوم رأس المال المدفوع والمصرح به',
      futureImpact: 'سيؤثر على فهمه لهيكل رأس المال',
      remediationVideoQuery: 'الفرق بين رأس المال المدفوع والمصرح به'
    },
    prerequisites: ['equity_components']
  },

  // =============================================================
  // المحور 7: تحليل القوائم المالية (Financial Analysis) - 3 أسئلة
  // =============================================================
  {
    id: 'acc_024',
    question: 'ما هو مؤشر السيولة المتداولة (Current Ratio)؟',
    options: [
      'الأصول المتداولة / الخصوم المتداولة',
      'الأصول الثابتة / الخصوم المتداولة',
      'الأصول المتداولة - الخصوم المتداولة',
      'الخصوم المتداولة / الأصول المتداولة'
    ],
    correct: 1,
    topic: 'Financial Analysis',
    subSkill: 'analysis_current_ratio',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'نسبة السيولة المتداولة = الأصول المتداولة ÷ الخصوم المتداولة.',
    irt: { a: 1.0, b: -0.5, c: 0.15 },
    subSkills: ['analysis_current_ratio', 'financial_analysis'],
    diagnostic: {
      errorPattern: 'current_ratio_error',
      rootCause: 'يخلط بين نسبة السيولة المتداولة والسرعة، أو يخطئ في الصيغة',
      futureImpact: 'سيؤثر على تقييم سيولة المنشأة',
      remediationVideoQuery: 'حساب نسبة السيولة المتداولة'
    },
    prerequisites: ['balance_current_assets', 'balance_current_liabilities']
  },
  {
    id: 'acc_025',
    question: 'إذا كان صافي الدخل = 20,000 دينار وإجمالي الأصول = 200,000 دينار، فما هو العائد على الأصول (ROA)؟',
    options: ['10%', '20%', '5%', '15%'],
    correct: 1,
    topic: 'Financial Analysis',
    subSkill: 'analysis_roa',
    cognitiveLevel: 'applying',
    difficulty: 3,
    errorPattern: 'calculation',
    explanation: 'العائد على الأصول = صافي الدخل ÷ إجمالي الأصول = 20,000 ÷ 200,000 = 0.10 = 10%.',
    irt: { a: 1.5, b: 0.5, c: 0.1 },
    subSkills: ['analysis_roa', 'financial_analysis'],
    diagnostic: {
      errorPattern: 'roa_calculation_error',
      rootCause: 'يخطئ في حساب العائد على الأصول (صافي الدخل ÷ إجمالي الأصول)',
      futureImpact: 'سيؤثر على تقييم كفاءة استخدام الأصول',
      remediationVideoQuery: 'حساب العائد على الأصول ROA'
    },
    prerequisites: ['income_net']
  },
  {
    id: 'acc_026',
    question: 'ما هو مؤشر الربحية الإجمالية (Gross Profit Margin)؟',
    options: [
      'الإيرادات - تكلفة البضاعة المباعة',
      '(الإيرادات - تكلفة البضاعة المباعة) / الإيرادات',
      'الإيرادات / تكلفة البضاعة المباعة',
      'صافي الدخل / الإيرادات'
    ],
    correct: 2,
    topic: 'Financial Analysis',
    subSkill: 'analysis_gross_margin',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'هامش الربح الإجمالي = (الإيرادات - تكلفة البضاعة المباعة) ÷ الإيرادات.',
    irt: { a: 1.0, b: -0.5, c: 0.15 },
    subSkills: ['analysis_gross_margin', 'financial_analysis'],
    diagnostic: {
      errorPattern: 'gross_margin_error',
      rootCause: 'يخلط بين هامش الربح الإجمالي وصافي الربح، أو يخطئ في الصيغة',
      futureImpact: 'سيؤثر على تحليل ربحية العمليات الأساسية',
      remediationVideoQuery: 'حساب هامش الربح الإجمالي'
    },
    prerequisites: ['income_net']
  },

  // =============================================================
  // المحور 8: مبادئ المحاسبة (Accounting Principles) - 4 أسئلة
  // =============================================================
  {
    id: 'acc_027',
    question: 'ما هو مبدأ مقابلة الإيرادات بالمصروفات (Matching Principle)؟',
    options: [
      'يجب أن تُسجل الإيرادات عند استلام النقد فقط',
      'يجب أن تُقابل المصروفات بالإيرادات التي ساعدت في تحقيقها في نفس الفترة',
      'يجب أن تُسجل المصروفات عند دفعها فقط',
      'الإيرادات والمصروفات تُسجل عند حدوثها فقط'
    ],
    correct: 2,
    topic: 'Accounting Principles',
    subSkill: 'principles_matching',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'مبدأ مقابلة الإيرادات بالمصروفات ينص على أنه يجب أن تُقابل المصروفات بالإيرادات التي ساعدت في تحقيقها في نفس الفترة.',
    irt: { a: 1.1, b: -0.3, c: 0.15 },
    subSkills: ['principles_matching', 'accounting_principles'],
    diagnostic: {
      errorPattern: 'matching_principle_error',
      rootCause: 'لا يفهم مبدأ مقابلة الإيرادات بالمصروفات',
      futureImpact: 'سيؤثر على تحديد فترة الاعتراف بالمصروفات',
      remediationVideoQuery: 'شرح مبدأ مقابلة الإيرادات بالمصروفات'
    },
    prerequisites: ['acc_definition']
  },
  {
    id: 'acc_028',
    question: 'ما هو مبدأ الاستمرارية (Going Concern Principle)؟',
    options: [
      'يفترض أن المنشأة ستستمر في العمل في المستقبل المنظور',
      'يفترض أن المنشأة ستتوقف عن العمل قريباً',
      'يقول بأن المنشأة يجب أن تُقيم أصولها بالقيمة السوقية',
      'يقول بأن المنشأة يجب أن تُقيم أصولها بالتكلفة التاريخية'
    ],
    correct: 1,
    topic: 'Accounting Principles',
    subSkill: 'principles_going_concern',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'مبدأ الاستمرارية يفترض أن المنشأة ستستمر في العمل في المستقبل المنظور، مما يبرر استخدام التكلفة التاريخية للأصول.',
    irt: { a: 1.0, b: -0.5, c: 0.15 },
    subSkills: ['principles_going_concern', 'accounting_principles'],
    diagnostic: {
      errorPattern: 'going_concern_error',
      rootCause: 'لا يفهم مبدأ الاستمرارية أو يخلط بينه وبين مبادئ أخرى',
      futureImpact: 'سيؤثر على فهمه لأساس تقييم الأصول',
      remediationVideoQuery: 'شرح مبدأ الاستمرارية في المحاسبة'
    },
    prerequisites: ['acc_definition']
  },
  {
    id: 'acc_029',
    question: 'ما هو مبدأ التكلفة التاريخية (Historical Cost Principle)؟',
    options: [
      'يجب تسجيل الأصول بتكلفتها الأصلية عند الشراء',
      'يجب تسجيل الأصول بالقيمة السوقية الحالية',
      'يجب تحديث قيمة الأصول سنوياً',
      'يجب تسجيل الأصول بالقيمة التي يمكن بيعها بها'
    ],
    correct: 1,
    topic: 'Accounting Principles',
    subSkill: 'principles_historical_cost',
    cognitiveLevel: 'remembering',
    difficulty: 2,
    errorPattern: 'memorization',
    explanation: 'مبدأ التكلفة التاريخية ينص على أنه يجب تسجيل الأصول بتكلفتها الأصلية عند الشراء، وليس بالقيمة السوقية.',
    irt: { a: 1.0, b: -0.5, c: 0.15 },
    subSkills: ['principles_historical_cost', 'accounting_principles'],
    diagnostic: {
      errorPattern: 'historical_cost_error',
      rootCause: 'يخلط بين التكلفة التاريخية والقيمة السوقية أو إعادة التقييم',
      futureImpact: 'سيؤثر على فهمه لتقييم الأصول',
      remediationVideoQuery: 'شرح مبدأ التكلفة التاريخية'
    },
    prerequisites: ['acc_definition']
  },
  {
    id: 'acc_030',
    question: 'ما هو مبدأ الحيطة والحذر (Conservatism Principle)؟',
    options: [
      'يجب الاعتراف بالإيرادات المحتملة قبل تحقيقها',
      'يجب الاعتراف بالخسائر المحتملة فوراً، والإيرادات عند تحقيقها فقط',
      'يجب الاعتراف بجميع الإيرادات والمصروفات عند حدوثها',
      'يجب عدم الاعتراف بأي خسائر محتملة'
    ],
    correct: 2,
    topic: 'Accounting Principles',
    subSkill: 'principles_conservatism',
    cognitiveLevel: 'understanding',
    difficulty: 2,
    errorPattern: 'conceptual',
    explanation: 'مبدأ الحيطة والحذر ينص على الاعتراف بالخسائر المحتملة فوراً، بينما لا يتم الاعتراف بالإيرادات إلا عند تحقيقها فعلياً.',
    irt: { a: 1.1, b: -0.3, c: 0.15 },
    subSkills: ['principles_conservatism', 'accounting_principles'],
    diagnostic: {
      errorPattern: 'conservatism_error',
      rootCause: 'يخلط بين مبدأ الحيطة والحذر ومبادئ أخرى مثل الاستحقاق',
      futureImpact: 'سيؤثر على فهمه لكيفية معالجة عدم اليقين في المحاسبة',
      remediationVideoQuery: 'شرح مبدأ الحيطة والحذر في المحاسبة'
    },
    prerequisites: ['acc_definition']
  }
];

export default QUESTIONS;
