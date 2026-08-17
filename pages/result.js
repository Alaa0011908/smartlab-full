// pages/result.js - النسخة النهائية (Surgical Result Page)
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
  gold: "#FFD700",
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
    padding: "40px 20px 60px",
  },

  // ===== البطاقة الرئيسية =====
  heroCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: "40px 30px",
    textAlign: "center",
    boxShadow: "0 6px 24px rgba(13,30,59,0.06)",
    marginBottom: 24,
  },
  scoreCircle: { position: "relative", width: 160, height: 160, margin: "0 auto 20px" },
  scoreCircleSvg: { width: "100%", height: "100%", transform: "rotate(-90deg)" },
  scoreCircleBg: { fill: "none", stroke: COLORS.border, strokeWidth: 12 },
  scoreCircleFill: { fill: "none", strokeWidth: 12, strokeLinecap: "round", transition: "stroke-dashoffset 1.5s ease" },
  scoreText: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" },
  scoreNumber: { fontSize: 40, fontWeight: 800, color: COLORS.navy, display: "block" },
  scoreLabel: { fontSize: 13, color: COLORS.muted, display: "block" },

  // ===== الملخص الجراحي =====
  surgicalCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: '24px',
    border: '2px solid #FFE082',
    marginBottom: 20,
    textAlign: 'right',
  },
  surgicalTitle: { fontSize: 18, fontWeight: 800, color: '#E65100', margin: '0 0 12px' },
  surgicalRow: { display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8, fontSize: 15 },
  surgicalIcon: { flexShrink: 0, fontSize: 18 },
  surgicalText: { lineHeight: 1.7 },

  // ===== الخطة العملية =====
  planCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: '24px',
    border: '2px solid #A5D6A7',
    marginBottom: 20,
    textAlign: 'right',
  },
  planTitle: { fontSize: 18, fontWeight: 800, color: '#2E7D32', margin: '0 0 12px' },
  planSection: { fontSize: 15, fontWeight: 700, color: '#1B5E20', margin: '10px 0 6px' },
  planItem: { fontSize: 14, color: '#333', lineHeight: 1.8, marginBottom: 4, paddingRight: 16 },

  // ===== التنبؤ المهني =====
  careerCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    padding: '24px',
    border: '2px solid #90CAF9',
    marginBottom: 20,
    textAlign: 'right',
  },
  careerTitle: { fontSize: 18, fontWeight: 800, color: '#0D47A1', margin: '0 0 12px' },
  careerRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 15 },
  careerMatch: { fontWeight: 800, color: COLORS.teal },

  // ===== أكورديون =====
  accordionItem: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 8,
    boxShadow: "0 2px 8px rgba(13,30,59,0.04)",
    border: "1px solid " + COLORS.border,
    overflow: "hidden",
  },
  accordionHeader: {
    width: "100%",
    padding: "14px 18px",
    backgroundColor: COLORS.white,
    border: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 700,
    color: COLORS.navy,
    textAlign: "right",
  },
  accordionChevron: { fontSize: 14, transition: "transform 0.3s ease" },
  accordionChevronOpen: { transform: "rotate(180deg)" },
  accordionBody: { padding: "0 18px 16px", borderTop: "1px solid " + COLORS.border },
  accordionBodyInner: { paddingTop: 14, fontSize: 14, color: COLORS.text, lineHeight: 1.8 },

  // ===== أزرار =====
  buttonGroup: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10, marginTop: 24 },
  courseButton: {
    display: "inline-block",
    backgroundColor: COLORS.orange,
    color: COLORS.white,
    border: "none",
    borderRadius: 12,
    padding: "14px 28px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
    minWidth: 160,
  },
  scenarioButton: {
    display: "inline-block",
    backgroundColor: COLORS.teal,
    color: COLORS.white,
    border: "none",
    borderRadius: 12,
    padding: "14px 28px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
    minWidth: 160,
  },

  // ===== عناصر إضافية =====
  skillItem: { display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid ' + COLORS.border, fontSize: 13 },
  errorItem: { padding: '6px 0', borderBottom: '1px solid ' + COLORS.border, fontSize: 13 },
  videoLink: {
    display: 'inline-block',
    backgroundColor: '#FF0000',
    color: 'white',
    padding: '8px 16px',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 700,
    marginTop: 8,
    fontSize: 13,
  },
};

