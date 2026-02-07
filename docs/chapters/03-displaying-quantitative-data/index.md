---
title: Displaying Quantitative Data
description: Learn to create and interpret dotplots, stemplots, and histograms while understanding distribution shapes and identifying outliers
generated_by: claude skill chapter-content-generator
date: 2026-02-06 18:09:08
version: 0.04
---

# Displaying Quantitative Data

## Summary

This chapter teaches students how to display quantitative data using various graphical methods including dotplots, stemplots, and histograms. Students will learn to describe the shape of distributions, identify symmetric and skewed patterns, and recognize outliers. These visualization skills are fundamental for exploratory data analysis.

## Concepts Covered

This chapter covers the following 13 concepts from the learning graph:

20. Dotplot
21. Stemplot
22. Histogram
23. Choosing Bin Width
24. Shape of Distribution
25. Symmetric Distribution
26. Skewed Left
27. Skewed Right
28. Unimodal Distribution
29. Bimodal Distribution
30. Uniform Distribution
31. Outlier
32. Identifying Outliers

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to Statistics](../01-introduction-to-statistics/index.md)

---

## Why Visualize Data?

Welcome back! In Chapter 1, you learned about the difference between categorical and quantitative variables. Now we're going to roll up our sleeves and actually *see* what quantitative data looks like. Because here's a little secret that statisticians know: numbers in a table are just... numbers. But put those same numbers into a graph, and suddenly patterns jump out at you like a squirrel spotting an acorn across the park.

Sylvia here has a confession: "When I first started tracking my acorn collection data, I just stared at lists of numbers. How many acorns did I find each day? 23, 18, 45, 12, 31, 28... It meant nothing to me! Then I made my first dotplot, and suddenly I could *see* that most days I found between 15 and 35 acorns, with a few exceptional days on either end. That's when I fell in love with data visualization."

In this chapter, you'll learn three powerful ways to display quantitative data:

- **Dotplots** - Simple and precise
- **Stemplots** - Quick and shows actual values
- **Histograms** - Great for larger datasets

More importantly, you'll learn to *describe* what you see. Is the data symmetric or skewed? Does it have one peak or two? Are there any unusual values lurking at the edges? Let's crack this nut!

---

## Dotplots: Your First Data Portrait

A **dotplot** is exactly what it sounds like: you put a dot above a number line for each value in your dataset. If you have repeated values, you stack the dots on top of each other. Simple, right?

Let's say your AP Statistics class of 15 students measured how many hours they studied last week. The data looks like this:

| Student | Hours Studied |
|---------|---------------|
| 1 | 4 |
| 2 | 6 |
| 3 | 5 |
| 4 | 8 |
| 5 | 5 |
| 6 | 7 |
| 7 | 5 |
| 8 | 6 |
| 9 | 3 |
| 10 | 6 |
| 11 | 5 |
| 12 | 9 |
| 13 | 6 |
| 14 | 5 |
| 15 | 7 |

To create a dotplot, you draw a horizontal number line covering your range of values (3 to 9 hours), then place a dot above the appropriate value for each observation. When multiple students studied the same number of hours, you stack the dots vertically.

#### Diagram: Interactive Dotplot Builder

<iframe src="../../sims/interactive-dotplot-builder/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Dotplot Builder MicroSim</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Taxonomy Verb: demonstrate

Learning Objective: Students will demonstrate how to construct a dotplot by clicking to add data points and observing how the visual representation changes.

Instructional Rationale: An Apply-level objective requires students to actively construct rather than passively observe. Clicking to add dots reinforces the one-to-one correspondence between data values and visual elements.

Canvas Layout:
- Width: 100% of container (responsive)
- Height: 450px
- Top section (350px): Dotplot visualization area with number line
- Bottom section (100px): Controls and data entry

Visual Elements:
- Horizontal number line from 0 to 15 (adjustable scale)
- Grid lines at each integer value
- Dots as filled circles (radius 12px) in blue
- Dots stack vertically with 2px gap when values repeat
- Current dataset displayed as comma-separated values
- Count of total observations shown

Interactive Controls:
- Click anywhere on the number line to add a dot at that value
- "Clear All" button to reset the dotplot
- "Load Sample Data" button to populate with study hours example
- "Random Dataset" button to generate 10-20 random values
- Radio buttons to select dot size (small/medium/large)

