// Sample Size Calculator MicroSim
// Determines required sample size for desired margin of error
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 600;
let drawHeight = 350;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// Parameters
let desiredME = 3;  // As percentage
let confidenceLevel = 95;
let useConservative = true;
let estimatedP = 0.50;

// Slider dragging
let draggingME = false;
let draggingP = false;

// Z* values
let zStarValues = { 90: 1.645, 95: 1.960, 99: 2.576 };

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

    describe('Sample size calculator for achieving a desired margin of error in confidence intervals for proportions', LABEL);
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
    text('Sample Size Calculator', canvasWidth / 2, 8);

    // Calculate required sample size
    let zStar = zStarValues[confidenceLevel];
    let p = useConservative ? 0.5 : estimatedP;
    let meDecimal = desiredME / 100;
    let n = Math.pow(zStar / meDecimal, 2) * p * (1 - p);
    let nRounded = Math.ceil(n);

    // Draw input panel
    drawInputPanel();

    // Draw calculation display
    drawCalculation(zStar, p, meDecimal, n, nRounded);

    // Draw comparison chart
    drawComparisonChart(zStar, p);

    // Draw controls
    drawControls();

    // Instructions
    fill(100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Adjust desired margin of error and settings to see required sample size', canvasWidth / 2, drawHeight - 5);
}

function drawInputPanel() {
    let boxX = 15;
    let boxY = 35;
    let boxW = 250;
    let boxH = 130;

    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(boxX, boxY, boxW, boxH, 5);

    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    fill('black');
    text('Input Parameters:', boxX + 10, boxY + 8);

    // Desired ME slider
    textSize(11);
    text('Desired Margin of Error:', boxX + 10, boxY + 30);

    // Slider track
    let sliderLeft = boxX + 10;
    let sliderRight = sliderLeft + 150;
    fill(220);
    rect(sliderLeft, boxY + 48, 150, 12, 3);

    // Slider handle
    let mePos = map(desiredME, 1, 10, sliderLeft, sliderRight);
    fill(sylviaAuburn);
    ellipse(mePos, boxY + 54, 14, 14);

    fill(sylviaAuburn);
    textAlign(LEFT, CENTER);
    text(desiredME.toFixed(1) + '%', sliderRight + 10, boxY + 54);

    // Confidence level
    textAlign(LEFT, TOP);
    fill('black');
    textSize(11);
    text('Confidence Level:', boxX + 10, boxY + 70);

    let confLevels = [90, 95, 99];
    for (let i = 0; i < confLevels.length; i++) {
        let bx = boxX + 115 + i * 42;
        let isActive = confidenceLevel === confLevels[i];
        fill(isActive ? sylviaGreen : '#ccc');
        noStroke();
        rect(bx, boxY + 68, 38, 18, 3);
        fill(isActive ? 'white' : 'black');
        textAlign(CENTER, CENTER);
        textSize(10);
        text(confLevels[i] + '%', bx + 19, boxY + 77);
    }

    // Conservative vs estimated
    textAlign(LEFT, TOP);
    fill('black');
    textSize(11);
    text('Proportion Estimate:', boxX + 10, boxY + 95);

    // Toggle
    let toggleX = boxX + 130;
    fill(useConservative ? sylviaGreen : sylviaAuburn);
    noStroke();
    rect(toggleX, boxY + 93, 100, 18, 3);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(9);
    text(useConservative ? 'Conservative (0.5)' : 'Custom: ' + estimatedP.toFixed(2), toggleX + 50, boxY + 102);

    // Custom p slider (if not conservative)
    if (!useConservative) {
        textAlign(LEFT, TOP);
        fill('black');
        textSize(10);
        text('p estimate:', boxX + 10, boxY + 115);

        fill(220);
        rect(boxX + 70, boxY + 113, 100, 10, 3);

        let pPos = map(estimatedP, 0.1, 0.9, boxX + 70, boxX + 170);
        fill(sylviaAuburn);
        ellipse(pPos, boxY + 118, 12, 12);

        fill(sylviaAuburn);
        textAlign(LEFT, CENTER);
        text(estimatedP.toFixed(2), boxX + 180, boxY + 118);
    }
}

