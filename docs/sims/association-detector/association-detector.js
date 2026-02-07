// Association Detector Visualization MicroSim
// Students compare conditional distributions visually and describe evidence for association
// Uses side-by-side 100% stacked bar charts to show conditional distributions
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 380;
let controlHeight = 140;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 25;
let defaultTextSize = 16;

// Two-way table data (2 rows x 4 columns)
// Default: Season preference by Grade Level
let tableData = [
    [45, 30, 15, 10],  // Row 1: Freshmen/Sophomores
    [20, 25, 30, 25]   // Row 2: Juniors/Seniors
];

// Row and column labels
let rowLabels = ['Freshmen/Sophomores', 'Juniors/Seniors'];
let colLabels = ['Fall', 'Winter', 'Spring', 'Summer'];

// Preset data configurations
const presets = {
    'Strong association': {
        data: [[60, 25, 10, 5], [10, 15, 35, 40]],
        rowLabels: ['Freshmen/Sophomores', 'Juniors/Seniors'],
        colLabels: ['Fall', 'Winter', 'Spring', 'Summer']
    },
    'No association': {
        data: [[25, 25, 25, 25], [25, 25, 25, 25]],
        rowLabels: ['Freshmen/Sophomores', 'Juniors/Seniors'],
        colLabels: ['Fall', 'Winter', 'Spring', 'Summer']
    },
    'Moderate': {
        data: [[35, 30, 20, 15], [20, 25, 30, 25]],
        rowLabels: ['Freshmen/Sophomores', 'Juniors/Seniors'],
        colLabels: ['Fall', 'Winter', 'Spring', 'Summer']
    },
    'Custom': {
        data: [[45, 30, 15, 10], [20, 25, 30, 25]],
        rowLabels: ['Freshmen/Sophomores', 'Juniors/Seniors'],
        colLabels: ['Fall', 'Winter', 'Spring', 'Summer']
    }
};

// UI state
let showPercentageLabels = true;
let showDifferenceHighlighting = true;
let currentPreset = 'Custom';

// Colors for the four categories (colorblind-friendly)
const categoryColors = [
    [230, 159, 0],    // Orange - Fall
    [86, 180, 233],   // Sky Blue - Winter
    [0, 158, 115],    // Bluish Green - Spring
    [240, 228, 66]    // Yellow - Summer
];

// Editable cell state
let editingCell = null;
let editBuffer = '';

// Button positions for canvas-based controls
let presetButtons = [];
let toggleButtons = [];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);

    // Initialize button positions (will be updated in draw)
    updateButtonPositions();

    describe('Interactive visualization showing two 100% stacked bar charts comparing conditional distributions. Students can edit data in a two-way table and observe how differences in distributions indicate association between variables.', LABEL);
}

function updateButtonPositions() {
    // Preset buttons in first row of controls
    let buttonY = drawHeight + 10;
    let buttonWidth = 90;
    let startX = 120;

    presetButtons = [
        { label: 'Strong', preset: 'Strong association', x: startX, y: buttonY, w: 60, h: 25 },
        { label: 'None', preset: 'No association', x: startX + 70, y: buttonY, w: 50, h: 25 },
        { label: 'Moderate', preset: 'Moderate', x: startX + 130, y: buttonY, w: 70, h: 25 },
        { label: 'Custom', preset: 'Custom', x: startX + 210, y: buttonY, w: 60, h: 25 }
    ];

    // Toggle buttons in second row
    let toggleY = drawHeight + 45;
    toggleButtons = [
        { label: 'Show %', state: 'showPercentageLabels', x: 10, y: toggleY, w: 70, h: 25 },
        { label: 'Highlight', state: 'showDifferenceHighlighting', x: 90, y: toggleY, w: 80, h: 25 }
    ];
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
    textSize(20);
    text('Association Detector: Comparing Conditional Distributions', canvasWidth/2, 8);

    // Calculate layout
    let chartAreaTop = 35;
    let chartAreaHeight = drawHeight * 0.45;
    let summaryTop = chartAreaTop + chartAreaHeight + 10;
    let summaryHeight = drawHeight - summaryTop - 10;

    // Draw the two 100% stacked bar charts (top 60%)
    drawStackedBarCharts(margin, chartAreaTop, canvasWidth - 2*margin, chartAreaHeight);

    // Draw comparison summary (bottom 40%)
    drawComparisonSummary(margin, summaryTop, canvasWidth - 2*margin, summaryHeight);

    // Draw control area
    drawControls();
}

