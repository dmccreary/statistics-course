// Type I and Type II Error Visualizer MicroSim
// Interactive demonstration of hypothesis testing errors
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 850;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let margin = 20;
let defaultTextSize = 16;

// Scenario parameters
let h0True = true;  // Is H0 actually true?
let trueP = 0.5;    // True population proportion
let p0 = 0.5;       // Hypothesized proportion
let sampleSize = 100;
let alpha = 0.05;

// Simulation state
let samples = [];
let typeICount = 0;
let typeIICount = 0;
let correctCount = 0;
let totalTrials = 0;

// Animation
let isRunning = false;
let sampleSpeed = 30; // frames between samples

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaGreenLight = '#4CAF50';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);
    frameRate(60);

    describe('Interactive visualization of Type I and Type II errors in hypothesis testing', LABEL);
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
    textSize(18);
    text('Type I and Type II Error Visualizer', canvasWidth / 2, 8);

    // Draw components
    drawRealityTrack();
    drawDecisionTrack();
    drawOutcomePanel();
    drawErrorCounters();
    drawControls();

    // Run simulation if active
    if (isRunning && frameCount % sampleSpeed === 0) {
        runOneSample();
    }
}

function drawRealityTrack() {
    let trackX = margin;
    let trackY = 45;
    let trackW = 220;
    let trackH = 180;

    // Panel
    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(trackX, trackY, trackW, trackH, 8);

    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Reality (Unknown to Us)', trackX + trackW/2, trackY + 8);

    // Toggle buttons for H0 true/false
    let btnY = trackY + 40;
    let btnW = 90;
    let btnH = 35;

    // H0 True button
    fill(h0True ? sylviaGreen : '#e0e0e0');
    stroke(h0True ? sylviaGreen : '#999');
    strokeWeight(2);
    rect(trackX + 15, btnY, btnW, btnH, 5);
    fill(h0True ? 'white' : '#666');
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text('H0 is TRUE', trackX + 15 + btnW/2, btnY + btnH/2);

    // H0 False button
    fill(!h0True ? sylviaAuburn : '#e0e0e0');
    stroke(!h0True ? sylviaAuburn : '#999');
    strokeWeight(2);
    rect(trackX + 115, btnY, btnW, btnH, 5);
    fill(!h0True ? 'white' : '#666');
    noStroke();
    text('H0 is FALSE', trackX + 115 + btnW/2, btnY + btnH/2);

    // True proportion display (only when H0 is false)
    if (!h0True) {
        textAlign(LEFT, TOP);
        textSize(12);
        fill(80);
        text('True proportion:', trackX + 15, trackY + 95);

        fill(sylviaAuburn);
        textSize(14);
        text('p = ' + trueP.toFixed(2), trackX + 120, trackY + 93);

        // Slider for true p
        let sliderY = trackY + 120;
        fill(220);
        noStroke();
        rect(trackX + 15, sliderY, trackW - 30, 10, 5);

        let sliderPos = map(trueP, 0.1, 0.9, trackX + 15, trackX + trackW - 15);
        fill(sylviaAuburn);
        ellipse(sliderPos, sliderY + 5, 16, 16);
    }

    // H0 statement
    fill(80);
    textAlign(CENTER, TOP);
    textSize(11);
    text('H0: p = ' + p0.toFixed(2), trackX + trackW/2, trackY + 150);

    // Store button bounds
    this.h0TrueBounds = { x: trackX + 15, y: btnY, w: btnW, h: btnH };
    this.h0FalseBounds = { x: trackX + 115, y: btnY, w: btnW, h: btnH };
    this.truePSliderBounds = { x: trackX + 15, y: trackY + 120, w: trackW - 30, h: 20 };
}

