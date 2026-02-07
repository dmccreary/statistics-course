// Point Estimate vs Interval Estimate Visualization MicroSim
// Shows the difference between point estimates and interval estimates
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 600;
let drawHeight = 350;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// True population parameter (hidden initially)
let trueP = 0.65;
let showTrue = false;

// Sample data
let sampleSize = 100;
let confidenceLevel = 0.95;
let zStar = 1.96;

// Storage for generated samples
let samples = [];
let maxSamples = 25;

// Counters
let capturedCount = 0;

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

    describe('Interactive visualization comparing point estimates and interval estimates for population proportions', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area
    fill(sylviaCream);
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
    text('Point Estimate vs Interval Estimate', canvasWidth / 2, 8);

    // Number line
    let lineY = 180;
    let lineLeft = margin + 40;
    let lineRight = canvasWidth - margin - 40;

    drawNumberLine(lineLeft, lineRight, lineY);

    // Draw true parameter if shown
    if (showTrue) {
        drawTrueParameter(lineLeft, lineRight, lineY);
    }

    // Draw samples
    drawSamples(lineLeft, lineRight, lineY);

    // Draw counter
    drawCounter();

    // Draw legend
    drawLegend();

    // Draw controls
    drawControls();

    // Instructions
    fill(100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Click "New Sample" to generate samples. Toggle "Show True Parameter" to see if intervals capture the truth.', canvasWidth / 2, drawHeight - 5);
}

function drawNumberLine(left, right, y) {
    stroke(100);
    strokeWeight(2);
    line(left, y, right, y);

    // Tick marks and labels
    textAlign(CENTER, TOP);
    textSize(10);
    fill(100);
    noStroke();

    for (let val = 0; val <= 1; val += 0.1) {
        let x = map(val, 0, 1, left, right);
        stroke(100);
        strokeWeight(1);
        line(x, y - 5, x, y + 5);
        noStroke();
        text(val.toFixed(1), x, y + 8);
    }

    // Label
    fill('black');
    textSize(12);
    textAlign(CENTER, TOP);
    text('Population Proportion (p)', (left + right) / 2, y + 25);
}

function drawTrueParameter(left, right, y) {
    let x = map(trueP, 0, 1, left, right);

    // Vertical line for true parameter
    stroke(sylviaAuburn);
    strokeWeight(3);
    line(x, y - 120, x, y + 50);

    // Label
    fill(sylviaAuburn);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(12);
    text('True p = ' + trueP.toFixed(2), x, y - 125);
}

function drawSamples(left, right, y) {
    let startY = y - 115;
    let spacing = 10;

    for (let i = 0; i < samples.length; i++) {
        let sample = samples[i];
        let sampleY = startY + i * spacing;

        // Calculate interval bounds
        let pHat = sample.pHat;
        let se = Math.sqrt(pHat * (1 - pHat) / sampleSize);
        let me = zStar * se;
        let lower = Math.max(0, pHat - me);
        let upper = Math.min(1, pHat + me);

        // Determine if interval captures true parameter
        let captured = (lower <= trueP && upper >= trueP);

        // Map to pixel coordinates
        let pHatX = map(pHat, 0, 1, left, right);
        let lowerX = map(lower, 0, 1, left, right);
        let upperX = map(upper, 0, 1, left, right);

        // Draw interval
        if (showTrue) {
            stroke(captured ? sylviaGreen : '#E53935');
            fill(captured ? sylviaGreen : '#E53935');
        } else {
            stroke(sylviaGreen);
            fill(sylviaGreen);
        }
        strokeWeight(2);
        line(lowerX, sampleY, upperX, sampleY);

        // Draw brackets at ends
        line(lowerX, sampleY - 4, lowerX, sampleY + 4);
        line(upperX, sampleY - 4, upperX, sampleY + 4);

        // Draw point estimate dot
        noStroke();
        ellipse(pHatX, sampleY, 8, 8);
    }
}

function drawCounter() {
    if (samples.length === 0) return;

    // Count captured intervals
    capturedCount = 0;
    for (let sample of samples) {
        let pHat = sample.pHat;
        let se = Math.sqrt(pHat * (1 - pHat) / sampleSize);
        let me = zStar * se;
        let lower = pHat - me;
        let upper = pHat + me;
        if (lower <= trueP && upper >= trueP) {
            capturedCount++;
        }
    }

    let boxX = canvasWidth - 180;
    let boxY = 35;

    fill(255, 255, 255, 230);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(boxX, boxY, 160, 60, 5);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    text('Samples: ' + samples.length, boxX + 10, boxY + 8);

    if (showTrue) {
        text('Captured: ' + capturedCount, boxX + 10, boxY + 24);
        let pct = ((capturedCount / samples.length) * 100).toFixed(1);
        fill(sylviaGreen);
        textSize(12);
        text('Rate: ' + pct + '%', boxX + 10, boxY + 40);
    } else {
        fill(100);
        textSize(10);
        text('(Show true parameter', boxX + 10, boxY + 26);
        text(' to see capture rate)', boxX + 10, boxY + 40);
    }
}

function drawLegend() {
    let boxX = 15;
    let boxY = 35;

    fill(255, 255, 255, 230);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(boxX, boxY, 150, 70, 5);

    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    fill('black');
    text('Legend:', boxX + 10, boxY + 8);

    // Point estimate
    fill(sylviaGreen);
    ellipse(boxX + 20, boxY + 32, 8, 8);
    fill('black');
    textSize(10);
    text('Point estimate (p-hat)', boxX + 30, boxY + 27);

    // Interval
    stroke(sylviaGreen);
    strokeWeight(2);
    line(boxX + 15, boxY + 50, boxX + 45, boxY + 50);
    line(boxX + 15, boxY + 46, boxX + 15, boxY + 54);
    line(boxX + 45, boxY + 46, boxX + 45, boxY + 54);
    fill('black');
    noStroke();
    text('95% Confidence Interval', boxX + 52, boxY + 45);

    // True parameter
    if (showTrue) {
        stroke(sylviaAuburn);
        strokeWeight(2);
        line(boxX + 15, boxY + 68, boxX + 45, boxY + 68);
        fill('black');
        noStroke();
        text('True parameter', boxX + 52, boxY + 63);
    }
}

function drawControls() {
    let y = drawHeight + 10;

    // New Sample button
    let btn1X = 15;
    let btnW = 90;
    let btnH = 28;

    fill(sylviaGreen);
    noStroke();
    rect(btn1X, y, btnW, btnH, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(11);
    text('New Sample', btn1X + btnW / 2, y + btnH / 2);

    // Add 10 Samples button
    let btn2X = btn1X + btnW + 10;
    fill(sylviaGreen);
    rect(btn2X, y, btnW, btnH, 4);
    fill('white');
    text('Add 10', btn2X + btnW / 2, y + btnH / 2);

    // Show True toggle
    let toggleX = btn2X + btnW + 20;
    fill(showTrue ? sylviaAuburn : '#999');
    rect(toggleX, y, 130, btnH, 4);
    fill('white');
    text(showTrue ? 'Hide True Parameter' : 'Show True Parameter', toggleX + 65, y + btnH / 2);

    // Reset button
    let resetX = canvasWidth - 70;
    fill('#666');
    rect(resetX, y, 55, btnH, 4);
    fill('white');
    text('Reset', resetX + 27.5, y + btnH / 2);
}

function generateSample() {
    if (samples.length >= maxSamples) {
        // Shift old samples out
        samples.shift();
    }

    // Generate a random sample proportion based on true p
    // Using normal approximation to binomial
    let successes = 0;
    for (let i = 0; i < sampleSize; i++) {
        if (random() < trueP) successes++;
    }
    let pHat = successes / sampleSize;

    samples.push({ pHat: pHat });
}

function mousePressed() {
    let y = drawHeight + 10;
    let btnH = 28;

    // New Sample button
    let btn1X = 15;
    let btnW = 90;
    if (mouseX >= btn1X && mouseX <= btn1X + btnW &&
        mouseY >= y && mouseY <= y + btnH) {
        generateSample();
        return;
    }

    // Add 10 button
    let btn2X = btn1X + btnW + 10;
    if (mouseX >= btn2X && mouseX <= btn2X + btnW &&
        mouseY >= y && mouseY <= y + btnH) {
        for (let i = 0; i < 10; i++) {
            generateSample();
        }
        return;
    }

    // Show True toggle
    let toggleX = btn2X + btnW + 20;
    if (mouseX >= toggleX && mouseX <= toggleX + 130 &&
        mouseY >= y && mouseY <= y + btnH) {
        showTrue = !showTrue;
        return;
    }

    // Reset button
    let resetX = canvasWidth - 70;
    if (mouseX >= resetX && mouseX <= resetX + 55 &&
        mouseY >= y && mouseY <= y + btnH) {
        samples = [];
        showTrue = false;
        return;
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
