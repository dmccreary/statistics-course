// T-Distribution vs Normal Distribution Comparison MicroSim
// Shows how t-distributions with different df compare to the standard normal
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 350;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 25;
let defaultTextSize = 14;

// Distribution parameters
let df = 5;
let confidenceLevel = 0.95;
let showTails = true;
let showCriticalValues = true;

// Pre-computed t critical values for common df and confidence levels
const tCriticalValues = {
    0.90: { 1: 6.314, 2: 2.920, 3: 2.353, 4: 2.132, 5: 2.015, 10: 1.812, 15: 1.753, 20: 1.725, 30: 1.697, 50: 1.676, 100: 1.660 },
    0.95: { 1: 12.706, 2: 4.303, 3: 3.182, 4: 2.776, 5: 2.571, 10: 2.228, 15: 2.131, 20: 2.086, 30: 2.042, 50: 2.009, 100: 1.984 },
    0.99: { 1: 63.657, 2: 9.925, 3: 5.841, 4: 4.604, 5: 4.032, 10: 3.169, 15: 2.947, 20: 2.845, 30: 2.750, 50: 2.678, 100: 2.626 }
};

// Z critical values
const zCriticalValues = { 0.90: 1.645, 0.95: 1.960, 0.99: 2.576 };

// Slider state
let draggingDf = false;

// Confidence level buttons
let confButtons = [
    { level: 0.90, label: '90%', x: 0 },
    { level: 0.95, label: '95%', x: 0 },
    { level: 0.99, label: '99%', x: 0 }
];

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';
let sylviaGreenLight = '#4CAF50';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    describe('Interactive visualization comparing t-distributions with different degrees of freedom to the standard normal distribution, showing critical values and tail areas', LABEL);
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
    text('T-Distribution vs Normal Distribution', canvasWidth / 2, 10);
    textStyle(NORMAL);

    // Draw curves
    let curveLeft = margin + 40;
    let curveRight = canvasWidth - margin - 40;
    let curveTop = 60;
    let curveBottom = 260;

    drawAxis(curveLeft, curveRight, curveBottom);
    drawCurves(curveLeft, curveRight, curveTop, curveBottom);
    drawLegend();
    drawInfoPanel(curveRight);
    drawControls();
}

function drawAxis(left, right, y) {
    stroke(100);
    strokeWeight(2);
    line(left, y, right, y);

    // Tick marks and labels
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
        text(val, x, y + 8);
    }

    // Axis label
    textSize(11);
    text('Standard deviations from mean (z or t)', (left + right) / 2, y + 22);
}

function drawCurves(left, right, top, bottom) {
    // Get critical values
    let tCrit = getTCriticalValue(df, confidenceLevel);
    let zCrit = zCriticalValues[confidenceLevel];

    // Calculate max density for scaling
    let maxDensity = 0.4; // Normal at peak

    // Draw shaded tail areas if enabled
    if (showTails) {
        // Normal distribution tails (blue)
        fill(0, 100, 200, 40);
        noStroke();

        // Left tail
        beginShape();
        vertex(left, bottom);
        for (let px = left; px <= right; px++) {
            let z = map(px, left, right, -4, 4);
            if (z <= -zCrit) {
                let density = normalPDF(z);
                let py = map(density, 0, maxDensity * 1.1, bottom, top);
                py = constrain(py, top, bottom);
                vertex(px, py);
            }
        }
        let leftCritX = map(-zCrit, -4, 4, left, right);
        vertex(leftCritX, bottom);
        endShape(CLOSE);

        // Right tail
        beginShape();
        let rightCritX = map(zCrit, -4, 4, left, right);
        vertex(rightCritX, bottom);
        for (let px = left; px <= right; px++) {
            let z = map(px, left, right, -4, 4);
            if (z >= zCrit) {
                let density = normalPDF(z);
                let py = map(density, 0, maxDensity * 1.1, bottom, top);
                py = constrain(py, top, bottom);
                vertex(px, py);
            }
        }
        vertex(right, bottom);
        endShape(CLOSE);

        // T-distribution tails (orange)
        fill(180, 100, 30, 50);

        // Left tail
        beginShape();
        vertex(left, bottom);
        for (let px = left; px <= right; px++) {
            let t = map(px, left, right, -4, 4);
            if (t <= -tCrit) {
                let density = tPDF(t, df);
                let py = map(density, 0, maxDensity * 1.1, bottom, top);
                py = constrain(py, top, bottom);
                vertex(px, py);
            }
        }
        let leftTCritX = map(-tCrit, -4, 4, left, right);
        if (-tCrit >= -4) {
            vertex(leftTCritX, bottom);
        }
        endShape(CLOSE);

        // Right tail
        beginShape();
        let rightTCritX = map(tCrit, -4, 4, left, right);
        if (tCrit <= 4) {
            vertex(rightTCritX, bottom);
        }
        for (let px = left; px <= right; px++) {
            let t = map(px, left, right, -4, 4);
            if (t >= tCrit) {
                let density = tPDF(t, df);
                let py = map(density, 0, maxDensity * 1.1, bottom, top);
                py = constrain(py, top, bottom);
                vertex(px, py);
            }
        }
        vertex(right, bottom);
        endShape(CLOSE);
    }

    // Draw normal curve (Z) - blue solid line
    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let px = left; px <= right; px++) {
        let z = map(px, left, right, -4, 4);
        let density = normalPDF(z);
        let py = map(density, 0, maxDensity * 1.1, bottom, top);
        py = constrain(py, top, bottom);
        vertex(px, py);
    }
    endShape();

    // Draw t-distribution - orange dashed line
    stroke(sylviaAuburn);
    strokeWeight(3);
    drawingContext.setLineDash([8, 4]);
    beginShape();
    for (let px = left; px <= right; px++) {
        let t = map(px, left, right, -4, 4);
        let density = tPDF(t, df);
        let py = map(density, 0, maxDensity * 1.1, bottom, top);
        py = constrain(py, top, bottom);
        vertex(px, py);
    }
    endShape();
    drawingContext.setLineDash([]);

    // Draw critical value lines if enabled
    if (showCriticalValues) {
        // Z critical values
        stroke(0, 100, 200, 180);
        strokeWeight(2);
        let zLeftX = map(-zCrit, -4, 4, left, right);
        let zRightX = map(zCrit, -4, 4, left, right);
        if (zLeftX >= left) line(zLeftX, top, zLeftX, bottom);
        if (zRightX <= right) line(zRightX, top, zRightX, bottom);

        // T critical values
        stroke(sylviaAuburn);
        strokeWeight(2);
        let tLeftX = map(-tCrit, -4, 4, left, right);
        let tRightX = map(tCrit, -4, 4, left, right);
        if (tLeftX >= left) line(tLeftX, top, tLeftX, bottom);
        if (tRightX <= right) line(tRightX, top, tRightX, bottom);
    }
}

