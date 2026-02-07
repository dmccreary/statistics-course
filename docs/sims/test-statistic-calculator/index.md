---
title: Test Statistic Calculator
description: Interactive calculator for computing z-test statistics in one-proportion hypothesis tests.
quality_score: 90
---
# Test Statistic Calculator

<iframe src="main.html" height="502px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

"Let's crack this nut!" Sylvia exclaims. "The test statistic tells us how far our sample result is from what we'd expect if the null hypothesis were true. Think of it as a measuring stick for surprise!"

Calculate z-test statistics for one-proportion hypothesis tests with step-by-step visualization.

### How to Use

- Enter your **sample size (n)** and **number of successes (x)** by clicking the input fields
- Adjust the **hypothesized proportion (p0)** using the slider
- Watch the z-score calculation update in real time
- Use **example buttons** to load pre-built scenarios
- Toggle **Show/Hide Steps** to see or collapse calculation details

### Key Insights

- **Z-formula**: z = (p-hat - p0) / sqrt(p0(1-p0)/n)
- The z-score measures how many standard errors the sample is from the hypothesized value
- **Large counts condition**: Both np0 and n(1-p0) must be at least 10
- Z-scores beyond +/-2 are unusual; beyond +/-3 are very rare

### Interpretation Guide

| |z| Range | Interpretation |
|-----------|----------------|
| 0 - 1 | Not unusual (typical) |
| 1 - 2 | Somewhat unusual |
| 2 - 3 | Unusual result |
| > 3 | Very unusual result |

## Lesson Plan

### Learning Objective

Students will calculate z-test statistics for one-proportion hypothesis tests by inputting sample data and hypothesized values, understanding how the test statistic measures deviation from the null hypothesis (Bloom's Taxonomy: Apply).

### Warmup Activity (5 minutes)

Before using the MicroSim, have students manually calculate the z-score for a fair coin flipped 100 times that lands on heads 58 times. Then verify their answer using the calculator.

### Guided Exploration (10 minutes)

1. Load the "Fair Coin" example
2. Observe how the z-score changes as you adjust p0
3. What happens to the z-score when p0 matches the sample proportion?
4. How does increasing sample size affect the z-score?

### Discussion Questions

1. Why do we use the hypothesized p0 (not the sample p-hat) in the standard error formula?
2. What does a negative z-score tell us compared to a positive z-score?
3. Why is checking the large counts condition important?

### Extension Activity

Have students design their own hypothesis test scenario and use the calculator to analyze it.
