// Geometric Distribution Simulator MicroSim
// Simulates trials until first success, building up the geometric distribution empirically
// Compares simulated results with theoretical probabilities
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 20;
let defaultTextSize = 14;

// Geometric parameters
let p = 0.3; // probability of success

// Simulation state
let experiments = [];
let maxTrialsRecorded = 20;
let trialCounts = [];
let totalExperiments = 0;
let runningSum = 0;

// Animation state
let currentTrialSequence = [];
let animating = false;
let animationFrame = 0;
let animationSpeed = 10; // frames between updates

// Queue for running multiple experiments
let runQueue = 0;

// UI elements
let buttons = [];
let sliders = [];
let draggingSlider = -1;

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaGreenDark = '#1B5E20';
let sylviaGreenLight = '#4CAF50';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';
let sylviaHazel = '#8B7355';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textFont('Arial');
    textSize(defaultTextSize);

    // Initialize trial counts array
    for (let i = 0; i <= maxTrialsRecorded; i++) {
        trialCounts[i] = 0;
    }

    describe('Geometric distribution simulator that runs trials until first success, building an empirical distribution that converges to the theoretical geometric distribution.', LABEL);
}

function runSingleExperiment() {
    let trials = 0;
    let success = false;

    currentTrialSequence = [];

    while (!success) {
        trials++;
        success = random() < p;
        currentTrialSequence.push(success);

        // Safety limit
        if (trials > 100) break;
    }

    // Record result
    if (trials <= maxTrialsRecorded) {
        trialCounts[trials]++;
    } else {
        trialCounts[maxTrialsRecorded]++; // Lump large values together
    }

    totalExperiments++;
    runningSum += trials;

    return trials;
}

function draw() {
    updateCanvasSize();

    // Process queue
    if (runQueue > 0 && !animating) {
        let toRun = min(runQueue, 10);
        for (let i = 0; i < toRun; i++) {
            runSingleExperiment();
        }
        runQueue -= toRun;
    }

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    stroke('silver');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Geometric Distribution Simulator', canvasWidth / 2, 8);

    // Draw components
    drawHistogram();
    drawTrialAnimation();
    drawStatsPanel();
    drawControls();
}

