# Runtime Readiness Checklist

This checklist defines the steps required to execute the Adaptive Educational Intelligence Platform End-to-End.

## Required Installation & Build Steps
- [ ] `npm ci` (Requires active network connection to registry)
- [ ] `npm run build`
- [ ] `npm test`
- [ ] `npx tsc --noEmit`
- [ ] `npm run dev`

## Environment Configuration
- [ ] Copy `.env.example` to `.env.local`
- [ ] **Required Env Vars**:
  - `LLM_PROVIDER`: Set to `deepseek` or `mock`.
  - `DEEPSEEK_API_KEY`: Required only if `LLM_PROVIDER=deepseek`.
- [ ] **Supabase Connection** (Future Integration):
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_KEY`
- [ ] Ensure no server secrets are exposed to the client bundle (no `NEXT_PUBLIC_` prefix on keys).

## Runtime Smoke Tests
Run these tests manually in the browser once `npm run dev` is successful:
- [ ] **Homepage**: Routes load correctly without React hydration errors.
- [ ] **Consent**: Learner consent toggles successfully persist state.
- [ ] **Goal**: Goal selection triggers a state initialization.
- [ ] **Diagnostic / Assessment**: Submitting an answer correctly routes evidence to the Measurement Engine.
- [ ] **Lab**: CLI simulation records process metrics (e.g. `ping verify`).
- [ ] **Intelligence (Dashboard)**: Validates that Strong, Developing, Gap, and Uncertain items render dynamically from backend data.
- [ ] **Coach**: Ensure "Why am I seeing this?" yields evidence-based reasons. Verify fallback works if AI is offline.

---
**Current Status**: Core logic is VERIFIED OFFLINE. Browser E2E and Runtime are currently BLOCKED BY DEPENDENCY INSTALLATION.
