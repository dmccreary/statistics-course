# Glossary of Terms

This glossary defines the 300 key concepts covered in the AP Statistics course. Definitions follow ISO 11179 standards for precision, conciseness, distinctiveness, and non-circularity.

#### 68-95-99.7 Rule

A rule stating that for a normal distribution, approximately 68% of observations fall within one standard deviation of the mean, 95% within two, and 99.7% within three.

**Example:** If test scores have a mean of 75 and standard deviation of 10, about 68% of scores fall between 65 and 85.

See also: Empirical Rule, Normal Distribution

#### Addition Rule

A probability rule stating that for any two events A and B, P(A or B) = P(A) + P(B) - P(A and B).

**Example:** The probability of drawing a heart or a face card from a deck uses the addition rule to avoid double-counting the heart face cards.

#### Alternative Hypothesis

A statement that contradicts the null hypothesis and represents the claim the researcher seeks evidence for, typically asserting that a parameter differs from a specified value.

**Example:** In testing whether a coin is biased, the alternative hypothesis might be H_a: p ≠ 0.5.

See also: Null Hypothesis, Hypothesis Test

#### AP Exam Strategies

Techniques for effectively communicating statistical reasoning and earning full credit on the AP Statistics examination, including showing all work and interpreting results in context.

#### Area Under Curve

The region between a density curve and the horizontal axis over a specified interval, representing the probability of observing values within that interval.

**Example:** The area under a normal curve between z = -1 and z = 1 equals approximately 0.68.

#### Assessing Normality

The process of determining whether a dataset follows an approximately normal distribution, typically using graphical methods such as histograms or normal probability plots.

**Example:** Before using normal-based inference procedures, you should check that the normal probability plot is roughly linear.

#### Association

A relationship between two variables in which knowing the value of one variable provides information about the likely value of the other.

**Example:** Height and weight show positive association because taller individuals tend to weigh more.

#### Bar Graph

A graphical display of categorical data using rectangular bars whose heights represent the frequency or relative frequency of each category.

**Example:** A bar graph showing favorite ice cream flavors might have bars of different heights for chocolate, vanilla, and strawberry.

#### Bayes Intuition

An understanding of how prior probability affects the interpretation of new evidence, recognizing that the probability of a condition given a positive test depends on both the test's accuracy and how common the condition is.

**Example:** Even with a 95% accurate test, a positive result for a rare disease (affecting 1% of people) means the person has only about a 16% chance of actually having the disease.

#### Bias

Systematic error in data collection or estimation that causes sample statistics to consistently overestimate or underestimate the population parameter.

**Example:** Surveying only people leaving a gym about exercise habits introduces bias because gym-goers exercise more than the general population.

See also: Unbiased Estimator, Sources of Bias

#### Biased Estimator

A statistic whose expected value does not equal the population parameter it estimates, systematically missing the true value in one direction.

Contrast with: Unbiased Estimator

#### Bimodal Distribution

A distribution with two distinct peaks, often suggesting the data comes from two different underlying populations or processes.

**Example:** Heights of adult humans show bimodal distribution when males and females are combined in one dataset.

#### Binomial Conditions

The four requirements for a binomial setting: fixed number of trials, two possible outcomes per trial, constant probability of success, and independent trials (often remembered as BINS).

#### Binomial Distribution

A probability distribution for the number of successes in a fixed number of independent trials, where each trial has the same probability of success.

**Example:** The number of heads in 10 coin flips follows a binomial distribution with n = 10 and p = 0.5.

#### Binomial Formula

The formula for calculating the probability of exactly k successes in n trials: P(X = k) = C(n,k) × p^k × (1-p)^(n-k).

#### Binomial Mean

The expected value of a binomial distribution, calculated as μ = np, where n is the number of trials and p is the probability of success.

**Example:** In 100 flips of a fair coin, the expected number of heads is 100 × 0.5 = 50.

#### Binomial Probability

The probability of obtaining a specific number of successes in a binomial setting, calculated using the binomial formula.

#### Binomial Setting

A situation involving a fixed number of independent trials, each with two possible outcomes and a constant probability of success.

**Example:** Rolling a die 20 times and counting how many sixes appear is a binomial setting.

#### Binomial Standard Dev

The standard deviation of a binomial distribution, calculated as σ = √(np(1-p)).

#### Blinding

An experimental design technique where participants, researchers, or both are unaware of which treatment each subject receives, used to prevent bias in measurement and behavior.

See also: Single-Blind Experiment, Double-Blind Experiment

#### Boxplot

A graphical display showing the five-number summary of a dataset through a box spanning the quartiles and whiskers extending to the minimum and maximum values.

**Example:** A boxplot of test scores shows the median line inside the box, with the box edges at Q1 and Q3.

See also: Modified Boxplot, Five-Number Summary

#### Calculating Chi-Square

The process of computing the chi-square test statistic by summing (observed - expected)²/expected across all categories or cells.

#### Calculating Conditionals

The process of finding conditional probabilities by restricting attention to outcomes where the condition is satisfied and dividing the joint probability by the probability of the condition.

**Example:** P(A|B) = P(A and B)/P(B), so if P(A and B) = 0.15 and P(B) = 0.4, then P(A|B) = 0.375.

#### Calculating Correlation

The process of computing the correlation coefficient using z-scores of both variables: r = Σ(z_x × z_y)/(n-1).

#### Calculating Expected Value

The process of finding the mean of a random variable by summing each value multiplied by its probability: E(X) = Σ(x × P(x)).

#### Calculating P-Values

The process of determining the probability of obtaining sample results as extreme as those observed, assuming the null hypothesis is true.

**Example:** For a two-sided test with z = 2.1, the p-value equals 2 × P(Z > 2.1) ≈ 0.036.

#### Calculating Residuals

The process of computing residuals by subtracting predicted values from observed values: residual = y - ŷ.

#### Calculating Variance

The process of computing variance as the average of squared deviations from the mean: s² = Σ(x - x̄)²/(n-1).

#### Calculating Z-Scores

The process of standardizing a value by subtracting the mean and dividing by the standard deviation: z = (x - μ)/σ.

**Example:** A test score of 85 with class mean 75 and standard deviation 10 has z-score = (85-75)/10 = 1.0.

#### Categorical Variable

A variable whose values are category names or labels rather than numerical measurements.

**Example:** Eye color, political party affiliation, and blood type are categorical variables.

