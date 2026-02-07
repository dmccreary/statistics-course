---
title: Sampling Distribution Calculator
description: Interactive calculator for finding probabilities involving sample means or proportions with step-by-step solutions.
quality_score: 93
---
# Sampling Distribution Calculator

<iframe src="main.html" height="522px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Time to test those skills! This calculator helps you work through sampling distribution probability problems step-by-step, showing you exactly how to find the standard error, calculate z-scores, and determine probabilities. It works for both sample means and sample proportions.

### How to Use

- **Mode Toggle**: Switch between Mean and Proportion calculations
- **Input Parameters**: Click on any input box and type new values
- **Probability Type**: Choose "Less than," "Greater than," or "Between"
- **Example Presets**: Load the Light Bulbs or Polling examples from the textbook
- **Watch the Steps**: Follow the three-step calculation process

### Key Formulas Used

**For Sample Means:**
\[
z = \frac{\bar{x} - \mu}{\sigma / \sqrt{n}}
\]

**For Sample Proportions:**
\[
z = \frac{\hat{p} - p}{\sqrt{p(1-p)/n}}
\]

## Lesson Plan

### Learning Objective

Students will apply sampling distribution concepts to calculate probabilities involving sample means and proportions, using z-scores and normal distribution tables (Bloom's Taxonomy: Apply).

### Pre-Activity Discussion

- "If we know the population mean and standard deviation, how can we predict what sample means are likely to occur?"
- "What does it mean to find P(sample mean < 1175)?"

### Guided Practice

1. **Load the Light Bulbs Example**: Population mean = 1200 hours, SD = 100 hours, n = 64
2. **Follow Step 1**: Calculate SE = 100/sqrt(64) = 12.5
3. **Follow Step 2**: Calculate z = (1175 - 1200)/12.5 = -2.00
4. **Follow Step 3**: Find P(Z < -2.00) = 0.0228 (about 2.3%)

### Practice Problems

**Problem 1**: A factory produces chips with mean weight 10g and SD 0.5g. For samples of n=25, what's the probability the sample mean exceeds 10.2g?

**Problem 2**: If 65% of voters support a candidate, what's the probability that a sample of 200 voters shows less than 60% support?

### Extension Questions

1. What happens to the probability if we increase the sample size?
2. Why does the z-score get larger (in absolute value) when the sample size increases?
3. In the polling example, explain why getting less than 50% in the sample is quite possible even when the true proportion is 52%.

### Common Mistakes to Avoid

- Using population SD instead of standard error
- Forgetting to take the square root in the SE formula
- Using z-table values incorrectly (greater than vs. less than)

!!! tip "Sylvia Says"
    Acorn for your thoughts? Notice how the three steps always follow the same pattern: (1) Find SE, (2) Calculate z, (3) Look up probability. Master this process and you've got a powerful tool for understanding how samples behave!
