---
title: Introduction to Statistics
description: Learn the foundational concepts of statistics including data, variables, populations, samples, and the distinction between parameters and statistics
generated_by: claude skill chapter-content-generator
date: 2026-02-06 18:09:10
version: 0.04
---

# Introduction to Statistics

## Summary

This chapter introduces the foundational concepts of statistics that form the basis for all subsequent learning. Students will learn about data, variables, populations, samples, and the key distinction between parameters and statistics. These concepts are essential building blocks for understanding how we collect, organize, and analyze data.

## Concepts Covered

This chapter covers the following 16 concepts from the learning graph:

1. Statistics
2. Data
3. Variable
4. Observation
5. Dataset
6. Categorical Variable
7. Quantitative Variable
8. Discrete Variable
9. Continuous Variable
10. Population
11. Sample
12. Parameter
13. Statistic
14. Distribution
77. Explanatory Variable
78. Response Variable

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md). No prior statistics knowledge is required.

---

## Welcome to the World of Statistics!

Hey there, future data detective! I'm Sylvia, and I'll be your guide through the wonderful world of statistics. Before you roll your eyes and wonder if this is going to be all numbers and formulas, let me tell you a secret: statistics is actually about telling stories with data. And who doesn't love a good story?

Think about it. Every time you check the weather forecast, scroll through social media analytics, or wonder why your favorite team keeps losing despite having the "best players," you're brushing up against statistics. It's the superpower that helps us make sense of a messy, complicated world full of information.

My tail's tingling already because we're about to crack open the toolbox that professional researchers, doctors, sports analysts, and even your school administrators use every single day. By the end of this course, you'll see the world differently. Trust me on this one.

## What Is Statistics?

Let's start with the big question: what exactly is **statistics**? At its core, statistics is the science of collecting, organizing, analyzing, and interpreting data to make decisions or predictions. That's a mouthful, so let's break it down.

Statistics helps us answer questions like:

- Does a new medication actually work better than the old one?
- Are teenagers really spending more time on their phones than they did five years ago?
- What's the chance that it will rain on your outdoor graduation ceremony?

Every one of these questions involves uncertainty. We can't know everything about the world, but statistics gives us the tools to draw reasonable conclusions from the information we can gather. Pretty cool, right?

| Statistical Task | What It Means | Real-World Example |
|-----------------|---------------|-------------------|
| Collecting | Gathering information systematically | Conducting a survey about lunch preferences |
| Organizing | Arranging information for easy analysis | Creating a spreadsheet of survey responses |
| Analyzing | Finding patterns and relationships | Calculating what percentage prefer pizza |
| Interpreting | Drawing meaningful conclusions | Deciding whether to change the lunch menu |

## Data: The Raw Material of Statistics

Now let's talk about **data**, the stuff that statistics runs on. Data are pieces of information collected about individuals, events, or objects. Notice I said "data are" not "data is." Technically, data is plural (the singular is datum), though you'll hear people use it both ways.

Here's a way to think about it: if statistics is baking, data are your ingredients. You can't make a cake without flour and eggs, and you can't do statistics without data. The quality of your conclusions depends entirely on the quality of your data, just like the quality of your cake depends on fresh ingredients.

Data can come from anywhere:

- Survey responses from your classmates
- Measurements from a science experiment
- Records from a hospital database
- Numbers from a fitness tracker
- Social media engagement metrics

!!! tip "Acorn for your thoughts?"
    Sylvia says: "Data is everywhere once you start looking for it! I track data about my acorn collection every autumn: which trees produce the most, what time of day is best for gathering, even weather conditions. That's right, I'm basically a tiny, fluffy data scientist."

## Variables: The Characteristics We Measure

When we collect data, we're measuring **variables**. A variable is any characteristic that can take on different values. Height is a variable because different people have different heights. Eye color is a variable because people have blue, brown, green, hazel, or other colored eyes.

Think of variables as the questions you're asking about each individual in your study. If you're studying students at your school, you might ask:

- How old are you? (Age is a variable)
- What's your favorite subject? (Favorite subject is a variable)
- How many hours did you sleep last night? (Sleep hours is a variable)
- Do you participate in sports? (Sports participation is a variable)

The name "variable" makes sense when you think about it: the values vary from person to person, from object to object, or from time to time.

