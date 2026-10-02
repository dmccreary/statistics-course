---
title: Interactive Tree Diagram Builder
description: Build a probability tree by editing branch probabilities, then multiply along paths to get joint probabilities and reverse the condition.
image: /sims/tree-diagram-builder/tree-diagram-builder.png
og:image: /sims/tree-diagram-builder/tree-diagram-builder.png
twitter:image: /sims/tree-diagram-builder/tree-diagram-builder.png
social:
   cards: false
quality_score: 98
---

# Interactive Tree Diagram Builder

<iframe src="main.html" height="532px" width="100%" scrolling="no"></iframe>

[Run the Interactive Tree Diagram Builder MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Tree diagrams organize multi-step probability problems. The first set of branches shows the first event, the second set shows conditional probabilities given the first, and multiplying along a path gives the joint probability at its end point.

This builder starts with the medical testing example from the chapter. Every branch probability can be edited, the tree checks that the probabilities leaving each branch point add up to 1, and the summary panel adds the paths that lead to the same outcome. Hover over an end point to highlight its path and to reverse the condition, for example from P(Positive | Disease) to P(Disease | Positive). Presets for the commute and the two-machine factory problems from the chapter are included.

## How to Use

1. Read the starting tree: P(Disease) = 0.02, then the test results given each disease status.
2. Hover over an end point. Its path turns yellow, and the summary shows the joint probability and the reversed conditional probability.
3. Click any probability on a branch, type a new value, and press **Enter** (or **Tab** to move to the next branch).
4. If a branch point is outlined in red, its probabilities do not add up to 1. Fix them.
5. Predict the joint probabilities, then click **Calculate** to check.
6. Use **−** and **+** to change the number of first-level branches (2 to 4). A new branch starts at 0, so you must rebalance.
7. Use **Second Level** to hide or show the second set of branches. Choose a preset from the dropdown, or click **Reset** to restore it.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/tree-diagram-builder/main.html"
        height="532px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Construct a two-level tree diagram with probabilities that sum to 1 at each branch point (Apply)
2. Calculate joint probabilities by multiplying along paths and total probabilities by adding paths (Apply)
3. Use a tree diagram to find a reversed conditional probability such as P(Disease | Positive) (Apply)

### Bloom's Taxonomy Level

**Apply** - students construct.

### Grade Level

9-12 (AP Statistics)

### Duration

15-25 minutes

### Prerequisites

- Conditional probability notation
- The general multiplication rule

### Activities

1. **Read a Tree (5 min):** Students verify the four joint probabilities of the medical test tree by hand and confirm P(Positive) = 0.117.
2. **Change the Base Rate (10 min):** Students change P(Disease) to 0.10 (and P(No Disease) to 0.90), predict P(Disease | Positive), then click Calculate and hover to check.
3. **Build Your Own (10 min):** Students add a third branch and build a tree for a three-machine factory, choosing their own production shares and defect rates.

### Discussion Questions

- Why must the probabilities leaving a branch point add up to 1?
- Machine A has the lower defect rate. Why does it still produce almost half of the defective items?
- How does the tree show that P(Disease | Positive) is not the same as P(Positive | Disease)?

### Assessment

- Student builds a valid tree for a new word problem
- Student computes all joint probabilities and confirms that they sum to 1
- Student uses the tree to find a reversed conditional probability and explains each step

### Common Misconceptions

- Second-level branches show joint probabilities rather than conditional probabilities
- Probabilities along a path should be added
- The end-point probabilities do not need to sum to 1

## References

1. [Chapter 10: Conditional Probability](../../chapters/10-conditional-probability/index.md) - sections on tree diagrams and the quality control problem
2. [Tree diagram (probability theory)](https://en.wikipedia.org/wiki/Tree_diagram_(probability_theory)) - Wikipedia article on probability trees
3. [Law of total probability](https://en.wikipedia.org/wiki/Law_of_total_probability) - Wikipedia article on adding the paths that lead to the same outcome
