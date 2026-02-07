---
title: Skewness Explorer
description: Interactive MicroSim where students classify distributions as symmetric, skewed left, or skewed right by examining histograms with real-world contexts and visual hints.
quality_score: 85
image: /sims/skewness-explorer/skewness-explorer.png
og:image: /sims/skewness-explorer/skewness-explorer.png
twitter:image: /sims/skewness-explorer/skewness-explorer.png
social:
   cards: false
---
# Skewness Explorer

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Skewness Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/skewness-explorer/main.html" height="482px" width="100%" scrolling="no"></iframe>
```

## About This MicroSim

The Skewness Explorer is an interactive visualization designed to help students classify distributions as **symmetric**, **skewed left**, or **skewed right**. Understanding skewness is a fundamental skill in statistics that helps students describe the shape of data distributions and make appropriate choices about summary statistics.

### How to Use

1. **Examine the Histogram**: Look at the shape of the distribution displayed. Notice where the peak is located and which direction the tail extends.

2. **Classify the Distribution**: Click one of the three classification buttons:
   - **Skewed Left**: The left tail is longer (data bunches on the right)
   - **Symmetric**: Both tails are approximately equal length
   - **Skewed Right**: The right tail is longer (data bunches on the left)

3. **Use Hints**: Click "Show Hint" to highlight the tails and see which one is longer.

4. **Check Your Answer**: Click "Show Answer" if you need to see the correct classification.

5. **Practice More**: Click "Next Example" to generate a new distribution.

6. **Explore Modes**:
   - **Real-World Mode**: See distributions with context (e.g., household income, exam scores)
   - **Random Mode**: Adjust the skewness slider to create custom distributions

### Key Concepts

- **Skewed Right (Positive Skew)**: The right tail is longer. Common examples include income, home prices, and wait times. The mean is pulled toward the tail.

- **Skewed Left (Negative Skew)**: The left tail is longer. Common examples include easy exam scores and retirement ages. The mean is pulled toward the tail.

- **Symmetric**: Both tails are equal. The mean and median are approximately equal. Common examples include heights and measurement errors.

### Tips for Classification

- Look at the **tails**, not the peak
- Ask yourself: "Which direction does the longer tail point?"
- The skew is named for the direction of the **tail**, not the peak
- Remember: "The tail tells the tale!"

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Identify whether a distribution is symmetric, skewed left, or skewed right by examining a histogram
2. Explain the relationship between tail direction and skewness classification
3. Connect real-world contexts to their typical distribution shapes
4. Predict how skewness affects the relationship between mean and median

### Target Audience

- AP Statistics students
- College introductory statistics courses
- Students in Chapter 3: Displaying Quantitative Data

### Prerequisites

- Understanding of histograms
- Basic vocabulary: distribution, shape, center

### Suggested Activities

**Activity 1: Warm-Up Classification (5 minutes)**

Have students work individually through 5 examples in Real-World mode, recording their answers and streak. Discuss any commonly missed examples as a class.

**Activity 2: Context Connections (10 minutes)**

In pairs, students brainstorm why each real-world context has its typical skew:

- Why is household income right-skewed?
- Why are easy exam scores left-skewed?
- Why are adult heights approximately symmetric?

**Activity 3: Custom Exploration (5 minutes)**

Switch to Random mode. Students adjust the slider to:

- Create a perfectly symmetric distribution (skewness = 0)
- Create a strongly right-skewed distribution (skewness > 1.5)
- Create a moderately left-skewed distribution (skewness between -0.5 and -1)

**Activity 4: Mean vs. Median Discussion (5 minutes)**

For each type of skewness, predict:

- Is the mean greater than, less than, or equal to the median?
- Where would you expect the mean to be located on the histogram?

### Assessment Suggestions

1. **Quick Check**: Show 5 histograms and have students classify each
2. **Exit Ticket**: Given a real-world scenario, predict the skewness and explain why
3. **Extended Response**: Explain why income data is typically right-skewed and why this matters for choosing between mean and median income as a summary statistic

### Bloom's Taxonomy Alignment

- **Remember**: Recall that skewness describes distribution shape
- **Understand**: Classify distributions by their skewness (primary objective)
- **Apply**: Predict skewness for new real-world contexts
- **Analyze**: Explain why certain contexts produce specific skewness patterns

## References

1. [Wikipedia: Skewness](https://en.wikipedia.org/wiki/Skewness) - Comprehensive overview of skewness measures and their mathematical properties

2. [Khan Academy: Describing Shape of Distributions](https://www.khanacademy.org/math/statistics-probability/summarizing-quantitative-data/mean-median-basics/a/mean-and-median-in-skewed-distributions) - Interactive lessons on distribution shapes and their relationship to center measures

3. [AP Statistics Course Framework](https://apcentral.collegeboard.org/courses/ap-statistics) - College Board curriculum standards for displaying and describing quantitative data

---

*Reminder: Please create a screenshot of this MicroSim named `skewness-explorer.png` and add it to this directory for social media previews.*
