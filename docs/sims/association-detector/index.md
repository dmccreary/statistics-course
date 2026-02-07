---
title: Association Detector Visualization
description: Interactive MicroSim for comparing conditional distributions using side-by-side 100% stacked bar charts to identify evidence of association between categorical variables.
quality_score: 86
image: /sims/association-detector/association-detector.png
og:image: /sims/association-detector/association-detector.png
twitter:image: /sims/association-detector/association-detector.png
social:
   cards: false
---

# Association Detector Visualization

<iframe src="main.html" height="522px" width="100%" scrolling="no"></iframe>

[Run Association Detector in Fullscreen](main.html){ .md-button .md-button--primary }

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/association-detector/main.html" height="522px" width="100%" scrolling="no"></iframe>
```

## Description

This MicroSim helps students understand **association between categorical variables** by comparing **conditional distributions** visually. When we have a two-way table (also called a contingency table), one key question is: "Does the distribution of one variable depend on the value of the other variable?"

The visualization displays:

- **Two horizontal 100% stacked bar charts**: Each bar represents the conditional distribution for one level of the row variable (e.g., Freshmen/Sophomores vs. Juniors/Seniors)
- **Color-coded segments**: Each segment shows the percentage of responses in that category (e.g., Fall, Winter, Spring, Summer)
- **Difference indicators**: Visual arrows highlight the largest difference between the two distributions

### How to Use

1. **Observe the default data**: The initial display shows Season preference by Grade Level with a moderate association
2. **Compare the bars**: If the bars look nearly identical, there is little evidence of association. If they look quite different, the variables may be associated
3. **Use presets**: Click "Strong," "None," or "Moderate" to see examples of different association strengths
4. **Edit the data**: Click on any cell in the two-way table to enter your own values
5. **Toggle options**: Use the "Show %" button to display/hide percentage labels, and "Highlight" to show/hide difference indicators

### Key Concepts

- **Conditional Distribution**: The distribution of one variable for a specific value of another variable
- **Association**: Two variables are associated if the conditional distribution of one variable changes depending on the value of the other
- **No Association**: If conditional distributions are nearly identical across all levels, the variables are independent

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. **Compare** conditional distributions displayed as 100% stacked bar charts
2. **Differentiate** between data showing strong, moderate, and no association
3. **Interpret** percentage differences as evidence for or against association
4. **Explain** in their own words what it means for two categorical variables to be associated

### Target Audience

- AP Statistics students
- Introductory college statistics students
- Grade level: 10-12 and undergraduate

### Prerequisites

- Understanding of categorical variables and two-way tables
- Ability to calculate and interpret percentages
- Familiarity with bar charts

### Duration

20-30 minutes

### Activities

**Warm-Up (5 minutes)**

1. Display the MicroSim with "No association" preset
2. Ask: "If you didn't know whether a student was a Freshman or Senior, would knowing their grade level help you predict their favorite season?"
3. Guide students to notice that the bars look identical when there's no association

**Exploration (10-15 minutes)**

1. Switch to "Strong association" preset
2. Discussion questions:
   - "How are these bars different from the 'No association' example?"
   - "Which season shows the biggest difference between grade levels?"
   - "If I told you a student's favorite season was Summer, could you guess their grade level?"

3. Have students experiment with "Moderate" association and describe the differences

4. Challenge: "Create your own data where Freshmen prefer Spring and Seniors prefer Fall"

**Analysis (10 minutes)**

1. Students enter their own data scenarios and analyze results
2. Journal prompt: "Describe in your own words what makes two categorical variables 'associated' versus 'independent'"
3. Group discussion: Share real-world examples where association between categorical variables matters

### Assessment Suggestions

**Formative Assessment**

- Observe student explanations during pair discussions
- Check journal responses for understanding of key concepts

**Summative Assessment**

Present students with a new two-way table (without the visualization) and ask them to:

1. Sketch what the 100% stacked bars would look like
2. Predict whether there is strong, moderate, or no association
3. Explain their reasoning using percentage comparisons

## References

1. [Wikipedia: Contingency Table](https://en.wikipedia.org/wiki/Contingency_table) - Background on two-way tables and tests for independence

2. [Khan Academy: Two-way Tables](https://www.khanacademy.org/math/statistics-probability/analyzing-categorical-data) - Video lessons on analyzing categorical data relationships

3. [OpenStax Statistics: Contingency Tables](https://openstax.org/books/introductory-statistics/pages/11-1-facts-about-the-chi-square-distribution) - College-level treatment of association and chi-square tests

4. [AP Statistics Course Framework](https://apcentral.collegeboard.org/courses/ap-statistics) - College Board standards for exploring categorical data (Unit 1)
