# SfeerTech Demo Walkthrough Script

## 1. The Hook (Login Page)
**Action:** Open `http://localhost:3000/auth/login`
**Script:** "Most EdTech platforms require you to take a 30-minute diagnostic test before they know anything about you. We built a system that learns *while* you learn. Let me show you. I'm going to load a predefined state for our test student, Alex."
**Action:** Click the `Load SfeerTech Demo` button.

## 2. The Dashboard (Pre-Assessment)
**Action:** Observe the Dashboard.
**Script:** "Notice the 'Probability of Mastery' section. The engine knows exactly what Alex is good at and where he struggles. But more importantly, look at the bottom right. The Misconception Engine hasn't detected any structural flaws in his thinking... yet. Let's take a quick assessment."
**Action:** Click "Start Quick Assessment".

## 3. The Assessment (Triggering the Engine)
**Action:** Answer the first two questions correctly. On the third question (Subnetting), intentionally answer it wrong by selecting the option that confuses Network Bits with Host Bits.
**Script:** "Behind every click, our Data Flywheel is logging response times and confidence intervals. Let's make a specific mistake here. I'll confuse the network bits with the host bits."

## 4. The Terminal (The Proof)
**Action:** Open the server terminal to show the JSON output.
**Script:** "Look at the terminal. That wasn't just a 'wrong' answer. We generated a structured telemetry event. The system logged the exact response time, the model version, and the shift in confidence."

## 5. The Wow Moment (Final Report & Dashboard)
**Action:** Finish the assessment and view the Result page.
**Script:** "Here is the difference between a quiz app and SmartLab. Scroll down to the orange box. Our mathematical engine (Bayesian Knowledge Tracing) detected a structural misconception. It realized Alex isn't just bad at math; he's confusing network and host bits. And right below it, our AI Layer steps in to explain *why* he's wrong using a relatable analogy. The Engine diagnoses, the AI teaches."

## 6. The PDF Export
**Action:** Click the "Export PDF" button.
**Script:** "And of course, we can export this entire intelligence profile into a pristine PDF for schools or corporate training managers."
