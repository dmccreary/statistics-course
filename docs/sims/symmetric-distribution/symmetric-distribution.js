// Symmetric Distribution Identifier MicroSim
// Students recognize symmetric distributions by comparing left and right sides
// Chapter 3: Displaying Quantitative Data
// Bloom Level: Remember (L1), Bloom Verb: recognize

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 300;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Distribution data
let bars = [];
let numBars = 12;
let isSymmetric = true;
let centerLine;

// Quiz state
let score = 0;
let attempts = 0;
let maxQuestions = 10;
let feedbackText = "";
let feedbackColor;
let showingFeedback = false;
let answered = false;

// Fold animation
let isFolding = false;
let foldProgress = 0;
let foldSpeed = 0.03;

// Difficulty: 0=Easy, 1=Medium, 2=Hard
let difficulty = 0;
let difficultyLabels = ["Easy", "Medium", "Hard"];

// Buttons
let symmetricBtn, notSymmetricBtn, nextBtn, foldBtn;
let easyBtn, mediumBtn, hardBtn;

// Quiz complete state
let quizComplete = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    // Row 1: Classification and action buttons
    symmetricBtn = createButton('Symmetric');
    symmetricBtn.position(10, drawHeight + 8);
    symmetricBtn.mousePressed(() => checkAnswer(true));

    notSymmetricBtn = createButton('Not Symmetric');
    notSymmetricBtn.position(95, drawHeight + 8);
    notSymmetricBtn.mousePressed(() => checkAnswer(false));

    foldBtn = createButton('Show Fold');
    foldBtn.position(210, drawHeight + 8);
    foldBtn.mousePressed(startFold);

    nextBtn = createButton('Next');
    nextBtn.position(300, drawHeight + 8);
    nextBtn.mousePressed(nextDistribution);

    // Row 2: Difficulty buttons
    easyBtn = createButton('Easy');
    easyBtn.position(10, drawHeight + 45);
    easyBtn.mousePressed(() => setDifficulty(0));

    mediumBtn = createButton('Medium');
    mediumBtn.position(65, drawHeight + 45);
    mediumBtn.mousePressed(() => setDifficulty(1));

    hardBtn = createButton('Hard');
    hardBtn.position(140, drawHeight + 45);
    hardBtn.mousePressed(() => setDifficulty(2));

    // Generate first distribution
    generateDistribution();

    describe('Interactive quiz to identify symmetric and asymmetric distributions using histogram visualization with fold animation', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    if (quizComplete) {
        drawQuizComplete();
    } else {
        drawHistogram();
        drawCenterLine();

        if (isFolding) {
            drawFoldAnimation();
        }

        if (showingFeedback) {
            drawFeedback();
        }
    }

    // Draw title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text('Symmetric Distribution Identifier', canvasWidth / 2, 8);

    // Draw score and difficulty in control area
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    fill('black');
    text('Score: ' + score + '/' + attempts, 200, drawHeight + 60);

    // Highlight current difficulty
    noFill();
    stroke('blue');
    strokeWeight(2);
    if (difficulty === 0) {
        rect(8, drawHeight + 43, 50, 24, 3);
    } else if (difficulty === 1) {
        rect(63, drawHeight + 43, 65, 24, 3);
    } else {
        rect(138, drawHeight + 43, 45, 24, 3);
    }

    // Progress indicator
    noStroke();
    fill('gray');
    textAlign(RIGHT, CENTER);
    text('Question ' + min(attempts + 1, maxQuestions) + '/' + maxQuestions, canvasWidth - 15, drawHeight + 60);

    // Update fold animation
    if (isFolding) {
        foldProgress += foldSpeed;
        if (foldProgress >= 1) {
            foldProgress = 1;
            isFolding = false;
        }
    }
}

function generateDistribution() {
    bars = [];

    // Decide if symmetric (50% chance)
    isSymmetric = random() < 0.5;

    // Number of bars varies by difficulty
    if (difficulty === 0) {
        numBars = 10;
    } else if (difficulty === 1) {
        numBars = 12;
    } else {
        numBars = 15;
    }

    centerLine = numBars / 2;

    if (isSymmetric) {
        generateSymmetricDistribution();
    } else {
        generateAsymmetricDistribution();
    }

    // Reset animation state
    isFolding = false;
    foldProgress = 0;
    showingFeedback = false;
    answered = false;
}

