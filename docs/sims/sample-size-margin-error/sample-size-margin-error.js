// Sample Size and Margin of Error Explorer MicroSim
// Demonstrates the relationship between sample size and margin of error for proportions
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 30;
let defaultTextSize = 14;

// Parameters
let sampleSize = 100;
let pHat = 0.5;
let confidenceLevel = 0.95;

// Sliders
let nSlider = { x: 0, y: 0, width: 300, value: 100, min: 10, max: 2000, dragging: false };
let pSlider = { x: 0, y: 0, width: 200, value: 0.5, min: 0.1, max: 0.9, dragging: false };

// Confidence level buttons
let confLevels = [
    { label: '90%', value: 0.90, z: 1.645 },
    { label: '95%', value: 0.95, z: 1.96 },
    { label: '99%', value: 0.99, z: 2.576 }
];
let selectedConf = 1; // 95% by default

// Z values
let zStar = 1.96;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    updateLayout();

    describe('Interactive visualization showing how sample size affects margin of error for proportions. Includes sliders for sample size and proportion, confidence level buttons, and visualizations of the confidence interval and the margin of error curve.', LABEL);
}

function updateLayout() {
    // N slider position
    nSlider.x = margin + 100;
    nSlider.y = drawHeight + 25;
    nSlider.width = min(350, canvasWidth - 250);

    // P slider position
    pSlider.x = margin + 100;
    pSlider.y = drawHeight + 55;
    pSlider.width = 180;
}

