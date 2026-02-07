// Test Statistic Calculator MicroSim
// Calculate z-test statistics for one-proportion hypothesis tests
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let margin = 25;
let defaultTextSize = 16;

// Input values
let sampleSize = 200;
let successes = 114;
let hypothesizedP = 0.5;

// Computed values
let sampleP = 0;
let standardError = 0;
let zScore = 0;

// UI state
let draggingP0 = false;
let showSteps = true;

// Input field bounds
let nInputBounds = { x: 0, y: 0, w: 80, h: 28 };
let xInputBounds = { x: 0, y: 0, w: 80, h: 28 };

// Editing state
let editingN = false;
let editingX = false;
let inputN = '';
let inputX = '';

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
    calculateValues();

    describe('Interactive test statistic calculator for one-proportion z-tests', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area
    fill('aliceblue');
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
    textSize(20);
    text('Test Statistic Calculator', canvasWidth / 2, 8);

    // Draw components
    drawInputPanel();
    drawFormulaDisplay();
    drawNormalCurve();
    drawZScoreIndicator();
    drawConditionsCheck();
    drawControls();
}

function calculateValues() {
    sampleP = successes / sampleSize;
    standardError = Math.sqrt((hypothesizedP * (1 - hypothesizedP)) / sampleSize);
    zScore = (sampleP - hypothesizedP) / standardError;
}

function drawInputPanel() {
    let panelX = margin;
    let panelY = 40;
    let panelW = 200;
    let panelH = 160;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(panelX, panelY, panelW, panelH, 8);

    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Input Data', panelX + panelW/2, panelY + 8);

    textAlign(LEFT, TOP);
    textSize(13);

    // Sample size n
    let yPos = panelY + 35;
    fill(80);
    text('Sample size (n):', panelX + 15, yPos);

    nInputBounds = { x: panelX + 130, y: yPos - 3, w: 55, h: 24 };
    fill(editingN ? '#ffffcc' : 'white');
    stroke(editingN ? sylviaAuburn : '#ccc');
    strokeWeight(1);
    rect(nInputBounds.x, nInputBounds.y, nInputBounds.w, nInputBounds.h, 3);

    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    if (editingN) {
        text(inputN + '|', nInputBounds.x + nInputBounds.w/2, nInputBounds.y + nInputBounds.h/2);
    } else {
        text(sampleSize.toString(), nInputBounds.x + nInputBounds.w/2, nInputBounds.y + nInputBounds.h/2);
    }

    // Successes x
    yPos += 35;
    textAlign(LEFT, TOP);
    fill(80);
    text('Successes (x):', panelX + 15, yPos);

    xInputBounds = { x: panelX + 130, y: yPos - 3, w: 55, h: 24 };
    fill(editingX ? '#ffffcc' : 'white');
    stroke(editingX ? sylviaAuburn : '#ccc');
    strokeWeight(1);
    rect(xInputBounds.x, xInputBounds.y, xInputBounds.w, xInputBounds.h, 3);

    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    if (editingX) {
        text(inputX + '|', xInputBounds.x + xInputBounds.w/2, xInputBounds.y + xInputBounds.h/2);
    } else {
        text(successes.toString(), xInputBounds.x + xInputBounds.w/2, xInputBounds.y + xInputBounds.h/2);
    }

    // Hypothesized p0
    yPos += 35;
    textAlign(LEFT, TOP);
    fill(80);
    text('H₀ proportion (p₀):', panelX + 15, yPos);
    textAlign(LEFT, TOP);
    fill(sylviaGreen);
    text(hypothesizedP.toFixed(2), panelX + 145, yPos);

    // p0 slider
    yPos += 22;
    fill(220);
    noStroke();
    rect(panelX + 15, yPos, panelW - 30, 10, 5);

    let sliderPos = map(hypothesizedP, 0.01, 0.99, panelX + 15, panelX + panelW - 15);
    fill(sylviaGreen);
    ellipse(sliderPos, yPos + 5, 16, 16);

    // Sample proportion display
    yPos += 25;
    fill(80);
    noStroke();
    textAlign(LEFT, TOP);
    text('p̂ = ' + sampleP.toFixed(4), panelX + 15, yPos);
}

