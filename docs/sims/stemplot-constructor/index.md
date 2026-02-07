---
title: Stemplot Constructor
description: An interactive MicroSim where students interpret how data values decompose into stems and leaves to build a stemplot visualization.
quality_score: 90
image: /sims/stemplot-constructor/stemplot-constructor.png
og:image: /sims/stemplot-constructor/stemplot-constructor.png
twitter:image: /sims/stemplot-constructor/stemplot-constructor.png
social:
   cards: false
---
# Stemplot Constructor

<iframe src="main.html" height="522px" scrolling="no"></iframe>

[Run the Stemplot Constructor MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Stemplot Constructor MicroSim with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

Sylvia pops up from behind a pile of acorns: "Let's crack this nut! Stemplots are one of my favorite ways to organize data because they let you see the actual numbers while also showing the shape of the distribution. It's like having your acorns sorted AND counted at the same time!"

This interactive MicroSim helps you understand how a stemplot (also called a stem-and-leaf plot) is constructed. You will see exactly how each data value gets split into its stem (the leading digit) and leaf (the trailing digit), then watch as the leaf gets placed in the correct sorted position.

## How to Use

1. **Enter Your Own Values**: Type a two-digit number (0-99) in the input box and click "Add Value" to see it decompose and join the stemplot
2. **Step Through**: Load a sample dataset and watch values being added one at a time - perfect for understanding the process
3. **Auto-Build**: Watch the entire dataset animate automatically at your chosen speed
4. **Clear**: Reset the stemplot to start fresh
5. **Dataset Dropdown**: Choose from Quiz Scores, Ages, or Heights sample datasets
6. **Speed Slider**: Adjust animation speed from 500ms (fast) to 2000ms (slow)

## Decomposition Animation

When a value like 85 is added, you will see:

1. The value **85** highlighted in yellow
2. An arrow showing the split: **8** (stem) and **5** (leaf)
3. The leaf **5** being placed in the row for stem **8**, in sorted order

The key at the bottom reminds you: **8 | 5 means 85**

## Embedding This MicroSim

Place the following line in your website to include this in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/stemplot-constructor/main.html" height="522px" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

- **Interpret** how a two-digit data value decomposes into a stem and a leaf
- **Explain** why the leaf is the last digit and the stem contains the remaining leading digit(s)
- **Predict** where a new value will be placed in an existing stemplot
- **Construct** a stemplot from a small dataset by hand

### Warm-Up (5 minutes)

Sylvia's tip: "Acorn for your thoughts? Before we dive in, try this: take the number 73 and split it into tens and ones. The tens digit becomes the stem, and the ones digit becomes the leaf. Now you're thinking like a statistician!"

1. Ask students: "If I have the value 47, what would be the stem? What would be the leaf?"
2. Have students practice splitting 3-4 values mentally before using the MicroSim

### Guided Exploration (10 minutes)

1. Load the "Quiz Scores" dataset
2. Click "Step Through" and pause after each value to discuss:
   - What stem row does this value belong to?
   - Where in the row should the leaf go (sorted order)?
3. After 5-6 values, have students predict where the next value will go

### Independent Practice (10 minutes)

1. Students clear the stemplot and enter their own values (5-10 values)
2. Challenge: Can they create a stemplot that shows a symmetric distribution? A skewed distribution?
3. Use "Auto-Build" with the speed slider to check understanding with a full dataset

### Assessment Questions

1. The value 62 is added to a stemplot. What is the stem? What is the leaf?
2. In a stemplot, you see: `7 | 2 4 8`. What three values does this represent?
3. Why do we sort the leaves in each row from smallest to largest?
4. A stemplot has stems 4, 5, 6, 7. What range of values could be in this dataset?

### Extension

"Now that's a data point worth collecting!" - Sylvia

For advanced students: Discuss what happens with three-digit values (like test scores out of 200). How would you modify the stem? What about decimal values?

## Concepts Covered

- Stemplot (stem-and-leaf plot)
- Data decomposition
- Place value in statistics
- Ordered data visualization
- Distribution shape

## References

- Chapter 3: Displaying Quantitative Data - Stemplots section
- [Khan Academy: Stem and Leaf Plots](https://www.khanacademy.org/math/statistics-probability/displaying-describing-data)
- [OpenIntro Statistics: Graphical Summaries](https://www.openintro.org/book/os/)

---

Reminder: Please create a screenshot of this MicroSim named `stemplot-constructor.png` and place it in this folder for social media previews.
