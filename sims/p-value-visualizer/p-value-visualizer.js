// P-Value Visualizer MicroSim
// Visualize p-values as areas under the normal curve
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let margin = 25;
let defaultTextSize = 16;

// Test parameters
let zScore = 1.96;
let testType = 'two-sided'; // 'two-sided', 'left', 'right'

// UI state
let draggingZ = false;

// Computed values
let pValue = 0;

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
    calculatePValue();

    describe('Interactive p-value visualization showing shaded areas under the normal curve', LABEL);
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
    text('P-Value Visualizer', canvasWidth / 2, 8);

    // Draw components
    drawNormalCurve();
    drawTestTypeSelector();
    drawPValueDisplay();
    drawInterpretation();
    drawControls();
}

function calculatePValue() {
    // Standard normal CDF approximation
    let p = normalCDF(zScore);

    if (testType === 'two-sided') {
        pValue = 2 * (1 - normalCDF(Math.abs(zScore)));
    } else if (testType === 'left') {
        pValue = normalCDF(zScore);
    } else { // right
        pValue = 1 - normalCDF(zScore);
    }

    pValue = Math.max(0, Math.min(1, pValue));
}

// Approximation of standard normal CDF
function normalCDF(z) {
    let a1 = 0.254829592;
    let a2 = -0.284496736;
    let a3 = 1.421413741;
    let a4 = -1.453152027;
    let a5 = 1.061405429;
    let p = 0.3275911;

    let sign = 1;
    if (z < 0) sign = -1;
    z = Math.abs(z) / Math.sqrt(2);

    let t = 1.0 / (1.0 + p * z);
    let y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);

    return 0.5 * (1.0 + sign * y);
}

function drawNormalCurve() {
    let curveLeft = margin + 50;
    let curveRight = canvasWidth - margin - 200;
    let curveTop = 80;
    let curveBottom = 280;

    // Draw shaded regions first
    drawShadedRegions(curveLeft, curveRight, curveTop, curveBottom);

    // Draw axis
    stroke(100);
    strokeWeight(2);
    line(curveLeft, curveBottom, curveRight, curveBottom);

    // Draw curve
    stroke(sylviaGreen);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let px = curveLeft; px <= curveRight; px++) {
        let z = map(px, curveLeft, curveRight, -4, 4);
        let density = Math.exp(-0.5 * z * z);
        let y = map(density, 0, 1.15, curveBottom, curveTop);
        vertex(px, y);
    }
    endShape();

    // Draw mean line
    let meanX = map(0, -4, 4, curveLeft, curveRight);
    stroke(100);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    line(meanX, curveTop, meanX, curveBottom);
    drawingContext.setLineDash([]);

    // Z-score labels
    textAlign(CENTER, TOP);
    textSize(11);
    noStroke();
    for (let z = -3; z <= 3; z++) {
        let zx = map(z, -4, 4, curveLeft, curveRight);
        stroke(150);
        strokeWeight(1);
        line(zx, curveBottom, zx, curveBottom + 5);
        noStroke();
        fill(100);
        text('z=' + z, zx, curveBottom + 8);
    }

    // Draw z-score marker
    let zX = map(constrain(zScore, -4, 4), -4, 4, curveLeft, curveRight);
    let zDensity = Math.exp(-0.5 * Math.pow(constrain(zScore, -4, 4), 2));
    let zY = map(zDensity, 0, 1.15, curveBottom, curveTop);

    stroke(sylviaAuburn);
    strokeWeight(2);
    line(zX, curveBottom, zX, zY);

    fill(sylviaAuburn);
    noStroke();
    ellipse(zX, zY, 12, 12);

    // Drag handle
    fill(sylviaAuburn);
    triangle(zX - 10, curveBottom + 25, zX + 10, curveBottom + 25, zX, curveBottom + 12);

    // Z value label
    textAlign(CENTER, BOTTOM);
    textSize(14);
    fill(sylviaAuburn);
    text('z = ' + zScore.toFixed(2), zX, zY - 10);

    // Store curve bounds for dragging
    this.curveBounds = { left: curveLeft, right: curveRight, bottom: curveBottom };
}

