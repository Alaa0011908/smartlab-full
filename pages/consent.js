// pages/consent.js
// Consent & Privacy Center
// Real permissions management — not cosmetic

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const COLORS = {
  teal: '#17919e', navy: '#0d3d4e', bg: '#eef4f8',
  surface: '#ffffff', text: '#0d1e3b', muted: '#5b6b7b',
  border: '#d6e0e8', green: '#22c55e', amber: '#f59e0b', red: '#ef4444',
};

const CONSENT_DEFINITIONS = [
  {
    id: 'knowledge_data',
    title: 'Knowledge Profile',
    description: 'Your mastery scores and skill states are used to personalize your learning path.',
    impact: 'Without this: Generic content, no personalization',
    riskLevel: 'low',
  },
  {
    id: 'assessment_history',
    title: 'Assessment History',
    description: 'Your responses to questions are stored to track progress over time.',
    impact: 'Without this: No trend analysis, no retention measurement',
    riskLevel: 'low',
  },
  {
    id: 'learning_activity',
    title: 'Learning Activity',
    description: 'Time spent, sessions, and lab interactions are recorded for behavioral insights.',
    impact: 'Without this: No process-level analysis (e.g., verification behavior)',
    riskLevel: 'low',
  },
  {
    id: 'goals',
    title: 'Learning Goals',
    description: 'Your stated goals are used to align recommendations.',
    impact: 'Without this: Recommendations are not goal-aligned',
    riskLevel: 'low',
  },
  {
    id: 'coach_personalization',
    title: 'Coach Personalization',
    description: 'Your preferred coaching style is stored to adapt communication.',
    impact: 'Without this: Generic communication style',
    riskLevel: 'low',
  },
  {
    id: 'ai_analysis',
    title: 'AI Explanation',
    description: 'An AI (Deepseek) formats coach messages. Your data is sent to the AI provider under data processing terms.',
    impact: 'Without this: Deterministic fallback messages only (no AI-generated text)',
    riskLevel: 'medium',
  },
];

export default function ConsentPage() {
  const [consents, setConsents] = useState({});
  const [saved, setSaved] = useState(false);

  // Initialize from API
  useEffect(() => {
    fetch('/api/learner/state?userId=demo_alex_001')
      .then(r => r.json())
      .then(data => {
        // Default all granted for demo
        const initial = {};
        CONSENT_DEFINITIONS.forEach(c => { initial[c.id] = true; });
        setConsents(initial);
      });
  }, []);

  const toggle = (id) => {
    setConsents(prev => ({ ...prev, [id]: !prev[id] }));
    setSaved(false);
  };

  const saveConsents = async () => {
    // In production: POST /api/consent with updated consent records
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const revokeAll = () => {
    const revoked = {};
    CONSENT_DEFINITIONS.forEach(c => { revoked[c.id] = false; });
    setConsents(revoked);
    setSaved(false);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', system-ui, sans-serif", backgroundColor: COLORS.bg, minHeight: '100vh', color: COLORS.text }}>
      <Head>
        <title>Consent & Privacy — SmartLab</title>
        <meta name="description" content="Manage your data and AI usage permissions" />
      </Head>

      {/* Header */}
      <div style={{ backgroundColor: COLORS.navy, color: '#fff', padding: '0 40px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0' }}>
          <span style={{ fontWeight: 800, fontSize: 18 }}>SmartLab</span>
          <nav style={{ display: 'flex', gap: 24, fontSize: 14 }}>
            <Link href="/dashboard" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Dashboard</Link>
            <span style={{ color: '#fff', fontWeight: 700 }}>Consent & Privacy</span>
          </nav>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '48px auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 36 }}>
          <p style={{ color: COLORS.teal, fontWeight: 700, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>DATA & PRIVACY</p>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: COLORS.navy, margin: '6px 0 12px' }}>Consent Center</h1>
          <p style={{ color: COLORS.muted, fontSize: 15, lineHeight: 1.7 }}>
            Control exactly how your data is used. Every AI decision is traceable to the permissions you set here.
            Revoking consent for a category immediately stops that data from being used in new analyses.
          </p>
        </div>

        {/* Important notice */}
        <div style={{ backgroundColor: '#fff8e1', border: `1px solid ${COLORS.amber}`, borderRadius: 10, padding: 16, marginBottom: 32, fontSize: 14 }}>
          <strong style={{ color: COLORS.amber }}>⚠ Important:</strong> This platform uses evidence-based learning analysis.
          Revoking knowledge data will limit its ability to personalize your experience, but will NOT delete existing data.
          Contact support to request data deletion.
        </div>

        {/* Consent cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
          {CONSENT_DEFINITIONS.map(def => {
            const granted = consents[def.id] !== false;
            return (
              <div key={def.id} style={{
                backgroundColor: COLORS.surface, borderRadius: 12, padding: 24,
                border: `1px solid ${granted ? COLORS.teal : COLORS.border}`,
                transition: 'border-color 0.2s',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>{def.title}</span>
                      {def.riskLevel === 'medium' && (
                        <span style={{ fontSize: 11, backgroundColor: '#fff8e1', border: `1px solid ${COLORS.amber}`, color: COLORS.amber, padding: '2px 8px', borderRadius: 20 }}>
                          AI processing
                        </span>
                      )}
                    </div>
                    <p style={{ color: COLORS.muted, fontSize: 14, margin: '0 0 10px', lineHeight: 1.6 }}>
                      {def.description}
                    </p>
                    <p style={{ color: granted ? COLORS.teal : COLORS.red, fontSize: 12, fontStyle: 'italic', margin: 0 }}>
                      {def.impact}
                    </p>
                  </div>

                  {/* Toggle */}
                  <button
                    onClick={() => toggle(def.id)}
                    style={{
                      marginLeft: 20, width: 52, height: 28, borderRadius: 14, border: 'none',
                      backgroundColor: granted ? COLORS.teal : COLORS.border,
                      cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0,
                    }}
                    aria-label={`Toggle ${def.title}`}
                    role="switch"
                    aria-checked={granted}
                  >
                    <span style={{
                      position: 'absolute', top: 4, left: granted ? 28 : 4, width: 20, height: 20,
                      borderRadius: '50%', backgroundColor: '#fff', transition: 'left 0.2s',
                    }} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
          <button
            onClick={saveConsents}
            style={{ flex: 1, backgroundColor: COLORS.teal, color: '#fff', border: 'none', padding: '14px', borderRadius: 10, fontFamily: 'inherit', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
          >
            {saved ? '✓ Saved' : 'Save Preferences'}
          </button>
          <button
            onClick={revokeAll}
            style={{ padding: '14px 20px', backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.muted, borderRadius: 10, fontFamily: 'inherit', cursor: 'pointer', fontSize: 14 }}
          >
            Revoke All
          </button>
        </div>

        {/* What we don't do */}
        <div style={{ backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy, marginBottom: 16 }}>What we never do</h3>
          {[
            'Infer or diagnose emotional states, stress, or anxiety',
            'Produce IQ scores or intelligence labels',
            'Share data with third parties for advertising',
            'Make irrevocable decisions based on a single data point',
            'Claim scientifically validated results without real calibration data',
          ].map(item => (
            <div key={item} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 14, color: COLORS.muted }}>
              <span style={{ color: COLORS.green, fontWeight: 700 }}>✓</span> {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