function drawDecisionTrack() {
    let trackX = margin + 240;
    let trackY = 45;
    let trackW = 300;
    let trackH = 180;

    // Panel
    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(trackX, trackY, trackW, trackH, 8);

    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Sample Data & Decision', trackX + trackW/2, trackY + 8);

    // Show last sample info if exists
    if (samples.length > 0) {
        let lastSample = samples[samples.length - 1];

        textAlign(LEFT, TOP);
        textSize(12);
        fill(80);

        let yPos = trackY + 35;
        text('Sample: n = ' + sampleSize, trackX + 20, yPos);
        text('Successes: x = ' + lastSample.x, trackX + 20, yPos + 20);
        text('Sample prop: p̂ = ' + lastSample.pHat.toFixed(4), trackX + 20, yPos + 40);
        text('Test stat: z = ' + lastSample.z.toFixed(3), trackX + 20, yPos + 60);
        text('P-value: ' + lastSample.pValue.toFixed(4), trackX + 20, yPos + 80);

        // Decision
        fill(lastSample.reject ? '#F44336' : sylviaGreen);
        textSize(14);
        textAlign(CENTER, TOP);
        text(lastSample.reject ? 'Decision: REJECT H0' : 'Decision: FAIL TO REJECT H0',
             trackX + trackW/2, yPos + 110);

        // Mini normal curve showing test stat
        drawMiniCurve(trackX + trackW - 80, trackY + 50, 60, 40, lastSample.z, lastSample.reject);
    } else {
        fill(100);
        textAlign(CENTER, CENTER);
        textSize(12);
        text('Click "Draw Sample" or\n"Run 100 Samples" to begin', trackX + trackW/2, trackY + trackH/2);
    }
}

function drawMiniCurve(x, y, w, h, z, reject) {
    // Draw a small normal curve with z marked
    stroke(150);
    strokeWeight(1);
    line(x, y + h, x + w, y + h);

    stroke(sylviaGreen);
    strokeWeight(1.5);
    noFill();
    beginShape();
    for (let px = 0; px <= w; px++) {
        let zVal = map(px, 0, w, -3, 3);
        let density = Math.exp(-0.5 * zVal * zVal);
        let py = map(density, 0, 1.2, h, 0);
        vertex(x + px, y + py);
    }
    endShape();

    // Mark z position
    let zX = map(constrain(z, -3, 3), -3, 3, x, x + w);
    stroke(reject ? '#F44336' : '#2196F3');
    strokeWeight(2);
    line(zX, y + h, zX, y + 5);
}

function drawOutcomePanel() {
    let panelX = margin + 560;
    let panelY = 45;
    let panelW = canvasWidth - panelX - margin;
    let panelH = 180;

    // Panel
    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(panelX, panelY, panelW, panelH, 8);

    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Outcome', panelX + panelW/2, panelY + 8);

    if (samples.length > 0) {
        let lastSample = samples[samples.length - 1];

        // Determine outcome
        let outcome, outcomeColor, explanation;

        if (h0True && lastSample.reject) {
            outcome = 'TYPE I ERROR';
            outcomeColor = '#F44336';
            explanation = 'Rejected H0 when it was true\n(False Positive)';
        } else if (h0True && !lastSample.reject) {
            outcome = 'CORRECT';
            outcomeColor = sylviaGreen;
            explanation = 'Failed to reject H0\nwhen it was true';
        } else if (!h0True && lastSample.reject) {
            outcome = 'CORRECT';
            outcomeColor = sylviaGreen;
            explanation = 'Rejected H0\nwhen it was false';
        } else {
            outcome = 'TYPE II ERROR';
            outcomeColor = '#FF9800';
            explanation = 'Failed to reject H0 when it was false\n(False Negative)';
        }

        // Display outcome
        fill(outcomeColor);
        textSize(18);
        textAlign(CENTER, TOP);
        text(outcome, panelX + panelW/2, panelY + 45);

        // Color indicator
        noStroke();
        rect(panelX + 10, panelY + 40, 8, 80, 4);

        // Explanation
        fill(80);
        textSize(11);
        text(explanation, panelX + panelW/2, panelY + 80);
    }

    // 2x2 table reference
    textSize(9);
    fill(100);
    textAlign(CENTER, TOP);
    text('Reality\u2192 | H0 True | H0 False', panelX + panelW/2, panelY + 130);
    text('Reject H0  | Type I  | Correct', panelX + panelW/2, panelY + 145);
    text('Fail Reject| Correct | Type II', panelX + panelW/2, panelY + 160);
}

