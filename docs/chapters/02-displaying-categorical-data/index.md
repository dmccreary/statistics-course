---
title: Displaying Categorical Data
description: Learn to organize and visualize categorical data using frequency tables, bar graphs, pie charts, and two-way tables while exploring association between variables.
generated_by: claude skill chapter-content-generator
date: 2026-02-06 18:09:09
version: 0.04
---

# Displaying Categorical Data

## Summary

This chapter focuses on methods for displaying and analyzing categorical data. Students will learn how to create and interpret frequency tables, bar graphs, pie charts, and two-way tables. The chapter also introduces the concept of association between categorical variables, preparing students for more advanced analysis later in the course.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

15. Frequency Table
16. Relative Frequency
17. Cumulative Frequency
18. Bar Graph
19. Pie Chart
69. Two-Way Table
70. Marginal Distribution
71. Conditional Distribution
72. Calculating Conditionals
73. Association
79. Direction of Association
80. Positive Association
81. Negative Association
85. Strength of Association

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to Statistics](../01-introduction-to-statistics/index.md)

---

Welcome back! In Chapter 1, you learned the difference between categorical and quantitative variables. Now we're going to put that knowledge to work. This chapter is all about categorical data---the kind of data that puts things into groups or categories, like favorite pizza topping, eye color, or whether someone prefers cats or dogs.

"Let's crack this nut!" Sylvia adjusts her glasses excitedly. "Categorical data is everywhere, and once you know how to organize and display it, you'll start seeing patterns you never noticed before. Trust me---my whole acorn classification system is based on these ideas!"

## Organizing Data with Frequency Tables

When you collect categorical data, you often end up with a long list of responses. Imagine asking 50 classmates about their favorite season. You'd get answers like "Summer, Winter, Fall, Summer, Spring, Summer, Fall..." and so on. Not exactly easy to make sense of, right?

A **frequency table** organizes this chaos by listing each category and counting how many times it appears. The count for each category is called its **frequency**.

Here's what a frequency table might look like for our favorite season survey:

| Season | Frequency |
|--------|-----------|
| Spring | 8 |
| Summer | 22 |
| Fall | 14 |
| Winter | 6 |
| **Total** | **50** |

That's much cleaner! At a glance, you can see that Summer is the crowd favorite (no surprise there), and Winter has the fewest fans.

!!! tip "Sylvia's Data Tip"
    Always include the total at the bottom of your frequency table. It serves as a quick check---if your frequencies don't add up to the total number of observations, something went wrong in your counting!

### Relative Frequency: Thinking in Proportions

Frequencies are helpful, but sometimes raw counts don't tell the whole story. If I told you 22 students picked Summer, you might wonder: "Is that a lot?" The answer depends on how many students were surveyed.

**Relative frequency** expresses each category's count as a proportion or percentage of the total. To calculate it, divide each frequency by the total:

$$\text{Relative Frequency} = \frac{\text{Frequency}}{\text{Total}}$$

Let's add relative frequencies to our season table:

| Season | Frequency | Relative Frequency | Percentage |
|--------|-----------|-------------------|------------|
| Spring | 8 | 8/50 = 0.16 | 16% |
| Summer | 22 | 22/50 = 0.44 | 44% |
| Fall | 14 | 14/50 = 0.28 | 28% |
| Winter | 6 | 6/50 = 0.12 | 12% |
| **Total** | **50** | **1.00** | **100%** |

Now we can say that 44% of students prefer Summer. That percentage means the same thing whether we surveyed 50 students or 5,000---it's the proportion that matters.

#### Diagram: Frequency Table Explorer

<iframe src="../../sims/frequency-table-explorer/main.html" width="100%" height="450px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Frequency Table Explorer MicroSim</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: Calculate, practice

Learning Objective: Students will practice calculating relative frequencies and percentages from raw frequency data, reinforcing the connection between counts and proportions.