See also: Quantitative Variable

#### Causation

A relationship in which changes in one variable directly produce changes in another variable through a mechanism or process.

**Example:** Flipping a light switch causes the light to turn on because the switch completes an electrical circuit.

Contrast with: Correlation vs Causation

#### Census

A data collection method that attempts to gather information from every member of a population rather than from a sample.

**Example:** The U.S. Census attempts to count every person living in the United States every ten years.

Contrast with: Sample

#### Center of Distribution

The typical or central value in a dataset, commonly measured by the mean, median, or mode.

See also: Mean, Median, Mode

#### Central Limit Theorem

A theorem stating that the sampling distribution of the sample mean approaches a normal distribution as sample size increases, regardless of the population's shape.

The Central Limit Theorem is the mathematical foundation for most statistical inference procedures, explaining why normal distributions are so important even when populations are not normally distributed.

**Example:** Even if individual incomes are right-skewed, the mean income of random samples of 100 people will be approximately normally distributed.

#### Chi-Square Conclusion

A statement interpreting the results of a chi-square test in context, indicating whether there is sufficient evidence to reject the null hypothesis about the categorical data.

#### Chi-Square Distribution

A probability distribution for the sum of squared standard normal random variables, characterized by degrees of freedom and used in chi-square tests.

**Example:** A chi-square distribution with 5 degrees of freedom has a different shape than one with 10 degrees of freedom.

#### Chi-Square Statistic

A test statistic calculated as the sum of (observed - expected)²/expected across all categories, measuring how different observed counts are from expected counts.

#### Choosing Alpha

The process of selecting a significance level before conducting a hypothesis test, balancing the costs of Type I and Type II errors.

**Example:** Medical research often uses α = 0.01 because false positives (approving ineffective drugs) are particularly costly.

#### Choosing Bin Width

The process of selecting appropriate interval widths for a histogram, balancing the need to see patterns without obscuring them with too much or too little detail.

**Example:** For 100 test scores ranging from 50-100, bin widths of 5 or 10 points typically work well.

#### CLT Conditions

The requirements for applying the Central Limit Theorem: random sampling, independence of observations, and sufficiently large sample size.

#### Cluster Sample

A probability sampling method in which the population is divided into groups (clusters), some clusters are randomly selected, and all members of selected clusters are included in the sample.

**Example:** To survey U.S. high school students, you might randomly select 50 high schools and survey all students at those schools.

Contrast with: Stratified Random Sample

#### Coefficient of Determination

The proportion of variability in the response variable that is explained by the linear relationship with the explanatory variable, equal to the square of the correlation coefficient.

**Example:** An r² of 0.81 means that 81% of the variation in y is explained by the linear relationship with x.

See also: R-Squared Interpretation

#### Combining Random Variables

The process of finding the mean and variance of sums or differences of independent random variables using the rules: μ(X+Y) = μ(X) + μ(Y) and Var(X+Y) = Var(X) + Var(Y).

#### Communicating Results

The practice of presenting statistical findings clearly, including describing methods, stating conclusions in context, and acknowledging limitations.

#### Comparing Distributions

The process of examining two or more distributions side by side, noting similarities and differences in shape, center, spread, and unusual features.

**Example:** Comparing test score distributions between two classes might reveal that one class has higher center but more spread.

#### Comparing Mean and Median

The process of examining the relationship between mean and median to understand distribution shape, where mean > median suggests right skew and mean < median suggests left skew.

#### Comparing Studies

The process of evaluating the relative strengths and limitations of observational studies versus experiments for addressing a research question.

#### Comparison in Experiments

The principle that an experiment should compare treatment groups to a control group to determine the effect of the treatment.

#### Complement of Event

The set of all outcomes in the sample space that are not in a given event, with probability equal to one minus the probability of the event.

**Example:** If P(rain) = 0.3, then P(no rain) = 1 - 0.3 = 0.7.

#### Completely Randomized Design

An experimental design in which all experimental units are randomly assigned to treatments without any blocking or pairing.

#### Conditional Distribution

The distribution of one categorical variable within a specific category of another categorical variable, often expressed as row or column percentages in a two-way table.

**Example:** The conditional distribution of political party among college graduates shows the percentage of graduates in each party.

#### Conditional Probability

The probability of an event occurring given that another event has already occurred, written as P(A|B).

**Example:** P(late|traffic) is the probability of being late given that there is traffic.

#### Conditions for Chi-Square

The requirements for conducting a chi-square test: random sample, independence, and all expected counts of at least 5.

#### Conditions for CI Proportion

The requirements for constructing a confidence interval for a proportion: random sample, independence, and large counts (at least 10 successes and 10 failures).

#### Conditions for Proportion SD

The requirements for using the standard deviation formula for sample proportion: random sampling and sample size less than 10% of the population.

#### Conditions for Regression

The requirements for inference in regression: linear relationship, independence, normal residuals, and equal variance of residuals (often remembered as LINE).

#### Conditions for T-Procedures

The requirements for using t-procedures: random sample, independence, and either normal population or large sample size.

#### Conditions for Z-Test

The requirements for conducting a z-test for proportions: random sample, independence, and large counts (np₀ ≥ 10 and n(1-p₀) ≥ 10).

#### Confidence Interval

A range of plausible values for a population parameter, calculated from sample data and associated with a specified confidence level.

**Example:** A 95% confidence interval for the population proportion might be (0.52, 0.68).

See also: Margin of Error, Confidence Level

#### Confidence Level

The long-run proportion of confidence intervals constructed by a method that would contain the true parameter value, typically 90%, 95%, or 99%.

**Example:** A 95% confidence level means that 95% of all possible samples would produce intervals containing the true parameter.

#### Confounding Variable

A variable that is associated with both the explanatory variable and the response variable, making it impossible to determine which one is responsible for the observed effect.

**Example:** In studying coffee and heart disease, smoking is a confounding variable because it's associated with both coffee consumption and heart disease.

See also: Lurking Variable

#### Continuous Variable

A quantitative variable that can take on any value within a range, typically arising from measurements rather than counts.

**Example:** Height, weight, time, and temperature are continuous variables.

Contrast with: Discrete Variable

#### Control Group

The group of experimental units that does not receive the treatment being tested, serving as a baseline for comparison.

#### Convenience Sample

A non-probability sampling method that selects individuals who are easiest to reach, typically producing biased results.

**Example:** Surveying only your friends about their music preferences is a convenience sample.

