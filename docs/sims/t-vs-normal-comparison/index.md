---
title: T-Distribution vs Normal Distribution Comparison
description: Interactive visualization comparing t-distributions with different degrees of freedom to the standard normal distribution.
quality_score: 90
---
# T-Distribution vs Normal Distribution Comparison

<iframe src="main.html" height="452px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

"Let's crack this nut!" Sylvia adjusts her glasses excitedly. "The t-distribution is like the normal distribution's more cautious cousin. It says, 'Hey, since we had to estimate the standard deviation from our sample, let's be a bit more humble about our certainty.'"

This MicroSim helps you understand why we need the t-distribution when doing inference about means, and how it compares to the standard normal (Z) distribution.

### How to Use

- **Degrees of Freedom Slider:** Drag to change df from 1 to 100 and watch the t-distribution change shape
- **Confidence Level Buttons:** Toggle between 90%, 95%, and 99% to see different critical values
- **Show Tail Areas:** Toggle to visualize the probability in the tails
- **Show Critical Values:** Toggle to see the vertical lines marking critical values

### Key Insights

- The t-distribution has **heavier tails** than the normal distribution
- With small df (small samples), the t-distribution is noticeably different from normal
- As df increases, the t-distribution approaches the normal distribution
- At df = 30+, the distributions are quite similar; at df = 100+, nearly identical
- Heavier tails mean **larger critical values** for the same confidence level
- This translates to **wider confidence intervals** with small samples

## Lesson Plan

### Learning Objective

Students will compare the shapes of t-distributions with different degrees of freedom to the standard normal distribution, understanding how heavier tails affect inference (Bloom's Taxonomy: Understanding L2).

### Warm-Up Activity (5 minutes)

Ask students: "If we're less certain about something, should our confidence interval be wider or narrower?" Discuss how uncertainty should translate to more caution in our estimates.

### Exploration Activity (10 minutes)

1. Start with df = 5 and observe how much fatter the tails are
2. Slowly increase df and watch the curves converge
3. Compare critical values at each stage
4. Predict: At what df will the difference be less than 0.1?

### Discussion Questions

1. Why does estimating sigma add extra uncertainty?
2. Why do we "lose" a degree of freedom when computing s?
3. For a sample of size 15, which has the larger 95% critical value: z* or t*?
4. What happens to the width of a confidence interval as sample size increases?

### Assessment

Have students calculate the difference between t* and z* for df = 5, 20, and 50 at 95% confidence. They should explain why this matters for constructing confidence intervals.

---

!!! tip "Sylvia's Insight"
    "Those heavier tails aren't a bug, they're a feature! The t-distribution is being honest about our uncertainty. When we have a small sample and had to estimate the spread, it's only fair that we're more humble about what we know."
