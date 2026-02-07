// Guess the Correlation MicroSim
// Students estimate correlation values from scatterplots
// Develops intuition for what different r-values look like
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 600;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 20;
let defaultTextSize = 16;

// Scatterplot data
let dataPoints = [];
let actualR = 0;
let numPoints = 50;

// User interaction
let userGuess = 0;
let sliderX = 100;
let sliderWidth = 300;
let sliderY = 50;  // Relative to control area
let draggingSlider = false;

// Game state
let hasGuessed = false;
let feedbackMessage = '';
let feedbackColor = '';
let currentStreak = 0;
let highScore = 0;

// Difficulty settings
let difficulty = 'easy';  // 'easy', 'medium', 'hard'
let difficultySettings = {
    easy: { n: 50, name: 'Easy' },
    medium: { n: 30, name: 'Medium' },
    hard: { n: 20, name: 'Hard' }
};

// Buttons (canvas-based)
let checkButton = { x: 0, y: 0, w: 100, h: 32 };
let newPlotButton = { x: 0, y: 0, w: 100, h: 32 };
let difficultyButtons = [];

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaGreenLight = '#4CAF50';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);

    // Generate initial scatterplot
    generateNewPlot();

    describe('Interactive correlation guessing game. A scatterplot is displayed and students estimate the correlation coefficient using a slider. After checking their answer, feedback shows how close they were and tracks their streak of accurate guesses.', LABEL);
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

    // Draw scatterplot
    drawScatterplot();

    // Draw controls
    drawControls();
}

function drawScatterplot() {
    // Plot area dimensions
    let plotLeft = margin + 40;
    let plotRight = canvasWidth - margin - 40;
    let plotTop = margin + 30;
    let plotBottom = drawHeight - margin - 30;
    let plotWidth = plotRight - plotLeft;
    let plotHeight = plotBottom - plotTop;

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text('Guess the Correlation', canvasWidth / 2, 8);

    // Axes
    stroke(100);
    strokeWeight(2);
    line(plotLeft, plotBottom, plotRight, plotBottom);  // x-axis
    line(plotLeft, plotTop, plotLeft, plotBottom);       // y-axis

    // Axis labels
    fill(80);
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('X', (plotLeft + plotRight) / 2, plotBottom + 5);
    push();
    translate(plotLeft - 20, (plotTop + plotBottom) / 2);
    rotate(-HALF_PI);
    text('Y', 0, 0);
    pop();

    // Grid lines
    stroke(220);
    strokeWeight(1);
    for (let i = 0; i <= 4; i++) {
        let x = plotLeft + (i / 4) * plotWidth;
        let y = plotTop + (i / 4) * plotHeight;
        line(x, plotTop, x, plotBottom);
        line(plotLeft, y, plotRight, y);
    }

    // Draw data points
    noStroke();
    fill(sylviaGreen);
    for (let pt of dataPoints) {
        let px = map(pt.x, 0, 1, plotLeft, plotRight);
        let py = map(pt.y, 0, 1, plotBottom, plotTop);
        ellipse(px, py, 10, 10);
    }

    // Draw streak and high score
    textAlign(RIGHT, TOP);
    textSize(14);
    fill(sylviaGreen);
    text('Streak: ' + currentStreak, canvasWidth - margin, margin);
    fill(sylviaAuburn);
    text('Best: ' + highScore, canvasWidth - margin, margin + 20);

    // Draw difficulty indicator
    textAlign(LEFT, TOP);
    fill(80);
    textSize(12);
    text(difficultySettings[difficulty].name + ' (n=' + numPoints + ')', margin, margin);

    // Show feedback and actual r if guessed
    if (hasGuessed) {
        // Feedback message
        fill(feedbackColor);
        textAlign(CENTER, BOTTOM);
        textSize(18);
        text(feedbackMessage, canvasWidth / 2, plotBottom - 10);

        // Show actual r
        textSize(16);
        fill(sylviaAuburn);
        textAlign(CENTER, TOP);
        text('Actual r = ' + actualR.toFixed(3), canvasWidth / 2, plotTop + 10);

        // Show comparison
        textSize(14);
        fill(80);
        text('Your guess: ' + userGuess.toFixed(2) + ' | Difference: ' + Math.abs(userGuess - actualR).toFixed(3), canvasWidth / 2, plotTop + 30);
    }
}

