// Frequency Table Explorer MicroSim
// Students practice calculating relative frequencies and percentages
// Uses canvas-based controls (no DOM elements)
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 25;
let defaultTextSize = 16;

// Table layout
let tableTop = 70;
let tableLeft = 30;
let rowHeight = 55;
let colWidths = [130, 80, 70, 110, 90, 100]; // Category, Slider, Freq, Rel Freq, %, Bar

// Datasets with category labels
let datasets = {
    "Favorite Season": ["Spring", "Summer", "Fall", "Winter"],
    "Pet Preference": ["Dog", "Cat", "Fish", "Bird"],
    "Transportation": ["Car", "Bus", "Bike", "Walk"]
};
let datasetNames = ["Favorite Season", "Pet Preference", "Transportation"];
let currentDatasetIndex = 0;

// Frequency values (0-50 for each category)
let frequencies = [8, 22, 14, 6];
let defaultFrequencies = [8, 22, 14, 6];

// Slider state
let activeSlider = -1;
let sliderMin = 0;
let sliderMax = 50;

// UI state
let showSteps = false;

// Button positions
let resetButtonX, resetButtonY, resetButtonW, resetButtonH;
let stepsButtonX, stepsButtonY, stepsButtonW, stepsButtonH;
let dropdownX, dropdownY, dropdownW, dropdownH;
let dropdownOpen = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);

    // Button dimensions
    resetButtonW = 70;
    resetButtonH = 30;
    stepsButtonW = 100;
    stepsButtonH = 30;
    dropdownW = 160;
    dropdownH = 30;

    describe('Interactive frequency table explorer where students adjust frequencies with sliders and see calculated relative frequencies and percentages', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(22);
    text('Frequency Table Explorer', canvasWidth / 2, 12);

    // Subtitle with Sylvia
    textSize(14);
    fill('#666');
    text("Let's crack this nut! Adjust the sliders to see how frequencies become percentages.", canvasWidth / 2, 40);

    textSize(defaultTextSize);

    // Calculate total
    let total = frequencies.reduce((a, b) => a + b, 0);

    // Draw table
    drawTable(total);

    // Draw controls
    drawControls(total);
}

