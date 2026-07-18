import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Categories() {
  const router = useRouter();
  const [completedAssessments, setCompletedAssessments] = useState([]);

  // جلب التقدم المحفوظ من الـ LocalStorage إذا وجد
  useEffect(() => {
    const saved = localStorage.getItem('basicsProgress');
    if (saved) {
      const data = JSON.parse(saved);
      setCompletedAssessments(data.completed || []);
    }
  }, []);

  // ===== بيانات المواضيع الثمانية  =====
  const assessments = [
    { id: 'concepts', number: '01', title: 'المفاهيم العامة', description: 'تعريف الشبكة، أنواعها، نماذج Client-Server و P2P، الكابلات، أنواع الإرسال.', questions: 40, time: '8-10 دقائق', icon: '📘', color: '#1E3A8A' },
    { id: 'ipv4', number: '02', title: 'عناوين IPv4', description: 'تعريف IP، التصنيف (Class A, B, C)، العناوين العامة والخاصة، Gateway، Loopback.', questions: 35, time: '7-9 دقائق', icon: '🌍', color: '#2ECC71' },
    { id: 'subnetting', number: '03', title: 'تقسيم الشبكات الفرعية (Subnetting)', description: 'حسابات الشبكات الفرعية، CIDR، المضيفين، عنوان البث، الـ Increment.', questions: 30, time: '8-10 دقائق', icon: '🔢', color: '#F39C12' },
    { id: 'ipv6', number: '04', title: 'عناوين IPv6', description: 'بنية IPv6، أنواع العناوين، الاختصار، المقارنة مع IPv4.', questions: 25, time: '5-7 دقائق', icon: '🛜', color: '#9B59B6' },
    { id: 'osi', number: '05', title: 'OSI Model', description: 'الطبقات السبع، وظائف كل طبقة، البروتوكولات، وحدات البيانات (PDU).', questions: 25, time: '5-7 دقائق', icon: '📡', color: '#E74C3C' },
    { id: 'devices', number: '06', title: 'أجهزة الشبكات', description: 'سويتش، راوتر، هاب، مودم، Bridge، Gateway، Access Point، Firewall.', questions: 22, time: '5-6 دقائق', icon: '💻', color: '#1ABC9C' },
    { id: 'email', number: '07', title: 'بروتوكولات البريد الإلكتروني', description: 'SMTP، POP3، IMAP، المنافذ الافتراضية، الفرق بين البروتوكولات.', questions: 15, time: '3-4 دقائق', icon: '📧', color: '#E67E22' },
    { id: 'tcpip', number: '08', title: 'TCP/IP', description: 'طبقات TCP/IP، TCP vs UDP، HTTP، Three-Way Handshake.', questions: 25, time: '5-7 دقائق', icon: '🔗', color: '#16A085' },
  ];

  // ===== تقييمات المستوى العام  =====
  const globalAssessments = [
    { id: 'quick', title: 'تقييم سريع للمستوى العام', description: '15 سؤال تشخيصي لتحديد مستواك بدقة وسرعة في كل المحاور.', questions: 15, time: '5-8 دقائق', icon: '⚡', color: '#0F766E', isQuick: true },
    { id: 'full', title: 'التقييم الشامل للمستوى العام', description: 'جميع موضوعات الشبكات في تقييم واحد متكامل ومكثف.', questions: 202, time: '40-50 دقيقة', icon: '📊', color: '#0D1E3B', isQuick: false }
  ];

  const handleStart = (id, mode) => {
    if (id === 'quick' || id === 'full') {
      router.push(`/assessment/full?mode=${mode}`);
    } else {
      router.push(`/assessment/${id}?mode=${mode}`);
    }
  };

  return (
    <div style={styles.page}>
      
      {/* ============ NavBar  ============ */}
      <header style={styles.header}>
        {/* 1. القسم اليسار: الأزرار */}
        <div style={styles.headerLeft}>
          <Link href="/auth/login" passHref legacyBehavior>
            <button style={styles.loginBtn}>تسجيل الدخول</button>
          </Link>
          <button style={styles.themeToggleBtn} onClick={() => console.log('toggle dark mode')}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4"></circle>
              <line x1="12" y1="2" x2="12" y2="4"></line>
              <line x1="12" y1="20" x2="12" y2="22"></line>
              <line x1="2" y1="12" x2="4" y2="12"></line>
              <line x1="20" y1="12" x2="22" y2="12"></line>
              <line x1="4.9" y1="4.9" x2="6.3" y2="6.3"></line>
              <line x1="17.7" y1="17.7" x2="19.1" y2="19.1"></line>
              <line x1="4.9" y1="19.1" x2="6.3" y2="17.7"></line>
              <line x1="17.7" y1="6.3" x2="19.1" y2="4.9"></line>
            </svg>
          </button>
        </div>

        {/* 2. قسم المنتصف: روابط التنقل (التقييم التكيفي هنا هو الـ Active) */}
        <nav style={styles.nav}>
          <Link href="/" style={styles.navLink}>الرئيسية</Link>
          <Link href="/scenarios" style={styles.navLink}>محاكي العميل</Link>
          <Link href="/assessment/categories" style={{ ...styles.navLink, ...styles.activeNavLink }}>
            التقييم التكيفي
          </Link>
          <Link href="/diagnostics" style={styles.navLink}>لوحة التشخيص</Link>
        </nav>

        {/* 3. قسم اليمين: اللوغو بالأبعاد الصحيحة */}
        <div style={styles.headerRight}>
          <Link href="/" style={styles.logo}>
            <img 
              src="/logo.png" 
              alt="Smart Lab Logo" 
              style={{ height: '45px', width: 'auto', objectFit: 'contain' }} 
            />
          </Link>
        </div>
      </header>

      <main style={styles.main} className="mainContent">
        {/* ============ عنوان الصفحة ============ */}
        <div style={styles.pageHeader} className="pageHeader">
          <div style={styles.headerTextWrap} className="headerTextWrap">
            <div style={styles.breadcrumb}>
              <Link href="/assessment/categories" style={styles.breadcrumbLink}>التقييم التكيفي</Link>
              <span style={styles.breadcrumbLink}> / </span>
              <span style={styles.breadcrumbCurrent}>هندسة شبكات</span>
            </div>
            <h1 style={styles.pageTitle} className="pageTitle">
              هندسة الشبكات - <span style={{ color: colors.orange }}>اختر تقييمك المباشر</span>
            </h1>
            <p style={styles.pageDesc}>
              اختر الموضوع الفرعي المناسب، وحدد مسارك مباشرة: تقييم سريع لقياس خاطف، أو تقييم شامل لتقرير تفصيلي لمهاراتك.
            </p>
          </div>
          <div style={styles.pageIconWrap} className="pageIconWrap">
            <svg width="155" height="155" viewBox="0 0 174 174" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M72.5 54.375C72.5 53.4136 72.8819 52.4916 73.5617 51.8117C74.2416 51.1319 75.1636 50.75 76.125 50.75H105.125C106.086 50.75 107.008 51.1319 107.688 51.8117C108.368 52.4916 108.75 53.4136 108.75 54.375C108.75 55.3364 108.368 56.2584 107.688 56.9383C107.008 57.6181 106.086 58 105.125 58H76.125C75.1636 58 74.2416 57.6181 73.5617 56.9383C72.5 56.2584 72.5 55.3364 72.5 54.375ZM76.125 65.25C75.1636 65.25 74.2416 65.6319 73.5617 66.3117C72.8819 66.9916 72.5 67.9136 72.5 68.875C72.5 69.8364 72.8819 70.7584 73.5617 71.4383C74.2416 72.1181 75.1636 72.5 76.125 72.5H105.125C106.086 72.5 107.008 72.1181 107.688 71.4383C108.368 70.7584 108.75 69.8364 108.75 68.875C108.75 67.9136 108.368 66.9916 107.688 66.3117C107.008 65.6319 106.086 65.25 105.125 65.25H76.125ZM72.5 101.5C72.5 100.539 72.8819 99.6166 73.5617 98.9367C74.2416 98.2569 75.1636 97.875 76.125 97.875H105.125C106.086 97.875 107.008 98.2569 107.688 98.9367C108.368 99.6166 108.75 100.539 108.75 101.5C108.75 102.461 108.368 103.383 107.688 104.063C107.008 104.743 106.086 105.125 105.125 105.125H76.125C75.1636 105.125 74.2416 104.743 73.5617 104.063C72.8819 103.383 72.5 102.461 72.5 101.5ZM76.125 112.375C75.1636 112.375 74.2416 112.757 73.5617 113.437C72.8819 114.117 72.5 115.039 72.5 116C72.5 116.961 72.8819 117.883 73.5617 118.563C74.2416 119.243 75.1636 119.625 76.125 119.625H105.125C106.086 119.625 107.008 119.243 107.688 118.563C108.368 117.883 108.75 116.961 108.75 116C108.75 115.039 108.368 114.117 107.688 113.437C107.008 112.757 106.086 112.375 105.125 112.375H76.125Z" fill="#00696F"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M36.25 97.875C36.25 96.9136 36.6319 95.9916 37.3117 95.3117C37.9916 94.6319 38.9136 94.25 39.875 94.25H58C58.9614 94.25 59.8834 94.6319 60.5633 95.3117C61.2431 95.9916 61.625 96.9136 61.625 97.875V116C61.625 116.961 61.2431 117.883 60.5633 118.563C59.8834 119.243 58.9614 119.625 58 119.625H39.875C38.9136 119.625 37.9916 119.243 37.3117 118.563C36.6319 117.883 36.25 116.961 36.25 116V97.875ZM43.5 101.5V112.375H54.375V101.5H43.5Z" fill="#00696F"/>
              <path d="M64.1878 56.9378C64.8481 56.2541 65.2135 55.3384 65.2052 54.3879C65.1969 53.4375 64.8157 52.5283 64.1436 51.8562C63.4715 51.1841 62.5623 50.8028 61.6118 50.7946C60.6614 50.7863 59.7457 51.1517 59.062 51.812L47.1249 63.7491L42.4378 59.062C41.7541 58.4017 40.8384 58.0363 39.8879 58.0446C38.9375 58.0528 38.0283 58.4341 37.3562 59.1062C36.6841 59.7783 36.3028 60.6875 36.2946 61.6379C36.2863 62.5884 36.6517 63.5041 37.312 64.1878L47.1249 74.0006L64.1878 56.9378Z" fill="#00696F"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M36.25 21.75C32.4044 21.75 28.7162 23.2777 25.997 25.997C23.2777 28.7162 21.75 32.4044 21.75 36.25V137.75C21.75 141.596 23.2777 145.284 25.997 148.003C28.7162 150.722 32.4044 152.25 36.25 152.25H108.75C112.596 152.25 116.284 150.722 119.003 148.003C121.722 145.284 123.25 141.596 123.25 137.75V36.25C123.25 32.4044 121.722 28.7162 119.003 25.997C116.284 23.2777 112.596 21.75 108.75 21.75H36.25ZM29 36.25C29 34.3272 29.7638 32.4831 31.1235 31.1235C32.4831 29.7638 34.3272 29 36.25 29H108.75C110.673 29 112.517 29.7638 113.877 31.1235C115.236 32.4831 116 34.3272 116 36.25V137.75C116 139.673 115.236 141.517 113.877 142.877C112.517 144.236 110.673 145 108.75 145H36.25C34.3272 145 32.4831 144.236 31.1235 142.877C29.7638 141.517 29 139.673 29 137.75V36.25ZM130.5 58C130.5 55.1158 131.646 52.3497 133.685 50.3102C135.725 48.2708 138.491 47.125 141.375 47.125C144.259 47.125 147.025 48.2708 149.065 50.3102C151.104 52.3497 152.25 55.1158 152.25 58V131.598L141.375 147.911L130.5 131.598V58ZM141.375 54.375C140.414 54.375 139.492 54.7569 138.812 55.4367C138.132 56.1166 137.75 57.0386 137.75 58V65.25H145V58C145 57.0386 144.618 56.1166 143.938 55.4367C143.258 54.7569 142.336 54.375 141.375 54.375ZM141.375 134.839L137.75 129.402V72.5H145V129.402L141.375 134.839Z" fill="#00696F"/>
            </svg>
          </div>
        </div>

        {/* ============ سريع أو شامل دليل التوضيح ============ */}
        <section style={styles.section}>
          <p style={styles.sectionLabel}>قبل أن تبدأ</p>
          <h2 style={styles.sectionTitle}>سريع أو شامل</h2>
          <p style={styles.sectionDesc}>الفرق ليس فقط بعدد الأسئلة – كل مسار له هدف مختلف. اختر ما يناسبك الآن.</p>

          <div style={styles.compareRow} className="compareRow">
            <div style={{ ...styles.compareCard, borderTop: `4px solid ${colors.teal}` }} className="compareCard">
              <div style={styles.compareHeaderRow}>
                <span style={styles.compareIcon}>⏱️</span>
                <h3 style={styles.compareTitle}>التقييم السريع</h3>
              </div>
              <div style={styles.tagsRow}>
                <span style={styles.tag}>15-25 سؤال</span>
                <span style={styles.tag}>5-10 دقائق</span>
                <span style={styles.tag}>فحص فوري</span>
              </div>
              <ul style={styles.bulletList}>
                <li style={styles.bulletItem}><span style={{ ...styles.dot, backgroundColor: colors.teal }} /> لقطة سريعة ومباشرة عن مستواك الحالي بالموضوع</li>
                <li style={styles.bulletItem}><span style={{ ...styles.dot, backgroundColor: colors.teal }} /> مثالي لتوفير الوقت والفحص السريع للخلفية المعرفية</li>
              </ul>
            </div>

            <div style={{ ...styles.compareCard, borderTop: `4px solid ${colors.orange}` }} className="compareCard">
              <span style={styles.badge}>أكثر دقة</span>
              <div style={styles.compareHeaderRow}>
                <span style={styles.compareIcon}>📊</span>
                <h3 style={styles.compareTitle}>التقييم الشامل</h3>
              </div>
              <div style={styles.tagsRow}>
                <span style={styles.tag}>+30 سؤال</span>
                <span style={styles.tag}>20-30 دقيقة</span>
                <span style={styles.tag}>تحليل تفصيلي</span>
              </div>
              <ul style={styles.bulletList}>
                <li style={styles.bulletItem}><span style={{ ...styles.dot, backgroundColor: colors.orange }} /> قياس تفصيلي يغطي جميع الزوايا المعرفية للمحور</li>
                <li style={styles.bulletItem}><span style={{ ...styles.dot, backgroundColor: colors.orange }} /> مخرجات دقيقة وتوصيات مخصصة للمسار المهني</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============ قسم المواضيع الـ 8 المتاحة ============ */}
        <section style={styles.section}>
          <p style={styles.sectionLabel}>المجالات المتاحة</p>
          <h2 style={styles.sectionTitle}>اختر الموضوع وابدأ التقييم مباشرة</h2>
          <p style={styles.sectionDesc}>كل موضوع مجهز بمسارين منفصلين للوصول الفوري للامتحان بدون واجهات إضافية.</p>

          <div style={styles.categoryList}>
            {assessments.map((cat) => (
              <div key={cat.id} style={styles.categoryRow} className="categoryRow">
                <span style={styles.categoryNumber}>{cat.number}</span>
                
                <div style={styles.categoryIconWrap}>
                  <span style={{ ...styles.categoryIcon, color: cat.color }}>{cat.icon}</span>
                </div>

                <div style={styles.categoryInfo} className="categoryInfo">
                  <h3 style={styles.categoryTitle}>
                    {cat.title} 
                    {completedAssessments.includes(cat.id) && <span style={styles.completedBadge}>✅ مكتمل</span>}
                  </h3>
                  <p style={styles.categoryDesc}>{cat.description}</p>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                    <span style={styles.tag}>📝 {cat.questions} سؤال شامل</span>
                    <span style={styles.tag}>⏱️ {cat.time}</span>
                  </div>
                </div>

                <div style={styles.categoryButtons} className="categoryButtons">
                  <button style={styles.btnFilled} onClick={() => handleStart(cat.id, 'quick')}>
                    التقييم السريع
                  </button>
                  <button style={styles.btnOutline} onClick={() => handleStart(cat.id, 'full')}>
                    التقييم الشامل
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ قسم تقييمات المستوى العام ============ */}
        <section style={styles.section}>
          <p style={styles.sectionLabel}>المستوى الشمولي</p>
          <h2 style={styles.sectionTitle}>🎯 تقييمات المستوى العام لمهندس الشبكات</h2>
          <p style={styles.sectionDesc}>اختبارات مجمعة لقياس كفاءتك الكلية في جميع الأقسام السابقة في آن واحد.</p>
          
          <div style={styles.globalGrid}>
            {globalAssessments.map((global) => (
              <div key={global.id} style={{ ...styles.globalCard, borderTop: `4px solid ${global.color}` }}>
                <div style={styles.globalCardHeader}>
                  <span style={styles.globalIcon}>{global.icon}</span>
                  <div>
                    <h3 style={styles.globalTitle}>{global.title}</h3>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <span style={styles.tag}>📝 {global.questions} سؤال</span>
                      <span style={styles.tag}>⏱️ {global.time}</span>
                    </div>
                  </div>
                </div>
                <p style={styles.globalDesc}>{global.description}</p>
                <button 
                  style={{ ...styles.globalButton, backgroundColor: global.color }} 
                  onClick={() => handleStart(global.id, global.id)}
                >
                  ▶️ ابدأ تقييم المستوى الآن
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ============ Footer  ============ */}
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
                  <path d="M12 28M52 28M52 28M12 28M32 8M52 28M32 48M12 28M32 48V47C21.5066 47 13 38.4934 13 28H12H11C11 39.598 20.402 49 32 49V48ZM52 28H51C51 38.4934 42.4934 47 32 47V48V49C43.598 49 53 39.598 53 28H52ZM32 8V9C42.4934 9 51 17.5066 51 28H52H53C53 16.402 43.598 7 32 7V8ZM32 8V7C20.402 7 11 16.402 11 28H12H13C13 17.5066 21.5066 9 32 9V8Z" fill="#311E10" fillOpacity="0.05" mask="url(#path-1-inside-1_334_96)"/>
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

      {/* ============ CSS Global Styles ============ */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .navContainer { flex-wrap: wrap; justify-content: center !important; gap: 12px; padding: 12px 20px !important; }
          .navLinks { order: 3; width: 100%; justify-content: center !important; gap: 16px !important; flex-wrap: wrap; }
          .mainContent { padding: 24px 20px !important; }
          .pageHeader { flex-direction: column-reverse !important; text-align: center !important; gap: 16px; align-items: center !important; }
          .headerTextWrap { text-align: center !important; }
          .compareRow { flex-direction: column !important; }
          .categoryRow { flex-direction: column !important; align-items: stretch !important; text-align: center !important; }
          .categoryInfo { text-align: center !important; min-width: 0 !important; }
          .categoryButtons { width: 100%; justify-content: center !important; }
          .categoryButtons button { flex: 1; }
          .footerContainer { flex-direction: column !important; text-align: center !important; gap: 20px !important; padding: 0 20px !important; }
          .footerRight { align-items: center !important; }
        }
      `}</style>
    </div>
  );
}

// ===== ألوان النظام والثيم الموحد =====
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
  page: { 
    minHeight: '100vh', 
    backgroundColor: 'var(--bg)', 
    direction: 'rtl', 
    fontFamily: "'Tajawal', 'Segoe UI', sans-serif", 
    display: 'flex', 
    flexDirection: 'column', 
    width: '100%' 
  },
  
   
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem 2.5rem',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '3rem',
  },
  logo: {
    fontSize: '1.6rem',
    fontWeight: '800',
    color: '#0F172A',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    gap: '1.8rem',
  },
  navLink: {
    textDecoration: 'none',
    color: '#64748B',
    fontSize: '0.95rem',
    fontWeight: '500',
    padding: '0.5rem 0',
  },
  activeNavLink: {
    color: 'rgb(0,100,130)',
    fontWeight: '700',
    borderBottom: '3px solid rgb(0,100,130)',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  themeToggleBtn: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1.1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    backgroundColor: 'rgb(0,100,130)',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    padding: '0.6rem 1.5rem',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },

  main: { flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '30px 40px' },
  breadcrumb: { fontSize: '13px', color: colors.textGray, marginBottom: '10px' },
  breadcrumbLink: { color: '#15B6BF', textDecoration: 'none' },
  breadcrumbCurrent: { color: colors.textGray, fontWeight: 'bold' },
  pageHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '40px', marginTop: '20px', alignItems: 'center' },
  pageTitle: { fontSize: '28px', color: colors.navy, margin: '0 0 10px 0' },
  pageDesc: { fontSize: '14px', color: colors.textGray, lineHeight: 1.7, maxWidth: '650px' },
  section: { marginBottom: '50px' },
  sectionLabel: { fontSize: '13px', color: colors.textGray, marginBottom: '4px' },
  sectionTitle: { fontSize: '22px', color: colors.navy, margin: '0 0 6px 0' },
  sectionDesc: { fontSize: '13px', color: colors.textGray, marginBottom: '24px' },
  compareRow: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  compareCard: { flex: '1 1 380px', backgroundColor: 'white', borderRadius: '16px', padding: '22px', border: `2px solid ${colors.border}`, position: 'relative' },
  badge: { position: 'absolute', top: '-10px', left: '20px', backgroundColor: colors.orange, color: 'white', fontSize: '11px', fontWeight: 'bold', padding: '3px 12px', borderRadius: '12px' },
  compareHeaderRow: { display: 'flex', alignItems: 'center', marginBottom: '12px', gap: '8px' },
  compareTitle: { fontSize: '18px', color: colors.navy, margin: 0 },
  compareIcon: { fontSize: '20px' },
  tagsRow: { display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' },
  tag: { fontSize: '11px', backgroundColor: '#F1F5F9', color: colors.textGray, padding: '4px 10px', borderRadius: '20px' },
  bulletList: { listStyle: 'none', padding: 0, margin: 0 },
  bulletItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151', marginBottom: '10px' },
  dot: { width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0 },
  categoryList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  categoryRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', backgroundColor: 'white', borderRadius: '16px', padding: '20px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', flexWrap: 'wrap', borderRight: ` 8px  solid #0F172A` },
  categoryButtons: { display: 'flex', gap: '10px' },
  btnOutline: { border: `1.5px solid ${colors.orange}`, color: colors.orange, backgroundColor: 'white', padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' },
  btnFilled: { border: 'none', color: 'white', backgroundColor: colors.teal, padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' },
  categoryInfo: { flex: 1, textAlign: 'right', minWidth: '250px' },
  categoryTitle: { fontSize: '18px', color: colors.navy, margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '10px' },
  categoryDesc: { fontSize: '13.5px', color: colors.textGray, margin: 0, lineHeight: '1.5' },
  categoryIconWrap: { width: '46px', height: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' },
  categoryNumber: { fontSize: '13px', fontWeight: 'bold', color: colors.teal, backgroundColor: colors.tealLight, padding: '6px 12px', borderRadius: '10px' },
  completedBadge: { fontSize: '11px', color: '#2ECC71', backgroundColor: '#E8F5E9', padding: '2px 8px', borderRadius: '12px' },
  
  globalGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px', marginTop: '16px' },
  globalCard: { backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '12px', border: `1px solid ${colors.border}` },
  globalCardHeader: { display: 'flex', alignItems: 'center', gap: '16px' },
  globalIcon: { fontSize: '28px' },
  globalTitle: { fontSize: '18px', fontWeight: 'bold', color: colors.navy, margin: 0 },
  globalDesc: { fontSize: '13.5px', color: colors.textGray, margin: 0, lineHeight: '1.6', minHeight: '45px' },
  globalButton: { width: '100%', padding: '12px', border: 'none', borderRadius: '12px', color: 'white', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: 'auto', transition: 'opacity 0.2s' },

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