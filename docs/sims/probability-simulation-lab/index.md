---
title: Probability Simulation Lab
description: Interactive simulation for estimating probabilities through repeated trials, demonstrating how empirical probability converges to theoretical probability.
image: /sims/probability-simulation-lab/probability-simulation-lab.png
---

# Probability Simulation Lab

<iframe src="main.html" height="502px" width="100%" scrolling="no" style="border: 1px solid silver; overflow: hidden;"></iframe>

[Run the Probability Simulation Lab Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit this MicroSim in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This interactive simulation allows students to estimate probabilities through repeated trials. Students can choose from preset scenarios (Free Throws, Coin Flips, Dice Rolls) and observe how the estimated probability converges toward the theoretical probability as the number of trials increases.

## How to Use

1. **Select a scenario** from the dropdown menu
2. **Click "Run 1"** to see a single trial with detailed outcomes
3. **Click "Run 100" or "Run 1000"** to quickly accumulate trials
4. **Adjust speed** to control animation rate
5. **Watch the graph** as the estimated probability converges

## Scenarios

- **Free Throws**: P(success) = 0.7, success = at least 4 makes in 5 shots
- **Coin Flips**: P(success) = 0.5, success = at least 2 heads in 3 flips
- **Dice Rolls**: P(success) = 1/6, success = at least 1 six in 6 rolls

## Learning Objectives

After using this MicroSim, students will be able to:

- Design simulations to estimate probabilities
- Understand how more trials lead to more accurate estimates
- Compare empirical probability to theoretical probability
- Apply the concept of convergence to real-world scenarios

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/probability-simulation-lab/main.html" height="502px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Introduction (5 minutes)
Discuss why simulations are useful when theoretical calculations are complex. Introduce the scenarios.

### Guided Exploration (10 minutes)
Run simulations together, making predictions about convergence at 10, 100, and 1000 trials.

### Practice Activities (15 minutes)
Have students run their own simulations and record how close their estimate gets to the theoretical value at different trial counts.

### Assessment
Students explain why simulations work and describe the relationship between trial count and estimate accuracy.

## References

- Chapter 9: Probability Fundamentals
- Concepts: Simulation, Designing Simulations
