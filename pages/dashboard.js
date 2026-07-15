// pages/dashboard.js - لوحة التشخيص (Dashboard)
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

const COLORS = {
  teal: "#0D1E3B",       // تم توحيد اللون مع الكحلي
  tealDark: "#0a172d",
  orange: "#F39C12",
  navy: "#0D1E3B",
  bg: "#f8f9fa",         // تم توحيد الخلفية
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
  // ===== Header =====
  header: {
    backgroundColor: COLORS.white,
    borderBottom: `1px solid ${COLORS.border}`,
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  headerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "14px 24px",
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
  navLinkActive: { color: COLORS.teal, borderBottom: `2px solid ${COLORS.teal}` },
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
    padding: "10px 22px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    transition: "background-color 0.25s ease",
    textDecoration: "none",
    display: "inline-block",
  },

  // ===== Main Content =====
  main: {
    flex: 1,
    maxWidth: 1000,
    width: "100%",
    margin: "0 auto",
    padding: "60px 24px 80px",
  },

  // ===== Page Header =====
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

  // ===== Empty State =====
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

  // ===== Results (عند وجود نتائج) =====
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

  // ===== Footer =====
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

// ===== أيقونات SVG =====
function LogoMark() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M30 8c-4 0-7 2-9 5-2-2-5-3-8-2-4 1-6 5-5 9-3 1-5 4-4 8 1 3 4 5 7 5 1 3 4 5 7 5 4 0 7-2 8-5 4 1 8-1 9-5 1-3 0-6-2-8 2-3 2-7-1-10-2-4-5-5-9-2z"
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

// ===== المكون الرئيسي =====
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

  const navItems = [
    { label: "الرئيسية", active: false, href: "/" },
    { label: "التقييمات", active: false, href: "/assessment/categories" },
    { label: "لوحة التشخيص", active: true, href: "/dashboard" },
  ];

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
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <div style={styles.logoWrap}>
              <LogoMark />
              <span style={styles.logoText}>
                <span style={styles.logoSmart}>Smart</span>
                <span style={styles.logoLab}>Lab</span>
              </span>
            </div>

            <nav style={styles.nav}>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{ ...styles.navLink, ...(item.active ? styles.navLinkActive : {}) }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div style={styles.headerRight}>
              <Link href="/auth/login" style={styles.loginBtn}>
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
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

        {/* Footer */}
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
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
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
