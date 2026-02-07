---
title: T-Procedure Robustness Exploration
description: Simulate many samples to see how well t-procedure confidence intervals perform under different conditions.
quality_score: 90
---
# T-Procedure Robustness Exploration

<iframe src="main.html" height="552px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

"When in doubt, graph it out - and simulate it!" Sylvia pulls out her notebook excitedly. "We know t-procedures assume the population is roughly normal. But what happens when it isn't? This simulation lets you find out empirically!"

This MicroSim runs hundreds of simulated samples and confidence intervals to measure the actual coverage rate - how often the intervals really contain the true population mean.

### How to Use

1. **Select population shape:** Normal, Right Skewed, Left Skewed, Uniform, or With Outliers
2. **Choose sample size:** From 5 to 100
3. **Set confidence level:** 90%, 95%, or 99%
4. **Click "Run Simulation":** Watch 500 confidence intervals be generated
5. **Analyze results:** Compare actual coverage to nominal coverage

### What to Look For

- **Green intervals:** Contain the true mean (success)
- **Red intervals:** Miss the true mean (failure)
- **Actual coverage:** Should be close to nominal (95% for 95% CI)
- **Deviation:** Large deviations indicate the procedure isn't robust for those conditions

### Key Robustness Findings

| Population Shape | Small n (< 15) | Moderate n (15-30) | Large n (> 30) |
|-----------------|----------------|--------------------|--------------------|
| Normal | Works well | Works well | Works well |
| Skewed | Coverage too low | Slight deviation | Works well (CLT) |
| Uniform | Works well | Works well | Works well |
| With Outliers | Coverage varies | Be cautious | Usually OK |

## Lesson Plan

### Learning Objective

Students will assess how violations of the normality condition affect the reliability of t-procedures by simulating many samples and observing actual confidence interval coverage rates (Bloom's Taxonomy: Evaluate L5).

### Exploration Activity (15 minutes)

Guide students through these investigations:

1. **Baseline:** Run with Normal population, n = 30. Observe coverage around 95%.

2. **Effect of skewness:** Switch to Right Skewed, n = 30. Is coverage still close to 95%?

3. **Effect of sample size:** With Right Skewed, try n = 10, then n = 50. What happens?

4. **Worst case:** Try Right Skewed with n = 5. How bad does coverage get?

5. **Outliers:** Switch to With Outliers. Which sample sizes are most affected?

### Discussion Questions

1. Why does larger sample size help with non-normal populations?
2. Which is more problematic: skewness or outliers?
3. At what sample size does the t-procedure become "robust enough" for skewed data?
4. Why might actual coverage be lower than nominal for skewed populations?

### Reflection

Have students write a "Robustness Guide" summarizing when t-procedures can be trusted and when to be cautious.

### Extension

Challenge students to find a combination of shape and sample size where the actual coverage is below 90% for a nominal 95% interval.

---

!!! tip "Sylvia's Insight"
    "Robustness is like having a sturdy umbrella. A good umbrella works in light rain AND heavy rain. T-procedures are robust because they work reasonably well even when the population isn't perfectly normal - especially with larger samples where the Central Limit Theorem kicks in!"
