// T-Procedure Robustness Exploration MicroSim
// Simulate many samples to see how well t-procedures work under different conditions
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

// Simulation parameters
let populationShape = 'normal';
let sampleSize = 30;
let numSimulations = 500;
let confidenceLevel = 0.95;

// Simulation state
let simulating = false;
let simulationResults = [];
let coverageCount = 0;
let currentSim = 0;
let animationSpeed = 5; // simulations per frame

// Population parameters (true values)
let trueMean = 50;
let trueSD = 10;

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';

// Population shapes
const shapes = [
    { id: 'normal', name: 'Normal' },
    { id: 'right-skewed', name: 'Right Skewed' },
    { id: 'left-skewed', name: 'Left Skewed' },
    { id: 'uniform', name: 'Uniform' },
    { id: 'outliers', name: 'With Outliers' }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    describe('Robustness exploration showing how well t-procedure confidence intervals work with different population shapes and sample sizes', LABEL);
}

function draw() {
    updateCanvasSize();

    // Continue simulation if running
    if (simulating && currentSim < numSimulations) {
        for (let i = 0; i < animationSpeed && currentSim < numSimulations; i++) {
            runOneSim();
        }
    } else if (simulating && currentSim >= numSimulations) {
        simulating = false;
    }

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
    textSize(16);
    textStyle(BOLD);
    text('T-Procedure Robustness Exploration', canvasWidth / 2, 8);
    textStyle(NORMAL);

    drawPopulationDisplay();
    drawSimulationResults();
    drawSummaryPanel();
    drawControls();
}

function drawPopulationDisplay() {
    let panelX = margin + 10;
    let panelY = 35;
    let panelWidth = 250;
    let panelHeight = 130;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 5);

    fill(30);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Population Distribution: ' + getShapeName(populationShape), panelX + panelWidth / 2, panelY + 5);
    textStyle(NORMAL);

    // Draw population curve/histogram
    let curveX = panelX + 25;
    let curveWidth = panelWidth - 50;
    let curveY = panelY + 95;

    stroke(100);
    strokeWeight(1);
    line(curveX, curveY, curveX + curveWidth, curveY);

    // Draw population shape
    stroke(sylviaGreen);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i <= curveWidth; i++) {
        let x = map(i, 0, curveWidth, 0, 100);
        let y = getPopulationDensity(x);
        let py = map(y, 0, 0.08, curveY, panelY + 25);
        vertex(curveX + i, py);
    }
    endShape();

    // True mean line
    let meanX = map(trueMean, 0, 100, curveX, curveX + curveWidth);
    stroke(sylviaAuburn);
    strokeWeight(2);
    drawingContext.setLineDash([4, 2]);
    line(meanX, panelY + 25, meanX, curveY);
    drawingContext.setLineDash([]);

    // Label
    fill(sylviaAuburn);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(9);
    text('\u03BC = ' + trueMean, meanX, curveY + 3);

    // Population info
    fill(60);
    textSize(9);
    textAlign(LEFT, TOP);
    text('True \u03BC = ' + trueMean + ', True \u03C3 = ' + trueSD, panelX + 10, panelY + 115);
}

function getShapeName(shape) {
    for (let s of shapes) {
        if (s.id === shape) return s.name;
    }
    return shape;
}

function getPopulationDensity(x) {
    // Returns density at value x (scaled 0-100)
    let z = (x - 50) / 15;

    if (populationShape === 'normal') {
        return Math.exp(-0.5 * z * z) / (15 * Math.sqrt(2 * Math.PI)) * 0.6;
    } else if (populationShape === 'right-skewed') {
        // Chi-squared-like shape
        if (x < 20) return 0;
        let t = (x - 20) / 25;
        return Math.pow(t, 1.5) * Math.exp(-t) * 0.08;
    } else if (populationShape === 'left-skewed') {
        // Mirror of right-skewed
        if (x > 80) return 0;
        let t = (80 - x) / 25;
        return Math.pow(t, 1.5) * Math.exp(-t) * 0.08;
    } else if (populationShape === 'uniform') {
        if (x >= 25 && x <= 75) return 0.04;
        return 0;
    } else if (populationShape === 'outliers') {
        // Normal with some outlier probability
        let normal = Math.exp(-0.5 * z * z) / (15 * Math.sqrt(2 * Math.PI)) * 0.5;
        // Add bumps at extremes
        if (x < 20 || x > 80) normal += 0.01;
        return normal;
    }
    return 0;
}

