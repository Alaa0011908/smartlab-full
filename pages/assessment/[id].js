// pages/assessment/[id].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from "../../components/Navbar";
import { getAssessmentQuestions, getAssessmentName } from '../../data/questions/basics';
import { 
  initializeTheta, 
  getNextQuestion, 
  updateThetaAfterAnswer,
  estimateTheta,
  getStudentLevel
} from '../../lib/adaptiveEngine';

// ============================================================
// 🎨 الألوان والأنماط (نفسها)
// ============================================================
const COLORS = {
  teal: "#17919e",
  tealDark: "#127a86",
  orange: "#e1682e",
  navy: "#0d3d4e",
  bg: "#eef4f8",
  white: "#ffffff",
  text: "#0d1e3b",
  muted: "#5b6b7b",
  border: "#bcd7db",
  lightGray: "#f8f9fa",
  success: "#2ECC71",
  successDark: "#27AE60",
  error: "#E74C3C",
  errorDark: "#C0392B",
  warning: "#F39C12",
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: COLORS.bg,
    direction: "rtl",
    fontFamily: "'Segoe UI', Tahoma, 'Cairo', system-ui, sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    maxWidth: 820,
    width: "100%",
    margin: "0 auto",
    padding: "32px 24px 60px",
  },
  statsBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    padding: "16px 24px",
    backgroundColor: COLORS.white,
    borderBottom: "1px solid #e6ecf1",
    flexWrap: "wrap",
  },
  statCard: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 24px",
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    border: "1px solid #e6ecf1",
    minWidth: 140,
    justifyContent: "center",
  },
  statIcon: { fontSize: 24 },
  statInfo: { display: "flex", flexDirection: "column", alignItems: "center" },
  statValue: { fontSize: 24, fontWeight: 800 },
  statValueScore: { color: COLORS.teal },
  statValueCorrect: { color: COLORS.success },
  statValueWrong: { color: COLORS.error },
  statLabel: { fontSize: 13, color: COLORS.muted, fontWeight: 500 },
  progressContainer: { padding: "0 24px", backgroundColor: COLORS.white, paddingBottom: 12 },
  progressBar: { height: 6, backgroundColor: "#e6ecf1", borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 4, transition: "width 0.5s ease" },
  questionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: "32px 36px 36px",
    boxShadow: "0 6px 24px rgba(13,30,59,0.06)",
    marginBottom: 24,
    transition: "opacity 0.3s ease, transform 0.3s ease",
  },
  questionMeta: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  topicBadge: { display: "inline-block", backgroundColor: COLORS.navy, color: COLORS.white, padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600 },
  difficultyBadge: { display: "inline-block", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 },
  cognitiveBadge: { display: "inline-block", backgroundColor: "#E3F2FD", color: "#0D47A1", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 },
  writingBadge: { display: "inline-block", backgroundColor: "#FFF3E0", color: "#E65100", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 },
  questionText: { fontSize: 20, fontWeight: 700, color: COLORS.text, lineHeight: 1.8, marginBottom: 28, textAlign: "right" },
  optionsContainer: { display: "flex", flexDirection: "column", gap: 12 },
  optionButton: {
    display: "flex",
    alignItems: "center",
    padding: "16px 20px",
    borderRadius: 14,
    border: "2px solid #e6ecf1",
    backgroundColor: COLORS.white,
    cursor: "pointer",
    transition: "all 0.25s ease",
    fontSize: 16,
    fontFamily: "inherit",
    textAlign: "right",
    color: COLORS.text,
    width: "100%",
    gap: 12,
    minHeight: 56,
  },
  optionLetter: { display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", backgroundColor: "#f0f0f0", fontWeight: 700, fontSize: 14, color: COLORS.navy, flexShrink: 0 },
  optionText: { flex: 1 },
  feedbackContainer: { marginTop: 20, padding: "16px 20px", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 },
  feedbackCorrect: { backgroundColor: "#E8F5E9", border: "1px solid " + COLORS.success },
  feedbackWrong: { backgroundColor: "#FFEBEE", border: "1px solid " + COLORS.error },
  feedbackIcon: { fontSize: 24 },
  feedbackText: { fontSize: 16, fontWeight: 600 },
  feedbackCorrectText: { color: COLORS.successDark },
  feedbackWrongText: { color: COLORS.errorDark },
  feedbackCorrectAnswer: { fontSize: 14, color: COLORS.text, fontWeight: 500 },
  feedbackExplanation: { fontSize: 14, color: COLORS.muted, marginTop: 4 },
  nextButton: { padding: "10px 28px", backgroundColor: COLORS.teal, color: COLORS.white, border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "background-color 0.25s ease, transform 0.25s ease", fontFamily: "inherit", minHeight: 48 },
  writingContainer: { marginTop: 8 },
  writingInput: { width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #e6ecf1", fontSize: 16, fontFamily: "inherit", resize: "vertical", minHeight: 120, backgroundColor: COLORS.white, transition: "border-color 0.25s ease", textAlign: "right", outline: "none" },
  submitWritingButton: { marginTop: 12, padding: "12px 32px", backgroundColor: COLORS.teal, color: COLORS.white, border: "none", borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "background-color 0.25s ease", fontFamily: "inherit", minHeight: 48 },
  submitWritingDisabled: { opacity: 0.5, cursor: "not-allowed" },
  loadingContainer: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, backgroundColor: COLORS.bg },
  spinner: { width: 48, height: 48, border: "4px solid #e6ecf1", borderTop: "4px solid " + COLORS.teal, borderRadius: "50%", animation: "spin 1s linear infinite" },
  errorBox: { backgroundColor: "#FFEBEE", padding: "2rem", borderRadius: 16, textAlign: "center", border: "1px solid #FFCDD2", maxWidth: 500, margin: "auto" },
  remainingQuestions: { fontSize: "14px", fontWeight: 600, color: COLORS.muted, marginRight: "12px" },
  quickBadge: { backgroundColor: "#FFF8E1", color: "#E65100", padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, display: "inline-block", marginRight: 8 },
};

