// Normal Probability Plot Explorer MicroSim
// Assess normality using histogram and QQ plot
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 900;
let drawHeight = 350;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 20;
let defaultTextSize = 16;

// Dataset parameters
let datasetType = 'normal';
let sampleSize = 50;
let data = [];

// Display options
let showRefLine = true;
let showNormalOverlay = false;

// Sylvia theme
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';

// Dataset types
let datasetTypes = [
    { value: 'normal', label: 'Approx. Normal' },
    { value: 'right-skewed', label: 'Right Skewed' },
    { value: 'left-skewed', label: 'Left Skewed' },
    { value: 'heavy-tails', label: 'Heavy Tails' },
    { value: 'light-tails', label: 'Light Tails' },
    { value: 'uniform', label: 'Uniform' },
    { value: 'bimodal', label: 'Bimodal' }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);
    generateData();

    describe('Normal probability plot explorer showing histogram and QQ plot for assessing normality', LABEL);
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
    text('Normal Probability Plot Explorer', canvasWidth / 2, 5);

    // Draw both panels
    let panelWidth = (canvasWidth - 60) / 2;
    let leftPanel = { x: 30, y: 50, w: panelWidth, h: 220 };
    let rightPanel = { x: 45 + panelWidth, y: 50, w: panelWidth, h: 220 };

    drawHistogram(leftPanel);
    drawQQPlot(rightPanel);
    drawStatistics();
    drawVerdict();
    drawControls();
}

function generateData() {
    data = [];
    for (let i = 0; i < sampleSize; i++) {
        data.push(generatePoint(datasetType));
    }
    data.sort((a, b) => a - b);
}

function generatePoint(type) {
    // Box-Muller transform for normal random
    function normalRandom() {
        let u1 = Math.random();
        let u2 = Math.random();
        return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    }

    switch (type) {
        case 'normal':
            return 50 + 15 * normalRandom();
        case 'right-skewed':
            // Exponential distribution
            return 30 + 20 * (-Math.log(Math.random()));
        case 'left-skewed':
            // Reflected exponential
            return 80 - 20 * (-Math.log(Math.random()));
        case 'heavy-tails':
            // t-distribution approximation (mix of normals)
            let scale = Math.random() < 0.1 ? 3 : 1;
            return 50 + 15 * scale * normalRandom();
        case 'light-tails':
            // Uniform-ish with slight normal
            return 50 + 20 * (Math.random() - 0.5) + 2 * normalRandom();
        case 'uniform':
            return 20 + 60 * Math.random();
        case 'bimodal':
            if (Math.random() < 0.5) {
                return 35 + 8 * normalRandom();
            } else {
                return 65 + 8 * normalRandom();
            }
        default:
            return 50 + 15 * normalRandom();
    }
}

function drawHistogram(panel) {
    // Panel label
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    text('Histogram', panel.x + panel.w / 2, panel.y - 18);

    // Panel background
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(panel.x, panel.y, panel.w, panel.h);

    if (data.length === 0) return;

    // Calculate histogram bins
    let minVal = Math.min(...data);
    let maxVal = Math.max(...data);
    let range = maxVal - minVal;
    if (range < 0.001) range = 1;

    let numBins = Math.min(15, Math.ceil(Math.sqrt(sampleSize)));
    let binWidth = range / numBins;
    let bins = new Array(numBins).fill(0);

    for (let val of data) {
        let binIndex = Math.floor((val - minVal) / binWidth);
        binIndex = constrain(binIndex, 0, numBins - 1);
        bins[binIndex]++;
    }

    let maxCount = Math.max(...bins);

    // Draw bars
    let barWidth = (panel.w - 20) / numBins;
    let plotLeft = panel.x + 10;
    let plotBottom = panel.y + panel.h - 25;
    let plotHeight = panel.h - 45;

    for (let i = 0; i < numBins; i++) {
        let barHeight = (bins[i] / maxCount) * plotHeight;
        let bx = plotLeft + i * barWidth;
        let by = plotBottom - barHeight;

        fill(sylviaGreen);
        fill(46, 125, 50, 180);
        stroke(sylviaGreen);
        strokeWeight(1);
        rect(bx, by, barWidth - 1, barHeight);
    }

    // Draw normal overlay if enabled
    if (showNormalOverlay && data.length > 0) {
        let dataMean = data.reduce((a, b) => a + b, 0) / data.length;
        let dataSD = Math.sqrt(data.reduce((a, b) => a + (b - dataMean) ** 2, 0) / data.length);

        stroke(sylviaAuburn);
        strokeWeight(2);
        noFill();
        beginShape();
        for (let px = plotLeft; px <= plotLeft + (panel.w - 20); px += 2) {
            let x = minVal + (px - plotLeft) / (panel.w - 20) * range;
            let z = (x - dataMean) / dataSD;
            let density = Math.exp(-0.5 * z * z) / (dataSD * Math.sqrt(2 * Math.PI));
            let maxDensity = 1 / (dataSD * Math.sqrt(2 * Math.PI));
            let y = plotBottom - (density / maxDensity) * plotHeight * 0.9;
            vertex(px, y);
        }
        endShape();
    }

    // X-axis labels
    textSize(9);
    fill(100);
    noStroke();
    textAlign(CENTER, TOP);
    text(minVal.toFixed(0), plotLeft, plotBottom + 5);
    text(maxVal.toFixed(0), plotLeft + panel.w - 20, plotBottom + 5);
    text(((minVal + maxVal) / 2).toFixed(0), plotLeft + (panel.w - 20) / 2, plotBottom + 5);
}

