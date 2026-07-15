// pages/assessment/categories.js
import { useRouter } from 'next/router';
import Link from 'next/link';



export default function Categories() {
  const router = useRouter();

  // ===== بيانات المواضيع (كل موضوع فيه تقييم سريع وشامل) =====
  const categories = [
    {
      id: 'basics',
      number: '01',
      title: 'أساسيات الشبكات',
      description: 'الطبقات، البروتوكولات، الأجهزة الأساسية، ونموذج OSI.',
      path: '/assessment/basics',
    },
    {
      id: 'ipv4',
      number: '02',
      title: 'عناوين IPv4',
      description: 'بنية العنوان، الفئات (Classes)، والفرق بين العناوين الخاصة والعامة.',
      path: '/assessment/ipv4',
    },
    {
      id: 'subnetting',
      number: '03',
      title: 'تقسيم الشبكات الفرعية (Subnetting)',
      description: 'حساب الـ Subnet Mask، تقسيم الشبكة، وعدد المضيفين المتاحين.',
      path: '/assessment/subnetting',
    },
  ];

  return (
    <div style={styles.page}>

      {/* ============ NavBar============ */}

      <header style={styles.header}>
        <div style={styles.navContainer} className="navContainer">
          <div style={styles.leftNavActions} className="leftNavActions">
            <Link href="/auth/login" style={styles.loginBtn}>تسجيل الدخول</Link>
            <button
              style={styles.themeBtn}
              onClick={() => console.log('toggle dark mode')}
              aria-label="تبديل الوضع الليلي"
            >
              <svg width="41" height="46" viewBox="0 0 41 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.0101 22.9166C20.0101 22.9166 20.2127 22.9166 20.6178 22.9166C21.0229 22.9166 21.509 22.633 22.0761 22.0659C22.6432 21.4987 22.9268 20.8101 22.9268 19.9999C22.9268 19.1897 22.6432 18.501 22.0761 17.9339C21.509 17.3668 20.8203 17.0832 20.0101 17.0832C19.1999 17.0832 18.5113 17.3668 17.9441 17.9339C17.377 18.501 17.0935 19.1897 17.0935 19.9999C17.0935 20.8101 17.377 21.4987 17.9441 22.0659C18.5113 22.633 19.1999 22.9166 20.0101 22.9166ZM20.0101 24.861C20.0101 24.861 19.6739 24.861 19.0014 24.861C18.329 24.861 17.5188 24.387 16.5709 23.4391C15.623 22.4912 15.149 21.3448 15.149 19.9999C15.149 18.655 15.623 17.5086 16.5709 16.5607C17.5188 15.6127 18.6652 15.1388 20.0101 15.1388C21.355 15.1388 22.5014 15.6127 23.4494 16.5607C24.3973 17.5086 24.8712 18.655 24.8712 19.9999C24.8712 21.3448 24.3973 22.4912 23.4494 23.4391C22.5014 24.387 21.355 24.861 20.0101 24.861ZM13.2046 20.9721H9.31567V19.0277H13.2046V20.9721ZM30.7046 20.9721H26.8157V19.0277H30.7046V20.9721ZM19.0379 13.1943V9.30545H20.9823V13.1943H19.0379ZM19.0379 30.6943V26.8054H20.9823V30.6943H19.0379ZM14.5657 15.8679L12.1108 13.5103L13.4962 12.0763L15.8296 14.5068L14.5657 15.8679ZM26.524 27.9235L24.1664 25.4686L25.4546 24.1318L27.9094 26.4895L26.524 27.9235ZM24.1421 14.5554L26.4997 12.1006L27.9337 13.486L25.5032 15.8193L24.1421 14.5554ZM12.0865 26.5138L14.5414 24.1561L15.8782 25.4443L13.5205 27.8992L12.0865 26.5138Z" fill="#3F484E"/>
              </svg>

            </button>
          </div>

          <nav style={styles.nav} className="navLinks">
            <Link href="/" style={styles.navLink}>الرئيسية</Link>
            <Link href="/scenarios" style={styles.navLink}>محاكي العميل</Link>
               <Link href="/assessment/categories" style={{ ...styles.navLink, ...styles.activeLink }}>
              التقييم التكيفي
            </Link>
            <Link href="/diagnostics" style={styles.navLink}>لوحة التشخيص</Link>
         
          </nav>

          <div style={styles.logo}>
             <img
              src="/logo.png" 
              alt="Smart Lab Logo"
              style={styles.logoImage}
            />
            <div>

            </div>
          </div>

        </div>
      </header>


      <main style={styles.main} className="mainContent">



        {/* ============ عنوان الصفحة ============ */}

        <div style={styles.pageHeader} className="pageHeader">
          {/* النصوص والمعلومات  */}
          <div style={styles.headerTextWrap} className="headerTextWrap">
            <div style={styles.breadcrumb}>
          <Link href="/assessment/categories" style={styles.breadcrumbLink}>التقييم التكيفي</Link>
          <span style={styles.breadcrumbLink}> / </span>
          <span style={styles.breadcrumbCurrent}>هندسة شبكات</span>
        </div>
            <h1 style={styles.pageTitle} className="pageTitle">
              هندسة الشبكات - <span style={{ color: colors.orange }}>اختر تقييمك</span>
            </h1>
            <p style={styles.pageDesc}>
              ثلاثة مجالات، وكل مجال له مسارين: تقييم سريع يعطيك صورة فورية عن مستواك،
              أو تقييم شامل يغوص بالتفاصيل ويجهزك لسوق العملية.
            </p>
          </div>

          {/* الأيقونة */}
          <div style={styles.pageIconWrap} className="pageIconWrap">
              <svg width="155" height="155" viewBox="0 0 174 174" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M72.5 54.375C72.5 53.4136 72.8819 52.4916 73.5617 51.8117C74.2416 51.1319 75.1636 50.75 76.125 50.75H105.125C106.086 50.75 107.008 51.1319 107.688 51.8117C108.368 52.4916 108.75 53.4136 108.75 54.375C108.75 55.3364 108.368 56.2584 107.688 56.9383C107.008 57.6181 106.086 58 105.125 58H76.125C75.1636 58 74.2416 57.6181 73.5617 56.9383C72.8819 56.2584 72.5 55.3364 72.5 54.375ZM76.125 65.25C75.1636 65.25 74.2416 65.6319 73.5617 66.3117C72.8819 66.9916 72.5 67.9136 72.5 68.875C72.5 69.8364 72.8819 70.7584 73.5617 71.4383C74.2416 72.1181 75.1636 72.5 76.125 72.5H105.125C106.086 72.5 107.008 72.1181 107.688 71.4383C108.368 70.7584 108.75 69.8364 108.75 68.875C108.75 67.9136 108.368 66.9916 107.688 66.3117C107.008 65.6319 106.086 65.25 105.125 65.25H76.125ZM72.5 101.5C72.5 100.539 72.8819 99.6166 73.5617 98.9367C74.2416 98.2569 75.1636 97.875 76.125 97.875H105.125C106.086 97.875 107.008 98.2569 107.688 98.9367C108.368 99.6166 108.75 100.539 108.75 101.5C108.75 102.461 108.368 103.383 107.688 104.063C107.008 104.743 106.086 105.125 105.125 105.125H76.125C75.1636 105.125 74.2416 104.743 73.5617 104.063C72.8819 103.383 72.5 102.461 72.5 101.5ZM76.125 112.375C75.1636 112.375 74.2416 112.757 73.5617 113.437C72.8819 114.117 72.5 115.039 72.5 116C72.5 116.961 72.8819 117.883 73.5617 118.563C74.2416 119.243 75.1636 119.625 76.125 119.625H105.125C106.086 119.625 107.008 119.243 107.688 118.563C108.368 117.883 108.75 116.961 108.75 116C108.75 115.039 108.368 114.117 107.688 113.437C107.008 112.757 106.086 112.375 105.125 112.375H76.125Z" fill="#00696F"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M36.25 97.875C36.25 96.9136 36.6319 95.9916 37.3117 95.3117C37.9916 94.6319 38.9136 94.25 39.875 94.25H58C58.9614 94.25 59.8834 94.6319 60.5633 95.3117C61.2431 95.9916 61.625 96.9136 61.625 97.875V116C61.625 116.961 61.2431 117.883 60.5633 118.563C59.8834 119.243 58.9614 119.625 58 119.625H39.875C38.9136 119.625 37.9916 119.243 37.3117 118.563C36.6319 117.883 36.25 116.961 36.25 116V97.875ZM43.5 101.5V112.375H54.375V101.5H43.5Z" fill="#00696F"/>
              <path d="M64.1878 56.9378C64.8481 56.2541 65.2135 55.3384 65.2052 54.3879C65.1969 53.4375 64.8157 52.5283 64.1436 51.8562C63.4715 51.1841 62.5623 50.8028 61.6118 50.7946C60.6614 50.7863 59.7457 51.1517 59.062 51.812L47.1249 63.7491L42.4378 59.062C41.7541 58.4017 40.8384 58.0363 39.8879 58.0446C38.9375 58.0528 38.0283 58.4341 37.3562 59.1062C36.6841 59.7783 36.3028 60.6875 36.2946 61.6379C36.2863 62.5884 36.6517 63.5041 37.312 64.1878L47.1249 74.0006L64.1878 56.9378Z" fill="#00696F"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M36.25 21.75C32.4044 21.75 28.7162 23.2777 25.997 25.997C23.2777 28.7162 21.75 32.4044 21.75 36.25V137.75C21.75 141.596 23.2777 145.284 25.997 148.003C28.7162 150.722 32.4044 152.25 36.25 152.25H108.75C112.596 152.25 116.284 150.722 119.003 148.003C121.722 145.284 123.25 141.596 123.25 137.75V36.25C123.25 32.4044 121.722 28.7162 119.003 25.997C116.284 23.2777 112.596 21.75 108.75 21.75H36.25ZM29 36.25C29 34.3272 29.7638 32.4831 31.1235 31.1235C32.4831 29.7638 34.3272 29 36.25 29H108.75C110.673 29 112.517 29.7638 113.877 31.1235C115.236 32.4831 116 34.3272 116 36.25V137.75C116 139.673 115.236 141.517 113.877 142.877C112.517 144.236 110.673 145 108.75 145H36.25C34.3272 145 32.4831 144.236 31.1235 142.877C29.7638 141.517 29 139.673 29 137.75V36.25ZM130.5 58C130.5 55.1158 131.646 52.3497 133.685 50.3102C135.725 48.2708 138.491 47.125 141.375 47.125C144.259 47.125 147.025 48.2708 149.065 50.3102C151.104 52.3497 152.25 55.1158 152.25 58V131.598L141.375 147.911L130.5 131.598V58ZM141.375 54.375C140.414 54.375 139.492 54.7569 138.812 55.4367C138.132 56.1166 137.75 57.0386 137.75 58V65.25H145V58C145 57.0386 144.618 56.1166 143.938 55.4367C143.258 54.7569 142.336 54.375 141.375 54.375ZM141.375 134.839L137.75 129.402V72.5H145V129.402L141.375 134.839Z" fill="#00696F"/>
              </svg>


            </div>
        </div>


        {/* ============ سريع أو شامل============ */}
        <section style={styles.section}>
          <p style={styles.sectionLabel}>قبل أن تبدأ</p>
          <h2 style={styles.sectionTitle}>سريع أو شامل</h2>
          <p style={styles.sectionDesc}>الفرق ليس فقط بعدد الأسئلة – كل مسار له هدف مختلف. اختر ما يناسبك الآن.</p>

          <div style={styles.compareRow} className="compareRow">

             {/* بطاقة التقييم السريع */}
            <div style={{ ...styles.compareCard, borderTop: `4px  solid ${colors.teal}` }} className="compareCard">
              <div style={styles.compareHeaderRow}>
                  <span style={styles.compareIcon}>⏱️</span>
                <h3 style={styles.compareTitle}>التقييم السريع</h3>

              </div>
              <div style={styles.tagsRow}>
                <span style={styles.tag}>15_10 سؤال</span>
                <span style={styles.tag}>7_5 دقائق</span>
                <span style={styles.tag}>مستوى عام</span>
              </div>
              <ul style={styles.bulletList}>
                <li style={styles.bulletItem}><span style={{ ...styles.dot, backgroundColor: colors.teal }} /> لقطة سريعة عن مستواك الحالي بالموضوع</li>
                <li style={styles.bulletItem}><span style={{ ...styles.dot, backgroundColor: colors.teal }} /> مثالي لأول مرة من أجل التجربة</li>
                <li style={styles.bulletItem}><span style={{ ...styles.dot, backgroundColor: colors.teal }} /> نتيجة وتوصية مسار فورية بعد آخر سؤال</li>
              </ul>
            </div>

            {/* بطاقة التقييم الشامل */}
            <div style={{ ...styles.compareCard, borderTop: `4px  solid ${colors.orange}` }} className="compareCard">
              <span style={styles.badge}>أكثر دقة</span>
              <div style={styles.compareHeaderRow}>
                  <span style={styles.compareIcon}>📊</span>
                 <h3 style={styles.compareTitle}>التقييم الشامل</h3>
              </div>
              <div style={styles.tagsRow}>
                <span style={styles.tag}>+40 سؤال</span>
                <span style={styles.tag}>30_20 دقائق</span>
                <span style={styles.tag}>تحليل تفصيلي</span>
              </div>
              <ul style={styles.bulletList}>
                <li style={styles.bulletItem}><span style={{ ...styles.dot, backgroundColor: colors.orange }} /> لقطة سريعة عن مستواك الحالي بالموضوع</li>
                <li style={styles.bulletItem}><span style={{ ...styles.dot, backgroundColor: colors.orange }} /> مثالي لأول مرة من أجل التجربة</li>
                <li style={styles.bulletItem}><span style={{ ...styles.dot, backgroundColor: colors.orange }} /> نتيجة وتوصية مسار فورية بعد آخر سؤال</li>
              </ul>
            </div>



          </div>
        </section>

        {/* ============ قسم المواضيع المتاحة ============ */}
        <section style={styles.section}>
          <p style={styles.sectionLabel}>المجالات المتاحة</p>
          <h2 style={styles.sectionTitle}>اختر الموضوع وابدأ</h2>
          <p style={styles.sectionDesc}>كل موضوع له تقييم سريع وتقييم شامل – اختر المناسب لك.</p>

          <div style={styles.categoryList}>
            {categories.map((cat) => (
              <div key={cat.id} style={styles.categoryRow} className="categoryRow">
                 {/* الأيقونة ورقم الترتيب */}

                  <span style={styles.categoryNumber}>{cat.number}</span>
                 <div style={styles.categoryIconWrap}>
                  <span style={styles.categoryIcon}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                    <g clipPath="url(#clip0_336_107)">
                                                    <path d="M33.1734 22.4847C31.9586 22.4847 30.9231 23.252 30.5237 24.3281H13.3393C13.1975 23.9467 12.9751 23.6003 12.6873 23.3126C12.3996 23.0249 12.0532 22.8026 11.6718 22.6608V5.47643C12.7479 5.07705 13.5151 4.04121 13.5151 2.82649C13.5151 1.26555 12.2503 0.000488337 10.6894 0.000488337C10.3183 0.000414443 9.95074 0.0734607 9.60784 0.215454C9.26495 0.357448 8.95338 0.565607 8.69095 0.82804C8.42851 1.09047 8.22035 1.40204 8.07836 1.74494C7.93637 2.08784 7.86332 2.45535 7.86339 2.82649C7.86339 4.04121 8.63064 5.07677 9.70671 5.47614V22.6605C8.63064 23.0599 7.86339 24.0957 7.86339 25.3105C7.86339 25.7315 7.95593 26.13 8.12102 26.4889L4.00493 30.6056C3.57445 30.4079 3.1012 30.3216 2.62867 30.3547C2.15614 30.3878 1.69951 30.5391 1.30077 30.7948C0.902024 31.0505 0.573963 31.4023 0.346751 31.818C0.119539 32.2336 0.000468534 32.6997 0.000488284 33.1734C0.000488284 34.7343 1.26527 35.9994 2.82649 35.9994C3.30013 35.9994 3.76618 35.8803 4.18178 35.6531C4.59737 35.4259 4.94919 35.0979 5.20487 34.6992C5.46056 34.3005 5.61191 33.8439 5.64501 33.3714C5.67811 32.8989 5.5919 32.4257 5.3943 31.9952L9.51096 27.8788C9.88052 28.0489 10.2826 28.1368 10.6894 28.1365C11.9041 28.1365 12.9397 27.3692 13.3391 26.2931H30.5234C30.9228 27.3692 31.9586 28.1365 33.1734 28.1365C34.7343 28.1365 35.9994 26.8714 35.9994 25.3105C35.9994 23.7495 34.7346 22.4847 33.1734 22.4847Z" fill="#001423"/>
                                                    <path d="M36 2.82649C36 3.30017 35.881 3.76626 35.6537 4.18189C35.4265 4.59752 35.0985 4.94936 34.6997 5.20505C34.301 5.46074 33.8443 5.61208 33.3718 5.64515C32.8993 5.67822 32.426 5.59196 31.9956 5.3943L27.8792 9.51124C28.0494 9.88077 28.1374 10.2828 28.1371 10.6897C28.1371 11.9044 27.3698 12.94 26.2938 13.3393V30.5237C27.3698 30.9231 28.1371 31.9589 28.1371 33.1736C28.1371 34.7346 26.872 35.9996 25.3111 35.9996C24.94 35.9997 24.5724 35.9267 24.2295 35.7847C23.8866 35.6427 23.5751 35.4345 23.3126 35.1721C23.0502 34.9097 22.8421 34.5981 22.7001 34.2552C22.5581 33.9123 22.485 33.5448 22.4851 33.1736C22.4851 31.9589 23.2523 30.9234 24.3284 30.524V13.3396C23.947 13.1977 23.6007 12.9754 23.313 12.6876C23.0253 12.3999 22.803 12.0535 22.6612 11.6721H5.47594C5.07656 12.7481 4.041 13.5154 2.82628 13.5154C2.45512 13.5155 2.08758 13.4425 1.74464 13.3005C1.40171 13.1585 1.09011 12.9504 0.827651 12.6879C0.565188 12.4255 0.357004 12.1139 0.214993 11.771C0.0729817 11.4281 -7.38526e-05 11.0606 5.60227e-08 10.6894C5.60227e-08 9.12846 1.26506 7.86339 2.826 7.86339C4.04072 7.86339 5.07656 8.63064 5.47566 9.70671H22.6603C23.0597 8.63064 24.0952 7.86339 25.3102 7.86339C25.7171 7.86303 26.1191 7.95093 26.4887 8.12102L30.6048 4.00464C30.4072 3.57416 30.321 3.10091 30.3541 2.6284C30.3872 2.15589 30.5386 1.69929 30.7943 1.30057C31.05 0.901862 31.4019 0.573837 31.8175 0.346659C32.2331 0.119482 32.6992 0.000443041 33.1729 0.000488294C34.7338 0.000488294 35.9989 1.26527 35.9989 2.82649H36Z" fill="#00857D"/>
                                                    </g>
<defs>
<clipPath id="clip0_336_107">
<rect width="36" height="36" fill="white"/>
</clipPath>
</defs>
</svg>
</span>
                </div>

                {/* معلومات الموضوع */}
                <div style={styles.categoryInfo} className="categoryInfo">
                  <h3 style={styles.categoryTitle}>{cat.title}</h3>
                  <p style={styles.categoryDesc}>{cat.description}</p>
                </div>

                
                <div style={styles.categoryButtons} className="categoryButtons">

                  <button
                    style={styles.btnFilled}
                    onClick={() => router.push(`${cat.path}?mode=quick`)}
                  >
                    التقييم السريع
                  </button>
                     <button
                    style={styles.btnOutline}
                    onClick={() => router.push(`${cat.path}?mode=full`)}
                  >
                    التقييم الشامل
                  </button>
                </div>



              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ============ footer ============ */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer} className="footerContainer">
          <div style={styles.footerLeft}>
            <p style={styles.footerBrand}>SmartLab</p>
            <p style={styles.footerText}>منصة تعليمية متطورة لدعم التعلم التكيفي والمحاكاة.</p>
          </div>

          {/* قسم تواصل معنا*/}
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

      {/* ============ Responsive ============ */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .navContainer {
            flex-wrap: wrap;
            justify-content: center !important;
            gap: 12px;
            padding: 12px 20px !important;
          }
          .navLinks {
            order: 3;
            width: 100%;
            justify-content: center !important;
            gap: 16px !important;
            flex-wrap: wrap;
          }
          .mainContent {
            padding: 24px 20px !important;
          }
          .pageHeader {
            flex-direction: column-reverse !important;
            text-align: center !important;
            gap: 16px;
          }
          .headerTextWrap {
            text-align: center !important;
          }
          .pageIconWrap svg {
            width: 100px !important;
            height: 100px !important;
          }
          .compareRow {
            flex-direction: column !important;
          }
          .compareCard {
            width: 100% !important;
          }
          .categoryRow {
            flex-direction: column !important;
            align-items: stretch !important;
            text-align: center !important;
          }
          .categoryInfo {
            text-align: center !important;
            min-width: 0 !important;
          }
          .categoryButtons {
            width: 100%;
            justify-content: center !important;
          }
          .categoryButtons button {
            flex: 1;
          }
          .footerContainer {
            flex-direction: column !important;
            text-align: center !important;
            gap: 20px !important;
            padding: 0 20px !important;
          }
          .footerRight {
            align-items: center !important;
          }
        }

        @media (max-width: 480px) {
          .pageTitle {
            font-size: 22px !important;
          }
          .navLinks a {
            font-size: 15px !important;
          }
          .mainContent {
            padding: 16px !important;
          }
        }
      `}</style>

    </div>
  );
}

// ===== ألوان النظام (Design System) =====
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
    backgroundColor: colors.bg,
    direction: 'rtl',
    fontFamily: "'Tajawal', 'Segoe UI', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    width: '100%',
    backgroundColor: 'white',
    borderBottom: `1px solid ${colors.border}`,
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'center',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    padding: '14px 40px',
  },
  leftNavActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px', 
  },
  logo: { display: 'flex', alignItems: 'center', gap: '8px' },
  logoIcon: { fontSize: '22px' },
  logoSmart: { fontSize: '15px', fontWeight: 'bold', color: colors.navy, lineHeight: 1 },
  logoLab: { fontSize: '13px', color: colors.teal, lineHeight: 1 },
  nav: { display: 'flex', alignItems: 'center', gap: '28px' },
  navLink: { color: colors.navy, textDecoration: 'none', fontSize: '20px', fontWeight: 500 },
  activeLink: { color: colors.teal, borderBottom: `2px solid ${colors.teal}`, paddingBottom: '4px', fontWeight: 'bold' },
  themeBtn: { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', padding: 0 },
  loginBtn: { backgroundColor: colors.navy, color: 'white', padding: '8px 22px', borderRadius: '20px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' },

  
  main: { flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '30px 40px' },

  breadcrumb: { fontSize: '13px', color: colors.textGray, marginBottom: '10px' },
  breadcrumbLink: { color: '#15B6BF', textDecoration: 'none' },
  breadcrumbCurrent: { color: colors.textGray, fontWeight: 'bold' ,fontWeight: 'bold'},

  pageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', margintop: '40px', alignItems: 'center' },
  pageTitle: { fontSize: '28px', color: colors.navy, margin: '0 0 10px 0' },
  pageDesc: { fontSize: '14px', color: colors.textGray, lineHeight: 1.7, maxWidth: '570px' },
  section: { marginBottom: '50px' },
  sectionLabel: { fontSize: '13px', color: colors.textGray, marginBottom: '4px' },
  sectionTitle: { fontSize: '22px', color: colors.navy, margin: '0 0 6px 0' },
  sectionDesc: { fontSize: '13px', color: colors.textGray, marginBottom: '24px' },
  compareRow: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  compareCard: {
    flex: '1 1 380px', backgroundColor: 'white', borderRadius: '16px', padding: '22px',
    border: `2px solid ${colors.border}`, position: 'relative',
  },
  badge: {
    position: 'absolute', top: '-10px', left: '20px', backgroundColor: colors.orange,
    color: 'white', fontSize: '11px', fontWeight: 'bold', padding: '3px 12px', borderRadius: '12px',
  },
  compareHeaderRow: { display: 'flex',  alignItems: 'center', marginBottom: '12px' },
  compareTitle: { fontSize: '18px', color: colors.navy, margin: 0 },
  compareIcon: { fontSize: '18px' },
  tagsRow: { display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' },
  tag: { fontSize: '11px', backgroundColor: '#F1F5F9', color: colors.textGray, padding: '4px 10px', borderRadius: '20px' },
  bulletList: { listStyle: 'none', padding: 0, margin: 0 },
  bulletItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151', marginBottom: '10px' },
  dot: { width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0 },
  categoryList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  categoryRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
    backgroundColor: 'white', borderRadius: '16px', padding: '20px 24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)', flexWrap: 'wrap',
  },
  categoryButtons: { display: 'flex', gap: '10px' },
  btnOutline: {
    border: `1.5px solid ${colors.orange}`, color: colors.orange, backgroundColor: 'white',
    padding: '8px 18px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer',
  },
  btnFilled: {
    border: 'none', color: 'white', backgroundColor: colors.teal,
    padding: '8px 18px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer',
  },
  categoryInfo: { flex: 1, textAlign: 'right', minWidth: '200px' },
  categoryTitle: { fontSize: '18px', color: colors.navy, margin: '0 0 4px 0' },
  categoryDesc: { fontSize: '13px', color: colors.textGray, margin: 0 },
  categoryIconWrap: {
    width: '46px', height: '46px', borderRadius: '12px', backgroundColor: 'transparent',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  categoryIcon: { fontSize: '20px', color: colors.teal },
  categoryNumber: {
    fontSize: '13px', fontWeight: 'bold', color: colors.teal, backgroundColor: colors.tealLight,
    padding: '6px 12px', borderRadius: '10px',
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