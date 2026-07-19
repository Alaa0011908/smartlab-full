// pages/assessment/network-sub-tracks.js
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from "../../components/Navbar";

// ===== البيانات الجديدة =====
const SUB_TRACKS_DATA = [
  {
    id: 'basics',
    title: '🌐 أساسيات الشبكات',
    description: 'رحلة متكاملة لفهم أساسيات الشبكات من الصفر، تشمل المفاهيم التأسيسية مع تطبيقات عملية.',
    topics: [
      'المفاهيم العامة للشبكات (أنواعها، أشكالها، نماذجها)',
      'عنونة IPv4 (الخاصة والعامة، التصنيف)',
      'Subnetting و VLSM (التقسيم المتغير)',
      'IPv6 (البنية، الأنواع، الاختصار)',
      'نموذج OSI والبروتوكولات المرتبطة به',
      'أجهزة الشبكات (سويتش، راوتر، فايروول)',
      'بروتوكولات TCP/IP و UDP',
      'البريد الإلكتروني وبروتوكولاته',
    ],
    buttonText: '🚀 ابدأ المسار',
    actionType: 'primary'
  },
  {
    id: 'switching',
    title: '🔀 احتراف الـ Switching - إدارة الشبكات الداخلية',
    description: 'تعمق في آليات عمل المبدلات (Switches) وأفضل ممارسات إدارة الشبكات المحلية.',
    topics: [
      'أساسيات عمل الـ Switch وطبقاته',
      'إعدادات الـ VLANs وعزلها',
      'Spanning Tree Protocol (STP)',
      'EtherChannel وتوزيع الأحمال',
      'الأمان على مستوى الطبقة الثانية (Port Security)',
      'استكشاف أخطاء الشبكات الداخلية',
    ],
    buttonText: '📅 قريباً',
    actionType: 'secondary'
  },
  {
    id: 'routing',
    title: '🗺️ خبير التوجيه - Routing Professional',
    description: 'مسار متخصص في توجيه الشبكات وبناء جداول التوجيه بكفاءة عالية لشبكات المؤسسات.',
    topics: [
      'مبادئ التوجيه وأنواعه (Static - Dynamic)',
      'بروتوكولات التوجيه الداخلية (OSPF, EIGRP)',
      'بروتوكولات التوجيه الخارجية (BGP)',
      'تصميم الشبكات المتقدمة (VLSM, Route Summarization)',
      'سياسات التوجيه والتحكم في المسارات',
      'استكشاف أخطاء التوجيه وتحليل الأداء',
    ],
    buttonText: '📅 قريباً',
    actionType: 'secondary'
  }
];

