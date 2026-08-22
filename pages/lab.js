// pages/lab.js
// Practical Networking Troubleshooting Lab
// PC1 → Switch → Router → PC2 (with injected fault)
// Records action sequence → EvidenceCollector → LearnerState update

import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';

const COLORS = {
  teal: '#17919e', navy: '#0d3d4e', bg: '#0a1628',
  surface: '#0f2340', border: '#1e3a5f', text: '#e2e8f0',
  muted: '#64748b', green: '#22c55e', red: '#ef4444',
  amber: '#f59e0b', tealLight: '#17919e33',
};

// ── Lab Scenario ─────────────────────────────────────────────
// Fault: Router R1 has incorrect static route (wrong next-hop)
// making PC1 → PC2 unreachable at Layer 3.

const SCENARIO = {
  id: 'lab_static_route_fault',
  title: 'Network Troubleshooting Lab',
  description: 'PC1 cannot reach PC2. Diagnose and fix the issue.',
  topology: 'PC1 (192.168.1.10/24) → SW1 → R1 → SW2 → PC2 (192.168.2.10/24)',
  faultDescription: 'Hidden: R1 has a misconfigured static route to 192.168.2.0/24',
};

const COMMANDS = {
  'ping 192.168.1.1': {
    output: 'Reply from 192.168.1.1: bytes=32 time=1ms TTL=255\nSuccess rate is 100%',
    hint: 'Gateway reachable — Layer 1/2/3 local OK',
    relevantToFault: false,
  },
  'ping 192.168.2.10': {
    output: 'Request timeout for icmp_seq 0\nRequest timeout for icmp_seq 1\nSuccess rate is 0%',
    hint: 'Remote host unreachable — routing problem suspected',
    relevantToFault: true,
  },
  'show ip route': {
    output: `Gateway of last resort is not set
S    192.168.1.0/24 [1/0] via 10.0.0.1
S    192.168.2.0/24 [1/0] via 10.0.0.99  ← WRONG next-hop (should be 10.0.0.2)
C    10.0.0.0/30 is directly connected, Gi0/0`,
    hint: 'Route to 192.168.2.0/24 has wrong next-hop!',
    relevantToFault: true,
  },
  'show interface gi0/0': {
    output: 'GigabitEthernet0/0 is up, line protocol is up\n  Internet address is 10.0.0.1/30\n  MTU 1500, BW 1000000 Kbit',
    hint: 'Interface is up — not a physical layer issue',
    relevantToFault: false,
  },
  'show arp': {
    output: 'Protocol  Address         Age  Hardware Addr    Type   Interface\nInternet  10.0.0.1        -    aabb.cc00.0100  ARPA   Gi0/0\nInternet  10.0.0.2        12   aabb.cc00.0200  ARPA   Gi0/0',
    hint: 'ARP table is correct — MAC resolution works',
    relevantToFault: false,
  },
  'fix route 192.168.2.0/24 via 10.0.0.2': {
    output: 'Static route updated: 192.168.2.0/24 via 10.0.0.2\n[Configuration saved]',
    hint: 'Route corrected!',
    relevantToFault: true,
    fixesIssue: true,
  },
  'ping 192.168.2.10 verify': {
    output: 'Reply from 192.168.2.10: bytes=32 time=3ms TTL=126\nReply from 192.168.2.10: bytes=32 time=2ms TTL=126\nSuccess rate is 100% ✓',
    hint: 'End-to-end connectivity confirmed!',
    relevantToFault: true,
    isVerification: true,
  },
  'help': {
    output: `Available commands:
  ping <host>           - Test connectivity
  show ip route         - View routing table
  show interface <if>   - Check interface status
  show arp              - View ARP table
  fix route <net> via <gw>  - Correct a route
  ping <host> verify    - Verify fix end-to-end`,
    hint: '',
    relevantToFault: false,
  }
};

