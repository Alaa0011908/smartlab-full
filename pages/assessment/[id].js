// pages/assessment/[id].js - صفحة الأسئلة مع شريط النتائج على شكل بطاقات
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { getAssessmentQuestions, getAssessmentName } from '../../data/questions/basics';

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
  // ===== HEADER =====
  header: {
    backgroundColor: COLORS.white,
    borderBottom: "1px solid #e6ecf1",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  headerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "12px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  logoWrap: { display: "flex", alignItems: "center", gap: 8 },
  logoText: { display: "flex", flexDirection: "column", lineHeight: 1, alignItems: "center" },
  logoSmart: { fontSize: 15, fontWeight: 800, color: COLORS.teal },
  logoLab: { fontSize: 13, fontWeight: 700, color: COLORS.orange },
  nav: { display: "flex", alignItems: "center", gap: 26 },
  navLink: {
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.text,
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.25s ease",
    paddingBottom: 4,
  },
  navLinkActive: { color: COLORS.teal, borderBottom: "2px solid " + COLORS.teal },
  headerRight: { display: "flex", alignItems: "center", gap: 16 },
  themeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: COLORS.text,
    display: "flex",
    alignItems: "center",
    transition: "transform 0.25s ease",
  },
  loginBtn: {
    backgroundColor: COLORS.teal,
    color: COLORS.white,
    border: "none",
    borderRadius: 8,
    padding: "8px 20px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    transition: "background-color 0.25s ease",
    textDecoration: "none",
    display: "inline-block",
  },

  // ===== TOP STATS BAR (بطاقات) =====
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
  statIcon: {
    fontSize: 24,
  },
  statInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: 800,
  },
  statValueScore: {
    color: COLORS.teal,
  },
  statValueCorrect: {
    color: COLORS.success,
  },
  statValueWrong: {
    color: COLORS.error,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.muted,
    fontWeight: 500,
  },

  // ===== PROGRESS BAR =====
  progressContainer: {
    padding: "0 24px",
    backgroundColor: COLORS.white,
    paddingBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e6ecf1",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.teal,
    borderRadius: 4,
    transition: "width 0.5s ease",
  },

  // ===== MAIN =====
  main: {
    flex: 1,
    maxWidth: 820,
    width: "100%",
    margin: "0 auto",
    padding: "32px 24px 60px",
  },

  // ===== QUESTION CARD =====
  questionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: "32px 36px 36px",
    boxShadow: "0 6px 24px rgba(13,30,59,0.06)",
    marginBottom: 24,
  },
  questionMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  topicBadge: {
    display: "inline-block",
    backgroundColor: COLORS.navy,
    color: COLORS.white,
    padding: "4px 14px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  },
  difficultyBadge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  },
  cognitiveBadge: {
    display: "inline-block",
    backgroundColor: "#E3F2FD",
    color: "#0D47A1",
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  },
  writingBadge: {
    display: "inline-block",
    backgroundColor: "#FFF3E0",
    color: "#E65100",
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 700,
    color: COLORS.text,
    lineHeight: 1.8,
    marginBottom: 28,
    textAlign: "right",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
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
  },
  optionLetter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    fontWeight: 700,
    fontSize: 14,
    color: COLORS.navy,
    flexShrink: 0,
  },
  optionText: { flex: 1 },

  // ===== FEEDBACK =====
  feedbackContainer: {
    marginTop: 20,
    padding: "16px 20px",
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
  },
  feedbackCorrect: {
    backgroundColor: "#E8F5E9",
    border: "1px solid " + COLORS.success,
  },
  feedbackWrong: {
    backgroundColor: "#FFEBEE",
    border: "1px solid " + COLORS.error,
  },
  feedbackIcon: { fontSize: 24 },
  feedbackText: { fontSize: 16, fontWeight: 600 },
  feedbackCorrectText: { color: COLORS.successDark },
  feedbackWrongText: { color: COLORS.errorDark },
  feedbackCorrectAnswer: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: 500,
  },
  nextButton: {
    padding: "10px 28px",
    backgroundColor: COLORS.teal,
    color: COLORS.white,
    border: "none",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    transition: "background-color 0.25s ease, transform 0.25s ease",
    fontFamily: "inherit",
  },

  // ===== CONFIDENCE =====
  confidenceContainer: {
    marginTop: 20,
    padding: "20px 24px",
    backgroundColor: "#F8F9FA",
    borderRadius: 14,
    border: "2px dashed " + COLORS.teal,
    textAlign: "center",
  },
  confidenceQuestion: {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 16,
  },
  confidenceButtons: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  confidenceButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "12px 20px",
    borderRadius: 12,
    border: "2px solid #e6ecf1",
    backgroundColor: COLORS.white,
    cursor: "pointer",
    transition: "all 0.25s ease",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 600,
    minWidth: 100,
    color: COLORS.text,
  },
  confidenceIcon: { fontSize: 20, marginBottom: 4 },
  confidenceHint: { fontSize: 12, color: COLORS.muted, marginTop: 12 },

  // ===== WRITING =====
  writingContainer: { marginTop: 8 },
  writingInput: {
    width: "100%",
    padding: "14px 18px",
    borderRadius: 14,
    border: "2px solid #e6ecf1",
    fontSize: 16,
    fontFamily: "inherit",
    resize: "vertical",
    minHeight: 120,
    backgroundColor: COLORS.white,
    transition: "border-color 0.25s ease",
    textAlign: "right",
    outline: "none",
  },
  submitWritingButton: {
    marginTop: 12,
    padding: "12px 32px",
    backgroundColor: COLORS.teal,
    color: COLORS.white,
    border: "none",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    transition: "background-color 0.25s ease",
    fontFamily: "inherit",
  },
  submitWritingDisabled: { opacity: 0.5, cursor: "not-allowed" },

  // ===== LOADING / ERROR =====
  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    backgroundColor: COLORS.bg,
  },
  spinner: {
    width: 48,
    height: 48,
    border: "4px solid #e6ecf1",
    borderTop: "4px solid " + COLORS.teal,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  errorBox: {
    backgroundColor: "#FFEBEE",
    padding: "2rem",
    borderRadius: 16,
    textAlign: "center",
    border: "1px solid #FFCDD2",
    maxWidth: 500,
    margin: "auto",
  },

  // ===== FOOTER =====
  footer: {
    backgroundColor: COLORS.navy,
    color: COLORS.white,
    padding: "40px 24px 32px",
    marginTop: "auto",
  },
  footerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    gap: 40,
    flexWrap: "wrap",
  },
  footerCol: { flex: "1 1 260px" },
  footerBrand: { fontSize: 20, fontWeight: 800, margin: "0 0 12px" },
  footerText: { fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", margin: 0, maxWidth: 320 },
  footerHeading: { fontSize: 16, fontWeight: 700, margin: "0 0 14px" },
  footerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.3)",
    backgroundColor: "transparent",
    color: COLORS.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background-color 0.25s ease",
  },
};

