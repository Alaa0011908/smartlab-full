// pages/assessment.js
import Head from "next/head";
import Link from "next/link";

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
  // ============ تحديث تصميم وأبعاد الـ NavBar المقتبسة من السيناريو ============
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem 2.5rem',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '3rem',
  },
  logo: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  logoWrap: { display: "flex", alignItems: "center", gap: 8 },
  logoText: { display: "flex", flexDirection: "column", lineHeight: 1, alignItems: "center" },
  logoSmart: { fontSize: 15, fontWeight: 800, color: COLORS.teal },
  logoLab: { fontSize: 13, fontWeight: 700, color: COLORS.orange },
  nav: {
    display: 'flex',
    gap: '1.8rem',
  },
  navLink: {
    textDecoration: 'none',
    color: '#64748B',
    fontSize: '0.95rem',
    fontWeight: '500',
    padding: '0.5rem 0',
  },
  activeNavLink: {
    color: 'rgb(0,100,130)',
    fontWeight: '700',
    borderBottom: '3px solid rgb(0,100,130)',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  themeToggleBtn: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1.1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.text,
    transition: "transform 0.25s ease",
  },
  loginBtn: {
    backgroundColor: 'rgb(0,100,130)',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    padding: '0.6rem 1.5rem',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    textDecoration: "none",
    display: "inline-block",
  },
  // ============ الحفاظ على بقية كود المحتوى الرئيسي المطور سابقاً ============
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
  // ============ تحديث تصميم وأبعاد الـ Footer لتطابق السيناريو بالكامل ============
  footer: {
    backgroundColor: "#006482",
    color: 'white',
    padding: '30px 0', 
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: 'auto',
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px', 
    padding: '0 40px', 
  },
  footerLeft: {
    display: "flex",
    flexDirection: "column",
  },
  footerRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', 
    gap: '8px',
  },
  footerContactTitle: {
    margin: 0,
    fontSize: '15px',
    fontWeight: 'bold'
  },
  footerEmailWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
  },
  footerBrand: {
    margin: '0 0 6px 0',
    fontWeight: 'bold',
    fontSize: '18px',
    color: 'white',
    textAlign: 'right'
  },
  footerText: {
    margin: 0,
    fontSize: '13px',
    opacity: 0.7,
    lineHeight: '1.5'
  },
};

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
  const navItems = [
    { label: "الرئيسية", active: false, href: "/" },
    { label: "محاكي العميل", active: false, href: "/scenarios" },
    { label: "التقييم التكيفي", active: true, href: "/assessment" },
    { label: "لوحة التشخيص", active: false, href: "/result" },
  ];

  return (
    <>
      <Head>
        <title>التقييم التكيفي - Smart Lab</title>
        <meta name="description" content="اختر مسار التقييم التكيفي المناسب لك في منصة سمارت لاب." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={styles.page} dir="rtl">
        {/* ============header ============ */}
        <header style={styles.header}>
          
          <div style={styles.headerLeft}>
            <Link
              href="/auth/login"
              style={styles.loginBtn}
            >
              تسجيل الدخول
            </Link>
            <button
              style={styles.themeToggleBtn}
              aria-label="تبديل المظهر"
              onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(40deg)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(0deg)")}
            >
              <SunIcon />
            </button>
          </div>

          {/* 2. قسم المنتصف: روابط التنقل  */}
          <nav style={styles.nav} className="main-nav">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{ ...styles.navLink, ...(item.active ? styles.activeNavLink : {}) }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 3. قسم اللوغو */}
          <div style={styles.headerRight}>
            <Link href="/" style={styles.logo}>
              <div style={styles.logoWrap}>
                    <img 
                      src="/logo.png" 
                      alt="Smart Lab Logo" 
                      style={{ height: '45px', width: 'auto', objectFit: 'contain' }} 
                    />
               
              </div>
            </Link>
          </div>

        </header>

        {/* Main */}
        <main style={styles.main}>
          <h1 style={styles.title}>
            اختر مسار <span style={styles.titleAccent}>التقييم</span>
          </h1>
          <p style={styles.intro}>
            حدد المجال الذي ترغب في اختباره اليوم. صُممت مساراتنا لتتكيف مع مستواك وتوفر لك تجربة تعليمية مخصصة.
          </p>

          <div style={styles.grid} className="paths-grid">
            {/* الكارد الأول: اللغة الإنجليزية */}
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

            {/* الكارد الثاني: هندسة الشبكات */}
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

            {/* الكارد الثالث: أساسيات الويب */}
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

        {/* ============ footer============ */}
        <footer style={styles.footer}>
          <div style={styles.footerContainer} className="footerContainer">
            <div style={styles.footerLeft}>
              <p style={styles.footerBrand}>SmartLab</p>
              <p style={styles.footerText}>منصة تعليمية متطورة لدعم التعلم التكيفي والمحاكاة.</p>
            </div>

            {/* قسم تواصل معنا المحدث بنفس الأيقونة الكبيرة للسيناريو */}
            <div style={styles.footerRight} className="footerRight">
              <p style={styles.footerContactTitle}>تواصل معنا</p>
              <div style={styles.footerEmailWrap}>
                <svg width="64" height="50" viewBox="0 0 64 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_334_96)">
                    <mask id="path-1-inside-1_334_96" fill="white">
                      <path d="M12 28C12 16.9543 20.9543 8 32 8C43.0457 8 52 16.9543 52 28C52 39.0457 43.0457 48 32 48C20.9543 48 12 39.0457 12 28Z"/>
                    </mask>
                    <path d="M12 28C12 16.9543 20.9543 8 32 8C43.0457 8 52 16.9543 52 28C52 39.0457 43.0457 48 32 48C20.9543 48 12 39.0457 12 28Z" fill="white" fillOpacity="0.1" shapeRendering="crispEdges"/>
                    <path d="M12 28M52 28M52 28M12 28M32 8M52 28M32 48M12 28M32 48V47C21.5066 47 13 38.4934 13 28H12H11C11 39.598 20.402 49 32 49V48ZM52 28H51C51 38.4934 42.4934 47 32 47V48V49C43.598 49 53 39.598 53 28H52ZM32 8V9C42.4934 9 51 17.5066 51 28H52H53C53 16.402 43.598 7 32 7V8ZM32 8V7C20.402 7 11 16.402 11 28H12H13C13 17.5066 21.5066 9 32 9V8Z" fill="#311E10" fillOpacity="0.05" mask="url(#path-1-inside-1_334_96)"/>
                    <path d="M24.2222 35.7773C23.6875 35.7773 23.2297 35.587 22.849 35.2062C22.4682 34.8254 22.2778 34.3676 22.2778 33.8329V22.1662C22.2778 21.6315 22.4682 21.1738 22.849 20.793C23.2297 20.4122 23.6875 20.2218 24.2222 20.2218H39.7778C40.3125 20.2218 40.7702 20.4122 41.151 20.793C41.5318 21.1738 41.7222 21.6315 41.7222 22.1662V33.8329C41.7222 34.3676 41.5318 34.8254 41.151 35.2062C40.7702 35.587 40.3125 35.7773 39.7778 35.7773H24.2222ZM32 28.9718L24.2222 24.1107V33.8329H39.7778V24.1107L32 28.9718ZM32 27.0273L39.7778 22.1662H24.2222L32 27.0273Z" fill="white"/>
                  </g>
                  <defs>
                    <filter id="filter0_d_334_96" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="4"/>
                      <feGaussianBlur stdDeviation="6"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0.192157 0 0 0 0 0.117647 0 0 0 0 0.0627451 0 0 0 0.04 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_334_96"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_334_96" result="shape"/>
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          background-color: ${COLORS.bg};
        }
        * {
          box-sizing: border-box;
        }
      `}</style>

      <style jsx>{`
        @media (max-width: 1024px) {
          :global(.paths-grid) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          :global(.paths-grid) {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 900px) {
          :global(.main-nav) {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}