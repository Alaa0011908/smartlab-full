// pages/dashboard.js
// لوحة القيادة - Dashboard

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const COLORS = {
  teal: '#17919e', navy: '#0d3d4e', bg: '#eef4f8',
  surface: '#ffffff', text: '#0d1e3b', muted: '#5b6b7b',
  border: '#d6e0e8', green: '#22c55e', amber: '#f59e0b', red: '#ef4444', purple: '#8b5cf6',
  orange: "#e1682e",
};

function StatCard({ label, value, color, sublabel }) {
  return (
    <div style={{ backgroundColor: COLORS.surface, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}` }}>
      <div style={{ fontSize: 32, fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginTop: 4 }}>{label}</div>
      {sublabel && <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{sublabel}</div>}
    </div>
  );
}

function QuickSkillPill({ state }) {
  const color = state.status === 'mastered' ? COLORS.green
    : state.status === 'developing' ? COLORS.teal
    : state.status === 'needs_attention' ? COLORS.red
    : COLORS.purple;

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px',
      backgroundColor: `${color}12`, border: `1px solid ${color}30`, borderRadius: 20, margin: 4,
    }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
      <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{state.skillId.replace(/_/g, ' ')}</span>
      <span style={{ fontSize: 12, color, fontWeight: 700 }}>{Math.round(state.mastery * 100)}%</span>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [rec, setRec] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('smartlab_user');
    if (!savedUser) {
      router.push('/auth/login');
      return;
    }
    setUser(JSON.parse(savedUser));

    // لجلب البيانات، سنستمر في استخدام المعرف الوهمي للديمو لكن باسم المستخدم المسجل إذا توفر
    const userId = 'demo_alex_001';
    
    Promise.all([
      fetch(`/api/learner/state?userId=${userId}`).then(r => r.json()),
      fetch(`/api/learner/recommendation?userId=${userId}`).then(r => r.json()),
    ]).then(([s, r]) => { setData(s); setRec(r); setLoading(false); });
  }, [router]);

  if (loading || !user) return (
    <div style={{ minHeight: '100vh', backgroundColor: COLORS.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', Tahoma, 'Cairo', system-ui, sans-serif", direction: "rtl" }}>
      <div style={{ textAlign: 'center', color: COLORS.muted }}>
        <div style={{ fontSize: 40, marginBottom: 8, animation: "spin 1s linear infinite" }}>🔄</div>
        <div>جاري تحميل لوحة القيادة...</div>
      </div>
    </div>
  );

  const profile = data?.profile;
  const states = data?.skillStates ?? [];
  const goal = data?.goal;
  const recommendation = rec?.recommendation;
  const coachMessage = rec?.coachMessage;

  const mastered = states.filter(s => s.status === 'mastered');
  const gaps = states.filter(s => s.status === 'needs_attention');
  const improving = states.filter(s => s.trend === 'improving');
  const totalEvidence = states.reduce((sum, s) => sum + s.evidenceCount, 0);

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, 'Cairo', system-ui, sans-serif", backgroundColor: COLORS.bg, minHeight: '100vh', color: COLORS.text, direction: "rtl" }}>
      <Head>
        <title>لوحة القيادة — SmartLab</title>
        <meta name="description" content="لوحة التعلم الشخصية — ماذا يجب أن تفعل تالياً؟" />
      </Head>

      <Navbar />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
        {/* Welcome */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ color: COLORS.teal, fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
            مرحباً بعودتك
          </p>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: COLORS.navy, margin: '6px 0 8px', letterSpacing: -1 }}>
            {user.name || profile?.displayName || 'المستخدم'} 👋
          </h1>
          {goal && (
            <p style={{ color: COLORS.muted, fontSize: 16 }}>
              الهدف الحالي: <strong style={{ color: COLORS.text }}>{goal.description?.ar || 'إتقان أساسيات الشبكات'}</strong>
            </p>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
          {/* LEFT: Next action */}
          <div style={{ gridColumn: '1 / -1' }}>
            {/* Recommended Action */}
            {recommendation && (
              <div style={{ backgroundColor: COLORS.navy, borderRadius: 16, padding: 32, marginBottom: 32, color: '#fff' }}>
                <div style={{ fontSize: 11, letterSpacing: 1.5, color: COLORS.orange, marginBottom: 12, fontWeight: 'bold' }}>
                  الخطوة التالية الموصى بها
                </div>
                <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 12px', lineHeight: 1.2 }}>
                  {recommendation.action?.title?.ar || 'المراجعة والتقييم المخصص'}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
                  {coachMessage?.text || 'بناءً على أدائك الأخير، نوصي بإجراء تقييم مخصص لتغطية الثغرات.'}
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
                  {recommendation.targetSkills?.slice(0, 3).map(skillId => (
                    <span key={skillId} style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: 20, fontSize: 13 }}>
                      {skillId.replace(/_/g, ' ')}
                    </span>
                  ))}
                  <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: 20, fontSize: 13 }}>
                    ~{recommendation.action?.estimatedDurationMinutes} دقيقة
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Link href={recommendation.action?.url || "/assessment"} style={{ backgroundColor: COLORS.teal, color: '#fff', padding: '12px 24px', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
                    ابدأ الآن ←
                  </Link>
                  <Link href="/intelligence" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '12px 24px', borderRadius: 10, textDecoration: 'none', fontSize: 15 }}>
                    عرض ملفك المعرفي
                  </Link>
                </div>
              </div>
            )}

            {/* Skill summary pills */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>
                حالة المهارات الحالية
              </h3>
              <div>
                {states.slice(0, 12).map(s => <QuickSkillPill key={s.skillId} state={s} />)}
                {states.length > 12 && (
                  <Link href="/intelligence" style={{ display: 'inline-block', margin: 4, padding: '8px 14px', color: COLORS.teal, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
                    +{states.length - 12} المزيد ←
                  </Link>
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>الوصول السريع</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                {[
                  { title: 'التقييم التكيفي', desc: 'أسئلة مخصصة لاكتشاف الثغرات', href: '/assessment', icon: '🎯' },
                  { title: 'المعمل الافتراضي', desc: 'محاكاة لحل مشاكل الشبكات', href: '/lab', icon: '🔧' },
                  { title: 'الذكاء والتحليل', desc: 'عرض ملف التعلم الشامل', href: '/intelligence', icon: '🧠' },
                  { title: 'مركز الخصوصية', desc: 'إدارة مشاركة بياناتك', href: '/consent', icon: '🔒' },
                ].map(item => (
                  <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                    <div style={{ backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20, cursor: 'pointer', transition: 'border-color 0.15s' }}>
                      <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: COLORS.muted }}>{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Stats */}
          <div style={{ gridColumn: '1 / -1' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>الملف الشخصي للتعلم</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              <StatCard label="المهارات المتقنة" value={mastered.length} color={COLORS.green} sublabel="أكثر من 80% إتقان" />
              <StatCard label="ثغرات حرجة" value={gaps.length} color={COLORS.red} sublabel="تحتاج انتباهاً فورياً" />
              <StatCard label="قيد التحسن" value={improving.length} color={COLORS.teal} sublabel="اتجاه إيجابي هذا الأسبوع" />
              <StatCard label="نقاط الأدلة الكلية" value={totalEvidence} color={COLORS.navy} sublabel="لجميع المهارات" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
