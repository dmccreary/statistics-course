// Z-Score Calculator and Visualizer MicroSim
// Interactive z-score calculation with normal curve context
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
let mean = 100;
let sd = 15;

// Current value
let rawValue = 115;
let draggingValue = false;

// UI elements
let meanSlider, sdSlider;
let presetButtons = [];

// Sylvia theme
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';

// Presets
let presets = [
    { name: 'IQ Scores', mean: 100, sd: 15, value: 130 },
    { name: 'SAT Math', mean: 500, sd: 100, value: 650 },
    { name: 'Heights (in)', mean: 68, sd: 3, value: 74 }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    describe('Interactive z-score calculator showing value on normal distribution curve', LABEL);
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
    text('Z-Score Calculator and Visualizer', canvasWidth / 2, 8);

    // Draw normal curve and value marker
    let curveLeft = margin + 60;
    let curveRight = canvasWidth - margin - 60;
    let curveTop = 80;
    let curveBottom = 220;

    drawNormalCurve(curveLeft, curveRight, curveTop, curveBottom);
    drawValueMarker(curveLeft, curveRight, curveTop, curveBottom);
    drawZScoreDisplay();
    drawControls();

    // Instructions
    fill(100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Drag the marker on the curve to change the raw value, or use the sliders below', canvasWidth / 2, drawHeight - 5);
}

function drawNormalCurve(left, right, top, bottom) {
    // Draw axis
    stroke(100);
    strokeWeight(2);
    line(left, bottom, right, bottom);

    // Draw curve
    stroke(sylviaGreen);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let px = left; px <= right; px++) {
        let x = map(px, left, right, mean - 4 * sd, mean + 4 * sd);
        let z = (x - mean) / sd;
        let density = Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
        let maxDensity = 1 / (sd * Math.sqrt(2 * Math.PI));
        let y = map(density, 0, maxDensity * 1.1, bottom, top);
        vertex(px, y);
    }
    endShape();

    // Draw mean line
    let meanX = map(mean, mean - 4 * sd, mean + 4 * sd, left, right);
    stroke(100);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    line(meanX, top, meanX, bottom);
    drawingContext.setLineDash([]);

    // Labels for standard deviations
    textAlign(CENTER, TOP);
    textSize(10);
    fill(100);
    noStroke();
    for (let k = -3; k <= 3; k++) {
        let sdX = map(mean + k * sd, mean - 4 * sd, mean + 4 * sd, left, right);
        if (sdX >= left && sdX <= right) {
            stroke(150);
            strokeWeight(1);
            line(sdX, bottom, sdX, bottom + 5);
            noStroke();
            if (k === 0) {
                text('μ=' + mean.toFixed(0), sdX, bottom + 8);
            } else {
                text((mean + k * sd).toFixed(0), sdX, bottom + 8);
            }
        }
    }

    // Z-score labels below
    textSize(9);
    fill(sylviaGreen);
    for (let k = -3; k <= 3; k++) {
        let sdX = map(mean + k * sd, mean - 4 * sd, mean + 4 * sd, left, right);
        if (sdX >= left && sdX <= right) {
            text('z=' + k, sdX, bottom + 22);
        }
    }
}

function drawValueMarker(left, right, top, bottom) {
    let valueX = map(rawValue, mean - 4 * sd, mean + 4 * sd, left, right);
    valueX = constrain(valueX, left, right);

    let z = (rawValue - mean) / sd;
    let density = Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
    let maxDensity = 1 / (sd * Math.sqrt(2 * Math.PI));
    let valueY = map(density, 0, maxDensity * 1.1, bottom, top);

    // Vertical line from axis to curve
    stroke(sylviaAuburn);
    strokeWeight(2);
    line(valueX, bottom, valueX, valueY);

    // Circle at curve point
    fill(sylviaAuburn);
    noStroke();
    ellipse(valueX, valueY, 12, 12);

    // Drag handle at bottom
    fill(sylviaAuburn);
    triangle(valueX - 8, bottom + 35, valueX + 8, bottom + 35, valueX, bottom + 25);

    // Value label
    textAlign(CENTER, BOTTOM);
    textSize(12);
    fill(sylviaAuburn);
    text('x = ' + rawValue.toFixed(1), valueX, valueY - 8);
}

function drawZScoreDisplay() {
    let z = (rawValue - mean) / sd;

    // Display box
    let boxX = canvasWidth - 200;
    let boxY = 45;

    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(boxX, boxY, 180, 120, 5);

    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Z-Score Calculation', boxX + 90, boxY + 8);

    // Formula
    textSize(12);
    textAlign(LEFT, TOP);
    fill(80);
    text('z = (x - μ) / σ', boxX + 15, boxY + 32);

    // Substitution
    text('z = (' + rawValue.toFixed(1) + ' - ' + mean.toFixed(0) + ') / ' + sd.toFixed(0), boxX + 15, boxY + 52);

    // Result
    textSize(24);
    fill(sylviaGreen);
    textAlign(CENTER, TOP);
    text('z = ' + z.toFixed(3), boxX + 90, boxY + 75);

    // Interpretation
    textSize(10);
    fill(100);
    let interpretation = getInterpretation(z);
    text(interpretation, boxX + 90, boxY + 102);
}

