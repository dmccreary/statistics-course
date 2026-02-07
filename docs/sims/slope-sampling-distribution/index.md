---
title: Slope Sampling Distribution
description: Interactive visualization showing how sample regression slopes vary under repeated sampling and form a distribution.
quality_score: 92
---
# Slope Sampling Distribution

<iframe src="main.html" height="510px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Watch the sampling distribution of regression slopes come to life! This visualization shows how sample slopes (b) vary from sample to sample around the true population slope (beta), helping you understand why we need inference procedures for regression.

### How to Use

- Click **Take Sample** to generate one new random sample and add its slope to the histogram
- Click **Take 100 Samples** to rapidly build up the sampling distribution
- Adjust **beta** slider to change the true population slope
- Adjust **sigma** slider to change the error standard deviation (scatter around the line)
- Adjust **n** slider to change the sample size
- Click **Reset** to clear the sampling distribution and start fresh

### Key Insights

- Sample slopes **vary randomly** around the true population slope
- The mean of sample slopes equals the true slope (unbiased estimator)
- **Larger sample sizes** produce less variable slope estimates
- **Smaller error SD** produces less variable slope estimates
- The sampling distribution is approximately **t-distributed**

## Lesson Plan

### Learning Objective

Students will understand that the sample slope varies from sample to sample and follows a t-distribution under repeated sampling (Bloom's Taxonomy: Understanding).

### The Big Idea

Just like sample means vary around the population mean, sample slopes vary around the population slope. This variability is why we need confidence intervals and hypothesis tests for slopes!

### Warmup Activity (3 minutes)

Set parameters: beta = 0.5, sigma = 2, n = 30. Take one sample and note the slope.
Ask: "Will the next sample have the same slope? Higher? Lower?" Take 5 more samples.

### Main Activity (12 minutes)

1. **Observe variability**: Take 100 samples and observe the histogram forming
2. **Effect of sample size**:
   - Reset, set n = 10, take 100 samples, note the spread
   - Reset, set n = 100, take 100 samples, compare the spread
3. **Effect of error SD**:
   - Reset, set sigma = 1, take 100 samples
   - Reset, set sigma = 4, take 100 samples, compare

### Discussion Questions

- Why does the histogram center around the true slope?
- What happens to the "Standard Error of b" as you increase sample size?
- How does this connect to confidence intervals for the slope?

### Connection to Inference

The standard deviation of sample slopes shown in the histogram is the **standard error of the slope** (SE_b). This is the denominator in our t-test for slope:

\[
t = \frac{b - \beta_0}{SE_b}
\]

Larger SE means wider confidence intervals and less conclusive tests.