#### Correlation Coefficient

A numerical measure of the strength and direction of the linear relationship between two quantitative variables, ranging from -1 to 1.

**Example:** A correlation of r = 0.85 indicates a strong positive linear relationship.

See also: Properties of Correlation

#### Correlation Limitations

The restrictions on interpreting correlation, including that it measures only linear relationships, is sensitive to outliers, and does not imply causation.

#### Correlation vs Causation

The principle that an observed association between variables does not prove that one causes the other, since the relationship might be explained by confounding variables or coincidence.

**Example:** Ice cream sales and drowning deaths are correlated because both increase in summer, not because ice cream causes drowning.

#### Critical Value

A boundary value from a distribution used to determine the margin of error for confidence intervals or the rejection region for hypothesis tests.

**Example:** For a 95% confidence interval, the critical value z* = 1.96.

#### Cumulative Frequency

The running total of frequencies for a variable up to and including each class or value.

**Example:** If 20 students scored below 70 and 15 more scored 70-79, the cumulative frequency at 79 is 35.

#### Data

Pieces of information collected about individuals, events, or objects, serving as the raw material for statistical analysis.

**Example:** Survey responses, experimental measurements, and records from databases are all forms of data.

#### Dataset

An organized collection of data, typically arranged with observations in rows and variables in columns.

**Example:** A spreadsheet with 500 students' names, ages, GPAs, and test scores is a dataset.

#### Degrees of Freedom

A parameter related to sample size that determines the shape of certain distributions, such as t-distributions and chi-square distributions.

**Example:** For a one-sample t-test with n = 25 observations, the degrees of freedom is 24.

#### Density Curve

A smooth curve representing the overall shape of a distribution, where the total area under the curve equals one and areas represent probabilities.

**Example:** The normal distribution is described by a bell-shaped density curve.

#### Dependent Events

Events for which the occurrence of one affects the probability of the other occurring.

**Example:** Drawing cards without replacement creates dependent events because each draw changes the remaining cards.

Contrast with: Independent Events

#### Describing Scatterplots

The process of characterizing a scatterplot by noting its direction, form, strength, and any unusual features.

**Example:** "The scatterplot shows a strong, positive, linear association with one outlier."

#### Designing Simulations

The process of creating a model that uses random events to estimate probabilities for a real-world situation.

**Example:** Using random numbers 1-6 to simulate rolling a die and estimating the probability of a sum of 7 with two dice.

#### Designing Surveys

The process of developing a valid data collection instrument, including sampling method, question wording, and administration procedure.

#### Difference of RVs

The random variable formed by subtracting one random variable from another, with mean equal to the difference of means.

#### Direction of Association

The nature of the relationship between two variables, classified as positive (both increase together) or negative (one increases as the other decreases).

#### Discrete Random Variable

A random variable that can take on only a countable number of distinct values, typically whole numbers.

**Example:** The number of heads in 10 coin flips is a discrete random variable.

#### Discrete Variable

A quantitative variable that can take only specific, separated values, usually arising from counting.

**Example:** Number of siblings, number of pets, and number of courses are discrete variables.

Contrast with: Continuous Variable

#### Disjoint Events

Events that cannot occur at the same time, also called mutually exclusive events.

**Example:** Rolling a 3 and rolling a 5 on a single die are disjoint events.

#### Distribution

The pattern of values that a variable takes on, including what values are possible and how often each occurs.

**Example:** The distribution of heights in a class describes which heights appear and how common each is.

#### Dotplot

A graphical display of quantitative data in which each observation is represented by a dot above a number line, with dots stacked vertically when values repeat.

**Example:** A dotplot of quiz scores shows one dot per student at their score, stacked when scores are identical.

#### Double-Blind Experiment

An experiment in which neither the participants nor the researchers who interact with them know which treatment each participant is receiving.

See also: Single-Blind Experiment, Blinding

#### Effect Size

A numerical measure of the magnitude of a phenomenon or the practical importance of a statistical result, independent of sample size.

**Example:** Cohen's d measures the difference between means in terms of standard deviations.

See also: Practical Significance

#### Empirical Rule

A rule stating that for approximately normal distributions, 68% of data falls within 1 standard deviation of the mean, 95% within 2, and 99.7% within 3.

See also: 68-95-99.7 Rule

#### Equal Variance Condition

The requirement in regression that the spread of residuals around the regression line is roughly constant across all values of the explanatory variable.

#### Error Tradeoffs

The inverse relationship between Type I and Type II error rates, where decreasing one typically increases the other unless sample size increases.

#### Event

A subset of outcomes from a sample space, often described by a characteristic or condition.

**Example:** When rolling two dice, "the sum is 7" is an event consisting of six outcomes: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1).

#### Expected Counts

The counts predicted for each cell of a table under the null hypothesis, typically calculated as (row total × column total) / grand total.

#### Expected Value

The long-run average value of a random variable over many repetitions, calculated as the weighted average of all possible values.

**Example:** The expected value of a fair die is (1+2+3+4+5+6)/6 = 3.5.

#### Experiment

A study that deliberately imposes treatments on subjects to observe their responses, with the researcher controlling which subjects receive which treatment.

**Example:** Randomly assigning patients to receive a new drug or placebo and measuring their recovery is an experiment.

Contrast with: Observational Study

#### Experimental Units

The individual objects or subjects to which treatments are applied in an experiment.

**Example:** In a study testing fertilizer on plants, each plant is an experimental unit.

#### Explanatory Variable

The variable thought to explain or influence changes in another variable, typically placed on the x-axis in a scatterplot.

**Example:** In studying how study time affects test scores, study time is the explanatory variable.

See also: Response Variable

#### Extrapolation Dangers

The risk of making predictions outside the range of observed data, which may be inaccurate because the relationship might not continue beyond the data.

**Example:** Using a linear model fit to ages 20-60 to predict income at age 100 is unreliable extrapolation.

#### Factor

A variable whose different values or levels are being studied in an experiment for their effect on the response variable.

**Example:** In testing fertilizer effects, fertilizer type is a factor with levels like "Brand A" and "Brand B."

#### Factors Affecting Power

The elements that influence the probability of detecting a true effect, including sample size, significance level, effect size, and variability.

#### Finding Normal Probs

The process of calculating probabilities from a normal distribution using z-scores and normal tables or technology.

#### Five-Number Summary

A description of a distribution consisting of the minimum, first quartile, median, third quartile, and maximum values.