function drawErrorCounters() {
    let counterY = 240;

    // Background strip
    fill(sylviaCream);
    stroke(sylviaGreen);
    strokeWeight(1);
    rect(margin, counterY, canvasWidth - 2*margin, 100, 5);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Cumulative Results (n = ' + totalTrials + ' trials)', canvasWidth/2, counterY + 8);

    // Display counters
    let boxW = 180;
    let boxH = 55;
    let spacing = 30;
    let startX = (canvasWidth - 3*boxW - 2*spacing) / 2;

    // Correct decisions
    drawCounterBox(startX, counterY + 35, boxW, boxH, 'Correct Decisions',
                   correctCount, sylviaGreen, totalTrials > 0 ? (correctCount/totalTrials*100).toFixed(1) + '%' : '--');

    // Type I errors
    drawCounterBox(startX + boxW + spacing, counterY + 35, boxW, boxH, 'Type I Errors (alpha)',
                   typeICount, '#F44336', totalTrials > 0 ? (typeICount/totalTrials*100).toFixed(1) + '%' : '--');

    // Type II errors
    drawCounterBox(startX + 2*(boxW + spacing), counterY + 35, boxW, boxH, 'Type II Errors (beta)',
                   typeIICount, '#FF9800', totalTrials > 0 ? (typeIICount/totalTrials*100).toFixed(1) + '%' : '--');
}

function drawCounterBox(x, y, w, h, label, count, color, pct) {
    fill(color);
    noStroke();
    rect(x, y, w, h, 5);

    fill('white');
    textAlign(CENTER, TOP);
    textSize(10);
    text(label, x + w/2, y + 5);

    textSize(24);
    text(count, x + w/2, y + 18);

    textSize(11);
    text(pct, x + w/2, y + h - 15);
}

