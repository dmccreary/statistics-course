// Normal Probability Calculator MicroSim
// Calculate and visualize probabilities for normal distributions
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 380;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// Distribution parameters
let mean = 100;
let sd = 15;

// Query parameters
let queryType = 'less'; // 'less', 'greater', 'between'
let valueA = 115;
let valueB = 130;

// Dragging state
let draggingA = false;
let draggingB = false;

// Sylvia theme
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    describe('Normal probability calculator showing shaded area for different probability queries', LABEL);
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
    text('Normal Probability Calculator', canvasWidth / 2, 8);

    // Subtitle
    textSize(12);
    fill(100);
    text('μ = ' + mean.toFixed(0) + ', σ = ' + sd.toFixed(0), canvasWidth / 2, 32);

    // Draw curve and shaded area
    let curveLeft = margin + 50;
    let curveRight = canvasWidth - margin - 50;
    let curveTop = 90;
    let curveBottom = 260;

    drawShadedArea(curveLeft, curveRight, curveTop, curveBottom);
    drawNormalCurve(curveLeft, curveRight, curveTop, curveBottom);
    drawAxis(curveLeft, curveRight, curveBottom);
    drawValueMarkers(curveLeft, curveRight, curveBottom);
    drawProbabilityDisplay();
    drawControls();

    // Instructions
    fill(100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Drag the markers to change values, or select a query type below', canvasWidth / 2, drawHeight - 5);
}

function drawShadedArea(left, right, top, bottom) {
    let maxDensity = 1 / (sd * Math.sqrt(2 * Math.PI));

    let shadeStart, shadeEnd;
    if (queryType === 'less') {
        shadeStart = mean - 4 * sd;
        shadeEnd = valueA;
    } else if (queryType === 'greater') {
        shadeStart = valueA;
        shadeEnd = mean + 4 * sd;
    } else { // between
        shadeStart = Math.min(valueA, valueB);
        shadeEnd = Math.max(valueA, valueB);
    }

    let startPx = map(shadeStart, mean - 4 * sd, mean + 4 * sd, left, right);
    let endPx = map(shadeEnd, mean - 4 * sd, mean + 4 * sd, left, right);
    startPx = constrain(startPx, left, right);
    endPx = constrain(endPx, left, right);

    fill(46, 125, 50, 120);
    noStroke();
    beginShape();
    vertex(startPx, bottom);
    for (let px = startPx; px <= endPx; px++) {
        let x = map(px, left, right, mean - 4 * sd, mean + 4 * sd);
        let z = (x - mean) / sd;
        let density = Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
        let y = map(density, 0, maxDensity * 1.15, bottom, top);
        vertex(px, y);
    }
    vertex(endPx, bottom);
    endShape(CLOSE);
}

function drawNormalCurve(left, right, top, bottom) {
    let maxDensity = 1 / (sd * Math.sqrt(2 * Math.PI));

    stroke(sylviaGreen);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let px = left; px <= right; px++) {
        let x = map(px, left, right, mean - 4 * sd, mean + 4 * sd);
        let z = (x - mean) / sd;
        let density = Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
        let y = map(density, 0, maxDensity * 1.15, bottom, top);
        vertex(px, y);
    }
    endShape();

    // Mean line
    let meanX = map(mean, mean - 4 * sd, mean + 4 * sd, left, right);
    stroke(100);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    line(meanX, top, meanX, bottom);
    drawingContext.setLineDash([]);
}

function drawAxis(left, right, y) {
    stroke(100);
    strokeWeight(2);
    line(left, y, right, y);

    textAlign(CENTER, TOP);
    textSize(10);
    fill(100);
    noStroke();

    for (let k = -3; k <= 3; k++) {
        let x = map(mean + k * sd, mean - 4 * sd, mean + 4 * sd, left, right);
        if (x >= left && x <= right) {
            stroke(100);
            strokeWeight(1);
            line(x, y, x, y + 5);
            noStroke();
            text((mean + k * sd).toFixed(0), x, y + 8);
        }
    }
}

