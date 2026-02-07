// Critical Value Visualizer MicroSim
// Shows how z* values relate to areas under the normal curve
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 650;
let drawHeight = 370;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// Confidence level and corresponding z*
let confidenceLevel = 95;
let customConfidence = 95;

// Dragging state for custom slider
let draggingCustom = false;

// Preset z* values
let zStarPresets = {
    90: { z: 1.645, alpha: 0.10 },
    95: { z: 1.960, alpha: 0.05 },
    99: { z: 2.576, alpha: 0.01 }
};

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

    describe('Critical value visualizer showing how z* values correspond to areas under the standard normal curve', LABEL);
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
    text('Critical Values and the Normal Curve', canvasWidth / 2, 8);

    // Calculate current z* based on confidence level
    let zStar = getZStar(confidenceLevel);
    let alpha = (100 - confidenceLevel) / 100;
    let tailArea = alpha / 2;

    // Draw the normal curve with shading
    drawNormalCurve(zStar, tailArea);

    // Draw information panel
    drawInfoPanel(zStar, alpha, tailArea);

    // Draw controls
    drawControls();

    // Instructions
    fill(100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Select preset confidence levels or drag the slider for custom values', canvasWidth / 2, drawHeight - 5);
}

function getZStar(conf) {
    // Use inverse normal approximation
    // For common values, use exact; otherwise approximate
    if (zStarPresets[conf]) {
        return zStarPresets[conf].z;
    }

    // Approximate using inverse normal
    // P(Z < z*) = 1 - alpha/2 where alpha = (100 - conf)/100
    let alpha = (100 - conf) / 100;
    let p = 1 - alpha / 2;

    // Rational approximation to inverse normal
    return inverseNormal(p);
}

function inverseNormal(p) {
    // Approximation for inverse normal CDF
    // Uses Abramowitz and Stegun approximation
    if (p <= 0 || p >= 1) return 0;

    let sign = p < 0.5 ? -1 : 1;
    let pp = p < 0.5 ? p : 1 - p;

    let t = Math.sqrt(-2 * Math.log(pp));
    let c0 = 2.515517;
    let c1 = 0.802853;
    let c2 = 0.010328;
    let d1 = 1.432788;
    let d2 = 0.189269;
    let d3 = 0.001308;

    let z = t - (c0 + c1 * t + c2 * t * t) / (1 + d1 * t + d2 * t * t + d3 * t * t * t);

    return sign * z;
}

