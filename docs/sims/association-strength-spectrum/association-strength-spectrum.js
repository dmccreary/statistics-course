// Strength of Association Spectrum MicroSim
// Students classify associations as strong, moderate, weak, or none
// Visualizes two-way tables, segmented bars, and strength meter
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 800;
let drawHeight = 420;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 25;
let sliderLeftMargin = 200;
let defaultTextSize = 16;

// Current association strength (0 = none, 100 = perfect)
let associationStrength = 50; // Default: moderate
let targetStrength = 50;
let animationSpeed = 0.08;

// Preset definitions
let presets = [
    { name: "No Association", value: 0 },
    { name: "Weak", value: 25 },
    { name: "Moderate", value: 50 },
    { name: "Strong", value: 75 },
    { name: "Perfect", value: 100 }
];
let currentPresetIndex = 2; // Start with Moderate

// Two-way table data (will be calculated based on association strength)
// Categories: Treatment (A/B) x Outcome (Success/Failure)
let tableData = {
    row1: [0, 0], // Treatment A: [Success, Failure]
    row2: [0, 0]  // Treatment B: [Success, Failure]
};
let totalPerGroup = 100;

// UI elements
let strengthSlider;
let presetButtons = [];
let randomizeButton;

// Strength meter properties
let meterX, meterY, meterWidth, meterHeight;

// Description texts for each strength level
let strengthDescriptions = {
    none: "No pattern visible between treatment and outcome. Each group has similar success rates. Changes in one variable tell us nothing about the other.",
    weak: "A slight pattern is emerging. There is a small difference in success rates between groups, but it could easily be due to chance.",
    moderate: "A noticeable pattern exists. The treatment groups have meaningfully different success rates. The association is useful but not deterministic.",
    strong: "A clear pattern is evident. Knowing which treatment was given helps predict the outcome with good accuracy.",
    perfect: "Complete predictability. The treatment perfectly determines the outcome. This is rare in real-world data."
};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);

    // Create strength slider
    strengthSlider = createSlider(0, 100, 50, 1);
    strengthSlider.position(sliderLeftMargin, drawHeight + 20);
    strengthSlider.size(canvasWidth - sliderLeftMargin - margin - 120);
    strengthSlider.input(onSliderChange);

    // Create randomize button
    randomizeButton = createButton('Randomize');
    randomizeButton.position(canvasWidth - 110, drawHeight + 17);
    randomizeButton.mousePressed(randomizeAssociation);

    // Calculate initial table data
    updateTableData();

    describe('Interactive visualization showing the spectrum of association strength from none to perfect. Students can adjust a slider or select presets to see how two-way tables and segmented bar charts change, learning to classify associations by strength.', LABEL);
}

function draw() {
    updateCanvasSize();

    // Animate toward target strength
    if (abs(associationStrength - targetStrength) > 0.5) {
        associationStrength += (targetStrength - associationStrength) * animationSpeed;
        updateTableData();
    } else {
        associationStrength = targetStrength;
    }

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
    text('Strength of Association Spectrum', canvasWidth * 0.35, 10);

    // Calculate layout regions
    let leftWidth = canvasWidth * 0.55;
    let rightWidth = canvasWidth * 0.45;
    let contentTop = 45;
    let contentHeight = drawHeight - 55;

    // Left side: Two-way table and segmented bars
    drawLeftPanel(0, contentTop, leftWidth, contentHeight);

    // Right side: Strength meter and description
    drawRightPanel(leftWidth, contentTop, rightWidth, contentHeight);

    // Draw preset buttons in control area
    drawPresetButtons();

    // Draw slider label
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
    text('Strength: ' + round(associationStrength) + '%', 10, drawHeight + 35);
}

function drawLeftPanel(x, y, w, h) {
    let panelPadding = 15;
    let tableTop = y + 10;
    let tableHeight = h * 0.4;
    let barChartTop = tableTop + tableHeight + 25;
    let barChartHeight = h - tableHeight - 50;

    // Section label
    fill('navy');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);
    text('Two-Way Table', x + panelPadding, tableTop);

    // Draw two-way table
    drawTwoWayTable(x + panelPadding, tableTop + 20, w - panelPadding * 2, tableHeight - 30);

    // Section label for segmented bars
    fill('navy');
    textAlign(LEFT, TOP);
    text('Segmented Bar Chart (Conditional Percentages)', x + panelPadding, barChartTop - 5);

    // Draw segmented bar chart
    drawSegmentedBarChart(x + panelPadding, barChartTop + 15, w - panelPadding * 2, barChartHeight - 30);
}

