// Interactive T Critical Value Finder MicroSim
// Find t critical values for different df and confidence/significance levels
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 300;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 25;
let defaultTextSize = 14;

// Parameters
let df = 20;
let confidenceLevel = 0.95;
let testType = 'two-sided'; // 'two-sided', 'right-tailed', 'left-tailed'
let viewMode = 'confidence'; // 'confidence' or 'hypothesis'

// Pre-computed t critical values
const tCriticalValues = {
    0.90: { 1: 6.314, 2: 2.920, 3: 2.353, 4: 2.132, 5: 2.015, 6: 1.943, 7: 1.895, 8: 1.860, 9: 1.833, 10: 1.812,
            11: 1.796, 12: 1.782, 13: 1.771, 14: 1.761, 15: 1.753, 16: 1.746, 17: 1.740, 18: 1.734, 19: 1.729, 20: 1.725,
            25: 1.708, 30: 1.697, 40: 1.684, 50: 1.676, 60: 1.671, 80: 1.664, 100: 1.660 },
    0.95: { 1: 12.706, 2: 4.303, 3: 3.182, 4: 2.776, 5: 2.571, 6: 2.447, 7: 2.365, 8: 2.306, 9: 2.262, 10: 2.228,
            11: 2.201, 12: 2.179, 13: 2.160, 14: 2.145, 15: 2.131, 16: 2.120, 17: 2.110, 18: 2.101, 19: 2.093, 20: 2.086,
            25: 2.060, 30: 2.042, 40: 2.021, 50: 2.009, 60: 2.000, 80: 1.990, 100: 1.984 },
    0.99: { 1: 63.657, 2: 9.925, 3: 5.841, 4: 4.604, 5: 4.032, 6: 3.707, 7: 3.499, 8: 3.355, 9: 3.250, 10: 3.169,
            11: 3.106, 12: 3.055, 13: 3.012, 14: 2.977, 15: 2.947, 16: 2.921, 17: 2.898, 18: 2.878, 19: 2.861, 20: 2.845,
            25: 2.787, 30: 2.750, 40: 2.704, 50: 2.678, 60: 2.660, 80: 2.639, 100: 2.626 }
};

// One-tailed critical values
const tOneTailed = {
    0.90: {}, 0.95: {}, 0.99: {}
};
// Copy and compute one-tailed values (use 80%, 90%, 98% two-tailed for 90%, 95%, 99% one-tailed)
// For simplicity, we'll use the relationship: one-tailed alpha = two-tailed alpha / 2

const zCriticalValues = { 0.90: 1.645, 0.95: 1.960, 0.99: 2.576 };