function drawShadedRegions(left, right, top, bottom) {
    let alpha = pValue < 0.05 ? 180 : 120;
    let shadeColor = pValue < 0.05 ? color(244, 67, 54, alpha) : color(33, 150, 243, alpha);

    noStroke();
    fill(shadeColor);

    if (testType === 'two-sided') {
        // Shade both tails
        let posZ = Math.abs(zScore);
        let negZ = -posZ;

        // Left tail
        beginShape();
        vertex(left, bottom);
        for (let px = left; px <= right; px++) {
            let z = map(px, left, right, -4, 4);
            if (z <= negZ) {
                let density = Math.exp(-0.5 * z * z);
                let y = map(density, 0, 1.15, bottom, top);
                vertex(px, y);
            }
        }
        let negZX = map(negZ, -4, 4, left, right);
        vertex(negZX, bottom);
        endShape(CLOSE);

        // Right tail
        beginShape();
        let posZX = map(posZ, -4, 4, left, right);
        vertex(posZX, bottom);
        for (let px = left; px <= right; px++) {
            let z = map(px, left, right, -4, 4);
            if (z >= posZ) {
                let density = Math.exp(-0.5 * z * z);
                let y = map(density, 0, 1.15, bottom, top);
                vertex(px, y);
            }
        }
        vertex(right, bottom);
        endShape(CLOSE);

    } else if (testType === 'left') {
        // Shade left tail
        beginShape();
        vertex(left, bottom);
        for (let px = left; px <= right; px++) {
            let z = map(px, left, right, -4, 4);
            if (z <= zScore) {
                let density = Math.exp(-0.5 * z * z);
                let y = map(density, 0, 1.15, bottom, top);
                vertex(px, y);
            }
        }
        let zX = map(zScore, -4, 4, left, right);
        vertex(zX, bottom);
        endShape(CLOSE);

    } else { // right
        // Shade right tail
        beginShape();
        let zX = map(zScore, -4, 4, left, right);
        vertex(zX, bottom);
        for (let px = left; px <= right; px++) {
            let z = map(px, left, right, -4, 4);
            if (z >= zScore) {
                let density = Math.exp(-0.5 * z * z);
                let y = map(density, 0, 1.15, bottom, top);
                vertex(px, y);
            }
        }
        vertex(right, bottom);
        endShape(CLOSE);
    }
}

function drawTestTypeSelector() {
    let selectorX = canvasWidth - 185;
    let selectorY = 45;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(selectorX, selectorY, 170, 110, 8);

    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Test Type', selectorX + 85, selectorY + 8);

    // Radio buttons
    let options = [
        { id: 'two-sided', label: 'Two-sided (Ha: p != p0)' },
        { id: 'left', label: 'Left-tailed (Ha: p < p0)' },
        { id: 'right', label: 'Right-tailed (Ha: p > p0)' }
    ];

    textAlign(LEFT, CENTER);
    textSize(12);

    for (let i = 0; i < options.length; i++) {
        let yPos = selectorY + 38 + i * 24;
        let isSelected = testType === options[i].id;

        // Radio circle
        stroke(sylviaGreen);
        strokeWeight(2);
        fill(isSelected ? sylviaGreen : 'white');
        ellipse(selectorX + 18, yPos, 14, 14);

        if (isSelected) {
            fill('white');
            noStroke();
            ellipse(selectorX + 18, yPos, 6, 6);
        }

        // Label
        fill(80);
        noStroke();
        text(options[i].label, selectorX + 32, yPos);
    }

    // Store bounds for click detection
    this.radioOptions = options.map((opt, i) => ({
        id: opt.id,
        x: selectorX + 5,
        y: selectorY + 38 + i * 24 - 12,
        w: 160,
        h: 24
    }));
}

function drawPValueDisplay() {
    let displayX = canvasWidth - 185;
    let displayY = 165;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(displayX, displayY, 170, 95, 8);

    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('P-Value', displayX + 85, displayY + 8);

    // Large p-value display
    textSize(32);
    fill(pValue < 0.05 ? '#F44336' : sylviaGreen);
    text(pValue.toFixed(4), displayX + 85, displayY + 30);

    // Percentage
    textSize(14);
    fill(80);
    text('(' + (pValue * 100).toFixed(2) + '%)', displayX + 85, displayY + 68);
}