// ============================================================
// 🧠 مكون التقييم الرئيسي
// ============================================================
export default function Assessment() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);       // جميع الأسئلة المتاحة
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);           // الإجابات (boolean)
  const [answerDetails, setAnswerDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [timePerQuestion, setTimePerQuestion] = useState([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [hoveredOption, setHoveredOption] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lastErrorType, setLastErrorType] = useState(null);
  const [lastExplanation, setLastExplanation] = useState("");

  // === 🔥 الحالات الجديدة للتكيف الذكي ===
  const [theta, setTheta] = useState(0);
  const [answeredIds, setAnsweredIds] = useState([]);
  const [eventsLog, setEventsLog] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [totalQuestionsCount, setTotalQuestionsCount] = useState(0);

  // ============================================================
  // 🔷 دوال مساعدة
  // ============================================================
  const correctCount = answers.filter(a => a === true || a === 1).length;
  const wrongCount = answers.filter(a => a === false || a === 0).length;
  const answeredCount = answers.length;
  const score = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  // تسجيل الأحداث
  const logEvent = (type, payload = {}) => {
    setEventsLog(prev => [...prev, { type, timestamp: Date.now(), ...payload }]);
  };

  // الحصول على رسالة خطأ مخصصة (نفسها)
  const getErrorFeedbackMessage = (errorType, question) => {
    const messages = {
      conceptual: { text: '🔍 هذا الخطأ يشير إلى عدم فهم المفهوم الأساسي. راجع التعريفات جيداً.', explanation: 'المفاهيم النظرية تحتاج إلى فهم عميق، حاول إعادة قراءة الشرح من مصدر موثوق.' },
      calculation: { text: '🧮 يبدو أن هناك خطأ في الحساب. تأكد من تنفيذ العمليات خطوة بخطوة.', explanation: 'استخدم ورقة وقلم لحل المسائل، وتأكد من كل خطوة قبل الانتقال للخطوة التالية.' },
      application: { text: '⚙️ تحتاج إلى تطبيق المعلومة على سياق جديد. حاول حل تمارين مشابهة.', explanation: 'التطبيق العملي يختلف عن الحفظ النظري، جرب حل مسائل من مصادر مختلفة.' },
      memorization: { text: '📚 قد يكون الاعتماد على الحفظ دون فهم. حاول إعادة صياغة المعلومة بكلماتك.', explanation: 'حاول فهم العلاقات بين المفاهيم بدلاً من حفظها بشكل منفصل.' }
    };
    return messages[errorType] || messages.conceptual;
  };

  const getErrorTypeFromQuestion = (question) => {
    if (question.errorPattern) return question.errorPattern;
    const cognitive = question.cognitiveLevel || 'remembering';
    const subSkill = question.subSkill || '';
    if (cognitive === 'remembering') return 'memorization';
    if (cognitive === 'applying' || cognitive === 'analyzing') return 'application';
    if (subSkill.includes('calc') || subSkill.includes('subnet') || subSkill.includes('host')) return 'calculation';
    return 'conceptual';
  };

  // ============================================================
  // 🔷 معالجة الإجابات
  // ============================================================
  const handleOptionSelect = (optionIndex) => {
    if (showFeedback || loading || !currentQuestion) return;
    setSelectedOption(optionIndex);
    const timeTaken = (Date.now() - questionStartTime) / 1000;
    setTimePerQuestion(prev => [...prev, timeTaken]);
    const isCorrect = optionIndex === currentQuestion.correct;
    setLastAnswerCorrect(isCorrect);
    setAnswers(prev => [...prev, isCorrect]);

    // تسجيل الحدث
    logEvent('select_option', { optionIndex, isCorrect, timeTaken });

    // تحديث القدرة (Theta)
    const newTheta = updateThetaAfterAnswer(theta, currentQuestion, isCorrect);
    setTheta(newTheta);
    setAnsweredIds(prev => [...prev, currentQuestion.id]);

    // تحديد نوع الخطأ للتغذية الراجعة
    const errorType = getErrorTypeFromQuestion(currentQuestion);
    setLastErrorType(errorType);
    const feedback = getErrorFeedbackMessage(errorType, currentQuestion);
    setLastExplanation(feedback.explanation);

    setAnswerDetails(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedOption: optionIndex,
      isCorrect,
      timeTaken,
      topic: currentQuestion.topic || 'عام',
      subSkill: currentQuestion.subSkill || 'عام',
      cognitiveLevel: currentQuestion.cognitiveLevel || 'remembering',
      difficulty: currentQuestion.difficulty || 1,
      isWriting: false,
      errorType,
    }]);

    setShowFeedback(true);
  };

  const handleWritingSubmit = () => {
    if (!writtenAnswer.trim() || showFeedback || loading || !currentQuestion) return;
    const timeTaken = (Date.now() - questionStartTime) / 1000;
    setTimePerQuestion(prev => [...prev, timeTaken]);
    const userAnswer = writtenAnswer.trim().toLowerCase();
    const expected = currentQuestion.expectedAnswer?.toLowerCase() || "";
    const isCorrect = userAnswer === expected;
    setLastAnswerCorrect(isCorrect);
    setAnswers(prev => [...prev, isCorrect]);

    logEvent('submit_writing', { answer: userAnswer, isCorrect, timeTaken });

    const newTheta = updateThetaAfterAnswer(theta, currentQuestion, isCorrect);
    setTheta(newTheta);
    setAnsweredIds(prev => [...prev, currentQuestion.id]);

    const errorType = getErrorTypeFromQuestion(currentQuestion);
    setLastErrorType(errorType);
    const feedback = getErrorFeedbackMessage(errorType, currentQuestion);
    setLastExplanation(feedback.explanation);

    setAnswerDetails(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedOption: userAnswer,
      isCorrect,
      timeTaken,
      topic: currentQuestion.topic || 'عام',
      subSkill: currentQuestion.subSkill || 'عام',
      cognitiveLevel: currentQuestion.cognitiveLevel || 'remembering',
      difficulty: currentQuestion.difficulty || 1,
      isWriting: true,
      writtenAnswer: userAnswer,
      errorType,
    }]);

    setShowFeedback(true);
  };

  // ============================================================
  // 🔷 الانتقال للسؤال التالي أو إنهاء التقييم
  // ============================================================
  const goToNextOrFinish = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    setWrittenAnswer("");
    setQuestionStartTime(Date.now());
    setLastAnswerCorrect(null);
    setLastErrorType(null);
    setLastExplanation("");

    // اختيار السؤال التالي باستخدام المحرك الذكي
    const next = getNextQuestion(theta, answeredIds, allQuestions);
    if (next) {
      setCurrentQuestion(next);
    } else {
      // انتهى التقييم
      const queryParams = {
        answers: JSON.stringify(answers),
        questions: JSON.stringify(allQuestions),
        answerDetails: JSON.stringify(answerDetails),
        assessmentId: router.query.id,
        total: allQuestions.length,
        mode: router.query.mode || "full",
        timePerQuestion: JSON.stringify(timePerQuestion),
        eventsLog: JSON.stringify(eventsLog),
        theta: JSON.stringify(theta),
        answeredIds: JSON.stringify(answeredIds),
      };

      if (router.query.mode === 'quick') {
        const quickResult = {
          score: Math.round((correctCount / totalQuestionsCount) * 100),
          total: totalQuestionsCount,
          correct: correctCount,
          wrong: totalQuestionsCount - correctCount,
        };
        queryParams.quickResult = JSON.stringify(quickResult);
      }

      router.push({
        pathname: "/result",
        query: queryParams,
      });
    }
  };

  // ============================================================
  // 🔷 تحميل الأسئلة وتهيئة التقييم
  // ============================================================
  useEffect(() => {
    if (router.isReady) {
      setIsReady(true);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!isReady) return;
    const { id, mode } = router.query;
    if (!id) {
      setError("معرف التقييم غير موجود");
      setLoading(false);
      return;
    }

    try {
      let assessmentQuestions = getAssessmentQuestions(id);
      if (!assessmentQuestions || assessmentQuestions.length === 0) {
        setError("لا توجد أسئلة لهذا التقييم");
        setLoading(false);
        return;
      }

      // خلط الأسئلة
      const shuffled = [...assessmentQuestions].sort(() => Math.random() - 0.5);
      const limit = mode === "quick" ? 12 : 0;  // السريع 12 سؤالاً
      const limited = limit > 0 ? shuffled.slice(0, limit) : shuffled;

      setAllQuestions(limited);
      setTotalQuestionsCount(limited.length);

      // تهيئة القدرة
      const initialTheta = initializeTheta();
      setTheta(initialTheta);

      // اختيار أول سؤال باستخدام CAT
      const first = getNextQuestion(initialTheta, [], limited);
      setCurrentQuestion(first);
      setQuestionStartTime(Date.now());
      setLoading(false);
    } catch (err) {
      console.error("Error loading assessment:", err);
      setError("حدث خطأ في تحميل التقييم: " + (err.message || ""));
      setLoading(false);
    }
  }, [isReady, router.query]);

  // ============================================================
  // 🔷 التحقق من انتهاء التقييم (إذا لم يعد هناك أسئلة)
  // ============================================================
  useEffect(() => {
    if (!loading && allQuestions.length > 0 && answeredIds.length === allQuestions.length) {
      // تم الإجابة على جميع الأسئلة، ننتقل للنتيجة تلقائياً
      goToNextOrFinish();
    }
  }, [answeredIds, allQuestions, loading]);

  // ============================================================
  // 🔷 واجهة المستخدم (UI)
  // ============================================================
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isReady || loading) {
    return (
      <div style={styles.container}>
        <Navbar />
        <div style={styles.loadingContainer}>
          <div style={styles.spinner} />
          <p style={{ color: COLORS.muted, fontSize: 16 }}>
            {!isReady ? "جاري تجهيز التقييم..." : "جاري تحميل التقييم..."}
          </p>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (error || !allQuestions.length) {
    return (
      <div style={styles.container}>
        <Navbar />
        <div style={{ ...styles.main, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <div style={styles.errorBox}>
            <h3 style={{ color: COLORS.error, marginBottom: 8 }}>⚠️ {error || "لا توجد أسئلة"}</h3>
            <p style={{ color: COLORS.muted, marginBottom: 16 }}>يرجى العودة واختيار تقييم آخر.</p>
            <Link href="/assessment/categories" style={{ ...styles.nextButton, display: "inline-block", textDecoration: "none" }}>
              ← العودة للتقييمات
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div style={styles.container}>
        <Navbar />
        <div style={{ ...styles.main, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <div style={styles.errorBox}>
            <h3 style={{ color: COLORS.success, marginBottom: 8 }}>🎉 انتهى التقييم!</h3>
            <p style={{ color: COLORS.muted, marginBottom: 16 }}>جارٍ التوجيه إلى صفحة النتيجة...</p>
          </div>
        </div>
      </div>
    );
  }

  const assessmentName = getAssessmentName ? getAssessmentName(router.query.id) : router.query.id;
  const isQuick = router.query.mode === "quick";
  const progress = totalQuestionsCount > 0 ? ((answeredIds.length) / totalQuestionsCount) * 100 : 0;

  const getProgressColor = () => {
    if (score >= 70) return COLORS.success;
    if (score >= 40) return COLORS.warning;
    return COLORS.error;
  };

  const getDifficultyLabel = (difficulty) => {
    const levels = {
      1: { label: "🟢 سهل", color: COLORS.success },
      2: { label: "🟡 متوسط", color: COLORS.warning },
      3: { label: "🔴 صعب", color: COLORS.error },
    };
    return levels[difficulty] || levels[1];
  };

  const getCognitiveLabel = (level) => {
    const map = {
      remembering: "تذكر",
      understanding: "فهم",
      applying: "تطبيق",
      analyzing: "تحليل",
      evaluating: "تقييم",
      creating: "إبداع",
    };
    return map[level] || level || "تذكر";
  };

  const optionLetters = ["أ", "ب", "ج", "د"];

  return (
    <>
      <Head>
        <title>{assessmentName || "تقييم"} - Smart Lab</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.5" />
        <style>{`
          @media (max-width: 640px) {
            .question-card { padding: 16px 14px 20px !important; }
            .question-text { font-size: 17px !important; }
            .option-button { padding: 14px 12px !important; font-size: 14px !important; min-height: 48px !important; }
            .stats-bar { gap: 8px !important; padding: 10px 12px !important; flex-wrap: wrap !important; }
            .stat-card { padding: 8px 12px !important; min-width: 70px !important; flex: 1 1 auto !important; flex-direction: column !important; gap: 4px !important; }
            .stat-value { font-size: 18px !important; }
            .stat-icon { font-size: 18px !important; }
            .stat-label { font-size: 11px !important; }
            .writing-input { font-size: 14px !important; min-height: 100px !important; }
            .submit-writing-button { width: 100% !important; padding: 12px !important; }
            .next-button { width: 100% !important; justify-content: center !important; }
            .feedback-container { flex-direction: column !important; align-items: stretch !important; }
            .question-meta { gap: 6px !important; }
            .topic-badge { font-size: 11px !important; padding: 3px 10px !important; }
          }
        `}</style>
      </Head>

      <div style={styles.container} dir="rtl">
        <Navbar />

        {/* شريط الإحصائيات */}
        <div style={styles.statsBar} className="stats-bar">
          <div style={styles.statCard}>
            <span style={styles.statIcon}>📊</span>
            <div style={styles.statInfo}>
              <span style={{ ...styles.statValue, ...styles.statValueScore }}>{score}%</span>
              <span style={styles.statLabel}>النسبة المئوية</span>
            </div>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>✅</span>
            <div style={styles.statInfo}>
              <span style={{ ...styles.statValue, ...styles.statValueCorrect }}>{correctCount}</span>
              <span style={styles.statLabel}>الإجابات الصحيحة</span>
            </div>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>❌</span>
            <div style={styles.statInfo}>
              <span style={{ ...styles.statValue, ...styles.statValueWrong }}>{wrongCount}</span>
              <span style={styles.statLabel}>الإجابات الخاطئة</span>
            </div>
          </div>
          {isQuick && (
            <div style={{ ...styles.statCard, backgroundColor: "#FFF8E1", borderColor: "#FFE082" }}>
              <span style={styles.statIcon}>⚡</span>
              <div style={styles.statInfo}>
                <span style={{ ...styles.statValue, color: "#E65100" }}>سريع</span>
                <span style={styles.statLabel}>نوع التقييم</span>
              </div>
            </div>
          )}
        </div>

        {/* شريط التقدم */}
        <div style={styles.progressContainer}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: COLORS.muted }}>
              {answeredIds.length + 1} / {totalQuestionsCount}
            </span>
            <span style={styles.remainingQuestions}>
              {totalQuestionsCount - (answeredIds.length + 1)} أسئلة متبقية
            </span>
          </div>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%`, backgroundColor: getProgressColor() }} />
          </div>
        </div>

        {/* السؤال الحالي */}
        <main style={styles.main}>
          <div style={styles.questionCard} className="question-card">
            <div style={styles.questionMeta} className="question-meta">
              <span style={styles.topicBadge} className="topic-badge">{currentQuestion.topic || "عام"}</span>
              {(() => {
                const diff = getDifficultyLabel(currentQuestion.difficulty);
                return <span style={{ ...styles.difficultyBadge, backgroundColor: diff.color + "20", color: diff.color }}>{diff.label}</span>;
              })()}
              <span style={styles.cognitiveBadge}>{getCognitiveLabel(currentQuestion.cognitiveLevel)}</span>
              {currentQuestion.isWriting && <span style={styles.writingBadge}>✏️ كتابي</span>}
              {isQuick && <span style={styles.quickBadge}>⚡ سريع</span>}
            </div>

            <h2 style={{ ...styles.questionText, className: "question-text" }}>{currentQuestion.question}</h2>

            {!showFeedback && (
              <>
                {currentQuestion.isWriting ? (
                  <div style={styles.writingContainer}>
                    <textarea
                      style={styles.writingInput}
                      className="writing-input"
                      value={writtenAnswer}
                      onChange={(e) => {
                        setWrittenAnswer(e.target.value);
                        logEvent('change_writing', { length: e.target.value.length });
                      }}
                      onFocus={() => logEvent('focus_writing')}
                      onBlur={() => logEvent('blur_writing')}
                      placeholder="اكتب إجابتك هنا..."
                      rows={4}
                    />
                    <button
                      onClick={handleWritingSubmit}
                      disabled={!writtenAnswer.trim()}
                      style={{ ...styles.submitWritingButton, ...(!writtenAnswer.trim() ? styles.submitWritingDisabled : {}), className: "submit-writing-button" }}
                    >
                      إرسال الإجابة
                    </button>
                  </div>
                ) : (
                  <div style={styles.optionsContainer}>
                    {currentQuestion.options.map((option, idx) => {
                      const optionIndex = idx + 1;
                      const isHovered = hoveredOption === optionIndex;
                      let optionStyle = { ...styles.optionButton };
                      if (isHovered && !showFeedback) {
                        optionStyle = { ...optionStyle, borderColor: COLORS.teal, backgroundColor: "#F0F7F8", transform: "translateX(-4px)" };
                      }
                      if (showFeedback) {
                        optionStyle = { ...optionStyle, cursor: "not-allowed", opacity: 0.6 };
                      }
                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(optionIndex)}
                          onMouseEnter={() => {
                            setHoveredOption(optionIndex);
                            logEvent('hover_option', { optionIndex });
                          }}
                          onMouseLeave={() => {
                            setHoveredOption(null);
                            logEvent('unhover_option', { optionIndex });
                          }}
                          style={optionStyle}
                          className="option-button"
                          disabled={showFeedback}
                        >
                          <span style={styles.optionLetter}>{optionLetters[idx]}</span>
                          <span style={styles.optionText}>{option}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {showFeedback && (
              <div style={{ ...styles.feedbackContainer, ...(lastAnswerCorrect ? styles.feedbackCorrect : styles.feedbackWrong), className: "feedback-container" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flexDirection: "column", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={styles.feedbackIcon}>{lastAnswerCorrect ? "✅" : "❌"}</span>
                    <span style={{ ...styles.feedbackText, ...(lastAnswerCorrect ? styles.feedbackCorrectText : styles.feedbackWrongText) }}>
                      {lastAnswerCorrect ? "إجابة صحيحة! 🎉" : "إجابة خاطئة"}
                    </span>
                  </div>

                  {!lastAnswerCorrect && (
                    <>
                      {currentQuestion.isWriting && (
                        <p style={styles.feedbackCorrectAnswer}>
                          الإجابة المتوقعة: <strong>{currentQuestion.expectedAnswer}</strong>
                        </p>
                      )}
                      {!currentQuestion.isWriting && currentQuestion.options && (
                        <p style={styles.feedbackCorrectAnswer}>
                          الإجابة الصحيحة: <strong>{currentQuestion.options[currentQuestion.correct - 1]}</strong>
                        </p>
                      )}
                      {/* رسالة الخطأ المخصصة */}
                      <div style={{ marginTop: 4 }}>
                        <p style={styles.feedbackExplanation}>
                          <span style={{ fontWeight: 700 }}>💡 سبب الخطأ:</span> {getErrorFeedbackMessage(lastErrorType || 'conceptual', currentQuestion).text}
                        </p>
                        {lastExplanation && (
                          <p style={{ ...styles.feedbackExplanation, color: COLORS.muted, fontSize: 13 }}>
                            {lastExplanation}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {lastAnswerCorrect && (
                    <p style={{ ...styles.feedbackExplanation, color: COLORS.successDark, fontSize: 14 }}>
                      🌟 أحسنت! استمر بهذا الأداء.
                    </p>
                  )}
                </div>
                <button onClick={goToNextOrFinish} style={{ ...styles.nextButton, className: "next-button" }}>
                  {answeredIds.length >= totalQuestionsCount - 1 ? "📊 عرض النتيجة" : "السؤال التالي ←"}
                </button>
              </div>
            )}
          </div>

          {isQuick && (
            <div style={{ backgroundColor: "#FFF8E1", padding: "12px 18px", borderRadius: 12, textAlign: "center", border: "1px solid #FFE082", fontSize: 14, color: "#E65100" }}>
              ⚡ تقييم سريع: {totalQuestionsCount} سؤال فقط. ركز على الإجابات الصحيحة!
            </div>
          )}
        </main>
      </div>
    </>
  );
}
