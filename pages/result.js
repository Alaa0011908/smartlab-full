// pages/result.js
import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { getAssessmentName } from "../data/questions/basics";

const COLORS = {
  teal: "#17919e",
  tealDark: "#127a86",
  orange: "#e1682e",
  navy: "#0d3d4e",
  bg: "#eef4f8",
  white: "#ffffff",
  text: "#0d1e3b",
  muted: "#5b6b7b",
  lightGray: "#f8f9fa",
  border: "#e6ecf1",
  success: "#2ECC71",
  warning: "#F39C12",
  error: "#E74C3C",
};

const styles = {
  page: {
    direction: "rtl",
    fontFamily: "'Segoe UI', Tahoma, 'Cairo', system-ui, sans-serif",
    backgroundColor: COLORS.bg,
    color: COLORS.text,
    minHeight: "100vh",
    margin: 0,
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    maxWidth: 900,
    width: "100%",
    margin: "0 auto",
    padding: "50px 24px 80px",
  },
  hero: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: "48px 40px 52px",
    textAlign: "center",
    boxShadow: "0 6px 24px rgba(13,30,59,0.06)",
    marginBottom: 32,
  },
  heroIcon: {
    fontSize: 56,
    marginBottom: 12,
    display: "block",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 800,
    color: COLORS.navy,
    margin: "0 0 8px",
  },
  heroDesc: {
    fontSize: 17,
    color: COLORS.muted,
    lineHeight: 1.8,
    maxWidth: 560,
    margin: "0 auto 32px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 16,
    padding: "20px 16px",
    border: `1px solid ${COLORS.border}`,
    textAlign: "center",
  },
  statValue: {
    fontSize: 32,
    fontWeight: 800,
    color: COLORS.navy,
    margin: "0 0 4px",
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.muted,
    margin: 0,
  },
  statValueCorrect: {
    color: COLORS.success,
  },
  statValueWrong: {
    color: COLORS.error,
  },
  statValueTime: {
    color: COLORS.teal,
  },
  scoreContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 32,
  },
  scoreCircle: {
    position: "relative",
    width: 180,
    height: 180,
  },
  scoreCircleSvg: {
    width: "100%",
    height: "100%",
    transform: "rotate(-90deg)",
  },
  scoreCircleBg: {
    fill: "none",
    stroke: COLORS.border,
    strokeWidth: 12,
  },
  scoreCircleFill: {
    fill: "none",
    strokeWidth: 12,
    strokeLinecap: "round",
    transition: "stroke-dashoffset 1.5s ease",
  },
  scoreText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  scoreNumber: {
    fontSize: 40,
    fontWeight: 800,
    color: COLORS.navy,
    display: "block",
  },
  scoreLabel: {
    fontSize: 14,
    color: COLORS.muted,
    display: "block",
  },
  toggleButton: {
    display: "block",
    width: "100%",
    padding: "16px",
    backgroundColor: COLORS.white,
    border: `2px solid ${COLORS.teal}`,
    borderRadius: 16,
    color: COLORS.teal,
    fontSize: 18,
    fontWeight: 700,
    cursor: "pointer",
    transition: "background-color 0.25s ease, color 0.25s ease, transform 0.25s ease",
    fontFamily: "inherit",
    marginBottom: 32,
  },
  toggleButtonActive: {
    backgroundColor: COLORS.teal,
    color: COLORS.white,
  },
  analysisSection: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: "40px",
    boxShadow: "0 6px 24px rgba(13,30,59,0.06)",
    marginBottom: 32,
    transition: "all 0.3s ease",
  },
  analysisHidden: {
    display: "none",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: COLORS.navy,
    margin: "0 0 6px",
  },
  sectionDesc: {
    fontSize: 16,
    color: COLORS.muted,
    margin: "0 0 24px",
    lineHeight: 1.7,
  },
  analysisGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 20,
  },
  analysisCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 16,
    padding: "20px 24px",
    border: `1px solid ${COLORS.border}`,
  },
  analysisCardIcon: {
    fontSize: 28,
    display: "block",
    marginBottom: 8,
  },
  analysisCardTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.navy,
    margin: "0 0 4px",
  },
  analysisCardDesc: {
    fontSize: 14,
    color: COLORS.muted,
    lineHeight: 1.7,
    margin: 0,
  },
  analysisCardBadge: {
    display: "inline-block",
    padding: "2px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    marginTop: 8,
  },
  insightBox: {
    marginTop: 24,
    padding: 16,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
  },
  insightText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 1.8,
    margin: 0,
  },
  topicBreakdown: {
    marginTop: 24,
  },
  topicItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: `1px solid ${COLORS.border}`,
  },
  topicName: {
    fontSize: 14,
    color: COLORS.text,
  },
  topicBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    margin: "0 12px",
    overflow: "hidden",
  },
  topicFill: {
    height: "100%",
    borderRadius: 4,
    transition: "width 0.5s ease",
  },
  topicScore: {
    fontSize: 14,
    fontWeight: 700,
    color: COLORS.navy,
    minWidth: 40,
    textAlign: "left",
  },
  backLink: {
    display: "inline-block",
    color: COLORS.muted,
    fontSize: 15,
    textDecoration: "none",
    transition: "color 0.25s ease",
    textAlign: "center",
    marginTop: 8,
  },
  footer: {
    backgroundColor: COLORS.navy,
    color: COLORS.white,
    padding: "50px 24px 40px",
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
  footerBrand: { fontSize: 22, fontWeight: 800, margin: "0 0 14px" },
  footerText: { fontSize: 15, lineHeight: 1.9, color: "rgba(255,255,255,0.75)", margin: 0, maxWidth: 320 },
  footerHeading: { fontSize: 18, fontWeight: 700, margin: "0 0 18px" },
  footerIconBtn: {
    width: 42,
    height: 42,
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

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export default function Result() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [circleProgress, setCircleProgress] = useState(0);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const { answers, questions, assessmentId, timePerQuestion, confidenceLevels, mode } = router.query;
        if (!answers || !assessmentId) {
          setError("لا توجد بيانات لعرض النتيجة");
          setLoading(false);
          return;
        }

        const parsedAnswers = JSON.parse(answers);
        const parsedQuestions = JSON.parse(questions || "[]");
        const timeData = JSON.parse(timePerQuestion || "[]");
        const confidenceData = JSON.parse(confidenceLevels || "[]");

        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers: parsedAnswers,
            questions: parsedQuestions,
            assessmentId,
            timePerQuestion: timeData,
            confidenceLevels: confidenceData,
            mode: mode || "full",
          }),
        });

        if (!response.ok) {
          throw new Error("فشل في تحليل النتائج");
        }

        const data = await response.json();
        setAnalysis(data);

        const savedResults = JSON.parse(localStorage.getItem("assessmentResults") || "[]");
        savedResults.push({
          assessmentName: getAssessmentName(assessmentId),
          score: data.score,
          totalQuestions: data.totalQuestions,
          correctAnswers: data.correctAnswers,
          mode: mode || "full",
          date: new Date().toISOString(),
        });
        localStorage.setItem("assessmentResults", JSON.stringify(savedResults));

        setTimeout(() => {
          setCircleProgress(data.score);
        }, 300);

      } catch (err) {
        console.error("Error:", err);
        setError(err.message || "حدث خطأ في تحليل النتيجة");
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      fetchAnalysis();
    }
  }, [router.isReady, router.query]);

  if (loading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={{ textAlign: "center", padding: "100px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
          <h2 style={{ color: COLORS.navy }}>جاري تحليل نتائجك...</h2>
          <p style={{ color: COLORS.muted }}>يرجى الانتظار، هذا قد يستغرق بضع ثوانٍ</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={{ ...styles.main, textAlign: "center", paddingTop: 80 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>❌</div>
          <h2 style={{ color: COLORS.error }}>حدث خطأ</h2>
          <p style={{ color: COLORS.muted }}>{error}</p>
          <Link href="/assessment" style={{ ...styles.toggleButton, display: "inline-block", width: "auto" }}>
            العودة للتقييمات
          </Link>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={{ ...styles.main, textAlign: "center", paddingTop: 80 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>📋</div>
          <h2 style={{ color: COLORS.navy }}>لا توجد نتائج</h2>
          <p style={{ color: COLORS.muted }}>لم يتم العثور على بيانات لهذا التقييم.</p>
          <Link href="/assessment" style={{ ...styles.toggleButton, display: "inline-block", width: "auto" }}>
            ابدأ تقييماً جديداً
          </Link>
        </div>
      </div>
    );
  }

  const totalQuestions = analysis.totalQuestions || 0;
  const correctAnswers = analysis.correctAnswers || 0;
  const wrongAnswers = analysis.wrongAnswers || 0;
  const score = analysis.score || 0;

  const avgTimePerQuestion = analysis.questionResults?.reduce((sum, q) => sum + (q.time || 0), 0) / (analysis.questionResults?.length || 1) || 0;
  const totalTime = Math.round(avgTimePerQuestion * totalQuestions);
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circleProgress / 100) * circumference;

  const getCircleColor = (pct) => {
    if (pct >= 70) return COLORS.success;
    if (pct >= 50) return COLORS.warning;
    return COLORS.error;
  };

  return (
    <>
      <Head>
        <title>نتيجة التقييم - Smart Lab</title>
        <meta name="description" content="نتيجة تقييمك في منصة سمارت لاب مع تحليل مفصل." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @media (max-width: 768px) {
            .stats-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 10px !important; }
            .stat-value { fontSize: 24px !important; }
            .analysis-grid { grid-template-columns: 1fr !important; }
            .result-hero { padding: 32px 20px 36px !important; }
            .result-hero-title { fontSize: 24px !important; }
            .result-section { padding: 24px 16px !important; }
            .score-circle { width: 140px !important; height: 140px !important; }
            .score-number { fontSize: 32px !important; }
          }
          @media (max-width: 480px) {
            .stats-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </Head>

      <div style={styles.page} dir="rtl">
        {/* ===== Navbar ===== */}
        <Navbar />

        <main style={styles.main}>
          <div style={styles.hero} className="result-hero">
            <span style={styles.heroIcon}>🎯</span>
            <h1 style={{ ...styles.heroTitle, className: "result-hero-title" }}>
              انتهى التقييم
            </h1>
            <p style={styles.heroDesc}>
              لقد أعددنا لك تحليلاً مفصلاً لإجاباتك؛ يوضح نقاط قوتك، والجوانب التي تتطلب منك تركيزاً أكبر، بالإضافة إلى خطة تعلم مقترحة لك.
            </p>

            <div style={styles.scoreContainer}>
              <div style={{ ...styles.scoreCircle, className: "score-circle" }}>
                <svg style={styles.scoreCircleSvg} viewBox="0 0 180 180">
                  <circle cx="90" cy="90" r={radius} style={styles.scoreCircleBg} />
                  <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    style={{
                      ...styles.scoreCircleFill,
                      stroke: getCircleColor(circleProgress),
                      strokeDasharray: circumference,
                      strokeDashoffset: offset,
                    }}
                  />
                </svg>
                <div style={styles.scoreText}>
                  <span style={{ ...styles.scoreNumber, className: "score-number" }}>
                    {Math.round(circleProgress)}%
                  </span>
                  <span style={styles.scoreLabel}>النتيجة النهائية</span>
                </div>
              </div>
            </div>

            <div style={styles.statsGrid} className="stats-grid">
              <div style={styles.statCard}>
                <p style={{ ...styles.statValue, ...styles.statValueTime }}>
                  {minutes > 0 ? `${minutes}:${String(seconds).padStart(2, '0')}` : `${seconds}ث`}
                </p>
                <p style={styles.statLabel}>⏱️ الوقت المستغرق</p>
              </div>
              <div style={styles.statCard}>
                <p style={{ ...styles.statValue, ...styles.statValueWrong }}>{wrongAnswers}</p>
                <p style={styles.statLabel}>❌ الإجابات الخاطئة</p>
              </div>
              <div style={styles.statCard}>
                <p style={{ ...styles.statValue, ...styles.statValueCorrect }}>{correctAnswers}</p>
                <p style={styles.statLabel}>✅ الإجابات الصحيحة</p>
              </div>
            </div>
          </div>

          <button
            onClick={toggleDetails}
            style={{
              ...styles.toggleButton,
              ...(showDetails ? styles.toggleButtonActive : {}),
            }}
            onMouseEnter={(e) => {
              if (!showDetails) {
                e.currentTarget.style.backgroundColor = COLORS.teal;
                e.currentTarget.style.color = COLORS.white;
              }
            }}
            onMouseLeave={(e) => {
              if (!showDetails) {
                e.currentTarget.style.backgroundColor = COLORS.white;
                e.currentTarget.style.color = COLORS.teal;
              }
            }}
          >
            {showDetails ? "🔽 إخفاء تحليل نتيجتك بالكامل" : "🔍 تحليل نتيجتك بالكامل"}
          </button>

          <div
            style={{
              ...styles.analysisSection,
              ...(!showDetails ? styles.analysisHidden : {}),
            }}
            className="result-section"
          >
            <h2 style={styles.sectionTitle}>📊 تحليل نتيجتك بالكامل</h2>
            <p style={styles.sectionDesc}>
              التحليل يظهر نقاط قوتك ومجالات التحسين مع توصيات تعلم مخصصة.
            </p>

            <div style={styles.analysisGrid} className="analysis-grid">
              <div style={styles.analysisCard}>
                <span style={styles.analysisCardIcon}>💪</span>
                <h3 style={styles.analysisCardTitle}>نقاط القوة</h3>
                <p style={styles.analysisCardDesc}>
                  {analysis.topicAnalysis
                    ? Object.entries(analysis.topicAnalysis)
                        .filter(([_, data]) => (data.weightedPercentage || data.percentage) >= 70)
                        .map(([topic]) => topic)
                        .join("، ") || "تمتلك أساساً جيداً في معظم المجالات."
                    : "تمتلك أساساً جيداً في معظم المجالات."}
                </p>
                <span style={{ ...styles.analysisCardBadge, backgroundColor: `${COLORS.success}20`, color: COLORS.success }}>
                  ✅ أداء جيد
                </span>
              </div>

              <div style={styles.analysisCard}>
                <span style={styles.analysisCardIcon}>📈</span>
                <h3 style={styles.analysisCardTitle}>مجالات التحسين</h3>
                <p style={styles.analysisCardDesc}>
                  {analysis.topicAnalysis
                    ? Object.entries(analysis.topicAnalysis)
                        .filter(([_, data]) => (data.weightedPercentage || data.percentage) < 50)
                        .map(([topic]) => topic)
                        .join("، ") || "أداؤك متوازن، استمر في التدريب!"
                    : "أداؤك متوازن، استمر في التدريب!"}
                </p>
                <span style={{ ...styles.analysisCardBadge, backgroundColor: `${COLORS.warning}20`, color: COLORS.warning }}>
                  ⚠️ يحتاج تركيز
                </span>
              </div>
            </div>

            {analysis.topicAnalysis && (
              <div style={styles.topicBreakdown}>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 12 }}>
                  📊 أداؤك حسب الموضوع
                </h4>
                {Object.entries(analysis.topicAnalysis).map(([topic, data]) => {
                  const pct = data.weightedPercentage || data.percentage || 0;
                  const color = pct >= 70 ? COLORS.success : pct >= 50 ? COLORS.warning : COLORS.error;
                  return (
                    <div key={topic} style={styles.topicItem}>
                      <span style={styles.topicName}>{topic}</span>
                      <div style={styles.topicBar}>
                        <div style={{ ...styles.topicFill, width: `${pct}%`, backgroundColor: color }} />
                      </div>
                      <span style={styles.topicScore}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            )}

            {analysis.insight && (
              <div style={styles.insightBox}>
                <p style={styles.insightText}>💡 {analysis.insight}</p>
              </div>
            )}

            {analysis.recommendedLessons && analysis.recommendedLessons.length > 0 && (
              <div style={{ marginTop: 24 }}>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 12 }}>
                  📚 دروس مقترحة
                </h4>
                {analysis.recommendedLessons.slice(0, 3).map((lesson, idx) => (
                  <div key={idx} style={{ padding: "8px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                    <span style={{ fontSize: 14, color: COLORS.text }}>• {lesson.topic}: {lesson.reason}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/assessment" style={styles.backLink}>
              ← العودة إلى التقييمات
            </Link>
          </div>
        </main>

        <footer style={styles.footer}>
          <div style={styles.footerInner}>
            <div style={styles.footerCol}>
              <h3 style={styles.footerBrand}>SmartLab</h3>
              <p style={styles.footerText}>
                منصة تعليمية متطورة لدعم التعلم التكيفي والمحاكاة.
              </p>
            </div>
            <div style={styles.footerCol}>
              <h4 style={styles.footerHeading}>تواصل معنا</h4>
              <button
                style={styles.footerIconBtn}
                aria-label="راسلنا عبر البريد الإلكتروني"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <MailIcon />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