function drawStackedBarCharts(x, y, w, h) {
    // Calculate row totals and percentages
    let rowTotals = tableData.map(row => row.reduce((a, b) => a + b, 0));
    let percentages = tableData.map((row, i) =>
        row.map(val => rowTotals[i] > 0 ? (val / rowTotals[i]) * 100 : 0)
    );

    // Bar dimensions
    let barHeight = 35;
    let barSpacing = 50;
    let legendHeight = 30;
    let chartStartY = y + legendHeight + 10;
    let barWidth = w * 0.65;
    let labelWidth = w * 0.28;

    // Draw legend
    let legendX = x + labelWidth;
    let legendItemWidth = barWidth / 4;

    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);

    for (let i = 0; i < colLabels.length; i++) {
        let itemX = legendX + i * legendItemWidth;

        // Color swatch
        fill(categoryColors[i][0], categoryColors[i][1], categoryColors[i][2]);
        rect(itemX, y + 5, 15, 15, 3);

        // Label
        fill('black');
        text(colLabels[i], itemX + 20, y + 12);
    }

    // Draw each row's bar
    for (let row = 0; row < 2; row++) {
        let barY = chartStartY + row * (barHeight + barSpacing);

        // Row label
        fill('black');
        noStroke();
        textAlign(RIGHT, CENTER);
        textSize(13);
        text(rowLabels[row], x + labelWidth - 10, barY + barHeight/2);

        // Draw segments
        let segmentX = x + labelWidth;

        for (let col = 0; col < 4; col++) {
            let segmentWidth = (percentages[row][col] / 100) * barWidth;

            // Segment fill
            fill(categoryColors[col][0], categoryColors[col][1], categoryColors[col][2]);
            stroke(255);
            strokeWeight(1);
            rect(segmentX, barY, segmentWidth, barHeight, col === 0 ? 3 : 0, col === 3 ? 3 : 0, col === 3 ? 3 : 0, col === 0 ? 3 : 0);

            // Percentage label
            if (showPercentageLabels && segmentWidth > 30) {
                fill(0);
                noStroke();
                textAlign(CENTER, CENTER);
                textSize(11);
                text(percentages[row][col].toFixed(1) + '%', segmentX + segmentWidth/2, barY + barHeight/2);
            }

            segmentX += segmentWidth;
        }

        // Row total
        fill('gray');
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(11);
        text('n=' + rowTotals[row], x + labelWidth + barWidth + 10, barY + barHeight/2);
    }

    // Draw difference indicators if highlighting is on
    if (showDifferenceHighlighting) {
        drawDifferenceIndicators(x + labelWidth, chartStartY, barWidth, barHeight, barSpacing, percentages);
    }
}

function drawDifferenceIndicators(x, y, barWidth, barHeight, barSpacing, percentages) {
    // Show vertical lines connecting same category across both bars
    // with difference annotation

    let row1Y = y + barHeight;
    let row2Y = y + barHeight + barSpacing;
    let arrowY = row1Y + (barSpacing - barHeight) / 2 + barHeight/2;

    // Calculate cumulative positions for each category
    let cumPos1 = [0];
    let cumPos2 = [0];

    for (let i = 0; i < 4; i++) {
        cumPos1.push(cumPos1[i] + (percentages[0][i] / 100) * barWidth);
        cumPos2.push(cumPos2[i] + (percentages[1][i] / 100) * barWidth);
    }

    // Find the category with the largest difference
    let maxDiff = 0;
    let maxDiffCol = 0;
    for (let i = 0; i < 4; i++) {
        let diff = Math.abs(percentages[0][i] - percentages[1][i]);
        if (diff > maxDiff) {
            maxDiff = diff;
            maxDiffCol = i;
        }
    }

    // Draw indicator for largest difference
    if (maxDiff > 5) {
        let mid1 = x + (cumPos1[maxDiffCol] + cumPos1[maxDiffCol + 1]) / 2;
        let mid2 = x + (cumPos2[maxDiffCol] + cumPos2[maxDiffCol + 1]) / 2;

        // Connecting line
        stroke(180, 0, 0);
        strokeWeight(2);
        line(mid1, row1Y + 5, mid1, arrowY - 10);
        line(mid1, arrowY - 10, mid2, arrowY + 10);
        line(mid2, arrowY + 10, mid2, row2Y - 5);

        // Difference label
        fill(180, 0, 0);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(11);
        let diff = percentages[0][maxDiffCol] - percentages[1][maxDiffCol];
        let sign = diff > 0 ? '+' : '';
        let labelX = Math.max(mid1, mid2) + 25;
        text(sign + diff.toFixed(1) + ' pp', labelX, arrowY);
    }
}