// Slider state
let draggingDf = false;

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    describe('Interactive t critical value finder showing the t-distribution with shaded regions for different confidence levels and test types', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    textStyle(BOLD);
    text('T Critical Value Finder', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Draw curve
    let curveLeft = margin + 50;
    let curveRight = canvasWidth - margin - 50;
    let curveTop = 55;
    let curveBottom = 200;

    drawAxis(curveLeft, curveRight, curveBottom);
    drawTCurve(curveLeft, curveRight, curveTop, curveBottom);
    drawInfoPanel();
    drawControls();
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

    for (let val = -4; val <= 4; val++) {
        let x = map(val, -4, 4, left, right);
        stroke(100);
        strokeWeight(1);
        line(x, y, x, y + 5);
        noStroke();
        text(val, x, y + 7);
    }

    textSize(11);
    text('t-value', (left + right) / 2, y + 20);
}

function drawTCurve(left, right, top, bottom) {
    let tCrit = getTCriticalValue(df, confidenceLevel);
    let maxDensity = 0.4;

    // Shade appropriate regions based on test type and view mode
    if (viewMode === 'confidence') {
        // Shade central region (confidence interval)
        fill(sylviaGreen);
        fill(red(color(sylviaGreen)), green(color(sylviaGreen)), blue(color(sylviaGreen)), 60);
        noStroke();
        beginShape();
        let leftCritX = map(-tCrit, -4, 4, left, right);
        let rightCritX = map(tCrit, -4, 4, left, right);
        vertex(max(leftCritX, left), bottom);
        for (let px = left; px <= right; px++) {
            let t = map(px, left, right, -4, 4);
            if (t >= -tCrit && t <= tCrit) {
                let density = tPDF(t, df);
                let py = map(density, 0, maxDensity * 1.1, bottom, top);
                py = constrain(py, top, bottom);
                vertex(px, py);
            }
        }
        vertex(min(rightCritX, right), bottom);
        endShape(CLOSE);
    } else {
        // Hypothesis test view - shade rejection region
        fill(sylviaAuburn);
        fill(red(color(sylviaAuburn)), green(color(sylviaAuburn)), blue(color(sylviaAuburn)), 80);
        noStroke();

        if (testType === 'two-sided') {
            // Both tails
            // Left tail
            beginShape();
            vertex(left, bottom);
            for (let px = left; px <= right; px++) {
                let t = map(px, left, right, -4, 4);
                if (t <= -tCrit) {
                    let density = tPDF(t, df);
                    let py = map(density, 0, maxDensity * 1.1, bottom, top);
                    vertex(px, py);
                }
            }
            let leftCritX = map(-tCrit, -4, 4, left, right);
            if (leftCritX >= left) vertex(leftCritX, bottom);
            endShape(CLOSE);

            // Right tail
            beginShape();
            let rightCritX = map(tCrit, -4, 4, left, right);
            if (rightCritX <= right) vertex(rightCritX, bottom);
            for (let px = left; px <= right; px++) {
                let t = map(px, left, right, -4, 4);
                if (t >= tCrit) {
                    let density = tPDF(t, df);
                    let py = map(density, 0, maxDensity * 1.1, bottom, top);
                    vertex(px, py);
                }
            }
            vertex(right, bottom);
            endShape(CLOSE);
        } else if (testType === 'right-tailed') {
            beginShape();
            let rightCritX = map(tCrit, -4, 4, left, right);
            vertex(rightCritX, bottom);
            for (let px = left; px <= right; px++) {
                let t = map(px, left, right, -4, 4);
                if (t >= tCrit) {
                    let density = tPDF(t, df);
                    let py = map(density, 0, maxDensity * 1.1, bottom, top);
                    vertex(px, py);
                }
            }
            vertex(right, bottom);
            endShape(CLOSE);
        } else if (testType === 'left-tailed') {
            beginShape();
            vertex(left, bottom);
            for (let px = left; px <= right; px++) {
                let t = map(px, left, right, -4, 4);
                if (t <= -tCrit) {
                    let density = tPDF(t, df);
                    let py = map(density, 0, maxDensity * 1.1, bottom, top);
                    vertex(px, py);
                }
            }
            let leftCritX = map(-tCrit, -4, 4, left, right);
            vertex(leftCritX, bottom);
            endShape(CLOSE);
        }
    }

    // Draw curve outline
    stroke(sylviaGreen);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let px = left; px <= right; px++) {
        let t = map(px, left, right, -4, 4);
        let density = tPDF(t, df);
        let py = map(density, 0, maxDensity * 1.1, bottom, top);
        py = constrain(py, top, bottom);
        vertex(px, py);
    }
    endShape();

    // Draw critical value lines
    stroke(sylviaAuburn);
    strokeWeight(2);

    if (testType === 'two-sided' || testType === 'left-tailed') {
        let leftCritX = map(-tCrit, -4, 4, left, right);
        if (leftCritX >= left) {
            line(leftCritX, top - 5, leftCritX, bottom);
            // Label
            fill(sylviaAuburn);
            noStroke();
            textAlign(CENTER, BOTTOM);
            textSize(11);
            text('-t* = ' + (-tCrit).toFixed(3), leftCritX, top - 8);
        }
    }

    if (testType === 'two-sided' || testType === 'right-tailed') {
        let rightCritX = map(tCrit, -4, 4, left, right);
        if (rightCritX <= right) {
            stroke(sylviaAuburn);
            strokeWeight(2);
            line(rightCritX, top - 5, rightCritX, bottom);
            // Label
            fill(sylviaAuburn);
            noStroke();
            textAlign(CENTER, BOTTOM);
            textSize(11);
            text('t* = ' + tCrit.toFixed(3), rightCritX, top - 8);
        }
    }
}