function drawControls() {
    let controlY = drawHeight;

    // Slider label and value
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text('Your Guess:', margin, controlY + sliderY);

    // Current guess value
    textAlign(RIGHT, CENTER);
    fill(sylviaAuburn);
    textSize(18);
    let displayGuess = hasGuessed ? userGuess : userGuess;
    text(displayGuess.toFixed(2), sliderX - 10, controlY + sliderY);

    // Slider track
    fill(220);
    noStroke();
    rect(sliderX, controlY + sliderY - 6, sliderWidth, 12, 6);

    // Slider tick marks
    stroke(180);
    strokeWeight(1);
    textAlign(CENTER, TOP);
    textSize(10);
    fill(100);
    for (let v = -1; v <= 1; v += 0.5) {
        let tickX = map(v, -1, 1, sliderX, sliderX + sliderWidth);
        line(tickX, controlY + sliderY - 10, tickX, controlY + sliderY + 10);
        noStroke();
        text(v.toFixed(1), tickX, controlY + sliderY + 12);
        stroke(180);
    }

    // Slider handle
    let handleX = map(userGuess, -1, 1, sliderX, sliderX + sliderWidth);
    fill(sylviaGreen);
    noStroke();
    ellipse(handleX, controlY + sliderY, 20, 20);

    // Buttons
    let buttonY = controlY + 75;
    let buttonSpacing = 15;

    // Check Answer button
    checkButton.x = sliderX;
    checkButton.y = buttonY;
    if (!hasGuessed) {
        fill(sylviaGreen);
    } else {
        fill(180);
    }
    noStroke();
    rect(checkButton.x, checkButton.y, checkButton.w, checkButton.h, 5);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Check Answer', checkButton.x + checkButton.w / 2, checkButton.y + checkButton.h / 2);

    // New Plot button
    newPlotButton.x = sliderX + checkButton.w + buttonSpacing;
    newPlotButton.y = buttonY;
    fill(sylviaAuburn);
    noStroke();
    rect(newPlotButton.x, newPlotButton.y, newPlotButton.w, newPlotButton.h, 5);
    fill('white');
    text('New Plot', newPlotButton.x + newPlotButton.w / 2, newPlotButton.y + newPlotButton.h / 2);

    // Difficulty buttons
    let diffX = newPlotButton.x + newPlotButton.w + 30;
    textAlign(LEFT, CENTER);
    fill(80);
    textSize(12);
    text('Difficulty:', diffX, buttonY + checkButton.h / 2);

    diffX += 65;
    let diffTypes = ['easy', 'medium', 'hard'];
    let diffNames = ['Easy', 'Med', 'Hard'];
    difficultyButtons = [];

    for (let i = 0; i < diffTypes.length; i++) {
        let btn = { x: diffX + i * 55, y: buttonY, w: 50, h: checkButton.h, type: diffTypes[i] };
        difficultyButtons.push(btn);

        if (difficulty === diffTypes[i]) {
            fill(sylviaGreen);
        } else {
            fill(200);
        }
        noStroke();
        rect(btn.x, btn.y, btn.w, btn.h, 5);

        if (difficulty === diffTypes[i]) {
            fill('white');
        } else {
            fill(80);
        }
        textAlign(CENTER, CENTER);
        textSize(12);
        text(diffNames[i], btn.x + btn.w / 2, btn.y + btn.h / 2);
    }
}