function drawLegend() {
    let legendX = margin + 10;
    let legendY = 45;

    fill(255, 255, 255, 230);
    stroke(150);
    strokeWeight(1);
    rect(legendX, legendY, 180, 55, 5);

    // Normal curve
    stroke(0, 100, 200);
    strokeWeight(3);
    line(legendX + 10, legendY + 18, legendX + 40, legendY + 18);
    fill(0, 100, 200);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Standard Normal (Z)', legendX + 48, legendY + 18);

    // T curve
    stroke(sylviaAuburn);
    strokeWeight(3);
    drawingContext.setLineDash([6, 3]);
    line(legendX + 10, legendY + 38, legendX + 40, legendY + 38);
    drawingContext.setLineDash([]);
    fill(sylviaAuburn);
    noStroke();
    text('T-Distribution (df=' + df + ')', legendX + 48, legendY + 38);
}

function drawInfoPanel(rightEdge) {
    let panelX = rightEdge - 160;
    let panelY = 45;

    fill(255, 255, 255, 230);
    stroke(150);
    strokeWeight(1);
    rect(panelX, panelY, 155, 85, 5);

    let tCrit = getTCriticalValue(df, confidenceLevel);
    let zCrit = zCriticalValues[confidenceLevel];
    let diff = tCrit - zCrit;

    fill(30);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Critical Values (' + Math.round(confidenceLevel * 100) + '% CI)', panelX + 8, panelY + 8);
    textStyle(NORMAL);

    textSize(11);
    fill(0, 100, 200);
    text('z* = ' + zCrit.toFixed(3), panelX + 10, panelY + 28);
    fill(sylviaAuburn);
    text('t* = ' + tCrit.toFixed(3), panelX + 10, panelY + 44);
    fill(80);
    text('Difference: ' + diff.toFixed(3), panelX + 10, panelY + 60);

    // Small note about heavier tails
    if (df < 30) {
        textSize(9);
        fill(100);
        text('t has heavier tails', panelX + 10, panelY + 74);
    }
}

