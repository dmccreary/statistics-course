---
title: Sampling and Bias
description: Sampling methods, sources of bias, and survey design principles
generated_by: claude skill chapter-content-generator
date: 2026-02-06
version: 0.04
---

# Sampling and Bias

*"Alright, friends, here's the deal: in statistics, the way you gather your data matters just as much as what you do with it afterward. Get this step wrong, and everything downstream goes wonky. But don't worry—by the end of this chapter, you'll be a sampling superstar. Let's crack this nut!"* — Sylvia

## Introduction: Why Sampling Matters

Imagine you want to know what percentage of students at your school prefer pizza over tacos for lunch. You could ask every single student—but that would take forever! Instead, you might ask a smaller group and use their answers to estimate what the whole school thinks. This process of selecting a subset to represent the whole is called **sampling**, and it's one of the most powerful tools in statistics.

The catch? If you choose your sample poorly, your conclusions could be completely wrong. Ask only the students in the pizza club, and you'll get a very different answer than if you surveyed the whole school fairly. The errors that creep in when samples don't represent populations well are called **bias**, and learning to avoid bias is what this chapter is all about.

Good sampling is like building a foundation for a house. Get it right, and everything you build on top—your confidence intervals, your hypothesis tests, your predictions—will be solid. Get it wrong, and the whole structure wobbles.

## Census vs. Sample: The Big Picture

Before we dive into sampling methods, let's clarify two fundamental approaches to gathering data:

| Approach | Definition | Advantages | Disadvantages |
|----------|------------|------------|---------------|
| **Census** | Collect data from every member of the population | Complete accuracy; no sampling error | Expensive, time-consuming, often impractical |
| **Sample** | Collect data from a subset of the population | Faster, cheaper, feasible for large populations | May not perfectly represent the population |

A **census** is the gold standard—if you could magically survey every person, you'd know exactly what the population looks like. The U.S. Census attempts this every ten years, but even with massive resources, achieving a true census is difficult. People move, refuse to respond, or get missed.

In most real-world situations, we use **samples** instead. The key question becomes: how do we select a sample that accurately represents the population?

*"Think of it this way,"* Sylvia explains, *"a census is like counting every single acorn in the forest. A sample is like carefully picking a handful from different spots and using that to estimate the total. Both have their place, but samples are way more practical when your forest has millions of trees!"*

## The Problem of Bias

**Bias** occurs when the sampling method systematically favors certain outcomes over others. A biased sample doesn't represent the population fairly—it's tilted in one direction.

Here's the crucial distinction:

- **Unbiased Estimator**: A sampling method where, on average, the sample statistic equals the population parameter. If you repeated the sampling process many times, the results would center on the true value.
- **Biased Estimator**: A sampling method that consistently overestimates or underestimates the population parameter. No matter how many samples you take, your results systematically miss the mark.

<details markdown="1">
<summary>Show/Hide</summary>

#### Diagram: Bias vs. Variability Target Visualization

Create an interactive MicroSim showing the classic "target" diagram illustrating bias and variability.

**Learning Objective**: Students will understand the difference between bias (systematic error) and variability (random error) through a visual target metaphor.

**Inputs**:

- Dropdown selector: "Low Bias/Low Variability", "Low Bias/High Variability", "High Bias/Low Variability", "High Bias/High Variability"
- Button to generate new random sample points

**Outputs**:

- Target with bullseye representing the true population parameter
- Dots representing sample estimates scattered according to the selected bias/variability combination
- Visual explanation text updating based on selection

**Behavior**:

- Low Bias/Low Variability: Dots cluster tightly around the bullseye center
- Low Bias/High Variability: Dots spread widely but centered on bullseye
- High Bias/Low Variability: Dots cluster tightly but away from center
- High Bias/High Variability: Dots spread widely and off-center

**Size**: 600 x 450 pixels

</details>

The target diagram helps visualize this concept:

