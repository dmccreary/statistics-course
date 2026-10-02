---
title: Simpson's Paradox Explorer
description: Bar chart explorer that compares combined success rates with rates separated by subgroup so students can see when and why Simpson's Paradox reverses a conclusion.
image: /sims/simpsons-paradox-explorer/simpsons-paradox-explorer.png
og:image: /sims/simpsons-paradox-explorer/simpsons-paradox-explorer.png
twitter:image: /sims/simpsons-paradox-explorer/simpsons-paradox-explorer.png
social:
   cards: false
quality_score: 98
---

# Simpson's Paradox Explorer

<iframe src="main.html" height="564px" width="100%" scrolling="no"></iframe>

[Run the Simpson's Paradox Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Simpson's Paradox occurs when a trend that appears in every subgroup reverses or disappears when the subgroups are combined. This MicroSim starts with the combined comparison of two groups, then reveals the same data separated by a lurking variable.

Four presets are included: the hospital example from the chapter, the tutoring companies from Practice Problem 2, the kidney stone treatment study published in the *BMJ* in 1986 (a well-known real example), and a made-up college admissions example. Sliders let you change the size and success rate of every subgroup to discover what makes the paradox appear and disappear. All percentages are computed from whole-number counts, which are shown under each bar.

## How to Use

1. Start in the combined view. Which group looks better?
2. Click **Reveal Paradox** to separate the data by subgroup. Green bars mark the higher rate in each pair, red bars the lower rate.
3. Read the banner. A warning appears when both subgroups favor one group but the combined data favor the other.
4. Read the explanation to see how differently the two groups are split between the subgroups.
5. Drag the size sliders so both groups have the same mix of subgroups. Does the paradox survive?
6. Choose another scenario from the dropdown, or click **Reset to Classic** to return to the hospital example.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/simpsons-paradox-explorer/main.html"
        height="564px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Evaluate combined and subgroup comparisons to decide whether Simpson's Paradox is present (Evaluate)
2. Determine which analysis is more appropriate when a lurking variable affects both group membership and the outcome (Evaluate)
3. Explain how unequal subgroup sizes can reverse a comparison when data are aggregated (Analyze)

### Bloom's Taxonomy Level

**Evaluate** - students evaluate.

### Grade Level

9-12 (AP Statistics)

### Duration

15-25 minutes

### Prerequisites

- Two-way tables and conditional proportions (Chapter 2)
- Lurking variables

### Activities

1. **Predict (5 min):** Show only the combined view of the hospital data. Students choose a hospital for a family member and justify the choice.
2. **Reveal and Explain (10 min):** Students reveal the subgroups, record all six rates, and explain in writing why Hospital B looks worse overall.
3. **Break the Paradox (10 min):** Students adjust the size sliders until the banner reads "No paradox" and describe what they changed. They repeat with the kidney stone data.

### Discussion Questions

- What must be true about the subgroup sizes for the paradox to occur?
- In the kidney stone data, Treatment A was used mostly on large stones (263 of its 350 patients). How does that explain the reversal?
- When might the combined comparison be the one you actually want?

### Assessment

- Student correctly computes a combined rate from the subgroup counts
- Student identifies the lurking variable and explains its link to both group and outcome
- Student constructs a new set of slider values that produces the paradox

### Common Misconceptions

- The combined data are always more trustworthy because the sample is larger
- Simpson's Paradox means one of the calculations is wrong
- The paradox can occur even when both groups have the same mix of subgroups

## References

1. [Chapter 8: Causation and Study Design](../../chapters/08-causation-and-study-design/index.md) - section on Simpson's Paradox and Practice Problem 2
2. [Simpson's paradox](https://en.wikipedia.org/wiki/Simpson%27s_paradox) - Wikipedia article covering the kidney stone and Berkeley admissions examples
3. Charig, C. R., Webb, D. R., Payne, S. R., & Wickham, J. E. (1986). Comparison of treatment of renal calculi by open surgery, percutaneous nephrolithotomy, and extracorporeal shockwave lithotripsy. *BMJ*, 292(6524), 879-882. Source of the kidney stone counts.
4. Bickel, P. J., Hammel, E. A., & O'Connell, J. W. (1975). Sex bias in graduate admissions: Data from Berkeley. *Science*, 187(4175), 398-404. The real admissions case that inspired the made-up admissions preset.
