// Margin of Error Explorer MicroSim
// Interactive visualization showing how ME components affect CI width
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 650;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// Parameters with sliders
let confidenceLevel = 95;
let sampleSize = 100;
let sampleProp = 0.50;

// Slider dragging state
let draggingConf = false;
let draggingN = false;
let draggingP = false;

// Z* values for common confidence levels
let zStarValues = {
    80: 1.282,
    85: 1.440,
    90: 1.645,
    95: 1.960,
    99: 2.576
};

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

    describe('Interactive margin of error explorer showing how confidence level, sample size, and proportion affect confidence interval width', LABEL);
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
    text('Margin of Error Explorer', canvasWidth / 2, 8);

    // Calculate current values
    let zStar = getZStar(confidenceLevel);
    let se = Math.sqrt(sampleProp * (1 - sampleProp) / sampleSize);
    let me = zStar * se;
    let lower = Math.max(0, sampleProp - me);
    let upper = Math.min(1, sampleProp + me);

    // Draw the confidence interval visualization
    drawCIVisualization(lower, upper, me);

    // Draw formula breakdown
    drawFormulaBreakdown(zStar, se, me);

    // Draw sliders
    drawSliders();

    // Instructions
    fill(100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Drag sliders to see how each factor affects the margin of error and confidence interval width', canvasWidth / 2, drawHeight - 5);
}

function getZStar(conf) {
    // Linear interpolation for non-standard confidence levels
    let keys = Object.keys(zStarValues).map(Number).sort((a, b) => a - b);

    if (zStarValues[conf]) return zStarValues[conf];

    // Find surrounding values
    for (let i = 0; i < keys.length - 1; i++) {
        if (conf > keys[i] && conf < keys[i + 1]) {
            let t = (conf - keys[i]) / (keys[i + 1] - keys[i]);
            return zStarValues[keys[i]] * (1 - t) + zStarValues[keys[i + 1]] * t;
        }
    }
    return 1.96; // default
}

function drawCIVisualization(lower, upper, me) {
    let lineY = 120;
    let lineLeft = margin + 60;
    let lineRight = canvasWidth - margin - 60;

    // Number line
    stroke(100);
    strokeWeight(2);
    line(lineLeft, lineY, lineRight, lineY);

    // Tick marks
    textAlign(CENTER, TOP);
    textSize(10);
    fill(100);
    noStroke();

    for (let val = 0; val <= 1; val += 0.1) {
        let x = map(val, 0, 1, lineLeft, lineRight);
        stroke(100);
        strokeWeight(1);
        line(x, lineY - 5, x, lineY + 5);
        noStroke();
        text(val.toFixed(1), x, lineY + 8);
    }

    // Draw confidence interval
    let lowerX = map(lower, 0, 1, lineLeft, lineRight);
    let upperX = map(upper, 0, 1, lineLeft, lineRight);
    let pHatX = map(sampleProp, 0, 1, lineLeft, lineRight);

    // Shaded region
    fill(sylviaGreen);
    fill(red(color(sylviaGreen)), green(color(sylviaGreen)), blue(color(sylviaGreen)), 100);
    noStroke();
    rect(lowerX, lineY - 25, upperX - lowerX, 50);

    // Interval line
    stroke(sylviaGreen);
    strokeWeight(4);
    line(lowerX, lineY, upperX, lineY);

    // Brackets
    strokeWeight(3);
    line(lowerX, lineY - 20, lowerX, lineY + 20);
    line(upperX, lineY - 20, upperX, lineY + 20);

    // Point estimate
    fill(sylviaAuburn);
    noStroke();
    ellipse(pHatX, lineY, 14, 14);

    // Labels
    fill('black');
    textAlign(CENTER, BOTTOM);
    textSize(11);
    text('p-hat = ' + sampleProp.toFixed(2), pHatX, lineY - 30);

    textAlign(CENTER, TOP);
    textSize(10);
    fill(sylviaGreen);
    text(lower.toFixed(3), lowerX, lineY + 25);
    text(upper.toFixed(3), upperX, lineY + 25);

    // Margin of error arrows
    stroke(sylviaAuburn);
    strokeWeight(2);
    drawingContext.setLineDash([4, 4]);
    line(pHatX, lineY - 45, lowerX, lineY - 45);
    line(pHatX, lineY - 45, upperX, lineY - 45);
    drawingContext.setLineDash([]);

    // ME labels
    fill(sylviaAuburn);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('ME = ' + me.toFixed(4), (pHatX + lowerX) / 2, lineY - 48);
    text('ME = ' + me.toFixed(4), (pHatX + upperX) / 2, lineY - 48);

    // CI width
    fill(100);
    textAlign(CENTER, TOP);
    textSize(11);
    text('CI Width = ' + (upper - lower).toFixed(4), (lowerX + upperX) / 2, lineY + 42);
}