#### Diagram: Variable Types Concept Map

<iframe src="../../sims/variable-types-concept-map/main.html" width="100%" height="450px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Variable Types Concept Map</summary>
Type: infographic

Bloom Taxonomy: Understand (L2)
Bloom Verb: classify

Learning Objective: Students will be able to classify variables into categorical and quantitative types, and further subdivide quantitative variables into discrete and continuous.

Purpose: Create an interactive concept map showing the hierarchy of variable types with examples

Layout: Hierarchical tree structure starting from "Variable" at the top, branching into Categorical and Quantitative, with Quantitative further branching into Discrete and Continuous

Interactive elements:
- Hover over each node to see definition and 3-4 examples
- Click on a node to highlight its branch and dim others
- Nodes should expand/contract on click to show/hide examples

Node content:
1. Variable (root): "Any characteristic that can take different values"
   - Examples appear on hover: height, favorite color, age, political party

2. Categorical Variable: "Variable whose values are category names or labels"
   - Examples: hair color, zip code, blood type, brand preference, yes/no responses

3. Quantitative Variable: "Variable whose values are numerical measurements or counts"
   - Examples: height, weight, temperature, test scores, income

4. Discrete Variable: "Quantitative variable that can only take specific values, usually counts"
   - Examples: number of siblings, cars owned, text messages sent, goals scored

5. Continuous Variable: "Quantitative variable that can take any value within a range"
   - Examples: height, weight, time, temperature, blood pressure

Visual styling:
- Root node: purple/blue
- Categorical branch: green
- Quantitative branch: orange
- Discrete: light orange
- Continuous: darker orange
- Connecting lines with arrows showing hierarchy

Canvas size: Responsive, approximately 600x400px
Implementation: p5.js with hover detection and click handlers
</details>

## Observations and Datasets: Organizing Our Information

When we collect data, each individual thing we measure is called an **observation** (also called a case or a record). If you survey 30 students about their study habits, each student represents one observation.

An **observation** contains the values of all variables for one individual. Think of it like a row in a spreadsheet: everything we know about one person, one event, or one object.

When we put all our observations together, we get a **dataset**. A dataset is an organized collection of data, typically arranged in rows (observations) and columns (variables). Here's what a simple dataset might look like:

| Student | Hours of Sleep | Favorite Subject | GPA | Plays Sports |
|---------|---------------|------------------|-----|--------------|
| Maria | 7.5 | Math | 3.8 | Yes |
| James | 6.0 | History | 3.2 | Yes |
| Aisha | 8.0 | Science | 3.9 | No |
| Tyler | 5.5 | Art | 2.8 | Yes |
| Lin | 7.0 | Math | 3.6 | No |

In this dataset:

- Each row is one observation (one student)
- Each column is one variable (Sleep, Subject, GPA, Sports)
- We have 5 observations and 4 variables
- The values are the actual data points (7.5 hours, Math, 3.8, Yes)

## Categorical Variables: When Values Are Categories

Not all variables involve numbers. A **categorical variable** (also called a qualitative variable) places individuals into groups or categories. The values are labels or names, not numbers that you'd want to calculate with.

Examples of categorical variables include:

- Gender (male, female, non-binary)
- Blood type (A, B, AB, O)
- Favorite music genre (pop, rock, hip-hop, country, classical)
- State of residence (California **Quantitative variables** (also called numerical variables) take on numerical values that have meaning. You can do math with them. It makes sense to calculate an average height or a total number of points scored.

Here's a quick comparison:

| Categorical Variables | Quantitative Variables |
|----------------------|----------------------|
| Eye color | Height in inches |
| Political party | Annual income |
| Car brand | Temperature |
| Zip code | Number of pets |
| Grade level (A, B, C) | Grade percentage (87%, 92%) |

Wait, did you notice that zip code is categorical even though it's made of numbers? Good catch! Here's the thing: zip codes are labels, not quantities. You wouldn't average two zip codes or say that zip code 90210 is "greater than" zip code 10001 in any meaningful way. If the numbers are just labels, the variable is categorical.

!!! note "The Number Trap"
    Just because something looks like a number doesn't mean it's quantitative! Jersey numbers, social security numbers, phone numbers, and zip codes are all categorical because the numbers serve as labels, not measurements. Ask yourself: "Does it make sense to calculate an average of these values?" If not, it's probably categorical.

## Discrete vs. Continuous: Splitting Quantitative Variables

Quantitative variables come in two flavors: **discrete** and **continuous**.

**Discrete variables** can only take on specific, separated values, usually whole numbers or counts. You can list all possible values (at least in theory). Between any two values, there are only a limited number of possibilities, or sometimes none at all.

Examples of discrete variables:

- Number of siblings (0, 1, 2, 3, ...)
- Number of cars in a parking lot
- Number of text messages sent today
- Points scored in a game
- Number of AP classes taken

**Continuous variables** can take on any value within a range. Between any two values, there are infinitely many possible values. These typically arise from measurements rather than counts.

Examples of continuous variables:

- Height (you could be 67.3 inches, 67.31 inches, 67.314 inches...)
- Weight
- Temperature
- Time to run a mile
- Blood pressure

Here's a helpful tip: if you're counting things, the variable is usually discrete. If you're measuring things, it's usually continuous.

#### Diagram: Discrete vs Continuous Number Line

<iframe src="../../sims/discrete-continuous-numberline/main.html" width="100%" height="350px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Discrete vs Continuous Number Line Interactive</summary>
Type: microsim

Bloom Taxonomy: Understand (L2)
Bloom Verb: compare

Learning Objective: Students will distinguish between discrete and continuous variables by visualizing how values can be plotted on a number line.

Data Visibility Requirements:
- Stage 1: Show two parallel number lines, one for discrete and one for continuous
- Stage 2: For discrete, show only specific points (integers) that can be selected
- Stage 3: For continuous, show that any point can be selected including decimals

Instructional Rationale: Comparison visualization is appropriate because the Understand/compare objective requires learners to see the fundamental difference between variables that have gaps versus those that don't. Side-by-side display enables direct visual comparison.

Visual elements:
- Two horizontal number lines, stacked vertically
- Top line labeled "Discrete: Number of Pets" (range 0-10)
- Bottom line labeled "Continuous: Height in Inches" (range 60-72)
- Discrete line shows only integer points as clickable dots
- Continuous line shows a smooth gradient bar

Interactive controls:
- On discrete line: click to place markers only on integer values
- On continuous line: click anywhere to place a marker at exact position
- Display shows the exact value where user clicked
- Reset button clears all markers
- Toggle to show/hide example values

Default parameters:
- Both lines start empty
- Example mode shows 3-4 sample points on each

Behavior:
- When user clicks on discrete line between integers, snap to nearest integer with visual feedback
- When user clicks on continuous line, display value to 2 decimal places
- Highlight that continuous line accepts any value, discrete only specific values

Canvas size: Responsive, approximately 600x300px
Implementation: p5.js with mouse click detection
</details>

## Populations and Samples: Who Are We Studying?

Now let's talk about one of the most important distinctions in statistics: the difference between a **population** and a **sample**.

A **population** is the entire group of individuals that you want to study or make conclusions about. It includes everyone or everything that fits your criteria. Notice the word "entire" there; populations can be huge!

Examples of populations:

- All students currently enrolled in U.S. high schools
- Every car manufactured by Toyota in 2024
- All adults in California with diabetes
- Every tweet posted in the last 24 hours

Here's the challenge: we almost never can study an entire population. It would take too long, cost too much, or be physically impossible. Imagine trying to survey every single high school student in America. That's millions of people!

This is where **samples** come to the rescue. A **sample** is a subset of the population that we actually collect data from. We study the sample and use what we learn to make conclusions about the larger population.

Think of it like taste-testing soup. You don't drink the whole pot to know if it needs more salt. You take a small spoonful (a sample) and use that to judge the whole pot (the population). Statistics works the same way.

#### Diagram: Population and Sample Visualization

<iframe src="../../sims/population-sample-visual/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Population and Sample Visualization</summary>
Type: microsim

Bloom Taxonomy: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain the relationship between a population and a sample by interactively selecting sample members from a population.

Data Visibility Requirements:
- Stage 1: Show a large group of individuals representing a population (50-100 icons)
- Stage 2: User selects individuals to form a sample
- Stage 3: Show the sample highlighted and separated, with count statistics

Instructional Rationale: Interactive selection enables learners to experience the sampling process directly, making the abstract concept concrete. Seeing both population and sample simultaneously reinforces their relationship.

Visual elements:
- Large rectangular area representing the population (labeled "Population: All Students at Lincoln High School")
- 80-100 small person icons scattered in the population area
- Icons have random but realistic height and shirt color variation
- Selected icons become highlighted/circled
- Side panel shows current sample with selected individuals

Interactive controls:
- Click individual icons to add/remove from sample
- "Random Sample" button selects 10 random individuals
- "Clear Sample" button resets selection
- Slider to adjust sample size for random selection (5-25)
- Display shows: Population size, Sample size, Sample percentage

Behavior:
- Population icons subtly different to represent variability
- Selected icons move to a "Sample" area on right side or become highlighted
- Statistics update in real-time as sample changes
- Animation when random sample is selected

Color scheme:
- Unselected individuals: muted blue/gray
- Selected individuals: bright orange with glow effect
- Population area: light blue background
- Sample area: light orange background

Canvas size: Responsive, approximately 700x450px
Implementation: p5.js
</details>

## Why Sampling Matters

You might wonder why we can't just study the whole population. There are several practical reasons:

1. **Time**: Surveying millions of people takes forever
2. **Money**: Data collection is expensive
3. **Impossibility**: Some populations are infinite or inaccessible
4. **Destruction**: Testing all light bulbs until they burn out destroys your inventory!

The goal of statistics is to learn about the population by studying a sample. But here's the catch: for our conclusions to be valid, the sample needs to represent the population well. A good sample is like a miniature version of the population. We'll learn much more about sampling methods in a later chapter.

!!! tip "Sylvia's Sampling Story"
    "I once tried to figure out which trees in Oak Valley produced the most acorns. Checking every single tree would have taken all autumn! So I picked 20 trees spread across different parts of the valley. My sample told me where to focus my collection efforts, and I had the best-stocked winter den in squirrel history. That's the power of sampling!"

## Parameters vs. Statistics: Numbers That Describe

Now we arrive at a distinction that trips up a lot of students, but once you get it, it'll stick with you forever. Ready? Let's crack this nut!

A **parameter** is a number that describes something about the **population**. A **statistic** is a number that describes something about the **sample**.

Both parameters and statistics are numerical summaries, but they describe different groups:

| Term | Describes | Example |
|------|----------|---------|
| Parameter | Population | The average height of ALL adults in the U.S. |
| Statistic | Sample | The average height of 500 adults we measured |

Here's the key insight: we usually don't know the true population parameter because we can't study everyone. What we can calculate is the sample statistic. Then we use that statistic to estimate or make inferences about the unknown parameter.

The reason this matters is that statistics come with uncertainty. If you survey a different sample of 500 people, you'll likely get a slightly different average. The sample statistic is our best guess at the population parameter, but it's still just a guess based on incomplete information.

#### Diagram: Parameter vs Statistic Comparison

<iframe src="../../sims/parameter-statistic-compare/main.html" width="100%" height="400px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Parameter vs Statistic Interactive Comparison</summary>
Type: microsim

Bloom Taxonomy: Apply (L3)
Bloom Verb: calculate

Learning Objective: Students will calculate sample statistics and compare them to population parameters, understanding why statistics vary but parameters are fixed.

Data Visibility Requirements:
- Stage 1: Show a population of 200 values with the true parameter displayed
- Stage 2: Draw a sample and calculate its statistic
- Stage 3: Compare the statistic to the parameter, show the difference

Instructional Rationale: Calculation and comparison is appropriate because the Apply objective requires learners to actively compute statistics and observe how they differ from the fixed parameter. Multiple samples reinforce variability.

Visual elements:
- Left side: Population visualization as a histogram or dot plot
- Population parameter (mean) shown as a vertical line
- Right side: Sample visualization (same type of plot)
- Sample statistic shown as a vertical line
- Comparison panel showing both values and the difference

Interactive controls:
- "Draw New Sample" button to randomly select sample from population
- Sample size slider (10, 25, 50, 100)
- Counter showing number of samples drawn
- Running display of all statistics from previous samples
- Reset button

Default parameters:
- Population: 200 values with mean = 70 (perhaps representing heights)
- Initial sample size: 25
- Show population mean = 70 (parameter, marked with Greek letter mu)

Behavior:
- Each click generates new random sample
- Calculate and display sample mean (statistic, marked with x-bar)
- Show difference between statistic and parameter
- Build up history of sample means to see variability
- Larger samples tend to give statistics closer to parameter

Canvas size: Responsive, approximately 700x350px
Implementation: p5.js with random sampling from predefined population
</details>

## Understanding Distribution

The word **distribution** is one you'll hear constantly in statistics, so let's make sure you understand it from the start. A distribution describes the pattern of values that a variable takes on. It tells us what values are possible and how often each value occurs.

Think about the heights of students in your school. The distribution would show:

- What's the shortest height?
- What's the tallest height?
- What's the most common height?
- Are heights clustered together or spread out?
- Is the pattern symmetric or lopsided?

We can display distributions using tables, graphs, or mathematical formulas. For now, just know that when statisticians talk about "the distribution of a variable," they're talking about the overall pattern or shape of that variable across all individuals.

Some key questions a distribution answers:

- **Where is the center?** What's typical or average?
- **How spread out are the values?** Are they tightly clustered or widely scattered?
- **What shape does the pattern make?** Is it symmetric, skewed, or something else?
- **Are there unusual values?** Any outliers or surprises?

We'll explore distributions in much more depth in the next chapter when we start graphing and summarizing data.

## Explanatory and Response Variables: Exploring Relationships

When statisticians investigate relationships between two variables, they often think about cause and effect, or at least which variable might influence which. This leads to two important roles that variables can play.

The **explanatory variable** (also called the independent variable or predictor) is the variable we think might explain or influence changes in another variable. It's the potential cause or the variable we might manipulate.

The **response variable** (also called the dependent variable or outcome) is the variable we think might be affected or influenced. It's the potential effect or the variable we measure as an outcome.

Here are some examples:

| Research Question | Explanatory Variable | Response Variable |
|-------------------|---------------------|-------------------|
| Does studying more improve test scores? | Hours studied | Test score |
| Does exercise affect heart rate? | Minutes of exercise | Heart rate |
| Does temperature affect ice cream sales? | Temperature | Ice cream sales |
| Does fertilizer affect plant growth? | Amount of fertilizer | Plant height |

When you set up a scatterplot (which we'll learn about later), the explanatory variable typically goes on the x-axis (horizontal) and the response variable goes on the y-axis (vertical).

A word of caution: just because we call something an "explanatory variable" doesn't mean it actually causes changes in the response. Finding an association between two variables is not the same as proving causation. We'll explore this crucial distinction later in the course.

## Putting It All Together

Let's consolidate everything with a comprehensive example. Imagine a researcher wants to study whether sleep affects academic performance in high school students.

**Population**: All high school students in the United States (approximately 15 million students)

**Sample**: 500 randomly selected high school students from across the country

**Variables collected for each student**:

- Hours of sleep per night (quantitative, continuous)
- GPA (quantitative, continuous)
- Grade level (categorical: freshman, sophomore, junior, senior)
- Number of AP classes (quantitative, discrete)
- Gender (categorical)
- Do they play sports? (categorical: yes/no)

**Observations**: Each of the 500 students is one observation

**Dataset**: The spreadsheet containing all 500 students and their values for each variable

**Parameter**: The true average sleep hours for ALL U.S. high school students (unknown)

**Statistic**: The average sleep hours calculated from our 500-student sample (known, calculated)

**Distribution**: The pattern of sleep hours across our sample (most students cluster around 6-7 hours, some get more, some get less)

**Explanatory variable**: Hours of sleep (we think it might influence performance)

**Response variable**: GPA (we're measuring this as the outcome)

#### Diagram: Complete Study Design Map

<iframe src="../../sims/study-design-map/main.html" width="100%" height="550px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Interactive Study Design Concept Map</summary>
Type: infographic

Bloom Taxonomy: Analyze (L4)
Bloom Verb: organize

Learning Objective: Students will organize all chapter concepts into a coherent mental framework by seeing how population, sample, variables, parameters, and statistics relate in a real study.

Purpose: Create an interactive concept map that shows how all the foundational statistics concepts connect in the context of a real research study

Layout: Central hub-and-spoke design with the "Study" at center, branching to major concepts, with sub-branches for details

Interactive elements:
- Click on any concept to see its definition and example from the sleep study
- Hover to highlight related concepts and connections
- Expandable nodes that reveal deeper information
- Connection lines that animate to show information flow

Concept nodes:
1. Population (center-left): "All U.S. high school students"
   - Shows an icon representing millions of students

2. Sample (below Population): "500 randomly selected students"
   - Arrow from Population to Sample labeled "Select from"

3. Variables (center-right): Branches to:
   - Categorical: Grade level, Gender, Sports participation
   - Quantitative: GPA, Sleep hours, AP classes
   - Further branches to Discrete and Continuous

4. Parameter (connected to Population): "True average sleep = ?"
   - Shows mystery/unknown symbol

5. Statistic (connected to Sample): "Sample average sleep = 6.8 hours"
   - Shows calculated value

6. Distribution (connected to both): "Pattern of sleep hours"
   - Small histogram preview

7. Explanatory/Response (bottom):
   - Sleep hours (explanatory) arrow pointing to GPA (response)

Color scheme:
- Population/Parameter: Blue tones
- Sample/Statistic: Orange tones
- Variables: Green tones
- Relationships: Purple connections

Animation:
- On load, nodes appear sequentially with connections drawing in
- Pulse effect on related nodes when one is selected

Canvas size: Responsive, approximately 750x500px
Implementation: p5.js with vis-network-style interaction
</details>

## Common Mistakes to Avoid

Before we wrap up, let's tackle some common pitfalls that students encounter with these foundational concepts:

**Mistake 1: Confusing parameter and statistic**
Remember: Parameters describe Populations (both start with P), and Statistics describe Samples (both start with S).

**Mistake 2: Thinking numerical means quantitative**
Numbers that serve as labels (like zip codes, jersey numbers, or phone numbers) are categorical, not quantitative. Ask yourself: "Does averaging make sense?"

**Mistake 3: Forgetting that samples vary**
Different samples give different statistics. That's not a bug in statistics; it's a feature we learn to work with!

**Mistake 4: Assuming explanatory means causal**
Just because we call a variable "explanatory" doesn't mean it actually causes changes in the response. Correlation is not causation!

**Mistake 5: Mixing up discrete and continuous**
Discrete = counting (0, 1, 2, 3...), Continuous = measuring (can be any value, including fractions/decimals)

## Key Takeaways

Let's squirrel away the big ideas from this chapter:

1. **Statistics** is the science of learning from data through collection, organization, analysis, and interpretation.

2. **Data** are pieces of information collected about individuals or things.

3. **Variables** are characteristics that can take different values. They can be:
   - Categorical (categories/labels) or Quantitative (numbers with meaning)
   - If quantitative: Discrete (counts) or Continuous (measurements)

4. An **observation** is the data collected for one individual; a **dataset** is all observations together.

5. A **population** is everyone/everything you want to study; a **sample** is the subset you actually study.

6. A **parameter** describes a population; a **statistic** describes a sample. We use statistics to estimate parameters.

7. A **distribution** describes the pattern of values a variable takes.

8. **Explanatory variables** might influence **response variables**, but association is not causation.

---

??? question "Check Your Understanding"
    A researcher surveys 150 customers leaving a grocery store, asking about their age, whether they used coupons (yes/no), and how much they spent. She wants to understand shopping habits of all customers at the store.

    1. What is the population?
    2. What is the sample?
    3. Identify a categorical variable.
    4. Identify a quantitative variable. Is it discrete or continuous?
    5. If she calculates the average amount spent by the 150 customers, is that a parameter or statistic?

    **Answers:**
    1. Population: All customers at the grocery store
    2. Sample: The 150 customers surveyed
    3. Categorical variable: Coupon use (yes/no)
    4. Quantitative variable: Amount spent (continuous - any dollar amount possible); Age could also work (often treated as discrete when measured in whole years)
    5. Statistic - it describes the sample, not the entire population

You've just learned the vocabulary that statisticians use every day. These aren't just definitions to memorize; they're the foundation for everything that follows. In the next chapter, we'll start exploring data visually with graphs and numerically with summary statistics.

Now that's a data point worth collecting!
