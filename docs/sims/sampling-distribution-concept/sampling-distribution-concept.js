// Sampling Distribution Concept Visualization MicroSim
// Demonstrates how individual samples combine to form a sampling distribution
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 800;
let drawHeight = 480;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 20;

// Population parameters
let populationProportion = 0.6;
let populationSize = 200;
let population = [];

// Sampling parameters
let sampleSize = 25;
let sampleSizes = [10, 25, 50, 100];
let currentSampleSizeIndex = 1;

// Sampling distribution data
let sampleProportions = [];
let maxSamples = 500;
let currentSample = [];
let currentProportion = 0;
let animatingDots = [];

// Animation state
let samplingQueue = 0;
let animationSpeed = 1;
let showingCurrentSample = false;
let sampleAnimationFrame = 0;

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

    // Generate population
    generatePopulation();

    describe('Interactive visualization showing how sampling distributions are formed from many samples', LABEL);
}

function generatePopulation() {
    population = [];
    for (let i = 0; i < populationSize; i++) {
        population.push({
            success: random() < populationProportion,
            x: random(30, canvasWidth * 0.6 - 30),
            y: random(50, 120)
        });
    }
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
    text('Sampling Distribution Concept', canvasWidth / 2, 8);

    // Process sampling queue
    if (samplingQueue > 0 && frameCount % max(1, 5 - animationSpeed) === 0) {
        takeSample();
        samplingQueue--;
    }

    // Draw sections
    drawPopulationSection();
    drawSamplingSection();
    drawHistogramSection();
    drawStatistics();
    drawControls();
}

function drawPopulationSection() {
    let sectionX = 10;
    let sectionY = 35;
    let sectionWidth = canvasWidth * 0.6 - 20;
    let sectionHeight = 100;

    // Section background
    fill(255, 255, 255, 200);
    stroke(100);
    strokeWeight(1);
    rect(sectionX, sectionY, sectionWidth, sectionHeight, 5);

    // Section label
    fill(sylviaGreen);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text('Population (p = ' + populationProportion.toFixed(2) + ')', sectionX + 10, sectionY + 5);

    // Draw population dots
    for (let i = 0; i < population.length; i++) {
        let p = population[i];
        let isInCurrentSample = currentSample.includes(i);

        if (p.success) {
            fill(isInCurrentSample ? sylviaAuburn : '#4CAF50');
        } else {
            fill(isInCurrentSample ? '#B5651D80' : '#90CAF9');
        }

        if (isInCurrentSample) {
            stroke(sylviaAuburn);
            strokeWeight(2);
        } else {
            noStroke();
        }

        ellipse(sectionX + p.x * (sectionWidth / (canvasWidth * 0.6)),
                sectionY + 20 + (p.y - 50) * (sectionHeight - 30) / 70,
                isInCurrentSample ? 10 : 6,
                isInCurrentSample ? 10 : 6);
    }

    // Legend
    noStroke();
    textSize(10);
    textAlign(LEFT, CENTER);
    fill('#4CAF50');
    ellipse(sectionX + sectionWidth - 80, sectionY + 15, 8, 8);
    fill('black');
    text('Success', sectionX + sectionWidth - 73, sectionY + 15);
    fill('#90CAF9');
    ellipse(sectionX + sectionWidth - 80, sectionY + 28, 8, 8);
    fill('black');
    text('Failure', sectionX + sectionWidth - 73, sectionY + 28);
}

function drawSamplingSection() {
    let sectionX = 10;
    let sectionY = 145;
    let sectionWidth = canvasWidth * 0.35;
    let sectionHeight = 80;

    // Section background
    fill(255, 255, 255, 200);
    stroke(100);
    strokeWeight(1);
    rect(sectionX, sectionY, sectionWidth, sectionHeight, 5);

    // Section label
    fill(sylviaAuburn);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text('Current Sample (n = ' + sampleSize + ')', sectionX + 10, sectionY + 5);

    if (currentSample.length > 0) {
        // Draw sample dots
        let cols = 10;
        let dotSize = 12;
        let startX = sectionX + 15;
        let startY = sectionY + 25;

        for (let i = 0; i < currentSample.length; i++) {
            let col = i % cols;
            let row = floor(i / cols);
            let x = startX + col * (dotSize + 4);
            let y = startY + row * (dotSize + 4);

            if (population[currentSample[i]].success) {
                fill('#4CAF50');
            } else {
                fill('#90CAF9');
            }
            noStroke();
            ellipse(x + dotSize/2, y + dotSize/2, dotSize, dotSize);
        }

        // Show proportion
        fill(sylviaAuburn);
        textAlign(RIGHT, TOP);
        textSize(14);
        text('p̂ = ' + currentProportion.toFixed(3), sectionX + sectionWidth - 10, sectionY + 5);
    } else {
        fill(100);
        textAlign(CENTER, CENTER);
        textSize(11);
        text('Click "Take 1 Sample" to begin', sectionX + sectionWidth/2, sectionY + sectionHeight/2);
    }
}

