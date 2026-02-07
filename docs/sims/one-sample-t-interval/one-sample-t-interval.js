// One-Sample T-Interval Calculator MicroSim
// Step-by-step confidence interval calculation for a population mean
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 25;
let defaultTextSize = 14;

// Input values
let xBar = 8.2;
let s = 3.1;
let n = 25;
let confidenceLevel = 0.95;

// Input field states
let activeField = null;
let inputValues = { xBar: '8.2', s: '3.1', n: '25' };

// Calculated values
let df, tStar, se, marginOfError, lowerBound, upperBound;

// Animation state
let showStep = 5; // Show all steps (0-5)

// T critical values table
const tCriticalValues = {
    0.90: { 1: 6.314, 2: 2.920, 3: 2.353, 4: 2.132, 5: 2.015, 6: 1.943, 7: 1.895, 8: 1.860, 9: 1.833, 10: 1.812,
            11: 1.796, 12: 1.782, 13: 1.771, 14: 1.761, 15: 1.753, 16: 1.746, 17: 1.740, 18: 1.734, 19: 1.729, 20: 1.725,
            24: 1.711, 25: 1.708, 29: 1.699, 30: 1.697, 40: 1.684, 50: 1.676, 60: 1.671, 100: 1.660 },
    0.95: { 1: 12.706, 2: 4.303, 3: 3.182, 4: 2.776, 5: 2.571, 6: 2.447, 7: 2.365, 8: 2.306, 9: 2.262, 10: 2.228,
            11: 2.201, 12: 2.179, 13: 2.160, 14: 2.145, 15: 2.131, 16: 2.120, 17: 2.110, 18: 2.101, 19: 2.093, 20: 2.086,
            24: 2.064, 25: 2.060, 29: 2.045, 30: 2.042, 40: 2.021, 50: 2.009, 60: 2.000, 100: 1.984 },
    0.99: { 1: 63.657, 2: 9.925, 3: 5.841, 4: 4.604, 5: 4.032, 6: 3.707, 7: 3.499, 8: 3.355, 9: 3.250, 10: 3.169,
            11: 3.106, 12: 3.055, 13: 3.012, 14: 2.977, 15: 2.947, 16: 2.921, 17: 2.898, 18: 2.878, 19: 2.861, 20: 2.845,
            24: 2.797, 25: 2.787, 29: 2.756, 30: 2.750, 40: 2.704, 50: 2.678, 60: 2.660, 100: 2.626 }
};

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    calculateInterval();

    describe('One-sample t-interval calculator showing step-by-step computation of a confidence interval for a population mean', LABEL);
}

function draw() {
    updateCanvasSize();
    calculateInterval();

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
    text('One-Sample T-Interval Calculator', canvasWidth / 2, 8);
    textStyle(NORMAL);

    drawCalculationSteps();
    drawNumberLine();
    drawInterpretation();
    drawControls();
}

function calculateInterval() {
    xBar = parseFloat(inputValues.xBar) || 0;
    s = parseFloat(inputValues.s) || 0.1;
    n = parseInt(inputValues.n) || 2;
    n = max(2, n);

    df = n - 1;
    tStar = getTCriticalValue(df, confidenceLevel);
    se = s / Math.sqrt(n);
    marginOfError = tStar * se;
    lowerBound = xBar - marginOfError;
    upperBound = xBar + marginOfError;
}

function drawCalculationSteps() {
    let x = margin + 10;
    let y = 40;
    let stepHeight = 52;

    // Panel background
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(x - 5, y - 5, 350, 270, 5);

    fill(30);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text('Step-by-Step Calculation', x, y);
    textStyle(NORMAL);
    y += 25;

    // Step 1: Input values
    textSize(11);
    fill(showStep >= 1 ? sylviaGreen : 180);
    text('Step 1: Given values', x, y);
    if (showStep >= 1) {
        fill(60);
        text('x\u0305 = ' + xBar.toFixed(2) + ',  s = ' + s.toFixed(2) + ',  n = ' + n, x + 15, y + 15);
        text('Confidence = ' + Math.round(confidenceLevel * 100) + '%', x + 15, y + 28);
    }
    y += stepHeight;

    // Step 2: Degrees of freedom
    fill(showStep >= 2 ? sylviaGreen : 180);
    text('Step 2: Calculate df', x, y);
    if (showStep >= 2) {
        fill(60);
        text('df = n - 1 = ' + n + ' - 1 = ' + df, x + 15, y + 15);
    }
    y += stepHeight - 10;

    // Step 3: Find t*
    fill(showStep >= 3 ? sylviaGreen : 180);
    text('Step 3: Find t* (from t-table)', x, y);
    if (showStep >= 3) {
        fill(60);
        text('t* = ' + tStar.toFixed(3) + ' (for df=' + df + ', ' + Math.round(confidenceLevel * 100) + '% CI)', x + 15, y + 15);
    }
    y += stepHeight - 10;

    // Step 4: Calculate SE
    fill(showStep >= 4 ? sylviaGreen : 180);
    text('Step 4: Calculate Standard Error', x, y);
    if (showStep >= 4) {
        fill(60);
        text('SE = s / \u221An = ' + s.toFixed(2) + ' / \u221A' + n + ' = ' + se.toFixed(4), x + 15, y + 15);
    }
    y += stepHeight - 10;

    // Step 5: Margin of error
    fill(showStep >= 5 ? sylviaGreen : 180);
    text('Step 5: Margin of Error', x, y);
    if (showStep >= 5) {
        fill(60);
        text('ME = t* \u00D7 SE = ' + tStar.toFixed(3) + ' \u00D7 ' + se.toFixed(4) + ' = ' + marginOfError.toFixed(4), x + 15, y + 15);
    }

    // Results box
    if (showStep >= 5) {
        let boxX = x + 10;
        let boxY = y + 40;
        fill(sylviaCream);
        stroke(sylviaGreen);
        strokeWeight(2);
        rect(boxX, boxY, 320, 35, 5);

        fill(sylviaGreen);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(14);
        textStyle(BOLD);
        text(Math.round(confidenceLevel * 100) + '% CI: (' + lowerBound.toFixed(3) + ', ' + upperBound.toFixed(3) + ')', boxX + 160, boxY + 17);
        textStyle(NORMAL);
    }
}