function drawInterpretation() {
    let interpX = margin;
    let interpY = 320;
    let interpW = canvasWidth - 2 * margin;
    let interpH = 70;

    // Background
    fill(sylviaCream);
    stroke(sylviaGreen);
    strokeWeight(1);
    rect(interpX, interpY, interpW, interpH, 5);

    // Determine significance
    let isSignificant = pValue < 0.05;

    // Status indicator
    fill(isSignificant ? '#F44336' : sylviaGreen);
    noStroke();
    rect(interpX + 10, interpY + 10, 8, interpH - 20, 4);

    // Title
    fill('black');
    textAlign(LEFT, TOP);
    textSize(14);
    text('Interpretation (at alpha = 0.05):', interpX + 30, interpY + 10);

    // Main interpretation
    fill(isSignificant ? '#F44336' : sylviaGreen);
    textSize(15);
    let mainText = isSignificant ?
        'Statistically Significant - Reject H0' :
        'Not Statistically Significant - Fail to Reject H0';
    text(mainText, interpX + 220, interpY + 8);

    // Explanation
    fill(80);
    textSize(12);
    let explanation;
    if (testType === 'two-sided') {
        explanation = 'If H0 is true, there is a ' + (pValue * 100).toFixed(2) + '% chance of observing a test statistic at least as extreme as |z| = ' + Math.abs(zScore).toFixed(2) + ' in either direction.';
    } else if (testType === 'left') {
        explanation = 'If H0 is true, there is a ' + (pValue * 100).toFixed(2) + '% chance of observing a test statistic as small as z = ' + zScore.toFixed(2) + ' or smaller.';
    } else {
        explanation = 'If H0 is true, there is a ' + (pValue * 100).toFixed(2) + '% chance of observing a test statistic as large as z = ' + zScore.toFixed(2) + ' or larger.';
    }
    text(explanation, interpX + 30, interpY + 35, interpW - 50);
}

function drawControls() {
    let y = drawHeight + 15;

    // Z-score input slider
    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('z-score:', 20, y + 12);

    // Slider track
    let sliderX = 80;
    let sliderW = 200;
    fill(220);
    rect(sliderX, y + 6, sliderW, 12, 6);

    // Slider handle
    let handlePos = map(zScore, -4, 4, sliderX, sliderX + sliderW);
    fill(sylviaAuburn);
    ellipse(handlePos, y + 12, 18, 18);

    // Z value display
    fill('black');
    textAlign(LEFT, CENTER);
    text(zScore.toFixed(2), sliderX + sliderW + 15, y + 12);

    // Quick z-value buttons
    let quickVals = [
        { z: 1.645, label: 'z=1.645' },
        { z: 1.96, label: 'z=1.96' },
        { z: 2.576, label: 'z=2.576' }
    ];

    let btnX = 360;
    for (let i = 0; i < quickVals.length; i++) {
        let bx = btnX + i * 85;

        fill(sylviaGreen);
        noStroke();
        rect(bx, y, 75, 24, 4);

        fill('white');
        textAlign(CENTER, CENTER);
        textSize(11);
        text(quickVals[i].label, bx + 37, y + 12);
    }

    // Reset button
    let resetX = canvasWidth - 70;
    fill('#666');
    rect(resetX, y, 55, 24, 4);
    fill('white');
    text('Reset', resetX + 27, y + 12);

    // Store bounds
    this.zSliderBounds = { x: sliderX, y: y + 2, w: sliderW, h: 20 };
    this.quickValBounds = quickVals.map((qv, i) => ({
        x: btnX + i * 85, y: y, w: 75, h: 24, z: qv.z
    }));
    this.resetBounds = { x: resetX, y: y, w: 55, h: 24 };
}

function mousePressed() {
    // Check radio buttons
    if (this.radioOptions) {
        for (let opt of this.radioOptions) {
            if (isInBounds(mouseX, mouseY, opt)) {
                testType = opt.id;
                calculatePValue();
                return;
            }
        }
    }

    // Check z-score dragging on curve
    if (this.curveBounds) {
        let cb = this.curveBounds;
        if (mouseY >= cb.bottom && mouseY <= cb.bottom + 35 &&
            mouseX >= cb.left && mouseX <= cb.right) {
            draggingZ = true;
        }
    }

    // Check z-slider
    if (this.zSliderBounds && isInBounds(mouseX, mouseY, this.zSliderBounds)) {
        draggingZ = true;
    }

    // Check quick value buttons
    if (this.quickValBounds) {
        for (let btn of this.quickValBounds) {
            if (isInBounds(mouseX, mouseY, btn)) {
                zScore = btn.z;
                calculatePValue();
                return;
            }
        }
    }

    // Check reset button
    if (this.resetBounds && isInBounds(mouseX, mouseY, this.resetBounds)) {
        zScore = 1.96;
        testType = 'two-sided';
        calculatePValue();
    }
}

function mouseDragged() {
    if (draggingZ) {
        // Check if dragging on curve or slider
        if (this.curveBounds && mouseY <= drawHeight) {
            let cb = this.curveBounds;
            zScore = map(mouseX, cb.left, cb.right, -4, 4);
        } else if (this.zSliderBounds) {
            let sb = this.zSliderBounds;
            zScore = map(mouseX, sb.x, sb.x + sb.w, -4, 4);
        }
        zScore = constrain(zScore, -4, 4);
        calculatePValue();
    }
}

function mouseReleased() {
    draggingZ = false;
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
