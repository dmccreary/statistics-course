// Scatterplot Builder MicroSim
// Interactive tool for constructing scatterplots from paired data
// Students click data table rows to plot points and understand coordinate placement
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 350;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 20;
let defaultTextSize = 16;

// Datasets - 3 preset options with 8-10 paired observations each
const datasets = {
    'Hours Studied/Test Score': {
        xLabel: 'Hours Studied',
        yLabel: 'Test Score',
        data: [
            {x: 1, y: 55}, {x: 2, y: 62}, {x: 3, y: 68}, {x: 4, y: 72},
            {x: 5, y: 78}, {x: 6, y: 82}, {x: 7, y: 88}, {x: 8, y: 91},
            {x: 2.5, y: 65}, {x: 5.5, y: 80}
        ],
        xRange: [0, 10],
        yRange: [50, 100]
    },
    'Height/Weight': {
        xLabel: 'Height (inches)',
        yLabel: 'Weight (lbs)',
        data: [
            {x: 60, y: 105}, {x: 62, y: 115}, {x: 64, y: 125}, {x: 66, y: 140},
            {x: 68, y: 155}, {x: 70, y: 165}, {x: 72, y: 180}, {x: 74, y: 190},
            {x: 65, y: 135}, {x: 69, y: 160}
        ],
        xRange: [58, 76],
        yRange: [100, 200]
    },
    'Temperature/Ice Cream Sales': {
        xLabel: 'Temperature (F)',
        yLabel: 'Ice Cream Sales ($)',
        data: [
            {x: 55, y: 120}, {x: 60, y: 180}, {x: 65, y: 250}, {x: 70, y: 320},
            {x: 75, y: 400}, {x: 80, y: 480}, {x: 85, y: 520}, {x: 90, y: 580},
            {x: 72, y: 350}
        ],
        xRange: [50, 95],
        yRange: [100, 600]
    }
};

// Current state
let currentDataset = 'Hours Studied/Test Score';
let plottedPoints = []; // Indices of points that have been plotted
let hoveredPoint = -1; // Index of point being hovered in scatterplot
let hoveredRow = -1;   // Index of row being hovered in table
let showGridlines = true;
let allPointsPlotted = false;

// Button positions for canvas-based controls
let buttons = [];
let dropdownOpen = false;
let dropdownOptions = Object.keys(datasets);
let dropdownRect = {x: 0, y: 0, w: 0, h: 0};

// Sylvia theme colors
let sylviaGreen = '#2E7D32';
let sylviaGreenLight = '#4CAF50';
let sylviaAuburn = '#B5651D';
let sylviaCream = '#FFF8E1';

// Animation state for point plotting
let animatingPoint = -1;
let animationProgress = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);

    // Initialize button positions
    updateButtonPositions();

    describe('Interactive scatterplot builder where students click data table rows to plot points on a coordinate plane. Helps understand how paired data translates to visual positions.', LABEL);
}

function updateButtonPositions() {
    let controlY = drawHeight + 15;

    // Dropdown for dataset selection
    dropdownRect = {x: 10, y: controlY, w: 200, h: 28};

    // Buttons
    buttons = [
        {label: 'Clear', action: 'clear', x: 220, y: controlY, w: 60, h: 28},
        {label: 'Show All', action: 'showAll', x: 290, y: controlY, w: 80, h: 28},
        {label: showGridlines ? 'Hide Grid' : 'Show Grid', action: 'toggleGrid', x: 380, y: controlY, w: 85, h: 28}
    ];
}

function draw() {
    updateCanvasSize();
    updateButtonPositions();

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
    textSize(18);
    text('Scatterplot Builder', canvasWidth / 2, 5);

    // Get current dataset
    let dataset = datasets[currentDataset];

    // Calculate layout regions
    let tableWidth = 160;
    let tableX = margin;
    let plotX = tableX + tableWidth + 30;
    let plotWidth = canvasWidth - plotX - margin - 10;
    let plotHeight = drawHeight - 60;
    let plotY = 35;

    // Draw data table on the left
    drawDataTable(tableX, plotY, tableWidth, dataset);

    // Draw scatterplot on the right
    drawScatterplot(plotX, plotY, plotWidth, plotHeight, dataset);

    // Handle animation
    if (animatingPoint >= 0) {
        animationProgress += 0.1;
        if (animationProgress >= 1) {
            animationProgress = 0;
            animatingPoint = -1;
        }
    }

    // Draw completion message
    if (allPointsPlotted && plottedPoints.length === dataset.data.length) {
        drawCompletionMessage();
    }

    // Draw controls
    drawControls();

    // Draw dropdown menu if open (on top of everything)
    if (dropdownOpen) {
        drawDropdownMenu();
    }
}

