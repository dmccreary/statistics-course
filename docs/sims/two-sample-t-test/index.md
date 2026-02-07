---
title: Two-Sample T-Test Visualization
description: Compare two group means visually and statistically with confidence intervals and hypothesis test results.
quality_score: 90
---
# Two-Sample T-Test Visualization

<iframe src="main.html" height="552px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

"Now *that's* a data point worth collecting!" Sylvia's eyes light up. "Comparing two groups is one of the most common things researchers do. Are students who exercise different from those who don't? Does the new medication work better than the old one? This MicroSim helps you see both the visual comparison AND the statistical results."

This MicroSim performs a complete two-sample t-test (Welch's unpooled version) and shows you:
- Visual comparison of the two groups
- Confidence interval for the difference in means
- Full hypothesis test results with p-value and conclusion

### How to Use

- **Enter group statistics:** Input n, mean, and standard deviation for each group
- **Choose significance level:** Select alpha = 0.10, 0.05, or 0.01
- **Select alternative hypothesis:** Two-sided, greater, or less
- **Interpret results:** See if the CI contains 0 and if the p-value is less than alpha

### The Two-Sample T-Test

The test statistic is:

\[
t = \frac{(\bar{x}_1 - \bar{x}_2) - 0}{\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}}
\]

This MicroSim uses Welch's t-test (unpooled), which doesn't assume equal variances.

### Key Insights

- When the CI for the difference contains 0, we fail to reject H0
- When the CI doesn't contain 0, we reject H0 (the connection between CIs and tests!)
- Larger sample sizes give narrower confidence intervals
- The visual overlap between groups relates to statistical significance

## Lesson Plan

### Learning Objective

Students will compare two group means visually and statistically, understanding when the difference is statistically significant versus when overlap makes conclusions uncertain (Bloom's Taxonomy: Analyze L4).

### Exploration Activity (15 minutes)

1. Start with the default values (Group 1 mean = 78, Group 2 mean = 72)
2. Note that the CI does NOT contain 0 and p < 0.05
3. Change Group 2 mean to 75 - what happens?
4. Change Group 2 mean to 77 - what happens?
5. Find the "tipping point" where the result becomes non-significant

### Discussion Questions

1. Why do we use Welch's (unpooled) t-test instead of the pooled version?
2. How does the visual overlap in the dotplots relate to the CI for the difference?
3. If two groups have the same means but different sample sizes, how does that affect the test?
4. What's the relationship between the CI containing 0 and the p-value compared to alpha?

### Extension Activity

Have students investigate:
- What happens when you increase both sample sizes while keeping everything else the same?
- Can you find values where the groups look very different visually but the test is not significant?
- Can you find values where the groups look similar but the test IS significant?

---

!!! tip "Sylvia's Insight"
    "Here's the key connection: If your 95% CI for the difference doesn't contain 0, then your p-value will be less than 0.05. They're two ways of looking at the same question! The CI tells you the range of plausible values for the true difference, and if 0 isn't in that range, there's evidence the true difference isn't 0."
