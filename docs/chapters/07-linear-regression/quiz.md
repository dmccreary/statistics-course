# Quiz: Linear Regression

Test your understanding of least squares regression, residuals, and model interpretation with these review questions.

---

#### 1. What does the least squares regression method minimize?

<div class="upper-alpha" markdown>
1. The sum of the horizontal distances from points to the line
2. The sum of the absolute values of the residuals
3. The sum of the squared vertical distances from points to the line
4. The distance between the largest and smallest residuals
</div>

??? question "Show Answer"
    The correct answer is **C**. Least squares regression minimizes the sum of squared residuals, which are vertical distances from each point to the line. Squaring the distances ensures that positive and negative errors don't cancel out and that larger errors are penalized more heavily than smaller ones.

    **Concept Tested:** Least Squares Regression

---

#### 2. In the regression equation \( \hat{y} = 12.5 + 3.2x \), what is the correct interpretation of the slope?

<div class="upper-alpha" markdown>
1. When x = 0, y is predicted to be 3.2
2. For each one-unit increase in x, the predicted y increases by 3.2
3. The correlation between x and y is 3.2
4. 3.2% of the variability in y is explained by x
</div>

??? question "Show Answer"
    The correct answer is **B**. The slope (3.2) represents the change in the predicted value of y for each one-unit increase in x. In context, you would say: "For each additional unit of x, the predicted y increases by 3.2 units." The slope describes the rate of change in the response variable.

    **Concept Tested:** Slope Interpretation

---

#### 3. A regression equation for predicting weight (lbs) from height (inches) is \( \hat{y} = -180 + 5.0x \). Why might the y-intercept have no practical meaning?

<div class="upper-alpha" markdown>
1. The slope is too large
2. Height of 0 inches is impossible, making the intercept meaningless extrapolation
3. The y-intercept should always be positive
4. The intercept should equal the mean weight
</div>

??? question "Show Answer"
    The correct answer is **B**. The y-intercept (-180 lbs) represents the predicted weight when height equals zero inches. Since a height of zero is impossible for a living person, this value is extrapolation far beyond the data range. The intercept is simply where the mathematical line crosses the y-axis, not a meaningful prediction.

    **Concept Tested:** Y-Intercept Interpretation

---

#### 4. If a student's actual test score is 85 and the regression equation predicts 82, what is the residual?

<div class="upper-alpha" markdown>
1. -3
2. 3
3. 82
4. 167
</div>

??? question "Show Answer"
    The correct answer is **B**. Residual = Observed - Predicted = 85 - 82 = 3. A positive residual means the actual value is above the regression line (the model underestimated). A negative residual would indicate the actual value is below the line (overestimated).

    **Concept Tested:** Calculating Residuals

---

#### 5. A residual plot shows a clear U-shaped pattern. What does this indicate?

<div class="upper-alpha" markdown>
1. The linear model is appropriate for the data
2. There are no outliers in the data
3. A nonlinear relationship exists that the linear model does not capture
4. The residuals are randomly distributed
</div>

??? question "Show Answer"
    The correct answer is **C**. A curved pattern in the residual plot indicates that a linear model is not appropriate. The data likely follows a curved (nonlinear) relationship that a straight line cannot capture. A good residual plot should show random scatter with no discernible pattern.

    **Concept Tested:** Interpreting Residual Plots

---

#### 6. If the correlation between study hours and exam score is r = 0.80, what is the value of R-squared?

<div class="upper-alpha" markdown>
1. 0.40
2. 0.64
3. 0.80
4. 0.89
</div>

??? question "Show Answer"
    The correct answer is **B**. The coefficient of determination is calculated as \( R^2 = r^2 = (0.80)^2 = 0.64 \). This means 64% of the variability in exam scores can be explained by the linear relationship with study hours. Note that R-squared is always between 0 and 1, regardless of whether r is positive or negative.

    **Concept Tested:** Coefficient of Determination

---

#### 7. What does an R-squared value of 0.72 mean in context?

<div class="upper-alpha" markdown>
1. The correlation is 0.72
2. 72% of the data points fall exactly on the regression line
3. 72% of the variability in y is explained by the linear relationship with x
4. 72% of predictions will be exactly correct
</div>

??? question "Show Answer"
    The correct answer is **C**. R-squared represents the proportion of variability in the response variable that is explained by the linear relationship with the explanatory variable. The remaining 28% is variability due to other factors not captured by the model. R-squared does not indicate how many points fall on the line.

    **Concept Tested:** R-Squared Interpretation

---

#### 8. A data point has an extreme x-value compared to the rest of the data. This point is said to have high what?

<div class="upper-alpha" markdown>
1. Residual
2. Leverage
3. Correlation
4. Standard deviation
</div>

??? question "Show Answer"
    The correct answer is **B**. Leverage refers to how extreme a point's x-value is compared to other x-values. Points with high leverage are far from the mean of x and have the potential to strongly influence the regression line. A high-leverage point that also falls far from the pattern of other points becomes an influential point.

    **Concept Tested:** Leverage

---

#### 9. Using data where x ranged from 10 to 50, a regression equation is developed. A prediction is then made for x = 80. What is this called and why is it problematic?

<div class="upper-alpha" markdown>
1. Interpolation; it requires more data points
2. Extrapolation; we have no evidence the linear pattern continues beyond the data range
3. Correlation; it changes the relationship direction
4. Standardization; it requires z-scores
</div>

??? question "Show Answer"
    The correct answer is **B**. Extrapolation means predicting outside the range of original data. It's dangerous because the linear relationship might not continue beyond the observed data. The pattern could curve, level off, or change direction at values we haven't observed. Predictions within the data range (interpolation) are more reliable.

    **Concept Tested:** Extrapolation Dangers

---

#### 10. When an influential point is removed from a dataset, the slope of the regression line changes from 2.5 to 4.1. What does this tell us about the point?

<div class="upper-alpha" markdown>
1. It had a small residual
2. It significantly affected the regression equation
3. It was located near the center of the data
4. It should always be kept in the analysis
</div>

??? question "Show Answer"
    The correct answer is **B**. An influential point substantially changes the regression equation when removed. The dramatic change in slope (from 2.5 to 4.1) confirms this point's strong influence. Such points should be investigated to determine if they are data errors, from a different population, or valid but unusual observations. The decision to keep or remove them requires careful judgment.

    **Concept Tested:** Influential Points

---
