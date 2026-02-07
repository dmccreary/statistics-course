---
title: Interactive T Critical Value Finder
description: Find t critical values for different degrees of freedom, confidence levels, and test types.
quality_score: 90
---
# Interactive T Critical Value Finder

<iframe src="main.html" height="402px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

"Acorn for your thoughts?" Sylvia pulls out her little notebook. "Finding critical values used to mean flipping through tables in the back of textbooks. Now you can explore them interactively and really understand what they mean!"

This MicroSim helps you find t critical values (t*) for any combination of degrees of freedom and confidence level, and visualizes what those critical values represent on the t-distribution curve.

### How to Use

- **Degrees of Freedom Slider:** Adjust df from 1 to 100
- **Confidence Level Buttons:** Choose 90%, 95%, or 99%
- **CI View:** Shows the central confidence region (green shading)
- **Test View:** Shows the rejection region for hypothesis tests (orange shading)
- **Test Type:** For hypothesis tests, choose two-sided, left-tailed, or right-tailed

### Key Insights

- The critical value t* marks the boundary between "typical" and "unusual" sample results
- For confidence intervals, t* determines the margin of error
- For hypothesis tests, t* determines the rejection region
- As df increases, t* approaches the z* value (normal distribution)
- One-tailed tests use different regions than two-tailed tests

## Lesson Plan

### Learning Objective

Students will find t critical values for different degrees of freedom and confidence levels, connecting the visual representation to the numerical values used in formulas (Bloom's Taxonomy: Apply L3).

### Demonstration Activity (5 minutes)

1. Set df = 10 and confidence = 95%
2. Point out t* = 2.228
3. Compare to z* = 1.96 (show how t* is larger)
4. Explain: this means the margin of error will be larger with small samples

### Practice Activity (10 minutes)

Have students find t* for these scenarios:
1. df = 24, 95% confidence (for a sample of 25)
2. df = 15, 99% confidence
3. df = 50, 90% confidence

Then switch to Test View and explore rejection regions.

### Discussion Questions

1. Why is t* larger than z* for small samples?
2. As df increases, what happens to t*?
3. How does the test type (one-tailed vs two-tailed) affect the critical value?
4. If you wanted to reject H0 more often, would you use alpha = 0.10 or alpha = 0.01?

### Assessment

Given a scenario: "A sample of 16 students has mean 72 and SD 8. Find the 95% confidence interval for the population mean." Students should identify df = 15, find t* = 2.131, and calculate the interval.

---

!!! tip "Sylvia's Insight"
    "The critical value is like a threshold. If your test statistic crosses it, something interesting is happening! That's when we say the result is 'statistically significant.' Think of it as the t-distribution's way of saying, 'Whoa, that's unusual!'"
