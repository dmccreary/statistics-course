# Quiz: Numerical Summaries

Test your understanding of measures of center, spread, and the five-number summary with these review questions.

---

#### 1. The mean of a dataset represents:

<div class="upper-alpha" markdown>
1. The most frequently occurring value
2. The middle value when data is arranged in order
3. The balance point of the data
4. The difference between the maximum and minimum
</div>

??? question "Show Answer"
    The correct answer is **C**. The mean (average) represents the balance point of the data. If you imagine data values as weights on a seesaw, the mean is where the seesaw balances perfectly. It is calculated by adding all values and dividing by the number of observations.

    **Concept Tested:** Mean

---

#### 2. For the dataset 12, 15, 18, 22, 95, which measure of center is most appropriate?

<div class="upper-alpha" markdown>
1. Mean, because it uses all values
2. Median, because there is an extreme outlier
3. Mode, because it is always the best choice
4. Range, because it shows the spread
</div>

??? question "Show Answer"
    The correct answer is **B**. The median is most appropriate because 95 is an extreme outlier that would pull the mean to an unrepresentative value. The median (18) is resistant to outliers and better represents a "typical" value. The mean (32.4) is heavily influenced by the outlier.

    **Concept Tested:** Resistant Measure

---

#### 3. A dataset has Q1 = 30, median = 45, and Q3 = 60. What is the interquartile range (IQR)?

<div class="upper-alpha" markdown>
1. 15
2. 30
3. 45
4. 90
</div>

??? question "Show Answer"
    The correct answer is **B**. The interquartile range is calculated as IQR = Q3 - Q1 = 60 - 30 = 30. The IQR measures the spread of the middle 50% of the data and is resistant to outliers because it ignores the extreme values at both ends.

    **Concept Tested:** Interquartile Range

---

#### 4. Using the 1.5 x IQR rule, if Q1 = 20 and Q3 = 50, what is the upper fence for identifying outliers?

<div class="upper-alpha" markdown>
1. 65
2. 80
3. 95
4. 125
</div>

??? question "Show Answer"
    The correct answer is **C**. First, calculate IQR = Q3 - Q1 = 50 - 20 = 30. Then, the upper fence = Q3 + 1.5 x IQR = 50 + 1.5(30) = 50 + 45 = 95. Any value above 95 would be considered a potential outlier by this rule.

    **Concept Tested:** Modified Boxplot

---

#### 5. What five values make up the five-number summary?

<div class="upper-alpha" markdown>
1. Mean, median, mode, range, and standard deviation
2. Minimum, Q1, median, Q3, and maximum
3. Q1, Q2, Q3, Q4, and Q5
4. Mean, variance, standard deviation, minimum, and maximum
</div>

??? question "Show Answer"
    The correct answer is **B**. The five-number summary consists of the minimum, first quartile (Q1), median (Q2), third quartile (Q3), and maximum. These five values capture the center (median), spread of the middle half (Q1 and Q3), and full extent of the data.

    **Concept Tested:** Five-Number Summary

---

#### 6. In a right-skewed distribution, how do the mean and median typically compare?

<div class="upper-alpha" markdown>
1. Mean equals the median
2. Mean is less than the median
3. Mean is greater than the median
4. The relationship cannot be determined
</div>

??? question "Show Answer"
    The correct answer is **C**. In a right-skewed distribution, the mean is greater than the median because the mean is pulled toward the long right tail by the high values. The median stays in the middle position and is not affected by how extreme those high values are.

    **Concept Tested:** Comparing Mean and Median

---

#### 7. Standard deviation measures:

<div class="upper-alpha" markdown>
1. The difference between the largest and smallest values
2. The typical distance of data points from the mean
3. The middle value of the dataset
4. The number of outliers in the data
</div>

??? question "Show Answer"
    The correct answer is **B**. Standard deviation measures the typical distance of data points from the mean. It answers the question "On average, how far do values stray from the center?" A larger standard deviation indicates more spread, while a smaller one indicates values cluster tightly around the mean.

    **Concept Tested:** Standard Deviation

---

#### 8. Why do we divide by (n-1) instead of n when calculating sample variance?

<div class="upper-alpha" markdown>
1. To make the calculation easier
2. Because Bessel's correction provides an unbiased estimate of population variance
3. To ensure the variance is always positive
4. It doesn't matter which we use
</div>

??? question "Show Answer"
    The correct answer is **B**. Dividing by (n-1) is called Bessel's correction. When we calculate deviations from the sample mean, the deviations are slightly too small on average because the sample mean minimizes squared deviations. Dividing by (n-1) corrects for this underestimation, providing an unbiased estimate of the population variance.

    **Concept Tested:** Calculating Variance

---

#### 9. When comparing two boxplots side by side, which feature indicates greater variability?

<div class="upper-alpha" markdown>
1. A higher median position
2. A longer box (larger IQR)
3. More outliers plotted
4. A darker color
</div>

??? question "Show Answer"
    The correct answer is **B**. A longer box (larger IQR) indicates greater variability in the middle 50% of the data. When comparing boxplots, look at box length for spread, median position for center, whisker lengths for tail spread, and individual points for outliers.

    **Concept Tested:** Comparing Distributions

---

#### 10. A student scores in the 85th percentile on a standardized test. What does this mean?

<div class="upper-alpha" markdown>
1. The student answered 85% of questions correctly
2. The student scored higher than 85% of test-takers
3. 85 students scored higher than this student
4. The student's score was 85 points
</div>

??? question "Show Answer"
    The correct answer is **B**. Being in the 85th percentile means the student scored higher than 85% of all test-takers. Percentiles describe relative standing compared to others, not the actual score or percentage correct. The 50th percentile equals the median.

    **Concept Tested:** Percentile

---
