# SmartLab AI - Architecture Overview

## Executive Summary
SmartLab AI is not a traditional LMS; it is a **Learning Intelligence System**. The architecture is specifically designed to isolate the intelligence layer from the application layer, allowing for the substitution of diagnostic models without impacting the frontend user experience.

## Core Architecture Pattern: Hexagonal (Ports & Adapters)
We employ a strict Ports and Adapters (Hexagonal) architectural pattern for our core intelligence engines. 

### Why Hexagonal?
As an EdTech startup, the specific mathematical models we use to diagnose learners (IRT, BKT) will evolve as our data grows. By using Adapters, our frontend and API routes never communicate directly with the math engines. They communicate through standard interfaces.

```
[ Frontend (Next.js) ]
         |
[ API Layer (/pages/api) ]
         |
[ Application Interfaces (Ports) ]
         |
[ Legacy Adapters ] -> [ Concrete Engines (MeasurementEngine, etc.) ]
```

## The Intelligence Core
The system features three distinct sub-engines inside the Core:

1. **Measurement Engine (BKT/IRT)**: Measures the probability of mastery for atomic skills.
2. **Misconception Engine**: A deterministic Bayesian tracker that detects repeated error patterns (e.g., confusing Network Bits with Host Bits in IPv4 Subnetting).
3. **Recommendation Engine**: Suggests the optimal next learning item (Zone of Proximal Development) based on current Theta.

## Data Persistence Strategy
- **Current (Demo Mode)**: InMemory Repository pattern, allowing for complete functionality demonstration without network latency or complex setups.
- **Production (Planned)**: Supabase PostgreSQL for relational data, with a dedicated Kafka cluster for the "Data Flywheel" learning events.
