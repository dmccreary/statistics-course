// Interactive Histogram Explorer MicroSim
// Students examine how changing bin width affects histogram appearance
// Uses canvas-based controls for iframe compatibility
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout margins
let margin = 25;
let defaultTextSize = 16;

// Histogram visualization area
let histLeft = 60;
let histRight;
let histTop = 50;
let histBottom = 350;
let histWidth;
let histHeight;

// Control state
let binWidth = 10;
let minBinWidth = 2;
let maxBinWidth = 20;
let showRelativeFreq = false;
let showDataPoints = false;
let currentDataset = 0; // 0=Test Scores, 1=Heights, 2=Temperatures, 3=Custom

// Dataset names
let datasetNames = ['Test Scores (n=40)', 'Heights (n=100)', 'Temperatures (n=365)', 'Custom (n=50)'];

// Datasets
let datasets = [];
let currentData = [];
let bins = [];

// Slider for bin width
let sliderX, sliderY, sliderWidth, sliderHeight;
let isDraggingSlider = false;

// Buttons
let buttons = [];

// Dropdown state
let dropdownOpen = false;
let dropdownX, dropdownY, dropdownWidth, dropdownHeight;

// Hover state for histogram bins
let hoveredBin = -1;

// Summary statistics
let dataMin, dataMax, dataRange, dataCount;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Generate datasets
    generateDatasets();
    currentData = datasets[currentDataset];
    calculateStatistics();
    calculateBins();

    describe('Interactive histogram explorer where students examine how changing bin width affects the appearance of histograms. Controls include bin width slider, dataset selection, and display options.', LABEL);
}

function generateDatasets() {
    // Test Scores (n=40) - roughly normal distribution around 75
    let testScores = [];
    for (let i = 0; i < 40; i++) {
        let score = 75 + randomGaussian() * 12;
        score = constrain(Math.round(score), 40, 100);
        testScores.push(score);
    }
    datasets.push(testScores);

    // Heights in inches (n=100) - roughly normal around 67
    let heights = [];
    for (let i = 0; i < 100; i++) {
        let height = 67 + randomGaussian() * 4;
        height = constrain(Math.round(height * 10) / 10, 55, 80);
        heights.push(height);
    }
    datasets.push(heights);

    // Daily temperatures (n=365) - seasonal variation
    let temps = [];
    for (let i = 0; i < 365; i++) {
        let dayOfYear = i;
        let seasonalTemp = 55 + 25 * sin(TWO_PI * (dayOfYear - 80) / 365);
        let temp = seasonalTemp + randomGaussian() * 8;
        temp = constrain(Math.round(temp), 10, 105);
        temps.push(temp);
    }
    datasets.push(temps);

    // Custom dataset (n=50) - bimodal
    let custom = [];
    for (let i = 0; i < 25; i++) {
        custom.push(Math.round(30 + randomGaussian() * 5));
    }
    for (let i = 0; i < 25; i++) {
        custom.push(Math.round(70 + randomGaussian() * 5));
    }
    datasets.push(custom);
}

function calculateStatistics() {
    dataMin = min(currentData);
    dataMax = max(currentData);
    dataRange = dataMax - dataMin;
    dataCount = currentData.length;
}

function calculateBins() {
    bins = [];

    // Determine bin boundaries
    let binStart = floor(dataMin / binWidth) * binWidth;
    let binEnd = ceil(dataMax / binWidth) * binWidth;

    // Create bins
    for (let b = binStart; b < binEnd; b += binWidth) {
        let count = 0;
        let values = [];
        for (let val of currentData) {
            if (val >= b && val < b + binWidth) {
                count++;
                values.push(val);
            }
        }
        // Handle edge case for last bin (include max value)
        if (b + binWidth >= binEnd) {
            for (let val of currentData) {
                if (val === binEnd && val >= b) {
                    let alreadyCounted = values.includes(val);
                    if (!alreadyCounted) {
                        count++;
                        values.push(val);
                    }
                }
            }
        }
        bins.push({
            start: b,
            end: b + binWidth,
            count: count,
            values: values
        });
    }
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

    // Update histogram dimensions
    histRight = canvasWidth - margin - 120; // Room for stats panel
    histWidth = histRight - histLeft;
    histHeight = histBottom - histTop;

    // Draw title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(24);
    text('Interactive Histogram Explorer', canvasWidth / 2 - 40, 10);

    // Draw histogram
    drawHistogram();

    // Draw axes
    drawAxes();

    // Draw statistics panel
    drawStatisticsPanel();

    // Draw warning if bin width is problematic
    drawWarning();

    // Draw controls
    drawControls();

    // Draw dropdown if open
    if (dropdownOpen) {
        drawDropdownMenu();
    }
}

