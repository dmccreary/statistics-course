---
title: Bias vs. Variability Target Visualization
description: Interactive target diagram illustrating the difference between bias (systematic error) and variability (random error) in sampling.
image: /sims/bias-variability-target/bias-variability-target.png
---

# Bias vs. Variability Target Visualization

<iframe src="main.html" height="452px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Bias vs. Variability Target MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"Let's crack this nut!"* Sylvia says. *"Understanding the difference between bias and variability is like learning to throw darts. You can be consistently off-target (bias), wildly scattered (high variability), or—ideally—tightly clustered around the bullseye!"*

This interactive visualization uses the classic **target metaphor** to help students understand two fundamental concepts in sampling:

- **Bias** (accuracy): How far, on average, your sample estimates are from the true population parameter
- **Variability** (precision): How spread out your sample estimates are from each other

### The Four Scenarios

| Scenario | Bias | Variability | Description |
|----------|------|-------------|-------------|
| 1 | Low | Low | **Ideal!** Estimates cluster tightly around the truth |
| 2 | Low | High | Accurate on average, but estimates scatter widely |
| 3 | High | Low | Consistently wrong in the same direction |
| 4 | High | High | Neither accurate nor precise—the worst case |

## How to Use

1. **Click Scenario buttons (1-4)** to switch between different bias/variability combinations
2. **Click "New Sample"** to generate a fresh set of 20 sample estimates
3. **Observe the pattern** of dots relative to the bullseye (true parameter)
4. **Notice the orange X** showing the mean of all estimates

## Key Insights

- **Low Bias**: The mean of sample estimates (orange X) lands near the bullseye
- **High Bias**: The mean is consistently off-center, even with many samples
- **Low Variability**: Dots cluster tightly together
- **High Variability**: Dots spread widely

*"Here's the crucial insight,"* Sylvia explains. *"Bias is sneaky because taking more samples doesn't fix it! If your sampling method is biased, you just get more confidently wrong. But variability? That can be reduced by increasing sample size."*

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/bias-variability-target/main.html" height="452px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Define bias as systematic error that doesn't average out
2. Define variability as random error that spreads estimates around the mean
3. Distinguish between accuracy (low bias) and precision (low variability)
4. Explain why biased samples are problematic even with large sample sizes
5. Connect the target metaphor to real-world sampling scenarios

### Target Audience

- AP Statistics students (high school)
- Introductory statistics college students
- Anyone learning about sampling and survey design

### Prerequisites

- Understanding of population vs. sample
- Concept of sample estimates vs. population parameters
- Basic idea of what "average" means

### Classroom Activities

**Activity 1: Predict and Observe (10 minutes)**

1. Before showing the simulation, ask: "If we took 20 samples from a biased sampling method, where would the dots cluster?"
2. Show Scenario 3 (High Bias, Low Variability) and discuss
3. Ask: "Will taking more samples fix this problem?" Generate new samples to demonstrate

**Activity 2: Real-World Connections (15 minutes)**

Connect each scenario to real sampling situations:

- **Scenario 1**: A well-designed random sample with large sample size
- **Scenario 2**: A small random sample (unbiased but variable)
- **Scenario 3**: Surveying only library users about study habits (biased, precise)
- **Scenario 4**: A small convenience sample (biased and variable)

**Activity 3: The Fix (10 minutes)**

Discuss how to address each problem:

- High variability → Increase sample size
- High bias → Change the sampling method

*"Don't worry—every statistician drops an acorn sometimes,"* Sylvia reassures. *"The important thing is recognizing when your method is biased so you can fix it!"*

### Assessment Questions

1. A researcher consistently overestimates average income by surveying mall shoppers. Is this a bias problem or a variability problem?

2. Two students each flip a coin 10 times. One gets 4 heads, the other gets 6 heads. Is this difference due to bias or variability?

3. Why doesn't increasing sample size fix a biased sampling method?

4. In the target metaphor, what does the bullseye represent? What do the dots represent?

## References

- Chapter 11: Sampling and Bias - Concepts: Bias, Unbiased Estimator, Biased Estimator
- [Wikipedia: Accuracy and precision](https://en.wikipedia.org/wiki/Accuracy_and_precision)
- [Khan Academy: Sampling and Bias](https://www.khanacademy.org/math/statistics-probability/designing-studies)