function drawValueMarkers(left, right, bottom) {
    // Marker A
    let aX = map(valueA, mean - 4 * sd, mean + 4 * sd, left, right);
    aX = constrain(aX, left, right);

    stroke(sylviaAuburn);
    strokeWeight(3);
    line(aX, bottom - 150, aX, bottom + 15);

    fill(sylviaAuburn);
    noStroke();
    triangle(aX - 8, bottom + 25, aX + 8, bottom + 25, aX, bottom + 15);

    textAlign(CENTER, TOP);
    textSize(11);
    text('x = ' + valueA.toFixed(1), aX, bottom + 28);

    // Z-score for A
    let zA = (valueA - mean) / sd;
    textSize(9);
    fill(100);
    text('z = ' + zA.toFixed(2), aX, bottom + 42);

    // Marker B (only for 'between')
    if (queryType === 'between') {
        let bX = map(valueB, mean - 4 * sd, mean + 4 * sd, left, right);
        bX = constrain(bX, left, right);

        stroke('#1565C0');
        strokeWeight(3);
        line(bX, bottom - 150, bX, bottom + 15);

        fill('#1565C0');
        noStroke();
        triangle(bX - 8, bottom + 25, bX + 8, bottom + 25, bX, bottom + 15);

        textAlign(CENTER, TOP);
        textSize(11);
        text('x = ' + valueB.toFixed(1), bX, bottom + 28);

        let zB = (valueB - mean) / sd;
        textSize(9);
        fill(100);
        text('z = ' + zB.toFixed(2), bX, bottom + 42);
    }
}

function drawProbabilityDisplay() {
    let prob = calculateProbability();

    let boxX = canvasWidth - 190;
    let boxY = 55;

    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(boxX, boxY, 170, 100, 5);

    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);

    // Query description
    let queryText = '';
    if (queryType === 'less') {
        queryText = 'P(X < ' + valueA.toFixed(1) + ')';
    } else if (queryType === 'greater') {
        queryText = 'P(X > ' + valueA.toFixed(1) + ')';
    } else {
        queryText = 'P(' + Math.min(valueA, valueB).toFixed(1) + ' < X < ' + Math.max(valueA, valueB).toFixed(1) + ')';
    }
    text(queryText, boxX + 85, boxY + 10);

    // Probability as decimal
    textSize(28);
    fill(sylviaGreen);
    text(prob.toFixed(4), boxX + 85, boxY + 32);

    // Probability as percentage
    textSize(16);
    fill(100);
    text('= ' + (prob * 100).toFixed(2) + '%', boxX + 85, boxY + 68);

    // Interpretation
    textSize(9);
    fill(80);
    let interp = getInterpretation(prob);
    text(interp, boxX + 85, boxY + 88);
}

function calculateProbability() {
    // Standard normal CDF approximation
    function normalCDF(z) {
        let a1 = 0.254829592;
        let a2 = -0.284496736;
        let a3 = 1.421413741;
        let a4 = -1.453152027;
        let a5 = 1.061405429;
        let p = 0.3275911;

        let sign = z < 0 ? -1 : 1;
        z = Math.abs(z) / Math.sqrt(2);

        let t = 1.0 / (1.0 + p * z);
        let y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);

        return 0.5 * (1.0 + sign * y);
    }

    if (queryType === 'less') {
        let z = (valueA - mean) / sd;
        return normalCDF(z);
    } else if (queryType === 'greater') {
        let z = (valueA - mean) / sd;
        return 1 - normalCDF(z);
    } else { // between
        let z1 = (Math.min(valueA, valueB) - mean) / sd;
        let z2 = (Math.max(valueA, valueB) - mean) / sd;
        return normalCDF(z2) - normalCDF(z1);
    }
}

function getInterpretation(prob) {
    if (prob < 0.01) return 'Extremely rare';
    if (prob < 0.05) return 'Unusual (< 5%)';
    if (prob < 0.16) return 'Somewhat uncommon';
    if (prob < 0.84) return 'Fairly common';
    if (prob < 0.95) return 'Somewhat uncommon';
    if (prob < 0.99) return 'Unusual (> 95%)';
    return 'Extremely common';
}

