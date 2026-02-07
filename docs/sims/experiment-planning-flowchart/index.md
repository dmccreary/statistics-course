---
title: Experiment Planning Flowchart
description: Interactive decision flowchart guiding students through the process of designing a complete experiment.
image: /sims/experiment-planning-flowchart/experiment-planning-flowchart.png
---

# Experiment Planning Flowchart

<iframe src="main.html" height="502px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Experiment Planning Flowchart Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"Designing an experiment can feel overwhelming,"* Sylvia admits, *"but if you follow a logical decision process, it becomes much more manageable. Let me walk you through the key questions."*

This interactive flowchart guides students through the decision-making process when designing an experiment, from defining the research question to choosing the appropriate design and applying key principles.

### What You'll Learn

- The key decisions in experimental design
- How to choose between completely randomized, block, and matched pairs designs
- When and how to apply the three principles
- How to handle blinding decisions

## How to Use

1. **Click any node** to see detailed explanation
2. **Follow the flow** from top (Start) to bottom (Final decisions)
3. **Note the decision diamonds** (orange) where you answer Yes/No
4. **Process boxes** (green) represent actions or designs to implement
5. **Hover over nodes** to preview details

### Understanding the Flowchart

| Shape | Color | Meaning |
|-------|-------|---------|
| Rounded rectangle | Brown | Start/End points |
| Diamond | Orange | Decision point (Yes/No) |
| Rectangle | Green | Process or action |
| Arrows | Gray | Flow direction |

## Key Decision Points

### 1. Significant Unit Variability?

First, assess whether your experimental units differ substantially from each other.
- **No**: Use Completely Randomized Design (simple and effective)
- **Yes**: Consider blocking to control for this variability

### 2. Can You Measure the Source?

If there is variability, can you identify and measure what causes it?
- **No**: Increase sample size to overcome variation
- **Yes**: You can block on this variable

### 3. Exactly 2 Treatments?

How many treatments are you comparing?
- **Yes (2 treatments)**: Consider Matched Pairs Design
- **No (3+ treatments)**: Use Randomized Block Design

### 4. Is Blinding Possible?

Can subjects and researchers be kept unaware of treatment assignment?
- **Yes**: Implement single or double blinding
- **No**: Document this limitation

*"Acorn for your thoughts?"* Sylvia asks. *"Not every experiment can be perfectly blinded, and that's okay. The key is knowing your limitations and being honest about them."*

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/experiment-planning-flowchart/main.html" height="502px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Follow a structured decision process for experimental design
2. Determine when blocking is appropriate
3. Choose between matched pairs and randomized block designs
4. Identify when blinding is and is not possible

### Target Audience

- AP Statistics students (high school)
- Research methods courses
- Science fair participants

### Prerequisites

- Understanding of experimental design basics
- Knowledge of completely randomized, block, and matched pairs designs
- Concept of blinding

### Classroom Activities

**Activity 1: Follow the Flowchart (15 minutes)**

Work through these scenarios using the flowchart:

1. Testing a new fertilizer on plants from the same greenhouse batch
2. Testing two diets on people with varying starting weights
3. Testing three teaching methods on students of different ability levels

**Activity 2: Design Documentation (20 minutes)**

For a given research question, have students:
1. Navigate the flowchart
2. Document each decision and why
3. Write out the final experimental design
4. List variables to control

**Activity 3: Flowchart Extension (15 minutes)**

Discuss what additional decision points could be added:
- Ethical considerations
- Budget constraints
- Time limitations
- Available sample size

### Common Mistakes to Address

1. **Skipping variability assessment**: Always consider whether units differ
2. **Over-blocking**: Only block on variables that actually affect the outcome
3. **Assuming blinding is always possible**: Some treatments cannot be hidden
4. **Forgetting the three principles**: Every design needs control, randomization, and replication

### Assessment Questions

1. A researcher wants to test whether a new app helps people drink more water. Users vary widely in their initial hydration habits. Walk through the flowchart: which design should they use?

2. Why might a researcher choose to increase sample size rather than use blocking?

3. At which point in the flowchart do you apply the three principles of experimental design?

4. A study comparing surgery vs. medication cannot blind patients. How would you document this limitation?

## References

- Chapter 12: Experimental Design - Concepts: Completely Randomized Design, Randomized Block Design, Matched Pairs Design, Blinding
- [Experimental Design Checklist](https://www.nist.gov/programs-projects/experiment-design)
