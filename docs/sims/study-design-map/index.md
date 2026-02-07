---
title: Study Design Concept Map
description: Interactive concept map showing how foundational statistics concepts connect in the context of a real research study about sleep and academic performance.
quality_score: 90
image: /sims/study-design-map/study-design-map.png
og:image: /sims/study-design-map/study-design-map.png
twitter:image: /sims/study-design-map/study-design-map.png
social:
   cards: false
---
# Study Design Concept Map

<iframe src="main.html" height="500px" width="100%" scrolling="no"></iframe>

[View Study Design Concept Map Fullscreen](./main.html){ .md-button .md-button--primary }

## Embed This Visualization

Place the following line in your website to include this visualization:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/study-design-map/main.html" height="500px" width="100%" scrolling="no"></iframe>
```

## Overview

This interactive concept map helps you see how all the foundational statistics concepts from Chapter 1 fit together. Using a real research study about sleep and academic performance as our example, you can explore how population connects to sample, how parameters relate to statistics, and how different types of variables work together in research design.

The hub-and-spoke layout places the "Study" at the center, with major concepts branching outward. Color coding helps you quickly identify concept categories:

- **Blue**: Population-related concepts (population, parameter)
- **Orange**: Sample-related concepts (sample, statistic, distribution)
- **Green**: Variable types (quantitative, categorical, continuous, discrete)
- **Purple**: Relationship concepts (explanatory and response variables)

## How to Use

1. **Click any node** to see its definition and a concrete example from the sleep study
2. **Watch the highlighting** - related concepts illuminate when you select a node
3. **Follow the arrows** to understand how information flows between concepts
4. **Click "Reset View"** to return to the starting state

## Key Concepts

### Population and Sample

The study starts with a **population** (all U.S. high school students) that we want to learn about. Since we cannot study everyone, we collect data from a **sample** (500 randomly selected students). The sample should represent the population.

### Parameters and Statistics

A **parameter** is a number describing the population (like the true average sleep hours for ALL students - unknown). A **statistic** is a number calculated from the sample (like 6.8 hours average in our sample). Statistics estimate parameters.

### Variables

**Variables** are characteristics we measure. They can be:

- **Quantitative** (numerical): Further divided into continuous (any value) and discrete (countable values)
- **Categorical** (groups): Like grade level or school type

### Explanatory and Response

In studies looking for relationships, the **explanatory variable** (sleep hours) is what we think might cause changes in the **response variable** (GPA).

## Lesson Plan

### Learning Objectives

After using this visualization, students will be able to:

1. Identify the hierarchical relationships between population, sample, parameter, and statistic
2. Classify variables as quantitative or categorical, and quantitative variables as continuous or discrete
3. Distinguish between explanatory and response variables in a research context
4. Explain how the concepts work together in a complete study design

### Activities

1. **Concept Exploration** (5 min): Click through each node, reading definitions and examples
2. **Connection Tracing** (5 min): Start at "Population" and trace all paths to understand the study structure
3. **Variable Classification** (5 min): For a new research scenario, use the map to classify variables correctly

### Assessment

- Can students trace the path from population to statistic and explain each step?
- Can students correctly categorize new variables using the variable hierarchy?
- Can students identify which variable is explanatory vs. response in a new scenario?

## Editing Node Positions

To edit node positions for better layout:

1. Open main.html with `?enable-save=true` parameter
2. Drag nodes to desired positions
3. Click "Save Node Positions" to download updated data
4. Update the JavaScript file with new coordinates

## References

- OpenStax Introductory Statistics, Chapter 1: Sampling and Data
- [vis-network Documentation](https://visjs.github.io/vis-network/docs/network/)
- Common Core State Standards for Mathematics: Statistics and Probability