- **Low bias, low variability**: Your shots cluster tightly around the bullseye. This is the ideal.
- **Low bias, high variability**: Your shots are centered on the bullseye but scattered widely. You're not systematically missing, just inconsistent.
- **High bias, low variability**: Your shots cluster tightly, but they're consistently off to one side. You're reliably missing in the same direction.
- **High bias, high variability**: Your shots are scattered AND off-center. This is the worst scenario.

*"My tail's tingling—we're onto something important here!"* Sylvia says. *"Bias is sneaky because it doesn't average out. Take more samples with a biased method, and you just get more confidently wrong!"*

## Probability Sampling Methods

To avoid bias, statisticians use **probability sampling** methods, where every member of the population has a known, non-zero chance of being selected. Let's explore the four main types.

### Simple Random Sample (SRS)

A **simple random sample** gives every possible sample of size \( n \) an equal chance of being selected. Equivalently, every individual has an equal probability of being chosen.

**How it works**:

1. List all members of the population (create a sampling frame)
2. Assign each member a unique number
3. Use a random process to select \( n \) numbers
4. Include those individuals in your sample

The random selection process is crucial. You can use:

- **Random Number Generator**: A computer algorithm that produces unpredictable numbers. Most calculators and spreadsheets have built-in RNG functions.
- **Random Digit Table**: A printed table of random digits (0-9) arranged in groups. You read through the table to select numbers that correspond to individuals in your population.

**Example using a Random Digit Table**:

Suppose you have 50 students numbered 01-50, and you want to select 5 for your sample. Starting at a random position in the table, you read two-digit numbers:

| Digits Read | Action |
|-------------|--------|
| 29 | Select student 29 |
| 07 | Select student 07 |
| 53 | Skip (out of range) |
| 98 | Skip (out of range) |
| 41 | Select student 41 |
| 12 | Select student 12 |
| 29 | Skip (already selected) |
| 33 | Select student 33 |

Your sample: Students 07, 12, 29, 33, 41

<details markdown="1">
<summary>Show/Hide</summary>

#### Diagram: Random Digit Table Simulator

Create an interactive MicroSim demonstrating how to use a random digit table for sampling.

**Learning Objective**: Students will practice using a random digit table to select a simple random sample.

**Inputs**:

- Population size input (1-999)
- Sample size input (1-50)
- Starting row and column position in the table
- "Generate New Table" button
- "Step Through Selection" button

**Outputs**:

- Displayed random digit table (10 rows x 20 digits)
- Highlighted digits as user steps through
- Running list of selected sample members
- Explanation of why each number was accepted/rejected

**Behavior**:

- Determines how many digits to read based on population size
- Highlights current position in table
- Shows skip reasons (out of range, already selected)
- Counts until sample is complete

**Size**: 700 x 500 pixels

</details>

**Advantages of SRS**:

- Simple to understand and implement
- Eliminates selection bias
- Statistical theory is well-developed

**Disadvantages of SRS**:

- Requires a complete list of the population
- May miss important subgroups by chance
- Can be expensive for geographically spread populations

### Stratified Random Sample

A **stratified random sample** divides the population into non-overlapping groups called **strata** (singular: stratum), then takes a simple random sample from each stratum.

**When to Stratify**:

- When the population contains distinct subgroups that may differ in the characteristic you're measuring
- When you want to ensure representation of small subgroups
- When you want to compare subgroups
- When you have prior knowledge about variability within strata

**Example**: Surveying student opinions about the new cafeteria menu.

| Stratum | Population Size | Sample Size |
|---------|-----------------|-------------|
| Freshmen | 400 | 40 |
| Sophomores | 350 | 35 |
| Juniors | 300 | 30 |
| Seniors | 250 | 25 |
| **Total** | **1,300** | **130** |

By stratifying, you guarantee that all grade levels are represented proportionally—something an SRS might miss by chance.

*"Acorn for your thoughts?"* Sylvia muses. *"If I wanted to estimate acorn production across different tree species in my forest, I wouldn't just randomly sample trees. I'd make sure to include oaks, maples, and pines separately. That's stratifying!"*

**Why stratification works**: The key insight is that variability *within* strata is usually less than variability across the whole population. By sampling each stratum separately, you reduce overall sampling error.

### Cluster Sample

