// Two-Sample T-Test Visualization MicroSim
// Compare two group means visually and statistically
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 750;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 25;
let defaultTextSize = 14;

// Group 1 parameters
let n1 = 30;
let xBar1 = 78;
let s1 = 10;

// Group 2 parameters
let n2 = 32;
let xBar2 = 72;
let s2 = 12;

// Test parameters
let alpha = 0.05;
let altHypothesis = 'not-equal'; // 'not-equal', 'greater', 'less'

// Input field state
let activeField = null;
let inputValues = {
    n1: '30', xBar1: '78', s1: '10',
    n2: '32', xBar2: '72', s2: '12'
};

// Calculated values
let pooledSE, tStat, df, pValue, ciLower, ciUpper, tCrit;

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

    calculateTest();

    describe('Two-sample t-test visualization comparing two group means with dotplots, confidence interval for the difference, and hypothesis test results', LABEL);
}

function draw() {
    updateCanvasSize();
    calculateTest();

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
    text('Two-Sample T-Test Visualization', canvasWidth / 2, 8);
    textStyle(NORMAL);

    drawGroupComparison();
    drawStatisticsPanel();
    drawCIDifferencePanel();
    drawHypothesisTestPanel();
    drawControls();
}

function calculateTest() {
    n1 = parseInt(inputValues.n1) || 2;
    xBar1 = parseFloat(inputValues.xBar1) || 0;
    s1 = parseFloat(inputValues.s1) || 0.1;
    n2 = parseInt(inputValues.n2) || 2;
    xBar2 = parseFloat(inputValues.xBar2) || 0;
    s2 = parseFloat(inputValues.s2) || 0.1;

    n1 = max(2, n1);
    n2 = max(2, n2);

    // Welch's t-test (unpooled)
    pooledSE = Math.sqrt(s1 * s1 / n1 + s2 * s2 / n2);
    tStat = (xBar1 - xBar2) / pooledSE;

    // Welch-Satterthwaite degrees of freedom
    let v1 = s1 * s1 / n1;
    let v2 = s2 * s2 / n2;
    let num = (v1 + v2) * (v1 + v2);
    let denom = v1 * v1 / (n1 - 1) + v2 * v2 / (n2 - 1);
    df = Math.floor(num / denom);

    // Get critical value
    tCrit = getTCriticalValue(df, 1 - alpha);

    // Calculate p-value (approximation using t-distribution)
    pValue = calculatePValue(Math.abs(tStat), df);
    if (altHypothesis === 'not-equal') {
        pValue *= 2;
    } else if ((altHypothesis === 'greater' && tStat < 0) ||
               (altHypothesis === 'less' && tStat > 0)) {
        pValue = 1 - pValue;
    }
    pValue = min(pValue, 1);

    // Confidence interval for difference
    let ciMargin = tCrit * pooledSE;
    ciLower = (xBar1 - xBar2) - ciMargin;
    ciUpper = (xBar1 - xBar2) + ciMargin;
}

function drawGroupComparison() {
    let plotX = margin + 10;
    let plotY = 40;
    let plotWidth = 280;
    let plotHeight = 160;

    // Panel
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(plotX - 5, plotY - 5, plotWidth + 10, plotHeight + 30, 5);

    fill(30);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Group Comparison', plotX + plotWidth / 2, plotY);
    textStyle(NORMAL);

    // Calculate range for both groups
    let minVal = min(xBar1 - 3 * s1, xBar2 - 3 * s2);
    let maxVal = max(xBar1 + 3 * s1, xBar2 + 3 * s2);

    // Draw horizontal axis
    let axisY = plotY + plotHeight - 20;
    stroke(100);
    strokeWeight(1);
    line(plotX + 20, axisY, plotX + plotWidth - 20, axisY);

    // Tick marks
    textSize(8);
    fill(100);
    noStroke();
    textAlign(CENTER, TOP);
    for (let i = 0; i <= 4; i++) {
        let val = map(i, 0, 4, minVal, maxVal);
        let px = map(val, minVal, maxVal, plotX + 20, plotX + plotWidth - 20);
        stroke(100);
        line(px, axisY, px, axisY + 3);
        noStroke();
        text(val.toFixed(0), px, axisY + 5);
    }

    // Group 1 - simulated dotplot
    let g1Y = plotY + 45;
    drawSimulatedDotplot(plotX + 20, plotX + plotWidth - 20, g1Y, minVal, maxVal, xBar1, s1, n1, sylviaGreen, 'Group 1');

    // Group 2 - simulated dotplot
    let g2Y = plotY + 100;
    drawSimulatedDotplot(plotX + 20, plotX + plotWidth - 20, g2Y, minVal, maxVal, xBar2, s2, n2, sylviaAuburn, 'Group 2');

    // Mean lines
    let mean1X = map(xBar1, minVal, maxVal, plotX + 20, plotX + plotWidth - 20);
    let mean2X = map(xBar2, minVal, maxVal, plotX + 20, plotX + plotWidth - 20);

    stroke(sylviaGreen);
    strokeWeight(2);
    drawingContext.setLineDash([4, 2]);
    line(mean1X, g1Y - 20, mean1X, g1Y + 20);
    drawingContext.setLineDash([]);

    stroke(sylviaAuburn);
    drawingContext.setLineDash([4, 2]);
    line(mean2X, g2Y - 20, mean2X, g2Y + 20);
    drawingContext.setLineDash([]);
}