function drawInfoPanel() {
    let panelX = canvasWidth - margin - 180;
    let panelY = 40;

    fill(255, 255, 255, 240);
    stroke(150);
    strokeWeight(1);
    rect(panelX, panelY, 175, 95, 5);

    let tCrit = getTCriticalValue(df, confidenceLevel);
    let zCrit = zCriticalValues[confidenceLevel];

    fill(30);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Results', panelX + 10, panelY + 8);
    textStyle(NORMAL);

    textSize(11);
    fill(60);
    text('df = ' + df, panelX + 10, panelY + 28);

    if (viewMode === 'confidence') {
        text('Confidence = ' + Math.round(confidenceLevel * 100) + '%', panelX + 10, panelY + 44);
    } else {
        let alpha = 1 - confidenceLevel;
        text('\u03B1 = ' + alpha.toFixed(2), panelX + 10, panelY + 44);
    }

    fill(sylviaAuburn);
    textStyle(BOLD);
    text('t* = ' + tCrit.toFixed(3), panelX + 10, panelY + 62);
    textStyle(NORMAL);

    fill(80);
    textSize(10);
    if (df > 30) {
        text('z* = ' + zCrit.toFixed(3) + ' (for comparison)', panelX + 10, panelY + 80);
    } else {
        text('(z* would be ' + zCrit.toFixed(3) + ')', panelX + 10, panelY + 80);
    }
}

function drawControls() {
    let y = drawHeight + 10;

    // Row 1: DF slider and confidence buttons
    fill(30);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('df:', margin, y + 12);

    // Slider track
    let sliderLeft = margin + 25;
    let sliderRight = margin + 150;
    fill(220);
    rect(sliderLeft, y + 6, sliderRight - sliderLeft, 12, 6);

    // Slider handle
    let dfPos = map(df, 1, 100, sliderLeft, sliderRight);
    fill(sylviaGreen);
    ellipse(dfPos, y + 12, 16, 16);

    // DF value
    fill(30);
    text(df, sliderRight + 8, y + 12);

    // Confidence/alpha buttons
    let confX = margin + 200;
    textSize(11);
    text(viewMode === 'confidence' ? 'Confidence:' : 'Alpha (\u03B1):', confX, y + 12);

    let btnStartX = confX + 85;
    let levels = [0.90, 0.95, 0.99];
    let labels = viewMode === 'confidence' ? ['90%', '95%', '99%'] : ['0.10', '0.05', '0.01'];

    for (let i = 0; i < 3; i++) {
        let bx = btnStartX + i * 50;
        let isSelected = (levels[i] === confidenceLevel);

        fill(isSelected ? sylviaGreen : 220);
        stroke(isSelected ? sylviaGreen : 180);
        strokeWeight(1);
        rect(bx, y + 2, 45, 22, 4);

        fill(isSelected ? 255 : 60);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        text(labels[i], bx + 22, y + 13);
    }

    // Row 2: Test type and view mode
    let y2 = y + 35;

    // View mode toggle
    fill(30);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('View:', margin, y2 + 12);

    let vmBtnX = margin + 40;
    // Confidence interval view
    fill(viewMode === 'confidence' ? sylviaGreen : 220);
    stroke(viewMode === 'confidence' ? sylviaGreen : 180);
    strokeWeight(1);
    rect(vmBtnX, y2 + 2, 80, 22, 4);
    fill(viewMode === 'confidence' ? 255 : 60);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text('CI View', vmBtnX + 40, y2 + 13);

    // Hypothesis test view
    fill(viewMode === 'hypothesis' ? sylviaAuburn : 220);
    stroke(viewMode === 'hypothesis' ? sylviaAuburn : 180);
    strokeWeight(1);
    rect(vmBtnX + 85, y2 + 2, 80, 22, 4);
    fill(viewMode === 'hypothesis' ? 255 : 60);
    noStroke();
    textAlign(CENTER, CENTER);
    text('Test View', vmBtnX + 125, y2 + 13);

    // Test type (only show if hypothesis view)
    if (viewMode === 'hypothesis') {
        let ttX = margin + 250;
        fill(30);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(11);
        text('Test type:', ttX, y2 + 12);

        let testTypes = [
            { id: 'two-sided', label: 'Two-sided' },
            { id: 'left-tailed', label: 'Left' },
            { id: 'right-tailed', label: 'Right' }
        ];

        for (let i = 0; i < 3; i++) {
            let bx = ttX + 70 + i * 70;
            let isSelected = (testTypes[i].id === testType);

            fill(isSelected ? sylviaAuburn : 220);
            stroke(isSelected ? sylviaAuburn : 180);
            strokeWeight(1);
            rect(bx, y2 + 2, 65, 22, 4);

            fill(isSelected ? 255 : 60);
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(9);
            text(testTypes[i].label, bx + 32, y2 + 13);
        }
    }

    // Helpful note
    fill(100);
    textAlign(RIGHT, CENTER);
    textSize(9);
    if (viewMode === 'confidence') {
        text('Green area = middle ' + Math.round(confidenceLevel * 100) + '%', canvasWidth - margin, y2 + 12);
    } else {
        text('Orange area = rejection region (\u03B1)', canvasWidth - margin, y2 + 12);
    }
}