**Example:** Min = 55, Q1 = 65, Median = 75, Q3 = 85, Max = 100 for a set of exam scores.

#### Form of Association

The pattern or shape of the relationship between two variables, such as linear, curved, or no clear form.

#### Four-Step Process

A structured approach to statistical problems: State (hypotheses), Plan (method), Do (calculations), Conclude (interpretation).

#### Frequency Table

A table that displays the count of observations in each category or class interval.

**Example:** A frequency table for letter grades shows how many students earned each grade.

#### General Addition Rule

A formula for finding the probability of either of two events occurring: P(A or B) = P(A) + P(B) - P(A and B).

#### General Multiplication Rule

A formula for finding the probability of two events both occurring: P(A and B) = P(A) × P(B|A).

#### Generalizability

The extent to which conclusions from a sample can be applied to a larger population, dependent on sampling methods and study design.

#### Geometric Distribution

A probability distribution for the number of trials needed to achieve the first success in independent trials with constant probability of success.

**Example:** The number of coin flips until the first heads follows a geometric distribution.

#### Geometric Mean

The expected value of a geometric random variable, calculated as μ = 1/p where p is the probability of success.

#### Geometric Probability

The probability of obtaining the first success on trial k in a geometric setting: P(X = k) = (1-p)^(k-1) × p.

#### Geometric Setting

A situation involving repeated independent trials with constant probability of success, where the variable of interest is the number of trials until the first success.

#### GOF Conclusion

A statement interpreting the results of a chi-square goodness-of-fit test, indicating whether the observed distribution differs significantly from the expected distribution.

#### GOF Hypotheses

The null and alternative hypotheses for a goodness-of-fit test, where H₀ states that the observed distribution matches the expected proportions.

#### Goodness-of-Fit Test

A chi-square test that determines whether observed frequencies for a categorical variable match expected frequencies from a specified distribution.

**Example:** Testing whether a die is fair by comparing observed counts of each face to the expected count of n/6 for each.

#### Histogram

A graphical display of quantitative data using adjacent bars whose heights represent frequencies or relative frequencies for each interval.

**Example:** A histogram of test scores groups scores into intervals like 60-69, 70-79, etc., with bar heights showing counts.

#### Homogeneity Setup

The arrangement of data and hypotheses for a chi-square test comparing the distribution of a categorical variable across two or more independent populations.

#### Hypothesis Test

A formal statistical procedure for using sample data to evaluate a claim about a population parameter.

**Example:** Testing whether a coin is fair by flipping it 100 times and examining if the proportion of heads differs significantly from 0.5.

#### Identifying Confounding

The process of determining which variables might be confounded with the explanatory variable by checking if they are associated with both the explanatory and response variables.

#### Identifying Outliers

The process of detecting observations that lie unusually far from the main pattern of data, often using the 1.5 × IQR rule or visual inspection.

**Example:** Using the 1.5 × IQR rule: values below Q1 - 1.5(IQR) or above Q3 + 1.5(IQR) are outliers.

#### Independence Condition

The requirement that knowing one observation's value does not affect the probability of another observation's value, often verified by the 10% rule.

#### Independent Events

Events for which the occurrence of one does not affect the probability of the other occurring.

**Example:** Flipping a coin and rolling a die are independent events.

Contrast with: Dependent Events

#### Independence Setup

The arrangement of data and hypotheses for a chi-square test of independence, examining whether two categorical variables are associated in a single population.

#### Inference for Slope

Statistical procedures for constructing confidence intervals and conducting hypothesis tests about the slope of a population regression line.

#### Influential Point

An observation that, if removed, would substantially change the position of the regression line, often having high leverage.

**Example:** A point far from the mean of x with an unusual y-value can dramatically change the slope.

See also: Leverage

#### Interpreting CI

The process of correctly explaining what a confidence interval tells us about the population parameter, emphasizing that the parameter is fixed and the interval varies from sample to sample.

**Example:** "We are 95% confident that the true population proportion is between 0.45 and 0.55."

#### Interpreting P-Values

The process of correctly explaining what a p-value measures: the probability of obtaining sample results as extreme as those observed if the null hypothesis were true.

#### Interpreting Residuals

The process of using residuals to assess model fit, where patterns in residuals suggest the model may be inappropriate.

#### Interpreting Z-Scores

The process of explaining what a z-score represents: how many standard deviations an observation is from the mean.

**Example:** A z-score of -2.0 means the observation is 2 standard deviations below the mean.

#### Interquartile Range

The difference between the third and first quartiles (IQR = Q3 - Q1), measuring the spread of the middle 50% of data.

**Example:** If Q1 = 60 and Q3 = 80, then IQR = 20.

#### Interval Estimate

An estimate of a population parameter that specifies a range of plausible values rather than a single value.

See also: Confidence Interval

Contrast with: Point Estimate

#### Inverse Normal Calcs

The process of finding the value corresponding to a given percentile or probability in a normal distribution.

**Example:** Finding the z-score that cuts off the top 5% of a normal distribution (z = 1.645).

#### Law of Large Numbers

A theorem stating that as sample size increases, the sample mean converges to the population mean.

**Example:** The proportion of heads approaches 0.5 as the number of coin flips increases.

#### Least Squares Regression

A method for finding the line that minimizes the sum of squared vertical distances from data points to the line.

**Example:** The least squares line minimizes Σ(y - ŷ)², making it the "best fit" in this sense.

#### Levels of a Factor

The different values or categories of a factor being studied in an experiment.

**Example:** If the factor is fertilizer type, the levels might be "Brand A," "Brand B," and "None."

#### Leverage

A measure of how far an observation's x-value is from the mean of x, indicating potential influence on the regression line.

#### Linear Form

A scatterplot pattern in which points cluster around a straight line.

#### Linear Transformation

A transformation of the form y = a + bx applied to a random variable, which changes the mean to a + bμ and the standard deviation to |b|σ.

**Example:** Converting temperatures from Celsius to Fahrenheit using F = 32 + 1.8C is a linear transformation.

#### Linearity Condition

The requirement that the relationship between variables is linear, typically assessed using residual plots.

#### Lurking Variable

A variable not included in the analysis that affects the relationship between the variables being studied.

**Example:** Age is a lurking variable in the relationship between shoe size and reading ability in children—age affects both.

See also: Confounding Variable

#### Making Conclusions

