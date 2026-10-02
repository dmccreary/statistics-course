---
title: Conditional Probability Two-Way Table Explorer
description: Click a row or column of a two-way table to choose the given condition, then click an outcome to see the conditional probability calculated from the counts.
image: /sims/conditional-probability-table/conditional-probability-table.png
og:image: /sims/conditional-probability-table/conditional-probability-table.png
twitter:image: /sims/conditional-probability-table/conditional-probability-table.png
social:
   cards: false
quality_score: 98
---

# Conditional Probability Two-Way Table Explorer

<iframe src="main.html" height="492px" width="100%" scrolling="no"></iframe>

[Run the Conditional Probability Two-Way Table Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Conditioning on an event shrinks the sample space. In a two-way table that means one row or one column becomes the whole world, and its total becomes the denominator. This MicroSim makes that visible: you click the given condition, the rest of the table dims, you click the outcome, and the calculation appears step by step next to the unconditional probability for comparison.

Three of the datasets come straight from the chapter (breakfast and alertness, the medical test, and the rain and commute log). The fourth, sports and honor roll, uses made-up counts chosen so that the two variables are independent.

## How to Use

1. **Step 1:** Click a row label or a column label to choose the given condition. That row or column turns light blue and the rest of the table dims.
2. **Step 2:** Click a cell inside the highlighted row or column (or the matching label) to choose the outcome. The cell turns orange.
3. **Step 3:** Read the calculation in green. The fraction uses the orange cell as the numerator and the blue-outlined total as the denominator.
4. Compare the conditional probability with the unconditional probability shown below it and in the two bars.
5. Click the highlighted label again, or **Reset Selection**, to choose a different condition. Use the **Dataset** dropdown to switch tables.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/conditional-probability-table/main.html"
        height="492px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Calculate a conditional probability from a two-way table by identifying the restricted sample space (Apply)
2. Distinguish P(A | B) from P(B | A) by choosing different conditions in the same table (Analyze)
3. Compare conditional and unconditional probabilities to judge whether two events are independent (Analyze)

### Bloom's Taxonomy Level

**Apply** - students calculate.

### Grade Level

9-12 (AP Statistics)

### Duration

15-25 minutes

### Prerequisites

- Two-way tables (Chapter 2)
- Basic probability rules (Chapter 9)

### Activities

1. **Guided Practice (5 min):** Reproduce the chapter's result P(Alert | Ate Breakfast) = 72/90 = 0.80, then find P(Alert | No Breakfast).
2. **Reverse the Condition (10 min):** In the Medical Test table, students find P(Tests Positive | Has Disease) and P(Has Disease | Tests Positive) and explain why they differ so much.
3. **Independence Check (5 min):** Students compare conditional and unconditional probabilities in the Sports & Honor Roll table and state what they notice.

### Discussion Questions

- Which total is the denominator when the condition is a column instead of a row?
- Why is P(Has Disease | Tests Positive) so much smaller than P(Tests Positive | Has Disease)?
- What would a two-way table look like if the two variables were independent?

### Assessment

- Student calculates four conditional probabilities from a new table without the MicroSim
- Student states in words what the denominator represents
- Student decides whether two events are independent and justifies the decision with two probabilities

### Common Misconceptions

- The grand total is always the denominator
- P(A | B) and P(B | A) are the same number
- Events are independent whenever both can happen together

## References

1. [Chapter 10: Conditional Probability](../../chapters/10-conditional-probability/index.md) - source of the breakfast, medical test, and commute tables
2. [Conditional probability](https://en.wikipedia.org/wiki/Conditional_probability) - Wikipedia article with the definition and worked examples
3. [Contingency table](https://en.wikipedia.org/wiki/Contingency_table) - Wikipedia article on two-way tables of counts
