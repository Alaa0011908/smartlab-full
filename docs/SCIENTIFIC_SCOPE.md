# Scientific Scope — Adaptive Educational Intelligence Platform

> This document classifies every intelligence component by its scientific status.
> We never use scientific terminology as marketing decoration.

---

## Classification Key

| Status | Meaning |
|--------|---------|
| **Established** | Well-validated in published literature; implementation is standard |
| **Provisional** | Mathematically implemented but not yet calibrated on real learner data from this platform |
| **Experimental** | Architecture prepared; LLM-assisted; requires validation |

---

## State Reconciliation & Confidence Architecture

### State Reconciliation (Single Source of Truth)
To prevent "double counting" of evidence (e.g., scoring a correct response in both IRT and BKT and adding the results), the **MeasurementEngine** is designated as the sole authoritative updater of the `LearnerState.mastery` metric. The `KnowledgeTracingModel` (BKT) may process the response for comparative/logging purposes or tracking temporal learning rate, but its output does not mutate the authoritative `mastery` state.

### Confidence Definition
`LearnerState.confidence` represents the statistical certainty (or reliability) of the mastery estimate. It is derived primarily from the number of evidence points (responses, labs) and their consistency. It is **not** a measure of the learner's self-reported psychological confidence, but rather the engine's confidence in its own estimate.

---

## Component Classification

### Measurement Engine

| Component | Status | Notes |
|-----------|--------|-------|
| Classical Test Theory (CTT) | **Established** | Correctness rate, difficulty, discrimination are standard |
| `ProvisionalRaschModel` (1PL) | **Provisional** | 1PL Logistic approximation mapping mastery and difficulty to logits (theta and b). Not empirically calibrated. |
| Item difficulty (b-parameter) | **Provisional** | Assigned by content experts; not derived from real response data |
| Item discrimination (a-parameter) | **Not Implemented** | Reserved for future calibration |
| 2PL / 3PL IRT | **Not Implemented** | Architecture supports future addition |
| MIRT | **Not Implemented** | Architecture supports future addition |

### Knowledge Tracing

| Component | Status | Notes |
|-----------|--------|-------|
| `BKTModel` (Bayesian Knowledge Tracing) | **Provisional** | Corbett & Anderson (1994) algorithm implemented. Default parameters — not fitted to real data. |
| DKT / DKVMN / SAKT / AKT | **Architecture Only** | Interfaces defined; models not implemented |

### Cognitive Diagnosis

| Component | Status | Notes |
|-----------|--------|-------|
| Misconception Detection | **Provisional** | Evidence accumulation required (threshold ≥ 2-3). Not from single response. |
| DINA / G-DINA / LCDM | **Not Implemented** | Architecture prepared |
| Q-Matrix (Item-Skill Mapping) | **Provisional** | Expert-assigned; not psychometrically validated |

### Adaptive Engine

| Component | Status | Notes |
|-----------|--------|-------|
| Multi-factor item selection (CAT-style) | **Provisional** | Implemented. Not empirically validated against optimal CAT baselines. |
| Content balancing | **Provisional** | Implemented |
| Prerequisite handling | **Provisional** | Implemented |
| Exposure control | **Architecture Only** | Partial implementation |

### Recommendation Engine

| Component | Status | Notes |
|-----------|--------|-------|
| Rule-based recommendation | **Established** | Deterministic logic based on learner state |
| Recommendation quality metrics | **Not Yet Measured** | Acceptance rate, learning gain tracking prepared but no historical data |

### Learning Coach (AI/LLM)

| Component | Status | Notes |
|-----------|--------|-------|
| LLM explanation generation | **Experimental** | Deepseek-powered; structured prompts; safety-checked |
| Coaching style adaptation | **Experimental** | Style affects language only — measurement results never altered |
| Open answer analysis | **Experimental** | Not yet implemented |
| Misconception classification via LLM | **Experimental** | LLM suggestion only; not authority |

### Process / Behavioral Indicators

| Component | Status | Notes |
|-----------|--------|-------|
| Verification behavior detection | **Provisional** | Derived from action sequence in lab |
| Problem decomposition tracking | **Provisional** | Derived from step ordering in lab tasks |
| Random trial detection | **Experimental** | Pattern matching on action sequence |
| Transfer detection | **Architecture Only** | Structurally novel problems flagged; detection not validated |

---

## What We Do NOT Claim

- ❌ IQ scores or intelligence quotient from learning interactions
- ❌ Emotional state inference from behavior
- ❌ Psychological diagnosis of any kind
- ❌ Validated psychometric parameters without real calibration data
- ❌ "Scientifically proven" learning gains without pre/post measurement

---

## Calibration Roadmap

```
Phase 1 (Current):
  calibrationStatus = "provisional"
  Parameters: expert-set defaults

Phase 2 (After 500+ real learner sessions):
  Fit BKT parameters per skill using EM algorithm
  calibrationStatus = "calibrated"

Phase 3 (After controlled study):
  IRT parameter estimation
  Validation against external assessment
  calibrationStatus = "validated"
```

---

*Last updated: 2026-08-22*
*This document must be updated whenever a component's scientific status changes.*
