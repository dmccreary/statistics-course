// Normal Distribution Parameter Explorer MicroSim
// Shows how μ and σ affect the normal curve shape
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 350;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// Distribution parameters
let mean1 = 50;
let sd1 = 10;

// Second distribution for comparison
let showSecond = false;
let mean2 = 60;
let sd2 = 15;

// UI state
let draggingMean1 = false;
let draggingSd1 = false;
let draggingMean2 = false;
let draggingSd2 = false;

// Sylvia theme
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    describe('Interactive normal distribution explorer showing how mean and standard deviation affect curve shape', LABEL);
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
    text('Normal Distribution Parameter Explorer', canvasWidth / 2, 8);

    // Draw curves
    let curveLeft = margin + 30;
    let curveRight = canvasWidth - margin - 30;
    let curveTop = 70;
    let curveBottom = 260;

    drawAxis(curveLeft, curveRight, curveBottom);

    if (showSecond) {
        drawNormalCurve(curveLeft, curveRight, curveTop, curveBottom, mean2, sd2, sylviaAuburn, 'Curve 2');
    }
    drawNormalCurve(curveLeft, curveRight, curveTop, curveBottom, mean1, sd1, sylviaGreen, 'Curve 1');

    drawParameterDisplay(curveLeft);
    drawControls();

    // Instructions
    fill(100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Adjust sliders to see how μ (mean) shifts the curve and σ (std dev) changes the spread', canvasWidth / 2, drawHeight - 5);
}

function drawNormalCurve(left, right, top, bottom, m, s, col, label) {
    // Calculate max density for scaling (using the smallest sd for consistent scaling)
    let minSd = showSecond ? Math.min(sd1, sd2) : sd1;
    let maxDensity = 1 / (minSd * Math.sqrt(2 * Math.PI));

    // Draw filled area
    fill(col);
    fill(red(color(col)), green(color(col)), blue(color(col)), 60);
    noStroke();
    beginShape();
    vertex(left, bottom);
    for (let px = left; px <= right; px++) {
        let x = map(px, left, right, 0, 100);
        let z = (x - m) / s;
        let density = Math.exp(-0.5 * z * z) / (s * Math.sqrt(2 * Math.PI));
        let y = map(density, 0, maxDensity * 1.2, bottom, top);
        y = constrain(y, top, bottom);
        vertex(px, y);
    }
    vertex(right, bottom);
    endShape(CLOSE);

    // Draw curve outline
    stroke(col);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let px = left; px <= right; px++) {
        let x = map(px, left, right, 0, 100);
        let z = (x - m) / s;
        let density = Math.exp(-0.5 * z * z) / (s * Math.sqrt(2 * Math.PI));
        let y = map(density, 0, maxDensity * 1.2, bottom, top);
        y = constrain(y, top, bottom);
        vertex(px, y);
    }
    endShape();

    // Draw mean line
    let meanX = map(m, 0, 100, left, right);
    stroke(col);
    strokeWeight(2);
    drawingContext.setLineDash([5, 3]);
    line(meanX, top, meanX, bottom);
    drawingContext.setLineDash([]);

    // Label at peak
    let peakY = map(1 / (s * Math.sqrt(2 * Math.PI)), 0, maxDensity * 1.2, bottom, top);
    peakY = constrain(peakY, top + 20, bottom - 20);
    fill(col);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(11);
    text(label, meanX, peakY - 5);
}

function drawAxis(left, right, y) {
    stroke(100);
    strokeWeight(2);
    line(left, y, right, y);

    // Tick marks
    textAlign(CENTER, TOP);
    textSize(10);
    fill(100);
    noStroke();
    for (let val = 0; val <= 100; val += 10) {
        let x = map(val, 0, 100, left, right);
        stroke(100);
        strokeWeight(1);
        line(x, y, x, y + 5);
        noStroke();
        if (val % 20 === 0) {
            text(val, x, y + 8);
        }
    }
}

function drawParameterDisplay(left) {
    let boxX = left + 10;
    let boxY = 45;

    // Curve 1 parameters
    fill(255, 255, 255, 220);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(boxX, boxY, 130, 55, 5);

    fill(sylviaGreen);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text('Curve 1 (Green)', boxX + 10, boxY + 8);
    textSize(11);
    text('μ = ' + mean1.toFixed(1), boxX + 10, boxY + 25);
    text('σ = ' + sd1.toFixed(1), boxX + 70, boxY + 25);

    // Height info
    textSize(9);
    fill(100);
    let height1 = 1 / (sd1 * Math.sqrt(2 * Math.PI));
    text('Peak: ' + height1.toFixed(4), boxX + 10, boxY + 40);

    if (showSecond) {
        // Curve 2 parameters
        fill(255, 255, 255, 220);
        stroke(sylviaAuburn);
        strokeWeight(2);
        rect(boxX + 140, boxY, 130, 55, 5);

        fill(sylviaAuburn);
        noStroke();
        textAlign(LEFT, TOP);
        textSize(12);
        text('Curve 2 (Orange)', boxX + 150, boxY + 8);
        textSize(11);
        text('μ = ' + mean2.toFixed(1), boxX + 150, boxY + 25);
        text('σ = ' + sd2.toFixed(1), boxX + 210, boxY + 25);

        textSize(9);
        fill(100);
        let height2 = 1 / (sd2 * Math.sqrt(2 * Math.PI));
        text('Peak: ' + height2.toFixed(4), boxX + 150, boxY + 40);
    }
}

