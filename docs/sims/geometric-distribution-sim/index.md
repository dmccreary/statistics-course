---
title: Geometric Distribution Simulator
description: Interactive simulation that runs trials until first success, building up the geometric distribution empirically and comparing to theoretical probabilities.
image: /sims/geometric-distribution-sim/geometric-distribution-sim.png
---

# Geometric Distribution Simulator

<iframe src="main.html" height="502px" scrolling="no"></iframe>

[Run the Geometric Distribution Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit this MicroSim in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The geometric distribution answers the question: "How many trials until the first success?" This simulator lets you run experiments and watch the empirical distribution converge to the theoretical geometric distribution.

Each experiment continues until a success occurs (shown as green "S"), counting all the failures (shown as auburn "F") along the way.

## How to Use

1. **Adjust the probability slider** to set P(success) for each trial
2. **Click "Run 1"** to see a single experiment with its trial sequence
3. **Click "Run 10" or "Run 100"** to accumulate data faster
4. **Watch the histogram** build up and compare green bars (empirical) to orange markers (theoretical)
5. **Track the empirical mean** and see it converge to 1/p

## Key Concepts

### The Geometric Distribution

If X = number of trials until first success, then:

\[
P(X = k) = (1-p)^{k-1} \cdot p
\]

- Fail (k-1) times: \((1-p)^{k-1}\)
- Then succeed on trial k: \(p\)

### Expected Value (Mean)

The expected number of trials until first success is beautifully simple:

\[
\mu = \frac{1}{p}
\]

| P(success) | Expected Trials |
|------------|----------------|
| 0.5 | 2 |
| 0.25 | 4 |
| 0.1 | 10 |
| 0.05 | 20 |

### Geometric vs. Binomial

| Feature | Binomial | Geometric |
|---------|----------|-----------|
| Question | How many successes in n trials? | How many trials until first success? |
| Fixed? | n is fixed | n is random |
| Values | 0, 1, 2, ..., n | 1, 2, 3, ... (infinite) |
| Mean | np | 1/p |

## Learning Objectives

After using this MicroSim, you'll be able to:

- Calculate geometric probabilities using the formula
- Understand why the mean is 1/p
- Compare empirical results to theoretical predictions
- Distinguish between binomial and geometric settings
- Observe the Law of Large Numbers in action

## Lesson Plan

### Introduction (3 minutes)

Ask: "If I'm searching for a four-leaf clover and there's a 1 in 10 chance under each clover, how many clovers should I expect to check?" (Answer: 10)

### Guided Exploration (10 minutes)

1. **Start with p = 0.3**: Run 1 experiment, observe the sequence
2. **Run 10 experiments**: Start building the histogram
3. **Run 100 experiments**: Watch the empirical distribution take shape
4. **Check the mean**: It should be approaching 1/0.3 = 3.33
5. **Try p = 0.5**: Mean should approach 2

### Observations to Make

- The distribution is always right-skewed (tail stretches right)
- k = 1 always has the highest probability
- As p decreases, the distribution spreads out more
- With enough experiments, empirical matches theoretical

### Discussion Questions

1. Why is the geometric distribution always right-skewed?
2. If p is very small (rare event), what happens to the expected waiting time?
3. Why does the mean equal 1/p? (Think about it intuitively)

!!! tip "Sylvia Says"
    "When I'm searching for the perfect acorn, sometimes I find one under the first tree, sometimes it takes 10 tries. The geometric distribution captures that uncertainty perfectly. On average, if p = 0.2, I check 5 trees. Some days I'm lucky, some days... well, I keep searching!"

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/geometric-distribution-sim/main.html" height="502px" scrolling="no"></iframe>
```

## Technical Notes

- Built with p5.js 1.11.10
- Uses canvas-based controls
- Experiments run in batches for efficiency
- Shows last 30 trials in sequence display
- Trials > 20 are lumped into the "20+" category
- Drawing height: 400px, Control height: 100px

## References

- Chapter 13: Random Variables
- Concepts: Geometric Setting, Geometric Distribution, Geometric Probability, Geometric Mean
