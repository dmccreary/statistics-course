// Mean vs Median Skewness MicroSim
// Shows how mean and median relate to distribution shape
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 350;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// Data
let dataPoints = [];
let sampleSize = 100;
let skewness = 0;
let mean, median;

// UI elements
let symmetricButton, rightSkewButton, leftSkewButton;
let skewnessSlider;
let sampleSlider;
let addLeftOutlierButton, addRightOutlierButton;
let resetButton;

// Sylvia theme
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    // Generate initial symmetric data
    generateData(0);

    // Preset buttons
    symmetricButton = createButton('Symmetric');
    symmetricButton.position(10, drawHeight + 10);
    symmetricButton.mousePressed(() => { skewness = 0; generateData(0); });

    rightSkewButton = createButton('Right-skewed');
    rightSkewButton.position(90, drawHeight + 10);
    rightSkewButton.mousePressed(() => { skewness = 2; generateData(2); });

    leftSkewButton = createButton('Left-skewed');
    leftSkewButton.position(190, drawHeight + 10);
    leftSkewButton.mousePressed(() => { skewness = -2; generateData(-2); });

    // Add outlier buttons
    addLeftOutlierButton = createButton('+ Left Outlier');
    addLeftOutlierButton.position(290, drawHeight + 10);
    addLeftOutlierButton.mousePressed(addLeftOutlier);

    addRightOutlierButton = createButton('+ Right Outlier');
    addRightOutlierButton.position(395, drawHeight + 10);
    addRightOutlierButton.mousePressed(addRightOutlier);

    // Reset button
    resetButton = createButton('Reset');
    resetButton.position(canvasWidth - 70, drawHeight + 10);
    resetButton.mousePressed(() => generateData(skewness));

    describe('Interactive visualization showing how mean and median positions differ based on distribution shape', LABEL);
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
    text('Mean vs Median in Different Distributions', canvasWidth / 2, 8);

    // Calculate statistics
    calculateStats();

    // Draw histogram
    drawHistogram();

    // Draw mean and median lines
    drawStatLines();

    // Draw comparison info
    drawComparisonInfo();

    // Draw shape label
    drawShapeLabel();
}

function generateData(skew) {
    dataPoints = [];
    sampleSize = 150;

    for (let i = 0; i < sampleSize; i++) {
        let val;
        if (skew === 0) {
            // Symmetric (normal)
            val = randomGaussian(50, 15);
        } else if (skew > 0) {
            // Right-skewed (exponential-like)
            val = 20 + Math.pow(random(), 1/(1 + skew * 0.3)) * 60;
        } else {
            // Left-skewed
            val = 80 - Math.pow(random(), 1/(1 + Math.abs(skew) * 0.3)) * 60;
        }
        dataPoints.push(constrain(val, 0, 100));
    }
}

function addLeftOutlier() {
    dataPoints.push(random(0, 10));
}

function addRightOutlier() {
    dataPoints.push(random(90, 100));
}

function calculateStats() {
    let sorted = [...dataPoints].sort((a, b) => a - b);
    let n = sorted.length;

    mean = dataPoints.reduce((a, b) => a + b, 0) / n;

    if (n % 2 === 0) {
        median = (sorted[n/2 - 1] + sorted[n/2]) / 2;
    } else {
        median = sorted[Math.floor(n/2)];
    }
}

