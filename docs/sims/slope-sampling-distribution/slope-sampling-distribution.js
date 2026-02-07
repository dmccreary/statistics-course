// Slope Sampling Distribution MicroSim
// Visualize how sample slopes vary under repeated sampling
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 750;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

let margin = 15;

// Population parameters
let popSlope = 0.5;
let popIntercept = 10;
let errorSD = 2;
let sampleSize = 30;

// Data storage
let currentSample = [];
let sampleSlopes = [];
let maxSlopes = 500;

// Regression results
let currentSlope = 0;
let currentIntercept = 0;

// Sylvia theme
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';

// UI state
let draggingSlope = false;
let draggingError = false;
let draggingN = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    generateSample();
    describe('Sampling distribution of regression slopes visualization', LABEL);
}

function generateSample() {
    currentSample = [];
    for (let i = 0; i < sampleSize; i++) {
        let x = random(0, 20);
        let noise = randomGaussian(0, errorSD);
        let y = popIntercept + popSlope * x + noise;
        currentSample.push({ x: x, y: y });
    }

    // Calculate sample regression
    let result = calculateRegression(currentSample);
    currentSlope = result.slope;
    currentIntercept = result.intercept;

    // Store slope
    if (sampleSlopes.length < maxSlopes) {
        sampleSlopes.push(currentSlope);
    }
}

function calculateRegression(data) {
    let n = data.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    for (let pt of data) {
        sumX += pt.x;
        sumY += pt.y;
        sumXY += pt.x * pt.y;
        sumX2 += pt.x * pt.x;
    }

    let slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    let intercept = (sumY - slope * sumX) / n;

    return { slope: slope, intercept: intercept };
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
    text('Sampling Distribution of the Slope', canvasWidth / 2, 8);

    // Left panel - Scatterplot
    drawScatterplot();

    // Right panel - Histogram of slopes
    drawSlopeHistogram();

    // Statistics display
    drawStatistics();

    // Controls
    drawControls();
}

function drawScatterplot() {
    let panelLeft = margin;
    let panelWidth = canvasWidth * 0.48;
    let panelTop = 35;
    let panelHeight = 260;

    // Panel background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(panelLeft, panelTop, panelWidth, panelHeight, 5);

    // Axis area
    let plotLeft = panelLeft + 45;
    let plotRight = panelLeft + panelWidth - 20;
    let plotTop = panelTop + 25;
    let plotBottom = panelTop + panelHeight - 35;

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    text('Scatterplot with Regression Lines', panelLeft + panelWidth / 2, panelTop + 8);

    // Draw axes
    stroke(100);
    strokeWeight(1);
    line(plotLeft, plotBottom, plotRight, plotBottom); // x-axis
    line(plotLeft, plotTop, plotLeft, plotBottom); // y-axis

    // Axis labels
    fill(80);
    textSize(10);
    textAlign(CENTER, TOP);
    text('x', (plotLeft + plotRight) / 2, plotBottom + 5);

    push();
    translate(plotLeft - 25, (plotTop + plotBottom) / 2);
    rotate(-PI / 2);
    textAlign(CENTER, CENTER);
    text('y', 0, 0);
    pop();

    // Calculate y range based on population line
    let yMin = popIntercept - 2 * errorSD;
    let yMax = popIntercept + popSlope * 20 + 4 * errorSD;

    // Draw population regression line (true line)
    stroke(sylviaAuburn);
    strokeWeight(3);
    let y0 = map(popIntercept, yMin, yMax, plotBottom, plotTop);
    let y20 = map(popIntercept + popSlope * 20, yMin, yMax, plotBottom, plotTop);
    let x0 = map(0, 0, 20, plotLeft, plotRight);
    let x20 = map(20, 0, 20, plotLeft, plotRight);
    line(x0, y0, x20, y20);

    // Draw sample regression line
    stroke(sylviaGreen);
    strokeWeight(2);
    y0 = map(currentIntercept, yMin, yMax, plotBottom, plotTop);
    y20 = map(currentIntercept + currentSlope * 20, yMin, yMax, plotBottom, plotTop);
    line(x0, y0, x20, y20);

    // Draw data points
    fill(sylviaGreen);
    noStroke();
    for (let pt of currentSample) {
        let px = map(pt.x, 0, 20, plotLeft, plotRight);
        let py = map(pt.y, yMin, yMax, plotBottom, plotTop);
        py = constrain(py, plotTop, plotBottom);
        ellipse(px, py, 6, 6);
    }

    // Legend
    fill(sylviaAuburn);
    textAlign(LEFT, CENTER);
    textSize(9);
    stroke(sylviaAuburn);
    strokeWeight(2);
    line(panelLeft + 50, panelTop + panelHeight - 18, panelLeft + 70, panelTop + panelHeight - 18);
    noStroke();
    text('True: y = ' + popIntercept.toFixed(1) + ' + ' + popSlope.toFixed(2) + 'x', panelLeft + 75, panelTop + panelHeight - 18);

    fill(sylviaGreen);
    stroke(sylviaGreen);
    line(panelLeft + 50, panelTop + panelHeight - 6, panelLeft + 70, panelTop + panelHeight - 6);
    noStroke();
    text('Sample: y = ' + currentIntercept.toFixed(1) + ' + ' + currentSlope.toFixed(2) + 'x', panelLeft + 75, panelTop + panelHeight - 6);
}