function drawHistogram() {
    if (bins.length === 0) return;

    let maxCount = max(bins.map(b => b.count));
    if (showRelativeFreq) {
        maxCount = max(bins.map(b => b.count / dataCount));
    }

    let barWidth = histWidth / bins.length;

    for (let i = 0; i < bins.length; i++) {
        let b = bins[i];
        let value = showRelativeFreq ? b.count / dataCount : b.count;
        let barHeight = (value / maxCount) * histHeight * 0.9;

        let x = histLeft + i * barWidth;
        let y = histBottom - barHeight;

        // Determine bar color
        if (i === hoveredBin) {
            fill(70, 130, 180); // Steel blue for hover
        } else {
            fill(100, 149, 237); // Cornflower blue
        }

        stroke(50, 80, 120);
        strokeWeight(1);
        rect(x, y, barWidth - 1, barHeight);

        // Show count/frequency on bar if hovered
        if (i === hoveredBin) {
            fill('black');
            noStroke();
            textAlign(CENTER, BOTTOM);
            textSize(14);
            let label = showRelativeFreq ? (value * 100).toFixed(1) + '%' : b.count.toString();
            text(label, x + barWidth / 2, y - 2);
        }
    }

    // Draw data points if enabled
    if (showDataPoints) {
        drawDataPoints();
    }
}

function drawDataPoints() {
    fill(200, 50, 50, 150);
    noStroke();

    for (let val of currentData) {
        let x = map(val, dataMin - binWidth/2, dataMax + binWidth/2, histLeft, histRight);
        let y = histBottom + 15;
        circle(x, y, 5);
    }
}

function drawAxes() {
    stroke('black');
    strokeWeight(2);

    // X-axis
    line(histLeft, histBottom, histRight, histBottom);

    // Y-axis
    line(histLeft, histTop, histLeft, histBottom);

    // X-axis labels (bin edges)
    noStroke();
    fill('black');
    textAlign(CENTER, TOP);
    textSize(12);

    let labelStep = max(1, floor(bins.length / 8)); // Don't overcrowd
    for (let i = 0; i <= bins.length; i += labelStep) {
        let x = histLeft + (i / bins.length) * histWidth;
        let label = i < bins.length ? bins[i].start : bins[bins.length - 1].end;
        text(label.toFixed(0), x, histBottom + 5);
    }

    // Y-axis labels
    textAlign(RIGHT, CENTER);
    let maxCount = max(bins.map(b => b.count));
    if (showRelativeFreq) {
        maxCount = max(bins.map(b => b.count / dataCount));
    }

    for (let i = 0; i <= 4; i++) {
        let y = histBottom - (i / 4) * histHeight * 0.9;
        let value = (i / 4) * maxCount;
        if (showRelativeFreq) {
            text((value * 100).toFixed(0) + '%', histLeft - 5, y);
        } else {
            text(Math.round(value), histLeft - 5, y);
        }
    }

    // Axis labels
    textAlign(CENTER, TOP);
    textSize(14);
    text('Value', (histLeft + histRight) / 2, histBottom + 22);

    push();
    translate(15, (histTop + histBottom) / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, BOTTOM);
    text(showRelativeFreq ? 'Relative Frequency' : 'Frequency', 0, 0);
    pop();
}

function drawStatisticsPanel() {
    let panelX = canvasWidth - margin - 110;
    let panelY = histTop;
    let panelWidth = 115;
    let panelHeight = 130;

    // Panel background
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 8);

    // Panel content
    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);
    text('Statistics', panelX + 8, panelY + 8);

    textSize(12);
    let lineHeight = 18;
    let startY = panelY + 30;

    text('n = ' + dataCount, panelX + 8, startY);
    text('Min = ' + dataMin.toFixed(1), panelX + 8, startY + lineHeight);
    text('Max = ' + dataMax.toFixed(1), panelX + 8, startY + lineHeight * 2);
    text('Range = ' + dataRange.toFixed(1), panelX + 8, startY + lineHeight * 3);
    text('Bins = ' + bins.length, panelX + 8, startY + lineHeight * 4);
}

