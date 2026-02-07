---
title: Combining Random Variables Visualizer
description: Interactive visualization showing how means and variances combine when adding or subtracting independent random variables. Demonstrates the key insight that variances always add.
image: /sims/combining-random-variables/combining-random-variables.png
---

# Combining Random Variables Visualizer

<iframe src="main.html" height="502px" scrolling="no"></iframe>

[Run the Combining Random Variables Visualizer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit this MicroSim in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Here's one of the trickiest concepts in random variables: when you combine independent random variables, the means behave as expected (add for sum, subtract for difference), but the variances ALWAYS ADD - even when you're subtracting!

This visualization helps you see why this is true and builds intuition for how combined distributions look.

## How to Use

1. **Drag the sliders** to adjust the mean and standard deviation of X and Y
2. **Switch between Sum and Difference** to see how the operation affects the result
3. **Watch the combined distribution** update in real-time
4. **Study the calculation panel** to see the formulas in action

## The Key Insight

When combining independent random variables:

**For Means:**

- E(X + Y) = E(X) + E(Y)
- E(X - Y) = E(X) - E(Y)

**For Variances:**

- Var(X + Y) = Var(X) + Var(Y)
- Var(X - Y) = Var(X) + Var(Y) **<- Same formula!**

Why do variances add even when subtracting? Because variability comes from both sources, regardless of whether we're adding or subtracting. The uncertainty doesn't cancel out - it compounds!

## Standard Deviation Formula

Since variances add, standard deviations combine "Pythagorean style":

\[
\sigma_{X \pm Y} = \sqrt{\sigma_X^2 + \sigma_Y^2}
\]

This means the combined SD is always LESS than the sum of the individual SDs (unless one is zero).

## Learning Objectives

After using this MicroSim, you'll be able to:

- Calculate the mean of a sum or difference of independent random variables
- Explain why variances add for both sums AND differences
- Compute the standard deviation of combined random variables
- Avoid the common mistake of thinking Var(X - Y) = Var(X) - Var(Y)

## Lesson Plan

### Introduction (3 minutes)

Ask: "If Quiz 1 has mean 75 and Quiz 2 has mean 80, what's the mean total score?" (Easy: 155) Then: "If the standard deviations are 10 and 12, what's the SD of the total?" (Tricky!)

### Guided Exploration (10 minutes)

1. Set both X and Y to have mean 50 and SD 10
2. Observe the sum: mean = 100, but SD is NOT 20
3. Calculate: SD = sqrt(100 + 100) = sqrt(200) = 14.14
4. Switch to difference - mean changes to 0, but SD stays the same!
5. This is the key insight: subtracting doesn't reduce variability

### Common Misconception

Many students think:

- Var(X + Y) = Var(X) + Var(Y) (Correct)
- Var(X - Y) = Var(X) - Var(Y) (WRONG!)

The visualization makes it clear why this is wrong - when you take a difference, the uncertainty from both variables still contributes to the overall uncertainty.

### Discussion Questions

1. Why doesn't variability cancel when we subtract random variables?
2. If X and Y have the same mean and SD, what is E(X - Y)? What is SD(X - Y)?
3. Can the combined SD ever be larger than the sum of individual SDs?

!!! tip "Sylvia Says"
    "Think of it like noise - when you add two noisy signals, the noise combines. When you subtract two noisy signals, the noise STILL combines! That's why variances always add. SD follows the Pythagorean theorem - it's like the hypotenuse of a right triangle!"

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/combining-random-variables/main.html" height="502px" scrolling="no"></iframe>
```

## Technical Notes

- Built with p5.js 1.11.10
- Uses canvas-based sliders and buttons
- Normal curves drawn using the PDF formula
- Responsive width design
- Drawing height: 400px, Control height: 100px

## References

- Chapter 13: Random Variables
- Concepts: Combining Random Variables, Sum of Random Variables, Difference of RVs, Variance of Random Variable