function drawHistogramSection() {
    let sectionX = canvasWidth * 0.35 + 20;
    let sectionY = 145;
    let sectionWidth = canvasWidth * 0.65 - 30;
    let sectionHeight = drawHeight - 160;

    // Section background
    fill(255);
    stroke(100);
    strokeWeight(1);
    rect(sectionX, sectionY, sectionWidth, sectionHeight, 5);

    // Section label
    fill(sylviaGreen);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text('Sampling Distribution of p̂', sectionX + 10, sectionY + 5);
    text('(' + sampleProportions.length + ' samples)', sectionX + 170, sectionY + 5);

    // Histogram area
    let histX = sectionX + 40;
    let histY = sectionY + 30;
    let histWidth = sectionWidth - 60;
    let histHeight = sectionHeight - 60;

    // Draw axes
    stroke(100);
    strokeWeight(1);
    line(histX, histY + histHeight, histX + histWidth, histY + histHeight);
    line(histX, histY, histX, histY + histHeight);

    // X-axis labels
    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    for (let i = 0; i <= 10; i++) {
        let x = histX + (i / 10) * histWidth;
        let val = i / 10;
        if (i % 2 === 0) {
            text(val.toFixed(1), x, histY + histHeight + 5);
        }
        stroke(230);
        strokeWeight(1);
        line(x, histY, x, histY + histHeight);
        noStroke();
    }

    // X-axis title
    textSize(11);
    text('Sample Proportion (p̂)', histX + histWidth/2, histY + histHeight + 20);

    // Draw true proportion line
    stroke(sylviaGreen);
    strokeWeight(2);
    let truePropX = histX + populationProportion * histWidth;
    drawingContext.setLineDash([5, 3]);
    line(truePropX, histY, truePropX, histY + histHeight);
    drawingContext.setLineDash([]);

    fill(sylviaGreen);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('p = ' + populationProportion.toFixed(2), truePropX, histY - 2);

    // Create histogram bins
    if (sampleProportions.length > 0) {
        let numBins = 20;
        let bins = new Array(numBins).fill(0);

        for (let prop of sampleProportions) {
            let binIndex = min(floor(prop * numBins), numBins - 1);
            bins[binIndex]++;
        }

        let maxBin = max(bins);

        // Draw bars
        for (let i = 0; i < numBins; i++) {
            if (bins[i] > 0) {
                let barX = histX + (i / numBins) * histWidth;
                let barWidth = histWidth / numBins - 1;
                let barHeight = (bins[i] / maxBin) * (histHeight - 10);

                fill(sylviaAuburn);
                noStroke();
                rect(barX, histY + histHeight - barHeight, barWidth, barHeight);
            }
        }

        // Draw normal overlay if enough samples
        if (sampleProportions.length >= 30) {
            let mean = sampleProportions.reduce((a, b) => a + b, 0) / sampleProportions.length;
            let variance = sampleProportions.reduce((a, b) => a + (b - mean) ** 2, 0) / sampleProportions.length;
            let sd = sqrt(variance);

            if (sd > 0.001) {
                stroke(sylviaGreen);
                strokeWeight(2);
                noFill();
                beginShape();
                for (let x = 0; x <= histWidth; x += 2) {
                    let propVal = x / histWidth;
                    let z = (propVal - mean) / sd;
                    let density = exp(-0.5 * z * z) / (sd * sqrt(TWO_PI));
                    let maxDensity = 1 / (sd * sqrt(TWO_PI));
                    let y = histY + histHeight - (density / maxDensity) * (histHeight - 10);
                    vertex(histX + x, y);
                }
                endShape();
            }
        }
    }

    // Y-axis label
    push();
    translate(sectionX + 15, sectionY + sectionHeight/2);
    rotate(-HALF_PI);
    fill(80);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text('Frequency', 0, 0);
    pop();
}

function drawStatistics() {
    let sectionX = 10;
    let sectionY = 235;
    let sectionWidth = canvasWidth * 0.35;
    let sectionHeight = drawHeight - sectionY - 15;

    // Section background
    fill(255, 255, 255, 200);
    stroke(100);
    strokeWeight(1);
    rect(sectionX, sectionY, sectionWidth, sectionHeight, 5);

    fill(sylviaGreen);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text('Sampling Distribution Statistics', sectionX + 10, sectionY + 8);

    textSize(11);
    let y = sectionY + 30;
    let lineHeight = 20;

    fill('black');
    text('Number of samples: ' + sampleProportions.length, sectionX + 15, y);
    y += lineHeight;

    if (sampleProportions.length > 0) {
        let mean = sampleProportions.reduce((a, b) => a + b, 0) / sampleProportions.length;
        let variance = sampleProportions.reduce((a, b) => a + (b - mean) ** 2, 0) / sampleProportions.length;
        let sd = sqrt(variance);
        let theoreticalSD = sqrt(populationProportion * (1 - populationProportion) / sampleSize);

        text('Mean of p̂: ' + mean.toFixed(4), sectionX + 15, y);
        y += lineHeight;

        fill(100);
        textSize(10);
        text('(Theoretical: μ = p = ' + populationProportion.toFixed(2) + ')', sectionX + 25, y);
        y += lineHeight + 5;

        fill('black');
        textSize(11);
        text('SD of p̂: ' + sd.toFixed(4), sectionX + 15, y);
        y += lineHeight;

        fill(100);
        textSize(10);
        text('(Theoretical: σ = √[p(1-p)/n] = ' + theoreticalSD.toFixed(4) + ')', sectionX + 25, y);
        y += lineHeight + 10;

        // Key insight
        fill(sylviaGreen);
        textSize(10);
        text('As samples accumulate, the histogram', sectionX + 15, y);
        y += 14;
        text('becomes more bell-shaped!', sectionX + 15, y);
    } else {
        fill(100);
        text('Take samples to see statistics', sectionX + 15, y);
    }
}

