// pages/course/index.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getAllBasicsQuestions } from '../../data/questions/basics';
import { generateCounterQuestions } from '../../lib/adaptiveEngine';

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
    padding: "30px 16px 60px",
  },
  pageHeader: { marginBottom: 40 },
  pageTitle: { fontSize: 36, fontWeight: 800, color: COLORS.navy, margin: "0 0 8px" },
  pageSubtitle: { fontSize: 17, color: COLORS.muted, margin: 0, lineHeight: 1.7 },
  progressCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: "24px 32px",
    marginBottom: 32,
    boxShadow: "0 4px 16px rgba(13,30,59,0.06)",
    border: "1px solid " + COLORS.border,
  },
  progressHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  progressLabel: { fontSize: 16, fontWeight: 700, color: COLORS.navy },
  progressPercentage: { fontSize: 18, fontWeight: 800, color: COLORS.teal },
  progressBar: { height: 8, backgroundColor: COLORS.border, borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: COLORS.teal, borderRadius: 4, transition: "width 0.6s ease" },
  progressStats: { display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 13, color: COLORS.muted },
  emptyContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: "60px 40px 70px",
    textAlign: "center",
    boxShadow: "0 6px 24px rgba(13,30,59,0.06)",
  },
  emptyIcon: { fontSize: 72, marginBottom: 24, display: "block" },
  emptyTitle: { fontSize: 28, fontWeight: 800, color: COLORS.navy, margin: "0 0 16px" },
  emptyDesc: { fontSize: 17, color: COLORS.muted, lineHeight: 1.8, maxWidth: 520, margin: "0 auto 32px" },
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
    minHeight: 56,
  },
  lessonsContainer: { display: "flex", flexDirection: "column", gap: 12 },
  lessonCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: "24px 28px",
    boxShadow: "0 4px 16px rgba(13,30,59,0.06)",
    border: "1px solid " + COLORS.border,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  lessonCardCompleted: { borderColor: COLORS.success, backgroundColor: "#F0FAF5" },
  lessonCardHigh: { borderColor: COLORS.error, backgroundColor: "#FFEBEE" },
  lessonCardMedium: { borderColor: COLORS.warning, backgroundColor: "#FFF8E1" },
  lessonHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" },
  lessonTitle: { fontSize: 20, fontWeight: 700, color: COLORS.navy, margin: "0 0 4px" },
  lessonBadge: { display: "inline-block", padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700 },
  lessonStatus: { display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: COLORS.muted },
  lessonBody: { marginTop: 12 },
  lessonDescription: { fontSize: 15, color: COLORS.text, lineHeight: 1.8, margin: "0 0 12px" },
  lessonMeta: { display: "flex", flexWrap: "wrap", gap: 16, fontSize: 14, color: COLORS.muted },
  lessonMetaItem: { display: "flex", alignItems: "center", gap: 6 },
  lessonActions: { display: "flex", flexWrap: "wrap", gap: 12, marginTop: 16, paddingTop: 16, borderTop: "1px solid " + COLORS.border },
  youtubeButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FF0000",
    color: COLORS.white,
    border: "none",
    borderRadius: 8,
    padding: "10px 18px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
    transition: "background-color 0.25s ease, transform 0.25s ease",
    minHeight: 48,
  },
  completeButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.border,
    color: COLORS.text,
    border: "none",
    borderRadius: 8,
    padding: "10px 18px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.25s ease",
    minHeight: 48,
  },
  completeButtonDone: { backgroundColor: COLORS.success, color: COLORS.white },
  actionsContainer: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12, marginTop: 32 },
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
    minHeight: 56,
    textAlign: "center",
  },
  actionButtonPrimary: { backgroundColor: COLORS.teal, color: COLORS.white },
  actionButtonSecondary: { backgroundColor: "transparent", color: COLORS.orange, border: "2px solid " + COLORS.orange },
  loadingContainer: { textAlign: "center", padding: "100px 0" },
  spinner: {
    width: 48,
    height: 48,
    border: "4px solid " + COLORS.border,
    borderTop: "4px solid " + COLORS.teal,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 16px",
  },
  antiQuestionCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 10,
    padding: '14px 18px',
    marginTop: 8,
    border: '1px solid #FFE082',
  },
  antiQuestionTitle: { fontSize: 14, fontWeight: 700, color: '#E65100' },
  antiQuestionText: { fontSize: 14, color: '#333', marginTop: 4 },
};

