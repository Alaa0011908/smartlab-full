# Demo Script — SfeerTech Presentation
## Adaptive Educational Intelligence Platform

---

## Setup (Before Demo)

1. `npm ci` — restore clean dependencies (Requires Network).
2. `npm run dev` — ensure dev server running on localhost:3000.
3. Open browser to `http://localhost:3000/intelligence`.
4. Prepare tabs for `/assessment` and `/lab`.

---

## Opening Statement (30 seconds)

> "Most educational platforms say: here's the course, start from lesson 1.
>
> We ask a different question:
>
> **What does this learner actually know right now — and what is the single most effective thing they should do next?**
>
> Let me show you this with a real learner."

---

## The 12-Step Adaptive Journey

### 1. Learner chooses goal & 2. System diagnoses
Navigate to `/intelligence` — Alex's profile is live.
> "Alex has chosen a Networking goal. The system has collected initial evidence. Notice it separates skills into Strong, Developing, Priority Gaps, and Uncertain."

### 3. System identifies specific gap & 4. System explains evidence
**Point to Coach panel and click 'Why am I seeing this?':**
> "The system identified a Priority Gap in subnetting. The evidence shows 4 incorrect answers and a verified misconception around CIDR boundaries. This is not a black box; every recommendation is traceable to evidence."

### 5. System selects personalized next action
> "Because of this specific gap, the system selects a highly-targeted 8-minute Troubleshooting Lab, bypassing generic lessons."

### 6. Learner interacts with practical networking task
Navigate to `/lab`.
> "This is where it gets interesting. The lab records more than just a final correct or incorrect outcome. It records the process."
*(Type `ping 192.168.2.10` → fails, then `show ip route`)*

### 7. System analyzes observable process
> "Notice the wrong next-hop. The system just recorded that Alex used routing table analysis. That is a process indicator for problem decomposition."
*(Type `fix route...` and `ping verify`)*

### 8. Coach explains the result
> "Alex verified the fix. Most engineers forget to verify end-to-end. The system records 'fix verification = YES' and the Coach acknowledges this specific process success."

### 9. Learner receives targeted intervention & 10. Reassessment
Navigate to `/assessment`.
> "Now the system reassesses. Watch what happens when Alex answers a question."
*(Submit a response with high confidence)*
> "The question was selected adaptively because information gain was highest here. The system captures the answer and the confidence level."

### 11. Updated intelligence profile & 12. Visible evidence of improvement
Navigate back to `/intelligence`.
> "The profile is live. Troubleshooting and verification skills have updated. The gap is closing based purely on mathematical evidence."

---

## The Architecture (1 minute)

> "Let me be transparent about what's happening technically.
>
> The platform continuously builds an evidence-based model of the learner's current knowledge and learning progress, then adapts what happens next.
>
> The LLM — we use Deepseek — acts strictly as a **Personal Learning Coach that understands the learner's current learning state, goals, progress, and preferred coaching style—under explicit user consent.** It formats explanations. That's it.
>
> It cannot change mastery scores. It cannot diagnose psychology. Every number you see comes from a Bayesian measurement engine — a Provisional 1PL model — and an auxiliary BKT model.
>
> We label everything 'provisional' until we have real calibration data. That's scientific honesty. The architecture is: Evidence → Measurement → Learner State → Recommendation → Coach."

---

## Closing (30 seconds)

> "This is not a quiz app with an AI chatbot added to it.
>
> This is an adaptive intelligence layer built into an existing educational product — preserving its identity while making it dramatically smarter."

---

## Fallback: If something breaks
- If APIs are slow: "The system is running on a dev server — in production this would be sub-100ms. Let me show you the code directly."
- If network fails (`npm` blocked): "Due to environment restrictions, let's walk through the exact backend traces and logic that drive this UI."
- If coach shows fallback text: "AI is unavailable — notice the system gracefully degraded to deterministic coaching. This is by design."

---

*Prepared for SfeerTech — 2026-08-22*
