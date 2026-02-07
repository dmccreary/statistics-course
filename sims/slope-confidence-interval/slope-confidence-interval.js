// Slope Confidence Interval MicroSim
// Construct and interpret confidence intervals for regression slope
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 750;
let drawHeight = 430;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let margin = 15;

// Population parameters
let popSlope = 2;
let popIntercept = 10;
let errorSD = 3;
let sampleSize = 25;
let confidenceLevel = 0.95;

// Sample data
let data = [];
let slope = 0;
let intercept = 0;
let slopeStdError = 0;

// Repeated sampling for coverage
let intervals = [];
let maxIntervals = 100;

// Sylvia theme
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';

// UI state
let draggingN = false;
let showCoverage = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    generateSample();
    describe('Confidence interval for regression slope visualization', LABEL);
}

function generateSample() {
    data = [];
    for (let i = 0; i < sampleSize; i++) {
        let x = random(2, 18);
        let noise = randomGaussian(0, errorSD);
        let y = popIntercept + popSlope * x + noise;
        data.push({ x: x, y: y });
    }

    calculateRegression();

    // Store interval for coverage simulation
    let ci = getConfidenceInterval();
    if (intervals.length < maxIntervals && showCoverage) {
        intervals.push({
            lower: ci.lower,
            upper: ci.upper,
            coversTrue: ci.lower <= popSlope && popSlope <= ci.upper
        });
    }
}

function calculateRegression() {
    let n = data.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    for (let pt of data) {
        sumX += pt.x;
        sumY += pt.y;
        sumXY += pt.x * pt.y;
        sumX2 += pt.x * pt.x;
    }

    slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    intercept = (sumY - slope * sumX) / n;

    // Calculate standard error of slope
    let meanX = sumX / n;
    let residuals = data.map(pt => pt.y - (intercept + slope * pt.x));
    let sse = residuals.reduce((sum, r) => sum + r * r, 0);
    let s = Math.sqrt(sse / (n - 2));
    let sxx = data.reduce((sum, pt) => sum + Math.pow(pt.x - meanX, 2), 0);
    slopeStdError = s / Math.sqrt(sxx);
}

function getConfidenceInterval() {
    // Get t critical value
    let tCrit = getTCritical(confidenceLevel, sampleSize - 2);
    let marginOfError = tCrit * slopeStdError;

    return {
        lower: slope - marginOfError,
        upper: slope + marginOfError,
        marginOfError: marginOfError,
        tCrit: tCrit
    };
}

function getTCritical(conf, df) {
    // Approximate t critical values
    let alphaOver2 = (1 - conf) / 2;

    // Wilson-Hilferty approximation
    let z;
    if (conf === 0.90) z = 1.645;
    else if (conf === 0.95) z = 1.96;
    else if (conf === 0.99) z = 2.576;
    else z = 1.96;

    // Adjust for t distribution
    if (df < 30) {
        // Rough adjustment for small df
        return z * (1 + 1 / df + 2 / (df * df));
    }
    return z;
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
    textSize(16);
    text('Confidence Interval for Regression Slope', canvasWidth / 2, 8);

    if (showCoverage) {
        drawCoverageSimulation();
    } else {
        // Left panel - Scatterplot with slope bands
        drawScatterplotWithBands();

        // Right panel - Interval visualization
        drawIntervalVisualization();

        // Calculation breakdown
        drawCalculations();
    }

    drawControls();
}

