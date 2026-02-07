// Interactive Dotplot Builder MicroSim
// Students click on a number line to add data points and construct a dotplot
// Demonstrates how dotplots are built from individual observations
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 400;
let drawHeight = 350;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 25;
let defaultTextSize = 16;

// Number line parameters
let numberLineY;
let numberLineLeftX;
let numberLineRightX;
let minValue = 0;
let maxValue = 15;

// Data storage
let dataPoints = []; // Array of values (integers 0-15)

// Dot display parameters
let dotRadius = 12; // Default medium size
let dotGap = 2; // Vertical gap between stacked dots
let dotSizes = {
    small: 8,
    medium: 12,
    large: 16
};
let currentDotSize = 'medium';

// Canvas-based button definitions
let buttons = [];
let radioOptions = [];

// Button state tracking
let buttonHovered = null;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);

    // Calculate number line position
    numberLineY = drawHeight - 60;
    updateNumberLinePosition();

    // Define buttons (will be drawn on canvas)
    defineButtons();
    defineRadioOptions();

    describe('Interactive dotplot builder where students click to add data points to a number line', LABEL);
}

function defineButtons() {
    buttons = [
        { label: 'Clear All', x: 10, y: drawHeight + 10, w: 80, h: 28, action: clearAllData },
        { label: 'Load Sample', x: 100, y: drawHeight + 10, w: 100, h: 28, action: loadSampleData },
        { label: 'Random Data', x: 210, y: drawHeight + 10, w: 100, h: 28, action: generateRandomData }
    ];
}

function defineRadioOptions() {
    radioOptions = [
        { label: 'Small', value: 'small', x: 400, y: drawHeight + 15 },
        { label: 'Medium', value: 'medium', x: 480, y: drawHeight + 15 },
        { label: 'Large', value: 'large', x: 570, y: drawHeight + 15 }
    ];
}

function updateNumberLinePosition() {
    numberLineLeftX = margin + 30;
    numberLineRightX = canvasWidth - margin - 30;
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
    stroke('silver');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(24);
    text('Interactive Dotplot Builder', canvasWidth / 2, 10);

    // Subtitle/instructions
    textSize(14);
    fill('#666');
    text('Click on the number line to add data points', canvasWidth / 2, 40);

    // Draw number line
    drawNumberLine();

    // Draw dots
    drawDots();

    // Draw data display
    drawDataDisplay();

    // Draw canvas-based buttons
    drawButtons();

    // Draw radio options for dot size
    drawRadioOptions();

    // Reset text settings
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
}

function drawNumberLine() {
    updateNumberLinePosition();

    // Main line
    stroke('black');
    strokeWeight(2);
    line(numberLineLeftX, numberLineY, numberLineRightX, numberLineY);

    // Calculate spacing
    let range = maxValue - minValue;
    let spacing = (numberLineRightX - numberLineLeftX) / range;

    // Draw tick marks and labels
    textAlign(CENTER, TOP);
    textSize(14);
    fill('black');
    noStroke();

    for (let i = minValue; i <= maxValue; i++) {
        let x = numberLineLeftX + (i - minValue) * spacing;

        // Tick mark
        stroke('black');
        strokeWeight(2);
        line(x, numberLineY - 8, x, numberLineY + 8);

        // Label
        noStroke();
        fill('black');
        text(i, x, numberLineY + 12);
    }

    // Grid lines (light, vertical)
    stroke(220);
    strokeWeight(1);
    for (let i = minValue; i <= maxValue; i++) {
        let x = numberLineLeftX + (i - minValue) * spacing;
        line(x, 70, x, numberLineY - 10);
    }
}

function drawDots() {
    // Count occurrences of each value
    let counts = {};
    for (let i = minValue; i <= maxValue; i++) {
        counts[i] = 0;
    }
    for (let val of dataPoints) {
        counts[val]++;
    }

    // Draw stacked dots for each value
    let range = maxValue - minValue;
    let spacing = (numberLineRightX - numberLineLeftX) / range;
    dotRadius = dotSizes[currentDotSize];

    fill('#4285F4'); // Blue filled circles
    stroke('#2962FF');
    strokeWeight(1);

    for (let i = minValue; i <= maxValue; i++) {
        let x = numberLineLeftX + (i - minValue) * spacing;
        let count = counts[i];

        for (let j = 0; j < count; j++) {
            // Stack dots upward from number line
            let y = numberLineY - 15 - (j * (dotRadius * 2 + dotGap)) - dotRadius;
            ellipse(x, y, dotRadius * 2, dotRadius * 2);
        }
    }
}

