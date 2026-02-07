// Side-by-Side Boxplot Comparison MicroSim
// Compare distributions across multiple groups
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 750;
let drawHeight = 350;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// Datasets
let datasets = {};
let currentDataset = 'test-scores';
let groups = [];
let selectedGroup = -1;

// UI elements
let datasetSelect;
let showOutliersCheckbox;
let showMedianLineCheckbox;
let randomizeButton;
let showOutliers = true;
let showMedianLine = false;

// Sylvia theme colors
let groupColors = ['#2E7D32', '#B5651D', '#1565C0', '#7B1FA2'];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    // Initialize datasets
    initializeDatasets();
    loadDataset(currentDataset);

    // Dataset selector
    datasetSelect = createSelect();
    datasetSelect.position(10, drawHeight + 10);
    datasetSelect.option('Test Scores by Period', 'test-scores');
    datasetSelect.option('Heights by Gender', 'heights');
    datasetSelect.option('Salaries by Dept', 'salaries');
    datasetSelect.selected('test-scores');
    datasetSelect.changed(() => {
        currentDataset = datasetSelect.value();
        loadDataset(currentDataset);
    });

    // Show outliers checkbox
    showOutliersCheckbox = createCheckbox(' Show Outliers', true);
    showOutliersCheckbox.position(180, drawHeight + 10);
    showOutliersCheckbox.changed(() => showOutliers = showOutliersCheckbox.checked());

    // Median line checkbox
    showMedianLineCheckbox = createCheckbox(' Connect Medians', false);
    showMedianLineCheckbox.position(300, drawHeight + 10);
    showMedianLineCheckbox.changed(() => showMedianLine = showMedianLineCheckbox.checked());

    // Randomize button
    randomizeButton = createButton('Randomize');
    randomizeButton.position(canvasWidth - 100, drawHeight + 10);
    randomizeButton.mousePressed(randomizeData);

    describe('Side-by-side boxplot comparison tool for analyzing multiple group distributions', LABEL);
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
    text('Comparing Distributions', canvasWidth / 2, 8);

    // Draw boxplots
    drawBoxplots();

    // Draw legend and stats
    if (selectedGroup >= 0) {
        drawGroupStats();
    }

    // Draw comparison hints
    drawComparisonHints();
}

function initializeDatasets() {
    datasets = {
        'test-scores': {
            title: 'Test Scores by Class Period',
            unit: 'points',
            groups: [
                { name: 'Period 1', data: generateData(78, 15, 25, 50, 100) },
                { name: 'Period 2', data: generateData(82, 8, 25, 55, 100) },
                { name: 'Period 3', data: generateData(75, 22, 25, 40, 100) }
            ]
        },
        'heights': {
            title: 'Heights by Gender',
            unit: 'inches',
            groups: [
                { name: 'Male', data: generateData(70, 3, 30, 62, 78) },
                { name: 'Female', data: generateData(65, 2.5, 30, 58, 72) }
            ]
        },
        'salaries': {
            title: 'Salaries by Department',
            unit: 'thousands $',
            groups: [
                { name: 'Engineering', data: generateData(85, 20, 20, 50, 150) },
                { name: 'Marketing', data: generateData(65, 15, 20, 40, 120) },
                { name: 'Sales', data: generateData(70, 25, 20, 35, 160) },
                { name: 'HR', data: generateData(55, 10, 20, 40, 80) }
            ]
        }
    };
}

function generateData(mean, sd, n, minVal, maxVal) {
    let data = [];
    for (let i = 0; i < n; i++) {
        let val = randomGaussian(mean, sd);
        data.push(constrain(val, minVal, maxVal));
    }
    return data;
}

function loadDataset(name) {
    groups = datasets[name].groups.map(g => {
        let stats = calculateStats(g.data);
        return { ...g, ...stats };
    });
}

function randomizeData() {
    initializeDatasets();
    loadDataset(currentDataset);
}

