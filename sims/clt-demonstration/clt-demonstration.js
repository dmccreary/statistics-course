// Central Limit Theorem Demonstration MicroSim
// Shows how sampling distributions become normal regardless of population shape
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 800;
let drawHeight = 520;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 20;

// Population types
let populationTypes = ['Uniform', 'Skewed Right', 'Skewed Left', 'Bimodal', 'Normal', 'U-shaped'];
let currentPopulationType = 1; // Skewed Right default

// Sample sizes
let sampleSizes = [1, 2, 5, 10, 25, 50, 100];
let currentSampleSizeIndex = 0; // n = 1

// Population data
let populationData = [];
let populationSize = 10000;
let populationMean = 0;
let populationSD = 0;

// Sampling distribution data
let sampleMeans = [];
let maxSamples = 2000;

// Animation state
let samplingQueue = 0;
let animationSpeed = 3;

// UI
let showNormalOverlay = true;

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';

// Button regions
let buttons = {};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    generatePopulation();

    describe('Central Limit Theorem demonstration showing how sampling distributions become normal', LABEL);
}

function generatePopulation() {
    populationData = [];

    switch (populationTypes[currentPopulationType]) {
        case 'Uniform':
            for (let i = 0; i < populationSize; i++) {
                populationData.push(random(0, 100));
            }
            break;

        case 'Skewed Right':
            for (let i = 0; i < populationSize; i++) {
                // Exponential-like distribution
                let val = -20 * log(random());
                populationData.push(min(val, 100));
            }
            break;

        case 'Skewed Left':
            for (let i = 0; i < populationSize; i++) {
                // Mirror of right skew
                let val = 100 + 20 * log(random());
                populationData.push(max(val, 0));
            }
            break;

        case 'Bimodal':
            for (let i = 0; i < populationSize; i++) {
                if (random() < 0.5) {
                    populationData.push(randomGaussian(30, 8));
                } else {
                    populationData.push(randomGaussian(70, 8));
                }
            }
            break;

        case 'Normal':
            for (let i = 0; i < populationSize; i++) {
                populationData.push(randomGaussian(50, 15));
            }
            break;

        case 'U-shaped':
            for (let i = 0; i < populationSize; i++) {
                // Beta distribution approximation
                let u = random();
                if (u < 0.5) {
                    populationData.push(random(0, 30));
                } else {
                    populationData.push(random(70, 100));
                }
            }
            break;
    }

    // Constrain values
    populationData = populationData.map(v => constrain(v, 0, 100));

    // Calculate population statistics
    populationMean = populationData.reduce((a, b) => a + b, 0) / populationData.length;
    let sumSquares = populationData.reduce((a, b) => a + (b - populationMean) ** 2, 0);
    populationSD = sqrt(sumSquares / populationData.length);

    // Reset sampling distribution
    sampleMeans = [];
    samplingQueue = 0;
}

function draw() {
    updateCanvasSize();

    // Background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Central Limit Theorem Demonstration', canvasWidth / 2, 8);

    // Process sampling queue
    let speed = ceil(animationSpeed * 2);
    if (samplingQueue > 0 && frameCount % max(1, 4 - animationSpeed) === 0) {
        for (let i = 0; i < min(speed, samplingQueue); i++) {
            takeSample();
        }
        samplingQueue -= min(speed, samplingQueue);
    }

    // Draw components
    drawPopulationSection();
    drawSamplingDistributionSection();
    drawStatisticsSection();
    drawControls();
}