function drawDataTable(x, y, w, dataset) {
    let rowHeight = 26;
    let headerHeight = 30;
    let data = dataset.data;

    // Table header
    fill(sylviaGreen);
    noStroke();
    rect(x, y, w, headerHeight, 5, 5, 0, 0);

    fill('white');
    textAlign(CENTER, CENTER);
    textSize(11);
    text(dataset.xLabel.substring(0, 8), x + w * 0.3, y + headerHeight / 2);
    text(dataset.yLabel.substring(0, 8), x + w * 0.7, y + headerHeight / 2);

    // Divider line in header
    stroke('white');
    strokeWeight(1);
    line(x + w * 0.5, y + 5, x + w * 0.5, y + headerHeight - 5);

    // Data rows
    for (let i = 0; i < data.length; i++) {
        let rowY = y + headerHeight + i * rowHeight;
        let isPlotted = plottedPoints.includes(i);
        let isHovered = hoveredRow === i;
        let isAnimating = animatingPoint === i;

        // Row background
        if (isAnimating) {
            fill(sylviaAuburn);
        } else if (isPlotted) {
            fill(220, 240, 220);
        } else if (isHovered) {
            fill(sylviaCream);
        } else {
            fill(i % 2 === 0 ? 255 : 245);
        }

        stroke(200);
        strokeWeight(1);
        let cornerRadius = i === data.length - 1 ? [0, 0, 5, 5] : [0, 0, 0, 0];
        if (i === data.length - 1) {
            rect(x, rowY, w, rowHeight, 0, 0, 5, 5);
        } else {
            rect(x, rowY, w, rowHeight);
        }

        // Row number
        fill(150);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        text(i + 1, x + 12, rowY + rowHeight / 2);

        // Data values
        if (isAnimating) {
            fill('white');
        } else if (isPlotted) {
            fill(sylviaGreen);
        } else {
            fill('black');
        }
        textSize(12);
        text(data[i].x, x + w * 0.3, rowY + rowHeight / 2);
        text(data[i].y, x + w * 0.7, rowY + rowHeight / 2);

        // Checkmark for plotted points
        if (isPlotted && !isAnimating) {
            fill(sylviaGreen);
            textSize(14);
            text('✓', x + w - 15, rowY + rowHeight / 2);
        }

        // Divider line
        stroke(200);
        strokeWeight(1);
        line(x + w * 0.5, rowY + 3, x + w * 0.5, rowY + rowHeight - 3);
    }

    // Progress indicator
    fill('gray');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    let progress = plottedPoints.length + '/' + data.length + ' points plotted';
    text(progress, x + w / 2, y + headerHeight + data.length * rowHeight + 5);
}