function drawControls() {
    let y = drawHeight + 10;

    // Sample size selector
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Sample Size (n):', 15, y + 12);

    // Sample size buttons
    let btnX = 120;
    for (let i = 0; i < sampleSizes.length; i++) {
        let isSelected = i === currentSampleSizeIndex;
        fill(isSelected ? sylviaGreen : '#ddd');
        stroke(isSelected ? sylviaGreen : '#aaa');
        strokeWeight(1);
        rect(btnX, y + 2, 40, 22, 3);

        fill(isSelected ? 'white' : 'black');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(11);
        text(sampleSizes[i], btnX + 20, y + 13);

        buttons['size_' + i] = {x: btnX, y: y + 2, w: 40, h: 22, action: () => changeSampleSize(i)};
        btnX += 48;
    }

    // Action buttons
    btnX = 320;

    // Take 1 Sample
    fill(sylviaAuburn);
    noStroke();
    rect(btnX, y + 2, 80, 22, 3);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Take 1 Sample', btnX + 40, y + 13);
    buttons['take1'] = {x: btnX, y: y + 2, w: 80, h: 22, action: () => { samplingQueue += 1; }};
    btnX += 88;

    // Take 10 Samples
    fill(sylviaAuburn);
    rect(btnX, y + 2, 75, 22, 3);
    fill('white');
    text('Take 10', btnX + 37, y + 13);
    buttons['take10'] = {x: btnX, y: y + 2, w: 75, h: 22, action: () => { samplingQueue += 10; }};
    btnX += 83;

    // Take 100 Samples
    fill(sylviaAuburn);
    rect(btnX, y + 2, 75, 22, 3);
    fill('white');
    text('Take 100', btnX + 37, y + 13);
    buttons['take100'] = {x: btnX, y: y + 2, w: 75, h: 22, action: () => { samplingQueue += 100; }};
    btnX += 83;

    // Reset button
    fill(100);
    rect(btnX, y + 2, 55, 22, 3);
    fill('white');
    text('Reset', btnX + 27, y + 13);
    buttons['reset'] = {x: btnX, y: y + 2, w: 55, h: 22, action: resetSimulation};

    // Speed control
    textAlign(LEFT, CENTER);
    fill('black');
    noStroke();
    textSize(10);
    text('Speed:', 15, y + 45);

    // Speed slider track
    fill(220);
    rect(60, y + 40, 80, 10, 3);

    // Speed slider handle
    let handleX = map(animationSpeed, 1, 5, 60, 140);
    fill(sylviaGreen);
    ellipse(handleX, y + 45, 14, 14);

    buttons['speedSlider'] = {x: 55, y: y + 35, w: 90, h: 20, action: null, isSlider: true};

    // Instructions
    fill(80);
    textSize(10);
    textAlign(LEFT, CENTER);
    text('Watch how many sample proportions cluster around the true population proportion!', 160, y + 45);
}

function takeSample() {
    if (sampleProportions.length >= maxSamples) return;

    // Select random sample
    currentSample = [];
    let available = [...Array(populationSize).keys()];

    for (let i = 0; i < sampleSize; i++) {
        let idx = floor(random(available.length));
        currentSample.push(available[idx]);
        available.splice(idx, 1);
    }

    // Calculate sample proportion
    let successes = currentSample.filter(i => population[i].success).length;
    currentProportion = successes / sampleSize;

    // Add to sampling distribution
    sampleProportions.push(currentProportion);
}

function changeSampleSize(index) {
    currentSampleSizeIndex = index;
    sampleSize = sampleSizes[index];
    resetSimulation();
}

function resetSimulation() {
    sampleProportions = [];
    currentSample = [];
    currentProportion = 0;
    samplingQueue = 0;
    generatePopulation();
}

function mousePressed() {
    // Check buttons
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

function mouseDragged() {
    // Speed slider
    let btn = buttons['speedSlider'];
    if (btn && mouseX >= btn.x && mouseX <= btn.x + btn.w &&
        mouseY >= btn.y && mouseY <= btn.y + btn.h) {
        animationSpeed = map(mouseX, 60, 140, 1, 5);
        animationSpeed = constrain(animationSpeed, 1, 5);
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
