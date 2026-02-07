---
title: Venn Diagram Problem Solver
description: Interactive tool for solving probability problems using Venn diagrams, calculating counts and probabilities for overlapping events.
image: /sims/venn-diagram-solver/venn-diagram-solver.png
---

# Venn Diagram Problem Solver

<iframe src="main.html" height="502px" width="100%" scrolling="no" style="border: 1px solid silver; overflow: hidden;"></iframe>

[Run the Venn Diagram Problem Solver Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit this MicroSim in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This interactive tool helps students organize information and solve probability problems using Venn diagrams. Students can input total count, n(A), n(B), and n(A∩B), and the visualization automatically calculates all four regions. The tool includes preset scenarios for common problem types.

## How to Use

1. **Select a scenario** from the dropdown or use custom values
2. **Use keyboard shortcuts** to adjust values: T (total), A (n(A)), B (n(B)), I (intersection)
3. **Press arrow keys** while holding a letter key to increment/decrement
4. **Click regions** to highlight them
5. **Verify** that the sum of all regions equals the total

## Regions Calculated

- **A only**: n(A) - n(A∩B)
- **B only**: n(B) - n(A∩B)
- **Both A and B**: n(A∩B)
- **Neither**: Total - (A only) - (B only) - (Both)

## Learning Objectives

After using this MicroSim, students will be able to:

- Organize probability information using Venn diagrams
- Calculate counts for each region of a two-set Venn diagram
- Convert counts to probabilities
- Verify their work by checking that regions sum to the total

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/venn-diagram-solver/main.html" height="502px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Introduction (5 minutes)
Review Venn diagram structure and the four distinct regions. Emphasize the importance of starting with the intersection.

### Guided Exploration (10 minutes)
Work through the "Language Classes" preset, showing how to fill in each region systematically.

### Practice Activities (15 minutes)
Have students solve problems from each preset scenario, then create their own scenarios.

### Assessment
Students complete Venn diagram problems independently and explain their calculation process.

## References

- Chapter 9: Probability Fundamentals
- Concepts: Venn Diagram, Using Venn Diagrams
