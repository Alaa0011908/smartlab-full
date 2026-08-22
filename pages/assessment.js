// pages/assessment.js
// Adaptive MCQ Assessment Page
// Features: adaptive item selection, confidence input, "Why this question?" panel

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const COLORS = {
  teal: '#17919e', tealDark: '#127a86', navy: '#0d3d4e',
  bg: '#eef4f8', surface: '#ffffff', text: '#0d1e3b', muted: '#5b6b7b',
  border: '#d6e0e8', green: '#22c55e', amber: '#f59e0b', red: '#ef4444',
};

const CONFIDENCE_LEVELS = [
  { value: 0.2, label: 'Not sure', color: COLORS.red },
  { value: 0.5, label: 'Somewhat sure', color: COLORS.amber },
  { value: 0.8, label: 'Very sure', color: COLORS.green },
];

function ConfidenceSelector({ selected, onChange }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <p style={{ color: COLORS.muted, fontSize: 14, marginBottom: 10 }}>How confident are you in your answer?</p>
      <div style={{ display: 'flex', gap: 10 }}>
        {CONFIDENCE_LEVELS.map(level => (
          <button
            key={level.value}
            onClick={() => onChange(level.value)}
            style={{
              flex: 1, padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
              border: selected === level.value ? `2px solid ${level.color}` : `1px solid ${COLORS.border}`,
              backgroundColor: selected === level.value ? `${level.color}18` : COLORS.surface,
              color: selected === level.value ? level.color : COLORS.muted,
              transition: 'all 0.15s',
            }}
          >
            {level.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AssessmentPage() {
  const [phase, setPhase] = useState('loading'); // loading | question | result | complete
  const [item, setItem] = useState(null);
  const [selection, setSelection] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [result, setResult] = useState(null);
  const [showWhy, setShowWhy] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [seenItems, setSeenItems] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [sessionId] = useState(`session_${Date.now()}`);

  const loadNextItem = async () => {
    setPhase('loading');
    setSelectedOption(null);
    setConfidence(null);
    setResult(null);
    setShowWhy(false);

    const exclude = seenItems.join(',');
    try {
      const res = await fetch(`/api/assessment/next-item?userId=demo_alex_001&objective=diagnostic${exclude ? `&exclude=${exclude}` : ''}`);
      const data = await res.json();
      setItem(data.item);
      setSelection(data.selection);
      setStartTime(Date.now());
      setPhase('question');
    } catch (e) {
      setPhase('error');
    }
  };

  const submitAnswer = async () => {
    if (!selectedOption || !confidence || !item) return;

    const responseTimeMs = Date.now() - startTime;
    const correctAnswer = item.correctAnswer;
    const isCorrect = selectedOption === correctAnswer;

    try {
      const res = await fetch('/api/assessment/response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo_alex_001',
          itemId: item.id,
          skillId: selection.targetedSkills[0],
          selectedOptionId: selectedOption,
          isCorrect,
          responseTimeMs,
          userReportedConfidence: confidence,
          sessionId,
        }),
      });
      const data = await res.json();
      setResult({ ...data, isCorrect, correctAnswer });
      setSeenItems(prev => [...prev, item.id]);
      setPhase('result');
    } catch (e) {
      console.error('Submit failed:', e);
    }
  };

  const nextQuestion = () => {
    if (questionNumber >= 10) {
      setPhase('complete');
    } else {
      setQuestionNumber(n => n + 1);
      loadNextItem();
    }
  };

  useEffect(() => { loadNextItem(); }, []);

  if (phase === 'loading') return (
    <div style={{ minHeight: '100vh', backgroundColor: COLORS.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', system-ui" }}>
      <div style={{ textAlign: 'center', color: COLORS.muted }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
        <div style={{ fontWeight: 600 }}>Selecting the best question for you...</div>
      </div>
    </div>
  );

  if (phase === 'complete') return (
    <div style={{ minHeight: '100vh', backgroundColor: COLORS.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', system-ui" }}>
      <div style={{ textAlign: 'center', maxWidth: 500, padding: 40 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>✓</div>
        <h2 style={{ color: COLORS.navy, fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Assessment Complete</h2>
        <p style={{ color: COLORS.muted, marginBottom: 32 }}>Your learning profile has been updated based on your responses.</p>
        <Link href="/intelligence" style={{ backgroundColor: COLORS.teal, color: '#fff', padding: '14px 28px', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 16 }}>
          View My Learning Profile →
        </Link>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', system-ui, sans-serif", backgroundColor: COLORS.bg, minHeight: '100vh', color: COLORS.text }}>
      <Head>
        <title>Adaptive Assessment — SmartLab</title>
      </Head>

      {/* Header */}
      <div style={{ backgroundColor: COLORS.navy, color: '#fff', padding: '14px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 800, fontSize: 18 }}>SmartLab</span>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', fontSize: 14 }}>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>Adaptive Assessment</span>
          <span style={{ color: COLORS.teal, fontWeight: 700 }}>Question {questionNumber} / 10</span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ backgroundColor: COLORS.navy, height: 4 }}>
        <div style={{ width: `${(questionNumber / 10) * 100}%`, backgroundColor: COLORS.teal, height: 4, transition: 'width 0.4s' }} />
      </div>

      <div style={{ maxWidth: 760, margin: '48px auto', padding: '0 24px' }}>
        {item && phase !== 'loading' && (
          <div style={{ backgroundColor: COLORS.surface, borderRadius: 16, padding: 36, boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>

            {/* Why this question button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
              <button
                onClick={() => setShowWhy(!showWhy)}
                style={{ background: 'none', border: `1px solid ${COLORS.teal}`, color: COLORS.teal, padding: '6px 14px', borderRadius: 20, cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', fontWeight: 600 }}
              >
                {showWhy ? 'Hide' : 'Why this question?'}
              </button>
            </div>

            {/* Why panel */}
            {showWhy && selection && (
              <div style={{ backgroundColor: '#f0f9fa', border: `1px solid ${COLORS.teal}`, borderRadius: 10, padding: 16, marginBottom: 24, fontSize: 13 }}>
                <div style={{ fontWeight: 700, color: COLORS.teal, marginBottom: 8 }}>Why am I seeing this question?</div>
                <p style={{ color: COLORS.text, marginBottom: 0, lineHeight: 1.7 }}>
                  {selection.reason?.en}
                </p>
                <div style={{ marginTop: 8, color: COLORS.muted, fontSize: 12 }}>
                  Expected information gain: {selection.expectedInformationGain?.toFixed(2)}
                  {' · '}Targeting: {selection.targetedSkills?.join(', ')}
                </div>
              </div>
            )}

            {/* Question */}
            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: COLORS.muted, marginBottom: 12 }}>
              QUESTION {questionNumber}
            </div>
            <p style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.6, color: COLORS.text, marginBottom: 28, whiteSpace: 'pre-line' }}>
              {item.text?.en}
            </p>

            {/* Options */}
            {!result && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {item.options?.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedOption(opt.id)}
                    style={{
                      textAlign: 'left', padding: '14px 18px', borderRadius: 10, cursor: 'pointer',
                      fontFamily: 'inherit', fontSize: 15, fontWeight: selectedOption === opt.id ? 600 : 400,
                      border: selectedOption === opt.id ? `2px solid ${COLORS.teal}` : `1px solid ${COLORS.border}`,
                      backgroundColor: selectedOption === opt.id ? '#f0f9fa' : COLORS.surface,
                      color: selectedOption === opt.id ? COLORS.teal : COLORS.text,
                      transition: 'all 0.12s',
                    }}
                  >
                    <span style={{ marginRight: 12, fontWeight: 700, color: COLORS.muted }}>
                      {opt.id.toUpperCase()}.
                    </span>
                    {opt.text?.en}
                  </button>
                ))}
              </div>
            )}

            {/* Result feedback */}
            {result && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {item.options?.map(opt => {
                  const isSelected = opt.id === selectedOption;
                  const isCorrect = opt.id === result.correctAnswer;
                  let bg = COLORS.surface, border = `1px solid ${COLORS.border}`, color = COLORS.text;
                  if (isCorrect) { bg = '#f0fdf4'; border = `2px solid ${COLORS.green}`; color = COLORS.green; }
                  else if (isSelected && !isCorrect) { bg = '#fff5f5'; border = `2px solid ${COLORS.red}`; color = COLORS.red; }
                  return (
                    <div key={opt.id} style={{ padding: '14px 18px', borderRadius: 10, border, backgroundColor: bg, color, fontSize: 15 }}>
                      <span style={{ marginRight: 12, fontWeight: 700 }}>{opt.id.toUpperCase()}.</span>
                      {opt.text?.en}
                      {isCorrect && ' ✓'}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Result message */}
            {result && (
              <div style={{ backgroundColor: result.isCorrect ? '#f0fdf4' : '#fff5f5', border: `1px solid ${result.isCorrect ? COLORS.green : COLORS.red}`, borderRadius: 10, padding: 16, marginBottom: 20 }}>
                <div style={{ fontWeight: 700, color: result.isCorrect ? COLORS.green : COLORS.red, marginBottom: 8 }}>
                  {result.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </div>
                <p style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  {item.explanation?.en}
                </p>
                {result.measurement && (
                  <div style={{ marginTop: 12, padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: 6, fontSize: 12, color: COLORS.muted }}>
                    Mastery updated: {Math.round(result.measurement.masteryBefore * 100)}% → {Math.round(result.measurement.masteryAfter * 100)}%
                    {' | '}Model: {result.measurement.model} ({result.measurement.calibrationStatus})
                  </div>
                )}
              </div>
            )}

            {/* Confidence selector */}
            {!result && <ConfidenceSelector selected={confidence} onChange={setConfidence} />}

            {/* Action buttons */}
            {!result ? (
              <button
                onClick={submitAnswer}
                disabled={!selectedOption || !confidence}
                style={{
                  width: '100%', padding: '14px', borderRadius: 10, border: 'none',
                  backgroundColor: selectedOption && confidence ? COLORS.teal : COLORS.border,
                  color: '#fff', fontWeight: 700, fontSize: 16, cursor: selectedOption && confidence ? 'pointer' : 'not-allowed',
                  fontFamily: 'inherit', transition: 'background 0.15s',
                }}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                style={{ width: '100%', padding: '14px', borderRadius: 10, border: 'none', backgroundColor: COLORS.teal, color: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                {questionNumber >= 10 ? 'View Results' : `Next Question →`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
