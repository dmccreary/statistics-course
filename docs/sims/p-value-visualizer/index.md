---
title: P-Value Visualizer
description: Interactive visualization of p-values as shaded areas under the normal curve for hypothesis testing.
quality_score: 90
---
# P-Value Visualizer

<iframe src="main.html" height="452px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

"Acorn for your thoughts?" Sylvia asks. "The p-value confused me at first too! It's NOT the probability that H0 is true. It's the probability of seeing our data (or more extreme) IF H0 were true. Think of it as measuring how surprised we should be!"

Visualize p-values as shaded areas under the standard normal distribution.

### How to Use

- **Drag** the z-score marker along the curve to change the test statistic
- Select **test type**: two-sided, left-tailed, or right-tailed
- Watch the **shaded area** change to show the p-value
- Use **quick buttons** to jump to common critical values
- Observe when results cross the **alpha = 0.05** significance threshold

### Key Insights

- **P-value = shaded area** under the curve beyond the test statistic
- For two-sided tests, shade both tails and double the one-tail probability
- For left-tailed tests, shade the left tail only
- For right-tailed tests, shade the right tail only
- **Red shading** indicates p < 0.05 (statistically significant)
- **Blue shading** indicates p >= 0.05 (not statistically significant)

### Critical Values to Remember

| Test Type | Alpha = 0.05 | Alpha = 0.01 |
|-----------|--------------|--------------|
| Two-sided | z = +/- 1.96 | z = +/- 2.576 |
| One-sided | z = +/- 1.645 | z = +/- 2.326 |

## Lesson Plan

### Learning Objective

Students will interpret p-values by visualizing the area under the normal curve corresponding to the probability of obtaining results as extreme as the test statistic, distinguishing between one-sided and two-sided tests (Bloom's Taxonomy: Understand).

### Warmup Activity (5 minutes)

Set the test to two-sided with z = 2.0. Ask students to estimate the p-value before revealing it. Then compare to their calculations using a z-table.

### Guided Exploration (10 minutes)

1. Start with z = 0. What is the p-value for a two-sided test? Why?
2. Gradually increase z. At what point does the p-value drop below 0.05?
3. Switch between test types. How does the shaded region change?
4. Compare z = 1.96 two-sided vs z = 1.645 one-sided. Why are both at p = 0.05?

### Discussion Questions

1. Why is the p-value for a two-sided test always larger than for a one-sided test with the same z?
2. What happens to the p-value as the z-score moves further from 0?
3. Why do we say "fail to reject H0" instead of "accept H0" when p > 0.05?

### Common Misconceptions

- The p-value is NOT the probability that H0 is true
- A small p-value does NOT mean a large or important effect
- Statistical significance (p < 0.05) is NOT the same as practical significance
