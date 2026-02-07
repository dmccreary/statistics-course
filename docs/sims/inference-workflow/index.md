---
title: Statistical Inference Workflow
description: Interactive infographic showing how sampling distributions connect samples to populations in the inference process.
quality_score: 90
---
# Statistical Inference Workflow

<iframe src="main.html" height="452px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This visual roadmap shows the "big picture" of statistical inference - how we use sample data to make conclusions about populations. The sampling distribution is the crucial bridge that connects what we observe to what we want to know.

### How to Use

- **Hover over components**: Get detailed explanations of each element
- **Click path buttons**: Highlight either the Confidence Interval or Hypothesis Test pathway
- **Trace the flow**: Follow how information moves from population to sample to inference

### The Big Picture

The workflow shows three main elements:

1. **Population (Green)**: Contains the unknown parameter (p or mu) we want to learn about
2. **Sample (Orange)**: Contains the observed statistic (p-hat or x-bar) we can calculate
3. **Sampling Distribution (Center)**: The theoretical bridge that describes how statistics vary

## Lesson Plan

### Learning Objective

Students will explain how sampling distributions enable statistical inference by connecting sample statistics to population parameters (Bloom's Taxonomy: Understand).

### Key Concepts Illustrated

**The Inference Process:**

| Element | Symbol | What It Is |
|---------|--------|------------|
| Population parameter | p, mu | Unknown value we want to estimate |
| Sample statistic | p-hat, x-bar | Calculated from our data |
| Sampling distribution | Normal curve | Pattern of all possible statistics |

### Discussion Questions

1. Why can't we just use our sample statistic as the exact population parameter?
2. How does the sampling distribution help us quantify our uncertainty?
3. What's the difference between using a confidence interval and a hypothesis test?

### Two Paths of Inference

**Confidence Interval Path:**
- Goal: Estimate the parameter with a range
- Process: Sample statistic +/- margin of error
- Output: "We are 95% confident that p is between 0.48 and 0.56"

**Hypothesis Test Path:**
- Goal: Evaluate a claim about the parameter
- Process: Compare sample to hypothesized value using sampling distribution
- Output: "We reject/fail to reject the null hypothesis"

### Extension Activity

Have students trace through a specific example:
1. Start with population: "60% of all students prefer online learning"
2. Take a sample: "In our sample of 100, 55% preferred online"
3. Use sampling distribution: "Standard error = 0.049"
4. Make inference: Either build a CI or test if the true proportion could be 0.60

!!! tip "Sylvia Says"
    Time to squirrel away this knowledge! The sampling distribution is the secret sauce of statistics. It's what allows us to go from one tiny sample to making claims about millions of individuals. Without it, we'd be stuck guessing in the dark!