function calculateStats(data) {
    let sorted = [...data].sort((a, b) => a - b);
    let n = sorted.length;

    let min = sorted[0];
    let max = sorted[n - 1];

    let median;
    if (n % 2 === 0) {
        median = (sorted[n/2 - 1] + sorted[n/2]) / 2;
    } else {
        median = sorted[Math.floor(n/2)];
    }

    let lowerHalf = sorted.slice(0, Math.floor(n/2));
    let lowerN = lowerHalf.length;
    let q1;
    if (lowerN % 2 === 0) {
        q1 = (lowerHalf[lowerN/2 - 1] + lowerHalf[lowerN/2]) / 2;
    } else {
        q1 = lowerHalf[Math.floor(lowerN/2)];
    }

    let upperStart = n % 2 === 0 ? n/2 : Math.floor(n/2) + 1;
    let upperHalf = sorted.slice(upperStart);
    let upperN = upperHalf.length;
    let q3;
    if (upperN % 2 === 0) {
        q3 = (upperHalf[upperN/2 - 1] + upperHalf[upperN/2]) / 2;
    } else {
        q3 = upperHalf[Math.floor(upperN/2)];
    }

    let iqr = q3 - q1;
    let lowerFence = q1 - 1.5 * iqr;
    let upperFence = q3 + 1.5 * iqr;

    let outliers = data.filter(v => v < lowerFence || v > upperFence);
    let whiskerMin = sorted.find(v => v >= lowerFence) || min;
    let whiskerMax = sorted.slice().reverse().find(v => v <= upperFence) || max;

    return { min, max, q1, median, q3, iqr, lowerFence, upperFence, outliers, whiskerMin, whiskerMax };
}

function drawBoxplots() {
    let plotAreaLeft = margin + 60;
    let plotAreaRight = canvasWidth - margin - 20;
    let plotAreaTop = 50;
    let plotAreaBottom = 280;

    // Find global min/max for consistent scale
    let allData = groups.flatMap(g => g.data);
    let globalMin = Math.min(...allData);
    let globalMax = Math.max(...allData);
    let padding = (globalMax - globalMin) * 0.1;
    globalMin -= padding;
    globalMax += padding;

    // Draw vertical axis
    drawAxis(plotAreaLeft, plotAreaTop, plotAreaBottom, globalMin, globalMax);

    // Draw boxplots
    let boxWidth = Math.min(80, (plotAreaRight - plotAreaLeft) / groups.length - 20);
    let spacing = (plotAreaRight - plotAreaLeft) / groups.length;

    // Connect medians line
    if (showMedianLine && groups.length > 1) {
        stroke(150);
        strokeWeight(2);
        noFill();
        beginShape();
        for (let i = 0; i < groups.length; i++) {
            let centerX = plotAreaLeft + spacing * (i + 0.5);
            let medianY = map(groups[i].median, globalMin, globalMax, plotAreaBottom, plotAreaTop);
            vertex(centerX, medianY);
        }
        endShape();
    }

    for (let i = 0; i < groups.length; i++) {
        let g = groups[i];
        let centerX = plotAreaLeft + spacing * (i + 0.5);
        let boxLeft = centerX - boxWidth / 2;
        let boxRight = centerX + boxWidth / 2;

        let minY = map(g.whiskerMin, globalMin, globalMax, plotAreaBottom, plotAreaTop);
        let maxY = map(g.whiskerMax, globalMin, globalMax, plotAreaBottom, plotAreaTop);
        let q1Y = map(g.q1, globalMin, globalMax, plotAreaBottom, plotAreaTop);
        let q3Y = map(g.q3, globalMin, globalMax, plotAreaBottom, plotAreaTop);
        let medianY = map(g.median, globalMin, globalMax, plotAreaBottom, plotAreaTop);

        // Highlight if selected
        let alpha = (selectedGroup === -1 || selectedGroup === i) ? 200 : 80;
        let c = color(groupColors[i % groupColors.length]);
        c.setAlpha(alpha);

        // Box
        fill(c);
        stroke(groupColors[i % groupColors.length]);
        strokeWeight(2);
        rect(boxLeft, q3Y, boxWidth, q1Y - q3Y);

        // Median
        stroke(0);
        strokeWeight(3);
        line(boxLeft, medianY, boxRight, medianY);

        // Whiskers
        stroke(50);
        strokeWeight(2);
        line(centerX, q1Y, centerX, minY);
        line(boxLeft + 10, minY, boxRight - 10, minY);
        line(centerX, q3Y, centerX, maxY);
        line(boxLeft + 10, maxY, boxRight - 10, maxY);

        // Outliers
        if (showOutliers) {
            for (let outlier of g.outliers) {
                let outlierY = map(outlier, globalMin, globalMax, plotAreaBottom, plotAreaTop);
                fill(255);
                stroke(groupColors[i % groupColors.length]);
                strokeWeight(2);
                circle(centerX, outlierY, 8);
            }
        }

        // Group label
        fill('black');
        noStroke();
        textAlign(CENTER, TOP);
        textSize(12);
        text(g.name, centerX, plotAreaBottom + 10);
    }
}