function drawControls() {
    let y = drawHeight + 12;

    // Query type buttons
    let types = [
        { type: 'less', label: 'P(X < a)' },
        { type: 'greater', label: 'P(X > a)' },
        { type: 'between', label: 'P(a < X < b)' }
    ];

    for (let i = 0; i < types.length; i++) {
        let bx = 15 + i * 100;
        let bw = 92;
        let bh = 26;

        fill(queryType === types[i].type ? sylviaGreen : '#999');
        noStroke();
        rect(bx, y, bw, bh, 4);

        fill('white');
        textAlign(CENTER, CENTER);
        textSize(12);
        text(types[i].label, bx + bw / 2, y + bh / 2);
    }

    // Mean slider
    let sliderX = 330;
    textAlign(LEFT, CENTER);
    fill('black');
    textSize(10);
    text('μ: ' + mean.toFixed(0), sliderX, y + 13);

    fill(220);
    noStroke();
    rect(sliderX + 40, y + 6, 70, 12, 3);
    let meanPos = map(mean, 50, 150, sliderX + 40, sliderX + 110);
    fill(sylviaGreen);
    ellipse(meanPos, y + 12, 12, 12);

    // SD slider
    let sdX = 460;
    fill('black');
    text('σ: ' + sd.toFixed(0), sdX, y + 13);

    fill(220);
    rect(sdX + 30, y + 6, 60, 12, 3);
    let sdPos = map(sd, 5, 30, sdX + 30, sdX + 90);
    fill(sylviaAuburn);
    ellipse(sdPos, y + 12, 12, 12);

    // Reset button
    let resetX = canvasWidth - 60;
    fill(100);
    rect(resetX, y, 50, 26, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Reset', resetX + 25, y + 13);
}

function mousePressed() {
    let y = drawHeight + 12;
    let curveLeft = margin + 50;
    let curveRight = canvasWidth - margin - 50;
    let curveBottom = 260;

    // Query type buttons
    let types = ['less', 'greater', 'between'];
    for (let i = 0; i < types.length; i++) {
        let bx = 15 + i * 100;
        if (mouseX >= bx && mouseX <= bx + 92 &&
            mouseY >= y && mouseY <= y + 26) {
            queryType = types[i];
            return;
        }
    }

    // Reset button
    let resetX = canvasWidth - 60;
    if (mouseX >= resetX && mouseX <= resetX + 50 &&
        mouseY >= y && mouseY <= y + 26) {
        mean = 100;
        sd = 15;
        valueA = 115;
        valueB = 130;
        queryType = 'less';
        return;
    }

    // Check value marker A drag
    let aX = map(valueA, mean - 4 * sd, mean + 4 * sd, curveLeft, curveRight);
    if (mouseY >= curveBottom && mouseY <= curveBottom + 50 &&
        Math.abs(mouseX - aX) < 20) {
        draggingA = true;
        return;
    }

    // Check value marker B drag
    if (queryType === 'between') {
        let bX = map(valueB, mean - 4 * sd, mean + 4 * sd, curveLeft, curveRight);
        if (mouseY >= curveBottom && mouseY <= curveBottom + 50 &&
            Math.abs(mouseX - bX) < 20) {
            draggingB = true;
            return;
        }
    }
}

function mouseDragged() {
    let y = drawHeight + 12;
    let curveLeft = margin + 50;
    let curveRight = canvasWidth - margin - 50;

    if (draggingA) {
        valueA = map(mouseX, curveLeft, curveRight, mean - 4 * sd, mean + 4 * sd);
        valueA = constrain(valueA, mean - 3.5 * sd, mean + 3.5 * sd);
        return;
    }

    if (draggingB) {
        valueB = map(mouseX, curveLeft, curveRight, mean - 4 * sd, mean + 4 * sd);
        valueB = constrain(valueB, mean - 3.5 * sd, mean + 3.5 * sd);
        return;
    }

    // Mean slider
    let sliderX = 330;
    if (mouseY >= y + 2 && mouseY <= y + 22 &&
        mouseX >= sliderX + 40 && mouseX <= sliderX + 110) {
        mean = map(mouseX, sliderX + 40, sliderX + 110, 50, 150);
        mean = constrain(mean, 50, 150);
    }

    // SD slider
    let sdX = 460;
    if (mouseY >= y + 2 && mouseY <= y + 22 &&
        mouseX >= sdX + 30 && mouseX <= sdX + 90) {
        sd = map(mouseX, sdX + 30, sdX + 90, 5, 30);
        sd = constrain(sd, 5, 30);
    }
}

function mouseReleased() {
    draggingA = false;
    draggingB = false;
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
