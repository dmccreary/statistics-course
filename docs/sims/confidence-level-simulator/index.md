---
title: Confidence Level Simulator
description: Interactive demonstration showing that the confidence level represents the long-run proportion of intervals that capture the true parameter.
image: /sims/confidence-level-simulator/confidence-level-simulator.png
---

# Confidence Level Simulator

<iframe src="main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Confidence Level Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"Acorn for your thoughts?"* Sylvia muses. *"What does 95% confidence really mean? It's one of the most misunderstood ideas in statistics, so let's see it in action!"*

This simulation demonstrates the true meaning of confidence level by generating many confidence intervals and showing what proportion capture the true parameter.

### The Key Insight

A **95% confidence level** means: If we repeated our sampling process many times and built a confidence interval each time, approximately **95% of those intervals would contain the true population parameter**.

- It's about the **reliability of the method**, not any single interval
- Any individual interval either contains the true value or it doesn't
- We can't know which intervals succeed - we can only trust the process

## How to Use

1. **Click "Generate 1"** to create one sample and its confidence interval
2. **Click "Generate 10"** to add 10 samples quickly
3. **Click "Generate 100"** to see the full pattern with 100 intervals
4. **Switch confidence levels** (90%, 95%, 99%) to compare capture rates
5. **Watch the capture rate** approach the expected confidence level

## Key Insights

*"My tail's tingling - we're onto something!"* Sylvia observes:

- **Green intervals** capture the true parameter (the orange vertical line)
- **Red intervals** miss the true parameter - these are the unlucky ~5% (at 95% confidence)
- With more samples, the **capture rate converges** to the confidence level
- **Higher confidence** = wider intervals = more captured, but less precise

### What Confidence Level Does NOT Mean

| Common Misconception | Reality |
|---------------------|---------|
| "95% chance this interval contains p" | The interval either does or doesn't - no probability applies |
| "95% of the data is in this interval" | Intervals are about the parameter, not individual data |
| "We're 95% sure we're right" | It's about the method's long-run success rate |

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Explain that confidence level refers to the method's long-run success rate
2. Predict that approximately C% of C% confidence intervals will capture the true parameter
3. Recognize why we cannot assign probability to a single calculated interval
4. Compare how different confidence levels affect capture rates and interval widths

### Target Audience

- AP Statistics students (high school)
- Introductory statistics college students
- Anyone learning about statistical inference

### Prerequisites

- Understanding of confidence intervals
- Concept of population parameter vs. sample statistic
- Basic probability concepts

### Classroom Activities

**Activity 1: Prediction and Observation (10 minutes)**

1. Before simulation: "If we make 100 confidence intervals at 95% confidence, how many should capture the true p?"
2. Generate 100 intervals
3. Compare prediction to actual count
4. Discuss: Why isn't it exactly 95?

**Activity 2: Comparing Confidence Levels (15 minutes)**

1. Generate 100 intervals at 90% confidence - record capture count
2. Reset and generate 100 at 95% confidence - record capture count
3. Reset and generate 100 at 99% confidence - record capture count
4. Observe: Higher confidence = more captures but wider intervals

**Activity 3: The Single Interval Problem (10 minutes)**

Discussion prompts:
- After generating just ONE interval (green), ask: "What's the probability this specific interval contains p?"
- Answer: Either 0% or 100% - we just don't know which!
- The 95% describes how often the method works, not this particular result

*"Don't worry - every statistician drops an acorn sometimes,"* Sylvia reassures. *"About 5% of our 95% confidence intervals will miss the mark. That's not failure - that's exactly what we expected!"*

### Assessment Questions

1. A researcher constructs a 95% confidence interval and says "There's a 95% probability that the true mean is in this interval." Is this correct? Explain.

2. If you constructed 200 confidence intervals at 90% confidence, approximately how many would you expect to miss the true parameter?

3. Why do 99% confidence intervals capture the true parameter more often than 90% confidence intervals?

4. After seeing 100 intervals where 93 captured the true parameter (at 95% confidence), a student says "this proves the method doesn't work." How would you respond?

## References

- Chapter 15: Confidence Intervals - Concepts: Confidence Level, Interpreting Confidence
- [Wikipedia: Confidence interval](https://en.wikipedia.org/wiki/Confidence_interval)
