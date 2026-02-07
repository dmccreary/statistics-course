// Empirical Rule (68-95-99.7) Interactive Demonstration MicroSim
// Shows percentage of data within 1, 2, and 3 standard deviations
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 350;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// Distribution parameters
let mean = 100;
let sd = 15;

// Display state
let showLevel = 0; // 0=none, 1=68%, 2=95%, 3=99.7%
let animating = false;
let animProgress = 0;

// Real-world examples
let examples = [
    { name: 'IQ Scores', mean: 100, sd: 15 },
    { name: 'Heights (in)', mean: 68, sd: 3 },
    { name: 'Test Scores', mean: 75, sd: 10 }
];
let currentExample = 0;

// Sylvia theme
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';

// Colors for regions
let colors = [
    null,
    [46, 125, 50, 180],   // 1 SD - green
    [255, 193, 7, 150],   // 2 SD - amber
    [244, 67, 54, 120]    // 3 SD - red
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    describe('Interactive demonstration of the 68-95-99.7 empirical rule for normal distributions', LABEL);
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
    text('The Empirical Rule (68-95-99.7)', canvasWidth / 2, 8);

    // Subtitle with current example
    textSize(12);
    fill(100);
    text(examples[currentExample].name + ': μ = ' + mean + ', σ = ' + sd, canvasWidth / 2, 32);

    // Draw curve and regions
    let curveLeft = margin + 50;
    let curveRight = canvasWidth - margin - 50;
    let curveTop = 80;
    let curveBottom = 240;

    // Handle animation
    if (animating) {
        animProgress += 0.05;
        if (animProgress >= 1) {
            animProgress = 1;
            animating = false;
        }
    }

    drawShadedRegions(curveLeft, curveRight, curveTop, curveBottom);
    drawNormalCurve(curveLeft, curveRight, curveTop, curveBottom);
    drawAxis(curveLeft, curveRight, curveBottom);
    drawLegend();
    drawControls();

    // Instructions
    fill(100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Click 1σ, 2σ, or 3σ buttons to see cumulative percentages', canvasWidth / 2, drawHeight - 5);
}

function drawShadedRegions(left, right, top, bottom) {
    if (showLevel === 0) return;

    let maxDensity = 1 / (sd * Math.sqrt(2 * Math.PI));
    let progress = animating ? animProgress : 1;

    // Draw regions from outside in (3 → 2 → 1)
    for (let level = Math.min(showLevel, 3); level >= 1; level--) {
        let k = level;
        let leftBound = mean - k * sd * progress;
        let rightBound = mean + k * sd * progress;

        let leftPx = map(leftBound, mean - 4 * sd, mean + 4 * sd, left, right);
        let rightPx = map(rightBound, mean - 4 * sd, mean + 4 * sd, left, right);

        leftPx = constrain(leftPx, left, right);
        rightPx = constrain(rightPx, left, right);

        fill(colors[level][0], colors[level][1], colors[level][2], colors[level][3]);
        noStroke();
        beginShape();
        vertex(leftPx, bottom);
        for (let px = leftPx; px <= rightPx; px++) {
            let x = map(px, left, right, mean - 4 * sd, mean + 4 * sd);
            let z = (x - mean) / sd;
            let density = Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
            let y = map(density, 0, maxDensity * 1.15, bottom, top);
            vertex(px, y);
        }
        vertex(rightPx, bottom);
        endShape(CLOSE);
    }

    // Draw vertical boundary lines
    if (!animating) {
        stroke(100);
        strokeWeight(1);
        drawingContext.setLineDash([3, 3]);
        for (let k = 1; k <= showLevel; k++) {
            let leftX = map(mean - k * sd, mean - 4 * sd, mean + 4 * sd, left, right);
            let rightX = map(mean + k * sd, mean - 4 * sd, mean + 4 * sd, left, right);
            if (leftX >= left) line(leftX, top, leftX, bottom);
            if (rightX <= right) line(rightX, top, rightX, bottom);
        }
        drawingContext.setLineDash([]);
    }
}

function drawNormalCurve(left, right, top, bottom) {
    let maxDensity = 1 / (sd * Math.sqrt(2 * Math.PI));

    // Draw curve
    stroke(sylviaGreen);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let px = left; px <= right; px++) {
        let x = map(px, left, right, mean - 4 * sd, mean + 4 * sd);
        let z = (x - mean) / sd;
        let density = Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
        let y = map(density, 0, maxDensity * 1.15, bottom, top);
        vertex(px, y);
    }
    endShape();
}

function drawAxis(left, right, y) {
    stroke(100);
    strokeWeight(2);
    line(left, y, right, y);

    // SD markers and labels
    textAlign(CENTER, TOP);
    textSize(10);

    for (let k = -3; k <= 3; k++) {
        let x = map(mean + k * sd, mean - 4 * sd, mean + 4 * sd, left, right);
        if (x >= left && x <= right) {
            stroke(100);
            strokeWeight(1);
            line(x, y, x, y + 8);
            noStroke();

            // Value label
            fill(80);
            text((mean + k * sd).toFixed(0), x, y + 10);

            // SD label
            fill(sylviaGreen);
            textSize(9);
            if (k === 0) {
                text('μ', x, y + 24);
            } else {
                text((k > 0 ? '+' : '') + k + 'σ', x, y + 24);
            }
            textSize(10);
        }
    }
}

