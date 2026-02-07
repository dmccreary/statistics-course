---
title: Two-Proportion Z-Test Calculator
description: Interactive calculator for conducting two-sample z-tests comparing proportions between two independent groups.
quality_score: 90
---
# Two-Proportion Z-Test Calculator

<iframe src="main.html" height="602px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

"Let's crack this nut!" Sylvia exclaims. "When comparing two groups, we need to know if the difference we observe is real or just random chance. This calculator walks through every step of a two-proportion z-test!"

Compare proportions between two independent groups with a complete hypothesis test.

### How to Use

- Enter **sample sizes** (n1, n2) and **successes** (x1, x2) for each group
- Select the **test type**: two-sided, left-tailed, or right-tailed
- Adjust **alpha** using the slider to change the significance level
- Use **example buttons** to load pre-built scenarios
- Toggle **Show/Hide Steps** to see calculation details

### Key Concepts

- **Pooled proportion**: Combines both samples assuming H0 is true
- **Standard error**: Uses pooled p-hat in the formula
- **Z-test statistic**: Measures how far the difference is from 0

### The Formulas

**Pooled proportion:**
\[ \hat{p}_{pool} = \frac{x_1 + x_2}{n_1 + n_2} \]

**Standard error:**
\[ SE = \sqrt{\hat{p}_{pool}(1-\hat{p}_{pool})\left(\frac{1}{n_1} + \frac{1}{n_2}\right)} \]

**Test statistic:**
\[ z = \frac{(\hat{p}_1 - \hat{p}_2) - 0}{SE} \]

## Lesson Plan

### Learning Objective

Students will conduct a complete two-proportion z-test by entering data from two groups, calculating the pooled proportion and test statistic, and interpreting the results (Bloom's Taxonomy: Apply).

### Warmup Activity (5 minutes)

Before using the calculator, have students manually compute the pooled proportion for:
- Group 1: n=100, x=40
- Group 2: n=100, x=50

### Guided Exploration (15 minutes)

1. Load the "Teaching Study" example
2. Walk through each calculation step
3. Interpret the p-value and conclusion
4. Change to a one-sided test - how does the p-value change?
5. Try the "Survey" example - why might this result be different?

### Discussion Questions

1. Why do we use the pooled proportion instead of individual sample proportions in the standard error?
2. When would you use a one-sided test instead of a two-sided test?
3. How does sample size affect the likelihood of finding a significant difference?
4. If we find a statistically significant difference, does that mean the difference is practically important?

### Extension Activity

Have students find real-world data comparing two groups and conduct a complete two-proportion z-test using the calculator. Examples:
- Comparing success rates between two treatments
- Comparing survey responses from two demographic groups
- Comparing conversion rates for two website designs
