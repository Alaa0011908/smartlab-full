// pages/dashboard.js
// ============================================================
// 📊 لوحة التشخيص الرئيسية - Main Dashboard v3.0
// تعرض نظرة شاملة على تطور الطالب عبر الزمن
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
  pageHeader: {
    marginBottom: 32,
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: 800,
    color: COLORS.navy,
    margin: "0 0 8px",
  },
  pageSubtitle: {
    fontSize: 16,
    color: COLORS.muted,
    margin: 0,
    lineHeight: 1.7,
  },

  // ===== البطاقات =====
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

  // ===== الشبكات =====
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 12,
  },

  // ===== عناصر =====
  statItem: {
    padding: "14px 18px",
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
    border: `1px solid ${COLORS.border}`,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: COLORS.muted,
    display: "block",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 700,
    color: COLORS.text,
  },
  statChange: {
    fontSize: 13,
    fontWeight: 600,
    marginRight: 8,
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
    width: 100,
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

  // ===== منحنى التطور =====
  timelineContainer: {
    display: "flex",
    alignItems: "flex-end",
    gap: 8,
    height: 140,
    paddingTop: 10,
    overflowX: "auto",
  },
  timelineBar: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    minWidth: 40,
  },
  barFill: {
    width: "100%",
    borderRadius: "4px 4px 0 0",
    transition: "height 0.5s ease",
    minHeight: 8,
  },
  barLabel: {
    fontSize: 10,
    color: COLORS.muted,
    textAlign: "center",
  },
  barValue: {
    fontSize: 11,
    fontWeight: 700,
    color: COLORS.text,
  },

  // ===== المهارات =====
  skillTag: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600,
    margin: "4px",
  },
  weakTag: {
    backgroundColor: "#FFEBEE",
    color: "#C62828",
  },
  strongTag: {
    backgroundColor: "#E8F5E9",
    color: "#2E7D32",
  },
  mediumTag: {
    backgroundColor: "#FFF8E1",
    color: "#E65100",
  },

  // ===== أزرار =====
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 16,
  },
  primaryButton: {
    display: "inline-block",
    backgroundColor: COLORS.teal,
    color: COLORS.white,
    border: "none",
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
  outlineButton: {
    display: "inline-block",
    backgroundColor: "transparent",
    color: COLORS.navy,
    border: `2px solid ${COLORS.border}`,
    borderRadius: 12,
    padding: "10px 28px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
    minWidth: 140,
    transition: "all 0.25s ease",
  },

  // ===== فارغ =====
  emptyContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: "60px 40px 70px",
    textAlign: "center",
    boxShadow: "0 6px 24px rgba(13,30,59,0.06)",
  },
  emptyIcon: {
    fontSize: 72,
    marginBottom: 24,
    display: "block",
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: COLORS.navy,
    margin: "0 0 16px",
  },
  emptyDesc: {
    fontSize: 17,
    color: COLORS.muted,
    lineHeight: 1.8,
    maxWidth: 520,
    margin: "0 auto 32px",
  },
  emptyButton: {
    backgroundColor: COLORS.teal,
    color: COLORS.white,
    border: "none",
    borderRadius: 12,
    padding: "14px 40px",
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    transition: "all 0.25s ease",
  },

  // ===== الرد =====
  '@media (max-width: 768px)': {
    grid: { gridTemplateColumns: "1fr" },
    grid3: { gridTemplateColumns: "1fr 1fr" },
    pageTitle: { fontSize: 28 },
    card: { padding: "16px" },
    timelineBar: { minWidth: 30 },
    chartLabel: { width: 80 },
    emptyContainer: { padding: "30px 20px" },
    emptyTitle: { fontSize: 22 },
    buttonGroup: { flexDirection: "column", alignItems: "center" },
    primaryButton: { width: "100%" },
    outlineButton: { width: "100%" },
  },
  '@media (max-width: 480px)': {
    grid3: { gridTemplateColumns: "1fr" },
    pageTitle: { fontSize: 24 },
    statValue: { fontSize: 17 },
    card: { padding: "14px" },
    timelineBar: { minWidth: 25 },
    barLabel: { fontSize: 8 },
    barValue: { fontSize: 9 },
  },
};

