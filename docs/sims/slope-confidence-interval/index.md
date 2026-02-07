---
title: Slope Confidence Interval
description: Interactive visualization for constructing and interpreting confidence intervals for regression slopes.
quality_score: 92
---
# Slope Confidence Interval

<iframe src="main.html" height="510px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Build and interpret confidence intervals for regression slopes! This visualization shows how sample size and confidence level affect interval width, and connects confidence intervals to hypothesis tests.

### How to Use

- Click **Take Sample** to generate new data and see its confidence interval
- Adjust **n** (sample size) slider to see how larger samples produce narrower intervals
- Select **Confidence Level** (90%, 95%, 99%) to see how it affects width
- Toggle **Show Coverage** to run a simulation showing interval capture rates
- Click **Take 20 Samples** in coverage mode to build many intervals quickly

### Key Insights

- **Larger sample sizes** produce narrower confidence intervals (more precise estimates)
- **Higher confidence levels** produce wider intervals (trading precision for confidence)
- The interval represents a range of **plausible slopes** given our data
- If the interval **contains 0**, we cannot conclude the slope differs from zero
- If the interval **does not contain 0**, we reject H0: beta = 0

## The Confidence Interval Formula

\[
b \pm t^* \times SE_b
\]

Where:
- **b** = sample slope
- **t*** = critical t-value for the confidence level with df = n - 2
- **SE_b** = standard error of the slope

## Lesson Plan

### Learning Objective

Students will construct and interpret confidence intervals for the regression slope, understanding how sample size and confidence level affect interval width (Bloom's Taxonomy: Applying).

### Connection to Hypothesis Testing

A confidence interval provides the same conclusion as a hypothesis test:

| CI and 0 | Conclusion |
|----------|------------|
| 0 is NOT in CI | Reject H0: beta = 0 (significant relationship) |
| 0 IS in CI | Fail to reject H0: beta = 0 (no evidence of relationship) |

### Warmup Activity (3 minutes)

Generate a sample and observe:
1. Where is the sample slope (triangle marker)?
2. What range does the interval cover?
3. Does it contain zero?

### Main Activity (12 minutes)

**Part 1: Effect of Sample Size**
1. Set n = 15, generate several samples, note typical interval width
2. Set n = 50, generate several samples, compare interval width
3. Discuss: Why are larger samples more precise?

**Part 2: Coverage Simulation**
1. Switch to "Show Coverage" mode
2. Take 100 samples (click "Take 20 Samples" five times)
3. Count how many intervals capture the true slope (should be about 95% for 95% CI)

### Discussion Questions

- Why do we expect about 95% of 95% confidence intervals to capture the true slope?
- What happens to interval width when we increase confidence from 90% to 99%?
- In practice, we don't know the true slope. How does this simulation help us understand what confidence intervals mean?

### Interpretation Template

"We are [confidence level]% confident that the true slope of the population regression line is between [lower bound] and [upper bound]. This means that for each one-unit increase in [x variable], the average [y variable] changes by between [lower] and [upper] units."