function drawFormulaDisplay() {
    let panelX = margin + 220;
    let panelY = 40;
    let panelW = 280;
    let panelH = 160;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(panelX, panelY, panelW, panelH, 8);

    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Calculation Steps', panelX + panelW/2, panelY + 8);

    if (showSteps) {
        textSize(12);
        textAlign(LEFT, TOP);

        // Formula
        let yPos = panelY + 35;
        fill(80);
        text('Formula:', panelX + 15, yPos);
        fill(sylviaGreen);
        textSize(14);
        text('z = (p̂ - p₀) / √(p₀(1-p₀)/n)', panelX + 75, yPos);

        // Standard error
        yPos += 28;
        textSize(12);
        fill(80);
        text('SE =', panelX + 15, yPos);
        fill('black');
        let seFormula = '√(' + hypothesizedP.toFixed(2) + '×' + (1-hypothesizedP).toFixed(2) + '/' + sampleSize + ')';
        text(seFormula + ' = ' + standardError.toFixed(4), panelX + 45, yPos);

        // Numerator
        yPos += 25;
        fill(80);
        text('Diff =', panelX + 15, yPos);
        fill('black');
        text(sampleP.toFixed(4) + ' - ' + hypothesizedP.toFixed(2) + ' = ' + (sampleP - hypothesizedP).toFixed(4), panelX + 55, yPos);

        // Final z
        yPos += 28;
        fill(80);
        text('z =', panelX + 15, yPos);
        fill(sylviaAuburn);
        textSize(18);
        text((sampleP - hypothesizedP).toFixed(4) + ' / ' + standardError.toFixed(4), panelX + 40, yPos - 2);

        // Result
        yPos += 30;
        fill(sylviaGreen);
        textSize(22);
        textAlign(CENTER, TOP);
        text('z = ' + zScore.toFixed(3), panelX + panelW/2, yPos);
    }
}

function drawNormalCurve() {
    let curveX = canvasWidth - 280;
    let curveY = 50;
    let curveW = 250;
    let curveH = 150;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(curveX - 10, curveY - 10, curveW + 20, curveH + 50, 8);

    // Draw normal curve
    let left = curveX;
    let right = curveX + curveW;
    let bottom = curveY + curveH;
    let top = curveY + 20;

    // Axis
    stroke(100);
    strokeWeight(1);
    line(left, bottom, right, bottom);

    // Curve
    stroke(sylviaGreen);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let px = left; px <= right; px++) {
        let z = map(px, left, right, -4, 4);
        let density = Math.exp(-0.5 * z * z);
        let y = map(density, 0, 1.1, bottom, top);
        vertex(px, y);
    }
    endShape();

    // Z-score labels
    textAlign(CENTER, TOP);
    textSize(10);
    fill(100);
    noStroke();
    for (let z = -3; z <= 3; z++) {
        let zx = map(z, -4, 4, left, right);
        stroke(150);
        strokeWeight(1);
        line(zx, bottom, zx, bottom + 4);
        noStroke();
        text(z.toString(), zx, bottom + 6);
    }

    // Mark z-score position
    let zX = map(constrain(zScore, -4, 4), -4, 4, left, right);

    stroke(sylviaAuburn);
    strokeWeight(2);
    let zDensity = Math.exp(-0.5 * Math.pow(constrain(zScore, -4, 4), 2));
    let zY = map(zDensity, 0, 1.1, bottom, top);
    line(zX, bottom, zX, zY);

    fill(sylviaAuburn);
    noStroke();
    ellipse(zX, zY, 10, 10);

    // Z label
    textAlign(CENTER, BOTTOM);
    textSize(12);
    fill(sylviaAuburn);
    text('z = ' + zScore.toFixed(2), zX, zY - 8);
}