function drawCalculation(zStar, p, meDecimal, n, nRounded) {
    let boxX = 280;
    let boxY = 35;
    let boxW = canvasWidth - boxX - 15;
    let boxH = 130;

    fill(255, 255, 255, 240);
    stroke(sylviaAuburn);
    strokeWeight(2);
    rect(boxX, boxY, boxW, boxH, 5);

    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    fill('black');
    text('Calculation:', boxX + 10, boxY + 8);

    // Formula
    textSize(11);
    fill(100);
    text('n = (z*/ME)^2 x p(1-p)', boxX + 10, boxY + 28);

    // Substituted values
    fill('black');
    textSize(10);
    let line1 = 'n = (' + zStar.toFixed(3) + ' / ' + meDecimal.toFixed(4) + ')^2 x ' + p.toFixed(2) + '(1-' + p.toFixed(2) + ')';
    text(line1, boxX + 10, boxY + 48);

    let ratio = zStar / meDecimal;
    let line2 = 'n = ' + ratio.toFixed(2) + '^2 x ' + (p * (1 - p)).toFixed(4);
    text(line2, boxX + 10, boxY + 65);

    let line3 = 'n = ' + (ratio * ratio).toFixed(2) + ' x ' + (p * (1 - p)).toFixed(4);
    text(line3, boxX + 10, boxY + 82);

    // Result
    fill(sylviaAuburn);
    textSize(11);
    text('n = ' + n.toFixed(2), boxX + 10, boxY + 99);

    // Rounded up result
    fill(sylviaGreen);
    textSize(14);
    text('Round up: n = ' + nRounded, boxX + 10, boxY + 115);

    // Note
    fill(100);
    textSize(9);
    textAlign(RIGHT, BOTTOM);
    text('Always round UP', boxX + boxW - 10, boxY + boxH - 5);
}

function drawComparisonChart(zStar, p) {
    let chartX = 15;
    let chartY = 175;
    let chartW = canvasWidth - 30;
    let chartH = 100;

    // Background
    fill(255, 255, 255, 200);
    stroke(100);
    strokeWeight(1);
    rect(chartX, chartY, chartW, chartH, 5);

    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    fill('black');
    text('Sample Size Required for Different Margins of Error (' + confidenceLevel + '% Confidence)', chartX + chartW / 2, chartY + 5);

    // Draw bars
    let meValues = [1, 2, 3, 4, 5];
    let barWidth = 40;
    let maxN = Math.pow(zStar / 0.01, 2) * p * (1 - p);
    let barMaxHeight = 60;

    for (let i = 0; i < meValues.length; i++) {
        let me = meValues[i];
        let meDecimal = me / 100;
        let nRequired = Math.ceil(Math.pow(zStar / meDecimal, 2) * p * (1 - p));
        let barHeight = map(Math.sqrt(nRequired), 0, Math.sqrt(maxN), 0, barMaxHeight);

        let bx = chartX + 50 + i * (barWidth + 30);
        let by = chartY + chartH - 15;

        // Highlight current selection
        let isSelected = Math.abs(me - desiredME) < 0.5;
        fill(isSelected ? sylviaGreen : sylviaGreenLight);
        noStroke();
        rect(bx, by - barHeight, barWidth, barHeight, 3, 3, 0, 0);

        // ME label
        fill('black');
        textAlign(CENTER, TOP);
        textSize(9);
        text(me + '%', bx + barWidth / 2, by + 2);

        // N label
        fill(isSelected ? sylviaGreen : 100);
        textAlign(CENTER, BOTTOM);
        textSize(8);
        text('n=' + nRequired, bx + barWidth / 2, by - barHeight - 2);
    }

    // Note about quadrupling
    fill(100);
    textSize(9);
    textAlign(CENTER, BOTTOM);
    text('Note: Halving ME requires 4x the sample size!', chartX + chartW / 2, chartY + chartH - 2);
}

