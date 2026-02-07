# Quiz: Random Variables

Test your understanding of random variables, probability distributions, expected value, and the binomial and geometric distributions with these review questions.

---

#### 1. A random variable X has the following probability distribution. What value of k makes this a valid probability distribution?

| X | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| P(X) | 0.15 | 0.25 | k | 0.20 |

<div class="upper-alpha" markdown>
1. 0.30
2. 0.35
3. 0.40
4. 0.45
</div>

??? question "Show Answer"
    The correct answer is **C**. For a valid probability distribution, all probabilities must sum to 1. We have 0.15 + 0.25 + k + 0.20 = 1, which gives us 0.60 + k = 1. Solving for k, we get k = 0.40. This satisfies both conditions: each probability is between 0 and 1, and they sum to exactly 1.

    **Concept Tested:** Valid Distribution

---

#### 2. Which of the following is a discrete random variable?

<div class="upper-alpha" markdown>
1. The exact time it takes to run a marathon
2. The temperature in a classroom
3. The number of apps installed on a randomly selected smartphone
4. The weight of a randomly selected apple
</div>

??? question "Show Answer"
    The correct answer is **C**. The number of apps installed on a smartphone is discrete because you count whole apps (0, 1, 2, 3, ...). You cannot have 2.5 apps installed. The other options involve measurements that can take any value within a range, making them continuous random variables.

    **Concept Tested:** Discrete Random Variable

---

#### 3. If X has expected value E(X) = 50 and standard deviation σ = 8, what is the expected value of Y = 3X + 10?

<div class="upper-alpha" markdown>
1. 60
2. 160
3. 170
4. 180
</div>

??? question "Show Answer"
    The correct answer is **B**. For a linear transformation Y = a + bX, the expected value is E(Y) = a + b·E(X). Substituting our values: E(Y) = 10 + 3(50) = 10 + 150 = 160. Remember that adding a constant shifts the mean by that constant, and multiplying by a constant multiplies the mean by that constant.

    **Concept Tested:** Linear Transformation

---

#### 4. A basketball player makes 80% of her free throws. If she shoots 5 free throws, what is the probability she makes exactly 4?

<div class="upper-alpha" markdown>
1. 0.328
2. 0.410
3. 0.512
4. 0.640
</div>

??? question "Show Answer"
    The correct answer is **B**. This is a binomial probability with n = 5, p = 0.80, and k = 4. Using the formula P(X = k) = C(n,k) × p^k × (1-p)^(n-k): P(X = 4) = C(5,4) × (0.80)^4 × (0.20)^1 = 5 × 0.4096 × 0.20 = 0.4096 ≈ 0.410. The binomial coefficient C(5,4) = 5 represents the number of ways to choose which 4 shots are made.

    **Concept Tested:** Binomial Probability

---

#### 5. For independent random variables X and Y with Var(X) = 25 and Var(Y) = 16, what is Var(X - Y)?

<div class="upper-alpha" markdown>
1. 9
2. 20.5
3. 41
4. 81
</div>

??? question "Show Answer"
    The correct answer is **C**. For independent random variables, Var(X - Y) = Var(X) + Var(Y), not Var(X) - Var(Y). This is a common misconception. Variability from both sources adds together regardless of whether we're adding or subtracting the variables. Therefore, Var(X - Y) = 25 + 16 = 41.

    **Concept Tested:** Difference of RVs

---

#### 6. A binomial distribution has n = 100 and p = 0.35. What is the mean of this distribution?

<div class="upper-alpha" markdown>
1. 22.75
2. 35
3. 65
4. 100
</div>

??? question "Show Answer"
    The correct answer is **B**. For a binomial distribution, the mean is μ = np. Substituting our values: μ = 100 × 0.35 = 35. This makes intuitive sense: if you have 100 trials with a 35% success rate, you'd expect about 35 successes on average.

    **Concept Tested:** Binomial Mean

---

#### 7. You flip a fair coin repeatedly until you get heads. What is the expected number of flips needed?

<div class="upper-alpha" markdown>
1. 1
2. 2
3. 4
4. It depends on luck
</div>

??? question "Show Answer"
    The correct answer is **B**. This is a geometric distribution with p = 0.5. The expected value (mean) of a geometric distribution is μ = 1/p = 1/0.5 = 2. On average, you need 2 flips to get the first head. Some attempts will take 1 flip, others might take many more, but the average is 2.

    **Concept Tested:** Geometric Mean

---

#### 8. Which of the following scenarios does NOT satisfy the binomial conditions?

<div class="upper-alpha" markdown>
1. Flipping a fair coin 20 times and counting heads
2. Drawing 5 cards from a standard deck without replacement and counting aces
3. Guessing on 10 multiple-choice questions with 4 options each and counting correct answers
4. Surveying 100 randomly selected voters and counting those who support a candidate
</div>

??? question "Show Answer"
    The correct answer is **B**. Drawing cards without replacement violates the independence condition because each draw affects the probability of subsequent draws. After drawing one ace, the probability of drawing another ace changes. The BINS conditions require independence between trials. The other scenarios satisfy all binomial conditions: Binary outcomes, Independent trials, fixed Number of trials, and Same probability.

    **Concept Tested:** Binomial Conditions

---

#### 9. The probability that a randomly selected light bulb is defective is 0.05. What is the probability that the first defective bulb is found on the third inspection?

<div class="upper-alpha" markdown>
1. 0.0023
2. 0.0451
3. 0.1354
4. 0.8574
</div>

??? question "Show Answer"
    The correct answer is **B**. This is a geometric probability: P(X = k) = (1-p)^(k-1) × p. We need the first two bulbs to be good (probability 0.95 each) and the third to be defective (probability 0.05). P(X = 3) = (0.95)^2 × (0.05) = 0.9025 × 0.05 = 0.0451 or about 4.5%.

    **Concept Tested:** Geometric Probability

---

#### 10. A game costs $2 to play. You win $10 with probability 0.1, win $3 with probability 0.3, and win nothing with probability 0.6. What is your expected profit (winnings minus cost) per game?

<div class="upper-alpha" markdown>
1. -$0.10
2. $0.10
3. $1.90
4. $3.90
</div>

??? question "Show Answer"
    The correct answer is **A**. First calculate expected winnings: E(W) = 10(0.1) + 3(0.3) + 0(0.6) = 1.00 + 0.90 + 0 = $1.90. Then subtract the cost: Expected profit = $1.90 - $2.00 = -$0.10. On average, you lose 10 cents per game. This illustrates how casinos and games of chance are designed to favor the house in the long run.

    **Concept Tested:** Expected Value