function drawSimulatedDotplot(left, right, y, minVal, maxVal, mean, sd, n, col, label) {
    // Generate representative points based on normal distribution
    fill(col);
    fill(red(color(col)), green(color(col)), blue(color(col)), 180);
    noStroke();

    randomSeed(42 + mean * 100); // Consistent points for same parameters
    let displayN = min(n, 30);
    for (let i = 0; i < displayN; i++) {
        let z = randomGaussian(0, 1);
        let val = mean + z * sd;
        let px = map(val, minVal, maxVal, left, right);
        px = constrain(px, left, right);
        ellipse(px, y + random(-8, 8), 6, 6);
    }

    // Label
    fill(col);
    textAlign(LEFT, CENTER);
    textSize(9);
    noStroke();
    text(label, left - 50, y);
}

function randomGaussian(mean, sd) {
    let u1 = random(0.0001, 0.9999);
    let u2 = random(0.0001, 0.9999);
    let z = sqrt(-2 * log(u1)) * cos(TWO_PI * u2);
    return mean + z * sd;
}

function drawStatisticsPanel() {
    let panelX = margin + 310;
    let panelY = 40;
    let panelWidth = 160;
    let panelHeight = 165;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 5);

    fill(30);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Summary Statistics', panelX + panelWidth / 2, panelY + 5);
    textStyle(NORMAL);

    textAlign(LEFT, TOP);
    textSize(10);
    let y = panelY + 25;
    let lineH = 13;

    // Group 1
    fill(sylviaGreen);
    textStyle(BOLD);
    text('Group 1:', panelX + 10, y);
    textStyle(NORMAL);
    y += lineH;
    fill(60);
    text('n\u2081 = ' + n1, panelX + 15, y); y += lineH;
    text('x\u0305\u2081 = ' + xBar1.toFixed(2), panelX + 15, y); y += lineH;
    text('s\u2081 = ' + s1.toFixed(2), panelX + 15, y); y += lineH + 5;

    // Group 2
    fill(sylviaAuburn);
    textStyle(BOLD);
    text('Group 2:', panelX + 10, y);
    textStyle(NORMAL);
    y += lineH;
    fill(60);
    text('n\u2082 = ' + n2, panelX + 15, y); y += lineH;
    text('x\u0305\u2082 = ' + xBar2.toFixed(2), panelX + 15, y); y += lineH;
    text('s\u2082 = ' + s2.toFixed(2), panelX + 15, y); y += lineH + 5;

    // Difference
    fill(30);
    textStyle(BOLD);
    text('Difference:', panelX + 10, y);
    textStyle(NORMAL);
    y += lineH;
    text('x\u0305\u2081 - x\u0305\u2082 = ' + (xBar1 - xBar2).toFixed(2), panelX + 15, y);
}

