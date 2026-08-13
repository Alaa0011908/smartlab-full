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
  navy: "#0D1E3B",
  bg: "#f8f9fa",
  white: "#ffffff",
  text: "#0D1E3B",
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
    border: "1px solid " + COLORS.border,
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
  accordionContainer: {
    marginTop: 24,
  },
  accordionItem: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 12,
    boxShadow: "0 2px 12px rgba(13,30,59,0.05)",
    overflow: "hidden",
    border: "1px solid " + COLORS.border,
  },
  accordionHeader: {
    width: "100%",
    padding: "18px 24px",
    backgroundColor: COLORS.white,
    border: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.navy,
    textAlign: "right",
    transition: "background-color 0.2s ease",
  },
  accordionHeaderHover: {
    backgroundColor: COLORS.lightGray,
  },
  accordionHeaderIcon: {
    fontSize: 20,
    marginLeft: 12,
  },
  accordionChevron: {
    fontSize: 18,
    transition: "transform 0.3s ease",
    marginRight: 12,
  },
  accordionChevronOpen: {
    transform: "rotate(180deg)",
  },
  accordionBody: {
    padding: "0 24px 24px 24px",
    borderTop: "1px solid " + COLORS.border,
    marginTop: 0,
    backgroundColor: COLORS.white,
  },
  accordionBodyInner: {
    paddingTop: 20,
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 1.8,
  },
  insightBox: {
    marginTop: 16,
    padding: 16,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    textAlign: "right",
    whiteSpace: "pre-wrap",
  },
  insightText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 1.8,
    margin: 0,
  },
  topicBreakdown: {
    marginTop: 12,
  },
  topicItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid " + COLORS.border,
  },
  topicName: {
    fontSize: 14,
    color: COLORS.text,
    flex: "0 0 120px",
    textAlign: "right",
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
  lessonItem: {
    padding: "8px 0",
    borderBottom: "1px solid " + COLORS.border,
    fontSize: 14,
  },
  courseButton: {
    display: "inline-block",
    backgroundColor: COLORS.orange,
    color: COLORS.white,
    border: "none",
    borderRadius: 12,
    padding: "14px 36px",
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 0.25s ease, transform 0.25s ease",
    margin: "8px 8px",
  },
  scenarioButton: {
    display: "inline-block",
    backgroundColor: COLORS.teal,
    color: COLORS.white,
    border: "none",
    borderRadius: 12,
    padding: "14px 36px",
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 0.25s ease, transform 0.25s ease",
    margin: "8px 8px",
  },
  backLink: {
    display: "inline-block",
    color: COLORS.muted,
    fontSize: 15,
    textDecoration: "none",
    transition: "color 0.25s ease",
    textAlign: "center",
    marginTop: 20,
  },
  errorItem: {
    padding: "6px 0",
    borderBottom: "1px solid " + COLORS.border,
    fontSize: 14,
  },
  badge: {
    display: "inline-block",
    padding: "2px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    marginRight: 8,
  },
  skillItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: "1px solid " + COLORS.border,
    fontSize: 14,
  },
  stageItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "8px 0",
    borderBottom: "1px solid " + COLORS.border,
    fontSize: 14,
  },
  stageIcon: {
    fontSize: 24,
    width: 36,
    textAlign: "center",
  },
  stageStatus: {
    fontSize: 12,
    fontWeight: 600,
    padding: "2px 10px",
    borderRadius: 12,
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 24,
  },
};

