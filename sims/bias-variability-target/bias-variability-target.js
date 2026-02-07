// Bias vs. Variability Target Visualization MicroSim
// Demonstrates the difference between bias (systematic error) and variability (random error)
// Using the classic target metaphor
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 600;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 20;
let defaultTextSize = 14;

// Target parameters
let targetCenterX, targetCenterY;
let targetRadius = 120;

// Shot data
let shots = [];
let numShots = 20;

// Scenario selection
let scenarios = [
    { name: "Low Bias, Low Variability", bias: 0, variability: 8, description: "Accurate AND precise - ideal!" },
    { name: "Low Bias, High Variability", bias: 0, variability: 40, description: "Accurate but imprecise - results center on truth but scatter widely" },
    { name: "High Bias, Low Variability", bias: 50, variability: 8, description: "Precise but inaccurate - consistently wrong in the same direction" },
    { name: "High Bias, High Variability", bias: 50, variability: 40, description: "Neither accurate nor precise - the worst case!" }
];
let currentScenario = 0;

// Button positions
let buttonWidth = 130;
let buttonHeight = 30;
let buttonY;
let newSampleButtonX;
let scenario1X, scenario2X, scenario3X, scenario4X;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    // Calculate target center
    targetCenterX = canvasWidth / 2;
    targetCenterY = drawHeight / 2 + 20;

    // Generate initial shots
    generateShots();

    describe('Interactive target visualization showing how bias and variability affect sample estimates. Students can toggle between four scenarios to understand the difference between accuracy (low bias) and precision (low variability).', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area background
    fill(250, 250, 255);
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill(245, 245, 250);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Update target center for responsive layout
    targetCenterX = canvasWidth / 2;

    // Title
    fill(30, 60, 100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    textStyle(BOLD);
    text('Bias vs. Variability: The Target Metaphor', canvasWidth / 2, 10);
    textStyle(NORMAL);

    // Draw the target
    drawTarget();

    // Draw the shots
    drawShots();

    // Draw current scenario info
    drawScenarioInfo();

    // Draw control buttons
    drawControls();
}

function drawTarget() {
    // Draw concentric circles
    let rings = 5;
    for (let i = rings; i >= 1; i--) {
        let radius = targetRadius * (i / rings);
        if (i === rings) {
            fill(240, 240, 240);
        } else if (i % 2 === 0) {
            fill(200, 220, 240);
        } else {
            fill(255, 255, 255);
        }
        stroke(100);
        strokeWeight(1);
        circle(targetCenterX, targetCenterY, radius * 2);
    }

    // Draw bullseye
    fill(180, 60, 60);
    noStroke();
    circle(targetCenterX, targetCenterY, 20);

    // Draw crosshairs
    stroke(100, 100, 100, 100);
    strokeWeight(1);
    line(targetCenterX - targetRadius - 20, targetCenterY, targetCenterX + targetRadius + 20, targetCenterY);
    line(targetCenterX, targetCenterY - targetRadius - 20, targetCenterX, targetCenterY + targetRadius + 20);

    // Label the center
    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    text('True Parameter', targetCenterX, targetCenterY + targetRadius + 5);
}

function drawShots() {
    // Draw each shot
    for (let i = 0; i < shots.length; i++) {
        let shot = shots[i];

        // Shot point
        fill(50, 100, 180, 200);
        stroke(30, 60, 120);
        strokeWeight(1);
        circle(shot.x, shot.y, 10);
    }

    // Draw mean of shots
    if (shots.length > 0) {
        let meanX = shots.reduce((sum, s) => sum + s.x, 0) / shots.length;
        let meanY = shots.reduce((sum, s) => sum + s.y, 0) / shots.length;

        // Mean marker (larger X)
        stroke(220, 120, 50);
        strokeWeight(3);
        let mSize = 8;
        line(meanX - mSize, meanY - mSize, meanX + mSize, meanY + mSize);
        line(meanX - mSize, meanY + mSize, meanX + mSize, meanY - mSize);

        // Label
        fill(180, 100, 40);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(11);
        text('Mean of estimates', meanX + 12, meanY);
    }
}

function drawScenarioInfo() {
    let scenario = scenarios[currentScenario];

    // Info box
    let boxX = margin;
    let boxY = 40;
    let boxWidth = 200;
    let boxHeight = 80;

    fill(255, 255, 255, 240);
    stroke(150);
    strokeWeight(1);
    rect(boxX, boxY, boxWidth, boxHeight, 5);

    // Scenario name
    fill(30, 60, 100);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text(scenario.name, boxX + 10, boxY + 10);
    textStyle(NORMAL);

    // Description
    fill(60, 60, 60);
    textSize(11);
    text(wrapText(scenario.description, boxWidth - 20), boxX + 10, boxY + 30);

    // Legend box on right
    let legendX = canvasWidth - margin - 150;
    let legendY = 40;
    let legendWidth = 150;
    let legendHeight = 70;

    fill(255, 255, 255, 240);
    stroke(150);
    strokeWeight(1);
    rect(legendX, legendY, legendWidth, legendHeight, 5);

    // Legend title
    fill(30, 60, 100);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Legend', legendX + 10, legendY + 8);
    textStyle(NORMAL);

    // Shot point
    fill(50, 100, 180, 200);
    stroke(30, 60, 120);
    strokeWeight(1);
    circle(legendX + 20, legendY + 35, 10);
    fill(60);
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Sample estimate', legendX + 35, legendY + 35);

    // Mean marker
    stroke(220, 120, 50);
    strokeWeight(3);
    let mX = legendX + 20;
    let mY = legendY + 55;
    line(mX - 5, mY - 5, mX + 5, mY + 5);
    line(mX - 5, mY + 5, mX + 5, mY - 5);
    fill(60);
    noStroke();
    text('Mean of estimates', legendX + 35, legendY + 55);
}

function wrapText(txt, maxWidth) {
    // Simple word wrap
    let words = txt.split(' ');
    let lines = [];
    let currentLine = '';

    textSize(11);
    for (let word of words) {
        let testLine = currentLine + (currentLine ? ' ' : '') + word;
        if (textWidth(testLine) > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) lines.push(currentLine);

    return lines.join('\n');
}

function drawControls() {
    buttonY = drawHeight + 10;

    // Calculate button positions for responsive layout
    let totalButtonWidth = buttonWidth * 4 + 100 + 40; // 4 scenario buttons + new sample button + spacing
    let startX = (canvasWidth - totalButtonWidth) / 2;
    if (startX < 10) startX = 10;

    scenario1X = startX;
    scenario2X = scenario1X + buttonWidth + 5;
    scenario3X = scenario2X + buttonWidth + 5;
    scenario4X = scenario3X + buttonWidth + 5;
    newSampleButtonX = scenario4X + buttonWidth + 15;

    // Scenario buttons
    for (let i = 0; i < 4; i++) {
        let x = startX + i * (buttonWidth + 5);
        let isSelected = (i === currentScenario);

        // Button background
        if (isSelected) {
            fill(70, 130, 180);
        } else {
            fill(200, 210, 220);
        }
        stroke(100);
        strokeWeight(1);
        rect(x, buttonY, buttonWidth, buttonHeight, 5);

        // Button text
        fill(isSelected ? 255 : 50);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        text("Scenario " + (i + 1), x + buttonWidth / 2, buttonY + buttonHeight / 2);
    }

    // New Sample button
    fill(80, 150, 80);
    stroke(60, 120, 60);
    strokeWeight(1);
    rect(newSampleButtonX, buttonY, 100, buttonHeight, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text('New Sample', newSampleButtonX + 50, buttonY + buttonHeight / 2);
}

function mousePressed() {
    // Check if click is in control area
    if (mouseY >= drawHeight && mouseY <= canvasHeight) {
        // Check scenario buttons
        for (let i = 0; i < 4; i++) {
            let x = scenario1X + i * (buttonWidth + 5);
            if (mouseX >= x && mouseX <= x + buttonWidth &&
                mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
                currentScenario = i;
                generateShots();
                return;
            }
        }

        // Check new sample button
        if (mouseX >= newSampleButtonX && mouseX <= newSampleButtonX + 100 &&
            mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
            generateShots();
            return;
        }
    }
}

function generateShots() {
    shots = [];
    let scenario = scenarios[currentScenario];

    // Bias direction (random angle for visual interest)
    let biasAngle = random(TWO_PI);
    let biasX = cos(biasAngle) * scenario.bias;
    let biasY = sin(biasAngle) * scenario.bias;

    for (let i = 0; i < numShots; i++) {
        // Generate shot with bias and variability
        let angle = random(TWO_PI);
        let distance = randomGaussian(0, scenario.variability);

        let x = targetCenterX + biasX + cos(angle) * abs(distance);
        let y = targetCenterY + biasY + sin(angle) * abs(distance);

        shots.push({ x: x, y: y });
    }
}

function randomGaussian(mean, sd) {
    // Box-Muller transform for normal distribution
    let u1 = random();
    let u2 = random();
    let z = sqrt(-2 * log(u1)) * cos(TWO_PI * u2);
    return mean + z * sd;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    targetCenterX = canvasWidth / 2;
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = min(containerWidth, 800);
    if (canvasWidth < 600) canvasWidth = 600;
}
