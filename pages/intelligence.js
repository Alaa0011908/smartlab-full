// pages/intelligence.js
// "My Learning Intelligence" — The flagship WOW screen
// Reads from /api/learner/state and /api/learner/recommendation
// ALL values come from the engine — never hardcoded in the UI.

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const COLORS = {
  teal: '#17919e',
  tealDark: '#127a86',
  tealLight: '#e8f6f7',
  orange: '#e1682e',
  orangeLight: '#fdf0e8',
  navy: '#0d3d4e',
  bg: '#eef4f8',
  surface: '#ffffff',
  text: '#0d1e3b',
  muted: '#5b6b7b',
  border: '#d6e0e8',
  green: '#22c55e',
  amber: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
};

function getMasteryColor(mastery, status) {
  if (status === 'uncertain') return COLORS.purple;
  if (mastery >= 0.8) return COLORS.green;
  if (mastery >= 0.55) return COLORS.teal;
  if (mastery >= 0.35) return COLORS.amber;
  return COLORS.red;
}

function getStatusLabel(status, locale = 'en') {
  const labels = {
    mastered:       { en: 'Strong',        ar: 'قوي' },
    developing:     { en: 'Developing',    ar: 'قيد التطوير' },
    needs_attention:{ en: 'Priority Gap',  ar: 'فجوة أولوية' },
    uncertain:      { en: 'Need More Evidence', ar: 'يحتاج دليلاً أكثر' },
  };
  return labels[status]?.[locale] ?? status;
}