function drawScatterplotWithBands() {
    let panelLeft = margin;
    let panelWidth = canvasWidth * 0.5;
    let panelTop = 35;
    let panelHeight = 250;

    // Panel background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(panelLeft, panelTop, panelWidth, panelHeight, 5);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    text('Scatterplot with Plausible Slopes', panelLeft + panelWidth / 2, panelTop + 8);

    // Plot area
    let plotLeft = panelLeft + 45;
    let plotRight = panelLeft + panelWidth - 20;
    let plotTop = panelTop + 30;
    let plotBottom = panelTop + panelHeight - 30;

    // Calculate ranges
    let xMin = 0;
    let xMax = 20;
    let yMin = popIntercept - 5;
    let yMax = popIntercept + popSlope * 20 + 10;

    // Draw axes
    stroke(100);
    strokeWeight(1);
    line(plotLeft, plotBottom, plotRight, plotBottom);
    line(plotLeft, plotTop, plotLeft, plotBottom);

    // Draw confidence band (plausible slopes)
    let ci = getConfidenceInterval();

    // Fan of plausible slopes
    fill(red(color(sylviaGreen)), green(color(sylviaGreen)), blue(color(sylviaGreen)), 40);
    noStroke();
    beginShape();
    // Lower bound line
    let y0Lower = intercept + ci.lower * xMin;
    let y20Lower = intercept + ci.lower * xMax;
    vertex(map(xMin, xMin, xMax, plotLeft, plotRight), map(y0Lower, yMin, yMax, plotBottom, plotTop));
    vertex(map(xMax, xMin, xMax, plotLeft, plotRight), map(y20Lower, yMin, yMax, plotBottom, plotTop));
    // Upper bound line
    let y0Upper = intercept + ci.upper * xMin;
    let y20Upper = intercept + ci.upper * xMax;
    vertex(map(xMax, xMin, xMax, plotLeft, plotRight), map(y20Upper, yMin, yMax, plotBottom, plotTop));
    vertex(map(xMin, xMin, xMax, plotLeft, plotRight), map(y0Upper, yMin, yMax, plotBottom, plotTop));
    endShape(CLOSE);

    // Draw sample regression line
    stroke(sylviaGreen);
    strokeWeight(2);
    let y0 = map(intercept + slope * xMin, yMin, yMax, plotBottom, plotTop);
    let y20 = map(intercept + slope * xMax, yMin, yMax, plotBottom, plotTop);
    line(map(xMin, xMin, xMax, plotLeft, plotRight), y0, map(xMax, xMin, xMax, plotLeft, plotRight), y20);

    // Draw true slope line (dashed)
    stroke(sylviaAuburn);
    strokeWeight(2);
    drawingContext.setLineDash([5, 3]);
    y0 = map(popIntercept + popSlope * xMin, yMin, yMax, plotBottom, plotTop);
    y20 = map(popIntercept + popSlope * xMax, yMin, yMax, plotBottom, plotTop);
    line(map(xMin, xMin, xMax, plotLeft, plotRight), y0, map(xMax, xMin, xMax, plotLeft, plotRight), y20);
    drawingContext.setLineDash([]);

    // Draw data points
    fill(sylviaGreen);
    noStroke();
    for (let pt of data) {
        let px = map(pt.x, xMin, xMax, plotLeft, plotRight);
        let py = map(pt.y, yMin, yMax, plotBottom, plotTop);
        py = constrain(py, plotTop, plotBottom);
        ellipse(px, py, 5, 5);
    }

    // Legend
    fill(80);
    textAlign(LEFT, TOP);
    textSize(9);
    stroke(sylviaGreen);
    strokeWeight(2);
    line(panelLeft + 15, plotBottom + 8, panelLeft + 35, plotBottom + 8);
    noStroke();
    text('Sample slope: b = ' + slope.toFixed(3), panelLeft + 40, plotBottom + 3);

    stroke(sylviaAuburn);
    drawingContext.setLineDash([3, 2]);
    line(panelLeft + 15, plotBottom + 20, panelLeft + 35, plotBottom + 20);
    drawingContext.setLineDash([]);
    noStroke();
    fill(sylviaAuburn);
    text('True slope: \u03B2 = ' + popSlope.toFixed(1), panelLeft + 40, plotBottom + 15);
}