function drawCIDifferencePanel() {
    let panelX = margin + 10;
    let panelY = 220;
    let panelWidth = 460;
    let panelHeight = 100;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 5);

    fill(30);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text((100 - alpha * 100) + '% Confidence Interval for \u03BC\u2081 - \u03BC\u2082', panelX + 10, panelY + 8);
    textStyle(NORMAL);

    // Number line for difference
    let nlLeft = panelX + 40;
    let nlRight = panelX + panelWidth - 40;
    let nlY = panelY + 55;

    // Determine range
    let diff = xBar1 - xBar2;
    let range = max(Math.abs(ciLower), Math.abs(ciUpper), Math.abs(diff)) * 1.5;
    range = max(range, 5);
    let minVal = -range;
    let maxVal = range;

    // Draw axis
    stroke(100);
    strokeWeight(1);
    line(nlLeft, nlY, nlRight, nlY);

    // Zero line
    let zeroX = map(0, minVal, maxVal, nlLeft, nlRight);
    stroke(150);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    line(zeroX, nlY - 25, zeroX, nlY + 25);
    drawingContext.setLineDash([]);

    fill(100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(9);
    text('0', zeroX, nlY + 8);

    // Draw CI
    let ciLowerX = map(ciLower, minVal, maxVal, nlLeft, nlRight);
    let ciUpperX = map(ciUpper, minVal, maxVal, nlLeft, nlRight);
    let diffX = map(diff, minVal, maxVal, nlLeft, nlRight);

    ciLowerX = constrain(ciLowerX, nlLeft, nlRight);
    ciUpperX = constrain(ciUpperX, nlLeft, nlRight);
    diffX = constrain(diffX, nlLeft, nlRight);

    // CI bar
    fill(sylviaGreen);
    fill(red(color(sylviaGreen)), green(color(sylviaGreen)), blue(color(sylviaGreen)), 120);
    noStroke();
    rect(ciLowerX, nlY - 10, ciUpperX - ciLowerX, 10, 3);

    // Endpoints
    fill(sylviaAuburn);
    ellipse(ciLowerX, nlY - 5, 8, 8);
    ellipse(ciUpperX, nlY - 5, 8, 8);

    // Point estimate
    stroke(sylviaGreen);
    strokeWeight(2);
    line(diffX, nlY - 18, diffX, nlY);

    // Labels
    fill(80);
    noStroke();
    textSize(8);
    textAlign(CENTER, BOTTOM);
    text(ciLower.toFixed(2), ciLowerX, nlY - 12);
    text(ciUpper.toFixed(2), ciUpperX, nlY - 12);

    fill(sylviaGreen);
    textAlign(CENTER, BOTTOM);
    textSize(9);
    text('diff = ' + diff.toFixed(2), diffX, nlY - 22);

    // Interpretation
    fill(60);
    textAlign(LEFT, TOP);
    textSize(9);
    let containsZero = (ciLower <= 0 && ciUpper >= 0);
    if (containsZero) {
        text('CI contains 0: No significant difference at \u03B1 = ' + alpha, panelX + 10, panelY + 78);
    } else {
        fill(sylviaAuburn);
        text('CI does NOT contain 0: Significant difference at \u03B1 = ' + alpha, panelX + 10, panelY + 78);
    }
}

function drawHypothesisTestPanel() {
    let panelX = margin + 10;
    let panelY = 330;
    let panelWidth = 460;
    let panelHeight = 110;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 5);

    fill(30);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Hypothesis Test Results', panelX + 10, panelY + 8);
    textStyle(NORMAL);

    // Hypotheses
    textSize(10);
    fill(60);
    let y = panelY + 28;
    text('H\u2080: \u03BC\u2081 - \u03BC\u2082 = 0', panelX + 15, y);

    let haText = 'H\u2090: \u03BC\u2081 - \u03BC\u2082 ';
    if (altHypothesis === 'not-equal') haText += '\u2260 0';
    else if (altHypothesis === 'greater') haText += '> 0';
    else haText += '< 0';
    text(haText, panelX + 130, y);

    // Test statistic and df
    y += 18;
    text('df = ' + df + ' (Welch\'s)', panelX + 15, y);
    text('SE = ' + pooledSE.toFixed(4), panelX + 130, y);
    text('t = ' + tStat.toFixed(3), panelX + 260, y);

    // P-value
    y += 18;
    let pText = 'p-value = ' + (pValue < 0.0001 ? '< 0.0001' : pValue.toFixed(4));
    textStyle(BOLD);
    fill(pValue < alpha ? sylviaAuburn : sylviaGreen);
    text(pText, panelX + 15, y);
    textStyle(NORMAL);

    text('t* = \u00B1' + tCrit.toFixed(3), panelX + 180, y);
    text('\u03B1 = ' + alpha, panelX + 280, y);

    // Conclusion
    y += 22;
    fill(pValue < alpha ? sylviaAuburn : sylviaGreen);
    textStyle(BOLD);
    if (pValue < alpha) {
        text('Reject H\u2080: Evidence of a significant difference between group means', panelX + 15, y);
    } else {
        text('Fail to reject H\u2080: No significant difference detected', panelX + 15, y);
    }
    textStyle(NORMAL);
}