function drawControls() {
    let y = drawHeight + 12;

    // Draw Sample button
    let drawX = 20;
    fill(sylviaGreen);
    noStroke();
    rect(drawX, y, 100, 28, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Draw Sample', drawX + 50, y + 14);

    // Run 100 button
    let run100X = 135;
    fill(sylviaAuburn);
    rect(run100X, y, 100, 28, 4);
    fill('white');
    text('Run 100 Samples', run100X + 50, y + 14);

    // Sample size control
    let sizeX = 260;
    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    text('n = ' + sampleSize, sizeX, y + 14);

    // Size slider
    fill(220);
    rect(sizeX + 55, y + 8, 80, 12, 6);
    let sizePos = map(sampleSize, 30, 500, sizeX + 55, sizeX + 135);
    fill(sylviaGreen);
    ellipse(sizePos, y + 14, 14, 14);

    // Alpha control
    let alphaX = 420;
    fill(80);
    textAlign(LEFT, CENTER);
    text('\u03B1 = ' + alpha.toFixed(2), alphaX, y + 14);

    // Alpha slider
    fill(220);
    noStroke();
    rect(alphaX + 55, y + 8, 80, 12, 6);
    let alphaPos = map(alpha, 0.01, 0.20, alphaX + 55, alphaX + 135);
    fill(sylviaAuburn);
    ellipse(alphaPos, y + 14, 14, 14);

    // Reset button
    let resetX = canvasWidth - 70;
    fill('#666');
    rect(resetX, y, 55, 28, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    text('Reset', resetX + 27, y + 14);

    // Store bounds
    this.drawBounds = { x: drawX, y: y, w: 100, h: 28 };
    this.run100Bounds = { x: run100X, y: y, w: 100, h: 28 };
    this.sizeSliderBounds = { x: sizeX + 55, y: y + 4, w: 80, h: 20 };
    this.alphaSliderBounds = { x: alphaX + 55, y: y + 4, w: 80, h: 20 };
    this.resetBounds = { x: resetX, y: y, w: 55, h: 28 };
}

function runOneSample() {
    // Generate sample from true distribution
    let actualP = h0True ? p0 : trueP;

    // Simulate binomial
    let successes = 0;
    for (let i = 0; i < sampleSize; i++) {
        if (random() < actualP) successes++;
    }

    let pHat = successes / sampleSize;
    let se = Math.sqrt((p0 * (1 - p0)) / sampleSize);
    let z = (pHat - p0) / se;
    let pValue = 2 * (1 - normalCDF(Math.abs(z)));
    let reject = pValue < alpha;

    let sample = {
        x: successes,
        pHat: pHat,
        z: z,
        pValue: pValue,
        reject: reject
    };

    samples.push(sample);
    totalTrials++;

    // Count outcomes
    if (h0True && reject) {
        typeICount++;
    } else if (!h0True && !reject) {
        typeIICount++;
    } else {
        correctCount++;
    }
}

function normalCDF(z) {
    let a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
    let a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    let sign = z < 0 ? -1 : 1;
    z = Math.abs(z) / Math.sqrt(2);
    let t = 1.0 / (1.0 + p * z);
    let y = 1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-z*z);
    return 0.5 * (1.0 + sign * y);
}

function mousePressed() {
    // H0 True/False buttons
    if (isInBounds(mouseX, mouseY, this.h0TrueBounds)) {
        h0True = true;
        resetCounts();
        return;
    }

    if (isInBounds(mouseX, mouseY, this.h0FalseBounds)) {
        h0True = false;
        resetCounts();
        return;
    }

    // Draw Sample button
    if (isInBounds(mouseX, mouseY, this.drawBounds)) {
        runOneSample();
        return;
    }

    // Run 100 button
    if (isInBounds(mouseX, mouseY, this.run100Bounds)) {
        for (let i = 0; i < 100; i++) {
            runOneSample();
        }
        return;
    }

    // Reset button
    if (isInBounds(mouseX, mouseY, this.resetBounds)) {
        resetCounts();
        return;
    }
}

function mouseDragged() {
    // True p slider (when H0 is false)
    if (!h0True && this.truePSliderBounds && isInBounds(mouseX, mouseY, this.truePSliderBounds)) {
        trueP = map(mouseX, this.truePSliderBounds.x, this.truePSliderBounds.x + this.truePSliderBounds.w, 0.1, 0.9);
        trueP = constrain(trueP, 0.1, 0.9);
        resetCounts();
    }

    // Sample size slider
    if (this.sizeSliderBounds && isInBounds(mouseX, mouseY, this.sizeSliderBounds)) {
        sampleSize = Math.round(map(mouseX, this.sizeSliderBounds.x, this.sizeSliderBounds.x + this.sizeSliderBounds.w, 30, 500));
        sampleSize = constrain(sampleSize, 30, 500);
        resetCounts();
    }

    // Alpha slider
    if (this.alphaSliderBounds && isInBounds(mouseX, mouseY, this.alphaSliderBounds)) {
        alpha = map(mouseX, this.alphaSliderBounds.x, this.alphaSliderBounds.x + this.alphaSliderBounds.w, 0.01, 0.20);
        alpha = constrain(alpha, 0.01, 0.20);
        resetCounts();
    }
}

function resetCounts() {
    samples = [];
    typeICount = 0;
    typeIICount = 0;
    correctCount = 0;
    totalTrials = 0;
}

function isInBounds(x, y, bounds) {
    return bounds && x >= bounds.x && x <= bounds.x + bounds.w &&
           y >= bounds.y && y <= bounds.y + bounds.h;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