function drawQQPlot(panel) {
    // Panel label
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    text('Normal Probability Plot (QQ Plot)', panel.x + panel.w / 2, panel.y - 18);

    // Panel background
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(panel.x, panel.y, panel.w, panel.h);

    if (data.length === 0) return;

    let plotMargin = 30;
    let plotLeft = panel.x + plotMargin;
    let plotRight = panel.x + panel.w - 15;
    let plotTop = panel.y + 15;
    let plotBottom = panel.y + panel.h - plotMargin;

    // Calculate theoretical quantiles
    let theoreticalQ = [];
    for (let i = 0; i < data.length; i++) {
        let p = (i + 0.5) / data.length;
        // Inverse normal CDF approximation
        theoreticalQ.push(inverseNormalCDF(p));
    }

    let minTheo = Math.min(...theoreticalQ);
    let maxTheo = Math.max(...theoreticalQ);
    let minData = Math.min(...data);
    let maxData = Math.max(...data);

    // Draw reference line if enabled
    if (showRefLine) {
        let dataMean = data.reduce((a, b) => a + b, 0) / data.length;
        let dataSD = Math.sqrt(data.reduce((a, b) => a + (b - dataMean) ** 2, 0) / (data.length - 1));

        // Line: x = mean + sd * theoretical
        stroke(sylviaAuburn);
        strokeWeight(2);
        let y1 = dataMean + dataSD * minTheo;
        let y2 = dataMean + dataSD * maxTheo;

        let px1 = map(minTheo, minTheo, maxTheo, plotLeft, plotRight);
        let py1 = map(y1, minData, maxData, plotBottom, plotTop);
        let px2 = map(maxTheo, minTheo, maxTheo, plotLeft, plotRight);
        let py2 = map(y2, minData, maxData, plotBottom, plotTop);

        py1 = constrain(py1, plotTop, plotBottom);
        py2 = constrain(py2, plotTop, plotBottom);

        line(px1, py1, px2, py2);
    }

    // Draw data points
    fill(sylviaGreen);
    noStroke();
    for (let i = 0; i < data.length; i++) {
        let px = map(theoreticalQ[i], minTheo, maxTheo, plotLeft, plotRight);
        let py = map(data[i], minData, maxData, plotBottom, plotTop);
        ellipse(px, py, 6, 6);
    }

    // Axis labels
    textSize(9);
    fill(100);
    noStroke();

    // X-axis (theoretical)
    textAlign(CENTER, TOP);
    text('Theoretical Quantiles', panel.x + panel.w / 2, plotBottom + 15);
    textSize(8);
    text(minTheo.toFixed(1), plotLeft, plotBottom + 3);
    text(maxTheo.toFixed(1), plotRight, plotBottom + 3);
    text('0', (plotLeft + plotRight) / 2, plotBottom + 3);

    // Y-axis (sample)
    push();
    translate(panel.x + 12, panel.y + panel.h / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, BOTTOM);
    textSize(9);
    text('Sample Quantiles', 0, 0);
    pop();
}