function drawIntervalVisualization() {
    let panelLeft = canvasWidth * 0.53;
    let panelWidth = canvasWidth * 0.45;
    let panelTop = 35;
    let panelHeight = 150;

    // Panel background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(panelLeft, panelTop, panelWidth, panelHeight, 5);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    text((confidenceLevel * 100) + '% Confidence Interval for Slope', panelLeft + panelWidth / 2, panelTop + 8);

    let ci = getConfidenceInterval();

    // Number line
    let lineY = panelTop + 80;
    let lineLeft = panelLeft + 40;
    let lineRight = panelLeft + panelWidth - 40;

    // Determine range
    let range = Math.max(Math.abs(ci.upper - slope), Math.abs(ci.lower - slope)) * 1.5;
    let axisMin = slope - range * 1.5;
    let axisMax = slope + range * 1.5;

    // Draw axis
    stroke(100);
    strokeWeight(2);
    line(lineLeft, lineY, lineRight, lineY);

    // Draw confidence interval bar
    let ciLeft = map(ci.lower, axisMin, axisMax, lineLeft, lineRight);
    let ciRight = map(ci.upper, axisMin, axisMax, lineLeft, lineRight);

    stroke(sylviaGreen);
    strokeWeight(4);
    line(ciLeft, lineY, ciRight, lineY);

    // Endpoints
    strokeWeight(2);
    line(ciLeft, lineY - 10, ciLeft, lineY + 10);
    line(ciRight, lineY - 10, ciRight, lineY + 10);

    // Sample slope marker
    let slopeX = map(slope, axisMin, axisMax, lineLeft, lineRight);
    fill(sylviaGreen);
    noStroke();
    triangle(slopeX, lineY - 15, slopeX - 6, lineY - 25, slopeX + 6, lineY - 25);

    // True slope marker
    let trueX = map(popSlope, axisMin, axisMax, lineLeft, lineRight);
    if (trueX >= lineLeft && trueX <= lineRight) {
        stroke(sylviaAuburn);
        strokeWeight(2);
        drawingContext.setLineDash([3, 2]);
        line(trueX, lineY - 20, trueX, lineY + 20);
        drawingContext.setLineDash([]);
    }

    // Zero marker
    let zeroX = map(0, axisMin, axisMax, lineLeft, lineRight);
    if (zeroX >= lineLeft && zeroX <= lineRight) {
        stroke(150);
        strokeWeight(1);
        line(zeroX, lineY - 8, zeroX, lineY + 8);
        fill(150);
        noStroke();
        textSize(9);
        textAlign(CENTER, TOP);
        text('0', zeroX, lineY + 12);
    }

    // Labels
    fill(sylviaGreen);
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    text(ci.lower.toFixed(3), ciLeft, lineY + 15);
    text(ci.upper.toFixed(3), ciRight, lineY + 15);

    fill(80);
    textAlign(CENTER, TOP);
    textSize(9);
    text('b = ' + slope.toFixed(3), slopeX, lineY - 38);

    // Hypothesis test connection
    let coversZero = ci.lower <= 0 && 0 <= ci.upper;
    fill(coversZero ? '#FFF3E0' : '#E8F5E9');
    stroke(coversZero ? sylviaAuburn : sylviaGreen);
    strokeWeight(1);
    rect(panelLeft + 10, panelTop + panelHeight - 40, panelWidth - 20, 32, 4);

    fill(coversZero ? sylviaAuburn : sylviaGreen);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    if (coversZero) {
        text('CI contains 0: Do NOT reject H\u2080: \u03B2 = 0', panelLeft + panelWidth / 2, panelTop + panelHeight - 24);
    } else {
        text('CI does NOT contain 0: Reject H\u2080: \u03B2 = 0', panelLeft + panelWidth / 2, panelTop + panelHeight - 24);
    }
}

