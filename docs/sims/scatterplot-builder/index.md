---
title: Scatterplot Builder
description: Interactive tool for constructing scatterplots by clicking data table rows to plot points, helping students understand how paired data translates to coordinate positions.
quality_score: 90
bloom_level: 2
---
# Scatterplot Builder

<iframe src="main.html" height="452px" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit in p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Build scatterplots interactively by clicking rows in a data table. Each click plots the corresponding point on the coordinate plane, helping you visualize how paired observations become positions on a graph.

### How to Use

- **Click a row** in the data table to plot that point on the scatterplot
- **Hover over points** in the scatterplot to see their exact coordinates
- Use the **dropdown** to switch between three different datasets
- Click **Clear** to reset and start over
- Click **Show All** to display all points at once
- Toggle **Hide Grid/Show Grid** to customize the display

### Learning Objectives

Students will demonstrate understanding of scatterplot construction by:

- Placing data points at correct coordinate positions
- Interpreting how x and y values determine point location
- Recognizing patterns that emerge when all points are plotted

## Lesson Plan

### Learning Objective

Students will understand (Bloom Level 2) scatterplot construction by placing data points and interpreting their positions on a coordinate plane.

### Warm-Up Discussion (5 minutes)

Ask students: "If I tell you someone studied for 5 hours and got an 80 on a test, where would that information go on a graph?" Use this to introduce the concept of paired data and coordinate positioning.

### Guided Exploration (15 minutes)

1. **Start with Hours Studied/Test Score dataset**
   - Have students predict where the first point will appear before clicking
   - Click each row one at a time, discussing the x and y positions
   - Ask: "What happens as we move down the table?"

2. **Identify the pattern**
   - Once all points are plotted, ask: "What pattern do you see?"
   - Introduce vocabulary: positive association, direction, form

3. **Compare datasets**
   - Switch to Temperature/Ice Cream Sales
   - Discuss: "What pattern do you expect? Why?"

### Independent Practice (10 minutes)

Have students:

1. Clear the scatterplot and rebuild it from scratch
2. Hover over each point to verify coordinates match the table
3. Describe the pattern they observe in writing

### Extension Activities

- **Prediction challenge**: Show 8 of 10 points and have students predict where the last two should go
- **Pattern recognition**: Use all three datasets and rank them by strength of association
- **Real-world connection**: Have students collect their own paired data (e.g., shoe size vs. height)

### Assessment Questions

1. If a data point has coordinates (6, 75), what does the 6 represent? What does the 75 represent?
2. When you see points going from lower-left to upper-right, what kind of association is that?
3. Why is it helpful to plot data as a scatterplot instead of just looking at a table?

## Technical Details

- **Canvas size**: 700 x 450 (responsive width)
- **Draw height**: 350px
- **Control height**: 100px
- **Iframe height**: 452px (includes 2px border)
- **Library**: p5.js with canvas-based controls

## References

- Moore, D. S., Notz, W. I., & Fligner, M. A. (2021). *The Basic Practice of Statistics* (9th ed.). W. H. Freeman.
- Agresti, A., & Franklin, C. (2018). *Statistics: The Art and Science of Learning from Data* (4th ed.). Pearson.
- Common Core State Standards for Mathematics - Statistics and Probability (S-ID)
