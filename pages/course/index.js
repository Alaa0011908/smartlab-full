// pages/course/index.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const COLORS = {
  teal: "#17919e",
  tealDark: "#127a86",
  orange: "#e1682e",
  navy: "#0D1E3B",
  bg: "#f8f9fa",
  white: "#ffffff",
  text: "#0D1E3B",
  muted: "#5b6b7b",
  lightGray: "#f8f9fa",
  border: "#e6ecf1",
  success: "#2ECC71",
  warning: "#F39C12",
  error: "#E74C3C",
};

const styles = {
  page: {
    direction: "rtl",
    fontFamily: "'Segoe UI', Tahoma, 'Cairo', system-ui, sans-serif",
    backgroundColor: COLORS.bg,
    color: COLORS.text,
    minHeight: "100vh",
    margin: 0,
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    maxWidth: 1000,
    width: "100%",
    margin: "0 auto",
    padding: "40px 24px 80px",
  },
  pageHeader: {
    marginBottom: 40,
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: 800,
    color: COLORS.navy,
    margin: "0 0 8px",
  },
  pageSubtitle: {
    fontSize: 17,
    color: COLORS.muted,
    margin: 0,
    lineHeight: 1.7,
  },
  // ===== شريط التقدم =====
  progressCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: "24px 32px",
    marginBottom: 32,
    boxShadow: "0 4px 16px rgba(13,30,59,0.06)",
    border: "1px solid " + COLORS.border,
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.navy,
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: 800,
    color: COLORS.teal,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.teal,
    borderRadius: 4,
    transition: "width 0.6s ease",
  },
  progressStats: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 8,
    fontSize: 13,
    color: COLORS.muted,
  },
  // ===== حالة عدم وجود دروس =====
  emptyContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: "60px 40px 70px",
    textAlign: "center",
    boxShadow: "0 6px 24px rgba(13,30,59,0.06)",
  },
  emptyIcon: {
    fontSize: 72,
    marginBottom: 24,
    display: "block",
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: COLORS.navy,
    margin: "0 0 16px",
  },
  emptyDesc: {
    fontSize: 17,
    color: COLORS.muted,
    lineHeight: 1.8,
    maxWidth: 520,
    margin: "0 auto 32px",
  },
  emptyButton: {
    backgroundColor: COLORS.teal,
    color: COLORS.white,
    border: "none",
    borderRadius: 12,
    padding: "14px 40px",
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    transition: "background-color 0.25s ease, transform 0.25s ease",
  },
  // ===== قائمة الدروس =====
  lessonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  lessonCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: "24px 28px",
    boxShadow: "0 4px 16px rgba(13,30,59,0.06)",
    border: "1px solid " + COLORS.border,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  lessonCardCompleted: {
    borderColor: COLORS.success,
    backgroundColor: "#F0FAF5",
  },
  lessonHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    flexWrap: "wrap",
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: COLORS.navy,
    margin: "0 0 4px",
  },
  lessonBadge: {
    display: "inline-block",
    padding: "4px 14px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 700,
  },
  lessonStatus: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.muted,
  },
  lessonBody: {
    marginTop: 12,
  },
  lessonDescription: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 1.8,
    margin: "0 0 12px",
  },
  lessonMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    fontSize: 14,
    color: COLORS.muted,
  },
  lessonMetaItem: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  lessonActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 16,
    paddingTop: 16,
    borderTop: "1px solid " + COLORS.border,
  },
  youtubeButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FF0000",
    color: COLORS.white,
    border: "none",
    borderRadius: 8,
    padding: "8px 18px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 0.25s ease, transform 0.25s ease",
  },
  completeButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.border,
    color: COLORS.text,
    border: "none",
    borderRadius: 8,
    padding: "8px 18px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.25s ease",
  },
  completeButtonDone: {
    backgroundColor: COLORS.success,
    color: COLORS.white,
  },
  // ===== أزرار الإجراءات =====
  actionsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 32,
  },
  actionButton: {
    display: "inline-block",
    padding: "14px 36px",
    borderRadius: 12,
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.25s ease",
    border: "none",
  },
  actionButtonPrimary: {
    backgroundColor: COLORS.teal,
    color: COLORS.white,
  },
  actionButtonSecondary: {
    backgroundColor: "transparent",
    color: COLORS.orange,
    border: "2px solid " + COLORS.orange,
  },
  // ===== تحميل =====
  loadingContainer: {
    textAlign: "center",
    padding: "100px 0",
  },
  spinner: {
    width: 48,
    height: 48,
    border: "4px solid " + COLORS.border,
    borderTop: "4px solid " + COLORS.teal,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 16px",
  },
};

