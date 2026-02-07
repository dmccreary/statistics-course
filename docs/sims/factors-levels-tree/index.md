---
title: Factors and Levels Tree
description: Interactive tree diagram showing how factors and levels combine to create experimental treatments.
image: /sims/factors-levels-tree/factors-levels-tree.png
---

# Factors and Levels Tree

<iframe src="main.html" height="452px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Factors and Levels Tree Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"Let's crack this nut!"* Sylvia exclaims. *"Understanding how factors and levels combine to create treatments is like understanding a recipe, each ingredient choice matters, and the combinations multiply!"*

This interactive tree diagram visualizes how **factors** (explanatory variables) and their **levels** (specific values) combine to create distinct **treatments** in an experiment. The example shows a study methods experiment with two factors.

### What You'll Learn

- How factors branch into their constituent levels
- How combining levels from multiple factors creates treatments
- The multiplicative relationship: 3 techniques times 2 durations equals 6 treatments
- How to trace any treatment back to its factor-level combination

## How to Use

1. **Hover over any treatment box** at the bottom to highlight the path through the tree
2. **Click a treatment** to select it and see detailed information
3. **Observe the color coding**: Green = root, Blue = Factor 1 levels, Orange = Factor 2 levels
4. **Click "Clear Selection"** to reset the view

### Understanding the Display

| Element | Meaning |
|---------|---------|
| Green rectangle | Experiment name (root) |
| Blue ovals | Factor 1 levels (Study Technique) |
| Orange ovals | Factor 2 levels (Duration) |
| Brown boxes | Resulting treatments |
| Highlighted path | Shows factors that create selected treatment |

## Key Concepts

### Factors and Levels

A **factor** is an explanatory variable in an experiment. Each factor has **levels**, which are the specific values or categories being tested.

In this example:
- **Factor 1: Study Technique** has 3 levels (Flashcards, Practice Problems, Reading Notes)
- **Factor 2: Duration** has 2 levels (30 min, 60 min)

### Treatments as Combinations

Each unique combination of levels creates a **treatment**. With 3 levels times 2 levels, we get 6 possible treatments:

| Treatment | Technique | Duration |
|-----------|-----------|----------|
| 1 | Flashcards | 30 min |
| 2 | Flashcards | 60 min |
| 3 | Practice Problems | 30 min |
| 4 | Practice Problems | 60 min |
| 5 | Reading Notes | 30 min |
| 6 | Reading Notes | 60 min |

*"Acorn for your thoughts?"* Sylvia asks. *"Notice how adding just one more level to either factor would create even more treatments. Experiments can get complex fast!"*

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/factors-levels-tree/main.html" height="452px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Define factors, levels, and treatments in experimental design
2. Calculate the number of treatments from factor-level combinations
3. Identify which factors and levels contribute to each treatment
4. Distinguish between single-factor and multi-factor experiments

### Target Audience

- AP Statistics students (high school)
- Introductory research methods courses
- Experimental design courses

### Prerequisites

- Understanding of variables in experiments
- Basic concept of what an experiment is
- Difference between explanatory and response variables

### Classroom Activities

**Activity 1: Count the Treatments (5 minutes)**

1. Display the tree diagram
2. Ask students to count treatments
3. Verify: 3 levels times 2 levels = 6 treatments
4. Discuss what happens if we add a third factor

**Activity 2: Design Your Own Experiment (10 minutes)**

1. Have students choose a research question
2. Identify two factors they could manipulate
3. List 2-3 levels for each factor
4. Calculate total number of treatments needed
5. Discuss: Is this experiment feasible?

**Activity 3: Real-World Examples (10 minutes)**

Discuss treatment combinations in these contexts:
- Drug trial: dosage (low, medium, high) times frequency (once, twice daily)
- Agricultural study: fertilizer type (A, B, C) times watering schedule (daily, every 3 days)
- Marketing study: ad format (video, image, text) times platform (social, search, email)

### Common Mistakes to Address

1. **Confusing factors with levels**: A factor is the category, levels are the specific values
2. **Adding instead of multiplying**: 3 + 2 = 5 is wrong; 3 times 2 = 6 treatments
3. **Forgetting control conditions**: Sometimes "no treatment" is a level
4. **Ignoring feasibility**: More factors means exponentially more treatments

### Assessment Questions

1. An experiment has Factor A with 4 levels and Factor B with 3 levels. How many treatments are there?

2. A cooking experiment tests flour type (all-purpose, bread, whole wheat) and oven temperature (350F, 375F, 400F). List all possible treatments.

3. Why might a researcher limit the number of factors in an experiment?

4. In the study methods example, which factor has more levels? What does this mean for the experiment design?

## References

- Chapter 12: Experimental Design - Concepts: Factor, Levels of a Factor, Treatment
- [NIST Handbook: Experimental Design](https://www.itl.nist.gov/div898/handbook/pri/pri.htm)