The process of stating the decision from a hypothesis test in context, using appropriate language like "reject" or "fail to reject" the null hypothesis.

**Example:** "At the 0.05 significance level, we reject H₀. There is sufficient evidence that the true proportion differs from 0.6."

#### Making Predictions

The process of using a regression equation to estimate the response variable for a given value of the explanatory variable.

#### Margin of Error

Half the width of a confidence interval, representing the maximum expected difference between the sample statistic and the population parameter.

**Example:** A poll with margin of error ±3% means the true proportion is likely within 3 percentage points of the sample proportion.

#### Marginal Distribution

The distribution of one variable in a two-way table, found in the row totals or column totals, ignoring the other variable.

#### Matched Pairs Design

An experimental design in which subjects are grouped into pairs based on similar characteristics, and within each pair, one subject is randomly assigned to each treatment.

**Example:** Matching twins and randomly assigning one to treatment and one to control.

See also: Paired T-Test

#### Mean

The arithmetic average of a dataset, calculated by summing all values and dividing by the number of values.

**Example:** For values 5, 7, 8, 10, 12, the mean is (5+7+8+10+12)/5 = 8.4.

See also: Median, Mode

#### Mean of Sample Mean

The center of the sampling distribution of sample means, which equals the population mean: μ_x̄ = μ.

#### Mean of Sample Proportion

The center of the sampling distribution of sample proportions, which equals the population proportion: μ_p̂ = p.

#### Median

The middle value when observations are arranged in order, or the average of the two middle values if the count is even.

**Example:** For values 5, 7, 8, 10, 12, the median is 8.

#### Mode

The value that occurs most frequently in a dataset.

**Example:** In the dataset {2, 3, 3, 3, 5, 7}, the mode is 3.

#### Modified Boxplot

A boxplot that displays outliers as individual points beyond the whiskers, with whiskers extending only to the most extreme non-outlier values.

#### Multiplication Rule

A rule for finding the probability that two events both occur: P(A and B) = P(A) × P(B|A), which simplifies to P(A) × P(B) for independent events.

#### Mutually Exclusive Events

Events that cannot occur simultaneously, so their intersection is empty.

**Example:** Drawing a heart and drawing a club from the same card are mutually exclusive.

See also: Disjoint Events

#### Negative Association

A relationship between two quantitative variables in which higher values of one variable tend to occur with lower values of the other.

**Example:** The price of a used car and its mileage typically show negative association.

#### Nonlinear Form

A scatterplot pattern in which points follow a curved path rather than a straight line.

**Example:** The relationship between age and maximum heart rate follows a curve, not a straight line.

#### Nonresponse Bias

Bias that occurs when individuals selected for a sample do not respond, and those who don't respond differ systematically from those who do.

**Example:** Busy people are less likely to complete long surveys, potentially underrepresenting their views.

#### Normal Approximation

The use of a normal distribution to approximate probabilities for a sampling distribution when conditions are met.

**Example:** Using normal probabilities to find the chance that a sample proportion exceeds 0.6.

#### Normal Distribution

A continuous probability distribution characterized by a symmetric, bell-shaped density curve, fully described by its mean and standard deviation.

**Example:** SAT scores are approximately normally distributed with mean 500 and standard deviation 100.

#### Normal Probability Plot

A graph that plots ordered data values against their expected z-scores, used to assess whether data follow a normal distribution.

**Example:** If points on a normal probability plot fall along a straight line, the data are approximately normal.

#### Normal Table

A table showing cumulative probabilities for the standard normal distribution, used to convert between z-scores and probabilities.

#### Normality of Residuals

The condition for regression inference that requires residuals to be approximately normally distributed.

#### Null Hypothesis

A statement about a population parameter that assumes no effect, no difference, or no change, typically containing an equality.

**Example:** H₀: p = 0.5 states that the population proportion equals 0.5.

See also: Alternative Hypothesis

#### Observation

A single unit in a dataset, containing the values of all variables measured for one individual, object, or event.

**Example:** One student's record with their name, age, GPA, and test score is one observation.

#### Observational Study

A study in which researchers observe and measure variables without attempting to influence the responses or impose treatments.

**Example:** Surveying people about their exercise habits and comparing health outcomes is an observational study.

Contrast with: Experiment

#### Observed Counts

The actual frequencies recorded in each category or cell from sample data.

#### One-Sample T-Interval

A confidence interval for a population mean based on sample data, using the t-distribution when the population standard deviation is unknown.

#### One-Sample T-Test

A hypothesis test for a population mean using sample data and the t-distribution.

#### One-Sided Test

A hypothesis test in which the alternative hypothesis specifies a direction (greater than or less than), focusing evidence in one tail of the distribution.

**Example:** H_a: p > 0.5 is a one-sided alternative testing whether the proportion exceeds 0.5.

Contrast with: Two-Sided Test

#### Outlier

An observation that lies notably far from the main pattern of data, often identified as a value more than 1.5 × IQR beyond the quartiles.

**Example:** In a dataset of household incomes, a billionaire's income would be an outlier.

#### Outliers in Regression

Observations with large residuals that don't fit the overall linear pattern, which may indicate unusual cases or problems with the model.

#### P-Value

The probability of obtaining sample results at least as extreme as those observed, assuming the null hypothesis is true.

**Example:** A p-value of 0.03 means there's a 3% chance of seeing data this extreme if H₀ is true.

#### Paired Data

Data consisting of two measurements on the same individual or matched individuals, analyzed by examining differences.

**Example:** Before-and-after measurements of blood pressure for the same patients.

#### Paired T-Test

A hypothesis test that analyzes paired data by computing differences and performing a one-sample t-test on those differences.

#### Parameter

A numerical value that describes a characteristic of a population, typically unknown and estimated from sample data.

**Example:** The true proportion of all U.S. adults who support a policy is a parameter.

Contrast with: Statistic

#### Parameters of Normal

The mean (μ) and standard deviation (σ) that completely specify a normal distribution.

#### Percentile

A value below which a given percentage of observations falls.

**Example:** Scoring at the 90th percentile means you scored higher than 90% of test-takers.

#### Pie Chart

A circular graphical display of categorical data in which each category is represented by a sector proportional to its frequency or percentage.

#### Placebo

An inactive treatment that resembles the real treatment, used in experiments to control for the psychological effects of receiving treatment.

**Example:** A sugar pill given to control group patients in a drug trial.

#### Placebo Effect