function mousePressed() {
    let y = drawHeight + 10;

    // Check DF slider
    let sliderLeft = margin + 25;
    let sliderRight = margin + 150;
    let dfPos = map(df, 1, 100, sliderLeft, sliderRight);
    if (mouseY >= y && mouseY <= y + 24 && Math.abs(mouseX - dfPos) < 15) {
        draggingDf = true;
        return;
    }

    // Check confidence buttons
    let btnStartX = margin + 285;
    let levels = [0.90, 0.95, 0.99];
    for (let i = 0; i < 3; i++) {
        let bx = btnStartX + i * 50;
        if (mouseX >= bx && mouseX <= bx + 45 && mouseY >= y + 2 && mouseY <= y + 24) {
            confidenceLevel = levels[i];
            return;
        }
    }

    // Row 2 controls
    let y2 = y + 35;
    let vmBtnX = margin + 40;

    // View mode buttons
    if (mouseX >= vmBtnX && mouseX <= vmBtnX + 80 && mouseY >= y2 + 2 && mouseY <= y2 + 24) {
        viewMode = 'confidence';
        return;
    }
    if (mouseX >= vmBtnX + 85 && mouseX <= vmBtnX + 165 && mouseY >= y2 + 2 && mouseY <= y2 + 24) {
        viewMode = 'hypothesis';
        return;
    }

    // Test type buttons (if visible)
    if (viewMode === 'hypothesis') {
        let ttX = margin + 320;
        let testTypes = ['two-sided', 'left-tailed', 'right-tailed'];
        for (let i = 0; i < 3; i++) {
            let bx = ttX + i * 70;
            if (mouseX >= bx && mouseX <= bx + 65 && mouseY >= y2 + 2 && mouseY <= y2 + 24) {
                testType = testTypes[i];
                return;
            }
        }
    }
}

function mouseDragged() {
    if (draggingDf) {
        let sliderLeft = margin + 25;
        let sliderRight = margin + 150;
        df = Math.round(map(mouseX, sliderLeft, sliderRight, 1, 100));
        df = constrain(df, 1, 100);
    }
}

function mouseReleased() {
    draggingDf = false;
}

// T-distribution PDF
function tPDF(t, df) {
    let coef = gamma((df + 1) / 2) / (Math.sqrt(df * Math.PI) * gamma(df / 2));
    return coef * Math.pow(1 + t * t / df, -(df + 1) / 2);
}

// Gamma function (Lanczos approximation)
function gamma(z) {
    if (z < 0.5) {
        return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    }
    z -= 1;
    let g = 7;
    let c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
             771.32342877765313, -176.61502916214059, 12.507343278686905,
             -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    let x = c[0];
    for (let i = 1; i < g + 2; i++) {
        x += c[i] / (z + i);
    }
    let t = z + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

function getTCriticalValue(df, conf) {
    let table = tCriticalValues[conf];
    if (table[df]) return table[df];

    let keys = Object.keys(table).map(Number).sort((a, b) => a - b);
    if (df < keys[0]) return table[keys[0]];
    if (df > keys[keys.length - 1]) return table[keys[keys.length - 1]];

    for (let i = 0; i < keys.length - 1; i++) {
        if (df > keys[i] && df < keys[i + 1]) {
            let t1 = table[keys[i]];
            let t2 = table[keys[i + 1]];
            let ratio = (df - keys[i]) / (keys[i + 1] - keys[i]);
            return t1 + ratio * (t2 - t1);
        }
    }
    return 1.96;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = min(containerWidth, 800);
    if (canvasWidth < 600) canvasWidth = 600;
}