export default function LabPage() {
  const [terminal, setTerminal] = useState([
    { type: 'system', text: `=== NETWORK TROUBLESHOOTING LAB ===` },
    { type: 'system', text: `Scenario: ${SCENARIO.description}` },
    { type: 'system', text: `Topology: ${SCENARIO.topology}` },
    { type: 'system', text: `Type 'help' for available commands.\n` },
  ]);
  const [input, setInput] = useState('');
  const [actions, setActions] = useState([]);
  const [solved, setSolved] = useState(false);
  const [verified, setVerified] = useState(false);
  const [startTime] = useState(Date.now());
  const [showHint, setShowHint] = useState(false);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminal]);

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const now = Date.now();
    const action = {
      command: trimmed,
      timestamp: new Date(),
      timeFromStart: now - startTime,
    };

    setActions(prev => [...prev, action]);

    const lines = [{ type: 'input', text: `R1# ${trimmed}` }];

    const response = COMMANDS[trimmed];
    if (response) {
      lines.push({ type: 'output', text: response.output });
      if (response.fixesIssue) setSolved(true);
      if (response.isVerification) setVerified(true);
    } else {
      lines.push({ type: 'error', text: `Command not recognized: ${trimmed}. Type 'help' for options.` });
    }

    setTerminal(prev => [...prev, ...lines]);

    // Auto-submit evidence when solved + verified
    if (response?.fixesIssue || response?.isVerification) {
      const isComplete = response.isVerification || verified;
      if (isComplete) {
        submitLabEvidence(actions.concat(action));
      }
    }
  };

  const submitLabEvidence = async (allActions) => {
    try {
      await fetch('/api/lab/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo_alex_001',
          scenarioId: SCENARIO.id,
          actions: allActions,
          solved: true,
          verified: true,
        }),
      });
    } catch (e) {
      console.error('Lab evidence submission failed:', e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  const systematicApproach = actions.some(a => a.command.includes('show ip route'));
  const didVerify = actions.some(a => a.command.includes('verify'));
  const randomTrials = actions.filter(a => !COMMANDS[a.command]).length;

  return (
    <div style={{ fontFamily: "'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace", backgroundColor: '#050d1a', minHeight: '100vh', color: COLORS.text }}>
      <Head>
        <title>Network Troubleshooting Lab — SmartLab</title>
      </Head>

      {/* Header */}
      <div style={{ backgroundColor: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`, padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ color: COLORS.teal, fontWeight: 700, fontSize: 16 }}>SmartLab</span>
          <span style={{ color: COLORS.muted, marginLeft: 12 }}>/ Network Troubleshooting Lab</span>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
          <span style={{ color: solved ? COLORS.green : COLORS.muted }}>
            {solved ? '✓ Issue Found' : '● Investigating'}
          </span>
          <span style={{ color: verified ? COLORS.green : COLORS.muted }}>
            {verified ? '✓ Verified' : '○ Not verified'}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', height: 'calc(100vh - 57px)' }}>

        {/* Terminal */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: 24, gap: 0 }}>
          {/* Topology diagram */}
          <div style={{ backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: '14px 20px', marginBottom: 16, fontSize: 13 }}>
            <div style={{ color: COLORS.muted, marginBottom: 8, fontSize: 11, letterSpacing: 1 }}>NETWORK TOPOLOGY</div>
            <div style={{ fontFamily: 'monospace', color: COLORS.text, lineHeight: 1.8 }}>
              PC1 (192.168.1.10/24) <span style={{ color: COLORS.teal }}>─── SW1 ─── R1 ─── SW2 ───</span> PC2 (192.168.2.10/24)<br />
              <span style={{ color: COLORS.muted, fontSize: 11 }}>GW: 192.168.1.1{' '.repeat(16)}GW: 192.168.2.1</span>
            </div>
          </div>

          {/* Terminal output */}
          <div ref={terminalRef} style={{
            flex: 1, backgroundColor: COLORS.bg, border: `1px solid ${COLORS.border}`,
            borderRadius: 10, padding: 20, overflowY: 'auto', fontSize: 13, lineHeight: 1.7,
          }}>
            {terminal.map((line, i) => (
              <div key={i} style={{
                color: line.type === 'input' ? COLORS.teal
                  : line.type === 'error' ? COLORS.red
                  : line.type === 'system' ? COLORS.amber
                  : COLORS.text,
                whiteSpace: 'pre-wrap', marginBottom: 2,
              }}>
                {line.text}
              </div>
            ))}
            {verified && (
              <div style={{ marginTop: 16, padding: 16, backgroundColor: '#0d3322', border: `1px solid ${COLORS.green}`, borderRadius: 8, color: COLORS.green }}>
                ✓ Lab Complete! End-to-end connectivity restored.<br />
                <span style={{ fontSize: 12, color: 'rgba(34,197,94,0.7)' }}>
                  Your actions are being analyzed to update your learning profile.
                </span>
              </div>
            )}
          </div>

          {/* Command input */}
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: '10px 16px' }}>
            <span style={{ color: COLORS.teal, fontWeight: 700 }}>R1#</span>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command and press Enter..."
              disabled={verified}
              style={{
                flex: 1, background: 'none', border: 'none', color: COLORS.text,
                fontFamily: 'inherit', fontSize: 14, outline: 'none',
              }}
              autoFocus
            />
          </div>
        </div>

        {/* Side Panel — Process Indicators */}
        <div style={{ backgroundColor: COLORS.surface, borderLeft: `1px solid ${COLORS.border}`, padding: 20, overflowY: 'auto' }}>
          <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: COLORS.muted, marginBottom: 16 }}>
            Learning Analytics
          </div>

          {/* Actions taken */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 10 }}>Actions Taken ({actions.length})</div>
            {actions.map((a, i) => {
              const resp = COMMANDS[a.command];
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: resp?.relevantToFault ? COLORS.green : COLORS.muted }}>
                    {resp?.relevantToFault ? '●' : '○'}
                  </span>
                  <span style={{ color: COLORS.text }}>{a.command}</span>
                </div>
              );
            })}
          </div>

          {/* Process indicators */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 12 }}>Process Indicators</div>
            {[
              { label: 'Systematic Approach', value: systematicApproach, desc: 'Used routing table analysis' },
              { label: 'Fix Verification', value: didVerify, desc: 'Tested end-to-end after fix' },
              { label: 'Random Trials', value: randomTrials > 2 ? 'Elevated' : 'Low', isText: true },
            ].map(ind => (
              <div key={ind.label} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: COLORS.muted }}>{ind.label}</span>
                  {ind.isText ? (
                    <span style={{ color: ind.value === 'Elevated' ? COLORS.amber : COLORS.green, fontWeight: 600 }}>{ind.value}</span>
                  ) : (
                    <span style={{ color: ind.value ? COLORS.green : COLORS.muted }}>
                      {ind.value ? '✓ Yes' : '○ No'}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>{ind.desc}</div>
              </div>
            ))}
          </div>

          {/* Hint */}
          <div>
            <button
              onClick={() => setShowHint(!showHint)}
              style={{ width: '100%', backgroundColor: COLORS.tealLight, border: `1px solid ${COLORS.teal}`, color: COLORS.teal, padding: '10px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}
            >
              {showHint ? 'Hide hint' : '💡 Show hint'}
            </button>
            {showHint && (
              <div style={{ marginTop: 12, padding: 12, backgroundColor: '#1a2438', borderRadius: 8, fontSize: 13, color: COLORS.muted, lineHeight: 1.6 }}>
                Start by checking if the gateway is reachable, then look at the routing table carefully. Check what next-hop is being used.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