function drawPopulationSection() {
    let sectionX = 15;
    let sectionY = 35;
    let sectionWidth = canvasWidth - 30;
    let sectionHeight = 130;

    // Background
    fill(255);
    stroke(100);
    strokeWeight(1);
    rect(sectionX, sectionY, sectionWidth, sectionHeight, 5);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text('Population Distribution: ' + populationTypes[currentPopulationType], sectionX + 10, sectionY + 8);

    // Stats
    textSize(10);
    fill(80);
    textAlign(RIGHT, TOP);
    text('μ = ' + populationMean.toFixed(2) + '  |  σ = ' + populationSD.toFixed(2), sectionX + sectionWidth - 10, sectionY + 8);

    // Draw histogram
    let histX = sectionX + 40;
    let histY = sectionY + 30;
    let histWidth = sectionWidth - 60;
    let histHeight = sectionHeight - 50;

    // Create bins
    let numBins = 50;
    let bins = new Array(numBins).fill(0);

    for (let val of populationData) {
        let binIndex = min(floor(val / 100 * numBins), numBins - 1);
        bins[binIndex]++;
    }

    let maxBin = max(bins);

    // Draw bars
    for (let i = 0; i < numBins; i++) {
        if (bins[i] > 0) {
            let barX = histX + (i / numBins) * histWidth;
            let barWidth = histWidth / numBins;
            let barHeight = (bins[i] / maxBin) * histHeight;

            fill(sylviaGreen);
            noStroke();
            rect(barX, histY + histHeight - barHeight, barWidth - 1, barHeight);
        }
    }

    // Axis
    stroke(100);
    strokeWeight(1);
    line(histX, histY + histHeight, histX + histWidth, histY + histHeight);

    // X labels
    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(9);
    for (let i = 0; i <= 100; i += 20) {
        let x = histX + (i / 100) * histWidth;
        text(i, x, histY + histHeight + 3);
    }
}

function drawSamplingDistributionSection() {
    let sectionX = 15;
    let sectionY = 175;
    let sectionWidth = canvasWidth * 0.65;
    let sectionHeight = drawHeight - 190;

    // Background
    fill(255);
    stroke(100);
    strokeWeight(1);
    rect(sectionX, sectionY, sectionWidth, sectionHeight, 5);

    // Title
    fill(sylviaAuburn);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    let n = sampleSizes[currentSampleSizeIndex];
    text('Sampling Distribution of x\u0305 (n = ' + n + ', ' + sampleMeans.length + ' samples)', sectionX + 10, sectionY + 8);

    // Histogram area
    let histX = sectionX + 50;
    let histY = sectionY + 35;
    let histWidth = sectionWidth - 70;
    let histHeight = sectionHeight - 80;

    // Axis
    stroke(100);
    strokeWeight(1);
    line(histX, histY + histHeight, histX + histWidth, histY + histHeight);
    line(histX, histY, histX, histY + histHeight);

    // X labels
    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(9);
    for (let i = 0; i <= 100; i += 20) {
        let x = histX + (i / 100) * histWidth;
        text(i, x, histY + histHeight + 5);
        stroke(230);
        strokeWeight(1);
        line(x, histY, x, histY + histHeight);
        noStroke();
    }

    // Title for X axis
    textSize(10);
    text('Sample Mean (x\u0305)', histX + histWidth/2, histY + histHeight + 20);

    if (sampleMeans.length > 0) {
        // Create bins
        let numBins = 40;
        let bins = new Array(numBins).fill(0);

        for (let val of sampleMeans) {
            let binIndex = min(floor(val / 100 * numBins), numBins - 1);
            bins[binIndex]++;
        }

        let maxBin = max(bins);

        // Draw bars
        for (let i = 0; i < numBins; i++) {
            if (bins[i] > 0) {
                let barX = histX + (i / numBins) * histWidth;
                let barWidth = histWidth / numBins;
                let barHeight = (bins[i] / maxBin) * (histHeight - 10);

                fill(sylviaAuburn);
                noStroke();
                rect(barX, histY + histHeight - barHeight, barWidth - 1, barHeight);
            }
        }

        // Normal overlay
        if (showNormalOverlay && sampleMeans.length >= 30) {
            let mean = sampleMeans.reduce((a, b) => a + b, 0) / sampleMeans.length;
            let variance = sampleMeans.reduce((a, b) => a + (b - mean) ** 2, 0) / sampleMeans.length;
            let sd = sqrt(variance);

            if (sd > 0.5) {
                stroke(sylviaGreen);
                strokeWeight(3);
                noFill();
                beginShape();
                for (let x = 0; x <= histWidth; x += 2) {
                    let xVal = (x / histWidth) * 100;
                    let z = (xVal - mean) / sd;
                    let density = exp(-0.5 * z * z) / (sd * sqrt(TWO_PI));
                    let maxDensity = 1 / (sd * sqrt(TWO_PI));
                    let y = histY + histHeight - (density / maxDensity) * (histHeight - 10);
                    vertex(histX + x, y);
                }
                endShape();

                // Legend
                fill(sylviaGreen);
                noStroke();
                textSize(10);
                textAlign(LEFT, TOP);
                text('Normal curve overlay', histX + 10, histY + 5);
            }
        }

        // Draw mean line
        let observedMean = sampleMeans.reduce((a, b) => a + b, 0) / sampleMeans.length;
        let meanX = histX + (observedMean / 100) * histWidth;
        stroke(sylviaGreen);
        strokeWeight(2);
        drawingContext.setLineDash([4, 3]);
        line(meanX, histY, meanX, histY + histHeight);
        drawingContext.setLineDash([]);

        // Population mean line
        let popMeanX = histX + (populationMean / 100) * histWidth;
        stroke('#888');
        strokeWeight(1);
        drawingContext.setLineDash([2, 2]);
        line(popMeanX, histY, popMeanX, histY + histHeight);
        drawingContext.setLineDash([]);
    } else {
        fill(100);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);
        text('Click "Take Samples" to build the sampling distribution', sectionX + sectionWidth/2, sectionY + sectionHeight/2);
    }

    // Y axis label
    push();
    translate(sectionX + 18, sectionY + sectionHeight/2);
    rotate(-HALF_PI);
    fill(80);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text('Frequency', 0, 0);
    pop();

    // CLT insight box
    let insightY = sectionY + sectionHeight - 35;
    if (n >= 25 && sampleMeans.length >= 100) {
        fill('#e8f5e9');
        stroke(sylviaGreen);
        strokeWeight(1);
        rect(sectionX + 10, insightY, sectionWidth - 20, 28, 3);

        fill(sylviaGreen);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(11);
        text('The sampling distribution is approximately NORMAL regardless of population shape!', sectionX + sectionWidth/2, insightY + 14);
    }
}

