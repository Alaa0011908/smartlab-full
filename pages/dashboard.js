// pages/dashboard.js
import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const COLORS = {
  teal: "#17919e",
  tealDark: "#127a86",
  orange: "#F39C12",
  navy: "#0D1E3B",
  bg: "#f8f9fa",
  white: "#ffffff",
  text: "#0D1E3B",
  muted: "#5b6b7b",
  lightGray: "#f8f9fa",
  border: "#e6ecf1",
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
    padding: "40px 16px 60px",
  },
  pageHeader: {
    marginBottom: 40,
  },
  pageTitle: {
    fontSize: 38,
    fontWeight: 800,
    color: COLORS.navy,
    margin: "0 0 8px",
  },
  pageSubtitle: {
    fontSize: 17,
    color: COLORS.muted,
    margin: 0,
    lineHeight: 1.7,
  },
  emptyContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: "40px 20px 50px",
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
    transition: "background-color 0.25s ease, transform 0.25s ease",
    textDecoration: "none",
    display: "inline-block",
    minHeight: 52,
    textAlign: "center",
  },
  resultsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: "40px",
    boxShadow: "0 6px 24px rgba(13,30,59,0.06)",
  },
  resultsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20,
    marginTop: 24,
  },
  resultCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 16,
    padding: "24px",
    border: "1px solid " + COLORS.border,
  },
  resultCardTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.navy,
    margin: "0 0 6px",
  },
  resultCardScore: {
    fontSize: 32,
    fontWeight: 800,
    color: COLORS.teal,
    margin: "0 0 4px",
  },
  resultCardDate: {
    fontSize: 13,
    color: COLORS.muted,
    margin: 0,
  },
  resultCardStatus: {
    display: "inline-block",
    padding: "2px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    marginTop: 8,
  },
};

export default function Dashboard() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    try {
      const saved = localStorage.getItem("assessmentResults");
      if (saved) {
        const parsed = JSON.parse(saved);
        const sorted = parsed.sort((a, b) => new Date(b.date) - new Date(a.date));
        setResults(sorted);
      }
    } catch (error) {
      console.error("Error loading results:", error);
    } finally {
      setLoading(false);
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getStatusBadge = (score) => {
    if (score >= 70) return { label: "✅ ممتاز", color: "#2ECC71" };
    if (score >= 50) return { label: "⚠️ متوسط", color: "#F39C12" };
    return { label: "❌ يحتاج تحسين", color: "#E74C3C" };
  };

  return (
    <>
      <Head>
        <title>لوحة التشخيص - Smart Lab</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.5" />
        <style>{`
          @media (max-width: 768px) {
            .main { padding: 24px 16px 40px !important; }
            .page-title { font-size: 30px !important; }
            .page-subtitle { font-size: 15px !important; }
            .results-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
            .result-card { padding: 16px !important; }
            .result-card-score { font-size: 28px !important; }
            .results-container { padding: 24px 16px !important; }
          }
          @media (max-width: 480px) {
            .main { padding: 16px 12px 30px !important; }
            .page-title { font-size: 24px !important; }
            .page-subtitle { font-size: 14px !important; }
            .empty-container { padding: 30px 16px 40px !important; }
            .empty-title { font-size: 22px !important; }
            .empty-desc { font-size: 15px !important; }
            .empty-btn { width: 100% !important; padding: 12px !important; font-size: 15px !important; }
            .result-card-score { font-size: 24px !important; }
            .result-card-title { font-size: 14px !important; }
          }
        `}</style>
      </Head>

      <div style={styles.page} dir="rtl">
        <Navbar />

        <main style={styles.main} className="main">
          <div style={styles.pageHeader}>
            <h1 style={{ ...styles.pageTitle, fontSize: isMobile ? 28 : 38, className: "page-title" }}>
              📊 لوحة التشخيص
            </h1>
            <p style={{ ...styles.pageSubtitle, fontSize: isMobile ? 15 : 17, className: "page-subtitle" }}>
              يعرض هذا القسم تقريراً تفصيلياً لأدائك بعد إتمام أي تقييم.
            </p>
          </div>

          {loading ? (
            <p style={{ textAlign: "center", color: COLORS.muted }}>⏳ جاري تحميل النتائج...</p>
          ) : results.length === 0 ? (
            <div style={styles.emptyContainer} className="empty-container">
              <span style={styles.emptyIcon}>📋</span>
              <h2 style={styles.emptyTitle} className="empty-title">لا يوجد نتائج تقييم حتى الآن</h2>
              <p style={styles.emptyDesc} className="empty-desc">
                لم تكمل أي تقييم بعد. ابدأ تقييمك الأول الآن لتحصل على تقرير مفصل يوضح نقاط قوتك ومجالات التحسين.
              </p>
              <Link href="/assessment/categories" style={styles.emptyButton} className="empty-btn">
                🚀 ابدأ تقييمك الجديد
              </Link>
            </div>
          ) : (
            <div style={styles.resultsContainer} className="results-container">
              <h3 style={{ fontSize: 20, fontWeight: 700, color: COLORS.navy, margin: "0 0 6px" }}>
                📈 نتائج تقييماتك السابقة
              </h3>
              <p style={{ fontSize: 15, color: COLORS.muted, margin: "0 0 24px" }}>
                {results.length} تقييم مكتمل
              </p>

              <div style={styles.resultsGrid} className="results-grid">
                {results.map((result, index) => {
                  const status = getStatusBadge(result.score);
                  const date = new Date(result.date);
                  const formattedDate = date.toLocaleDateString("ar-EG", {
                    year: "numeric", month: "long", day: "numeric",
                  });

                  return (
                    <div key={index} style={styles.resultCard} className="result-card">
                      <h4 style={styles.resultCardTitle} className="result-card-title">
                        {result.assessmentName || "تقييم"}
                        {result.mode === "quick" && " ⚡ (سريع)"}
                      </h4>
                      <p style={styles.resultCardScore} className="result-card-score">{result.score}%</p>
                      <p style={styles.resultCardDate}>📅 {formattedDate}</p>
                      <span style={{ ...styles.resultCardStatus, backgroundColor: status.color + "20", color: status.color, border: "1px solid " + status.color + "40" }}>
                        {status.label}
                      </span>
                      <p style={{ fontSize: 13, color: COLORS.muted, marginTop: 12 }}>
                        {result.correctAnswers} صحيح من {result.totalQuestions} أسئلة
                      </p>
                    </div>
                  );
                })}
              </div>

              <div style={{ textAlign: "center", marginTop: 32 }}>
                <Link href="/assessment/categories" style={styles.emptyButton}>
                  🚀 بدء تقييم جديد
                </Link>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
