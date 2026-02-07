---
title: Central Limit Theorem Demonstration
description: Interactive visualization proving the Central Limit Theorem by showing how sampling distributions become normal regardless of population shape.
quality_score: 95
---
# Central Limit Theorem Demonstration

<iframe src="main.html" height="602px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

My tail is absolutely tingling because this visualization shows one of the most beautiful results in all of statistics! The **Central Limit Theorem** says that no matter how weird or non-normal your population looks, the sampling distribution of the mean becomes normal as sample size increases. This simulation lets you see that magic happen.

### How to Use

- **Population Types**: Choose from Uniform, Skewed Right, Skewed Left, Bimodal, Normal, or U-shaped
- **Sample Size (n)**: Start with n=1 (sampling distribution matches population) and increase to see normality emerge
- **Take Samples**: Click to generate 100 or 1000 sample means at once
- **Normal Overlay**: Toggle the green normal curve to compare against the histogram
- **Watch the Statistics**: Compare theoretical vs. observed mean and standard deviation

### Key Insights

- **n = 1**: The sampling distribution looks exactly like the population (no averaging yet!)
- **n = 5-10**: The sampling distribution starts to become more symmetric
- **n = 25-30**: The sampling distribution is approximately normal
- **n = 50+**: The sampling distribution is clearly bell-shaped regardless of population shape

## Lesson Plan

### Learning Objective

Students will analyze how the Central Limit Theorem transforms non-normal population distributions into normal sampling distributions as sample size increases, and compare sampling distributions across different population shapes (Bloom's Taxonomy: Analyze).

### Pre-Activity Discussion

- "What if I told you that the shape of the population doesn't matter for inference?"
- "Why do you think most statistical tests assume normality?"

### Guided Exploration

1. **Start with Skewed Right, n = 1**: Take 1000 samples and observe the shape
2. **Increase to n = 5**: Reset and take 1000 samples - what changed?
3. **Continue to n = 25**: The histogram should now look bell-shaped!
4. **Try different populations**: Does the CLT work for Bimodal? U-shaped?
5. **Compare statistics**: How close are observed values to theoretical?

### Critical Thinking Questions

1. Why does averaging reduce the impact of extreme values?
2. At what sample size does the skewed population's sampling distribution look approximately normal?
3. Why is this theorem so important for statistical inference?
4. The U-shaped population is very unusual - does the CLT still work?

### Mathematical Connections

The CLT states that for samples of size n from a population with mean μ and standard deviation σ:

\[
\bar{x} \sim N\left(\mu, \frac{\sigma}{\sqrt{n}}\right) \text{ for large n}
\]

This means:
- Mean of the sampling distribution = μ (population mean)
- Standard deviation of sampling distribution = σ/√n (standard error)
- Shape becomes normal regardless of population shape

### Extension Activity

Have students predict: "If the population is already normal, does the CLT make a difference?" Test this by selecting the Normal population and comparing n=1 vs. n=25. What do they notice about the spread?

!!! tip "Sylvia Says"
    Now *that's* a data point worth collecting! The CLT is genuinely remarkable - it's like saying no matter how chaotic the ingredients, the cake always comes out the same shape. This single theorem is why we can use normal distributions for almost all statistical inference!