A **cluster sample** divides the population into groups called clusters, randomly selects some clusters, and then surveys *everyone* (or a random sample) within the selected clusters.

**Key difference from stratified sampling**:

| Stratified | Cluster |
|------------|---------|
| Use ALL strata | Use SOME clusters |
| Sample FROM each stratum | Sample everyone IN selected clusters |
| Strata should be internally homogeneous | Clusters should be internally heterogeneous |
| Goal: Reduce variability | Goal: Reduce cost |

**Example**: To survey U.S. high school students, you might:

1. Randomly select 100 high schools from the list of all U.S. high schools
2. Survey all students at those 100 schools

This is much cheaper than creating a list of all U.S. high school students and sampling from it directly.

<details markdown="1">
<summary>Show/Hide</summary>

#### Diagram: Stratified vs. Cluster Sampling Comparison

Create an interactive MicroSim comparing stratified and cluster sampling visually.

**Learning Objective**: Students will distinguish between stratified and cluster sampling approaches.

**Inputs**:

- Toggle between "Stratified" and "Cluster" sampling mode
- Population displayed as a grid of colored dots (colors represent strata/clusters)
- "Select Sample" button

**Outputs**:

- Visual highlighting of selected individuals
- Count of individuals selected from each group
- Text explanation of the sampling process used

**Behavior**:

- Stratified mode: Shows population divided into horizontal strata; randomly selects from EACH stratum
- Cluster mode: Shows population divided into vertical clusters; selects entire clusters randomly
- Clear visual distinction between the two approaches

**Size**: 650 x 500 pixels

</details>

**When to use cluster sampling**:

- When a complete list of individuals is unavailable, but a list of clusters exists
- When clusters are geographically convenient
- When the cost of sampling is high

**Drawback**: If clusters are internally similar to each other (low within-cluster variability), cluster sampling can be less precise than SRS.

### Systematic Sample

A **systematic sample** selects individuals at regular intervals from an ordered list. You randomly select a starting point, then pick every \( k \)th individual.

**How it works**:

1. Order the population (the order shouldn't be related to what you're measuring)
2. Calculate \( k = \frac{\text{Population size}}{\text{Sample size}} \)
3. Randomly select a starting point between 1 and \( k \)
4. Select every \( k \)th individual after that

**Example**: To select 50 students from 1,000:

- \( k = 1000/50 = 20 \)
- Random start: 7
- Sample: Students 7, 27, 47, 67, 87, ... , 987

**Advantages**: Easy to implement, spreads sample evenly across the population.

**Caution**: If the list has a periodic pattern that matches your sampling interval, systematic sampling can introduce bias. For example, if every 10th house on a street is a corner house, and \( k = 10 \), your sample would include only corner houses.

## Non-Probability Sampling Methods (and Why They're Problematic)

Not all sampling methods involve random selection. While sometimes convenient, these methods often produce biased results.

### Convenience Sample

A **convenience sample** selects individuals who are easiest to reach. The researcher simply gathers data from whoever is available.

**Examples**:

- Surveying friends about their music preferences
- Interviewing people at a mall on a Tuesday afternoon
- Asking your Instagram followers for opinions

*"Don't worry—every statistician drops an acorn sometimes,"* Sylvia admits, *"and I'll confess: when I was young, I used to estimate forest conditions based only on trees near my nest. Major convenience sample mistake! Turns out, my neighborhood wasn't representative at all."*

**Why it's biased**: The people who are easy to reach often differ systematically from the population. Mall shoppers on weekday afternoons might be retirees or shift workers—not representative of all consumers.

### Voluntary Response Sample

A **voluntary response sample** allows individuals to self-select into the sample. The researcher puts out a request, and people who feel strongly about the topic choose to respond.

**Examples**:

- Online polls ("Click here to vote!")
- Call-in radio shows
- Product reviews
- Letters to the editor

**Why it's biased**: People with extreme opinions (very positive or very negative) are more likely to respond. The results typically overrepresent strong feelings and underrepresent moderate views.