Default Parameters:
- Empty dotplot on load
- Number line range: 0-15
- Dot color: #4A90D9 (blue)
- Medium dot size selected

Behavior:
- When user clicks on number line, snap to nearest integer and add dot
- Dots stack automatically when values repeat
- Display running count of observations
- Show data values as text below the visualization
- Highlight the most recently added dot with a brief animation

Implementation: p5.js with canvas-based controls
</details>

**Why use a dotplot?** Dotplots are fantastic when you have a small to moderate amount of data (usually fewer than 50 observations) and you want to see every individual value. You can spot patterns, gaps, and clusters at a glance.

!!! tip "Sylvia Says"
    "I use dotplots for my weekly acorn counts because I can see exactly which days were bonanza days and which were duds. When you can see every data point, nothing hides from you!"

---

## Stemplots: Data with Structure

A **stemplot** (also called a stem-and-leaf plot) is a clever way to organize data that gives you the best of both worlds: you get a visual shape *and* you keep the actual values. Think of it as a dotplot that tells you exactly what each dot represents.

In a stemplot, each data value is split into a **stem** (typically all digits except the last one) and a **leaf** (typically the last digit). The stems are listed vertically, and the leaves are written horizontally next to their stem.

Let's use test scores from a recent quiz (out of 100 points):

67, 72, 74, 78, 81, 82, 85, 85, 86, 89, 91, 93, 94, 97

Here's the stemplot:

```
Stem | Leaf
  6  | 7
  7  | 2 4 8
  8  | 1 2 5 5 6 9
  9  | 1 3 4 7

Key: 7|2 means 72 points
```

Notice how the stemplot looks like a histogram turned on its side! You can see that most scores clustered in the 80s, with a lone score in the 60s.

**Important conventions for stemplots:**

- Always include a key that explains how to read the values
- List leaves in order from smallest to largest (left to right)
- Every stem should be listed, even if it has no leaves (to show gaps)
- Use equal spacing between leaves for accurate visual comparison

| Feature | Dotplot | Stemplot |
|---------|---------|----------|
| Shows individual values | No | Yes |
| Good for comparing two groups | Possible | Yes (back-to-back) |
| Best data size | 10-50 values | 15-100 values |
| Easy to construct by hand | Very easy | Easy |
| Preserves exact data | No | Yes |

#### Diagram: Stemplot Constructor

<iframe src="../../sims/stemplot-constructor/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Stemplot Constructor MicroSim</summary>
Type: microsim

Bloom Taxonomy: Understand (L2)
Bloom Taxonomy Verb: interpret

Learning Objective: Students will interpret how data values are decomposed into stems and leaves, understanding the organizational structure of a stemplot.

Instructional Rationale: Step-through visualization with concrete data is appropriate because the Understand/interpret objective requires learners to see exactly how each value maps to its stem-leaf representation. Animation would obscure the digit-splitting process.

Data Visibility Requirements:
- Stage 1: Show raw data value (e.g., "85")
- Stage 2: Show decomposition arrow: 85 → stem: 8, leaf: 5
- Stage 3: Show stem column with "8" highlighted
- Stage 4: Show leaf "5" being placed next to stem "8"
- Stage 5: Show complete stemplot with new value integrated

Canvas Layout:
- Width: 100% of container (responsive)
- Height: 500px
- Left panel (60%): Stemplot display area
- Right panel (40%): Data entry and controls

Visual Elements:
- Vertical stem column with dividing line
- Horizontal leaf rows extending from each stem
- Current data value being processed highlighted in yellow
- Stem-leaf decomposition shown with arrow animation
- Key displayed at bottom of stemplot
- Sample dataset shown in right panel

Interactive Controls:
- Text input field to enter new data values (two or three digits)
- "Add Value" button
- "Step Through" button to watch decomposition process
- "Auto-Build" button to animate full construction
- "Clear Stemplot" button
- Dropdown for sample datasets: Quiz Scores, Ages, Heights (cm)

Default Parameters:
- Empty stemplot on load
- Speed slider for auto-build: 500ms-2000ms per value
- Show decomposition animation by default

Behavior:
- When value entered, highlight it and show stem-leaf split
- Animate leaf placement in correct sorted position
- If leaf position requires shifting existing leaves, show this
- Display running statistics: count, min, max
- Key updates automatically based on data range

