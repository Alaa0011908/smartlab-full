// pages/assessment.js
import React from 'react';
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const COLORS = {
  teal: "#17919e",
  tealDark: "#127a86",
  orange: "#e1682e",
  navy: "#0d3d4e",
  bg: "#eef4f8",
  white: "#ffffff",
  text: "#0d1e3b",
  muted: "#5b6b7b",
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
  main: { flex: 1, maxWidth: 1160, width: "100%", margin: "0 auto", padding: "70px 24px 90px" },
  title: { textAlign: "center", fontSize: 46, fontWeight: 800, margin: "0 0 22px" },
  titleAccent: { color: COLORS.teal },
  intro: {
    textAlign: "center",
    color: COLORS.muted,
    fontSize: 18,
    lineHeight: 1.8,
    maxWidth: 720,
    margin: "0 auto 60px",
  },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 },
  cardTeal: {
    backgroundColor: COLORS.teal,
    color: COLORS.white,
    borderRadius: 18,
    padding: "34px 38px 38px",
    display: "flex",
    flexDirection: "column",
    minHeight: 360,
    boxShadow: "0 12px 34px rgba(23,145,158,0.25)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },
  cardWhite: {
    backgroundColor: COLORS.white,
    color: COLORS.text,
    borderRadius: 18,
    padding: "34px 38px 38px",
    display: "flex",
    flexDirection: "column",
    minHeight: 360,
    boxShadow: "0 6px 22px rgba(13,30,59,0.07)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },
  cardOrange: {
    backgroundColor: COLORS.orange,
    color: COLORS.white,
    borderRadius: 18,
    padding: "34px 38px 38px",
    display: "flex",
    flexDirection: "column",
    minHeight: 360,
    boxShadow: "0 12px 34px rgba(225,104,46,0.25)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },
  iconBoxWhite: {
    width: 62,
    height: 62,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    color: COLORS.teal,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "auto",
  },
  iconBoxNavy: {
    width: 62,
    height: 62,
    borderRadius: 14,
    backgroundColor: COLORS.navy,
    color: COLORS.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "auto",
  },
  iconBoxTeal: {
    width: 62,
    height: 62,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: COLORS.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "auto",
  },
  cardTitle: { fontSize: 28, fontWeight: 800, textAlign: "right", margin: "26px 0 14px" },
  cardDescLight: { fontSize: 16, lineHeight: 1.9, color: "rgba(255,255,255,0.92)", textAlign: "right", margin: 0 },
  cardDescDark: { fontSize: 16, lineHeight: 1.9, color: COLORS.muted, textAlign: "right", margin: 0 },
  dividerLight: { border: "none", borderTop: "1px solid rgba(255,255,255,0.35)", margin: "22px 0 22px" },
  dividerDark: { border: "none", borderTop: "1px solid #e2e9ef", margin: "22px 0 22px" },
  startBtnLight: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.white,
    color: COLORS.teal,
    border: "none",
    borderRadius: 10,
    padding: "12px 34px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    transition: "transform 0.25s ease, background-color 0.25s ease",
    textDecoration: "none",
    display: "inline-block",
  },
  startBtnNavy: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.navy,
    color: COLORS.white,
    border: "none",
    borderRadius: 10,
    padding: "12px 34px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    transition: "transform 0.25s ease, background-color 0.25s ease",
    textDecoration: "none",
    display: "inline-block",
  },
  startBtnOrange: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.white,
    color: COLORS.orange,
    border: "none",
    borderRadius: 10,
    padding: "12px 34px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    transition: "transform 0.25s ease, background-color 0.25s ease",
    textDecoration: "none",
    display: "inline-block",
  },
};

function GlobeIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" />
    </svg>
  );
}

function RouterIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <line x1="7" y1="16.5" x2="7" y2="16.5" />
      <line x1="10.5" y1="16.5" x2="17" y2="16.5" />
      <path d="M12 9a4 4 0 0 1 4-4M12 6.5A6.5 6.5 0 0 1 18.5 0" transform="translate(0,3)" />
      <line x1="12" y1="13" x2="12" y2="10" />
    </svg>
  );
}

function WebIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <path d="M6 8l2 2-2 2" />
      <path d="M18 8l-2 2 2 2" />
      <line x1="10" y1="11" x2="14" y2="11" />
    </svg>
  );
}

export default function Assessment() {
  return (
    <>
      <Head>
        <title>التقييم التكيفي - Smart Lab</title>
        <meta name="description" content="اختر مسار التقييم التكيفي المناسب لك في منصة سمارت لاب." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @media (max-width: 1024px) {
            .paths-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 768px) {
            .paths-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </Head>

      <div style={styles.page} dir="rtl">
        <Navbar />

        <main style={styles.main}>
          <h1 style={styles.title}>
            اختر مسار <span style={styles.titleAccent}>التقييم</span>
          </h1>
          <p style={styles.intro}>
            حدد المجال الذي ترغب في اختباره اليوم. صُممت مساراتنا لتتكيف مع مستواك وتوفر لك تجربة تعليمية مخصصة.
          </p>

          <div style={styles.grid} className="paths-grid">
            <div
              style={styles.cardTeal}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 18px 40px rgba(23,145,158,0.32)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 12px 34px rgba(23,145,158,0.25)";
              }}
            >
              <div style={styles.iconBoxWhite}>
                <GlobeIcon />
              </div>
              <h2 style={styles.cardTitle}>اللغة الإنجليزية</h2>
              <p style={styles.cardDescLight}>
                مسارات شاملة تغطي المراسلات التجارية (Business Correspondence)، القواعد المتقدمة، ومهارات التواصل الفعال
                في بيئة العمل.
              </p>
              <hr style={styles.dividerLight} />
              <Link
                href="/assessment/english"
                style={styles.startBtnLight}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.backgroundColor = "#f0f7f8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.backgroundColor = COLORS.white;
                }}
              >
                ابدأ
              </Link>
            </div>

            <div
              style={styles.cardWhite}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 14px 34px rgba(13,30,59,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 22px rgba(13,30,59,0.07)";
              }}
            >
              <div style={styles.iconBoxNavy}>
                <RouterIcon />
              </div>
              <h2 style={styles.cardTitle}>هندسة الشبكات</h2>
              <p style={styles.cardDescDark}>
                اختبارات تكيفية في تقسيم الشبكات الفرعية (Subnetting)، توجيه بروتوكول الإنترنت (IP Routing)، وإدارة
                الخوادم. مثالي للتحضير للشهادات المهنية.
              </p>
              <hr style={styles.dividerDark} />
              <Link
                href="/assessment/network-sub-tracks"
                style={styles.startBtnNavy}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.backgroundColor = "#0a2f3d";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.backgroundColor = COLORS.navy;
                }}
              >
                ابدأ
              </Link>
            </div>

            <div
              style={styles.cardOrange}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 18px 40px rgba(225,104,46,0.32)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 12px 34px rgba(225,104,46,0.25)";
              }}
            >
              <div style={styles.iconBoxTeal}>
                <WebIcon />
              </div>
              <h2 style={styles.cardTitle}>أساسيات الويب</h2>
              <p style={styles.cardDescLight}>
                مسارات شاملة تغطي أساسيات تطوير الويب: HTML، CSS، JavaScript، تصميم واجهات المستخدم (UI/UX)، وأساسيات
                التعامل مع الخوادم وقواعد البيانات.
              </p>
              <hr style={styles.dividerLight} />
              <Link
                href="/assessment/web"
                style={styles.startBtnOrange}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.backgroundColor = "#fdf6f0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.backgroundColor = COLORS.white;
                }}
              >
                ابدأ
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
