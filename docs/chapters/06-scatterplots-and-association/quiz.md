# Quiz: Scatterplots and Association

Test your understanding of scatterplots, correlation, and association with these review questions.

---

#### 1. In a scatterplot investigating whether hours of exercise per week predicts resting heart rate, which variable should be placed on the x-axis?

<div class="upper-alpha" markdown>
1. Resting heart rate, because it's the response variable
2. Hours of exercise, because it's the explanatory variable
3. Either variable, because correlation is symmetric
4. Whichever variable has larger values
</div>

??? question "Show Answer"
    The correct answer is **B**. In a scatterplot, the explanatory (independent) variable goes on the x-axis and the response (dependent) variable goes on the y-axis. Since we're investigating whether exercise predicts heart rate, exercise is the explanatory variable. While correlation itself is symmetric, proper scatterplot construction follows this convention.

    **Concept Tested:** Scatterplot Construction

---

#### 2. A scatterplot shows points that slope downward from left to right with moderate scatter around the pattern. How would you describe this association?

<div class="upper-alpha" markdown>
1. Strong positive linear association
2. Moderate negative linear association
3. Weak positive linear association
4. No association
</div>

??? question "Show Answer"
    The correct answer is **B**. When points slope downward from left to right, the association is negative (as x increases, y decreases). "Moderate scatter around the pattern" indicates the relationship is neither very strong (tight clustering) nor very weak (loose scatter), making it a moderate association. The overall pattern being roughly linear completes the description.

    **Concept Tested:** Describing Scatterplots

---

#### 3. Which correlation coefficient indicates the strongest linear relationship?

<div class="upper-alpha" markdown>
1. r = -0.85
2. r = 0.72
3. r = -0.45
4. r = 0.80
</div>

??? question "Show Answer"
    The correct answer is **A**. The strength of a linear relationship is determined by the absolute value of r, not its sign. Here, |-0.85| = 0.85 is the largest absolute value, indicating the strongest linear relationship. The negative sign only tells us the direction (negative association), not the strength.

    **Concept Tested:** Correlation Coefficient

---

#### 4. A researcher finds r = 0 for the relationship between study time and test scores. What can we conclude?

<div class="upper-alpha" markdown>
1. There is no relationship between study time and test scores
2. There is no linear relationship, but there could be a nonlinear one
3. The data contains errors
4. Study time definitely does not affect test scores
</div>

??? question "Show Answer"
    The correct answer is **B**. A correlation of 0 means there is no linear relationship between the variables. However, there could still be a curved (nonlinear) relationship. For example, if very low and very high study times both lead to lower scores (inverted U-shape), r could be near 0 despite a clear pattern. Always examine the scatterplot.

    **Concept Tested:** Correlation Limitations

---

#### 5. Which of the following is true about the correlation coefficient r?

<div class="upper-alpha" markdown>
1. It has units that match the data being measured
2. It can take any value on the number line
3. It changes when you swap the x and y variables
4. It is always between -1 and 1, inclusive
</div>

??? question "Show Answer"
    The correct answer is **D**. The correlation coefficient is always bounded between -1 and 1. It is unitless because z-scores remove the original units. Correlation is symmetric, meaning the correlation between x and y equals the correlation between y and x. A value outside [-1, 1] indicates a calculation error.

    **Concept Tested:** Properties of Correlation

---

#### 6. Data shows a strong positive correlation between ice cream sales and shark attacks. Which statement best explains this correlation?

<div class="upper-alpha" markdown>
1. Eating ice cream causes people to be attacked by sharks
2. Shark attacks cause people to buy more ice cream
3. A third variable (summer/warm weather) causes both to increase
4. This is proof that correlation equals causation
</div>

??? question "Show Answer"
    The correct answer is **C**. This is a classic example of correlation not implying causation. During summer months, both ice cream consumption and beach swimming increase due to warm weather. More swimming means more shark encounters, and more heat means more ice cream sales. Temperature is the lurking variable connecting both.

    **Concept Tested:** Correlation vs. Causation (Correlation Limitations)

---

#### 7. A scatterplot of car age (years) versus resale value ($) shows points that follow a curved pattern, decreasing rapidly at first then leveling off. What is the form of this association?

<div class="upper-alpha" markdown>
1. Linear
2. Nonlinear
3. No form
4. Positive linear
</div>

??? question "Show Answer"
    The correct answer is **B**. A curved pattern that decreases rapidly then levels off is characteristic of exponential decay or logarithmic relationships, both of which are nonlinear. Car values typically depreciate quickly in early years then stabilize. Attempting to fit a straight line to such data would miss the true pattern.

    **Concept Tested:** Nonlinear Form

---

#### 8. When calculating the correlation coefficient, what is the purpose of converting both variables to z-scores?

<div class="upper-alpha" markdown>
1. To make the calculations easier
2. To standardize variables so they can be compared on the same scale
3. To change the shape of the distribution
4. To eliminate outliers from the data
</div>

??? question "Show Answer"
    The correct answer is **B**. Converting to z-scores puts both variables on a standard scale (mean 0, standard deviation 1), allowing us to compare how they move together regardless of their original units. This is why correlation is unitless. The shape of the distribution remains unchanged by standardization.

    **Concept Tested:** Calculating Correlation

---

#### 9. A single point is added to a dataset that previously showed r = 0.90. The new point has an extreme x-value and falls far from the line. What is most likely to happen to the correlation?

<div class="upper-alpha" markdown>
1. It will stay exactly at 0.90
2. It will increase toward 1.0
3. It will decrease substantially
4. It will become negative
</div>

??? question "Show Answer"
    The correct answer is **C**. Correlation is sensitive to outliers, especially those with extreme x-values (high leverage points). A point far from the established pattern will pull the correlation toward 0, weakening the apparent relationship. Such influential points can dramatically change the correlation coefficient.

    **Concept Tested:** Properties of Correlation (Outlier Sensitivity)

---

#### 10. A study finds a correlation of r = 0.65 between height and basketball skill among professional NBA players. What issue might affect this correlation?

<div class="upper-alpha" markdown>
1. The correlation is too strong to be meaningful
2. The range of heights is restricted, potentially understating the true correlation
3. Height and basketball skill are not quantitative variables
4. Professional players are not a valid sample
</div>

??? question "Show Answer"
    The correct answer is **B**. NBA players represent a restricted range of heights since very short individuals are rarely found in professional basketball. When the range of one variable is restricted, correlation tends to be weaker than it would be in the general population. The true correlation between height and basketball skill across all people is likely much higher.

    **Concept Tested:** Correlation Limitations (Restricted Range)

---
