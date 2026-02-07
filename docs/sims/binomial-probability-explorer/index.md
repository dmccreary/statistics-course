---
title: Binomial Probability Explorer
description: Interactive exploration of the binomial distribution, showing how the number of trials (n) and probability of success (p) affect the shape, center, and spread. Includes step-by-step formula calculation.
image: /sims/binomial-probability-explorer/binomial-probability-explorer.png
---

# Binomial Probability Explorer

<iframe src="main.html" height="602px" scrolling="no"></iframe>

[Run the Binomial Probability Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit this MicroSim in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The binomial distribution is one of the most important distributions in statistics, and this explorer helps you build intuition for how it works. Adjust the parameters and watch the distribution change shape before your eyes!

## How to Use

1. **Drag the n slider** to change the number of trials (1 to 50)
2. **Drag the p slider** to change the probability of success (0.01 to 0.99)
3. **Drag the k slider** to select a specific value and see its probability
4. **Hover over any bar** to see its exact probability
5. Use the **preset buttons** to see common patterns

### Preset Buttons

- **Fair Coin**: n=20, p=0.5 - perfectly symmetric distribution
- **Skewed Left**: n=20, p=0.8 - distribution concentrated on the right
- **Skewed Right**: n=20, p=0.2 - distribution concentrated on the left
- **Reset**: Return to default settings (n=10, p=0.5)

## Key Concepts

### The BINS Conditions

Before using the binomial distribution, verify:

- **B**inary outcomes (success or failure)
- **I**ndependent trials
- **N**umber of trials is fixed
- **S**ame probability for each trial

### The Binomial Formula

\[
P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}
\]

Where:

- \(\binom{n}{k} = \frac{n!}{k!(n-k)!}\) is the number of ways to choose k successes from n trials
- \(p^k\) is the probability of k successes
- \((1-p)^{n-k}\) is the probability of (n-k) failures

### Distribution Shape Patterns

- When **p = 0.5**: Distribution is symmetric
- When **p < 0.5**: Distribution is right-skewed (tail stretches right)
- When **p > 0.5**: Distribution is left-skewed (tail stretches left)
- As **n increases**: Distribution becomes more bell-shaped (approaches normal)

## Learning Objectives

After using this MicroSim, you'll be able to:

- Calculate binomial probabilities using the formula
- Predict how changing n and p affects the distribution shape
- Find the mean and standard deviation of a binomial distribution
- Identify when a distribution is symmetric vs. skewed
- Apply the binomial formula with actual values

## Lesson Plan

### Introduction (5 minutes)

Ask: "If you flip a fair coin 10 times, what's the probability of getting exactly 7 heads?" Use the explorer to find out!

### Guided Exploration (15 minutes)

1. **Symmetric case**: Set p = 0.5 and vary n from 5 to 50. Watch the distribution become more bell-shaped.

2. **Skewness**: With n = 20, slide p from 0.2 to 0.8. Notice how the direction of skewness changes.

3. **Formula verification**: For n = 10, p = 0.5, k = 7:
   - C(10,7) = 120
   - 0.5^7 = 0.0078125
   - 0.5^3 = 0.125
   - P(X = 7) = 120 * 0.0078125 * 0.125 = 0.1172

4. **Mean and SD**: Verify that mean = np and SD = sqrt(np(1-p))

### Discussion Questions

1. Why does the distribution become more symmetric as n increases?
2. What happens to the spread (SD) as p moves closer to 0 or 1?
3. Why must the BINS conditions be met to use this formula?

### Calculator Practice

On TI-83/84:

- **binompdf(n, p, k)** gives P(X = k)
- **binomcdf(n, p, k)** gives P(X <= k)

!!! tip "Sylvia Says"
    "The binomial distribution is like a recipe - once you know n and p, you can calculate the probability of any outcome. It's one of the most practical tools in your statistical toolkit!"

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/binomial-probability-explorer/main.html" height="602px" scrolling="no"></iframe>
```

## Technical Notes

- Built with p5.js 1.11.10
- Uses canvas-based sliders and buttons
- Binomial coefficient calculated using iterative method for stability
- Responsive width design
- Drawing height: 500px, Control height: 100px

## References

- Chapter 13: Random Variables
- Concepts: Binomial Setting, Binomial Conditions, Binomial Distribution, Binomial Probability, Binomial Formula, Binomial Mean, Binomial Standard Dev
