import { useRouter } from 'next/router'
import { useState, useRef } from 'react'
import Link from 'next/link'

export default function ScenarioDetail() {
  const router = useRouter()
  const { id } = router.query
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showTips, setShowTips] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const scenarios = {
    cafe: {
      title: 'تفاصيل المشروع',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&fit=crop&q=80',
      clientName: 'أبو أحمد',
      role: 'صاحب المقهى',
      difficulty: 'سهل', // مستوى الصعوبة
      projectLabel: 'تصميم شبكة مقهى كوفي شوب ☕', // العبارة الديناميكية أسفل الصندوق
      description: 'صاحب مقهى يطلب منك تصميم شبكة لـ 50 زبون يومياً + كاشير + مكاتب إدارة.',
      personality: 'متردد، يركز كثيراً على الميزانية المحدودة وتغطية كامل صالة الجلوس.',
      features: [
        { icon: '⏱️', text: '50 زبون يومياً', highlight: true },
        { icon: '📁', text: 'كاشير + مكاتب إدارة', highlight: false }
      ],
      tasks: [
        'كم Access Point تحتاج؟',
        'كيف تصمم الـ VLANs؟',
        'ما هي التجهيزات المطلوبة؟'
      ],
      focus: 'طرح التجهيزات المناسبة وتأمين الشبكة'
    },
    hospital: {
      title: 'تفاصيل المشروع',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&fit=crop&q=80',
      clientName: 'د. خالد',
      role: 'مدير المستشفى',
      difficulty: 'متوسط', // مستوى الصعوبة
      projectLabel: 'تصميم شبكة مشفى طبي 🏥', // العبارة الديناميكية أسفل الصندوق
      description: 'مستشفى يحتاج شبكة آمنة للأقسام الطبية، الاستقبال والعيادات الخارجية.',
      personality: 'دقيق للغاية، يركز على أمن البيانات وسرعة الوصول للملفات الطبية.',
      features: [
        { icon: '🏥', text: 'عيادات ومختبرات متعددة', highlight: true },
        { icon: '📁', text: 'شبكة أطباء وإدارة منفصلة', highlight: false }
      ],
      tasks: [
        'كيف تفصل الأقسام أمنياً؟',
        'ما هي متطلبات الأمان والـ Firewall؟',
        'كيف تضمن استمرارية الخدمة والسرعة؟'
      ],
      focus: 'عزل الأقسام أمنياً وضمان استقرار وسرعة الخدمة'
    },
    office: {
      title: 'تفاصيل المشروع',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&fit=crop&q=80',
      clientName: 'أ. سارة',
      role: 'مسؤولة التقنية',
      difficulty: 'متقدم', // مستوى الصعوبة
      projectLabel: 'تصميم شبكة شركة ناشئة 💻', // العبارة الديناميكية أسفل الصندوق
      description: 'شركة ناشئة تطلب شبكة لـ 100 موظف في طابقين مع نظام VPN للعمل عن بعد.',
      personality: 'ملمة بالتقنية، تهتم بقابلية التوسع مستقبلاً وسهولة الإدارة اللاسلكية.',
      features: [
        { icon: '💻', text: '100 موظف + طابقين', highlight: true },
        { icon: '🔒', text: 'اتصال VPN خارجي آمن', highlight: false }
      ],
      tasks: [
        'ما هي طريقة توزيع الـ IPs الملائمة؟',
        'كيف تعد الـ VPN لتأمين الموظفين بالخارج؟',
        'ما هي التجهيزات المطلوبة لربط الطابقين؟'
      ],
      focus: 'توزيع الـ IPs وإعداد الـ VPN الآمن للموظفين'
    }
  }

  const scenario = scenarios[id] || scenarios.cafe

  // لتحديد لون خلفية شارة الصعوبة ديناميكياً لتناسب الهوية البصرية
  const getDifficultyBadgeStyle = (difficulty) => {
    switch (difficulty) {
      case 'متقدم':
        return {
          backgroundColor: '#FEE2E2', // أحمر خفيف للمتقدم
          color: '#991B1B',
        }
      case 'متوسط':
        return {
          backgroundColor: '#FEF3C7', // برتقالي/أصفر خفيف للمتوسط
          color: '#92400E',
        }
      case 'سهل':
      default:
        return {
          backgroundColor: 'rgba(254,221,190)', // اللون الافتراضي لسهل المعتمد لديكِ
          color: '#032639',
        }
    }
  }

  const handleAttachmentClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setInputValue((prev) => prev + ` [ملف مرفق: ${file.name}] `)
    }
  }

  const handleSend = async (directText = null) => {
    const textToSend = typeof directText === 'string' ? directText.trim() : inputValue.trim()
    
    if (!textToSend && !selectedFile || isLoading) return

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      file: selectedFile ? selectedFile.name : null
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setSelectedFile(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: id,
          message: textToSend,
          history: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          }))
        })
      })

      if (!response.ok) throw new Error('API Offline')
      const data = await response.json()

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'client',
          text: data.reply || data.message
        }
      ])
    } catch (error) {
      console.warn("جاري تشغيل محاكي الرد الاحتياطي الذكي...")
      await new Promise(resolve => setTimeout(resolve, 1000))

      let aiReply = "ممتاز جداً! اقتراحك يغطي جوانب ممتازة. كيف ترى حماية هذه الأجهزة من التداخل؟"
      const query = textToSend.toLowerCase()

      if (id === 'cafe' || !id) {
        if (query.includes('access point') || query.includes('كم') || query.includes('ap')) {
          aiReply = "ممتاز سؤال! لمقهى بـ 50 زبون يومياً، تحتاج تقريباً 3-4 Access Points لضمان التغطية المثالية للزبائن والإدارة."
        } else if (query.includes('vlan') || query.includes('كيف تصمم')) {
          aiReply = "فكرة ممتازة! لتصميم الـ VLANs بشكل آمن، يفضل تقسيم الشبكة لـ 3 أجزاء معزولة: واحدة للزبائن، وواحدة لنقاط البيع (الكاشير)، وواحدة للموظفين والإدارة."
        } else if (query.includes('تجهيزات') || query.includes('التجهيزات')) {
          aiReply = "بالنسبة للتجهيزات، ستحتاج إلى: راوتر رئيسي بميزة جدار الحماية، سويتش يدعم الـ PoE لتغذية نقاط الوصول مباشرة بالطاقة، ونقاط الوصول (APs) المتوافقة."
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'client',
          text: aiReply
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={styles.container}>
    <header style={styles.header}>
  
  {/* 1. قسم اليمين*/}
  <div style={styles.headerLeft}>
     <button style={styles.loginBtn}>تسجيل الدخول</button>
    <button style={styles.themeToggleBtn}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line><line x1="4.9" y1="4.9" x2="6.3" y2="6.3"></line><line x1="17.7" y1="17.7" x2="19.1" y2="19.1"></line><line x1="4.9" y1="19.1" x2="6.3" y2="17.7"></line><line x1="17.7" y1="6.3" x2="19.1" y2="4.9"></line></svg>
    </button>
   
  </div>

  {/* 2. قسم المنتصف: روابط التنقل (الـ Navbar) */}
  <nav style={styles.nav}>
    <Link href="/" style={styles.navLink}>الرئيسية</Link>
    <Link href="/scenarios" style={{...styles.navLink, ...styles.activeNavLink}}>محاكي العميل</Link>
    <Link href="/assessment" style={styles.navLink}>التقييم التكيفي</Link>
    <Link href="/dashboard" style={styles.navLink}>لوحة التشخيص</Link>
  </nav>

  {/* 3. قسم اللوغو*/}
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

      {/* المحتوى الرئيسي */}
      <main style={styles.mainContent}>
        <div style={styles.workspace}>
          
          {/* قسم المحاكاة والدردشة (اليسار) */}
          <section style={styles.chatSection}>
            <div style={styles.chatCard}>
              <div style={styles.chatCardHeader}>
                <div style={styles.clientStatus}>
                  <span style={styles.onlineDot}></span>
                  الدردشة مع: {scenario.clientName}
                </div>
                <div style={{
                  ...styles.difficultyBadge, 
                  ...getDifficultyBadgeStyle(scenario.difficulty)
                }}>
                  مستوى الصعوبة: {scenario.difficulty}
                </div>
              </div>

              {/* ساحة الرسائل والفقاعات */}
              <div style={styles.messagesArea}>
                <div style={styles.simulationStartPill}>
                  بدأت المحاكاة - سيناريو تصميم شبكة {scenario.clientName}
                </div>

                {/* رسالة الترحيب الأولى */}
                <div style={styles.clientMessageRow}>
                  <img src={scenario.avatar} alt={scenario.clientName} style={styles.avatar} />
                  <div style={styles.messageBubbleClient}>
                    مرحباً بك! أنا {scenario.clientName} {scenario.role} وسأكون سعيداً بمساعدتك في هذا السيناريو. اشرح لي كيف ستبدأ في تصميم هذه الشبكة؟ كم Access Point أحتاج؟ وكيف تصمم الـ VLANs؟ وما هي التجهيزات المطلوبة؟
                  </div>
                </div>

                {/* الرسائل المتبادلة */}
                {messages.map((msg) => (
                  <div key={msg.id} style={msg.sender === 'user' ? styles.userMessageRow : styles.clientMessageRow}>
                    {msg.sender === 'user' ? (
                      <div style={styles.messageBubbleUser}>
                        {msg.text}
                        {msg.file && (
                          <div style={styles.fileAttachedPill}>
                            📎 {msg.file}
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <img src={scenario.avatar} alt={scenario.clientName} style={styles.avatar} />
                        <div style={styles.messageBubbleClient}>{msg.text}</div>
                      </>
                    )}
                  </div>
                ))}

                {/* مؤشر التحميل */}
                {isLoading && (
                  <div style={styles.clientMessageRow}>
                    <img src={scenario.avatar} alt={scenario.clientName} style={styles.avatar} />
                    <div style={styles.messageBubbleClient}>
                      <span style={styles.typingText}>جاري قراءة ردك وتحليله هندسياً...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* صندوق الإدخال الحديث */}
              <div style={styles.inputContainer}>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  onChange={handleFileChange}
                />

                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`أجب على استفسارات ${scenario.clientName} واقترح الحل الفني الأنسب له هنا...`}
                  style={styles.textArea}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                
                <div style={styles.inputActionBar}>
                  <div style={styles.rightActions}>
                    <button onClick={handleAttachmentClick} style={styles.toolBtn}>
                      📎 إرفاق ملف أو مخطط {selectedFile && <span style={{color: '#10B981'}}>({selectedFile.name})</span>}
                    </button>
                   
                  </div>
                  
                  <div style={styles.leftActions}>
                    <button onClick={() => setShowTips(!showTips)} style={styles.tipsBtn}>
                      💡 تلميحات مهمة
                    </button>
                    <button onClick={() => handleSend()} style={styles.sendBtn} disabled={isLoading}>
                      إرسال الرد للعميل  ◀ 
                    </button>
                  </div>
                </div>

           
                <div style={styles.focusFooter}>
                  <p>{scenario.projectLabel}</p>
                </div>
              </div>
            </div>
          </section>

          {/* قسم بطاقة "تفاصيل المشروع" الجانبية */}
          <aside style={styles.sidebarSection}>
            <div style={styles.scenarioBriefCard}>
              
              {/* قسم التمرير المخصص للتفاصيل الداخلية */}
              <div style={styles.scrollContainer}>
                <h2 style={styles.briefTitle}>{scenario.title}</h2>
                
                <div style={styles.clientProfileArea}>
                  <img src={scenario.avatar} alt={scenario.clientName} style={styles.largeAvatar} />
                  <h3 style={styles.clientNameTxt}>{scenario.clientName}</h3>
                  <p style={styles.clientRoleTxt}>{scenario.role}</p>
                </div>

                <div style={styles.descBubble}>
                  {scenario.description}
                </div>

                <div style={styles.personalitySection}>
                  <div style={styles.personalityHeader}>
                    🧠 الصفات الشخصية للعميل:
                  </div>
                  <p style={styles.personalityText}>
                    {scenario.personality}
                  </p>
                </div>

                <div style={styles.featuresSection}>
                  <div style={styles.featuresHeader}>
                    خصائص السيناريو
                  </div>
                  <div style={styles.featuresGrid}>
                    {scenario.features.map((feat, idx) => (
                      <div 
                        key={idx} 
                        style={feat.highlight ? styles.featurePillHighlight : styles.featurePillNormal}
                      >
                        <span style={{ marginLeft: '6px' }}>{feat.icon}</span>
                        {feat.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.divider}></div>
                
                <div style={styles.tasksSection}>
                  <h3 style={styles.tasksHeader}>
                    📋 المطلوب منك:
                  </h3>
                  <ul style={styles.tasksList}>
                    {scenario.tasks.map((task, index) => (
                      <li key={index} style={styles.taskItem}>
                        <span style={styles.taskDot}>•</span>
                        <span style={styles.taskText}>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* الفوتر الثابت بأسفل البطاقة الجانبية */}
              <div style={styles.sidebarFooter}>
                التركيز المطلوب: {scenario.focus}
              </div>

            </div>
          </aside>

        </div>
      </main>

      {/* بوب اب*/}
      {showTips && (
        <div style={styles.modalOverlay}>
          <div style={styles.interactiveTipsBox}>
            <div style={styles.tipsHeaderRow}>
              <div style={styles.tipsTitle}>
                <span>💡 تلميحات ذكية ومساعدة</span>
              </div>
              <button onClick={() => setShowTips(false)} style={styles.closeTipsBtn}>✕</button>
            </div>
            
            <div style={styles.tipsContent}>
              <div style={styles.tipTextRow}>
                <span style={styles.tipNumber}>1.</span>
                <p style={styles.tipText}>ابدأ بطرح أسئلة للزبون لتفهم متمتطلباته.</p>
              </div>
              <div style={styles.tipTextRow}>
                <span style={styles.tipNumber}>2.</span>
                <p style={styles.tipText}>فكر في عدد الأجهزة والتغطية المطلوبة.</p>
              </div>
              <div style={styles.tipTextRow}>
                <span style={styles.tipNumber}>3.</span>
                <p style={styles.tipText}>حدد نوع التجهيزات اللي رح تحتاجها.</p>
              </div>
              <div style={styles.tipTextRow}>
                <span style={styles.tipNumber}>4.</span>
                <p style={styles.tipText}>لا تنسى متطلبات الأمان والتوسع المستقبلي.</p>
              </div>
            </div>

            <div style={styles.tipsFooter}>
              <button onClick={() => setShowTips(false)} style={styles.understandBtn}>حسناً، فهمت</button>
            </div>
          </div>
        </div>
      )}
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




    </div>
    
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#EEF2F6',
    direction: 'rtl',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
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
  mainContent: {
    flex: 1,
    padding: '1.5rem 2.5rem',
    display: 'flex',
    boxSizing: 'border-box',
  },
  workspace: {
    display: 'flex',
    width: '100%',
    gap: '1.5rem',
  },
  chatSection: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  chatCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
    border: '1px solid #E2E8F0',
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 140px)',
  },
  chatCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #F1F5F9',
  },
  difficultyBadge: {
    fontSize: '0.85rem',
    padding: '0.4rem 1rem',
    borderRadius: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  clientStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: '600',
    color: '#1E293B',
    fontSize: '0.95rem',
  },
  onlineDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#10B981',
    borderRadius: '50%',
    display: 'inline-block',
  },
  messagesArea: {
    flex: 1,
    padding: '1.5rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    backgroundColor: '#F8FAFC',
  },
  simulationStartPill: {
    alignSelf: 'center',
    backgroundColor: '#E2E8F0',
    color: '#475569',
    fontSize: '0.8rem',
    fontWeight: '600',
    padding: '0.4rem 1.2rem',
    borderRadius: '20px',
  },
  clientMessageRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.8rem',
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  userMessageRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.8rem',
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  messageBubbleClient: {
    backgroundColor: 'white',
    color: '#334155',
    padding: '1rem 1.2rem',
    borderRadius: '0 16px 16px 16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    border: '1px solid #E2E8F0',
  },
  messageBubbleUser: {
    backgroundColor: 'rgba(0,100,130)',
    color: 'white',
    padding: '1rem 1.2rem',
    borderRadius: '16px 0 16px 16px',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    boxShadow: '0 4px 12px rgba(30, 64, 175, 0.15)',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid white',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  fileAttachedPill: {
    marginTop: '0.5rem',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '0.3rem 0.6rem',
    borderRadius: '6px',
    fontSize: '0.8rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  typingText: {
    fontStyle: 'italic',
    color: '#94A3B8',
  },
  inputContainer: {
    padding: '1.2rem',
    borderTop: '1px solid #F1F5F9',
    backgroundColor: 'white',
    borderRadius: '0 0 16px 16px',
  },
  textArea: {
    width: '100%',
    height: '80px',
    border: 'none',
    resize: 'none',
    outline: 'none',
    fontSize: '0.95rem',
    color: '#334155',
    fontFamily: 'inherit',
    lineHeight: '1.6',
  },
  inputActionBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.8rem',
    borderTop: '1px solid #F1F5F9',
    paddingTop: '0.8rem',
  },
  rightActions: {
    display: 'flex',
    gap: '1rem',
  },
  toolBtn: {
    background: 'none',
    border: 'none',
    color: '#64748B',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  leftActions: {
    display: 'flex',
    gap: '0.8rem',
  },
  tipsBtn: {
    backgroundColor: 'transparent',
    color: '#475569',
    border: '3px solid rgba(2,103,113)',
    borderRadius: '8px',
    padding: '0.5rem 1.2rem',
    fontWeight: '600',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  sendBtn: {
    backgroundColor: 'rgba(2,103,113)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1.5rem',
    fontWeight: '600',
    fontSize: '0.85rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  },
  focusFooter: {
    fontSize: '0.8rem',
    color: '#94A3B8',
    marginTop: '0.8rem',
    fontWeight: '500',
  },
  sidebarSection: {
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  scenarioBriefCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
    border: '1px solid #E2E8F0',
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 140px)',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  scrollContainer: {
    flex: 1,
    overflowY: 'auto', 
    overflowX: 'hidden', 
    padding: '1.5rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch', 
    boxSizing: 'border-box',
  },
  sidebarFooter: {
    width: '100%',
    padding: '1rem',
    borderTop: '1px solid #E2E8F0',
    backgroundColor: '#F8FAFC',
    fontSize: '0.8rem',
    color: '#64748B',
    textAlign: 'right',
    fontWeight: '600',
  },
  briefTitle: {
    fontSize: '1.1rem',
    color: 'rgb(0,100,130)',
    fontWeight: '700',
    marginBottom: '1.2rem',
    width: '100%',
    textAlign: 'center',
  },
  clientProfileArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1.2rem',
    width: '100%',
  },
  largeAvatar: {
    width: '85px',
    height: '85px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #E0F2FE',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    marginBottom: '0.8rem',
  },
  clientNameTxt: {
    fontSize: '1.15rem',
    color: '#0F172A',
    fontWeight: '800',
    margin: '0 0 0.2rem 0',
  },
  clientRoleTxt: {
    fontSize: '0.85rem',
    color: '#475569',
    fontWeight: '600',
    margin: 0,
  },
  descBubble: {
    backgroundColor: '#F8FAFC',
    borderRadius: '12px',
    padding: '0.9rem 1.2rem',
    fontSize: '0.9rem',
    color: '#475569',
    lineHeight: '1.6',
    textAlign: 'right',
    border: '1px solid #F1F5F9',
    marginBottom: '1.2rem',
    width: '100%',
    boxSizing: 'border-box',
  },
  personalitySection: {
    width: '100%',
    textAlign: 'right',
    marginBottom: '1.2rem',
    boxSizing: 'border-box',
  },
  personalityHeader: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#334155',
    marginBottom: '0.4rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  personalityText: {
    fontSize: '0.85rem',
    color: '#64748B',
    lineHeight: '1.5',
    margin: 0,
  },
  featuresSection: {
    width: '100%',
    textAlign: 'right',
    marginBottom: '1.2rem',
    boxSizing: 'border-box',
  },
  featuresHeader: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: '0.6rem',
  },
  featuresGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
  },
  featurePillHighlight: {
    backgroundColor: '#E0F8F1',
    color: '#0F766E',
    padding: '0.5rem 1rem',
    borderRadius: '25px',
    fontSize: '0.85rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
  },
  featurePillNormal: {
    backgroundColor: '#F1F5F9',
    color: '#475569',
    padding: '0.5rem 1rem',
    borderRadius: '25px',
    fontSize: '0.85rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
  },
  divider: {
    height: '1px',
    backgroundColor: '#E2E8F0',
    width: '100%',
    margin: '1rem 0',
  },
  tasksSection: {
    width: '100%',
    textAlign: 'right',
    boxSizing: 'border-box',
  },
  tasksHeader: {
    fontSize: '0.9rem',
    color: '#0F172A',
    fontWeight: '700',
    marginBottom: '0.6rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  tasksList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
  },
  taskItem: {
    fontSize: '0.85rem',
    color: '#475569',
    lineHeight: '1.5',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    width: '100%',
    boxSizing: 'border-box',
  },
  taskDot: {
    color: '#0284C7',
    fontWeight: 'bold',
    fontSize: '1rem',
    lineHeight: '1',
  },
  taskText: {
    flex: 1,
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.4)', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999, 
    backdropFilter: 'blur(3px)',
  },
  interactiveTipsBox: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderTop:'7px solid rgb(13,61,78)',
    borderRadius: '16px',
    padding: '2rem',
    width: '450px',
    maxWidth: '90%',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    color: '#1E293B',
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  tipsHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #E2E8F0',
    paddingBottom: '0.8rem',
  },
  tipsTitle: {
    fontSize: '1.1rem',
    fontWeight: '800',
    color: '#0F172A',
  },
  closeTipsBtn: {
    background: 'none',
    border: 'none',
    color: '#94A3B8',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '0.2rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    transition: 'all 0.2s',
  },
  tipsContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  tipTextRow: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'flex-start',
  },
  tipNumber: {
    color: 'rgb(0,100,113)',
    fontWeight: '800',
    fontSize: '0.95rem',
  },
  tipText: {
    fontSize: '0.95rem',
    color: '#475569',
    lineHeight: '1.6',
    margin: 0,
    flex: 1,
  },
  tipsFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderTop: '1px solid #F1F5F9',
    paddingTop: '1rem',
  },
  understandBtn: {
    backgroundColor: 'rgba(2,103,113)', 
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.6rem 1.8rem',
    fontWeight: '700',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
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
}