function drawCalculations() {
    let boxLeft = canvasWidth * 0.53;
    let boxTop = 195;
    let boxWidth = canvasWidth * 0.45;
    let boxHeight = 100;

    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(boxLeft, boxTop, boxWidth, boxHeight, 5);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    text('Calculation Breakdown', boxLeft + 10, boxTop + 8);

    let ci = getConfidenceInterval();

    fill(80);
    textSize(10);
    text('Sample slope (b) = ' + slope.toFixed(4), boxLeft + 10, boxTop + 28);
    text('Standard error (SE_b) = ' + slopeStdError.toFixed(4), boxLeft + 10, boxTop + 44);
    text('t* (df = ' + (sampleSize - 2) + ', ' + (confidenceLevel * 100) + '%) = ' + ci.tCrit.toFixed(3), boxLeft + 10, boxTop + 60);
    text('Margin of error = ' + ci.marginOfError.toFixed(4), boxLeft + 10, boxTop + 76);

    // Formula
    fill(sylviaAuburn);
    textSize(10);
    text('CI: b \u00B1 t* \u00D7 SE_b', boxLeft + boxWidth - 110, boxTop + 28);
}

function drawCoverageSimulation() {
    let panelTop = 35;
    let panelHeight = 370;

    // Panel background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(margin, panelTop, canvasWidth - margin * 2, panelHeight, 5);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    text('Coverage Simulation: Do ' + (confidenceLevel * 100) + '% of intervals capture the true slope?', canvasWidth / 2, panelTop + 10);

    // Draw intervals
    let lineLeft = margin + 60;
    let lineRight = canvasWidth - margin - 60;

    // Calculate range for display
    let allBounds = intervals.flatMap(i => [i.lower, i.upper]);
    if (allBounds.length === 0) {
        fill(150);
        textAlign(CENTER, CENTER);
        textSize(11);
        text('Click "Take Sample" to build intervals', canvasWidth / 2, panelTop + panelHeight / 2);
        return;
    }

    let minBound = Math.min(...allBounds, popSlope - 1);
    let maxBound = Math.max(...allBounds, popSlope + 1);

    // True slope line
    let trueX = map(popSlope, minBound, maxBound, lineLeft, lineRight);
    stroke(sylviaAuburn);
    strokeWeight(2);
    line(trueX, panelTop + 40, trueX, panelTop + panelHeight - 50);

    fill(sylviaAuburn);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    text('True \u03B2 = ' + popSlope, trueX, panelTop + 28);

    // Draw each interval
    let intervalHeight = Math.min(8, (panelHeight - 100) / Math.max(intervals.length, 1));
    let startY = panelTop + 50;

    for (let i = 0; i < intervals.length; i++) {
        let interval = intervals[i];
        let y = startY + i * intervalHeight;

        let left = map(interval.lower, minBound, maxBound, lineLeft, lineRight);
        let right = map(interval.upper, minBound, maxBound, lineLeft, lineRight);

        stroke(interval.coversTrue ? sylviaGreen : '#C62828');
        strokeWeight(2);
        line(left, y, right, y);
    }

    // Coverage statistics
    let covered = intervals.filter(i => i.coversTrue).length;
    let coverage = (covered / intervals.length * 100).toFixed(1);

    fill(80);
    textAlign(LEFT, BOTTOM);
    textSize(11);
    text('Intervals: ' + intervals.length + ' | Captured true slope: ' + covered + ' (' + coverage + '%)', margin + 20, panelTop + panelHeight - 10);

    fill(sylviaGreen);
    rect(canvasWidth - 180, panelTop + panelHeight - 35, 15, 15);
    fill(80);
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Captures true slope', canvasWidth - 160, panelTop + panelHeight - 28);

    fill('#C62828');
    noStroke();
    rect(canvasWidth - 180, panelTop + panelHeight - 18, 15, 15);
    fill(80);
    text('Misses true slope', canvasWidth - 160, panelTop + panelHeight - 11);
}