// ===== مكون Accordion الداخلي =====
const AccordionSection = ({
  id,
  title,
  icon,
  isOpen,
  onToggle,
  children,
  alwaysOpen = false,
}) => {
  const [hover, setHover] = useState(false);
  return (
    <div style={styles.accordionItem}>
      <button
        style={{
          ...styles.accordionHeader,
          ...(hover ? styles.accordionHeaderHover : {}),
        }}
        onClick={() => !alwaysOpen && onToggle(id)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span style={{ display: "flex", alignItems: "center" }}>
          <span style={styles.accordionHeaderIcon}>{icon}</span>
          {title}
        </span>
        {!alwaysOpen && (
          <span
            style={{
              ...styles.accordionChevron,
              ...(isOpen ? styles.accordionChevronOpen : {}),
            }}
          >
            ▼
          </span>
        )}
      </button>
      {(alwaysOpen || isOpen) && (
        <div style={styles.accordionBody}>
          <div style={styles.accordionBodyInner}>{children}</div>
        </div>
      )}
    </div>
  );
};

function getScenarioLink(score, cognitiveProfile) {
  // تحديد المستوى بناءً على النتيجة وملف التعلم
  let level = 'beginner';
  if (score >= 75) level = 'advanced';
  else if (score >= 50) level = 'intermediate';
  
  // يمكن استخدام cognitiveProfile لتعديل التوجيه حسب نمط التعلم
  if (cognitiveProfile && cognitiveProfile.learningStyle === 'تحليلي متعمق') {
    // للمتعمقين نفضل السيناريو المتوسط أو المتقدم
    if (score >= 60) level = 'advanced';
  }
  
  const map = {
    beginner: '/scenarios/cafe',
    intermediate: '/scenarios/hospital',
    advanced: '/scenarios/office',
  };
  return map[level] || '/scenarios/cafe';
}

export default function Result() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [circleProgress, setCircleProgress] = useState(0);

  const [expandedSections, setExpandedSections] = useState({
    bassema: false,
    thiqa: false,
    mawdooAt: false,
    marahil: false,
    masar: false,
    maharat: false,
    akhta: false,
    noqat: false,
    tashkhis: false,
    sabab: false,
    doroos: false,
  });

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
          <Link href="/assessment" style={{ ...styles.backLink, fontSize: 18, fontWeight: 700, color: COLORS.teal }}>
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
          <Link href="/assessment" style={{ ...styles.backLink, fontSize: 18, fontWeight: 700, color: COLORS.teal }}>
            ابدأ تقييماً جديداً
          </Link>
        </div>
      </div>
    );
  }

  const {
    score,
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    topicAnalysis,
    subSkillAnalysis,
    learningProfile,
    errors,
    weaknesses,
    hiddenStrengths,
    learningStages,
    cognitiveProfile,
    confidenceAnalysis,
    effortAnalysis,
    diagnosticMastery,
    rootCauseAnalysis,
    recommendedLessons,
    insight,
    writingAnswers,
  } = analysis;

  const avgTimePerQuestion = effortAnalysis?.avgTime || 0;
  const totalTime = Math.round(avgTimePerQuestion * totalQuestions);
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circleProgress / 100) * circumference;

  const getCircleColor = (pct) => {
    if (pct >= 70) return COLORS.success;
    if (pct >= 50) return COLORS.warning;
    return COLORS.error;
  };

  // دالة عرض شريط التقدم للموضوعات
  const renderTopicBars = () => {
    if (!topicAnalysis || Object.keys(topicAnalysis).length === 0) {
      return <p style={{ color: COLORS.muted }}>لا توجد بيانات كافية للموضوعات.</p>;
    }
    return (
      <div style={styles.topicBreakdown}>
        {Object.entries(topicAnalysis).map(([topic, data]) => {
          const pct = data.weightedPercentage || data.percentage || 0;
          const color = pct >= 70 ? COLORS.success : pct >= 50 ? COLORS.warning : COLORS.error;
          return (
            <div key={topic} style={styles.topicItem}>
              <span style={styles.topicName}>{topic}</span>
              <div style={styles.topicBar}>
                <div style={{ ...styles.topicFill, width: pct + "%", backgroundColor: color }} />
              </div>
              <span style={styles.topicScore}>{pct}%</span>
            </div>
          );
        })}
      </div>
    );
  };

  // عرض المهارات الفرعية
  const renderSubSkills = () => {
    if (!subSkillAnalysis || Object.keys(subSkillAnalysis).length === 0) {
      return <p style={{ color: COLORS.muted }}>لا توجد بيانات كافية للمهارات الفرعية.</p>;
    }
    return Object.entries(subSkillAnalysis).map(([skill, data]) => {
      const color = data.percentage >= 70 ? COLORS.success : data.percentage >= 50 ? COLORS.warning : COLORS.error;
      return (
        <div key={skill} style={styles.skillItem}>
          <span>{data.skillName || skill}</span>
          <span style={{ fontWeight: 700, color }}>{data.percentage}%</span>
        </div>
      );
    });
  };

  // عرض الأخطاء
  const renderErrors = () => {
    if (!errors || errors.length === 0) {
      return <p style={{ color: COLORS.muted }}>🎉 لا توجد أخطاء! أداء ممتاز.</p>;
    }
    return errors.slice(0, 10).map((err, idx) => (
      <div key={idx} style={styles.errorItem}>
        <strong>{err.topic}</strong> – {err.question.substring(0, 60)}... <br />
        <span style={{ color: COLORS.error }}>❌ إجابتك: {err.yourAnswer}</span>
        <span style={{ color: COLORS.success, marginRight: 12 }}>✅ الصحيح: {err.correctAnswer}</span>
        <span style={{ ...styles.badge, backgroundColor: COLORS.lightGray, color: COLORS.muted }}>
          {err.errorPattern === 'conceptual' ? 'مفهومي' : err.errorPattern === 'calculation' ? 'حسابي' : 'تطبيقي'}
        </span>
      </div>
    ));
  };

  // عرض نقاط القوة
  const renderStrengths = () => {
    const strongTopics = topicAnalysis
      ? Object.entries(topicAnalysis).filter(([_, data]) => (data.weightedPercentage || data.percentage || 0) >= 70)
      : [];
    const hidden = hiddenStrengths || [];

    if (strongTopics.length === 0 && hidden.length === 0) {
      return <p style={{ color: COLORS.muted }}>لا توجد نقاط قوة بارزة حالياً، لكن مع التدريب ستتحسن.</p>;
    }

    return (
      <>
        {strongTopics.map(([topic, data]) => (
          <div key={topic} style={{ padding: "4px 0" }}>
            💪 <strong>{topic}</strong> – {data.weightedPercentage || data.percentage}%
          </div>
        ))}
        {hidden.map((s, idx) => (
          <div key={idx} style={{ padding: "4px 0" }}>
            {s.icon || '🌟'} <strong>{s.title}</strong> – {s.description}
          </div>
        ))}
      </>
    );
  };

  // عرض المسار الأيقوني (مراحل التعلم)
  const renderLearningStages = () => {
    if (!learningStages || learningStages.length === 0) {
      return <p style={{ color: COLORS.muted }}>لا توجد مراحل تعلم متاحة لهذا التقييم.</p>;
    }
    return learningStages.map((stage, idx) => {
      const statusColor = stage.level === 'مكتمل' ? COLORS.success : stage.level === 'جزئياً' ? COLORS.warning : COLORS.border;
      const statusLabel = stage.level === 'مكتمل' ? '✅' : stage.level === 'جزئياً' ? '⚠️' : '⏳';
      return (
        <div key={idx} style={styles.stageItem}>
          <span style={styles.stageIcon}>{stage.icon}</span>
          <span style={{ flex: 1 }}>{stage.concept}</span>
          <span style={{ ...styles.stageStatus, backgroundColor: statusColor + "30", color: statusColor }}>
            {statusLabel} {stage.percentage}%
          </span>
        </div>
      );
    });
  };

  // عرض التشخيص العميق (DINA)
  const renderDiagnostic = () => {
    if (!diagnosticMastery || !diagnosticMastery.skills) {
      return <p style={{ color: COLORS.muted }}>بيانات التشخيص العميق غير متوفرة.</p>;
    }
    return diagnosticMastery.skills.slice(0, 10).map((skill, idx) => (
      <div key={idx} style={styles.skillItem}>
        <span>{skill.name}</span>
        <span style={{ fontWeight: 700, color: skill.masteryProbability >= 70 ? COLORS.success : COLORS.warning }}>
          {skill.masteryProbability}% – {skill.level}
        </span>
      </div>
    ));
  };

  // عرض الأسباب الجذرية
  const renderRootCauses = () => {
    if (!rootCauseAnalysis || rootCauseAnalysis.length === 0) {
      return <p style={{ color: COLORS.muted }}>لم يتم تحديد أسباب جذرية واضحة.</p>;
    }
    return rootCauseAnalysis.map((rc, idx) => (
      <div key={idx} style={{ padding: "8px 0", borderBottom: "1px solid " + COLORS.border }}>
        <strong>{rc.primaryTopic}</strong> – {rc.description}
        <br />
        <span style={{ fontSize: 13, color: COLORS.muted }}>الحل: {rc.solution}</span>
      </div>
    ));
  };

  // عرض الدروس المقترحة
  const renderLessons = () => {
    if (!recommendedLessons || recommendedLessons.length === 0) {
      return <p style={{ color: COLORS.muted }}>لا توجد دروس مقترحة حالياً.</p>;
    }
    return recommendedLessons.map((lesson, idx) => (
      <div key={idx} style={styles.lessonItem}>
        • <strong>{lesson.topic}</strong> ({lesson.percentage}%) – {lesson.reason}
        <br />
        <span style={{ fontSize: 13, color: COLORS.muted }}>💡 {lesson.solution}</span>
      </div>
    ));
  };

  // عرض المراحل الكتابية
  const renderWritingAnswers = () => {
    if (!writingAnswers || writingAnswers.length === 0) {
      return <p style={{ color: COLORS.muted }}>لا توجد إجابات كتابية في هذا التقييم.</p>;
    }
    return writingAnswers.slice(0, 5).map((wa, idx) => (
      <div key={idx} style={{ padding: "6px 0", borderBottom: "1px solid " + COLORS.border }}>
        <div><strong>السؤال:</strong> {wa.question.substring(0, 80)}...</div>
        <div><span style={{ color: COLORS.error }}>إجابتك: {wa.userAnswer || '(فارغة)'}</span></div>
        <div><span style={{ color: COLORS.success }}>الإجابة النموذجية: {wa.expectedAnswer}</span></div>
        <div>{wa.isCorrect ? '✅ صحيحة' : '❌ غير صحيحة'}</div>
      </div>
    ));
  };

  const scenarioLink = getScenarioLink(score, cognitiveProfile);

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
            .result-hero { padding: 32px 20px 36px !important; }
            .result-hero-title { fontSize: 24px !important; }
            .score-circle { width: 140px !important; height: 140px !important; }
            .score-number { fontSize: 32px !important; }
            .topic-name { flex: 0 0 80px !important; font-size: 12px !important; }
          }
          @media (max-width: 480px) {
            .stats-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </Head>

      <div style={styles.page} dir="rtl">
        <Navbar />

        <main style={styles.main}>
          {/* ===== القسم المفتوح دائماً: النتيجة + الرؤية ===== */}
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
                <p style={{ ...styles.statValue, ...styles.statValueWrong }}>{wrongAnswers || 0}</p>
                <p style={styles.statLabel}>❌ الإجابات الخاطئة</p>
              </div>
              <div style={styles.statCard}>
                <p style={{ ...styles.statValue, ...styles.statValueCorrect }}>{correctAnswers || 0}</p>
                <p style={styles.statLabel}>✅ الإجابات الصحيحة</p>
              </div>
            </div>

            {/* رؤية الذكاء الاصطناعي (دائماً مفتوحة) */}
            {insight && (
              <div style={styles.insightBox}>
                <p style={styles.insightText}>💡 {insight}</p>
              </div>
            )}
          </div>

          {/* ===== قائمة الأقسام المطوية (Accordion) ===== */}
          <div style={styles.accordionContainer}>
            {/* 1. البصمة المعرفية */}
            <AccordionSection
              id="bassema"
              title="🧠 البصمة المعرفية"
              icon="🧠"
              isOpen={expandedSections.bassema}
              onToggle={toggleSection}
            >
              {cognitiveProfile ? (
                <>
                  <p><strong>نمط التعلم:</strong> {cognitiveProfile.learningStyle}</p>
                  <p>{cognitiveProfile.styleDescription}</p>
                  <p><strong>مستوى الثقة التقديري:</strong> {cognitiveProfile.confidenceLevel}%</p>
                </>
              ) : (
                <p style={{ color: COLORS.muted }}>لا توجد بيانات كافية عن البصمة المعرفية.</p>
              )}
            </AccordionSection>

            {/* 2. الثقة مقابل المعرفة */}
            <AccordionSection
              id="thiqa"
              title="📊 الثقة مقابل المعرفة"
              icon="📊"
              isOpen={expandedSections.thiqa}
              onToggle={toggleSection}
            >
              {confidenceAnalysis ? (
                <>
                  <p><strong>إجابات واثقة وصحيحة:</strong> {confidenceAnalysis.highConfCorrect}%</p>
                  <p><strong>إجابات واثقة وخاطئة:</strong> {confidenceAnalysis.highConfWrong}%</p>
                  <p><strong>إجابات غير واثقة وصحيحة:</strong> {confidenceAnalysis.lowConfCorrect}%</p>
                  <p><strong>إجابات غير واثقة وخاطئة:</strong> {confidenceAnalysis.lowConfWrong}%</p>
                  <div style={{ ...styles.insightBox, marginTop: 12 }}>
                    <p style={styles.insightText}>💡 {confidenceAnalysis.insight}</p>
                  </div>
                </>
              ) : (
                <p style={{ color: COLORS.muted }}>لا توجد بيانات كافية عن الثقة.</p>
              )}
            </AccordionSection>

            {/* 3. الموضوعات (تفصيل الأداء حسب الموضوع) */}
            <AccordionSection
              id="mawdooAt"
              title="📚 الموضوعات"
              icon="📚"
              isOpen={expandedSections.mawdooAt}
              onToggle={toggleSection}
            >
              {renderTopicBars()}
            </AccordionSection>

            {/* 4. المراحل الكتابية */}
            <AccordionSection
              id="marahil"
              title="✍️ المراحل الكتابية"
              icon="✍️"
              isOpen={expandedSections.marahil}
              onToggle={toggleSection}
            >
              {renderWritingAnswers()}
            </AccordionSection>

            {/* 5. المسار الأيقوني (مراحل التعلم) */}
            <AccordionSection
              id="masar"
              title="🗺️ المسار الأيقوني"
              icon="🗺️"
              isOpen={expandedSections.masar}
              onToggle={toggleSection}
            >
              {renderLearningStages()}
            </AccordionSection>

            {/* 6. المهارات الفرعية */}
            <AccordionSection
              id="maharat"
              title="🔧 المهارات الفرعية"
              icon="🔧"
              isOpen={expandedSections.maharat}
              onToggle={toggleSection}
            >
              {renderSubSkills()}
            </AccordionSection>

            {/* 7. تحليل الأخطاء */}
            <AccordionSection
              id="akhta"
              title="❌ تحليل الأخطاء"
              icon="❌"
              isOpen={expandedSections.akhta}
              onToggle={toggleSection}
            >
              {renderErrors()}
            </AccordionSection>

            {/* 8. نقاط القوة */}
            <AccordionSection
              id="noqat"
              title="💪 نقاط القوة"
              icon="💪"
              isOpen={expandedSections.noqat}
              onToggle={toggleSection}
            >
              {renderStrengths()}
            </AccordionSection>

            {/* 9. التشخيص العميق (DINA) */}
            <AccordionSection
              id="tashkhis"
              title="🔬 التشخيص العميق"
              icon="🔬"
              isOpen={expandedSections.tashkhis}
              onToggle={toggleSection}
            >
              {renderDiagnostic()}
            </AccordionSection>

            {/* 10. السبب الجذري */}
            <AccordionSection
              id="sabab"
              title="🕵️ السبب الجذري"
              icon="🕵️"
              isOpen={expandedSections.sabab}
              onToggle={toggleSection}
            >
              {renderRootCauses()}
            </AccordionSection>

            {/* 11. الدروس المقترحة */}
            <AccordionSection
              id="doroos"
              title="📖 الدروس المقترحة"
              icon="📖"
              isOpen={expandedSections.doroos}
              onToggle={toggleSection}
            >
              {renderLessons()}
            </AccordionSection>
          </div>

          {/* ===== أزرار الإجراءات ===== */}
          <div style={styles.buttonGroup}>
            <Link href="/course" style={styles.courseButton}>
              🚀 ابدأ كورسك المخصص
            </Link>
            <Link href={scenarioLink} style={styles.scenarioButton}>
              🎭 جرّب محاكي العميل
            </Link>
          </div>

          {/* ===== رابط العودة ===== */}
          <div style={{ textAlign: "center" }}>
            <Link href="/assessment" style={styles.backLink}>
              ← العودة إلى التقييمات
            </Link>
          </div>
        </main>

        {/* ===== Footer ===== */}
        <footer style={{ backgroundColor: COLORS.navy, color: COLORS.white, padding: "40px 24px 30px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 30 }}>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>SmartLab</h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", maxWidth: 300 }}>
                منصة تعليمية متطورة لدعم التعلم التكيفي والمحاكاة.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>تواصل معنا</h4>
              <a href="mailto:info@smartlab.com" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>
                info@smartlab.com
              </a>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 30, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            © 2026 SmartLab. جميع الحقوق محفوظة
          </div>
        </footer>
      </div>
    </>
  );
}