function draw() {
    updateCanvasSize();
    updateLayout();

    // Drawing area background
    fill(250, 250, 255);
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill(245, 245, 250);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Update parameters
    sampleSize = round(nSlider.value);
    pHat = pSlider.value;
    zStar = confLevels[selectedConf].z;
    confidenceLevel = confLevels[selectedConf].value;

    // Calculate margin of error
    let marginOfError = calculateME(sampleSize, pHat, zStar);

    // Title
    fill(30, 60, 100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    textStyle(BOLD);
    text('Sample Size and Margin of Error', canvasWidth / 2, 10);
    textStyle(NORMAL);

    // Draw the ME vs n curve
    drawMECurve(marginOfError);

    // Draw the confidence interval visualization
    drawConfidenceInterval(marginOfError);

    // Draw the formula
    drawFormula(marginOfError);

    // Draw controls
    drawControls();
}

function calculateME(n, p, z) {
    return z * sqrt(p * (1 - p) / n);
}

function drawMECurve(currentME) {
    // Curve area
    let curveX = margin + 20;
    let curveY = 280;
    let curveWidth = 280;
    let curveHeight = 180;

    // Axes
    stroke(100);
    strokeWeight(1);
    line(curveX, curveY, curveX + curveWidth, curveY); // x-axis
    line(curveX, curveY, curveX, curveY - curveHeight); // y-axis

    // Axis labels
    fill(60);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    text('Sample Size (n)', curveX + curveWidth / 2, curveY + 5);

    push();
    translate(curveX - 15, curveY - curveHeight / 2);
    rotate(-PI / 2);
    textAlign(CENTER, BOTTOM);
    text('Margin of Error', 0, 0);
    pop();

    // Draw the curve
    noFill();
    stroke(70, 130, 180);
    strokeWeight(2);
    beginShape();
    for (let n = 10; n <= 2000; n += 10) {
        let me = calculateME(n, pHat, zStar);
        let x = map(n, 10, 2000, curveX, curveX + curveWidth);
        let y = map(me, 0, 0.35, curveY, curveY - curveHeight);
        vertex(x, y);
    }
    endShape();

    // Mark current point
    let currentX = map(sampleSize, 10, 2000, curveX, curveX + curveWidth);
    let currentY = map(currentME, 0, 0.35, curveY, curveY - curveHeight);

    fill(255, 100, 100);
    stroke(180, 60, 60);
    strokeWeight(2);
    circle(currentX, currentY, 12);

    // Label current point
    fill(180, 60, 60);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text('n = ' + sampleSize, currentX + 10, currentY - 10);
    text('ME = ' + (currentME * 100).toFixed(1) + '%', currentX + 10, currentY + 5);

    // X-axis tick marks
    textAlign(CENTER, TOP);
    fill(80);
    for (let n of [100, 500, 1000, 1500, 2000]) {
        let x = map(n, 10, 2000, curveX, curveX + curveWidth);
        stroke(150);
        strokeWeight(1);
        line(x, curveY, x, curveY + 4);
        noStroke();
        text(n, x, curveY + 6);
    }

    // Y-axis tick marks
    textAlign(RIGHT, CENTER);
    for (let me of [0, 0.1, 0.2, 0.3]) {
        let y = map(me, 0, 0.35, curveY, curveY - curveHeight);
        stroke(150);
        strokeWeight(1);
        line(curveX - 4, y, curveX, y);
        noStroke();
        text((me * 100).toFixed(0) + '%', curveX - 6, y);
    }

    // Title for curve
    textAlign(CENTER, TOP);
    textSize(12);
    fill(30, 60, 100);
    textStyle(BOLD);
    text('ME vs Sample Size', curveX + curveWidth / 2, curveY - curveHeight - 20);
    textStyle(NORMAL);
}

function drawConfidenceInterval(marginOfError) {
    // CI visualization area
    let ciX = canvasWidth - margin - 300;
    let ciY = 140;
    let ciWidth = 260;

    // Title
    fill(30, 60, 100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Confidence Interval', ciX + ciWidth / 2, ciY - 25);
    textStyle(NORMAL);

    // Calculate bounds
    let lower = max(0, pHat - marginOfError);
    let upper = min(1, pHat + marginOfError);

    // Draw the number line (0 to 1)
    stroke(100);
    strokeWeight(2);
    line(ciX, ciY + 40, ciX + ciWidth, ciY + 40);

    // Tick marks
    textAlign(CENTER, TOP);
    textSize(10);
    fill(80);
    for (let p = 0; p <= 1; p += 0.2) {
        let x = map(p, 0, 1, ciX, ciX + ciWidth);
        stroke(100);
        strokeWeight(1);
        line(x, ciY + 37, x, ciY + 43);
        noStroke();
        text(p.toFixed(1), x, ciY + 46);
    }

    // Draw the confidence interval bar
    let lowerX = map(lower, 0, 1, ciX, ciX + ciWidth);
    let upperX = map(upper, 0, 1, ciX, ciX + ciWidth);
    let pHatX = map(pHat, 0, 1, ciX, ciX + ciWidth);

    // ME shading
    fill(70, 130, 180, 100);
    noStroke();
    rect(lowerX, ciY + 25, upperX - lowerX, 30, 3);

    // Bounds markers
    stroke(70, 130, 180);
    strokeWeight(3);
    line(lowerX, ciY + 20, lowerX, ciY + 60);
    line(upperX, ciY + 20, upperX, ciY + 60);

    // p-hat marker
    fill(255, 100, 100);
    stroke(180, 60, 60);
    strokeWeight(2);
    circle(pHatX, ciY + 40, 12);

    // Labels
    fill(70, 130, 180);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text(lower.toFixed(3), lowerX, ciY + 18);
    text(upper.toFixed(3), upperX, ciY + 18);

    fill(180, 60, 60);
    textAlign(CENTER, BOTTOM);
    text('p̂ = ' + pHat.toFixed(2), pHatX, ciY + 10);

    // ME arrows
    stroke(255, 152, 0);
    strokeWeight(2);

    // Left arrow
    line(pHatX, ciY + 75, lowerX, ciY + 75);
    line(lowerX, ciY + 75, lowerX + 8, ciY + 72);
    line(lowerX, ciY + 75, lowerX + 8, ciY + 78);

    // Right arrow
    line(pHatX, ciY + 75, upperX, ciY + 75);
    line(upperX, ciY + 75, upperX - 8, ciY + 72);
    line(upperX, ciY + 75, upperX - 8, ciY + 78);

    // ME label
    fill(255, 152, 0);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    text('ME = ' + (marginOfError * 100).toFixed(2) + '%', pHatX, ciY + 80);

    // Interval statement
    fill(60);
    textAlign(CENTER, TOP);
    textSize(11);
    text('We are ' + (confidenceLevel * 100).toFixed(0) + '% confident that', ciX + ciWidth / 2, ciY + 100);
    text('the true proportion is between', ciX + ciWidth / 2, ciY + 115);
    textStyle(BOLD);
    text(lower.toFixed(3) + ' and ' + upper.toFixed(3), ciX + ciWidth / 2, ciY + 130);
    textStyle(NORMAL);
}

function drawFormula(marginOfError) {
    // Formula box
    let boxX = canvasWidth - margin - 300;
    let boxY = 280;
    let boxWidth = 260;
    let boxHeight = 85;

    fill(255, 255, 255, 240);
    stroke(150);
    strokeWeight(1);
    rect(boxX, boxY, boxWidth, boxHeight, 5);

    // Formula title
    fill(30, 60, 100);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Margin of Error Formula:', boxX + 10, boxY + 8);
    textStyle(NORMAL);

    // Formula
    textSize(12);
    fill(60);
    text('ME = z* × √(p̂(1-p̂)/n)', boxX + 10, boxY + 28);

    // Substitution
    textSize(10);
    fill(100);
    let formula = 'ME = ' + zStar.toFixed(3) + ' × √(' + pHat.toFixed(2) + '×' + (1 - pHat).toFixed(2) + '/' + sampleSize + ')';
    text(formula, boxX + 10, boxY + 48);

    // Result
    fill(70, 130, 180);
    textStyle(BOLD);
    text('ME = ' + marginOfError.toFixed(4) + ' = ' + (marginOfError * 100).toFixed(2) + '%', boxX + 10, boxY + 65);
    textStyle(NORMAL);
}

function drawControls() {
    // Sample size slider
    drawSlider(nSlider, 'Sample size (n):', sampleSize.toString(), true);

    // P-hat slider
    drawSlider(pSlider, 'p̂:', pHat.toFixed(2), false);

    // Confidence level buttons
    let btnY = drawHeight + 40;
    let btnStartX = pSlider.x + pSlider.width + 40;

    fill(60);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Confidence:', btnStartX, btnY);

    for (let i = 0; i < confLevels.length; i++) {
        let btnX = btnStartX + 70 + i * 50;
        let btnW = 45;
        let btnH = 25;

        let isSelected = (i === selectedConf);
        let isHover = mouseX >= btnX && mouseX <= btnX + btnW &&
                      mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2;

        if (isSelected) {
            fill(70, 130, 180);
        } else if (isHover) {
            fill(150, 180, 200);
        } else {
            fill(200, 210, 220);
        }

        stroke(100);
        strokeWeight(1);
        rect(btnX, btnY - btnH / 2, btnW, btnH, 3);

        fill(isSelected ? 255 : 60);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(11);
        text(confLevels[i].label, btnX + btnW / 2, btnY);
    }
}

function drawSlider(slider, label, valueText, isLog) {
    // Label
    fill(60);
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(11);
    text(label, slider.x - 10, slider.y);

    // Track
    stroke(180);
    strokeWeight(4);
    line(slider.x, slider.y, slider.x + slider.width, slider.y);

    // Calculate handle position
    let handleX;
    if (isLog) {
        // Logarithmic scale for sample size
        let logMin = log(slider.min);
        let logMax = log(slider.max);
        let logVal = log(slider.value);
        handleX = map(logVal, logMin, logMax, slider.x, slider.x + slider.width);
    } else {
        handleX = map(slider.value, slider.min, slider.max, slider.x, slider.x + slider.width);
    }

    // Colored portion
    stroke(70, 130, 180);
    strokeWeight(4);
    line(slider.x, slider.y, handleX, slider.y);

    // Handle
    fill(slider.dragging ? [50, 100, 150] : [70, 130, 180]);
    stroke(40, 80, 120);
    strokeWeight(2);
    circle(handleX, slider.y, 16);

    // Value text
    fill(60);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text(valueText, slider.x + slider.width + 10, slider.y);
}

function mousePressed() {
    checkSliders();
    checkConfButtons();
}

function mouseDragged() {
    updateSliders();
}

function mouseReleased() {
    nSlider.dragging = false;
    pSlider.dragging = false;
}

function checkSliders() {
    // Check n slider
    let nHandleX = map(log(nSlider.value), log(nSlider.min), log(nSlider.max), nSlider.x, nSlider.x + nSlider.width);
    if (dist(mouseX, mouseY, nHandleX, nSlider.y) < 12 ||
        (mouseX >= nSlider.x && mouseX <= nSlider.x + nSlider.width &&
         mouseY >= nSlider.y - 8 && mouseY <= nSlider.y + 8)) {
        nSlider.dragging = true;
    }

    // Check p slider
    let pHandleX = map(pSlider.value, pSlider.min, pSlider.max, pSlider.x, pSlider.x + pSlider.width);
    if (dist(mouseX, mouseY, pHandleX, pSlider.y) < 12 ||
        (mouseX >= pSlider.x && mouseX <= pSlider.x + pSlider.width &&
         mouseY >= pSlider.y - 8 && mouseY <= pSlider.y + 8)) {
        pSlider.dragging = true;
    }

    updateSliders();
}

function updateSliders() {
    if (nSlider.dragging) {
        // Logarithmic mapping for sample size
        let logMin = log(nSlider.min);
        let logMax = log(nSlider.max);
        let logVal = map(mouseX, nSlider.x, nSlider.x + nSlider.width, logMin, logMax);
        nSlider.value = constrain(exp(logVal), nSlider.min, nSlider.max);
        nSlider.value = round(nSlider.value);
    }

    if (pSlider.dragging) {
        let newVal = map(mouseX, pSlider.x, pSlider.x + pSlider.width, pSlider.min, pSlider.max);
        pSlider.value = constrain(newVal, pSlider.min, pSlider.max);
        pSlider.value = round(pSlider.value * 100) / 100;
    }
}

function checkConfButtons() {
    let btnY = drawHeight + 40;
    let btnStartX = pSlider.x + pSlider.width + 40;

    for (let i = 0; i < confLevels.length; i++) {
        let btnX = btnStartX + 70 + i * 50;
        let btnW = 45;
        let btnH = 25;

        if (mouseX >= btnX && mouseX <= btnX + btnW &&
            mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2) {
            selectedConf = i;
        }
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    updateLayout();
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = min(containerWidth, 800);
    if (canvasWidth < 650) canvasWidth = 650;
}