function SkillBar({ state, locale = 'en' }) {
  const [showDetail, setShowDetail] = useState(false);
  const mastery = Math.round(state.mastery * 100);
  const uncertainty = Math.round(state.masteryUncertainty * 100);
  const color = getMasteryColor(state.mastery, state.status);

  return (
    <div style={{ marginBottom: 16, padding: '14px 16px', backgroundColor: COLORS.bg, borderRadius: 10, borderLeft: `4px solid ${color}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div>
          <span style={{ fontWeight: 700, color: COLORS.text, fontSize: 15 }}>{state.skillId.replace(/_/g, ' ')}</span>
          <span style={{ marginLeft: 10, fontSize: 12, color: COLORS.muted, backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}`, padding: '2px 8px', borderRadius: 20 }}>
            {getStatusLabel(state.status, locale)}
          </span>
        </div>
        <button
          onClick={() => setShowDetail(!showDetail)}
          style={{ background: 'none', border: 'none', color: COLORS.teal, cursor: 'pointer', fontSize: 13 }}
        >
          {showDetail ? 'Hide' : 'Details'}
        </button>
      </div>

      {/* Mastery bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, backgroundColor: COLORS.border, borderRadius: 4, height: 8 }}>
          <div style={{ width: `${mastery}%`, backgroundColor: color, height: 8, borderRadius: 4, transition: 'width 0.6s ease' }} />
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color, minWidth: 40, textAlign: 'right' }}>{mastery}%</span>
        {state.status === 'uncertain' && (
          <span title={`System confidence in this estimate: ${Math.round(state.confidence * 100)}%`}
            style={{ fontSize: 12, color: COLORS.purple, cursor: 'help' }}>⚠ Low evidence</span>
        )}
      </div>

      {/* Trend indicator */}
      <div style={{ marginTop: 6, display: 'flex', gap: 16, fontSize: 12, color: COLORS.muted }}>
        <span>
          {state.trend === 'improving' ? '↑ Improving' : state.trend === 'declining' ? '↓ Declining' : '→ Stable'}
        </span>
        <span>{state.evidenceCount} evidence points</span>
      </div>

      {showDetail && (
        <div style={{ marginTop: 12, padding: 12, backgroundColor: COLORS.surface, borderRadius: 8, fontSize: 13 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div><strong>Mastery Estimate:</strong> {mastery}%</div>
            <div><strong>Uncertainty:</strong> ±{uncertainty}%</div>
            <div><strong>System Confidence:</strong> {Math.round(state.confidence * 100)}%</div>
            <div><strong>Evidence Count:</strong> {state.evidenceCount}</div>
            {state.calibrationGap !== undefined && (
              <div style={{ gridColumn: '1/-1' }}>
                <strong>Calibration Gap:</strong> {state.calibrationGap > 0 ? '+' : ''}{Math.round(state.calibrationGap * 100)}%
                {state.calibrationGap > 0.2 && <span style={{ color: COLORS.amber }}> (overconfident)</span>}
                {state.calibrationGap < -0.2 && <span style={{ color: COLORS.purple }}> (underconfident)</span>}
              </div>
            )}
          </div>
          {state.misconceptions && state.misconceptions.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <strong style={{ color: COLORS.amber }}>⚠ Detected misconceptions:</strong>
              {state.misconceptions.map(m => (
                <div key={m.misconceptionId} style={{ color: COLORS.muted, marginTop: 4 }}>
                  • {m.misconceptionId.replace(/_/g, ' ')} (confidence {Math.round(m.confidence * 100)}%)
                </div>
              ))}
            </div>
          )}
          {state.problemSolvingIndicators && (
            <div style={{ marginTop: 8 }}>
              <strong>Problem Solving Indicators:</strong>
              {Object.entries(state.problemSolvingIndicators).filter(([, v]) => v !== undefined).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', color: COLORS.muted, marginTop: 4 }}>
                  <span>{k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</span>
                  <span>{Math.round(v * 100)}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function IntelligencePage() {
  const [data, setData] = useState(null);
  const [rec, setRec] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWhyPanel, setShowWhyPanel] = useState(false);
  const locale = 'en';

  useEffect(() => {
    Promise.all([
      fetch('/api/learner/state?userId=demo_alex_001').then(r => r.json()),
      fetch('/api/learner/recommendation?userId=demo_alex_001').then(r => r.json()),
    ]).then(([stateData, recData]) => {
      setData(stateData);
      setRec(recData);
      setLoading(false);
    }).catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div style={{ minHeight: '100vh', backgroundColor: COLORS.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ textAlign: 'center', color: COLORS.muted }}>
        <div style={{ fontSize: 32, marginBottom: 16 }}>🧠</div>
        <div>Analyzing your learning profile...</div>
      </div>
    </div>
  );

  if (error) return (
    <div style={{ padding: 40, color: COLORS.red, fontFamily: "'Segoe UI', system-ui" }}>
      Error: {error}. Make sure the dev server is running.
    </div>
  );

  const skillStates = data?.skillStates ?? [];
  const mastered = skillStates.filter(s => s.status === 'mastered');
  const developing = skillStates.filter(s => s.status === 'developing');
  const gaps = skillStates.filter(s => s.status === 'needs_attention');
  const uncertain = skillStates.filter(s => s.status === 'uncertain');
  const goal = data?.goal;
  const recommendation = rec?.recommendation;
  const coachMessage = rec?.coachMessage;

  return (
    <div style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', system-ui, sans-serif", backgroundColor: COLORS.bg, minHeight: '100vh', color: COLORS.text }}>
      <Head>
        <title>My Learning Intelligence — SmartLab</title>
        <meta name="description" content="Your personalized adaptive learning profile built from evidence." />
      </Head>

      {/* Header */}
      <div style={{ backgroundColor: COLORS.navy, color: '#fff', padding: '0 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>SmartLab</span>
            <span style={{ fontSize: 12, backgroundColor: COLORS.teal, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>Adaptive Intelligence</span>
          </div>
          <nav style={{ display: 'flex', gap: 24, fontSize: 14 }}>
            <Link href="/dashboard" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Dashboard</Link>
            <span style={{ color: '#fff', fontWeight: 700 }}>My Intelligence</span>
            <Link href="/assessment" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Assessment</Link>
            <Link href="/lab" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Lab</Link>
          </nav>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        {/* Page Title */}
        <div style={{ marginBottom: 36 }}>
          <p style={{ color: COLORS.teal, fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', margin: 0 }}>EVIDENCE-BASED PROFILE</p>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: COLORS.navy, margin: '6px 0 8px', letterSpacing: -1 }}>My Learning Intelligence</h1>
          {goal && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: COLORS.muted, fontSize: 15 }}>Goal:</span>
              <span style={{ color: COLORS.text, fontWeight: 600, fontSize: 15 }}>{goal.description?.[locale]}</span>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32 }}>

          {/* Left — Skill Map */}
          <div>
            {mastered.length > 0 && (
              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: COLORS.green, marginBottom: 16 }}>
                  ✓ Strong ({mastered.length})
                </h2>
                {mastered.map(s => <SkillBar key={s.skillId} state={s} locale={locale} />)}
              </section>
            )}

            {developing.length > 0 && (
              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: COLORS.teal, marginBottom: 16 }}>
                  → Developing ({developing.length})
                </h2>
                {developing.map(s => <SkillBar key={s.skillId} state={s} locale={locale} />)}
              </section>
            )}

            {gaps.length > 0 && (
              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: COLORS.red, marginBottom: 16 }}>
                  ⚡ Priority Gaps ({gaps.length})
                </h2>
                {gaps.map(s => <SkillBar key={s.skillId} state={s} locale={locale} />)}
              </section>
            )}

            {uncertain.length > 0 && (
              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: COLORS.purple, marginBottom: 16 }}>
                  ? Needs More Evidence ({uncertain.length})
                </h2>
                <p style={{ fontSize: 13, color: COLORS.muted, marginBottom: 12, fontStyle: 'italic' }}>
                  These areas have insufficient data to determine mastery — different from &quot;weak&quot;.
                </p>
                {uncertain.map(s => <SkillBar key={s.skillId} state={s} locale={locale} />)}
              </section>
            )}
          </div>

          {/* Right — Coach Panel */}
          <div>
            {/* Recommendation Card */}
            {recommendation && (
              <div style={{ backgroundColor: COLORS.navy, color: '#fff', borderRadius: 14, padding: 24, marginBottom: 20 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                  LEARNING COACH
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', marginBottom: 20 }}>
                  {coachMessage?.text}
                </div>

                <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
                  <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                    RECOMMENDED NEXT ACTION
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
                    {recommendation.action?.title?.[locale]}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                    ~{recommendation.action?.estimatedDurationMinutes} min
                    {' · '}
                    Priority: <span style={{ color: recommendation.priority === 'high' ? '#f87171' : COLORS.amber }}>
                      {recommendation.priority}
                    </span>
                  </div>
                </div>

                {recommendation.action?.url && (
                  <Link href={recommendation.action.url}
                    style={{ display: 'block', textAlign: 'center', backgroundColor: COLORS.teal, color: '#fff', padding: '12px 20px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>
                    Start Now →
                  </Link>
                )}

                <button
                  onClick={() => setShowWhyPanel(!showWhyPanel)}
                  style={{ width: '100%', background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', padding: '10px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}
                >
                  {showWhyPanel ? 'Hide explanation' : 'Why am I seeing this?'}
                </button>

                {showWhyPanel && (
                  <div style={{ marginTop: 14, padding: 14, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 8, fontSize: 13 }}>
                    <div style={{ fontWeight: 700, marginBottom: 10, color: COLORS.teal }}>Evidence-Based Rationale</div>
                    {recommendation.evidenceSummary?.map((e, i) => (
                      <div key={i} style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>• {e}</div>
                    ))}
                    <div style={{ marginTop: 10, color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>
                      Model confidence: {Math.round(recommendation.confidence * 100)}%
                      {coachMessage?.usedFallback && ' · AI unavailable — deterministic mode'}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Summary stats */}
            <div style={{ backgroundColor: COLORS.surface, borderRadius: 14, padding: 20, border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>Profile Summary</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { label: 'Mastered', value: mastered.length, color: COLORS.green },
                  { label: 'Developing', value: developing.length, color: COLORS.teal },
                  { label: 'Priority Gaps', value: gaps.length, color: COLORS.red },
                  { label: 'Uncertain', value: uncertain.length, color: COLORS.purple },
                ].map(item => (
                  <div key={item.label} style={{ textAlign: 'center', padding: '12px 8px', backgroundColor: COLORS.bg, borderRadius: 8 }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: item.color }}>{item.value}</div>
                    <div style={{ fontSize: 12, color: COLORS.muted }}>{item.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16, padding: '12px 0', borderTop: `1px solid ${COLORS.border}`, fontSize: 12, color: COLORS.muted }}>
                <div style={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                  ⚠️ All percentages represent provisional estimates from {skillStates.reduce((sum, s) => sum + s.evidenceCount, 0)} total evidence points.
                  Calibration status: <strong>provisional</strong>. Not clinically validated.
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <Link href="/consent" style={{ color: COLORS.muted, fontSize: 12, textDecoration: 'none' }}>
                🔒 Manage your data & consent →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