Implementation: p5.js with canvas-based controls
</details>

**Back-to-back stemplots** are a powerful variation when you want to compare two groups. The stems go in the middle, and leaves extend to both sides. For example, comparing quiz scores between two class periods:

```
Period 1 | Stem | Period 2
         |   6  | 7
    8  2 |   7  | 4 8 9
9 7 5 2  |   8  | 1 5 5 6
    4 1  |   9  | 1 3

Key: Period 1: 2|7 means 72    Period 2: 7|4 means 74
```

---

## Histograms: The Workhorse of Data Display

When you have lots of data, dotplots and stemplots become unwieldy. Imagine trying to draw 500 dots or organize 500 leaves! This is where **histograms** come to the rescue.

A histogram divides the data into **bins** (also called intervals or classes) and displays the count or frequency of observations in each bin as a bar. Unlike bar graphs for categorical data, histogram bars touch each other because the quantitative variable is continuous.

Consider this dataset of 40 test scores:

52, 55, 58, 61, 63, 65, 67, 68, 69, 70, 71, 72, 72, 73, 74, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 99

If we use bins of width 10 (50-59, 60-69, 70-79, etc.), we count how many values fall in each bin:

| Bin | Count |
|-----|-------|
| 50-59 | 3 |
| 60-69 | 6 |
| 70-79 | 10 |
| 80-89 | 10 |
| 90-99 | 11 |

Then we draw bars with heights equal to these counts. The bars touch because there's no gap between 59 and 60, or between 69 and 70.

#### Diagram: Interactive Histogram Explorer

<iframe src="../../sims/histogram-explorer/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Histogram Explorer MicroSim</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Taxonomy Verb: examine

Learning Objective: Students will examine how changing bin width affects the appearance and interpretation of a histogram, understanding the tradeoffs between detail and pattern visibility.

Instructional Rationale: An Analyze-level objective requires students to explore parameter changes and observe effects. Interactive exploration with immediate visual feedback allows students to discover the relationship between bin width and histogram appearance.

Canvas Layout:
- Width: 100% of container (responsive)
- Height: 550px
- Main area (400px): Histogram visualization
- Control area (150px): Sliders and buttons

Visual Elements:
- Histogram with bars touching (no gaps)
- X-axis with bin labels and tick marks
- Y-axis with frequency count
- Bin edges shown as vertical lines
- Current bin width displayed prominently
- Summary statistics panel: n, min, max, range

Interactive Controls:
- Bin width slider: range from 2 to 20 (for typical 0-100 data)
- Number of bins display (calculated from width)
- Dropdown to select dataset:
  - Test Scores (n=40, range 50-100)
  - Heights in inches (n=100, range 58-78)
  - Daily Temperatures (n=365, range 20-95)
  - Custom (enter comma-separated values)
- Checkbox: Show frequency vs relative frequency
- Checkbox: Show data points as dots above histogram
- "Reset to Default" button

Default Parameters:
- Test Scores dataset loaded
- Bin width: 10
- Show frequency (not relative frequency)
- Hide individual data points

Behavior:
- When bin width changes, histogram redraws smoothly
- Display warning when bins too narrow: "Too many bins may show noise"
- Display warning when bins too wide: "Too few bins may hide patterns"
- Highlight the current bin when hovering
- Show count and percentage for hovered bin
- Bars colored with gradient from light to dark blue

Implementation: p5.js with canvas-based controls
</details>

### Choosing Bin Width

Here's a genuine puzzle in statistics: there's no single "correct" bin width for a histogram. **Choosing bin width** involves balancing two competing goals:

- **Too narrow bins:** You see too much detail, including random noise that doesn't represent real patterns
- **Too wide bins:** You lose important features and everything looks too smooth

A common starting rule is to use between 5 and 15 bins for most datasets. Some textbooks suggest using the square root of the sample size as a starting point. But honestly? The best approach is to try several different bin widths and see which one tells the clearest story about your data.

!!! warning "Watch Out!"
    Two histograms of the same data can look completely different if they use different bin widths. Always check the x-axis scale and bin width before comparing histograms!