function drawSlopeHistogram() {
    let panelLeft = canvasWidth * 0.52;
    let panelWidth = canvasWidth * 0.46;
    let panelTop = 35;
    let panelHeight = 260;

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
    text('Distribution of Sample Slopes (n = ' + sampleSlopes.length + ')', panelLeft + panelWidth / 2, panelTop + 8);

    if (sampleSlopes.length < 2) {
        fill(150);
        textAlign(CENTER, CENTER);
        textSize(10);
        text('Click "Take Sample" to build', panelLeft + panelWidth / 2, panelTop + panelHeight / 2 - 10);
        text('the sampling distribution', panelLeft + panelWidth / 2, panelTop + panelHeight / 2 + 5);
        return;
    }

    // Histogram area
    let histLeft = panelLeft + 45;
    let histRight = panelLeft + panelWidth - 20;
    let histTop = panelTop + 30;
    let histBottom = panelTop + panelHeight - 40;

    // Calculate histogram bins
    let minSlope = popSlope - 3 * errorSD / Math.sqrt(sampleSize) * 3;
    let maxSlope = popSlope + 3 * errorSD / Math.sqrt(sampleSize) * 3;
    let numBins = 20;
    let binWidth = (maxSlope - minSlope) / numBins;
    let bins = new Array(numBins).fill(0);

    for (let s of sampleSlopes) {
        let binIndex = Math.floor((s - minSlope) / binWidth);
        binIndex = constrain(binIndex, 0, numBins - 1);
        bins[binIndex]++;
    }

    let maxCount = Math.max(...bins, 1);

    // Draw histogram bars
    let barWidth = (histRight - histLeft) / numBins;
    fill(sylviaGreen);
    fill(red(color(sylviaGreen)), green(color(sylviaGreen)), blue(color(sylviaGreen)), 180);
    noStroke();

    for (let i = 0; i < numBins; i++) {
        let barHeight = map(bins[i], 0, maxCount, 0, histBottom - histTop - 10);
        let bx = histLeft + i * barWidth;
        rect(bx, histBottom - barHeight, barWidth - 1, barHeight);
    }

    // Draw true slope line
    let trueX = map(popSlope, minSlope, maxSlope, histLeft, histRight);
    stroke(sylviaAuburn);
    strokeWeight(2);
    drawingContext.setLineDash([5, 3]);
    line(trueX, histTop, trueX, histBottom);
    drawingContext.setLineDash([]);

    // Current slope marker
    let currX = map(currentSlope, minSlope, maxSlope, histLeft, histRight);
    stroke(sylviaGreen);
    strokeWeight(3);
    line(currX, histTop + 10, currX, histBottom);

    // Axis
    stroke(100);
    strokeWeight(1);
    line(histLeft, histBottom, histRight, histBottom);

    // Labels
    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(9);
    text(minSlope.toFixed(2), histLeft, histBottom + 3);
    text(maxSlope.toFixed(2), histRight, histBottom + 3);
    text(popSlope.toFixed(2), trueX, histBottom + 3);

    fill(sylviaAuburn);
    textSize(8);
    text('\u03B2 (true)', trueX, histBottom + 14);

    // Mean of sample slopes
    if (sampleSlopes.length > 0) {
        let meanSlope = sampleSlopes.reduce((a, b) => a + b, 0) / sampleSlopes.length;
        let meanX = map(meanSlope, minSlope, maxSlope, histLeft, histRight);

        stroke(100);
        strokeWeight(1);
        line(meanX, histTop + 20, meanX, histBottom);

        fill(100);
        noStroke();
        textSize(8);
        textAlign(CENTER, TOP);
        text('mean=' + meanSlope.toFixed(3), meanX, histTop + 5);
    }
}

