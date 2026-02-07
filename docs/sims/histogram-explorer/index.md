---
title: Interactive Histogram Explorer
description: An interactive MicroSim where students examine how changing bin width affects histogram appearance, with multiple datasets and display options.
quality_score: 92
image: /sims/histogram-explorer/histogram-explorer.png
og:image: /sims/histogram-explorer/histogram-explorer.png
twitter:image: /sims/histogram-explorer/histogram-explorer.png
social:
   cards: false
---
# Interactive Histogram Explorer

<iframe src="main.html" height="552px" scrolling="no"></iframe>

[Run the Histogram Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Histogram Explorer MicroSim with the p5.js editor](https://editor.p5js.org/)

## Iframe Embed Code

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/histogram-explorer/main.html" height="552px" scrolling="no"></iframe>
```

## Description

This interactive histogram explorer helps students understand one of the most important concepts in data visualization: how bin width choices affect the appearance and interpretation of histograms. By manipulating the bin width slider, students can observe how the same dataset can look dramatically different depending on binning decisions.

**Key features:**

- **Bin Width Slider (2-20)**: Adjust to see how narrower bins reveal more detail while wider bins show broader patterns
- **Multiple Datasets**: Test Scores (n=40), Heights (n=100), Temperatures (n=365), and a bimodal Custom dataset (n=50)
- **Frequency vs Relative Frequency**: Toggle between count-based and proportion-based displays
- **Show Data Points**: Overlay the actual data values below the histogram
- **Hover Highlighting**: Move your mouse over bars to see exact counts
- **Visual Warnings**: The MicroSim warns when bin widths may be too narrow (losing the pattern) or too wide (losing detail)
- **Statistics Panel**: Displays n, min, max, range, and current number of bins

## Lesson Plan

### Learning Objective

Students will be able to examine how changing bin width affects histogram appearance by manipulating the bin width slider and observing how the shape, pattern visibility, and interpretability of the histogram changes.

**Bloom's Taxonomy Level**: Analyze (L4)

**Bloom's Verb**: Examine

### Prerequisites

- Understanding of what a histogram represents
- Familiarity with frequency and relative frequency concepts
- Basic knowledge of data distribution shapes (symmetric, skewed, bimodal)

### Suggested Duration

15-20 minutes for guided exploration

### Classroom Activities

#### Activity 1: Discover the Goldilocks Zone (5 minutes)

1. Start with the Test Scores dataset at the default bin width of 10
2. Have students drag the slider all the way left (bin width = 2) and describe what they see
3. Then drag all the way right (bin width = 20) and describe again
4. Ask: "Which bin width tells the best story about this data? Why?"

#### Activity 2: Dataset Comparison (5 minutes)

1. Keep bin width at 10 and switch between all four datasets
2. For each dataset, ask students to adjust the bin width until they find the most informative view
3. Discuss: "Why might different datasets need different bin widths?"

#### Activity 3: Pattern Recognition (5 minutes)

1. Select the Custom dataset (which is bimodal)
2. Start at bin width 20 - can students see that it's bimodal?
3. Gradually decrease bin width - at what point do two peaks become visible?
4. Discuss: "How might using the wrong bin width lead to incorrect conclusions?"

### Discussion Questions

1. What happens to the number of bins as you increase the bin width?
2. Why might relative frequency be more useful than raw frequency when comparing different-sized datasets?
3. How does the Temperatures dataset differ from the Test Scores dataset in shape?
4. What real-world decisions might depend on choosing an appropriate bin width?

### Assessment Opportunities

- Have students sketch the same dataset at three different bin widths and explain which they would use in a report
- Ask students to predict what a histogram will look like before changing the bin width
- Have students identify when the warning messages appear and explain why

### Common Misconceptions to Address

- **More bins = more accurate**: Explain that too many bins can create noise and hide patterns
- **Bin width is objective**: Emphasize that bin width is a choice that affects interpretation
- **Histograms show individual values**: Clarify that histograms show frequencies within ranges, not individual data points

## References

- [AP Statistics Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-statistics/course)
- [Guidelines for Assessment and Instruction in Statistics Education (GAISE)](https://www.amstat.org/education/guidelines-for-assessment-and-instruction-in-statistics-education-(gaise)-reports)
- Sturges, H.A. (1926). "The Choice of a Class Interval". Journal of the American Statistical Association.

## Technical Notes

- Built with p5.js 1.11.10
- Uses canvas-based controls for iframe compatibility
- Width-responsive design adapts to container size
- Drawing height: 400px, Control height: 150px, Total: 550px

---

**Reminder**: Create a screenshot named `histogram-explorer.png` for social media previews.
