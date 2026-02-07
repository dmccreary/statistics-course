---
title: Sampling Distribution Concept Visualization
description: Interactive visualization showing how individual samples combine to form a sampling distribution.
quality_score: 92
---
# Sampling Distribution Concept Visualization

<iframe src="main.html" height="552px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Welcome! Sylvia here, and let me tell you - this is one of my favorite visualizations because it shows the magic of statistics in action. You'll see how taking many samples and calculating a proportion from each one creates a beautiful, predictable pattern called a **sampling distribution**.

### How to Use

- **Population Panel**: Shows 200 dots (green = success, blue = failure) with the true population proportion p = 0.60
- **Sample Size Buttons**: Choose n = 10, 25, 50, or 100 to see how sample size affects variability
- **Take Samples**: Click buttons to draw 1, 10, or 100 random samples
- **Watch the Histogram**: See how sample proportions cluster around the true proportion
- **Compare**: Notice how larger samples create tighter clustering (less spread)

### Key Insights

- Each sample gives a different proportion (p-hat) due to sampling variability
- The **sampling distribution** shows the pattern of all possible sample proportions
- The mean of the sampling distribution equals the population proportion (p)
- Larger samples produce less variability in the sampling distribution
- As samples accumulate, the histogram becomes approximately normal (bell-shaped)

## Lesson Plan

### Learning Objective

Students will explain how individual samples combine to form a sampling distribution and demonstrate how the distribution of sample statistics differs from the distribution of individual data points (Bloom's Taxonomy: Understanding).

### Pre-Activity Discussion

Ask students:

- "If we took a sample of 25 people and found 60% supported a policy, would a different sample of 25 give exactly 60% too?"
- "What do you think would happen if we could take hundreds of different samples?"

### Guided Exploration

1. **Start with n = 25**: Take one sample and observe where the proportion falls
2. **Take 10 more samples**: Notice the variation - different samples give different results!
3. **Take 100 samples**: Watch the histogram build and see the bell shape emerge
4. **Compare sample sizes**: Reset and try n = 10 versus n = 100 - what changes?

### Discussion Questions

1. Why don't all sample proportions equal exactly 0.60?
2. What happens to the spread of the histogram as sample size increases?
3. Why is the center of the histogram close to 0.60?
4. How does this help us understand the reliability of polls and surveys?

### Connection to Theory

The simulation demonstrates that:

- The sampling distribution of p-hat is centered at p (unbiased estimator)
- The standard deviation of p-hat decreases as n increases
- The shape becomes approximately normal for large samples (CLT for proportions)

!!! tip "Sylvia Says"
    My tail's tingling - we're onto something! Notice how even though each sample is different, the overall pattern is remarkably predictable. That's the power of the sampling distribution - it tells us what to expect from our sample statistics!