function drawComparisonSummary(x, y, w, h) {
    // Panel background
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    // Calculate statistics
    let rowTotals = tableData.map(row => row.reduce((a, b) => a + b, 0));
    let percentages = tableData.map((row, i) =>
        row.map(val => rowTotals[i] > 0 ? (val / rowTotals[i]) * 100 : 0)
    );

    // Calculate total absolute difference (measure of association strength)
    let totalDiff = 0;
    let maxDiff = 0;
    let maxDiffCol = 0;

    for (let i = 0; i < 4; i++) {
        let diff = Math.abs(percentages[0][i] - percentages[1][i]);
        totalDiff += diff;
        if (diff > maxDiff) {
            maxDiff = diff;
            maxDiffCol = i;
        }
    }

    // Summary title
    fill('purple');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Comparison Summary', x + w/2, y + 8);

    // Left column: Editable two-way table
    let tableX = x + 15;
    let tableY = y + 30;
    let cellWidth = 45;
    let cellHeight = 25;
    let headerWidth = 90;

    textSize(11);
    fill('black');
    textAlign(CENTER, CENTER);

    // Column headers
    for (let c = 0; c < 4; c++) {
        let cellX = tableX + headerWidth + c * cellWidth;
        fill(categoryColors[c][0], categoryColors[c][1], categoryColors[c][2], 100);
        stroke(150);
        strokeWeight(1);
        rect(cellX, tableY, cellWidth, cellHeight);
        fill('black');
        noStroke();
        textSize(9);
        text(colLabels[c].substring(0, 4), cellX + cellWidth/2, tableY + cellHeight/2);
    }

    // Row headers and data cells
    for (let r = 0; r < 2; r++) {
        let rowY = tableY + (r + 1) * cellHeight;

        // Row header
        fill(240);
        stroke(150);
        strokeWeight(1);
        rect(tableX, rowY, headerWidth, cellHeight);
        fill('black');
        noStroke();
        textSize(9);
        text(rowLabels[r].substring(0, 12), tableX + headerWidth/2, rowY + cellHeight/2);

        // Data cells (editable)
        for (let c = 0; c < 4; c++) {
            let cellX = tableX + headerWidth + c * cellWidth;

            // Highlight if editing
            if (editingCell && editingCell.row === r && editingCell.col === c) {
                fill(255, 255, 200);
            } else {
                fill(255);
            }
            stroke(150);
            strokeWeight(1);
            rect(cellX, rowY, cellWidth, cellHeight);

            // Cell value
            fill('black');
            noStroke();
            textSize(12);
            if (editingCell && editingCell.row === r && editingCell.col === c) {
                text(editBuffer + '|', cellX + cellWidth/2, rowY + cellHeight/2);
            } else {
                text(tableData[r][c], cellX + cellWidth/2, rowY + cellHeight/2);
            }
        }
    }

    // Right column: Analysis text
    let analysisX = x + w * 0.55;
    let analysisY = y + 30;
    let analysisWidth = w * 0.42;

    textAlign(LEFT, TOP);
    textSize(11);

    // Association strength assessment
    let strengthText = '';
    let strengthColor;
    if (totalDiff < 10) {
        strengthText = 'Very Weak / No Association';
        strengthColor = color(0, 150, 0);
    } else if (totalDiff < 30) {
        strengthText = 'Weak Association';
        strengthColor = color(100, 150, 0);
    } else if (totalDiff < 60) {
        strengthText = 'Moderate Association';
        strengthColor = color(200, 150, 0);
    } else {
        strengthText = 'Strong Association';
        strengthColor = color(200, 0, 0);
    }

    fill('black');
    text('Evidence of Association:', analysisX, analysisY);
    fill(strengthColor);
    textSize(13);
    text(strengthText, analysisX, analysisY + 15);

    // Specific findings
    fill('black');
    textSize(10);
    let finding1 = 'Largest difference: ' + colLabels[maxDiffCol];
    let finding2 = '(' + percentages[0][maxDiffCol].toFixed(1) + '% vs ' + percentages[1][maxDiffCol].toFixed(1) + '%)';
    text(finding1, analysisX, analysisY + 38);
    text(finding2, analysisX, analysisY + 50);

    // Total difference (sum of absolute differences / 2 = max possible deviation)
    let normalizedDiff = totalDiff / 2;
    text('Total variation: ' + normalizedDiff.toFixed(1) + ' percentage points', analysisX, analysisY + 68);

    // Interpretation hint
    fill('gray');
    textSize(9);
    let hint = normalizedDiff < 5 ?
        'Distributions are nearly identical - no evidence of association.' :
        'Different distributions suggest the variables may be associated.';

    // Word wrap the hint
    textAlign(LEFT, TOP);
    text(hint, analysisX, analysisY + 85, analysisWidth - 10, 40);
}

