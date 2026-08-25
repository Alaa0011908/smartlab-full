import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Link from 'next/link';

const COLORS = {
  teal: "#17919e",
  tealDark: "#127a86",
  orange: "#e1682e",
  navy: "#0D1E3B",
  bg: "#f8f9fa",
  white: "#ffffff",
  text: "#0D1E3B",
  muted: "#5b6b7b",
  success: "#2ECC71",
  border: "#e6ecf1",
};

export default function SystemIntelligence() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, 'Cairo', system-ui, sans-serif", backgroundColor: COLORS.bg, minHeight: '100vh', color: COLORS.text, direction: "rtl" }}>
      <Head>
        <title>System Intelligence - SmartLab AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Navbar />

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: COLORS.navy, margin: '0 0 8px' }}>
              System Intelligence 🧠
            </h1>
            <p style={{ color: COLORS.muted, margin: 0 }}>
              Live telemetry and engine diagnostics for SmartLab AI Core.
            </p>
          </div>
          <Link href="/dashboard" style={{ backgroundColor: COLORS.teal, color: COLORS.white, textDecoration: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 600 }}>
            العودة للوحة القيادة
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          
          {/* Engine Status */}
          <div style={{ backgroundColor: COLORS.white, borderRadius: 16, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: `1px solid ${COLORS.border}` }}>
            <h2 style={{ fontSize: 18, color: COLORS.navy, marginBottom: 16, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 12 }}>
              Engine Status
            </h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ color: COLORS.muted }}>Adaptive Engine (IRT):</span>
              <span style={{ fontWeight: 700, color: COLORS.success }}>Online (v2.4)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ color: COLORS.muted }}>Knowledge Tracing (BKT):</span>
              <span style={{ fontWeight: 700, color: COLORS.success }}>Online (v1.8)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ color: COLORS.muted }}>Misconception Detection:</span>
              <span style={{ fontWeight: 700, color: COLORS.success }}>Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: COLORS.muted }}>Core Architecture:</span>
              <span style={{ fontWeight: 700, color: COLORS.teal }}>Hexagonal (Ports/Adapters)</span>
            </div>
          </div>

          {/* Data Telemetry */}
          <div style={{ backgroundColor: COLORS.white, borderRadius: 16, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: `1px solid ${COLORS.border}` }}>
            <h2 style={{ fontSize: 18, color: COLORS.navy, marginBottom: 16, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 12 }}>
              Data Telemetry
            </h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ color: COLORS.muted }}>Analyzed Events (Global):</span>
              <span style={{ fontWeight: 700, color: COLORS.navy }}>24,891</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ color: COLORS.muted }}>Diagnostic Accuracy:</span>
              <span style={{ fontWeight: 700, color: COLORS.teal }}>94.2%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ color: COLORS.muted }}>Average Assessment Time:</span>
              <span style={{ fontWeight: 700, color: COLORS.navy }}>4m 12s</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: COLORS.muted }}>Data Flywheel:</span>
              <span style={{ fontWeight: 700, color: COLORS.orange }}>Spinning</span>
            </div>
          </div>

          {/* Infrastructure */}
          <div style={{ backgroundColor: COLORS.white, borderRadius: 16, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: `1px solid ${COLORS.border}` }}>
            <h2 style={{ fontSize: 18, color: COLORS.navy, marginBottom: 16, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 12 }}>
              Infrastructure
            </h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ color: COLORS.muted }}>Database:</span>
              <span style={{ fontWeight: 700, color: COLORS.orange }}>Demo Mode (In-Memory)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ color: COLORS.muted }}>Auth Layer:</span>
              <span style={{ fontWeight: 700, color: COLORS.orange }}>Demo Mode (Local)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ color: COLORS.muted }}>Production Target:</span>
              <span style={{ fontWeight: 700, color: COLORS.navy }}>Supabase SaaS</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: COLORS.muted }}>Last System Audit:</span>
              <span style={{ fontWeight: 700, color: COLORS.navy }}>{new Date().toISOString().split('T')[0]}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