function drawTwoWayTable(x, y, w, h) {
    let cellPadding = 5;
    let labelColWidth = 90;
    let headerRowHeight = 30;
    let dataColWidth = (w - labelColWidth) / 3; // Success, Failure, Total
    let dataRowHeight = (h - headerRowHeight) / 3; // Treatment A, Treatment B, Total

    // Calculate totals
    let row1Total = tableData.row1[0] + tableData.row1[1];
    let row2Total = tableData.row2[0] + tableData.row2[1];
    let col1Total = tableData.row1[0] + tableData.row2[0];
    let col2Total = tableData.row1[1] + tableData.row2[1];
    let grandTotal = row1Total + row2Total;

    // Draw table grid
    stroke(150);
    strokeWeight(1);
    fill(255);

    // Header row background
    fill(230, 240, 250);
    rect(x + labelColWidth, y, dataColWidth * 3, headerRowHeight);

    // Label column background
    fill(230, 240, 250);
    rect(x, y + headerRowHeight, labelColWidth, dataRowHeight * 2);

    // Data cells background
    fill(255);
    rect(x + labelColWidth, y + headerRowHeight, dataColWidth * 2, dataRowHeight * 2);

    // Total row/column background
    fill(245, 245, 245);
    rect(x + labelColWidth + dataColWidth * 2, y + headerRowHeight, dataColWidth, dataRowHeight * 2);
    rect(x + labelColWidth, y + headerRowHeight + dataRowHeight * 2, dataColWidth * 3, dataRowHeight);
    rect(x, y + headerRowHeight + dataRowHeight * 2, labelColWidth, dataRowHeight);

    // Draw grid lines
    stroke(150);
    for (let i = 0; i <= 3; i++) {
        line(x + labelColWidth + i * dataColWidth, y, x + labelColWidth + i * dataColWidth, y + h);
    }
    for (let i = 0; i <= 3; i++) {
        line(x, y + headerRowHeight + i * dataRowHeight, x + w, y + headerRowHeight + i * dataRowHeight);
    }
    line(x, y, x + w, y);
    line(x, y, x, y + h);
    line(x + labelColWidth, y, x + labelColWidth, y + h);

    // Draw text
    noStroke();
    fill('black');
    textAlign(CENTER, CENTER);
    textSize(13);

    // Header labels
    fill('navy');
    text('Success', x + labelColWidth + dataColWidth * 0.5, y + headerRowHeight / 2);
    text('Failure', x + labelColWidth + dataColWidth * 1.5, y + headerRowHeight / 2);
    text('Total', x + labelColWidth + dataColWidth * 2.5, y + headerRowHeight / 2);

    // Row labels
    textAlign(LEFT, CENTER);
    text('Treatment A', x + cellPadding, y + headerRowHeight + dataRowHeight * 0.5);
    text('Treatment B', x + cellPadding, y + headerRowHeight + dataRowHeight * 1.5);
    text('Total', x + cellPadding, y + headerRowHeight + dataRowHeight * 2.5);

    // Data values
    textAlign(CENTER, CENTER);
    fill('black');
    textSize(14);

    // Row 1 data
    text(round(tableData.row1[0]), x + labelColWidth + dataColWidth * 0.5, y + headerRowHeight + dataRowHeight * 0.5);
    text(round(tableData.row1[1]), x + labelColWidth + dataColWidth * 1.5, y + headerRowHeight + dataRowHeight * 0.5);

    // Row 2 data
    text(round(tableData.row2[0]), x + labelColWidth + dataColWidth * 0.5, y + headerRowHeight + dataRowHeight * 1.5);
    text(round(tableData.row2[1]), x + labelColWidth + dataColWidth * 1.5, y + headerRowHeight + dataRowHeight * 1.5);

    // Totals
    fill(80);
    text(round(row1Total), x + labelColWidth + dataColWidth * 2.5, y + headerRowHeight + dataRowHeight * 0.5);
    text(round(row2Total), x + labelColWidth + dataColWidth * 2.5, y + headerRowHeight + dataRowHeight * 1.5);
    text(round(col1Total), x + labelColWidth + dataColWidth * 0.5, y + headerRowHeight + dataRowHeight * 2.5);
    text(round(col2Total), x + labelColWidth + dataColWidth * 1.5, y + headerRowHeight + dataRowHeight * 2.5);
    text(round(grandTotal), x + labelColWidth + dataColWidth * 2.5, y + headerRowHeight + dataRowHeight * 2.5);
}

