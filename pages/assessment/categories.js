// pages/assessment/categories.js
// ============================================================
// صفحة اختيار التقييم - 8 أقسام مع تقييم سريع وشامل
// ============================================================
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
  success: "#2ECC71",
  warning: "#F39C12",
  error: "#E74C3C",
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
    maxWidth: '900px',
    width: '100%',
    margin: '0 auto',
    padding: '30px 20px 60px',
    boxSizing: 'border-box',
  },
  pageHeader: { textAlign: 'center', marginBottom: '30px' },
  pageTitle: { fontSize: '28px', fontWeight: 800, color: COLORS.navy, margin: '0 0 8px 0' },
  pageDesc: { fontSize: '14px', color: COLORS.muted, maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 },
  backButton: {
    display: 'inline-flex', alignItems: 'center', gap: '8px', color: COLORS.teal,
    textDecoration: 'none', fontSize: '14px', fontWeight: 600, marginBottom: '20px',
    padding: '8px 16px', borderRadius: '8px', backgroundColor: COLORS.white,
    border: '1px solid ' + COLORS.border,
  },
  categoryList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  categoryCard: {
    backgroundColor: COLORS.white,
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    border: '1px solid ' + COLORS.border,
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
  },
  categoryTitle: { fontSize: '16px', fontWeight: 700, color: COLORS.navy, margin: 0 },
  categoryDesc: { fontSize: '13px', color: COLORS.muted, margin: '4px 0 0 0' },
  categoryStats: { display: 'flex', gap: '16px', fontSize: '12px', color: COLORS.muted, marginTop: '8px' },
  statItem: { display: 'flex', alignItems: 'center', gap: '4px' },
  buttonGroup: { display: 'flex', gap: '8px', marginTop: '12px' },
  btnQuick: {
    flex: 1,
    border: 'none',
    color: COLORS.white,
    backgroundColor: COLORS.teal,
    padding: '10px 16px',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  },
  btnFull: {
    flex: 1,
    border: '2px solid ' + COLORS.orange,
    color: COLORS.orange,
    backgroundColor: COLORS.white,
    padding: '10px 16px',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  },
  statusBadge: {
    fontSize: '12px',
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: '12px',
  },
};