function drawControls() {
    let y = drawHeight + 8;

    fill(30);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);

    // Group 1 inputs
    fill(sylviaGreen);
    text('Group 1:', margin, y + 10);
    fill(30);
    text('n\u2081=', margin + 55, y + 10);
    drawInputField(margin + 75, y + 2, 35, 18, 'n1');
    text('x\u0305\u2081=', margin + 118, y + 10);
    drawInputField(margin + 138, y + 2, 40, 18, 'xBar1');
    text('s\u2081=', margin + 186, y + 10);
    drawInputField(margin + 203, y + 2, 35, 18, 's1');

    // Group 2 inputs
    fill(sylviaAuburn);
    text('Group 2:', margin + 255, y + 10);
    fill(30);
    text('n\u2082=', margin + 310, y + 10);
    drawInputField(margin + 330, y + 2, 35, 18, 'n2');
    text('x\u0305\u2082=', margin + 373, y + 10);
    drawInputField(margin + 393, y + 2, 40, 18, 'xBar2');
    text('s\u2082=', margin + 441, y + 10);
    drawInputField(margin + 458, y + 2, 35, 18, 's2');

    // Second row - alpha and alternative
    let y2 = y + 30;

    // Alpha buttons
    fill(30);
    text('\u03B1:', margin, y2 + 10);
    let alphas = [0.10, 0.05, 0.01];
    let alphaLabels = ['0.10', '0.05', '0.01'];
    for (let i = 0; i < 3; i++) {
        let bx = margin + 20 + i * 45;
        let isSelected = (alphas[i] === alpha);

        fill(isSelected ? sylviaGreen : 220);
        stroke(isSelected ? sylviaGreen : 180);
        strokeWeight(1);
        rect(bx, y2 + 2, 40, 18, 3);

        fill(isSelected ? 255 : 60);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(9);
        text(alphaLabels[i], bx + 20, y2 + 11);
    }

    // Alternative hypothesis buttons
    fill(30);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text('H\u2090:', margin + 165, y2 + 10);

    let alts = ['not-equal', 'greater', 'less'];
    let altLabels = ['\u03BC\u2081\u2260\u03BC\u2082', '\u03BC\u2081>\u03BC\u2082', '\u03BC\u2081<\u03BC\u2082'];
    for (let i = 0; i < 3; i++) {
        let bx = margin + 195 + i * 60;
        let isSelected = (alts[i] === altHypothesis);

        fill(isSelected ? sylviaAuburn : 220);
        stroke(isSelected ? sylviaAuburn : 180);
        strokeWeight(1);
        rect(bx, y2 + 2, 55, 18, 3);

        fill(isSelected ? 255 : 60);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        text(altLabels[i], bx + 27, y2 + 11);
    }

    // Note
    fill(100);
    textAlign(LEFT, CENTER);
    textSize(9);
    text('Using Welch\'s unpooled t-test', margin + 400, y2 + 10);
}

function drawInputField(x, y, w, h, fieldId) {
    let isActive = (activeField === fieldId);

    fill(isActive ? 255 : 250);
    stroke(isActive ? sylviaGreen : 180);
    strokeWeight(isActive ? 2 : 1);
    rect(x, y, w, h, 2);

    fill(30);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text(inputValues[fieldId], x + 3, y + h / 2);
}

