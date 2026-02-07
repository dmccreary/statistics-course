# Quiz: Probability Fundamentals

Test your understanding of probability concepts including sample spaces, events, probability rules, and simulations with these review questions.

---

#### 1. A bag contains 4 red marbles, 5 blue marbles, and 1 green marble. What is the probability of randomly selecting a blue marble?

<div class="upper-alpha" markdown>
1. 0.40
2. 0.50
3. 0.45
4. 0.55
</div>

??? question "Show Answer"
    The correct answer is **B**. There are 5 blue marbles out of 10 total marbles (4 + 5 + 1 = 10). The probability is 5/10 = 0.50 or 50%. This is a straightforward application of the basic probability formula: P(event) = favorable outcomes / total outcomes.

    **Concept Tested:** Probability

---

#### 2. Which of the following best describes mutually exclusive events?

<div class="upper-alpha" markdown>
1. Events that can occur at the same time
2. Events where one occurring affects the probability of the other
3. Events that cannot occur at the same time
4. Events where knowing one occurred gives no information about the other
</div>

??? question "Show Answer"
    The correct answer is **C**. Mutually exclusive (also called disjoint) events are events that cannot happen simultaneously. For example, when rolling a single die, getting a 3 and getting a 5 are mutually exclusive because both cannot occur on the same roll. Choice D describes independent events, which is a different concept.

    **Concept Tested:** Mutually Exclusive Events

---

#### 3. If P(A) = 0.6, what is P(not A)?

<div class="upper-alpha" markdown>
1. 0.6
2. 0.4
3. -0.6
4. 1.6
</div>

??? question "Show Answer"
    The correct answer is **B**. The complement rule states that P(not A) = 1 - P(A). Therefore, P(not A) = 1 - 0.6 = 0.4. The probability of an event not occurring is always 1 minus the probability of it occurring. This is one of the fundamental probability rules.

    **Concept Tested:** Complement of Event

---

#### 4. A student flips a fair coin three times. How many outcomes are in the sample space?

<div class="upper-alpha" markdown>
1. 3
2. 6
3. 8
4. 9
</div>

??? question "Show Answer"
    The correct answer is **C**. Each coin flip has 2 possible outcomes (heads or tails). For three independent flips, we multiply: 2 x 2 x 2 = 8 outcomes. The complete sample space is {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}. Understanding how to count outcomes in a sample space is essential for calculating probabilities.

    **Concept Tested:** Sample Space

---

#### 5. Events A and B are independent. If P(A) = 0.3 and P(B) = 0.5, what is P(A and B)?

<div class="upper-alpha" markdown>
1. 0.80
2. 0.15
3. 0.65
4. 0.20
</div>

??? question "Show Answer"
    The correct answer is **B**. For independent events, the multiplication rule states that P(A and B) = P(A) x P(B). Therefore, P(A and B) = 0.3 x 0.5 = 0.15. Independence means that one event occurring does not affect the probability of the other, so we simply multiply their individual probabilities.

    **Concept Tested:** Independent Events

---

#### 6. In a class of 25 students, 15 play sports and 10 are in band. If 4 students do both, what is P(sports or band)?

<div class="upper-alpha" markdown>
1. 0.84
2. 0.60
3. 1.00
4. 0.76
</div>

??? question "Show Answer"
    The correct answer is **A**. Using the general addition rule: P(sports or band) = P(sports) + P(band) - P(both). That gives us 15/25 + 10/25 - 4/25 = 21/25 = 0.84. We subtract the intersection to avoid double-counting students who participate in both activities.

    **Concept Tested:** General Addition Rule

---

#### 7. According to the Law of Large Numbers, what happens as we increase the number of trials in a random experiment?

<div class="upper-alpha" markdown>
1. The outcomes become more predictable for each individual trial
2. The experimental probability gets closer to the theoretical probability
3. Each outcome becomes equally likely
4. The sample space expands to include more possible outcomes
</div>

??? question "Show Answer"
    The correct answer is **B**. The Law of Large Numbers states that as the number of trials increases, the empirical (experimental) probability converges toward the theoretical probability. This doesn't mean individual trials become predictable; rather, the overall proportion stabilizes. This principle explains why casinos always win in the long run.

    **Concept Tested:** Law of Large Numbers

---

#### 8. A simulation is designed to estimate the probability of rolling at least one 6 when rolling two dice. Which of the following correctly describes the design?

<div class="upper-alpha" markdown>
1. Roll one die many times and count how often you get a 6
2. Roll two dice once and check if at least one shows a 6
3. Roll two dice many times and track the proportion of rolls with at least one 6
4. Calculate 1/6 + 1/6 to find the exact probability
</div>

??? question "Show Answer"
    The correct answer is **C**. A proper simulation requires many trials to estimate probability. Each trial should model the actual scenario (rolling two dice), and we track the proportion of successful outcomes (at least one 6) across all trials. This empirical approach allows us to estimate probabilities that might be difficult to calculate theoretically.

    **Concept Tested:** Designing Simulations

---

#### 9. Two cards are drawn from a standard deck WITHOUT replacement. Are these draws independent or dependent events?

<div class="upper-alpha" markdown>
1. Independent, because each card has an equal chance of being drawn
2. Dependent, because the first draw changes the remaining cards
3. Independent, because the deck is well-shuffled
4. Neither independent nor dependent
</div>

??? question "Show Answer"
    The correct answer is **B**. When drawing without replacement, the first draw changes the composition of the deck, affecting the probabilities for the second draw. For example, if you draw an ace first, the probability of drawing another ace decreases from 4/52 to 3/51. This is the defining characteristic of dependent events.

    **Concept Tested:** Dependent Events

---

#### 10. A Venn diagram shows P(A) = 0.5, P(B) = 0.4, and P(A and B) = 0.2. What is the probability that neither A nor B occurs?

<div class="upper-alpha" markdown>
1. 0.10
2. 0.30
3. 0.50
4. 0.70
</div>

??? question "Show Answer"
    The correct answer is **B**. First, find P(A or B) using the addition rule: P(A or B) = 0.5 + 0.4 - 0.2 = 0.7. The probability of neither event is the complement: P(neither) = 1 - P(A or B) = 1 - 0.7 = 0.30. Venn diagrams help visualize these overlapping probabilities and ensure all regions sum to 1.

    **Concept Tested:** Using Venn Diagrams

---
