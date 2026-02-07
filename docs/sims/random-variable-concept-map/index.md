---
title: Random Variable Concept Map
description: Interactive concept map showing the relationships between all random variable concepts including probability distributions, expected value, variance, and the binomial and geometric distributions.
image: /sims/random-variable-concept-map/random-variable-concept-map.png
---

# Random Variable Concept Map

<iframe src="main.html" height="502px" scrolling="no"></iframe>

[Run the Random Variable Concept Map MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit this MicroSim in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This interactive concept map shows how all the random variable concepts from Chapter 13 fit together. Click on any node to see its definition, and drag nodes to rearrange the layout for better viewing.

The map is color-coded:

- **Green (Core Concepts)**: Fundamental definitions like Random Variable, Expected Value
- **Auburn (Formulas)**: Calculation methods and mathematical relationships
- **Brown (Distributions)**: Specific probability distributions (Binomial, Geometric)

## How to Use

1. **Click any node** to see its definition in the info panel
2. **Click the same node again and drag** to rearrange the layout
3. **Follow the edges** to understand how concepts relate to each other
4. **Click elsewhere** to close the info panel

## Concept Relationships

The map shows several key relationships:

### From Random Variable

- Random Variable **is a type of** Discrete RV (we focus on discrete in this chapter)
- Random Variable **has a** Probability Distribution
- Random Variable **is summarized by** Expected Value E(X)

### From Expected Value

- Expected Value **spread by** Variance
- Expected Value **changes via** Linear Transformation

### From Variance

- Variance **sqrt gives** Standard Deviation
- Variance **combines via** Combining RVs rules

### Special Distributions

- Discrete RV has **special cases**: Binomial and Geometric Distributions
- Each has its own formulas for probability, mean, and standard deviation

## Learning Objectives

After using this MicroSim, you'll be able to:

- Organize your understanding of random variable concepts
- Trace the connections between definitions, formulas, and distributions
- See the "big picture" of Chapter 13
- Identify prerequisite knowledge for each concept

## Using the Map for Review

### Before an Exam

1. Start at "Random Variable" and work outward
2. For each node, ask yourself: "Can I explain this concept?"
3. Quiz yourself on the formulas in auburn nodes
4. Make sure you can distinguish Binomial from Geometric settings

### For Problem Solving

1. Identify which concepts are relevant to your problem
2. Trace the path from the given information to what you need to find
3. Use the formulas along the way

!!! tip "Sylvia Says"
    "A concept map is like a bird's-eye view of the forest. Instead of getting lost among the trees (individual formulas), you can see how everything connects. When you're stuck on a problem, the map can help you find a path from what you know to what you need!"

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/random-variable-concept-map/main.html" height="502px" scrolling="no"></iframe>
```

## Technical Notes

- Built with p5.js 1.11.10
- Uses pre-calculated node positions with force-directed aesthetic
- Nodes are draggable for custom layouts
- Responsive width design
- Canvas height: 500px

## References

- Chapter 13: Random Variables
- All 23 concepts from the chapter are represented in this map
