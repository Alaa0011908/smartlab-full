import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// مصفوفة البيانات لإبقاء الكود نظيفاً وسهل التعديل مستقبلاً
const SUB_TRACKS_DATA = [
  {
    id: 'basics',
    title: 'أساسيات الشبكات',
    description: 'ابتدئ رحلتك في فهم البنية التحتية للشبكات، وتتعرف على المفاهيم الأساسية، بروتوكولات الاتصال، ونموذج OSI بشكل مبسط ومكثف.',
    buttonText: 'ابدأ المسار',
    actionType: 'primary'
  },
  {
    id: 'routing',
    title: 'هندسة الـ Routing',
    description: 'تعمق في بروتوكولات التوجيه وتوجيه حزم البيانات عبر الشبكات المختلفة وكيفية بناء جداول التوجيه بكفاءة عالية.',
    buttonText: 'قريباً',
    actionType: 'secondary'
  },
  {
    id: 'switching',
    title: 'مبادئ الـ Switching',
    description: 'تعمق في آليات عمل المبدلات (Switches)، إعدادات الـ VLANs، وبروتوكولات التوجيه الداخلي لإدارة البيانات بكفاءة داخل الشبكة المحلية.',
    buttonText: 'قريباً',
    actionType: 'secondary'
  }
];

export default function NetworkSubTracks() {
  const router = useRouter();

  const handleNavigation = (trackId) => {
    if (trackId === 'basics') {
      router.push('/assessment/categories');
    } else {
      alert('هذا المسار سيتم تفعيله قريباً!');
    }
  };

  const navItems = [
    { label: "الرئيسية", active: false, href: "/" },
    { label: "محاكي العميل", active: false, href: "/scenarios" },
    { label: "التقييم التكيفي", active: true, href: "/assessment" },
    { label: "لوحة التشخيص", active: false, href: "/result" },
  ];

  return (
    <div style={styles.page} dir="rtl">
      {/* ============ NavBar الموحد والمطابق للسيناريو ============ */}
      <header style={styles.header}>
        {/* القسم اليسار: الأزرار */}
        <div style={styles.headerLeft}>
          <Link href="/auth/login" style={styles.loginBtn}>
            تسجيل الدخول
          </Link>
          <button style={styles.themeToggleBtn} aria-label="تبديل المظهر">
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
          </button>
        </div>

        {/* قسم المنتصف: روابط التنقل الفعالة */}
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

        {/* قسم اليمين: اللوغو المعتمد على الصورة الموحدة */}
        <div style={styles.headerRight}>
          <Link href="/" style={styles.logo}>
            <img 
              src="/logo.png" 
              alt="Smart Lab Logo" 
              style={{ height: '45px', width: 'auto', objectFit: 'contain' }} 
            />
          </Link>
        </div>
      </header>

      {/* المحتوى الرئيسي للمسارات */}
      <div style={styles.mainWrapper}>
        <section style={styles.sectionHeader}>
          <h1 style={styles.mainTitle}>اختر المسار الفرعي لهندسة الشبكات</h1>
          <p style={styles.subtitle}>
            اختر أحد المسارات المتخصصة أدناه لبدء الاختبار التكيفي وتقييم مهاراتك بدقة.
          </p>
        </section>

        <main style={styles.cardsGrid}>
          {SUB_TRACKS_DATA.map((track) => (
            <div key={track.id} style={styles.card}>
              <div style={styles.iconPlaceholder}>🌐</div>
              <h2 style={styles.cardTitle}>{track.title}</h2>
              <p style={styles.cardDescription}>{track.description}</p>
              <button
                onClick={() => handleNavigation(track.id)}
                style={{
                  ...styles.button,
                  ...(track.actionType === 'secondary' ? styles.btnSecondary : styles.btnPrimary)
                }}
                disabled={track.actionType === 'secondary'}
              >
                {track.buttonText}
              </button>
            </div>
          ))}
        </main>
      </div>

      {/* ============ Footer الموحد والمطابق للسيناريو ============ */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer} className="footerContainer">
          <div style={styles.footerLeft}>
            <p style={styles.footerBrand}>SmartLab</p>
            <p style={styles.footerText}>منصة تعليمية متطورة لدعم التعلم التكيفي والمحاكاة.</p>
          </div>

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
  );
}

const styles = {
  page: {
    direction: "rtl",
    fontFamily: "'Segoe UI', Tahoma, 'Cairo', system-ui, sans-serif",
    backgroundColor: '#F8FAFC',
    color: '#0d1e3b',
    minHeight: "100vh",
    margin: 0,
    display: "flex",
    flexDirection: "column",
  },
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
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
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
    color: '#0d1e3b',
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
  mainWrapper: {
    flex: 1,
    padding: '70px 20px 90px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  mainTitle: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#0D1E3B', 
    marginBottom: '15px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6B7280',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  cardsGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '40px 30px',
    width: '350px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  iconPlaceholder: {
    fontSize: '40px',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#0D1E3B',
    marginBottom: '15px',
  },
  cardDescription: {
    fontSize: '14px',
    color: '#6B7280',
    lineHeight: '1.8',
    marginBottom: '30px',
    flexGrow: 1,
  },
  button: {
    padding: '12px 34px',
    fontSize: '16px',
    fontWeight: '700',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
  },
  btnPrimary: {
    backgroundColor: 'rgb(0,100,130)',
    color: '#ffffff',
  },
  btnSecondary: {
    backgroundColor: '#e0e0e0',
    color: '#777777',
    cursor: 'not-allowed',
  },
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