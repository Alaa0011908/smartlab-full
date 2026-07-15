// pages/assessment/basics.js - النسخة المطورة (مع التقييم السريع)
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BasicsAssessments() {
  const router = useRouter();
  const [completedAssessments, setCompletedAssessments] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('basicsProgress');
    if (saved) {
      const data = JSON.parse(saved);
      setCompletedAssessments(data.completed || []);
      setTotalScore(data.totalScore || 0);
    }
  }, []);

  const assessments = [
    { id: 'concepts', title: '📘 المفاهيم العامة', description: 'تعريف الشبكة، أنواعها، نماذج Client-Server و P2P، الكابلات، أنواع الإرسال', questions: 40, time: '8-10 دقائق', icon: '📘', color: '#1E3A8A', completed: completedAssessments.includes('concepts'), type: 'topic' },
    { id: 'ipv4', title: '🌍 IPv4', description: 'تعريف IP، التصنيف (Class A, B, C)، العناوين العامة والخاصة، Gateway، Loopback', questions: 35, time: '7-9 دقائق', icon: '🌍', color: '#2ECC71', completed: completedAssessments.includes('ipv4'), type: 'topic' },
    { id: 'subnetting', title: '🔢 Subnetting', description: 'حسابات الشبكات الفرعية، CIDR، المضيفين، عنوان البث، الـ Increment', questions: 30, time: '8-10 دقائق', icon: '🔢', color: '#F39C12', completed: completedAssessments.includes('subnetting'), type: 'topic' },
    { id: 'ipv6', title: '🛜 IPv6', description: 'بنية IPv6، أنواع العناوين، الاختصار، المقارنة مع IPv4', questions: 25, time: '5-7 دقائق', icon: '🛜', color: '#9B59B6', completed: completedAssessments.includes('ipv6'), type: 'topic' },
    { id: 'osi', title: '📡 OSI Model', description: 'الطبقات السبع، وظائف كل طبقة، البروتوكولات، وحدات البيانات (PDU)', questions: 25, time: '5-7 دقائق', icon: '📡', color: '#E74C3C', completed: completedAssessments.includes('osi'), type: 'topic' },
    { id: 'devices', title: '💻 أجهزة الشبكات', description: 'سويتش، راوتر، هاب، مودم، Bridge، Gateway، Access Point، Firewall', questions: 22, time: '5-6 دقائق', icon: '💻', color: '#1ABC9C', completed: completedAssessments.includes('devices'), type: 'topic' },
    { id: 'email', title: '📧 بروتوكولات البريد الإلكتروني', description: 'SMTP، POP3، IMAP، المنافذ الافتراضية، الفرق بين البروتوكولات', questions: 15, time: '3-4 دقائق', icon: '📧', color: '#E67E22', completed: completedAssessments.includes('email'), type: 'topic' },
    { id: 'tcpip', title: '🔗 TCP/IP', description: 'طبقات TCP/IP، TCP vs UDP، HTTP، Three-Way Handshake', questions: 25, time: '5-7 دقائق', icon: '🔗', color: '#16A085', completed: completedAssessments.includes('tcpip'), type: 'topic' },
    { id: 'full', title: '📊 التقييم الشامل', description: 'جميع موضوعات الشبكات في تقييم واحد متكامل', questions: 202, time: '40-50 دقيقة', icon: '📊', color: '#2C3E50', completed: completedAssessments.includes('full'), type: 'full' },
    { id: 'full', title: '⚡ تقييم سريع', description: '15 سؤال تشخيصي لتحديد مستواك بدقة وسرعة', questions: 15, time: '5-8 دقائق', icon: '⚡', color: '#FF9800', completed: completedAssessments.includes('quick'), type: 'quick', isQuick: true },
  ];

  const completedCount = assessments.filter(a => a.completed).length;
  const progress = Math.round((completedCount / assessments.length) * 100);

  const startAssessment = (assessment) => {
    if (assessment.isQuick) {
      router.push(`/assessment/full?mode=quick`);
    } else {
      router.push(`/assessment/${assessment.id}`);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link href="/" style={styles.logo}>🧠 Smart Lab</Link>
        <Link href="/assessment/categories" style={styles.backButton}>← العودة للمسارات</Link>
      </div>

      <main style={styles.main}>
        <div style={styles.pageHeader}>
          <h1 style={styles.title}>📂 أساسيات الشبكات</h1>
          <p style={styles.subtitle}>اختر التقييم المناسب لك، كل تقييم يركز على مجال محدد</p>
        </div>

        <div style={styles.progressCard}>
          <div style={styles.progressHeader}>
            <span style={styles.progressLabel}>📊 تقدمك في أساسيات الشبكات</span>
            <span style={styles.progressPercentage}>{progress}%</span>
          </div>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
          <div style={styles.progressStats}>
            <span>✅ {completedCount} من {assessments.length} تقييمات مكتملة</span>
            <span>🏆 {totalScore} نقطة</span>
          </div>
        </div>

        <h3 style={styles.sectionTitle}>📚 تقييمات حسب الموضوع</h3>
        <div style={styles.assessmentsGrid}>
          {assessments.filter(a => a.type === 'topic').map((assessment) => (
            <div key={assessment.id} style={{ ...styles.assessmentCard, borderColor: assessment.completed ? '#2ECC71' : '#e0e0e0', opacity: assessment.completed ? 0.85 : 1 }}>
              <div style={styles.cardHeader}>
                <div style={{ ...styles.cardIcon, backgroundColor: assessment.color }}>{assessment.icon}</div>
                <div style={styles.cardInfo}>
                  <h3 style={styles.cardTitle}>{assessment.title}</h3>
                  <div style={styles.cardMeta}>
                    <span>📝 {assessment.questions} سؤال</span>
                    <span>⏱️ {assessment.time}</span>
                  </div>
                </div>
                {assessment.completed && <span style={styles.completedBadge}>✅ مكتمل</span>}
              </div>
              <p style={styles.cardDescription}>{assessment.description}</p>
              <button onClick={() => startAssessment(assessment)} style={{ ...styles.startButton, backgroundColor: assessment.completed ? '#2ECC71' : assessment.color }}>
                {assessment.completed ? '🔄 إعادة التقييم' : '▶️ ابدأ التقييم'}
              </button>
            </div>
          ))}
        </div>

        <h3 style={styles.sectionTitle}>🎯 تقييمات المستوى العام</h3>
        <div style={styles.specialGrid}>
          {assessments.filter(a => a.type === 'full' || a.type === 'quick').map((assessment) => (
            <div key={assessment.icon} style={{ ...styles.specialCard, borderColor: assessment.isQuick ? '#FF9800' : '#2C3E50' }}>
              <div style={styles.specialCardContent}>
                <div style={{ ...styles.specialIcon, backgroundColor: assessment.color }}>{assessment.icon}</div>
                <div style={styles.specialInfo}>
                  <h3 style={styles.specialTitle}>{assessment.title}</h3>
                  <p style={styles.specialDesc}>{assessment.description}</p>
                  <div style={styles.specialMeta}>
                    <span>📝 {assessment.questions} سؤال</span>
                    <span>⏱️ {assessment.time}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => startAssessment(assessment)} style={{ ...styles.specialButton, backgroundColor: assessment.color }}>▶️ ابدأ الآن</button>
            </div>
          ))}
        </div>

        <div style={styles.tipBox}>
          <span style={styles.tipIcon}>💡</span>
          <div>
            <strong>نصيحة:</strong> ابدأ بالتقييمات الأصغر (بروتوكولات البريد، أجهزة الشبكات) ثم انتقل للتقييمات الأكبر. التقييم السريع مثالي لفحص مستواك الحالي!
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>© 2026 Smart Lab - منصة تعليمية سورية مدعومة بالذكاء الاصطناعي</p>
      </footer>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f5f5f5', direction: 'rtl', fontFamily: 'system-ui, sans-serif', padding: '1rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#0D1E3B', color: 'white', borderRadius: '12px', marginBottom: '1.5rem' },
  logo: { fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textDecoration: 'none' },
  backButton: { color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '8px' },
  main: { maxWidth: '1000px', margin: '0 auto' },
  pageHeader: { textAlign: 'center', marginBottom: '2rem' },
  title: { fontSize: '2rem', color: '#0D1E3B', marginBottom: '0.5rem' },
  subtitle: { color: '#666', fontSize: '1rem' },
  sectionTitle: { fontSize: '1.3rem', color: '#0D1E3B', marginBottom: '1rem', marginTop: '0.5rem' },
  progressCard: { backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '2rem' },
  progressHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' },
  progressLabel: { fontWeight: 'bold', color: '#0D1E3B' },
  progressPercentage: { fontWeight: 'bold', color: '#0D1E3B' },
  progressBar: { height: '8px', backgroundColor: '#ecf0f1', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.75rem' },
  progressFill: { height: '100%', backgroundColor: '#2ECC71', borderRadius: '4px', transition: 'width 0.5s ease' },
  progressStats: { display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#666' },
  assessmentsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '2rem' },
  assessmentCard: { backgroundColor: 'white', padding: '1.25rem', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '2px solid #e0e0e0', transition: 'all 0.2s' },
  cardHeader: { display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' },
  cardIcon: { width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: '1rem', margin: 0, color: '#0D1E3B' },
  cardMeta: { display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: '#666', marginTop: '0.2rem' },
  completedBadge: { fontSize: '0.7rem', color: '#2ECC71', fontWeight: 'bold', backgroundColor: '#E8F5E9', padding: '2px 10px', borderRadius: '20px', flexShrink: 0 },
  cardDescription: { fontSize: '0.85rem', color: '#555', lineHeight: '1.5', marginBottom: '1rem', minHeight: '40px' },
  startButton: { width: '100%', padding: '0.6rem', border: 'none', borderRadius: '8px', color: 'white', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', transition: 'opacity 0.2s' },
  specialGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.25rem', marginBottom: '2rem' },
  specialCard: { backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '3px solid #2C3E50', display: 'flex', flexDirection: 'column', gap: '1rem' },
  specialCardContent: { display: 'flex', gap: '1rem', alignItems: 'flex-start' },
  specialIcon: { width: '56px', height: '56px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 },
  specialInfo: { flex: 1 },
  specialTitle: { fontSize: '1.15rem', margin: 0, color: '#0D1E3B', marginBottom: '0.35rem' },
  specialDesc: { fontSize: '0.85rem', color: '#555', margin: 0, marginBottom: '0.5rem', lineHeight: '1.4' },
  specialMeta: { display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#666' },
  specialButton: { width: '100%', padding: '0.75rem', border: 'none', borderRadius: '10px', color: 'white', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'opacity 0.2s' },
  tipBox: { backgroundColor: '#FFF8E1', padding: '1rem 1.25rem', borderRadius: '12px', display: 'flex', gap: '0.75rem', alignItems: 'flex-start', border: '1px solid #FFE082', marginBottom: '2rem' },
  tipIcon: { fontSize: '1.25rem' },
  footer: { textAlign: 'center', padding: '1.5rem', backgroundColor: '#333', color: 'white', borderRadius: '12px', fontSize: '0.85rem' },
};