Sylvia's advice: "When I'm choosing bin width for my seasonal acorn data, I always ask myself: 'Does this histogram help me see the pattern, or is it confusing me?' If it looks like a jagged mountain range, my bins are probably too narrow. If it looks like a flat mesa, they're probably too wide. I'm looking for gentle rolling hills that reveal the true shape."

---

## The Shape of Distributions

Now comes the really fun part: learning to describe what you see! When statisticians look at a distribution (the overall pattern of data in a graph), they describe three key features:

1. **Shape** - The overall form of the distribution
2. **Center** - Where the "middle" of the data is located
3. **Spread** - How variable or spread out the data is

We'll focus on shape in this chapter (center and spread are coming in Chapter 4!). The **shape of distribution** tells us about the overall pattern in our data.

### Symmetric Distributions

A distribution is **symmetric** if the left side is roughly a mirror image of the right side. If you could fold the histogram down the middle, both sides would match up. Many natural phenomena produce symmetric distributions, including heights of adults, standardized test scores, and the number of petals on daisies.

#### Diagram: Symmetric Distribution Identifier

<iframe src="../../sims/symmetric-distribution/main.html" width="100%" height="400px" scrolling="no"></iframe>

<details markdown="1">
<summary>Symmetric Distribution Identifier</summary>
Type: microsim

Bloom Taxonomy: Remember (L1)
Bloom Taxonomy Verb: recognize

Learning Objective: Students will recognize symmetric distributions by comparing the visual appearance of the left and right sides of histograms.

Instructional Rationale: A Remember-level objective is best served by clear examples with immediate feedback. Students need to build mental models of what symmetry looks like before analyzing more complex shapes.

Canvas Layout:
- Width: 100% of container (responsive)
- Height: 400px
- Main area (300px): Histogram display
- Bottom area (100px): Classification buttons and feedback

Visual Elements:
- Histogram with 10-15 bars
- Vertical dashed line at center
- Fold animation showing left side flipping to right
- Green checkmark or red X for feedback
- Score counter: Correct / Total

Interactive Controls:
- "Symmetric" button
- "Not Symmetric" button
- "Next Distribution" button
- "Show Fold" button to animate folding
- Difficulty selector: Easy (obvious), Medium (subtle), Hard (close calls)

Default Parameters:
- Easy difficulty selected
- Score starts at 0/0
- Random symmetric or asymmetric distribution generated

Behavior:
- Display random histogram (50% chance symmetric)
- When student clicks button, show immediate feedback
- "Show Fold" animates left side folding over center line
- Track correct responses and display running score
- After 10 questions, show summary with commonly missed cases

Sample Distributions to Include:
- Normal-shaped (symmetric)
- Slightly skewed (not symmetric)
- Bimodal symmetric
- Bimodal asymmetric
- Uniform (symmetric)

Implementation: p5.js with canvas-based controls
</details>

### Skewed Distributions

Many real-world datasets are *not* symmetric. Instead, they have a **tail** that stretches out in one direction more than the other. We call these distributions **skewed**.

**Skewed right** (also called positively skewed): The tail stretches toward the higher values (to the right). Common examples include:

- Income and wealth data (most people earn modest amounts, but a few earn millions)
- Home prices (most homes are affordable, but some mansions cost millions)
- Time to complete a task (most finish quickly, some take much longer)

**Skewed left** (also called negatively skewed): The tail stretches toward the lower values (to the left). Examples include:

- Age at retirement (most retire around 65, but some retire much earlier)
- Test scores on an easy exam (most score high, but a few score very low)
- Age at death for adults (most live to old age, but some die young)

!!! tip "Memory Trick"
    "The skew is where the tail flies to!" If the tail goes right, it's skewed right. If the tail goes left, it's skewed left. Picture a bird with a long tail feather pointing in the direction of the skew.

#### Diagram: Skewness Explorer

<iframe src="../../sims/skewness-explorer/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Skewness Explorer MicroSim</summary>
Type: microsim

Bloom Taxonomy: Understand (L2)
Bloom Taxonomy Verb: classify

Learning Objective: Students will classify distributions as symmetric, skewed left, or skewed right by identifying the direction of the longer tail.

Instructional Rationale: Understanding skewness requires seeing multiple examples with varying degrees of asymmetry. Interactive classification with immediate feedback builds recognition skills before formal analysis.

