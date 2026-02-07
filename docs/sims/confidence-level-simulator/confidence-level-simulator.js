// Confidence Level Simulator MicroSim
// Demonstrates the true meaning of confidence level through repeated sampling
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// True population parameter
let trueP = 0.60;

// Sampling parameters
let sampleSize = 50;
let confidenceLevel = 95;

// Z* values
let zStarValues = { 90: 1.645, 95: 1.960, 99: 2.576 };

// Stored intervals
let intervals = [];
let maxIntervals = 100;

// Display settings
let intervalHeight = 3.5;
let intervalGap = 0.5;

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaGreenLight = '#4CAF50';
let sylviaAuburn = '#B5651D';
let sylviaRed = '#E53935';
let sylviaCream = '#FFF8E1';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    describe('Confidence level simulator showing how the percentage of intervals that capture the true parameter matches the confidence level', LABEL);
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
    text('Confidence Level Simulator', canvasWidth / 2, 8);

    // Subtitle
    textSize(12);
    fill(100);
    text('True population proportion p = ' + trueP.toFixed(2) + ' | n = ' + sampleSize + ' | ' + confidenceLevel + '% Confidence', canvasWidth / 2, 30);

    // Draw true parameter line
    drawTrueParameterLine();

    // Draw intervals
    drawIntervals();

    // Draw statistics panel
    drawStatsPanel();

    // Draw controls
    drawControls();

    // Instructions
    fill(100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Generate samples to see that approximately ' + confidenceLevel + '% of confidence intervals capture the true parameter', canvasWidth / 2, drawHeight - 5);
}

function drawTrueParameterLine() {
    let displayArea = getDisplayArea();

    // True parameter vertical line
    let trueX = map(trueP, 0, 1, displayArea.left, displayArea.right);

    stroke(sylviaAuburn);
    strokeWeight(3);
    line(trueX, displayArea.top - 10, trueX, displayArea.bottom + 10);

    // Label
    fill(sylviaAuburn);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(12);
    text('True p = ' + trueP.toFixed(2), trueX, displayArea.top - 15);

    // Axis line at bottom
    stroke(100);
    strokeWeight(2);
    line(displayArea.left, displayArea.bottom + 15, displayArea.right, displayArea.bottom + 15);

    // Tick marks
    textAlign(CENTER, TOP);
    textSize(9);
    fill(100);
    for (let v = 0; v <= 1; v += 0.1) {
        let x = map(v, 0, 1, displayArea.left, displayArea.right);
        stroke(100);
        strokeWeight(1);
        line(x, displayArea.bottom + 12, x, displayArea.bottom + 18);
        noStroke();
        text(v.toFixed(1), x, displayArea.bottom + 20);
    }
}

function getDisplayArea() {
    return {
        left: margin + 80,
        right: canvasWidth - margin - 20,
        top: 70,
        bottom: drawHeight - 60
    };
}

function drawIntervals() {
    let displayArea = getDisplayArea();
    let zStar = zStarValues[confidenceLevel];

    for (let i = 0; i < intervals.length; i++) {
        let interval = intervals[i];
        let y = displayArea.top + i * (intervalHeight + intervalGap);

        if (y > displayArea.bottom) break;

        // Calculate interval bounds
        let pHat = interval.pHat;
        let se = Math.sqrt(pHat * (1 - pHat) / sampleSize);
        let me = zStar * se;
        let lower = Math.max(0, pHat - me);
        let upper = Math.min(1, pHat + me);

        // Check if captures true parameter
        let captured = (lower <= trueP && upper >= trueP);

        // Map to pixels
        let lowerX = map(lower, 0, 1, displayArea.left, displayArea.right);
        let upperX = map(upper, 0, 1, displayArea.left, displayArea.right);
        let pHatX = map(pHat, 0, 1, displayArea.left, displayArea.right);

        // Draw interval line
        stroke(captured ? sylviaGreen : sylviaRed);
        strokeWeight(intervalHeight);
        line(lowerX, y, upperX, y);

        // Draw point estimate dot
        fill(captured ? sylviaGreen : sylviaRed);
        noStroke();
        ellipse(pHatX, y, 5, 5);
    }
}

