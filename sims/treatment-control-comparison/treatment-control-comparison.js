// Treatment vs Control Comparison MicroSim
// Demonstrates why control groups are necessary for valid experimental conclusions
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 650;
let drawHeight = 350;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 20;
let defaultTextSize = 12;

// Stage control (4 stages of revelation)
let currentStage = 1;
let maxStage = 4;

// Data for demonstration
let treatmentBefore = 70;
let treatmentAfter = 78;
let controlBefore = 70;
let controlAfter = 76;

// Animation
let animationProgress = 1; // 0 to 1
let isAnimating = false;
let animationSpeed = 0.03;

// Show confounds toggle
let showConfounds = false;

// Button positions
let stepButtonX, resetButtonX, confoundsButtonX;
let buttonWidth = 100;
let buttonHeight = 28;

// Colors
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';
let treatmentColor;
let controlColor;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    treatmentColor = color(46, 125, 50);
    controlColor = color(100, 149, 237);

    describe('Step-through visualization showing why control groups are necessary. Reveals how apparent treatment effects can be misleading without proper comparison.', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area background
    fill(252, 252, 255);
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill(245, 245, 250);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill(30, 60, 100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(16);
    textStyle(BOLD);
    text('Why Control Groups Matter', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Stage indicator
    textSize(12);
    fill(100);
    text('Stage ' + currentStage + ' of ' + maxStage, canvasWidth / 2, 28);

    // Draw main visualization based on stage
    drawVisualization();

    // Draw stage explanation
    drawExplanation();

    // Draw confounds panel if toggled
    if (showConfounds && currentStage >= 3) {
        drawConfoundsPanel();
    }

    // Update animation
    if (isAnimating) {
        animationProgress += animationSpeed;
        if (animationProgress >= 1) {
            animationProgress = 1;
            isAnimating = false;
        }
    }

    // Draw controls
    drawControls();
}

function drawVisualization() {
    let chartTop = 55;
    let chartHeight = 150;
    let chartBottom = chartTop + chartHeight;
    let barWidth = 45;

    // Timeline areas
    let treatmentX = canvasWidth * 0.25;
    let controlX = canvasWidth * 0.65;
    let beforeX = -60;
    let afterX = 30;

    // Y-axis scale
    let minScore = 60;
    let maxScore = 90;
    let scaleHeight = chartHeight / (maxScore - minScore);

    // Draw y-axis
    stroke(150);
    strokeWeight(1);
    line(margin + 30, chartTop, margin + 30, chartBottom);

    // Y-axis labels
    fill(100);
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(10);
    for (let score = minScore; score <= maxScore; score += 10) {
        let y = chartBottom - (score - minScore) * scaleHeight;
        text(score, margin + 25, y);
        stroke(230);
        strokeWeight(1);
        line(margin + 32, y, canvasWidth - margin, y);
        noStroke();
    }

    // Y-axis title
    push();
    translate(margin + 5, chartTop + chartHeight / 2);
    rotate(-PI / 2);
    textAlign(CENTER, CENTER);
    text('Test Score', 0, 0);
    pop();

    // Group labels
    textAlign(CENTER, TOP);
    textSize(13);
    textStyle(BOLD);
    fill(treatmentColor);
    text('Treatment Group', treatmentX, chartTop - 15);

    if (currentStage >= 3) {
        fill(controlColor);
        let alpha = currentStage === 3 ? animationProgress : 1;
        fill(100, 149, 237, alpha * 255);
        text('Control Group', controlX, chartTop - 15);
    }
    textStyle(NORMAL);

    // Draw Treatment Group bars
    drawBarPair(treatmentX, chartTop, chartBottom, scaleHeight, minScore,
        treatmentBefore, treatmentAfter, treatmentColor, currentStage >= 2);

    // Draw Control Group bars (stages 3+)
    if (currentStage >= 3) {
        let alpha = currentStage === 3 && isAnimating ? animationProgress : 1;
        let cColor = color(100, 149, 237, alpha * 255);
        drawBarPair(controlX, chartTop, chartBottom, scaleHeight, minScore,
            controlBefore, controlAfter, cColor, true);
    }

    // Draw time labels
    textAlign(CENTER, TOP);
    textSize(10);
    fill(100);
    text('Before', treatmentX - 30, chartBottom + 5);
    text('After', treatmentX + 30, chartBottom + 5);

    if (currentStage >= 3) {
        text('Before', controlX - 30, chartBottom + 5);
        text('After', controlX + 30, chartBottom + 5);
    }

    // Draw improvement arrows and labels
    if (currentStage >= 2) {
        drawImprovement(treatmentX, chartTop, chartBottom, scaleHeight, minScore,
            treatmentBefore, treatmentAfter, treatmentColor, '+8 points');
    }

    if (currentStage >= 3) {
        let alpha = currentStage === 3 && isAnimating ? animationProgress : 1;
        let cColor = color(100, 149, 237, alpha * 255);
        drawImprovement(controlX, chartTop, chartBottom, scaleHeight, minScore,
            controlBefore, controlAfter, cColor, '+6 points');
    }

    // Draw true effect calculation (stage 4)
    if (currentStage >= 4) {
        drawTrueEffectPanel(chartBottom + 30);
    }
}

function drawBarPair(centerX, chartTop, chartBottom, scaleHeight, minScore,
    beforeVal, afterVal, barColor, showAfter) {
    let barWidth = 40;
    let beforeX = centerX - 30;
    let afterX = centerX + 30;

    // Before bar
    let beforeHeight = (beforeVal - minScore) * scaleHeight;
    fill(barColor);
    stroke(red(barColor) * 0.7, green(barColor) * 0.7, blue(barColor) * 0.7);
    strokeWeight(1);
    rect(beforeX - barWidth / 2, chartBottom - beforeHeight, barWidth, beforeHeight);

    // Before value label
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text(beforeVal, beforeX, chartBottom - beforeHeight / 2);
    textStyle(NORMAL);

    // After bar
    if (showAfter) {
        let afterHeight = (afterVal - minScore) * scaleHeight;
        fill(barColor);
        stroke(red(barColor) * 0.7, green(barColor) * 0.7, blue(barColor) * 0.7);
        strokeWeight(1);
        rect(afterX - barWidth / 2, chartBottom - afterHeight, barWidth, afterHeight);

        // After value label
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);
        textStyle(BOLD);
        text(afterVal, afterX, chartBottom - afterHeight / 2);
        textStyle(NORMAL);
    }
}

function drawImprovement(centerX, chartTop, chartBottom, scaleHeight, minScore,
    beforeVal, afterVal, arrowColor, label) {
    let beforeY = chartBottom - (beforeVal - minScore) * scaleHeight;
    let afterY = chartBottom - (afterVal - minScore) * scaleHeight;

    // Arrow
    stroke(arrowColor);
    strokeWeight(2);
    let arrowX = centerX + 70;
    line(arrowX, beforeY, arrowX, afterY);

    // Arrowhead
    let arrowSize = 6;
    line(arrowX - arrowSize, afterY + arrowSize, arrowX, afterY);
    line(arrowX + arrowSize, afterY + arrowSize, arrowX, afterY);

    // Label
    fill(arrowColor);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    textStyle(BOLD);
    text(label, arrowX + 8, (beforeY + afterY) / 2);
    textStyle(NORMAL);
}

function drawTrueEffectPanel(y) {
    let panelWidth = 350;
    let panelHeight = 60;
    let panelX = (canvasWidth - panelWidth) / 2;

    // Panel background
    fill(255, 248, 225);
    stroke(sylviaAuburn);
    strokeWeight(2);
    rect(panelX, y, panelWidth, panelHeight, 5);

    // Calculation
    fill(30);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(BOLD);
    text('True Treatment Effect', panelX + panelWidth / 2, y + 8);
    textStyle(NORMAL);

    textSize(11);
    text('Treatment Improvement - Control Improvement = True Effect', panelX + panelWidth / 2, y + 25);

    fill(sylviaAuburn);
    textStyle(BOLD);
    textSize(13);
    text('8 points - 6 points = 2 points (not 8!)', panelX + panelWidth / 2, y + 42);
    textStyle(NORMAL);
}

function drawExplanation() {
    let expY = drawHeight - 55;
    let expHeight = 50;

    fill(245, 245, 250);
    stroke(200);
    strokeWeight(1);
    rect(margin, expY, canvasWidth - margin * 2, expHeight, 5);

    fill(30);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);

    let explanations = [
        "Stage 1: We see the Treatment Group's 'Before' scores (average: 70 points).",
        "Stage 2: After treatment, scores improved to 78 points. Wow, +8 points! The treatment works... right?",
        "Stage 3: Wait! The Control Group (no treatment) ALSO improved by 6 points. Something else is going on.",
        "Stage 4: The TRUE treatment effect is only 2 points. The rest was natural improvement that would happen anyway!"
    ];

    text(explanations[currentStage - 1], margin + 10, expY + 8, canvasWidth - margin * 2 - 20, expHeight - 16);
}

