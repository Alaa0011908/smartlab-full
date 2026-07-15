import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Scenarios() {
  const router = useRouter()

  const scenarios = [
    {
      id: 'cafe',
      title: '☕ تصميم شبكة مقهى كوفي شوب',
      description: 'صاحب مقهى يطلب منك تصميم شبكة لـ 50 زبون يومياً + كاشير + مكاتب إدارة',
      difficulty: 'مبتدئ',
      icon: '☕',
      color: '#8B4513',
      tasks: [
        'كم Access Point تحتاج؟',
        'كيف تصمم الـ VLANs؟',
        'ما هي التجهيزات المطلوبة؟'
      ]
    },
    {
      id: 'hospital',
      title: '🏥 شبكة مستشفى صغير',
      description: 'مستشفى يحتاج شبكة آمنة للأقسام: استقبال، عيادات، مخبر، إدارة',
      difficulty: 'متوسط',
      icon: '🏥',
      color: '#1E3A8A',
      tasks: [
        'كيف تفصل الأقسام أمنياً؟',
        'ما هي متطلبات الأمان؟',
        'كيف تضمن سرعة الشبكة؟'
      ]
    },
    {
      id: 'office',
      title: '🏢 شبكة شركة ناشئة',
      description: 'شركة تطلب شبكة لـ 100 موظف مع VPN للموظفين عن بعد',
      difficulty: 'متقدم',
      icon: '🏢',
      color: '#4CAF50',
      tasks: [
        'ما هي تجهيزات الشبكة؟',
        'كيف تدير الـ IP Addressing؟',
        'كيف تؤمن الاتصالات عن بعد؟'
      ]
    }
  ]

  return (
    <div style={styles.container}>
      {/* الهيدر */}
      <header style={styles.header}>
        <Link href="/" style={styles.logo}>Smart Lab</Link>
        <nav style={styles.nav}>
          <Link href="/assessment/categories" style={styles.navLink}>التقييم</Link>
          <Link href="/scenarios" style={{...styles.navLink, ...styles.activeLink}}>السيناريوهات</Link>
        </nav>
        <div style={styles.userIcon}>👤</div>
      </header>

      {/* المحتوى الرئيسي */}
      <main style={styles.main}>
        <h1 style={styles.title}>🚀 سيناريوهات عملية من الواقع</h1>
        <p style={styles.subtitle}>
          اختر سيناريو وحاول تحله خطوة بخطوة. الذكاء الاصطناعي رح يوجهك ويصححلك
        </p>

        <div style={styles.grid}>
          {scenarios.map(scenario => (
            <div key={scenario.id} style={styles.card}>
              <div style={{...styles.cardHeader, backgroundColor: scenario.color}}>
                <span style={styles.cardIcon}>{scenario.icon}</span>
                <span style={styles.difficultyBadge}>{scenario.difficulty}</span>
              </div>
              
              <div style={styles.cardBody}>
                <h2 style={styles.cardTitle}>{scenario.title}</h2>
                <p style={styles.cardDesc}>{scenario.description}</p>
                
                <div style={styles.tasksList}>
                  <h3 style={styles.tasksTitle}>المطلوب منك:</h3>
                  {scenario.tasks.map((task, index) => (
                    <div key={index} style={styles.taskItem}>
                      <span style={styles.taskNumber}>{index + 1}</span>
                      <span>{task}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => router.push(`/scenarios/${scenario.id}`)}
                  style={styles.startButton}
                >
                  ابدأ حل السيناريو
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* فوتر */}
      <footer style={styles.footer}>
        <p>© 2026 Smart Lab - تعلم الشبكات بالتطبيق العملي</p>
      </footer>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    direction: 'rtl',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: 'white',
    borderBottom: '1px solid #eaeaea',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1E3A8A',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    textDecoration: 'none',
    color: '#666',
    fontSize: '1rem',
  },
  activeLink: {
    color: '#1E3A8A',
    fontWeight: 'bold',
    borderBottom: '2px solid #1E3A8A',
    paddingBottom: '0.25rem',
  },
  userIcon: {
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  main: {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '0 1rem',
  },
  title: {
    textAlign: 'center',
    color: '#1E3A8A',
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '3rem',
    maxWidth: '600px',
    margin: '0 auto 3rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  },
  cardHeader: {
    padding: '1.5rem',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: '2rem',
  },
  difficultyBadge: {
    padding: '0.25rem 1rem',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: '20px',
    fontSize: '0.9rem',
  },
  cardBody: {
    padding: '1.5rem',
  },
  cardTitle: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    color: '#333',
  },
  cardDesc: {
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
  },
  tasksList: {
    backgroundColor: '#f5f5f5',
    padding: '1rem',
    borderRadius: '10px',
    marginBottom: '1.5rem',
  },
  tasksTitle: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '0.75rem',
  },
  taskItem: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    alignItems: 'center',
  },
  taskNumber: {
    width: '20px',
    height: '20px',
    backgroundColor: '#1E3A8A',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
  },
  startButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  footer: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#333',
    color: 'white',
    marginTop: '3rem',
  },
      }