export default function Course() {
  const router = useRouter();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [score, setScore] = useState(0);
  const [hasData, setHasData] = useState(false);
  const [weakSkills, setWeakSkills] = useState([]);
  const [antiQuestions, setAntiQuestions] = useState([]);

  useEffect(() => {
    try {
      // قراءة آخر تحليل
      const savedResults = JSON.parse(localStorage.getItem('assessmentResults') || '[]');
      const latestAnalysis = JSON.parse(localStorage.getItem('latestAnalysis') || 'null');

      if (!latestAnalysis || savedResults.length === 0) {
        setLoading(false);
        setHasData(false);
        return;
      }

      const latest = savedResults[savedResults.length - 1];
      setScore(latest.score || 0);

      // استخراج المهارات الضعيفة من آخر تحليل
      let weakSkillsData = latestAnalysis.weakestSkills || [];
      if (weakSkillsData.length === 0 && latestAnalysis.masteryResults) {
        // احتياطي: استخرج المهارات الأقل من 70%
        weakSkillsData = latestAnalysis.masteryResults
          .filter(s => s.percentage < 70)
          .sort((a, b) => a.percentage - b.percentage)
          .slice(0, 5)
          .map(s => ({
            name: s.name,
            percentage: s.percentage,
            rootCause: s.rootCause || 'يحتاج مراجعة',
            futureImpact: s.futureImpact || 'سيؤثر على فهمك للموضوعات المتقدمة',
            remediationVideoQuery: s.remediationVideoQuery || `شرح ${s.name}`,
            errorPattern: s.errorPattern || 'general'
          }));
      }

      setWeakSkills(weakSkillsData);

      // توليد الأسئلة المضادة من قاعدة الأسئلة
      const allQuestions = getAllBasicsQuestions();
      const counterQuestions = generateCounterQuestions(weakSkillsData, allQuestions, 5);
      setAntiQuestions(counterQuestions);

      // بناء قائمة الدروس من المهارات الضعيفة
      let lessonData = weakSkillsData.map((skill, index) => ({
        id: index,
        topic: skill.name,
        percentage: skill.percentage || 0,
        reason: skill.rootCause || 'يحتاج مراجعة',
        solution: `راجع المفهوم الأساسي وقم بحل تمارين تطبيقية على ${skill.name}`,
        searchQuery: skill.remediationVideoQuery || `شرح ${skill.name} بالعربي`,
        exercises: Math.max(3, Math.round((100 - (skill.percentage || 50)) / 10)),
        completed: false,
        priority: skill.percentage < 30 ? 'عالية' : skill.percentage < 60 ? 'متوسطة' : 'منخفضة',
        errors: [],
        errorCount: 0,
        futureImpact: skill.futureImpact || '',
      }));

      // إذا لم تكن هناك مهارات ضعيفة، أضف دروساً احتياطية
      if (lessonData.length === 0) {
        const weakTopics = [
          { topic: 'Subnetting', reason: 'صعوبة في حسابات الشبكات الفرعية' },
          { topic: 'IPv4', reason: 'صعوبة في فهم بنية العناوين' },
          { topic: 'OSI Model', reason: 'صعوبة في حفظ الطبقات ووظائفها' },
        ];
        lessonData = weakTopics.map((item, index) => ({
          id: index,
          topic: item.topic,
          percentage: Math.max(30, 70 - index * 15),
          reason: item.reason,
          solution: 'راجع الأساسيات وقم بحل تمارين تطبيقية',
          searchQuery: `شرح ${item.topic} بالعربي`,
          exercises: Math.max(3, 5 - index),
          completed: false,
          priority: index === 0 ? 'عالية' : 'متوسطة',
          errors: [],
          errorCount: 0,
          futureImpact: 'قد يؤثر على فهمك للشبكات المتقدمة',
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

    localStorage.setItem('courseCompletedLessons', JSON.stringify(newCompleted));
  };

  const completedCount = lessons.filter(l => l.completed).length;
  const totalCount = lessons.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // ترتيب الدروس حسب الأولوية
  const sortedLessons = [...lessons].sort((a, b) => {
    const priorityOrder = { 'عالية': 0, 'متوسطة': 1, 'منخفضة': 2 };
    return (priorityOrder[a.priority] || 1) - (priorityOrder[b.priority] || 1);
  });

  const getPriorityStyle = (priority) => {
    if (priority === 'عالية') return styles.lessonCardHigh;
    if (priority === 'متوسطة') return styles.lessonCardMedium;
    return {};
  };

  const getPriorityLabel = (priority) => {
    if (priority === 'عالية') return { label: '🔴 أولوية عالية', color: COLORS.error };
    if (priority === 'متوسطة') return { label: '🟡 أولوية متوسطة', color: COLORS.warning };
    return { label: '🟢 أولوية منخفضة', color: COLORS.success };
  };

  const handleStartAntiQuiz = () => {
    if (antiQuestions.length === 0) return;
    // تخزين الأسئلة المضادة في localStorage مؤقتاً لتستخدم في صفحة تقييم خاصة
    localStorage.setItem('antiQuestions', JSON.stringify(antiQuestions));
    router.push('/assessment/anti?mode=anti');
  };

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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.5" />
        <style>{`
          @media (max-width: 768px) {
            .main { padding: 24px 16px 40px !important; }
            .course-title { font-size: 30px !important; }
            .course-subtitle { font-size: 15px !important; }
            .progress-card { padding: 18px 20px !important; }
            .lesson-card { padding: 18px 18px !important; }
            .lesson-header { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
            .lesson-title { font-size: 18px !important; }
            .lesson-actions { flex-direction: column !important; }
            .youtube-btn, .complete-btn { width: 100% !important; justify-content: center !important; }
            .action-btn { width: 100% !important; text-align: center !important; }
            .actions-container { flex-direction: column !important; }
          }
          @media (max-width: 480px) {
            .main { padding: 16px 12px 30px !important; }
            .course-title { font-size: 24px !important; }
            .course-subtitle { font-size: 14px !important; }
            .progress-card { padding: 14px 16px !important; }
            .progress-label { font-size: 14px !important; }
            .progress-percentage { font-size: 16px !important; }
            .lesson-card { padding: 14px 14px !important; }
            .lesson-title { font-size: 16px !important; }
            .lesson-description { font-size: 14px !important; }
            .lesson-meta { font-size: 13px !important; }
            .empty-container { padding: 30px 16px 40px !important; }
            .empty-title { font-size: 22px !important; }
            .empty-desc { font-size: 15px !important; }
            .empty-btn { width: 100% !important; }
          }
        `}</style>
      </Head>

      <div style={styles.page} dir="rtl">
        <Navbar />

        <main style={styles.main} className="main">
          <div style={styles.pageHeader}>
            <h1 style={{ ...styles.pageTitle, className: "course-title" }}>
              📚 كورسك المخصص
            </h1>
            <p style={{ ...styles.pageSubtitle, className: "course-subtitle" }}>
              بناءً على نتائج تقييمك، قمنا بتصميم هذا الكورس ليركز على المجالات التي تحتاج تحسيناً.
              {score > 0 && ` نتيجتك: ${score}%`}
            </p>
          </div>

          {!hasData || lessons.length === 0 ? (
            <div style={styles.emptyContainer} className="empty-container">
              <span style={styles.emptyIcon}>📋</span>
              <h2 style={styles.emptyTitle} className="empty-title">لا توجد دروس مخصصة حتى الآن</h2>
              <p style={styles.emptyDesc} className="empty-desc">
                قم بإجراء تقييم أولاً للحصول على كورس مخصص يناسب مستواك ويغطي الفجوات في معرفتك.
              </p>
              <Link href="/assessment/categories" style={styles.emptyButton} className="empty-btn">
                🚀 ابدأ تقييمك الجديد
              </Link>
            </div>
          ) : (
            <>
              <div style={styles.progressCard} className="progress-card">
                <div style={styles.progressHeader}>
                  <span style={styles.progressLabel} className="progress-label">📊 تقدمك في الكورس</span>
                  <span style={styles.progressPercentage} className="progress-percentage">{progress}%</span>
                </div>
                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: `${progress}%` }} />
                </div>
                <div style={styles.progressStats}>
                  <span>✅ {completedCount} من {totalCount} درس مكتمل</span>
                  <span>🎯 {totalCount - completedCount} درس متبقي</span>
                </div>
              </div>

              <div style={styles.lessonsContainer}>
                {sortedLessons.map((lesson) => {
                  const priorityInfo = getPriorityLabel(lesson.priority);
                  const priorityStyle = getPriorityStyle(lesson.priority);

                  return (
                    <div
                      key={lesson.id}
                      style={{
                        ...styles.lessonCard,
                        ...(lesson.completed ? styles.lessonCardCompleted : {}),
                        ...(priorityStyle && !lesson.completed ? priorityStyle : {}),
                      }}
                      className="lesson-card"
                    >
                      <div style={styles.lessonHeader} className="lesson-header">
                        <div>
                          <h3 style={styles.lessonTitle} className="lesson-title">
                            {lesson.completed && '✅ '}
                            {lesson.topic}
                          </h3>
                          <div style={styles.lessonMeta} className="lesson-meta">
                            <span style={styles.lessonMetaItem}>
                              📊 المستوى: {lesson.percentage}%
                            </span>
                            <span style={styles.lessonMetaItem}>
                              📝 {lesson.exercises} تمرين
                            </span>
                            {lesson.errorCount > 0 && (
                              <span style={styles.lessonMetaItem}>
                                ❌ {lesson.errorCount} خطأ
                              </span>
                            )}
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
                          <span style={{ color: priorityInfo.color, fontWeight: 700 }}>
                            {priorityInfo.label}
                          </span>
                          {lesson.completed && (
                            <span style={{ color: COLORS.success, fontWeight: 700 }}>
                              ✅ مكتمل
                            </span>
                          )}
                        </div>
                      </div>

                      <div style={styles.lessonBody}>
                        <p style={styles.lessonDescription} className="lesson-description">
                          <strong>السبب:</strong> {lesson.reason}
                          <br />
                          <strong>الحل:</strong> {lesson.solution}
                          {lesson.futureImpact && (
                            <>
                              <br />
                              <strong>التأثير المستقبلي:</strong> {lesson.futureImpact}
                            </>
                          )}
                          {lesson.errors && lesson.errors.length > 0 && (
                            <>
                              <br />
                              <strong>الأخطاء الشائعة:</strong>
                              <ul style={{ marginTop: 4, paddingRight: 20 }}>
                                {lesson.errors.slice(0, 3).map((err, idx) => (
                                  <li key={idx} style={{ fontSize: 13 }}>{err.question?.substring(0, 50)}...</li>
                                ))}
                              </ul>
                            </>
                          )}
                        </p>

                        <div style={styles.lessonActions} className="lesson-actions">
                          <a
                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(lesson.searchQuery)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.youtubeButton}
                            className="youtube-btn"
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
                            className="complete-btn"
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
                  );
                })}
              </div>

              {/* عرض الأسئلة المضادة */}
              {antiQuestions.length > 0 && (
                <div style={{ ...styles.progressCard, backgroundColor: '#FFF3E0', borderColor: '#FFB74D' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#E65100', marginBottom: 12 }}>
                    🎯 تمارين مضادة لثغراتك
                  </h3>
                  <p style={{ fontSize: 14, color: '#555', marginBottom: 12 }}>
                    هذه الأسئلة مصممة خصيصاً لمعالجة نقاط الضعف لديك. حاول حلها لتعزيز فهمك.
                  </p>
                  <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                    {antiQuestions.slice(0, 10).map((q, idx) => (
                      <div key={q.id || idx} style={styles.antiQuestionCard}>
                        <div style={styles.antiQuestionTitle}>
                          سؤال {idx + 1}:
                        </div>
                        <div style={styles.antiQuestionText}>
                          {q.question.substring(0, 120)}...
                        </div>
                        <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
                          المهارة: {q.subSkills ? q.subSkills.join('، ') : q.subSkill}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleStartAntiQuiz}
                    style={{
                      ...styles.actionButton,
                      ...styles.actionButtonPrimary,
                      backgroundColor: '#E65100',
                      width: '100%',
                      marginTop: 12,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#BF360C'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E65100'}
                  >
                    🚀 حل هذه التمارين ({antiQuestions.length} سؤال)
                  </button>
                </div>
              )}

              <div style={styles.actionsContainer} className="actions-container">
                <Link
                  href="/dashboard"
                  style={{
                    ...styles.actionButton,
                    ...styles.actionButtonPrimary,
                  }}
                  className="action-btn"
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
                  className="action-btn"
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