| Sampling Method | Random? | Equal Probability? | Likely Biased? |
|-----------------|---------|-------------------|----------------|
| Simple Random Sample | Yes | Yes | No |
| Stratified Random Sample | Yes | Can vary by stratum | No |
| Cluster Sample | Yes | Depends on cluster selection | No |
| Systematic Sample | Partially | Approximately | Usually no |
| Convenience Sample | No | No | **Yes** |
| Voluntary Response Sample | No | No | **Yes** |

## Sources of Bias

Even with good sampling methods, bias can sneak in through other doors. Let's examine the main sources.

### Undercoverage

**Undercoverage** occurs when some members of the population are less likely to be included in the sample than others—or are excluded entirely from the sampling frame.

**Examples**:

- Phone surveys miss people without phones
- Online surveys miss people without internet access
- Household surveys miss homeless individuals
- School surveys miss students who are absent frequently

**Historical example**: The 1936 Literary Digest poll predicted Alf Landon would defeat Franklin Roosevelt in a landslide. They surveyed people from phone directories and automobile registrations—but during the Great Depression, many Roosevelt supporters couldn't afford phones or cars. The poll suffered from severe undercoverage of lower-income voters.

<details markdown="1">
<summary>Show/Hide</summary>

#### Diagram: Undercoverage Visualization

Create an interactive MicroSim demonstrating how undercoverage affects sample estimates.

**Learning Objective**: Students will understand how incomplete sampling frames lead to biased estimates.

**Inputs**:

- Population with two groups: "covered" and "undercovered"
- Slider: percentage of population undercovered (0-50%)
- Slider: difference in response between covered/undercovered groups
- "Take Sample" button

**Outputs**:

- Visual representation of population and sample
- True population proportion
- Sample estimate
- Bias = (sample estimate) - (true proportion)
- Explanation of how undercoverage affected the result

**Behavior**:

- Shows grayed-out undercovered individuals who cannot be sampled
- Sample taken only from covered portion
- Demonstrates how different values in the undercovered group lead to biased estimates

**Size**: 600 x 450 pixels

</details>

### Nonresponse Bias

**Nonresponse bias** occurs when individuals selected for the sample do not respond, and those who don't respond differ systematically from those who do.

**Key insight**: It's not the nonresponse itself that causes bias—it's whether nonresponders differ from responders on the variable being measured.

**Examples**:

- Wealthy people may be less likely to respond to income surveys (underestimating average income... or overestimating, depending on the context!)
- Busy parents may skip lengthy surveys about parenting practices
- People with negative experiences may be more likely to complete complaint surveys

**Response rates matter**: A survey with a 10% response rate is more susceptible to nonresponse bias than one with an 80% response rate—though even high response rates don't guarantee the absence of bias.

### Response Bias

**Response bias** occurs when responses are systematically inaccurate. The problem isn't who's answering; it's that the answers themselves are distorted.

**Causes of response bias**:

| Type | Description | Example |
|------|-------------|---------|
| Social desirability | People give answers they think are more acceptable | Overreporting exercise, underreporting alcohol consumption |
| Interviewer effect | Responses influenced by who's asking | People may respond differently to interviewers of different demographics |
| Recall issues | Memory failures or distortions | "How many times did you eat vegetables last month?" |
| Prestige bias | Exaggerating positive attributes | Overreporting income or education level |

### Wording of Questions

The **wording of questions** can dramatically influence responses. Even small changes in phrasing can shift results significantly.

**Problematic question types**:

1. **Leading questions**: Suggest a particular answer
   - Bad: "Don't you agree that the new policy is beneficial?"
   - Better: "What is your opinion of the new policy?"

2. **Loaded questions**: Contain emotionally charged words
   - Bad: "Should taxpayers be forced to fund this wasteful program?"
   - Better: "Should government funding continue for this program?"

3. **Double-barreled questions**: Ask two things at once
   - Bad: "Do you support increasing teacher salaries and reducing class sizes?"
   - Better: Ask these as two separate questions

4. **Confusing questions**: Use jargon or complex phrasing
   - Bad: "To what extent do you concur with the proposition that pedagogical methodologies should be reformed?"
   - Better: "Should teaching methods be changed?"