// ============================================================
// 🎯 المكون الرئيسي
// ============================================================
export default function Dashboard() {
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [latestAnalysis, setLatestAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    try {
      // قراءة النتائج
      const saved = localStorage.getItem("assessmentResults");
      if (saved) {
        const parsed = JSON.parse(saved);
        const sorted = parsed.sort((a, b) => new Date(b.date) - new Date(a.date));
        setResults(sorted);
      }

      // قراءة آخر تحليل
      const analysis = localStorage.getItem("latestAnalysis");
      if (analysis) {
        const parsed = JSON.parse(analysis);
        setLatestAnalysis(parsed);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ============================================================
  // 🔷 دوال مساعدة
  // ============================================================
  const getStatusBadge = (score) => {
    if (score >= 70) return { label: "✅ ممتاز", color: COLORS.success };
    if (score >= 50) return { label: "⚠️ متوسط", color: COLORS.warning };
    return { label: "❌ يحتاج تحسين", color: COLORS.error };
  };

  const getCircleColor = (pct) => {
    if (pct >= 70) return COLORS.success;
    if (pct >= 50) return COLORS.warning;
    return COLORS.error;
  };

  const getLevelText = (pct) => {
    if (pct >= 80) return 'متقدم 🏆';
    if (pct >= 65) return 'جيد جداً 🌟';
    if (pct >= 50) return 'متوسط 📈';
    if (pct >= 35) return 'مبتدئ 📚';
    return 'أساسي 🌱';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ============================================================
  // 🔷 حساب الإحصائيات
  // ============================================================
  const totalAssessments = results.length;
  const latestScore = results.length > 0 ? results[0].score : 0;
  
  // متوسط الدرجات
  const averageScore = results.length > 0 
    ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)
    : 0;

  // التحسن بين أول وآخر تقييم
  const improvement = results.length >= 2 
    ? results[0].score - results[results.length - 1].score
    : 0;

  // توزيع المستويات
  const levels = {
    excellent: results.filter(r => r.score >= 80).length,
    good: results.filter(r => r.score >= 65 && r.score < 80).length,
    average: results.filter(r => r.score >= 50 && r.score < 65).length,
    poor: results.filter(r => r.score < 50).length,
  };

  // أحدث تحليل للمهارات
  const getSkillStats = () => {
    if (!latestAnalysis) return null;
    
    let skills = [];
    if (latestAnalysis.flatSkills) {
      skills = latestAnalysis.flatSkills;
    } else if (latestAnalysis.masteryResults) {
      skills = latestAnalysis.masteryResults;
    } else if (latestAnalysis.weakestSkills) {
      skills = latestAnalysis.weakestSkills.map(s => ({ 
        ...s, 
        percentage: s.percentage || 0,
        name: s.name || 'غير محدد'
      }));
    }

    if (skills.length === 0) return null;

    return {
      mastered: skills.filter(s => s.percentage >= 70).length,
      learning: skills.filter(s => s.percentage >= 40 && s.percentage < 70).length,
      weak: skills.filter(s => s.percentage < 40).length,
      total: skills.length,
      strongest: skills.filter(s => s.percentage >= 70).sort((a, b) => b.percentage - a.percentage).slice(0, 3),
      weakest: skills.filter(s => s.percentage < 50).sort((a, b) => a.percentage - b.percentage).slice(0, 3),
    };
  };

  const skillStats = getSkillStats();

  // ============================================================
  // 🔷 عرض المحتوى
  // ============================================================
  if (loading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={{ ...styles.main, textAlign: "center", paddingTop: 60 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
          <h2 style={{ color: COLORS.navy }}>جاري تحميل البيانات...</h2>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div style={styles.page}>
        <Navbar />
        <main style={styles.main}>
          <div style={styles.emptyContainer}>
            <span style={styles.emptyIcon}>📋</span>
            <h2 style={styles.emptyTitle}>لا يوجد نتائج تقييم حتى الآن</h2>
            <p style={styles.emptyDesc}>
              لم تكمل أي تقييم بعد. ابدأ تقييمك الأول الآن لتحصل على تقرير مفصل 
              يوضح نقاط قوتك ومجالات التحسين.
            </p>
            <Link href="/assessment/categories" style={styles.emptyButton}>
              🚀 ابدأ تقييمك الجديد
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ============================================================
  // 🔷 واجهة المستخدم الرئيسية
  // ============================================================
  return (
    <>
      <Head>
        <title>لوحة التشخيص - Smart Lab</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.5" />
      </Head>

      <div style={styles.page} dir="rtl">
        <Navbar />

        <main style={styles.main}>
          {/* ===== العنوان ===== */}
          <div style={styles.pageHeader}>
            <h1 style={styles.pageTitle}>📊 لوحة التشخيص</h1>
            <p style={styles.pageSubtitle}>
              يعرض هذا القسم تقريراً تفصيلياً لأدائك عبر جميع التقييمات، مع تتبع تطورك عبر الزمن.
            </p>
          </div>

          {/* ===== الإحصائيات العامة ===== */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>
              <span style={styles.cardIcon}>📈</span>
              نظرة عامة على أدائك
            </h3>
            <div style={styles.grid}>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>عدد التقييمات</span>
                <span style={styles.statValue}>{totalAssessments}</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>أحدث نتيجة</span>
                <span style={{ ...styles.statValue, color: getCircleColor(latestScore) }}>
                  {latestScore}%
                </span>
                <span style={styles.statLabel}>{getLevelText(latestScore)}</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>متوسط الدرجات</span>
                <span style={{ ...styles.statValue, color: getCircleColor(averageScore) }}>
                  {averageScore}%
                </span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>التحسن</span>
                <span style={{ 
                  ...styles.statValue, 
                  color: improvement >= 0 ? COLORS.success : COLORS.error 
                }}>
                  {improvement >= 0 ? '📈' : '📉'} {Math.abs(improvement)}%
                </span>
              </div>
            </div>
          </div>

          {/* ===== توزيع المستويات ===== */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>
              <span style={styles.cardIcon}>🏅</span>
              توزيع مستويات الأداء
            </h3>
            <div style={styles.grid3}>
              <div style={{ ...styles.statItem, borderColor: COLORS.success }}>
                <span style={styles.statLabel}>ممتاز (≥80%)</span>
                <span style={{ ...styles.statValue, color: COLORS.success }}>{levels.excellent}</span>
              </div>
              <div style={{ ...styles.statItem, borderColor: COLORS.success }}>
                <span style={styles.statLabel}>جيد جداً (65-80%)</span>
                <span style={{ ...styles.statValue, color: COLORS.success }}>{levels.good}</span>
              </div>
              <div style={{ ...styles.statItem, borderColor: COLORS.warning }}>
                <span style={styles.statLabel}>متوسط (50-65%)</span>
                <span style={{ ...styles.statValue, color: COLORS.warning }}>{levels.average}</span>
              </div>
              <div style={{ ...styles.statItem, borderColor: COLORS.error }}>
                <span style={styles.statLabel}>يحتاج تحسين (&lt;50%)</span>
                <span style={{ ...styles.statValue, color: COLORS.error }}>{levels.poor}</span>
              </div>
            </div>
          </div>

          {/* ===== منحنى التطور ===== */}
          {results.length > 1 && (
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>
                <span style={styles.cardIcon}>📉</span>
                منحنى التطور عبر الزمن
              </h3>
              <div style={styles.timelineContainer}>
                {results.slice().reverse().map((result, index) => {
                  const height = Math.max(15, (result.score / 100) * 120);
                  const color = getCircleColor(result.score);
                  const date = new Date(result.date);
                  const label = `${date.getDate()}/${date.getMonth()+1}`;
                  
                  return (
                    <div key={index} style={styles.timelineBar}>
                      <span style={styles.barValue}>{result.score}%</span>
                      <div style={{ 
                        ...styles.barFill, 
                        height: `${height}px`,
                        backgroundColor: color,
                      }} />
                      <span style={styles.barLabel}>{label}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                fontSize: 11,
                color: COLORS.muted,
                marginTop: 8,
              }}>
                <span>🟢 ممتاز (≥70%)</span>
                <span>🟡 متوسط (50-70%)</span>
                <span>🔴 يحتاج تحسين (&lt;50%)</span>
              </div>
            </div>
          )}

          {/* ===== ملخص المهارات ===== */}
          {skillStats && latestAnalysis && (
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>
                <span style={styles.cardIcon}>🧠</span>
                ملخص المهارات (آخر تحليل)
              </h3>
              
              <div style={styles.grid3}>
                <div style={{ ...styles.statItem, borderColor: COLORS.success }}>
                  <span style={styles.statLabel}>✅ متقن (≥70%)</span>
                  <span style={{ ...styles.statValue, color: COLORS.success }}>{skillStats.mastered}</span>
                </div>
                <div style={{ ...styles.statItem, borderColor: COLORS.warning }}>
                  <span style={styles.statLabel}>⏳ قيد التعلم (40-70%)</span>
                  <span style={{ ...styles.statValue, color: COLORS.warning }}>{skillStats.learning}</span>
                </div>
                <div style={{ ...styles.statItem, borderColor: COLORS.error }}>
                  <span style={styles.statLabel}>❌ يحتاج تحسين (&lt;40%)</span>
                  <span style={{ ...styles.statValue, color: COLORS.error }}>{skillStats.weak}</span>
                </div>
              </div>

              {/* أقوى المهارات */}
              {skillStats.strongest && skillStats.strongest.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <span style={{ fontWeight: 600, color: COLORS.success }}>💪 أقوى المهارات: </span>
                  {skillStats.strongest.slice(0, 3).map((s, i) => (
                    <span key={i} style={{ ...styles.skillTag, ...styles.strongTag }}>
                      {s.name} ({s.percentage}%)
                    </span>
                  ))}
                </div>
              )}

              {/* أضعف المهارات */}
              {skillStats.weakest && skillStats.weakest.length > 0 && (
                <div style={{ marginTop: 6 }}>
                  <span style={{ fontWeight: 600, color: COLORS.error }}>📌 أضعف المهارات: </span>
                  {skillStats.weakest.slice(0, 3).map((s, i) => (
                    <span key={i} style={{ ...styles.skillTag, ...styles.weakTag }}>
                      {s.name} ({s.percentage}%)
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== التوصية الوظيفية ===== */}
          {latestAnalysis?.predictions?.careerPrediction?.bestMatch && (
            <div style={{ 
              ...styles.card, 
              backgroundColor: "#E3F2FD",
              border: "1px solid #90CAF9",
            }}>
              <h3 style={{ ...styles.cardTitle, color: "#0D47A1" }}>
                <span style={styles.cardIcon}>🧭</span>
                المسار الوظيفي المناسب لك
              </h3>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0D47A1" }}>
                {latestAnalysis.predictions.careerPrediction.bestMatch}
              </div>
              <div style={{ fontSize: 14, color: "#333", marginTop: 4 }}>
                التوافق: {latestAnalysis.predictions.careerPrediction.matchPercentage}%
              </div>
              <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 4 }}>
                {latestAnalysis.predictions.careerPrediction.recommendation}
              </div>
            </div>
          )}

          {/* ===== آخر التقييمات ===== */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>
              <span style={styles.cardIcon}>📋</span>
              آخر التقييمات
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {results.slice(0, 5).map((result, index) => {
                const status = getStatusBadge(result.score);
                return (
                  <div key={index} style={{ 
                    ...styles.statItem,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 8,
                  }}>
                    <div>
                      <span style={{ fontWeight: 600 }}>{result.assessmentName || "تقييم"}</span>
                      {result.mode === "quick" && (
                        <span style={{ 
                          fontSize: 11, 
                          backgroundColor: "#FFF8E1", 
                          color: "#E65100",
                          padding: "2px 8px",
                          borderRadius: 10,
                          marginRight: 8,
                        }}>⚡ سريع</span>
                      )}
                      <div style={{ fontSize: 12, color: COLORS.muted }}>
                        {formatDate(result.date)}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 20, fontWeight: 800, color: getCircleColor(result.score) }}>
                        {result.score}%
                      </span>
                      <span style={{ 
                        fontSize: 12, 
                        fontWeight: 600, 
                        color: status.color,
                        backgroundColor: status.color + "20",
                        padding: "2px 10px",
                        borderRadius: 10,
                      }}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===== أزرار الإجراءات ===== */}
          <div style={styles.buttonGroup}>
            <Link href="/course" style={styles.primaryButton}>
              📚 اذهب إلى كورسك المخصص
            </Link>
            <Link href="/scenarios" style={{ ...styles.primaryButton, backgroundColor: COLORS.orange }}>
              🎭 جرّب محاكي العميل
            </Link>
            <Link href="/assessment/categories" style={styles.outlineButton}>
              📝 تقييم جديد
            </Link>
          </div>

        </main>

        <Footer />
      </div>
    </>
  );
}
