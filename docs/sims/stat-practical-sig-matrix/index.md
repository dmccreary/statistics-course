---
title: Statistical vs Practical Significance Decision Matrix
description: Interactive 2x2 matrix helping students distinguish between statistical and practical significance with real-world examples.
image: /sims/stat-practical-sig-matrix/stat-practical-sig-matrix.png
---

# Statistical vs Practical Significance Decision Matrix

<iframe src="main.html" height="432px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Significance Matrix MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"Acorn for your thoughts?"* Sylvia asks. *"Here's a concept that trips up even experienced researchers: just because something is statistically significant doesn't mean it actually matters! Let me show you how to tell the difference."*

This interactive decision matrix helps students understand the crucial distinction between:

- **Statistical Significance**: Is the effect real (not due to random chance)?
- **Practical Significance**: Is the effect large enough to actually matter?

### The Four Quadrants

| Quadrant | Statistical? | Practical? | What It Means |
|----------|--------------|------------|---------------|
| Top-Left (Orange) | Yes | No | **Trivial Effect** - Real but meaningless |
| Top-Right (Green) | Yes | Yes | **Meaningful Discovery!** - Real and important |
| Bottom-Left (Gray) | No | No | **Nothing Here** - No effect detected or relevant |
| Bottom-Right (Yellow) | No | Yes | **Need More Data** - Promising but uncertain |

## How to Use

1. **Click each quadrant** to see a detailed explanation
2. **Read the examples** to understand real-world scenarios
3. **Click "Reset View"** to deselect and start over
4. **Hover over quadrants** to see click hints

## Key Insights

*"Here's the sneaky part,"* Sylvia explains, adjusting her glasses. *"With a large enough sample size, you can detect tiny, trivial differences and get impressive-looking p-values. But that doesn't mean you've discovered anything useful!"*

### The Diet Pill Example

A study of 10,000 people finds that a diet pill helps users lose 0.5 pounds more than placebo over 12 weeks. With p < 0.001, this is highly statistically significant. But would you pay money for a pill that helps you lose half a pound in three months? The effect is REAL but TRIVIAL.

### The Treatment Example

A study of 150 patients finds a new treatment reduces symptoms by 40% (p = 0.02). This is both statistically significant AND practically meaningful - a real discovery worth acting on!

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/stat-practical-sig-matrix/main.html" height="432px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Define statistical significance as evidence an effect is not due to chance
2. Define practical significance as an effect being large enough to matter
3. Classify study results into one of four categories based on both types of significance
4. Explain why large sample sizes can make trivial effects statistically significant
5. Evaluate research findings by considering both types of significance

### Target Audience

- AP Statistics students (high school)
- Introductory statistics college students
- Research methods students
- Anyone learning to interpret study results

### Prerequisites

- Understanding of p-values and hypothesis testing
- Concept of significance level (alpha)
- Basic understanding of sample size effects

### Classroom Activities

**Activity 1: Classify Real Studies (15 minutes)**

Present students with actual research headlines and have them predict which quadrant each belongs in:

1. "Study of 50,000 people finds coffee drinkers have blood pressure 0.2 mmHg lower" (Top-left: Trivial)
2. "New teaching method improves test scores by 15 points (p = 0.03, n = 200)" (Top-right: Meaningful)
3. "No significant difference found between diets (p = 0.65, n = 25)" (Bottom-left: Nothing here)
4. "Promising cancer drug shows 30% tumor reduction, but p = 0.08 with n = 40" (Bottom-right: Need more data)

**Activity 2: Sample Size Investigation (10 minutes)**

Discuss: *"If you had unlimited research funding, why not always use huge sample sizes?"*

Lead students to understand that enormous samples detect trivially small effects, making everything "statistically significant" but not necessarily meaningful.

**Activity 3: Effect Size Discussion (10 minutes)**

Introduce effect size measures (like Cohen's d) as tools for assessing practical significance independent of sample size.

*"My tail's tingling—we're onto something!"* Sylvia says. *"Effect size tells you HOW BIG the effect is, while the p-value just tells you if it's REAL. You need both pieces of information!"*

### Assessment Questions

1. A study with n = 100,000 finds that drinking green tea is associated with living 0.5 days longer on average (p < 0.001). Is this result statistically significant? Is it practically significant? Explain.

2. A researcher tests a new anxiety medication with only 15 participants. The treatment group shows 45% improvement compared to 25% for placebo, but p = 0.15. Which quadrant does this fall into, and what should the researcher do next?

3. Why can't practical significance be determined from the p-value alone?

4. Explain how increasing sample size affects (a) statistical significance and (b) practical significance.

## References

- Chapter 19: Communication and Synthesis - Concepts: Statistical vs Practical Significance, Effect Size
- [Wikipedia: Statistical significance](https://en.wikipedia.org/wiki/Statistical_significance)
- [Wikipedia: Effect size](https://en.wikipedia.org/wiki/Effect_size)
- Cohen, J. (1988). Statistical Power Analysis for the Behavioral Sciences
