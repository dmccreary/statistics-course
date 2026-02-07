---
title: Frequency Table Explorer
description: An interactive MicroSim where students practice calculating relative frequencies and percentages from raw frequency data using adjustable sliders.
quality_score: 85
image: /sims/frequency-table-explorer/frequency-table-explorer.png
og:image: /sims/frequency-table-explorer/frequency-table-explorer.png
twitter:image: /sims/frequency-table-explorer/frequency-table-explorer.png
social:
   cards: false
---
# Frequency Table Explorer

<iframe src="main.html" height="452px" width="100%" scrolling="no"></iframe>

[Run the Frequency Table Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Frequency Table Explorer MicroSim with the p5.js editor](https://editor.p5js.org/)

Place the following line in your website to include this in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/frequency-table-explorer/main.html" height="452px" width="100%" scrolling="no"></iframe>
```

## Description

This interactive MicroSim helps students understand how frequency tables work and how to calculate relative frequencies and percentages from raw count data.

**Key Features:**

- **Adjustable Sliders**: Drag the sliders next to each category to change frequency values (0-50)
- **Real-Time Calculations**: Watch relative frequencies and percentages update instantly as you adjust values
- **Visual Bars**: See proportional bars that represent each category's share of the total
- **Show Steps Toggle**: Click "Show Steps" to see the calculation process (frequency/total = relative frequency, then multiply by 100 for percentage)
- **Multiple Datasets**: Switch between three different categorical datasets (Favorite Season, Pet Preference, Transportation Mode)
- **Reset Button**: Return to default values anytime

**How to Use:**

1. Start by observing the default frequencies: 8, 22, 14, 6 (total = 50)
2. Notice how each relative frequency is calculated by dividing the frequency by the total
3. Click "Show Steps" to see the mathematical process
4. Drag sliders to explore how changing one frequency affects all the percentages
5. Try making all categories equal - what percentage does each get?
6. Switch datasets to practice with different category labels

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Calculate relative frequencies by dividing individual frequencies by the total
2. Convert relative frequencies to percentages by multiplying by 100
3. Verify that all relative frequencies sum to 1.000 and all percentages sum to 100%
4. Interpret frequency tables in context of categorical data

### Target Audience

- AP Statistics students (Chapter 2: Displaying Categorical Data)
- High school students (grades 9-12)
- College introductory statistics

### Prerequisites

- Understanding of fractions and decimals
- Basic division skills
- Familiarity with percentages

### Warm-Up Activity (5 minutes)

Ask students: "If a class has 30 students and 12 prefer summer as their favorite season, what fraction of the class prefers summer? What percentage is that?"

### Guided Exploration (10 minutes)

1. Display the MicroSim with default values
2. Point out the column structure: Category, Frequency, Relative Frequency, Percentage
3. Demonstrate how 22/50 = 0.440 and 0.440 x 100 = 44.0%
4. Click "Show Steps" to reveal the calculation process
5. Ask: "What do all the relative frequencies add up to?"

### Independent Practice (15 minutes)

Have students complete these challenges:

1. **Equal Distribution**: Adjust sliders so each category has the same frequency. What percentage does each get?
2. **Dominant Category**: Make one category have 80% of the total. What frequencies achieve this?
3. **Real Data**: Survey your table for favorite seasons and enter the data. Calculate if your results match the MicroSim.

### Discussion Questions

1. Why do relative frequencies always sum to 1.000?
2. When might relative frequencies be more useful than raw frequencies?
3. How does sample size affect the interpretation of percentages?

### Assessment

**Quick Check**: If a frequency table has total n = 80 and one category has frequency 20:

- What is the relative frequency? (Answer: 0.250)
- What is the percentage? (Answer: 25.0%)

### Extension Activities

1. Create a frequency table from class survey data on transportation to school
2. Compare two different sample sizes with the same proportions
3. Discuss how rounding affects the "100% check"

## References

1. [Khan Academy: Reading and Creating Frequency Tables](https://www.khanacademy.org/math/ap-statistics/analyzing-categorical-ap/one-categorical-variable/v/reading-frequency-tables) - Khan Academy - Video tutorial on frequency table fundamentals

2. [College Board AP Statistics Course Description](https://apcentral.collegeboard.org/courses/ap-statistics) - 2024 - College Board - Official AP Statistics curriculum framework including frequency distributions

3. [OpenIntro Statistics](https://www.openintro.org/book/os/) - 2022 - OpenIntro - Free statistics textbook with extensive coverage of categorical data displays

4. [p5.js Reference](https://p5js.org/reference/) - p5.js Foundation - Documentation for the JavaScript library used in this MicroSim
