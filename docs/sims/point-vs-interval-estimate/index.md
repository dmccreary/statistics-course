---
title: Point Estimate vs Interval Estimate
description: Interactive visualization comparing point estimates and interval estimates for population proportions.
image: /sims/point-vs-interval-estimate/point-vs-interval-estimate.png
---

# Point Estimate vs Interval Estimate

<iframe src="main.html" height="402px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Point vs Interval Estimate MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"Acorn for your thoughts?"* Sylvia asks. *"When we estimate a population parameter, we have two choices: give a single number (point estimate) or give a range (interval estimate). Let's see why the range is usually more honest!"*

This interactive visualization helps students understand the fundamental difference between:

- **Point Estimate**: A single value like the sample proportion (p-hat) that represents our best guess
- **Interval Estimate**: A range of plausible values (confidence interval) that acknowledges our uncertainty

### Why Intervals Matter

A point estimate is like guessing the exact number of acorns in a tree - you might be close, but you're probably not exact. An interval estimate is like saying "somewhere between 50 and 100 acorns" - less precise, but much more likely to be right!

## How to Use

1. **Click "New Sample"** to generate a random sample and see its point estimate (dot) and 95% confidence interval (bracket)
2. **Click "Add 10"** to quickly generate 10 samples at once
3. **Toggle "Show True Parameter"** to reveal where the true population proportion actually is
4. **Watch the counter** to see what percentage of intervals capture the true value

## Key Insights

*"My tail's tingling - we're onto something!"* Sylvia exclaims:

- The **point estimate** (dot) varies from sample to sample
- The **confidence interval** (bracket) extends on both sides of the point estimate
- When you reveal the true parameter, about **95% of intervals should contain it** - that's what 95% confidence means!
- Intervals that miss the true parameter turn **red** - these represent the ~5% of intervals that don't capture the truth

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Distinguish between point estimates and interval estimates
2. Explain why interval estimates provide more useful information than point estimates alone
3. Demonstrate that approximately 95% of 95% confidence intervals capture the true parameter
4. Recognize that confidence level describes the long-run success rate of the method

### Target Audience

- AP Statistics students (high school)
- Introductory statistics college students
- Anyone learning about statistical inference

### Prerequisites

- Understanding of population vs. sample
- Concept of sample proportion (p-hat)
- Basic probability concepts

### Classroom Activities

**Activity 1: Prediction (5 minutes)**

Before using the simulation:
- Ask: "If we take 20 samples, how many confidence intervals do you think will contain the true parameter?"
- Record predictions
- Run the simulation and compare to predictions

**Activity 2: The 95% Discovery (10 minutes)**

1. Generate 25 samples with "Show True Parameter" hidden
2. Have students predict which intervals might miss
3. Reveal the true parameter
4. Count and calculate the capture rate
5. Discuss: Why isn't it exactly 95%? (Sampling variability!)

**Activity 3: Point vs Interval Discussion (10 minutes)**

Compare:
- What information does the point estimate give you?
- What additional information does the interval give you?
- When would you prefer each type of estimate?

*"Time to squirrel away this knowledge!"* Sylvia concludes. *"Point estimates are quick and simple, but intervals are more honest about our uncertainty. In statistics, honesty is the best policy!"*

### Assessment Questions

1. A researcher reports that 42% of adults prefer remote work. Is this a point estimate or an interval estimate?

2. If you constructed 100 different 95% confidence intervals (each from a different sample), approximately how many would you expect to contain the true parameter?

3. Why do different samples produce different point estimates?

4. A 95% confidence interval for a proportion is (0.35, 0.55). What is the point estimate?

## References

- Chapter 15: Confidence Intervals - Concepts: Point Estimate, Interval Estimate, Confidence Interval
- [Wikipedia: Interval estimation](https://en.wikipedia.org/wiki/Interval_estimation)
