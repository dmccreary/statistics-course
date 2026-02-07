---
title: Critical Value Visualizer
description: Interactive visualization showing how z* critical values correspond to areas under the standard normal curve.
image: /sims/critical-value-visualizer/critical-value-visualizer.png
---

# Critical Value Visualizer

<iframe src="main.html" height="422px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Critical Value Visualizer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"Let's crack this nut!"* Sylvia exclaims. *"Those z* values like 1.96 seem to appear out of nowhere, but they actually come from a very logical place - the normal curve!"*

This visualization shows exactly where critical values (z*) come from by displaying:

- The **middle region** (green) representing the confidence level
- The **tail regions** (orange) representing alpha/2 on each side
- The **vertical dashed lines** at -z* and +z* that divide the areas

### Where Do Critical Values Come From?

For a **95% confidence interval**:

1. We want the middle 95% of the normal curve
2. That leaves 5% total in the tails (alpha = 0.05)
3. Split equally: 2.5% in each tail
4. Find the z-score with 2.5% above it: z* = 1.96

## How to Use

1. **Click preset buttons** (90%, 95%, 99%) to see common critical values
2. **Drag the custom slider** to explore any confidence level from 80% to 99.9%
3. **Watch the z* value** change as the confidence level changes
4. **Observe the tail areas** shrink as confidence increases

## Key Insights

*"My tail's tingling - we're onto something!"* Sylvia notes:

- **Higher confidence** requires going further out on the curve (larger z*)
- The **tail areas** (alpha/2) get smaller as confidence increases
- z* = 1.96 is special because it captures exactly 95% of the middle area
- The relationship is **nonlinear**: going from 95% to 99% requires a much bigger increase in z* than going from 90% to 95%

### Common Critical Values

| Confidence Level | Alpha | Each Tail | z* Value |
|-----------------|-------|-----------|----------|
| 90% | 0.10 | 0.05 | 1.645 |
| 95% | 0.05 | 0.025 | 1.960 |
| 99% | 0.01 | 0.005 | 2.576 |

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Identify critical values for common confidence levels (90%, 95%, 99%)
2. Explain the relationship between confidence level and z* value
3. Connect critical values to areas under the standard normal curve
4. Calculate the tail area (alpha/2) from a given confidence level

### Target Audience

- AP Statistics students (high school)
- Introductory statistics college students
- Anyone learning about confidence intervals

### Prerequisites

- Understanding of the standard normal distribution
- Concept of area under a curve as probability
- Basic understanding of z-scores

### Classroom Activities

**Activity 1: Discover the Pattern (10 minutes)**

1. Use the 90% preset and note z* = 1.645
2. Use the 95% preset and note z* = 1.960
3. Use the 99% preset and note z* = 2.576
4. Question: Why does z* increase as confidence increases?

**Activity 2: Find the 80% Critical Value (10 minutes)**

1. Use the custom slider to find 80% confidence
2. Record the z* value
3. Verify: 80% means 10% in each tail
4. Look up z = 1.28 in a z-table to confirm

**Activity 3: The Extremes (10 minutes)**

Explore using the custom slider:
- What happens as confidence approaches 100%? (z* goes to infinity!)
- What happens at very low confidence like 80%? (z* gets smaller)
- Why can't we have 100% confidence? (Would need infinite width)

*"Now that's a data point worth collecting!"* Sylvia celebrates. *"Understanding where critical values come from makes them much less mysterious!"*

### Assessment Questions

1. What is the critical value z* for a 95% confidence interval? What does this number represent on the normal curve?

2. If the confidence level is 90%, what is alpha? What is alpha/2?

3. Why is the z* value for 99% confidence (2.576) so much larger than for 95% confidence (1.960)?

4. A researcher wants to use 98% confidence. Estimate the z* value (between 1.96 and 2.576).

## References

- Chapter 15: Confidence Intervals - Concepts: Critical Value, Z Critical Values
- [Wikipedia: Standard normal table](https://en.wikipedia.org/wiki/Standard_normal_table)