// ===== المكون الرئيسي =====
export default function NetworkSubTracks() {
  const router = useRouter();

  const handleNavigation = (trackId) => {
    if (trackId === 'basics') {
      router.push('/assessment/categories');
    } else {
      alert('هذا المسار سيتم تفعيله قريباً!');
    }
  };

  return (
    <div style={styles.page} dir="rtl">
      {/* ===== Navbar ===== */}
      <Navbar />

      <div style={styles.mainWrapper}>
        <section style={styles.sectionHeader}>
          <h1 style={styles.mainTitle}>اختر المسار الفرعي لهندسة الشبكات</h1>
          <p style={styles.subtitle}>
            اختر أحد المسارات المتخصصة أدناه لبدء الاختبار التكيفي وتقييم مهاراتك بدقة.
          </p>
        </section>

        <main style={styles.cardsGrid}>
          {SUB_TRACKS_DATA.map((track, index) => (
            <div
              key={track.id}
              style={styles.card}
              className="track-card"
              onMouseEnter={(e) => {
                const card = e.currentTarget;
                card.style.transform = 'translateY(-8px)';
                card.style.boxShadow = '0 20px 40px rgba(15, 118, 110, 0.25)';
                card.style.borderColor = '#0f766e';
                // تغيير لون الخلفية
                card.style.backgroundColor = '#0f766e';
                // تغيير لون النصوص إلى الأبيض
                const title = card.querySelector('.card-title');
                const desc = card.querySelector('.card-desc');
                const topics = card.querySelectorAll('.topic-item');
                if (title) title.style.color = '#ffffff';
                if (desc) desc.style.color = '#ffffff';
                topics.forEach(t => t.style.color = '#ffffff');
                // تغيير لون الزر
                const btn = card.querySelector('.track-btn');
                if (btn) {
                  btn.style.backgroundColor = '#f8f9fa';
                  btn.style.color = '#0f766e';
                }
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform = 'translateY(0px)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
                card.style.borderColor = '#e5e7eb';
                card.style.backgroundColor = '#ffffff';
                const title = card.querySelector('.card-title');
                const desc = card.querySelector('.card-desc');
                const topics = card.querySelectorAll('.topic-item');
                if (title) title.style.color = '#0D1E3B';
                if (desc) desc.style.color = '#6B7280';
                topics.forEach(t => t.style.color = '#475569');
                const btn = card.querySelector('.track-btn');
                if (btn) {
                  btn.style.backgroundColor = track.actionType === 'primary' ? '#0f766e' : '#e0e0e0';
                  btn.style.color = track.actionType === 'primary' ? '#ffffff' : '#777777';
                }
              }}
            >
              <div style={styles.iconPlaceholder}>🌐</div>
              <h2 style={styles.cardTitle} className="card-title">{track.title}</h2>
              <p style={styles.cardDescription} className="card-desc">{track.description}</p>

              {/* المحاور */}
              <div style={styles.topicsContainer}>
                <div style={styles.topicsTitle}>📌 تشمل المحاور:</div>
                <ul style={styles.topicsList}>
                  {track.topics.map((topic, idx) => (
                    <li key={idx} style={styles.topicItem} className="topic-item">
                      <span style={styles.topicBullet}>•</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleNavigation(track.id)}
                style={{
                  ...styles.button,
                  ...(track.actionType === 'secondary' ? styles.btnSecondary : styles.btnPrimary)
                }}
                className="track-btn"
                disabled={track.actionType === 'secondary'}
              >
                {track.buttonText}
              </button>
            </div>
          ))}
        </main>
      </div>

      {/* ===== Footer ===== */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerLeft}>
            <p style={styles.footerBrand}>SmartLab</p>
            <p style={styles.footerText}>منصة تعليمية متطورة لدعم التعلم التكيفي والمحاكاة.</p>
          </div>
          <div style={styles.footerRight}>
            <p style={styles.footerContactTitle}>تواصل معنا</p>
            <div style={styles.footerEmailWrap}>
              <svg width="64" height="50" viewBox="0 0 64 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_334_96)">
                  <mask id="path-1-inside-1_334_96" fill="white">
                    <path d="M12 28C12 16.9543 20.9543 8 32 8C43.0457 8 52 16.9543 52 28C52 39.0457 43.0457 48 32 48C20.9543 48 12 39.0457 12 28Z"/>
                  </mask>
                  <path d="M12 28C12 16.9543 20.9543 8 32 8C43.0457 8 52 16.9543 52 28C52 39.0457 43.0457 48 32 48C20.9543 48 12 39.0457 12 28Z" fill="white" fillOpacity="0.1" shapeRendering="crispEdges"/>
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

// ===== الأنماط =====
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
    border: '2px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'default',
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
    transition: 'color 0.3s ease',
  },
  cardDescription: {
    fontSize: '14px',
    color: '#6B7280',
    lineHeight: '1.8',
    marginBottom: '20px',
    flexGrow: 1,
    transition: 'color 0.3s ease',
  },
  topicsContainer: {
    width: '100%',
    marginTop: '12px',
    marginBottom: '24px',
    textAlign: 'right',
  },
  topicsTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#64748B',
    marginBottom: '8px',
  },
  topicsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  topicItem: {
    fontSize: '13px',
    color: '#475569',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    lineHeight: 1.6,
    transition: 'color 0.3s ease',
  },
  topicBullet: {
    color: '#0f766e',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  button: {
    padding: '12px 34px',
    fontSize: '16px',
    fontWeight: '700',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.3s ease',
  },
  btnPrimary: {
    backgroundColor: '#0f766e',
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
