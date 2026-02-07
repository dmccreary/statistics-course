// Discrete vs Continuous Number Line MicroSim
// Learning Objective: Students will distinguish between discrete and continuous
// variables by visualizing how values can be plotted on a number line.
// Bloom Level: Understand (L2), Bloom Verb: compare
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 600;
let drawHeight = 250;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 40;
let defaultTextSize = 16;

// Number line parameters
let discreteY = 90;      // Y position of discrete number line
let continuousY = 190;   // Y position of continuous number line
let lineStartX;          // Calculated based on canvas width
let lineEndX;            // Calculated based on canvas width
let lineLength;          // Calculated based on canvas width

// Discrete range: 0-10 (Number of Pets)
let discreteMin = 0;
let discreteMax = 10;

// Continuous range: 60-72 (Height in Inches)
let continuousMin = 60;
let continuousMax = 72;

// User placed markers
let discreteMarkers = [];    // Array of integer values
let continuousMarkers = [];  // Array of {value, x} objects

// Display value for feedback
let lastClickedValue = null;
let lastClickedType = null;  // 'discrete' or 'continuous'
let feedbackTimer = 0;

// Snap feedback animation
let snapAnimation = null;

// UI Controls
let resetButton;
let showExamplesCheckbox;
let showExamples = false;

// Example values
let discreteExamples = [2, 5, 8];
let continuousExamples = [62.35, 66.78, 70.12];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    // Create Reset button using canvas-based controls (handled in draw/mousePressed)
    // Create Show Examples checkbox using canvas-based controls (handled in draw/mousePressed)

    describe('Interactive number line comparison showing discrete (integers only) vs continuous (any value) variables. Click on the top line to place markers on integer pet counts, click on the bottom line to place markers at any height value.', LABEL);
}

function draw() {
    updateCanvasSize();
    updateLinePositions();

    // Drawing area background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text('Discrete vs Continuous Number Lines', canvasWidth / 2, 10);

    // Draw the two number lines
    drawDiscreteNumberLine();
    drawContinuousNumberLine();

    // Draw user markers
    drawMarkers();

    // Draw example values if enabled
    if (showExamples) {
        drawExamples();
    }

    // Draw snap feedback animation
    if (snapAnimation) {
        drawSnapAnimation();
    }

    // Draw value display
    drawValueDisplay();

    // Draw control area
    drawControls();

    // Update feedback timer
    if (feedbackTimer > 0) {
        feedbackTimer--;
    }
}

function updateLinePositions() {
    lineStartX = margin + 30;
    lineEndX = canvasWidth - margin - 30;
    lineLength = lineEndX - lineStartX;
}

function drawDiscreteNumberLine() {
    // Label
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text('Discrete: Number of Pets', lineStartX, discreteY - 30);

    // Main line
    stroke(50, 100, 150);
    strokeWeight(3);
    line(lineStartX, discreteY, lineEndX, discreteY);

    // Draw integer tick marks and labels
    textAlign(CENTER, TOP);
    textSize(12);
    for (let i = discreteMin; i <= discreteMax; i++) {
        let x = map(i, discreteMin, discreteMax, lineStartX, lineEndX);

        // Tick mark
        stroke(50, 100, 150);
        strokeWeight(2);
        line(x, discreteY - 8, x, discreteY + 8);

        // Clickable dot at each integer
        fill(100, 150, 200);
        stroke(50, 100, 150);
        strokeWeight(1);
        circle(x, discreteY, 16);

        // Label
        fill('black');
        noStroke();
        text(i, x, discreteY + 15);
    }
}

function drawContinuousNumberLine() {
    // Label
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text('Continuous: Height in Inches', lineStartX, continuousY - 30);

    // Gradient bar background
    noStroke();
    for (let x = lineStartX; x <= lineEndX; x++) {
        let t = map(x, lineStartX, lineEndX, 0, 1);
        // Gradient from light blue to darker blue
        let c = lerpColor(color(180, 210, 240), color(80, 140, 200), t);
        fill(c);
        rect(x, continuousY - 10, 1, 20);
    }

    // Border around gradient
    noFill();
    stroke(50, 100, 150);
    strokeWeight(2);
    rect(lineStartX, continuousY - 10, lineLength, 20, 3);

    // Draw tick marks and labels at key points
    textAlign(CENTER, TOP);
    textSize(12);
    fill('black');
    for (let i = continuousMin; i <= continuousMax; i += 2) {
        let x = map(i, continuousMin, continuousMax, lineStartX, lineEndX);

        // Tick mark
        stroke(50, 100, 150);
        strokeWeight(2);
        line(x, continuousY + 10, x, continuousY + 18);

        // Label
        fill('black');
        noStroke();
        text(i, x, continuousY + 22);
    }
}