function drawControls() {
    let y = drawHeight + 10;

    // Sample button
    fill(sylviaGreen);
    noStroke();
    rect(10, y + 3, 90, 26, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(10);
    text('Take Sample', 55, y + 16);

    // Take 20 samples (for coverage)
    fill(showCoverage ? sylviaAuburn : '#888');
    rect(110, y + 3, 100, 26, 4);
    fill('white');
    text('Take 20 Samples', 160, y + 16);

    // Toggle coverage view
    fill(showCoverage ? sylviaGreen : '#888');
    rect(220, y + 3, 100, 26, 4);
    fill('white');
    text(showCoverage ? 'Show Single' : 'Show Coverage', 270, y + 16);

    // Reset
    fill(100);
    rect(330, y + 3, 60, 26, 4);
    fill('white');
    text('Reset', 360, y + 16);

    // Confidence level buttons
    fill(80);
    textAlign(LEFT, CENTER);
    textSize(9);
    text('Confidence:', 410, y + 16);

    let levels = [0.90, 0.95, 0.99];
    let labels = ['90%', '95%', '99%'];
    for (let i = 0; i < levels.length; i++) {
        let bx = 480 + i * 50;
        fill(confidenceLevel === levels[i] ? sylviaAuburn : '#ddd');
        rect(bx, y + 5, 45, 22, 3);
        fill(confidenceLevel === levels[i] ? 'white' : 'black');
        textAlign(CENTER, CENTER);
        text(labels[i], bx + 22, y + 16);
    }

    // Sample size slider
    fill(80);
    textAlign(LEFT, CENTER);
    textSize(9);
    text('n:', 645, y + 16);
    fill(220);
    rect(660, y + 9, 60, 12, 3);
    let nPos = map(sampleSize, 10, 100, 660, 720);
    fill(sylviaAuburn);
    ellipse(nPos, y + 15, 12, 12);
    fill(80);
    text(sampleSize, 725, y + 16);

    // Instructions
    let y2 = y + 36;
    fill(100);
    textAlign(LEFT, CENTER);
    textSize(9);
    if (showCoverage) {
        text('Green intervals capture the true slope \u03B2. About ' + (confidenceLevel * 100) + '% should be green if the method works correctly.', 10, y2 + 8);
    } else {
        text('The shaded band shows all plausible slopes. If CI contains 0, we cannot conclude there is a linear relationship.', 10, y2 + 8);
    }
}

function mousePressed() {
    let y = drawHeight + 10;

    // Take Sample button
    if (mouseX >= 10 && mouseX <= 100 && mouseY >= y + 3 && mouseY <= y + 29) {
        generateSample();
        return;
    }

    // Take 20 samples
    if (mouseX >= 110 && mouseX <= 210 && mouseY >= y + 3 && mouseY <= y + 29) {
        for (let i = 0; i < 20; i++) {
            generateSample();
        }
        return;
    }

    // Toggle coverage view
    if (mouseX >= 220 && mouseX <= 320 && mouseY >= y + 3 && mouseY <= y + 29) {
        showCoverage = !showCoverage;
        intervals = [];
        generateSample();
        return;
    }

    // Reset
    if (mouseX >= 330 && mouseX <= 390 && mouseY >= y + 3 && mouseY <= y + 29) {
        intervals = [];
        generateSample();
        return;
    }

    // Confidence level buttons
    let levels = [0.90, 0.95, 0.99];
    for (let i = 0; i < levels.length; i++) {
        let bx = 480 + i * 50;
        if (mouseX >= bx && mouseX <= bx + 45 && mouseY >= y + 5 && mouseY <= y + 27) {
            confidenceLevel = levels[i];
            intervals = [];
            calculateRegression();
            return;
        }
    }

    // Sample size slider
    if (mouseY >= y + 5 && mouseY <= y + 25 && mouseX >= 655 && mouseX <= 725) {
        draggingN = true;
        updateNFromMouse();
        return;
    }
}

function updateNFromMouse() {
    sampleSize = Math.round(map(mouseX, 660, 720, 10, 100));
    sampleSize = constrain(sampleSize, 10, 100);
    intervals = [];
    generateSample();
}

function mouseDragged() {
    if (draggingN) updateNFromMouse();
}

function mouseReleased() {
    draggingN = false;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