function drawSegmentedBarChart(x, y, w, h) {
    let barHeight = 35;
    let barSpacing = 50;
    let labelWidth = 90;
    let barWidth = w - labelWidth - 80;
    let barX = x + labelWidth;

    // Calculate percentages
    let row1Total = tableData.row1[0] + tableData.row1[1];
    let row2Total = tableData.row2[0] + tableData.row2[1];
    let pct1Success = row1Total > 0 ? (tableData.row1[0] / row1Total) * 100 : 50;
    let pct2Success = row2Total > 0 ? (tableData.row2[0] / row2Total) * 100 : 50;

    // Draw bars
    let barY1 = y + 15;
    let barY2 = barY1 + barSpacing;

    // Treatment A bar
    drawSingleBar(barX, barY1, barWidth, barHeight, pct1Success, 'Treatment A', x);

    // Treatment B bar
    drawSingleBar(barX, barY2, barWidth, barHeight, pct2Success, 'Treatment B', x);

    // Legend
    let legendY = barY2 + barSpacing + 5;
    let legendX = x + labelWidth;

    fill('forestgreen');
    noStroke();
    rect(legendX, legendY, 15, 15);
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Success', legendX + 20, legendY + 8);

    fill('coral');
    rect(legendX + 90, legendY, 15, 15);
    fill('black');
    text('Failure', legendX + 110, legendY + 8);
}

function drawSingleBar(x, y, w, h, successPct, label, labelX) {
    let successWidth = (successPct / 100) * w;
    let failureWidth = w - successWidth;

    // Draw success portion
    fill('forestgreen');
    stroke(255);
    strokeWeight(1);
    rect(x, y, successWidth, h);

    // Draw failure portion
    fill('coral');
    rect(x + successWidth, y, failureWidth, h);

    // Draw outline
    noFill();
    stroke(100);
    rect(x, y, w, h);

    // Draw label
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(13);
    text(label, labelX, y + h / 2);

    // Draw percentage labels on bars (if wide enough)
    textAlign(CENTER, CENTER);
    textSize(12);
    if (successWidth > 35) {
        fill(255);
        text(round(successPct) + '%', x + successWidth / 2, y + h / 2);
    }
    if (failureWidth > 35) {
        fill(255);
        text(round(100 - successPct) + '%', x + successWidth + failureWidth / 2, y + h / 2);
    }
}

function drawRightPanel(x, y, w, h) {
    let panelPadding = 20;

    // Strength meter dimensions
    meterX = x + w / 2 - 25;
    meterY = y + 20;
    meterWidth = 50;
    meterHeight = h * 0.55;

    // Draw strength meter
    drawStrengthMeter(meterX, meterY, meterWidth, meterHeight);

    // Draw description box
    let descY = meterY + meterHeight + 30;
    let descHeight = h - meterHeight - 60;
    drawDescriptionBox(x + panelPadding, descY, w - panelPadding * 2, descHeight);
}

function drawStrengthMeter(x, y, w, h) {
    // Draw meter background with gradient effect
    noStroke();

    // Draw gradient segments
    let numSegments = 50;
    let segmentHeight = h / numSegments;
    for (let i = 0; i < numSegments; i++) {
        let pct = i / numSegments;
        let c = lerpColor(color(200, 200, 200), color(0, 100, 200), pct);
        fill(c);
        rect(x, y + h - (i + 1) * segmentHeight, w, segmentHeight);
    }

    // Draw meter border
    noFill();
    stroke(100);
    strokeWeight(2);
    rect(x, y, w, h);

    // Draw tick marks and labels
    textAlign(LEFT, CENTER);
    textSize(11);
    fill('black');
    noStroke();

    let labels = ['None', 'Weak', 'Moderate', 'Strong', 'Perfect'];
    let positions = [0, 0.25, 0.5, 0.75, 1];

    for (let i = 0; i < labels.length; i++) {
        let tickY = y + h - positions[i] * h;
        stroke(100);
        strokeWeight(1);
        line(x + w, tickY, x + w + 8, tickY);
        noStroke();
        text(labels[i], x + w + 12, tickY);
    }

    // Draw current value indicator (arrow)
    let indicatorY = y + h - (associationStrength / 100) * h;
    fill('darkred');
    noStroke();

    // Left arrow
    triangle(x - 15, indicatorY, x - 5, indicatorY - 8, x - 5, indicatorY + 8);

    // Right arrow
    triangle(x + w + 45, indicatorY, x + w + 35, indicatorY - 8, x + w + 35, indicatorY + 8);

    // Draw current value text
    textAlign(CENTER, CENTER);
    textSize(14);
    fill('darkred');
    text(round(associationStrength) + '%', x + w / 2, y - 15);

    // Label above meter
    fill('navy');
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text('Strength Meter', x + w / 2, y - 30);
}

