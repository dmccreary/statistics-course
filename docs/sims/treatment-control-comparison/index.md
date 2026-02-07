---
title: Treatment vs Control Comparison
description: Interactive step-through visualization demonstrating why control groups are essential for valid experimental conclusions.
image: /sims/treatment-control-comparison/treatment-control-comparison.png
---

# Treatment vs Control Comparison

<iframe src="main.html" height="402px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Treatment vs Control Comparison Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"This one's a real eye-opener,"* Sylvia says, adjusting her glasses. *"You'd be amazed how many studies get this wrong, drawing conclusions without a proper control group. Let me show you why that's a problem."*

This step-through visualization demonstrates the critical importance of **control groups** in experiments. Walk through four stages to see how an apparent 8-point improvement shrinks to just 2 points when we properly account for what would have happened without treatment.

### What You'll Learn

- Why before/after comparisons within a single group can be misleading
- How control groups establish a proper baseline for comparison
- The concept of **true treatment effect**
- Common confounding factors that affect results

## How to Use

1. **Click "Next Stage"** to progress through the four stages of revelation
2. **Read the explanation** at the bottom of each stage
3. **After Stage 3**, click "Show Confounds" to see possible confounding variables
4. **Click "Reset"** to start over
5. **Press spacebar** to advance stages quickly

### The Four Stages

| Stage | What You See | Key Insight |
|-------|--------------|-------------|
| 1 | Treatment group before scores | Baseline: average 70 points |
| 2 | Treatment group after scores | Apparent improvement: +8 points |
| 3 | Control group appears | Control also improved: +6 points |
| 4 | True effect calculation | Actual treatment effect: only 2 points |

## Key Concepts

### The Problem with Before/After Comparisons

Without a control group, you cannot distinguish between:
- **True treatment effect**: Improvement caused by the treatment
- **Natural change**: Improvement that would happen anyway
- **Placebo effect**: Improvement from believing you are being treated
- **Testing effect**: Improvement from practice with the test

### Calculating True Treatment Effect

\[
\text{True Effect} = \text{Treatment Improvement} - \text{Control Improvement}
\]

In this example:
- Treatment group: 70 to 78 = +8 points
- Control group: 70 to 76 = +6 points
- **True effect: 8 - 6 = 2 points**

*"Acorn for your thoughts?"* Sylvia muses. *"Without the control group, we would have claimed an 8-point effect. That's four times larger than reality! Imagine basing important decisions on that inflated number."*

### Why Control Groups Work

Control groups experience all the same conditions as the treatment group EXCEPT for the treatment itself. This means any changes in the control group represent what would happen naturally, allowing us to isolate the treatment's true impact.

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/treatment-control-comparison/main.html" height="402px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Explain why comparing treatment and control groups is more reliable than before/after comparisons
2. Calculate the true treatment effect using control group data
3. Identify confounding variables that affect experimental results
4. Critique studies that lack proper control groups

### Target Audience

- AP Statistics students (high school)
- Research methods courses
- Critical thinking / media literacy courses

### Prerequisites

- Understanding of experimental design basics
- Concept of treatment and control groups
- Basic understanding of confounding variables

### Classroom Activities

**Activity 1: Step Through Together (10 minutes)**

1. Display the MicroSim on the projector
2. Step through each stage as a class
3. At each stage, ask: "What can we conclude so far?"
4. Emphasize the "reveal" moment when control group appears

**Activity 2: Find the Flaw (15 minutes)**

Provide students with these scenarios and have them identify the problem:

1. "Students who took our SAT prep course improved by an average of 100 points!"
2. "Patients who used our medication reported 50% less pain after 4 weeks."
3. "Crime rates dropped 15% after installing security cameras."

For each: What's missing? What could explain the improvement without the treatment?

**Activity 3: Design a Control (10 minutes)**

For the following research questions, have students design appropriate control groups:

1. Does a new fertilizer increase tomato plant growth?
2. Does meditation reduce test anxiety?
3. Does a new app help people drink more water?

### Common Mistakes to Address

1. **"The treatment group improved, so it works!"**: Improvement alone means nothing
2. **No control group**: Cannot determine baseline change
3. **Inappropriate control**: Control must match treatment group in all ways except treatment
4. **Ignoring confounds**: Many factors can cause change over time

### Assessment Questions

1. A diet company reports that participants lost an average of 5 pounds over 8 weeks on their program. A control group that received no program lost an average of 2 pounds. What is the true effect of the diet program?

2. Why would a group of students improve their test scores over time even without any special treatment?

3. A company claims their energy drink improves athletic performance because athletes who drank it performed better than in their previous competition. What's wrong with this conclusion?

4. How does having a control group help researchers distinguish between real treatment effects and placebo effects?

## References

- Chapter 12: Experimental Design - Concepts: Control Group, Comparison in Experiments, Placebo Effect
- [Understanding Clinical Trials](https://www.nih.gov/health-information/nih-clinical-research-trials-you)
