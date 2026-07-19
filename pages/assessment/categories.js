// pages/assessment/categories.js - صفحة تقييمات الشبكات (8 مواضيع)
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const COLORS = {
  teal: "#17919e",
  tealDark: "#127a86",
  orange: "#e1682e",
  navy: "#0d3d4e",
  bg: "#eef4f8",
  white: "#ffffff",
  text: "#0d1e3b",
  muted: "#5b6b7b",
  border: "#bcd7db",
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: COLORS.bg,
    direction: 'rtl',
    fontFamily: "'Segoe UI', Tahoma, 'Cairo', system-ui, sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    width: '100%',
    backgroundColor: COLORS.white,
    borderBottom: `1px solid ${COLORS.border}`,
    display: 'flex',
    justifyContent: 'center',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    padding: '14px 40px',
  },
  leftNavActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  loginBtn: {
    backgroundColor: COLORS.teal,
    color: COLORS.white,
    padding: '8px 22px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  nav: { display: 'flex', alignItems: 'center', gap: '28px' },
  navLink: {
    color: COLORS.navy,
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 500,
  },
  activeLink: {
    color: COLORS.teal,
    borderBottom: `2px solid ${COLORS.teal}`,
    paddingBottom: '4px',
    fontWeight: 'bold',
  },
  logo: { display: 'flex', alignItems: 'center', gap: '8px' },
  logoImage: { height: '40px', width: 'auto' },
  main: {
    flex: 1,
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: '40px 40px 60px',
  },
  pageHeader: { textAlign: 'center', marginBottom: '32px' },
  pageTitle: {
    fontSize: '32px',
    fontWeight: 800,
    color: COLORS.navy,
    margin: '0 0 8px 0',
  },
  pageDesc: {
    fontSize: '15px',
    color: COLORS.muted,
    maxWidth: '570px',
    margin: '0 auto',
    lineHeight: 1.7,
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    color: COLORS.teal,
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: 600,
    marginBottom: '24px',
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: COLORS.white,
    border: `1px solid ${COLORS.border}`,
    transition: 'background-color 0.25s ease',
  },
  categoryList: { display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' },
  categoryRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    backgroundColor: COLORS.white,
    borderRadius: '16px',
    padding: '20px 24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    flexWrap: 'wrap',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  categoryNumber: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: COLORS.teal,
    backgroundColor: '#E6F5F4',
    padding: '6px 12px',
    borderRadius: '10px',
  },
  categoryIcon: { fontSize: '28px' },
  categoryInfo: { flex: 1, textAlign: 'right', minWidth: '200px' },
  categoryTitle: { fontSize: '18px', color: COLORS.navy, margin: '0 0 4px 0' },
  categoryDesc: { fontSize: '13px', color: COLORS.muted, margin: 0 },
  categoryButtons: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  btnOutline: {
    border: `1.5px solid ${COLORS.orange}`,
    color: COLORS.orange,
    backgroundColor: COLORS.white,
    padding: '8px 18px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.25s ease, color 0.25s ease',
  },
  btnFilled: {
    border: 'none',
    color: COLORS.white,
    backgroundColor: COLORS.teal,
    padding: '8px 18px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.25s ease, transform 0.25s ease',
  },
  footer: {
    backgroundColor: COLORS.navy,
    color: COLORS.white,
    padding: '40px 24px 32px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    padding: '0 24px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  footerBrand: {
    margin: '0 0 6px 0',
    fontWeight: 'bold',
    fontSize: '18px',
    color: COLORS.white,
    textAlign: 'right',
  },
  footerText: {
    margin: 0,
    fontSize: '13px',
    opacity: 0.7,
    lineHeight: '1.5',
  },
  footerRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
  },
  footerContactTitle: { margin: 0, fontSize: '15px', fontWeight: 'bold' },
  footerEmailWrap: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
};

function LogoMark() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 8c-4 0-7 2-9 5-2-2-5-3-8-2-4 1-6 5-5 9-3 1-5 4-4 8 1 3 4 5 7 5 1 3 4 5 7 5 4 0 7-2 8-5 4 1 8-1 9-5 1-3 0-6-2-8 2-3 2-7-1-10-2-4-5-5-9-2z" fill={COLORS.teal} opacity="0.9"/>
      <path d="M18 22c1-3 4-5 7-5" stroke={COLORS.orange} strokeWidth="2.4" strokeLinecap="round"/>
      <circle cx="30" cy="16" r="2.4" fill={COLORS.orange}/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="40" height="32" viewBox="0 0 64 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_334_96)">
        <mask id="path-1-inside-1_334_96" fill="white">
          <path d="M12 28C12 16.9543 20.9543 8 32 8C43.0457 8 52 16.9543 52 28C52 39.0457 43.0457 48 32 48C20.9543 48 12 39.0457 12 28Z"/>
        </mask>
        <path d="M12 28C12 16.9543 20.9543 8 32 8C43.0457 8 52 16.9543 52 28C52 39.0457 43.0457 48 32 48C20.9543 48 12 39.0457 12 28Z" fill="white" fillOpacity="0.1"/>
        <path d="M24.2222 35.7773C23.6875 35.7773 23.2297 35.587 22.849 35.2062C22.4682 34.8254 22.2778 34.3676 22.2778 33.8329V22.1662C22.2778 21.6315 22.4682 21.1738 22.849 20.793C23.2297 20.4122 23.6875 20.2218 24.2222 20.2218H39.7778C40.3125 20.2218 40.7702 20.4122 41.151 20.793C41.5318 21.1738 41.7222 21.6315 41.7222 22.1662V33.8329C41.7222 34.3676 41.5318 34.8254 41.151 35.2062C40.7702 35.587 40.3125 35.7773 39.7778 35.7773H24.2222ZM32 28.9718L24.2222 24.1107V33.8329H39.7778V24.1107L32 28.9718ZM32 27.0273L39.7778 22.1662H24.2222L32 27.0273Z" fill="white"/>
      </g>
      <defs>
        <filter id="filter0_d_334_96" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse">
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
  );
}