function drawSimulationResults() {
    let panelX = margin + 280;
    let panelY = 35;
    let panelWidth = canvasWidth - panelX - margin - 10;
    let panelHeight = 300;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 5);

    fill(30);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Confidence Intervals (n = ' + sampleSize + ', ' + Math.round(confidenceLevel * 100) + '% CI)', panelX + panelWidth / 2, panelY + 5);
    textStyle(NORMAL);

    if (simulationResults.length === 0) {
        fill(100);
        textAlign(CENTER, CENTER);
        textSize(12);
        text('Click "Run Simulation" to start', panelX + panelWidth / 2, panelY + panelHeight / 2);
        return;
    }

    // Draw true mean line
    let ciLeft = panelX + 60;
    let ciRight = panelX + panelWidth - 20;
    let ciTop = panelY + 25;
    let ciBottom = panelY + panelHeight - 25;

    // Determine range for display
    let displayMin = trueMean - 3 * trueSD / Math.sqrt(sampleSize) * 3;
    let displayMax = trueMean + 3 * trueSD / Math.sqrt(sampleSize) * 3;

    // True mean vertical line
    let trueMeanX = map(trueMean, displayMin, displayMax, ciLeft, ciRight);
    stroke(sylviaAuburn);
    strokeWeight(2);
    line(trueMeanX, ciTop, trueMeanX, ciBottom);

    // Draw CIs (limit to visible number)
    let maxVisible = min(simulationResults.length, 100);
    let ciHeight = (ciBottom - ciTop) / maxVisible;

    for (let i = 0; i < maxVisible; i++) {
        let result = simulationResults[i];
        let y = ciTop + i * ciHeight + ciHeight / 2;

        let lowerX = map(result.lower, displayMin, displayMax, ciLeft, ciRight);
        let upperX = map(result.upper, displayMin, displayMax, ciLeft, ciRight);
        let meanX = map(result.mean, displayMin, displayMax, ciLeft, ciRight);

        lowerX = constrain(lowerX, ciLeft, ciRight);
        upperX = constrain(upperX, ciLeft, ciRight);
        meanX = constrain(meanX, ciLeft, ciRight);

        // Color based on whether CI contains true mean
        if (result.contains) {
            stroke(sylviaGreen);
            fill(sylviaGreen);
        } else {
            stroke('#D32F2F');
            fill('#D32F2F');
        }

        strokeWeight(1);
        line(lowerX, y, upperX, y);
        noStroke();
        ellipse(meanX, y, 4, 4);
    }

    // Axis labels
    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(8);
    for (let v = displayMin; v <= displayMax; v += (displayMax - displayMin) / 4) {
        let x = map(v, displayMin, displayMax, ciLeft, ciRight);
        text(v.toFixed(1), x, ciBottom + 5);
    }

    // Legend
    textAlign(LEFT, TOP);
    textSize(8);
    fill(sylviaGreen);
    text('\u2014 Contains \u03BC', ciLeft, ciBottom + 18);
    fill('#D32F2F');
    text('\u2014 Misses \u03BC', ciLeft + 80, ciBottom + 18);
}

function drawSummaryPanel() {
    let panelX = margin + 10;
    let panelY = 175;
    let panelWidth = 250;
    let panelHeight = 160;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 5);

    fill(30);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Simulation Results', panelX + 10, panelY + 8);
    textStyle(NORMAL);

    let y = panelY + 28;
    textSize(10);

    if (simulationResults.length === 0) {
        fill(100);
        text('No simulations run yet', panelX + 15, y);
    } else {
        fill(60);
        text('Simulations run: ' + currentSim, panelX + 15, y);
        y += 18;

        let coverage = coverageCount / currentSim * 100;
        let nominal = confidenceLevel * 100;

        text('CIs containing \u03BC: ' + coverageCount, panelX + 15, y);
        y += 15;

        // Actual coverage rate
        textStyle(BOLD);
        fill(Math.abs(coverage - nominal) < 3 ? sylviaGreen : sylviaAuburn);
        text('Actual coverage: ' + coverage.toFixed(1) + '%', panelX + 15, y);
        textStyle(NORMAL);
        y += 15;

        fill(60);
        text('Nominal coverage: ' + nominal.toFixed(0) + '%', panelX + 15, y);
        y += 15;

        let diff = coverage - nominal;
        text('Difference: ' + (diff >= 0 ? '+' : '') + diff.toFixed(1) + '%', panelX + 15, y);
        y += 20;

        // Assessment
        fill(30);
        textSize(9);
        textStyle(BOLD);
        if (Math.abs(diff) < 2) {
            fill(sylviaGreen);
            text('Procedure is working well!', panelX + 15, y);
        } else if (Math.abs(diff) < 5) {
            fill(sylviaAuburn);
            text('Slight deviation from nominal', panelX + 15, y);
        } else {
            fill('#D32F2F');
            text('Significant deviation - conditions matter!', panelX + 15, y);
        }
        textStyle(NORMAL);

        // Robustness note
        y += 18;
        fill(80);
        textSize(8);
        if (populationShape !== 'normal' && sampleSize >= 30) {
            text('Large n helps with robustness', panelX + 15, y);
        } else if (populationShape !== 'normal' && sampleSize < 15) {
            text('Small n with non-normal: be cautious!', panelX + 15, y);
        }
    }
}

