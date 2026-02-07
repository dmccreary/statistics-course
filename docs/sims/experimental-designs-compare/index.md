---
title: Experimental Designs Comparison
description: Interactive comparison of completely randomized, randomized block, and matched pairs experimental designs with animated assignment visualization.
image: /sims/experimental-designs-compare/experimental-designs-compare.png
---

# Experimental Designs Comparison

<iframe src="main.html" height="552px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Experimental Designs Comparison Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"Choosing the right experimental design is like choosing the right tool,"* Sylvia explains. *"A hammer works great for nails, but not so well for screws. Let me show you when to use each design."*

This interactive comparison allows students to explore the three main experimental designs, see how random assignment works in each, and understand when each design is most appropriate.

### What You'll Learn

- The structure of **Completely Randomized** designs
- How **Randomized Block** designs control for known variability
- When **Matched Pairs** designs are most powerful
- How random assignment works within each design

## How to Use

1. **Click the tabs** at the top to switch between design types
2. **Click "Animate Assignment"** to see random assignment in action
3. **Click "Show Advantages"** to learn when each design is best
4. **Click "Reset"** to start over with unassigned units

### Understanding the Display

| Design | Visual Structure |
|--------|------------------|
| Completely Randomized | Units flow from a pool to two treatment groups |
| Randomized Block | Units are grouped by ability, then assigned within blocks |
| Matched Pairs | Similar units are paired, with one assigned to each treatment |

## Key Concepts

### Completely Randomized Design

The simplest experimental design. All experimental units are randomly assigned to treatment groups without any grouping.

**Structure:**
- Pool of all experimental units
- Random assignment to Treatment A or B
- No blocking or pairing

**Best for:** Homogeneous experimental units where individual variation is low

### Randomized Block Design

Groups experimental units into **blocks** based on a characteristic that might affect the response, then randomly assigns treatments within each block.

**Structure:**
- Units grouped by a blocking variable (e.g., ability level)
- Random assignment within each block
- Each block contains units in all treatment conditions

**Best for:** When there is a known source of variability you want to control

*"Think of it like sorting acorns by tree species before testing storage methods,"* Sylvia suggests. *"Oak acorns and chestnut acorns might respond differently, so you want equal treatment in each type."*

### Matched Pairs Design

A special case of blocking where each block contains exactly two similar units, with one randomly assigned to each treatment.

**Structure:**
- Units paired based on relevant characteristics
- One unit in each pair gets Treatment A, the other gets Treatment B
- Sometimes the same subject receives both treatments (with time gap)

**Best for:** Two treatments with high individual variation

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/experimental-designs-compare/main.html" height="552px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Describe the structure of three main experimental designs
2. Compare the advantages and disadvantages of each design
3. Select the appropriate design for different research scenarios
4. Explain how random assignment works in each design

### Target Audience

- AP Statistics students (high school)
- Research methods courses
- Science fair participants

### Prerequisites

- Understanding of experimental vs. observational studies
- Knowledge of random assignment
- Concept of confounding variables

### Classroom Activities

**Activity 1: Design Identification (10 minutes)**

Show students these scenarios and have them identify the best design:

1. Testing two fertilizers on identical seedlings grown in a greenhouse
2. Testing a new teaching method across high, medium, and low-achieving students
3. Comparing two diets where each person tries both (with washout period)

**Activity 2: Design Comparison Table (15 minutes)**

Have students create a table comparing the three designs on:
- When to use
- Advantages
- Disadvantages
- Example scenario

**Activity 3: Design Your Own (15 minutes)**

For each research question, have students choose and justify a design:

1. Does caffeine affect reaction time?
2. Does a new drug lower blood pressure?
3. Does music type affect study effectiveness?

### Common Mistakes to Address

1. **Using completely randomized when blocking is needed**: High variability can mask treatment effects
2. **Blocking on irrelevant variables**: The blocking variable should actually affect the response
3. **Forgetting randomization within blocks**: Blocks do not replace random assignment
4. **Confusing blocking with stratified sampling**: Blocking is for experiments, stratification is for sampling

### Assessment Questions

1. An educational researcher wants to test two teaching methods on students with different prior knowledge levels. Which design is most appropriate and why?

2. A pharmaceutical company is testing a new headache medication. They have access to identical pills (drug and placebo). Which design should they use?

3. Explain why a matched pairs design might be more powerful than a completely randomized design when individual variation is high.

4. In a randomized block design with 3 blocks and 2 treatments, how many experimental units do you need if you want 10 units per treatment per block?

## References

- Chapter 12: Experimental Design - Concepts: Completely Randomized Design, Randomized Block Design, Matched Pairs Design
- [NIST Handbook of Experimental Design](https://www.itl.nist.gov/div898/handbook/pri/pri.htm)
