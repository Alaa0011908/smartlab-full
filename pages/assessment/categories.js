// pages/assessment/categories.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

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
};ز

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: COLORS.bg,
    direction: 'rtl',
    fontFamily: "'Segoe UI', Tahoma, 'Cairo', system-ui, sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
  },
  main: {
    flex: 1,
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: '40px 40px 60px',
    boxSizing: 'border-box',
  },
  pageHeader: {
    textAlign: 'center',
    marginBottom: '32px',
  },
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
    minHeight: 44,
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '20px',
  },
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
    whiteSpace: 'nowrap',
  },
  categoryIcon: {
    fontSize: '28px',
  },
  categoryInfo: {
    flex: 1,
    textAlign: 'right',
    minWidth: '200px',
  },
  categoryTitle: {
    fontSize: '18px',
    color: COLORS.navy,
    margin: '0 0 4px 0',
  },
  categoryDesc: {
    fontSize: '13px',
    color: COLORS.muted,
    margin: 0,
  },
  categoryButtons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  btnOutline: {
    border: `1.5px solid ${COLORS.orange}`,
    color: COLORS.orange,
    backgroundColor: COLORS.white,
    padding: '8px 18px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.25s ease, color 0.25s ease, transform 0.25s ease',
    fontFamily: 'inherit',
    minHeight: 44,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontFamily: 'inherit',
    minHeight: 44,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default function Categories() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmallMobile(window.innerWidth < 480);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const categories = [
    { id: 'concepts', number: '01', title: '📘 المفاهيم العامة', description: 'تعريف الشبكة، أنواعها، نماذج Client-Server و P2P، الكابلات، VLAN، VPN.' },
    { id: 'ipv4', number: '02', title: '🌍 IPv4', description: 'بنية العنوان، الفئات (Classes)، العناوين العامة والخاصة، Gateway، Loopback.' },
    { id: 'subnetting', number: '03', title: '🔢 Subnetting', description: 'حسابات الشبكات الفرعية، CIDR، المضيفين، عنوان البث، الـ Increment.' },
    { id: 'ipv6', number: '04', title: '🛜 IPv6', description: 'بنية IPv6، أنواع العناوين، الاختصار، المقارنة مع IPv4.' },
    { id: 'osi', number: '05', title: '📡 OSI Model', description: 'الطبقات السبع، وظائف كل طبقة، البروتوكولات، وحدات البيانات (PDU).' },
    { id: 'devices', number: '06', title: '💻 أجهزة الشبكات', description: 'سويتش، راوتر، هاب، مودم، Bridge، Gateway، Access Point، Firewall.' },
    { id: 'email', number: '07', title: '📧 بروتوكولات البريد', description: 'SMTP، POP3، IMAP، المنافذ الافتراضية، الفرق بين البروتوكولات.' },
    { id: 'tcpip', number: '08', title: '🔗 TCP/IP', description: 'طبقات TCP/IP، TCP vs UDP، HTTP، Three-Way Handshake.' },
  ];

  return (
    <>
      <Head>
        <title>اختر تقييمك - Smart Lab</title>
        <meta name="description" content="اختر التقييم المناسب لك في هندسة الشبكات." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.5" />
        <style>{`
          @media (max-width: 768px) {
            .main { padding: 24px 16px 40px !important; }
            .page-title { font-size: 28px !important; }
            .page-desc { font-size: 14px !important; }
            .category-row { padding: 16px 18px !important; flex-direction: column !important; align-items: stretch !important; }
            .category-number { align-self: flex-start !important; }
            .category-info { min-width: unset !important; text-align: center !important; }
            .category-title { font-size: 17px !important; }
            .category-desc { font-size: 12.5px !important; }
            .category-buttons { justify-content: center !important; width: 100% !important; }
            .btn-filled, .btn-outline { flex: 1 !important; min-width: 100px !important; padding: 10px 14px !important; font-size: 12.5px !important; }
          }
          @media (max-width: 480px) {
            .main { padding: 16px 12px 30px !important; }
            .page-title { font-size: 24px !important; }
            .page-desc { font-size: 13px !important; }
            .back-button { font-size: 13px !important; padding: 6px 12px !important; min-height: 38px !important; }
            .category-row { padding: 14px 14px !important; gap: 10px !important; }
            .category-number { font-size: 11px !important; padding: 4px 10px !important; }
            .category-icon { font-size: 24px !important; }
            .category-title { font-size: 15px !important; }
            .category-desc { font-size: 12px !important; }
            .category-buttons { gap: 6px !important; flex-direction: column !important; }
            .btn-filled, .btn-outline { width: 100% !important; min-height: 44px !important; font-size: 13px !important; }
          }
        `}</style>
      </Head>

      <div style={styles.page}>
        <Navbar />

        <main style={{ ...styles.main, className: "main" }}>
          <Link href="/assessment" style={{ ...styles.backButton, className: "back-button" }}>
            ← العودة إلى مسارات التقييم
          </Link>

          <div style={styles.pageHeader}>
            <h1 style={{ ...styles.pageTitle, fontSize: isMobile ? '28px' : '32px', className: "page-title" }}>
              🌐 هندسة الشبكات - اختر تقييمك
            </h1>
            <p style={{ ...styles.pageDesc, fontSize: isMobile ? '14px' : '15px', className: "page-desc" }}>
              ثمانية مجالات تغطي جميع جوانب الشبكات. كل مجال له تقييم سريع وتقييم شامل.
            </p>
          </div>

          <div style={styles.categoryList}>
            {categories.map((cat) => (
              <div
                key={cat.id}
                style={styles.categoryRow}
                className="category-row"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                }}
              >
                <span style={styles.categoryNumber} className="category-number">{cat.number}</span>
                <span style={styles.categoryIcon} className="category-icon">{cat.title.split(' ')[0]}</span>
                <div style={styles.categoryInfo} className="category-info">
                  <h3 style={styles.categoryTitle} className="category-title">{cat.title}</h3>
                  <p style={styles.categoryDesc} className="category-desc">{cat.description}</p>
                </div>
                <div style={styles.categoryButtons} className="category-buttons">
                  <button
                    style={styles.btnFilled}
                    className="btn-filled"
                    onClick={() => router.push(`/assessment/${cat.id}?mode=quick`)}
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
                    className="btn-outline"
                    onClick={() => router.push(`/assessment/${cat.id}?mode=full`)}
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

        <Footer />
      </div>
    </>
  );
}
