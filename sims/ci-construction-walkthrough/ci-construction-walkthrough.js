// CI Construction Walkthrough MicroSim
// Step-by-step confidence interval calculator for proportions
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 470;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// Input values
let x = 124;  // Number of successes
let n = 200;  // Sample size
let confidenceLevel = 95;

// Current step (1-6)
let currentStep = 1;
let maxStep = 6;

// Z* values
let zStarValues = { 90: 1.645, 95: 1.960, 99: 2.576 };

// Input mode
let editingX = false;
let editingN = false;
let inputBuffer = '';

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaGreenLight = '#4CAF50';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    describe('Step-by-step confidence interval construction walkthrough for proportions', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area
    fill(sylviaCream);
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Confidence Interval Construction', canvasWidth / 2, 8);

    // Draw input panel
    drawInputPanel();

    // Draw step display
    drawSteps();

    // Draw number line visualization (if at step 6)
    if (currentStep >= 6) {
        drawNumberLine();
    }

    // Draw controls
    drawControls();

    // Instructions
    fill(100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Enter sample data, then step through the calculation process', canvasWidth / 2, drawHeight - 5);
}

function drawInputPanel() {
    let boxX = 15;
    let boxY = 35;
    let boxW = 200;
    let boxH = 95;

    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(boxX, boxY, boxW, boxH, 5);

    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    fill('black');
    text('Sample Data:', boxX + 10, boxY + 8);

    // X input
    textSize(11);
    text('Successes (x):', boxX + 10, boxY + 30);
    fill(editingX ? sylviaGreen : 230);
    stroke(editingX ? sylviaGreen : 150);
    strokeWeight(1);
    rect(boxX + 100, boxY + 26, 60, 20, 3);
    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    text(editingX ? inputBuffer + '|' : x.toString(), boxX + 130, boxY + 36);

    // N input
    textAlign(LEFT, TOP);
    text('Sample size (n):', boxX + 10, boxY + 55);
    fill(editingN ? sylviaGreen : 230);
    stroke(editingN ? sylviaGreen : 150);
    strokeWeight(1);
    rect(boxX + 110, boxY + 51, 60, 20, 3);
    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    text(editingN ? inputBuffer + '|' : n.toString(), boxX + 140, boxY + 61);

    // Confidence level buttons
    textAlign(LEFT, TOP);
    noStroke();
    text('Confidence:', boxX + 10, boxY + 78);
    let confLevels = [90, 95, 99];
    for (let i = 0; i < confLevels.length; i++) {
        let bx = boxX + 85 + i * 38;
        let isActive = confidenceLevel === confLevels[i];
        fill(isActive ? sylviaGreen : '#ccc');
        rect(bx, boxY + 75, 34, 16, 3);
        fill(isActive ? 'white' : 'black');
        textAlign(CENTER, CENTER);
        textSize(9);
        text(confLevels[i] + '%', bx + 17, boxY + 83);
    }
}

function drawSteps() {
    let stepX = 230;
    let stepY = 35;
    let stepW = canvasWidth - stepX - 15;
    let stepH = 290;

    // Background
    fill(255, 255, 255, 200);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(stepX, stepY, stepW, stepH, 5);

    // Calculate values
    let pHat = x / n;
    let zStar = zStarValues[confidenceLevel];
    let se = Math.sqrt(pHat * (1 - pHat) / n);
    let me = zStar * se;
    let lower = Math.max(0, pHat - me);
    let upper = Math.min(1, pHat + me);

    // Step headers and content
    let steps = [
        { title: 'Step 1: Check Conditions', show: currentStep >= 1 },
        { title: 'Step 2: Calculate Point Estimate', show: currentStep >= 2 },
        { title: 'Step 3: Find Critical Value', show: currentStep >= 3 },
        { title: 'Step 4: Calculate Standard Error', show: currentStep >= 4 },
        { title: 'Step 5: Calculate Margin of Error', show: currentStep >= 5 },
        { title: 'Step 6: Construct Interval', show: currentStep >= 6 }
    ];

    let yPos = stepY + 10;
    let lineHeight = 45;

    for (let i = 0; i < steps.length; i++) {
        let step = steps[i];

        // Step number circle
        fill(step.show ? sylviaGreen : '#ddd');
        noStroke();
        ellipse(stepX + 20, yPos + 10, 20, 20);
        fill('white');
        textAlign(CENTER, CENTER);
        textSize(11);
        text(i + 1, stepX + 20, yPos + 10);

        // Step title
        fill(step.show ? 'black' : '#aaa');
        textAlign(LEFT, TOP);
        textSize(11);
        text(step.title, stepX + 35, yPos + 3);

        // Step content (if shown)
        if (step.show) {
            fill(sylviaGreen);
            textSize(10);
            let content = getStepContent(i + 1, pHat, zStar, se, me, lower, upper);
            text(content, stepX + 35, yPos + 18);
        }

        yPos += lineHeight;
    }

    // Progress indicator
    fill(100);
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Step ' + currentStep + ' of ' + maxStep, stepX + stepW / 2, stepY + stepH - 5);
}

function getStepContent(step, pHat, zStar, se, me, lower, upper) {
    switch (step) {
        case 1:
            let successes = x;
            let failures = n - x;
            let check1 = successes >= 10 ? 'Yes' : 'No';
            let check2 = failures >= 10 ? 'Yes' : 'No';
            return 'np = ' + successes + ' >= 10? ' + check1 + ' | n(1-p) = ' + failures + ' >= 10? ' + check2;
        case 2:
            return 'p-hat = x/n = ' + x + '/' + n + ' = ' + pHat.toFixed(4);
        case 3:
            return 'For ' + confidenceLevel + '% confidence, z* = ' + zStar.toFixed(3);
        case 4:
            return 'SE = sqrt(' + pHat.toFixed(4) + ' x ' + (1 - pHat).toFixed(4) + ' / ' + n + ') = ' + se.toFixed(5);
        case 5:
            return 'ME = ' + zStar.toFixed(3) + ' x ' + se.toFixed(5) + ' = ' + me.toFixed(5);
        case 6:
            return '(' + pHat.toFixed(4) + ' - ' + me.toFixed(4) + ', ' + pHat.toFixed(4) + ' + ' + me.toFixed(4) + ') = (' + lower.toFixed(4) + ', ' + upper.toFixed(4) + ')';
        default:
            return '';
    }
}

function drawNumberLine() {
    let lineY = 380;
    let lineLeft = margin + 60;
    let lineRight = canvasWidth - margin - 60;

    // Calculate values
    let pHat = x / n;
    let zStar = zStarValues[confidenceLevel];
    let se = Math.sqrt(pHat * (1 - pHat) / n);
    let me = zStar * se;
    let lower = Math.max(0, pHat - me);
    let upper = Math.min(1, pHat + me);

    // Draw axis
    stroke(100);
    strokeWeight(2);
    line(lineLeft, lineY, lineRight, lineY);

    // Tick marks
    textAlign(CENTER, TOP);
    textSize(9);
    fill(100);
    for (let v = 0; v <= 1; v += 0.1) {
        let xPos = map(v, 0, 1, lineLeft, lineRight);
        stroke(100);
        strokeWeight(1);
        line(xPos, lineY - 4, xPos, lineY + 4);
        noStroke();
        text(v.toFixed(1), xPos, lineY + 6);
    }

    // Draw interval
    let lowerX = map(lower, 0, 1, lineLeft, lineRight);
    let upperX = map(upper, 0, 1, lineLeft, lineRight);
    let pHatX = map(pHat, 0, 1, lineLeft, lineRight);

    // Shaded region
    fill(sylviaGreen);
    fill(red(color(sylviaGreen)), green(color(sylviaGreen)), blue(color(sylviaGreen)), 100);
    noStroke();
    rect(lowerX, lineY - 20, upperX - lowerX, 40);

    // Interval line
    stroke(sylviaGreen);
    strokeWeight(4);
    line(lowerX, lineY, upperX, lineY);

    // Brackets
    strokeWeight(3);
    line(lowerX, lineY - 15, lowerX, lineY + 15);
    line(upperX, lineY - 15, upperX, lineY + 15);

    // Point estimate
    fill(sylviaAuburn);
    noStroke();
    ellipse(pHatX, lineY, 12, 12);

    // Labels
    fill(sylviaGreen);
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text(lower.toFixed(3), lowerX, lineY - 22);
    text(upper.toFixed(3), upperX, lineY - 22);

    fill(sylviaAuburn);
    textAlign(CENTER, TOP);
    text('p-hat = ' + pHat.toFixed(3), pHatX, lineY + 22);

    // Label
    fill('black');
    textAlign(CENTER, TOP);
    textSize(11);
    text(confidenceLevel + '% Confidence Interval for Population Proportion', (lineLeft + lineRight) / 2, lineY + 38);
}

function drawControls() {
    let y = drawHeight + 10;
    let btnH = 28;
    let btnW = 100;

    // Previous step
    let prevX = 15;
    fill(currentStep > 1 ? sylviaGreen : '#ccc');
    noStroke();
    rect(prevX, y, btnW, btnH, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(11);
    text('< Previous', prevX + btnW / 2, y + btnH / 2);

    // Next step
    let nextX = prevX + btnW + 10;
    fill(currentStep < maxStep ? sylviaGreen : '#ccc');
    rect(nextX, y, btnW, btnH, 4);
    fill('white');
    text('Next >', nextX + btnW / 2, y + btnH / 2);

    // Show all
    let allX = nextX + btnW + 20;
    fill(sylviaAuburn);
    rect(allX, y, btnW, btnH, 4);
    fill('white');
    text('Show All', allX + btnW / 2, y + btnH / 2);

    // New problem (random)
    let newX = allX + btnW + 10;
    fill('#666');
    rect(newX, y, btnW, btnH, 4);
    fill('white');
    text('Random Data', newX + btnW / 2, y + btnH / 2);

    // Reset
    let resetX = canvasWidth - 60;
    fill('#999');
    rect(resetX, y, 50, btnH, 4);
    fill('white');
    text('Reset', resetX + 25, y + btnH / 2);
}

function mousePressed() {
    // Check input fields
    let boxX = 15;
    let boxY = 35;

    // X input field
    if (mouseX >= boxX + 100 && mouseX <= boxX + 160 &&
        mouseY >= boxY + 26 && mouseY <= boxY + 46) {
        editingX = true;
        editingN = false;
        inputBuffer = x.toString();
        return;
    }

    // N input field
    if (mouseX >= boxX + 110 && mouseX <= boxX + 170 &&
        mouseY >= boxY + 51 && mouseY <= boxY + 71) {
        editingN = true;
        editingX = false;
        inputBuffer = n.toString();
        return;
    }

    // Confidence level buttons
    let confLevels = [90, 95, 99];
    for (let i = 0; i < confLevels.length; i++) {
        let bx = boxX + 85 + i * 38;
        if (mouseX >= bx && mouseX <= bx + 34 &&
            mouseY >= boxY + 75 && mouseY <= boxY + 91) {
            confidenceLevel = confLevels[i];
            return;
        }
    }

    // Clear editing mode if clicking elsewhere in input panel
    editingX = false;
    editingN = false;

    // Check control buttons
    let y = drawHeight + 10;
    let btnH = 28;
    let btnW = 100;

    // Previous
    let prevX = 15;
    if (mouseX >= prevX && mouseX <= prevX + btnW &&
        mouseY >= y && mouseY <= y + btnH && currentStep > 1) {
        currentStep--;
        return;
    }

    // Next
    let nextX = prevX + btnW + 10;
    if (mouseX >= nextX && mouseX <= nextX + btnW &&
        mouseY >= y && mouseY <= y + btnH && currentStep < maxStep) {
        currentStep++;
        return;
    }

    // Show All
    let allX = nextX + btnW + 20;
    if (mouseX >= allX && mouseX <= allX + btnW &&
        mouseY >= y && mouseY <= y + btnH) {
        currentStep = maxStep;
        return;
    }

    // New Problem
    let newX = allX + btnW + 10;
    if (mouseX >= newX && mouseX <= newX + btnW &&
        mouseY >= y && mouseY <= y + btnH) {
        generateRandomProblem();
        return;
    }

    // Reset
    let resetX = canvasWidth - 60;
    if (mouseX >= resetX && mouseX <= resetX + 50 &&
        mouseY >= y && mouseY <= y + btnH) {
        currentStep = 1;
        x = 124;
        n = 200;
        confidenceLevel = 95;
        return;
    }
}

function generateRandomProblem() {
    // Generate random but realistic sample data
    n = floor(random(50, 300));
    let trueProp = random(0.2, 0.8);
    x = floor(n * trueProp + random(-5, 5));
    x = constrain(x, 10, n - 10);  // Ensure conditions are met
    currentStep = 1;
}

function keyPressed() {
    if (editingX || editingN) {
        if (keyCode === BACKSPACE) {
            inputBuffer = inputBuffer.slice(0, -1);
        } else if (keyCode === ENTER || keyCode === RETURN) {
            let val = parseInt(inputBuffer);
            if (!isNaN(val) && val > 0) {
                if (editingX) {
                    x = min(val, n);
                } else {
                    n = max(val, x);
                }
            }
            editingX = false;
            editingN = false;
        } else if (key >= '0' && key <= '9' && inputBuffer.length < 5) {
            inputBuffer += key;
        }
        return false;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
