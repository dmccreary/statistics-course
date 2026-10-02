---
title: Randomization Balance Simulator
description: Simulation that randomly assigns subjects to treatment and control groups and shows how chance balances visible characteristics and a hidden variable, especially with larger samples.
image: /sims/randomization-balance-sim/randomization-balance-sim.png
og:image: /sims/randomization-balance-sim/randomization-balance-sim.png
twitter:image: /sims/randomization-balance-sim/randomization-balance-sim.png
social:
   cards: false
quality_score: 98
---

# Randomization Balance Simulator

<iframe src="main.html" height="534px" width="100%" scrolling="no"></iframe>

[Run the Randomization Balance Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Random assignment is what makes experiments powerful: letting chance decide who gets the treatment tends to equalize the groups on every variable, including the ones nobody measured. This MicroSim lets you carry out that assignment and check the result.

Each subject icon shows three visible characteristics (age, gender, prior experience) and carries a hidden one (motivation). Click Randomize to split the population into equal treatment and control groups, then read the balance table. Run the randomization hundreds of times to see how the gap between groups varies, and change the sample size to see the typical gap shrink. Every result is produced by an actual random shuffle, so occasional lopsided splits are real and worth discussing.

## How to Use

1. Click **Randomize**. The subjects move into the Treatment and Control groups.
2. Read the **Balance check** table. The gap is the Treatment percentage minus the Control percentage for each characteristic.
3. Click **Run 100 More** to repeat the randomization 100 times. The plot shows the gap from every run for the tracked characteristic.
4. Click a row of the table to track a different characteristic.
5. Drag the **Sample size** slider to 20, 50, 100, or 200 and run more randomizations. Compare the typical gap for each sample size.
6. Check **Reveal hidden variable** to see whether motivation, which was never used to form the groups, was balanced too.
7. Use the **Show** checkboxes to turn characteristics on or off. Click **Reset** to clear all results.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/randomization-balance-sim/main.html"
        height="534px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Apply random assignment to form treatment and control groups and compare their composition (Apply)
2. Describe how the balance between randomly assigned groups improves as the sample size increases (Understand)
3. Explain why random assignment balances unknown variables as well as known ones (Understand)

### Bloom's Taxonomy Level

**Apply** - students apply.

### Grade Level

9-12 (AP Statistics)

### Duration

15-25 minutes

### Prerequisites

- Experiments and control groups
- Confounding variables
- Percentages

### Activities

1. **Single Randomizations (5 min):** With 20 subjects, students randomize five times and record the largest gap each time.
2. **Many Randomizations (10 min):** Students click Run 100 More for each sample size and record the typical gap. They sketch the four plots side by side.
3. **The Hidden Variable (5 min):** Students predict whether motivation will be balanced, reveal it, and track it over 100 more runs.

### Discussion Questions

- Random assignment sometimes produces a large gap. Why is that not a bias?
- How does the typical gap change when the sample size goes from 20 to 200?
- Why can't a researcher balance the hidden variable by hand?

### Assessment

- Student reports the typical gap for at least three sample sizes and describes the trend
- Student explains that the gaps center on zero, so neither group is systematically favored
- Student explains why randomization handles unmeasured variables

### Common Misconceptions

- Random assignment guarantees identical groups
- A lopsided random split means the randomization was done incorrectly
- Researchers should rearrange the groups by hand until they look balanced

## References

1. [Chapter 8: Causation and Study Design](../../chapters/08-causation-and-study-design/index.md) - section "Randomization: The Great Equalizer"
2. [Random assignment](https://en.wikipedia.org/wiki/Random_assignment) - Wikipedia article on assigning subjects to groups by chance
3. [Randomized controlled trial](https://en.wikipedia.org/wiki/Randomized_controlled_trial) - Wikipedia article on why randomization controls confounding