Instructional Rationale: This Apply-level objective requires students to actively calculate values rather than passively observe. Interactive sliders allow students to modify frequencies and see how relative frequencies change in real-time, building procedural fluency.

Canvas Layout:

- Drawing area showing an interactive frequency table
- Category labels on the left (4-5 categories)
- Frequency sliders for each category (range 0-50)
- Display columns for: Frequency, Relative Frequency (decimal), Percentage

Visual Elements:

- Clean table layout with alternating row colors (light gray/white)
- Sliders next to each frequency cell
- Running total displayed at bottom
- Visual bar extending from each row proportional to relative frequency
- "Check" indicator showing if percentages sum to 100%

Interactive Controls:

- Sliders to adjust frequency for each category (0-50)
- Dropdown to select different example datasets (Favorite Season, Pet Preference, Transportation Mode)
- Toggle button: Show/Hide calculation steps
- Reset button to restore default values

Default Parameters:

- 4 categories with frequencies: 8, 22, 14, 6
- Decimal places: 2
- Show percentages: Yes

Behavior:

- When slider moves, frequency updates instantly
- Relative frequency and percentage recalculate automatically
- Visual bars resize to reflect proportions
- Total row updates dynamically
- If frequencies all equal zero, display "No data" message

Implementation: p5.js with canvas-based controls
</details>

### Cumulative Frequency: Running Totals

Sometimes you want to know how many observations fall at or below a certain category. This is where **cumulative frequency** comes in handy. It's a running total that adds up frequencies as you move through the categories.

Cumulative frequency works best when your categories have a natural order. For our seasons example, there isn't really a natural order (is Spring "before" Summer in any meaningful way?), but consider this example of student grades:

| Grade | Frequency | Cumulative Frequency |
|-------|-----------|---------------------|
| A | 12 | 12 |
| B | 18 | 12 + 18 = 30 |
| C | 15 | 30 + 15 = 45 |
| D | 4 | 45 + 4 = 49 |
| F | 1 | 49 + 1 = 50 |

The cumulative frequency tells us that 30 students earned a B or higher, and 45 students earned a C or higher. This information can be really useful when you want to know things like "How many students passed?" or "What proportion of students earned at least a B?"

You can also calculate **cumulative relative frequency** by dividing cumulative frequency by the total, giving you the proportion at or below each category.

## Visualizing Categorical Data

Tables are great for precision, but pictures often communicate patterns more quickly. Let's explore two popular ways to visualize categorical data: bar graphs and pie charts.

### Bar Graphs: Comparing Categories

A **bar graph** displays each category as a bar, with the height (or length) of the bar representing the frequency or relative frequency of that category. The bars should be separated by gaps to emphasize that categories are distinct, not continuous.

Here's what makes a good bar graph:

- Each category gets its own bar
- Bars don't touch (gaps between them)
- Bar heights represent frequencies or relative frequencies
- Clear labels on both axes
- Descriptive title

#### Diagram: Interactive Bar Graph Builder

<iframe src="../../sims/bar-graph-builder/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Interactive Bar Graph Builder MicroSim</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: Construct, demonstrate

Learning Objective: Students will construct bar graphs from categorical data and explore how changes in data affect the visual representation.

Instructional Rationale: Building bar graphs reinforces the Apply level of Bloom's taxonomy by having students actively create visual representations. The interactive nature allows immediate feedback on proper bar graph construction.

Canvas Layout:

- Left side (60%): Bar graph display area
- Right side (40%): Data input panel and controls

Visual Elements:

- Horizontal or vertical bars with customizable colors
- X-axis with category labels
- Y-axis with frequency or relative frequency scale
- Grid lines for easier reading
- Title area at top

Interactive Controls:

- Text inputs for category names (up to 6 categories)
- Number inputs or sliders for frequencies (0-100)
- Radio buttons: Frequency vs. Relative Frequency display
- Radio buttons: Vertical vs. Horizontal bars
- Color picker for bar color
- Button: Add Category / Remove Category
- Reset button