function drawControls() {
    let y = drawHeight + 10;

    // Population shape buttons
    fill(30);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Population:', margin, y + 12);

    let btnX = margin + 70;
    for (let i = 0; i < shapes.length; i++) {
        let isSelected = (shapes[i].id === populationShape);
        let bw = 75;

        fill(isSelected ? sylviaGreen : 220);
        stroke(isSelected ? sylviaGreen : 180);
        strokeWeight(1);
        rect(btnX + i * (bw + 3), y + 2, bw, 20, 3);

        fill(isSelected ? 255 : 60);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(8);
        text(shapes[i].name, btnX + i * (bw + 3) + bw / 2, y + 12);
    }

    // Second row
    let y2 = y + 30;

    // Sample size buttons
    fill(30);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Sample size:', margin, y2 + 12);

    let sizes = [5, 10, 15, 20, 30, 50, 100];
    btnX = margin + 80;
    for (let i = 0; i < sizes.length; i++) {
        let isSelected = (sizes[i] === sampleSize);
        let bw = 35;

        fill(isSelected ? sylviaAuburn : 220);
        stroke(isSelected ? sylviaAuburn : 180);
        strokeWeight(1);
        rect(btnX + i * (bw + 3), y2 + 2, bw, 20, 3);

        fill(isSelected ? 255 : 60);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(9);
        text(sizes[i], btnX + i * (bw + 3) + bw / 2, y2 + 12);
    }

    // Run simulation button
    let runX = margin + 370;
    fill(simulating ? '#888' : sylviaGreen);
    stroke(simulating ? '#666' : sylviaGreen);
    strokeWeight(1);
    rect(runX, y2 + 2, 100, 20, 3);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(simulating ? 'Running...' : 'Run Simulation', runX + 50, y2 + 12);

    // Reset button
    let resetX = runX + 110;
    fill(220);
    stroke(180);
    strokeWeight(1);
    rect(resetX, y2 + 2, 60, 20, 3);

    fill(60);
    noStroke();
    textAlign(CENTER, CENTER);
    text('Reset', resetX + 30, y2 + 12);

    // Confidence level
    let confX = resetX + 80;
    fill(30);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(9);
    text('CI:', confX, y2 + 12);

    let levels = [0.90, 0.95, 0.99];
    let labels = ['90%', '95%', '99%'];
    for (let i = 0; i < 3; i++) {
        let bx = confX + 20 + i * 38;
        let isSelected = (levels[i] === confidenceLevel);

        fill(isSelected ? sylviaGreen : 220);
        stroke(isSelected ? sylviaGreen : 180);
        strokeWeight(1);
        rect(bx, y2 + 2, 35, 20, 3);

        fill(isSelected ? 255 : 60);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(9);
        text(labels[i], bx + 17, y2 + 12);
    }

    // Status
    fill(100);
    textAlign(RIGHT, CENTER);
    textSize(8);
    text(simulating ? ('Simulating: ' + currentSim + '/' + numSimulations) : '', canvasWidth - margin, y + 12);
}