export default function Categories() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navItems = [
    { label: "الرئيسية", href: "/" },
    { label: "محاكي العميل", href: "/scenarios" },
    { label: "التقييم التكيفي", href: "/assessment", active: true },
    { label: "لوحة التشخيص", href: "/dashboard" },
  ];

  const categories = [
    { id: 'concepts', number: '01', title: '📘 المفاهيم العامة', description: 'تعريف الشبكة، أنواعها، نماذج Client-Server و P2P، الكابلات، VLAN، VPN.', path: '/assessment/basics' },
    { id: 'ipv4', number: '02', title: '🌍 IPv4', description: 'بنية العنوان، الفئات (Classes)، العناوين العامة والخاصة، Gateway، Loopback.', path: '/assessment/ipv4' },
    { id: 'subnetting', number: '03', title: '🔢 Subnetting', description: 'حسابات الشبكات الفرعية، CIDR، المضيفين، عنوان البث، الـ Increment.', path: '/assessment/subnetting' },
    { id: 'ipv6', number: '04', title: '🛜 IPv6', description: 'بنية IPv6، أنواع العناوين، الاختصار، المقارنة مع IPv4.', path: '/assessment/ipv6' },
    { id: 'osi', number: '05', title: '📡 OSI Model', description: 'الطبقات السبع، وظائف كل طبقة، البروتوكولات، وحدات البيانات (PDU).', path: '/assessment/osi' },
    { id: 'devices', number: '06', title: '💻 أجهزة الشبكات', description: 'سويتش، راوتر، هاب، مودم، Bridge، Gateway، Access Point، Firewall.', path: '/assessment/devices' },
    { id: 'email', number: '07', title: '📧 بروتوكولات البريد', description: 'SMTP، POP3، IMAP، المنافذ الافتراضية، الفرق بين البروتوكولات.', path: '/assessment/email' },
    { id: 'tcpip', number: '08', title: '🔗 TCP/IP', description: 'طبقات TCP/IP، TCP vs UDP، HTTP، Three-Way Handshake.', path: '/assessment/tcpip' },
  ];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.navContainer}>
          <div style={styles.leftNavActions}>
            <Link href="/auth/login" style={styles.loginBtn}>تسجيل الدخول</Link>
          </div>
          <nav style={styles.nav}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{ ...styles.navLink, ...(item.active ? styles.activeLink : {}) }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div style={styles.logo}>
            <img src="/logo.png" alt="Smart Lab Logo" style={styles.logoImage} />
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <Link href="/assessment" style={styles.backButton}>
          ← العودة إلى مسارات التقييم
        </Link>

        <div style={styles.pageHeader}>
          <h1 style={{ ...styles.pageTitle, fontSize: isMobile ? '24px' : '32px' }}>
            🌐 هندسة الشبكات - اختر تقييمك
          </h1>
          <p style={styles.pageDesc}>
            ثمانية مجالات تغطي جميع جوانب الشبكات. كل مجال له تقييم سريع وتقييم شامل.
          </p>
        </div>

        <div style={styles.categoryList}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              style={styles.categoryRow}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
              }}
            >
              <span style={styles.categoryNumber}>{cat.number}</span>
              <span style={styles.categoryIcon}>{cat.title.split(' ')[0]}</span>
              <div style={styles.categoryInfo}>
                <h3 style={styles.categoryTitle}>{cat.title}</h3>
                <p style={styles.categoryDesc}>{cat.description}</p>
              </div>
              <div style={styles.categoryButtons}>
                <button
                  style={styles.btnFilled}
                  onClick={() => router.push(`${cat.path}?mode=quick`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.tealDark;
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.teal;
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  التقييم السريع
                </button>
                <button
                  style={styles.btnOutline}
                  onClick={() => router.push(`${cat.path}?mode=full`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.orange;
                    e.currentTarget.style.color = COLORS.white;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.white;
                    e.currentTarget.style.color = COLORS.orange;
                  }}
                >
                  التقييم الشامل
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div>
            <p style={styles.footerBrand}>SmartLab</p>
            <p style={styles.footerText}>منصة تعليمية متطورة لدعم التعلم التكيفي والمحاكاة.</p>
          </div>
          <div style={styles.footerRight}>
            <p style={styles.footerContactTitle}>تواصل معنا</p>
            <div style={styles.footerEmailWrap}>
              <MailIcon />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}