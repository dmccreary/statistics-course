---
title: Margin of Error Explorer
description: Interactive visualization showing how confidence level, sample size, and sample proportion affect the margin of error.
image: /sims/margin-of-error-explorer/margin-of-error-explorer.png
---

# Margin of Error Explorer

<iframe src="main.html" height="452px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Margin of Error Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"Let's crack this nut!"* Sylvia exclaims. *"The margin of error is the 'plus or minus' part of a confidence interval, and understanding what controls it is like understanding what makes my safety net wider or narrower when I'm jumping between branches!"*

This interactive visualization lets students explore the three factors that determine the margin of error:

- **Confidence Level**: Higher confidence = wider interval (bigger safety net)
- **Sample Size (n)**: Larger samples = narrower interval (more precision)
- **Sample Proportion (p-hat)**: Closer to 0.5 = wider interval (maximum variability)

## How to Use

1. **Drag the Confidence slider** (80% to 99%) to see how z* and ME change
2. **Drag the Sample Size slider** (20 to 500) to see the effect of more data
3. **Drag the p-hat slider** (0.1 to 0.9) to see how the proportion affects variability
4. **Watch the formula breakdown** update in real-time

## Key Insights

*"My tail's tingling - we're onto something!"* Sylvia observes:

- **Higher confidence level** requires a larger z* value, which increases ME
- **Larger sample size** decreases the standard error (SE), which decreases ME
- **p-hat = 0.5** maximizes the product p(1-p) = 0.25, giving the widest interval
- To **halve the margin of error**, you must **quadruple** the sample size!

### The Trade-off Triangle

| Want This | Change This | Consequence |
|-----------|-------------|-------------|
| Higher confidence | Increase confidence level | Wider interval |
| More precision | Increase sample size | More time/cost |
| Narrower interval | Accept lower confidence | Less certain |

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Calculate margin of error using the formula ME = z* x SE
2. Predict how changes in confidence level affect ME
3. Explain why larger samples produce smaller margins of error
4. Identify that p = 0.5 produces the maximum standard error

### Target Audience

- AP Statistics students (high school)
- Introductory statistics college students
- Anyone learning about confidence intervals

### Prerequisites

- Understanding of confidence intervals
- Concept of standard error
- Basic understanding of the normal distribution

### Classroom Activities

**Activity 1: Prediction Game (10 minutes)**

Before using the simulation:
1. Ask: "If I increase the confidence level from 90% to 99%, what happens to the margin of error?"
2. Ask: "If I double the sample size, does the ME get cut in half?"
3. Test predictions with the simulation

**Activity 2: The Cost of Confidence (10 minutes)**

1. Set p-hat = 0.50 and n = 100
2. Record ME at 90%, 95%, and 99% confidence
3. Calculate: How much wider is the 99% CI compared to the 90% CI?
4. Discuss: When is higher confidence worth the wider interval?

**Activity 3: Sample Size Investigation (15 minutes)**

1. Set confidence = 95% and p-hat = 0.50
2. Record ME at n = 25, 100, 400, and 900
3. Create a table and look for the pattern
4. Discover: To halve ME, you must quadruple n!

*"Now that's a data point worth collecting!"* Sylvia cheers. *"Understanding the margin of error formula gives you the power to design better studies!"*

### Assessment Questions

1. A poll reports a margin of error of 3%. If the pollsters wanted a margin of error of 1.5%, approximately how many times larger would their sample need to be?

2. Two polls both use n = 1000. Poll A finds p-hat = 0.50 and Poll B finds p-hat = 0.10. Which has the larger margin of error? Why?

3. A researcher has a limited budget. Explain the trade-off between confidence level and margin of error.

4. Why does p-hat = 0.5 produce the largest margin of error?

## References

- Chapter 15: Confidence Intervals - Concepts: Margin of Error, CI Width Factors
- [Wikipedia: Margin of error](https://en.wikipedia.org/wiki/Margin_of_error)
