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
    maxWidth: 1000,
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
  heroIcon: { fontSize: 56, marginBottom: 12, display: "block" },
  heroTitle: { fontSize: 32, fontWeight: 800, color: COLORS.navy, margin: "0 0 8px" },
  heroDesc: { fontSize: 17, color: COLORS.muted, lineHeight: 1.8, maxWidth: 560, margin: "0 auto 32px" },
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
  statValue: { fontSize: 32, fontWeight: 800, color: COLORS.navy, margin: "0 0 4px" },
  statLabel: { fontSize: 14, color: COLORS.muted, margin: 0 },
  statValueCorrect: { color: COLORS.success },
  statValueWrong: { color: COLORS.error },
  statValueTime: { color: COLORS.teal },
  scoreContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 32,
  },
  scoreCircle: { position: "relative", width: 180, height: 180 },
  scoreCircleSvg: { width: "100%", height: "100%", transform: "rotate(-90deg)" },
  scoreCircleBg: { fill: "none", stroke: COLORS.border, strokeWidth: 12 },
  scoreCircleFill: { fill: "none", strokeWidth: 12, strokeLinecap: "round", transition: "stroke-dashoffset 1.5s ease" },
  scoreText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  scoreNumber: { fontSize: 40, fontWeight: 800, color: COLORS.navy, display: "block" },
  scoreLabel: { fontSize: 14, color: COLORS.muted, display: "block" },
  scoreLevel: { fontSize: 16, fontWeight: 700, marginTop: 4, display: "block" },

  // 🔥 الخطة العملية (Actionable Plan)
  actionablePlan: {
    backgroundColor: '#FFF8E1',
    borderRadius: '16px',
    padding: '24px 28px',
    border: '2px solid #FFE082',
    marginBottom: '24px',
    direction: 'rtl',
  },
  actionablePlanTitle: {
    fontSize: '20px',
    fontWeight: 800,
    color: '#E65100',
    margin: '0 0 12px',
  },
  planRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '6px',
  },
  planRowIcon: { fontSize: '20px', flexShrink: 0 },
  planRowLabel: { fontWeight: 700 },
  planExercises: {
    marginTop: '8px',
    paddingRight: '24px',
  },
  planExerciseItem: { marginBottom: '6px' },
  planVideoLink: {
    display: 'inline-block',
    backgroundColor: '#FF0000',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 700,
    marginTop: '8px',
  },
  planNextStep: {
    marginTop: '12px',
    padding: '12px 16px',
    backgroundColor: '#E3F2FD',
    borderRadius: '8px',
    border: '1px solid #90CAF9',
  },

  // ✅ البصمة المعرفية
  cognitiveProfile: {
    backgroundColor: '#E8F5E9',
    borderRadius: '16px',
    padding: '20px 24px',
    border: '1px solid #A5D6A7',
    marginBottom: '24px',
  },
  cognitiveTitle: {
    fontSize: '18px',
    fontWeight: 800,
    color: '#2E7D32',
    margin: '0 0 8px',
  },
  cognitiveHow: {
    fontSize: '14px',
    color: COLORS.text,
    lineHeight: 1.8,
    marginBottom: '8px',
  },
  cognitiveWhy: {
    fontSize: '14px',
    color: COLORS.muted,
    lineHeight: 1.8,
  },

  // 🗺️ خريطة التعلم الجراحية
  surgicalMap: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: '20px 24px',
    marginBottom: 24,
    border: '1px solid ' + COLORS.border,
  },
  surgicalTitle: {
    fontSize: '18px',
    fontWeight: 800,
    color: COLORS.navy,
    margin: '0 0 12px',
  },
  criticalBadge: {
    backgroundColor: '#FFEBEE',
    padding: '8px 12px',
    borderRadius: '8px',
    marginBottom: '6px',
    borderRight: '4px solid ' + COLORS.error,
  },
  moderateBadge: {
    backgroundColor: '#FFF8E1',
    padding: '8px 12px',
    borderRadius: '8px',
    marginBottom: '6px',
    borderRight: '4px solid ' + COLORS.warning,
  },
  masteredBadge: {
    backgroundColor: '#E8F5E9',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '13px',
    display: 'inline-block',
    margin: '4px',
  },

  // 🏆 التنبؤ المهني
  careerCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: '16px',
    padding: '20px 24px',
    border: '1px solid #FFE0B2',
    marginBottom: '24px',
  },
  careerTitle: { fontSize: '18px', fontWeight: 800, color: '#E65100', margin: '0 0 4px' },
  careerSubtitle: { fontSize: '14px', color: COLORS.muted, marginBottom: '12px' },
  careerPaths: { display: 'flex', flexDirection: 'column', gap: '8px' },
  careerPathItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: COLORS.white,
    borderRadius: '8px',
    border: '1px solid #FFE0B2',
  },
  careerPathName: { fontWeight: 700 },
  careerPathMatch: { fontWeight: 700, color: COLORS.teal },

  // 📊 الأكورديونات المختصرة
  accordionContainer: { marginTop: 16 },
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
    padding: "16px 24px",
    backgroundColor: COLORS.white,
    border: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 700,
    color: COLORS.navy,
    textAlign: "right",
    transition: "background-color 0.2s ease",
    minHeight: 50,
  },
  accordionHeaderHover: { backgroundColor: COLORS.lightGray },
  accordionChevron: { fontSize: 16, transition: "transform 0.3s ease", marginRight: 12 },
  accordionChevronOpen: { transform: "rotate(180deg)" },
  accordionBody: { padding: "0 24px 20px 24px", borderTop: "1px solid " + COLORS.border },
  accordionBodyInner: { paddingTop: 16, fontSize: 14, color: COLORS.text, lineHeight: 1.8 },

  // أزرار الإجراءات
  buttonGroup: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12, marginTop: 24 },
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
    margin: "4px 4px",
    minHeight: 56,
    textAlign: "center",
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
    margin: "4px 4px",
    minHeight: 56,
    textAlign: "center",
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
  skillItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
    borderBottom: '1px solid ' + COLORS.border,
    fontSize: 14,
  },
  errorItem: {
    padding: '4px 0',
    borderBottom: '1px solid ' + COLORS.border,
    fontSize: 14,
  },
  badge: {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: 12,
    fontSize: 11,
    fontWeight: 600,
    marginRight: 8,
  },
};

