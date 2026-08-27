import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from "../../components/Navbar";

const FIVE_STAGES = [
  { id: 1, label: 'تحديد الاحتياجات', icon: '📋', color: '#0EA5E9', description: 'طرح 5 أسئلة إلزامية لاستكشاف متطلبات العميل' },
  { id: 2, label: 'التفاوض على السعر', icon: '💰', color: '#F59E0B', description: 'تقديم عرض السعر والتفاوض للوصول إلى اتفاق' },
  { id: 3, label: 'أسئلة التسليم', icon: '📦', color: '#8B5CF6', description: 'الإجابة على 3 أسئلة إلزامية عن التسليم والدعم' },
  { id: 4, label: 'رفع تصميم الشبكة', icon: '📤', color: '#10B981', description: 'رفع ملف Packet Tracer (.pkt / .pka' },
  { id: 5, label: 'التسليم النهائي', icon: '🎉', color: '#EF4444', description: 'الختام الإيجابي وإغلاق الصفحة' }
];

const STAGE_CHECKLIST_HINTS = {
  1: [
    { id: 'devices', label: 'كم عدد الأجهزة ونقاط الوصول المتوقعة؟' },
    { id: 'internet', label: 'ما نوع الإنترنت المتاح وسرعته؟' },
    { id: 'guest_vlan', label: 'هل تحتاج شبكة منفصلة للضيوف؟' },
    { id: 'budget', label: 'ما الميزانية التقريبية للمشروع؟' },
    { id: 'space', label: 'كم مساحة المكان وعدد الطوابق؟' }
  ],
  2: [],
  3: [
    { id: 'delivery_time', label: 'متى سيكون موعد التسليم المتوقع؟' },
    { id: 'free_changes', label: 'كم مدة التعديلات المجانية والضمان؟' },
    { id: 'allowed_changes', label: 'ما التعديلات المسموحة بعد التسليم؟' }
  ],
  4: [],
  5: []
};

const TIPS_BY_STAGE = {
  1: [
    { n: 1, t: 'ابدأ بطرح الأسئلة الإلزامية الخمس بدءاً بالأجهزة وانتهاءً بالمساحة.' },
    { n: 2, t: 'لا تقدم عرض سعر قبل أن تكتشف جميع متطلبات العميل — هذا خطأ شائع.' },
    { n: 3, t: 'بعد كل سؤال، سجل الإجابة عقلياً وانتقل للعن الآخر حتى تكتمل الخمسة.' },
    { n: 4, t: 'عند اكتمالها، سيقودك الذكاء الاصطناعي تلقائياً إلى مرحلة السعر.' }
  ],
  2: [
    { n: 1, t: 'لا تعطِ السعر رقماً فقط — ابدأ بقائمة التجهيزات ثم السعر الإجمالي.' },
    { n: 2, t: 'أبرز جودة الأجهزة والضمان والدعم كحجج لتبرير السعر.' },
    { n: 3, t: 'إذا طلب خصماً، لا ترفض مباشرة — اربط الخصم بشرط مثل الدفع المسبق.' },
    { n: 4, t: 'أثق في نفسك: السعر المعقول = قيمة مقابل المال للعميل.' }
  ],
  3: [
    { n: 1, t: 'أجب عن أسئلة التسليم الثلاثة بوضوح وتفاصيل عملية.' },
    { n: 2, t: 'مثال مثالي: "التسليم خلال أسبوعين، شهر تعديلات مجانية، وضمان سنة على الأجهزة."' },
    { n: 3, t: 'تجنب الغموض — أبداً — فالعميل يريد مواعيد محددة.' },
    { n: 4, t: 'بعد الإجابة على الثلاثة، ستنتقل تلقائياً لمرحلة الرفع.' }
  ],
  4: [
    { n: 1, t: 'استخدم منطقة رفع الملف في أعلى منطقة المحادثة.' },
    { n: 2, t: 'تأكد من أن جميع الأجهزة متصلة، وأن IPs صحيحة قبل الرفع.' },
    { n: 3, t: 'يفضل إضافة تعليقات توضيحية داخل الملف شرحاً للتصميم.' },
    { n: 4, t: 'بعد الرفع، سيقول العميل تم الاستلام وينتقل معك للمرحلة النهائية.' }
  ],
  5: [
    { n: 1, t: 'أغلق الصفحة بإيجابية، واشكر العميل بصدق.' },
    { n: 2, t: 'أذكر أنك متاح للدعم المستقبلي والتعديلات.' },
    { n: 3, t: 'اطلب مراجعة العميل — ممارسة مهنية ممتازة.' },
    { n: 4, t: '🎉 تهانينا! أكملت المراحل الخمس بنجاح كامل!' }
  ]
};

const FEEDBACK_BADGE_MAP = {
  excellent: { bg: '#D1FAE5', fg: '#065F46', label: 'ممتاز 🌟' },
  good: { bg: '#DBEAFE', fg: '#1E40AF', label: 'جيد جداً ✅' },
  good_incomplete: { bg: '#FEF3C7', fg: '#92400E', label: 'جيد مع نقص 🟡' },
  positive: { bg: '#E0F2FE', fg: '#0369A1', label: 'إيجابي 👍' },
  neutral: { bg: '#F1F5F9', fg: '#475569', label: 'محايد ➖' },
  incorrect: { bg: '#FEE2E2', fg: '#991B1B', label: 'بحاجة لمراجعة ❌' },
  default: { bg: '#F1F5F9', fg: '#475569', label: '—' }
};

const DIFFICULTY_MAP = {
  'سهل': { bg: '#CCFBF1', fg: '#0F766E' },
  'متوسط': { bg: '#FEF3C7', fg: '#92400E' },
  'متقدم': { bg: '#FEE2E2', fg: '#991B1B' },
  'default': { bg: '#FEF3C7', fg: '#92400E' }
};

