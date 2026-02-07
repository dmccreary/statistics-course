# Quiz: Conditional Probability and Independence

Test your understanding of conditional probability, tree diagrams, and Bayes' theorem with these review questions.

---

#### 1. What does the notation P(A | B) represent?

<div class="upper-alpha" markdown>
1. The probability of A and B occurring together
2. The probability of A occurring given that B has occurred
3. The probability of A or B occurring
4. The probability that A and B are independent
</div>

??? question "Show Answer"
    The correct answer is **B**. The notation P(A | B) is read as "the probability of A given B" and represents the probability of event A occurring given that event B has already occurred. The vertical bar is read as "given" and indicates that we are working with a restricted sample space where B is known to have happened.

    **Concept Tested:** Conditional Probability

---

#### 2. In a survey, 60% of students own a laptop, 40% own a tablet, and 25% own both. What is P(tablet | laptop)?

<div class="upper-alpha" markdown>
1. 0.25
2. 0.625
3. 0.417
4. 0.40
</div>

??? question "Show Answer"
    The correct answer is **C**. Using the conditional probability formula: P(tablet | laptop) = P(tablet and laptop) / P(laptop) = 0.25 / 0.60 = 0.417 or about 41.7%. This tells us that among students who own a laptop, approximately 42% also own a tablet.

    **Concept Tested:** Calculating Conditionals

---

#### 3. If P(A | B) = P(A), what can we conclude about events A and B?

<div class="upper-alpha" markdown>
1. A and B are mutually exclusive
2. A and B are independent
3. A and B always occur together
4. A and B never occur together
</div>

??? question "Show Answer"
    The correct answer is **B**. When P(A | B) = P(A), knowing that B occurred does not change the probability of A. This is the definition of independence. The occurrence of one event provides no information about the other. This is different from mutually exclusive events, which cannot occur together.

    **Concept Tested:** Conditional Probability

---

#### 4. A medical test is 95% accurate for people with a disease and 90% accurate for people without the disease. If 2% of the population has the disease, which probability would be found using Bayes' theorem?

<div class="upper-alpha" markdown>
1. P(positive test | disease)
2. P(disease | positive test)
3. P(disease and positive test)
4. P(positive test)
</div>

??? question "Show Answer"
    The correct answer is **B**. Bayes' theorem is used to "reverse" conditional probabilities. We know P(positive | disease) = 0.95, but we want to find P(disease | positive)the probability someone actually has the disease given they tested positive. This is the clinically meaningful question for interpreting test results.

    **Concept Tested:** Bayes Intuition

---

#### 5. In a tree diagram, what operation do you perform along branches to find the probability of reaching a specific outcome?

<div class="upper-alpha" markdown>
1. Add the probabilities
2. Multiply the probabilities
3. Subtract the probabilities
4. Divide the probabilities
</div>

??? question "Show Answer"
    The correct answer is **B**. In tree diagrams, you multiply probabilities along paths to find joint probabilities. Each branch represents a conditional probability, and the general multiplication rule tells us that P(A and B) = P(A) x P(B|A). This is why we multiply as we move along the branches.

    **Concept Tested:** Using Tree Diagrams

---

#### 6. A factory has two machines. Machine A produces 70% of items and has a 2% defect rate. Machine B produces 30% of items and has a 5% defect rate. What is the probability that a randomly selected item is defective?

<div class="upper-alpha" markdown>
1. 0.035
2. 0.029
3. 0.014
4. 0.070
</div>

??? question "Show Answer"
    The correct answer is **B**. Using the law of total probability: P(defective) = P(A) x P(defective|A) + P(B) x P(defective|B) = (0.70)(0.02) + (0.30)(0.05) = 0.014 + 0.015 = 0.029. A tree diagram helps organize these calculations by showing both machines and their defect probabilities.

    **Concept Tested:** Tree Diagram

---

#### 7. A rare disease affects 1% of a population. A test correctly identifies 99% of those with the disease and correctly identifies 95% of those without it. If a person tests positive, which statement best describes P(disease | positive)?

<div class="upper-alpha" markdown>
1. It is close to 99% because the test is very accurate
2. It is surprisingly low because the disease is rare
3. It equals 1% because that's the disease prevalence
4. It is impossible to determine without more information
</div>

??? question "Show Answer"
    The correct answer is **B**. Despite the test's high accuracy, the low base rate (1% prevalence) means many false positives occur among the large healthy population. When you calculate P(disease | positive), you find it's often much lower than expected, around 17%. This counterintuitive result demonstrates why base rates are crucial in Bayesian reasoning.

    **Concept Tested:** Bayes Intuition

---

#### 8. Two cards are drawn without replacement. Given that the first card is a heart, what is the probability the second card is also a heart?

<div class="upper-alpha" markdown>
1. 13/52
2. 12/52
3. 12/51
4. 13/51
</div>

??? question "Show Answer"
    The correct answer is **C**. After drawing one heart, there are 12 hearts remaining out of 51 total cards. So P(second heart | first heart) = 12/51. This problem illustrates dependent events, where the first outcome affects the probabilities for the second. Without replacement, the sample space shrinks.

    **Concept Tested:** Calculating Conditionals

---

#### 9. Which tool is most appropriate for solving a probability problem involving a sequence of events with different outcomes at each stage?

<div class="upper-alpha" markdown>
1. Venn diagram
2. Histogram
3. Tree diagram
4. Scatter plot
</div>

??? question "Show Answer"
    The correct answer is **C**. Tree diagrams are specifically designed for sequential probability problems. They show all possible paths through a series of events, with branch probabilities at each stage. By multiplying along paths and adding paths that lead to the same final outcome, you can calculate any probability in the problem.

    **Concept Tested:** Tree Diagram

---

#### 10. For two events A and B with nonzero probabilities, if A and B are mutually exclusive, can they also be independent?

<div class="upper-alpha" markdown>
1. Yes, they are always both mutually exclusive and independent
2. No, mutually exclusive events with nonzero probabilities cannot be independent
3. Yes, but only if P(A) = P(B)
4. It depends on the sample space size
</div>

??? question "Show Answer"
    The correct answer is **B**. If A and B are mutually exclusive with nonzero probabilities, then P(A and B) = 0. For independence, we would need P(A and B) = P(A) x P(B). Since P(A) and P(B) are both positive, their product is positive, which cannot equal 0. Therefore, mutually exclusive events with nonzero probabilities are always dependent.

    **Concept Tested:** Conditional Probability

---
