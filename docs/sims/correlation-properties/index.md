---
title: Correlation Properties Explorer
description: An interactive scatterplot where students drag points, toggle outliers, swap axes, and change units to discover the key properties of the correlation coefficient.
quality_score: 94
image: /sims/correlation-properties/correlation-properties.png
og:image: /sims/correlation-properties/correlation-properties.png
twitter:image: /sims/correlation-properties/correlation-properties.png
social:
   cards: false
---
# Correlation Properties Explorer

<iframe src="main.html" height="502px" scrolling="no"></iframe>

[Run the Correlation Properties Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

## Embedding This MicroSim

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/correlation-properties/main.html" height="502px" scrolling="no"></iframe>
```

## About This MicroSim

The Correlation Properties Explorer helps students develop intuition for how the correlation coefficient \( r \) behaves under various transformations and conditions. Rather than memorizing properties, students discover them through direct manipulation and observation.

The scatterplot starts with 8 points showing a moderate positive correlation. Students can drag any point and watch the r-value update in real time. Points are color-coded based on their contribution to the correlation: green for points that strengthen the linear pattern, red for points that weaken it, and blue for neutral contributions.

### Key Properties Demonstrated

| Property | How to Explore |
|----------|----------------|
| **r is bounded (-1 to 1)** | Try dragging points to extreme positions; r never exceeds this range |
| **r is unitless** | Use the unit buttons to scale or shift data; r stays exactly the same |
| **r is symmetric** | Click "Swap Axes" to exchange x and y; r remains unchanged |
| **r is sensitive to outliers** | Toggle "Add Outlier" to see dramatic r-value changes |
| **Points contribute differently** | Color gradient shows which points most affect the correlation |

### Interactive Controls

| Control | Function |
|---------|----------|
| **Drag points** | Move any point to see real-time r-value updates |
| **Add Outlier** | Toggle an extreme point that dramatically affects correlation |
| **Swap Axes** | Exchange x and y to demonstrate symmetry property |
| **Unit buttons** | Apply transformations (scale x2, shift +50, etc.) showing r is unitless |
| **Reset Points** | Return to the original 8-point dataset |
| **Add Random Pt** | Grow the dataset with a randomly placed point |

### Visual Features

- **Color-coded points**: Green = strengthens correlation, Red = weakens it, Blue = neutral
- **Real-time r display**: Large, prominently displayed correlation coefficient
- **Before/After comparison**: See how your last action changed r
- **Strength interpretation**: Text description of correlation strength
- **Properties reminder panel**: Quick reference for key correlation properties

## Lesson Plan

### Learning Objective

Students will investigate how changing data affects the correlation coefficient and develop intuition for the mathematical properties of correlation.

### Bloom's Taxonomy Level

**Analyze (Level 4)** - Students analyze how individual data points influence the overall correlation and predict the effects of various transformations.

### Prerequisites

- Understanding of scatterplots and what they represent
- Basic concept of positive and negative relationships
- Introduction to the correlation coefficient \( r \)

### Suggested Activities

**Discovery Phase (15 minutes)**

Have students work individually or in pairs to explore each property:

1. **Outlier Impact Challenge**
   - Start with the default dataset and note the r-value
   - Toggle the outlier on and record the new r-value
   - Drag the outlier to different positions - can you make r become negative?
   - Question: "Why does one point have such a big effect?"

2. **Unit Invariance Discovery**
   - Click through each unit button while watching r
   - Observation: What happens to the axis labels? What happens to r?
   - Question: "If we measured height in inches vs. centimeters, would the correlation between height and weight change?"

3. **Symmetry Verification**
   - Note the current r-value
   - Click "Swap Axes" and observe
   - Question: "Does it matter which variable goes on which axis when calculating r?"

**Structured Investigation (10 minutes)**

Guide the whole class through these scenarios:

1. Start with Reset Points
2. Systematically drag points from the edges toward the center
3. Predict: "Will r increase or decrease?"
4. Verify and discuss why

**Reflection and Connection (10 minutes)**

Discussion questions:

- "If correlation is unitless, what does that mean for comparing studies done in different countries with different measurement systems?"
- "A researcher calculates r = 1.15. What can you immediately conclude?"
- "Why is it important to plot your data before calculating r?"

### Assessment Ideas

**Formative**

- Ask students to predict what will happen before each manipulation, then verify
- Have students explain why the outlier affects r so dramatically

**Summative**

- Present scenarios and ask students to predict the effect on r (without using the simulation)
- Given a correlation value and a described transformation, predict the new r

### Differentiation

- **Struggling students**: Focus on the outlier toggle first; the dramatic change makes the concept concrete
- **Advanced students**: Challenge them to create a dataset where adding a point increases r, then another where it decreases r
- **Visual learners**: Emphasize the color-coding of point contributions

### Common Misconceptions to Address

1. **"Changing units should change r"** - Use the unit buttons to show this is false
2. **"Outliers always decrease r"** - Show that a well-placed outlier can actually increase r
3. **"The point furthest from others has the biggest effect"** - Demonstrate that position relative to the pattern matters more than distance from other points

## Connections to Standards

This MicroSim supports learning objectives related to:

- Calculating and interpreting the correlation coefficient
- Understanding properties of correlation
- Recognizing the effect of outliers on statistical measures
- Distinguishing between correlation and causation (discussed in accompanying text)

## References

- [AP Statistics: Describing Bivariate Data](https://apstudents.collegeboard.org/courses/ap-statistics)
- [Understanding Correlation Coefficient Properties](https://en.wikipedia.org/wiki/Pearson_correlation_coefficient#Mathematical_properties)
- Chapter 6: Scatterplots and Association

---

*Note: Remember to capture a screenshot of this MicroSim and save it as `correlation-properties.png` in this folder for social media previews.*
