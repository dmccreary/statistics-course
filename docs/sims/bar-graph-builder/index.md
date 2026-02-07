---
title: Bar Graph Builder
description: An interactive MicroSim where students construct bar graphs from categorical data by entering category names and frequencies, with options for vertical/horizontal orientation and frequency/relative frequency display.
quality_score: 85
image: /sims/bar-graph-builder/bar-graph-builder.png
og:image: /sims/bar-graph-builder/bar-graph-builder.png
twitter:image: /sims/bar-graph-builder/bar-graph-builder.png
social:
   cards: false
---
# Bar Graph Builder

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run the Bar Graph Builder MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Welcome to the Bar Graph Builder. This interactive tool lets you construct your own bar graphs from categorical data. Enter category names and frequencies, then watch your graph update in real time.

As Sylvia would say: "Let's crack this nut! Building bar graphs is like organizing your acorn stash - once you see the piles, you can compare them at a glance."

## How to Use

1. **Enter Data**: Click on any category name or frequency value in the right panel to edit it
2. **Add Categories**: Click "Add Category" to add up to 6 categories
3. **Remove Categories**: Click "Remove" to delete the last category
4. **Change Display**:
   - Toggle between **Frequency** (raw counts) and **Relative Frequency** (percentages)
   - Switch between **Vertical** and **Horizontal** bar orientations
5. **Change Color**: Click the color swatch to choose a different bar color

## Embedding This MicroSim

Place the following line in your website to include this in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/bar-graph-builder/main.html" height="502px" width="100%" scrolling="no"></iframe>
```

## Description

This MicroSim supports the learning objective: **Students will construct bar graphs from categorical data.** At Bloom's Taxonomy Apply level (L3), students actively construct and demonstrate their understanding by:

- Entering their own category names and frequency values
- Observing how the bar graph updates immediately
- Comparing frequency vs. relative frequency representations
- Switching between vertical and horizontal orientations to see how the same data can be displayed differently

The default dataset shows seasonal preferences: Spring (8), Summer (22), Fall (14), Winter (6). Students can modify this data or create entirely new datasets to explore bar graph construction.

## Key Concepts Demonstrated

- **Categorical Variables**: Bar graphs display data for categorical (qualitative) variables
- **Frequency**: The count of observations in each category
- **Relative Frequency**: The proportion or percentage of observations in each category (all bars sum to 100%)
- **Bar Height/Length**: Represents the frequency or relative frequency
- **Axis Labels**: Proper labeling of category axis and frequency axis
- **Graph Orientation**: Vertical bars (column chart) vs. horizontal bars

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Construct a bar graph from a given set of categorical data
2. Distinguish between frequency and relative frequency displays
3. Interpret bar heights/lengths as representations of data values
4. Choose appropriate graph orientations for different contexts

### Warm-Up Activity (5 minutes)

Ask students: "What's your favorite season?" Collect a quick show of hands and record the counts on the board. Then show how the default MicroSim data represents similar seasonal preference data.

### Guided Exploration (10 minutes)

1. Walk through the default dataset together
2. Ask prediction questions: "If I change Summer from 22 to 10, what will happen to the bars?"
3. Switch to relative frequency view and discuss: "Why might percentages be more useful than raw counts?"
4. Switch to horizontal orientation: "When might horizontal bars be preferred?"

### Independent Practice (15 minutes)

Have students:

1. Create a bar graph for their own dataset (favorite colors, pet types, etc.)
2. Answer these questions in their notes:
   - Which category has the highest frequency?
   - What percentage does your smallest category represent?
   - Does vertical or horizontal better display your data? Why?

### Assessment Questions

1. What type of variable is displayed in a bar graph? (categorical/qualitative)
2. What happens to the relative frequency bars when you add a new category?
3. Why do all relative frequency percentages sum to 100%?
4. How is a bar graph different from a histogram?

### Extension Activities

- **Data Collection**: Have students collect real data from classmates and build a bar graph
- **Comparison**: Create two bar graphs with the same categories but different data to compare distributions
- **Critical Thinking**: Discuss how bar order (alphabetical vs. by frequency) affects interpretation

## References

- OpenIntro Statistics, Chapter 2: Summarizing Data
- Khan Academy: Reading Bar Graphs
- [p5.js Reference Documentation](https://p5js.org/reference/)

---

*Acorn for your thoughts: Notice how the tallest bar jumps out at you? That's the mode - the most frequent category. Bar graphs make finding the mode as easy as spotting the biggest acorn pile!* - Sylvia