function drawConfoundsPanel() {
    let panelWidth = 180;
    let panelHeight = 100;
    let panelX = canvasWidth - panelWidth - 15;
    let panelY = 50;

    fill(255, 240, 240);
    stroke(180, 100, 100);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 5);

    fill(150, 50, 50);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Possible Confounds:', panelX + 8, panelY + 8);
    textStyle(NORMAL);

    textSize(10);
    fill(80);
    let confounds = [
        '- Natural learning over time',
        '- Practice effect from testing',
        '- Increased motivation',
        '- Seasonal factors',
        '- Regression to the mean'
    ];

    for (let i = 0; i < confounds.length; i++) {
        text(confounds[i], panelX + 8, panelY + 25 + i * 14);
    }
}

function drawControls() {
    stepButtonX = margin;
    resetButtonX = margin + buttonWidth + 10;
    confoundsButtonX = margin + (buttonWidth + 10) * 2;

    let buttonY = drawHeight + 11;

    // Step button
    if (currentStage < maxStage) {
        fill(80, 150, 80);
        stroke(60, 120, 60);
    } else {
        fill(180);
        stroke(150);
    }
    strokeWeight(1);
    rect(stepButtonX, buttonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(currentStage < maxStage ? 'Next Stage' : 'Complete', stepButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);

    // Reset button
    fill(180, 100, 80);
    stroke(150, 80, 60);
    strokeWeight(1);
    rect(resetButtonX, buttonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    text('Reset', resetButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);

    // Show Confounds toggle (only after stage 3)
    if (currentStage >= 3) {
        if (showConfounds) {
            fill(100, 130, 180);
            stroke(70, 100, 150);
        } else {
            fill(150);
            stroke(120);
        }
        strokeWeight(1);
        rect(confoundsButtonX, buttonY, buttonWidth + 20, buttonHeight, 5);

        fill(255);
        noStroke();
        text(showConfounds ? 'Hide Confounds' : 'Show Confounds', confoundsButtonX + (buttonWidth + 20) / 2, buttonY + buttonHeight / 2);
    }
}

function mousePressed() {
    let buttonY = drawHeight + 11;

    // Step button
    if (mouseX >= stepButtonX && mouseX <= stepButtonX + buttonWidth &&
        mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
        if (currentStage < maxStage) {
            currentStage++;
            animationProgress = 0;
            isAnimating = true;
        }
        return;
    }

    // Reset button
    if (mouseX >= resetButtonX && mouseX <= resetButtonX + buttonWidth &&
        mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
        currentStage = 1;
        showConfounds = false;
        animationProgress = 1;
        isAnimating = false;
        return;
    }

    // Confounds toggle
    if (currentStage >= 3 &&
        mouseX >= confoundsButtonX && mouseX <= confoundsButtonX + buttonWidth + 20 &&
        mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
        showConfounds = !showConfounds;
        return;
    }
}

function keyPressed() {
    if (key === ' ' && currentStage < maxStage) {
        currentStage++;
        animationProgress = 0;
        isAnimating = true;
        return false;
    }
    if (key === 'r' || key === 'R') {
        currentStage = 1;
        showConfounds = false;
        animationProgress = 1;
        isAnimating = false;
        return false;
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
    canvasWidth = min(containerWidth, 700);
    if (canvasWidth < 550) canvasWidth = 550;
}
