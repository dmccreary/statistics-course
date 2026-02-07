---
title: Random Assignment Simulator
description: Interactive simulation for practicing random assignment of experimental units to treatment groups.
image: /sims/random-assignment-simulator/random-assignment-simulator.png
---

# Random Assignment Simulator

<iframe src="main.html" height="452px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Random Assignment Simulator Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"Random assignment is the heart of experimental design,"* Sylvia explains. *"It's what allows us to make causal claims. Let me show you exactly how it works."*

This interactive simulation lets students practice **random assignment** by stepping through the process of assigning experimental units to treatment groups using a chance mechanism.

### What You'll Learn

- How random number generators assign units to groups
- Why random assignment tends to create balanced groups
- The difference between random assignment and random sampling
- How chance alone distributes units across treatments

## How to Use

1. **Set the number of units** (1-30) and groups (2-3) using the input boxes
2. **Click "Assign One"** to see one unit assigned with animation
3. **Watch the random number generator** determine the group assignment
4. **Click "Assign All"** to complete the assignment quickly
5. **Press SPACE** as a shortcut to assign one unit

### Understanding the Display

| Element | Meaning |
|---------|---------|
| Gray circles (left) | Unassigned experimental units |
| Yellow highlighted circle | Next unit to be assigned |
| Random Generator box | Shows the random number that determines group |
| Colored containers (right) | Treatment and control groups with assigned units |
| Statistics panel | Shows count and percentage in each group |

## Key Concepts

### Random Assignment Mechanism

Each unit is assigned to a group using a random number:
1. Generate a random number (1 to number of groups)
2. The number determines which group receives the unit
3. Repeat until all units are assigned

### Why Random Assignment Works

Random assignment does NOT guarantee equal groups. Instead, it guarantees that any imbalance is due to chance, not systematic bias.

With enough units, random assignment tends to:
- Balance groups approximately equally
- Distribute known characteristics evenly
- Distribute UNKNOWN characteristics evenly (the real power)

*"Acorn for your thoughts?"* Sylvia asks. *"Run the simulation several times. You'll see the groups aren't always perfectly equal, but they're usually close. That's randomness at work!"*

### Group Balance

After assignment, check the statistics:
- **Well balanced**: Groups differ by 2 or fewer units
- **Slight imbalance**: Groups differ by more than 2 units

Both outcomes are fine with random assignment. Small imbalances are expected and do not invalidate the experiment.

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/random-assignment-simulator/main.html" height="452px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Execute random assignment using a chance mechanism
2. Explain why random assignment creates comparable groups
3. Predict the likely distribution of units across groups
4. Distinguish random assignment from random sampling

### Target Audience

- AP Statistics students (high school)
- Research methods courses
- Science fair participants

### Prerequisites

- Understanding of experimental design
- Concept of treatment and control groups
- Basic probability

### Classroom Activities

**Activity 1: Step-by-Step Assignment (10 minutes)**

1. Set units to 10, groups to 2
2. Assign one unit at a time as a class
3. Before each assignment, predict which group will receive the unit
4. Discuss: Can we predict individual assignments? Can we predict overall balance?

**Activity 2: Multiple Trials (15 minutes)**

1. Run the full assignment 5 times with 20 units
2. Record the final group sizes each time
3. Calculate the average difference between groups
4. Discuss: How close to perfect balance do we get?

**Activity 3: Random vs. Non-Random (10 minutes)**

Compare random assignment to these alternatives:
1. First 10 go to Treatment, last 10 to Control
2. Alphabetical by name: A-M to Treatment, N-Z to Control
3. Let participants choose their group

Discuss why each non-random method could bias results.

### Common Mistakes to Address

1. **Expecting perfect balance**: Random assignment creates approximately equal groups, not exactly equal
2. **Confusing with random sampling**: Random assignment is for experiments, random sampling is for selecting participants
3. **Using non-random methods**: Alternating, convenience, or self-selection are NOT random
4. **Small samples**: With few units, random assignment may create noticeable imbalances

### Assessment Questions

1. You randomly assign 100 patients to treatment and control. You get 47 in treatment and 53 in control. Is this a problem? Why or why not?

2. A researcher lets patients choose whether to receive a new drug or placebo. Why is this problematic even if the groups end up equal in size?

3. Explain why random assignment balances both known AND unknown confounding variables.

4. What is the difference between random sampling and random assignment? Give an example of each.

## References

- Chapter 12: Experimental Design - Concepts: Random Assignment, Why Randomize
- Chapter 11: Sampling and Bias - Concepts: Simple Random Sample (for comparison)
