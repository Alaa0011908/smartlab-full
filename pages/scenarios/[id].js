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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const fileInputRef = useRef(null)

  // إداراة حالة الخطوات والمراحل الجديدة
  const [currentMainStep, setCurrentMainStep] = useState(0); // 0: مقابلة العمل, 1: تنفيذ التصميم, 2: تسليم المشروع
  const [currentSubStep, setCurrentSubStep] = useState(0);   // 0: تحديد الاحتياجات, 1: المفاوضة على السعر, 2: تحديد الآليات

  const mainSteps = ["مقابلة العمل", "تنفيذ التصميم", "تسليم المشروع"];
  const subSteps = ["تحديد الاحتياجات", "المفاوضة على السعر", "تحديد آليات الدفع والتسليم"];

  const scenarios = {
    cafe: {
      title: 'ملف العميل',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&fit=crop&q=80',
      clientName: 'أبو أحمد',
      role: 'صاحب المقهى',
      difficulty: 'سهل',
      projectLabel: 'تصميم شبكة مقهى كوفي شوب ☕',
      description: 'صاحب مقهى يطلب منك تصميم شبكة لـ 50 زبون يومياً + كاشير + مكاتب إدارة.',
      personalityTags: [
        { text: '⚡ متطلب', bg: '#FEE2E2', color: '#991B1B' },
        { text: '⏱️ متردد', bg: '#E0F2FE', color: '#0369A1' },
        { text: '📊 يركز على الميزانية', bg: '#F1F5F9', color: '#475569' }
      ],
      personality: 'يركز كثيراً على الميزانية المحدودة وتغطية كامل صالة الجلوس وضمان استقرار الإشارة.',
      features: [
        { icon: '⏱️', text: '50 زبون يومياً', highlight: true },
        { icon: '📁', text: 'كاشير + مكاتب إدارة', highlight: false }
      ],
      tasks: [
        'كم Access Point تحتاج؟',
        'كيف تصمم الـ VLANs؟',
        'ما هي التجهيزات المطلوبة?'
      ],
      focus: 'طرح التجهيزات المناسبة وتأمين الشبكة'
    },
    hospital: {
      title: 'ملف العميل',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&fit=crop&q=80',
      clientName: 'د. خالد',
      role: 'مدير المستشفى',
      difficulty: 'متوسط',
      projectLabel: 'تصميم شبكة مشفى طبي 🏥',
      description: 'مستشفى يحتاج شبكة آمنة للأقسام الطبية، الاستقبال والعيادات الخارجية.',
      personalityTags: [
        { text: '⚡ دقيق للغاية', bg: '#FEE2E2', color: '#991B1B' },
        { text: '⏱️ سريع الرد', bg: '#CCFBF1', color: '#0F766E' },
        { text: '🔒 يركز على الأمن', bg: '#F1F5F9', color: '#475569' }
      ],
      personality: 'يهتم جداً بأمن البيانات وسرعة الوصول للملفات الطبية الحساسة ومنع أي تداخل خارجي.',
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
      title: 'ملف العميل',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&fit=crop&q=80',
      clientName: 'أ. سارة',
      role: 'مسؤولة التقنية',
      difficulty: 'متقدم',
      projectLabel: 'تصميم شبكة شركة ناشئة 💻',
      description: 'شركة ناشئة تطلب شبكة لـ 100 موظف في طابقين مع نظام VPN للعمل عن بعد.',
      personalityTags: [
        { text: '⚡ ملمة بالتقنية', bg: '#FEF3C7', color: '#92400E' },
        { text: '⏱️ مواكبة للتطور', bg: '#E0F2FE', color: '#0369A1' },
        { text: '📈 يركز على النتائج', bg: '#F1F5F9', color: '#475569' }
      ],
      personality: 'تهتم بقابلية التوسع مستقبلاً، سهولة الإدارة اللاسلكية، وتأمين الاتصالات البعيدة.',
      features: [
        { icon: '💻', text: '100 موظف + طابقين', highlight: true },
        { icon: '🔒', text: 'اتصال VPN خارجي آمن', highlight: false }
      ],
      tasks: [
        'ما هي طريقة توزيع الـ IPs الملائمة؟',
        'كيف تعد الـ VPN لتأمين الموظفين بالخارج？',
        'ما هي التجهيزات المطلوبة لربط الطابقين؟'
      ],
      focus: 'توزيع الـ IPs وإعداد الـ VPN الآمن للموظفين'
    }
  }

  const scenario = scenarios[id] || scenarios.cafe

  const getDifficultyBadgeStyle = (difficulty) => {
    switch (difficulty) {
      case 'متقدم':
        return { backgroundColor: '#FEE2E2', color: '#991B1B' }
      case 'متوسط':
        return { backgroundColor: '#FEF3C7', color: '#92400E' }
      case 'سهل':
      default:
        return { backgroundColor: 'rgba(254,221,190)', color: '#032639' }
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

    // محاكاة الانتقال بين الخطوات الفرعية عند الإرسال
    if (currentSubStep < subSteps.length - 1) {
      setCurrentSubStep(prev => prev + 1);
    } else if (currentMainStep < mainSteps.length - 1) {
      // إذا انتهت الخطوات الفرعية ينتقل للمرحلة الرئيسية التالية
      setCurrentMainStep(prev => prev + 1);
    }

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
        { id: Date.now() + 1, sender: 'client', text: data.reply || data.message }
      ])
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      let aiReply = "ممتاز جداً! اقتراحك يغطي جوانب ممتازة. كيف ترى حماية هذه الأجهزة من التداخل؟"
      const query = textToSend.toLowerCase()

      if (id === 'cafe' || !id) {
        if (query.includes('access point') || query.includes('کم') || query.includes('ap')) {
          aiReply = "ممتاز سؤال! لمقهى بـ 50 زبون يومياً، تحتاج تقريباً 3-4 Access Points لضمان التغطية المثالية للزبائن والإدارة."
        } else if (query.includes('vlan') || query.includes('كيف تصمم')) {
          aiReply = "فكرة ممتازة! لتصميم الـ VLANs بشكل آمن، يفضل تقسيم الشبكة لـ 3 أجزاء معزولة: واحدة للزبائن، وواحدة لنقاط البيع (الكاشير)، وواحدة للموظفين والإدارة."
        } else if (query.includes('تجهيزات') || query.includes('التجهيزات')) {
          aiReply = "بالنسبة للتجهيزات، ستحتاج إلى: راوتر رئيسي بميزة جدار الحماية، سويتش يدعم الـ PoE لتغذية نقاط الوصول مباشرة بالطاقة، ونقاط الوصول (APs) المتوافقة."
        }
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'client', text: aiReply }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <style jsx global>{`
        @media (max-width: 1024px) {
          .workspace-layout { flex-direction: column !important; }
          .sidebar-layout { width: 100% !important; order: -1; }
          .chat-card-layout { height: 60vh !important; }
          .desktop-nav { display: none !important; }
          .burger-btn { display: flex !important; }
          .footer-container-layout { flex-direction: column !important; gap: 1.5rem; text-align: center; }
          .footer-brand-txt { text-align: center !important; }
        }
      `}</style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.loginBtn}>تسجيل الدخول</button>
          <button style={styles.themeToggleBtn}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line><line x1="4.9" y1="4.9" x2="6.3" y2="6.3"></line><line x1="17.7" y1="17.7" x2="19.1" y2="19.1"></line><line x1="4.9" y1="19.1" x2="6.3" y2="17.7"></line><line x1="17.7" y1="6.3" x2="19.1" y2="4.9"></line></svg>
          </button>
          <button style={styles.burgerBtn} className="burger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span style={{...styles.burgerLine, transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'}}></span>
            <span style={{...styles.burgerLine, opacity: isMenuOpen ? 0 : 1}}></span>
            <span style={{...styles.burgerLine, transform: isMenuOpen ? 'rotate(-45deg) translate(6px, -7px)' : 'none'}}></span>
          </button>
        </div>

        <nav style={styles.nav} className="desktop-nav">
          <Link href="/" style={styles.navLink}>الرئيسية</Link>
          <Link href="/scenarios" style={{...styles.navLink, ...styles.activeNavLink}}>محاكي العميل</Link>
          <Link href="/assessment" style={styles.navLink}>التقييم التكيفي</Link>
          <Link href="/dashboard" style={styles.navLink}>لوحة التشخيص</Link>
        </nav>

        {isMenuOpen && (
          <div style={styles.mobileMenu}>
            <Link href="/" style={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>الرئيسية</Link>
            <Link href="/scenarios" style={{...styles.mobileNavLink, ...styles.mobileActiveNavLink}} onClick={() => setIsMenuOpen(false)}>محاكي العميل</Link>
            <Link href="/assessment" style={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>التقييم التكيفي</Link>
            <Link href="/dashboard" style={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>لوحة التشخيص</Link>
          </div>
        )}

        <div style={styles.headerRight}>
          <Link href="/" style={styles.logo}>
            <img src="/logo.png" alt="Smart Lab Logo" style={{ height: '45px', width: 'auto', objectFit: 'contain' }} />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <div style={styles.workspace} className="workspace-layout">
          
          {/* قسم اليسار المحاكي والدردشة */}
          <section style={styles.chatSection}>
            
            {/* التعديل: شريط الخطوات الـ 3 الرئيسي والفرعي في منتصف الشاشة أعلى الدردشة */}
            <div style={styles.stepperContainer}>
              <div style={styles.mainStepsRow}>
                {mainSteps.map((step, idx) => (
                  <div key={idx} style={styles.stepWrapper}>
                    <div style={{
                      ...styles.stepCircle,
                      backgroundColor: idx <= currentMainStep ? 'rgba(2,103,113)' : '#E2E8F0',
                      color: idx <= currentMainStep ? 'white' : '#64748B'
                    }}>
                      {idx < currentMainStep ? '✓' : idx + 1}
                    </div>
                    <span style={{
                      ...styles.stepLabel,
                      fontWeight: idx === currentMainStep ? '700' : '500',
                      color: idx === currentMainStep ? '#0F172A' : '#64748B'
                    }}>{step}</span>
                    {idx < mainSteps.length - 1 && <div style={styles.stepLine}></div>}
                  </div>
                ))}
              </div>

              {/* الخطوات الفرعية المندرجة تحت مقابلة العمل */}
              {currentMainStep === 0 && (
                <div style={styles.subStepsRow}>
                  {subSteps.map((subStep, sIdx) => (
                    <div key={sIdx} style={{
                      ...styles.subStepPill,
                      backgroundColor: sIdx === currentSubStep ? '#E0F2FE' : sIdx < currentSubStep ? '#D1FAE5' : '#F1F5F9',
                      color: sIdx === currentSubStep ? '#0369A1' : sIdx < currentSubStep ? '#065F46' : '#64748B',
                      border: sIdx === currentSubStep ? '1px solid #7DD3FC' : '1px solid transparent'
                    }}>
                      {sIdx < currentSubStep ? '✓ ' : ''}{subStep}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={styles.chatCard} className="chat-card-layout">
              <div style={styles.chatCardHeader}>
                <div style={styles.clientStatus}>
                  <span style={styles.onlineDot}></span>
                  الدردشة مع: {scenario.clientName}
                </div>
                <div style={{ ...styles.difficultyBadge, ...getDifficultyBadgeStyle(scenario.difficulty) }}>
                  مستوى الصعوبة: {scenario.difficulty}
                </div>
              </div>

              <div style={styles.messagesArea}>
                <div style={styles.simulationStartPill}>
                  بدأت المحاكاة - سيناريو تصميم شبكة {scenario.clientName}
                </div>

                <div style={styles.clientMessageRow}>
                  <img src={scenario.avatar} alt={scenario.clientName} style={styles.avatar} />
                  <div style={styles.messageBubbleClient}>
                    مرحباً بك! أنا {scenario.clientName} {scenario.role} وسأكون سعيداً بمساعدتك في هذا السيناريو. اشرح لي كيف ستبدأ في تصميم هذه الشبكة؟ كم Access Point أحتاج؟ وكيف تصمم الـ VLANs؟ وما هي التجهيزات المطلوبة؟
                  </div>
                </div>

                {messages.map((msg) => (
                  <div key={msg.id} style={msg.sender === 'user' ? styles.userMessageRow : styles.clientMessageRow}>
                    {msg.sender === 'user' ? (
                      <div style={styles.messageBubbleUser}>
                        {msg.text}
                        {msg.file && <div style={styles.fileAttachedPill}>📎 {msg.file}</div>}
                      </div>
                    ) : (
                      <>
                        <img src={scenario.avatar} alt={scenario.clientName} style={styles.avatar} />
                        <div style={styles.messageBubbleClient}>{msg.text}</div>
                      </>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div style={styles.clientMessageRow}>
                    <img src={scenario.avatar} alt={scenario.clientName} style={styles.avatar} />
                    <div style={styles.messageBubbleClient}>
                      <span style={styles.typingText}>جاري قراءة ردك وتحليله هندسياً...</span>
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.inputContainer}>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`اكتب ردك هنا... (سيتم تقييم احترافيتك وتعاطفك)`}
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
                      📎 إرفاق ملف {selectedFile && <span style={{color: '#10B981'}}>({selectedFile.name})</span>}
                    </button>
                  </div>
                  <div style={styles.leftActions}>
                    <button onClick={() => setShowTips(!showTips)} style={styles.tipsBtn}>💡 تلميحات مهمة</button>
                    <button onClick={() => handleSend()} style={styles.sendBtn} disabled={isLoading}>إرسال الرد للعميل ◀</button>
                  </div>
                </div>

                {/* التعديل: الهامش التحتاني الخاص بالتقييم مثل الصورة تماماً */}
                <div style={styles.evaluationFooterRow}>
                  <span style={styles.evaluationText}>يتم تقييم: <strong style={{color: '#032639'}}>الوضوح، التعاطف، التوجيه نحو الحل</strong></span>
                  <p style={styles.projectMiniLabel}>{scenario.projectLabel}</p>
                </div>
              </div>
            </div>
          </section>

          {/* قسم اليمين - ملف العميل الهامشي */}
          <aside style={styles.sidebarSection} className="sidebar-layout">
            <div style={styles.scenarioBriefCard}>
              <div style={styles.scrollContainer}>
                <h2 style={styles.briefTitle}>{scenario.title}</h2>
                
                <div style={styles.clientProfileArea}>
                  <img src={scenario.avatar} alt={scenario.clientName} style={styles.largeAvatar} />
                  <h3 style={styles.clientNameTxt}>{scenario.clientName}</h3>
                  <p style={styles.clientRoleTxt}>{scenario.role}</p>
                </div>

                <div style={styles.personalitySection}>
                  <div style={styles.personalityHeader}>السمات الشخصية</div>
                  <div style={styles.badgesWrapper}>
                    {scenario.personalityTags.map((tag, tIdx) => (
                      <span key={tIdx} style={{...styles.personalityBadgeItem, backgroundColor: tag.bg, color: tag.color}}>
                        {tag.text}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={styles.projectContextBox}>
                  <div style={styles.contextHeader}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginLeft: '6px'}}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    سياق المشروع
                  </div>
                  <p style={styles.contextText}>{scenario.description} {scenario.personality}</p>
                </div>

                <div style={styles.divider}></div>

                <div style={styles.featuresSection}>
                  <div style={styles.featuresHeader}>خصائص السيناريو</div>
                  <div style={styles.featuresGrid}>
                    {scenario.features.map((feat, idx) => (
                      <div key={idx} style={feat.highlight ? styles.featurePillHighlight : styles.featurePillNormal}>
                        <span style={{ marginLeft: '6px' }}>{feat.icon}</span>
                        {feat.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.divider}></div>
                
                <div style={styles.tasksSection}>
                  <h3 style={styles.tasksHeader}>📋 المطلوب منك:</h3>
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

              <div style={styles.sidebarFooter}>
                التركيز المطلوب: {scenario.focus}
              </div>
            </div>
          </aside>

        </div>
      </main>

      {/* Pop-up للتلميحات */}
      {showTips && (
        <div style={styles.modalOverlay}>
          <div style={styles.interactiveTipsBox}>
            <div style={styles.tipsHeaderRow}>
              <div style={styles.tipsTitle}><span>💡 تلميحات ذكية ومساعدة</span></div>
              <button onClick={() => setShowTips(false)} style={styles.closeTipsBtn}>✕</button>
            </div>
            <div style={styles.tipsContent}>
              <div style={styles.tipTextRow}><span style={styles.tipNumber}>1.</span><p style={styles.tipText}>ابدأ بطرح أسئلة للزبون لتفهم متطلباته.</p></div>
              <div style={styles.tipTextRow}><span style={styles.tipNumber}>2.</span><p style={styles.tipText}>فكر في عدد الأجهزة والتغطية المطلوبة.</p></div>
              <div style={styles.tipTextRow}><span style={styles.tipNumber}>3.</span><p style={styles.tipText}>حدد نوع التجهيزات التي تحتاجها</p></div>
              <div style={styles.tipTextRow}><span style={styles.tipNumber}>4.</span><p style={styles.tipText}>لا تنسى متطلبات الأمان والتوسع المستقبلي</p></div>
            </div>
            <div style={styles.tipsFooter}>
              <button onClick={() => setShowTips(false)} style={styles.understandBtn}>حسناً، فهمت</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer} className="footer-container-layout">
          <div style={styles.footerLeft}>
            <p style={styles.footerBrand} className="footer-brand-txt">SmartLab</p>
            <p style={styles.footerText}>منصة تعليمية متطورة لدعم التعلم التكيفي والمحاكاة.</p>
          </div>
          <div style={styles.footerRight}>
            <p style={styles.footerContactTitle}>تواصل معنا</p>
            <div style={styles.footerEmailWrap}>
              <span style={{fontSize: '0.9rem', opacity: 0.8}}>
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

              </span>
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
  headerRight: { display: 'flex', alignItems: 'center', gap: '3rem' },
  logo: { fontSize: '1.6rem', fontWeight: '800', color: '#0F172A', textDecoration: 'none' },
  nav: { display: 'flex', gap: '1.8rem' },
  navLink: { textDecoration: 'none', color: '#64748B', fontSize: '0.95rem', fontWeight: '500', padding: '0.5rem 0' },
  activeNavLink: { color: 'rgb(0,100,130)', fontWeight: '700', borderBottom: '3px solid rgb(0,100,130)' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '1rem' },
  burgerBtn: { display: 'none', flexDirection: 'column', justifyContent: 'space-between', width: '24px', height: '18px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, zIndex: 110 },
  burgerLine: { width: '100%', height: '3px', backgroundColor: '#334155', borderRadius: '2px', transition: 'all 0.3s ease' },
  mobileMenu: { position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', padding: '1rem 2.5rem', gap: '1rem', zIndex: 99 },
  mobileNavLink: { textDecoration: 'none', color: '#64748B', fontSize: '1rem', fontWeight: '500', padding: '0.5rem 0' },
  mobileActiveNavLink: { color: 'rgb(0,100,130)', fontWeight: '700' },
  themeToggleBtn: { width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'transparent', border: 'none', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  loginBtn: { backgroundColor: 'rgb(0,100,130)', color: 'white', border: 'none', borderRadius: '30px', padding: '0.6rem 1.5rem', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer' },
  mainContent: { flex: 1, padding: '1.5rem 2.5rem', display: 'flex', boxSizing: 'border-box' },
  workspace: { display: 'flex', width: '100%', gap: '1.5rem' },
  chatSection: { flex: 2, display: 'flex', flexDirection: 'column', minWidth: 0, gap: '1rem' },
  
  // ستايلات شريط الخطوات الجديد في المنتصف
  stepperContainer: {
    backgroundColor: 'white',
    borderRadius: '14px',
    padding: '1.2rem 1.5rem',
    boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
    border: '1px solid #E2E8F0',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  mainStepsRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' },
  stepWrapper: { display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, position: 'relative' },
  stepCircle: { width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700', transition: 'all 0.3s' },
  stepLabel: { fontSize: '0.9rem', whiteSpace: 'nowrap' },
  stepLine: { flex: 1, height: '2px', backgroundColor: '#E2E8F0', margin: '0 0.5rem' },
  subStepsRow: { display: 'flex', gap: '0.8rem', justifyContent: 'flex-start', flexWrap: 'wrap', borderTop: '1px dashed #E2E8F0', paddingTop: '0.8rem' },
  subStepPill: { padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', transition: 'all 0.3s' },

  chatCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
    border: '1px solid #E2E8F0',
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 240px)', // تم تعديل الارتفاع ليتناسب مع شريط الخطوات
  },
  chatCardHeader: { display: 'flex', justifyContent: 'space-between', alignItem: 'center', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid #F1F5F9' },
  difficultyBadge: { fontSize: '0.85rem', padding: '0.4rem 1rem', borderRadius: '14px', fontWeight: '600' },
  clientStatus: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', color: '#1E293B', fontSize: '0.95rem' },
  onlineDot: { width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%' },
  messagesArea: { flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.2rem', backgroundColor: '#F8FAFC' },
  simulationStartPill: { alignSelf: 'center', backgroundColor: '#E2E8F0', color: '#475569', fontSize: '0.8rem', fontWeight: '600', padding: '0.4rem 1.2rem', borderRadius: '20px' },
  clientMessageRow: { display: 'flex', alignItems: 'flex-start', gap: '0.8rem', alignSelf: 'flex-start', maxWidth: '85%' },
  userMessageRow: { display: 'flex', alignItems: 'flex-start', gap: '0.8rem', alignSelf: 'flex-end', maxWidth: '85%' },
  messageBubbleClient: { backgroundColor: 'white', color: '#334155', padding: '1rem 1.2rem', borderRadius: '0 16px 16px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', fontSize: '0.95rem', lineHeight: '1.6', border: '1px solid #E2E8F0' },
  messageBubbleUser: { backgroundColor: 'rgba(0,100,130)', color: 'white', padding: '1rem 1.2rem', borderRadius: '16px 0 16px 16px', fontSize: '0.95rem', lineHeight: '1.6' },
  avatar: { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' },
  fileAttachedPill: { marginTop: '0.5rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem' },
  typingText: { fontStyle: 'italic', color: '#94A3B8' },
  inputContainer: { padding: '1.2rem', borderTop: '1px solid #F1F5F9', backgroundColor: 'white', borderRadius: '0 0 16px 16px' },
  textArea: { width: '100%', height: '60px', border: 'none', resize: 'none', outline: 'none', fontSize: '0.95rem', color: '#334155', fontFamily: 'inherit' },
  inputActionBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.2rem', borderTop: '1px solid #F1F5F9', paddingTop: '0.6rem' },
  rightActions: { display: 'flex', gap: '1rem' },
  toolBtn: { background: 'none', border: 'none', color: '#64748B', fontSize: '0.85rem', cursor: 'pointer' },
  leftActions: { display: 'flex', gap: '0.8rem' },
  tipsBtn: { backgroundColor: 'transparent', color: '#475569', border: '2px solid rgba(2,103,113)', borderRadius: '8px', padding: '0.5rem 1.2rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' },
  sendBtn: { backgroundColor: 'rgba(2,103,113)', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem 1.5rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' },
  
  // ستايلات الهامش التحتاني الجديد للتقييم
  evaluationFooterRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.8rem', borderTop: '1px solid #F1F5F9', paddingTop: '0.6rem' },
  evaluationText: { fontSize: '0.82rem', color: '#64748B' },
  projectMiniLabel: { fontSize: '0.82rem', color: '#94A3B8', margin: 0 },

  sidebarSection: { width: '350px', display: 'flex', flexDirection: 'column', flexShrink: 0 },
  scenarioBriefCard: { backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)', overflow: 'hidden' },
  scrollContainer: { flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column' },
  briefTitle: { fontSize: '1.3rem', color: '#0D3D4E', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center' },
  clientProfileArea: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' },
  largeAvatar: { width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #006482', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginBottom: '0.8rem' },
  clientNameTxt: { fontSize: '1.3rem', color: '#0F172A', fontWeight: '800', margin: '0 0 0.2rem 0' },
  clientRoleTxt: { fontSize: '0.9rem', color: '#64748B', fontWeight: '500', margin: 0 },
  personalitySection: { width: '100%', textAlign: 'center', margin: '1rem 0 1.5rem 0' },
  personalityHeader: { fontSize: '0.85rem', fontWeight: '600', color: '#94A3B8', marginBottom: '0.6rem' },
  badgesWrapper: { display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem' },
  personalityBadgeItem: { padding: '0.4rem 0.9rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700', whiteSpace: 'nowrap', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' },
  projectContextBox: { backgroundColor: '#F4F6F8', borderRadius: '14px', padding: '1.2rem', border: '1px solid #E2E8F0', marginBottom: '1.5rem', textAlign: 'right' },
  contextHeader: { fontSize: '1rem', fontWeight: '700', color: '#0D3D4E', marginBottom: '0.6rem', display: 'flex', alignItems: 'center' },
  contextText: { fontSize: '0.9rem', color: '#475569', lineHeight: '1.6', margin: 0 },
  featuresSection: { width: '100%', marginBottom: '1.2rem' },
  featuresHeader: { fontSize: '0.85rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.6rem' },
  featuresGrid: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  featurePillHighlight: { backgroundColor: '#E0F8F1', color: '#0F766E', padding: '0.5rem 1rem', borderRadius: '25px', fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center' },
  featurePillNormal: { backgroundColor: '#F1F5F9', color: '#475569', padding: '0.5rem 1rem', borderRadius: '25px', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center' },
  divider: { height: '1px', backgroundColor: '#E2E8F0', margin: '1rem 0' },
  tasksSection: { width: '100%' },
  tasksHeader: { fontSize: '0.95rem', color: '#0F172A', fontWeight: '700', marginBottom: '0.6rem' },
  tasksList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  taskItem: { fontSize: '0.85rem', color: '#475569', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' },
  taskDot: { color: '#0284C7', fontWeight: 'bold', fontSize: '1rem' },
  taskText: { flex: 1 },
  sidebarFooter: { padding: '1rem', borderTop: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', fontSize: '0.8rem', color: '#64748B', textAlign: 'right', fontWeight: '600' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, backdropFilter: 'blur(3px)' },
  interactiveTipsBox: { backgroundColor: '#FFFFFF', borderTop: '7px solid rgb(13,61,78)', borderRadius: '16px', padding: '2rem', width: '450px', maxWidth: '90%', display: 'flex', flexDirection: 'column', gap: '1.2rem' },
  tipsHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.8rem' },
  tipsTitle: { fontSize: '1.1rem', fontWeight: '800', color: '#0F172A' },
  closeTipsBtn: { background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.2rem', cursor: 'pointer' },
  tipsContent: { display: 'flex', flexDirection: 'column', gap: '0.8rem' },
  tipTextRow: { display: 'flex', gap: '0.5rem', alignItems: 'flex-start' },
  tipNumber: { color: 'rgb(0,100,113)', fontWeight: '800' },
  tipText: { fontSize: '0.95rem', color: '#475569', margin: 0, flex: 1 },
  tipsFooter: { display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem' },
  understandBtn: { backgroundColor: 'rgba(2,103,113)', color: 'white', border: 'none', borderRadius: '8px', padding: '0.6rem 1.8rem', fontWeight: '700', cursor: 'pointer' },
  footer: { backgroundColor: "#006482", color: 'white', padding: '25px 0', display: 'flex', justifyContent: 'center', width: '100%', marginTop: 'auto' },
  footerContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1200px', padding: '0 40px' },
  footerLeft: { display: 'flex', flexDirection: 'column' },
  footerRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' },
  footerContactTitle: { margin: 0, fontSize: '14px', fontWeight: 'bold' },
  footerEmailWrap: { display: 'flex', alignItems: 'center', fontSize: '16px' },
  footerBrand: { margin: '0 0 4px 0', fontWeight: 'bold', fontSize: '18px', textAlign: 'right' },
  footerText: { margin: 0, fontSize: '13px', opacity: 0.7 },
}