function drawHistogram() {
    let histLeft = margin + 40;
    let histRight = canvasWidth - margin - 40;
    let histTop = 60;
    let histBottom = 250;
    let histWidth = histRight - histLeft;
    let histHeight = histBottom - histTop;

    // Create bins
    let numBins = 20;
    let bins = new Array(numBins).fill(0);
    let binWidth = 100 / numBins;

    for (let val of dataPoints) {
        let binIndex = Math.min(Math.floor(val / binWidth), numBins - 1);
        bins[binIndex]++;
    }

    let maxBin = Math.max(...bins);

    // Draw bars
    let barWidth = histWidth / numBins;
    for (let i = 0; i < numBins; i++) {
        let barHeight = (bins[i] / maxBin) * histHeight * 0.9;
        let x = histLeft + i * barWidth;
        let y = histBottom - barHeight;

        // Color based on position relative to mean/median
        let binCenter = (i + 0.5) * binWidth;
        if (binCenter < Math.min(mean, median)) {
            fill('#81C784'); // Green for left
        } else if (binCenter > Math.max(mean, median)) {
            fill('#64B5F6'); // Blue for right
        } else {
            fill('#FFF176'); // Yellow for middle
        }

        stroke(100);
        strokeWeight(1);
        rect(x, y, barWidth - 1, barHeight);
    }

    // Draw x-axis
    stroke(100);
    strokeWeight(2);
    line(histLeft, histBottom, histRight, histBottom);

    // Tick marks
    textAlign(CENTER, TOP);
    textSize(10);
    fill(100);
    noStroke();
    for (let val = 0; val <= 100; val += 20) {
        let x = map(val, 0, 100, histLeft, histRight);
        stroke(100);
        strokeWeight(1);
        line(x, histBottom, x, histBottom + 5);
        noStroke();
        text(val, x, histBottom + 8);
    }
}

function drawStatLines() {
    let histLeft = margin + 40;
    let histRight = canvasWidth - margin - 40;
    let histTop = 60;
    let histBottom = 250;

    // Mean line
    let meanX = map(mean, 0, 100, histLeft, histRight);
    stroke(sylviaAuburn);
    strokeWeight(3);
    line(meanX, histTop - 10, meanX, histBottom + 25);

    fill(sylviaAuburn);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(12);
    text('Mean', meanX, histTop - 12);
    text(mean.toFixed(1), meanX, histTop - 25);

    // Median line
    let medianX = map(median, 0, 100, histLeft, histRight);
    stroke(sylviaGreen);
    strokeWeight(3);
    line(medianX, histTop - 10, medianX, histBottom + 25);

    fill(sylviaGreen);
    noStroke();
    textAlign(CENTER, BOTTOM);
    text('Median', medianX, histTop - 12);
    text(median.toFixed(1), medianX, histTop - 25);

    // Arrow showing direction of difference
    if (Math.abs(mean - median) > 1) {
        let arrowY = histBottom + 35;
        stroke(100);
        strokeWeight(2);
        line(medianX, arrowY, meanX, arrowY);

        // Arrowhead
        let dir = mean > median ? 1 : -1;
        line(meanX, arrowY, meanX - dir * 8, arrowY - 5);
        line(meanX, arrowY, meanX - dir * 8, arrowY + 5);
    }
}

function drawComparisonInfo() {
    let boxX = canvasWidth - 220;
    let boxY = 60;

    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(boxX, boxY, 200, 90, 5);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);

    // Relationship text
    let relationship;
    if (Math.abs(mean - median) < 0.5) {
        relationship = 'Mean ≈ Median';
    } else if (mean > median) {
        relationship = 'Mean > Median';
    } else {
        relationship = 'Mean < Median';
    }

    text('Comparison:', boxX + 10, boxY + 10);
    textSize(16);
    fill(mean > median ? sylviaAuburn : (mean < median ? sylviaGreen : 'black'));
    text(relationship, boxX + 10, boxY + 30);

    textSize(11);
    fill(100);
    text('n = ' + dataPoints.length, boxX + 10, boxY + 55);
    text('Difference = ' + Math.abs(mean - median).toFixed(2), boxX + 10, boxY + 72);
}

function drawShapeLabel() {
    let label, description;

    if (Math.abs(mean - median) < 1) {
        label = 'Symmetric';
        description = 'Mean and median are approximately equal';
    } else if (mean > median) {
        label = 'Right-skewed';
        description = 'Mean is pulled toward the long right tail';
    } else {
        label = 'Left-skewed';
        description = 'Mean is pulled toward the long left tail';
    }

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);
    text('Shape: ' + label, margin, 280);

    textSize(11);
    fill(100);
    text(description, margin, 298);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    if (resetButton) {
        resetButton.position(canvasWidth - 70, drawHeight + 10);
    }
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
