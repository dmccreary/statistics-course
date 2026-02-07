---
title: Outlier Detective Game
description: An interactive game where students identify outliers in real-world datasets by examining visual separation in dotplots and histograms.
quality_score: 92
image: /sims/outlier-detective/outlier-detective.png
og:image: /sims/outlier-detective/outlier-detective.png
twitter:image: /sims/outlier-detective/outlier-detective.png
social:
   cards: false
---
# Outlier Detective Game

<iframe src="main.html" height="462px" scrolling="no"></iframe>

[Run the Outlier Detective Game Fullscreen](./main.html){ .md-button .md-button--primary }

## Embedding This MicroSim

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/outlier-detective/main.html" height="462px" scrolling="no"></iframe>
```

## About This MicroSim

The Outlier Detective Game is an engaging way for students to develop their ability to identify outliers in datasets. Instead of memorizing rules like "1.5 times the IQR," students build intuition by examining data points visually and considering real-world context.

Each challenge presents a dataset with a story: test scores where one student was absent, ages at a birthday party including a parent chaperone, marathon times with an elite runner mixed in, or rainfall data that includes a hurricane day. Students must click on the points they believe are outliers, then submit their answer for scoring.

### Game Features

- **10 rounds** of outlier detection challenges
- **Scoring system**: +10 points for correct identifications, -5 for false positives
- **Three difficulty levels**: Easy shows obvious outliers, Hard may have none at all
- **Two view modes**: Dotplot for detailed point inspection, Histogram for distribution shape
- **Real-world contexts**: Each dataset tells a story that explains why outliers might exist
- **Immediate feedback**: See which points you correctly identified, missed, or incorrectly selected

### Controls

| Control | Function |
|---------|----------|
| **Dotplot/Histogram** | Toggle between visualization types |
| **Difficulty slider** | Easy (1-2 outliers), Medium (0-2), Hard (0-3, sometimes none) |
| **Submit Answer** | Check your selections and earn points |
| **Reveal Correct** | Show the actual outliers without scoring |
| **Next Challenge** | Move to the next round |

## Lesson Plan

### Learning Objective

Students will distinguish between outliers and non-outliers by examining visual separation in data displays and considering the context of the data collection.

### Bloom's Taxonomy Level

**Analyze (Level 4)** - Students analyze datasets to distinguish between data points that are part of the main distribution versus those that are unusually far from the center.

### Prerequisites

- Understanding of dotplots and histograms
- Basic concept of data distribution and spread
- Familiarity with terms like "center" and "variability"

### Suggested Activities

**Individual Exploration (10 minutes)**

1. Have students play 5 rounds on Easy difficulty
2. Ask: "What visual patterns help you spot outliers?"
3. Discuss: Why do outliers exist in real datasets?

**Class Discussion (10 minutes)**

Switch to Medium or Hard difficulty and project for the class:

- Before revealing answers, have students vote on which points are outliers
- Discuss why some cases are ambiguous
- Connect to the formal IQR rule without making it the focus

**Critical Thinking Extension**

Present these questions after gameplay:

1. "A student got a 0 on a test. Is this always an outlier? What if many students failed?"
2. "In the birthday party example, the parent's age is unusual. But is it an error? Should we remove it from our analysis?"
3. "What's the difference between an outlier and a data entry error?"

### Assessment

Formative assessment occurs naturally through the game's scoring system. For summative assessment, consider:

- Have students explain their reasoning for 2-3 specific cases
- Ask students to create their own "outlier scenario" with context
- Present a borderline case and have students argue both sides

### Differentiation

- **Struggling students**: Start with Easy mode, focus on the most extreme examples
- **Advanced students**: Challenge them to explain why Hard mode sometimes has no outliers
- **Visual learners**: Emphasize the dotplot view
- **Analytical learners**: Use histogram view to discuss distribution shape

## References

- [AP Statistics: Describing Distributions](https://apstudents.collegeboard.org/courses/ap-statistics)
- [Identifying Outliers: IQR Rule](https://en.wikipedia.org/wiki/Interquartile_range#Outliers)
- Chapter 3: Displaying Quantitative Data

---

*Note: Remember to capture a screenshot of this MicroSim and save it as `outlier-detective.png` in this folder for social media previews.*
