// Parameter vs Statistic Interactive Comparison MicroSim
// Students calculate sample statistics and compare them to population parameters
// This demonstrates why statistics vary but parameters are fixed
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 350;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 25;
let sliderLeftMargin = 300;
let defaultTextSize = 16;

// Population data - 200 values with mean around 70 (representing heights in inches)
let population = [];
let populationMean = 70;
let populationSD = 4;

// Sample data
let currentSample = [];
let sampleMean = 0;
let sampleSize = 25;

// History of sample means
let sampleMeansHistory = [];
let samplesDrawn = 0;

// UI elements
let drawSampleButton;
let resetButton;
let sampleSizeSlider;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);

    // Generate population with approximate normal distribution
    generatePopulation();

    // Create Draw Sample button
    drawSampleButton = createButton('Draw New Sample');
    drawSampleButton.position(10, drawHeight + 10);
    drawSampleButton.mousePressed(drawNewSample);

    // Create Reset button
    resetButton = createButton('Reset');
    resetButton.position(135, drawHeight + 10);
    resetButton.mousePressed(resetSimulation);

    // Create sample size slider (10, 25, 50, 100)
    sampleSizeSlider = createSlider(10, 100, 25, 1);
    sampleSizeSlider.position(sliderLeftMargin, drawHeight + 10);
    sampleSizeSlider.size(canvasWidth - sliderLeftMargin - margin);

    // Draw initial sample
    drawNewSample();

    describe('Interactive simulation comparing population parameters to sample statistics. Students can draw random samples and observe how sample means vary around the fixed population mean.', LABEL);
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
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Get current sample size from slider
    sampleSize = sampleSizeSlider.value();

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text('Parameter vs Statistic Comparison', canvasWidth/2, 8);

    // Calculate layout for three panels
    let panelWidth = (canvasWidth - 40) / 3;
    let leftPanelX = 15;
    let middlePanelX = leftPanelX + panelWidth + 5;
    let rightPanelX = middlePanelX + panelWidth + 5;
    let panelTop = 35;
    let panelHeight = drawHeight - 45;

    // Draw Population Panel (left)
    drawPopulationPanel(leftPanelX, panelTop, panelWidth, panelHeight);

    // Draw Sample Panel (middle)
    drawSamplePanel(middlePanelX, panelTop, panelWidth, panelHeight);

    // Draw Comparison/History Panel (right)
    drawComparisonPanel(rightPanelX, panelTop, panelWidth, panelHeight);

    // Draw control labels
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
    text('Sample Size (n): ' + sampleSize, 195, drawHeight + 25);
}

function drawPopulationPanel(x, y, w, h) {
    // Panel background
    fill(255, 255, 255, 200);
    stroke(150);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    // Panel title
    fill('navy');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Population (N = 200)', x + w/2, y + 5);

    // Draw histogram
    let histTop = y + 25;
    let histHeight = h - 80;
    let histWidth = w - 20;
    let histLeft = x + 10;

    drawHistogram(population, histLeft, histTop, histWidth, histHeight, 'steelblue');

    // Draw population mean line (parameter)
    let minVal = 55;
    let maxVal = 85;
    let muX = map(populationMean, minVal, maxVal, histLeft, histLeft + histWidth);

    stroke('darkred');
    strokeWeight(2);
    line(muX, histTop, muX, histTop + histHeight);

    // Parameter label
    fill('darkred');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(16);
    text('\u03BC = ' + populationMean.toFixed(1), x + w/2, y + h - 45);
    textSize(12);
    fill('black');
    text('(Population Mean - Parameter)', x + w/2, y + h - 25);
}

function drawSamplePanel(x, y, w, h) {
    // Panel background
    fill(255, 255, 255, 200);
    stroke(150);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    // Panel title
    fill('darkgreen');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Current Sample (n = ' + currentSample.length + ')', x + w/2, y + 5);

    // Draw histogram
    let histTop = y + 25;
    let histHeight = h - 80;
    let histWidth = w - 20;
    let histLeft = x + 10;

    if (currentSample.length > 0) {
        drawHistogram(currentSample, histLeft, histTop, histWidth, histHeight, 'forestgreen');

        // Draw sample mean line (statistic)
        let minVal = 55;
        let maxVal = 85;
        let xbarX = map(sampleMean, minVal, maxVal, histLeft, histLeft + histWidth);

        stroke('darkorange');
        strokeWeight(2);
        line(xbarX, histTop, xbarX, histTop + histHeight);
    }

    // Statistic label
    fill('darkorange');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(16);
    text('x\u0305 = ' + sampleMean.toFixed(2), x + w/2, y + h - 45);
    textSize(12);
    fill('black');
    text('(Sample Mean - Statistic)', x + w/2, y + h - 25);
}