function drawControls() {
    let controlY = drawHeight + 8;

    // First row: Preset label and buttons
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(13);
    text('Presets:', 10, controlY + 12);

    // Draw preset buttons
    for (let btn of presetButtons) {
        // Button background
        if (currentPreset === btn.preset) {
            fill(70, 130, 180);
        } else {
            fill(220);
        }
        stroke(150);
        strokeWeight(1);
        rect(btn.x, btn.y, btn.w, btn.h, 4);

        // Button text
        if (currentPreset === btn.preset) {
            fill(255);
        } else {
            fill(50);
        }
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(11);
        text(btn.label, btn.x + btn.w/2, btn.y + btn.h/2);
    }

    // Second row: Toggle buttons
    for (let btn of toggleButtons) {
        let isOn = (btn.state === 'showPercentageLabels') ? showPercentageLabels : showDifferenceHighlighting;

        // Button background
        if (isOn) {
            fill(70, 130, 180);
        } else {
            fill(220);
        }
        stroke(150);
        strokeWeight(1);
        rect(btn.x, btn.y, btn.w, btn.h, 4);

        // Button text
        if (isOn) {
            fill(255);
        } else {
            fill(50);
        }
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(11);
        text(btn.label, btn.x + btn.w/2, btn.y + btn.h/2);
    }

    // Instructions
    fill('gray');
    textSize(10);
    textAlign(LEFT, CENTER);
    text('Click cells in the table to edit values. Press Enter to confirm, Escape to cancel.', 10, drawHeight + 80);

    // Sylvia tip
    fill('darkgreen');
    textSize(11);
    textAlign(LEFT, TOP);
    let tipX = 10;
    let tipY = drawHeight + 95;
    text('Tip from Sylvia: "If the bars look like twins, there\'s no association. If they look different,', tipX, tipY);
    text('the variables might be related! Compare the percentages in each category."', tipX, tipY + 14);
}

function mousePressed() {
    // Check preset buttons
    for (let btn of presetButtons) {
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            currentPreset = btn.preset;
            tableData = JSON.parse(JSON.stringify(presets[btn.preset].data));
            editingCell = null;
            return;
        }
    }

    // Check toggle buttons
    for (let btn of toggleButtons) {
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            if (btn.state === 'showPercentageLabels') {
                showPercentageLabels = !showPercentageLabels;
            } else {
                showDifferenceHighlighting = !showDifferenceHighlighting;
            }
            return;
        }
    }

    // Check table cells for editing
    let tableX = margin + 15;
    let tableY = drawHeight * 0.45 + 35 + margin + 10 + 30;
    let cellWidth = 45;
    let cellHeight = 25;
    let headerWidth = 90;

    for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 4; c++) {
            let cellX = tableX + headerWidth + c * cellWidth;
            let rowY = tableY + (r + 1) * cellHeight;

            if (mouseX >= cellX && mouseX <= cellX + cellWidth &&
                mouseY >= rowY && mouseY <= rowY + cellHeight) {
                editingCell = { row: r, col: c };
                editBuffer = tableData[r][c].toString();
                currentPreset = 'Custom';
                return;
            }
        }
    }

    // Click elsewhere cancels editing
    if (editingCell) {
        confirmEdit();
    }
}

function keyPressed() {
    if (!editingCell) return;

    if (keyCode === ENTER || keyCode === RETURN) {
        confirmEdit();
    } else if (keyCode === ESCAPE) {
        editingCell = null;
        editBuffer = '';
    } else if (keyCode === BACKSPACE) {
        editBuffer = editBuffer.slice(0, -1);
    } else if (key >= '0' && key <= '9' && editBuffer.length < 4) {
        editBuffer += key;
    }
}

function confirmEdit() {
    if (editingCell && editBuffer.length > 0) {
        let value = parseInt(editBuffer);
        if (!isNaN(value) && value >= 0) {
            tableData[editingCell.row][editingCell.col] = value;
        }
    }
    editingCell = null;
    editBuffer = '';
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    updateButtonPositions();
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
