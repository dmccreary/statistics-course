// Combining Random Variables Visualizer MicroSim
// Demonstrates how means and variances combine when adding/subtracting independent random variables
// Key insight: Variances ALWAYS add, even for subtraction!
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 20;
let defaultTextSize = 14;

// Random variable parameters
let meanX = 50;
let sdX = 10;
let meanY = 50;
let sdY = 10;

// Operation mode: 'sum' or 'difference'
let operation = 'sum';

// Slider tracking
let sliders = [];
let draggingSlider = -1;

// UI elements
let buttons = [];

// Show calculation steps
let showSteps = true;

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaGreenDark = '#1B5E20';
let sylviaGreenLight = '#4CAF50';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';
let sylviaHazel = '#8B7355';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textFont('Arial');
    textSize(defaultTextSize);

    describe('Combining random variables visualizer showing how means add/subtract normally, but variances always add when combining independent random variables.', LABEL);
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
    stroke('silver');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Combining Independent Random Variables', canvasWidth / 2, 8);

    // Draw components
    drawDistributions();
    drawCalculation();
    drawControls();
}

function drawDistributions() {
    let curveY = 90;
    let curveHeight = 100;
    let curveWidth = 180;

    // Distribution X
    let xCenterX = 100;
    drawNormalCurve(xCenterX, curveY, curveWidth, curveHeight, meanX, sdX, sylviaGreen, 'X');

    // Distribution Y
    let yCenterX = 280;
    drawNormalCurve(yCenterX, curveY, curveWidth, curveHeight, meanY, sdY, sylviaAuburn, 'Y');

    // Operator symbol
    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(24);
    let opSymbol = operation === 'sum' ? '+' : '-';
    text(opSymbol, 190, curveY + curveHeight / 2);

    // Equals sign
    text('=', 370, curveY + curveHeight / 2);

    // Result distribution
    let resultMean = operation === 'sum' ? meanX + meanY : meanX - meanY;
    let resultVar = sdX * sdX + sdY * sdY; // Always add variances!
    let resultSD = Math.sqrt(resultVar);

    let resultCenterX = 520;
    drawNormalCurve(resultCenterX, curveY, curveWidth, curveHeight, resultMean, resultSD, sylviaHazel, operation === 'sum' ? 'X+Y' : 'X-Y');

    // Draw sliders below distributions
    sliders = [];
    let sliderY = curveY + curveHeight + 20;
    let sliderWidth = 150;
    let sliderHeight = 15;

    // Mean X slider
    drawSlider(xCenterX - sliderWidth / 2, sliderY, sliderWidth, sliderHeight,
               'Mean', 0, 100, meanX, 0, sylviaGreen);

    // SD X slider
    drawSlider(xCenterX - sliderWidth / 2, sliderY + 30, sliderWidth, sliderHeight,
               'SD', 1, 20, sdX, 1, sylviaGreen);

    // Mean Y slider
    drawSlider(yCenterX - sliderWidth / 2, sliderY, sliderWidth, sliderHeight,
               'Mean', 0, 100, meanY, 2, sylviaAuburn);

    // SD Y slider
    drawSlider(yCenterX - sliderWidth / 2, sliderY + 30, sliderWidth, sliderHeight,
               'SD', 1, 20, sdY, 3, sylviaAuburn);
}

function drawNormalCurve(centerX, y, w, h, mean, sd, col, label) {
    // Background
    fill(255, 255, 255, 200);
    stroke(150);
    strokeWeight(1);
    rect(centerX - w / 2, y, w, h, 5);

    // Draw normal curve
    noFill();
    stroke(col);
    strokeWeight(2);
    beginShape();

    for (let px = 0; px <= w; px++) {
        // Map pixel to x value (3 standard deviations)
        let x = map(px, 0, w, mean - 3 * sd, mean + 3 * sd);
        // Calculate normal density
        let density = normalPDF(x, mean, sd);
        // Scale to fit
        let maxDensity = normalPDF(mean, mean, sd);
        let py = map(density, 0, maxDensity, h - 20, 10);
        vertex(centerX - w / 2 + px, y + py);
    }
    endShape();

    // Mean line
    let meanX = centerX;
    stroke(col);
    strokeWeight(1);
    setLineDash([3, 3]);
    line(meanX, y + 10, meanX, y + h - 15);
    setLineDash([]);

    // Label
    fill(col);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text(label, centerX, y + 5);

    // Stats
    textSize(11);
    text('Mean: ' + mean.toFixed(1), centerX, y + h - 15);
}