const SCENARIO_DATA = {
  cafe: {
    id: 'cafe',
    title: 'ملف العميل',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop&q=80',
    clientName: 'أبو أحمد',
    role: 'صاحب المقهى',
    difficulty: 'سهل',
    avatarEmoji: '☕',
    projectLabel: 'تصميم شبكة مقهى كوفي شوب ☕',
    description: 'صاحب مقهى يطلب منك تصميم شبكة لـ 50-70 زبون يومياً + كاشير + مكاتب إدارة.',
    personalityTags: [
      { text: '⏱️ متردد', bg: '#E0F2FE', color: '#0369A1' },
      { text: '💸 يركز على الميزانية', bg: '#FEF3C7', color: '#92400E' },
      { text: '🤝 ودود ومتفاهم', bg: '#CCFBF1', color: '#0F766E' }
    ],
    personality: 'يركز كثيراً على الميزانية المحدودة وتغطية كامل صالة الجلوس وضمان استقرار الإشارة خلال ساعات الذروة.',
    features: [
      { icon: '👥', text: '50-70 زبون يومياً', highlight: true },
      { icon: '📁', text: 'كاشير + مكاتب إدارة', highlight: false }
    ],
    tasks: [
      'كم نقطة وصول تحتاج لتغطية كامل المقهى؟',
      'كيف تصمم VLANs لعزل الزبائن عن الكاشير؟',
      'ما هي التجهيزات المناسبة للميزانية المحدودة؟'
    ],
    focus: 'طرح التجهيزات المناسبة وتأمين الشبكة ضمن الميزانية',
    greeting: 'أهلاً وسهلاً بك يا باش مهندس! أنا أبو أحمد صاحب مقهى كوفي شوب، تسعدني متابعتك. عندي مشروع تصميم شبكة للمقهى وأنا متحمس للبداية معك! 👋\n\nقبل أي شيء، أريدك أن تسألني عن متطلبات المشروع الأساسية الخمس الإلزامية: كم عدد الأجهزة المتوقعة، نوع الإنترنت المتاح عندي، هل أحتاج شبكة ضيوف منفصلة، ميزانيتي التقريبية، وكم مساحة المكان وعدد الطوابق؟\n\nهذه التفاصيل كلها مهمة جداً لتصميم شبكة تناسب المقهى. ابدأ وأنا معك خطوة بخطوة!'
  },
  hospital: {
    id: 'hospital',
    title: 'ملف العميل',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&fit=crop&q=80',
    clientName: 'د. خالد',
    role: 'مدير المركز الطبي',
    difficulty: 'متوسط',
    avatarEmoji: '🏥',
    projectLabel: 'تصميم شبكة مركز طبي متكامل 🏥',
    description: 'مركز طبي يحتاج شبكة آمنة للأقسام الطبية، العيادات الخارجية، المختبر ووحدة الرعاية.',
    personalityTags: [
      { text: '🔬 دقيق للغاية', bg: '#FEE2E2', color: '#991B1B' },
      { text: '⚡ سريع الرد', bg: '#CCFBF1', color: '#0F766E' },
      { text: '🔒 أولوية الأمان', bg: '#EDE9FE', color: '#5B21B6' }
    ],
    personality: 'يهتم جداً بأمن البيانات وسرعة الوصول للملفات الطبية الحساسة ومنع أي تداخل بين الشبكة الطبية وشبكة الزوار.',
    features: [
      { icon: '🏥', text: 'عيادات + مختبر + رعاية', highlight: true },
      { icon: '🔐', text: 'شبكة طبية معزولة 100%', highlight: false }
    ],
    tasks: [
      'كيف تفصل الأقسام أمنياً وتمنع التداخل؟',
      'ما متطلبات الأمان و الـ Firewall والشبكة الطبية؟',
      'كيف تضمن استمرارية الخدمة وسرعة الوصول لنظام PACS؟'
    ],
    focus: 'عزل الأقسام أمنياً وضمان استقرار وسرعة الخدمة',
    greeting: 'أهلاً وسهلاً بك، أنا د. خالد مدير المركز الطبي. يسعدني جداً أن نتعاون معك في تصميم شبكتنا الطبية الجديدة. 🏥\n\nقبل الغوص في التفاصيل التقنية، أحتاج منك أن تسألني عن المتطلبات الأساسية: كم عدد الأجهزة في المركز، نوع الإنترنت لدينا، شبكة الضيوف والمرضى المنفصلة، ميزانية المشروع، وكم عدد الطوابق ومساحة المركز.\n\nهذه المعلومات ضرورية جداً لأننا نتعامل مع بيانات حساسة للمرضى ونظام PACS للصور الطبية. تفضل وابدأ أسئلتك!'
  },
  office: {
    id: 'office',
    title: 'ملف العميل',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&fit=crop&q=80',
    clientName: 'أ. سارة',
    role: 'مسؤولة التقنية',
    difficulty: 'متقد',
    avatarEmoji: '💼',
    projectLabel: 'تصميم شبكة شركة ناشئة تقنية 💻',
    description: 'شركة ناشئة تطلب شبكة لـ 80 موظفاً وتتوسع بسرعة مع نظام VPN للعمل عن بعد.',
    personalityTags: [
      { text: '🎯 ملمة بالتقنية', bg: '#FEF3C7', color: '#92400E' },
      { text: '🚀 مواكبة للتطور', bg: '#E0F2FE', color: '#0369A1' },
      { text: '📈 تركز على التوسع', bg: '#DBEAFE', color: '#1D4ED8' }
    ],
    personality: 'تهتم بقابلية التوسع مستقبلاً، سهولة الإدارة اللاسلكية، وتأمين الاتصالات البعيدة عبر VPN.',
    features: [
      { icon: '👩‍💻', text: '80 موظف + طابقين', highlight: true },
      { icon: '🔐', text: 'اتصال VPN خارجي آمن', highlight: false }
    ],
    tasks: [
      'ما هي طريقة توزيع IPs الملائمة للتوسع؟',
      'كيف تجهز VPN لتأمين الموظفين بالخارج؟',
      'ما التجهيزات المطلوبة لربط الطابقين؟'
    ],
    focus: 'توزيع IPs وإعداد VPN الآمن وقابلية التوسع',
    greeting: 'مرحباً! أنا سارة، مسؤولة التقنية في الشركة الناشئة. سعيدة جداً بالتعاون معك يا باش مهندس! 💼\n\nعندنا شركة تنمو بسرعة ونحتاج شبكة مرنة وقابلة للتوسع خلال 6 أشهر القادمة. قبل ما نبدأ، عندي متطلبات أساسية: ابدأ بالأسئلة الخمس — كم عدد الأجهزة المتوقع، نوع الإنترنت لدينا، هل نحتاج شبكة ضيوف/موظفين منفصلة، ميزانيتنا التقريبية لهذا العام، وكم عدد الطوابق ومساحة المقر.\n\nأنا مهتمة جداً بالتفاصيل، لذا لا تتردد في السؤال عن أي شيء تريده. نبدأ!'
  }
};

