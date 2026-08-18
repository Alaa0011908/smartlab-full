// pages/result.js
// ============================================================
// 📊 صفحة عرض النتيجة الديناميكية - النسخة المتطورة
// تعرض التحليل الكامل: البصمة المعرفية، شجرة المهارات، 
// الأسباب الجذرية، الخطة العلاجية، والتأثير المستقبلي
// ============================================================

import React, { useState, useEffect } from 'react';
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
    padding: "40px 20px 60px",
  },
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

  // === البطاقات التشخيصية ===
  diagnosticCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: '24px',
    border: '2px solid #FFE082',
    marginBottom: 20,
    textAlign: 'right',
  },
  diagnosticTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: '#E65100',
    margin: '0 0 12px',
  },
  diagnosticRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
    fontSize: 15,
    lineHeight: 1.7,
  },
  diagnosticIcon: { flexShrink: 0, fontSize: 18, marginTop: 2 },

  // === الخطة العلاجية ===
  planCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: '24px',
    border: '2px solid #A5D6A7',
    marginBottom: 20,
    textAlign: 'right',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: '#2E7D32',
    margin: '0 0 12px',
  },
  planItem: {
    fontSize: 14,
    color: '#333',
    lineHeight: 1.8,
    marginBottom: 4,
    paddingRight: 16,
  },

  // === شجرة المهارات ===
  treeCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    padding: '24px',
    border: '2px solid #90CAF9',
    marginBottom: 20,
    textAlign: 'right',
  },
  treeTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: '#0D47A1',
    margin: '0 0 12px',
  },

  // === بطاقة المهارة الضعيفة ===
  weakSkillCard: {
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: '16px',
    border: '1px solid #FFCDD2',
    marginBottom: 12,
  },
  weakSkillTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#C62828',
  },
  weakSkillDetail: {
    fontSize: 14,
    color: '#333',
    lineHeight: 1.7,
    marginTop: 4,
  },
  weakSkillLabel: { fontWeight: 700, color: '#555' },

  // === الأزرار ===
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 24,
  },
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
  videoLink: {
    display: 'inline-block',
    backgroundColor: '#FF0000',
    color: 'white',
    padding: '6px 16px',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 700,
    marginTop: 6,
    fontSize: 13,
  },
  backLink: {
    color: COLORS.muted,
    fontSize: 14,
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    marginTop: 20,
  },
  loadingContainer: { textAlign: "center", padding: "100px 0" },
  reportContainer: {
    backgroundColor: '#f0f4f8',
    padding: '20px 24px',
    borderRadius: 16,
    marginBottom: 20,
    border: '1px solid #dde4ec',
    textAlign: 'right',
    lineHeight: 1.9,
    fontSize: 15,
    color: '#1a2332',
    whiteSpace: 'pre-wrap'
  },
  reportTitle: {
    fontSize: 17,
    fontWeight: 800,
    color: COLORS.navy,
    marginBottom: 12,
  },
  confidenceBadge: {
    display: 'inline-block',
    padding: '4px 14px',
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 700,
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
  const [aiReport, setAiReport] = useState(null);
  const [showFullDetails, setShowFullDetails] = useState(true);

  // ============================================================
  // 🔷 جلب وتحليل النتائج
  // ============================================================
  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const { 
          answers, questions, assessmentId, timePerQuestion, 
          eventsLog, theta, answeredIds, mode, quickResult 
        } = router.query;

        if (!answers || !assessmentId) {
          setError("لا توجد بيانات لعرض النتيجة");
          setLoading(false);
          return;
        }

        // التعامل مع التقييم السريع
        if (quickResult) {
          const quickData = JSON.parse(quickResult);
          setAnalysis({
            isQuick: true,
            score: quickData.score,
            totalQuestions: quickData.total,
            correctAnswers: quickData.correct,
            wrongAnswers: quickData.wrong,
            cognitiveProfile: { 
              style: '⚡ تقييم سريع', 
              description: 'هذا تقييم سريع. يُوصى بإجراء التقييم الشامل للحصول على تحليل دقيق.',
              confidenceLevel: 'متوسطة'
            },
            skillTree: {},
            weakestSkills: [],
            fallbackReport: quickData.score >= 70 
              ? '🎉 أداء جيد في التقييم السريع! ننصح بإجراء التقييم الشامل للحصول على تحليل دقيق لجميع مهاراتك.'
              : '📚 يحتاج إلى تحسين. ننصح بإجراء التقييم الشامل لتحديد نقاط الضعف بدقة.',
          });
          setTimeout(() => setCircleProgress(quickData.score), 300);
          setLoading(false);
          return;
        }

        // التقييم الشامل
        const parsedAnswers = JSON.parse(answers);
        const parsedQuestions = JSON.parse(questions || "[]");
        const timeData = JSON.parse(timePerQuestion || "[]");
        const eventsData = JSON.parse(eventsLog || "[]");
        const thetaData = JSON.parse(theta || "0");
        const answeredIdsData = JSON.parse(answeredIds || "[]");

        // استدعاء API التحليل
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
          }),
        });

        if (!response.ok) throw new Error("فشل في تحليل النتائج");

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
        });
        localStorage.setItem("assessmentResults", JSON.stringify(savedResults));
        localStorage.setItem("latestAnalysis", JSON.stringify(data));

        // محاولة جلب تقرير AI ودود (اختياري)
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
          console.log("AI Report غير متاح، استخدام النص الاحتياطي");
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
  // 🔷 حالات التحميل والخطأ
  // ============================================================
  if (loading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.loadingContainer}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
          <h2 style={{ color: COLORS.navy }}>جاري تحليل نتائجك بعمق...</h2>
          <p style={{ color: COLORS.muted }}>نحن ندرس إجاباتك وسلوكك لتقديم تقرير دقيق وشخصي</p>
          <div style={{ marginTop: 20 }}>
            <div style={{ 
              width: 48, 
              height: 48, 
              border: `4px solid ${COLORS.border}`, 
              borderTop: `4px solid ${COLORS.teal}`, 
              borderRadius: "50%", 
              animation: "spin 1s linear infinite",
              margin: "0 auto"
            }} />
          </div>
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

  // ============================================================
  // 🔷 استخراج البيانات
  // ============================================================
  const {
    score, totalQuestions, correctAnswers, wrongAnswers,
    cognitiveProfile, skillTree, weakestSkills, fallbackReport,
    isQuick, confidence, cognitiveStyle, level
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

  const getConfidenceColor = (level) => {
    if (level === 'عالية جداً' || level === 'عالية') return COLORS.success;
    if (level === 'متوسطة') return COLORS.warning;
    return COLORS.error;
  };

  // ============================================================
  // 🔷 واجهة العرض
  // ============================================================
  return (
    <>
      <Head>
        <title>نتيجة التقييم - Smart Lab</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={styles.page} dir="rtl">
        <Navbar />
        <main style={styles.main}>
          
          {/* ===== البطاقة الرئيسية ===== */}
          <div style={styles.heroCard}>
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

            <h2 style={{ fontSize: 20, fontWeight: 800, color: COLORS.navy }}>
              {isQuick ? '⚡ تقييم سريع' : '📊 التقييم الشامل'}
            </h2>
            <p style={{ fontSize: 14, color: COLORS.muted }}>
              {correctAnswers || 0} صحيح من {totalQuestions || 0} أسئلة
            </p>
            {level && level.label && (
              <div style={{ 
                marginTop: 12, 
                display: 'inline-block',
                padding: '4px 20px',
                borderRadius: 20,
                backgroundColor: getCircleColor(circleProgress) + '22',
                border: `1px solid ${getCircleColor(circleProgress)}`,
                fontSize: 14,
                fontWeight: 700,
                color: getCircleColor(circleProgress)
              }}>
                {level.emoji} {level.label}
              </div>
            )}
          </div>

          {/* ===== البصمة المعرفية والثقة ===== */}
          {(cognitiveProfile || confidence || cognitiveStyle) && (
            <div style={styles.diagnosticCard}>
              <h3 style={styles.diagnosticTitle}>🧠 بصمتك المعرفية</h3>
              
              {cognitiveProfile?.style && (
                <div style={styles.diagnosticRow}>
                  <span style={styles.diagnosticIcon}>🎯</span>
                  <span><strong>أسلوبك:</strong> {cognitiveProfile.style}</span>
                </div>
              )}
              
              {cognitiveProfile?.description && (
                <div style={styles.diagnosticRow}>
                  <span style={styles.diagnosticIcon}>📝</span>
                  <span>{cognitiveProfile.description}</span>
                </div>
              )}

              {confidence && (
                <div style={styles.diagnosticRow}>
                  <span style={styles.diagnosticIcon}>✅</span>
                  <span>
                    <strong>مستوى الثقة في التقدير:</strong>{' '}
                    <span style={{
                      backgroundColor: getConfidenceColor(confidence.confidenceLevel),
                      color: 'white',
                      padding: '2px 12px',
                      borderRadius: 12,
                      fontSize: 13,
                      fontWeight: 700,
                    }}>
                      {confidence.confidenceLevel}
                    </span>
                    {confidence.confidenceDescription && (
                      <span style={{ marginRight: 8, fontSize: 13, color: '#666' }}>
                        ({confidence.confidenceDescription})
                      </span>
                    )}
                  </span>
                </div>
              )}

              {cognitiveProfile?.speedIndex && (
                <div style={styles.diagnosticRow}>
                  <span style={styles.diagnosticIcon}>⏱️</span>
                  <span><strong>سرعة الأداء:</strong> {cognitiveProfile.speedIndex}</span>
                </div>
              )}

              {cognitiveProfile?.hesitationIndex !== undefined && (
                <div style={styles.diagnosticRow}>
                  <span style={styles.diagnosticIcon}>🔄</span>
                  <span><strong>مؤشر التردد:</strong> {Math.round(cognitiveProfile.hesitationIndex * 100)}%</span>
                </div>
              )}
            </div>
          )}

          {/* ===== التقرير الجميل ===== */}
          {(aiReport || fallbackReport) && (
            <div style={styles.reportContainer}>
              <h3 style={styles.reportTitle}>
                {aiReport ? '🤖 تحليل ذكي مخصص' : '📋 ملخص تحليلك'}
              </h3>
              {aiReport || fallbackReport}
            </div>
          )}

          {/* ===== أضعف المهارات ===== */}
          {weakestSkills && weakestSkills.length > 0 && (
            <div style={styles.diagnosticCard}>
              <h3 style={styles.diagnosticTitle}>🔍 أضعف المهارات (تحليل الأسباب الجذرية)</h3>
              <p style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>
                هذه هي المجالات التي تحتاج إلى تركيز أكبر. تم تحديد السبب الجذري والتأثير المستقبلي لكل منها.
              </p>
              {weakestSkills.map((skill, idx) => (
                <div key={idx} style={styles.weakSkillCard}>
                  <div style={styles.weakSkillTitle}>
                    {idx + 1}. {skill.name} ({skill.percentage}%)
                  </div>
                  <div style={styles.weakSkillDetail}>
                    <span style={styles.weakSkillLabel}>🧩 السبب الجذري:</span> {skill.rootCause || 'غير محدد'}
                  </div>
                  <div style={styles.weakSkillDetail}>
                    <span style={styles.weakSkillLabel}>📉 التأثير على المستقبل:</span> {skill.futureImpact || 'سيؤثر على فهمك للموضوعات المتقدمة'}
                  </div>
                  {skill.remediationVideoQuery && (
                    <div style={{ marginTop: 6 }}>
                      <a 
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(skill.remediationVideoQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.videoLink}
                      >
                        ▶ شاهد شرحاً لهذه الثغرة
                      </a>
                    </div>
                  )}
                  {skill.errorPattern && (
                    <div style={{ ...styles.weakSkillDetail, fontSize: 13, color: '#888' }}>
                      <span style={styles.weakSkillLabel}>📌 نمط الخطأ:</span> {skill.errorPattern}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ===== شجرة المهارات ===== */}
          {skillTree && Object.keys(skillTree).length > 0 && (
            <div style={styles.treeCard}>
              <h3 style={styles.treeTitle}>🌳 خريطة مهاراتك (شجرة التعلم التفاعلية)</h3>
              <p style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>
                🟢 متقن (≥70%) | 🟡 قيد التعلم (30-70%) | 🔴 ضعيف (&lt;30%)
              </p>
              <SkillTree treeData={skillTree} />
            </div>
          )}

          {/* ===== الخطة العلاجية ===== */}
          {weakestSkills && weakestSkills.length > 0 && (
            <div style={styles.planCard}>
              <h3 style={styles.planTitle}>📝 خطتك العلاجية المقترحة</h3>
              <div style={styles.planItem}>
                <strong>🎯 الهدف:</strong> معالجة الثغرات في {weakestSkills.map(s => s.name).join('، ')}
              </div>
              <div style={styles.planItem}>
                <strong>⏱️ الوقت المقترح:</strong> {Math.max(15, weakestSkills.length * 15)} دقيقة يومياً
              </div>
              <div style={styles.planItem}>
                <strong>📚 الخطوات المقترحة:</strong>
                <ul style={{ marginTop: 6, paddingRight: 20 }}>
                  {weakestSkills.slice(0, 3).map((s, i) => (
                    <li key={i}>
                      <strong>{s.name}:</strong> {s.rootCause || 'راجع الأساسيات'} 
                      {s.remediationVideoQuery && ` (شاهد: "${s.remediationVideoQuery}")`}
                    </li>
                  ))}
                  <li>حل 5-10 تمارين تطبيقية على كل مفهوم ضعيف</li>
                  <li>عد إلى التقييم واختبر نفسك مرة أخرى بعد أسبوع</li>
                </ul>
              </div>
              <div style={styles.planItem}>
                <strong>📊 توقع التحسن:</strong> مع الالتزام بالخطة، يمكنك رفع مستواك بنسبة 15-25% في غضون أسبوعين.
              </div>
            </div>
          )}

          {/* ===== أزرار الإجراءات ===== */}
          <div style={styles.buttonGroup}>
            <Link href="/course" style={styles.courseButton}>
              🚀 ابدأ كورسك المخصص
            </Link>
            <Link href={getScenarioLink()} style={styles.scenarioButton}>
              🎭 جرّب محاكي العميل
            </Link>
            {isQuick && (
              <Link href={`/assessment/${router.query.assessmentId}?mode=full`} style={{ 
                ...styles.courseButton, 
                backgroundColor: COLORS.teal,
                minWidth: 140
              }}>
                📊 تقييم شامل
              </Link>
            )}
          </div>

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