function drawMarkers() {
    // Draw discrete markers
    for (let val of discreteMarkers) {
        let x = map(val, discreteMin, discreteMax, lineStartX, lineEndX);

        // Marker triangle pointing down
        fill(220, 80, 80);
        stroke(180, 40, 40);
        strokeWeight(2);
        triangle(x - 8, discreteY - 20, x + 8, discreteY - 20, x, discreteY - 8);

        // Small circle at the point
        fill(220, 80, 80);
        circle(x, discreteY, 8);
    }

    // Draw continuous markers
    for (let marker of continuousMarkers) {
        let x = marker.x;

        // Marker triangle pointing down
        fill(80, 180, 80);
        stroke(40, 140, 40);
        strokeWeight(2);
        triangle(x - 8, continuousY - 22, x + 8, continuousY - 22, x, continuousY - 12);

        // Vertical line to show exact position
        stroke(40, 140, 40);
        strokeWeight(2);
        line(x, continuousY - 12, x, continuousY + 10);
    }
}

function drawExamples() {
    // Draw discrete examples (small blue squares)
    for (let val of discreteExamples) {
        let x = map(val, discreteMin, discreteMax, lineStartX, lineEndX);
        fill(100, 100, 220, 150);
        stroke(60, 60, 180);
        strokeWeight(1);
        rectMode(CENTER);
        rect(x, discreteY, 10, 10);
        rectMode(CORNER);
    }

    // Draw continuous examples (small green diamonds)
    for (let val of continuousExamples) {
        let x = map(val, continuousMin, continuousMax, lineStartX, lineEndX);
        fill(100, 220, 100, 150);
        stroke(60, 180, 60);
        strokeWeight(1);
        push();
        translate(x, continuousY);
        rotate(PI / 4);
        rectMode(CENTER);
        rect(0, 0, 8, 8);
        rectMode(CORNER);
        pop();
    }
}

function drawSnapAnimation() {
    if (snapAnimation.frames > 0) {
        let alpha = map(snapAnimation.frames, 0, 20, 0, 200);

        // Draw arc showing snap
        noFill();
        stroke(255, 150, 50, alpha);
        strokeWeight(3);

        // Animate from original click to snapped position
        let progress = map(snapAnimation.frames, 20, 0, 0, 1);
        let currentX = lerp(snapAnimation.startX, snapAnimation.endX, min(progress * 2, 1));

        if (progress < 0.5) {
            // Draw moving indicator
            fill(255, 200, 100, alpha);
            noStroke();
            circle(currentX, discreteY, 12);
        }

        snapAnimation.frames--;
        if (snapAnimation.frames <= 0) {
            snapAnimation = null;
        }
    }
}

function drawValueDisplay() {
    if (lastClickedValue !== null && feedbackTimer > 0) {
        // Display box
        let displayX = canvasWidth / 2;
        let displayY = 45;

        let valueText;
        let typeText;
        let bgColor;

        if (lastClickedType === 'discrete') {
            valueText = lastClickedValue.toString();
            typeText = 'pets';
            bgColor = color(220, 80, 80, 220);
        } else {
            valueText = lastClickedValue.toFixed(2);
            typeText = 'inches';
            bgColor = color(80, 180, 80, 220);
        }

        let fullText = 'Value: ' + valueText + ' ' + typeText;

        // Background box
        textSize(16);
        let boxWidth = textWidth(fullText) + 30;
        fill(bgColor);
        stroke(100);
        strokeWeight(1);
        rectMode(CENTER);
        rect(displayX, displayY, boxWidth, 28, 5);
        rectMode(CORNER);

        // Text
        fill('white');
        noStroke();
        textAlign(CENTER, CENTER);
        text(fullText, displayX, displayY);
    }
}