function drawStatisticsSection() {
    let sectionX = canvasWidth * 0.65 + 25;
    let sectionY = 175;
    let sectionWidth = canvasWidth * 0.35 - 40;
    let sectionHeight = drawHeight - 190;

    // Background
    fill(255);
    stroke(100);
    strokeWeight(1);
    rect(sectionX, sectionY, sectionWidth, sectionHeight, 5);

    // Title
    fill(sylviaGreen);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text('Statistics Comparison', sectionX + 10, sectionY + 10);

    let y = sectionY + 35;
    let lineHeight = 22;
    let n = sampleSizes[currentSampleSizeIndex];

    // Theoretical values
    fill(80);
    textSize(11);
    textAlign(LEFT, TOP);
    text('Theoretical:', sectionX + 10, y);
    y += lineHeight;

    textSize(10);
    text('Mean of x\u0305 = μ = ' + populationMean.toFixed(2), sectionX + 15, y);
    y += lineHeight;

    let theoreticalSE = populationSD / sqrt(n);
    text('SD of x\u0305 = σ/√n = ' + theoreticalSE.toFixed(3), sectionX + 15, y);
    y += lineHeight + 10;

    // Observed values
    if (sampleMeans.length > 0) {
        fill(sylviaAuburn);
        textSize(11);
        text('Observed (' + sampleMeans.length + ' samples):', sectionX + 10, y);
        y += lineHeight;

        let observedMean = sampleMeans.reduce((a, b) => a + b, 0) / sampleMeans.length;
        let variance = sampleMeans.reduce((a, b) => a + (b - observedMean) ** 2, 0) / sampleMeans.length;
        let observedSD = sqrt(variance);

        textSize(10);
        fill('black');
        text('Mean of x\u0305 = ' + observedMean.toFixed(2), sectionX + 15, y);
        y += lineHeight;

        text('SD of x\u0305 = ' + observedSD.toFixed(3), sectionX + 15, y);
        y += lineHeight + 15;

        // Comparison
        fill(100);
        textSize(9);
        let meanDiff = abs(observedMean - populationMean);
        let sdDiff = abs(observedSD - theoreticalSE);
        text('Mean diff: ' + meanDiff.toFixed(3), sectionX + 15, y);
        y += 16;
        text('SD diff: ' + sdDiff.toFixed(3), sectionX + 15, y);
    } else {
        fill(100);
        textSize(10);
        text('Take samples to see', sectionX + 15, y);
        text('observed statistics', sectionX + 15, y + 16);
    }

    // CLT summary
    y = sectionY + sectionHeight - 85;
    fill(sylviaCream);
    stroke(sylviaGreen);
    strokeWeight(1);
    rect(sectionX + 5, y, sectionWidth - 10, 75, 3);

    fill(sylviaGreen);
    noStroke();
    textSize(10);
    textAlign(LEFT, TOP);
    text('CLT Key Points:', sectionX + 12, y + 8);

    textSize(9);
    fill(80);
    text('1. Mean of x\u0305 = μ (population)', sectionX + 12, y + 24);
    text('2. SD of x\u0305 = σ/√n', sectionX + 12, y + 38);
    text('3. Shape becomes normal', sectionX + 12, y + 52);
    text('   as n increases', sectionX + 12, y + 64);
}