function inverseNormalCDF(p) {
    // Approximation using rational function
    if (p <= 0) return -4;
    if (p >= 1) return 4;

    let a = [
        -3.969683028665376e+01, 2.209460984245205e+02,
        -2.759285104469687e+02, 1.383577518672690e+02,
        -3.066479806614716e+01, 2.506628277459239e+00
    ];
    let b = [
        -5.447609879822406e+01, 1.615858368580409e+02,
        -1.556989798598866e+02, 6.680131188771972e+01,
        -1.328068155288572e+01
    ];
    let c = [
        -7.784894002430293e-03, -3.223964580411365e-01,
        -2.400758277161838e+00, -2.549732539343734e+00,
        4.374664141464968e+00, 2.938163982698783e+00
    ];
    let d = [
        7.784695709041462e-03, 3.224671290700398e-01,
        2.445134137142996e+00, 3.754408661907416e+00
    ];

    let pLow = 0.02425;
    let pHigh = 1 - pLow;
    let q, r;

    if (p < pLow) {
        q = Math.sqrt(-2 * Math.log(p));
        return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
               ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    } else if (p <= pHigh) {
        q = p - 0.5;
        r = q * q;
        return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
               (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
    } else {
        q = Math.sqrt(-2 * Math.log(1 - p));
        return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
                ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
}

function drawStatistics() {
    if (data.length === 0) return;

    let dataMean = data.reduce((a, b) => a + b, 0) / data.length;
    let dataSD = Math.sqrt(data.reduce((a, b) => a + (b - dataMean) ** 2, 0) / (data.length - 1));

    // Calculate skewness
    let skewness = data.reduce((a, b) => a + Math.pow((b - dataMean) / dataSD, 3), 0) / data.length;

    let boxX = 30;
    let boxY = 280;

    fill(255, 255, 255, 230);
    stroke(180);
    strokeWeight(1);
    rect(boxX, boxY, 150, 55, 3);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(10);
    text('Summary Statistics:', boxX + 8, boxY + 5);
    textSize(9);
    text('Mean: ' + dataMean.toFixed(2), boxX + 8, boxY + 20);
    text('SD: ' + dataSD.toFixed(2), boxX + 80, boxY + 20);
    text('Skewness: ' + skewness.toFixed(3), boxX + 8, boxY + 35);
    text('n = ' + data.length, boxX + 100, boxY + 35);
}

function drawVerdict() {
    if (data.length === 0) return;

    let dataMean = data.reduce((a, b) => a + b, 0) / data.length;
    let dataSD = Math.sqrt(data.reduce((a, b) => a + (b - dataMean) ** 2, 0) / (data.length - 1));
    let skewness = data.reduce((a, b) => a + Math.pow((b - dataMean) / dataSD, 3), 0) / data.length;

    let verdict = '';
    let explanation = '';
    let isNormal = false;

    if (Math.abs(skewness) < 0.5) {
        if (datasetType === 'normal' || (datasetType !== 'bimodal' && datasetType !== 'uniform')) {
            verdict = 'Approximately Normal';
            explanation = 'Points follow the reference line closely';
            isNormal = true;
        }
    }

    if (!isNormal) {
        if (datasetType === 'right-skewed' || skewness > 0.5) {
            verdict = 'Right-Skewed';
            explanation = 'Points curve upward from the line at right';
        } else if (datasetType === 'left-skewed' || skewness < -0.5) {
            verdict = 'Left-Skewed';
            explanation = 'Points curve downward from the line at left';
        } else if (datasetType === 'heavy-tails') {
            verdict = 'Heavy Tails';
            explanation = 'Points deviate at both ends (S-curve)';
        } else if (datasetType === 'light-tails') {
            verdict = 'Light Tails';
            explanation = 'Points cluster more tightly than expected';
        } else if (datasetType === 'uniform') {
            verdict = 'Non-Normal (Uniform)';
            explanation = 'Points form S-shape, data is evenly spread';
        } else if (datasetType === 'bimodal') {
            verdict = 'Non-Normal (Bimodal)';
            explanation = 'Two clusters visible, step pattern in QQ';
        }
    }

    let boxX = canvasWidth / 2 - 120;
    let boxY = 280;

    fill(isNormal ? 'rgb(232, 245, 233)' : 'rgb(255, 243, 224)');
    stroke(isNormal ? sylviaGreen : sylviaAuburn);
    strokeWeight(2);
    rect(boxX, boxY, 240, 55, 5);

    fill(isNormal ? sylviaGreen : sylviaAuburn);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text(verdict, boxX + 120, boxY + 8);

    textSize(10);
    fill(80);
    text(explanation, boxX + 120, boxY + 30);
}

function drawControls() {
    let y = drawHeight + 10;

    // Dataset type selector
    textSize(10);
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    text('Dataset:', 15, y + 15);

    // Dropdown-style buttons
    let btnX = 65;
    for (let i = 0; i < datasetTypes.length; i++) {
        let dt = datasetTypes[i];
        let bw = i < 2 ? 75 : 68;
        let isActive = datasetType === dt.value;

        fill(isActive ? sylviaGreen : '#ddd');
        noStroke();
        rect(btnX, y + 2, bw, 22, 3);

        fill(isActive ? 'white' : 'black');
        textAlign(CENTER, CENTER);
        textSize(9);
        text(dt.label, btnX + bw / 2, y + 13);

        btnX += bw + 4;
    }

    // Sample size slider
    let sliderX = btnX + 15;
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(10);
    text('n=' + sampleSize, sliderX, y + 15);

    fill(220);
    noStroke();
    rect(sliderX + 40, y + 8, 70, 10, 3);
    let sizePos = map(sampleSize, 20, 200, sliderX + 40, sliderX + 110);
    fill(sylviaGreen);
    ellipse(sizePos, y + 13, 12, 12);

    // New Sample button
    let newX = sliderX + 120;
    fill(sylviaAuburn);
    rect(newX, y + 2, 75, 22, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(10);
    text('New Sample', newX + 37, y + 13);

    // Toggle buttons
    let toggleX = newX + 85;

    // Show ref line
    fill(showRefLine ? sylviaGreen : '#ccc');
    rect(toggleX, y + 2, 55, 22, 4);
    fill('white');
    textSize(8);
    text('Ref Line', toggleX + 27, y + 13);

    // Show normal overlay
    fill(showNormalOverlay ? sylviaAuburn : '#ccc');
    rect(toggleX + 60, y + 2, 55, 22, 4);
    fill('white');
    text('Overlay', toggleX + 87, y + 13);
}

function mousePressed() {
    let y = drawHeight + 10;

    // Dataset type buttons
    let btnX = 65;
    for (let i = 0; i < datasetTypes.length; i++) {
        let bw = i < 2 ? 75 : 68;
        if (mouseX >= btnX && mouseX <= btnX + bw &&
            mouseY >= y + 2 && mouseY <= y + 24) {
            datasetType = datasetTypes[i].value;
            generateData();
            return;
        }
        btnX += bw + 4;
    }

    // New Sample button
    let sliderX = btnX + 15;
    let newX = sliderX + 120;
    if (mouseX >= newX && mouseX <= newX + 75 &&
        mouseY >= y + 2 && mouseY <= y + 24) {
        generateData();
        return;
    }

    // Toggle buttons
    let toggleX = newX + 85;
    if (mouseX >= toggleX && mouseX <= toggleX + 55 &&
        mouseY >= y + 2 && mouseY <= y + 24) {
        showRefLine = !showRefLine;
        return;
    }
    if (mouseX >= toggleX + 60 && mouseX <= toggleX + 115 &&
        mouseY >= y + 2 && mouseY <= y + 24) {
        showNormalOverlay = !showNormalOverlay;
        return;
    }
}

function mouseDragged() {
    let y = drawHeight + 10;

    // Calculate slider position
    let btnX = 65;
    for (let i = 0; i < datasetTypes.length; i++) {
        btnX += (i < 2 ? 75 : 68) + 4;
    }
    let sliderX = btnX + 15;

    if (mouseY >= y + 4 && mouseY <= y + 22 &&
        mouseX >= sliderX + 40 && mouseX <= sliderX + 110) {
        let newSize = Math.round(map(mouseX, sliderX + 40, sliderX + 110, 20, 200));
        if (newSize !== sampleSize) {
            sampleSize = constrain(newSize, 20, 200);
            generateData();
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