function drawStatsPanel() {
    let boxX = 15;
    let boxY = 55;

    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(boxX, boxY, 130, 100, 5);

    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    fill('black');
    text('Statistics:', boxX + 10, boxY + 8);

    // Count captured
    let captured = countCaptured();
    let total = intervals.length;
    let rate = total > 0 ? ((captured / total) * 100).toFixed(1) : '--';

    textSize(10);
    text('Intervals: ' + total, boxX + 10, boxY + 28);

    fill(sylviaGreen);
    text('Captured: ' + captured, boxX + 10, boxY + 44);

    fill(sylviaRed);
    text('Missed: ' + (total - captured), boxX + 10, boxY + 60);

    fill('black');
    textSize(12);
    text('Capture rate:', boxX + 10, boxY + 78);
    fill(sylviaAuburn);
    textSize(14);
    text(rate + '%', boxX + 85, boxY + 77);

    // Expected vs actual
    if (total >= 20) {
        let diff = Math.abs(parseFloat(rate) - confidenceLevel);
        fill(100);
        textSize(9);
        textAlign(CENTER, TOP);
        text('Expected: ' + confidenceLevel + '%', boxX + 65, boxY + 95);
    }
}

function countCaptured() {
    let zStar = zStarValues[confidenceLevel];
    let count = 0;

    for (let interval of intervals) {
        let pHat = interval.pHat;
        let se = Math.sqrt(pHat * (1 - pHat) / sampleSize);
        let me = zStar * se;
        let lower = pHat - me;
        let upper = pHat + me;

        if (lower <= trueP && upper >= trueP) {
            count++;
        }
    }

    return count;
}

function drawControls() {
    let y = drawHeight + 10;
    let btnH = 28;

    // Generate 1 button
    let btn1X = 15;
    let btnW = 80;
    fill(sylviaGreen);
    noStroke();
    rect(btn1X, y, btnW, btnH, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(10);
    text('Generate 1', btn1X + btnW / 2, y + btnH / 2);

    // Generate 10 button
    let btn10X = btn1X + btnW + 10;
    fill(sylviaGreen);
    rect(btn10X, y, btnW, btnH, 4);
    fill('white');
    text('Generate 10', btn10X + btnW / 2, y + btnH / 2);

    // Generate 100 button
    let btn100X = btn10X + btnW + 10;
    fill(sylviaAuburn);
    rect(btn100X, y, btnW, btnH, 4);
    fill('white');
    text('Generate 100', btn100X + btnW / 2, y + btnH / 2);

    // Confidence level buttons
    let confX = btn100X + btnW + 25;
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Confidence:', confX, y + btnH / 2);

    let confBtnW = 45;
    let confLevels = [90, 95, 99];
    for (let i = 0; i < confLevels.length; i++) {
        let bx = confX + 70 + i * (confBtnW + 5);
        let isActive = confidenceLevel === confLevels[i];
        fill(isActive ? sylviaGreen : '#999');
        rect(bx, y, confBtnW, btnH, 4);
        fill('white');
        textAlign(CENTER, CENTER);
        text(confLevels[i] + '%', bx + confBtnW / 2, y + btnH / 2);
    }

    // Reset button
    let resetX = canvasWidth - 60;
    fill('#666');
    rect(resetX, y, 50, btnH, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    text('Reset', resetX + 25, y + btnH / 2);
}

function generateSample() {
    if (intervals.length >= maxIntervals) {
        intervals.shift();
    }

    // Generate random sample
    let successes = 0;
    for (let i = 0; i < sampleSize; i++) {
        if (random() < trueP) successes++;
    }
    let pHat = successes / sampleSize;

    intervals.push({ pHat: pHat });
}

function mousePressed() {
    let y = drawHeight + 10;
    let btnH = 28;
    let btnW = 80;

    // Generate 1
    let btn1X = 15;
    if (mouseX >= btn1X && mouseX <= btn1X + btnW &&
        mouseY >= y && mouseY <= y + btnH) {
        generateSample();
        return;
    }

    // Generate 10
    let btn10X = btn1X + btnW + 10;
    if (mouseX >= btn10X && mouseX <= btn10X + btnW &&
        mouseY >= y && mouseY <= y + btnH) {
        for (let i = 0; i < 10; i++) generateSample();
        return;
    }

    // Generate 100
    let btn100X = btn10X + btnW + 10;
    if (mouseX >= btn100X && mouseX <= btn100X + btnW &&
        mouseY >= y && mouseY <= y + btnH) {
        intervals = [];
        for (let i = 0; i < 100; i++) generateSample();
        return;
    }

    // Confidence level buttons
    let confX = btn100X + btnW + 25;
    let confBtnW = 45;
    let confLevels = [90, 95, 99];
    for (let i = 0; i < confLevels.length; i++) {
        let bx = confX + 70 + i * (confBtnW + 5);
        if (mouseX >= bx && mouseX <= bx + confBtnW &&
            mouseY >= y && mouseY <= y + btnH) {
            confidenceLevel = confLevels[i];
            return;
        }
    }

    // Reset
    let resetX = canvasWidth - 60;
    if (mouseX >= resetX && mouseX <= resetX + 50 &&
        mouseY >= y && mouseY <= y + btnH) {
        intervals = [];
        return;
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
