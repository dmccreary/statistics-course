---
title: Undercoverage Visualization
description: Interactive visualization showing how incomplete sampling frames lead to biased estimates.
image: /sims/undercoverage-viz/undercoverage-viz.png
---

# Undercoverage Visualization

<iframe src="main.html" height="452px" width="100%" scrolling="no" style="overflow: hidden;"></iframe>

[Run the Undercoverage Visualization Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

*"Here's where even experienced squirrels slip up!"* Sylvia warns. *"Undercoverage is sneaky because your sampling method might look perfect—but if your sampling frame is missing people, you'll never even know you're missing them!"*

This interactive visualization demonstrates **undercoverage**: when some members of the population have no chance of being included in the sample because they're missing from the sampling frame.

### The Key Insight

Undercoverage only causes bias when the excluded group differs from the included group. This simulation lets you control both:

1. **What percentage** of the population is undercovered
2. **How different** the undercovered group is from the covered group

## How to Use

1. **Adjust "Undercovered" slider** to set what percentage of the population is missing from the sampling frame (0-50%)
2. **Adjust "Value difference" slider** to set how different the undercovered group's values are from the covered group
3. **Click "Take Sample"** to draw a random sample from the covered population only
4. **Observe the bias** — the difference between the sample mean and true population mean
5. **Click "Reset"** to regenerate the population with current settings

### Understanding the Display

| Element | Meaning |
|---------|---------|
| Green dots | Covered population (can be sampled) |
| Faded red dots with X | Undercovered population (cannot be sampled) |
| Sample panel | Shows only covered individuals selected |
| Bias value | Sample mean minus true population mean |

## Key Concepts

### When Undercoverage Causes Bias

| Scenario | Undercovered Group | Bias Direction |
|----------|-------------------|----------------|
| Phone survey, 1930s | Lower income (no phones) | Depends on variable |
| Online survey | Elderly, rural, low-income | Depends on variable |
| School survey | Frequently absent students | If absences relate to topic |

*"The 1936 Literary Digest poll is the classic example,"* Sylvia explains. *"They surveyed people from phone books and car registrations. During the Great Depression, that meant missing most Roosevelt supporters!"*

### The Undercoverage Formula

The bias depends on two factors:

\[
\text{Bias} \approx (\text{proportion undercovered}) \times (\text{difference between groups})
\]

- More undercoverage = more potential bias
- Larger difference between groups = larger actual bias
- If groups are identical, undercoverage doesn't bias results

## Embedding This MicroSim

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/undercoverage-viz/main.html" height="452px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Define undercoverage and explain how it differs from nonresponse
2. Identify when undercoverage will and won't cause bias
3. Calculate the direction of bias given information about the excluded group
4. Recognize undercoverage in real-world survey scenarios

### Target Audience

- AP Statistics students (high school)
- Introductory statistics college students
- Survey design and research methods courses

### Prerequisites

- Understanding of sampling frames
- Concept of population parameters vs. sample statistics
- What bias means in sampling

### Classroom Activities

**Activity 1: Bias Direction Prediction (10 minutes)**

For each scenario, predict the bias direction:

1. Surveying income via landline phones (missing young adults who earn less) → Overestimate
2. Online health survey (missing elderly who have more health issues) → Underestimate
3. College satisfaction survey excluding transfer students (who are more satisfied) → Underestimate

**Activity 2: Zero Bias Exploration (10 minutes)**

1. Set value difference to 0
2. Take multiple samples with different undercoverage levels
3. Observe: Bias fluctuates around zero!
4. Discuss: When does undercoverage NOT matter?

**Activity 3: Historical Case Study (15 minutes)**

Analyze the 1936 Literary Digest poll:

- They predicted Landon would win 57% to 43%
- Actual result: Roosevelt won 62% to 38%
- Their sampling frame excluded lower-income voters
- Discuss: How did undercoverage cause this massive miss?

### Common Misconceptions

1. **"Undercoverage always causes bias"** — Only when excluded groups differ on the measured variable

2. **"We can fix undercoverage by sampling more"** — No! The problem is who CAN'T be reached

3. **"Random sampling within the frame eliminates bias"** — Randomness within a biased frame doesn't help

### Assessment Questions

1. A survey uses voter registration lists that don't include recently moved residents. Will this cause undercoverage? Will it necessarily cause bias?

2. An online survey about internet usage excludes people without internet access. Explain why this is both ironic and problematic.

3. If 30% of a population is undercovered and their mean differs from the covered group by 20 points, estimate the approximate bias.

4. How does undercoverage differ from nonresponse bias?

## References

- Chapter 11: Sampling and Bias - Concepts: Undercoverage, Sources of Bias, Sampling Frame
- [1936 Literary Digest Poll](https://en.wikipedia.org/wiki/The_Literary_Digest#1936_presidential_poll) - Classic undercoverage example
- [Pew Research: Survey Coverage](https://www.pewresearch.org/) - Modern survey methodology
