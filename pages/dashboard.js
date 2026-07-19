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
    padding: "60px 24px 80px",
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
    transition: "background-color 0.25s ease, transform 0.25s ease",
    textDecoration: "none",
    display: "inline-block",
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
    gap: 24,
    marginTop: 24,
  },
  resultCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 16,
    padding: "24px",
    border: `1px solid ${COLORS.border}`,
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          html, body {
            margin: 0; padding: 0;
            background-color: ${COLORS.bg};
          }
          * { box-sizing: border-box; }
        `}</style>
      </Head>

      <div style={styles.page} dir="rtl">
        <Navbar />

        <main style={styles.main}>
          <div style={styles.pageHeader}>
            <h1 style={{ ...styles.pageTitle, fontSize: isMobile ? 28 : 38 }}>
              📊 لوحة التشخيص
            </h1>
            <p style={{ ...styles.pageSubtitle, fontSize: isMobile ? 15 : 17 }}>
              يعرض هذا القسم تقريراً تفصيلياً لأدائك بعد إتمام أي تقييم.
            </p>
          </div>

          {loading ? (
            <p style={{ textAlign: "center", color: COLORS.muted }}>⏳ جاري تحميل النتائج...</p>
          ) : results.length === 0 ? (
            <div style={styles.emptyContainer}>
              <span style={styles.emptyIcon}>📋</span>
              <h2 style={styles.emptyTitle}>لا يوجد نتائج تقييم حتى الآن</h2>
              <p style={styles.emptyDesc}>
                لم تكمل أي تقييم بعد. ابدأ تقييمك الأول الآن لتحصل على تقرير مفصل يوضح نقاط قوتك ومجالات التحسين.
              </p>
              <Link href="/assessment/categories" style={styles.emptyButton}>
                🚀 ابدأ تقييمك الجديد
              </Link>
            </div>
          ) : (
            <div style={styles.resultsContainer}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: COLORS.navy, margin: "0 0 6px" }}>
                📈 نتائج تقييماتك السابقة
              </h3>
              <p style={{ fontSize: 15, color: COLORS.muted, margin: "0 0 24px" }}>
                {results.length} تقييم مكتمل
              </p>

              <div style={styles.resultsGrid}>
                {results.map((result, index) => {
                  const status = getStatusBadge(result.score);
                  const date = new Date(result.date);
                  const formattedDate = date.toLocaleDateString("ar-EG", {
                    year: "numeric", month: "long", day: "numeric",
                  });

                  return (
                    <div key={index} style={styles.resultCard}>
                      <h4 style={styles.resultCardTitle}>
                        {result.assessmentName || "تقييم"}
                        {result.mode === "quick" && " ⚡ (سريع)"}
                      </h4>
                      <p style={styles.resultCardScore}>{result.score}%</p>
                      <p style={styles.resultCardDate}>📅 {formattedDate}</p>
                      <span style={{ ...styles.resultCardStatus, backgroundColor: status.color + "20", color: status.color, border: `1px solid ${status.color}40` }}>
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
