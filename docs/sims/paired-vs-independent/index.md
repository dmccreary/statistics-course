---
title: Paired vs Independent Data Decision Guide
description: Interactive flowchart and practice quiz to help determine whether data is paired or independent.
quality_score: 90
---
# Paired vs Independent Data Decision Guide

<iframe src="main.html" height="452px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

"Don't worry - every statistician drops an acorn sometimes when figuring this out!" Sylvia laughs. "The key question is simple: Is there a natural one-to-one matching between observations? If each observation in Group 1 has a specific partner in Group 2, you've got paired data!"

This MicroSim helps you master the decision between paired and independent samples t-procedures through:
- An interactive flowchart with decision questions
- A practice quiz with real-world scenarios
- Immediate feedback with explanations

### How to Use

**Flowchart Mode:**
- Follow the decision diamonds from top to bottom
- Answer each yes/no question about your data
- Arrive at either "Paired" (green) or "Independent" (orange)

**Practice Quiz Mode:**
- Read each scenario carefully
- Click "Paired" or "Independent" to answer
- Review the explanation after each question

### Decision Criteria

| Question | If Yes... |
|----------|-----------|
| Same individuals measured twice? | Paired |
| Deliberately matched pairs? | Paired |
| Natural one-to-one connection? | Paired |
| None of the above | Independent |

## Lesson Plan

### Learning Objective

Students will correctly identify whether a given scenario calls for paired or independent samples t-procedures by following a decision flowchart (Bloom's Taxonomy: Analyze L4).

### Warm-Up Activity (5 minutes)

Ask students: "Why might we want to measure the SAME people before and after a treatment rather than comparing two different groups?" Lead into discussion of controlling for individual variability.

### Guided Practice (10 minutes)

Work through the flowchart together with these examples:
1. Compare blood pressure before and after medication (same patients)
2. Compare blood pressure of patients taking Drug A vs. Drug B (different patients)
3. Compare test scores of twins raised together vs. raised apart

### Independent Practice (10 minutes)

Have students complete the Practice Quiz individually, aiming for 8/8 correct.

### Discussion Questions

1. Why does pairing data often lead to more powerful tests?
2. What's the danger of treating independent data as paired, or vice versa?
3. Can you think of a scenario where you could design the study either way?
4. In a twins study, are the observations within each pair independent?

### Common Mistakes to Address

- Assuming any "before/after" comparison is paired (it depends on whether it's the SAME subjects)
- Forgetting that matched pairs based on characteristics count as paired
- Thinking that comparing two time periods automatically means paired

---

!!! tip "Sylvia's Insight"
    "Here's my secret: I always ask 'Can I subtract?' If I can naturally take the difference between observation 1 and observation 2 for each pair, that's paired data! Like before minus after for each person. If there's no natural pairing to subtract, it's independent."