The phenomenon in which patients improve simply because they believe they are receiving treatment, even when the treatment is inactive.

#### Point Estimate

A single value calculated from sample data that serves as a best guess for an unknown population parameter.

**Example:** The sample mean x̄ = 42.7 is a point estimate for the population mean μ.

Contrast with: Interval Estimate

#### Pooled Proportion

A weighted average of two sample proportions, used when conducting a two-proportion z-test under the assumption that the true proportions are equal.

**Example:** p̂_pooled = (x₁ + x₂)/(n₁ + n₂).

#### Pooled vs Unpooled

The choice between using a pooled or unpooled estimate of variance in two-sample procedures, with pooling appropriate when population variances can be assumed equal.

#### Population

The entire group of individuals or objects about which we want to draw conclusions.

**Example:** All currently enrolled high school students in the United States form a population.

Contrast with: Sample

#### Positive Association

A relationship between two quantitative variables in which higher values of one variable tend to occur with higher values of the other.

**Example:** Height and weight typically show positive association.

#### Power of a Test

The probability of correctly rejecting a false null hypothesis, equal to 1 - β where β is the Type II error rate.

**Example:** A power of 0.80 means the test has an 80% chance of detecting a real effect.

#### Practical Significance

The real-world importance or meaningfulness of a statistical result, distinct from and not guaranteed by statistical significance.

**Example:** A drug that produces statistically significant weight loss of 0.5 pounds may lack practical significance for health outcomes.

See also: Statistical Significance

#### Probability

A number between 0 and 1 that measures the likelihood of an event occurring.

**Example:** The probability of rolling a 6 on a fair die is 1/6 ≈ 0.167.

#### Probability Distribution

A function that gives the probability for each possible value of a random variable, with all probabilities summing (or integrating) to 1.

**Example:** For a fair die, P(X = k) = 1/6 for k = 1, 2, 3, 4, 5, 6.

#### Probability Rules

The fundamental laws governing probabilities, including that probabilities are between 0 and 1, complementary events sum to 1, and the addition and multiplication rules.

#### Properties of Correlation

The characteristics of the correlation coefficient: unitless, between -1 and 1, symmetric in x and y, unchanged by linear transformations, and measuring only linear association.

#### Quantitative Variable

A variable whose values are numerical measurements or counts on which arithmetic operations make sense.

**Example:** Height, income, number of children, and temperature are quantitative variables.

See also: Categorical Variable

#### Quartiles

The values that divide an ordered dataset into four equal parts: Q1 (25th percentile), Q2 (median/50th percentile), and Q3 (75th percentile).

**Example:** Q1 is the median of the lower half of the data; Q3 is the median of the upper half.

#### R-Squared Interpretation

The explanation of r² as the proportion of variation in the response variable explained by the regression on the explanatory variable.

**Example:** "64% of the variation in test scores can be explained by the linear relationship with study time."

#### Random Assignment

The process of using a chance mechanism to assign experimental units to treatment groups, balancing potential confounding variables.

**Example:** Flipping a coin to decide which patients receive the new drug versus the placebo.

#### Random Digit Table

A table of random digits (0-9) used to select random samples or make random assignments.

#### Random Number Generator

A device or algorithm that produces sequences of numbers that lack any pattern, used for random sampling and random assignment.

#### Random Phenomenon

A process or situation in which individual outcomes are uncertain, but there is a regular distribution of outcomes over many repetitions.

**Example:** Flipping a coin is a random phenomenon—each flip is unpredictable, but heads occurs about half the time over many flips.

#### Random Variable

A variable whose numerical value is determined by the outcome of a random phenomenon.

**Example:** The number of heads in 10 coin flips is a random variable.

#### Randomized Block Design

An experimental design in which experimental units are first grouped into blocks based on a characteristic, and then randomly assigned to treatments within each block.

**Example:** Blocking students by grade level before randomly assigning to teaching methods within each grade.

#### Range

The difference between the maximum and minimum values in a dataset, measuring the total spread.

**Example:** For test scores 55, 67, 72, 88, 95, the range is 95 - 55 = 40.

#### Regression Conclusion

A statement interpreting the results of regression inference in context, including confidence intervals for slope or conclusions from hypothesis tests.

#### Regression Equation

The mathematical formula ŷ = a + bx that describes the least squares regression line, where a is the y-intercept and b is the slope.

#### Regression Line

The line that best fits a set of bivariate data by minimizing the sum of squared residuals.

#### Regression Model

A statistical model that describes the relationship between an explanatory variable and a response variable, including the deterministic component and random error.

#### Relative Frequency

The proportion or percentage of observations in a category, calculated by dividing the frequency by the total count.

**Example:** If 15 of 50 students chose pizza, the relative frequency is 15/50 = 0.30 or 30%.

#### Replication

The principle of applying each treatment to multiple experimental units to reduce the influence of chance variation.

#### Residual

The difference between an observed value and the value predicted by a model: residual = y - ŷ.

**Example:** If the predicted score is 82 and the actual score is 85, the residual is +3.

#### Residual Plot

A scatterplot of residuals against the explanatory variable or predicted values, used to assess whether a linear model is appropriate.

#### Resistant Measure

A statistical measure that is not strongly affected by outliers or extreme values.

**Example:** The median is resistant to outliers; the mean is not.

#### Response Bias

Systematic error in survey responses caused by factors that cause participants to give inaccurate answers, such as social desirability or poor recall.

**Example:** People often underreport alcohol consumption and overreport exercise.

#### Response Variable

The variable that measures the outcome of interest in a study, potentially influenced by the explanatory variable.

**Example:** In studying how study time affects grades, grade is the response variable.

See also: Explanatory Variable

#### Robustness

The property of a statistical procedure that produces valid results even when some assumptions are not perfectly met.

**Example:** The t-test is robust to moderate departures from normality when sample sizes are large.

#### Sample

A subset of a population that is actually observed or measured.

**Example:** A random sample of 500 voters used to estimate support for a candidate.

Contrast with: Population

#### Sample Mean

The arithmetic average of values in a sample, used as an estimate of the population mean.

**Example:** If a sample has values 4, 6, 8, 10, the sample mean is x̄ = 7.

#### Sample Proportion

The fraction of sample members with a certain characteristic, calculated as the number of successes divided by the sample size.

**Example:** If 35 of 100 surveyed voters support a candidate, p̂ = 0.35.

#### Sample Size for CI