function drawWarning() {
    let warning = '';
    let numBins = bins.length;

    if (binWidth <= 3 && numBins > 20) {
        warning = 'Bin width may be too narrow - pattern hard to see';
    } else if (binWidth >= 15 && numBins < 4) {
        warning = 'Bin width may be too wide - losing detail';
    }

    if (warning !== '') {
        fill(255, 200, 100);
        stroke(200, 150, 50);
        strokeWeight(1);
        let warnY = histBottom - histHeight - 25;
        rect(histLeft + 10, warnY, histWidth - 20, 20, 5);

        fill(100, 50, 0);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);
        text(warning, histLeft + histWidth / 2, warnY + 10);
    }
}

function drawControls() {
    textSize(defaultTextSize);

    // Row 1: Bin Width slider
    let row1Y = drawHeight + 15;

    // Label
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    text('Bin Width: ' + binWidth, 10, row1Y);

    // Slider
    sliderX = 130;
    sliderY = row1Y - 8;
    sliderWidth = 180;
    sliderHeight = 16;

    // Slider track
    fill(220);
    stroke(180);
    strokeWeight(1);
    rect(sliderX, sliderY, sliderWidth, sliderHeight, 8);

    // Slider fill
    let fillWidth = map(binWidth, minBinWidth, maxBinWidth, 0, sliderWidth);
    fill(100, 149, 237);
    noStroke();
    rect(sliderX, sliderY, fillWidth, sliderHeight, 8);

    // Slider handle
    let handleX = sliderX + fillWidth - 8;
    fill(255);
    stroke(100);
    strokeWeight(2);
    circle(handleX + 8, sliderY + sliderHeight / 2, 18);

    // Bins display
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    text('(' + bins.length + ' bins)', sliderX + sliderWidth + 10, row1Y);

    // Row 2: Dataset dropdown
    let row2Y = drawHeight + 50;

    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    text('Dataset:', 10, row2Y);

    dropdownX = 80;
    dropdownY = row2Y - 12;
    dropdownWidth = 180;
    dropdownHeight = 24;

    // Dropdown button
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(dropdownX, dropdownY, dropdownWidth, dropdownHeight, 4);

    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text(datasetNames[currentDataset], dropdownX + 8, row2Y);

    // Dropdown arrow
    fill(100);
    noStroke();
    triangle(
        dropdownX + dropdownWidth - 18, row2Y - 4,
        dropdownX + dropdownWidth - 8, row2Y - 4,
        dropdownX + dropdownWidth - 13, row2Y + 4
    );

    // Row 3: Checkboxes and Reset button
    let row3Y = drawHeight + 90;

    // Frequency checkbox
    drawCheckbox(10, row3Y - 10, showRelativeFreq, 'Relative Frequency');

    // Show data points checkbox
    drawCheckbox(160, row3Y - 10, showDataPoints, 'Show Data Points');

    // Reset button
    let resetX = 320;
    let resetY = row3Y - 12;
    let resetW = 60;
    let resetH = 24;

    buttons[0] = { x: resetX, y: resetY, w: resetW, h: resetH, label: 'Reset' };

    fill(240);
    stroke(180);
    strokeWeight(1);
    rect(resetX, resetY, resetW, resetH, 4);

    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Reset', resetX + resetW / 2, row3Y);

    // Row 4: Instructions
    let row4Y = drawHeight + 125;
    fill(100);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Drag the slider to change bin width. Hover over bars to see counts.', 10, row4Y);
}

function drawCheckbox(x, y, checked, label) {
    let boxSize = 16;

    // Checkbox box
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(x, y, boxSize, boxSize, 3);

    // Checkmark if checked
    if (checked) {
        stroke(50, 120, 50);
        strokeWeight(2);
        line(x + 3, y + 8, x + 7, y + 12);
        line(x + 7, y + 12, x + 13, y + 4);
    }

    // Label
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text(label, x + boxSize + 6, y + boxSize / 2);
}