function drawControls() {
    let y = drawHeight + 10;

    // Population type selector
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Population:', 15, y + 12);

    // Population dropdown buttons
    let popX = 85;
    for (let i = 0; i < populationTypes.length; i++) {
        let isSelected = i === currentPopulationType;
        let btnWidth = textWidth(populationTypes[i]) + 12;

        fill(isSelected ? sylviaGreen : '#eee');
        stroke(isSelected ? sylviaGreen : '#ccc');
        strokeWeight(1);
        rect(popX, y + 2, btnWidth, 20, 3);

        fill(isSelected ? 'white' : 'black');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(9);
        text(populationTypes[i], popX + btnWidth/2, y + 12);

        buttons['pop_' + i] = {x: popX, y: y + 2, w: btnWidth, h: 20, action: () => { currentPopulationType = i; generatePopulation(); }};
        popX += btnWidth + 4;
    }

    // Second row
    y += 28;

    // Sample size selector
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Sample size (n):', 15, y + 12);

    let sizeX = 110;
    for (let i = 0; i < sampleSizes.length; i++) {
        let isSelected = i === currentSampleSizeIndex;
        fill(isSelected ? sylviaAuburn : '#eee');
        stroke(isSelected ? sylviaAuburn : '#ccc');
        strokeWeight(1);
        rect(sizeX, y + 2, 32, 20, 3);

        fill(isSelected ? 'white' : 'black');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        text(sampleSizes[i], sizeX + 16, y + 12);

        let idx = i;
        buttons['size_' + i] = {x: sizeX, y: y + 2, w: 32, h: 20, action: () => { currentSampleSizeIndex = idx; sampleMeans = []; }};
        sizeX += 38;
    }

    // Action buttons
    let btnX = sizeX + 20;

    fill(sylviaAuburn);
    noStroke();
    rect(btnX, y + 2, 70, 20, 3);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(10);
    text('Take 100', btnX + 35, y + 12);
    buttons['take100'] = {x: btnX, y: y + 2, w: 70, h: 20, action: () => { samplingQueue += 100; }};
    btnX += 78;

    fill(sylviaAuburn);
    rect(btnX, y + 2, 70, 20, 3);
    fill('white');
    text('Take 1000', btnX + 35, y + 12);
    buttons['take1000'] = {x: btnX, y: y + 2, w: 70, h: 20, action: () => { samplingQueue += 1000; }};
    btnX += 78;

    // Toggle normal overlay
    fill(showNormalOverlay ? sylviaGreen : '#ddd');
    stroke(showNormalOverlay ? sylviaGreen : '#aaa');
    strokeWeight(1);
    rect(btnX, y + 2, 75, 20, 3);
    fill(showNormalOverlay ? 'white' : 'black');
    noStroke();
    text(showNormalOverlay ? 'Normal: ON' : 'Normal: OFF', btnX + 37, y + 12);
    buttons['toggleNormal'] = {x: btnX, y: y + 2, w: 75, h: 20, action: () => { showNormalOverlay = !showNormalOverlay; }};
    btnX += 83;

    // Reset
    fill(100);
    noStroke();
    rect(btnX, y + 2, 50, 20, 3);
    fill('white');
    text('Reset', btnX + 25, y + 12);
    buttons['reset'] = {x: btnX, y: y + 2, w: 50, h: 20, action: () => { sampleMeans = []; samplingQueue = 0; }};
}

function takeSample() {
    if (sampleMeans.length >= maxSamples) return;

    let n = sampleSizes[currentSampleSizeIndex];
    let sum = 0;

    for (let i = 0; i < n; i++) {
        let idx = floor(random(populationData.length));
        sum += populationData[idx];
    }

    let mean = sum / n;
    sampleMeans.push(mean);
}

function mousePressed() {
    for (let key in buttons) {
        let btn = buttons[key];
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            if (btn.action) {
                btn.action();
            }
            return;
        }
    }
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
