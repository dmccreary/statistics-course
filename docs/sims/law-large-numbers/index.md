---
title: Law of Large Numbers Demonstrator
description: Interactive visualization demonstrating how empirical probability converges to theoretical probability as the number of trials increases.
image: /sims/law-large-numbers/law-large-numbers.png
---

# Law of Large Numbers Demonstrator

<iframe src="main.html" height="452px" width="100%" scrolling="no" style="border: 1px solid silver; overflow: hidden;"></iframe>

[Run the Law of Large Numbers Demonstrator Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit this MicroSim in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This interactive demonstration shows the Law of Large Numbers in action. Students can set the true probability P(H) using a slider and then flip virtual coins to observe how the observed proportion converges to the true probability as the number of trials increases. The convergence graph uses color coding to show how close the current proportion is to the true value.

## How to Use

1. **Set the true probability** P(H) using the slider (default 0.5)
2. **Click "Flip 1"** to see individual coin flips
3. **Click "Flip 10", "Flip 100"** to quickly accumulate trials
4. **Click "Flip Until Stable"** to run until within 0.01 of true P
5. **Observe the graph** showing convergence over time
6. **Watch the color** change from red (far from P) to green (close to P)

## Key Concepts

- **Law of Large Numbers**: As trials increase, the observed proportion converges to the true probability
- **Short-run variability**: Early results can deviate significantly from the true probability
- **Long-run stability**: With enough trials, the proportion stabilizes near the true value

## Learning Objectives

After using this MicroSim, students will be able to:

- Explain the Law of Large Numbers in their own words
- Observe how short-term randomness becomes long-term regularity
- Avoid the Gambler's Fallacy (past results don't affect future independent trials)
- Understand why sample size matters for reliable estimates

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/law-large-numbers/main.html" height="452px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Introduction (5 minutes)
Ask: "If you flip a fair coin 10 times, will you always get exactly 5 heads?" Lead into the concept of variability.

### Guided Exploration (10 minutes)
Demonstrate with different true probabilities. Note how the graph "settles down" with more trials.

### Practice Activities (10 minutes)
Have students predict how many trials they'll need to get within 0.05 of the true probability for different P values.

### Common Misconceptions
Address the Gambler's Fallacy: Getting 5 heads in a row doesn't make tails "due" on the next flip.

### Assessment
Students explain why casinos always win in the long run, connecting to the Law of Large Numbers.

## References

- Chapter 9: Probability Fundamentals
- Concepts: Law of Large Numbers