export default function ScenarioDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const [conversationScore, setConversationScore] = useState({ total: 0, interactions: 0, average: 0 });
  const [lastFeedback, setLastFeedback] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [userLevel, setUserLevel] = useState('beginner');
  const [userName, setUserName] = useState('زميلنا');

  const [currentStage, setCurrentStage] = useState(1);
  const [stageDataSnapshot, setStageDataSnapshot] = useState(null);
  const [stageBanner, setStageBanner] = useState(null);

  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [confirmUploadMessage, setConfirmUploadMessage] = useState('');
  const [apiStatus, setApiStatus] = useState({ online: null, provider: null, usedFallback: null });

  const scenario = useMemo(() => (SCENARIO_DATA[id] || SCENARIO_DATA.cafe), [id]);
  const stageInfo = FIVE_STAGES[currentStage - 1];

  useEffect(() => {
    try {
      const analysis = JSON.parse(localStorage.getItem('latestAnalysis') || 'null');
      if (analysis && typeof analysis.score === 'number') {
        if (analysis.score >= 75) setUserLevel('advanced');
        else if (analysis.score >= 50) setUserLevel('intermediate');
        else setUserLevel('beginner');
      }
      const savedName = localStorage.getItem('userName');
      if (savedName) setUserName(savedName);
    } catch (e) {
      console.warn('Failed to read user data:', e);
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (messages.length === 0 && id && scenario) {
      setMessages([{
        id: 'welcome-' + Date.now(),
        sender: 'client',
        text: scenario.greeting,
        isWelcome: true
      }]);
    }
  }, [id, scenario]);

  const getStageChecklist = useCallback(() => {
    if (currentStage === 1) {
      const answered = new Set(stageDataSnapshot?.stage1?.answeredQuestionIds || []);
      return STAGE_CHECKLIST_HINTS[1].map((q) => ({
        id: q.id,
        text: q.label,
        done: answered.has(q.id)
      }));
    }
    if (currentStage === 3) {
      const answered = new Set(stageDataSnapshot?.stage3?.answeredQuestionIds || []);
      return STAGE_CHECKLIST_HINTS[3].map((q) => ({
        id: q.id,
        text: q.label,
        done: answered.has(q.id)
      }));
    }
    return [];
  }, [currentStage, stageDataSnapshot]);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleSelectedFile = (file) => {
    if (!file) return;
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    if (!['pkt', 'pka', 'zip', 'pdf'].includes(ext)) {
      setConfirmUploadMessage('⚠️ الرجاء اختيار ملف Packet Tracer فقط: .pkt أو .pka (أو .zip/.pdf للمستندات).');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setConfirmUploadMessage('⚠️ حجم الملف كبير جداً (أكبر من 50 ميجابايت).');
      return;
    }
    setUploadedFile(file);
    const sizeKB = Math.round(file.size / 1024);
    setConfirmUploadMessage(
      `📎 تم اختيار الملف بنجاح: ${file.name} (${sizeKB.toLocaleString('ar-EG')} كيلوبايت. اضغط على "إرسال الملف للعميل" للمتابعة.`
    );
  };

  const onFilePicked = (e) => {
    const file = e.target.files?.[0];
    if (file) handleSelectedFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) handleSelectedFile(file);
  };

  const applyApiResponse = useCallback((data) => {
    const reply = data.reply || data.message || '';
    const fb = data.feedback;

    const clientMsg = {
      id: Date.now() + 1,
      sender: 'client',
      text: reply,
      feedback: fb,
      score: data.score,
      meta: data.meta
    };
    setMessages(prev => [...prev, clientMsg]);

    setLastFeedback(fb);
    setSuggestions(data.suggestions || []);

    setApiStatus({
      online: true,
      provider: data.meta?.aiProvider || '—',
      usedFallback: Boolean(data.meta?.usedFallback)
    });

    if (typeof data.score === 'number') {
      setConversationScore(prev => {
        const interactions = prev.interactions + 1;
        const total = prev.total + (data.score * 10);
        const average = interactions > 0 ? Math.round((total / interactions) * 10) / 10 : 0;
        return { interactions, total, average };
      });
    }

    if (typeof data.stage === 'number' && data.stage !== currentStage && data.stageChanged) {
      const oldStage = currentStage;
      const newStageInfo = FIVE_STAGES.find(s => s.id === data.stage);
      setCurrentStage(data.stage);
      setStageBanner({
        type: 'advance',
        text: `🎉 انتقال ذكي من المرحلة ${oldStage} إلى المرحلة ${data.stage}: ${newStageInfo?.icon} ${newStageInfo?.label || ''}`
      });
      setTimeout(() => setStageBanner(null), 6000);
    } else if (data.stageChanged) {
      setStageBanner({
        type: 'info',
        text: `📍 المرحلة الحالية: ${data.stageName || ''}`
      });
      setTimeout(() => setStageBanner(null), 3500);
    }

    if (data.stageDataSnapshot) {
      setStageDataSnapshot(data.stageDataSnapshot);
    }
  }, [currentStage]);

  const sendUploadedFile = async () => {
    if (!uploadedFile || isLoading) return;
    setIsLoading(true);
    setConfirmUploadMessage('🚀 جاري إرسال الملف للعميل...');

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: `قمت برفع ملف تصميم الشبكة: ${uploadedFile.name}`,
      file: uploadedFile.name,
      fileSize: uploadedFile.size,
      isFileOnly: true
    };
    setMessages(prev => [...prev, userMsg]);

    const historyPayload = messages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text || ''
    }));
    historyPayload.push({ role: 'user', content: userMsg.text });

    try {
      const response = await fetch('/api/scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: id,
          message: `[ملف Packet Tracer مرفوع من قبل المستخدم] اسم الملف: ${uploadedFile.name} — حجم الملف: ${Math.round(uploadedFile.size / 1024)} كيلوبايت`,
          history: historyPayload,
          userLevel,
          conversationStage: currentStage,
          stageDataSnapshot,
          fileInfo: { uploaded: true, name: uploadedFile.name, size: uploadedFile.size }
        })
      });

      if (!response.ok) throw new Error(`API HTTP ${response.status}`);
      const data = await response.json();
      if (!data.ok) throw new Error(data.message || 'API returned not ok');
      applyApiResponse(data);
      setConfirmUploadMessage('✅ تم إرسال الملف للعميل بنجاح! العميل يراجعه الآن.');
    } catch (e) {
      console.error('File upload API error:', e);
      const fallbackReply = `✅ ممتاز! تم استلام ملف المشروع (${uploadedFile.name}) بنجاح! شكراً جزيلاً على الجهد المبذول في التصميم.\n\n📋 مراجعتي السريعة: يبدو التنظيم جيداً، وفصل الأجهزة واضح، وربط الشبكات منظم. ممتاز!\n\n🎉 سأنتقل الآن معك إلى التسليم النهائي والختام.`;
      applyApiResponse({
        reply: fallbackReply,
        feedback: { score: 0.9, type: 'excellent', note: 'تم رفع واستلام ملف التصميم بنجاح.', points: ['جودة ملف ممتازة', 'تنظيم واضح للتصميم'] },
        score: 0.9,
        suggestions: [],
        stage: 5,
        stageName: 'التسليم النهائي',
        stageChanged: currentStage !== 5,
        stageDataSnapshot: {
          ...(stageDataSnapshot || {}),
          stage4: { fileUploaded: true, fileName: uploadedFile.name, fileSize: uploadedFile.size, uploadTime: new Date().toISOString() }
        },
        meta: { aiProvider: 'Fallback', usedFallback: true }
      });
      setCurrentStage(5);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (directText = null) => {
    const textToSend = (typeof directText === 'string' ? directText.trim() : inputValue.trim());
    if ((!textToSend && currentStage !== 4) || isLoading) return;
    if (!textToSend && currentStage === 4 && !uploadedFile) return;

    const finalText = textToSend || '';
    if (finalText) {
      const userMessage = {
        id: Date.now(),
        sender: 'user',
        text: finalText,
        file: null
      };
      setMessages(prev => [...prev, userMessage]);
    }
    setInputValue('');
    setIsLoading(true);

    const historyPayload = messages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text || ''
    }));
    if (finalText) historyPayload.push({ role: 'user', content: finalText });

    try {
      const response = await fetch('/api/scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: id,
          message: finalText,
          history: historyPayload,
          userLevel,
          conversationStage: currentStage,
          stageDataSnapshot
        })
      });
      if (!response.ok) throw new Error(`API HTTP ${response.status}`);
      const data = await response.json();
      if (!data.ok) throw new Error(data.message || 'API returned not ok');
      applyApiResponse(data);
    } catch (error) {
      console.error('Chat API fallback triggered:', error);
      await new Promise(r => setTimeout(r, 900));

      const fallbackByStage = {
        1: 'سؤال جيد! الآن حاول أن تسألني عن باقي المتطلبات: عدد الأجهزة، الإنترنت، شبكة الضيوف، الميزانية، أو مساحة المكان.',
        2: '🤔 دعني أفكر في السعر الذي عرضته. حاول أن تشرح لماذا هذا السعر مناسب وما الفوائد التي سأحصل عليها؟',
        3: 'إجابة مقبولة. الآن أريد أن أسألك عن باقي أسئلة التسليم: موعد التسليم، مدة التعديلات المجانية، وما التعديلات المسموحة بعد؟',
        4: '💡 تفضل وأرفق ملف تصميم Packet Tracer (.pkt أو .pka) لنرى التصميم العملي.',
        5: '🎉 تم تسليم المشروع بنجاح! أشكرك يا باش مهندس على التعاون الممتاز. بالتوفيق في مشاريعك القادمة!'
      };

      const fbScore = [0.45, 0.5, 0.55, 0.4, 0.9][currentStage - 1] || 0.5;
      applyApiResponse({
        reply: fallbackByStage[currentStage] || 'ممتاز! استمر في التفاعل.',
        feedback: {
          score: fbScore,
          type: fbScore >= 0.7 ? 'good' : fbScore >= 0.5 ? 'positive' : 'neutral',
          note: 'رد احتياطي — جرب مجدداً عند توفر الإنترنت.',
          points: ['تفاعل جيد مع المرحلة', 'يمكن تحسين الحجج والتفاصيل']
        },
        score: fbScore,
        suggestions: [],
        stage: currentStage,
        stageChanged: false,
        stageDataSnapshot,
        meta: { aiProvider: 'Fallback', usedFallback: true }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stageChecklist = getStageChecklist();

  const getDifficultyBadge = (d) => DIFFICULTY_MAP[d] || DIFFICULTY_MAP['default'];
  const getFeedbackBadge = (type) => FEEDBACK_BADGE_MAP[type] || FEEDBACK_BADGE_MAP['default'];

  const inputPlaceholder = useMemo(() => {
    switch (currentStage) {
      case 1: return 'اكتب سؤالك الأول للعميل... (مثال: "كم عدد الأجهزة ونقاط الوصول المتوقعة؟")';
      case 2: return 'اكتب عرض السعر والتبرير المنطقي للمبلغ...';
      case 3: return 'أجب عن سؤال التسليم الحالي بتفاصيل واضحة...';
      case 4: return uploadedFile ? 'اكتب تعليقاً إضافياً مع الملف...' : '💡 استخدم منطقة رفع الملف بالأعلى لرفع مشروع Packet Tracer (.pkt / .pka)';
      case 5: return 'اكتب رسالة ختامية إيجابية وإغلاق الصفحة...';
      default: return 'اكتب رسالتك...';
    }
  }, [currentStage, uploadedFile]);

  return (
    <div style={styles.pageContainer}>
      <style jsx global>{`
        @media (max-width: 1024px) {
          .ws-layout { flex-direction: column !important; }
          .sidebar-col { width: 100% !important; order: -1; }
          .chat-col { height: auto !important; min-height: 55vh !important; }
        }
        body { direction: rtl; }
      `}</style>

      <Navbar />

      <main style={styles.mainContent}>
        <div style={styles.workspace} className="ws-layout">

          {/* ===== قسم المحادثة الرئيسي */}
          <section style={styles.chatSection}>

            {/* ====== Stepper العلوي بـ 5 مراحل */}
            <div style={styles.stepperContainer}>
              <div style={styles.stepsRow}>
                {FIVE_STAGES.map((step, idx) => {
                  const active = step.id === currentStage;
                  const done = step.id < currentStage;
                  return (
                    <React.Fragment key={step.id}>
                      <div style={styles.stepWrapper} title={step.description}>
                        <div style={{
                          ...styles.stepCircle,
                          width: 44, height: 44,
                          backgroundColor: done ? '#10B981' : active ? step.color : '#E2E8F0',
                          color: (done || active) ? '#ffffff' : '#64748B',
                          boxShadow: active ? `0 0 0 5px ${step.color}22` : 'none',
                          border: active ? `2px solid ${step.color}` : '2px solid transparent'
                        }}>
                          {done ? '✓' : step.icon}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <span style={{
                            ...styles.stepLabel,
                            fontWeight: active ? 800 : done ? 700 : 500,
                            color: active ? '#0F172A' : done ? '#065F46' : '#94A3B8'
                          }}>
                            المرحلة {step.id}: {step.label}
                          </span>
                          {active && (
                            <span style={{ fontSize: '0.72rem', color: '#64748B', marginTop: 2 }}>
                              {step.description.slice(0, 36)}...
                            </span>
                          )}
                        </div>
                      </div>
                      {idx < FIVE_STAGES.length - 1 && (
                        <div style={{
                          ...styles.stepLine,
                          backgroundColor: currentStage > step.id ? '#10B981' : '#E2E8F0',
                          height: currentStage > step.id ? 3 : 2,
                          flex: 1
                        }} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {stageBanner && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: 12,
                  backgroundColor: stageBanner.type === 'advance' ? '#ECFDF5' : '#EFF6FF',
                  color: stageBanner.type === 'advance' ? '#065F46' : '#1E40AF',
                  fontWeight: 700, fontSize: '0.92rem',
                  border: `1px solid ${stageBanner.type === 'advance' ? '#6EE7B7' : '#93C5FD'}`,
                  textAlign: 'center',
                  animation: 'pulse 2s ease-in-out'
                }}>
                  {stageBanner.text}
                </div>
              )}

              {stageChecklist.length > 0 && (
                <div style={styles.checklistBox}>
                  <div style={styles.checklistHeader}>
                    <span style={{ fontSize: '1rem' }}>✅</span>
                    <strong style={{ color: '#0F172A' }}>
                      قائمة المتطلبات الإلزامية لهذه المرحلة
                    </strong>
                    <span style={{
                      marginRight: 'auto',
                      padding: '2px 10px',
                      borderRadius: 12,
                      backgroundColor: stageChecklist.every(i => i.done) ? '#D1FAE5' : '#FEF3C7',
                      color: stageChecklist.every(i => i.done) ? '#065F46' : '#92400E',
                      fontSize: '0.78rem', fontWeight: 700
                    }}>
                      {stageChecklist.filter(i => i.done).length} / {stageChecklist.length} مكتمل
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                    {stageChecklist.map((item, i) => (
                      <div key={item.id} style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '8px 12px',
                        borderRadius: 10,
                        backgroundColor: item.done ? '#F0FDF4' : '#FFFFFF',
                        border: `1px solid ${item.done ? '#BBF7D0' : '#F1F5F9'}`,
                        transition: 'all 0.3s'
                      }}>
                        <span style={{
                          width: 24, height: 24, borderRadius: '50%',
                          border: `2px solid ${item.done ? '#10B981' : '#CBD5E1'}`,
                          backgroundColor: item.done ? '#10B981' : '#FFFFFF',
                          color: '#FFFFFF',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.75rem', fontWeight: 800
                        }}>
                          {item.done ? '✓' : i + 1}
                        </span>
                        <span style={{
                          flex: 1,
                          color: item.done ? '#065F46' : '#334155',
                          textDecoration: item.done ? 'line-through' : 'none',
                          opacity: item.done ? 0.85 : 1,
                          fontSize: '0.9rem',
                          fontWeight: item.done ? 500 : 600
                        }}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ====== بطاقة المحادثة */}
            <div style={styles.chatCard} className="chat-col">
              <div style={styles.chatCardHeader}>
                <div style={styles.clientStatus}>
                  <span style={styles.onlineDot}></span>
                  <span style={{ color: '#334155' }}>الدردشة مع:</span>
                  <strong style={{ color: '#0F172A' }}>{scenario.clientName}</strong>
                  <span style={{ color: '#94A3B8', margin: '0 4px' }}>·</span>
                  <span style={{ color: '#475569' }}>المرحلة {currentStage}/5</span>
                  {apiStatus.provider && (
                    <span style={{
                      marginRight: 12,
                      padding: '2px 8px',
                      borderRadius: 10,
                      fontSize: '0.7rem',
                      backgroundColor: apiStatus.usedFallback ? '#FEF3C7' : '#ECFDF5',
                      color: apiStatus.usedFallback ? '#92400E' : '#065F46',
                      fontWeight: 700
                    }}>
                      {apiStatus.provider}{apiStatus.usedFallback ? ' (وضع تجريبي)' : ''}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {conversationScore.interactions > 0 && (
                    <div style={styles.scoreBadge}>
                      المتوسط: {conversationScore.average.toFixed(1)} / 10
                      <span style={{ marginRight: 6, fontSize: '0.75rem', opacity: 0.75 }}>
                        ({conversationScore.interactions} تفاعل)
                      </span>
                    </div>
                  )}
                  <div style={{
                    ...styles.difficultyBadge,
                    ...getDifficultyBadge(scenario.difficulty)
                  }}>
                    ⚡ الصعوبة: {scenario.difficulty}
                  </div>
                </div>
              </div>

              {/* منطقة الرسائل */}
              <div style={styles.messagesArea}>
                <div style={styles.simPill}>
                  <span>{scenario.avatarEmoji}</span>
                  <span>{scenario.projectLabel}</span>
                  <span style={{ margin: '0 6px', opacity: 0.5 }}>·</span>
                  <span>المحاكي الذكي مدعوم بالذكاء الاصطناعي</span>
                </div>

                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  const fb = msg.feedback;
                  const fbBadge = fb ? getFeedbackBadge(fb.type) : null;
                  return (
                    <div key={msg.id} style={isUser ? styles.userMsgRow : styles.clientMsgRow}>
                      {isUser ? (
                        <div style={styles.userBubble}>
                          <div style={{ whiteSpace: 'pre-line', lineHeight: 1.75 }}>
                            {msg.text}
                          </div>
                          {msg.file && (
                            <div style={styles.filePillUser}>
                              📎 {msg.file}
                              {msg.fileSize && ` (${Math.round(msg.fileSize / 1024)} KB)`}
                            </div>
                          )}
                        </div>
                      ) : (
                        <>
                          <img src={scenario.avatar} alt={scenario.clientName} style={styles.avatar} />
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div style={styles.clientBubble}>
                              <div style={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                                {msg.text}
                              </div>
                              {msg.file && (
                                <div style={styles.filePillClient}>📎 {msg.file}</div>
                              )}
                            </div>
                            {fbBadge && (
                              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                                <span style={{
                                  padding: '3px 12px',
                                  borderRadius: 14,
                                  fontSize: '0.78rem',
                                  fontWeight: 800,
                                  backgroundColor: fbBadge.bg,
                                  color: fbBadge.fg
                                }}>
                                  {fbBadge.label} · {Math.round((msg.score || 0) * 100)}%
                                </span>
                                {fb?.note && (
                                  <span style={styles.notePill}>
                                    💬 {fb.note}
                                  </span>
                                )}
                                {fb?.points && fb.points.length > 0 && (
                                  <div style={{
                                    display: 'flex', flexWrap: 'wrap', gap: 6
                                  }}>
                                    {fb.points.slice(0, 2).map((p, idx) => (
                                      <span key={idx} style={{
                                        fontSize: '0.72rem',
                                        padding: '2px 8px',
                                        borderRadius: 8,
                                        backgroundColor: idx === 0 ? '#ECFDF5' : '#FEF2F2',
                                        color: idx === 0 ? '#065F46' : '#991B1B',
                                        border: `1px solid ${idx === 0 ? '#A7F3D0' : '#FECACA'}`
                                      }}>
                                        {idx === 0 ? '✅' : '💡'} {p}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}

                {/* Drop Zone للمرحلة 4 */}
                {currentStage === 4 && !uploadedFile && (
                  <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={openFileDialog}
                    style={{
                      ...styles.dropZone,
                      borderColor: isDragging ? '#10B981' : '#94A3B8',
                      backgroundColor: isDragging ? '#ECFDF5' : '#FFFFFF',
                      transform: isDragging ? 'scale(1.015)' : 'scale(1)',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      accept=".pkt,.pka,.zip,.pdf"
                      onChange={onFilePicked}
                    />
                    <div style={{ fontSize: 56, marginBottom: 4 }}>📤</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>
                      منطقة سحب وإفلات ملف Packet Tracer
                    </div>
                    <div style={{
                      fontSize: '0.9rem', color: '#64748B',
                      marginTop: 6, textAlign: 'center',
                      maxWidth: 460, lineHeight: 1.6
                    }}>
                      اسحب الملف وأفلته هنا <strong>أو</strong> اضغط في أي مكان داخل المربع لاختيار الملف يدوياً
                    </div>
                    <div style={styles.dropHintRow}>
                      <div style={styles.dropHintItem}>✅ .pkt / .pka</div>
                      <div style={styles.dropHintItem}>📏 حتى 50 ميجابايت</div>
                      <div style={styles.dropHintItem}>🔒 أمان وخصوصية تامة</div>
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div style={styles.clientMsgRow}>
                    <img src={scenario.avatar} alt={scenario.clientName} style={styles.avatar} />
                    <div style={styles.clientBubble}>
                      <div style={styles.typingIndicator}>
                        <span></span><span></span><span></span>
                        <span style={{ marginRight: 12, fontStyle: 'italic', color: '#64748B' }}>
                          يقوم {scenario.clientName} بالرد وتحليل رسالتك بواسطة الذكاء الاصطناعي...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* شريط الاقتراحات */}
              {suggestions.length > 0 && (
                <div style={styles.suggestionsBar}>
                  <div style={{
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    color: '#475569',
                    marginBottom: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}>
                    💡 اقتراحات ذكية للمرحلة الحالية ({stageInfo?.icon} {stageInfo?.label})
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(s)}
                        disabled={isLoading}
                        style={{
                          ...styles.suggestionPill,
                          opacity: isLoading ? 0.5 : 1,
                          cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* منطقة إدخال النص والأزرار */}
              <div style={styles.inputContainer}>

                {currentStage === 4 && uploadedFile && (
                  <div style={styles.fileReadyBox}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, flexWrap: 'wrap' }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        backgroundColor: '#ECFDF5',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 22
                      }}>
                        📎
                      </div>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ fontWeight: 800, color: '#065F46', fontSize: '0.95rem' }}>
                          الملف جاهز للإرسال: {uploadedFile.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#047857', marginTop: 2 }}>
                          حجم الملف: {Math.round(uploadedFile.size / 1024).toLocaleString('ar-EG')} كيلوبايت ·
                          <span style={{ marginRight: 6, opacity: 0.8 }}>
                            نوع: {uploadedFile.type || 'ملف Packet Tracer'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => { setUploadedFile(null); setConfirmUploadMessage(''); }}
                        style={styles.secondaryBtn}
                        disabled={isLoading}
                      >
                        تغيير الملف
                      </button>
                      <button
                        onClick={sendUploadedFile}
                        disabled={isLoading}
                        style={{
                          ...styles.primaryBtn,
                          backgroundColor: '#10B981',
                          opacity: isLoading ? 0.6 : 1
                        }}
                      >
                        {isLoading ? '...جاري الإرسال' : 'إرسال الملف للعميل →'}
                      </button>
                    </div>
                  </div>
                )}

                {confirmUploadMessage && (
                  <div style={{
                    marginBottom: 10, fontSize: '0.85rem',
                    padding: '8px 14px', borderRadius: 10,
                    backgroundColor: confirmUploadMessage.includes('⚠️') ? '#FEF9C3' : '#ECFDF5',
                    color: confirmUploadMessage.includes('⚠️') ? '#854D0E' : '#065F46',
                    border: `1px solid ${confirmUploadMessage.includes('⚠️') ? '#FACC15' : '#6EE7B7'}`,
                    fontWeight: 600
                  }}>
                    {confirmUploadMessage}
                  </div>
                )}

                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={inputPlaceholder}
                  style={styles.textArea}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  disabled={isLoading}
                  rows={3}
                />

                <div style={styles.actionBar}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button onClick={openFileDialog} style={styles.toolBtn} title="إرفاق ملف">
                      📎 إرفاق ملف Packet Tracer
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => setShowTips(true)}
                      style={styles.tipsBtn}
                      title="تلميحات للمرحلة الحالية"
                    >
                      💡 تلميحات
                    </button>
                    <button
                      onClick={() => handleSend()}
                      style={{
                        ...styles.sendBtn,
                        opacity: (isLoading || (!inputValue.trim() && !(currentStage === 4 && uploadedFile))) ? 0.55 : 1,
                        cursor: (isLoading || (!inputValue.trim() && !(currentStage === 4 && uploadedFile))) ? 'not-allowed' : 'pointer'
                      }}
                      disabled={isLoading || (!inputValue.trim() && !(currentStage === 4 && uploadedFile))}
                    >
                      {isLoading ? (
                        <span>جاري المعالجة ⏳</span>
                      ) : (
                        <span>إرسال إلى {scenario.clientName} ◀</span>
                      )}
                    </button>
                  </div>
                </div>

                <div style={styles.evalFooter}>
                  <span style={styles.evalText}>
                    ⚖️ يتم الآن تقييم:{' '}
                    <strong style={{ color: '#0C4A6E' }}>
                      {currentStage === 1 && 'شمولية أسئلتك للمتطلبات والتركيز على النقاط الخمس الإلزامية'}
                      {currentStage === 2 && 'منطق التسعير وحججك التفاوضية وقناعتك للعميل'}
                      {currentStage === 3 && 'وضوح إجاباتك عن أسئلة التسليم والتفاصيل العملية'}
                      {currentStage === 4 && 'اكتمال وجودة ملف التصميم المرفوع ووضوح التسمياته'}
                      {currentStage === 5 && 'إحترافية الختام والتعامل الإيجابي مع العميل'}
                    </strong>
                  </span>
                  <p style={styles.projectMini}>
                    {scenario.avatarEmoji} {scenario.projectLabel}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ====== الشريط الجانبي */}
          <aside style={styles.sidebarSection} className="sidebar-col">
            <div style={styles.briefCard}>
              <div style={styles.scrollContainer}>
                <h2 style={styles.briefTitle}>{scenario.title}</h2>

                <div style={styles.profileArea}>
                  <div style={{ position: 'relative', marginBottom: '0.8rem' }}>
                    <img src={scenario.avatar} alt={scenario.clientName} style={styles.largeAvatar} />
                    <span style={{
                      position: 'absolute',
                      bottom: 4, left: 4,
                      fontSize: 24,
                      backgroundColor: '#FFFFFF',
                      borderRadius: '50%',
                      width: 32, height: 32,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                      {scenario.avatarEmoji}
                    </span>
                  </div>
                  <h3 style={styles.clientNameTxt}>{scenario.clientName}</h3>
                  <p style={styles.clientRoleTxt}>{scenario.role}</p>
                </div>

                <div style={styles.personalitySection}>
                  <div style={styles.personalityHeader}>السمات الشخصية</div>
                  <div style={styles.badgesWrapper}>
                    {scenario.personalityTags.map((tag, idx) => (
                      <span key={idx} style={{
                        ...styles.personalityBadge,
                        backgroundColor: tag.bg,
                        color: tag.color
                      }}>
                        {tag.text}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={styles.currentStageBox}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1E40AF' }}>
                    🎯 المرحلة الحالية ({currentStage}/5)
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A', marginTop: 4 }}>
                    {stageInfo?.icon} {stageInfo?.label}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: 4, lineHeight: 1.5 }}>
                    {stageInfo?.description}
                  </div>
                  <div style={{
                    width: '100%', height: 8,
                    backgroundColor: '#E2E8F0',
                    borderRadius: 20,
                    marginTop: 10,
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${(currentStage / 5) * 100}%`,
                      height: '100%',
                      backgroundColor: stageInfo?.color || '#0EA5E9',
                      borderRadius: 20,
                      transition: 'width 0.6s ease'
                    }} />
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: 6, textAlign: 'center' }}>
                    تقدم المحادثة: {Math.round((currentStage / 5) * 100)}%
                  </div>
                </div>

                <div style={styles.contextBox}>
                  <div style={styles.contextHeader}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 6 }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    سياق المشروع والشخصية
                  </div>
                  <p style={styles.contextTxt}>
                    {scenario.description}
                    <br /><br />
                    <strong style={{ color: '#0F172A' }}>نمط الشخصية:</strong> {scenario.personality}
                  </p>
                </div>

                <div style={styles.divider}></div>

                <div style={styles.featuresSection}>
                  <div style={styles.featuresHeader}>⚙️ خصائص السيناريو</div>
                  <div style={styles.featuresGrid}>
                    {scenario.features.map((feat, idx) => (
                      <div key={idx} style={feat.highlight ? styles.featureHi : styles.featureNorm}>
                        <span style={{ marginLeft: 6 }}>{feat.icon}</span>
                        {feat.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.divider}></div>

                <div style={styles.tasksSection}>
                  <h3 style={styles.tasksHeader}>📋 المطلوب العام في هذا السيناريو:</h3>
                  <ul style={styles.tasksList}>
                    {scenario.tasks.map((task, idx) => (
                      <li key={idx} style={styles.taskItem}>
                        <span style={styles.taskDot}>•</span>
                        <span style={styles.taskTxt}>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={styles.userLevelBox}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#0D1E3B', marginBottom: 4 }}>
                    🎯 مستواك الحالي:
                    <span style={{
                      backgroundColor: userLevel === 'advanced' ? '#22C55E'
                        : userLevel === 'intermediate' ? '#F59E0B'
                        : '#0EA5E9',
                      color: '#FFFFFF',
                      padding: '3px 12px',
                      borderRadius: 14,
                      marginRight: 8,
                      fontSize: 12
                    }}>
                      {userLevel === 'advanced' ? 'متقدم 🌟'
                        : userLevel === 'intermediate' ? 'متوسط 📈'
                        : 'مبتدئ 🌱'}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 4, lineHeight: 1.6 }}>
                    {userLevel === 'advanced' && '🌟 مستوى عالٍ جداً. استخدم حججاً تقنية متقدمة وتفاصيل دقيقة أثناء التفاوض!'}
                    {userLevel === 'intermediate' && '📈 مستوى جيد جداً. ركّز على تحسين حججك التفاوضية ووضوح التفاصيل.'}
                    {userLevel === 'beginner' && '🌱 بداية رائعة جداً! ركّز في البداية على الأسئلة الخمس الإلزامية في المرحلة الأولى.'}
                  </div>
                </div>
              </div>

              <div style={styles.sidebarFooter}>
                💡 التركيز في هذه المرحلة: {scenario.focus}
              </div>
            </div>
          </aside>

        </div>
      </main>

      {/* ====== نافذة التلميحات (Modal) */}
      {showTips && (
        <div style={styles.modalOverlay} onClick={() => setShowTips(false)}>
          <div style={styles.tipsModal} onClick={e => e.stopPropagation()}>
            <div style={styles.tipsHeader}>
              <div style={styles.tipsTitle}>
                💡 تلميحات للمرحلة {currentStage} · {stageInfo?.icon} {stageInfo?.label}
              </div>
              <button onClick={() => setShowTips(false)} style={styles.closeBtn}>✕</button>
            </div>
            <div style={styles.tipsBody}>
              {(TIPS_BY_STAGE[currentStage] || []).map((tip, idx) => (
                <div key={idx} style={styles.tipRow}>
                  <span style={styles.tipNum}>{tip.n}.</span>
                  <p style={styles.tipTxt}>{tip.t}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: 14, backgroundColor: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 800, color: '#0F172A', marginBottom: 8, fontSize: '0.95rem' }}>
                🎮 اختصارات لوحة المفاتيح:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, fontSize: '0.85rem', color: '#475569' }}>
                <span>
                  <kbd style={styles.kbd}>Enter</kbd> إرسال الرسالة
                </span>
                <span>
                  <kbd style={styles.kbd}>Shift</kbd> + <kbd style={styles.kbd}>Enter</kbd> سطر جديد
                </span>
              </div>
            </div>
            <div style={styles.tipsFooter}>
              <button onClick={() => setShowTips(false)} style={styles.understandBtn}>
                حسناً، فهمت ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====== التذييل */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div>
            <p style={styles.footerBrand}>SmartLab AI 🧠</p>
            <p style={styles.footerDesc}>
              منصة تعليمية متطورة — محاكي عميل ذكي مدعوم بالذكاء الاصطناعي يتكون من 5 مراحل متتالية لتدريب المهندسين على مهارات التواصل المهني.
            </p>
          </div>
          <div style={{ textAlign: 'left', opacity: 0.85 }}>
            <p style={{ fontSize: '0.85rem', margin: '0 0 6px 0', color: 'rgba(255,255,255,0.9)' }}>
              🔐 تم بناؤه بـ Next.js + DeepSeek LLM
            </p>
            <p style={{ fontSize: '0.75rem', margin: 0, opacity: 0.75 }}>
              v3.0 · إصدار {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: '#EEF2F7',
    direction: 'rtl',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Tahoma, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  mainContent: { flex: 1, padding: '1.2rem 2rem', display: 'flex', boxSizing: 'border-box' },
  workspace: { display: 'flex', width: '100%', gap: '1.5rem', alignItems: 'flex-start' },
  chatSection: { flex: 2, display: 'flex', flexDirection: 'column', minWidth: 0, gap: '1rem' },

  stepperContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: '1.2rem 1.5rem',
    boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
    border: '1px solid #E2E8F0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem'
  },
  stepsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
    flexWrap: 'wrap',
    gap: '10px'
  },
  stepWrapper: { display: 'flex', alignItems: 'flex-start', gap: '0.75rem', position: 'relative', flexShrink: 0 },
  stepCircle: {
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1rem', fontWeight: 800,
    transition: 'all 0.35s cubic-bezier(.4,0,.2,1)'
  },
  stepLabel: { fontSize: '0.9rem', whiteSpace: 'nowrap' },
  stepLine: {
    minWidth: 40,
    height: 3,
    backgroundColor: '#E2E8F0',
    margin: '20px 0.5rem 0 0.5rem',
    borderRadius: 3,
    transition: 'background-color 0.4s ease'
  },

  checklistBox: {
    marginTop: '0.4rem',
    padding: '14px 18px',
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    border: '1px solid #E2E8F0',
    display: 'flex',
    flexDirection: 'column'
  },
  checklistHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: '0.92rem'
  },

  chatCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
    border: '1px solid #E2E8F0',
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 210px)',
    minHeight: 700
  },
  chatCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #F1F5F9',
    flexWrap: 'wrap',
    gap: 10
  },
  clientStatus: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.95rem', flexWrap: 'wrap' },
  onlineDot: { width: 10, height: 10, backgroundColor: '#10B981', borderRadius: '50%', boxShadow: '0 0 0 3px rgba(16,185,129,0.2)' },
  scoreBadge: {
    padding: '5px 14px',
    borderRadius: 14,
    backgroundColor: '#DBEAFE',
    color: '#1E40AF',
    fontSize: '0.82rem',
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    gap: 4
  },
  difficultyBadge: {
    fontSize: '0.85rem',
    padding: '5px 14px',
    borderRadius: 14,
    fontWeight: 700
  },

  messagesArea: {
    flex: 1,
    padding: '1.5rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.1rem',
    backgroundColor: '#F8FAFC'
  },
  simPill: {
    alignSelf: 'center',
    backgroundColor: '#E2E8F0',
    color: '#475569',
    fontSize: '0.8rem',
    fontWeight: 700,
    padding: '6px 16px',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 6
  },
  clientMsgRow: { display: 'flex', alignItems: 'flex-start', gap: '0.8rem', alignSelf: 'flex-start', maxWidth: '88%' },
  userMsgRow: { display: 'flex', alignItems: 'flex-start', gap: '0.8rem', alignSelf: 'flex-end', maxWidth: '88%' },
  clientBubble: {
    backgroundColor: '#FFFFFF',
    color: '#334155',
    padding: '1rem 1.25rem',
    borderRadius: '4px 18px 18px 18px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
    fontSize: '0.95rem',
    lineHeight: 1.7,
    border: '1px solid #E2E8F0',
    position: 'relative'
  },
  userBubble: {
    background: 'linear-gradient(135deg, #0284A0 0%, #0369A1 100%)',
    color: '#FFFFFF',
    padding: '1rem 1.25rem',
    borderRadius: '18px 4px 18px 18px',
    fontSize: '0.95rem',
    lineHeight: 1.7,
    boxShadow: '0 2px 12px rgba(2,132,160,0.15)'
  },
  avatar: { width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid #FFFFFF', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' },
  filePillUser: { marginTop: '0.6rem', backgroundColor: 'rgba(255,255,255,0.18)', padding: '4px 10px', borderRadius: 8, fontSize: '0.82rem', display: 'inline-block' },
  filePillClient: { marginTop: '0.6rem', backgroundColor: '#F0FDF4', padding: '4px 10px', borderRadius: 8, fontSize: '0.82rem', color: '#065F46', display: 'inline-block' },
  notePill: {
    fontSize: '0.8rem', color: '#475569',
    padding: '3px 12px',
    backgroundColor: '#F1F5F9',
    borderRadius: 10
  },
  typingIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: 4
  },
  typingText: { fontStyle: 'italic', color: '#94A3B8' },

  dropZone: {
    alignSelf: 'center',
    width: '85%',
    padding: '40px 24px',
    border: '3px dashed #CBD5E1',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.25s ease',
    margin: '10px 0'
  },
  dropHintRow: {
    marginTop: 16,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center'
  },
  dropHintItem: {
    padding: '4px 12px',
    backgroundColor: '#F0FDF4',
    color: '#065F46',
    borderRadius: 12,
    fontSize: '0.78rem',
    fontWeight: 700,
    border: '1px solid #86EFAC'
  },

  suggestionsBar: {
    padding: '0.9rem 1.3rem',
    borderTop: '1px solid #F1F5F9',
    borderBottom: '1px solid #F1F5F9',
    backgroundColor: '#FFFFFF'
  },
  suggestionPill: {
    padding: '8px 16px',
    borderRadius: 20,
    border: '1.5px solid #0EA5E9',
    backgroundColor: '#F0F9FF',
    color: '#0369A1',
    fontSize: '0.84rem',
    fontWeight: 700,
    transition: 'all 0.2s ease',
    ':hover': { backgroundColor: '#E0F2FE' }
  },

  inputContainer: {
    padding: '1.1rem 1.3rem',
    borderTop: '1px solid #F1F5F9',
    backgroundColor: '#FFFFFF',
    borderRadius: '0 0 18px 18px'
  },
  fileReadyBox: {
    marginBottom: 12,
    padding: '12px 16px',
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    border: '1px solid #6EE7B7',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap'
  },
  textArea: {
    width: '100%',
    minHeight: 72,
    maxHeight: 180,
    border: 'none',
    resize: 'vertical',
    outline: 'none',
    fontSize: '0.98rem',
    color: '#0F172A',
    fontFamily: 'inherit',
    lineHeight: 1.6,
    backgroundColor: 'transparent',
    padding: '6px 2px'
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.3rem',
    borderTop: '1px solid #F1F5F9',
    paddingTop: '0.7rem',
    flexWrap: 'wrap',
    gap: 8
  },
  toolBtn: {
    background: 'none',
    border: '1.5px solid #E2E8F0',
    color: '#64748B',
    fontSize: '0.85rem',
    cursor: 'pointer',
    padding: '7px 14px',
    borderRadius: 8,
    fontWeight: 600,
    transition: 'all 0.2s',
    ':hover': { backgroundColor: '#F8FAFC', borderColor: '#CBD5E1' }
  },
  tipsBtn: {
    backgroundColor: 'transparent',
    color: '#475569',
    border: '2px solid rgba(2,103,113)',
    borderRadius: 8,
    padding: '7px 16px',
    fontWeight: 700,
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  sendBtn: {
    background: 'linear-gradient(135deg, #0284A0 0%, #0369A1 100%)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 10,
    padding: '9px 20px',
    fontWeight: 800,
    fontSize: '0.9rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(2,103,113,0.25)',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: 6
  },
  primaryBtn: {
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 10,
    padding: '8px 18px',
    fontWeight: 800,
    fontSize: '0.88rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(16,185,129,0.3)',
    transition: 'all 0.2s'
  },
  secondaryBtn: {
    padding: '7px 14px',
    borderRadius: 8,
    border: '1.5px solid #D1D5DB',
    backgroundColor: '#FFFFFF',
    color: '#374151',
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: '0.85rem'
  },
  evalFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.9rem',
    borderTop: '1px solid #F1F5F9',
    paddingTop: '0.7rem',
    flexWrap: 'wrap',
    gap: 8
  },
  evalText: { fontSize: '0.82rem', color: '#64748B' },
  projectMini: { fontSize: '0.8rem', color: '#94A3B8', margin: 0, fontWeight: 600 },

  sidebarSection: { width: 360, display: 'flex', flexDirection: 'column', flexShrink: 0 },
  briefCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
    border: '1px solid #E2E8F0',
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 150px)',
    overflow: 'hidden',
    position: 'sticky',
    top: 16
  },
  scrollContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '1.4rem',
    display: 'flex',
    flexDirection: 'column'
  },
  briefTitle: { fontSize: '1.3rem', color: '#0D3D4E', fontWeight: 800, marginBottom: '1.2rem', textAlign: 'center' },
  profileArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #F1F5F9'
  },
  largeAvatar: {
    width: 96,
    height: 96,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #006482',
    boxShadow: '0 4px 14px rgba(0,100,130,0.15)'
  },
  clientNameTxt: { fontSize: '1.3rem', color: '#0F172A', fontWeight: 900, margin: '0.3rem 0 0.15rem 0' },
  clientRoleTxt: { fontSize: '0.9rem', color: '#64748B', fontWeight: 500, margin: 0 },

  personalitySection: { width: '100%', textAlign: 'center', margin: '0.8rem 0 1rem 0' },
  personalityHeader: { fontSize: '0.82rem', fontWeight: 700, color: '#94A3B8', marginBottom: '0.6rem' },
  badgesWrapper: { display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem' },
  personalityBadge: {
    padding: '5px 12px',
    borderRadius: 20,
    fontSize: '0.82rem',
    fontWeight: 700,
    whiteSpace: 'nowrap'
  },

  currentStageBox: {
    padding: '14px 16px',
    backgroundColor: '#EFF6FF',
    border: '1px solid #BFDBFE',
    borderRadius: 14,
    marginBottom: '1rem',
    textAlign: 'center'
  },

  contextBox: {
    backgroundColor: '#F4F6F8',
    borderRadius: 14,
    padding: '1.1rem',
    border: '1px solid #E2E8F0',
    marginBottom: '1.2rem',
    textAlign: 'right'
  },
  contextHeader: { fontSize: '1rem', fontWeight: 800, color: '#0D3D4E', marginBottom: '0.6rem', display: 'flex', alignItems: 'center' },
  contextTxt: { fontSize: '0.9rem', color: '#475569', lineHeight: 1.75, margin: 0 },
  divider: { height: 1, backgroundColor: '#E2E8F0', margin: '0.9rem 0' },
  featuresSection: { width: '100%', marginBottom: '1rem' },
  featuresHeader: { fontSize: '0.85rem', fontWeight: 800, color: '#94A3B8', marginBottom: '0.6rem' },
  featuresGrid: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  featureHi: { backgroundColor: '#E0F8F1', color: '#0F766E', padding: '8px 14px', borderRadius: 26, fontSize: '0.85rem', fontWeight: 800, display: 'flex', alignItems: 'center' },
  featureNorm: { backgroundColor: '#F1F5F9', color: '#475569', padding: '8px 14px', borderRadius: 26, fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center' },
  tasksSection: { width: '100%' },
  tasksHeader: { fontSize: '0.98rem', color: '#0F172A', fontWeight: 800, margin: '0 0 0.6rem 0' },
  tasksList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  taskItem: { fontSize: '0.88rem', color: '#475569', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', lineHeight: 1.6 },
  taskDot: { color: '#0284C7', fontWeight: 'bold', fontSize: '1.2rem', lineHeight: 1 },
  taskTxt: { flex: 1 },
  userLevelBox: {
    marginTop: 18,
    padding: '14px 16px',
    backgroundColor: '#F0F7F8',
    borderRadius: 14,
    border: '1px solid #17919e'
  },
  sidebarFooter: {
    padding: '14px 18px',
    borderTop: '1px solid #E2E8F0',
    backgroundColor: '#F8FAFC',
    fontSize: '0.82rem',
    color: '#0C4A6E',
    textAlign: 'right',
    fontWeight: 700,
    lineHeight: 1.6
  },

  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(4px)',
    animation: 'fadeIn 0.2s ease'
  },
  tipsModal: {
    backgroundColor: '#FFFFFF',
    borderTop: '8px solid #0D3D4E',
    borderRadius: 18,
    padding: '1.5rem 1.8rem',
    width: 520,
    maxWidth: '92vw',
    maxHeight: '88vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    overflowY: 'auto'
  },
  tipsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #E2E8F0',
    paddingBottom: '0.8rem'
  },
  tipsTitle: { fontSize: '1.15rem', fontWeight: 900, color: '#0F172A' },
  closeBtn: {
    background: 'none', border: 'none',
    color: '#94A3B8', fontSize: '1.4rem',
    cursor: 'pointer', width: 34, height: 34,
    borderRadius: 8, transition: 'all 0.2s',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  tipsBody: { display: 'flex', flexDirection: 'column', gap: '0.7rem' },
  tipRow: { display: 'flex', gap: '0.6rem', alignItems: 'flex-start' },
  tipNum: {
    color: '#006482',
    fontWeight: 900,
    fontSize: '1rem',
    flexShrink: 0,
    width: 22
  },
  tipTxt: { fontSize: '0.95rem', color: '#334155', margin: 0, flex: 1, lineHeight: 1.7 },
  kbd: {
    backgroundColor: '#F1F5F9',
    border: '1px solid #CBD5E1',
    borderRadius: 6,
    padding: '2px 8px',
    fontSize: '0.78rem',
    fontWeight: 700,
    color: '#334155',
    boxShadow: '0 1px 0 #CBD5E1',
    margin: '0 3px'
  },
  tipsFooter: { display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' },
  understandBtn: {
    background: 'linear-gradient(135deg, #0284A0 0%, #0369A1 100%)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 10,
    padding: '9px 26px',
    fontWeight: 800,
    cursor: 'pointer',
    fontSize: '0.92rem',
    boxShadow: '0 2px 10px rgba(2,103,113,0.25)'
  },

  footer: {
    background: 'linear-gradient(135deg, #006482 0%, #0C4A6E 100%)',
    color: '#FFFFFF',
    padding: '28px 0',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: 'auto'
  },
  footerInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: 1250,
    padding: '0 40px',
    flexWrap: 'wrap',
    gap: 20
  },
  footerBrand: {
    margin: '0 0 6px 0',
    fontWeight: 900,
    fontSize: '1.3rem',
    textAlign: 'right'
  },
  footerDesc: {
    margin: 0,
    fontSize: '0.88rem',
    opacity: 0.85,
    lineHeight: 1.7,
    maxWidth: 520,
    textAlign: 'right'
  }
};