export default function Categories() {
  const router = useRouter();
  const [assessmentStatus, setAssessmentStatus] = useState({});

  useEffect(() => {
    try {
      const results = JSON.parse(localStorage.getItem('assessmentResults') || '[]');
      const statusMap = {};
      
      const categoriesList = [
        'general-concepts', 'ipv4', 'subnetting', 'ipv6', 'osi-model', 'network-devices', 'email-protocols', 'tcp-ip', 'full'
      ];
      
      categoriesList.forEach(id => {
        const completed = results.filter(r => r.assessmentId === id);
        if (completed.length > 0) {
          const last = completed[completed.length - 1];
          if (last.score >= 80) statusMap[id] = { status: 'مكتمل', color: COLORS.success, bg: '#E8F5E9' };
          else if (last.score >= 50) statusMap[id] = { status: 'قيد التقدم', color: COLORS.warning, bg: '#FFF8E1' };
          else statusMap[id] = { status: 'يحتاج إعادة', color: COLORS.error, bg: '#FFEBEE' };
        } else {
          statusMap[id] = { status: 'جديد', color: COLORS.muted, bg: '#F5F5F5' };
        }
      });
      
      setAssessmentStatus(statusMap);
    } catch (error) {
      console.error('Error loading assessment status:', error);
    }
  }, []);

  const categories = [
    {
      id: 'general-concepts',
      icon: '📚',
      title: 'المفاهيم العامة',
      description: 'أساسيات الشبكات، التعريفات، والمفاهيم الأساسية',
      quickCount: 12,
      fullCount: 30,
      topics: ['تعريف الشبكة', 'أنواع الشبكات', 'الخوادم', 'العميل', 'البروتوكولات'],
    },
    {
      id: 'ipv4',
      icon: '🌍',
      title: 'IPv4',
      description: 'عناوين IPv4، الفئات، والتوزيع',
      quickCount: 12,
      fullCount: 30,
      topics: ['فئات العناوين', 'العناوين الخاصة', 'NAT', 'APIPA', 'التكوين'],
    },
    {
      id: 'subnetting',
      icon: '🔢',
      title: 'Subnetting',
      description: 'تقسيم الشبكات، CIDR، وحساب الشبكات الفرعية',
      quickCount: 12,
      fullCount: 30,
      topics: ['CIDR', 'حساب الشبكات', 'الأقنعة', 'Hosts', 'VLSM'],
    },
    {
      id: 'ipv6',
      icon: '🌐',
      title: 'IPv6',
      description: 'عناوين IPv6، الأنواع، والتكوين',
      quickCount: 12,
      fullCount: 30,
      topics: ['تنسيق العنوان', 'أنواع العناوين', 'EUI-64', 'التكوين', 'الانتقال'],
    },
    {
      id: 'osi-model',
      icon: '📊',
      title: 'OSI Model',
      description: 'نموذج OSI السبع طبقات ووظائفها',
      quickCount: 12,
      fullCount: 30,
      topics: ['الطبقات السبع', 'الوظائف', 'البروتوكولات', 'Encapsulation', 'الأجهزة'],
    },
    {
      id: 'network-devices',
      icon: '🔧',
      title: 'أجهزة الشبكات',
      description: 'Routers, Switches, Hubs, Access Points',
      quickCount: 12,
      fullCount: 30,
      topics: ['Router', 'Switch', 'Hub', 'AP', 'Firewall'],
    },
    {
      id: 'email-protocols',
      icon: '📧',
      title: 'بروتوكولات البريد',
      description: 'SMTP, POP3, IMAP, والفروق بينها',
      quickCount: 12,
      fullCount: 30,
      topics: ['SMTP', 'POP3', 'IMAP', 'المنافذ', 'التشفير'],
    },
    {
      id: 'tcp-ip',
      icon: '🔗',
      title: 'TCP/IP',
      description: 'بروتوكولات النقل، TCP vs UDP، المنافذ',
      quickCount: 12,
      fullCount: 30,
      topics: ['TCP', 'UDP', 'Three-way Handshake', 'المنافذ', 'الاتصال'],
    },
    {
      id: 'full',
      icon: '🏆',
      title: 'التقييم الشامل',
      description: 'جميع المحاور الثمانية - تقييم كامل للمستوى',
      quickCount: 12,
      fullCount: 240,
      topics: ['جميع المحاور'],
    },
  ];

  return (
    <>
      <Head>
        <title>اختر تقييمك - SmartLab</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={styles.page}>
        <Navbar />
        <main style={styles.main}>
          <Link href="/">
            <a style={styles.backButton}>← العودة للرئيسية</a>
          </Link>
          
          <div style={styles.pageHeader}>
            <h1 style={styles.pageTitle}>🎯 تقييم هندسة الشبكات</h1>
            <p style={styles.pageDesc}>
              اختر المحور المناسب. التقييم السريع 12 سؤال، والشامل 30 سؤال لكل محور.
            </p>
          </div>

          <div style={styles.categoryList}>
            {categories.map((cat) => {
              const status = assessmentStatus[cat.id] || { status: 'جديد', color: COLORS.muted, bg: '#F5F5F5' };
              return (
                <div key={cat.id} style={styles.categoryCard}>
                  <div style={styles.categoryHeader}>
                    <div style={{ flex: 1 }}>
                      <h3 style={styles.categoryTitle}>
                        {cat.icon} {cat.title}
                      </h3>
                      <p style={styles.categoryDesc}>{cat.description}</p>
                      <div style={styles.categoryStats}>
                        <span style={styles.statItem}>⚡ {cat.quickCount} سريع</span>
                        <span style={styles.statItem}>📊 {cat.fullCount} شامل</span>
                      </div>
                    </div>
                    <span style={{
                      ...styles.statusBadge,
                      color: status.color,
                      backgroundColor: status.bg,
                    }}>
                      {status.status}
                    </span>
                  </div>
                  
                  <div style={styles.buttonGroup}>
                    <button
                      style={styles.btnQuick}
                      onClick={() => router.push(`/assessment/${cat.id}?mode=quick`)}
                    >
                      ⚡ تقييم سريع ({cat.quickCount} أسئلة)
                    </button>
                    <button
                      style={styles.btnFull}
                      onClick={() => router.push(`/assessment/${cat.id}?mode=full`)}
                    >
                      📊 تقييم شامل ({cat.fullCount} أسئلة)
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