function drawLegend() {
    let boxX = canvasWidth - 180;
    let boxY = 55;

    fill(255, 255, 255, 230);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(boxX, boxY, 160, 100, 5);

    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    fill('black');
    text('Within...', boxX + 10, boxY + 8);

    let items = [
        { label: '±1σ:', pct: '68%', color: colors[1], active: showLevel >= 1 },
        { label: '±2σ:', pct: '95%', color: colors[2], active: showLevel >= 2 },
        { label: '±3σ:', pct: '99.7%', color: colors[3], active: showLevel >= 3 }
    ];

    for (let i = 0; i < items.length; i++) {
        let yPos = boxY + 28 + i * 22;

        // Color swatch
        if (items[i].active) {
            fill(items[i].color[0], items[i].color[1], items[i].color[2], 200);
        } else {
            fill(220);
        }
        noStroke();
        rect(boxX + 10, yPos, 20, 16, 2);

        // Text
        fill(items[i].active ? 'black' : '#aaa');
        textSize(12);
        text(items[i].label, boxX + 38, yPos + 2);
        textSize(14);
        fill(items[i].active ? sylviaGreen : '#aaa');
        textAlign(RIGHT, TOP);
        text(items[i].pct, boxX + 145, yPos + 1);
        textAlign(LEFT, TOP);
    }
}

function drawControls() {
    let y = drawHeight + 12;

    // SD level buttons
    let btnLabels = ['Clear', '1σ (68%)', '2σ (95%)', '3σ (99.7%)'];
    for (let i = 0; i < btnLabels.length; i++) {
        let bx = 15 + i * 90;
        let bw = 82;
        let bh = 26;

        let isActive = (i === 0 && showLevel === 0) || (i > 0 && showLevel === i);
        fill(isActive ? sylviaGreen : (i === 0 ? '#999' : sylviaAuburn));
        noStroke();
        rect(bx, y, bw, bh, 4);

        fill('white');
        textAlign(CENTER, CENTER);
        textSize(11);
        text(btnLabels[i], bx + bw / 2, y + bh / 2);
    }

    // Example selector
    let exX = 390;
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Example:', exX, y + 13);

    // Previous/Next buttons
    fill(100);
    rect(exX + 55, y, 24, 26, 4);
    rect(exX + 160, y, 24, 26, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    text('◀', exX + 67, y + 13);
    text('▶', exX + 172, y + 13);

    // Current example name
    fill(sylviaGreen);
    textAlign(CENTER, CENTER);
    textSize(10);
    text(examples[currentExample].name, exX + 110, y + 13);

    // Animate button
    let animX = canvasWidth - 70;
    fill(animating ? '#999' : sylviaAuburn);
    rect(animX, y, 60, 26, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(10);
    text(animating ? 'Playing...' : 'Animate', animX + 30, y + 13);
}

function mousePressed() {
    let y = drawHeight + 12;

    // SD level buttons
    for (let i = 0; i < 4; i++) {
        let bx = 15 + i * 90;
        if (mouseX >= bx && mouseX <= bx + 82 &&
            mouseY >= y && mouseY <= y + 26) {
            if (i === 0) {
                showLevel = 0;
            } else {
                showLevel = i;
                animating = true;
                animProgress = 0;
            }
            return;
        }
    }

    // Example navigation
    let exX = 390;
    if (mouseX >= exX + 55 && mouseX <= exX + 79 &&
        mouseY >= y && mouseY <= y + 26) {
        currentExample = (currentExample - 1 + examples.length) % examples.length;
        updateExample();
        return;
    }
    if (mouseX >= exX + 160 && mouseX <= exX + 184 &&
        mouseY >= y && mouseY <= y + 26) {
        currentExample = (currentExample + 1) % examples.length;
        updateExample();
        return;
    }

    // Animate button
    let animX = canvasWidth - 70;
    if (mouseX >= animX && mouseX <= animX + 60 &&
        mouseY >= y && mouseY <= y + 26 && !animating) {
        showLevel = 0;
        animateSequence();
        return;
    }
}

function updateExample() {
    mean = examples[currentExample].mean;
    sd = examples[currentExample].sd;
    showLevel = 0;
}

function animateSequence() {
    showLevel = 1;
    animating = true;
    animProgress = 0;

    setTimeout(() => {
        if (showLevel === 1) {
            showLevel = 2;
            animating = true;
            animProgress = 0;
        }
    }, 1500);

    setTimeout(() => {
        if (showLevel === 2) {
            showLevel = 3;
            animating = true;
            animProgress = 0;
        }
    }, 3000);
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
