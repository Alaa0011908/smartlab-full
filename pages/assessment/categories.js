// pages/assessment/categories.js - النسخة المتوافقة مع النظام الجديد
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getAssessmentName } from '../../data/questions/basics';

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
  success: "#2ECC71",
  warning: "#F39C12",
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: COLORS.bg,
    direction: 'rtl',
    fontFamily: "'Segoe UI', Tahoma, 'Cairo', system-ui, sans-serif",
    display: 'flex',
    flexDirection: 'column',
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
  pageHeader: { textAlign: 'center', marginBottom: '32px' },
  pageTitle: { fontSize: '32px', fontWeight: 800, color: COLORS.navy, margin: '0 0 8px 0' },
  pageDesc: { fontSize: '15px', color: COLORS.muted, maxWidth: '570px', margin: '0 auto', lineHeight: 1.7 },
  backButton: {
    display: 'inline-flex', alignItems: 'center', gap: '8px', color: COLORS.teal,
    textDecoration: 'none', fontSize: '15px', fontWeight: 600, marginBottom: '24px',
    padding: '8px 16px', borderRadius: '8px', backgroundColor: COLORS.white,
    border: '1px solid ' + COLORS.border, minHeight: 44,
  },
  categoryList: { display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' },
  categoryRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
    backgroundColor: COLORS.white, borderRadius: '16px', padding: '20px 24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)', flexWrap: 'wrap',
  },
  categoryNumber: {
    fontSize: '13px', fontWeight: 'bold', color: COLORS.teal,
    backgroundColor: '#E6F5F4', padding: '6px 12px', borderRadius: '10px',
  },
  categoryIcon: { fontSize: '28px' },
  categoryInfo: { flex: 1, textAlign: 'right', minWidth: '200px' },
  categoryTitle: { fontSize: '18px', color: COLORS.navy, margin: '0 0 4px 0' },
  categoryDesc: { fontSize: '13px', color: COLORS.muted, margin: 0 },
  categoryStatus: { fontSize: '13px', fontWeight: 600, marginTop: 4 },
  categoryButtons: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  btnOutline: {
    border: '1.5px solid ' + COLORS.orange, color: COLORS.orange, backgroundColor: COLORS.white,
    padding: '8px 18px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold',
    cursor: 'pointer', fontFamily: 'inherit', minHeight: 44,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  },
  btnFilled: {
    border: 'none', color: COLORS.white, backgroundColor: COLORS.teal,
    padding: '8px 18px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold',
    cursor: 'pointer', fontFamily: 'inherit', minHeight: 44,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  },
};

export default function Categories() {
  const router = useRouter();
  const [assessmentStatus, setAssessmentStatus] = useState({});

  useEffect(() => {
    try {
      const results = JSON.parse(localStorage.getItem('assessmentResults') || '[]');
      const statusMap = {};
      const categoriesList = ['concepts', 'ipv4', 'subnetting', 'ipv6', 'osi', 'devices', 'email', 'tcpip'];
      categoriesList.forEach(id => {
        const completed = results.filter(r => r.assessmentName === getAssessmentName(id));
        if (completed.length > 0) {
          const last = completed[completed.length - 1];
          if (last.score >= 80) statusMap[id] = { status: '✅ مكتمل', color: COLORS.success };
          else if (last.score >= 50) statusMap[id] = { status: '🔄 قيد التقدم', color: COLORS.warning };
          else statusMap[id] = { status: '⚠️ يحتاج إعادة', color: COLORS.orange };
        } else {
          statusMap[id] = { status: '▶️ جديد', color: COLORS.muted };
        }
      });
      setAssessmentStatus(statusMap);
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  const categories = [
    { id: 'concepts', number: '01', title: '📘 المفاهيم العامة', description: 'تعريف الشبكة، أنواعها، نماذج Client-Server و P2P، الكابلات، VLAN، VPN.' },
    { id: 'ipv4', number: '02', title: '🌍 IPv4', description: 'بنية العنوان، الفئات، العناوين العامة والخاصة، Gateway، Loopback.' },
    { id: 'subnetting', number: '03', title: '🔢 Subnetting', description: 'حسابات الشبكات الفرعية، CIDR، المضيفين، عنوان البث.' },
    { id: 'ipv6', number: '04', title: '🛜 IPv6', description: 'بنية IPv6، أنواع العناوين، الاختصار.' },
    { id: 'osi', number: '05', title: '📡 OSI Model', description: 'الطبقات السبع، وظائف كل طبقة، البروتوكولات.' },
    { id: 'devices', number: '06', title: '💻 أجهزة الشبكات', description: 'سويتش، راوتر، هاب، Firewall، Access Point.' },
    { id: 'email', number: '07', title: '📧 بروتوكولات البريد', description: 'SMTP، POP3، IMAP، المنافذ.' },
    { id: 'tcpip', number: '08', title: '🔗 TCP/IP', description: 'طبقات TCP/IP، TCP vs UDP، HTTP.' },
  ];

  return (
    <>
      <Head>
        <title>اختر تقييمك - Smart Lab</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={styles.page}>
        <Navbar />
        <main style={styles.main}>
          <Link href="/" style={styles.backButton}>← العودة للرئيسية</Link>
          <div style={styles.pageHeader}>
            <h1 style={styles.pageTitle}>🌐 هندسة الشبكات - اختر تقييمك</h1>
            <p style={styles.pageDesc}>ثمانية مجالات. كل مجال له تقييم سريع وتقييم شامل.</p>
          </div>
          <div style={styles.categoryList}>
            {categories.map((cat) => {
              const status = assessmentStatus[cat.id] || { status: '▶️ جديد', color: COLORS.muted };
              return (
                <div key={cat.id} style={styles.categoryRow}>
                  <span style={styles.categoryNumber}>{cat.number}</span>
                  <span style={styles.categoryIcon}>{cat.title.split(' ')[0]}</span>
                  <div style={styles.categoryInfo}>
                    <h3 style={styles.categoryTitle}>{cat.title}</h3>
                    <p style={styles.categoryDesc}>{cat.description}</p>
                    <span style={{ ...styles.categoryStatus, color: status.color }}>{status.status}</span>
                  </div>
                  <div style={styles.categoryButtons}>
                    <button
                      style={styles.btnFilled}
                      onClick={() => router.push(`/assessment/${cat.id}?mode=quick`)}
                    >
                      ⚡ سريع
                    </button>
                    <button
                      style={styles.btnOutline}
                      onClick={() => router.push(`/assessment/${cat.id}?mode=full`)}
                    >
                      📊 شامل
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