function drawScatterplot(x, y, w, h, dataset) {
    let padding = 40;
    let plotAreaX = x + padding;
    let plotAreaY = y + 10;
    let plotAreaW = w - padding - 20;
    let plotAreaH = h - padding - 20;

    // Plot background
    fill(255);
    stroke(150);
    strokeWeight(1);
    rect(plotAreaX, plotAreaY, plotAreaW, plotAreaH);

    // Gridlines
    if (showGridlines) {
        stroke(230);
        strokeWeight(1);

        // Vertical gridlines
        let xRange = dataset.xRange;
        let xStep = (xRange[1] - xRange[0]) / 5;
        for (let i = 1; i < 5; i++) {
            let gx = map(xRange[0] + i * xStep, xRange[0], xRange[1], plotAreaX, plotAreaX + plotAreaW);
            line(gx, plotAreaY, gx, plotAreaY + plotAreaH);
        }

        // Horizontal gridlines
        let yRange = dataset.yRange;
        let yStep = (yRange[1] - yRange[0]) / 5;
        for (let i = 1; i < 5; i++) {
            let gy = map(yRange[0] + i * yStep, yRange[0], yRange[1], plotAreaY + plotAreaH, plotAreaY);
            line(plotAreaX, gy, plotAreaX + plotAreaW, gy);
        }
    }

    // Axes
    stroke(100);
    strokeWeight(2);
    // Y-axis
    line(plotAreaX, plotAreaY, plotAreaX, plotAreaY + plotAreaH);
    // X-axis
    line(plotAreaX, plotAreaY + plotAreaH, plotAreaX + plotAreaW, plotAreaY + plotAreaH);

    // Axis labels and tick marks
    fill(80);
    noStroke();
    textSize(10);

    // X-axis ticks and labels
    let xRange = dataset.xRange;
    let xStep = (xRange[1] - xRange[0]) / 5;
    for (let i = 0; i <= 5; i++) {
        let val = xRange[0] + i * xStep;
        let tx = map(val, xRange[0], xRange[1], plotAreaX, plotAreaX + plotAreaW);

        stroke(100);
        strokeWeight(1);
        line(tx, plotAreaY + plotAreaH, tx, plotAreaY + plotAreaH + 5);

        noStroke();
        textAlign(CENTER, TOP);
        text(Math.round(val), tx, plotAreaY + plotAreaH + 8);
    }

    // Y-axis ticks and labels
    let yRange = dataset.yRange;
    let yStep = (yRange[1] - yRange[0]) / 5;
    for (let i = 0; i <= 5; i++) {
        let val = yRange[0] + i * yStep;
        let ty = map(val, yRange[0], yRange[1], plotAreaY + plotAreaH, plotAreaY);

        stroke(100);
        strokeWeight(1);
        line(plotAreaX - 5, ty, plotAreaX, ty);

        noStroke();
        textAlign(RIGHT, CENTER);
        text(Math.round(val), plotAreaX - 8, ty);
    }

    // Axis titles
    fill('black');
    textSize(12);
    textAlign(CENTER, TOP);
    text(dataset.xLabel, plotAreaX + plotAreaW / 2, plotAreaY + plotAreaH + 22);

    push();
    translate(x + 12, plotAreaY + plotAreaH / 2);
    rotate(-PI / 2);
    textAlign(CENTER, CENTER);
    text(dataset.yLabel, 0, 0);
    pop();

    // Plot the points
    let data = dataset.data;
    hoveredPoint = -1;

    for (let i = 0; i < plottedPoints.length; i++) {
        let idx = plottedPoints[i];
        let point = data[idx];

        let px = map(point.x, xRange[0], xRange[1], plotAreaX, plotAreaX + plotAreaW);
        let py = map(point.y, yRange[0], yRange[1], plotAreaY + plotAreaH, plotAreaY);

        // Check if animating this point
        if (animatingPoint === idx) {
            let scale = easeOutBack(animationProgress);
            let radius = 10 * scale;

            fill(sylviaAuburn);
            stroke(50);
            strokeWeight(2);
            circle(px, py, radius * 2);
        } else {
            // Check for hover
            let isHovered = dist(mouseX, mouseY, px, py) < 12;
            if (isHovered && mouseY < drawHeight) {
                hoveredPoint = idx;

                // Draw larger hover state
                fill(sylviaAuburn);
                stroke(50);
                strokeWeight(2);
                circle(px, py, 24);

                // Show coordinates tooltip
                fill(50, 50, 50, 230);
                noStroke();
                let tooltipText = '(' + point.x + ', ' + point.y + ')';
                let tooltipW = textWidth(tooltipText) + 16;
                let tooltipX = px - tooltipW / 2;
                let tooltipY = py - 35;

                // Keep tooltip in bounds
                tooltipX = constrain(tooltipX, plotAreaX, plotAreaX + plotAreaW - tooltipW);
                tooltipY = max(tooltipY, plotAreaY + 5);

                rect(tooltipX, tooltipY, tooltipW, 22, 5);
                fill('white');
                textAlign(CENTER, CENTER);
                textSize(11);
                text(tooltipText, tooltipX + tooltipW / 2, tooltipY + 11);
            } else {
                // Normal point
                fill(sylviaGreen);
                stroke(50);
                strokeWeight(1.5);
                circle(px, py, 16);
            }
        }
    }
}

function drawCompletionMessage() {
    let msgX = canvasWidth / 2;
    let msgY = drawHeight - 25;

    // Message background
    fill(sylviaGreen);
    noStroke();
    let msg = "You've built a scatterplot! What pattern do you see?";
    let msgW = textWidth(msg) + 30;
    rect(msgX - msgW / 2, msgY - 12, msgW, 24, 12);

    // Message text
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(12);
    text(msg, msgX, msgY);
}

function drawControls() {
    let controlY = drawHeight + 15;

    // Dataset dropdown (closed state)
    fill(255);
    stroke(150);
    strokeWeight(1);
    rect(dropdownRect.x, dropdownRect.y, dropdownRect.w, dropdownRect.h, 4);

    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text(currentDataset, dropdownRect.x + 10, dropdownRect.y + dropdownRect.h / 2);

    // Dropdown arrow
    fill(100);
    let arrowX = dropdownRect.x + dropdownRect.w - 20;
    let arrowY = dropdownRect.y + dropdownRect.h / 2;
    if (dropdownOpen) {
        triangle(arrowX - 5, arrowY + 3, arrowX + 5, arrowY + 3, arrowX, arrowY - 4);
    } else {
        triangle(arrowX - 5, arrowY - 3, arrowX + 5, arrowY - 3, arrowX, arrowY + 4);
    }

    // Draw buttons
    for (let btn of buttons) {
        let isHovered = mouseX >= btn.x && mouseX <= btn.x + btn.w &&
                        mouseY >= btn.y && mouseY <= btn.y + btn.h;

        if (isHovered) {
            fill(sylviaGreenLight);
        } else {
            fill(sylviaGreen);
        }
        stroke(50);
        strokeWeight(1);
        rect(btn.x, btn.y, btn.w, btn.h, 4);

        fill('white');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);
        text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
    }

    // Instructions
    fill('gray');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Click a row in the data table to plot that point on the scatterplot.', 10, drawHeight + 55);

    // Sylvia tip
    fill('darkgreen');
    textSize(11);
    text('Tip from Sylvia: "Each row becomes a dot! The x-value tells you how far right,', 10, drawHeight + 75);
    text('and the y-value tells you how far up. Let\'s crack this nut together!"', 10, drawHeight + 90);
}

