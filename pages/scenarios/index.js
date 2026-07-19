// pages/scenarios/index.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from "../../components/Navbar";

const colors = {
  navy: '#0D1E3B',
  teal: '#0F766E',
  tealLight: '#E6F5F4',
  orange: '#F97316',
  bg: '#F8FAFC',
  textGray: '#6B7280',
  border: '#E5E7EB',
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'var(--bg)',
    direction: 'rtl',
  },
  hero: {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '56px 40px 28px',
    textAlign: 'center',
  },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: colors.tealLight,
    color: colors.teal,
    fontWeight: 700,
    fontSize: '13px',
    padding: '7px 16px',
    borderRadius: '999px',
    marginBottom: '18px',
  },
  heroTitle: {
    fontSize: '38px',
    fontWeight: 900,
    lineHeight: 1.35,
    marginBottom: '14px',
  },
  heroEm: {
    fontStyle: 'normal',
    color: colors.teal,
    position: 'relative',
  },
  heroDesc: {
    color: colors.textGray,
    fontSize: '16px',
    maxWidth: '620px',
    margin: '0 auto',
    lineHeight: 1.9,
  },
  legend: {
    display: 'flex',
    justifyContent: 'center',
    gap: '26px',
    marginTop: '30px',
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13.5px',
    color: colors.textGray,
    fontWeight: 700,
  },
  dots: {
    display: 'flex',
    gap: '4px',
  },
  grid: {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '20px 40px 90px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '26px',
  },
  card: {
    backgroundColor: 'var(--card)',
    border: '1px solid var(--line)',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: 'var(--shadow)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform .25s ease, box-shadow .25s ease',
    position: 'relative',
  },
  cardBorderTop: {
    height: '4px',
    width: '100%',
  },
  cardHead: {
    padding: '26px 24px 18px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '12px',
  },
  levelPill: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '6px',
  },
  levelTag: {
    fontSize: '12px',
    fontWeight: '800',
    padding: '5px 12px',
    borderRadius: '999px',
  },
  levelDots: {
    display: 'flex',
    gap: '4px',
  },
  cardBody: {
    padding: '0 24px',
    flex: 1,
  },
  cardBodyTitle: {
    fontSize: '19px',
    fontWeight: 800,
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  cardBodyText: {
    color: colors.textGray,
    fontSize: '14.5px',
    lineHeight: 1.9,
    marginBottom: '20px',
  },
  reqBox: {
    backgroundColor: colors.bg,
    border: '1px solid var(--line)',
    borderRadius: '14px',
    padding: '16px 18px',
    marginBottom: '22px',
  },
  reqTitle: {
    fontSize: '13px',
    fontWeight: '800',
    color: colors.textGray,
    marginBottom: '12px',
  },
  reqList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '11px',
    padding: 0,
    margin: 0,
  },
  reqItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    fontWeight: '600',
  },
  reqNum: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    color: '#fff',
    fontSize: '11px',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardFoot: {
    padding: '0 24px 24px',
  },
  startBtn: {
    width: '100%',
    padding: '14px',
    border: 'none',
    borderRadius: '12px',
    backgroundColor: colors.navy,
    color: '#fff',
    fontWeight: '800',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: '.2s',
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

export default function Scenarios() {
  const router = useRouter();

  const scenarios = [
    {
      id: 'cafe',
      title: '☕ تصميم شبكة مقهى كوفي شوب',
      description: 'صاحب مقهى بيستقبل حوالي 50 زبون يوميًا طالب منك تصمّم له شبكة تغطي الكاشير ومكاتب الإدارة مع تجربة واي فاي مريحة للزباين.',
      difficulty: 'مبتدئ',
      levelClass: 'beginner',
      dots: [true, false, false],
      tasks: [
        'كم Access Point تحتاج؟',
        'كيف تصمم الـ VLANs؟',
        'ما هي التجهيزات المطلوبة؟'
      ]
    },
    {
      id: 'hospital',
      title: '🏥 شبكة مستشفى صغير',
      description: 'مستشفى محتاج شبكة آمنة تفصل بين الأقسام المختلفة: الاستقبال، العيادات، المخبر، والإدارة، مع الحفاظ على خصوصية بيانات المرضى.',
      difficulty: 'متوسط',
      levelClass: 'intermediate',
      dots: [true, true, false],
      tasks: [
        'كيف تفصل الأقسام أمنياً؟',
        'ما هي متطلبات الأمان؟',
        'كيف تضمن سرعة الشبكة؟'
      ]
    },
    {
      id: 'office',
      title: '🏢 شبكة شركة ناشئة',
      description: 'شركة ناشئة بتضم 100 موظف طالبة شبكة تدعم VPN آمن للموظفين يلي عم يشتغلوا عن بعد، مع قابلية للتوسع مستقبلاً.',
      difficulty: 'متقدم',
      levelClass: 'advanced',
      dots: [true, true, true],
      tasks: [
        'ما هي تجهيزات الشبكة؟',
        'كيف تدير الـ IP Addressing؟',
        'كيف تؤمن الاتصالات عن بعد؟'
      ]
    }
  ];

  return (
    <div style={styles.container}>
      <style jsx global>{`
        :root {
          --navy-deep: #0e2436;
          --navy: #173b57;
          --navy-soft: #2c5878;
          --teal: #0f9188;
          --teal-dark: #0b7168;
          --teal-light: #e3f6f3;
          --orange: #f2994a;
          --bg: #f3f8f8;
          --card: #ffffff;
          --text: #152a38;
          --text-muted: #5c7385;
          --line: #e3ecec;
          --shadow: 0 10px 30px -12px rgba(14,36,54,.18);
        }
        [data-theme="dark"] {
          --bg: #0b1c29;
          --card: #122c3e;
          --text: #eef5f7;
          --text-muted: #9fb4c0;
          --line: #1e3d51;
          --teal-light: #123834;
          --shadow: 0 10px 30px -12px rgba(0,0,0,.5);
        }
        body {
          font-family: 'Tajawal', system-ui, -apple-system, sans-serif;
          background: var(--bg);
          color: var(--text);
          transition: background .3s ease, color .3s ease;
        }
        @media (max-width: 900px) {
          .hero-title { font-size: 30px !important; }
        }
      `}</style>

      {/* ===== Navbar ===== */}
      <Navbar />

      {/* Hero */}
      <section style={styles.hero}>
        <span style={styles.eyebrow}>🚀 تدرّب على الواقع</span>
        <h1 style={styles.heroTitle} className="hero-title">
          سيناريوهات <em style={styles.heroEm}>عملية</em> تحاكي الواقع
        </h1>
        <p style={styles.heroDesc}>
          اختر سيناريو وحاول حله خطوة بخطوة. الذكاء الاصطناعي سيوجهك ويصحح لك، تماماً مثل ما يحدث في مشروع حقيقي.
        </p>

        <div style={styles.legend}>
          <div style={styles.legendItem}>
            <span style={styles.dots}><span style={{ backgroundColor: '#0f9188', width: '7px', height: '7px', borderRadius: '50%' }}></span><span></span><span></span></span> مبتدئ
          </div>
          <div style={styles.legendItem}>
            <span style={styles.dots}><span style={{ backgroundColor: '#2c5878', width: '7px', height: '7px', borderRadius: '50%' }}></span><span style={{ backgroundColor: '#2c5878', width: '7px', height: '7px', borderRadius: '50%' }}></span><span></span></span> متوسط
          </div>
          <div style={styles.legendItem}>
            <span style={styles.dots}><span style={{ backgroundColor: '#f2994a', width: '7px', height: '7px', borderRadius: '50%' }}></span><span style={{ backgroundColor: '#f2994a', width: '7px', height: '7px', borderRadius: '50%' }}></span><span style={{ backgroundColor: '#f2994a', width: '7px', height: '7px', borderRadius: '50%' }}></span></span> متقدم
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <div style={styles.grid}>
        {scenarios.map((scenario) => {
          const accentColors = {
            beginner: { accent: '#0f9188', soft: '#e3f6f3', dark: '#0b7168' },
            intermediate: { accent: '#2c5878', soft: '#e6edf2', dark: '#173b57' },
            advanced: { accent: '#f2994a', soft: '#fdf0e2', dark: '#c9762c' }
          }[scenario.levelClass];

          return (
            <div key={scenario.id} style={{ ...styles.card, '--accent': accentColors.accent }}>
              <div style={{ ...styles.cardBorderTop, backgroundColor: accentColors.accent }}></div>
              
              <div style={styles.cardHead}>
                <div style={styles.levelPill}>
                  <span style={{ ...styles.levelTag, color: accentColors.dark, backgroundColor: accentColors.soft }}>
                    {scenario.difficulty}
                  </span>
                  <span style={styles.levelDots}>
                    {scenario.dots.map((filled, idx) => (
                      <span key={idx} style={{ 
                        width: '7px', height: '7px', borderRadius: '50%', 
                        backgroundColor: filled ? accentColors.accent : 'var(--line)' 
                      }}></span>
                    ))}
                  </span>
                </div>
              </div>

              <div style={styles.cardBody}>
                <h3 style={styles.cardBodyTitle}>{scenario.title}</h3>
                <p style={styles.cardBodyText}>{scenario.description}</p>
                <div style={styles.reqBox}>
                  <div style={styles.reqTitle}>المطلوب منك:</div>
                  <ul style={styles.reqList}>
                    {scenario.tasks.map((task, index) => (
                      <li key={index} style={styles.reqItem}>
                        <span style={{ ...styles.reqNum, backgroundColor: accentColors.accent }}>{index + 1}</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={styles.cardFoot}>
                <button 
                  onClick={() => router.push(`/scenarios/${scenario.id}`)}
                  style={styles.startBtn}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = accentColors.dark}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.navy}
                >
                  ابدأ حل السيناريو
                  <svg viewBox="0 0 24 24" fill="none" style={{ width: '16px', height: '16px', transform: 'scaleX(-1)' }}>
                    <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
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
