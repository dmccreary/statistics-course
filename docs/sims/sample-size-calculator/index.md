---
title: Sample Size Calculator
description: Interactive calculator for determining the sample size needed to achieve a desired margin of error.
image: /sims/sample-size-calculator/sample-size-calculator.png
---

# Sample Size Calculator

<iframe src="main.html" height="402px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Sample Size Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"Acorn for your thoughts?"* Sylvia muses. *"When you're planning a study, one of the most important questions is: How many individuals do I need to sample? Too few and your interval is too wide to be useful. Too many and you've wasted resources. Let's find that sweet spot!"*

This calculator helps determine the required sample size to achieve a desired margin of error for a confidence interval about a proportion.

### The Formula

Starting with the margin of error formula and solving for n:

\[
n = \left(\frac{z^*}{ME}\right)^2 \cdot \hat{p}(1-\hat{p})
\]

### The p Problem

We need p-hat to calculate n, but we don't have data yet! Two solutions:

1. **Conservative approach**: Use p = 0.5 (maximizes sample size, guarantees the ME)
2. **Prior estimate**: Use a value from previous research or pilot study

## How to Use

1. **Set desired margin of error** using the slider (1% to 10%)
2. **Choose confidence level** (90%, 95%, or 99%)
3. **Select proportion approach**:
   - Conservative (p = 0.5) for guaranteed results
   - Custom to use a prior estimate
4. **Read the required sample size** (always rounded UP)

## Key Insights

*"My tail's tingling - we're onto something!"* Sylvia observes:

- **Halving the margin of error requires quadrupling the sample size!** (because ME is under a square root)
- **p = 0.5 is the safest choice** when you don't know the true proportion
- **Higher confidence requires larger samples** (larger z* value)
- **Always round UP** to ensure you meet your ME goal

### Sample Size Rules of Thumb

| Desired ME | n (95% conf, p=0.5) | Example Use |
|------------|---------------------|-------------|
| 10% | 97 | Quick informal poll |
| 5% | 385 | Standard survey |
| 3% | 1,068 | News organization poll |
| 2% | 2,401 | High-precision research |
| 1% | 9,604 | Very precise study |

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Calculate the sample size needed for a given margin of error
2. Explain why p = 0.5 is the conservative choice
3. Understand the quadrupling rule for halving margin of error
4. Make informed decisions about study design trade-offs

### Target Audience

- AP Statistics students (high school)
- Introductory statistics college students
- Anyone designing surveys or studies

### Prerequisites

- Understanding of margin of error
- Concept of confidence intervals
- Basic algebra (solving equations)

### Classroom Activities

**Activity 1: The Quadrupling Discovery (10 minutes)**

1. Set confidence = 95%, conservative p = 0.5
2. Record n for ME = 4%
3. Record n for ME = 2%
4. Verify: Is the second n about 4 times the first?
5. Try ME = 1% - is it 4x the 2% sample size?

**Activity 2: Poll Planning (15 minutes)**

Scenario: Your school newspaper wants to poll students about a new policy.

1. If you can only survey 100 students, what ME can you achieve?
2. If you need ME = 5%, how many students must you survey?
3. If you want ME = 3% at 99% confidence, how many?
4. Discuss: What are realistic constraints?

**Activity 3: Conservative vs. Estimated (10 minutes)**

1. Use conservative (p = 0.5), ME = 3%, 95% confidence - note n
2. Switch to custom p = 0.20 (prior research says about 20% will answer "yes")
3. How much smaller is the required sample size?
4. Discuss: When is it safe to use a prior estimate?

*"Time to squirrel away this knowledge!"* Sylvia concludes. *"Planning sample size before collecting data is one of the most practical skills in statistics. It saves time, money, and headaches!"*

### Assessment Questions

1. A researcher wants a margin of error of 4% at 95% confidence with no prior estimate of p. What sample size is needed?

2. If a poll uses n = 1,000 at 95% confidence with p = 0.5, what is the expected margin of error?

3. Why does using p = 0.5 give a "conservative" (larger) sample size?

4. A marketing team has budget for 500 surveys. What margin of error can they expect at 95% confidence?

## References

- Chapter 15: Confidence Intervals - Concepts: Determining Sample Size
- [Wikipedia: Sample size determination](https://en.wikipedia.org/wiki/Sample_size_determination)
