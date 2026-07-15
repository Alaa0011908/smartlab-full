// pages/assessment/categories.js
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

export default function Categories() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState('quick');

  const categories = [
    {
      id: 'basics',
      title: '🌐 أساسيات الشبكات',
      description: 'IP Addressing، Subnetting، OSI Model، TCP/IP',
      icon: '🌐',
      color: '#1E3A8A',
      gradient: 'linear-gradient(135deg, #1E3A8A, #3B5B9B)',
      topics: ['IP Addressing', 'Subnetting', 'OSI Model', 'TCP/IP'],
      path: '/assessment/basics',
    },
    {
      id: 'ipv4',
      title: '🌍 IPv4',
      description: 'تعريف IP، التصنيف، العناوين العامة والخاصة، Gateway',
      icon: '🌍',
      color: '#2ECC71',
      gradient: 'linear-gradient(135deg, #2ECC71, #27AE60)',
      topics: ['IP Definition', 'Classification', 'Public/Private', 'Gateway'],
      path: '/assessment/ipv4',
    },
    {
      id: 'subnetting',
      title: '🔢 Subnetting',
      description: 'حسابات الشبكات الفرعية، CIDR، المضيفين، VLSM',
      icon: '🔢',
      color: '#F39C12',
      gradient: 'linear-gradient(135deg, #F39C12, #E67E22)',
      topics: ['Subnet Calculation', 'CIDR', 'Hosts', 'VLSM'],
      path: '/assessment/subnetting',
    },
  ];

  const assessmentModes = [
    { id: 'quick', label: '⚡ تقييم سريع', description: '15 سؤال فقط - 5 دقائق', icon: '⚡' },
    { id: 'full', label: '📊 تقييم شامل', description: 'جميع الأسئلة - حسب القسم', icon: '📊' },
  ];

  return (
    <div style={styles.container}>
      {/* الهيدر */}
      <div style={styles.header}>
        <div style={styles.logo}>🧠 Smart Lab</div>
        <div style={styles.nav}>
          <Link href="/assessment/categories" style={{...styles.navLink, ...styles.activeLink}}>التقييم</Link>
          <Link href="/scenarios" style={styles.navLink}>السيناريوهات</Link>
          <Link href="/auth/signup" style={styles.loginBtn}>تسجيل الدخول</Link>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <main style={styles.main}>
        <div style={styles.headerSection}>
          <h1 style={styles.title}>📋 اختر مسار التقييم</h1>
          <p style={styles.subtitle}>اختر المسار اللي تريد تقييم نفسك فيه</p>
        </div>

        {/* ✅ إضافة خيارات التقييم (سريع / شامل) */}
        <div style={styles.modeSelector}>
          {assessmentModes.map((mode) => (
            <div
              key={mode.id}
              style={{
                ...styles.modeCard,
                borderColor: selectedMode === mode.id ? '#0D1E3B' : '#e0e0e0',
                backgroundColor: selectedMode === mode.id ? '#E3F2FD' : 'white',
              }}
              onClick={() => setSelectedMode(mode.id)}
            >
              <span style={styles.modeIcon}>{mode.icon}</span>
              <div style={styles.modeInfo}>
                <span style={styles.modeLabel}>{mode.label}</span>
                <span style={styles.modeDescription}>{mode.description}</span>
              </div>
              {selectedMode === mode.id && <span style={styles.modeCheck}>✓</span>}
            </div>
          ))}
        </div>

        <div style={styles.cardsContainer}>
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              style={styles.card}
              onClick={() => router.push(`${cat.path}?mode=${selectedMode}`)}
            >
              <div style={styles.cardHeader}>
                <div style={{...styles.cardIconBg, background: cat.gradient}}>
                  <span style={styles.cardIcon}>{cat.icon}</span>
                </div>
                <h2 style={styles.cardTitle}>{cat.title}</h2>
              </div>
              <p style={styles.cardDesc}>{cat.description}</p>
              <div style={styles.topicsContainer}>
                {cat.topics.map((topic, idx) => (
                  <span key={idx} style={styles.topicBadge}>• {topic}</span>
                ))}
              </div>
              <div style={styles.cardFooter}>
                <span style={{...styles.startBtn, backgroundColor: cat.color}}>
                  {selectedMode === 'quick' ? '⚡ تقييم سريع' : '📊 تقييم شامل'} ←
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.tipBox}>
          <span style={styles.tipIcon}>💡</span>
          <div><strong>نصيحة:</strong> ابدأ بالتقييم السريع لمعرفة مستواك العام، ثم استخدم التقييم الشامل للتعمق.</div>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>© 2026 Smart Lab - منصة تعليمية ذكية</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    direction: 'rtl',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#1E3A8A',
    color: 'white',
    flexWrap: 'wrap',
  },
  logo: { fontSize: '20px', fontWeight: 'bold' },
  nav: { display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' },
  navLink: { color: 'white', textDecoration: 'none', fontSize: '15px', opacity: 0.8 },
  activeLink: { opacity: 1, borderBottom: '2px solid #4CAF50', paddingBottom: '4px' },
  loginBtn: { backgroundColor: '#4CAF50', color: 'white', padding: '6px 16px', borderRadius: '30px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' },
  main: { flex: 1, maxWidth: '1000px', width: '100%', margin: '0 auto' },
  headerSection: { textAlign: 'center', padding: '30px 20px 20px 20px' },
  title: { fontSize: '30px', color: '#1E3A8A', marginBottom: '8px' },
  subtitle: { fontSize: '14px', color: '#666' },
  modeSelector: { display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap', padding: '0 20px' },
  modeCard: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', borderRadius: '12px', border: '2px solid #e0e0e0', cursor: 'pointer', transition: 'all 0.2s', flex: '1 1 200px', maxWidth: '280px' },
  modeIcon: { fontSize: '1.5rem' },
  modeInfo: { display: 'flex', flexDirection: 'column' },
  modeLabel: { fontSize: '0.95rem', fontWeight: 'bold', color: '#0D1E3B' },
  modeDescription: { fontSize: '0.75rem', color: '#666' },
  modeCheck: { color: '#2ECC71', fontWeight: 'bold', fontSize: '1.2rem' },
  cardsContainer: { display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px', padding: '0 20px' },
  card: { backgroundColor: 'white', borderRadius: '18px', padding: '20px', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' },
  cardIconBg: { width: '50px', height: '50px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardIcon: { fontSize: '26px' },
  cardTitle: { fontSize: '19px', color: '#333', margin: 0 },
  cardDesc: { fontSize: '13px', color: '#666', marginBottom: '14px', lineHeight: 1.5 },
  topicsContainer: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' },
  topicBadge: { fontSize: '12px', color: '#555', backgroundColor: '#f0f0f0', padding: '3px 10px', borderRadius: '20px' },
  cardFooter: { borderTop: '1px solid #eee', paddingTop: '14px' },
  startBtn: { display: 'inline-block', padding: '8px 20px', borderRadius: '30px', color: 'white', fontSize: '13px', fontWeight: 'bold', textAlign: 'center', cursor: 'pointer' },
  tipBox: { backgroundColor: '#FFF8E1', padding: '12px 18px', borderRadius: '12px', display: 'flex', gap: '10px', alignItems: 'center', margin: '0 20px 40px 20px', border: '1px solid #FFE082' },
  tipIcon: { fontSize: '18px' },
  footer: { textAlign: 'center', padding: '18px', backgroundColor: '#333', color: 'white', fontSize: '12px' },
};