function getInterpretation(z) {
    let absZ = Math.abs(z);
    if (absZ < 0.1) return 'At the mean';
    if (absZ < 1) return (z > 0 ? 'Above' : 'Below') + ' mean, within 1 SD';
    if (absZ < 2) return (z > 0 ? 'Above' : 'Below') + ' mean, 1-2 SDs';
    if (absZ < 3) return (z > 0 ? 'Unusual:' : 'Unusual:') + ' 2-3 SDs from mean';
    return 'Very unusual: >3 SDs from mean';
}

function drawControls() {
    let y = drawHeight + 15;

    // Preset buttons
    textSize(11);
    for (let i = 0; i < presets.length; i++) {
        let bx = 15 + i * 110;
        let bw = 100;
        let bh = 24;

        // Button
        fill(sylviaGreen);
        noStroke();
        rect(bx, y, bw, bh, 4);

        fill('white');
        textAlign(CENTER, CENTER);
        text(presets[i].name, bx + bw / 2, y + bh / 2);

        presetButtons[i] = { x: bx, y: y, w: bw, h: bh };
    }

    // Mean slider
    let sliderX = 360;
    textAlign(LEFT, CENTER);
    fill('black');
    textSize(11);
    text('μ: ' + mean.toFixed(0), sliderX, y + 12);

    fill(220);
    noStroke();
    rect(sliderX + 50, y + 6, 80, 12, 3);
    let meanPos = map(mean, 0, 200, sliderX + 50, sliderX + 130);
    fill(sylviaGreen);
    ellipse(meanPos, y + 12, 14, 14);

    // SD slider
    let sdX = 500;
    fill('black');
    text('σ: ' + sd.toFixed(0), sdX, y + 12);

    fill(220);
    noStroke();
    rect(sdX + 40, y + 6, 80, 12, 3);
    let sdPos = map(sd, 5, 50, sdX + 40, sdX + 120);
    fill(sylviaAuburn);
    ellipse(sdPos, y + 12, 14, 14);

    // Reset button
    let resetX = canvasWidth - 60;
    fill(100);
    rect(resetX, y, 50, 24, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    text('Reset', resetX + 25, y + 12);
}

function mousePressed() {
    let y = drawHeight + 15;

    // Check preset buttons
    for (let i = 0; i < presets.length; i++) {
        let btn = presetButtons[i];
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            mean = presets[i].mean;
            sd = presets[i].sd;
            rawValue = presets[i].value;
            return;
        }
    }

    // Check reset button
    let resetX = canvasWidth - 60;
    if (mouseX >= resetX && mouseX <= resetX + 50 &&
        mouseY >= y && mouseY <= y + 24) {
        mean = 100;
        sd = 15;
        rawValue = 115;
        return;
    }

    // Check value marker drag
    let curveLeft = margin + 60;
    let curveRight = canvasWidth - margin - 60;
    let curveBottom = 220;
    let valueX = map(rawValue, mean - 4 * sd, mean + 4 * sd, curveLeft, curveRight);
    if (mouseY >= curveBottom && mouseY <= curveBottom + 40 &&
        Math.abs(mouseX - valueX) < 20) {
        draggingValue = true;
    }
}

function mouseDragged() {
    let y = drawHeight + 15;

    if (draggingValue) {
        let curveLeft = margin + 60;
        let curveRight = canvasWidth - margin - 60;
        rawValue = map(mouseX, curveLeft, curveRight, mean - 4 * sd, mean + 4 * sd);
        rawValue = constrain(rawValue, mean - 4 * sd, mean + 4 * sd);
        return;
    }

    // Mean slider
    let sliderX = 360;
    if (mouseY >= y + 2 && mouseY <= y + 22 &&
        mouseX >= sliderX + 50 && mouseX <= sliderX + 130) {
        mean = map(mouseX, sliderX + 50, sliderX + 130, 0, 200);
        mean = constrain(mean, 0, 200);
    }

    // SD slider
    let sdX = 500;
    if (mouseY >= y + 2 && mouseY <= y + 22 &&
        mouseX >= sdX + 40 && mouseX <= sdX + 120) {
        sd = map(mouseX, sdX + 40, sdX + 120, 5, 50);
        sd = constrain(sd, 5, 50);
    }
}

function mouseReleased() {
    draggingValue = false;
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
