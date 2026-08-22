// pages/scenarios/index.js
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

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
    backgroundColor: colors.bg,
    direction: 'rtl',
    display: 'flex',
    flexDirection: 'column',
  },
  hero: {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '56px 40px 28px',
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
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
    color: colors.navy,
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
    width: '100%',
    boxSizing: 'border-box',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #E5E7EB',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px -12px rgba(14,36,54,.18)',
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
    color: colors.navy,
  },
  cardBodyText: {
    color: colors.textGray,
    fontSize: '14.5px',
    lineHeight: 1.9,
    marginBottom: '20px',
  },
  reqBox: {
    backgroundColor: colors.bg,
    border: '1px solid #E5E7EB',
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
    transition: 'background-color .2s ease, transform .2s ease',
    cursor: 'pointer',
    minHeight: 52,
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
      title: '🏥 شبكة مركز طبي صغير',
      description: 'مركز طبي محتاج شبكة آمنة تفصل بين الأقسام المختلفة: الاستقبال، العيادات، المخبر، والإدارة، مع الحفاظ على خصوصية بيانات المرضى.',
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
    <>
      <Head>
        <title>سيناريوهات عملية - Smart Lab</title>
        <meta name="description" content="تدرّب على سيناريوهات عملية في تصميم الشبكات مع ردود ذكية من الذكاء الاصطناعي." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.5" />
        <style>{`
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
          body {
            font-family: 'Tajawal', system-ui, -apple-system, sans-serif;
            background: var(--bg);
            color: var(--text);
            transition: background .3s ease, color .3s ease;
          }
          @media (max-width: 900px) {
            .hero-title { font-size: 30px !important; }
          }
          @media (max-width: 768px) {
            .hero { padding: 30px 20px 20px !important; }
            .hero-title { font-size: 28px !important; }
            .hero-desc { font-size: 15px !important; }
            .legend { gap: 16px !important; font-size: 12px !important; }
            .grid { padding: 16px 16px 60px !important; gap: 18px !important; grid-template-columns: 1fr !important; }
            .card-head { padding: 20px 18px 14px !important; }
            .card-body { padding: 0 18px !important; }
            .card-body-title { font-size: 17px !important; }
            .card-body-text { font-size: 13.5px !important; }
            .req-box { padding: 14px 14px !important; }
            .req-item { font-size: 13px !important; }
            .card-foot { padding: 0 18px 18px !important; }
            .start-btn { font-size: 14px !important; padding: 12px !important; min-height: 48px !important; }
          }
          @media (max-width: 480px) {
            .hero { padding: 20px 12px 16px !important; }
            .hero-title { font-size: 24px !important; }
            .eyebrow { font-size: 11px !important; padding: 5px 12px !important; }
            .hero-desc { font-size: 14px !important; }
            .legend-item { font-size: 11px !important; gap: 4px !important; }
            .grid { padding: 12px 12px 40px !important; gap: 14px !important; }
            .card-head { padding: 16px 14px 10px !important; flex-wrap: wrap !important; }
            .card-body-title { font-size: 15px !important; }
            .card-body-text { font-size: 13px !important; }
            .req-item { font-size: 12px !important; gap: 6px !important; }
            .req-num { width: 18px !important; height: 18px !important; font-size: 10px !important; }
            .start-btn { font-size: 13px !important; padding: 10px !important; min-height: 44px !important; }
          }
        `}</style>
      </Head>

      <div style={styles.container}>
        <Navbar />

        <section style={styles.hero} className="hero">
          <span style={styles.eyebrow} className="eyebrow">🚀 تدرّب على الواقع</span>
          <h1 style={styles.heroTitle} className="hero-title">
            سيناريوهات <em style={styles.heroEm}>عملية</em> تحاكي الواقع
          </h1>
          <p style={styles.heroDesc} className="hero-desc">
            اختر سيناريو وحاول حله خطوة بخطوة. الذكاء الاصطناعي سيوجهك ويصحح لك، تماماً مثل ما يحدث في مشروع حقيقي.
          </p>

          <div style={styles.legend} className="legend">
            <div style={styles.legendItem} className="legend-item">
              <span style={styles.dots}><span style={{ backgroundColor: '#0f9188', width: '7px', height: '7px', borderRadius: '50%', display: 'inline-block' }}></span><span></span><span></span></span> مبتدئ
            </div>
            <div style={styles.legendItem} className="legend-item">
              <span style={styles.dots}><span style={{ backgroundColor: '#2c5878', width: '7px', height: '7px', borderRadius: '50%', display: 'inline-block' }}></span><span style={{ backgroundColor: '#2c5878', width: '7px', height: '7px', borderRadius: '50%', display: 'inline-block' }}></span><span></span></span> متوسط
            </div>
            <div style={styles.legendItem} className="legend-item">
              <span style={styles.dots}><span style={{ backgroundColor: '#f2994a', width: '7px', height: '7px', borderRadius: '50%', display: 'inline-block' }}></span><span style={{ backgroundColor: '#f2994a', width: '7px', height: '7px', borderRadius: '50%', display: 'inline-block' }}></span><span style={{ backgroundColor: '#f2994a', width: '7px', height: '7px', borderRadius: '50%', display: 'inline-block' }}></span></span> متقدم
            </div>
          </div>
        </section>

        <div style={styles.grid} className="grid">
          {scenarios.map((scenario) => {
            const accentColors = {
              beginner: { accent: '#0f9188', soft: '#e3f6f3', dark: '#0b7168' },
              intermediate: { accent: '#2c5878', soft: '#e6edf2', dark: '#173b57' },
              advanced: { accent: '#f2994a', soft: '#fdf0e2', dark: '#c9762c' }
            }[scenario.levelClass];

            return (
              <div key={scenario.id} style={{ ...styles.card, '--accent': accentColors.accent }}>
                <div style={{ ...styles.cardBorderTop, backgroundColor: accentColors.accent }}></div>
                
                <div style={styles.cardHead} className="card-head">
                  <div style={styles.levelPill}>
                    <span style={{ ...styles.levelTag, color: accentColors.dark, backgroundColor: accentColors.soft }}>
                      {scenario.difficulty}
                    </span>
                    <span style={styles.levelDots}>
                      {scenario.dots.map((filled, idx) => (
                        <span key={idx} style={{ 
                          width: '7px', height: '7px', borderRadius: '50%', display: 'inline-block',
                          backgroundColor: filled ? accentColors.accent : 'var(--line)' 
                        }}></span>
                      ))}
                    </span>
                  </div>
                </div>

                <div style={styles.cardBody} className="card-body">
                  <h3 style={styles.cardBodyTitle} className="card-body-title">{scenario.title}</h3>
                  <p style={styles.cardBodyText} className="card-body-text">{scenario.description}</p>
                  <div style={styles.reqBox} className="req-box">
                    <div style={styles.reqTitle}>المطلوب منك:</div>
                    <ul style={styles.reqList}>
                      {scenario.tasks.map((task, index) => (
                        <li key={index} style={styles.reqItem} className="req-item">
                          <span style={{ ...styles.reqNum, backgroundColor: accentColors.accent }} className="req-num">{index + 1}</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={styles.cardFoot} className="card-foot">
                  <button 
                    onClick={() => router.push(`/scenarios/${scenario.id}`)}
                    style={styles.startBtn}
                    className="start-btn"
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

        <Footer />
      </div>
    </>
  );
}