function generateNewPlot() {
    // Generate random target correlation
    actualR = random(-0.95, 0.95);

    // Update number of points based on difficulty
    numPoints = difficultySettings[difficulty].n;

    // Generate correlated data using Cholesky decomposition
    dataPoints = [];

    // Generate independent standard normal variables
    let xVals = [];
    let zVals = [];
    for (let i = 0; i < numPoints; i++) {
        xVals.push(randomGaussian(0, 1));
        zVals.push(randomGaussian(0, 1));
    }

    // Create correlated y values: y = r*x + sqrt(1-r^2)*z
    let yVals = [];
    let sqrtFactor = Math.sqrt(1 - actualR * actualR);
    for (let i = 0; i < numPoints; i++) {
        yVals.push(actualR * xVals[i] + sqrtFactor * zVals[i]);
    }

    // Normalize to [0, 1] range for plotting
    let xMin = Math.min(...xVals);
    let xMax = Math.max(...xVals);
    let yMin = Math.min(...yVals);
    let yMax = Math.max(...yVals);

    for (let i = 0; i < numPoints; i++) {
        dataPoints.push({
            x: (xVals[i] - xMin) / (xMax - xMin),
            y: (yVals[i] - yMin) / (yMax - yMin)
        });
    }

    // Calculate actual r from the generated data
    actualR = calculateCorrelation(xVals, yVals);

    // Reset game state
    hasGuessed = false;
    feedbackMessage = '';
    userGuess = 0;
}

function calculateCorrelation(x, y) {
    let n = x.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

    for (let i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumX2 += x[i] * x[i];
        sumY2 += y[i] * y[i];
    }

    let numerator = n * sumXY - sumX * sumY;
    let denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    if (denominator === 0) return 0;
    return numerator / denominator;
}

function checkAnswer() {
    if (hasGuessed) return;

    hasGuessed = true;
    let difference = Math.abs(userGuess - actualR);

    if (difference <= 0.1) {
        feedbackMessage = 'Excellent! Within 0.1!';
        feedbackColor = sylviaGreen;
        currentStreak++;
        if (currentStreak > highScore) {
            highScore = currentStreak;
        }
    } else if (difference <= 0.2) {
        feedbackMessage = 'Good estimate! Within 0.2';
        feedbackColor = sylviaGreenLight;
        currentStreak++;
        if (currentStreak > highScore) {
            highScore = currentStreak;
        }
    } else {
        feedbackMessage = 'Keep practicing! Off by ' + difference.toFixed(2);
        feedbackColor = sylviaAuburn;
        currentStreak = 0;
    }
}

function mousePressed() {
    // Check slider
    let controlY = drawHeight;
    if (mouseY >= controlY + sliderY - 15 && mouseY <= controlY + sliderY + 15 &&
        mouseX >= sliderX && mouseX <= sliderX + sliderWidth) {
        draggingSlider = true;
        updateSlider();
    }

    // Check Check Answer button
    if (!hasGuessed && mouseX >= checkButton.x && mouseX <= checkButton.x + checkButton.w &&
        mouseY >= checkButton.y && mouseY <= checkButton.y + checkButton.h) {
        checkAnswer();
        return;
    }

    // Check New Plot button
    if (mouseX >= newPlotButton.x && mouseX <= newPlotButton.x + newPlotButton.w &&
        mouseY >= newPlotButton.y && mouseY <= newPlotButton.y + newPlotButton.h) {
        generateNewPlot();
        return;
    }

    // Check difficulty buttons
    for (let btn of difficultyButtons) {
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            difficulty = btn.type;
            generateNewPlot();
            return;
        }
    }
}

function mouseDragged() {
    if (draggingSlider && !hasGuessed) {
        updateSlider();
    }
}

function mouseReleased() {
    draggingSlider = false;
}

function updateSlider() {
    if (!hasGuessed) {
        userGuess = map(mouseX, sliderX, sliderX + sliderWidth, -1, 1);
        userGuess = constrain(userGuess, -1, 1);
        // Round to nearest 0.01
        userGuess = Math.round(userGuess * 100) / 100;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
    // Update slider width based on canvas width
    sliderWidth = min(300, canvasWidth - 300);
}