Default Parameters:

- 4 categories: Spring (8), Summer (22), Fall (14), Winter (6)
- Vertical bars
- Bar color: steelblue
- Display mode: Frequency

Behavior:

- Bars update in real-time as data changes
- Y-axis rescales automatically to fit data
- When switching to relative frequency, values convert to proportions
- Category labels rotate if too long
- Hover over bar shows exact value

Implementation: p5.js with canvas-based UI elements
</details>

"Here's something I learned the hard way," Sylvia confesses. "The order of bars in a bar graph usually doesn't matter for categorical data---unless there's a natural ordering like grades or age groups. But it often helps to put bars in order from tallest to shortest. That makes patterns pop!"

A bar graph ordered from most frequent to least frequent is sometimes called a **Pareto chart**. It helps you quickly identify the most common categories.

### Pie Charts: Showing Parts of a Whole

A **pie chart** is a circle divided into wedges, where each wedge represents a category. The size of each wedge is proportional to the relative frequency of that category.

Pie charts emphasize how categories relate to the whole. They work well when:

- You have a small number of categories (ideally 5 or fewer)
- You want to show proportions of a whole
- The total is meaningful (like 100% of survey respondents)

To create a pie chart, multiply each relative frequency by 360 degrees to find the angle for each wedge:

$$\text{Angle} = \text{Relative Frequency} \times 360°$$

For our season data:

| Season | Relative Frequency | Angle |
|--------|-------------------|-------|
| Spring | 0.16 | 57.6° |
| Summer | 0.44 | 158.4° |
| Fall | 0.28 | 100.8° |
| Winter | 0.12 | 43.2° |

#### Diagram: Pie Chart vs Bar Graph Comparison

<iframe src="../../sims/pie-vs-bar-comparison/main.html" width="100%" height="480px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Pie Chart vs Bar Graph Comparison MicroSim</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: Compare, contrast

Learning Objective: Students will compare the effectiveness of pie charts versus bar graphs for displaying categorical data and determine when each visualization is most appropriate.

Instructional Rationale: Comparing two visualization types develops analytical thinking (Bloom Level 4). Students need to evaluate trade-offs rather than just create visualizations.

Canvas Layout:

- Top half: Side-by-side display of pie chart (left) and bar graph (right)
- Bottom area: Data controls and comparison questions

Visual Elements:

- Pie chart with labeled wedges and percentages
- Bar graph with matching colors to pie wedges
- Legend showing category-color mapping
- Comparison prompts below visualizations

Interactive Controls:

- Data sliders for 4-6 categories (0-50 each)
- Dropdown to select preset datasets:
  - "Easy to compare" (2 categories dominate)
  - "Similar values" (all categories close to equal)
  - "Many categories" (6 small categories)
  - "One dominant" (one category over 60%)
- Toggle: Show/Hide percentages on pie chart
- Toggle: Show/Hide values on bar graph

Default Parameters:

- 4 categories with varied frequencies
- Percentages shown on pie chart
- Values shown on bar graph

Behavior:

- Both visualizations update simultaneously when data changes
- When categories have similar sizes, pie becomes harder to read
- When one category dominates, pie shows it clearly
- Six or more categories make pie chart cluttered
- Reveal discussion prompt: "Which visualization makes comparison easier for this data?"

Implementation: p5.js with dual visualization canvas
</details>

!!! warning "Pie Chart Pitfalls"
    Pie charts can be tricky to read when categories have similar sizes. It's hard to tell if a 23% wedge is bigger than a 21% wedge. For precise comparisons, bar graphs are usually better. Also, avoid 3D pie charts---they distort proportions and make accurate reading nearly impossible!

### When to Use Which Graph?

Here's a quick guide for choosing between bar graphs and pie charts:

| Situation | Best Choice |
|-----------|-------------|
| Comparing sizes across categories | Bar graph |
| Showing parts of a whole | Pie chart |
| More than 5 categories | Bar graph |
| Categories with similar frequencies | Bar graph |
| One category dominates | Either works |
| Need precise comparison | Bar graph |

## Two-Way Tables: Exploring Relationships

So far, we've looked at one categorical variable at a time. But what happens when we have two categorical variables and want to explore the relationship between them?

Enter the **two-way table** (also called a contingency table). A two-way table displays counts for two categorical variables simultaneously, with one variable defining the rows and another defining the columns.

Let's say we surveyed students about their favorite season AND their grade level (underclassmen vs. upperclassmen). Here's what a two-way table might look like:

|  | Spring | Summer | Fall | Winter | **Total** |
|--|--------|--------|------|--------|-----------|
| Underclassmen | 5 | 12 | 6 | 4 | **27** |
| Upperclassmen | 3 | 10 | 8 | 2 | **23** |
| **Total** | **8** | **22** | **14** | **6** | **50** |

This table shows us both how each group answered AND allows us to compare preferences between groups.

"Acorn for your thoughts?" Sylvia asks. "Notice those totals on the edges? Those are special---they tell us about each variable separately, as if the other variable didn't exist. We have a fancy name for them!"

### Marginal Distributions

The **marginal distribution** is the distribution of one variable alone, found in the margins (edges) of a two-way table. Looking at our table:

- The marginal distribution of **Season** is: Spring (8), Summer (22), Fall (14), Winter (6)
- The marginal distribution of **Grade Level** is: Underclassmen (27), Upperclassmen (23)

These marginals are exactly what we'd get if we only asked about one variable. They're called "marginal" because they appear in the margins of the table.

You can express marginal distributions as:

- Raw frequencies (the counts)
- Relative frequencies (proportions of the total)

| Season | Marginal Frequency | Marginal Relative Frequency |
|--------|-------------------|-----------------------------|
| Spring | 8 | 8/50 = 0.16 = 16% |
| Summer | 22 | 22/50 = 0.44 = 44% |
| Fall | 14 | 14/50 = 0.28 = 28% |
| Winter | 6 | 6/50 = 0.12 = 12% |

### Conditional Distributions

Here's where things get really interesting. What if we want to know the distribution of season preference for just underclassmen? Or just upperclassmen? These are **conditional distributions**---the distribution of one variable given a specific value of the other variable.

To find a conditional distribution, we focus on one row (or column) and calculate relative frequencies within that row (or column).

**Conditional distribution of Season given Underclassmen:**

| Season | Frequency | Conditional Relative Frequency |
|--------|-----------|-------------------------------|
| Spring | 5 | 5/27 = 0.185 = 18.5% |
| Summer | 12 | 12/27 = 0.444 = 44.4% |
| Fall | 6 | 6/27 = 0.222 = 22.2% |
| Winter | 4 | 4/27 = 0.148 = 14.8% |

**Conditional distribution of Season given Upperclassmen:**

| Season | Frequency | Conditional Relative Frequency |
|--------|-----------|-------------------------------|
| Spring | 3 | 3/23 = 0.130 = 13.0% |
| Summer | 10 | 10/23 = 0.435 = 43.5% |
| Fall | 8 | 8/23 = 0.348 = 34.8% |
| Winter | 2 | 2/23 = 0.087 = 8.7% |

Notice the key difference: for marginal distributions, we divide by the **grand total** (50). For conditional distributions, we divide by the **row or column total** (27 for underclassmen, 23 for upperclassmen).

#### Diagram: Two-Way Table Distribution Calculator

<iframe src="../../sims/two-way-table-calculator/main.html" width="100%" height="550px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Two-Way Table Distribution Calculator MicroSim</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: Calculate, execute

Learning Objective: Students will calculate marginal and conditional distributions from a two-way table, distinguishing between dividing by grand total versus row/column totals.

