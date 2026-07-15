import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'

export default function ScenarioDetail() {
  const router = useRouter()
  const { id } = router.query
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  // بيانات السيناريوهات
  const scenarios = {
    cafe: {
      title: '☕ تصميم شبكة مقهى كوفي شوب',
      description: 'صاحب مقهى يطلب منك تصميم شبكة لـ 50 زبون يومياً + كاشير + مكاتب إدارة',
      tasks: [
        'كم Access Point تحتاج؟',
        'كيف تصمم الـ VLANs؟',
        'ما هي التجهيزات المطلوبة؟'
      ]
    },
    hospital: {
      title: '🏥 شبكة مستشفى صغير',
      description: 'مستشفى يحتاج شبكة آمنة للأقسام: استقبال، عيادات، مخبر، إدارة',
      tasks: [
        'كيف تفصل الأقسام أمنياً؟',
        'ما هي متطلبات الأمان؟',
        'كيف تضمن سرعة الشبكة؟'
      ]
    },
    office: {
      title: '🏢 شبكة شركة ناشئة',
      description: 'شركة تطلب شبكة لـ 100 موظف مع VPN للموظفين عن بعد',
      tasks: [
        'ما هي تجهيزات الشبكة؟',
        'كيف تدير الـ IP Addressing؟',
        'كيف تؤمن الاتصالات عن بعد؟'
      ]
    }
  }

  const scenario = scenarios[id] || scenarios.cafe

  // دالة إرسال الرسالة
  const sendMessage = async () => {
    if (!input.trim()) return

    // إضافة رسالة المستخدم
    const userMessage = { role: 'user', content: input }
    setMessages([...messages, userMessage])
    setInput('')
    setLoading(true)

    try {
      // إرسال للـ API
      const response = await fetch('/api/scenario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenarioId: id,
          message: input,
          history: messages
        }),
      });

      if (!response.ok) {
        throw new Error('فشل الاتصال بالسيرفر');
      }

      const data = await response.json();
      
      // إضافة رد AI
      const aiMessage = { role: 'ai', content: data.message };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { 
        role: 'ai', 
        content: '❌ عذراً، حدث خطأ في الاتصال. تأكد من اتصالك بالإنترنت وحاول مرة أخرى.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  // دالة المساعدة (اقتراحات سريعة)
  const addSuggestion = (suggestion) => {
    setInput(suggestion);
  }

  if (!id) {
    return <div style={styles.loading}>جاري التحميل...</div>
  }

  return (
    <div style={styles.container}>
      {/* الهيدر */}
      <header style={styles.header}>
        <Link href="/" style={styles.logo}>Smart Lab</Link>
        <Link href="/scenarios" style={styles.backButton}>
          ← العودة للسيناريوهات
        </Link>
      </header>

      {/* محتوى السيناريو */}
      <main style={styles.main}>
        {/* رأس السيناريو */}
        <div style={styles.scenarioHeader}>
          <h1 style={styles.title}>{scenario.title}</h1>
          <p style={styles.description}>{scenario.description}</p>
          
          {/* المهام */}
          <div style={styles.tasksContainer}>
            <h3 style={styles.tasksTitle}>📋 المطلوب منك:</h3>
            <ul style={styles.tasksList}>
              {scenario.tasks.map((task, index) => (
                <li key={index} style={styles.taskItem}>{task}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* صندوق المحادثة */}
        <div style={styles.chatContainer}>
          {/* رسالة الترحيب (تظهر مرة واحدة) */}
          {messages.length === 0 && (
            <div style={styles.aiMessage}>
              <strong>🤖 AI: </strong>
              مرحباً! أنا مساعدك في حل هذا السيناريو. اشرحلي كيف ستبدأ في تصميم هذه الشبكة؟
            </div>
          )}

          {/* عرض المحادثة */}
          {messages.map((msg, index) => (
            <div 
              key={index} 
              style={msg.role === 'user' ? styles.userMessage : styles.aiMessage}
            >
              <strong>{msg.role === 'user' ? '👤 أنت: ' : '🤖 AI: '}</strong>
              {msg.content}
            </div>
          ))}

          {/* مؤشر الكتابة */}
          {loading && (
            <div style={styles.aiMessage}>
              <strong>🤖 AI: </strong>
              <span style={styles.typing}>جاري التفكير...</span>
            </div>
          )}

          {/* اقتراحات سريعة */}
          {messages.length < 2 && (
            <div style={styles.suggestions}>
              <button onClick={() => addSuggestion("كم Access Point أحتاج؟")} style={styles.suggestionBtn}>
                كم Access Point أحتاج؟
              </button>
              <button onClick={() => addSuggestion("ما هي التجهيزات المطلوبة؟")} style={styles.suggestionBtn}>
                ما هي التجهيزات؟
              </button>
              <button onClick={() => addSuggestion("كيف تصمم VLANs؟")} style={styles.suggestionBtn}>
                كيف تصمم VLANs؟
              </button>
            </div>
          )}

          {/* منطقة الإدخال */}
          <div style={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب ردك هنا..."
              style={styles.input}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              disabled={loading}
            />
            <button 
              onClick={sendMessage}
              style={{
                ...styles.sendButton,
                opacity: loading ? 0.5 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              disabled={loading}
            >
              {loading ? 'جاري الإرسال...' : 'إرسال'}
            </button>
          </div>
        </div>

        {/* تلميحات إضافية */}
        <div style={styles.tips}>
          <h3 style={styles.tipsTitle}>💡 تلميحات مهمة:</h3>
          <ul style={styles.tipsList}>
            <li>ابدأ بطرح أسئلة للزبون لتفهم متطلباته</li>
            <li>فكر في عدد الأجهزة والتغطية المطلوبة</li>
            <li>حدد نوع التجهيزات اللي رح تحتاجها</li>
            <li>لا تنسى متطلبات الأمان والتوسع المستقبلي</li>
          </ul>
        </div>
      </main>
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
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1E3A8A',
    textDecoration: 'none',
  },
  backButton: {
    color: '#666',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    backgroundColor: '#f5f5f5',
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    color: '#666',
  },
  main: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '0 1rem',
  },
  scenarioHeader: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  },
  title: {
    color: '#1E3A8A',
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  description: {
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  tasksContainer: {
    backgroundColor: '#f5f5f5',
    padding: '1rem',
    borderRadius: '5px',
  },
  tasksTitle: {
    color: '#333',
    marginBottom: '0.5rem',
  },
  tasksList: {
    listStyle: 'none',
    padding: 0,
  },
  taskItem: {
    padding: '0.25rem 0',
    color: '#666',
    fontSize: '0.95rem',
  },
  chatContainer: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
  },
  userMessage: {
    backgroundColor: '#1E3A8A',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '20px 20px 5px 20px',
    marginBottom: '1rem',
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#f5f5f5',
    padding: '0.75rem 1rem',
    borderRadius: '20px 20px 20px 5px',
    marginBottom: '1rem',
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  typing: {
    color: '#666',
    fontStyle: 'italic',
  },
  suggestions: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginBottom: '1rem',
  },
  suggestionBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f0f0f0',
    color: '#333',
    border: 'none',
    borderRadius: '20px',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  inputArea: {
    display: 'flex',
    gap: '1rem',
    marginTop: 'auto',
  },
  input: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  sendButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  tips: {
    backgroundColor: '#E3F2FD',
    padding: '1.5rem',
    borderRadius: '10px',
  },
  tipsTitle: {
    color: '#1E3A8A',
    marginBottom: '0.5rem',
  },
  tipsList: {
    color: '#333',
    lineHeight: '1.8',
    paddingRight: '1.5rem',
  },
        }