function drawControls() {
    // Reset button
    let resetX = 15;
    let resetY = drawHeight + 12;
    let resetW = 70;
    let resetH = 28;

    // Button background
    fill(isMouseOverRect(resetX, resetY, resetW, resetH) ? color(220, 220, 240) : color(240, 240, 250));
    stroke(150);
    strokeWeight(1);
    rect(resetX, resetY, resetW, resetH, 5);

    // Button text
    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Reset', resetX + resetW/2, resetY + resetH/2);

    // Show Examples checkbox
    let checkX = 110;
    let checkY = drawHeight + 18;
    let checkSize = 18;

    // Checkbox box
    fill(showExamples ? color(100, 150, 200) : 'white');
    stroke(100);
    strokeWeight(1);
    rect(checkX, checkY, checkSize, checkSize, 3);

    // Checkmark if checked
    if (showExamples) {
        stroke('white');
        strokeWeight(2);
        line(checkX + 4, checkY + 9, checkX + 7, checkY + 13);
        line(checkX + 7, checkY + 13, checkX + 14, checkY + 5);
    }

    // Checkbox label
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text('Show Examples', checkX + checkSize + 8, checkY + checkSize/2);

    // Instructions
    textSize(12);
    fill(100);
    textAlign(RIGHT, CENTER);
    text('Click on either number line to place markers', canvasWidth - 20, drawHeight + 26);
}

function isMouseOverRect(x, y, w, h) {
    return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

function mousePressed() {
    // Check Reset button
    let resetX = 15;
    let resetY = drawHeight + 12;
    let resetW = 70;
    let resetH = 28;

    if (isMouseOverRect(resetX, resetY, resetW, resetH)) {
        discreteMarkers = [];
        continuousMarkers = [];
        lastClickedValue = null;
        feedbackTimer = 0;
        return;
    }

    // Check Show Examples checkbox
    let checkX = 110;
    let checkY = drawHeight + 18;
    let checkSize = 18;

    if (isMouseOverRect(checkX, checkY, checkSize + 100, checkSize)) {
        showExamples = !showExamples;
        return;
    }

    // Check if click is in drawing area
    if (mouseY >= drawHeight) return;

    // Check discrete number line click (within vertical range)
    if (mouseY >= discreteY - 20 && mouseY <= discreteY + 25) {
        if (mouseX >= lineStartX && mouseX <= lineEndX) {
            // Map click to value
            let rawValue = map(mouseX, lineStartX, lineEndX, discreteMin, discreteMax);
            // Snap to nearest integer
            let snappedValue = round(rawValue);
            snappedValue = constrain(snappedValue, discreteMin, discreteMax);

            // Create snap animation if value was snapped
            let snappedX = map(snappedValue, discreteMin, discreteMax, lineStartX, lineEndX);
            if (abs(mouseX - snappedX) > 5) {
                snapAnimation = {
                    startX: mouseX,
                    endX: snappedX,
                    frames: 20
                };
            }

            // Add marker if not already there
            if (!discreteMarkers.includes(snappedValue)) {
                discreteMarkers.push(snappedValue);
            }

            lastClickedValue = snappedValue;
            lastClickedType = 'discrete';
            feedbackTimer = 120; // 2 seconds at 60fps
        }
    }

    // Check continuous number line click (within vertical range)
    if (mouseY >= continuousY - 20 && mouseY <= continuousY + 25) {
        if (mouseX >= lineStartX && mouseX <= lineEndX) {
            // Map click to exact value
            let exactValue = map(mouseX, lineStartX, lineEndX, continuousMin, continuousMax);

            // Add marker at exact position
            continuousMarkers.push({
                value: exactValue,
                x: mouseX
            });

            lastClickedValue = exactValue;
            lastClickedType = 'continuous';
            feedbackTimer = 120;
        }
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    // Recalculate continuous marker positions based on their values
    for (let marker of continuousMarkers) {
        marker.x = map(marker.value, continuousMin, continuousMax, lineStartX, lineEndX);
    }
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