function drawNormalCurve(zStar, tailArea) {
    let curveLeft = margin + 60;
    let curveRight = canvasWidth - margin - 60;
    let curveTop = 80;
    let curveBottom = 280;
    let curveHeight = curveBottom - curveTop;

    // Standard normal parameters
    let mean = 0;
    let sd = 1;
    let rangeMin = -4;
    let rangeMax = 4;

    let maxDensity = 1 / Math.sqrt(2 * Math.PI);

    // Draw shaded middle region (confidence area)
    fill(sylviaGreen);
    fill(red(color(sylviaGreen)), green(color(sylviaGreen)), blue(color(sylviaGreen)), 120);
    noStroke();
    beginShape();

    let leftCritX = map(-zStar, rangeMin, rangeMax, curveLeft, curveRight);
    let rightCritX = map(zStar, rangeMin, rangeMax, curveLeft, curveRight);

    vertex(leftCritX, curveBottom);
    for (let px = leftCritX; px <= rightCritX; px++) {
        let z = map(px, curveLeft, curveRight, rangeMin, rangeMax);
        let density = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
        let y = map(density, 0, maxDensity * 1.15, curveBottom, curveTop);
        vertex(px, y);
    }
    vertex(rightCritX, curveBottom);
    endShape(CLOSE);

    // Draw left tail (alpha/2)
    fill(sylviaAuburn);
    fill(red(color(sylviaAuburn)), green(color(sylviaAuburn)), blue(color(sylviaAuburn)), 150);
    beginShape();
    vertex(curveLeft, curveBottom);
    for (let px = curveLeft; px <= leftCritX; px++) {
        let z = map(px, curveLeft, curveRight, rangeMin, rangeMax);
        let density = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
        let y = map(density, 0, maxDensity * 1.15, curveBottom, curveTop);
        vertex(px, y);
    }
    vertex(leftCritX, curveBottom);
    endShape(CLOSE);

    // Draw right tail (alpha/2)
    beginShape();
    vertex(rightCritX, curveBottom);
    for (let px = rightCritX; px <= curveRight; px++) {
        let z = map(px, curveLeft, curveRight, rangeMin, rangeMax);
        let density = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
        let y = map(density, 0, maxDensity * 1.15, curveBottom, curveTop);
        vertex(px, y);
    }
    vertex(curveRight, curveBottom);
    endShape(CLOSE);

    // Draw curve outline
    stroke(sylviaGreen);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let px = curveLeft; px <= curveRight; px++) {
        let z = map(px, curveLeft, curveRight, rangeMin, rangeMax);
        let density = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
        let y = map(density, 0, maxDensity * 1.15, curveBottom, curveTop);
        vertex(px, y);
    }
    endShape();

    // Draw critical value lines
    stroke(100);
    strokeWeight(2);
    drawingContext.setLineDash([5, 3]);
    line(leftCritX, curveTop - 10, leftCritX, curveBottom + 5);
    line(rightCritX, curveTop - 10, rightCritX, curveBottom + 5);
    drawingContext.setLineDash([]);

    // Draw x-axis
    stroke(100);
    strokeWeight(2);
    line(curveLeft, curveBottom, curveRight, curveBottom);

    // Tick marks and labels
    textAlign(CENTER, TOP);
    textSize(10);
    fill(100);
    noStroke();

    for (let z = -3; z <= 3; z++) {
        let x = map(z, rangeMin, rangeMax, curveLeft, curveRight);
        stroke(100);
        strokeWeight(1);
        line(x, curveBottom, x, curveBottom + 5);
        noStroke();
        text(z, x, curveBottom + 8);
    }

    // Label z-axis
    textSize(11);
    text('z', (curveLeft + curveRight) / 2, curveBottom + 22);

    // Labels for critical values
    fill(sylviaAuburn);
    textSize(12);
    textAlign(CENTER, BOTTOM);
    text('-z* = ' + (-zStar).toFixed(3), leftCritX, curveTop - 15);
    text('+z* = ' + zStar.toFixed(3), rightCritX, curveTop - 15);

    // Area labels
    fill('white');
    textSize(11);
    textAlign(CENTER, CENTER);

    // Middle area label
    let midX = (leftCritX + rightCritX) / 2;
    let midDensity = Math.exp(0) / Math.sqrt(2 * Math.PI);
    let midY = map(midDensity, 0, maxDensity * 1.15, curveBottom, curveTop);
    fill(255, 255, 255, 200);
    noStroke();
    rect(midX - 40, (midY + curveBottom) / 2 - 12, 80, 24, 4);
    fill(sylviaGreen);
    textSize(14);
    text(confidenceLevel + '%', midX, (midY + curveBottom) / 2);

    // Tail area labels
    textSize(10);
    fill(sylviaAuburn);
    let tailPct = (tailArea * 100).toFixed(2);
    text(tailPct + '%', (curveLeft + leftCritX) / 2, curveBottom - 30);
    text(tailPct + '%', (rightCritX + curveRight) / 2, curveBottom - 30);
}