// ============================================================
// 🧩 مكون الأكورديون
// ============================================================
const AccordionSection = ({ id, title, icon, isOpen, onToggle, children }) => {
  const [hover, setHover] = useState(false);
  return (
    <div style={styles.accordionItem}>
      <button
        style={{
          ...styles.accordionHeader,
          ...(hover ? styles.accordionHeaderHover : {}),
        }}
        onClick={() => onToggle(id)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>{icon}</span>
          {title}
        </span>
        <span style={{ ...styles.accordionChevron, ...(isOpen ? styles.accordionChevronOpen : {}) }}>▼</span>
      </button>
      {isOpen && (
        <div style={styles.accordionBody}>
          <div style={styles.accordionBodyInner}>{children}</div>
        </div>
      )}
    </div>
  );
};

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

        // ✅ إذا كان تقييم سريع، استخدم quickResult مباشرة
        if (quickResult) {
          const quickData = JSON.parse(quickResult);
          setAnalysis({
            isQuick: true,
            score: quickData.score,
            totalQuestions: quickData.total,
            correctAnswers: quickData.correct,
            wrongAnswers: quickData.wrong,
            actionablePlan: {
              hasWeakness: quickData.score < 70,
              priority: quickData.score < 70 ? 'تحتاج مراجعة' : '🎉 ممتاز!',
              priorityLevel: quickData.score >= 80 ? 'ممتاز' : quickData.score >= 60 ? 'جيد' : 'يحتاج تحسين',
            },
            insight: quickData.score >= 80 
              ? '🎉 أداء ممتاز! أنت على الطريق الصحيح.'
              : quickData.score >= 60 
              ? '📈 أداء جيد. هناك مجال للتحسين.'
              : '📚 تحتاج إلى مراجعة الأساسيات. لا تقلق، هذا طبيعي!',
          });
          setTimeout(() => setCircleProgress(quickData.score), 300);
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

        if (!response.ok) throw new Error("فشل في تحليل النتائج");

        const data = await response.json();
        setAnalysis({ ...data, isQuick: mode === 'quick' });

        localStorage.setItem('latestAnalysis', JSON.stringify(data));

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
  // 🔥 دوال العرض
  // ============================================================

  const renderActionablePlan = () => {
    const plan = analysis.actionablePlan;
    if (!plan) return null;

    if (!plan.hasWeakness) {
      return (
        <div style={{
          backgroundColor: '#E8F5E9',
          borderRadius: '16px',
          padding: '20px 24px',
          border: '2px solid #2ECC71',
          marginBottom: '24px',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#2E7D32', margin: '0 0 4px' }}>
            🎉 {plan.priority}
          </h3>
          <p style={{ fontSize: '15px', color: '#1B5E20' }}>
            {plan.nextStep || 'أنت متقن لجميع المهارات! استمر في التطوير.'}
          </p>
        </div>
      );
    }

    return (
      <div style={styles.actionablePlan}>
        <h3 style={styles.actionablePlanTitle}>
          🎯 أولويتك الأولى: {plan.priority}
          <span style={{
            display: 'inline-block',
            marginRight: '12px',
            fontSize: '14px',
            backgroundColor: plan.priorityLevel.includes('حرجة') ? '#FFEBEE' : '#FFF8E1',
            color: plan.priorityLevel.includes('حرجة') ? '#C62828' : '#E65100',
            padding: '2px 12px',
            borderRadius: '12px',
          }}>
            {plan.priorityLevel}
          </span>
        </h3>

        <div style={{ display: 'grid', gap: '8px' }}>
          {plan.specificError && (
            <div style={styles.planRow}>
              <span style={styles.planRowIcon}>📌</span>
              <span><span style={styles.planRowLabel}>مشكلتك بالضبط:</span> {plan.specificError}</span>
            </div>
          )}
          {plan.rootCause && (
            <div style={styles.planRow}>
              <span style={styles.planRowIcon}>🔍</span>
              <span><span style={styles.planRowLabel}>السبب الجذري:</span> {plan.rootCause}</span>
            </div>
          )}
          {plan.solution && (
            <div style={styles.planRow}>
              <span style={styles.planRowIcon}>💡</span>
              <span><span style={styles.planRowLabel}>الحل المقترح:</span> {plan.solution}</span>
            </div>
          )}
          {plan.timeRequired && (
            <div style={styles.planRow}>
              <span style={styles.planRowIcon}>⏱️</span>
              <span><span style={styles.planRowLabel}>الوقت المطلوب:</span> {plan.timeRequired} دقيقة</span>
            </div>
          )}
          {plan.exercises && plan.exercises.length > 0 && (
            <div style={{ marginTop: '8px' }}>
              <span style={styles.planRowLabel}>📝 تمارين محددة:</span>
              <ol style={styles.planExercises}>
                {plan.exercises.map((ex, idx) => (
                  <li key={idx} style={styles.planExerciseItem}>{ex}</li>
                ))}
              </ol>
            </div>
          )}
          {plan.videoLink && (
            <div>
              <a href={plan.videoLink} target="_blank" rel="noopener noreferrer" style={styles.planVideoLink}>
                ▶ شاهد فيديو شرح
              </a>
            </div>
          )}
          {plan.nextStep && (
            <div style={styles.planNextStep}>
              <strong>🚀 خطوتك التالية:</strong> {plan.nextStep}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCognitiveProfile = () => {
    const profile = analysis.cognitiveProfile;
    if (!profile) return null;

    let howWeKnow = '';
    if (profile.learningStyle === 'تحليلي متعمق') {
      howWeKnow = 'بناءً على سرعتك في الإجابة (متوسط {avg} ثانية) ودقتك العالية ({pct}%). أنت تميل للتفكير العميق قبل الإجابة، وهذا يظهر في أسئلة التحليل (OSI, Subnetting) حيث أداؤك أفضل. في المقابل، أنت أبطأ قليلاً في الأسئلة المباشرة لأنك تحلل حتى البسيط منها.';
    } else if (profile.learningStyle === 'حدسي سريع') {
      howWeKnow = 'بناءً على سرعتك في الإجابة (متوسط {avg} ثانية) ودقتك الجيدة ({pct}%). أنت تعتمد على البديهة والاسترجاع السريع للمعلومات. هذا يساعدك في الأسئلة المباشرة لكن قد يسبب أخطاء في الأسئلة التي تحتاج تفكيراً عميقاً.';
    } else {
      howWeKnow = 'بناءً على سرعتك المتوسطة في الإجابة (متوسط {avg} ثانية) ودقتك ({pct}%). لديك توازن جيد بين السرعة والدقة، مما يجعلك مرناً في التعامل مع مختلف أنواع الأسئلة.';
    }

    const avgTime = analysis.effortAnalysis?.avgTime || 'غير محدد';
    const pct = analysis.score || 0;
    howWeKnow = howWeKnow.replace(/{avg}/g, avgTime).replace(/{pct}/g, pct);

    let whyImportant = '';
    if (profile.learningStyle === 'تحليلي متعمق') {
      whyImportant = 'معرفة نمطك المعرفي تساعدك في: (١) اختيار طريقة المذاكرة المناسبة لك – ركز على الفهم العميق بدلاً من الحفظ السريع. (٢) تحسين أدائك في الامتحانات العملية حيث تحتاج للتفكير المنظم. (٣) إدارة وقتك بشكل أفضل في الأسئلة المعقدة.';
    } else if (profile.learningStyle === 'حدسي سريع') {
      whyImportant = 'معرفة نمطك المعرفي تساعدك في: (١) الاستفادة من سرعتك في الإجابات المباشرة. (٢) تدريب نفسك على التوقف قليلاً في الأسئلة المعقدة قبل الإجابة. (٣) تحقيق توازن أفضل بين السرعة والدقة.';
    } else {
      whyImportant = 'معرفة نمطك المعرفي تساعدك في: (١) الحفاظ على التوازن بين السرعة والدقة. (٢) اختيار التمارين المناسبة لتطوير كلا الجانبين. (٣) تحسين أدائك في جميع أنواع الأسئلة.';
    }

    return (
      <div style={styles.cognitiveProfile}>
        <h4 style={styles.cognitiveTitle}>🧠 بصمتك المعرفية: {profile.learningStyle}</h4>
        <p style={styles.cognitiveHow}><strong>📌 كيف وصلنا لهذه النتيجة؟</strong><br />{howWeKnow}</p>
        <p style={styles.cognitiveWhy}><strong>💡 لماذا هذا مهم لك؟</strong><br />{whyImportant}</p>
      </div>
    );
  };

  const renderSurgicalMap = () => {
    const map = analysis.trueSurgicalMap;
    if (!map) return <p style={{ color: COLORS.muted }}>لا توجد خريطة تعلم جراحية متاحة.</p>;

    return (
      <div style={styles.surgicalMap}>
        <h4 style={styles.surgicalTitle}>🗺️ خريطة التعلم الجراحية</h4>

        <h5 style={{ color: COLORS.error, marginBottom: '4px' }}>🔴 مهارات حرجة (تحتاج تركيز فوري)</h5>
        {map.critical.length === 0 ? (
          <p style={{ color: COLORS.success, fontSize: '14px' }}>🎉 لا توجد مهارات حرجة!</p>
        ) : (
          map.critical.slice(0, 5).map((skill, idx) => (
            <div key={idx} style={styles.criticalBadge}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700 }}>{skill.name}</span>
                <span style={{ color: COLORS.error, fontWeight: 700 }}>{skill.percentage}%</span>
              </div>
              <div style={{ fontSize: '13px', color: COLORS.muted }}>{skill.rootCause?.substring(0, 80)}...</div>
            </div>
          ))
        )}

        <h5 style={{ color: COLORS.warning, marginTop: '12px', marginBottom: '4px' }}>🟡 مهارات متوسطة</h5>
        {map.moderate.length === 0 ? (
          <p style={{ color: COLORS.muted, fontSize: '14px' }}>لا توجد مهارات متوسطة.</p>
        ) : (
          map.moderate.slice(0, 3).map((skill, idx) => (
            <div key={idx} style={styles.moderateBadge}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{skill.name}</span>
                <span style={{ color: COLORS.warning }}>{skill.percentage}%</span>
              </div>
            </div>
          ))
        )}

        <h5 style={{ color: COLORS.success, marginTop: '12px', marginBottom: '4px' }}>✅ مهارات متقنة</h5>
        {map.mastered.length === 0 ? (
          <p style={{ color: COLORS.muted, fontSize: '14px' }}>لا توجد مهارات متقنة بعد.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {map.mastered.slice(0, 6).map((skill, idx) => (
              <span key={idx} style={styles.masteredBadge}>🏆 {skill.name}</span>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderCareerPrediction = () => {
    const career = analysis.careerPrediction;
    if (!career || !career.topPaths) return null;

    return (
      <div style={styles.careerCard}>
        <h4 style={styles.careerTitle}>🚀 مستقبلك المهني</h4>
        <p style={styles.careerSubtitle}>بناءً على مهاراتك، إليك المسارات المهنية الأنسب لك</p>
        <div style={styles.careerPaths}>
          {career.topPaths.slice(0, 3).map((path, idx) => (
            <div key={idx} style={styles.careerPathItem}>
              <span style={styles.careerPathName}>
                {path.icon} {path.title}
              </span>
              <span style={styles.careerPathMatch}>{path.matchPercentage}%</span>
            </div>
          ))}
        </div>
        {career.summary && (
          <p style={{ fontSize: '14px', color: COLORS.muted, marginTop: '12px' }}>
            {career.summary}
          </p>
        )}
      </div>
    );
  };

  const renderErrors = () => {
    if (!analysis.errors || analysis.errors.length === 0) {
      return <p style={{ color: COLORS.success }}>🎉 لا توجد أخطاء! أداء ممتاز.</p>;
    }
    return analysis.errors.slice(0, 8).map((err, idx) => (
      <div key={idx} style={styles.errorItem}>
        <strong>{err.topic}</strong> – {err.question.substring(0, 50)}...
        <br />
        <span style={{ color: COLORS.error }}>❌ إجابتك: {err.yourAnswer}</span>
        <span style={{ color: COLORS.success, marginRight: 12 }}>✅ الصحيح: {err.correctAnswer}</span>
        <span style={{ ...styles.badge, backgroundColor: COLORS.lightGray, color: COLORS.muted }}>
          {err.errorPattern === 'conceptual' ? 'مفهومي' : err.errorPattern === 'calculation' ? 'حسابي' : err.errorPattern === 'application' ? 'تطبيقي' : 'حفظي'}
        </span>
      </div>
    ));
  };

  const renderStrengths = () => {
    const strongTopics = analysis.topicAnalysis
      ? Object.entries(analysis.topicAnalysis).filter(([_, data]) => (data.weightedPercentage || data.percentage || 0) >= 70)
      : [];
    const hidden = analysis.hiddenStrengths || [];

    if (strongTopics.length === 0 && hidden.length === 0) {
      return <p style={{ color: COLORS.muted }}>لا توجد نقاط قوة بارزة حالياً.</p>;
    }

    return (
      <>
        {strongTopics.slice(0, 4).map(([topic, data]) => (
          <div key={topic} style={styles.skillItem}>
            <span>💪 {topic}</span>
            <span style={{ color: COLORS.success }}>{data.weightedPercentage || data.percentage}%</span>
          </div>
        ))}
        {hidden.slice(0, 2).map((s, idx) => (
          <div key={idx} style={styles.skillItem}>
            <span>{s.icon || '🌟'} {s.title}</span>
            <span style={{ color: COLORS.teal }}>{s.percentage}%</span>
          </div>
        ))}
      </>
    );
  };

  const renderLearningStages = () => {
    if (!analysis.learningStages || analysis.learningStages.length === 0) {
      return <p style={{ color: COLORS.muted }}>لا توجد مراحل تعلم متاحة.</p>;
    }
    return analysis.learningStages.slice(0, 8).map((stage, idx) => {
      const statusColor = stage.level === 'مكتمل' ? COLORS.success : stage.level === 'جزئياً' ? COLORS.warning : COLORS.border;
      return (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0', borderBottom: '1px solid ' + COLORS.border }}>
          <span style={{ fontSize: 20 }}>{stage.icon}</span>
          <span style={{ flex: 1, fontSize: 14 }}>{stage.concept}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: statusColor }}>
            {stage.percentage}%
          </span>
        </div>
      );
    });
  };

  const renderLessons = () => {
    const lessons = analysis.recommendedLessons || [];
    if (lessons.length === 0) {
      return <p style={{ color: COLORS.muted }}>لا توجد دروس مقترحة حالياً.</p>;
    }
    return lessons.slice(0, 5).map((lesson, idx) => (
      <div key={idx} style={{ padding: '4px 0', borderBottom: '1px solid ' + COLORS.border }}>
        <span style={{ fontWeight: 700 }}>{lesson.topic}</span>
        <span style={{ color: COLORS.muted, fontSize: 13 }}> ({lesson.percentage}%)</span>
        <br />
        <span style={{ fontSize: 13, color: COLORS.muted }}>💡 {lesson.solution?.substring(0, 60)}...</span>
      </div>
    ));
  };

  // ============================================================
  // ⏳ معالجة حالة التحميل والخطأ
  // ============================================================
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
          <Link href="/assessment/categories" style={{ ...styles.backLink, fontSize: 18, fontWeight: 700, color: COLORS.teal }}>
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
          <Link href="/assessment/categories" style={{ ...styles.backLink, fontSize: 18, fontWeight: 700, color: COLORS.teal }}>
            ابدأ تقييماً جديداً
          </Link>
        </div>
      </div>
    );
  }

  // ============================================================
  // 📊 استخراج البيانات
  // ============================================================
  const {
    score, totalQuestions, correctAnswers, wrongAnswers,
    cognitiveProfile, effortAnalysis, insight, isQuick,
  } = analysis;

  const avgTimePerQuestion = effortAnalysis?.avgTime || 0;
  const totalTime = Math.round(avgTimePerQuestion * (totalQuestions || 0));
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.5" />
        <style>{`
          @media (max-width: 640px) {
            .stats-grid { grid-template-columns: 1fr !important; }
            .result-hero { padding: 24px 16px 32px !important; }
            .actionable-plan { padding: 18px 16px !important; }
            .button-group { flex-direction: column !important; gap: 8px !important; }
            .course-btn, .scenario-btn { width: 100% !important; text-align: center !important; }
            .plan-exercises { padding-right: 16px !important; }
          }
        `}</style>
      </Head>

      <div style={styles.page} dir="rtl">
        <Navbar />

        <main style={styles.main}>
          {/* ===== القسم العلوي ===== */}
          <div style={styles.hero} className="result-hero">
            <span style={styles.heroIcon}>{isQuick ? '⚡' : '🎯'}</span>
            <h1 style={styles.heroTitle}>
              {isQuick ? 'تقييم سريع - نظرة عامة' : 'تقرير التقييم الشامل'}
            </h1>
            <p style={styles.heroDesc}>
              {isQuick
                ? 'هذا تقييم سريع أعطاك نظرة عامة على مستواك. للتشخيص العميق، جرب التقييم الشامل.'
                : 'تحليل مفصل لمهاراتك مع خطة عمل مخصصة لتحسين أدائك.'}
            </p>

            <div style={styles.scoreContainer}>
              <div style={styles.scoreCircle}>
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
                  <span style={styles.scoreNumber}>{Math.round(circleProgress)}%</span>
                  <span style={styles.scoreLabel}>النتيجة</span>
                  <span style={styles.scoreLevel}>{getLevelText(circleProgress)}</span>
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

            {insight && (
              <div style={{ backgroundColor: COLORS.lightGray, padding: 16, borderRadius: 12, textAlign: 'right' }}>
                <p style={{ fontSize: 15, color: COLORS.text, margin: 0, lineHeight: 1.8 }}>💡 {insight}</p>
              </div>
            )}
          </div>

          {/* ===== 🔥 الخطة العملية ===== */}
          {renderActionablePlan()}

          {/* ===== 🧠 البصمة المعرفية ===== */}
          {renderCognitiveProfile()}

          {/* ===== 🗺️ خريطة التعلم الجراحية ===== */}
          {!isQuick && renderSurgicalMap()}

          {/* ===== 🚀 التنبؤ المهني ===== */}
          {!isQuick && renderCareerPrediction()}

          {/* ===== 📊 الأكورديونات المختصرة ===== */}
          <div style={styles.accordionContainer}>
            {/* الأخطاء */}
            <AccordionSection
              id="errors"
              title="❌ تحليل الأخطاء"
              icon="❌"
              isOpen={expandedSections.errors}
              onToggle={toggleSection}
            >
              {renderErrors()}
            </AccordionSection>

            {/* نقاط القوة */}
            <AccordionSection
              id="strengths"
              title="💪 نقاط القوة"
              icon="💪"
              isOpen={expandedSections.strengths}
              onToggle={toggleSection}
            >
              {renderStrengths()}
            </AccordionSection>

            {/* مراحل التعلم */}
            <AccordionSection
              id="stages"
              title="🗺️ مراحل التعلم"
              icon="🗺️"
              isOpen={expandedSections.stages}
              onToggle={toggleSection}
            >
              {renderLearningStages()}
            </AccordionSection>

            {/* الدروس المقترحة */}
            <AccordionSection
              id="lessons"
              title="📖 الدروس المقترحة"
              icon="📖"
              isOpen={expandedSections.lessons}
              onToggle={toggleSection}
            >
              {renderLessons()}
            </AccordionSection>
          </div>

          {/* ===== أزرار الإجراءات ===== */}
          <div style={styles.buttonGroup} className="button-group">
            <Link href="/course" style={styles.courseButton} className="course-btn">
              🚀 ابدأ كورسك المخصص
            </Link>
            <Link href={getScenarioLink()} style={styles.scenarioButton} className="scenario-btn">
              🎭 جرّب محاكي العميل
            </Link>
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/assessment/categories" style={styles.backLink}>← العودة إلى التقييمات</Link>
          </div>
        </main>

        <footer style={{ backgroundColor: COLORS.navy, color: COLORS.white, padding: "40px 24px 30px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 30 }}>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>SmartLab</h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", maxWidth: 300 }}>منصة تعليمية متطورة لدعم التعلم التكيفي والمحاكاة.</p>
            </div>
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>تواصل معنا</h4>
              <a href="mailto:info@smartlab.com" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}>info@smartlab.com</a>
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