function drawTable(total) {
    let categories = datasets[datasetNames[currentDatasetIndex]];

    // Column headers
    let headers = ["Category", "", "Freq", "Rel Freq", "%", ""];
    let headerY = tableTop;

    fill('#2c5282');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);

    let xPos = tableLeft;
    for (let i = 0; i < headers.length; i++) {
        if (i === 1) {
            // Slider column - no header
        } else if (i === 5) {
            // Bar column - no header
        } else {
            text(headers[i], xPos + 5, headerY);
        }
        xPos += colWidths[i];
    }

    // Draw header line
    stroke('#2c5282');
    strokeWeight(2);
    line(tableLeft, headerY + 15, tableLeft + colWidths.reduce((a, b) => a + b, 0) - 30, headerY + 15);

    // Data rows
    for (let i = 0; i < 4; i++) {
        let rowY = tableTop + 30 + i * rowHeight;
        let isEvenRow = i % 2 === 0;

        // Alternating row background
        if (isEvenRow) {
            fill(245, 247, 250);
        } else {
            fill(255, 255, 255);
        }
        noStroke();
        rect(tableLeft, rowY - 10, colWidths.reduce((a, b) => a + b, 0) - 30, rowHeight - 5, 5);

        xPos = tableLeft;

        // Category name
        fill('#333');
        textAlign(LEFT, CENTER);
        textSize(15);
        text(categories[i], xPos + 8, rowY + 15);
        xPos += colWidths[0];

        // Slider
        drawSlider(i, xPos, rowY + 5, colWidths[1] - 10, 25);
        xPos += colWidths[1];

        // Frequency value
        fill('#333');
        textAlign(CENTER, CENTER);
        textSize(16);
        text(frequencies[i], xPos + colWidths[2] / 2, rowY + 15);
        xPos += colWidths[2];

        // Relative frequency
        let relFreq = total > 0 ? frequencies[i] / total : 0;
        if (showSteps && total > 0) {
            // Show calculation
            textSize(12);
            fill('#666');
            text(frequencies[i] + "/" + total, xPos + colWidths[3] / 2, rowY + 5);
            textSize(14);
            fill('#2c5282');
            text("= " + relFreq.toFixed(3), xPos + colWidths[3] / 2, rowY + 22);
        } else {
            textSize(15);
            fill('#333');
            text(relFreq.toFixed(3), xPos + colWidths[3] / 2, rowY + 15);
        }
        xPos += colWidths[3];

        // Percentage
        let percentage = relFreq * 100;
        if (showSteps && total > 0) {
            textSize(12);
            fill('#666');
            text(relFreq.toFixed(3) + " x 100", xPos + colWidths[4] / 2, rowY + 5);
            textSize(14);
            fill('#2c5282');
            text("= " + percentage.toFixed(1) + "%", xPos + colWidths[4] / 2, rowY + 22);
        } else {
            textSize(15);
            fill('#333');
            text(percentage.toFixed(1) + "%", xPos + colWidths[4] / 2, rowY + 15);
        }
        xPos += colWidths[4];

        // Visual bar
        let barWidth = map(relFreq, 0, 1, 0, colWidths[5] - 20);
        let barColor = color(66, 133, 244, 180);
        fill(barColor);
        noStroke();
        rect(xPos + 5, rowY + 7, barWidth, 18, 3);
    }

    // Total row
    let totalRowY = tableTop + 30 + 4 * rowHeight;

    // Background for total row
    fill('#e2e8f0');
    noStroke();
    rect(tableLeft, totalRowY - 10, colWidths.reduce((a, b) => a + b, 0) - 30, rowHeight - 10, 5);

    // Total label and values
    fill('#1a365d');
    textAlign(LEFT, CENTER);
    textSize(15);
    textStyle(BOLD);
    text("TOTAL", tableLeft + 8, totalRowY + 10);

    xPos = tableLeft + colWidths[0] + colWidths[1];
    textAlign(CENTER, CENTER);
    text(total, xPos + colWidths[2] / 2, totalRowY + 10);
    xPos += colWidths[2];

    text("1.000", xPos + colWidths[3] / 2, totalRowY + 10);
    xPos += colWidths[3];

    text("100.0%", xPos + colWidths[4] / 2, totalRowY + 10);
    textStyle(NORMAL);

    // Check indicator
    xPos += colWidths[4];
    let sumCheck = frequencies.reduce((a, b) => a + b, 0);
    let percentSum = 0;
    for (let i = 0; i < 4; i++) {
        percentSum += (sumCheck > 0 ? (frequencies[i] / sumCheck) * 100 : 0);
    }

    // Always shows 100% for valid data
    if (total > 0) {
        fill('#38a169');
        textSize(20);
        text("check", xPos + 30, totalRowY + 10);
    }
}

function drawSlider(index, x, y, w, h) {
    let value = frequencies[index];
    let sliderX = x;
    let sliderY = y;
    let sliderW = w;
    let sliderH = h;

    // Track background
    fill('#e2e8f0');
    stroke('#cbd5e0');
    strokeWeight(1);
    rect(sliderX, sliderY + h/2 - 4, sliderW, 8, 4);

    // Filled portion
    let fillWidth = map(value, sliderMin, sliderMax, 0, sliderW);
    fill('#4285f4');
    noStroke();
    rect(sliderX, sliderY + h/2 - 4, fillWidth, 8, 4);

    // Thumb
    let thumbX = sliderX + fillWidth;
    fill('#fff');
    stroke('#4285f4');
    strokeWeight(2);
    ellipse(thumbX, sliderY + h/2, 16, 16);

    // Value label above slider
    fill('#333');
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(12);
}