function drawDescriptionBox(x, y, w, h) {
    // Determine current strength category
    let category;
    if (associationStrength < 10) {
        category = 'none';
    } else if (associationStrength < 35) {
        category = 'weak';
    } else if (associationStrength < 65) {
        category = 'moderate';
    } else if (associationStrength < 90) {
        category = 'strong';
    } else {
        category = 'perfect';
    }

    // Draw box
    fill(255, 255, 255, 230);
    stroke(150);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    // Draw category label
    fill('navy');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(16);
    let categoryLabel = category.charAt(0).toUpperCase() + category.slice(1) + ' Association';
    text(categoryLabel, x + w / 2, y + 10);

    // Draw description text with word wrap
    fill('black');
    textSize(12);
    textAlign(LEFT, TOP);
    let description = strengthDescriptions[category];
    drawWrappedText(description, x + 10, y + 35, w - 20, 14);
}

function drawWrappedText(txt, x, y, maxWidth, lineHeight) {
    let words = txt.split(' ');
    let line = '';
    let currentY = y;

    for (let word of words) {
        let testLine = line + word + ' ';
        let testWidth = textWidth(testLine);
        if (testWidth > maxWidth && line.length > 0) {
            text(line.trim(), x, currentY);
            line = word + ' ';
            currentY += lineHeight;
        } else {
            line = testLine;
        }
    }
    if (line.length > 0) {
        text(line.trim(), x, currentY);
    }
}

function drawPresetButtons() {
    let buttonStartX = canvasWidth - 100;
    let buttonY = drawHeight + 45;
    let buttonWidth = 70;
    let buttonSpacing = 5;

    // Calculate total width of all preset buttons
    let totalButtonWidth = presets.length * buttonWidth + (presets.length - 1) * buttonSpacing;
    let startX = sliderLeftMargin;

    // Draw preset label
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Presets:', 10, drawHeight + 50);

    // Draw preset buttons as text links
    textSize(11);
    let currentX = 60;
    for (let i = 0; i < presets.length; i++) {
        let preset = presets[i];
        let isActive = abs(targetStrength - preset.value) < 5;

        if (isActive) {
            fill('darkblue');
            textStyle(BOLD);
        } else {
            fill('steelblue');
            textStyle(NORMAL);
        }

        let buttonText = preset.name;
        text(buttonText, currentX, drawHeight + 50);

        currentX += textWidth(buttonText) + 15;
    }
    textStyle(NORMAL);
}

function mousePressed() {
    // Check if click is in preset area
    if (mouseY > drawHeight + 35 && mouseY < drawHeight + 60) {
        let currentX = 60;
        textSize(11);
        for (let i = 0; i < presets.length; i++) {
            let preset = presets[i];
            let buttonWidth = textWidth(preset.name);
            if (mouseX >= currentX && mouseX <= currentX + buttonWidth) {
                targetStrength = preset.value;
                strengthSlider.value(preset.value);
                currentPresetIndex = i;
                return;
            }
            currentX += buttonWidth + 15;
        }
    }
}

function onSliderChange() {
    targetStrength = strengthSlider.value();
    // Update preset index based on closest preset
    let minDiff = Infinity;
    for (let i = 0; i < presets.length; i++) {
        let diff = abs(presets[i].value - targetStrength);
        if (diff < minDiff) {
            minDiff = diff;
            currentPresetIndex = i;
        }
    }
}

function randomizeAssociation() {
    targetStrength = random(0, 100);
    strengthSlider.value(targetStrength);
    onSliderChange();
}

function updateTableData() {
    // Calculate table data based on association strength
    // At 0% association: both groups have 50% success rate
    // At 100% association: Group A has 100% success, Group B has 0% success

    // Base success rate for neutral condition
    let baseRate = 0.5;

    // Maximum deviation from base rate at full association
    let maxDeviation = 0.5;

    // Calculate deviation based on association strength
    let deviation = (associationStrength / 100) * maxDeviation;

    // Treatment A success rate (increases with association)
    let rateA = baseRate + deviation;
    // Treatment B success rate (decreases with association)
    let rateB = baseRate - deviation;

    // Calculate counts (100 per group)
    tableData.row1[0] = rateA * totalPerGroup; // A success
    tableData.row1[1] = (1 - rateA) * totalPerGroup; // A failure
    tableData.row2[0] = rateB * totalPerGroup; // B success
    tableData.row2[1] = (1 - rateB) * totalPerGroup; // B failure
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    strengthSlider.size(canvasWidth - sliderLeftMargin - margin - 120);
    randomizeButton.position(canvasWidth - 110, drawHeight + 17);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