Instructional Rationale: Calculating different distribution types requires procedural application (Bloom Level 3). The step-by-step display shows the calculation process explicitly.

Canvas Layout:

- Top (40%): Editable two-way table with row/column totals
- Middle (30%): Calculation display area showing formulas and results
- Bottom (30%): Result table with selected distribution

Visual Elements:

- 2x4 two-way table with editable cells
- Row and column totals auto-calculated
- Grand total in bottom-right corner
- Highlighted cells showing which values are used in current calculation
- Formula display: "5/27 = 0.185 = 18.5%"
- Result table formatted as distribution

Interactive Controls:

- Number inputs for each cell in the two-way table (0-100)
- Radio button group: "What distribution do you want?"
  - Marginal distribution of Row Variable
  - Marginal distribution of Column Variable
  - Conditional distribution of Columns given Row 1
  - Conditional distribution of Columns given Row 2
- Toggle: Show calculation steps
- Button: Use example data (Season/Grade Level)
- Reset button

Default Parameters:

- 2 rows (Underclassmen, Upperclassmen) x 4 columns (Spring, Summer, Fall, Winter)
- Default values from chapter example
- Show calculation steps: On

Behavior:

- Cells in use for current calculation are highlighted (yellow background)
- Denominator (total) is highlighted in blue
- Formula appears showing: value/total = decimal = percentage
- Result table updates when data or distribution type changes
- Error message if all cells are zero

Implementation: p5.js with canvas-based table interface
</details>

### Calculating Conditional Probabilities: A Step-by-Step Approach

Let's practice calculating a conditional distribution systematically. We'll find the conditional distribution of grade level given that a student's favorite season is Fall.

**Step 1:** Identify the condition. We're given that Season = Fall, so we look at the Fall column.

**Step 2:** Find the relevant counts.

- Fall total: 14
- Underclassmen who prefer Fall: 6
- Upperclassmen who prefer Fall: 8

**Step 3:** Calculate relative frequencies within that column.

- P(Underclassmen | Fall) = 6/14 = 0.429 = 42.9%
- P(Upperclassmen | Fall) = 8/14 = 0.571 = 57.1%

**Step 4:** Verify they sum to 1 (or 100%).

- 0.429 + 0.571 = 1.000 (Check!)

"Don't worry---every statistician drops an acorn sometimes," Sylvia reassures you. "If your conditional percentages don't add up to 100%, go back and check your denominator. You should be dividing by the row or column total, not the grand total!"

## Association Between Categorical Variables

Now comes the big question: Is there a relationship between our two variables? Do underclassmen and upperclassmen have *different* preferences for seasons, or do both groups follow roughly the same pattern?

When two categorical variables are related, we say there is an **association** between them. When there's no relationship---when knowing one variable doesn't help predict the other---we say the variables are **independent**.

### Detecting Association

To detect association, we compare conditional distributions. If the conditional distributions are different, there's evidence of association. If they're the same (or very similar), the variables appear to be independent.

Let's compare our conditional distributions:

| Season | Underclassmen | Upperclassmen |
|--------|---------------|---------------|
| Spring | 18.5% | 13.0% |
| Summer | 44.4% | 43.5% |
| Fall | 22.2% | 34.8% |
| Winter | 14.8% | 8.7% |

Looking at this comparison, we see some differences. Upperclassmen seem to prefer Fall more than underclassmen do (34.8% vs. 22.2%), and underclassmen have a slightly higher preference for Winter (14.8% vs. 8.7%). These differences suggest there might be some association between grade level and season preference.

But here's an important caution: we need to ask whether these differences are big enough to be meaningful or whether they could just be due to random variation. We'll develop formal methods to answer this question later in the course (spoiler: it involves something called a chi-square test!).

#### Diagram: Association Detector Visualization

<iframe src="../../sims/association-detector/main.html" width="100%" height="520px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Association Detector Visualization MicroSim</summary>
Type: microsim

