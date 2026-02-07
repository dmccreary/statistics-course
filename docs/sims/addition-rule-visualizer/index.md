---
title: Addition Rule Visualizer
description: Interactive Venn diagram for visualizing and calculating P(A or B) using the addition rule, with support for mutually exclusive events.
image: /sims/addition-rule-visualizer/addition-rule-visualizer.png
---

# Addition Rule Visualizer

<iframe src="main.html" height="452px" width="100%" scrolling="no" style="border: 1px solid silver; overflow: hidden;"></iframe>

[Run the Addition Rule Visualizer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit this MicroSim in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This interactive visualization demonstrates the addition rule for probability using a dynamic Venn diagram. Students can adjust P(A), P(B), and P(A∩B) using sliders and immediately see how these values affect P(A or B). The mutually exclusive toggle shows the special case where P(A∩B) = 0.

## How to Use

1. **Adjust the sliders** for P(A), P(B), and P(A∩B)
2. **Observe the Venn diagram** update to show the relationship between events
3. **Check "Mutually Exclusive"** to see what happens when events can't occur together
4. **Toggle "Show Steps"** to see the full calculation

## Key Formulas

- **General Addition Rule**: P(A or B) = P(A) + P(B) - P(A and B)
- **For Mutually Exclusive Events**: P(A or B) = P(A) + P(B)

## Learning Objectives

After using this MicroSim, students will be able to:

- Apply the addition rule to calculate P(A or B)
- Understand why we subtract P(A∩B) to avoid double-counting
- Recognize when events are mutually exclusive and apply the simplified rule
- Visualize probability relationships using Venn diagrams

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/addition-rule-visualizer/main.html" height="452px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Introduction (5 minutes)
Review the concept of "or" in probability (inclusive or). Explain why simply adding probabilities can lead to overcounting.

### Guided Exploration (10 minutes)
Walk through examples with different P(A), P(B), and P(A∩B) values. Show how the intersection affects the total.

### Practice Activities (10 minutes)
Give students specific probability scenarios and have them predict P(A or B) before checking with the visualization.

### Assessment
Students explain in their own words why we subtract the intersection and when we don't need to.

## References

- Chapter 9: Probability Fundamentals
- Concepts: Addition Rule, General Addition Rule, Mutually Exclusive Events