Data Visibility Requirements:
- Stage 1: Show histogram of dataset
- Stage 2: Highlight the "peak" region
- Stage 3: Show arrows pointing to each tail
- Stage 4: Compare tail lengths visually
- Stage 5: Reveal classification with explanation

Canvas Layout:
- Width: 100% of container (responsive)
- Height: 480px
- Left side (70%): Histogram display with annotations
- Right side (30%): Classification panel and context

Visual Elements:
- Histogram with clear bars
- Arrows showing tail directions
- Highlighted peak region
- Tail length comparison overlay
- Real-world context label (e.g., "Income Data", "Test Scores")
- Visual aid showing direction of skew

Interactive Controls:
- Three classification buttons: "Skewed Left", "Symmetric", "Skewed Right"
- "Show Hint" button (highlights tails)
- "Show Answer" button
- "Next Example" button
- Slider to adjust skewness of a sample distribution
- Toggle: "Show real-world examples" vs "Random shapes"

Default Parameters:
- Start with random distribution
- Hints hidden
- Real-world context mode

Behavior:
- Display distribution with context (income, ages, scores, etc.)
- When student classifies, show correct answer with explanation
- "Show Hint" draws arrows on the tails
- Slider mode: adjust skewness from -2 to +2 and watch shape change
- Track accuracy across examples

Sample Contexts:
- Household Income (skewed right)
- Easy Exam Scores (skewed left)
- Heights of Adults (symmetric)
- Waiting Time at DMV (skewed right)
- Age at Retirement (skewed left)
- Weights of Newborns (symmetric)

Implementation: p5.js with canvas-based controls
</details>

Here's a comparison of the three main shapes:

| Shape | Left Tail | Right Tail | Peak Location | Examples |
|-------|-----------|------------|---------------|----------|
| Symmetric | Short | Short (equal) | Center | Heights, IQ scores |
| Skewed Right | Short | Long | Left side | Income, home prices |
| Skewed Left | Long | Short | Right side | Easy test scores, retirement age |

### Unimodal, Bimodal, and Uniform Distributions

The **mode** of a distribution refers to its peak or peaks. Describing the number of modes is another important aspect of shape.

A **unimodal distribution** has a single clear peak. Most of the distributions you'll encounter are unimodal. Think of test scores in a class, heights of students, or Sylvia's daily acorn counts.

A **bimodal distribution** has two distinct peaks. This often suggests that your data comes from two different groups! Examples include:

- Heights of adults (separate peaks for males and females)
- Eruption times at Old Faithful (short eruptions around 2 minutes, long ones around 4.5 minutes)
- Ages at a community center event (kids and grandparents, but few middle-aged adults)

!!! note "Why Two Peaks?"
    When you see a bimodal distribution, your first thought should be: "Is this actually two groups mixed together?" If so, you might want to analyze them separately!

A **uniform distribution** has no peaks at all; every value (or range of values) occurs with roughly equal frequency. Examples include:

- Rolling a fair die (each number 1-6 appears equally often)
- Birthdays throughout the year (roughly equal in each month)
- Random number generators (designed to be uniform)

#### Diagram: Distribution Shape Gallery

<iframe src="../../sims/distribution-shape-gallery/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Distribution Shape Gallery</summary>
Type: infographic

Bloom Taxonomy: Remember (L1)
Bloom Taxonomy Verb: identify

Learning Objective: Students will identify the key characteristics of unimodal, bimodal, and uniform distributions through visual comparison.

Purpose: Provide a reference gallery showing the visual characteristics of each distribution type with interactive exploration.

Layout:
- Width: 100% of container (responsive)
- Height: 450px
- Three columns, one for each distribution type
- Each column shows example histogram with labels

Visual Elements:
- Three histograms side by side: Unimodal, Bimodal, Uniform
- Each histogram labeled with:
  - Distribution name
  - Key visual feature (peak count)
  - Real-world example
- Hover over each to see additional examples
- Peak regions highlighted with subtle shading

Interactive Features:
- Click on any histogram to see larger version with more detail
- Hover shows tooltip with 2-3 additional real-world examples
- "Shuffle Examples" button to see different datasets with same shapes
- Quiz mode: "Which type is this?" with random distribution

Color Scheme:
- Unimodal: Blue gradient
- Bimodal: Purple gradient
- Uniform: Green gradient
- Consistent styling for visual learning

