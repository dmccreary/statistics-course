---
title: One-Sample T-Interval Calculator
description: Step-by-step calculator for constructing confidence intervals for a population mean.
quality_score: 90
---
# One-Sample T-Interval Calculator

<iframe src="main.html" height="502px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

"Let's crack this nut together!" Sylvia claps her paws excitedly. "Building a confidence interval might seem like a lot of steps, but once you see them laid out, it's really quite logical. This calculator shows you exactly what's happening at each stage."

This MicroSim walks you through the complete process of constructing a one-sample t-interval for a population mean, from input values to final interpretation.

### How to Use

- **Enter your data:** Type values for sample mean (x-bar), sample standard deviation (s), and sample size (n)
- **Choose confidence level:** Select 90%, 95%, or 99%
- **Watch the steps:** Use the step buttons to see the calculation unfold one piece at a time
- **Read the interpretation:** See how to properly state your conclusion

### The Formula

The one-sample t-interval formula is:

\[
\bar{x} \pm t^* \cdot \frac{s}{\sqrt{n}}
\]

Where:
- \( \bar{x} \) = sample mean
- \( t^* \) = t critical value for your confidence level and df = n - 1
- \( s \) = sample standard deviation
- \( n \) = sample size

### Key Insights

- The margin of error depends on three things: t*, s, and n
- Larger samples (bigger n) give smaller margins of error
- Higher confidence levels give wider intervals
- The interpretation should always mention "confidence" and the population parameter

## Lesson Plan

### Learning Objective

Students will construct and interpret one-sample t-intervals for a population mean by entering sample statistics and following the step-by-step calculation process (Bloom's Taxonomy: Apply L3).

### Worked Example (10 minutes)

Using the default values (homework study):
1. Start with Step 1 only - identify the given information
2. Add Step 2 - calculate degrees of freedom
3. Add Step 3 - find the t critical value
4. Add Step 4 - calculate standard error
5. Show all steps - see the final interval

### Practice Problems

Have students calculate intervals for:
1. A random sample of 20 test scores has mean 78 and SD 12. Find a 95% CI for the population mean.
2. A sample of 50 commute times has mean 25.3 minutes and SD 8.7 minutes. Find a 90% CI.
3. A sample of 12 measurements has mean 156.8 and SD 4.2. Find a 99% CI.

### Discussion Questions

1. What happens to the interval width when you increase the confidence level?
2. What happens when you increase the sample size?
3. Why do we use t* instead of z*?
4. What would happen if we used z* = 1.96 instead of the correct t*?

---

!!! tip "Sylvia's Insight"
    "The interpretation is SO important! Never say 'There's a 95% chance the true mean is in this interval.' Instead say 'We are 95% confident...' The true mean is fixed - it's either in there or it isn't. The confidence is about our method, not any single interval!"