function normalPDF(x, mean, sd) {
    let z = (x - mean) / sd;
    return Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function drawSlider(x, y, w, h, label, minVal, maxVal, currentVal, index, col) {
    // Label
    fill(col);
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(11);
    text(label + ':', x - 5, y + h / 2);

    // Track
    fill(220);
    stroke(150);
    strokeWeight(1);
    rect(x, y, w, h, 3);

    // Filled portion
    let fillWidth = map(currentVal, minVal, maxVal, 0, w);
    fill(col + '80');
    noStroke();
    rect(x, y, fillWidth, h, 3, 0, 0, 3);

    // Handle
    let handleX = x + fillWidth;
    fill(col);
    stroke(50);
    strokeWeight(1);
    ellipse(handleX, y + h / 2, 16, 16);

    // Value
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text(currentVal.toFixed(1), x + w + 5, y + h / 2);

    sliders.push({
        x: x,
        y: y,
        w: w,
        h: h,
        minVal: minVal,
        maxVal: maxVal,
        index: index
    });
}

function drawCalculation() {
    let calcX = 20;
    let calcY = 270;
    let calcWidth = canvasWidth - 40;
    let calcHeight = 125;

    fill(255);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(calcX, calcY, calcWidth, calcHeight, 8);

    // Calculate results
    let resultMean = operation === 'sum' ? meanX + meanY : meanX - meanY;
    let varX = sdX * sdX;
    let varY = sdY * sdY;
    let resultVar = varX + varY; // Always add!
    let resultSD = Math.sqrt(resultVar);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);

    let col1 = calcX + 15;
    let col2 = calcX + calcWidth / 2 + 10;
    let lineHeight = 22;

    // Mean calculation
    fill(sylviaGreenDark);
    text('Mean Calculation:', col1, calcY + 12);

    fill('black');
    textSize(13);
    let opSymbol = operation === 'sum' ? '+' : '-';
    let meanFormula = 'E(' + (operation === 'sum' ? 'X+Y' : 'X-Y') + ') = E(X) ' + opSymbol + ' E(Y)';
    text(meanFormula, col1, calcY + 12 + lineHeight);

    let meanCalc = 'E(' + (operation === 'sum' ? 'X+Y' : 'X-Y') + ') = ' + meanX.toFixed(1) + ' ' + opSymbol + ' ' + meanY.toFixed(1) + ' = ' + resultMean.toFixed(1);
    text(meanCalc, col1, calcY + 12 + lineHeight * 2);

    // Variance calculation (the key insight!)
    fill(sylviaAuburn);
    textSize(14);
    text('Variance Calculation:', col2, calcY + 12);

    fill('black');
    textSize(13);
    // This is the KEY insight - variances ALWAYS add!
    let varFormula = 'Var(' + (operation === 'sum' ? 'X+Y' : 'X-Y') + ') = Var(X) + Var(Y)';
    text(varFormula, col2, calcY + 12 + lineHeight);

    let varCalc = 'Var(' + (operation === 'sum' ? 'X+Y' : 'X-Y') + ') = ' + varX.toFixed(1) + ' + ' + varY.toFixed(1) + ' = ' + resultVar.toFixed(1);
    text(varCalc, col2, calcY + 12 + lineHeight * 2);

    // Standard deviation
    let sdCalc = 'SD(' + (operation === 'sum' ? 'X+Y' : 'X-Y') + ') = sqrt(' + resultVar.toFixed(1) + ') = ' + resultSD.toFixed(2);
    text(sdCalc, col2, calcY + 12 + lineHeight * 3);

    // Key insight box
    if (operation === 'difference') {
        fill(sylviaAuburn + '30');
        stroke(sylviaAuburn);
        strokeWeight(2);
        rect(col1, calcY + 12 + lineHeight * 3.5, calcWidth / 2 - 30, 25, 5);

        fill(sylviaAuburn);
        noStroke();
        textSize(12);
        text('Note: Variances ADD even when subtracting!', col1 + 8, calcY + 18 + lineHeight * 3.5);
    }
}

function drawControls() {
    buttons = [];

    let btnY = drawHeight + 20;
    let btnHeight = 32;
    let btnSpacing = 15;
    let x = 30;

    // Operation label
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text('Operation:', x, btnY + btnHeight / 2);
    x += 80;

    // Sum button
    let sumActive = operation === 'sum';
    drawButton(x, btnY, 90, btnHeight, 'Sum (X + Y)', 'sum', sumActive);
    x += 90 + btnSpacing;

    // Difference button
    let diffActive = operation === 'difference';
    drawButton(x, btnY, 120, btnHeight, 'Difference (X - Y)', 'difference', diffActive);
    x += 120 + btnSpacing + 30;

    // Reset button
    drawButton(x, btnY, 70, btnHeight, 'Reset', 'reset', false);

    // Instructions
    fill(80);
    textSize(11);
    textAlign(LEFT, TOP);
    text('Drag the sliders to change mean and SD. Watch how the combined distribution changes!', 30, drawHeight + 60);

    // Key insight
    fill(sylviaGreenDark);
    text('"Remember: SDs don\'t add directly - they combine like the Pythagorean theorem!" - Sylvia', 30, drawHeight + 78);
}

function drawButton(x, y, w, h, label, action, isActive) {
    let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

    if (isActive) {
        fill(sylviaGreen);
    } else if (isHover) {
        fill(sylviaGreenLight);
    } else {
        fill(220);
    }

    stroke(sylviaGreenDark);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    fill(isActive ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(label, x + w / 2, y + h / 2);

    buttons.push({x, y, w, h, action});
}

function mousePressed() {
    // Check buttons
    for (let btn of buttons) {
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            handleButtonClick(btn.action);
            return;
        }
    }

    // Check sliders
    for (let i = 0; i < sliders.length; i++) {
        let s = sliders[i];
        if (mouseX >= s.x - 10 && mouseX <= s.x + s.w + 10 &&
            mouseY >= s.y - 5 && mouseY <= s.y + s.h + 5) {
            draggingSlider = i;
            updateSliderValue(i);
            return;
        }
    }
}

function mouseDragged() {
    if (draggingSlider >= 0) {
        updateSliderValue(draggingSlider);
    }
}

function mouseReleased() {
    draggingSlider = -1;
}

function updateSliderValue(index) {
    let s = sliders[index];
    let newVal = map(mouseX, s.x, s.x + s.w, s.minVal, s.maxVal);
    newVal = constrain(newVal, s.minVal, s.maxVal);

    switch(index) {
        case 0: meanX = newVal; break;
        case 1: sdX = newVal; break;
        case 2: meanY = newVal; break;
        case 3: sdY = newVal; break;
    }
}

function handleButtonClick(action) {
    if (action === 'sum' || action === 'difference') {
        operation = action;
    } else if (action === 'reset') {
        meanX = 50;
        sdX = 10;
        meanY = 50;
        sdY = 10;
        operation = 'sum';
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