function drawDataDisplay() {
    // Display dataset and count in upper right area
    let displayX = canvasWidth - 200;
    let displayY = 70;

    // Background panel
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(displayX - 10, displayY - 10, 190, 80, 10);

    noStroke();
    fill('black');
    textAlign(LEFT, TOP);
    textSize(14);

    // Count
    text('Observations: ' + dataPoints.length, displayX, displayY);

    // Dataset (comma-separated, wrap if needed)
    let dataStr = 'Data: ';
    if (dataPoints.length === 0) {
        dataStr += '(empty)';
    } else {
        // Sort for display
        let sorted = [...dataPoints].sort((a, b) => a - b);
        let dataList = sorted.join(', ');
        if (dataList.length > 25) {
            dataStr += dataList.substring(0, 22) + '...';
        } else {
            dataStr += dataList;
        }
    }
    text(dataStr, displayX, displayY + 25);

    // Show min, max, range if data exists
    if (dataPoints.length > 0) {
        let sorted = [...dataPoints].sort((a, b) => a - b);
        let minVal = sorted[0];
        let maxVal = sorted[sorted.length - 1];
        text('Min: ' + minVal + '  Max: ' + maxVal + '  Range: ' + (maxVal - minVal), displayX, displayY + 50);
    }
}

function drawButtons() {
    for (let btn of buttons) {
        // Check if mouse is over button
        let isHovered = mouseX >= btn.x && mouseX <= btn.x + btn.w &&
                        mouseY >= btn.y && mouseY <= btn.y + btn.h;

        // Button background
        if (isHovered) {
            fill('#e0e0e0');
        } else {
            fill('#f5f5f5');
        }
        stroke('#999');
        strokeWeight(1);
        rect(btn.x, btn.y, btn.w, btn.h, 5);

        // Button label
        noStroke();
        fill('black');
        textAlign(CENTER, CENTER);
        textSize(14);
        text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
    }
}

function drawRadioOptions() {
    // Label
    noStroke();
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(14);
    text('Dot Size:', 330, drawHeight + 28);

    // Radio buttons
    for (let opt of radioOptions) {
        // Adjust x position based on canvas width
        let adjustedX = Math.min(opt.x, canvasWidth - 80);

        // Radio circle
        stroke('#666');
        strokeWeight(1);
        if (currentDotSize === opt.value) {
            fill('#4285F4');
        } else {
            fill('white');
        }
        ellipse(adjustedX, opt.y + 13, 16, 16);

        // Label
        noStroke();
        fill('black');
        textAlign(LEFT, CENTER);
        text(opt.label, adjustedX + 12, opt.y + 13);
    }
}

function mousePressed() {
    // Check button clicks
    for (let btn of buttons) {
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            btn.action();
            return;
        }
    }

    // Check radio option clicks
    for (let opt of radioOptions) {
        let adjustedX = Math.min(opt.x, canvasWidth - 80);
        let dist = Math.sqrt(Math.pow(mouseX - adjustedX, 2) + Math.pow(mouseY - (opt.y + 13), 2));
        if (dist <= 12) {
            currentDotSize = opt.value;
            return;
        }
        // Also check label area
        if (mouseX >= adjustedX && mouseX <= adjustedX + 60 &&
            mouseY >= opt.y && mouseY <= opt.y + 28) {
            currentDotSize = opt.value;
            return;
        }
    }

    // Check if click is in number line area (for adding dots)
    if (mouseY >= 70 && mouseY <= numberLineY + 20 &&
        mouseX >= numberLineLeftX - 15 && mouseX <= numberLineRightX + 15) {
        addDataPoint();
    }
}

function addDataPoint() {
    // Calculate which integer value was clicked (snap to nearest)
    let range = maxValue - minValue;
    let spacing = (numberLineRightX - numberLineLeftX) / range;

    let relativeX = mouseX - numberLineLeftX;
    let value = Math.round(relativeX / spacing) + minValue;

    // Clamp to valid range
    value = constrain(value, minValue, maxValue);

    // Add to data
    dataPoints.push(value);
}

function clearAllData() {
    dataPoints = [];
}

function loadSampleData() {
    // Study hours example data
    dataPoints = [2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 8, 9, 10];
}

function generateRandomData() {
    dataPoints = [];
    // Generate 10-20 random values
    let count = Math.floor(random(10, 21));
    for (let i = 0; i < count; i++) {
        dataPoints.push(Math.floor(random(minValue, maxValue + 1)));
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    updateNumberLinePosition();
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