The number of observations needed to achieve a desired margin of error at a specified confidence level.

**Example:** To estimate a proportion within ±3% at 95% confidence, you need about 1,067 people.

#### Sample Size Impact

The effect that sample size has on precision of estimates, power of tests, and ability to detect small effects.

#### Sample Space

The set of all possible outcomes of a random phenomenon.

**Example:** The sample space for rolling a die is {1, 2, 3, 4, 5, 6}.

#### Sampling Dist of Mean

The probability distribution of sample means from all possible samples of a given size from a population.

#### Sampling Dist of Proportion

The probability distribution of sample proportions from all possible samples of a given size from a population.

#### Sampling Distribution

The distribution of a statistic calculated from all possible samples of a given size from a population.

**Example:** The sampling distribution of the sample mean shows how sample means vary from sample to sample.

#### Sampling Variability

The natural variation in sample statistics from one sample to another, arising from the random selection of individuals.

**Example:** Two random samples of 100 people will likely have slightly different sample means.

#### Scatterplot

A graphical display of bivariate quantitative data, with points plotted at coordinates representing pairs of values.

**Example:** Plotting students' study hours (x) against test scores (y) creates a scatterplot.

#### SD of Sample Mean

The standard deviation of the sampling distribution of sample means: σ_x̄ = σ/√n.

#### SD of Sample Proportion

The standard deviation of the sampling distribution of sample proportions: σ_p̂ = √(p(1-p)/n).

#### Shape of Distribution

The overall form of a distribution, described in terms of symmetry, skewness, and number of modes.

See also: Symmetric Distribution, Skewed Left, Skewed Right

#### Significance Level

The probability threshold (α) used to decide when to reject the null hypothesis, typically set at 0.05, 0.01, or 0.10.

**Example:** At significance level α = 0.05, we reject H₀ if p-value < 0.05.

#### Simple Random Sample

A sample selected so that every possible sample of that size has an equal probability of being chosen, and every individual has an equal probability of selection.

**Example:** Putting all names in a hat and drawing 50 names gives a simple random sample.

#### Simpson's Paradox

A phenomenon in which a trend that appears in several groups of data reverses or disappears when the groups are combined.

**Example:** Hospital A may have higher overall survival rates than Hospital B, yet Hospital B has higher survival rates for both easy and difficult cases separately.

#### Simulation

The use of random numbers or random processes to model a real-world situation and estimate probabilities.

**Example:** Simulating 10,000 coin flips to estimate the probability of getting 60 or more heads in 100 flips.

#### Single-Blind Experiment

An experiment in which either the participants or the researchers (but not both) are unaware of which treatment each participant receives.

See also: Double-Blind Experiment

#### Skewed Left

A distribution shape in which the tail on the left side is longer than the tail on the right, with the bulk of values on the right.

**Example:** Test scores on an easy exam are often skewed left (most students score high).

#### Skewed Right

A distribution shape in which the tail on the right side is longer than the tail on the left, with the bulk of values on the left.

**Example:** Income distributions are typically skewed right (most people earn moderate amounts, few earn extremely high).

#### Slope Interpretation

The explanation of the slope as the predicted change in y for each one-unit increase in x.

**Example:** "For each additional hour of study time, the predicted test score increases by 5 points."

#### Slope Parameter

The true slope of the population regression line (β), estimated by the sample slope (b).

#### Sources of Bias

The various ways systematic error can enter data collection, including undercoverage, nonresponse, response bias, and question wording.

#### Spread of Distribution

A measure of how variable the data are, commonly quantified by range, interquartile range, or standard deviation.

#### Standard Deviation

A measure of spread that indicates the typical distance of observations from the mean.

**Example:** A standard deviation of 10 means values typically differ from the mean by about 10 units.

#### Standard Deviation of RV

The measure of spread for a random variable, calculated as the square root of its variance.

#### Standard Error

The standard deviation of a sampling distribution, measuring how much a sample statistic typically varies from sample to sample.

**Example:** The standard error of the mean is σ/√n.

#### Standard Error of Slope

The estimated standard deviation of the sampling distribution of the slope, used in regression inference.

#### Standard Normal Curve

The normal distribution with mean 0 and standard deviation 1, used as a reference for calculating probabilities.

#### Standardization

The process of converting data values to z-scores by subtracting the mean and dividing by the standard deviation.

#### Stat vs Practical Sig

The distinction between detecting any effect (statistical significance) and detecting an effect large enough to matter (practical significance).

**Example:** A weight-loss drug might produce statistically significant but practically meaningless weight loss of 0.2 pounds.

#### Statistic

A numerical value calculated from sample data that describes a characteristic of the sample.

**Example:** The sample mean x̄ = 74.3 calculated from test scores is a statistic.

Contrast with: Parameter

#### Statistical Inference

The process of using sample data to draw conclusions about population parameters.

**Example:** Using a sample proportion to construct a confidence interval for the population proportion.

#### Statistical Report Writing

The practice of presenting complete statistical analyses with context, methods, results, and conclusions in clear language.

#### Statistical Significance

The conclusion that an observed result is unlikely to have occurred by chance alone, typically when p-value < α.

**Example:** Results with p-value = 0.02 are statistically significant at the 0.05 level.

#### Statistics

The science of collecting, organizing, analyzing, and interpreting data to make decisions or draw conclusions.

#### Stemplot

A graphical display that organizes quantitative data by separating each value into a stem (leading digits) and leaf (trailing digit), preserving the original values.

**Example:** For the value 73, the stem is 7 and the leaf is 3.

#### Stratified Random Sample

A probability sampling method in which the population is divided into non-overlapping groups (strata) and a simple random sample is taken from each stratum.

**Example:** Sampling students by grade level, taking 25 random freshmen, 25 sophomores, etc.

Contrast with: Cluster Sample

#### Strength of Association

The degree to which two variables are related, ranging from weak (points scattered) to strong (points tightly clustered around a line or curve).

#### Study Limitations

The constraints and weaknesses of a study that affect the interpretation and generalizability of its conclusions.

#### Subjects

The human experimental units in a study, typically called subjects when human and experimental units when not.

#### Sum of Random Variables

A new random variable created by adding the values of two or more random variables, with mean equal to the sum of means.

#### Symmetric Distribution

A distribution in which the left side is approximately a mirror image of the right side when folded at the center.

**Example:** The normal distribution is symmetric around its mean.

#### Systematic Sample