function generateSymmetricDistribution() {
    let distributionType = floor(random(4));

    if (distributionType === 0) {
        // Normal-shaped (bell curve)
        let center = numBars / 2;
        let spread = numBars / 4;
        for (let i = 0; i < numBars; i++) {
            let x = i - center;
            let height = exp(-(x * x) / (2 * spread * spread));
            height = height * 180 + random(-5, 5);
            bars.push(max(20, height));
        }
    } else if (distributionType === 1) {
        // Uniform
        let baseHeight = random(80, 140);
        for (let i = 0; i < numBars; i++) {
            bars.push(baseHeight + random(-10, 10));
        }
    } else if (distributionType === 2) {
        // Bimodal symmetric
        let center = numBars / 2;
        let peakOffset = numBars / 4;
        for (let i = 0; i < numBars; i++) {
            let x1 = i - (center - peakOffset);
            let x2 = i - (center + peakOffset);
            let height1 = exp(-(x1 * x1) / 4);
            let height2 = exp(-(x2 * x2) / 4);
            let height = (height1 + height2) * 100 + random(-5, 5);
            bars.push(max(20, height));
        }
    } else {
        // U-shaped (inverse normal)
        let center = numBars / 2;
        for (let i = 0; i < numBars; i++) {
            let x = i - center;
            let height = abs(x) * 20 + 40 + random(-10, 10);
            bars.push(min(200, height));
        }
    }

    // Ensure perfect symmetry with small noise based on difficulty
    let noiseLevel = difficulty === 0 ? 0 : (difficulty === 1 ? 5 : 10);
    for (let i = 0; i < floor(numBars / 2); i++) {
        let avgHeight = (bars[i] + bars[numBars - 1 - i]) / 2;
        bars[i] = avgHeight + random(-noiseLevel, noiseLevel);
        bars[numBars - 1 - i] = avgHeight + random(-noiseLevel, noiseLevel);
    }
}

function generateAsymmetricDistribution() {
    let distributionType = floor(random(4));

    // Skew amount varies by difficulty (less obvious at harder levels)
    let skewFactor = difficulty === 0 ? 1.5 : (difficulty === 1 ? 1.2 : 1.1);

    if (distributionType === 0) {
        // Right-skewed
        for (let i = 0; i < numBars; i++) {
            let normalized = i / numBars;
            let height = exp(-normalized * 3) * 180 + random(-10, 10);
            bars.push(max(20, height * skewFactor));
        }
    } else if (distributionType === 1) {
        // Left-skewed
        for (let i = 0; i < numBars; i++) {
            let normalized = (numBars - i) / numBars;
            let height = exp(-normalized * 3) * 180 + random(-10, 10);
            bars.push(max(20, height * skewFactor));
        }
    } else if (distributionType === 2) {
        // Bimodal asymmetric (unequal peaks)
        let center = numBars / 2;
        let peakOffset = numBars / 4;
        for (let i = 0; i < numBars; i++) {
            let x1 = i - (center - peakOffset);
            let x2 = i - (center + peakOffset);
            let height1 = exp(-(x1 * x1) / 4) * (1.5 / skewFactor);
            let height2 = exp(-(x2 * x2) / 4) * skewFactor;
            let height = (height1 + height2) * 100 + random(-10, 10);
            bars.push(max(20, height));
        }
    } else {
        // Slightly shifted normal
        let center = numBars / 2 + (random() < 0.5 ? 1 : -1) * (4 - difficulty);
        let spread = numBars / 4;
        for (let i = 0; i < numBars; i++) {
            let x = i - center;
            let height = exp(-(x * x) / (2 * spread * spread));
            height = height * 180 + random(-10, 10);
            bars.push(max(20, height));
        }
    }
}

function drawHistogram() {
    let barWidth = (canvasWidth - 2 * margin) / numBars;
    let maxHeight = max(bars);
    let scaleFactor = (drawHeight - 80) / maxHeight;

    for (let i = 0; i < numBars; i++) {
        let x = margin + i * barWidth;
        let h = bars[i] * scaleFactor;
        let y = drawHeight - 40 - h;

        // Color bars based on position relative to center
        if (i < numBars / 2) {
            fill(100, 150, 220, 200);
        } else {
            fill(220, 150, 100, 200);
        }
        stroke('white');
        strokeWeight(1);
        rect(x, y, barWidth - 2, h);
    }

    // Draw x-axis
    stroke('black');
    strokeWeight(1);
    line(margin, drawHeight - 40, canvasWidth - margin, drawHeight - 40);
}