Bloom Taxonomy: Analyze (L4)
Bloom Verb: Compare, differentiate, examine

Learning Objective: Students will compare conditional distributions visually and verbally describe evidence for or against association between two categorical variables.

Instructional Rationale: Analyzing association requires comparing patterns (Bloom Level 4). Side-by-side visual comparison makes differences more apparent and prompts analytical thinking.

Canvas Layout:

- Top (60%): Side-by-side segmented bar charts showing conditional distributions
- Bottom (40%): Comparison summary and interpretation guidance

Visual Elements:

- Two horizontal segmented bar charts (100% stacked bars)
- Each bar represents one level of the row variable
- Segments colored by column variable categories
- Legend showing color-category mapping
- Difference indicators showing where bars differ most
- Text summary: "The conditional distributions appear [similar/different]"

Interactive Controls:

- Editable 2x4 two-way table (number inputs)
- Dropdown: Select preset examples
  - "Strong association" (very different distributions)
  - "No association" (identical distributions)
  - "Moderate association" (somewhat different)
  - "Custom data" (user enters own values)
- Toggle: Show percentage labels on segments
- Toggle: Show difference highlighting

Default Parameters:

- Season/Grade Level example data
- Percentage labels shown
- Difference highlighting on

Behavior:

- Segmented bars update when data changes
- Segments with biggest differences highlighted with indicator
- Summary text describes whether distributions look similar or different
- If distributions are identical, displays "No evidence of association"
- Tooltip on hover shows exact percentage for each segment

Implementation: p5.js with canvas-based visualization
</details>

### Direction of Association

When we find evidence of association, we often want to describe its **direction**. For categorical variables, direction refers to how the categories tend to pair up.

**Positive association** occurs when increases in one variable tend to go with increases in another (or when certain categories tend to occur together). For example, if people who exercise frequently also tend to eat healthy food, there's a positive association between exercise and diet quality.

**Negative association** occurs when high values of one variable tend to go with low values of another (or when certain categories tend to *not* occur together). For example, if people who smoke heavily tend to exercise less, there's a negative association between smoking and exercise.

"My tail's tingling---we're onto something important!" Sylvia exclaims. "But here's the tricky part: with truly categorical data (like favorite color or type of pet), direction doesn't always make sense. Direction is most meaningful when categories have a natural ordering, like education level (high school, some college, bachelor's, graduate) or satisfaction (very dissatisfied to very satisfied)."

### Strength of Association

Beyond direction, we can describe the **strength of association**---how closely the variables are related.

- **Strong association:** Conditional distributions are very different from each other. Knowing one variable tells you a lot about the other.
- **Moderate association:** Some noticeable differences in conditional distributions.
- **Weak association:** Small differences that might just be random variation.
- **No association:** Conditional distributions are essentially identical.

Think of it like this: if knowing someone's grade level lets you predict their season preference with high accuracy, the association is strong. If it barely helps at all, the association is weak.

#### Diagram: Strength of Association Spectrum

<iframe src="../../sims/association-strength-spectrum/main.html" width="100%" height="450px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Strength of Association Spectrum MicroSim</summary>
Type: microsim

Bloom Taxonomy: Understand (L2)
Bloom Verb: Classify, interpret, exemplify

Learning Objective: Students will interpret and classify associations as strong, moderate, weak, or none by examining visual representations of different two-way tables.

Instructional Rationale: Understanding strength of association requires recognizing patterns across examples (Bloom Level 2). Multiple examples with clear labels help students build intuition.

Data Visibility Requirements:

- Stage 1: Show two-way table with raw counts
- Stage 2: Show conditional distributions as percentages
- Stage 3: Show visual comparison (segmented bars)
- Stage 4: Show strength classification with explanation

Canvas Layout:

- Left side (55%): Two-way table and segmented bar visualization
- Right side (45%): Strength indicator scale and description

