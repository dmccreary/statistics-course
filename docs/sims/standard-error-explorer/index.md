---
title: Standard Error and Sample Size Explorer
description: Interactive visualization showing how sample size affects the standard error of sampling distributions.
quality_score: 91
---
# Standard Error and Sample Size Explorer

<iframe src="main.html" height="502px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Let's crack this nut! The standard error is one of the most important concepts in statistics because it tells us how much we can expect our sample statistic to vary from sample to sample. This visualization lets you see exactly how sample size affects that variability.

### How to Use

- **Mode Toggle**: Switch between sample proportions and sample means
- **Sample Size Slider (n)**: Drag to change sample size from 10 to 500
- **Parameter Slider**: Adjust p (for proportions) or sigma (for means)
- **Watch the Curve**: See how the sampling distribution narrows as n increases
- **Check the Table**: Compare standard errors across different sample sizes

### Key Insights

- **Larger samples = smaller standard error**: The sampling distribution gets narrower
- **The square root rule**: To cut SE in half, you must quadruple the sample size
- **68% Rule**: About 68% of sample statistics fall within 1 SE of the true parameter
- **Formula differences**: Proportions use sqrt[p(1-p)/n]; means use sigma/sqrt(n)

## Lesson Plan

### Learning Objective

Students will apply the relationship between sample size and standard error to demonstrate how increasing sample size reduces the variability of the sampling distribution (Bloom's Taxonomy: Apply).

### Pre-Activity Questions

- "Why do pollsters typically survey about 1,000 people, not 100 or 10,000?"
- "If doubling the sample size doesn't halve the error, what does?"

### Guided Exploration

1. **Start with n = 50**: Note the standard error value
2. **Increase to n = 200**: What happened to the SE? (Should be about half)
3. **Try the table**: Find the pattern - how much does n need to change for SE to halve?
4. **Switch to Mean mode**: Does the same pattern hold?

### Mathematical Connection

For proportions:
\[
\sigma_{\hat{p}} = \sqrt{\frac{p(1-p)}{n}}
\]

For means:
\[
\sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}}
\]

Notice the sqrt(n) in both denominators - this is why quadrupling n halves the SE!

### Discussion Questions

1. Why is there a "law of diminishing returns" with sample size?
2. A researcher has $10,000 and can survey 100 more people for $1,000 each. They currently have n = 900. Should they spend it? Why or why not?
3. How does the population proportion p affect the standard error?

### Real-World Applications

- **Political Polls**: Why most national polls use n = 1,000 to 1,500
- **Quality Control**: Determining sample sizes for product testing
- **Medical Studies**: Calculating required participants for clinical trials

!!! tip "Sylvia Says"
    Time to squirrel away this knowledge! The standard error is like a measuring stick for reliability. Smaller SE means your estimate is more trustworthy. But remember - to cut that measuring stick in half, you need FOUR times the acorns... I mean, sample size!