function drawStatistics() {
    let boxLeft = margin;
    let boxTop = 305;
    let boxWidth = canvasWidth - margin * 2;
    let boxHeight = 100;

    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(boxLeft, boxTop, boxWidth, boxHeight, 5);

    // Calculate statistics
    let meanSlope = sampleSlopes.length > 0 ? sampleSlopes.reduce((a, b) => a + b, 0) / sampleSlopes.length : 0;
    let seSlope = 0;
    if (sampleSlopes.length > 1) {
        let sumSq = sampleSlopes.reduce((sum, s) => sum + Math.pow(s - meanSlope, 2), 0);
        seSlope = Math.sqrt(sumSq / (sampleSlopes.length - 1));
    }

    // Theoretical SE
    let theoreticalSE = errorSD / Math.sqrt(sampleSize) / Math.sqrt(33.33); // Approx for uniform x on [0,20]

    // Three columns of stats
    let col1 = boxLeft + 20;
    let col2 = boxLeft + boxWidth / 3;
    let col3 = boxLeft + 2 * boxWidth / 3;

    fill(sylviaAuburn);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    text('Population Parameters', col1, boxTop + 8);

    fill(80);
    textSize(10);
    text('True slope (\u03B2) = ' + popSlope.toFixed(2), col1, boxTop + 28);
    text('True intercept (\u03B1) = ' + popIntercept.toFixed(1), col1, boxTop + 44);
    text('Error SD (\u03C3) = ' + errorSD.toFixed(1), col1, boxTop + 60);
    text('Sample size (n) = ' + sampleSize, col1, boxTop + 76);

    fill(sylviaGreen);
    textSize(11);
    text('Current Sample', col2, boxTop + 8);

    fill(80);
    textSize(10);
    text('Sample slope (b) = ' + currentSlope.toFixed(3), col2, boxTop + 28);
    text('Sample intercept (a) = ' + currentIntercept.toFixed(2), col2, boxTop + 44);
    text('Difference from \u03B2 = ' + (currentSlope - popSlope).toFixed(3), col2, boxTop + 60);

    fill('#1976D2');
    textSize(11);
    text('Sampling Distribution', col3, boxTop + 8);

    fill(80);
    textSize(10);
    text('Number of samples = ' + sampleSlopes.length, col3, boxTop + 28);
    text('Mean of slopes = ' + meanSlope.toFixed(4), col3, boxTop + 44);
    text('SD of slopes = ' + seSlope.toFixed(4), col3, boxTop + 60);
    text('(Standard Error of b)', col3, boxTop + 76);
}

