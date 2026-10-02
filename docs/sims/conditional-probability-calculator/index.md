---
title: Conditional Probability Calculator
description: Enter probabilities or counts for A, B, and A and B to see the conditional probability formula applied step by step, with a proportional Venn diagram.
image: /sims/conditional-probability-calculator/conditional-probability-calculator.png
og:image: /sims/conditional-probability-calculator/conditional-probability-calculator.png
twitter:image: /sims/conditional-probability-calculator/conditional-probability-calculator.png
social:
   cards: false
quality_score: 98
---

# Conditional Probability Calculator

<iframe src="main.html" height="518px" width="100%" scrolling="no"></iframe>

[Run the Conditional Probability Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This calculator applies the conditional probability formula

\[
P(A \mid B) = \frac{P(A \text{ and } B)}{P(B)}
\]

one visible step at a time. Type probabilities, or switch to counts as you would read them from a two-way table. The formula fills in as you type, the result appears in large orange text with a plain-language interpretation, and a Venn diagram redraws with areas proportional to your values. The heavy circle is the event you are conditioning on, the new sample space.

The calculator checks your inputs: probabilities must be between 0 and 1, and "A and B" can never be larger than A or B. The three example buttons load the cards, medical test, and weather examples from the chapter.

## How to Use

1. Click an input box and type a value. Press **Tab** to move to the next box.
2. Watch Step 2 substitute your values into the formula and Step 3 show the result.
3. Use **Find** to switch between P(A | B) and P(B | A). Notice which circle becomes the heavy one in the Venn diagram.
4. Use **Inputs** to switch between probabilities and counts. In count mode the total is optional.
5. Click **Cards**, **Medical Test**, or **Weather** to load an example from the chapter, or **Clear** to start over.
6. If a red message appears, fix the input it describes.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/conditional-probability-calculator/main.html"
        height="518px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Calculate P(A | B) and P(B | A) from P(A and B) and the probability of the given event (Apply)
2. Use counts from a two-way table to calculate a conditional probability (Apply)
3. Recognize invalid inputs, such as P(A and B) greater than P(B) (Understand)

### Bloom's Taxonomy Level

**Apply** - students calculate.

### Grade Level

9-12 (AP Statistics)

### Duration

15-25 minutes

### Prerequisites

- Basic probability rules and the meaning of "A and B" (Chapter 9)
- Venn diagrams

### Activities

1. **Guided Practice (5 min):** Enter P(A) = 0.525, P(B) = 0.45, and P(A and B) = 0.36 from the breakfast example. Confirm that P(A | B) = 0.80.
2. **Reverse the Condition (5 min):** Load the Medical Test example and compare P(A | B) with P(B | A). Students explain the difference using the Venn diagram.
3. **Break It (5 min):** Students try to enter values that trigger each error message and explain why each rule must hold.

### Discussion Questions

- Why can P(A and B) never be larger than P(B)?
- In count mode, why does the total cancel out of the calculation?
- When are P(A | B) and P(B | A) equal?

### Assessment

- Student computes a conditional probability by hand and verifies it with the calculator
- Student explains each of the three steps in words
- Student predicts which of P(A | B) and P(B | A) is larger from the Venn diagram

### Common Misconceptions

- P(A | B) is found by dividing by P(A)
- P(A | B) and P(B | A) are interchangeable
- A conditional probability can be larger than 1

## References

1. [Chapter 10: Conditional Probability](../../chapters/10-conditional-probability/index.md) - sections on the conditional probability formula and worked examples
2. [Conditional probability](https://en.wikipedia.org/wiki/Conditional_probability) - Wikipedia article with the formal definition
3. [Venn diagram](https://en.wikipedia.org/wiki/Venn_diagram) - Wikipedia article on the diagrams used to picture overlapping events