function drawZScoreIndicator() {
    let indicatorX = margin;
    let indicatorY = 210;
    let indicatorW = canvasWidth - 2 * margin;
    let indicatorH = 60;

    // Background
    fill(sylviaCream);
    stroke(sylviaGreen);
    strokeWeight(1);
    rect(indicatorX, indicatorY, indicatorW, indicatorH, 5);

    // Color-coded interpretation
    let absZ = Math.abs(zScore);
    let interpretColor, interpretText;

    if (absZ < 1) {
        interpretColor = '#4CAF50'; // Green - not extreme
        interpretText = 'Not unusual (within 1 SD)';
    } else if (absZ < 2) {
        interpretColor = '#FFC107'; // Yellow - somewhat unusual
        interpretText = 'Somewhat unusual (1-2 SDs)';
    } else if (absZ < 3) {
        interpretColor = '#FF9800'; // Orange - unusual
        interpretText = 'Unusual (2-3 SDs from expected)';
    } else {
        interpretColor = '#F44336'; // Red - very extreme
        interpretText = 'Very unusual (>3 SDs from expected)';
    }

    // Color indicator bar
    fill(interpretColor);
    noStroke();
    rect(indicatorX + 10, indicatorY + 10, 8, indicatorH - 20, 4);

    // Main interpretation text
    fill('black');
    textAlign(LEFT, TOP);
    textSize(14);
    text('Interpretation:', indicatorX + 30, indicatorY + 10);

    fill(interpretColor);
    textSize(16);
    text(interpretText, indicatorX + 130, indicatorY + 8);

    // Detailed explanation
    fill(80);
    textSize(12);
    let direction = zScore > 0 ? 'above' : 'below';
    if (Math.abs(zScore) < 0.01) direction = 'at';
    text('The sample proportion (' + sampleP.toFixed(4) + ') is ' + Math.abs(zScore).toFixed(2) +
         ' standard errors ' + direction + ' the hypothesized value (' + hypothesizedP.toFixed(2) + ').',
         indicatorX + 30, indicatorY + 35);
}

function drawConditionsCheck() {
    let checkX = margin;
    let checkY = 280;
    let checkW = 250;
    let checkH = 120;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(checkX, checkY, checkW, checkH, 8);

    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Conditions Check', checkX + checkW/2, checkY + 8);

    textAlign(LEFT, TOP);
    textSize(12);

    // Check np0 >= 10
    let np0 = sampleSize * hypothesizedP;
    let nq0 = sampleSize * (1 - hypothesizedP);

    let yPos = checkY + 35;
    let check1Pass = np0 >= 10;
    fill(check1Pass ? '#4CAF50' : '#F44336');
    text(check1Pass ? '✓' : '✗', checkX + 15, yPos);
    fill(80);
    text('np₀ = ' + np0.toFixed(1) + (check1Pass ? ' ≥ 10' : ' < 10'), checkX + 35, yPos);

    yPos += 25;
    let check2Pass = nq0 >= 10;
    fill(check2Pass ? '#4CAF50' : '#F44336');
    text(check2Pass ? '✓' : '✗', checkX + 15, yPos);
    fill(80);
    text('n(1-p₀) = ' + nq0.toFixed(1) + (check2Pass ? ' ≥ 10' : ' < 10'), checkX + 35, yPos);

    yPos += 30;
    if (check1Pass && check2Pass) {
        fill('#4CAF50');
        textSize(13);
        text('✓ Large counts condition met!', checkX + 15, yPos);
    } else {
        fill('#F44336');
        textSize(13);
        text('✗ Large counts condition NOT met', checkX + 15, yPos);
    }
}

function drawControls() {
    let y = drawHeight + 15;

    // Show/Hide steps toggle
    let toggleX = 20;
    fill(showSteps ? sylviaGreen : '#666');
    noStroke();
    rect(toggleX, y, 100, 24, 4);

    fill('white');
    textAlign(CENTER, CENTER);
    textSize(11);
    text(showSteps ? 'Hide Steps' : 'Show Steps', toggleX + 50, y + 12);

    // Example scenarios
    let scenarioX = 140;
    textAlign(LEFT, CENTER);
    fill(80);
    textSize(11);
    text('Examples:', scenarioX, y + 12);

    let examples = [
        { name: 'Fair Coin', n: 200, x: 114, p: 0.5 },
        { name: 'Survey', n: 400, x: 180, p: 0.50 },
        { name: 'Quality', n: 500, x: 25, p: 0.04 }
    ];

    for (let i = 0; i < examples.length; i++) {
        let bx = scenarioX + 75 + i * 90;

        fill(sylviaAuburn);
        noStroke();
        rect(bx, y, 80, 24, 4);

        fill('white');
        textAlign(CENTER, CENTER);
        text(examples[i].name, bx + 40, y + 12);
    }

    // Reset button
    let resetX = canvasWidth - 70;
    fill('#666');
    rect(resetX, y, 55, 24, 4);
    fill('white');
    text('Reset', resetX + 27, y + 12);

    // Store button bounds for click detection
    this.toggleBounds = { x: toggleX, y: y, w: 100, h: 24 };
    this.exampleBounds = examples.map((ex, i) => ({
        x: scenarioX + 75 + i * 90, y: y, w: 80, h: 24, data: ex
    }));
    this.resetBounds = { x: resetX, y: y, w: 55, h: 24 };
}