function drawControls() {
    let y = drawHeight + 10;

    // Take Sample button
    fill(sylviaGreen);
    rect(10, y + 2, 90, 26, 4);
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text('Take Sample', 55, y + 15);

    // Take 100 samples button
    fill(sylviaAuburn);
    rect(110, y + 2, 100, 26, 4);
    fill('white');
    text('Take 100 Samples', 160, y + 15);

    // Reset button
    fill(100);
    rect(220, y + 2, 60, 26, 4);
    fill('white');
    text('Reset', 250, y + 15);

    // Parameters
    let paramX = 300;

    // Population slope slider
    fill(80);
    textAlign(LEFT, CENTER);
    textSize(9);
    text('\u03B2:', paramX, y + 15);

    fill(220);
    rect(paramX + 20, y + 9, 70, 12, 3);
    let slopePos = map(popSlope, -2, 2, paramX + 20, paramX + 90);
    fill(sylviaAuburn);
    ellipse(slopePos, y + 15, 12, 12);

    fill(80);
    text(popSlope.toFixed(1), paramX + 95, y + 15);

    // Error SD slider
    text('\u03C3:', paramX + 130, y + 15);
    fill(220);
    rect(paramX + 145, y + 9, 60, 12, 3);
    let errPos = map(errorSD, 0.5, 5, paramX + 145, paramX + 205);
    fill(sylviaAuburn);
    ellipse(errPos, y + 15, 12, 12);

    fill(80);
    text(errorSD.toFixed(1), paramX + 210, y + 15);

    // Sample size slider
    text('n:', paramX + 250, y + 15);
    fill(220);
    rect(paramX + 265, y + 9, 70, 12, 3);
    let nPos = map(sampleSize, 10, 100, paramX + 265, paramX + 335);
    fill(sylviaAuburn);
    ellipse(nPos, y + 15, 12, 12);

    fill(80);
    text(sampleSize, paramX + 340, y + 15);

    // Second row - instructions
    let y2 = y + 38;
    fill(100);
    textAlign(LEFT, CENTER);
    textSize(9);
    text('Observe how sample slopes vary around the true slope. Larger n and smaller \u03C3 reduce variability in the slope estimates.', 10, y2 + 10);
}

function mousePressed() {
    let y = drawHeight + 10;
    let paramX = 300;

    // Take Sample button
    if (mouseX >= 10 && mouseX <= 100 && mouseY >= y + 2 && mouseY <= y + 28) {
        generateSample();
        return;
    }

    // Take 100 samples button
    if (mouseX >= 110 && mouseX <= 210 && mouseY >= y + 2 && mouseY <= y + 28) {
        for (let i = 0; i < 100; i++) {
            generateSample();
        }
        return;
    }

    // Reset button
    if (mouseX >= 220 && mouseX <= 280 && mouseY >= y + 2 && mouseY <= y + 28) {
        sampleSlopes = [];
        generateSample();
        return;
    }

    // Check sliders
    if (mouseY >= y + 5 && mouseY <= y + 25) {
        // Slope slider
        if (mouseX >= paramX + 15 && mouseX <= paramX + 95) {
            draggingSlope = true;
            updateSlopeFromMouse(paramX);
            return;
        }

        // Error SD slider
        if (mouseX >= paramX + 140 && mouseX <= paramX + 210) {
            draggingError = true;
            updateErrorFromMouse(paramX);
            return;
        }

        // Sample size slider
        if (mouseX >= paramX + 260 && mouseX <= paramX + 340) {
            draggingN = true;
            updateNFromMouse(paramX);
            return;
        }
    }
}

function updateSlopeFromMouse(paramX) {
    popSlope = map(mouseX, paramX + 20, paramX + 90, -2, 2);
    popSlope = constrain(popSlope, -2, 2);
    popSlope = Math.round(popSlope * 10) / 10;
    sampleSlopes = [];
    generateSample();
}

function updateErrorFromMouse(paramX) {
    errorSD = map(mouseX, paramX + 145, paramX + 205, 0.5, 5);
    errorSD = constrain(errorSD, 0.5, 5);
    errorSD = Math.round(errorSD * 10) / 10;
    sampleSlopes = [];
    generateSample();
}

function updateNFromMouse(paramX) {
    sampleSize = Math.round(map(mouseX, paramX + 265, paramX + 335, 10, 100));
    sampleSize = constrain(sampleSize, 10, 100);
    sampleSlopes = [];
    generateSample();
}

function mouseDragged() {
    let paramX = 300;
    if (draggingSlope) updateSlopeFromMouse(paramX);
    if (draggingError) updateErrorFromMouse(paramX);
    if (draggingN) updateNFromMouse(paramX);
}

function mouseReleased() {
    draggingSlope = false;
    draggingError = false;
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