A sampling method that selects individuals at regular intervals from an ordered list, starting from a random point.

**Example:** Starting at person 7, selecting every 10th person: 7, 17, 27, 37, ...

#### T Critical Values

Values from the t-distribution used to construct confidence intervals or determine rejection regions, dependent on degrees of freedom and confidence level.

#### T-Distribution

A probability distribution similar to the normal but with heavier tails, used when the population standard deviation is unknown and must be estimated from data.

#### T-Interval for Slope

A confidence interval for the population slope in regression, based on the t-distribution.

#### T-Test for Slope

A hypothesis test to determine whether the population slope differs from zero, using the t-distribution.

#### T vs Z Distribution

The comparison between t and normal distributions, noting that t-distributions have heavier tails but approach the normal as degrees of freedom increase.

**Example:** With 30 or more degrees of freedom, the t-distribution is nearly identical to the standard normal.

#### Technology for Normal

The use of calculators or software to find normal probabilities and percentiles instead of using printed tables.

#### Test for Homogeneity

A chi-square test that determines whether the distribution of a categorical variable is the same across several populations.

#### Test for Independence

A chi-square test that determines whether two categorical variables are associated in a single population.

#### Test for One Proportion

A z-test to determine whether a population proportion equals a specified value.

#### Test for Two Proportions

A z-test to determine whether two population proportions are equal, using a pooled proportion in the standard error.

#### Test Statistic

A numerical summary of sample data used to measure how far the sample result is from what would be expected under the null hypothesis.

**Example:** The z-statistic z = (p̂ - p₀)/SE measures how many standard errors the sample proportion is from the hypothesized value.

#### Treatment

A specific condition or intervention applied to experimental units in an experiment.

**Example:** In a drug study, the treatment might be 200mg of the new medication daily.

#### Tree Diagram

A visual tool showing all possible outcomes of a sequence of events, with branches representing outcomes and probabilities at each stage.

**Example:** A tree diagram for flipping a coin twice shows H and T branches from the first flip, each splitting into H and T for the second flip.

#### Two-Sample T-Interval

A confidence interval for the difference between two population means, based on independent samples.

#### Two-Sample T-Test

A hypothesis test comparing two population means using data from independent samples.

#### Two-Sided Test

A hypothesis test in which the alternative hypothesis allows for deviation in either direction from the null value.

**Example:** H_a: p ≠ 0.5 is a two-sided alternative.

Contrast with: One-Sided Test

#### Two-Way Table

A table that displays the frequencies for two categorical variables, with rows for one variable and columns for the other.

**Example:** A table showing counts of students by grade level (rows) and favorite subject (columns).

#### Type I Error

The error of rejecting a true null hypothesis, also called a false positive.

**Example:** Concluding a drug works when it actually doesn't is a Type I error.

See also: Type II Error

#### Type II Error

The error of failing to reject a false null hypothesis, also called a false negative.

**Example:** Concluding a drug doesn't work when it actually does is a Type II error.

See also: Type I Error

#### Unbiased Estimator

A statistic whose expected value equals the population parameter it estimates.

**Example:** The sample mean x̄ is an unbiased estimator of the population mean μ.

Contrast with: Biased Estimator

#### Undercoverage

Bias that occurs when some members of the population have no chance of being included in the sample.

**Example:** Phone surveys miss people without phones, causing undercoverage of that population segment.

#### Uniform Distribution

A distribution in which all values or intervals are equally likely.

**Example:** Rolling a fair die produces a uniform distribution over {1, 2, 3, 4, 5, 6}.

#### Unimodal Distribution

A distribution with a single clear peak.

**Example:** Heights of adult males typically form a unimodal distribution centered around 5'10".

#### Using Tree Diagrams

The process of reading probabilities from tree diagrams by multiplying along branches to find joint probabilities and adding across branches to find total probabilities.

**Example:** P(Disease and Positive Test) is found by multiplying P(Disease) × P(Positive|Disease) along that branch.

#### Using Venn Diagrams

The process of solving probability problems by representing events as overlapping circles and finding probabilities from the regions.

#### Valid Distribution

A probability distribution that satisfies the requirements that all probabilities are between 0 and 1, and the sum of all probabilities equals 1.

#### Variable

Any characteristic that can take on different values from one individual or observation to another.

**Example:** Height, favorite color, and income are variables because they vary across people.

#### Variance

A measure of spread calculated as the average of squared deviations from the mean.

**Example:** Variance is the square of the standard deviation: if SD = 5, then variance = 25.

#### Variance of Random Variable

The expected value of the squared deviation from the mean: Var(X) = E[(X - μ)²].

#### Venn Diagram

A diagram using overlapping circles to represent events and their relationships, helpful for visualizing probability concepts.

#### Voluntary Response Sample

A non-probability sampling method in which individuals self-select to participate, typically producing biased results because those with strong opinions are more likely to respond.

**Example:** Online polls where people choose to click and vote are voluntary response samples.

#### When to Pair

Guidelines for determining when a paired design is appropriate, typically when subjects can be matched on important characteristics or measured before and after treatment.

#### When to Stratify

Guidelines for using stratified sampling, typically when the population has distinct subgroups that may differ on the variable of interest.

#### Why Randomize

The rationale for using random assignment in experiments: to balance potential confounding variables across treatment groups, ensuring any observed differences are due to the treatment.

#### Wording of Questions

The practice of writing clear, neutral survey questions that avoid leading language, loaded words, double-barreled questions, and confusing phrasing.

**Example:** "Do you support increased spending on education?" is better than "Do you think we should waste more money on failing schools?"

#### Writing Hypotheses

The process of correctly formulating null and alternative hypotheses using population parameters, with equality in H₀ and inequality in H_a.

**Example:** H₀: μ = 100 and H_a: μ ≠ 100 (two-sided) or H_a: μ > 100 (one-sided right).

#### Y-Intercept Interpretation

The explanation of the y-intercept as the predicted value of y when x equals zero, with attention to whether x = 0 is meaningful in context.

**Example:** "When study time is 0 hours, the predicted test score is 45 points."

#### Z Critical Values

Values from the standard normal distribution used to construct confidence intervals, such as z* = 1.96 for 95% confidence.

#### Z-Score

A standardized value that indicates how many standard deviations an observation is from the mean: z = (x - μ)/σ.

**Example:** A test score with z = 1.5 is 1.5 standard deviations above the mean.