// ============================================================
// 🧩 مكون الأكورديون
// ============================================================
const AccordionSection = ({ id, title, icon, isOpen, onToggle, children }) => (
  <div style={styles.accordionItem}>
    <button style={styles.accordionHeader} onClick={() => onToggle(id)}>
      <span>{icon} {title}</span>
      <span style={{ ...styles.accordionChevron, ...(isOpen ? styles.accordionChevronOpen : {}) }}>▼</span>
    </button>
    {isOpen && (
      <div style={styles.accordionBody}>
        <div style={styles.accordionBodyInner}>{children}</div>
      </div>
    )}
  </div>
);

// ============================================================
// 🎯 المكون الرئيسي
// ============================================================
export default function Result() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [circleProgress, setCircleProgress] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const { answers, questions, assessmentId, timePerQuestion, confidenceLevels, mode, quickResult } = router.query;
        
        if (!answers || !assessmentId) {
          setError("لا توجد بيانات لعرض النتيجة");
          setLoading(false);
          return;
        }

        // ===== التقييم السريع: استخدام quickResult مباشرة =====
        if (quickResult) {
          const quickData = JSON.parse(quickResult);
          setAnalysis({
            isQuick: true,
            score: quickData.score,
            totalQuestions: quickData.total,
            correctAnswers: quickData.correct,
            wrongAnswers: quickData.wrong,
            surgicalSummary: {
              score: quickData.score,
              topPriority: quickData.score < 70 ? 'تحتاج مراجعة' : '🎉 ممتاز!',
              rootCause: quickData.score < 70 ? 'أكمل التقييم الشامل لتحليل أدق' : 'لا توجد ثغرات حرجة',
              impact: '',
              treatmentTime: 0,
              confidenceLevel: '',
            },
            actionablePlan: {
              priority: quickData.score < 70 ? 'تحتاج مراجعة' : '🎉 ممتاز!',
              priorityLevel: quickData.score >= 80 ? 'ممتاز' : quickData.score >= 60 ? 'جيد' : 'يحتاج تحسين',
              rootCause: 'أكمل التقييم الشامل لتحليل أدق',
              solution: '',
              videoLink: '',
              timeRequired: 0,
              today: [],
              thisWeek: [],
              hasWeakness: quickData.score < 70,
            },
            careerFit: null,
            insight: quickData.score >= 80
              ? '🎉 أداء ممتاز! أنت على الطريق الصحيح.'
              : quickData.score >= 60
              ? '📈 أداء جيد. هناك مجال للتحسين.'
              : '📚 تحتاج إلى مراجعة الأساسيات.',
          });
          setTimeout(() => setCircleProgress(quickData.score), 300);
          setLoading(false);
          return;
        }

        // ===== التقييم الشامل: استدعاء API =====
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

        if (!response.ok) throw new Error("فشل في تحليل النتائج");

        const data = await response.json();
        setAnalysis({ ...data, isQuick: mode === 'quick' });

        // حفظ للوحة التشخيص
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

        setTimeout(() => setCircleProgress(data.score), 300);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message || "حدث خطأ في تحليل النتيجة");
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) fetchAnalysis();
  }, [router.isReady, router.query]);

  // ============================================================
  // ⏳ حالات التحميل والخطأ
  // ============================================================
  if (loading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={{ textAlign: "center", padding: "100px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
          <h2 style={{ color: COLORS.navy }}>جاري تحليل نتائجك...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={{ ...styles.main, textAlign: "center", paddingTop: 60 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>❌</div>
          <h2 style={{ color: COLORS.error }}>حدث خطأ</h2>
          <p style={{ color: COLORS.muted }}>{error}</p>
          <Link href="/assessment/categories" style={{ color: COLORS.teal, fontWeight: 700 }}>
            العودة للتقييمات
          </Link>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  const {
    score, totalQuestions, correctAnswers, wrongAnswers,
    surgicalSummary, actionablePlan, careerFit, insight,
    cognitiveProfile, confidenceAnalysis, masteryResults,
    errors, weakSkills, strongSkills, isQuick,
  } = analysis;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circleProgress / 100) * circumference;

  const getCircleColor = (pct) => {
    if (pct >= 70) return COLORS.success;
    if (pct >= 50) return COLORS.warning;
    return COLORS.error;
  };

  const getLevelText = (pct) => {
    if (pct >= 80) return '🏆 متقدم';
    if (pct >= 65) return '🌟 جيد جداً';
    if (pct >= 50) return '📈 متوسط';
    if (pct >= 35) return '📚 مبتدئ';
    return '🌱 أساسي';
  };

  const getScenarioLink = () => {
    if (score >= 75) return '/scenarios/office';
    if (score >= 50) return '/scenarios/hospital';
    return '/scenarios/cafe';
  };

  return (
    <>
      <Head>
        <title>نتيجة التقييم - Smart Lab</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @media (max-width: 640px) {
            .result-main { padding: 20px 12px 40px !important; }
            .hero-card { padding: 28px 16px !important; }
          }
        `}</style>
      </Head>

      <div style={styles.page} dir="rtl">
        <Navbar />
        <main style={{ ...styles.main, className: "result-main" }}>
          
          {/* ===== البطاقة الرئيسية ===== */}
          <div style={{ ...styles.heroCard, className: "hero-card" }}>
            <div style={styles.scoreCircle}>
              <svg style={styles.scoreCircleSvg} viewBox="0 0 160 160">
                <circle cx="80" cy="80" r={radius} style={styles.scoreCircleBg} />
                <circle
                  cx="80" cy="80" r={radius}
                  style={{
                    ...styles.scoreCircleFill,
                    stroke: getCircleColor(circleProgress),
                    strokeDasharray: circumference,
                    strokeDashoffset: offset,
                  }}
                />
              </svg>
              <div style={styles.scoreText}>
                <span style={styles.scoreNumber}>{Math.round(circleProgress)}%</span>
                <span style={styles.scoreLabel}>{getLevelText(circleProgress)}</span>
              </div>
            </div>

            <h2 style={{ fontSize: 20, fontWeight: 800, color: COLORS.navy, margin: '0 0 8px' }}>
              {isQuick ? '⚡ تقييم سريع' : '📊 التقييم الشامل'}
            </h2>
            <p style={{ fontSize: 14, color: COLORS.muted, margin: 0 }}>
              {correctAnswers || 0} صحيح من {totalQuestions || 0} أسئلة
            </p>

            {insight && (
              <div style={{ backgroundColor: COLORS.lightGray, padding: 14, borderRadius: 10, marginTop: 16, textAlign: 'right' }}>
                <p style={{ fontSize: 14, color: COLORS.text, margin: 0, lineHeight: 1.8 }}>💡 {insight}</p>
              </div>
            )}
          </div>

          {/* ===== الملخص الجراحي ===== */}
          {surgicalSummary && surgicalSummary.topPriority && (
            <div style={styles.surgicalCard}>
              <h3 style={styles.surgicalTitle}>🎯 أولويتك القصوى</h3>
              <div style={styles.surgicalRow}>
                <span style={styles.surgicalIcon}>📌</span>
                <span style={styles.surgicalText}><strong>المشكلة:</strong> {surgicalSummary.topPriority}</span>
              </div>
              {surgicalSummary.rootCause && (
                <div style={styles.surgicalRow}>
                  <span style={styles.surgicalIcon}>🔍</span>
                  <span style={styles.surgicalText}><strong>السبب الجذري:</strong> {surgicalSummary.rootCause}</span>
                </div>
              )}
              {surgicalSummary.treatmentTime > 0 && (
                <div style={styles.surgicalRow}>
                  <span style={styles.surgicalIcon}>⏱️</span>
                  <span style={styles.surgicalText}><strong>الوقت المطلوب:</strong> {surgicalSummary.treatmentTime} دقيقة</span>
                </div>
              )}
            </div>
          )}

          {/* ===== الخطة العملية ===== */}
          {actionablePlan && actionablePlan.hasWeakness && (
            <div style={styles.planCard}>
              <h3 style={styles.planTitle}>📝 خطتك العلاجية</h3>
              {actionablePlan.today && actionablePlan.today.length > 0 && (
                <>
                  <p style={styles.planSection}>اليوم:</p>
                  {actionablePlan.today.map((item, idx) => (
                    <p key={idx} style={styles.planItem}>☑ {item}</p>
                  ))}
                </>
              )}
              {actionablePlan.thisWeek && actionablePlan.thisWeek.length > 0 && (
                <>
                  <p style={styles.planSection}>هذا الأسبوع:</p>
                  {actionablePlan.thisWeek.map((item, idx) => (
                    <p key={idx} style={styles.planItem}>☑ {item}</p>
                  ))}
                </>
              )}
              {actionablePlan.videoLink && actionablePlan.videoLink !== '#' && (
                <a href={actionablePlan.videoLink} target="_blank" rel="noopener noreferrer" style={styles.videoLink}>
                  ▶ شاهد فيديو الشرح
                </a>
              )}
            </div>
          )}

          {/* ===== التنبؤ المهني ===== */}
          {careerFit && careerFit.bestMatch && (
            <div style={styles.careerCard}>
              <h3 style={styles.careerTitle}>🚀 مستقبلك المهني</h3>
              <div style={styles.careerRow}>
                <span>{careerFit.bestMatchIcon || '💼'}</span>
                <span style={{ fontWeight: 700 }}>{careerFit.bestMatch}</span>
                <span style={styles.careerMatch}>{careerFit.matchPercentage}%</span>
              </div>
              {careerFit.nextStep && (
                <p style={{ fontSize: 14, color: COLORS.text, margin: '8px 0 0' }}>
                  📚 {careerFit.nextStep}
                </p>
              )}
            </div>
          )}

          {/* ===== أكورديونات التحليل ===== */}
          <div style={{ marginTop: 20 }}>
            {/* المهارات */}
            {masteryResults && masteryResults.length > 0 && (
              <AccordionSection id="skills" title="📊 خريطة مهاراتك" icon="📊" isOpen={!!expandedSections.skills} onToggle={toggleSection}>
                {masteryResults.map((skill, idx) => (
                  <div key={idx} style={styles.skillItem}>
                    <span>{skill.name}</span>
                    <span style={{ color: skill.level === 'متقن' ? COLORS.success : skill.level === 'قيد التعلم' ? COLORS.warning : COLORS.error }}>
                      {skill.percentage}% {skill.level === 'متقن' ? '✅' : skill.level === 'قيد التعلم' ? '⚠️' : '❌'}
                    </span>
                  </div>
                ))}
              </AccordionSection>
            )}

            {/* الأخطاء */}
            {errors && errors.length > 0 && (
              <AccordionSection id="errors" title="❌ تحليل أخطائك" icon="❌" isOpen={!!expandedSections.errors} onToggle={toggleSection}>
                {errors.slice(0, 8).map((err, idx) => (
                  <div key={idx} style={styles.errorItem}>
                    <strong>{err.question}</strong>
                    <br />
                    <span style={{ color: COLORS.error }}>❌ {err.yourAnswer}</span>
                    <span style={{ color: COLORS.success, marginRight: 8 }}>✅ {err.correctAnswer}</span>
                    {err.explanation && (
                      <p style={{ fontSize: 12, color: COLORS.muted }}>💡 {err.explanation}</p>
                    )}
                  </div>
                ))}
              </AccordionSection>
            )}

            {/* البصمة المعرفية */}
            {cognitiveProfile && (
              <AccordionSection id="cognitive" title="🧠 بصمتك المعرفية" icon="🧠" isOpen={!!expandedSections.cognitive} onToggle={toggleSection}>
                <p style={{ fontWeight: 700 }}>{cognitiveProfile.learningStyle}</p>
                <p>{cognitiveProfile.styleDescription}</p>
              </AccordionSection>
            )}

            {/* مصفوفة الثقة */}
            {confidenceAnalysis && (
              <AccordionSection id="confidence" title="✅ هل تثق بنفسك بشكل صحيح؟" icon="✅" isOpen={!!expandedSections.confidence} onToggle={toggleSection}>
                <p>واثق ومصيب: {confidenceAnalysis.highConfCorrect}%</p>
                <p>واثق ومخطئ: {confidenceAnalysis.highConfWrong}%</p>
                <p>غير واثق ومصيب: {confidenceAnalysis.lowConfCorrect}%</p>
                <p>غير واثق ومخطئ: {confidenceAnalysis.lowConfWrong}%</p>
                <p style={{ color: COLORS.teal, fontWeight: 700 }}>💡 {confidenceAnalysis.insight}</p>
              </AccordionSection>
            )}
          </div>

          {/* ===== أزرار الإجراءات ===== */}
          <div style={styles.buttonGroup}>
            <Link href="/course" style={styles.courseButton}>🚀 ابدأ كورسك المخصص</Link>
            <Link href={getScenarioLink()} style={styles.scenarioButton}>🎭 جرّب محاكي العميل</Link>
          </div>

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Link href="/assessment/categories" style={{ color: COLORS.muted, fontSize: 14, textDecoration: "none" }}>
              ← العودة إلى التقييمات
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
