# SmartLab AI - Technical Roadmap (Next 12 Months)

## Q1: Production Hardening
- **Supabase Migration**: Replace InMemory Repositories with Supabase PostgreSQL (LearnerProfiles, AssessmentStates).
- **Authentication**: Fully integrate Supabase Auth (Magic Links, OAuth).
- **Data Flywheel Realization**: Pipe telemetry events from `/api/assessment/response` into a scalable event stream (Kafka or Supabase Realtime).

## Q2: The AI Teacher Expansion
- **LLM Integration**: Feed the Misconception Engine's JSON outputs into an LLM (OpenAI/Anthropic) to generate dynamic, conversational remediation rather than static text.
- **Multimodal Feedback**: Generate on-the-fly diagrams based on the specific learner's misconception.

## Q3: B2B Multi-tenant SaaS
- **School/Corporate Dashboards**: Allow instructors to view aggregate `LearnerSkillState` heatmaps across an entire classroom or department.
- **API First**: Expose the Measurement Engine as a REST/GraphQL API for third-party LMS integration.

## Q4: Advanced Adaptive Engine
- **Item Response Theory (IRT) Calibration**: Transition from static item difficulties to dynamic, data-driven calibration based on thousands of student responses.
- **Predictive Analytics**: Forecast certification exam pass rates (e.g., CCNA) based on current skill trajectories.