function mousePressed() {
    // Check input field clicks
    if (isInBounds(mouseX, mouseY, nInputBounds)) {
        editingN = true;
        editingX = false;
        inputN = sampleSize.toString();
        return;
    }

    if (isInBounds(mouseX, mouseY, xInputBounds)) {
        editingX = true;
        editingN = false;
        inputX = successes.toString();
        return;
    }

    // If clicking elsewhere, finish editing
    if (editingN) {
        let val = parseInt(inputN);
        if (!isNaN(val) && val >= 10 && val <= 10000) {
            sampleSize = val;
            if (successes > sampleSize) successes = sampleSize;
        }
        editingN = false;
        calculateValues();
    }

    if (editingX) {
        let val = parseInt(inputX);
        if (!isNaN(val) && val >= 0 && val <= sampleSize) {
            successes = val;
        }
        editingX = false;
        calculateValues();
    }

    // Check p0 slider
    let panelX = margin;
    let sliderY = 40 + 35 + 35 + 35 + 22;
    if (mouseY >= sliderY - 5 && mouseY <= sliderY + 15 &&
        mouseX >= panelX + 15 && mouseX <= panelX + 185) {
        draggingP0 = true;
    }

    // Check control buttons
    let y = drawHeight + 15;

    // Toggle button
    if (isInBounds(mouseX, mouseY, { x: 20, y: y, w: 100, h: 24 })) {
        showSteps = !showSteps;
        return;
    }

    // Example buttons
    let examples = [
        { n: 200, x: 114, p: 0.5 },
        { n: 400, x: 180, p: 0.50 },
        { n: 500, x: 25, p: 0.04 }
    ];

    let scenarioX = 140;
    for (let i = 0; i < examples.length; i++) {
        let bx = scenarioX + 75 + i * 90;
        if (isInBounds(mouseX, mouseY, { x: bx, y: y, w: 80, h: 24 })) {
            sampleSize = examples[i].n;
            successes = examples[i].x;
            hypothesizedP = examples[i].p;
            calculateValues();
            return;
        }
    }

    // Reset button
    if (isInBounds(mouseX, mouseY, { x: canvasWidth - 70, y: y, w: 55, h: 24 })) {
        sampleSize = 200;
        successes = 114;
        hypothesizedP = 0.5;
        showSteps = true;
        calculateValues();
    }
}

function mouseDragged() {
    if (draggingP0) {
        let panelX = margin;
        hypothesizedP = map(mouseX, panelX + 15, panelX + 185, 0.01, 0.99);
        hypothesizedP = constrain(hypothesizedP, 0.01, 0.99);
        calculateValues();
    }
}

function mouseReleased() {
    draggingP0 = false;
}

function keyPressed() {
    if (editingN) {
        if (key >= '0' && key <= '9') {
            inputN += key;
        } else if (keyCode === BACKSPACE) {
            inputN = inputN.slice(0, -1);
        } else if (keyCode === ENTER) {
            let val = parseInt(inputN);
            if (!isNaN(val) && val >= 10 && val <= 10000) {
                sampleSize = val;
                if (successes > sampleSize) successes = sampleSize;
            }
            editingN = false;
            calculateValues();
        } else if (keyCode === ESCAPE) {
            editingN = false;
        }
        return false;
    }

    if (editingX) {
        if (key >= '0' && key <= '9') {
            inputX += key;
        } else if (keyCode === BACKSPACE) {
            inputX = inputX.slice(0, -1);
        } else if (keyCode === ENTER) {
            let val = parseInt(inputX);
            if (!isNaN(val) && val >= 0 && val <= sampleSize) {
                successes = val;
            }
            editingX = false;
            calculateValues();
        } else if (keyCode === ESCAPE) {
            editingX = false;
        }
        return false;
    }
    return true;
}

function isInBounds(x, y, bounds) {
    return x >= bounds.x && x <= bounds.x + bounds.w &&
           y >= bounds.y && y <= bounds.y + bounds.h;
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
}
