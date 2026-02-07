---
title: CI Construction Walkthrough
description: Step-by-step interactive calculator for constructing confidence intervals for proportions.
image: /sims/ci-construction-walkthrough/ci-construction-walkthrough.png
---

# Confidence Interval Construction Walkthrough

<iframe src="main.html" height="522px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the CI Construction Walkthrough MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"Let's crack this nut!"* Sylvia encourages. *"Building a confidence interval might seem like a lot of steps, but once you see each piece, it all makes sense. Let's walk through it together!"*

This interactive tool guides students through all six steps of constructing a confidence interval for a population proportion:

1. **Check Conditions** - Verify the large counts condition
2. **Calculate Point Estimate** - Find p-hat = x/n
3. **Find Critical Value** - Look up z* for the confidence level
4. **Calculate Standard Error** - Compute SE using p-hat and n
5. **Calculate Margin of Error** - Multiply z* by SE
6. **Construct Interval** - Add and subtract ME from p-hat

## How to Use

1. **Enter sample data**: Click on the input boxes to type your values for x (successes) and n (sample size)
2. **Select confidence level**: Choose 90%, 95%, or 99%
3. **Step through**: Click "Next" to reveal each calculation step
4. **See the result**: At step 6, a visual number line shows the final interval
5. **Practice**: Use "Random Data" to generate new problems

## Key Insights

*"My tail's tingling - we're onto something!"* Sylvia notes:

- **Always check conditions first!** The large counts condition (both np and n(1-p) >= 10) ensures the normal approximation works
- **Each step builds on the previous** - understanding the flow helps you remember the formula
- **The visual at the end** shows exactly what the interval means on the number line
- **Practice with different values** to see how changes affect the final interval

### The Six-Step Process

| Step | What You Calculate | Formula |
|------|-------------------|---------|
| 1 | Check conditions | np >= 10 and n(1-p) >= 10 |
| 2 | Point estimate | p-hat = x / n |
| 3 | Critical value | z* from table (1.645, 1.960, or 2.576) |
| 4 | Standard error | SE = sqrt(p-hat(1 - p-hat) / n) |
| 5 | Margin of error | ME = z* x SE |
| 6 | Confidence interval | (p-hat - ME, p-hat + ME) |

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Verify the conditions needed for constructing a CI for proportions
2. Calculate each component of the confidence interval formula
3. Construct a complete confidence interval with correct interpretation
4. Visualize the final interval on a number line

### Target Audience

- AP Statistics students (high school)
- Introductory statistics college students
- Anyone learning about confidence interval construction

### Prerequisites

- Understanding of proportions and percentages
- Concept of standard error
- Familiarity with z* critical values

### Classroom Activities

**Activity 1: Guided First Problem (10 minutes)**

Use the default problem (x=124, n=200, 95% confidence):
1. Have students predict each calculation before clicking "Next"
2. Discuss: Why do we check conditions first?
3. Interpret the final interval in context

**Activity 2: What-If Analysis (15 minutes)**

Compare different scenarios:
1. Same data, different confidence levels (90% vs 95% vs 99%)
2. Same proportion, different sample sizes
3. Observe: What makes intervals wider or narrower?

**Activity 3: Random Problem Practice (15 minutes)**

1. Click "Random Data" to generate a new problem
2. Students calculate on paper first
3. Step through to verify each calculation
4. Repeat 3-5 times for practice

*"Don't worry - every statistician drops an acorn sometimes,"* Sylvia reassures. *"If you make a calculation error, just go back and check each step. The process is the same every time!"*

### Assessment Questions

1. A sample of 150 voters shows 78 support a candidate. Construct a 95% confidence interval for the true proportion of supporters.

2. Before constructing a CI, you find that np = 8 and n(1-p) = 42. Can you proceed? Why or why not?

3. You calculated SE = 0.035 and are using 95% confidence. What is the margin of error?

4. A confidence interval is (0.42, 0.58). What was the point estimate? What was the margin of error?

## References

- Chapter 15: Confidence Intervals - Concepts: CI for One Proportion, Conditions for CI Proportion
- [Khan Academy: Confidence intervals for proportions](https://www.khanacademy.org/math/statistics-probability/confidence-intervals-one-sample)