Visual Elements:

- 2x3 or 2x4 two-way table
- Segmented bar chart showing conditional distributions
- Vertical "strength meter" scale from "None" to "Strong"
- Arrow pointing to current position on strength scale
- Text description explaining why this level of association

Interactive Controls:

- Dropdown: Select example dataset
  - "Perfect association" (each row has only one column with counts)
  - "Strong association" (very different distributions)
  - "Moderate association" (noticeable differences)
  - "Weak association" (slight differences)
  - "No association" (identical distributions)
- Slider: Gradually transform from "No association" to "Strong association"
- Button: Randomize data

Default Parameters:

- Moderate association example
- Transformation slider at 50%

Behavior:

- When slider moves, data smoothly transforms between independence and strong association
- Strength meter updates to reflect current state
- Description text changes based on strength level
- Segmented bars animate smoothly during transitions

Implementation: p5.js with animated transitions
</details>

## Putting It All Together: A Complete Analysis

Let's work through a complete example that uses all the concepts from this chapter. Imagine we surveyed 200 high school students about their preferred study location (Library, Home, Coffee Shop) and whether they consider themselves morning people or night owls.

|  | Library | Home | Coffee Shop | **Total** |
|--|---------|------|-------------|-----------|
| Morning Person | 45 | 30 | 15 | **90** |
| Night Owl | 25 | 55 | 30 | **110** |
| **Total** | **70** | **85** | **45** | **200** |

**Step 1: Examine the marginal distributions**

Marginal distribution of Study Location:

- Library: 70/200 = 35%
- Home: 85/200 = 42.5%
- Coffee Shop: 45/200 = 22.5%

Overall, Home is the most popular study location, followed by Library, then Coffee Shop.

Marginal distribution of Sleep Preference:

- Morning Person: 90/200 = 45%
- Night Owl: 110/200 = 55%

There are slightly more night owls than morning people in our sample.

**Step 2: Calculate conditional distributions**

Conditional distribution of Location given Morning Person:

- Library: 45/90 = 50%
- Home: 30/90 = 33.3%
- Coffee Shop: 15/90 = 16.7%

Conditional distribution of Location given Night Owl:

- Library: 25/110 = 22.7%
- Home: 55/110 = 50%
- Coffee Shop: 30/110 = 27.3%

**Step 3: Compare and look for association**

| Location | Morning People | Night Owls | Difference |
|----------|----------------|------------|------------|
| Library | 50% | 22.7% | 27.3 percentage points |
| Home | 33.3% | 50% | 16.7 percentage points |
| Coffee Shop | 16.7% | 27.3% | 10.6 percentage points |

There are substantial differences! Morning people prefer the library much more (50% vs. 22.7%), while night owls prefer studying at home (50% vs. 33.3%). This suggests a moderate to strong association between sleep preference and study location.

**Step 4: Describe the association**

We would describe this as: "There appears to be a moderate association between sleep preference and preferred study location. Morning people are more likely to prefer studying at the library, while night owls are more likely to prefer studying at home or at a coffee shop."

!!! note "Sylvia's Summary"
    "Time to squirrel away this knowledge! When analyzing two categorical variables:

    1. Start with the marginal distributions to understand each variable separately
    2. Calculate conditional distributions to see how one variable behaves within levels of the other
    3. Compare conditional distributions to detect association
    4. If distributions differ, describe the direction and strength of association

    Remember: association doesn't mean causation! Just because morning people prefer the library doesn't mean being a morning person *causes* library preference. There could be other factors at play!"

## Key Takeaways

Let's summarize the main ideas from this chapter:

