---
title: Effect Size Visualization
description: Interactive visualization showing how Cohen's d effect size relates to the visual separation and overlap between two normal distributions.
image: /sims/effect-size-visualizer/effect-size-visualizer.png
---

# Effect Size Visualization

<iframe src="main.html" height="522px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Effect Size Visualizer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"My tail's tingling—we're onto something!"* Sylvia says excitedly. *"P-values tell us IF an effect is real, but effect size tells us HOW BIG it is. And that's often what really matters!"*

This interactive visualization helps students understand **Cohen's d**, one of the most common effect size measures for comparing two groups:

\[
d = \frac{\mu_2 - \mu_1}{\sigma}
\]

where:
- \( \mu_1 \) and \( \mu_2 \) are the means of the two groups
- \( \sigma \) is the standard deviation (assumed equal for both groups)

### Cohen's d Interpretation Guidelines

| Effect Size | Cohen's d | Visual Appearance |
|-------------|-----------|-------------------|
| Negligible | d < 0.2 | Distributions nearly identical |
| Small | 0.2 ≤ d < 0.5 | Slight separation, heavy overlap |
| Medium | 0.5 ≤ d < 0.8 | Noticeable separation |
| Large | d ≥ 0.8 | Clear separation between groups |

## How to Use

1. **Drag the slider** to adjust Cohen's d from 0 to 2.0
2. **Watch the distributions** separate as effect size increases
3. **Observe the overlap** decrease as d increases
4. **Check the statistics panel** for calculations and interpretation

## Key Insights

*"Here's what I love about effect size,"* Sylvia explains. *"It doesn't depend on sample size! A d of 0.5 means the same thing whether you have 20 participants or 20,000."*

### Why Effect Size Matters

1. **Sample size independence**: Unlike p-values, effect sizes don't get artificially inflated with large samples
2. **Comparability**: You can compare effect sizes across different studies
3. **Practical interpretation**: Effect size tells you whether the difference is worth caring about
4. **Meta-analysis**: Researchers combine effect sizes from multiple studies

### Visual Intuition

- **d = 0**: The distributions are identical (complete overlap)
- **d = 0.5**: About 67% of one group overlaps with the other (medium effect)
- **d = 1.0**: About 45% overlap (large effect)
- **d = 2.0**: Less than 20% overlap (very large effect)

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/effect-size-visualizer/main.html" height="522px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Define effect size as a standardized measure of difference magnitude
2. Calculate Cohen's d given two group means and a standard deviation
3. Interpret Cohen's d values using conventional benchmarks (small, medium, large)
4. Explain the visual relationship between effect size and distribution overlap
5. Distinguish between effect size and statistical significance

### Target Audience

- AP Statistics students (high school)
- Introductory statistics college students
- Psychology and social science research methods students
- Anyone learning to interpret research findings

### Prerequisites

- Understanding of normal distributions
- Concept of mean and standard deviation
- Basic hypothesis testing concepts

### Classroom Activities

**Activity 1: Predict the Separation (10 minutes)**

Before showing the simulation:

1. Ask students to draw two normal curves with d = 0 (identical)
2. Have them draw what d = 1.0 might look like
3. Show the simulation to check their predictions

**Activity 2: Calculate and Verify (15 minutes)**

Given: Group 1 mean = 100, Group 2 mean = 115, SD = 15

1. Have students calculate Cohen's d by hand: d = (115 - 100) / 15 = 1.0
2. Set the slider to d = 1.0 and verify the calculation
3. Repeat with different scenarios

**Activity 3: Connecting to Research (15 minutes)**

Discuss real-world effect sizes:

- Psychotherapy vs. no treatment for depression: d ≈ 0.8 (large)
- Gender differences in math ability: d ≈ 0.1 (negligible)
- Relationship between height and intelligence: d ≈ 0.2 (small)

*"Don't worry—every statistician drops an acorn sometimes,"* Sylvia reassures. *"The important thing is learning what these numbers MEAN in context!"*

### Assessment Questions

1. If two groups have means of 50 and 58 with SD = 16, what is Cohen's d? Is this a small, medium, or large effect?

2. A study reports d = 0.3 and p = 0.0001. Explain how both of these can be true simultaneously.

3. Why might a researcher prefer to report effect size rather than just p-values?

4. Looking at the visualization, approximately what percentage of Group 2 scores exceed the Group 1 mean when d = 0.8?

5. Two studies examine the same treatment. Study A (n=30) finds d = 0.7, p = 0.05. Study B (n=300) finds d = 0.3, p = 0.001. Which study provides stronger evidence for a practically meaningful effect? Explain.

## References

- Chapter 19: Communication and Synthesis - Concept: Effect Size
- [Wikipedia: Effect size](https://en.wikipedia.org/wiki/Effect_size)
- [Wikipedia: Cohen's d](https://en.wikipedia.org/wiki/Effect_size#Cohen's_d)
- Cohen, J. (1988). Statistical Power Analysis for the Behavioral Sciences (2nd ed.)
