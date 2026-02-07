---
title: Interactive Dotplot Builder
description: An interactive MicroSim where students click on a number line to add data points and construct a dotplot, demonstrating how dotplots visualize the distribution of quantitative data.
quality_score: 85
image: /sims/interactive-dotplot-builder/interactive-dotplot-builder.png
og:image: /sims/interactive-dotplot-builder/interactive-dotplot-builder.png
twitter:image: /sims/interactive-dotplot-builder/interactive-dotplot-builder.png
social:
   cards: false
---
# Interactive Dotplot Builder

<iframe src="main.html" height="432px" width="100%" scrolling="no"></iframe>

[Run the Interactive Dotplot Builder MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Interactive Dotplot Builder MicroSim with the p5.js Editor](https://editor.p5js.org/)

Place the following line in your website to include this in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/interactive-dotplot-builder/main.html" height="432px" scrolling="no"></iframe>
```

## Description

This MicroSim helps students understand how dotplots are constructed by allowing them to click on a number line to add individual data points. Each click places a dot at the nearest integer value, and dots stack vertically when multiple observations share the same value. This hands-on approach reinforces the concept that each dot represents one observation in the dataset.

**How to Use:**

1. **Add Data Points**: Click anywhere on or above the number line to add a dot at the nearest integer value (0-15)
2. **Clear All**: Remove all data points and start fresh
3. **Load Sample Data**: Load a pre-made dataset of study hours to see a typical distribution
4. **Random Data**: Generate 10-20 random values to explore different distributions
5. **Dot Size**: Use the radio buttons to adjust dot size for better visibility

The display panel shows the current count of observations, the dataset values, and basic statistics (minimum, maximum, and range).

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

- Demonstrate how to construct a dotplot by placing individual data points on a number line
- Explain that each dot represents one observation in the dataset
- Identify clusters, gaps, and the overall shape of a distribution
- Describe the spread of data using minimum, maximum, and range

### Target Audience

- High school students in introductory statistics (AP Statistics)
- College students in introductory statistics courses
- Grade level: 9-12 and undergraduate

### Prerequisites

- Understanding of quantitative vs. categorical data
- Familiarity with number lines
- Basic understanding of what a dataset is

### Activities

**Activity 1: Build Your Own Dotplot (10 minutes)**

1. Clear the dotplot and create your own dataset by clicking to add at least 15 data points
2. Try to create a dataset that shows: a symmetric distribution, then clear and create one with a skewed distribution
3. Observe how the shape changes as you add more points

**Activity 2: Explore the Sample Data (5 minutes)**

1. Click "Load Sample Data" to see study hours data
2. Identify the mode (most common value), any clusters, and any gaps
3. Discuss: What can you conclude about students' study habits from this distribution?

**Activity 3: Random Data Investigation (10 minutes)**

1. Click "Random Data" several times and observe different distributions
2. For each random dataset, describe: the shape, the center (approximately), and the spread
3. Compare: Do random datasets tend to look similar or different? Why?

### Assessment

- Ask students to sketch a dotplot by hand after using the interactive version
- Have students describe a distribution shown in the MicroSim using statistical vocabulary
- Quiz: Given a list of data values, have students predict what the dotplot will look like before clicking "Load Sample Data"

## References

1. [Dotplots - Wikipedia](https://en.wikipedia.org/wiki/Dot_plot_(statistics)) - General reference on dotplots as a statistical visualization method

2. [AP Statistics Course Description](https://apcentral.collegeboard.org/courses/ap-statistics) - College Board - Official course framework including dotplot construction skills

3. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used in this MicroSim
