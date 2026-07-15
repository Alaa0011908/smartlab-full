// pages/index.js - النسخة النهائية مع روابط معدلة (تم إصلاح الخطأ النحوي)
import Head from "next/head";
import Link from "next/link";

const COLORS = {
  teal: "#17919e",
  tealDark: "#127a86",
  orange: "#e1682e",
  navy: "#0d3d4e",
  bg: "#eef4f8",
  light: "#f8f9fa",
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
  },
  /* Header */
  header: {
    backgroundColor: COLORS.white,
    borderBottom: "1px solid #e6ecf1",
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
  logoText: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1,
    alignItems: "center",
  },
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
  navLinkActive: {
    color: COLORS.teal,
    borderBottom: "2px solid " + COLORS.teal, // تم إصلاح الخطأ هنا
  },
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
    transition: "background-color 0.25s ease, transform 0.25s ease",
    textDecoration: "none",
    display: "inline-block",
  },
  /* Hero */
  hero: { backgroundColor: COLORS.bg, padding: "60px 24px 40px" },
  heroInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 40,
    flexWrap: "wrap",
  },
  heroText: { flex: "1 1 440px", textAlign: "right" },
  heroTitle: {
    fontSize: 52,
    fontWeight: 800,
    lineHeight: 1.25,
    margin: "0 0 24px",
    color: COLORS.text,
  },
  heroTitleAccent: { color: COLORS.orange },
  heroDesc: {
    fontSize: 18,
    lineHeight: 1.8,
    color: COLORS.muted,
    maxWidth: 520,
    marginRight: "auto",
    marginBottom: 34,
  },
  heroBtns: { display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "flex-start" },
  btnPrimary: {
    backgroundColor: COLORS.teal,
    color: COLORS.white,
    border: "none",
    borderRadius: 8,
    padding: "16px 34px",
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
    transition: "background-color 0.25s ease, transform 0.25s ease",
    textDecoration: "none",
    display: "inline-block",
  },
  btnOutline: {
    backgroundColor: "transparent",
    color: COLORS.orange,
    border: "2px solid " + COLORS.orange, // تم إصلاح الخطأ هنا
    borderRadius: 8,
    padding: "14px 34px",
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
    transition: "background-color 0.25s ease, color 0.25s ease",
    textDecoration: "none",
    display: "inline-block",
  },
  heroArt: {
    flex: "1 1 380px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 380,
  },
  /* Section shared */
  section: { maxWidth: 1200, margin: "0 auto", padding: "70px 24px" },
  eyebrow: {
    textAlign: "center",
    color: COLORS.muted,
    fontSize: 17,
    fontWeight: 600,
    margin: "0 0 8px",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: 800,
    color: COLORS.text,
    margin: "0 0 40px",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #d6e0e8",
    maxWidth: 1000,
    margin: "0 auto 40px",
  },
  /* Steps */
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
  },
  stepCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: "40px 24px",
    textAlign: "center",
    boxShadow: "0 6px 20px rgba(13,30,59,0.05)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    cursor: "default",
  },
  stepIcon: {
    color: COLORS.teal,
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
  },
  stepLabel: { fontSize: 18, fontWeight: 700, color: COLORS.text },
  /* Features */
  featuresIntro: {
    textAlign: "center",
    color: COLORS.muted,
    fontSize: 17,
    lineHeight: 1.7,
    maxWidth: 620,
    margin: "0 auto 46px",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 28,
  },
  featureCardTeal: {
    backgroundColor: COLORS.teal,
    color: COLORS.white,
    borderRadius: 16,
    padding: "40px 36px",
    textAlign: "right",
    boxShadow: "0 10px 30px rgba(23,145,158,0.25)",
    transition: "transform 0.25s ease",
  },
  featureCardWhite: {
    backgroundColor: COLORS.white,
    color: COLORS.text,
    borderRadius: 16,
    padding: "40px 36px",
    textAlign: "right",
    boxShadow: "0 6px 20px rgba(13,30,59,0.06)",
    transition: "transform 0.25s ease",
  },
  featureIconTeal: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
    color: COLORS.white,
  },
  featureIconWhite: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    backgroundColor: "rgba(23,145,158,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
    color: COLORS.teal,
  },
  featureTitle: { fontSize: 24, fontWeight: 800, margin: "0 0 16px" },
  featureDescLight: { fontSize: 16, lineHeight: 1.9, color: "rgba(255,255,255,0.9)", margin: 0 },
  featureDescDark: { fontSize: 16, lineHeight: 1.9, color: COLORS.muted, margin: 0 },
  /* Footer */
  footer: { backgroundColor: COLORS.navy, color: COLORS.white, padding: "50px 24px 40px" },
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

function ChatIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 4h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" opacity="0.35" />
      <path d="M9 9h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1v3l-4-3H9a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

function RouteIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 20c-2 0-3-1-3-3s1-3 3-3h8c2 0 3-1 3-3s-1-3-3-3" strokeDasharray="1 3" />
      <path d="M17 3c1.7 0 3 1.3 3 3 0 2.2-3 5-3 5s-3-2.8-3-5c0-1.7 1.3-3 3-3z" fill="currentColor" stroke="none" />
      <circle cx="6" cy="18" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2H9V4z" fill="currentColor" stroke="none" />
      <line x1="8.5" y1="11" x2="15.5" y2="11" />
      <line x1="8.5" y1="14.5" x2="15.5" y2="14.5" />
      <line x1="8.5" y1="18" x2="13" y2="18" />
    </svg>
  );
}

function BroadcastIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <path d="M8 8a5.6 5.6 0 0 0 0 8M16 8a5.6 5.6 0 0 1 0 8" />
      <path d="M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13" opacity="0.7" />
    </svg>
  );
}

function AiGearIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
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

function HeroIllustration() {
  return (
    <svg width="380" height="360" viewBox="0 0 380 360" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="رسم توضيحي لشخص يتعلم باستخدام الحاسوب">
      <circle cx="140" cy="55" r="5" fill={COLORS.teal} />
      <circle cx="300" cy="230" r="5" fill={COLORS.orange} />
      <path d="M120 95 l40 -10 -30 22 z" fill={COLORS.orange} />
      <rect x="290" y="185" width="10" height="30" rx="2" fill={COLORS.teal} />
      <rect x="304" y="165" width="10" height="50" rx="2" fill={COLORS.orange} />
      <rect x="318" y="150" width="10" height="65" rx="2" fill={COLORS.teal} />
      <ellipse cx="185" cy="345" rx="120" ry="12" fill="#d7e3ec" />
      <path d="M120 300 q65 -55 130 0 v20 h-130 z" fill={COLORS.orange} />
      <rect x="150" y="180" width="70" height="90" rx="30" fill={COLORS.orange} />
      <circle cx="185" cy="150" r="34" fill="#f2c39a" />
      <path d="M151 150 a34 34 0 0 1 68 0 v-6 a34 34 0 0 0 -68 0 z" fill={COLORS.teal} />
      <rect x="120" y="255" width="130" height="80" rx="8" fill={COLORS.white} stroke="#cdd9e2" strokeWidth="2" />
      <circle cx="150" cy="295" r="20" fill="none" stroke={COLORS.orange} strokeWidth="5" />
      <text x="150" y="300" textAnchor="middle" fontSize="13" fontWeight="700" fill={COLORS.text}>78%</text>
      <rect x="180" y="282" width="55" height="7" rx="3" fill={COLORS.teal} />
      <rect x="180" y="296" width="45" height="7" rx="3" fill="#d7e3ec" />
      <rect x="180" y="310" width="55" height="7" rx="3" fill={COLORS.orange} />
    </svg>
  );
}

