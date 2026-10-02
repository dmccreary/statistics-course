---
title: Bayes' Theorem Visualizer
description: Icon array and tree diagram of 1,000 people showing how the base rate, sensitivity, and specificity of a test determine the probability of disease given a positive result.
image: /sims/bayes-theorem-visualizer/bayes-theorem-visualizer.png
og:image: /sims/bayes-theorem-visualizer/bayes-theorem-visualizer.png
twitter:image: /sims/bayes-theorem-visualizer/bayes-theorem-visualizer.png
social:
   cards: false
quality_score: 98
---

# Bayes' Theorem Visualizer

<iframe src="main.html" height="532px" width="100%" scrolling="no"></iframe>

[Run the Bayes' Theorem Visualizer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A test that is 95% accurate for people with a disease can still be wrong most of the time when it comes back positive. The reason is the base rate: when a disease is rare, the small percentage of false positives among the many healthy people outnumbers the true positives.

This MicroSim shows 1,000 people as an icon array. Red icons have the disease, teal icons do not, and bright outlined icons tested positive. Three sliders control the prior probability (base rate), the sensitivity, and the specificity. The panel on the right applies Bayes' theorem to the current values, and the same information can be viewed as a tree diagram with counts. With the default values (2%, 95%, 90%) the result matches the chapter: only 16.2% of positive tests are true positives.

The calculation panel uses the exact slider values. The icon array shows whole people, so its counts are rounded.

## How to Use

1. Read the default picture: 20 of 1,000 people have the disease, 19 of them test positive, and 98 healthy people also test positive.
2. Click **Group by Test Result** to gather all the positive tests together. Compare the number of red and teal icons in the positive group.
3. Drag **Prior P(Disease)** and watch the probability of disease given a positive test change.
4. Drag **Sensitivity** and **Specificity**. Which one has the bigger effect on the result when the disease is rare?
5. Click **Tree Diagram** to see the same numbers as a tree with counts on every branch.
6. Click **Reset** to return to the default values.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/bayes-theorem-visualizer/main.html"
        height="532px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Analyze how the prior probability, sensitivity, and specificity affect P(Disease | Positive) (Analyze)
2. Apply Bayes' theorem to calculate a posterior probability from its three inputs (Apply)
3. Explain base rate neglect using counts of true positives and false positives (Understand)

### Bloom's Taxonomy Level

**Analyze** - students analyze.

### Grade Level

9-12 (AP Statistics)

### Duration

15-25 minutes

### Prerequisites

- Conditional probability and the general multiplication rule
- Tree diagrams

### Activities

1. **Predict (5 min):** Before opening the MicroSim, students guess the chance that a person with a positive test has the disease, given a 95% sensitive test. Collect the guesses.
2. **Explore (10 min):** Students record P(Disease | Positive) for priors of 1%, 2%, 10%, 25%, and 50% with the test characteristics fixed, then graph the results.
3. **Compare the Levers (10 min):** With the prior at 2%, students raise sensitivity to 99%, then reset and raise specificity to 99%. They explain which change helps more and why.

### Discussion Questions

- Why does specificity matter more than sensitivity when the disease is rare?
- At what prior does a positive test become more likely right than wrong with the default test?
- How does this explain why doctors often order a second test after a positive screening result?

### Assessment

- Student computes P(Disease | Positive) by hand for a new set of values and checks it with the MicroSim
- Student explains the result using counts out of 1,000 people
- Student identifies base rate neglect in a news story or advertisement

### Common Misconceptions

- P(Disease | Positive) equals the sensitivity of the test
- A highly accurate test cannot produce mostly false positives
- The base rate does not matter once you have a test result

## References

1. [Chapter 10: Conditional Probability](../../chapters/10-conditional-probability/index.md) - section "Bayes' Theorem: Reversing the Condition"
2. [Bayes' theorem](https://en.wikipedia.org/wiki/Bayes%27_theorem) - Wikipedia article with the statement of the theorem and testing examples
3. [Base rate fallacy](https://en.wikipedia.org/wiki/Base_rate_fallacy) - Wikipedia article on ignoring the prior probability
4. [Sensitivity and specificity](https://en.wikipedia.org/wiki/Sensitivity_and_specificity) - Wikipedia article defining the two measures of test accuracy