function drawDropdownMenu() {
    let menuX = dropdownX;
    let menuY = dropdownY + dropdownHeight;
    let menuHeight = datasetNames.length * 28;

    // Menu background
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(menuX, menuY, dropdownWidth, menuHeight, 4);

    // Menu items
    for (let i = 0; i < datasetNames.length; i++) {
        let itemY = menuY + i * 28;

        // Highlight current selection
        if (i === currentDataset) {
            fill(230, 240, 255);
            noStroke();
            rect(menuX + 2, itemY + 2, dropdownWidth - 4, 24, 2);
        }

        // Hover highlight
        if (mouseY > itemY && mouseY < itemY + 28 && mouseX > menuX && mouseX < menuX + dropdownWidth) {
            fill(240, 245, 255);
            noStroke();
            rect(menuX + 2, itemY + 2, dropdownWidth - 4, 24, 2);
        }

        fill('black');
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(14);
        text(datasetNames[i], menuX + 10, itemY + 14);
    }
}

function mousePressed() {
    // Close dropdown if clicking elsewhere
    if (dropdownOpen) {
        // Check if clicking on a menu item
        let menuY = dropdownY + dropdownHeight;
        if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownWidth) {
            for (let i = 0; i < datasetNames.length; i++) {
                let itemY = menuY + i * 28;
                if (mouseY >= itemY && mouseY < itemY + 28) {
                    currentDataset = i;
                    currentData = datasets[currentDataset];
                    calculateStatistics();
                    calculateBins();
                    dropdownOpen = false;
                    return;
                }
            }
        }
        dropdownOpen = false;
        return;
    }

    // Check dropdown button click
    if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownWidth &&
        mouseY >= dropdownY && mouseY <= dropdownY + dropdownHeight) {
        dropdownOpen = true;
        return;
    }

    // Check slider click
    if (mouseX >= sliderX && mouseX <= sliderX + sliderWidth &&
        mouseY >= sliderY && mouseY <= sliderY + sliderHeight + 5) {
        isDraggingSlider = true;
        updateSliderValue();
        return;
    }

    // Check frequency checkbox
    let row3Y = drawHeight + 90;
    if (mouseX >= 10 && mouseX <= 26 && mouseY >= row3Y - 10 && mouseY <= row3Y + 6) {
        showRelativeFreq = !showRelativeFreq;
        return;
    }

    // Check show data points checkbox
    if (mouseX >= 160 && mouseX <= 176 && mouseY >= row3Y - 10 && mouseY <= row3Y + 6) {
        showDataPoints = !showDataPoints;
        return;
    }

    // Check reset button
    if (buttons[0] && mouseX >= buttons[0].x && mouseX <= buttons[0].x + buttons[0].w &&
        mouseY >= buttons[0].y && mouseY <= buttons[0].y + buttons[0].h) {
        resetSimulation();
        return;
    }
}

function mouseDragged() {
    if (isDraggingSlider) {
        updateSliderValue();
    }
}

function mouseReleased() {
    isDraggingSlider = false;
}

function mouseMoved() {
    // Check for histogram bar hover
    if (mouseY >= histTop && mouseY <= histBottom && bins.length > 0) {
        let barWidth = histWidth / bins.length;
        for (let i = 0; i < bins.length; i++) {
            let x = histLeft + i * barWidth;
            if (mouseX >= x && mouseX < x + barWidth) {
                hoveredBin = i;
                return;
            }
        }
    }
    hoveredBin = -1;
}

function updateSliderValue() {
    let newValue = map(mouseX, sliderX, sliderX + sliderWidth, minBinWidth, maxBinWidth);
    newValue = constrain(Math.round(newValue), minBinWidth, maxBinWidth);
    if (newValue !== binWidth) {
        binWidth = newValue;
        calculateBins();
    }
}

function resetSimulation() {
    binWidth = 10;
    showRelativeFreq = false;
    showDataPoints = false;
    currentDataset = 0;
    currentData = datasets[currentDataset];
    calculateStatistics();
    calculateBins();
    dropdownOpen = false;
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