// ===== ICONS =====
function LogoMark() {
  return (
    <svg width="40" height="40" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M30 8c-4 0-11 3-14 8-3-3-8-4-12-3-6 2-9 8-7 14-5 2-7 7-5 12 2 5 6 7 11 7 2 5 6 8 11 8 6 0 11-3 13-8 6 2 12-1 14-7 2-5 0-10-3-13 3-5 3-11-2-15-3-6-8-8-14-3z"
        fill={COLORS.teal}
        opacity="0.9"
      />
      <path d="M18 22c1-3 4-5 7-5" stroke={COLORS.orange} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="30" cy="16" r="2.4" fill={COLORS.orange} />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.9" y1="4.9" x2="6.3" y2="6.3" />
      <line x1="17.7" y1="17.7" x2="19.1" y2="19.1" />
      <line x1="4.9" y1="19.1" x2="6.3" y2="17.7" />
      <line x1="17.7" y1="6.3" x2="19.1" y2="4.9" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

// ===== MAIN COMPONENT =====
export default function Assessment() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);
  const [showConfidence, setShowConfidence] = useState(false);
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [timePerQuestion, setTimePerQuestion] = useState([]);
  const [confidenceLevels, setConfidenceLevels] = useState([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [hoveredOption, setHoveredOption] = useState(null);
  const [hoveredConfidence, setHoveredConfidence] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // ===== إحصائيات الأسئلة =====
  const correctCount = answers.filter(a => a === true || a === 1).length;
  const wrongCount = answers.filter(a => a === false || a === 0).length;
  const answeredCount = answers.length;
  const totalQuestions = questions.length;
  const score = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

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
      const assessmentQuestions = getAssessmentQuestions(id);
      if (!assessmentQuestions || assessmentQuestions.length === 0) {
        setError("لا توجد أسئلة لهذا التقييم");
        setLoading(false);
        return;
      }
      const shuffled = [...assessmentQuestions].sort(() => Math.random() - 0.5);
      const limit = mode === "quick" ? 15 : 0;
      const limitedQuestions = limit > 0 ? shuffled.slice(0, limit) : shuffled;
      setQuestions(limitedQuestions);
      setQuestionStartTime(Date.now());
      setLoading(false);
    } catch (err) {
      console.error("Error loading assessment:", err);
      setError("حدث خطأ في تحميل التقييم: " + (err.message || ""));
      setLoading(false);
    }
  }, [isReady, router.query]);

  const handleOptionSelect = (optionIndex) => {
    if (showFeedback || showConfidence || loading) return;
    setSelectedOption(optionIndex);
    const timeTaken = (Date.now() - questionStartTime) / 1000;
    setTimePerQuestion((prev) => [...prev, timeTaken]);
    const currentQuestion = questions[currentIndex];
    const isCorrect = optionIndex === currentQuestion.correct;
    setLastAnswerCorrect(isCorrect);
    setAnswers((prev) => [...prev, isCorrect]);
    setShowConfidence(true);
  };

  const handleWritingSubmit = () => {
    if (!writtenAnswer.trim() || showFeedback || showConfidence || loading) return;
    const timeTaken = (Date.now() - questionStartTime) / 1000;
    setTimePerQuestion((prev) => [...prev, timeTaken]);
    const currentQuestion = questions[currentIndex];
    const userAnswer = writtenAnswer.trim().toLowerCase();
    const expected = currentQuestion.expectedAnswer?.toLowerCase() || "";
    const isCorrect = userAnswer === expected;
    setLastAnswerCorrect(isCorrect);
    setAnswers((prev) => [...prev, isCorrect]);
    setShowConfidence(true);
  };

  const handleConfidence = (level) => {
    setConfidenceLevels((prev) => [...prev, level]);
    setShowConfidence(false);
    setShowFeedback(true);
  };

  const goToNextOrFinish = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    setWrittenAnswer("");
    setQuestionStartTime(Date.now());
    setLastAnswerCorrect(null);

    if (currentIndex + 1 >= questions.length) {
      router.push({
        pathname: "/result",
        query: {
          answers: JSON.stringify(answers),
          questions: JSON.stringify(questions),
          assessmentId: router.query.id,
          total: questions.length,
          mode: router.query.mode || "full",
          timePerQuestion: JSON.stringify(timePerQuestion),
          confidenceLevels: JSON.stringify(confidenceLevels),
        },
      });
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  // ===== RENDER =====
  if (!isReady || loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner} />
        <p style={{ color: COLORS.muted, fontSize: 16 }}>
          {!isReady ? "جاري تجهيز التقييم..." : "جاري تحميل التقييم..."}
        </p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !questions.length) {
    return (
      <div style={styles.container}>
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

  if (currentIndex >= questions.length) {
    return (
      <div style={styles.container}>
        <div style={{ ...styles.main, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <div style={styles.errorBox}>
            <h3 style={{ color: COLORS.success, marginBottom: 8 }}>🎉 انتهى التقييم!</h3>
            <p style={{ color: COLORS.muted, marginBottom: 16 }}>لقد أتممت جميع الأسئلة. جارٍ التوجيه إلى صفحة النتيجة...</p>
            <Link href="/result" style={{ ...styles.nextButton, display: "inline-block", textDecoration: "none" }}>
              📊 عرض النتيجة
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const assessmentName = getAssessmentName ? getAssessmentName(router.query.id) : router.query.id;
  const isQuick = router.query.mode === "quick";
  const progress = totalQuestions > 0 ? ((currentIndex) / totalQuestions) * 100 : 0;

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

  const confidenceOptions = [
    { level: 25, label: "غير متأكد", icon: "🤔", color: COLORS.warning },
    { level: 50, label: "متأكد إلى حد ما", icon: "📖", color: COLORS.teal },
    { level: 90, label: "متأكد تماماً", icon: "💪", color: COLORS.success },
  ];

  const optionLetters = ["أ", "ب", "ج", "د"];

  const navItems = [
    { label: "الرئيسية", active: false, href: "/" },
    { label: "محاكي العميل", active: false, href: "/scenarios" },
    { label: "التقييم التكيفي", active: true, href: "/assessment/categories" },
    { label: "لوحة التشخيص", active: false, href: "/dashboard" },
  ];

  return (
    <>
      <Head>
        <title>{assessmentName || "تقييم"} - Smart Lab</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          html, body { margin: 0; padding: 0; background-color: ${COLORS.bg}; }
          * { box-sizing: border-box; }
          @media (max-width: 900px) {
            .main-nav { display: none !important; }
          }
          @media (max-width: 768px) {
            .question-card { padding: 20px 16px 24px !important; }
            .question-text { font-size: 17px !important; }
            .option-button { padding: 14px 16px !important; font-size: 14px !important; }
            .stats-bar { gap: 12px !important; padding: 12px 16px !important; }
            .stat-card { padding: 10px 16px !important; min-width: 100px !important; gap: 8px !important; }
            .stat-value { font-size: 20px !important; }
            .stat-icon { font-size: 20px !important; }
            .stat-label { font-size: 11px !important; }
          }
          @media (max-width: 480px) {
            .stats-bar { gap: 8px !important; }
            .stat-card { padding: 8px 12px !important; min-width: 80px !important; gap: 6px !important; flex-direction: column !important; }
            .stat-value { font-size: 18px !important; }
            .stat-icon { font-size: 18px !important; }
            .stat-label { font-size: 10px !important; }
          }
        `}</style>
      </Head>

      <div style={styles.container} dir="rtl">
        {/* ===== HEADER ===== */}
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <div style={styles.logoWrap}>
              <LogoMark />
              <span style={styles.logoText}>
                <span style={styles.logoSmart}>Smart</span>
                <span style={styles.logoLab}>Lab</span>
              </span>
            </div>
            <nav style={styles.nav} className="main-nav">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} style={{ ...styles.navLink, ...(item.active ? styles.navLinkActive : {}) }}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div style={styles.headerRight}>
              <Link href="/auth/login" style={styles.loginBtn}>تسجيل الدخول</Link>
            </div>
          </div>
        </header>

        {/* ===== TOP STATS BAR (بطاقات) ===== */}
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
        </div>

        {/* ===== PROGRESS BAR ===== */}
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
        </div>

        {/* ===== MAIN ===== */}
        <main style={styles.main}>
          <div style={styles.questionCard} className="question-card">
            {/* Badges */}
            <div style={styles.questionMeta}>
              <span style={styles.topicBadge}>{currentQuestion.topic || "عام"}</span>
              {(() => {
                const diff = getDifficultyLabel(currentQuestion.difficulty);
                return <span style={{ ...styles.difficultyBadge, backgroundColor: diff.color + "20", color: diff.color }}>{diff.label}</span>;
              })()}
              <span style={styles.cognitiveBadge}>{getCognitiveLabel(currentQuestion.cognitiveLevel)}</span>
              {currentQuestion.isWriting && <span style={styles.writingBadge}>✏️ كتابي</span>}
            </div>

            {/* Question */}
            <h2 style={{ ...styles.questionText, className: "question-text" }}>{currentQuestion.question}</h2>

            {/* Options or Writing */}
            {!showFeedback && !showConfidence && (
              <>
                {currentQuestion.isWriting ? (
                  <div style={styles.writingContainer}>
                    <textarea
                      style={styles.writingInput}
                      value={writtenAnswer}
                      onChange={(e) => setWrittenAnswer(e.target.value)}
                      placeholder="اكتب إجابتك هنا..."
                      rows={4}
                    />
                    <button
                      onClick={handleWritingSubmit}
                      disabled={!writtenAnswer.trim()}
                      style={{ ...styles.submitWritingButton, ...(!writtenAnswer.trim() ? styles.submitWritingDisabled : {}) }}
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
                      if (isHovered && !showFeedback && !showConfidence) {
                        optionStyle = { ...optionStyle, borderColor: COLORS.teal, backgroundColor: "#F0F7F8", transform: "translateX(-4px)" };
                      }
                      if (showFeedback || showConfidence) {
                        optionStyle = { ...optionStyle, cursor: "not-allowed", opacity: 0.6 };
                      }
                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(optionIndex)}
                          onMouseEnter={() => setHoveredOption(optionIndex)}
                          onMouseLeave={() => setHoveredOption(null)}
                          style={optionStyle}
                          className="option-button"
                          disabled={showFeedback || showConfidence}
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

            {/* Confidence */}
            {showConfidence && (
              <div style={styles.confidenceContainer}>
                <p style={styles.confidenceQuestion}>ما مدى ثقتك في إجابتك؟</p>
                <div style={{ ...styles.confidenceButtons, className: "confidence-buttons" }}>
                  {confidenceOptions.map((opt) => (
                    <button
                      key={opt.level}
                      onClick={() => handleConfidence(opt.level)}
                      onMouseEnter={() => setHoveredConfidence(opt.level)}
                      onMouseLeave={() => setHoveredConfidence(null)}
                      style={{
                        ...styles.confidenceButton,
                        borderColor: hoveredConfidence === opt.level ? opt.color : "#e6ecf1",
                        ...(hoveredConfidence === opt.level ? { backgroundColor: "#F0F7F8", transform: "translateY(-2px)" } : {}),
                      }}
                      className="confidence-button"
                    >
                      <span style={styles.confidenceIcon}>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
                <p style={styles.confidenceHint}>هذا يساعدنا في تحليل أخطائك بدقة أكبر</p>
              </div>
            )}

            {/* Feedback */}
            {showFeedback && (
              <div style={{ ...styles.feedbackContainer, ...(lastAnswerCorrect ? styles.feedbackCorrect : styles.feedbackWrong) }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={styles.feedbackIcon}>{lastAnswerCorrect ? "✅" : "❌"}</span>
                  <div>
                    <span style={{ ...styles.feedbackText, ...(lastAnswerCorrect ? styles.feedbackCorrectText : styles.feedbackWrongText) }}>
                      {lastAnswerCorrect ? "إجابة صحيحة!" : "إجابة خاطئة"}
                    </span>
                    {!lastAnswerCorrect && currentQuestion.isWriting && (
                      <p style={styles.feedbackCorrectAnswer}>الإجابة المتوقعة: <strong>{currentQuestion.expectedAnswer}</strong></p>
                    )}
                  </div>
                </div>
                <button onClick={goToNextOrFinish} style={styles.nextButton}>
                  {currentIndex + 1 >= totalQuestions ? "📊 عرض النتيجة" : "السؤال التالي ←"}
                </button>
              </div>
            )}
          </div>

          {isQuick && (
            <div style={{ backgroundColor: "#FFF8E1", padding: "12px 18px", borderRadius: 12, textAlign: "center", border: "1px solid #FFE082", fontSize: 14, color: "#E65100" }}>
              ⚡ تقييم سريع: {totalQuestions} سؤال فقط. ركز على الإجابات الصحيحة!
            </div>
          )}
        </main>

        {/* ===== FOOTER ===== */}
        <footer style={styles.footer}>
          <div style={styles.footerInner}>
            <div style={styles.footerCol}>
              <h3 style={styles.footerBrand}>SmartLab</h3>
              <p style={styles.footerText}>منصة تعليمية متطورة لدعم التعلم التكيفي والمحاكاة.</p>
            </div>
            <div style={styles.footerCol}>
              <h4 style={styles.footerHeading}>تواصل معنا</h4>
              <button style={styles.footerIconBtn} aria-label="راسلنا عبر البريد الإلكتروني"><MailIcon /></button>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