// ===== دالة توليد جملة بحث يوتيوب ذكية =====
function generateYouTubeSearchQuery(topic, reason) {
  const keywords = {
    'subnetting': 'شرح Subnetting بالعربي',
    'IPv4': 'شرح IPv4 بالعربي',
    'IPv6': 'شرح IPv6 بالعربي',
    'OSI': 'شرح نموذج OSI بالعربي',
    'TCP/IP': 'شرح TCP/IP بالعربي',
    'VLAN': 'شرح VLAN بالعربي',
    'VPN': 'شرح VPN بالعربي',
    'Routing': 'شرح Routing بالعربي',
    'Switching': 'شرح Switching بالعربي',
    'Network Basics': 'أساسيات الشبكات بالعربي',
    'Network Devices': 'أجهزة الشبكات بالعربي',
  };

  let searchTerm = topic;
  for (const [key, value] of Object.entries(keywords)) {
    if (topic.toLowerCase().includes(key.toLowerCase())) {
      searchTerm = value;
      break;
    }
  }

  // إضافة سبب الضعف لجعل البحث أكثر دقة
  if (reason && reason.includes('صعوبة في')) {
    searchTerm += ' ' + reason.replace('صعوبة في', 'شرح');
  }

  return searchTerm;
}

export default function Course() {
  const router = useRouter();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [score, setScore] = useState(0);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    // قراءة أحدث نتيجة من localStorage
    try {
      const savedResults = JSON.parse(localStorage.getItem('assessmentResults') || '[]');
      if (savedResults.length === 0) {
        setLoading(false);
        return;
      }

      // الحصول على أحدث نتيجة
      const latest = savedResults[savedResults.length - 1];
      setScore(latest.score || 0);

      // محاولة قراءة البيانات الكاملة من التحليل (في حالة تخزينها)
      // ملاحظة: سيتم استخدام البيانات من localStorage أو سنقوم بتوليد دروس افتراضية للعرض
      const storedAnalysis = JSON.parse(localStorage.getItem('latestAnalysis') || 'null');

      let lessonData = [];
      if (storedAnalysis && storedAnalysis.recommendedLessons && storedAnalysis.recommendedLessons.length > 0) {
        // استخدام الدروس المقترحة من التحليل
        lessonData = storedAnalysis.recommendedLessons.map((lesson, index) => ({
          id: index,
          topic: lesson.topic,
          percentage: lesson.percentage || 0,
          reason: lesson.reason || 'يحتاج مراجعة',
          solution: lesson.solution || 'راجع الأساسيات وطبق تمارين',
          searchQuery: generateYouTubeSearchQuery(lesson.topic, lesson.reason),
          exercises: Math.max(3, Math.round((100 - (lesson.percentage || 50)) / 10)),
          completed: false,
        }));
      } else {
        // توليد دروس افتراضية بناءً على آخر نتيجة
        const weakTopics = [
          { topic: 'Subnetting', reason: 'صعوبة في حسابات الشبكات الفرعية' },
          { topic: 'IPv4', reason: 'صعوبة في فهم بنية العناوين' },
          { topic: 'OSI Model', reason: 'صعوبة في حفظ الطبقات ووظائفها' },
          { topic: 'Routing', reason: 'صعوبة في فهم بروتوكولات التوجيه' },
        ];

        // اختيار موضوعين أو ثلاثة بناءً على النتيجة
        const selected = weakTopics.slice(0, Math.max(2, Math.min(4, Math.floor((100 - latest.score) / 20))));
        lessonData = selected.map((item, index) => ({
          id: index,
          topic: item.topic,
          percentage: Math.max(30, 70 - index * 15),
          reason: item.reason,
          solution: 'راجع الأساسيات وقم بحل تمارين تطبيقية',
          searchQuery: generateYouTubeSearchQuery(item.topic, item.reason),
          exercises: Math.max(3, 5 - index),
          completed: false,
        }));
      }

      // قراءة الدروس المكتملة من localStorage
      const savedCompleted = JSON.parse(localStorage.getItem('courseCompletedLessons') || '[]');
      lessonData = lessonData.map(lesson => ({
        ...lesson,
        completed: savedCompleted.includes(lesson.id),
      }));

      setLessons(lessonData);
      setCompletedLessons(savedCompleted);
      setHasData(lessonData.length > 0);
    } catch (error) {
      console.error('Error loading course data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // دالة تبديل حالة إكمال الدرس
  const toggleComplete = (lessonId) => {
    const updatedLessons = lessons.map(lesson => {
      if (lesson.id === lessonId) {
        return { ...lesson, completed: !lesson.completed };
      }
      return lesson;
    });

    const newCompleted = updatedLessons.filter(l => l.completed).map(l => l.id);
    setCompletedLessons(newCompleted);
    setLessons(updatedLessons);

    // حفظ في localStorage
    localStorage.setItem('courseCompletedLessons', JSON.stringify(newCompleted));
  };

  // حساب التقدم
  const completedCount = lessons.filter(l => l.completed).length;
  const totalCount = lessons.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (loading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.main}>
          <div style={styles.loadingContainer}>
            <div style={styles.spinner} />
            <p style={{ color: COLORS.muted }}>جاري تحميل كورسك المخصص...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>كورسك المخصص - Smart Lab</title>
        <meta name="description" content="كورس تعليمي مخصص بناءً على نتائج تقييمك في منصة سمارت لاب." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @media (max-width: 768px) {
            .course-title { font-size: 28px !important; }
            .lesson-card { padding: 16px 18px !important; }
            .lesson-header { flex-direction: column !important; }
          }
        `}</style>
      </Head>

      <div style={styles.page} dir="rtl">
        <Navbar />

        <main style={styles.main}>
          <div style={styles.pageHeader}>
            <h1 style={{ ...styles.pageTitle, className: "course-title" }}>
              📚 كورسك المخصص
            </h1>
            <p style={styles.pageSubtitle}>
              بناءً على نتائج تقييمك، قمنا بتصميم هذا الكورس ليركز على المجالات التي تحتاج تحسيناً.
              {score > 0 && ` نتيجتك: ${score}%`}
            </p>
          </div>

          {!hasData || lessons.length === 0 ? (
            <div style={styles.emptyContainer}>
              <span style={styles.emptyIcon}>📋</span>
              <h2 style={styles.emptyTitle}>لا توجد دروس مخصصة حتى الآن</h2>
              <p style={styles.emptyDesc}>
                قم بإجراء تقييم أولاً للحصول على كورس مخصص يناسب مستواك ويغطي الفجوات في معرفتك.
              </p>
              <Link href="/assessment/categories" style={styles.emptyButton}>
                🚀 ابدأ تقييمك الجديد
              </Link>
            </div>
          ) : (
            <>
              {/* شريط التقدم */}
              <div style={styles.progressCard}>
                <div style={styles.progressHeader}>
                  <span style={styles.progressLabel}>📊 تقدمك في الكورس</span>
                  <span style={styles.progressPercentage}>{progress}%</span>
                </div>
                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: `${progress}%` }} />
                </div>
                <div style={styles.progressStats}>
                  <span>✅ {completedCount} من {totalCount} درس مكتمل</span>
                  <span>🎯 {totalCount - completedCount} درس متبقي</span>
                </div>
              </div>

              {/* قائمة الدروس */}
              <div style={styles.lessonsContainer}>
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    style={{
                      ...styles.lessonCard,
                      ...(lesson.completed ? styles.lessonCardCompleted : {}),
                    }}
                  >
                    <div style={styles.lessonHeader}>
                      <div>
                        <h3 style={styles.lessonTitle}>
                          {lesson.completed && '✅ '}
                          {lesson.topic}
                        </h3>
                        <div style={styles.lessonMeta}>
                          <span style={styles.lessonMetaItem}>
                            📊 المستوى: {lesson.percentage}%
                          </span>
                          <span style={styles.lessonMetaItem}>
                            📝 {lesson.exercises} تمرين
                          </span>
                        </div>
                      </div>
                      <div style={styles.lessonStatus}>
                        <span
                          style={{
                            ...styles.lessonBadge,
                            backgroundColor: lesson.percentage < 50 ? '#FEE2E2' : '#FEF3C7',
                            color: lesson.percentage < 50 ? '#991B1B' : '#92400E',
                          }}
                        >
                          {lesson.percentage < 50 ? 'يحتاج تركيز عالٍ' : 'يحتاج تحسين'}
                        </span>
                        {lesson.completed && (
                          <span style={{ color: COLORS.success, fontWeight: 700 }}>
                            ✅ مكتمل
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={styles.lessonBody}>
                      <p style={styles.lessonDescription}>
                        <strong>السبب:</strong> {lesson.reason}
                        <br />
                        <strong>الحل:</strong> {lesson.solution}
                      </p>

                      <div style={styles.lessonActions}>
                        <a
                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(lesson.searchQuery)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.youtubeButton}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#CC0000';
                            e.currentTarget.style.transform = 'scale(1.02)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#FF0000';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          ▶ شاهد على يوتيوب
                        </a>
                        <button
                          onClick={() => toggleComplete(lesson.id)}
                          style={{
                            ...styles.completeButton,
                            ...(lesson.completed ? styles.completeButtonDone : {}),
                          }}
                          onMouseEnter={(e) => {
                            if (!lesson.completed) {
                              e.currentTarget.style.backgroundColor = COLORS.teal;
                              e.currentTarget.style.color = COLORS.white;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!lesson.completed) {
                              e.currentTarget.style.backgroundColor = COLORS.border;
                              e.currentTarget.style.color = COLORS.text;
                            }
                          }}
                        >
                          {lesson.completed ? '✅ تم الإكمال' : '☑️ وضع علامة كمكتمل'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* أزرار الإجراءات */}
              <div style={styles.actionsContainer}>
                <Link
                  href="/dashboard"
                  style={{
                    ...styles.actionButton,
                    ...styles.actionButtonPrimary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.tealDark;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.teal;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  📊 العودة إلى لوحة التشخيص
                </Link>
                <Link
                  href="/scenarios"
                  style={{
                    ...styles.actionButton,
                    ...styles.actionButtonSecondary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.orange;
                    e.currentTarget.style.color = COLORS.white;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = COLORS.orange;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  🎭 جرّب محاكي العميل
                </Link>
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