*"Let's crack this nut with an example,"* Sylvia offers. *"Watch how question wording changes responses about the same issue:"*

| Question Version | Likely Response Pattern |
|------------------|------------------------|
| "Should the government prohibit hate speech?" | Higher support |
| "Should the government restrict free speech?" | Lower support |
| "Should the government regulate harmful rhetoric online?" | Moderate support |

All three ask about limits on speech, but the framing dramatically affects answers.

<details markdown="1">
<summary>Show/Hide</summary>

#### Diagram: Question Wording Effects Simulator

Create an interactive MicroSim demonstrating how question wording affects survey responses.

**Learning Objective**: Students will recognize how subtle changes in question wording can produce different response patterns.

**Inputs**:

- Topic selector (e.g., environmental policy, school rules, technology use)
- Three versions of a question on the same topic with different wording (neutral, positively framed, negatively framed)
- Radio button to select which version to "send"

**Outputs**:

- Simulated response distribution for each question version
- Bar chart comparing support levels across different wordings
- Highlighted words that create the framing effect

**Behavior**:

- Shows how the same underlying topic yields different apparent "public opinion" based on wording
- Identifies specific word choices that trigger bias
- Explains the psychological mechanism behind each bias

**Size**: 650 x 500 pixels

</details>

## Designing Surveys: Putting It All Together

Good **survey design** requires attention to every stage of the process. Here's a checklist for designing valid surveys:

### 1. Define Your Target Population Clearly

- Who exactly do you want to learn about?
- Be specific: "U.S. adults aged 18-65" vs. "people"

### 2. Develop a Complete Sampling Frame

- List all members of your target population
- Identify and address potential gaps that could cause undercoverage

### 3. Choose an Appropriate Sampling Method

- For most situations, probability sampling (SRS, stratified, cluster, or systematic) is essential
- Match the method to your resources and population structure

### 4. Minimize Nonresponse

Strategies include:

- Keep surveys short and engaging
- Offer incentives (with caution—they can introduce other biases)
- Use multiple contact attempts
- Make participation easy (online options, flexible times)
- Explain the importance of the research

### 5. Write Clear, Unbiased Questions

Question design checklist:

- [ ] Is the question clear and unambiguous?
- [ ] Does it avoid leading language?
- [ ] Does it ask about only one thing?
- [ ] Are response options exhaustive and mutually exclusive?
- [ ] Is the question free of jargon?
- [ ] Have you tested the question with a pilot group?

### 6. Order Questions Thoughtfully

- Start with easy, non-threatening questions
- Group related questions together
- Place sensitive questions later (after rapport is established)
- Consider how earlier questions might influence later answers

### 7. Pilot Test Your Survey

Before full deployment:

- Test with a small group similar to your target population
- Identify confusing questions
- Check how long the survey takes
- Revise based on feedback

<details markdown="1">
<summary>Show/Hide</summary>

#### Diagram: Survey Design Checklist Interactive

Create an interactive MicroSim that walks students through evaluating survey quality.

**Learning Objective**: Students will apply survey design principles to evaluate and improve sample surveys.

**Inputs**:

- Display a sample survey scenario with potential problems
- Checklist of survey quality criteria
- Text field for student suggestions

**Outputs**:

- Highlighted problems in the survey
- Score based on criteria met
- Suggested improvements
- "Before and After" comparison when fixes are applied

**Behavior**:

- Present 3-4 different survey scenarios with various flaws
- Allow students to identify problems using the checklist
- Show improved version when student correctly identifies issues
- Track which types of problems are hardest to spot

**Size**: 700 x 550 pixels

</details>

*"Time to squirrel away this knowledge!"* Sylvia summarizes. *"Good surveys don't just happen—they're carefully designed. Every choice you make, from who you sample to how you phrase questions, affects the quality of your data."*

## Common Scenarios: Identifying Sampling Issues

Let's practice identifying bias in real-world scenarios:

**Scenario 1**: A magazine wants to know readers' opinions about its new format. They include a survey card in the magazine asking readers to mail it back.

