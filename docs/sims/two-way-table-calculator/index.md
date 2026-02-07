---
title: Two-Way Table Distribution Calculator
description: An interactive calculator for computing marginal and conditional distributions from a two-way (contingency) table with editable cells.
quality_score: 90
image: /sims/two-way-table-calculator/two-way-table-calculator.png
og:image: /sims/two-way-table-calculator/two-way-table-calculator.png
twitter:image: /sims/two-way-table-calculator/two-way-table-calculator.png
social:
   cards: false
---
# Two-Way Table Distribution Calculator

<iframe src="main.html" height="552px" scrolling="no"></iframe>

[Run the Two-Way Table Calculator Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive calculator helps you practice computing marginal and conditional distributions from a two-way (contingency) table. You can edit the cell values directly and see how the distributions change.

### How to Use

1. **Edit Cell Values**: Click on any data cell in the table to edit its value (0-100). Press Enter to confirm or Tab to move to the next cell.

2. **Choose Distribution Type**: Use the buttons at the bottom to select which distribution to calculate:
   - **Marginal Row**: Proportion of each grade level (Freshman/Sophomore) across all seasons
   - **Marginal Col**: Proportion of each season across all grade levels
   - **Cond|Row1**: Conditional distribution of seasons given Freshman
   - **Cond|Row2**: Conditional distribution of seasons given Sophomore

3. **Toggle Steps**: Click "Steps On/Off" to show or hide the calculation formulas.

4. **Example Data**: Click "Example" to reset to the default dataset.

### Key Concepts

- **Marginal Distribution**: The distribution of one variable, ignoring the other. Found by dividing row or column totals by the grand total.

- **Conditional Distribution**: The distribution of one variable given a specific value of another variable. Found by dividing cell values by the conditioning row or column total.

## Embedding This MicroSim

Place the following line in your website to include this in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/two-way-table-calculator/main.html" height="552px" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Calculate marginal distributions from a two-way table
2. Calculate conditional distributions given a specific row or column value
3. Explain the difference between marginal and conditional distributions
4. Interpret proportions in the context of categorical data

### Bloom's Taxonomy Level

**Apply (L3)** - Students calculate and execute distribution computations.

### Prerequisites

- Understanding of proportions and percentages
- Basic knowledge of categorical variables
- Familiarity with frequency tables

### Suggested Activities

#### Warm-Up (5 minutes)
Have students enter their own data: Ask the class "How many of you prefer each season?" Record responses by grade level in the table.

#### Guided Practice (10 minutes)
1. Start with the Example data showing season preferences by grade level
2. Walk through calculating the marginal distribution of grade level step-by-step
3. Show how the proportions sum to 1.000

#### Independent Practice (15 minutes)
Have students:

1. Calculate the marginal distribution of seasons
2. Calculate the conditional distribution of seasons given Freshman
3. Compare: Do Freshmen and Sophomores have similar season preferences?

#### Discussion Questions

- "What does it mean if the conditional distributions are the same for both rows?"
- "How would you describe the relationship between grade level and season preference using these distributions?"
- "When would you use a marginal vs. conditional distribution?"

### Assessment Ideas

1. Give students a new two-way table and ask them to calculate specific distributions without the calculator
2. Present two conditional distributions and ask students to interpret whether the variables appear associated
3. Have students collect their own categorical data and analyze it using this tool

### Common Misconceptions

- Confusing marginal and conditional distributions
- Dividing by the wrong total (grand total vs. row/column total)
- Forgetting that conditional distributions should sum to 1.000

## References

- Chapter 2: Displaying Categorical Data
- AP Statistics: Exploring Two-Variable Data
- [Khan Academy: Two-Way Tables](https://www.khanacademy.org/math/ap-statistics/analyzing-categorical-ap)