export default function Home() {
  const navItems = [
    { label: "الرئيسية", active: true, href: "/" },
    { label: "التقييم التكيفي", active: false, href: "/assessment" },
    { label: "محاكي العميل", active: false, href: "/scenarios" },
    { label: "لوحة التشخيص", active: false, href: "/dashboard" },
  ];

  const steps = [
    { label: "سيناريوهات تفاعلية", icon: <ChatIcon /> },
    { label: "مسار مخصص", icon: <RouteIcon /> },
    { label: "تقييم مدعوم بالذكاء الاصطناعي", icon: <ClipboardIcon /> },
  ];

  return (
    <>
      <Head>
        <title>Smart Lab - اكتشف قدراتك الحقيقية مع الذكاء الاصطناعي</title>
        <meta name="description" content="منصة تعليمية متطورة لدعم التعلم التكيفي والمحاكاة." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={styles.page} dir="rtl">
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerInner} className="header-inner">
            <div style={styles.logoWrap}>
              <LogoMark />
              <span style={styles.logoText}>
                <span style={styles.logoSmart}>Smart</span>
                <span style={styles.logoLab}>Lab</span>
              </span>
            </div>

            <nav style={styles.nav} className="main-nav">
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
              <button
                style={styles.themeBtn}
                aria-label="تبديل المظهر"
                onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(40deg)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(0deg)")}
              >
                <SunIcon />
              </button>
              <Link
                href="/auth/login"
                style={styles.loginBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.tealDark;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.teal;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section style={styles.hero}>
          <div style={styles.heroInner}>
            <div style={styles.heroText} className="hero-text">
              <h1 style={styles.heroTitle} className="hero-title">
                اكتشف قدراتك الحقيقية مع <span style={styles.heroTitleAccent}>الذكاء الاصطناعي</span>
              </h1>
              <p style={styles.heroDesc}>
                منصة تعليمية متطورة تستخدم أحدث تقنيات الذكاء الاصطناعي لتقديم مسارات تعلم مخصصة، وتقييمات دقيقة، وتجربة
                محاكاة واقعية لتعزيز مهاراتك بشكل فعال.
              </p>
              <div style={styles.heroBtns} className="hero-btns">
                <Link
                  href="/scenarios"
                  style={styles.btnPrimary}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.tealDark;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.teal;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  ابدأ تجربتك العملية الآن
                </Link>
                <Link
                  href="/assessment"
                  style={styles.btnOutline}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.orange;
                    e.currentTarget.style.color = COLORS.white;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = COLORS.orange;
                  }}
                >
                  ابدأ التقييم الآن
                </Link>
              </div>
            </div>
            <div style={styles.heroArt}>
              <HeroIllustration />
            </div>
          </div>
        </section>

        {/* Steps */}
        <section style={styles.section}>
          <p style={styles.eyebrow}>آلية عمل Smart Lab</p>
          <h2 style={styles.sectionTitle}>ثلاث خطوات للإتقان</h2>
          <hr style={styles.divider} />
          <div style={styles.stepsGrid} className="steps-grid">
            {steps.map((step) => (
              <div
                key={step.label}
                style={styles.stepCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 14px 30px rgba(13,30,59,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(13,30,59,0.05)";
                }}
              >
                <div style={styles.stepIcon}>{step.icon}</div>
                <div style={styles.stepLabel}>{step.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>مميزات المنصة</h2>
          <p style={styles.featuresIntro}>أدوات متطورة مصممة خصيصاً لتسريع عملية التعلم وضمان الفهم العميق.</p>
          <div style={styles.featuresGrid} className="features-grid">
            <div
              style={styles.featureCardTeal}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={styles.featureIconTeal}>
                <BroadcastIcon />
              </div>
              <h3 style={styles.featureTitle}>محاكي العميل الافتراضي</h3>
              <p style={styles.featureDescLight}>
                بيئة آمنة للتدريب على المهارات العملية من خلال تفاعل صوتي ونصي مع شخصيات افتراضية مدعومة بالذكاء
                الاصطناعي تحاكي سيناريوهات واقعية.
              </p>
            </div>
            <div
              style={styles.featureCardWhite}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={styles.featureIconWhite}>
                <AiGearIcon />
              </div>
              <h3 style={styles.featureTitle}>التقييم التكيفي الذكي</h3>
              <p style={styles.featureDescDark}>
                نظام يحلل إجاباتك في الوقت الفعلي ويقوم بتعديل مستوى الصعوبة ونوع الأسئلة لتتناسب مع قدراتك، مما يضمن
                تقييماً دقيقاً وشاملاً لمستواك الحقيقي.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerInner}>
            <div style={styles.footerCol}>
              <h3 style={styles.footerBrand}>SmartLab</h3>
              <p style={styles.footerText}>منصة تعليمية متطورة لدعم التعلم التكيفي والمحاكاة.</p>
            </div>
            <div style={styles.footerCol}>
              <h4 style={styles.footerHeading}>تواصل معنا</h4>
              <button
                style={styles.footerIconBtn}
                aria-label="راسلنا عبر البريد الإلكتروني"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <MailIcon />
              </button>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          background-color: ${COLORS.bg};
        }
        * { box-sizing: border-box; }
        @media (max-width: 900px) {
          :global(.main-nav) { display: none !important; }
          :global(.hero-title) { font-size: 38px !important; }
          :global(.steps-grid) { grid-template-columns: 1fr !important; }
          :global(.features-grid) { grid-template-columns: 1fr !important; }
          :global(.hero-text) { text-align: center !important; }
          :global(.hero-btns) { justify-content: center !important; }
        }
        @media (max-width: 600px) {
          :global(.hero-title) { font-size: 30px !important; }
          :global(.header-inner) { padding: 12px 16px !important; }
        }
      `}</style>
    </>
  );
}
