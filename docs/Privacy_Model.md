# SmartLab Privacy & Data Model

## Data Separation Principle
SmartLab AI treats Learner Data and Intelligence Data as two completely separate domains. This is critical for scaling to schools and enterprises while remaining GDPR/FERPA compliant.

### 1. Identity Layer (PII)
- Handles Name, Email, Passwords.
- Handled exclusively by the Auth Provider (e.g., Supabase Auth).
- **The Core Engine never sees this data.**

### 2. Intelligence Layer (Anonymous State)
- The Measurement Engine only operates on `anonymous_id` (e.g., `anon_001`).
- The engine knows that `anon_001` has a 65% mastery in Subnetting and struggles with Host Bits. It does not know that `anon_001` is "Ahmed Ali".
- All telemetry emitted to the "Data Flywheel" is strictly scrubbed of PII.

## Why this matters for Investors:
By keeping the Intelligence Core completely decoupled from PII:
1. We can train our global ML models on cross-tenant data without violating school privacy policies.
2. We can sell the Engine as an API service to other platforms, receiving anonymous IDs and returning mathematical mastery states.
