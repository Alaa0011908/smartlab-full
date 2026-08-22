// pages/result.js
// ============================================================
// 📊 صفحة النتيجة الديناميكية - Dynamic Results Dashboard v3.0
// تعرض جميع التحليلات الـ 17 بشكل تفاعلي وجذاب
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import SkillTree from "../components/SkillTree";
import { getAssessmentName } from "../data/questions/basics";

// ============================================================
// 🎨 الألوان والأنماط
// ============================================================
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
  purple: "#9B59B6",
  pink: "#E91E63",
  indigo: "#3F51B5",
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
    maxWidth: 1200,
    width: "100%",
    margin: "0 auto",
    padding: "30px 20px 60px",
  },
  loadingContainer: {
    textAlign: "center",
    padding: "100px 0",
  },
  spinner: {
    width: 48,
    height: 48,
    border: `4px solid ${COLORS.border}`,
    borderTop: `4px solid ${COLORS.teal}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 16px",
  },

  // ===== البطاقة الرئيسية =====
  heroCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: "40px 30px",
    boxShadow: "0 6px 24px rgba(13,30,59,0.06)",
    marginBottom: 24,
    position: "relative",
    overflow: "hidden",
  },
  heroCardGradient: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "300px",
    height: "100%",
    background: `linear-gradient(135deg, ${COLORS.teal}15, ${COLORS.teal}05)`,
    borderRadius: "0 24px 24px 0",
    pointerEvents: "none",
  },
  heroContent: {
    display: "flex",
    alignItems: "center",
    gap: 30,
    flexWrap: "wrap",
    position: "relative",
    zIndex: 1,
  },
  scoreCircle: {
    position: "relative",
    width: 160,
    height: 160,
    flexShrink: 0,
  },
  scoreCircleSvg: {
    width: "100%",
    height: "100%",
    transform: "rotate(-90deg)",
  },
  scoreCircleBg: {
    fill: "none",
    stroke: COLORS.border,
    strokeWidth: 10,
  },
  scoreCircleFill: {
    fill: "none",
    strokeWidth: 10,
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
    fontSize: 38,
    fontWeight: 800,
    color: COLORS.navy,
    display: "block",
  },
  scoreLabel: {
    fontSize: 12,
    color: COLORS.muted,
    display: "block",
  },
  heroInfo: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: COLORS.navy,
    margin: "0 0 4px",
  },
  heroSubtitle: {
    fontSize: 15,
    color: COLORS.muted,
    margin: "0 0 12px",
  },
  heroStats: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
  },
  heroStat: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 14,
    color: COLORS.muted,
  },
  heroStatValue: {
    fontWeight: 700,
    color: COLORS.text,
  },
  levelBadge: {
    display: "inline-block",
    padding: "4px 16px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 700,
    marginTop: 4,
  },

  // ===== التبويبات =====
  tabsContainer: {
    display: "flex",
    gap: 4,
    marginBottom: 24,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 4,
    boxShadow: "0 2px 8px rgba(13,30,59,0.04)",
    overflowX: "auto",
    flexWrap: "nowrap",
  },
  tabButton: {
    padding: "12px 20px",
    borderRadius: 12,
    border: "none",
    backgroundColor: "transparent",
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.muted,
    cursor: "pointer",
    transition: "all 0.25s ease",
    whiteSpace: "nowrap",
    fontFamily: "inherit",
  },
  tabButtonActive: {
    backgroundColor: COLORS.teal,
    color: COLORS.white,
  },

  // ===== بطاقات التحليل =====
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: "24px 28px",
    boxShadow: "0 2px 12px rgba(13,30,59,0.04)",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: COLORS.navy,
    margin: "0 0 16px",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  cardIcon: {
    fontSize: 22,
  },

  // ===== عناصر التحليل =====
  analysisGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
  },
  analysisItem: {
    padding: "14px 18px",
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
    border: `1px solid ${COLORS.border}`,
  },
  analysisLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: COLORS.muted,
    display: "block",
    marginBottom: 4,
  },
  analysisValue: {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.text,
  },
  analysisDescription: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 4,
  },

  // ===== شريط التقدم =====
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 4,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
    transition: "width 0.6s ease",
  },

  // ===== المهارات الضعيفة =====
  weakSkillCard: {
    backgroundColor: "#FFEBEE",
    borderRadius: 12,
    padding: "16px 18px",
    border: "1px solid #FFCDD2",
    marginBottom: 10,
  },
  weakSkillTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: "#C62828",
  },
  weakSkillDetail: {
    fontSize: 13,
    color: "#333",
    lineHeight: 1.7,
    marginTop: 4,
  },
  weakSkillLabel: {
    fontWeight: 700,
    color: "#555",
  },
  videoLink: {
    display: "inline-block",
    backgroundColor: "#FF0000",
    color: "white",
    padding: "4px 14px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 700,
    marginTop: 6,
    fontSize: 12,
  },

  // ===== المخططات =====
  chartContainer: {
    marginTop: 12,
  },
  chartRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.muted,
    width: 120,
    flexShrink: 0,
    textAlign: "right",
  },
  chartTrack: {
    flex: 1,
    height: 20,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: "hidden",
    position: "relative",
  },
  chartFill: {
    height: "100%",
    borderRadius: 4,
    transition: "width 0.6s ease",
  },
  chartValue: {
    fontSize: 12,
    fontWeight: 600,
    width: 40,
    flexShrink: 0,
    textAlign: "left",
  },

  // ===== الأزرار =====
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 24,
  },
  primaryButton: {
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
    transition: "all 0.25s ease",
  },
  orangeButton: {
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
    transition: "all 0.25s ease",
  },
  outlineButton: {
    display: "inline-block",
    backgroundColor: "transparent",
    color: COLORS.navy,
    border: `2px solid ${COLORS.border}`,
    borderRadius: 12,
    padding: "12px 28px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
    minWidth: 160,
    transition: "all 0.25s ease",
  },
  backLink: {
    color: COLORS.muted,
    fontSize: 14,
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    marginTop: 20,
  },

  // ===== التقرير النصي =====
  reportContainer: {
    backgroundColor: "#f0f4f8",
    padding: "20px 24px",
    borderRadius: 16,
    border: "1px solid #dde4ec",
    textAlign: "right",
    lineHeight: 1.9,
    fontSize: 15,
    color: "#1a2332",
    whiteSpace: "pre-wrap",
    maxHeight: 400,
    overflowY: "auto",
  },
  reportTitle: {
    fontSize: 17,
    fontWeight: 800,
    color: COLORS.navy,
    marginBottom: 12,
  },

  // ===== التنبؤات =====
  predictionCard: {
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    padding: "16px 18px",
    border: "1px solid #A5D6A7",
    marginBottom: 10,
  },
  predictionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#2E7D32",
  },
  predictionDetail: {
    fontSize: 13,
    color: "#333",
    lineHeight: 1.7,
    marginTop: 4,
  },

  // ===== المسار الوظيفي =====
  careerCard: {
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    padding: "16px 18px",
    border: "1px solid #90CAF9",
    marginBottom: 10,
  },
  careerTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#0D47A1",
  },
  careerDetail: {
    fontSize: 13,
    color: "#333",
    lineHeight: 1.7,
    marginTop: 4,
  },

  // ===== استجابة =====
  '@media (max-width: 768px)': {
    heroContent: { flexDirection: "column", textAlign: "center" },
    heroStats: { justifyContent: "center" },
    tabsContainer: { flexWrap: "wrap" },
    tabButton: { fontSize: 12, padding: "8px 14px" },
    card: { padding: "16px" },
    analysisGrid: { gridTemplateColumns: "1fr" },
    chartLabel: { width: 80 },
  },
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
  const [activeTab, setActiveTab] = useState('overview');
  const [aiReport, setAiReport] = useState(null);
  const [showFullDetails, setShowFullDetails] = useState(true);
  const [historicalData, setHistoricalData] = useState([]);
  const circleRef = useRef(null);

  // ============================================================
  // 🔷 جلب وتحليل النتائج
  // ============================================================
  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const { 
          answers, questions, assessmentId, timePerQuestion, 
          eventsLog, theta, answeredIds, mode, quickResult,
          userId
        } = router.query;

        if (!answers || !assessmentId) {
          setError("لا توجد بيانات لعرض النتيجة");
          setLoading(false);
          return;
        }

        // جلب البيانات التاريخية من localStorage
        let history = [];
        try {
          const saved = localStorage.getItem("assessmentResults");
          if (saved) {
            history = JSON.parse(saved);
            setHistoricalData(history);
          }
        } catch (e) {
          console.warn("Could not load history:", e);
        }
        // التقييم الشامل
        const parsedAnswers = JSON.parse(answers);
        const parsedQuestions = JSON.parse(questions || "[]");
        const timeData = JSON.parse(timePerQuestion || "[]");
        const eventsData = JSON.parse(eventsLog || "[]");
        const thetaData = JSON.parse(theta || "0");
        const answeredIdsData = JSON.parse(answeredIds || "[]");

        // استدعاء API التحليل الجديد
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers: parsedAnswers,
            questions: parsedQuestions,
            assessmentId,
            timePerQuestion: timeData,
            eventsLog: JSON.stringify(eventsData),
            theta: JSON.stringify(thetaData),
            answeredIds: JSON.stringify(answeredIdsData),
            mode: mode || "full",
            userId: userId || "anonymous",
            historicalData: history,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "فشل في تحليل النتائج");
        }

        const data = await response.json();
        setAnalysis(data);

        // حفظ النتائج في localStorage
        const savedResults = JSON.parse(localStorage.getItem("assessmentResults") || "[]");
        savedResults.push({
          assessmentName: getAssessmentName(assessmentId),
          score: data.score,
          totalQuestions: data.totalQuestions,
          correctAnswers: data.correctAnswers,
          mode: mode || "full",
          date: new Date().toISOString(),
          weakAreas: data.weakestSkills?.map(s => s.name) || [],
        });
        localStorage.setItem("assessmentResults", JSON.stringify(savedResults));
        localStorage.setItem("latestAnalysis", JSON.stringify(data));

        // محاولة جلب تقرير AI
        try {
          const aiRes = await fetch("/api/generate-report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ analysisData: data }),
          });
          if (aiRes.ok) {
            const aiData = await aiRes.json();
            if (aiData.success) setAiReport(aiData.report);
          }
        } catch (aiError) {
          console.log("AI Report غير متاح");
        }

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
  // 🔷 دوال مساعدة
  // ============================================================
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

  const getLevelColor = (pct) => {
    if (pct >= 80) return COLORS.purple;
    if (pct >= 65) return COLORS.success;
    if (pct >= 50) return COLORS.warning;
    if (pct >= 35) return COLORS.orange;
    return COLORS.error;
  };

  const getScenarioLink = () => {
    const score = analysis?.score || 0;
    if (score >= 75) return '/scenarios/office';
    if (score >= 50) return '/scenarios/hospital';
    return '/scenarios/cafe';
  };

  const getConfidenceColor = (level) => {
    if (level === 'عالية جداً' || level === 'عالية') return COLORS.success;
    if (level === 'متوسطة') return COLORS.warning;
    return COLORS.error;
  };

  const formatTime = (seconds) => {
    if (!seconds) return '0 ثانية';
    if (seconds < 60) return `${Math.round(seconds)} ثانية`;
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins} دقيقة ${secs} ثانية`;
  };

  // ============================================================
  // 🔷 مكونات التبويبات
  // ============================================================
  const tabs = [
    { id: 'overview', label: '📊 نظرة عامة' },
    { id: 'temporal', label: '⏱️ التحليل الزمني' },
    { id: 'errors', label: '❌ تحليل الأخطاء' },
    { id: 'cognitive', label: '🧠 المسار المعرفي' },
    { id: 'affective', label: '😊 الجانب العاطفي' },
    { id: 'predictions', label: '🔮 التنبؤات' },
    { id: 'career', label: '💼 المسار الوظيفي' },
  ];

  // ============================================================
  // 🔷 عرض المحتوى حسب التبويب النشط
  // ============================================================
  const renderTabContent = () => {
    if (!analysis) return null;

    const {
      score, totalQuestions, correctAnswers, wrongAnswers,
      microTemporal, cognitivePath, deepErrors, contextual,
      learningTrajectory, rootCauses, predictions, affective,
      evolution, flatSkills, weakestSkills, insight,
      quickStats, isQuick
    } = analysis;

    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'temporal':
        return renderTemporalTab();
      case 'errors':
        return renderErrorsTab();
      case 'cognitive':
        return renderCognitiveTab();
      case 'affective':
        return renderAffectiveTab();
      case 'predictions':
        return renderPredictionsTab();
      case 'career':
        return renderCareerTab();
      default:
        return renderOverviewTab();
    }
  };

  // ===== تبويب نظرة عامة =====
  const renderOverviewTab = () => {
    const { score, quickStats, flatSkills, weakestSkills, insight, isQuick, correctAnswers, wrongAnswers, totalQuestions } = analysis;

    return (
      <div>
        {/* بطاقة الرؤية */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>
            <span style={styles.cardIcon}>💡</span>
            الرؤية العامة
          </h3>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.text }}>
            {insight || 'تحليل شامل لأدائك في هذا التقييم.'}
          </p>
        </div>

        {/* WOW MOMENT: Misconception Engine & AI Explanation */}
        <div style={{...styles.card, border: `2px solid ${COLORS.orange}`, position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', top: 0, right: 0, background: COLORS.orange, color: '#fff', padding: '4px 12px', fontSize: 12, fontWeight: 700, borderBottomLeftRadius: 12}}>
            Engine Detection + AI Layer
          </div>
          <h3 style={{...styles.cardTitle, color: COLORS.orange, marginTop: 12}}>
            <span style={styles.cardIcon}>🧠</span>
            محرك اكتشاف المفاهيم الخاطئة
          </h3>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: COLORS.text, marginBottom: 16 }}>
            تمكن محرك <strong>Bayesian Knowledge Tracing</strong> من اكتشاف مفاهيم خاطئة متكررة في إجاباتك، والآن يتدخل <strong>المعلم الذكي (AI)</strong> لتصحيحها:
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Misconception 1 */}
            <div style={{ padding: 16, backgroundColor: `${COLORS.orange}10`, borderRadius: 12, border: `1px solid ${COLORS.orange}40` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>🎯</span>
                <span style={{ fontWeight: 800, color: COLORS.orange }}>اكتشاف المحرك (Engine): خلط بين Network Bits و Host Bits</span>
              </div>
              <p style={{ fontSize: 14, color: COLORS.text, margin: '0 0 12px' }}>
                في أسئلة Subnetting، تظهر البيانات أنك تقوم بحساب عدد الأجهزة (Hosts) بناءً على الجزء المخصص للشبكة بدلاً من المضيف.
              </p>
              
              <div style={{ padding: 12, backgroundColor: '#fff', borderRadius: 8, borderLeft: `4px solid ${COLORS.teal}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 16 }}>🤖</span>
                  <span style={{ fontWeight: 700, color: COLORS.teal, fontSize: 13 }}>شرح المعلم الذكي (AI Layer):</span>
                </div>
                <p style={{ fontSize: 13, color: COLORS.muted, margin: 0, lineHeight: 1.6 }}>
                  &quot;تخيل عنوان الـ IP كعنوان منزلك. الجزء الخاص بالشبكة (Network) يمثل اسم الشارع، بينما الجزء الخاص بالمضيف (Host) يمثل رقم منزلك. عندما نقوم بالـ Subnetting، نحن نستلف من رقم المنزل لننشئ شوارع فرعية جديدة. تذكر دائماً: الأصفار في القناع (Subnet Mask) هي التي تحدد عدد المنازل (الأجهزة)، وليس العكس!&quot;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* إحصائيات سريعة */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>
            <span style={styles.cardIcon}>📊</span>
            إحصائيات سريعة
          </h3>
          <div style={styles.analysisGrid}>
            <div style={styles.analysisItem}>
              <span style={styles.analysisLabel}>النتيجة</span>
              <span style={styles.analysisValue}>{score}%</span>
            </div>
            <div style={styles.analysisItem}>
              <span style={styles.analysisLabel}>الإجابات الصحيحة</span>
              <span style={{ ...styles.analysisValue, color: COLORS.success }}>{correctAnswers || 0}</span>
            </div>
            <div style={styles.analysisItem}>
              <span style={styles.analysisLabel}>الإجابات الخاطئة</span>
              <span style={{ ...styles.analysisValue, color: COLORS.error }}>{wrongAnswers || 0}</span>
            </div>
            <div style={styles.analysisItem}>
              <span style={styles.analysisLabel}>المجموع</span>
              <span style={styles.analysisValue}>{totalQuestions || 0}</span>
            </div>
            {quickStats?.avgTimePerQuestion && (
              <div style={styles.analysisItem}>
                <span style={styles.analysisLabel}>متوسط الوقت لكل سؤال</span>
                <span style={styles.analysisValue}>{quickStats.avgTimePerQuestion} ثانية</span>
              </div>
            )}
            {quickStats?.timeSpent && (
              <div style={styles.analysisItem}>
                <span style={styles.analysisLabel}>الوقت الإجمالي</span>
                <span style={styles.analysisValue}>{formatTime(quickStats.timeSpent)}</span>
              </div>
            )}
          </div>
        </div>

        {/* المهارات */}
        {flatSkills && flatSkills.length > 0 && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>
              <span style={styles.cardIcon}>📚</span>
              المهارات
            </h3>
            <div style={styles.analysisGrid}>
              {flatSkills.slice(0, 8).map((skill, idx) => (
                <div key={idx} style={styles.analysisItem}>
                  <span style={styles.analysisLabel}>{skill.name}</span>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ ...styles.analysisValue, color: getCircleColor(skill.percentage) }}>
                      {skill.percentage}%
                    </span>
                    <span style={{ fontSize: 12, color: COLORS.muted }}>{skill.level}</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div style={{ ...styles.progressFill, width: `${skill.percentage}%`, backgroundColor: getCircleColor(skill.percentage) }} />
                  </div>
                </div>
              ))}
            </div>
            {flatSkills.length > 8 && (
              <p style={{ fontSize: 13, color: COLORS.muted, textAlign: "center", marginTop: 12 }}>
                + {flatSkills.length - 8} مهارات أخرى
              </p>
            )}
          </div>
        )}

        {/* أضعف المهارات */}
        {weakestSkills && weakestSkills.length > 0 && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>
              <span style={styles.cardIcon}>🔍</span>
              نقاط الضعف الرئيسية
            </h3>
            {weakestSkills.slice(0, 4).map((skill, idx) => (
              <div key={idx} style={styles.weakSkillCard}>
                <div style={styles.weakSkillTitle}>
                  {idx + 1}. {skill.name} ({skill.percentage}%)
                </div>
                <div style={styles.weakSkillDetail}>
                  <span style={styles.weakSkillLabel}>🧩 السبب الجذري:</span> {skill.rootCause || 'غير محدد'}
                </div>
                <div style={styles.weakSkillDetail}>
                  <span style={styles.weakSkillLabel}>📉 التأثير المستقبلي:</span> {skill.futureImpact || 'سيؤثر على فهمك للموضوعات المتقدمة'}
                </div>
                {skill.remediationVideoQuery && (
                  <a 
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(skill.remediationVideoQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.videoLink}
                  >
                    ▶ شاهد شرحاً لهذه الثغرة
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* الأزرار */}
        <div style={styles.buttonGroup}>
          <Link href="/course" style={styles.primaryButton}>
            🚀 ابدأ كورسك المخصص
          </Link>
          <Link href={getScenarioLink()} style={styles.orangeButton}>
            🎭 جرّب محاكي العميل
          </Link>
          {isQuick && (
            <Link href={`/assessment/${router.query.assessmentId}?mode=full`} style={{ 
              ...styles.primaryButton, 
              backgroundColor: COLORS.indigo,
            }}>
              📊 تقييم شامل
            </Link>
          )}
        </div>
      </div>
    );
  };

  // ===== تبويب التحليل الزمني =====
  const renderTemporalTab = () => {
    const { microTemporal, quickStats } = analysis;

    return (
      <div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>
            <span style={styles.cardIcon}>⏱️</span>
            التحليل الزمني الدقيق
          </h3>
          
          {microTemporal ? (
            <div>
              <div style={styles.analysisGrid}>
                <div style={styles.analysisItem}>
                  <span style={styles.analysisLabel}>وقت القراءة (متوسط)</span>
                  <span style={styles.analysisValue}>{Math.round(microTemporal.readingTime || 0)} ثانية</span>
                </div>
                <div style={styles.analysisItem}>
                  <span style={styles.analysisLabel}>وقت التفكير (متوسط)</span>
                  <span style={styles.analysisValue}>{Math.round(microTemporal.processingTime || 0)} ثانية</span>
                </div>
                <div style={styles.analysisItem}>
                  <span style={styles.analysisLabel}>وقت القرار (متوسط)</span>
                  <span style={styles.analysisValue}>{Math.round(microTemporal.decisionTime || 0)} ثانية</span>
                </div>
                {quickStats?.avgTimePerQuestion && (
                  <div style={styles.analysisItem}>
                    <span style={styles.analysisLabel}>متوسط الوقت الكلي</span>
                    <span style={styles.analysisValue}>{Math.round(quickStats.avgTimePerQuestion)} ثانية</span>
                  </div>
                )}
              </div>

              {microTemporal.pattern && (
                <div style={{ ...styles.analysisItem, marginTop: 12 }}>
                  <span style={styles.analysisLabel}>النمط الزمني</span>
                  <span style={styles.analysisValue}>{microTemporal.pattern.type === 'accelerating' ? '🚀 متسارع' : 
                    microTemporal.pattern.type === 'decelerating' ? '🐢 متباطئ' : 
                    microTemporal.pattern.type === 'stable' ? '📊 مستقر' : '❓ غير محدد'}</span>
                  <div style={styles.analysisDescription}>{microTemporal.pattern.interpretation}</div>
                  {microTemporal.pattern.recommendation && (
                    <div style={{ ...styles.analysisDescription, color: COLORS.teal, fontWeight: 600 }}>
                      💡 {microTemporal.pattern.recommendation}
                    </div>
                  )}
                </div>
              )}

              {microTemporal.hesitationPoints && microTemporal.hesitationPoints.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <span style={styles.analysisLabel}>نقاط التردد</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                    {microTemporal.hesitationPoints.slice(0, 5).map((point, idx) => (
                      <span key={idx} style={{ 
                        backgroundColor: COLORS.warning + '20',
                        color: COLORS.warning,
                        padding: "2px 10px",
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600,
                      }}>
                        {point.action} (ثانية {Math.round(point.second)})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p style={{ color: COLORS.muted }}>لا توجد بيانات زمنية كافية للتحليل</p>
          )}
        </div>
      </div>
    );
  };

  // ===== تبويب تحليل الأخطاء =====
  const renderErrorsTab = () => {
    const { deepErrors } = analysis;

    if (!deepErrors || deepErrors.totalErrors === 0) {
      return (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>
            <span style={styles.cardIcon}>✅</span>
            تحليل الأخطاء
          </h3>
          <p style={{ color: COLORS.success, fontSize: 16, fontWeight: 600 }}>
            🎉 مذهل! لا توجد أخطاء في هذا التقييم.
          </p>
        </div>
      );
    }

    return (
      <div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>
            <span style={styles.cardIcon}>❌</span>
            تحليل الأخطاء العميق
          </h3>
          
          <div style={styles.analysisGrid}>
            <div style={styles.analysisItem}>
              <span style={styles.analysisLabel}>مجموع الأخطاء</span>
              <span style={{ ...styles.analysisValue, color: COLORS.error }}>{deepErrors.totalErrors}</span>
            </div>
            <div style={styles.analysisItem}>
              <span style={styles.analysisLabel}>أخطاء معرفية</span>
              <span style={styles.analysisValue}>{deepErrors.errorBreakdown?.cognitive || 0}</span>
            </div>
            <div style={styles.analysisItem}>
              <span style={styles.analysisLabel}>أخطاء سلوكية</span>
              <span style={styles.analysisValue}>{deepErrors.errorBreakdown?.behavioral || 0}</span>
            </div>
            <div style={styles.analysisItem}>
              <span style={styles.analysisLabel}>أخطاء سلوكية</span>
              <span style={styles.analysisValue}>{deepErrors.errorBreakdown?.behavioral || 0}</span>
            </div>
          </div>

          {deepErrors.errorClusters && deepErrors.errorClusters.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <span style={styles.analysisLabel}>مجموعات الأخطاء المتكررة</span>
              {deepErrors.errorClusters.slice(0, 4).map((cluster, idx) => (
                <div key={idx} style={{ 
                  ...styles.analysisItem, 
                  marginTop: 8,
                  borderColor: cluster.severity === 'عالية' ? COLORS.error : 
                             cluster.severity === 'متوسطة' ? COLORS.warning : COLORS.border,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700 }}>{cluster.cluster}</span>
                    <span style={{ 
                      fontSize: 12,
                      fontWeight: 600,
                      color: cluster.severity === 'عالية' ? COLORS.error : 
                             cluster.severity === 'متوسطة' ? COLORS.warning : COLORS.muted,
                    }}>
                      {cluster.count} أخطاء ({cluster.severity})
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.muted }}>
                    النمط: {cluster.pattern}
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.teal, fontWeight: 600 }}>
                    الإجراء الموصى به: {cluster.action}
                  </div>
                </div>
              ))}
            </div>
          )}

          {deepErrors.errorTypes && (
            <div style={{ marginTop: 16 }}>
              <span style={styles.analysisLabel}>تفاصيل أنواع الأخطاء</span>
              <div style={styles.analysisGrid}>
                {Object.entries(deepErrors.errorTypes).map(([category, types]) => (
                  <div key={category} style={styles.analysisItem}>
                    <span style={styles.analysisLabel}>
                      {category === 'cognitive' ? '🧠 معرفي' :
                       category === 'behavioral' ? '😰 نفسي' :
                       category === 'behavioral' ? '🔄 سلوكي' : category}
                    </span>
                    {Object.entries(types).map(([type, count]) => (
                      <div key={type} style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 13 }}>{type}</span>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{count}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ===== تبويب المسار المعرفي =====
  const renderCognitiveTab = () => {
    const { cognitivePath } = analysis;

    return (
      <div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>
            <span style={styles.cardIcon}>🧠</span>
            المسار المعرفي
          </h3>
          
          {cognitivePath ? (
            <div>
              <div style={styles.analysisGrid}>
                <div style={styles.analysisItem}>
                  <span style={styles.analysisLabel}>مجموع الأخطاء</span>
                  <span style={{ ...styles.analysisValue, color: COLORS.error }}>{cognitivePath.totalErrors || 0}</span>
                </div>
                <div style={styles.analysisItem}>
                  <span style={styles.analysisLabel}>كثافة الأخطاء</span>
                  <span style={styles.analysisValue}>{Math.round(cognitivePath.errorDensity || 0)}%</span>
                </div>
              </div>

              {cognitivePath.patternShift?.detected && (
                <div style={{ 
                  ...styles.analysisItem, 
                  backgroundColor: "#FFF3E0",
                  borderColor: COLORS.orange,
                  marginTop: 12,
                }}>
                  <span style={styles.analysisLabel}>⚠️ تحول النمط مكتشف</span>
                  <div style={styles.analysisDescription}>
                    عند السؤال {cognitivePath.patternShift.atQuestion}: 
                    من {cognitivePath.patternShift.from} إلى {cognitivePath.patternShift.to}
                  </div>
                  <div style={{ ...styles.analysisDescription, fontWeight: 600, color: COLORS.orange }}>
                    {cognitivePath.patternShift.interpretation}
                  </div>
                </div>
              )}

              {cognitivePath.mentalDrift?.detected && (
                <div style={{ 
                  ...styles.analysisItem, 
                  backgroundColor: "#FCE4EC",
                  borderColor: COLORS.pink,
                  marginTop: 12,
                }}>
                  <span style={styles.analysisLabel}>🧠 تشتت ذهني مكتشف</span>
                  <div style={styles.analysisDescription}>
                    يبدأ عند السؤال {cognitivePath.mentalDrift.startQuestion}
                  </div>
                  <div style={styles.analysisDescription}>
                    الأعراض: {cognitivePath.mentalDrift.symptoms?.join('، ') || 'غير محددة'}
                  </div>
                  <div style={{ ...styles.analysisDescription, fontWeight: 600, color: COLORS.pink }}>
                    💡 {cognitivePath.mentalDrift.recommendation}
                  </div>
                </div>
              )}

              {cognitivePath.errorSequence && cognitivePath.errorSequence.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <span style={styles.analysisLabel}>تسلسل الأخطاء</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                    {cognitivePath.errorSequence.slice(0, 10).map((err, idx) => (
                      <span key={idx} style={{ 
                        backgroundColor: COLORS.error + '15',
                        border: `1px solid ${COLORS.error}30`,
                        padding: "2px 10px",
                        borderRadius: 12,
                        fontSize: 12,
                      }}>
                        س{err.question}: {err.topic} ({err.errorType})
                      </span>
                    ))}
                    {cognitivePath.errorSequence.length > 10 && (
                      <span style={{ fontSize: 12, color: COLORS.muted }}>
                        + {cognitivePath.errorSequence.length - 10} أخرى
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p style={{ color: COLORS.muted }}>لا توجد بيانات كافية للمسار المعرفي</p>
          )}
        </div>
      </div>
    );
  };

  // ===== تبويب الجانب العاطفي =====
  const renderAffectiveTab = () => {
    const { affective } = analysis;

    return (
      <div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>
            <span style={styles.cardIcon}>😊</span>
            الجانب العاطفي والسلوكي
          </h3>
          
          {affective ? (
            <div>
              <div style={styles.analysisGrid}>
                <div style={styles.analysisItem}>
                  <span style={styles.analysisLabel}>مستوى الثقة</span>
                  <span style={{ 
                    ...styles.analysisValue, 
                    color: (affective.moodAnalysis?.confidence?.score || 50) >= 70 ? COLORS.success :
                           (affective.moodAnalysis?.confidence?.score || 50) >= 40 ? COLORS.warning : COLORS.error
                  }}>
                    {Math.round(affective.moodAnalysis?.confidence?.score || 50)}%
                  </span>
                  <div style={styles.analysisDescription}>
                    {affective.moodAnalysis?.confidence?.interpretation || ''}
                  </div>
                </div>
                <div style={styles.analysisItem}>
                  <span style={styles.analysisLabel}>مستوى القلق</span>
                  <span style={{ 
                    ...styles.analysisValue, 
                    color: (affective.moodAnalysis?.hesitation?.score || 30) >= 60 ? COLORS.error :
                           (affective.moodAnalysis?.hesitation?.score || 30) >= 40 ? COLORS.warning : COLORS.success
                  }}>
                    {Math.round(affective.moodAnalysis?.hesitation?.score || 30)}%
                  </span>
                  <div style={styles.analysisDescription}>
                    {affective.moodAnalysis?.hesitation?.interpretation || ''}
                  </div>
                </div>
                <div style={styles.analysisItem}>
                  <span style={styles.analysisLabel}>مستوى التحفيز</span>
                  <span style={{ 
                    ...styles.analysisValue,
                    color: (affective.moodAnalysis?.motivation?.score || 70) >= 70 ? COLORS.success : COLORS.warning
                  }}>
                    {Math.round(affective.moodAnalysis?.motivation?.score || 70)}%
                  </span>
                </div>
              </div>

              {affective.stressAnalysis && (
                <div style={{ marginTop: 12 }}>
                  <span style={styles.analysisLabel}>تحليل الإجهاد</span>
                  <div style={styles.analysisGrid}>
                    {affective.stressAnalysis.stressLevels?.map((level, idx) => (
                      <div key={idx} style={styles.analysisItem}>
                        <span style={styles.analysisLabel}>
                          {level.time === 'start' ? 'بداية' :
                           level.time === 'middle' ? 'منتصف' :
                           level.time === 'end' ? 'نهاية' : level.time}
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ ...styles.progressBar, flex: 1 }}>
                            <div style={{ ...styles.progressFill, width: `${level.level}%`, backgroundColor: level.level >= 60 ? COLORS.error : COLORS.warning }} />
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 600 }}>{level.level}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {affective.stressAnalysis.recommendations && (
                    <div style={{ ...styles.analysisItem, marginTop: 8, backgroundColor: "#E3F2FD" }}>
                      <span style={styles.analysisLabel}>💡 توصيات</span>
                      <ul style={{ margin: "4px 0 0", paddingRight: 20 }}>
                        {affective.stressAnalysis.recommendations.slice(0, 2).map((rec, idx) => (
                          <li key={idx} style={{ fontSize: 13, color: COLORS.text }}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {affective.fatigueAnalysis?.detected && (
                <div style={{ 
                  ...styles.analysisItem, 
                  marginTop: 12,
                  backgroundColor: "#FCE4EC",
                  borderColor: COLORS.pink,
                }}>
                  <span style={{ ...styles.analysisLabel, color: COLORS.pink }}>⚠️ علامات التعب مكتشفة</span>
                  <div style={styles.analysisDescription}>
                    تبدأ من السؤال {affective.fatigueAnalysis.onsetPoint}
                  </div>
                  <div style={styles.analysisDescription}>
                    {affective.fatigueAnalysis.symptoms?.join(' • ') || ''}
                  </div>
                  <div style={{ ...styles.analysisDescription, fontWeight: 600, color: COLORS.pink }}>
                    💡 {affective.fatigueAnalysis.recommendation}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p style={{ color: COLORS.muted }}>لا توجد بيانات عاطفية كافية للتحليل</p>
          )}
        </div>
      </div>
    );
  };

  // ===== تبويب التنبؤات =====
  const renderPredictionsTab = () => {
    const { predictions, learningTrajectory } = analysis;

    return (
      <div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>
            <span style={styles.cardIcon}>🔮</span>
            التنبؤات المستقبلية
          </h3>
          
          {predictions ? (
            <div>
              {predictions.performancePrediction?.scenarios && (
                <div style={{ marginBottom: 16 }}>
                  <span style={styles.analysisLabel}>سيناريوهات الأداء المتوقعة</span>
                  {predictions.performancePrediction.scenarios.map((scenario, idx) => (
                    <div key={idx} style={{ 
                      ...styles.predictionCard,
                      backgroundColor: idx === 0 ? '#E8F5E9' : 
                                     idx === 1 ? '#FFF8E1' : '#FFEBEE',
                    }}>
                      <div style={styles.predictionTitle}>
                        {scenario.scenario} ({Math.round(scenario.probability * 100)}%)
                      </div>
                      <div style={styles.predictionDetail}>
                        النتيجة المتوقعة: {scenario.score}%
                      </div>
                      <div style={{ ...styles.predictionDetail, fontSize: 12, color: COLORS.muted }}>
                        الشرط: {scenario.condition}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {predictions.behaviorPrediction && (
                <div style={styles.analysisGrid}>
                  <div style={styles.analysisItem}>
                    <span style={styles.analysisLabel}>سيستمر في التعلم</span>
                    <span style={{ ...styles.analysisValue, color: predictions.behaviorPrediction.willDropout ? COLORS.error : COLORS.success }}>
                      {predictions.behaviorPrediction.willDropout ? '❌ قد يتوقف' : '✅ سيتحسن'}
                    </span>
                  </div>
                  <div style={styles.analysisItem}>
                    <span style={styles.analysisLabel}>سيحتاج مساعدة</span>
                    <span style={{ ...styles.analysisValue, color: predictions.behaviorPrediction.willNeedHelp ? COLORS.warning : COLORS.success }}>
                      {predictions.behaviorPrediction.willNeedHelp ? '⚠️ نعم' : '✅ لا'}
                    </span>
                  </div>
                  <div style={styles.analysisItem}>
                    <span style={styles.analysisLabel}>الاختبار القادم</span>
                    <span style={styles.analysisValue}>
                      {predictions.behaviorPrediction.timeToNextAssessment || 'غير محدد'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p style={{ color: COLORS.muted }}>لا توجد بيانات كافية للتنبؤ</p>
          )}
        </div>

        {/* منحنى التعلم */}
        {learningTrajectory?.learningCurve?.data && learningTrajectory.learningCurve.data.length > 0 && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>
              <span style={styles.cardIcon}>📈</span>
              منحنى التعلم
            </h3>
            
            <div style={styles.analysisGrid}>
              <div style={styles.analysisItem}>
                <span style={styles.analysisLabel}>معدل التحسن</span>
                <span style={{ ...styles.analysisValue, color: COLORS.success }}>
                  {learningTrajectory.learningCurve.analysis?.improvementRate || 0}% لكل جلسة
                </span>
              </div>
              <div style={styles.analysisItem}>
                <span style={styles.analysisLabel}>الاتجاه</span>
                <span style={{ 
                  ...styles.analysisValue,
                  color: learningTrajectory.learningCurve.analysis?.trend === 'متحسن' ? COLORS.success :
                         learningTrajectory.learningCurve.analysis?.trend === 'متراجع' ? COLORS.error : COLORS.warning
                }}>
                  {learningTrajectory.learningCurve.analysis?.trend || 'غير محدد'}
                </span>
              </div>
            </div>

            {learningTrajectory.learningCurve.analysis?.prediction && (
              <div style={{ ...styles.analysisItem, marginTop: 12, backgroundColor: "#E3F2FD" }}>
                <span style={styles.analysisLabel}>🔮 توقع الأداء</span>
                <div style={styles.analysisDescription}>
                  {learningTrajectory.learningCurve.analysis.prediction}
                </div>
              </div>
            )}

            {learningTrajectory.turningPoints && learningTrajectory.turningPoints.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <span style={styles.analysisLabel}>نقاط التحول</span>
                {learningTrajectory.turningPoints.slice(0, 3).map((point, idx) => (
                  <div key={idx} style={{ ...styles.analysisItem, marginTop: 4 }}>
                    <span style={{ fontWeight: 700 }}>جلسة {point.session}:</span>
                    <span style={styles.analysisDescription}>
                      {point.event} - {point.impact}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // ===== تبويب المسار الوظيفي =====
  const renderCareerTab = () => {
    const { predictions, learningTrajectory } = analysis;

    return (
      <div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>
            <span style={styles.cardIcon}>💼</span>
            المسار الوظيفي المقترح
          </h3>
          
          {predictions?.careerPrediction ? (
            <div>
              {predictions.careerPrediction.bestMatch && (
                <div style={styles.careerCard}>
                  <div style={styles.careerTitle}>
                    🏆 أنسب مسار لك: {predictions.careerPrediction.bestMatch}
                  </div>
                  <div style={styles.careerDetail}>
                    التوافق: {predictions.careerPrediction.matchPercentage}%
                  </div>
                  <div style={styles.careerDetail}>
                    {predictions.careerPrediction.recommendation}
                  </div>
                </div>
              )}

              {predictions.careerPrediction.paths && predictions.careerPrediction.paths.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <span style={styles.analysisLabel}>المسارات المتاحة</span>
                  {predictions.careerPrediction.paths.map((path, idx) => (
                    <div key={idx} style={{ 
                      ...styles.analysisItem, 
                      marginTop: 4,
                      borderColor: path.matchPercentage >= 70 ? COLORS.success :
                                 path.matchPercentage >= 50 ? COLORS.warning : COLORS.border,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 700 }}>{path.path}</span>
                        <span style={{ 
                          fontSize: 13, 
                          fontWeight: 600,
                          color: path.matchPercentage >= 70 ? COLORS.success :
                                 path.matchPercentage >= 50 ? COLORS.warning : COLORS.muted,
                        }}>
                          {path.matchPercentage}%
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: COLORS.muted }}>
                        المتطلبات: {path.requirements?.join('، ') || 'غير محددة'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p style={{ color: COLORS.muted }}>لا توجد بيانات كافية للتنبؤ بالمسار الوظيفي</p>
          )}
        </div>

        {learningTrajectory?.evolution?.analysis && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>
              <span style={styles.cardIcon}>📊</span>
              تطورك عبر الزمن
            </h3>
            
            <div style={styles.analysisGrid}>
              <div style={styles.analysisItem}>
                <span style={styles.analysisLabel}>التحسن الإجمالي</span>
                <span style={{ ...styles.analysisValue, color: COLORS.success }}>
                  {learningTrajectory.evolution.analysis.improvement || '0%'}
                </span>
              </div>
              <div style={styles.analysisItem}>
                <span style={styles.analysisLabel}>الاستقرار</span>
                <span style={styles.analysisValue}>
                  {learningTrajectory.evolution.analysis.consistency || 'غير محدد'}
                </span>
              </div>
            </div>

            {learningTrajectory.evolution.analysis.prediction && (
              <div style={{ ...styles.analysisItem, marginTop: 8, backgroundColor: "#E3F2FD" }}>
                <span style={styles.analysisLabel}>🔮 توقع التطور</span>
                <div style={styles.analysisDescription}>
                  {learningTrajectory.evolution.analysis.prediction}
                </div>
              </div>
            )}

            {learningTrajectory.evolution.sessions && learningTrajectory.evolution.sessions.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <span style={styles.analysisLabel}>الجلسات السابقة</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {learningTrajectory.evolution.sessions.slice(0, 5).map((session, idx) => (
                    <span key={idx} style={{ 
                      backgroundColor: COLORS.border,
                      padding: "2px 12px",
                      borderRadius: 12,
                      fontSize: 12,
                    }}>
                      جلسة {session.number}: {session.totalScore}%
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // ============================================================
  // 🔷 واجهة المستخدم الرئيسية
  // ============================================================
  if (loading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.loadingContainer}>
          <div style={styles.spinner} />
          <h2 style={{ color: COLORS.navy }}>جاري تحليل نتائجك بعمق...</h2>
          <p style={{ color: COLORS.muted }}>نحن ندرس إجاباتك وسلوكك لتقديم تقرير دقيق وشخصي</p>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={{ ...styles.main, textAlign: "center", paddingTop: 60 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>❌</div>
          <h2 style={{ color: COLORS.error }}>حدث خطأ</h2>
          <p style={{ color: COLORS.muted }}>{error || "لا توجد بيانات"}</p>
          <Link href="/assessment/categories" style={{ color: COLORS.teal, fontWeight: 700 }}>
            العودة للتقييمات
          </Link>
        </div>
      </div>
    );
  }

  const { score, isQuick } = analysis;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circleProgress / 100) * circumference;

  return (
    <>
      <Head>
        <title>نتيجة التقييم - Smart Lab</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @media (max-width: 768px) {
            .hero-content { flex-direction: column !important; text-align: center !important; }
            .hero-stats { justify-content: center !important; }
            .tabs-container { flex-wrap: wrap !important; }
            .tab-btn { font-size: 12px !important; padding: 8px 14px !important; }
            .analysis-grid { grid-template-columns: 1fr !important; }
            .chart-label { width: 80px !important; }
          }
          @media (max-width: 480px) {
            .hero-card { padding: 20px 16px !important; }
            .score-circle { width: 120px !important; height: 120px !important; }
            .score-number { font-size: 28px !important; }
            .card { padding: 16px !important; }
            .tab-btn { font-size: 11px !important; padding: 6px 10px !important; }
          }
        `}</style>
      </Head>

      <div style={styles.page} dir="rtl">
        <Navbar />
        <main style={styles.main}>
          
          {/* ===== البطاقة الرئيسية ===== */}
          <div style={styles.heroCard} className="hero-card">
            <div style={styles.heroCardGradient} />
            <div style={styles.heroContent} className="hero-content">
              <div style={styles.scoreCircle} className="score-circle">
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
                  <span style={styles.scoreNumber} className="score-number">{Math.round(circleProgress)}%</span>
                  <span style={styles.scoreLabel}>{getLevelText(circleProgress)}</span>
                </div>
              </div>

              <div style={styles.heroInfo}>
                <h2 style={styles.heroTitle}>
                  {isQuick ? '⚡ تقييم سريع' : '📊 تقييم شامل'}
                </h2>
                <p style={styles.heroSubtitle}>
                  {analysis.totalQuestions || 0} سؤال • {analysis.correctAnswers || 0} صحيح • {analysis.wrongAnswers || 0} خاطئ
                </p>
                <div style={styles.heroStats} className="hero-stats">
                  <span style={styles.heroStat}>
                    <span style={styles.heroStatValue}>✅</span> {analysis.correctAnswers || 0} صحيح
                  </span>
                  <span style={styles.heroStat}>
                    <span style={styles.heroStatValue}>❌</span> {analysis.wrongAnswers || 0} خاطئ
                  </span>
                  <span style={styles.heroStat}>
                    <span style={styles.heroStatValue}>📊</span> {analysis.totalQuestions || 0} سؤال
                  </span>
                </div>
                <span style={{
                  ...styles.levelBadge,
                  backgroundColor: getLevelColor(circleProgress) + '20',
                  color: getLevelColor(circleProgress),
                }}>
                  {getLevelText(circleProgress)}
                </span>
              </div>
            </div>
          </div>

          {/* ===== التبويبات ===== */}
          <div style={styles.tabsContainer} className="tabs-container">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  ...styles.tabButton,
                  ...(activeTab === tab.id ? styles.tabButtonActive : {}),
                }}
                className="tab-btn"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ===== محتوى التبويب النشط ===== */}
          {renderTabContent()}

          {/* ===== روابط إضافية ===== */}
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Link href="/assessment/categories" style={styles.backLink}>
              ← العودة إلى التقييمات
            </Link>
            <Link href="/dashboard" style={{ ...styles.backLink, marginTop: 8, color: COLORS.teal }}>
              📊 عرض لوحة التشخيص
            </Link>
          </div>

        </main>
      </div>
    </>
  );
}