Content for Each Type:
Unimodal:
- Visual: Clear single peak in center
- Examples: Test scores, heights, weights
- Key phrase: "One main cluster"

Bimodal:
- Visual: Two distinct peaks with valley between
- Examples: Old Faithful eruptions, mixed populations
- Key phrase: "Two separate groups"

Uniform:
- Visual: Flat across all values
- Examples: Dice rolls, random numbers
- Key phrase: "All values equally likely"

Implementation: p5.js with hover effects and click handling
</details>

---

## Outliers: The Unusual Suspects

An **outlier** is an observation that falls notably far from the main pattern of the data. Outliers are important because they can:

- Represent genuine unusual cases worth investigating
- Result from measurement or recording errors
- Dramatically affect statistical calculations

Sylvia shares a story: "One autumn, I recorded collecting 247 acorns in a single day. That was WAY more than my usual 20-40. At first, I thought I'd made a counting error. But then I remembered, that was the day the old oak tree by the library finally dropped all its acorns at once! The outlier was real, and it had a fascinating story behind it."

When you spot an outlier, don't automatically throw it out! Instead, investigate:

1. Is the value a typo or recording error?
2. Is there a special explanation for this unusual value?
3. Does the outlier represent a different population?

### Identifying Outliers Visually

**Identifying outliers** starts with looking at your graphs. On a dotplot, stemplot, or histogram, outliers appear as:

- Isolated dots separated from the main cluster
- Leaves standing alone on a stem far from others
- Bars separated by empty bins from the main group

Later in this course, you'll learn a mathematical method called the **1.5 IQR rule** for formally identifying outliers. For now, focus on visual identification: if a value stands apart from the crowd, it deserves attention.

#### Diagram: Outlier Detective Game

<iframe src="../../sims/outlier-detective/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Outlier Detective Game MicroSim</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Taxonomy Verb: distinguish

Learning Objective: Students will distinguish between outliers and non-outliers by examining visual separation from the main distribution and considering context.

Instructional Rationale: Identifying outliers requires analytical judgment. Interactive practice with varying degrees of separation helps students develop intuition for what constitutes "notably far" from the main pattern.

Canvas Layout:
- Width: 100% of container (responsive)
- Height: 500px
- Main area (380px): Interactive dotplot or histogram
- Control area (120px): Game interface

Visual Elements:
- Dotplot or histogram of dataset
- Points that can be clicked to select as outliers
- Selected points highlighted in red
- Score panel showing current round and total score
- Context description for each dataset
- "Reveal Answer" overlay showing correct outliers

Interactive Controls:
- Click on points/bars to select/deselect as outliers
- "Submit Answer" button
- "Reveal Correct Answer" button (after submission)
- "Next Challenge" button
- Difficulty slider: Easy (obvious gaps), Medium (moderate separation), Hard (borderline cases)
- Toggle between dotplot and histogram view

Default Parameters:
- Medium difficulty
- Dotplot view
- Round 1 of 10

Behavior:
- Generate dataset with 0-3 outliers
- Display context (e.g., "Heights of basketball players")
- Player clicks to select suspected outliers
- On submit: compare to correct answer, show feedback
- Award points: +10 for each correct identification, -5 for false positives
- After 10 rounds, show final score and common mistakes

Sample Datasets with Context:
- Test scores (outlier: absent student scored 0)
- Ages at birthday party (outlier: parent among children)
- Monthly rainfall (outlier: hurricane month)
- Commute times (outlier: car broke down)
- Heights (outlier: measurement error in wrong units)

Scoring Feedback Messages:
- Perfect: "Sharp eye! You spotted all outliers."
- Missed some: "Look for values far from the main cluster."
- False positive: "That value is unusual but not separated enough."

Implementation: p5.js with click detection and game state management
</details>

### Why Outliers Matter

Outliers aren't just statistical curiosities; they can have profound effects on your analysis:

- **Mean:** Extremely sensitive to outliers. One millionaire in a room of minimum-wage workers dramatically increases the average income.
- **Standard deviation:** Also very sensitive to outliers.
- **Median:** Resistant to outliers. The middle value stays stable even with extreme values at the ends.

This sensitivity is one reason why describing the shape of your distribution matters so much. For skewed distributions with outliers, the median often tells a more representative story than the mean.

