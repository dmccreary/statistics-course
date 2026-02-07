---
title: Probability Distribution Bar Chart
description: An interactive bar chart showing the probability distribution for rolling a fair six-sided die, demonstrating that each outcome has equal probability of 1/6.
image: /sims/probability-distribution-bar/probability-distribution-bar.png
---

# Probability Distribution Bar Chart

<iframe src="main.html" height="452px" scrolling="no"></iframe>

[Run the Probability Distribution Bar Chart MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit this MicroSim in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Welcome! This interactive visualization shows the probability distribution for rolling a fair six-sided die. Each bar represents the probability of rolling that number, and since all outcomes are equally likely, each bar has the same height of 1/6 (approximately 0.167).

This is what statisticians call a **uniform distribution** - every outcome has the same probability!

## How to Use

1. **Hover over any bar** to see the exact probability for that outcome
2. **Toggle between Fractions and Decimals** to see probabilities in your preferred format
3. **Notice the dashed reference line** at 1/6 showing the equal probability level

## Key Concepts

- **Probability Distribution**: A complete description of all possible values and their probabilities
- **Uniform Distribution**: When all outcomes are equally likely
- **Valid Distribution**: All probabilities must be between 0 and 1, and must sum to 1
- **P(X = x)**: The notation for "probability that X equals x"

## Learning Objectives

After using this MicroSim, you'll be able to:

- Interpret a probability distribution bar chart
- Explain what makes a distribution "uniform"
- Verify that probabilities sum to 1 (1/6 + 1/6 + 1/6 + 1/6 + 1/6 + 1/6 = 1)
- Read probabilities in both fraction and decimal form

## Lesson Plan

### Introduction (3 minutes)

Ask students: "If you roll a fair die, what's the probability of getting a 4?" Then extend: "What about getting any specific number?" This leads into the idea that all six outcomes are equally likely.

### Guided Exploration (5 minutes)

1. Point out that all bars have the same height
2. Have students hover over each bar to confirm the probability
3. Switch between fractions and decimals to see both representations
4. Verify that 6 x (1/6) = 1 (all probabilities sum to 1)

### Discussion Questions

1. Why are all the bars the same height?
2. If the die were loaded (unfair), how would this chart look different?
3. What's the probability of rolling an even number? (Add up P(2) + P(4) + P(6))

### Connection to Random Variables

This chart shows the probability distribution of the random variable X = "number showing on a die roll." The random variable converts outcomes (1, 2, 3, 4, 5, 6) into numerical values we can calculate with.

!!! tip "Sylvia Says"
    "A probability distribution is like a complete recipe for randomness - it tells you every possible outcome and how likely each one is. For a fair die, the recipe is simple: each number has an equal 1/6 chance!"

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/probability-distribution-bar/main.html" height="452px" scrolling="no"></iframe>
```

## Technical Notes

- Built with p5.js 1.11.10
- Uses canvas-based controls for iframe compatibility
- Responsive width design
- Drawing height: 350px, Control height: 100px

## References

- Chapter 13: Random Variables
- Concepts: Discrete Random Variable, Probability Distribution, Valid Distribution
