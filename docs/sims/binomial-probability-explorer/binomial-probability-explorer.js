// Binomial Probability Explorer MicroSim
// Interactive exploration of how n and p affect the binomial distribution
// Students can see the distribution shape, calculate probabilities, and understand the formula
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 750;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 20;
let defaultTextSize = 14;

// Binomial parameters
let n = 10;  // number of trials
let p = 0.5; // probability of success
let k = 5;   // selected value

// Probability calculations
let probabilities = [];
let binomialMean = 0;
let binomialSD = 0;

// Hover state
let hoveredBar = -1;

// UI elements
let buttons = [];
let sliders = [];
let draggingSlider = -1;

// Display options
let showMeanLine = true;
let showCumulative = false;
let cumulativeType = 'leq'; // 'leq' for P(X <= k), 'geq' for P(X >= k)

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

    calculateBinomial();

    describe('Binomial probability explorer showing how the number of trials (n) and probability of success (p) affect the shape, center, and spread of the binomial distribution.', LABEL);
}

function factorial(num) {
    if (num <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
}

function binomCoeff(n, k) {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;

    // Use a more numerically stable calculation
    let result = 1;
    for (let i = 0; i < k; i++) {
        result = result * (n - i) / (i + 1);
    }
    return Math.round(result);
}

function binomPMF(n, k, p) {
    if (k < 0 || k > n) return 0;
    return binomCoeff(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

function calculateBinomial() {
    probabilities = [];
    for (let i = 0; i <= n; i++) {
        probabilities.push(binomPMF(n, i, p));
    }

    binomialMean = n * p;
    binomialSD = Math.sqrt(n * p * (1 - p));

    // Ensure k is within valid range
    k = constrain(k, 0, n);
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
    stroke('silver');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Binomial Probability Explorer', canvasWidth / 2, 8);

    // Draw components
    drawHistogram();
    drawSliders();
    drawStatsPanel();
    drawFormulaPanel();
    drawControls();
}

function drawHistogram() {
    let histX = 50;
    let histY = 45;
    let histWidth = canvasWidth * 0.55;
    let histHeight = 280;

    // Background
    fill(255);
    stroke(150);
    strokeWeight(1);
    rect(histX, histY, histWidth, histHeight);

    // Find max probability for scaling
    let maxProb = Math.max(...probabilities, 0.1);

    // Grid lines
    stroke(230);
    for (let i = 1; i < 5; i++) {
        let y = histY + histHeight - (histHeight - 30) * i / 5;
        line(histX, y, histX + histWidth, y);
    }

    // Draw bars
    let barWidth = Math.min((histWidth - 20) / (n + 1) - 2, 30);
    let startX = histX + (histWidth - (barWidth + 2) * (n + 1)) / 2;

    hoveredBar = -1;

    for (let i = 0; i <= n; i++) {
        let x = startX + i * (barWidth + 2);
        let barHeight = (probabilities[i] / maxProb) * (histHeight - 50);
        let y = histY + histHeight - 25 - barHeight;

        // Check hover
        let isHovered = mouseX >= x && mouseX <= x + barWidth &&
                        mouseY >= y && mouseY <= histY + histHeight - 25;

        if (isHovered) hoveredBar = i;

        // Determine bar color
        let isSelected = i === k;
        let inCumulativeRegion = false;

        if (showCumulative) {
            if (cumulativeType === 'leq' && i <= k) inCumulativeRegion = true;
            if (cumulativeType === 'geq' && i >= k) inCumulativeRegion = true;
        }

        if (isSelected) {
            fill(sylviaAuburn);
        } else if (inCumulativeRegion) {
            fill(sylviaGreenLight + '80');
        } else if (isHovered) {
            fill(sylviaGreenLight);
        } else {
            fill(sylviaGreen);
        }

        stroke(sylviaGreenDark);
        strokeWeight(1);
        rect(x, y, barWidth, barHeight, 2, 2, 0, 0);

        // X-axis label
        if (n <= 20 || i % Math.ceil(n / 20) === 0) {
            fill('black');
            noStroke();
            textAlign(CENTER, TOP);
            textSize(n <= 25 ? 10 : 8);
            text(i, x + barWidth / 2, histY + histHeight - 22);
        }
    }

    // Draw mean line
    if (showMeanLine) {
        let meanX = startX + binomialMean * (barWidth + 2) + barWidth / 2;
        stroke(sylviaAuburn);
        strokeWeight(2);
        setLineDash([5, 5]);
        line(meanX, histY + 10, meanX, histY + histHeight - 25);
        setLineDash([]);

        fill(sylviaAuburn);
        noStroke();
        textSize(10);
        textAlign(CENTER, TOP);
        text('Mean = ' + binomialMean.toFixed(2), meanX, histY + 5);
    }

    // Axes
    stroke(100);
    strokeWeight(2);
    line(histX, histY + histHeight - 25, histX + histWidth, histY + histHeight - 25);
    line(histX, histY, histX, histY + histHeight - 25);

    // Y-axis labels
    fill(80);
    noStroke();
    textSize(10);
    textAlign(RIGHT, CENTER);
    for (let i = 0; i <= 5; i++) {
        let prob = (maxProb * i / 5);
        let y = histY + histHeight - 25 - (histHeight - 50) * i / 5;
        text(prob.toFixed(2), histX - 5, y);
    }

    // Axis labels
    textSize(12);
    textAlign(CENTER, TOP);
    fill('black');
    text('Number of Successes (k)', histX + histWidth / 2, histY + histHeight - 8);

    push();
    translate(15, histY + histHeight / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text('P(X = k)', 0, 0);
    pop();

    // Hover tooltip
    if (hoveredBar >= 0) {
        drawTooltip(hoveredBar);
    }
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

function drawTooltip(barIndex) {
    let tipWidth = 120;
    let tipHeight = 45;
    let tipX = mouseX + 15;
    let tipY = mouseY - tipHeight - 10;

    // Keep on screen
    if (tipX + tipWidth > canvasWidth) tipX = mouseX - tipWidth - 15;
    if (tipY < 0) tipY = mouseY + 15;

    fill(255, 255, 240);
    stroke(100);
    strokeWeight(1);
    rect(tipX, tipY, tipWidth, tipHeight, 5);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    text('k = ' + barIndex, tipX + 8, tipY + 8);
    text('P(X = ' + barIndex + ') = ' + probabilities[barIndex].toFixed(4), tipX + 8, tipY + 25);
}

function drawSliders() {
    sliders = [];

    let sliderX = canvasWidth * 0.60;
    let sliderY = 50;
    let sliderWidth = 150;
    let sliderHeight = 15;
    let spacing = 55;

    // n slider
    fill('black');
    noStroke();
    textAlign(LEFT, BOTTOM);
    textSize(13);
    text('Number of Trials (n):', sliderX, sliderY - 3);

    drawSlider(sliderX, sliderY, sliderWidth, sliderHeight, 1, 50, n, 0);

    textAlign(LEFT, CENTER);
    textSize(14);
    fill(sylviaGreen);
    text('n = ' + n, sliderX + sliderWidth + 10, sliderY + sliderHeight / 2);

    // p slider
    fill('black');
    textAlign(LEFT, BOTTOM);
    textSize(13);
    text('Probability of Success (p):', sliderX, sliderY + spacing - 3);

    drawSlider(sliderX, sliderY + spacing, sliderWidth, sliderHeight, 0.01, 0.99, p, 1);

    textAlign(LEFT, CENTER);
    textSize(14);
    fill(sylviaGreen);
    text('p = ' + p.toFixed(2), sliderX + sliderWidth + 10, sliderY + spacing + sliderHeight / 2);

    // k slider
    fill('black');
    textAlign(LEFT, BOTTOM);
    textSize(13);
    text('Selected Value (k):', sliderX, sliderY + spacing * 2 - 3);

    drawSlider(sliderX, sliderY + spacing * 2, sliderWidth, sliderHeight, 0, n, k, 2);

    textAlign(LEFT, CENTER);
    textSize(14);
    fill(sylviaAuburn);
    text('k = ' + k, sliderX + sliderWidth + 10, sliderY + spacing * 2 + sliderHeight / 2);
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
    ellipse(handleX, y + h / 2, 18, 18);

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

function drawStatsPanel() {
    let panelX = canvasWidth * 0.60;
    let panelY = 230;
    let panelWidth = canvasWidth - panelX - 20;
    let panelHeight = 100;

    fill(255);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(panelX, panelY, panelWidth, panelHeight, 8);

    fill(sylviaGreenDark);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    text('Distribution Statistics:', panelX + 10, panelY + 8);

    textSize(12);
    fill('black');
    let lineHeight = 18;
    let textY = panelY + 30;

    text('Mean: μ = np = ' + n + '(' + p.toFixed(2) + ') = ' + binomialMean.toFixed(2), panelX + 10, textY);
    text('SD: σ = √np(1-p) = ' + binomialSD.toFixed(3), panelX + 10, textY + lineHeight);

    // Selected probability
    fill(sylviaAuburn);
    textSize(13);
    text('P(X = ' + k + ') = ' + probabilities[k].toFixed(4), panelX + 10, textY + lineHeight * 2.5);
}

function drawFormulaPanel() {
    let panelX = canvasWidth * 0.60;
    let panelY = 340;
    let panelWidth = canvasWidth - panelX - 20;
    let panelHeight = 115;

    fill(255);
    stroke(sylviaAuburn);
    strokeWeight(2);
    rect(panelX, panelY, panelWidth, panelHeight, 8);

    fill(sylviaAuburn);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text('Binomial Formula for k = ' + k + ':', panelX + 10, panelY + 8);

    // Show formula with actual values
    textSize(11);
    fill('black');
    let lineHeight = 16;
    let textY = panelY + 28;

    text('P(X = k) = C(n,k) * p^k * (1-p)^(n-k)', panelX + 10, textY);

    textY += lineHeight + 5;
    let coeff = binomCoeff(n, k);
    text('P(X = ' + k + ') = C(' + n + ',' + k + ') * (' + p.toFixed(2) + ')^' + k + ' * (' + (1-p).toFixed(2) + ')^' + (n-k), panelX + 10, textY);

    textY += lineHeight;
    text('         = ' + coeff + ' * ' + Math.pow(p, k).toFixed(6) + ' * ' + Math.pow(1-p, n-k).toFixed(6), panelX + 10, textY);

    textY += lineHeight;
    fill(sylviaAuburn);
    textSize(13);
    text('         = ' + probabilities[k].toFixed(6), panelX + 10, textY);
}

function drawControls() {
    buttons = [];

    let btnY = drawHeight + 15;
    let btnHeight = 28;
    let btnSpacing = 10;
    let x = 20;

    // Toggle mean line
    let meanLabel = showMeanLine ? 'Hide Mean' : 'Show Mean';
    drawButton(x, btnY, 90, btnHeight, meanLabel, 'toggleMean', showMeanLine);
    x += 90 + btnSpacing;

    // Preset buttons
    drawButton(x, btnY, 75, btnHeight, 'Fair Coin', 'fair', false);
    x += 75 + btnSpacing;

    drawButton(x, btnY, 85, btnHeight, 'Skewed Left', 'skewLeft', false);
    x += 85 + btnSpacing;

    drawButton(x, btnY, 90, btnHeight, 'Skewed Right', 'skewRight', false);
    x += 90 + btnSpacing;

    drawButton(x, btnY, 60, btnHeight, 'Reset', 'reset', false);

    // Instructions
    fill(80);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    text('Drag sliders to explore. When p = 0.5, distribution is symmetric. When p < 0.5, right-skewed. When p > 0.5, left-skewed.', 20, drawHeight + 52);

    // Sylvia quote
    fill(sylviaGreenDark);
    textSize(11);
    text('"Remember BINS: Binary outcomes, Independent trials, fixed N, Same probability!" - Sylvia', 20, drawHeight + 72);
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

    switch(index) {
        case 0:
            n = Math.round(newVal);
            k = Math.min(k, n);
            break;
        case 1:
            p = newVal;
            break;
        case 2:
            k = Math.round(newVal);
            break;
    }

    calculateBinomial();
}

function handleButtonClick(action) {
    switch(action) {
        case 'toggleMean':
            showMeanLine = !showMeanLine;
            break;
        case 'fair':
            n = 20;
            p = 0.5;
            k = 10;
            calculateBinomial();
            break;
        case 'skewLeft':
            n = 20;
            p = 0.8;
            k = 16;
            calculateBinomial();
            break;
        case 'skewRight':
            n = 20;
            p = 0.2;
            k = 4;
            calculateBinomial();
            break;
        case 'reset':
            n = 10;
            p = 0.5;
            k = 5;
            calculateBinomial();
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