- **Problem**: Voluntary response bias. Only readers with strong opinions (love it or hate it) will bother returning the card.

**Scenario 2**: A researcher studies teen social media use by surveying students at an elite private school.

- **Problem**: Convenience sample and undercoverage. Students at this school may not represent all teens.

**Scenario 3**: A political poll asks, "Do you support the reckless spending bill proposed by Senator Smith?"

- **Problem**: Leading/loaded question. "Reckless" biases respondents toward a negative answer.

**Scenario 4**: A health survey administered only in English in a multilingual community.

- **Problem**: Undercoverage of non-English speakers.

**Scenario 5**: A phone survey conducted only on landlines.

- **Problem**: Undercoverage of people who only have cell phones (often younger adults).

## Key Takeaways

Let's squirrel away the essential concepts from this chapter:

1. **Sampling vs. Census**: A sample examines a subset of the population; a census examines everyone. Samples are usually more practical but must be carefully designed.

2. **Bias**: Systematic error that causes sample statistics to consistently miss the population parameter in one direction. Unlike random variability, bias doesn't average out with larger samples.

3. **Probability Sampling Methods**:
   - **Simple Random Sample (SRS)**: Every possible sample of size n has equal probability
   - **Stratified**: Divide into strata, SRS from each
   - **Cluster**: Randomly select clusters, sample everyone in chosen clusters
   - **Systematic**: Select every kth individual from a random start

4. **Non-Probability Methods** (avoid when possible):
   - **Convenience**: Select whoever is easy to reach
   - **Voluntary Response**: Let people self-select

5. **Sources of Bias**:
   - **Undercoverage**: Sampling frame misses part of the population
   - **Nonresponse**: Selected individuals don't respond (and differ from responders)
   - **Response Bias**: Answers are systematically inaccurate

6. **Question Wording**: Avoid leading, loaded, double-barreled, and confusing questions.

7. **Survey Design**: Requires careful attention to population definition, sampling frame, sampling method, question design, and pilot testing.

8. **Unbiased vs. Biased Estimators**: An unbiased estimator centers on the true parameter value across many samples; a biased estimator systematically misses.

*"And that, my friends, is how you collect data that's actually worth analyzing!"* Sylvia beams. *"Remember: garbage in, garbage out. But good data in? That's where the statistical magic happens!"*

## Practice Problems

Test your understanding with these problems:

---

**Problem 1**: A university wants to survey student satisfaction. They email a survey to all 25,000 students and receive 2,500 responses.

a) What type of sampling method is this?
b) What type of bias is most likely to affect the results?
c) Suggest an improvement to the study design.

<details markdown="1">
<summary>Show Solution</summary>

a) **Voluntary response sample** — students choose whether to respond.

b) **Nonresponse bias** is most likely. Only 10% responded, and those who felt strongly (positively or negatively) about their experience are more likely to complete the survey. **Voluntary response bias** is also present since students self-selected.

c) **Improvement**: Select a simple random sample of 500 students and use multiple follow-up contacts to maximize response rate. Consider offering an incentive for completion.

</details>

---

**Problem 2**: To estimate the average number of hours students spend on homework, a researcher stands outside the library and surveys students as they exit.

a) Identify the sampling method.
b) Explain why this sample is likely biased.
c) What direction would you expect the bias to be?

<details markdown="1">
<summary>Show Solution</summary>

a) **Convenience sample** — surveying whoever is easy to reach.

b) Students at the library are likely to be those who spend more time on homework than the typical student. Students who rarely use the library for studying are systematically excluded.

c) The bias is likely **upward** — the sample will probably overestimate the average homework hours because library users tend to be more studious.

</details>

---

**Problem 3**: A polling organization wants to estimate support for a new city park. They divide the city into 50 neighborhoods, randomly select 5 neighborhoods, and survey every household in those neighborhoods.

a) What sampling method is this?
b) Under what conditions might this method produce a biased estimate?

<details markdown="1">
<summary>Show Solution</summary>

a) **Cluster sample** — randomly selecting some clusters (neighborhoods) and surveying everyone within them.