function mousePressed() {
    let y = drawHeight + 10;
    let y2 = y + 30;

    // Population shape buttons
    let btnX = margin + 70;
    for (let i = 0; i < shapes.length; i++) {
        let bw = 75;
        if (mouseX >= btnX + i * (bw + 3) && mouseX <= btnX + i * (bw + 3) + bw &&
            mouseY >= y + 2 && mouseY <= y + 22) {
            populationShape = shapes[i].id;
            return;
        }
    }

    // Sample size buttons
    let sizes = [5, 10, 15, 20, 30, 50, 100];
    btnX = margin + 80;
    for (let i = 0; i < sizes.length; i++) {
        let bw = 35;
        if (mouseX >= btnX + i * (bw + 3) && mouseX <= btnX + i * (bw + 3) + bw &&
            mouseY >= y2 + 2 && mouseY <= y2 + 22) {
            sampleSize = sizes[i];
            return;
        }
    }

    // Run button
    let runX = margin + 370;
    if (!simulating && mouseX >= runX && mouseX <= runX + 100 &&
        mouseY >= y2 + 2 && mouseY <= y2 + 22) {
        startSimulation();
        return;
    }

    // Reset button
    let resetX = runX + 110;
    if (mouseX >= resetX && mouseX <= resetX + 60 &&
        mouseY >= y2 + 2 && mouseY <= y2 + 22) {
        resetSimulation();
        return;
    }

    // Confidence level buttons
    let confX = resetX + 100;
    let levels = [0.90, 0.95, 0.99];
    for (let i = 0; i < 3; i++) {
        let bx = confX + i * 38;
        if (mouseX >= bx && mouseX <= bx + 35 &&
            mouseY >= y2 + 2 && mouseY <= y2 + 22) {
            confidenceLevel = levels[i];
            return;
        }
    }
}

function startSimulation() {
    simulationResults = [];
    coverageCount = 0;
    currentSim = 0;
    simulating = true;
}

function resetSimulation() {
    simulating = false;
    simulationResults = [];
    coverageCount = 0;
    currentSim = 0;
}

function runOneSim() {
    // Generate a sample from the population
    let sample = [];
    for (let i = 0; i < sampleSize; i++) {
        sample.push(generateFromPopulation());
    }

    // Calculate sample statistics
    let sampleMean = sample.reduce((a, b) => a + b, 0) / sample.length;
    let sampleSD = Math.sqrt(sample.reduce((sum, x) => sum + Math.pow(x - sampleMean, 2), 0) / (sample.length - 1));

    // Calculate t critical value
    let df = sampleSize - 1;
    let tStar = getTCriticalValue(df, confidenceLevel);

    // Calculate confidence interval
    let se = sampleSD / Math.sqrt(sampleSize);
    let margin = tStar * se;
    let lower = sampleMean - margin;
    let upper = sampleMean + margin;

    // Check if CI contains true mean
    let contains = (lower <= trueMean && upper >= trueMean);
    if (contains) coverageCount++;

    simulationResults.push({
        mean: sampleMean,
        sd: sampleSD,
        lower: lower,
        upper: upper,
        contains: contains
    });

    currentSim++;
}

function generateFromPopulation() {
    // Generate a value from the specified population shape
    if (populationShape === 'normal') {
        return trueMean + randomGaussian(0, 1) * trueSD;
    } else if (populationShape === 'right-skewed') {
        // Exponential-like
        let x = -Math.log(1 - random()) * trueSD * 0.8;
        return 30 + x;
    } else if (populationShape === 'left-skewed') {
        // Mirror of right-skewed
        let x = -Math.log(1 - random()) * trueSD * 0.8;
        return 70 - x;
    } else if (populationShape === 'uniform') {
        return random(trueMean - trueSD * 1.73, trueMean + trueSD * 1.73);
    } else if (populationShape === 'outliers') {
        // Normal with 10% outliers
        if (random() < 0.1) {
            return trueMean + (random() < 0.5 ? -1 : 1) * (3 + random() * 2) * trueSD;
        }
        return trueMean + randomGaussian(0, 1) * trueSD;
    }
    return trueMean;
}

function randomGaussian(mean, sd) {
    let u1 = random(0.0001, 0.9999);
    let u2 = random(0.0001, 0.9999);
    let z = sqrt(-2 * log(u1)) * cos(TWO_PI * u2);
    return mean + z * sd;
}

function getTCriticalValue(df, conf) {
    // Approximate t critical value
    let alpha = 1 - conf;
    let z = getZCritical(conf);

    if (df >= 100) return z;

    // Adjustment for small df
    let adjustment = 1 + (z * z + 1) / (4 * df) + (5 * z * z * z * z + 16 * z * z + 3) / (96 * df * df);
    return z * adjustment;
}

function getZCritical(conf) {
    if (conf >= 0.99) return 2.576;
    if (conf >= 0.95) return 1.960;
    if (conf >= 0.90) return 1.645;
    return 1.645;
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
    if (canvasWidth < 700) canvasWidth = 700;
}
