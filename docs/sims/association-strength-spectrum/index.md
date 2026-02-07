---
title: Strength of Association Spectrum
description: An interactive MicroSim that helps students classify associations between categorical variables as strong, moderate, weak, or none by visualizing two-way tables, segmented bar charts, and a strength meter.
image: /sims/association-strength-spectrum/association-strength-spectrum.png
og:image: /sims/association-strength-spectrum/association-strength-spectrum.png
twitter:image: /sims/association-strength-spectrum/association-strength-spectrum.png
quality_score: 85
bloom_level: Understand
bloom_verb: Classify
social:
   cards: false
---

# Strength of Association Spectrum

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Strength of Association Spectrum MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive visualization helps you understand how to classify the strength of association between two categorical variables. As you adjust the strength slider or select presets, watch how the two-way table data, segmented bar chart, and strength meter all change together.

### What You Will Learn

- How to recognize **no association** (independence) between variables
- How to identify **weak, moderate, and strong** associations
- How conditional percentages in segmented bars reveal association strength
- Why **perfect association** is rare in real-world data

### How to Use This MicroSim

1. **Move the slider** to smoothly transition between association strengths
2. **Click preset labels** (None, Weak, Moderate, Strong, Perfect) to jump to specific examples
3. **Click Randomize** to explore random association strengths
4. **Watch the left panel** to see how the two-way table and segmented bars change
5. **Watch the right panel** to see the strength meter and read the description

## Iframe Embed Code

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/association-strength-spectrum/main.html" height="482px" width="100%" scrolling="no"></iframe>
```

## Concepts Illustrated

### Two-Way Tables

The two-way table shows counts for two categorical variables:
- **Rows**: Treatment groups (A and B)
- **Columns**: Outcomes (Success and Failure)

When there is **no association**, both treatment groups have similar success rates (around 50%). As association strength increases, the success rates diverge.

### Segmented Bar Charts

The segmented bar chart shows **conditional percentages**. Each bar represents 100% of one treatment group, divided into success (green) and failure (coral) portions.

- **No association**: Bars look nearly identical
- **Strong association**: Bars look very different

### The Strength Meter

The vertical meter on the right provides a quick visual reference:
- **0%** = No association (complete independence)
- **50%** = Moderate association
- **100%** = Perfect association (one variable completely determines the other)

## Key Insights

!!! tip "Sylvia Says"
    "Here's a handy rule of thumb: if the segmented bars look basically the same, there's little to no association. But when those bars start looking really different from each other? That's when you know one variable is telling you something useful about the other!"

1. **Independence means equal conditional distributions**: When variables are independent, knowing one tells you nothing about the other.

2. **Association is about pattern, not causation**: Even strong association does not prove that one variable causes changes in the other.

3. **Real data is messy**: Perfect association almost never occurs in practice. Most real associations are moderate or weak.

## Lesson Plan

### Learning Objective

Students will be able to **classify** the strength of association between two categorical variables as none, weak, moderate, strong, or perfect by examining two-way tables and segmented bar charts.

### Grade Level

High School (AP Statistics) / Introductory College Statistics

### Duration

15-20 minutes

### Warm-Up Activity (3 minutes)

Ask students: "If I told you someone is in Treatment Group A, would that help you predict their outcome? How would you know?"

### Guided Exploration (8 minutes)

1. Start with the slider at 0% (No Association). Point out that both groups have identical 50% success rates.
2. Slowly move to 50% (Moderate). Ask: "How have the bars changed?"
3. Move to 100% (Perfect). Discuss why this is unrealistic in real research.
4. Click Randomize several times. Have students classify each result before checking the meter.

### Practice Activity (5 minutes)

Have students work in pairs:
- One student sets a random strength
- The other must classify it as None/Weak/Moderate/Strong/Perfect based only on the table and bars
- Check against the meter
- Switch roles and repeat

### Assessment Questions

1. When the segmented bars look almost identical, what does this tell you about association?
2. A study finds Treatment A has 65% success and Treatment B has 35% success. How would you classify this association?
3. Why is perfect association (100%) rare in real research?

### Extension

Have students collect real two-way table data (e.g., from surveys) and estimate the association strength before calculating it formally.

## References

- [AP Statistics Course Description](https://apcentral.collegeboard.org/courses/ap-statistics)
- Moore, D. S., & Notz, W. I. (2020). *Statistics: Concepts and Controversies* (10th ed.). W.H. Freeman.
- De Veaux, R. D., Velleman, P. F., & Bock, D. E. (2021). *Stats: Data and Models* (5th ed.). Pearson.