function drawHistogram() {
    let histX = 30;
    let histY = 45;
    let histWidth = canvasWidth * 0.55;
    let histHeight = 240;

    // Background
    fill(255);
    stroke(150);
    strokeWeight(1);
    rect(histX, histY, histWidth, histHeight);

    // Calculate max count for scaling
    let maxCount = Math.max(...trialCounts, 1);

    // Grid lines
    stroke(230);
    for (let i = 1; i < 5; i++) {
        let y = histY + histHeight - (histHeight - 30) * i / 5;
        line(histX, y, histX + histWidth, y);
    }

    // Draw bars
    let numBars = maxTrialsRecorded;
    let barWidth = (histWidth - 30) / numBars - 2;
    let startX = histX + 15;

    for (let i = 1; i <= numBars; i++) {
        let x = startX + (i - 1) * (barWidth + 2);
        let count = trialCounts[i];
        let empiricalProb = totalExperiments > 0 ? count / totalExperiments : 0;

        // Draw empirical bar
        let barHeight = (empiricalProb / 0.4) * (histHeight - 45);
        barHeight = min(barHeight, histHeight - 45);
        let y = histY + histHeight - 25 - barHeight;

        fill(sylviaGreen);
        stroke(sylviaGreenDark);
        strokeWeight(1);
        rect(x, y, barWidth, barHeight, 2, 2, 0, 0);

        // Draw theoretical probability marker
        let theoreticalProb = geometricPMF(i, p);
        let theorY = map(theoreticalProb, 0, 0.4, histY + histHeight - 25, histY + 20);
        theorY = constrain(theorY, histY + 10, histY + histHeight - 30);

        stroke(sylviaAuburn);
        strokeWeight(3);
        line(x, theorY, x + barWidth, theorY);

        // X-axis label
        if (i <= 10 || i % 2 === 0) {
            fill('black');
            noStroke();
            textAlign(CENTER, TOP);
            textSize(9);
            let label = i === maxTrialsRecorded ? i + '+' : i.toString();
            text(label, x + barWidth / 2, histY + histHeight - 22);
        }
    }

    // Axes
    stroke(100);
    strokeWeight(2);
    line(histX, histY + histHeight - 25, histX + histWidth, histY + histHeight - 25);
    line(histX, histY, histX, histY + histHeight - 25);

    // Y-axis labels (probability scale)
    fill(80);
    noStroke();
    textSize(10);
    textAlign(RIGHT, CENTER);
    for (let i = 0; i <= 4; i++) {
        let prob = 0.1 * i;
        let y = histY + histHeight - 25 - (histHeight - 45) * prob / 0.4;
        text(prob.toFixed(1), histX - 5, y);
    }

    // Legend
    let legendX = histX + 10;
    let legendY = histY + 8;

    fill(sylviaGreen);
    noStroke();
    rect(legendX, legendY, 15, 10);
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Empirical', legendX + 20, legendY + 5);

    stroke(sylviaAuburn);
    strokeWeight(3);
    line(legendX + 90, legendY + 5, legendX + 105, legendY + 5);
    fill('black');
    noStroke();
    text('Theoretical', legendX + 110, legendY + 5);

    // Axis labels
    fill('black');
    textAlign(CENTER, TOP);
    textSize(12);
    text('Trials Until First Success', histX + histWidth / 2, histY + histHeight - 8);

    push();
    translate(12, histY + histHeight / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text('Probability', 0, 0);
    pop();
}

function geometricPMF(k, prob) {
    return Math.pow(1 - prob, k - 1) * prob;
}

function drawTrialAnimation() {
    let boxX = canvasWidth * 0.60;
    let boxY = 45;
    let boxWidth = canvasWidth - boxX - 20;
    let boxHeight = 100;

    fill(255);
    stroke(100);
    strokeWeight(1);
    rect(boxX, boxY, boxWidth, boxHeight, 8);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    text('Last Experiment:', boxX + 10, boxY + 8);

    // Draw the trial sequence
    if (currentTrialSequence.length > 0) {
        let circleSize = 18;
        let spacing = 4;
        let cols = Math.floor((boxWidth - 20) / (circleSize + spacing));
        let startX = boxX + 12;
        let startY = boxY + 32;

        for (let i = 0; i < currentTrialSequence.length && i < 30; i++) {
            let col = i % cols;
            let row = Math.floor(i / cols);
            let x = startX + col * (circleSize + spacing);
            let y = startY + row * (circleSize + spacing);

            if (currentTrialSequence[i]) {
                // Success (green)
                fill(sylviaGreen);
            } else {
                // Failure (auburn/red)
                fill(sylviaAuburn);
            }
            stroke(50);
            strokeWeight(1);
            ellipse(x + circleSize / 2, y + circleSize / 2, circleSize, circleSize);

            // Label
            fill('white');
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(10);
            text(currentTrialSequence[i] ? 'S' : 'F', x + circleSize / 2, y + circleSize / 2);
        }

        // Show result
        fill('black');
        textAlign(LEFT, BOTTOM);
        textSize(11);
        text('Trials: ' + currentTrialSequence.length, boxX + 10, boxY + boxHeight - 5);
    } else {
        fill(80);
        textSize(11);
        text('Click "Run 1" to start!', boxX + 10, boxY + 45);
    }
}

function drawStatsPanel() {
    let panelX = canvasWidth * 0.60;
    let panelY = 155;
    let panelWidth = canvasWidth - panelX - 20;
    let panelHeight = 130;

    fill(255);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(panelX, panelY, panelWidth, panelHeight, 8);

    fill(sylviaGreenDark);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    text('Statistics:', panelX + 10, panelY + 8);

    textSize(12);
    fill('black');
    let lineHeight = 18;
    let textY = panelY + 28;

    text('Experiments: ' + totalExperiments, panelX + 10, textY);

    let empiricalMean = totalExperiments > 0 ? (runningSum / totalExperiments) : 0;
    let theoreticalMean = 1 / p;

    textY += lineHeight;
    text('Empirical Mean: ' + empiricalMean.toFixed(3), panelX + 10, textY);

    textY += lineHeight;
    fill(sylviaAuburn);
    text('Theoretical Mean: 1/p = ' + theoreticalMean.toFixed(3), panelX + 10, textY);

    // Comparison
    if (totalExperiments >= 10) {
        textY += lineHeight + 5;
        let diff = Math.abs(empiricalMean - theoreticalMean);
        if (diff < 0.5) {
            fill(sylviaGreen);
            textSize(11);
            text('Converging nicely!', panelX + 10, textY);
        } else if (diff < 1) {
            fill(sylviaHazel);
            textSize(11);
            text('Getting closer...', panelX + 10, textY);
        } else {
            fill(80);
            textSize(11);
            text('Keep running more trials!', panelX + 10, textY);
        }
    }
}

function drawControls() {
    buttons = [];
    sliders = [];

    let btnY = drawHeight + 15;
    let btnHeight = 28;
    let btnSpacing = 10;
    let x = 20;

    // p slider
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('P(success):', x, btnY + btnHeight / 2);
    x += 75;

    drawSlider(x, btnY + 3, 100, 22, 0.05, 0.95, p, 0);
    x += 100 + 5;

    fill(sylviaGreen);
    textSize(13);
    text('p = ' + p.toFixed(2), x, btnY + btnHeight / 2);
    x += 70;

    // Run buttons
    drawButton(x, btnY, 60, btnHeight, 'Run 1', 'run1', false);
    x += 60 + btnSpacing;

    drawButton(x, btnY, 65, btnHeight, 'Run 10', 'run10', false);
    x += 65 + btnSpacing;

    drawButton(x, btnY, 70, btnHeight, 'Run 100', 'run100', false);
    x += 70 + btnSpacing;

    drawButton(x, btnY, 60, btnHeight, 'Reset', 'reset', false);

    // Instructions
    fill(80);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    text('Run experiments to see how the empirical distribution approaches the theoretical geometric distribution.', 20, drawHeight + 52);

    // Sylvia quote
    fill(sylviaGreenDark);
    textSize(11);
    text('"The expected number of trials until success is 1/p. If p = 0.2, expect about 5 trials on average!" - Sylvia', 20, drawHeight + 72);
}

function drawSlider(x, y, w, h, minVal, maxVal, currentVal, index) {
    // Track
    fill(220);
    stroke(150);
    strokeWeight(1);
    rect(x, y, w, h, 3);

    // Filled portion
    let fillWidth = map(currentVal, minVal, maxVal, 0, w);
    fill(sylviaGreen + '60');
    noStroke();
    rect(x, y, fillWidth, h, 3, 0, 0, 3);

    // Handle
    let handleX = x + fillWidth;
    fill(sylviaGreen);
    stroke(50);
    strokeWeight(1);
    ellipse(handleX, y + h / 2, 16, 16);

    sliders.push({
        x: x,
        y: y,
        w: w,
        h: h,
        minVal: minVal,
        maxVal: maxVal,
        index: index
    });
}

function drawButton(x, y, w, h, label, action, isActive) {
    let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

    if (isActive) {
        fill(sylviaGreen);
    } else if (isHover) {
        fill(sylviaGreenLight);
    } else {
        fill(220);
    }

    stroke(sylviaGreenDark);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    fill(isActive ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(label, x + w / 2, y + h / 2);

    buttons.push({x, y, w, h, action});
}

function mousePressed() {
    // Check buttons
    for (let btn of buttons) {
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            handleButtonClick(btn.action);
            return;
        }
    }

    // Check sliders
    for (let i = 0; i < sliders.length; i++) {
        let s = sliders[i];
        if (mouseX >= s.x - 10 && mouseX <= s.x + s.w + 10 &&
            mouseY >= s.y - 5 && mouseY <= s.y + s.h + 5) {
            draggingSlider = i;
            updateSliderValue(i);
            return;
        }
    }
}

function mouseDragged() {
    if (draggingSlider >= 0) {
        updateSliderValue(draggingSlider);
    }
}

function mouseReleased() {
    draggingSlider = -1;
}

function updateSliderValue(index) {
    let s = sliders[index];
    let newVal = map(mouseX, s.x, s.x + s.w, s.minVal, s.maxVal);
    newVal = constrain(newVal, s.minVal, s.maxVal);

    if (index === 0) {
        p = newVal;
        resetSimulation();
    }
}

function resetSimulation() {
    for (let i = 0; i <= maxTrialsRecorded; i++) {
        trialCounts[i] = 0;
    }
    totalExperiments = 0;
    runningSum = 0;
    currentTrialSequence = [];
    runQueue = 0;
}

function handleButtonClick(action) {
    switch(action) {
        case 'run1':
            runSingleExperiment();
            break;
        case 'run10':
            runQueue += 10;
            break;
        case 'run100':
            runQueue += 100;
            break;
        case 'reset':
            resetSimulation();
            break;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