function drawInfoPanel(zStar, alpha, tailArea) {
    let boxX = canvasWidth - 200;
    let boxY = 45;

    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(boxX, boxY, 180, 110, 5);

    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    fill('black');
    text('Key Values:', boxX + 10, boxY + 8);

    textSize(11);
    text('Confidence Level: ' + confidenceLevel + '%', boxX + 10, boxY + 28);
    text('Alpha (a): ' + alpha.toFixed(4), boxX + 10, boxY + 46);
    text('Each tail (a/2): ' + tailArea.toFixed(4), boxX + 10, boxY + 64);

    fill(sylviaAuburn);
    textSize(13);
    text('z* = ' + zStar.toFixed(4), boxX + 10, boxY + 86);

    // Common z* reference
    fill(100);
    textSize(9);
    textAlign(CENTER, TOP);
    text('90%: 1.645 | 95%: 1.960 | 99%: 2.576', boxX + 90, boxY + 102);
}

function drawControls() {
    let y = drawHeight + 10;
    let btnH = 28;
    let btnW = 60;

    // Preset buttons
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Presets:', 15, y + btnH / 2);

    let presets = [90, 95, 99];
    for (let i = 0; i < presets.length; i++) {
        let bx = 70 + i * (btnW + 8);
        let isActive = confidenceLevel === presets[i];
        fill(isActive ? sylviaGreen : '#999');
        rect(bx, y, btnW, btnH, 4);
        fill('white');
        textAlign(CENTER, CENTER);
        text(presets[i] + '%', bx + btnW / 2, y + btnH / 2);
    }

    // Custom slider
    let sliderX = 280;
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Custom:', sliderX, y + btnH / 2);

    let sliderLeft = sliderX + 55;
    let sliderRight = sliderLeft + 180;

    fill(220);
    noStroke();
    rect(sliderLeft, y + 8, sliderRight - sliderLeft, 12, 3);

    let sliderPos = map(customConfidence, 80, 99.9, sliderLeft, sliderRight);
    fill(sylviaAuburn);
    ellipse(sliderPos, y + 14, 16, 16);

    fill(sylviaAuburn);
    textAlign(LEFT, CENTER);
    text(customConfidence.toFixed(1) + '%', sliderRight + 10, y + btnH / 2);

    // Reset button
    let resetX = canvasWidth - 55;
    fill('#666');
    rect(resetX, y, 45, btnH, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    text('Reset', resetX + 22.5, y + btnH / 2);
}

function mousePressed() {
    let y = drawHeight + 10;
    let btnH = 28;
    let btnW = 60;

    // Preset buttons
    let presets = [90, 95, 99];
    for (let i = 0; i < presets.length; i++) {
        let bx = 70 + i * (btnW + 8);
        if (mouseX >= bx && mouseX <= bx + btnW &&
            mouseY >= y && mouseY <= y + btnH) {
            confidenceLevel = presets[i];
            customConfidence = presets[i];
            return;
        }
    }

    // Custom slider
    let sliderX = 280;
    let sliderLeft = sliderX + 55;
    let sliderRight = sliderLeft + 180;
    let sliderPos = map(customConfidence, 80, 99.9, sliderLeft, sliderRight);

    if (mouseY >= y && mouseY <= y + btnH &&
        mouseX >= sliderLeft - 10 && mouseX <= sliderRight + 10) {
        draggingCustom = true;
        return;
    }

    // Reset button
    let resetX = canvasWidth - 55;
    if (mouseX >= resetX && mouseX <= resetX + 45 &&
        mouseY >= y && mouseY <= y + btnH) {
        confidenceLevel = 95;
        customConfidence = 95;
        return;
    }
}

function mouseDragged() {
    if (draggingCustom) {
        let sliderX = 280;
        let sliderLeft = sliderX + 55;
        let sliderRight = sliderLeft + 180;

        customConfidence = map(mouseX, sliderLeft, sliderRight, 80, 99.9);
        customConfidence = constrain(customConfidence, 80, 99.9);
        customConfidence = Math.round(customConfidence * 10) / 10;
        confidenceLevel = customConfidence;
    }
}

function mouseReleased() {
    draggingCustom = false;
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