function drawControls() {
    let y = drawHeight + 8;

    // Curve 1 sliders
    textSize(10);
    fill(sylviaGreen);
    noStroke();
    textAlign(LEFT, CENTER);
    text('μ₁:', 10, y + 10);

    // Mean 1 slider
    fill(220);
    rect(30, y + 4, 80, 12, 3);
    let mean1Pos = map(mean1, 0, 100, 30, 110);
    fill(sylviaGreen);
    ellipse(mean1Pos, y + 10, 12, 12);

    text('σ₁:', 120, y + 10);
    fill(220);
    rect(140, y + 4, 60, 12, 3);
    let sd1Pos = map(sd1, 3, 30, 140, 200);
    fill(sylviaGreen);
    ellipse(sd1Pos, y + 10, 12, 12);

    // Compare toggle
    let toggleX = 220;
    fill(showSecond ? sylviaAuburn : '#ccc');
    rect(toggleX, y + 2, 80, 20, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    text(showSecond ? 'Hide Curve 2' : 'Compare', toggleX + 40, y + 12);

    if (showSecond) {
        // Curve 2 sliders
        fill(sylviaAuburn);
        textAlign(LEFT, CENTER);
        text('μ₂:', 310, y + 10);

        fill(220);
        rect(330, y + 4, 80, 12, 3);
        let mean2Pos = map(mean2, 0, 100, 330, 410);
        fill(sylviaAuburn);
        ellipse(mean2Pos, y + 10, 12, 12);

        text('σ₂:', 420, y + 10);
        fill(220);
        rect(440, y + 4, 60, 12, 3);
        let sd2Pos = map(sd2, 3, 30, 440, 500);
        fill(sylviaAuburn);
        ellipse(sd2Pos, y + 10, 12, 12);
    }

    // Reset button
    let resetX = canvasWidth - 60;
    fill(100);
    rect(resetX, y + 2, 50, 20, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    text('Reset', resetX + 25, y + 12);

    // Key insight
    if (!showSecond) {
        fill(80);
        textAlign(LEFT, CENTER);
        textSize(9);
        text('↑σ = wider, shorter curve | ↓σ = narrower, taller curve', 320, y + 12);
    }
}

function mousePressed() {
    let y = drawHeight + 8;

    // Compare toggle
    let toggleX = 220;
    if (mouseX >= toggleX && mouseX <= toggleX + 80 &&
        mouseY >= y + 2 && mouseY <= y + 22) {
        showSecond = !showSecond;
        return;
    }

    // Reset button
    let resetX = canvasWidth - 60;
    if (mouseX >= resetX && mouseX <= resetX + 50 &&
        mouseY >= y + 2 && mouseY <= y + 22) {
        mean1 = 50;
        sd1 = 10;
        mean2 = 60;
        sd2 = 15;
        return;
    }

    // Check sliders
    checkSliderDrag();
}

function checkSliderDrag() {
    let y = drawHeight + 8;

    // Mean 1 slider
    let mean1Pos = map(mean1, 0, 100, 30, 110);
    if (mouseY >= y && mouseY <= y + 20 && Math.abs(mouseX - mean1Pos) < 15) {
        draggingMean1 = true;
        return;
    }

    // SD 1 slider
    let sd1Pos = map(sd1, 3, 30, 140, 200);
    if (mouseY >= y && mouseY <= y + 20 && Math.abs(mouseX - sd1Pos) < 15) {
        draggingSd1 = true;
        return;
    }

    if (showSecond) {
        // Mean 2 slider
        let mean2Pos = map(mean2, 0, 100, 330, 410);
        if (mouseY >= y && mouseY <= y + 20 && Math.abs(mouseX - mean2Pos) < 15) {
            draggingMean2 = true;
            return;
        }

        // SD 2 slider
        let sd2Pos = map(sd2, 3, 30, 440, 500);
        if (mouseY >= y && mouseY <= y + 20 && Math.abs(mouseX - sd2Pos) < 15) {
            draggingSd2 = true;
            return;
        }
    }
}

function mouseDragged() {
    if (draggingMean1) {
        mean1 = map(mouseX, 30, 110, 0, 100);
        mean1 = constrain(mean1, 0, 100);
    }
    if (draggingSd1) {
        sd1 = map(mouseX, 140, 200, 3, 30);
        sd1 = constrain(sd1, 3, 30);
    }
    if (draggingMean2) {
        mean2 = map(mouseX, 330, 410, 0, 100);
        mean2 = constrain(mean2, 0, 100);
    }
    if (draggingSd2) {
        sd2 = map(mouseX, 440, 500, 3, 30);
        sd2 = constrain(sd2, 3, 30);
    }
}

function mouseReleased() {
    draggingMean1 = false;
    draggingSd1 = false;
    draggingMean2 = false;
    draggingSd2 = false;
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