b) This method could produce biased estimates if:
- The selected neighborhoods are systematically different from the city as a whole
- Neighborhoods are internally similar but different from each other (e.g., wealthy neighborhoods vs. lower-income neighborhoods might have different views on how to spend city resources)
- Five neighborhoods may be too few to adequately represent the city's diversity

</details>

---

**Problem 4**: Classify each question as leading, loaded, double-barreled, or well-designed:

a) "Do you agree that the brilliant new superintendent has improved schools?"
b) "How satisfied are you with school lunches and after-school programs?"
c) "On a scale of 1-5, how would you rate the quality of your education?"
d) "Should wasteful government programs be eliminated?"

<details markdown="1">
<summary>Show Solution</summary>

a) **Leading** — "brilliant" suggests how the respondent should answer

b) **Double-barreled** — asks about two different things (lunches AND after-school programs)

c) **Well-designed** — neutral wording, clear scale, asks about one thing

d) **Loaded** — "wasteful" is emotionally charged and assumes the programs are wasteful

</details>

---

**Problem 5**: A random digit table shows these digits: 15028 39247 10583 72641

Use this table to select a simple random sample of 3 students from a class of 30 students (numbered 01-30). Start at the beginning and read two-digit numbers from left to right.

<details markdown="1">
<summary>Show Solution</summary>

Reading two-digit numbers from left to right:
- 15: **Select student 15**
- 02: **Select student 02**
- 83: Skip (greater than 30)
- 92: Skip (greater than 30)
- 47: Skip (greater than 30)
- 10: **Select student 10**

Sample: **Students 02, 10, and 15**

</details>

---

**Problem 6**: A researcher wants to compare the study habits of athletes and non-athletes at a school of 800 students (200 athletes, 600 non-athletes). She wants a sample of 80 students.

a) If she uses a simple random sample, what might go wrong?
b) Suggest a better sampling approach and explain why it's superior.
c) How many students should she select from each group?

<details markdown="1">
<summary>Show Solution</summary>

a) With SRS, she might get very few athletes by chance. With only 200/800 = 25% athletes in the population, a random sample might have anywhere from 10-30 athletes, making athlete/non-athlete comparisons difficult.

b) **Stratified random sample** — divide into athletes and non-athletes, then SRS from each stratum. This guarantees sufficient representation of both groups and allows for meaningful comparisons.

c) **Proportional allocation**: 25% athletes, 75% non-athletes
- Athletes: \( 80 \times 0.25 = 20 \) students
- Non-athletes: \( 80 \times 0.75 = 60 \) students

(Alternatively, she might oversample athletes if comparison is the primary goal, selecting 40 from each group.)

</details>

---

**Problem 7**: A survey asks: "How many times per week do you exercise for at least 30 minutes?"

Identify two types of response bias that might affect answers to this question.

<details markdown="1">
<summary>Show Solution</summary>

1. **Social desirability bias**: Respondents may overreport exercise because physical fitness is viewed positively. They might exaggerate to appear healthier than they are.

2. **Recall bias**: Respondents may not accurately remember their exercise frequency, especially for activities that weren't scheduled or recorded. They might include activities that didn't actually reach 30 minutes or forget workouts from earlier in the week.

</details>

---

*"Now THAT'S a data point worth collecting!"* Sylvia cheers. *"You've learned how to gather data that actually means something. The foundation is set—now you're ready to build some serious statistical knowledge on top of it!"*

---

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

132. Bias
133. Sources of Bias
134. Census
135. Simple Random Sample
136. Random Number Generator
137. Stratified Random Sample
138. When to Stratify
139. Cluster Sample
140. Systematic Sample
141. Convenience Sample
142. Voluntary Response Sample
143. Undercoverage
144. Nonresponse Bias
145. Response Bias
146. Wording of Questions
147. Designing Surveys
171. Random Digit Table
198. Unbiased Estimator
199. Biased Estimator

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to Statistics](../01-introduction-to-statistics/index.md)
- [Chapter 8: Causation and Study Design](../08-causation-and-study-design/index.md)
- [Chapter 9: Probability Fundamentals](../09-probability-fundamentals/index.md)