function drawCenterLine() {
    let centerX = canvasWidth / 2;

    stroke('red');
    strokeWeight(2);
    drawingContext.setLineDash([5, 5]);
    line(centerX, 35, centerX, drawHeight - 40);
    drawingContext.setLineDash([]);

    // Label
    noStroke();
    fill('red');
    textAlign(CENTER, TOP);
    textSize(12);
    text('Center', centerX, drawHeight - 35);
}

function drawFoldAnimation() {
    let barWidth = (canvasWidth - 2 * margin) / numBars;
    let maxHeight = max(bars);
    let scaleFactor = (drawHeight - 80) / maxHeight;
    let centerX = canvasWidth / 2;

    // Draw folded right side bars moving to left
    for (let i = floor(numBars / 2); i < numBars; i++) {
        let originalX = margin + i * barWidth;
        let mirrorX = canvasWidth - originalX - barWidth;
        let currentX = lerp(originalX, mirrorX, foldProgress);

        let h = bars[i] * scaleFactor;
        let y = drawHeight - 40 - h;

        fill(220, 150, 100, 150 * foldProgress);
        stroke('orange');
        strokeWeight(1);
        rect(currentX, y, barWidth - 2, h);
    }
}

function drawFeedback() {
    // Feedback background
    fill(feedbackColor);
    noStroke();
    rectMode(CENTER);
    rect(canvasWidth / 2, drawHeight / 2, 200, 60, 10);
    rectMode(CORNER);

    // Feedback text
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(24);
    text(feedbackText, canvasWidth / 2, drawHeight / 2);
}

function drawQuizComplete() {
    fill('aliceblue');
    noStroke();
    rect(0, 0, canvasWidth, drawHeight);

    let percentage = attempts > 0 ? round((score / attempts) * 100) : 0;

    fill('black');
    textAlign(CENTER, CENTER);
    textSize(28);
    text('Quiz Complete!', canvasWidth / 2, drawHeight / 3);

    textSize(22);
    text('Final Score: ' + score + '/' + attempts + ' (' + percentage + '%)', canvasWidth / 2, drawHeight / 2);

    // Encouraging message based on score
    textSize(18);
    let message;
    if (percentage >= 90) {
        message = "Excellent! You've mastered symmetry recognition!";
        fill('green');
    } else if (percentage >= 70) {
        message = "Great job! Keep practicing!";
        fill('blue');
    } else if (percentage >= 50) {
        message = "Good effort! Try again to improve.";
        fill('orange');
    } else {
        message = "Keep trying! Practice makes perfect.";
        fill('red');
    }
    text(message, canvasWidth / 2, drawHeight * 2 / 3);

    fill('gray');
    textSize(14);
    text('Click "Next" to start a new quiz', canvasWidth / 2, drawHeight - 50);
}

function checkAnswer(guessedSymmetric) {
    if (answered || quizComplete) return;

    answered = true;
    attempts++;

    if (guessedSymmetric === isSymmetric) {
        score++;
        feedbackText = "Correct!";
        feedbackColor = color(50, 180, 50);
    } else {
        feedbackText = "Try Again!";
        feedbackColor = color(220, 50, 50);
    }

    showingFeedback = true;

    // Check if quiz is complete
    if (attempts >= maxQuestions) {
        setTimeout(() => {
            quizComplete = true;
            showingFeedback = false;
        }, 1500);
    } else {
        // Auto-advance after feedback
        setTimeout(() => {
            showingFeedback = false;
        }, 1200);
    }
}

function nextDistribution() {
    if (quizComplete) {
        // Reset quiz
        score = 0;
        attempts = 0;
        quizComplete = false;
    }
    generateDistribution();
}

function startFold() {
    if (!isFolding) {
        isFolding = true;
        foldProgress = 0;
    }
}

function setDifficulty(level) {
    difficulty = level;
    // Reset quiz when difficulty changes
    score = 0;
    attempts = 0;
    quizComplete = false;
    generateDistribution();
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = container.offsetWidth;
    }
}
