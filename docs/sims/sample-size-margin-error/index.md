---
title: Sample Size and Margin of Error Explorer
description: Interactive visualization demonstrating the relationship between sample size and margin of error for proportions with diminishing returns.
image: /sims/sample-size-margin-error/sample-size-margin-error.png
---

# Sample Size and Margin of Error Explorer

<iframe src="main.html" height="482px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Sample Size Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"Let's crack this nut!"* Sylvia says with determination. *"Sample size is one of the most important decisions a researcher makes, and understanding its relationship with margin of error helps you make smart choices about study design."*

This interactive visualization demonstrates a crucial relationship:

\[
\text{Margin of Error} = z^* \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}
\]

### Key Insight: Diminishing Returns

Notice the shape of the curve - margin of error decreases rapidly at first, then levels off. This means:

- Going from n=25 to n=100 **dramatically** reduces margin of error
- Going from n=900 to n=1600 barely changes it

**Rule of thumb**: To cut the margin of error in half, you need to **quadruple** your sample size!

## How to Use

1. **Drag the sample size slider** (logarithmic scale from 10 to 2000)
2. **Adjust the proportion estimate** (p-hat from 0.1 to 0.9)
3. **Select a confidence level** (90%, 95%, or 99%)
4. **Observe the curve** to see your current position
5. **Watch the confidence interval** update in real-time

## Key Insights

*"Here's what trips up a lot of folks,"* Sylvia explains. *"They think 'more is always better' with sample size. And while that's technically true, the benefits shrink quickly. At some point, the extra cost isn't worth the tiny gain in precision."*

### The Math Behind It

The margin of error contains \( \sqrt{n} \) in the denominator, not \( n \). This is why:

- \( n = 100 \): \( \sqrt{100} = 10 \)
- \( n = 400 \): \( \sqrt{400} = 20 \) (4× the sample, 2× the precision)
- \( n = 1600 \): \( \sqrt{1600} = 40 \) (16× the sample, 4× the precision)

### Effect of p-hat

Notice that margin of error is largest when p-hat = 0.5 and smallest near 0 or 1. This is why researchers often assume p-hat = 0.5 when planning studies - it gives the most conservative (largest) margin of error estimate.

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/sample-size-margin-error/main.html" height="482px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Calculate margin of error for a proportion given sample size, p-hat, and confidence level
2. Predict how margin of error changes when sample size increases
3. Explain why you need to quadruple sample size to halve margin of error
4. Determine an appropriate sample size for a desired margin of error
5. Understand the concept of diminishing returns in sample size decisions

### Target Audience

- AP Statistics students (high school)
- Introductory statistics college students
- Research methods students
- Survey designers and pollsters

### Prerequisites

- Understanding of confidence intervals
- Concept of margin of error
- Basic understanding of proportions
- Familiarity with the normal distribution

### Classroom Activities

**Activity 1: The Quadrupling Rule (10 minutes)**

1. Set p-hat = 0.5, confidence = 95%, n = 100
2. Record the margin of error
3. Predict: What will ME be at n = 400?
4. Check your prediction
5. Verify: Is it approximately half?

**Activity 2: Poll Planning (15 minutes)**

Scenario: A news organization wants to conduct a political poll with a margin of error of 3%.

1. Set p-hat = 0.5 (worst case scenario)
2. Set confidence level to 95%
3. Find the minimum sample size needed
4. Discuss: What are the practical considerations beyond just ME?

**Activity 3: Cost-Benefit Analysis (15 minutes)**

A company can survey customers at $5 per response. Their budget is $5,000.

1. What's the maximum sample size? (n = 1000)
2. What margin of error does this give at p-hat = 0.5?
3. How much would they need to spend to cut ME in half?
4. Discuss: Is it worth it?

*"Time to squirrel away this knowledge!"* Sylvia concludes. *"Smart researchers balance precision with practicality."*

### Assessment Questions

1. A poll of 400 registered voters found 52% support a candidate. Calculate the margin of error at 95% confidence.

2. If a researcher wants a margin of error of 2% at 95% confidence (assuming p-hat = 0.5), approximately what sample size is needed?

3. A political poll with n = 1,000 has a margin of error of about 3%. How large would the sample need to be to achieve a 1.5% margin of error?

4. Why is margin of error largest when p-hat = 0.5?

5. Explain why simply "getting more data" has diminishing returns for reducing margin of error.

## References

- Chapter 19: Communication and Synthesis - Concept: Sample Size Impact
- Chapter 15: Confidence Intervals - Margin of error calculations
- [Wikipedia: Margin of error](https://en.wikipedia.org/wiki/Margin_of_error)
- [Pew Research: Margin of Error Explainer](https://www.pewresearch.org/short-reads/2016/09/08/understanding-the-margin-of-error-in-election-polls/)