function drawControls() {
    let y = drawHeight + 12;

    // DF Slider
    fill(30);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Degrees of Freedom (df):', margin, y + 12);

    // Slider track
    let sliderLeft = margin + 160;
    let sliderRight = margin + 340;
    fill(220);
    rect(sliderLeft, y + 6, sliderRight - sliderLeft, 12, 6);

    // Slider handle
    let dfPos = map(df, 1, 100, sliderLeft, sliderRight);
    fill(sylviaGreen);
    ellipse(dfPos, y + 12, 18, 18);

    // DF value display
    fill(30);
    textAlign(LEFT, CENTER);
    text('df = ' + df, sliderRight + 15, y + 12);

    // Confidence level buttons
    let confX = margin + 420;
    fill(30);
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Confidence:', confX, y + 12);

    confX += 80;
    for (let i = 0; i < confButtons.length; i++) {
        confButtons[i].x = confX + i * 55;
        let isSelected = (confButtons[i].level === confidenceLevel);

        fill(isSelected ? sylviaGreen : 220);
        stroke(isSelected ? sylviaGreen : 180);
        strokeWeight(1);
        rect(confButtons[i].x, y + 2, 50, 22, 4);

        fill(isSelected ? 255 : 60);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(11);
        text(confButtons[i].label, confButtons[i].x + 25, y + 13);
    }

    // Second row - checkboxes
    let y2 = y + 38;

    // Show tails checkbox
    drawCheckbox(margin, y2, showTails, 'Show tail areas');

    // Show critical values checkbox
    drawCheckbox(margin + 150, y2, showCriticalValues, 'Show critical values');

    // Key insight
    fill(80);
    textAlign(LEFT, CENTER);
    textSize(10);
    text('As df increases, t-distribution approaches the normal distribution', margin + 350, y2 + 8);
}

function drawCheckbox(x, y, checked, label) {
    stroke(100);
    strokeWeight(1);
    fill(checked ? sylviaGreen : 255);
    rect(x, y, 16, 16, 3);

    if (checked) {
        stroke(255);
        strokeWeight(2);
        line(x + 3, y + 8, x + 7, y + 12);
        line(x + 7, y + 12, x + 13, y + 4);
    }

    fill(30);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text(label, x + 22, y + 8);
}

function mousePressed() {
    let y = drawHeight + 12;

    // Check DF slider
    let sliderLeft = margin + 160;
    let sliderRight = margin + 340;
    let dfPos = map(df, 1, 100, sliderLeft, sliderRight);
    if (mouseY >= y && mouseY <= y + 24 && Math.abs(mouseX - dfPos) < 20) {
        draggingDf = true;
        return;
    }

    // Check confidence buttons
    for (let btn of confButtons) {
        if (mouseX >= btn.x && mouseX <= btn.x + 50 &&
            mouseY >= y + 2 && mouseY <= y + 24) {
            confidenceLevel = btn.level;
            return;
        }
    }

    // Check checkboxes
    let y2 = y + 38;

    // Show tails checkbox
    if (mouseX >= margin && mouseX <= margin + 140 &&
        mouseY >= y2 && mouseY <= y2 + 18) {
        showTails = !showTails;
        return;
    }

    // Show critical values checkbox
    if (mouseX >= margin + 150 && mouseX <= margin + 310 &&
        mouseY >= y2 && mouseY <= y2 + 18) {
        showCriticalValues = !showCriticalValues;
        return;
    }
}

function mouseDragged() {
    if (draggingDf) {
        let sliderLeft = margin + 160;
        let sliderRight = margin + 340;
        df = Math.round(map(mouseX, sliderLeft, sliderRight, 1, 100));
        df = constrain(df, 1, 100);
    }
}

function mouseReleased() {
    draggingDf = false;
}

// Standard normal PDF
function normalPDF(z) {
    return Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
}

// T-distribution PDF
function tPDF(t, df) {
    let coef = gamma((df + 1) / 2) / (Math.sqrt(df * Math.PI) * gamma(df / 2));
    return coef * Math.pow(1 + t * t / df, -(df + 1) / 2);
}

// Gamma function approximation (Lanczos approximation)
function gamma(z) {
    if (z < 0.5) {
        return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    }
    z -= 1;
    let g = 7;
    let c = [
        0.99999999999980993,
        676.5203681218851,
        -1259.1392167224028,
        771.32342877765313,
        -176.61502916214059,
        12.507343278686905,
        -0.13857109526572012,
        9.9843695780195716e-6,
        1.5056327351493116e-7
    ];

    let x = c[0];
    for (let i = 1; i < g + 2; i++) {
        x += c[i] / (z + i);
    }

    let t = z + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

// Get t critical value with interpolation
function getTCriticalValue(df, conf) {
    let table = tCriticalValues[conf];

    // Exact match
    if (table[df]) return table[df];

    // Find surrounding values for interpolation
    let keys = Object.keys(table).map(Number).sort((a, b) => a - b);

    if (df < keys[0]) return table[keys[0]];
    if (df > keys[keys.length - 1]) return table[keys[keys.length - 1]];

    // Linear interpolation
    for (let i = 0; i < keys.length - 1; i++) {
        if (df > keys[i] && df < keys[i + 1]) {
            let t1 = table[keys[i]];
            let t2 = table[keys[i + 1]];
            let ratio = (df - keys[i]) / (keys[i + 1] - keys[i]);
            return t1 + ratio * (t2 - t1);
        }
    }

    return 1.96; // Fallback
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