function mousePressed() {
    let y = drawHeight + 8;

    // Check input fields
    let fields = [
        { id: 'n1', x: margin + 75, w: 35 },
        { id: 'xBar1', x: margin + 138, w: 40 },
        { id: 's1', x: margin + 203, w: 35 },
        { id: 'n2', x: margin + 330, w: 35 },
        { id: 'xBar2', x: margin + 393, w: 40 },
        { id: 's2', x: margin + 458, w: 35 }
    ];

    for (let f of fields) {
        if (mouseX >= f.x && mouseX <= f.x + f.w && mouseY >= y + 2 && mouseY <= y + 20) {
            activeField = f.id;
            return;
        }
    }

    activeField = null;

    // Check alpha buttons
    let y2 = y + 30;
    let alphas = [0.10, 0.05, 0.01];
    for (let i = 0; i < 3; i++) {
        let bx = margin + 20 + i * 45;
        if (mouseX >= bx && mouseX <= bx + 40 && mouseY >= y2 + 2 && mouseY <= y2 + 20) {
            alpha = alphas[i];
            return;
        }
    }

    // Check alternative buttons
    let alts = ['not-equal', 'greater', 'less'];
    for (let i = 0; i < 3; i++) {
        let bx = margin + 195 + i * 60;
        if (mouseX >= bx && mouseX <= bx + 55 && mouseY >= y2 + 2 && mouseY <= y2 + 20) {
            altHypothesis = alts[i];
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
        let fieldOrder = ['n1', 'xBar1', 's1', 'n2', 'xBar2', 's2'];
        let idx = fieldOrder.indexOf(activeField);
        if (idx < fieldOrder.length - 1) {
            activeField = fieldOrder[idx + 1];
        } else {
            activeField = null;
        }
        return false;
    }
}

function keyTyped() {
    if (!activeField) return;

    let isNField = activeField === 'n1' || activeField === 'n2';
    if (isNField) {
        if (key >= '0' && key <= '9' && inputValues[activeField].length < 4) {
            inputValues[activeField] += key;
        }
    } else {
        if ((key >= '0' && key <= '9') || key === '.' || key === '-') {
            if (inputValues[activeField].length < 8) {
                inputValues[activeField] += key;
            }
        }
    }
    return false;
}

function getTCriticalValue(df, conf) {
    // Approximate t critical value using normal approximation with adjustment
    let z = getZCritical(conf);

    // Adjustment for t-distribution
    if (df >= 100) return z;
    if (df <= 1) return 12.706 * (1 - conf) / 0.05; // Very rough

    // Linear interpolation from table
    let tValues = {
        0.95: { 1: 12.706, 5: 2.571, 10: 2.228, 20: 2.086, 30: 2.042, 60: 2.000 },
        0.99: { 1: 63.657, 5: 4.032, 10: 3.169, 20: 2.845, 30: 2.750, 60: 2.660 },
        0.90: { 1: 6.314, 5: 2.015, 10: 1.812, 20: 1.725, 30: 1.697, 60: 1.671 }
    };

    let table = tValues[conf] || tValues[0.95];
    let keys = Object.keys(table).map(Number).sort((a, b) => a - b);

    if (df <= keys[0]) return table[keys[0]];
    if (df >= keys[keys.length - 1]) return table[keys[keys.length - 1]];

    for (let i = 0; i < keys.length - 1; i++) {
        if (df >= keys[i] && df <= keys[i + 1]) {
            let t1 = table[keys[i]];
            let t2 = table[keys[i + 1]];
            let ratio = (df - keys[i]) / (keys[i + 1] - keys[i]);
            return t1 + ratio * (t2 - t1);
        }
    }
    return z;
}

function getZCritical(conf) {
    if (conf >= 0.99) return 2.576;
    if (conf >= 0.95) return 1.960;
    if (conf >= 0.90) return 1.645;
    return 1.645;
}

function calculatePValue(t, df) {
    // Approximate p-value using normal approximation for large df
    if (df > 100) {
        return 1 - normalCDF(t);
    }

    // For smaller df, use a rough approximation
    // This is a simplified approximation - in practice, use a proper t-distribution CDF
    let z = t * Math.sqrt(df / (df + 1)); // Rough adjustment
    return 1 - normalCDF(z);
}

function normalCDF(x) {
    // Approximation of standard normal CDF
    let a1 = 0.254829592;
    let a2 = -0.284496736;
    let a3 = 1.421413741;
    let a4 = -1.453152027;
    let a5 = 1.061405429;
    let p = 0.3275911;

    let sign = x < 0 ? -1 : 1;
    x = Math.abs(x) / Math.sqrt(2);

    let t = 1.0 / (1.0 + p * x);
    let y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return 0.5 * (1.0 + sign * y);
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