Consider these two datasets of home prices in a neighborhood:

| Dataset A | Dataset B |
|-----------|-----------|
| $250,000 | $250,000 |
| $275,000 | $275,000 |
| $280,000 | $280,000 |
| $290,000 | $290,000 |
| $300,000 | $2,500,000 |

Dataset A Mean: $279,000 (reasonable "typical" value)
Dataset B Mean: $719,000 (misleading due to mansion!)

The mansion in Dataset B is an outlier that pulls the mean way up, making it a poor representation of what a "typical" house costs in that neighborhood.

---

## Putting It All Together: Describing Distributions

When you describe a distribution, you should address the "Big Three" characteristics. We use the acronym **SOCS** to remember them (with an extra S for unusual features):

- **S**hape: Is it symmetric, skewed left, or skewed right? Unimodal, bimodal, or uniform?
- **O**utliers: Are there any unusual values separated from the main pattern?
- **C**enter: Where is the "typical" value? (We'll calculate this precisely in Chapter 4)
- **S**pread: How variable are the data? Are values tightly clustered or widely dispersed? (Also coming in Chapter 4)

Always describe distributions **in context**. Don't just say "The distribution is skewed right"; say "The distribution of household incomes is skewed right, with most households earning between $40,000 and $80,000, but a long tail stretching up to $200,000 or more."

#### Diagram: SOCS Description Builder

<iframe src="../../sims/socs-description-builder/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>SOCS Description Builder MicroSim</summary>
Type: microsim

Bloom Taxonomy: Create (L6)
Bloom Taxonomy Verb: compose

Learning Objective: Students will compose complete distribution descriptions using the SOCS framework, selecting appropriate terminology and writing contextual interpretations.

Instructional Rationale: A Create-level objective requires students to produce original descriptions. Building descriptions from components scaffolds the process while still requiring synthesis and contextual interpretation.

Canvas Layout:
- Width: 100% of container (responsive)
- Height: 520px
- Left panel (55%): Histogram display with context
- Right panel (45%): Description builder interface

Visual Elements:
- Histogram of dataset with context label
- SOCS checklist with dropdown menus
- Text preview area showing composed description
- Example descriptions for reference
- Progress indicator (which SOCS elements completed)

Interactive Controls:
- Dropdown: Shape (Symmetric / Skewed Left / Skewed Right)
- Dropdown: Modality (Unimodal / Bimodal / Uniform)
- Dropdown: Outliers (None / Low outliers / High outliers / Both)
- Slider or text input: Approximate center value
- Slider or text input: Approximate spread description
- Text area for additional context notes
- "Generate Description" button
- "Compare to Expert" button
- "New Dataset" button

Default Parameters:
- Random dataset with context loaded
- All dropdowns unselected
- Empty text preview

Behavior:
- Display histogram with context (e.g., "Waiting times at coffee shop")
- As student makes selections, preview text updates in real-time
- Description template: "The distribution of [context] is [shape] and [modality]. [Outlier statement]. The center appears to be around [value] with [spread description]."
- "Compare to Expert" shows model answer for feedback
- Track which SOCS elements are addressed

Sample Contexts and Expected Descriptions:
- Coffee shop wait times: Skewed right, unimodal, one high outlier
- Test scores (easy exam): Skewed left, unimodal, low outlier
- Heights of mixed group: Symmetric (or bimodal), unimodal, no outliers
- Random die rolls: Uniform, no outliers

Expert Description Examples:
"The distribution of wait times at the coffee shop is skewed right and unimodal, with most customers waiting between 2 and 5 minutes. There is one outlier at 15 minutes, which may represent a complex order or staffing issue. The center appears to be around 3 minutes."

Implementation: p5.js with text composition and real-time preview
</details>

---

## Choosing the Right Display

With three display types to choose from, how do you decide which one to use? Here's a handy guide:

| Situation | Best Choice | Why |
|-----------|-------------|-----|
| Small dataset (< 25 values) | Dotplot | See every individual value |
| Need exact values preserved | Stemplot | Shows actual data, not just shape |
| Moderate dataset (20-100 values) | Stemplot or Histogram | Both work well |
| Large dataset (> 50 values) | Histogram | Dotplots get too crowded |
| Comparing two groups | Back-to-back stemplot | Easy side-by-side comparison |
| Quick sketch by hand | Stemplot | Fastest to draw accurately |
| Presenting to an audience | Histogram | Most people can read it easily |

!!! tip "Sylvia's Rule of Thumb"
    "When in doubt, try more than one! I often make both a stemplot and a histogram of the same data. Sometimes one reveals patterns that the other misses. Different perspectives, different insights!"

---

## Common Mistakes to Avoid

As you practice creating and interpreting graphs, watch out for these common pitfalls:

**When creating histograms:**

- Don't leave gaps between bars (histogram bars should touch)
- Don't use unequal bin widths unless you have a specific reason
- Always label your axes and include a title

**When reading distributions:**

- Don't confuse "skewed right" with having more values on the right. Skewness describes the TAIL direction, not where most values are!
- Don't forget to consider the context when identifying outliers
- Don't assume every unusual value is an error; some are genuine

**When describing distributions:**

- Don't forget to describe in context (use the variable name and units)
- Don't skip any of the SOCS elements
- Don't just list numbers; interpret what they mean

---

## Chapter Summary

Let's squirrel away the key ideas from this chapter:

**Three ways to display quantitative data:**

- **Dotplots:** Simple, show every value, best for small datasets
- **Stemplots:** Preserve exact values while showing shape, great for moderate datasets
- **Histograms:** Use bins to group data, essential for large datasets

**Describing shape:**

- **Symmetric:** Left and right sides mirror each other
- **Skewed right:** Long tail stretches toward higher values
- **Skewed left:** Long tail stretches toward lower values
- **Unimodal:** One peak
- **Bimodal:** Two peaks (often indicates two groups)
- **Uniform:** Flat, all values equally likely

**Outliers:**

- Values that fall notably far from the main pattern
- Can be errors OR genuine unusual cases
- Always investigate before removing
- Strongly affect mean and standard deviation

**The SOCS framework:**

- **S**hape: Symmetric or skewed? Unimodal or bimodal?
- **O**utliers: Any unusual values?
- **C**enter: Where's the typical value?
- **S**pread: How variable are the data?

Sylvia's parting words: "You've learned to see data in a whole new way! A list of numbers is now a story waiting to be told. Is it symmetric or does it lean one way? Is there a lonely outlier with a tale to tell? Next chapter, we'll add numbers to our descriptions and learn to measure center and spread precisely. But for now, practice your graphing skills. Every acorn I count becomes part of a distribution, and now you can see the patterns too!"

---

## Practice Problems

??? question "Question 1: Which display would you choose?"
    You have test scores for 200 students on a standardized exam. Which display type would be most appropriate?

    **Answer:** A histogram would be most appropriate. With 200 observations, a dotplot would be too crowded (200 stacked dots!) and a stemplot would have too many leaves. A histogram efficiently summarizes this larger dataset while still showing the overall shape.

??? question "Question 2: Identify the skewness"
    A dataset of annual income for residents of a city shows most people earning between $35,000 and $75,000, with a small number of residents earning over $500,000. What is the likely shape of this distribution?

    **Answer:** This distribution is skewed right (positively skewed). The main cluster of values is at the lower end ($35,000-$75,000), with a long tail stretching toward the high-income outliers above $500,000. Remember: the skew direction matches where the tail goes, not where most values are.

??? question "Question 3: Is this an outlier?"
    In a dataset of marathon finish times, most runners complete the race between 3.5 and 5.5 hours. One runner finished in 2.1 hours. Is this an outlier? Should it be removed?

    **Answer:** Yes, 2.1 hours is an outlier because it's notably separated from the main cluster of finish times. However, it should NOT be removed! This is likely a legitimate value, an elite runner who finished much faster than recreational runners. This outlier tells us something important about the composition of the race participants.

??? question "Question 4: Bimodal or not?"
    A histogram of heights for a co-ed volleyball team shows two peaks: one around 5'6" and another around 6'2". Is this bimodal distribution surprising? What might explain it?

    **Answer:** This bimodal distribution is not surprising at all! The two peaks likely represent the two different populations mixed in the dataset: female players (clustering around 5'6") and male players (clustering around 6'2"). When you see a bimodal distribution, ask yourself: "Could this be two groups combined?" In this case, it clearly is.