function drawComparisonPanel(x, y, w, h) {
    // Panel background
    fill(255, 255, 255, 200);
    stroke(150);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    // Panel title
    fill('purple');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Comparison & History', x + w/2, y + 5);

    // Difference display
    let diff = sampleMean - populationMean;
    textSize(13);
    fill('black');
    textAlign(LEFT, TOP);
    text('Samples drawn: ' + samplesDrawn, x + 10, y + 28);

    textSize(12);
    text('Current difference:', x + 10, y + 48);
    fill(diff >= 0 ? 'darkgreen' : 'darkred');
    textSize(14);
    text('x\u0305 - \u03BC = ' + diff.toFixed(2), x + 10, y + 64);

    // Draw history of sample means as dot plot
    if (sampleMeansHistory.length > 0) {
        fill('black');
        noStroke();
        textSize(12);
        textAlign(CENTER, TOP);
        text('History of Sample Means', x + w/2, y + 88);

        let dotPlotTop = y + 105;
        let dotPlotHeight = h - 150;
        let dotPlotWidth = w - 20;
        let dotPlotLeft = x + 10;

        // Draw axis
        stroke(100);
        strokeWeight(1);
        line(dotPlotLeft, dotPlotTop + dotPlotHeight, dotPlotLeft + dotPlotWidth, dotPlotTop + dotPlotHeight);

        // Draw tick marks and labels
        let minVal = 65;
        let maxVal = 75;
        for (let v = minVal; v <= maxVal; v += 2) {
            let tickX = map(v, minVal, maxVal, dotPlotLeft, dotPlotLeft + dotPlotWidth);
            line(tickX, dotPlotTop + dotPlotHeight, tickX, dotPlotTop + dotPlotHeight + 5);
            noStroke();
            fill(100);
            textSize(10);
            text(v, tickX, dotPlotTop + dotPlotHeight + 8);
            stroke(100);
        }

        // Draw population mean reference line
        let muX = map(populationMean, minVal, maxVal, dotPlotLeft, dotPlotLeft + dotPlotWidth);
        stroke('darkred');
        strokeWeight(2);
        line(muX, dotPlotTop, muX, dotPlotTop + dotPlotHeight);

        // Draw dots for each sample mean
        noStroke();
        let dotRadius = 4;
        let columnCounts = {};

        for (let i = 0; i < sampleMeansHistory.length; i++) {
            let mean = sampleMeansHistory[i];
            // Clamp to visible range
            let clampedMean = constrain(mean, minVal, maxVal);
            let dotX = map(clampedMean, minVal, maxVal, dotPlotLeft, dotPlotLeft + dotPlotWidth);

            // Round to nearest pixel column
            let col = round(dotX);
            if (!columnCounts[col]) columnCounts[col] = 0;
            let dotY = dotPlotTop + dotPlotHeight - 10 - (columnCounts[col] * (dotRadius * 2 + 1));
            columnCounts[col]++;

            // Color based on whether it's the most recent
            if (i === sampleMeansHistory.length - 1) {
                fill('darkorange');
            } else {
                fill('rgba(70, 130, 180, 0.7)');
            }
            circle(dotX, dotY, dotRadius * 2);
        }

        // Label for axis
        fill('black');
        noStroke();
        textSize(10);
        textAlign(CENTER, TOP);
        text('Sample Mean (x\u0305)', x + w/2, y + h - 28);
    }

    // Key insight text
    fill('purple');
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text('Statistics vary; parameters are fixed!', x + w/2, y + h - 5);
}

function drawHistogram(data, x, y, w, h, barColor) {
    if (data.length === 0) return;

    // Create bins from 55 to 85 (covering typical height range)
    let minVal = 55;
    let maxVal = 85;
    let numBins = 15;
    let binWidth = (maxVal - minVal) / numBins;
    let bins = new Array(numBins).fill(0);

    // Count values in each bin
    for (let val of data) {
        let binIndex = floor((val - minVal) / binWidth);
        binIndex = constrain(binIndex, 0, numBins - 1);
        bins[binIndex]++;
    }

    // Find max count for scaling
    let maxCount = max(bins);
    if (maxCount === 0) maxCount = 1;

    // Draw bars
    let barWidth = w / numBins;
    fill(barColor);
    stroke(255);
    strokeWeight(1);

    for (let i = 0; i < numBins; i++) {
        let barHeight = map(bins[i], 0, maxCount, 0, h - 20);
        let barX = x + i * barWidth;
        let barY = y + h - barHeight;
        rect(barX, barY, barWidth - 1, barHeight);
    }

    // Draw axis labels
    fill(100);
    noStroke();
    textSize(9);
    textAlign(CENTER, TOP);
    for (let i = 0; i <= numBins; i += 5) {
        let labelX = x + i * barWidth;
        let labelVal = minVal + i * binWidth;
        text(round(labelVal), labelX, y + h - 15);
    }
}

function generatePopulation() {
    population = [];
    // Generate 200 values with approximate normal distribution
    // Using Box-Muller transform
    for (let i = 0; i < 200; i++) {
        let u1 = random();
        let u2 = random();
        let z = sqrt(-2 * log(u1)) * cos(TWO_PI * u2);
        let value = populationMean + z * populationSD;
        population.push(value);
    }

    // Adjust to make mean exactly 70
    let actualMean = population.reduce((a, b) => a + b, 0) / population.length;
    let adjustment = populationMean - actualMean;
    population = population.map(v => v + adjustment);
}

function drawNewSample() {
    // Get current sample size from slider
    sampleSize = sampleSizeSlider.value();

    // Draw random sample from population
    currentSample = [];
    let indices = [];
    while (indices.length < sampleSize) {
        let idx = floor(random(population.length));
        if (!indices.includes(idx)) {
            indices.push(idx);
            currentSample.push(population[idx]);
        }
    }

    // Calculate sample mean
    sampleMean = currentSample.reduce((a, b) => a + b, 0) / currentSample.length;

    // Add to history
    sampleMeansHistory.push(sampleMean);
    samplesDrawn++;
}

function resetSimulation() {
    // Generate new population
    generatePopulation();

    // Reset history
    sampleMeansHistory = [];
    samplesDrawn = 0;

    // Draw initial sample
    currentSample = [];
    sampleMean = populationMean;
    drawNewSample();
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    sampleSizeSlider.size(canvasWidth - sliderLeftMargin - margin);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