function drawAxis(x, top, bottom, minVal, maxVal) {
    stroke(100);
    strokeWeight(1);
    line(x, top, x, bottom);

    textAlign(RIGHT, CENTER);
    textSize(10);
    fill(100);
    noStroke();

    let range = maxVal - minVal;
    let step = Math.pow(10, Math.floor(Math.log10(range))) / 2;
    if (range / step > 10) step *= 2;
    if (range / step < 4) step /= 2;

    for (let val = Math.ceil(minVal / step) * step; val <= maxVal; val += step) {
        let y = map(val, minVal, maxVal, bottom, top);
        stroke(220);
        line(x, y, canvasWidth - margin - 20, y);
        noStroke();
        fill(100);
        text(val.toFixed(0), x - 5, y);
    }

    // Axis label
    push();
    translate(20, (top + bottom) / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    textSize(12);
    fill('black');
    text(datasets[currentDataset].unit, 0, 0);
    pop();
}

function drawGroupStats() {
    let g = groups[selectedGroup];
    let boxX = canvasWidth - 180;
    let boxY = 35;

    fill(255, 255, 255, 240);
    stroke(groupColors[selectedGroup % groupColors.length]);
    strokeWeight(2);
    rect(boxX, boxY, 170, 100, 5);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text(g.name, boxX + 10, boxY + 8);

    textSize(10);
    text('Min:     ' + g.whiskerMin.toFixed(1), boxX + 15, boxY + 28);
    text('Q1:      ' + g.q1.toFixed(1), boxX + 15, boxY + 42);
    text('Median:  ' + g.median.toFixed(1), boxX + 15, boxY + 56);
    text('Q3:      ' + g.q3.toFixed(1), boxX + 15, boxY + 70);
    text('Max:     ' + g.whiskerMax.toFixed(1), boxX + 15, boxY + 84);
}

function drawComparisonHints() {
    // Compare medians and spreads
    let maxMedian = Math.max(...groups.map(g => g.median));
    let minMedian = Math.min(...groups.map(g => g.median));
    let maxIQR = Math.max(...groups.map(g => g.iqr));
    let minIQR = Math.min(...groups.map(g => g.iqr));

    let highMedianGroup = groups.find(g => g.median === maxMedian);
    let lowSpreadGroup = groups.find(g => g.iqr === minIQR);

    fill(80);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(10);
    text('Highest center: ' + highMedianGroup.name + ' (median=' + maxMedian.toFixed(1) + ')', 10, 35);
    text('Most consistent: ' + lowSpreadGroup.name + ' (IQR=' + minIQR.toFixed(1) + ')', 10, 50);
}

function mousePressed() {
    let plotAreaLeft = margin + 60;
    let plotAreaRight = canvasWidth - margin - 20;
    let plotAreaTop = 50;
    let plotAreaBottom = 280;

    let spacing = (plotAreaRight - plotAreaLeft) / groups.length;

    selectedGroup = -1;
    for (let i = 0; i < groups.length; i++) {
        let centerX = plotAreaLeft + spacing * (i + 0.5);
        if (mouseX > centerX - 50 && mouseX < centerX + 50 && mouseY > plotAreaTop && mouseY < plotAreaBottom) {
            selectedGroup = i;
            break;
        }
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    if (randomizeButton) {
        randomizeButton.position(canvasWidth - 100, drawHeight + 10);
    }
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