function drawNumberLine() {
    if (showStep < 5) return;

    let nlX = canvasWidth - margin - 280;
    let nlY = 80;
    let nlWidth = 250;
    let nlHeight = 100;

    // Panel
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(nlX - 15, nlY - 25, nlWidth + 30, nlHeight + 50, 5);

    fill(30);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Confidence Interval Visualization', nlX + nlWidth / 2, nlY - 18);
    textStyle(NORMAL);

    // Calculate range for number line
    let range = marginOfError * 3;
    let minVal = xBar - range;
    let maxVal = xBar + range;

    // Draw number line
    let lineY = nlY + 50;
    stroke(100);
    strokeWeight(2);
    line(nlX, lineY, nlX + nlWidth, lineY);

    // Tick marks
    strokeWeight(1);
    textSize(9);
    textAlign(CENTER, TOP);
    fill(80);
    noStroke();

    // Show key values
    let values = [lowerBound, xBar, upperBound];
    for (let val of values) {
        let px = map(val, minVal, maxVal, nlX, nlX + nlWidth);
        stroke(100);
        strokeWeight(1);
        line(px, lineY - 5, px, lineY + 5);
        noStroke();
        fill(80);
        text(val.toFixed(2), px, lineY + 8);
    }

    // Draw confidence interval
    let lbX = map(lowerBound, minVal, maxVal, nlX, nlX + nlWidth);
    let ubX = map(upperBound, minVal, maxVal, nlX, nlX + nlWidth);
    let xBarX = map(xBar, minVal, maxVal, nlX, nlX + nlWidth);

    // Interval bar
    fill(sylviaGreen);
    fill(red(color(sylviaGreen)), green(color(sylviaGreen)), blue(color(sylviaGreen)), 150);
    noStroke();
    rect(lbX, lineY - 12, ubX - lbX, 10, 3);

    // Endpoints
    fill(sylviaAuburn);
    ellipse(lbX, lineY - 7, 8, 8);
    ellipse(ubX, lineY - 7, 8, 8);

    // Sample mean marker
    stroke(sylviaGreen);
    strokeWeight(2);
    line(xBarX, lineY - 18, xBarX, lineY - 2);

    // Labels
    fill(sylviaGreen);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('x\u0305 = ' + xBar.toFixed(2), xBarX, lineY - 20);

    // Margin of error annotation
    stroke(sylviaAuburn);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    line(xBarX, lineY + 25, lbX, lineY + 25);
    line(xBarX, lineY + 25, ubX, lineY + 25);
    drawingContext.setLineDash([]);

    // Arrow heads
    fill(sylviaAuburn);
    noStroke();
    triangle(lbX, lineY + 25, lbX + 5, lineY + 22, lbX + 5, lineY + 28);
    triangle(ubX, lineY + 25, ubX - 5, lineY + 22, ubX - 5, lineY + 28);

    fill(sylviaAuburn);
    textAlign(CENTER, TOP);
    textSize(9);
    text('ME = ' + marginOfError.toFixed(3), xBarX, lineY + 30);
}

function drawInterpretation() {
    if (showStep < 5) return;

    let x = canvasWidth - margin - 295;
    let y = 210;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(x, y, 280, 90, 5);

    fill(30);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Interpretation:', x + 10, y + 8);
    textStyle(NORMAL);

    fill(60);
    textSize(10);
    let interpretation = 'We are ' + Math.round(confidenceLevel * 100) + '% confident that the true population mean \u03BC lies between ' + lowerBound.toFixed(3) + ' and ' + upperBound.toFixed(3) + '.';
    text(wrapText(interpretation, 260), x + 10, y + 28);

    // Warning for small n
    if (n < 15) {
        fill(sylviaAuburn);
        textSize(9);
        text('\u26A0 Small sample (n < 15): Check normality of data!', x + 10, y + 72);
    }
}

