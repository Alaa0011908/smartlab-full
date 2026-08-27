// components/CalibrationDashboard.js
// ============================================================
// Dashboard for researchers to view calibration data
// Accessible only in development or with admin role
// ============================================================

import React, { useState, useEffect } from 'react';
import calibrationCollector from '../lib/analytics/calibrationCollector';

const COLORS = {
  teal: "#17919e",
  navy: "#0D1E3B",
  white: "#ffffff",
  bg: "#eef4f8",
  border: "#d6e0e8",
  muted: "#5b6b7b",
  green: "#22c55e",
  red: "#ef4444",
};

export default function CalibrationDashboard() {
  const [summary, setSummary] = useState(null);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    const data = calibrationCollector.getSummary();
    setSummary(data);
  }, []);

  const exportCSV = () => {
    const csv = calibrationCollector.exportResponsesAsCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smartlab_responses_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    calibrationCollector.downloadData();
  };

  const clearData = () => {
    if (confirm('هل أنت متأكد من حذف جميع البيانات؟')) {
      calibrationCollector.clearData();
      setSummary(calibrationCollector.getSummary());
    }
  };

  if (!summary) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        zIndex: 9999,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
        maxWidth: 320,
        fontFamily: "'Segoe UI', sans-serif",
        direction: 'rtl',
        border: `2px solid ${COLORS.teal}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <strong style={{ color: COLORS.navy, fontSize: 14 }}>
          🔬 بيانات المعايرة
        </strong>
        <button
          onClick={() => setShowData(!showData)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
          }}
        >
          {showData ? '▼' : '▲'}
        </button>
      </div>

      {showData && (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
              marginBottom: 12,
              fontSize: 12,
            }}
          >
            <StatBox label="الجلسات" value={summary.totalSessions} />
            <StatBox label="الاستجابات" value={summary.totalResponses} />
            <StatBox label="المعدل" value={`${summary.averageScore.toFixed(1)}%`} />
            <StatBox
              label="متوسط الوقت"
              value={`${(summary.averageResponseTime / 1000).toFixed(1)}s`}
            />
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <ActionButton label="تصدير CSV" onClick={exportCSV} />
            <ActionButton label="تصدير JSON" onClick={exportJSON} />
            <ActionButton label="مسح" onClick={exportJSON} danger />
          </div>
        </>
      )}
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div
      style={{
        padding: 8,
        backgroundColor: '#f8f9fa',
        borderRadius: 6,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, color: '#17919e' }}>{value}</div>
      <div style={{ fontSize: 10, color: '#5b6b7b' }}>{label}</div>
    </div>
  );
}

function ActionButton({ label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 12px',
        fontSize: 11,
        fontWeight: 600,
        backgroundColor: danger ? '#ef4444' : '#17919e',
        color: 'white',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}
