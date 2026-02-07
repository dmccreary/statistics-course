---
title: SOCS Description Builder
description: An interactive MicroSim where students compose complete distribution descriptions using the SOCS framework (Shape, Outliers, Center, Spread) by analyzing histograms and selecting appropriate characteristics.
quality_score: 85
image: /sims/socs-description-builder/socs-description-builder.png
og:image: /sims/socs-description-builder/socs-description-builder.png
twitter:image: /sims/socs-description-builder/socs-description-builder.png
social:
   cards: false
---
# SOCS Description Builder

<iframe src="main.html" height="552" width="100%" scrolling="no"></iframe>

[Run the SOCS Description Builder Fullscreen](./main.html){ .md-button .md-button--primary }

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/socs-description-builder/main.html" height="552" width="100%" scrolling="no"></iframe>
```

## About This MicroSim

The SOCS Description Builder helps students practice composing complete, professional distribution descriptions using the SOCS framework. SOCS stands for:

- **S**hape: Is the distribution symmetric, skewed left, or skewed right?
- **O**utliers: Are there any unusual values far from the main group?
- **C**enter: What is a typical value? (usually median for skewed data)
- **S**pread: How much do the values vary? (often measured by IQR)

### How to Use

1. **Observe the histogram** on the left side showing a real-world dataset
2. **Select SOCS components** using the dropdowns on the right:
   - Choose the shape (symmetric, skewed left, skewed right)
   - Identify any outliers (none, low, high, or both)
   - Enter an estimate for the center value
   - Enter an estimate for the spread
   - Optionally select the modality (unimodal, bimodal, uniform)
3. **Watch your description build** in real-time in the preview panel
4. **Click "Generate Description"** when you've completed all components
5. **Click "Compare to Expert"** to see how your description matches an expert response
6. **Click "New Dataset"** to practice with a different distribution

### Sample Contexts

The MicroSim includes various real-world contexts:

- **Coffee wait times** (typically skewed right with high outliers)
- **Easy exam scores** (typically skewed left with low outliers)
- **Mixed heights** (bimodal distribution from mixed groups)
- **Commute times** (skewed right with occasional long delays)
- **Product ratings** (skewed left as most customers are satisfied)
- **Uniform random** (flat distribution with no clear peaks)

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Identify the four components of a complete distribution description (SOCS)
2. Recognize different distribution shapes from histograms
3. Distinguish between unimodal, bimodal, and uniform distributions
4. Identify potential outliers in a distribution
5. Estimate appropriate measures of center and spread
6. Compose coherent, professional descriptions of distributions

### Target Audience

- AP Statistics students (Chapter 3: Displaying Quantitative Data)
- College introductory statistics students
- Data science beginners learning exploratory data analysis

### Prerequisites

Before using this MicroSim, students should understand:

- How to read and interpret histograms
- The difference between mean and median
- Basic concepts of variability (range, IQR)
- What outliers are and how they affect distributions

### Suggested Activities

**Activity 1: Guided Practice (15 minutes)**

1. Project the MicroSim for the class
2. Generate a new dataset and analyze it together
3. Model the thinking process: "I see the bars are taller on the left and trail off to the right, so this is skewed right..."
4. Complete each SOCS component with class input
5. Compare to the expert description and discuss any differences

**Activity 2: Independent Practice (20 minutes)**

1. Students work individually or in pairs
2. Complete at least 5 different datasets
3. Record their scores for each attempt
4. Goal: Achieve 80% or higher on at least 3 datasets

**Activity 3: Peer Review (15 minutes)**

1. Partners take turns describing distributions
2. One student analyzes while the other checks using "Compare to Expert"
3. Discuss discrepancies and refine understanding

### Assessment Suggestions

- **Formative**: Monitor scores during independent practice (aim for 75%+)
- **Exit Ticket**: Give students a new histogram (paper) and have them write a complete SOCS description
- **Quiz Question**: "Which of the following is a complete description of the distribution?" (multiple choice with SOCS checklist)

### Common Misconceptions to Address

1. **Confusing skewness direction**: The tail points in the direction of the skew
2. **Forgetting context**: Always use the variable name and units
3. **Using mean for skewed data**: Median is more appropriate when skewed
4. **Ignoring outliers**: They should always be mentioned (even if there are none)
5. **Vague spread descriptions**: Use specific measures like IQR, not just "spread out"

### Extension Activities

- Have students collect their own data and create SOCS descriptions
- Compare how different descriptions of the same data emphasize different features
- Discuss when different measures of center/spread are most appropriate

## References

1. [AP Statistics Course Description](https://apcentral.collegeboard.org/courses/ap-statistics) - College Board - The official curriculum guide for AP Statistics, including standards for describing distributions.

2. [Introduction to the Practice of Statistics](https://www.macmillanlearning.com/college/us/product/Introduction-to-the-Practice-of-Statistics/p/1319013384) - Moore, McCabe, and Craig - 2021 - The textbook that popularized the SOCS framework for teaching distribution descriptions.

3. [Teaching Statistics: A Bag of Tricks](https://www.cambridge.org/core/books/teaching-statistics/D7F6E2E8E2B5C7A7D7F6E2E8E2B5C7A7) - Gelman and Nolan - 2017 - Practical strategies for teaching statistical concepts including distribution descriptions.

4. [Guidelines for Assessment and Instruction in Statistics Education (GAISE)](https://www.amstat.org/education/guidelines-for-assessment-and-instruction-in-statistics-education-(gaise)-reports) - American Statistical Association - 2016 - Framework for statistics education emphasizing conceptual understanding.