function drawDropdownMenu() {
    let menuX = dropdownRect.x;
    let menuY = dropdownRect.y + dropdownRect.h;
    let menuW = dropdownRect.w;
    let optionH = 28;

    // Menu background
    fill(255);
    stroke(150);
    strokeWeight(1);
    rect(menuX, menuY, menuW, dropdownOptions.length * optionH, 0, 0, 4, 4);

    // Menu options
    for (let i = 0; i < dropdownOptions.length; i++) {
        let optY = menuY + i * optionH;
        let isHovered = mouseX >= menuX && mouseX <= menuX + menuW &&
                        mouseY >= optY && mouseY <= optY + optionH;

        if (isHovered) {
            fill(sylviaCream);
            noStroke();
            rect(menuX + 1, optY, menuW - 2, optionH);
        }

        fill(dropdownOptions[i] === currentDataset ? sylviaGreen : 'black');
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(12);
        text(dropdownOptions[i], menuX + 10, optY + optionH / 2);
    }
}

function mousePressed() {
    // Check dropdown
    if (dropdownOpen) {
        let menuX = dropdownRect.x;
        let menuY = dropdownRect.y + dropdownRect.h;
        let menuW = dropdownRect.w;
        let optionH = 28;

        for (let i = 0; i < dropdownOptions.length; i++) {
            let optY = menuY + i * optionH;
            if (mouseX >= menuX && mouseX <= menuX + menuW &&
                mouseY >= optY && mouseY <= optY + optionH) {
                currentDataset = dropdownOptions[i];
                plottedPoints = [];
                allPointsPlotted = false;
                dropdownOpen = false;
                return;
            }
        }
        dropdownOpen = false;
        return;
    }

    // Check dropdown toggle
    if (mouseX >= dropdownRect.x && mouseX <= dropdownRect.x + dropdownRect.w &&
        mouseY >= dropdownRect.y && mouseY <= dropdownRect.y + dropdownRect.h) {
        dropdownOpen = !dropdownOpen;
        return;
    }

    // Check buttons
    for (let btn of buttons) {
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            handleButtonClick(btn.action);
            return;
        }
    }

    // Check table row clicks
    let dataset = datasets[currentDataset];
    let tableX = margin;
    let tableY = 35;
    let tableWidth = 160;
    let headerHeight = 30;
    let rowHeight = 26;

    for (let i = 0; i < dataset.data.length; i++) {
        let rowY = tableY + headerHeight + i * rowHeight;

        if (mouseX >= tableX && mouseX <= tableX + tableWidth &&
            mouseY >= rowY && mouseY <= rowY + rowHeight) {

            // Add point if not already plotted
            if (!plottedPoints.includes(i)) {
                plottedPoints.push(i);
                animatingPoint = i;
                animationProgress = 0;

                // Check if all points are now plotted
                if (plottedPoints.length === dataset.data.length) {
                    allPointsPlotted = true;
                }
            }
            return;
        }
    }
}

function mouseMoved() {
    // Update hovered row
    let dataset = datasets[currentDataset];
    let tableX = margin;
    let tableY = 35;
    let tableWidth = 160;
    let headerHeight = 30;
    let rowHeight = 26;

    hoveredRow = -1;

    for (let i = 0; i < dataset.data.length; i++) {
        let rowY = tableY + headerHeight + i * rowHeight;

        if (mouseX >= tableX && mouseX <= tableX + tableWidth &&
            mouseY >= rowY && mouseY <= rowY + rowHeight) {
            hoveredRow = i;
            break;
        }
    }
}

function handleButtonClick(action) {
    if (action === 'clear') {
        plottedPoints = [];
        allPointsPlotted = false;
        animatingPoint = -1;
    } else if (action === 'showAll') {
        let dataset = datasets[currentDataset];
        plottedPoints = [];
        for (let i = 0; i < dataset.data.length; i++) {
            plottedPoints.push(i);
        }
        allPointsPlotted = true;
    } else if (action === 'toggleGrid') {
        showGridlines = !showGridlines;
    }
}

// Easing function for smooth animation
function easeOutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
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