function drawFormulaBreakdown(zStar, se, me) {
    let boxX = margin + 20;
    let boxY = 175;
    let boxW = canvasWidth - 2 * margin - 40;
    let boxH = 120;

    fill(255, 255, 255, 240);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(boxX, boxY, boxW, boxH, 5);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);

    let col1 = boxX + 15;
    let col2 = boxX + 180;
    let col3 = boxX + 350;

    // Row 1: Input parameters
    textSize(11);
    fill(100);
    text('Input Parameters:', col1, boxY + 10);

    fill('black');
    textSize(12);
    text('Confidence Level: ' + confidenceLevel + '%', col1, boxY + 28);
    text('Sample Size (n): ' + sampleSize, col2, boxY + 28);
    text('Sample Proportion: ' + sampleProp.toFixed(2), col3, boxY + 28);

    // Divider
    stroke(200);
    strokeWeight(1);
    line(col1, boxY + 48, boxX + boxW - 15, boxY + 48);

    // Row 2: Calculated values
    noStroke();
    fill(100);
    textSize(11);
    text('Calculated Values:', col1, boxY + 55);

    fill(sylviaGreen);
    textSize(12);
    text('z* = ' + zStar.toFixed(3), col1, boxY + 73);

    // Standard error with formula
    fill('black');
    textSize(11);
    text('SE = sqrt(' + sampleProp.toFixed(2) + ' x ' + (1 - sampleProp).toFixed(2) + ' / ' + sampleSize + ')', col2, boxY + 73);
    fill(sylviaGreen);
    text('= ' + se.toFixed(5), col2 + 200, boxY + 73);

    // Margin of error
    fill('black');
    text('ME = ' + zStar.toFixed(3) + ' x ' + se.toFixed(5), col1, boxY + 93);
    fill(sylviaAuburn);
    textSize(13);
    text('= ' + me.toFixed(5), col1 + 170, boxY + 93);

    // Key insight
    fill(100);
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text('Higher confidence or smaller n increases ME | p closer to 0.5 increases ME', boxX + boxW / 2, boxY + boxH - 5);
}

function drawSliders() {
    let y = drawHeight + 12;
    let sliderW = 120;
    let labelW = 100;

    textSize(10);
    textAlign(LEFT, CENTER);

    // Confidence Level slider
    let conf1X = 15;
    fill('black');
    noStroke();
    text('Confidence:', conf1X, y + 13);

    fill(220);
    rect(conf1X + 70, y + 6, sliderW, 14, 3);
    let confPos = map(confidenceLevel, 80, 99, conf1X + 70, conf1X + 70 + sliderW);
    fill(sylviaGreen);
    ellipse(confPos, y + 13, 14, 14);

    fill(sylviaGreen);
    textAlign(LEFT, CENTER);
    text(confidenceLevel + '%', conf1X + 70 + sliderW + 8, y + 13);

    // Sample Size slider
    let nX = 230;
    fill('black');
    text('Sample Size:', nX, y + 13);

    fill(220);
    rect(nX + 75, y + 6, sliderW, 14, 3);
    let nPos = map(sampleSize, 20, 500, nX + 75, nX + 75 + sliderW);
    fill(sylviaGreen);
    ellipse(nPos, y + 13, 14, 14);

    fill(sylviaGreen);
    text('n = ' + sampleSize, nX + 75 + sliderW + 8, y + 13);

    // Sample Proportion slider
    let pX = 445;
    fill('black');
    text('p-hat:', pX, y + 13);

    fill(220);
    rect(pX + 40, y + 6, sliderW, 14, 3);
    let pPos = map(sampleProp, 0.1, 0.9, pX + 40, pX + 40 + sliderW);
    fill(sylviaAuburn);
    ellipse(pPos, y + 13, 14, 14);

    fill(sylviaAuburn);
    text(sampleProp.toFixed(2), pX + 40 + sliderW + 8, y + 13);
}

function mousePressed() {
    checkSliderDrag();
}

function checkSliderDrag() {
    let y = drawHeight + 12;
    let sliderW = 120;

    // Confidence slider
    let conf1X = 15;
    let confPos = map(confidenceLevel, 80, 99, conf1X + 70, conf1X + 70 + sliderW);
    if (mouseY >= y && mouseY <= y + 26 && Math.abs(mouseX - confPos) < 20) {
        draggingConf = true;
        return;
    }

    // Sample Size slider
    let nX = 230;
    let nPos = map(sampleSize, 20, 500, nX + 75, nX + 75 + sliderW);
    if (mouseY >= y && mouseY <= y + 26 && Math.abs(mouseX - nPos) < 20) {
        draggingN = true;
        return;
    }

    // Sample Proportion slider
    let pX = 445;
    let pPos = map(sampleProp, 0.1, 0.9, pX + 40, pX + 40 + sliderW);
    if (mouseY >= y && mouseY <= y + 26 && Math.abs(mouseX - pPos) < 20) {
        draggingP = true;
        return;
    }
}

function mouseDragged() {
    let y = drawHeight + 12;
    let sliderW = 120;

    if (draggingConf) {
        let conf1X = 15;
        confidenceLevel = map(mouseX, conf1X + 70, conf1X + 70 + sliderW, 80, 99);
        confidenceLevel = Math.round(constrain(confidenceLevel, 80, 99));
    }

    if (draggingN) {
        let nX = 230;
        sampleSize = map(mouseX, nX + 75, nX + 75 + sliderW, 20, 500);
        sampleSize = Math.round(constrain(sampleSize, 20, 500));
    }

    if (draggingP) {
        let pX = 445;
        sampleProp = map(mouseX, pX + 40, pX + 40 + sliderW, 0.1, 0.9);
        sampleProp = constrain(sampleProp, 0.1, 0.9);
        sampleProp = Math.round(sampleProp * 100) / 100;
    }
}

function mouseReleased() {
    draggingConf = false;
    draggingN = false;
    draggingP = false;
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