function drawControls(total) {
    // Position buttons
    dropdownX = 15;
    dropdownY = drawHeight + 10;

    resetButtonX = dropdownX + dropdownW + 15;
    resetButtonY = drawHeight + 10;

    stepsButtonX = resetButtonX + resetButtonW + 15;
    stepsButtonY = drawHeight + 10;

    // Dropdown button
    fill(dropdownOpen ? '#e2e8f0' : '#f7fafc');
    stroke('#cbd5e0');
    strokeWeight(1);
    rect(dropdownX, dropdownY, dropdownW, dropdownH, 5);

    fill('#333');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text(datasetNames[currentDatasetIndex], dropdownX + 10, dropdownY + dropdownH / 2);

    // Dropdown arrow
    fill('#666');
    textAlign(RIGHT, CENTER);
    text(dropdownOpen ? "^" : "v", dropdownX + dropdownW - 10, dropdownY + dropdownH / 2);

    // Dropdown menu
    if (dropdownOpen) {
        for (let i = 0; i < datasetNames.length; i++) {
            let menuY = dropdownY - (datasetNames.length - i) * dropdownH;
            fill(i === currentDatasetIndex ? '#e2e8f0' : '#fff');
            stroke('#cbd5e0');
            rect(dropdownX, menuY, dropdownW, dropdownH, i === 0 ? 5 : 0);

            fill('#333');
            noStroke();
            textAlign(LEFT, CENTER);
            text(datasetNames[i], dropdownX + 10, menuY + dropdownH / 2);
        }
    }

    // Reset button
    fill('#f56565');
    noStroke();
    rect(resetButtonX, resetButtonY, resetButtonW, resetButtonH, 5);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(14);
    text("Reset", resetButtonX + resetButtonW / 2, resetButtonY + resetButtonH / 2);

    // Show Steps toggle button
    fill(showSteps ? '#38a169' : '#a0aec0');
    noStroke();
    rect(stepsButtonX, stepsButtonY, stepsButtonW, stepsButtonH, 5);
    fill('white');
    text(showSteps ? "Hide Steps" : "Show Steps", stepsButtonX + stepsButtonW / 2, stepsButtonY + stepsButtonH / 2);

    // Total display on right side
    fill('#1a365d');
    textAlign(RIGHT, CENTER);
    textSize(14);
    text("n = " + total, canvasWidth - 20, drawHeight + 25);
}

function mousePressed() {
    // Check dropdown toggle
    if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownW &&
        mouseY >= dropdownY && mouseY <= dropdownY + dropdownH) {
        dropdownOpen = !dropdownOpen;
        return;
    }

    // Check dropdown menu selection
    if (dropdownOpen) {
        for (let i = 0; i < datasetNames.length; i++) {
            let menuY = dropdownY - (datasetNames.length - i) * dropdownH;
            if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownW &&
                mouseY >= menuY && mouseY <= menuY + dropdownH) {
                currentDatasetIndex = i;
                dropdownOpen = false;
                return;
            }
        }
        // Close dropdown if clicked elsewhere
        dropdownOpen = false;
    }

    // Check reset button
    if (mouseX >= resetButtonX && mouseX <= resetButtonX + resetButtonW &&
        mouseY >= resetButtonY && mouseY <= resetButtonY + resetButtonH) {
        frequencies = [...defaultFrequencies];
        return;
    }

    // Check show steps button
    if (mouseX >= stepsButtonX && mouseX <= stepsButtonX + stepsButtonW &&
        mouseY >= stepsButtonY && mouseY <= stepsButtonY + stepsButtonH) {
        showSteps = !showSteps;
        return;
    }

    // Check sliders
    checkSliderPress();
}

function checkSliderPress() {
    for (let i = 0; i < 4; i++) {
        let rowY = tableTop + 30 + i * rowHeight;
        let sliderX = tableLeft + colWidths[0];
        let sliderY = rowY + 5;
        let sliderW = colWidths[1] - 10;
        let sliderH = 25;

        if (mouseX >= sliderX && mouseX <= sliderX + sliderW &&
            mouseY >= sliderY && mouseY <= sliderY + sliderH) {
            activeSlider = i;
            updateSliderValue();
            return;
        }
    }
}

function mouseDragged() {
    if (activeSlider >= 0) {
        updateSliderValue();
    }
}

function mouseReleased() {
    activeSlider = -1;
}

function updateSliderValue() {
    if (activeSlider < 0) return;

    let sliderX = tableLeft + colWidths[0];
    let sliderW = colWidths[1] - 10;

    let value = map(mouseX, sliderX, sliderX + sliderW, sliderMin, sliderMax);
    value = constrain(round(value), sliderMin, sliderMax);
    frequencies[activeSlider] = value;
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

    // Recalculate table position for centering
    let tableWidth = colWidths.reduce((a, b) => a + b, 0);
    tableLeft = max(30, (canvasWidth - tableWidth) / 2);
}
