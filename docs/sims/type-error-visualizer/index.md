---
title: Type I and Type II Error Visualizer
description: Interactive simulation demonstrating Type I (false positive) and Type II (false negative) errors in hypothesis testing.
quality_score: 90
---
# Type I and Type II Error Visualizer

<iframe src="main.html" height="552px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

"Acorn for your thoughts on this?" Sylvia asks. "In my acorn quality testing, a Type I error means I reject perfectly good acorns thinking they're bad. A Type II error means I keep bad acorns thinking they're good. Both are problems, but depending on the situation, one might be worse than the other!"

Explore how Type I and Type II errors occur in hypothesis testing through simulation.

### How to Use

- Toggle **H0 is TRUE** or **H0 is FALSE** to set reality
- When H0 is false, adjust the **true proportion** slider
- Click **Draw Sample** to run one hypothesis test
- Click **Run 100 Samples** to see error rates accumulate
- Adjust **sample size (n)** and **significance level (alpha)** to see effects

### Key Concepts

| Error Type | What Happened | Probability |
|------------|---------------|-------------|
| **Type I** | Rejected H0 when H0 was actually TRUE | alpha |
| **Type II** | Failed to reject H0 when H0 was actually FALSE | beta |
| **Correct** | Decision matched reality | varies |

### The Four Possible Outcomes

| | H0 is True | H0 is False |
|---|---|---|
| **Reject H0** | Type I Error | Correct! |
| **Fail to Reject H0** | Correct! | Type II Error |

## Lesson Plan

### Learning Objective

Students will distinguish between Type I and Type II errors by exploring scenarios where the null hypothesis is either true or false, observing how different sample outcomes lead to correct decisions or errors (Bloom's Taxonomy: Analyze).

### Warmup Activity (5 minutes)

Before using the MicroSim, have students describe in their own words:
- What is a "false positive" in a medical test context?
- What is a "false negative" in a spam filter context?

### Guided Exploration (15 minutes)

**Part 1: Type I Errors**
1. Set H0 to TRUE
2. Run 100 samples and observe the Type I error rate
3. Compare this rate to alpha. What do you notice?
4. Change alpha from 0.05 to 0.10. How does the Type I error rate change?

**Part 2: Type II Errors**
1. Set H0 to FALSE with true p = 0.55
2. Run 100 samples and observe the Type II error rate
3. Change true p to 0.70. How does the Type II error rate change?
4. Increase sample size. What happens to Type II errors?

### Discussion Questions

1. Why does the Type I error rate approximately equal alpha when H0 is true?
2. Why is there no fixed "beta" value - why does it depend on the true parameter?
3. What is the only way to reduce BOTH error types simultaneously?
4. In what situations would you prefer a lower alpha (like 0.01)?

### Real-World Examples

| Scenario | Type I Error | Type II Error | Which is worse? |
|----------|-------------|---------------|-----------------|
| Drug trial | Approve useless drug | Reject effective drug | Depends! |
| Fire alarm | Alarm with no fire | No alarm during fire | Type II |
| Court trial | Convict innocent | Acquit guilty | Type I |