- A **frequency table** organizes categorical data by counting occurrences of each category
- **Relative frequency** expresses counts as proportions of the total, enabling fair comparisons
- **Cumulative frequency** provides running totals, useful for ordered categories
- **Bar graphs** display categories as separated bars and work well for comparing frequencies
- **Pie charts** show parts of a whole but become hard to read with many categories or similar values
- **Two-way tables** display the relationship between two categorical variables
- **Marginal distributions** show each variable separately (divide by grand total)
- **Conditional distributions** show one variable within levels of another (divide by row or column total)
- **Association** exists when conditional distributions differ across levels
- **Direction** describes how categories tend to pair up (positive or negative)
- **Strength** describes how different the conditional distributions are

#### Diagram: Chapter Concept Map

<iframe src="../../sims/chapter-2-concept-map/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Chapter Concept Map</summary>
Type: infographic

Bloom Taxonomy: Remember (L1)
Bloom Verb: Recognize, identify

Learning Objective: Students will identify and recall the key concepts from this chapter and their relationships.

Purpose: Visual summary showing how all chapter concepts connect to each other.

Layout: Hierarchical concept map with main topic at top branching down

Nodes:

- Root: "Displaying Categorical Data"
- Level 1 branches:
  - "Organizing Data" (connects to Frequency Table, Relative Frequency, Cumulative Frequency)
  - "Single Variable Displays" (connects to Bar Graph, Pie Chart)
  - "Two Variable Analysis" (connects to Two-Way Table)
  - "Association" (connects to Direction, Strength)

- Level 2 connections:
  - Frequency Table → Relative Frequency → Cumulative Frequency (sequential)
  - Two-Way Table → Marginal Distribution, Conditional Distribution
  - Conditional Distribution → Association
  - Direction → Positive Association, Negative Association

Visual Style:

- Concept nodes as rounded rectangles with concept name
- Color coding by theme (blue for organization, green for displays, orange for two-variable, purple for association)
- Arrows showing prerequisite relationships
- Hover reveals brief definition

Interactive Features:

- Hover over node: Show definition tooltip
- Click node: Highlight all connected concepts
- Toggle: Show/Hide definitions
- Navigation: Link to section within chapter

Implementation: vis-network or custom p5.js graph visualization
</details>

## Practice Problems

??? question "Practice 1: Creating a Frequency Table"
    A survey asked 40 students about their favorite school subject. The responses were:
    Math (12), English (8), Science (11), History (5), Art (4)

    a) Create a frequency table with relative frequencies.
    b) What percentage of students prefer Math or Science?
    c) Create a bar graph representing this data.

??? question "Practice 2: Working with Two-Way Tables"
    A two-way table shows music preference by age group:

    |  | Pop | Rock | Classical | Hip-Hop | Total |
    |--|-----|------|-----------|---------|-------|
    | Under 30 | 45 | 20 | 5 | 30 | 100 |
    | 30 and Over | 15 | 35 | 25 | 25 | 100 |
    | Total | 60 | 55 | 30 | 55 | 200 |

    a) What is the marginal distribution of music preference?
    b) What is the conditional distribution of music preference for people under 30?
    c) Is there evidence of association between age and music preference? Explain.

??? question "Practice 3: Describing Association"
    Researchers surveyed 150 pet owners about their pet type (Dog or Cat) and living situation (Apartment or House):

    |  | Apartment | House | Total |
    |--|-----------|-------|-------|
    | Dog | 20 | 55 | 75 |
    | Cat | 50 | 25 | 75 |
    | Total | 70 | 80 | 150 |

    a) Calculate the conditional distribution of living situation for dog owners.
    b) Calculate the conditional distribution of living situation for cat owners.
    c) Describe the association between pet type and living situation. Include direction and strength.

---

Congratulations on completing Chapter 2! You've learned powerful tools for organizing and visualizing categorical data. In the next chapter, we'll shift our focus to quantitative data and explore different ways to display and describe numerical distributions.

"See you in Chapter 3!" Sylvia waves, tucking her pencil behind her ear. "We'll be exploring histograms, stemplots, and all sorts of ways to visualize numbers. It's going to be great!"