function drawControls() {
    let y = drawHeight + 10;
    let btnH = 28;

    // Quick ME presets
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Quick ME:', 15, y + btnH / 2);

    let presets = [1, 2, 3, 4, 5];
    for (let i = 0; i < presets.length; i++) {
        let bx = 80 + i * 45;
        let isActive = Math.abs(desiredME - presets[i]) < 0.1;
        fill(isActive ? sylviaAuburn : '#ccc');
        rect(bx, y, 40, btnH, 4);
        fill(isActive ? 'white' : 'black');
        textAlign(CENTER, CENTER);
        text(presets[i] + '%', bx + 20, y + btnH / 2);
    }

    // Common scenarios info
    fill(100);
    textAlign(LEFT, CENTER);
    textSize(9);
    text('Typical polls use 3% ME (~1000 people)', 320, y + btnH / 2);

    // Reset button
    let resetX = canvasWidth - 55;
    fill('#666');
    rect(resetX, y, 45, btnH, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    text('Reset', resetX + 22.5, y + btnH / 2);
}

function mousePressed() {
    let boxX = 15;
    let boxY = 35;

    // Confidence level buttons
    let confLevels = [90, 95, 99];
    for (let i = 0; i < confLevels.length; i++) {
        let bx = boxX + 115 + i * 42;
        if (mouseX >= bx && mouseX <= bx + 38 &&
            mouseY >= boxY + 68 && mouseY <= boxY + 86) {
            confidenceLevel = confLevels[i];
            return;
        }
    }

    // Conservative toggle
    let toggleX = boxX + 130;
    if (mouseX >= toggleX && mouseX <= toggleX + 100 &&
        mouseY >= boxY + 93 && mouseY <= boxY + 111) {
        useConservative = !useConservative;
        return;
    }

    // ME slider
    let sliderLeft = boxX + 10;
    let sliderRight = sliderLeft + 150;
    if (mouseY >= boxY + 42 && mouseY <= boxY + 66 &&
        mouseX >= sliderLeft - 10 && mouseX <= sliderRight + 10) {
        draggingME = true;
        return;
    }

    // P slider (if visible)
    if (!useConservative) {
        if (mouseY >= boxY + 108 && mouseY <= boxY + 128 &&
            mouseX >= boxX + 60 && mouseX <= boxX + 180) {
            draggingP = true;
            return;
        }
    }

    // Quick ME presets
    let y = drawHeight + 10;
    let btnH = 28;
    let presets = [1, 2, 3, 4, 5];
    for (let i = 0; i < presets.length; i++) {
        let bx = 80 + i * 45;
        if (mouseX >= bx && mouseX <= bx + 40 &&
            mouseY >= y && mouseY <= y + btnH) {
            desiredME = presets[i];
            return;
        }
    }

    // Reset
    let resetX = canvasWidth - 55;
    if (mouseX >= resetX && mouseX <= resetX + 45 &&
        mouseY >= y && mouseY <= y + btnH) {
        desiredME = 3;
        confidenceLevel = 95;
        useConservative = true;
        estimatedP = 0.50;
        return;
    }
}

function mouseDragged() {
    let boxX = 15;
    let boxY = 35;

    if (draggingME) {
        let sliderLeft = boxX + 10;
        let sliderRight = sliderLeft + 150;
        desiredME = map(mouseX, sliderLeft, sliderRight, 1, 10);
        desiredME = constrain(desiredME, 1, 10);
        desiredME = Math.round(desiredME * 10) / 10;
    }

    if (draggingP) {
        estimatedP = map(mouseX, boxX + 70, boxX + 170, 0.1, 0.9);
        estimatedP = constrain(estimatedP, 0.1, 0.9);
        estimatedP = Math.round(estimatedP * 100) / 100;
    }
}

function mouseReleased() {
    draggingME = false;
    draggingP = false;
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
