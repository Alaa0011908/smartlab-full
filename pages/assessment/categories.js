// pages/assessment/categories.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: COLORS.bg,
    direction: 'rtl',
    fontFamily: "'Segoe UI', Tahoma, 'Cairo', system-ui, sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch', // ✅ تغيير من 'center' إلى 'stretch'
    width: '100%',
  },
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
};

export default function Categories() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      {/* ✅ الـ Navbar من المكون الموحد */}
      <Navbar />

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

      <Footer />
    </div>
  );
}