function wrapText(txt, maxWidth) {
    let words = txt.split(' ');
    let lines = [];
    let currentLine = '';

    for (let word of words) {
        let testLine = currentLine + (currentLine ? ' ' : '') + word;
        if (textWidth(testLine) > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) lines.push(currentLine);
    return lines.join('\n');
}

function drawControls() {
    let y = drawHeight + 15;

    // Input fields
    fill(30);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);

    // x-bar input
    text('x\u0305 =', margin, y + 12);
    drawInputField(margin + 30, y + 2, 60, 22, 'xBar');

    // s input
    text('s =', margin + 110, y + 12);
    drawInputField(margin + 130, y + 2, 50, 22, 's');

    // n input
    text('n =', margin + 200, y + 12);
    drawInputField(margin + 220, y + 2, 50, 22, 'n');

    // Confidence level buttons
    let confX = margin + 300;
    text('Confidence:', confX, y + 12);

    let btnX = confX + 80;
    let levels = [0.90, 0.95, 0.99];
    let labels = ['90%', '95%', '99%'];

    for (let i = 0; i < 3; i++) {
        let bx = btnX + i * 50;
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

    // Step control
    let y2 = y + 40;
    fill(30);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Show steps:', margin, y2 + 10);

    let stepBtns = ['1', '2', '3', '4', 'All'];
    for (let i = 0; i < 5; i++) {
        let bx = margin + 80 + i * 40;
        let targetStep = i < 4 ? i + 1 : 5;
        let isSelected = (showStep === targetStep);

        fill(isSelected ? sylviaAuburn : 220);
        stroke(isSelected ? sylviaAuburn : 180);
        strokeWeight(1);
        rect(bx, y2, 35, 22, 4);

        fill(isSelected ? 255 : 60);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        text(stepBtns[i], bx + 17, y2 + 11);
    }

    // Formula reminder
    fill(80);
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Formula: x\u0305 \u00B1 t* \u00D7 (s / \u221An)', margin + 320, y2 + 10);
}

function drawInputField(x, y, w, h, fieldId) {
    let isActive = (activeField === fieldId);

    fill(isActive ? 255 : 250);
    stroke(isActive ? sylviaGreen : 180);
    strokeWeight(isActive ? 2 : 1);
    rect(x, y, w, h, 3);

    fill(30);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text(inputValues[fieldId], x + 5, y + h / 2);

    // Cursor
    if (isActive && frameCount % 60 < 30) {
        let tw = textWidth(inputValues[fieldId]);
        stroke(30);
        strokeWeight(1);
        line(x + 5 + tw + 2, y + 4, x + 5 + tw + 2, y + h - 4);
    }
}

function mousePressed() {
    let y = drawHeight + 15;

    // Check input fields
    if (mouseX >= margin + 30 && mouseX <= margin + 90 && mouseY >= y + 2 && mouseY <= y + 24) {
        activeField = 'xBar';
        return;
    }
    if (mouseX >= margin + 130 && mouseX <= margin + 180 && mouseY >= y + 2 && mouseY <= y + 24) {
        activeField = 's';
        return;
    }
    if (mouseX >= margin + 220 && mouseX <= margin + 270 && mouseY >= y + 2 && mouseY <= y + 24) {
        activeField = 'n';
        return;
    }

    activeField = null;

    // Check confidence buttons
    let btnX = margin + 380;
    let levels = [0.90, 0.95, 0.99];
    for (let i = 0; i < 3; i++) {
        let bx = btnX + i * 50;
        if (mouseX >= bx && mouseX <= bx + 45 && mouseY >= y + 2 && mouseY <= y + 24) {
            confidenceLevel = levels[i];
            return;
        }
    }

    // Check step buttons
    let y2 = y + 40;
    for (let i = 0; i < 5; i++) {
        let bx = margin + 80 + i * 40;
        if (mouseX >= bx && mouseX <= bx + 35 && mouseY >= y2 && mouseY <= y2 + 22) {
            showStep = i < 4 ? i + 1 : 5;
            return;
        }
    }
}

function keyPressed() {
    if (!activeField) return;

    if (keyCode === BACKSPACE) {
        inputValues[activeField] = inputValues[activeField].slice(0, -1);
        return false;
    }

    if (keyCode === ENTER || keyCode === TAB) {
        if (activeField === 'xBar') activeField = 's';
        else if (activeField === 's') activeField = 'n';
        else activeField = null;
        return false;
    }
}

function keyTyped() {
    if (!activeField) return;

    // Only allow valid numeric input
    if (activeField === 'n') {
        if (key >= '0' && key <= '9' && inputValues[activeField].length < 4) {
            inputValues[activeField] += key;
        }
    } else {
        if ((key >= '0' && key <= '9') || key === '.' || key === '-') {
            if (inputValues[activeField].length < 10) {
                inputValues[activeField] += key;
            }
        }
    }
    return false;
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
    if (canvasWidth < 650) canvasWidth = 650;
}
