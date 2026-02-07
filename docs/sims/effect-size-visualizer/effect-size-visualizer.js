// Effect Size Visualization MicroSim
// Shows two overlapping normal distributions and how Cohen's d relates to their separation
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 440;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 30;
let defaultTextSize = 14;

// Distribution parameters
let mean1 = 100;
let mean2 = 100;
let sd = 15;
let cohensD = 0;

// Slider
let sliderX, sliderY, sliderWidth;
let sliderMin = 0;
let sliderMax = 2.0;
let sliderValue = 0;
let isDragging = false;

// Curve drawing parameters
let curveStartX, curveEndX, curveY, curveHeight;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    // Calculate layout
    updateLayout();

    describe('Interactive visualization showing two normal distributions with adjustable separation. A slider controls Cohen d effect size from 0 to 2, showing how the overlap changes and what different effect sizes look like visually.', LABEL);
}

function updateLayout() {
    // Slider dimensions
    sliderWidth = min(400, canvasWidth - 200);
    sliderX = (canvasWidth - sliderWidth) / 2;
    sliderY = drawHeight + 35;

    // Curve area
    curveStartX = margin + 50;
    curveEndX = canvasWidth - margin - 50;
    curveY = 280;
    curveHeight = 180;
}

function draw() {
    updateCanvasSize();
    updateLayout();

    // Drawing area background
    fill(250, 250, 255);
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill(245, 245, 250);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Update mean2 based on slider
    cohensD = sliderValue;
    mean2 = mean1 + cohensD * sd;

    // Title
    fill(30, 60, 100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    textStyle(BOLD);
    text('Effect Size (Cohen\'s d) Visualizer', canvasWidth / 2, 10);
    textStyle(NORMAL);

    // Draw the distributions
    drawDistributions();

    // Draw statistics panel
    drawStatsPanel();

    // Draw the slider
    drawSlider();

    // Draw interpretation
    drawInterpretation();
}

function drawDistributions() {
    // Calculate x range (show about 4 SDs on each side of the combined range)
    let xMin = mean1 - 4 * sd;
    let xMax = max(mean2, mean1) + 4 * sd;

    // Draw axis
    stroke(100);
    strokeWeight(1);
    line(curveStartX, curveY, curveEndX, curveY);

    // Map function for x values
    let mapX = (val) => map(val, xMin, xMax, curveStartX, curveEndX);

    // Draw overlap region first (behind the curves)
    drawOverlapRegion(xMin, xMax, mapX);

    // Draw Group 1 distribution (blue)
    drawNormalCurve(mean1, sd, xMin, xMax, mapX, [66, 133, 244], 'Group 1');

    // Draw Group 2 distribution (orange)
    drawNormalCurve(mean2, sd, xMin, xMax, mapX, [255, 152, 0], 'Group 2');

    // Draw mean lines
    stroke(66, 133, 244);
    strokeWeight(2);
    let m1x = mapX(mean1);
    line(m1x, curveY, m1x, curveY - curveHeight * 0.9);

    stroke(255, 152, 0);
    let m2x = mapX(mean2);
    line(m2x, curveY, m2x, curveY - curveHeight * 0.9);

    // Mean labels
    fill(66, 133, 244);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    text('μ₁ = ' + mean1, m1x, curveY + 5);

    if (cohensD > 0.1) {
        fill(255, 152, 0);
        text('μ₂ = ' + mean2.toFixed(1), m2x, curveY + 18);
    }

    // X-axis labels
    fill(80);
    textSize(10);
    for (let val = 40; val <= 180; val += 20) {
        if (val >= xMin && val <= xMax) {
            let x = mapX(val);
            text(val, x, curveY + 35);
        }
    }

    // X-axis title
    textSize(12);
    text('Score', canvasWidth / 2, curveY + 50);
}

function drawNormalCurve(mean, sd, xMin, xMax, mapX, col, label) {
    // Draw filled curve
    fill(col[0], col[1], col[2], 80);
    stroke(col[0], col[1], col[2]);
    strokeWeight(2);

    beginShape();
    vertex(mapX(xMin), curveY);

    for (let x = xMin; x <= xMax; x += 0.5) {
        let y = normalPDF(x, mean, sd);
        let screenX = mapX(x);
        let screenY = curveY - y * curveHeight * sd * 10;
        vertex(screenX, screenY);
    }

    vertex(mapX(xMax), curveY);
    endShape(CLOSE);
}

function drawOverlapRegion(xMin, xMax, mapX) {
    // Find overlap region where both distributions have significant density
    let overlapStart = max(mean1 - 3 * sd, mean2 - 3 * sd);
    let overlapEnd = min(mean1 + 3 * sd, mean2 + 3 * sd);

    if (overlapStart < overlapEnd) {
        fill(150, 100, 200, 50);
        noStroke();

        beginShape();
        for (let x = overlapStart; x <= overlapEnd; x += 0.5) {
            let y1 = normalPDF(x, mean1, sd);
            let y2 = normalPDF(x, mean2, sd);
            let y = min(y1, y2);
            let screenX = mapX(x);
            let screenY = curveY - y * curveHeight * sd * 10;
            vertex(screenX, screenY);
        }
        vertex(mapX(overlapEnd), curveY);
        vertex(mapX(overlapStart), curveY);
        endShape(CLOSE);
    }
}

function normalPDF(x, mean, sd) {
    let z = (x - mean) / sd;
    return (1 / (sd * sqrt(TWO_PI))) * exp(-0.5 * z * z);
}

function drawStatsPanel() {
    // Stats box
    let boxX = canvasWidth - margin - 180;
    let boxY = 50;
    let boxWidth = 170;
    let boxHeight = 120;

    fill(255, 255, 255, 240);
    stroke(150);
    strokeWeight(1);
    rect(boxX, boxY, boxWidth, boxHeight, 5);

    // Title
    fill(30, 60, 100);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Statistics', boxX + 10, boxY + 10);
    textStyle(NORMAL);

    // Cohen's d
    textSize(11);
    fill(60);
    text("Cohen's d: " + cohensD.toFixed(2), boxX + 10, boxY + 35);

    // Formula
    textSize(10);
    fill(100);
    text('d = (μ₂ - μ₁) / σ', boxX + 10, boxY + 52);

    // Calculation
    if (cohensD > 0) {
        text('d = (' + mean2.toFixed(1) + ' - ' + mean1 + ') / ' + sd, boxX + 10, boxY + 67);
    }

    // Overlap percentage (approximation based on d)
    let overlap = calculateOverlap(cohensD);
    fill(60);
    textSize(11);
    text('Overlap: ~' + overlap.toFixed(0) + '%', boxX + 10, boxY + 90);

    // Interpretation label
    let interpretation = getInterpretation(cohensD);
    fill(interpretation.color[0], interpretation.color[1], interpretation.color[2]);
    textStyle(BOLD);
    text(interpretation.label, boxX + 10, boxY + 105);
    textStyle(NORMAL);
}

function calculateOverlap(d) {
    // Approximation of overlap percentage
    // This is a simplified calculation
    if (d === 0) return 100;
    if (d >= 3) return 0;

    // Use approximate formula: overlap ≈ 2 * Φ(-d/2) where Φ is standard normal CDF
    // Simplified approximation
    let overlap = 100 * (1 - 0.35 * d);
    return max(0, min(100, overlap));
}

function getInterpretation(d) {
    if (d < 0.2) {
        return { label: 'Negligible', color: [100, 100, 100] };
    } else if (d < 0.5) {
        return { label: 'Small Effect', color: [255, 193, 7] };
    } else if (d < 0.8) {
        return { label: 'Medium Effect', color: [255, 152, 0] };
    } else {
        return { label: 'Large Effect', color: [76, 175, 80] };
    }
}

function drawSlider() {
    // Slider label
    fill(30, 60, 100);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text("Cohen's d:", sliderX - 50, sliderY);
    textStyle(NORMAL);

    // Slider track
    stroke(180);
    strokeWeight(4);
    line(sliderX, sliderY, sliderX + sliderWidth, sliderY);

    // Slider colored portion
    let handleX = map(sliderValue, sliderMin, sliderMax, sliderX, sliderX + sliderWidth);
    stroke(70, 130, 180);
    strokeWeight(4);
    line(sliderX, sliderY, handleX, sliderY);

    // Slider handle
    fill(isDragging ? [50, 100, 150] : [70, 130, 180]);
    stroke(40, 80, 120);
    strokeWeight(2);
    circle(handleX, sliderY, 20);

    // Value display
    fill(255);
    noStroke();
    textSize(10);
    text(sliderValue.toFixed(1), handleX, sliderY);

    // Min/max labels
    fill(80);
    textSize(10);
    textAlign(RIGHT, CENTER);
    text('0', sliderX - 5, sliderY);
    textAlign(LEFT, CENTER);
    text('2.0', sliderX + sliderWidth + 5, sliderY);

    // Tick marks and labels
    textAlign(CENTER, TOP);
    for (let v = 0.2; v < 2.0; v += 0.2) {
        let x = map(v, sliderMin, sliderMax, sliderX, sliderX + sliderWidth);
        stroke(150);
        strokeWeight(1);
        line(x, sliderY + 8, x, sliderY + 12);

        // Label major ticks
        if (Math.abs(v - Math.round(v * 2) / 2) < 0.01) {
            fill(100);
            noStroke();
            textSize(9);
            text(v.toFixed(1), x, sliderY + 14);
        }
    }
}

function drawInterpretation() {
    // Interpretation guide at bottom
    let y = drawHeight + 60;

    fill(80);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);

    // Color-coded interpretation guide
    let guides = [
        { label: 'd < 0.2: Negligible', color: [100, 100, 100] },
        { label: '0.2 ≤ d < 0.5: Small', color: [255, 193, 7] },
        { label: '0.5 ≤ d < 0.8: Medium', color: [255, 152, 0] },
        { label: 'd ≥ 0.8: Large', color: [76, 175, 80] }
    ];

    let startX = canvasWidth / 2 - 200;
    let spacing = 110;

    for (let i = 0; i < guides.length; i++) {
        let x = startX + i * spacing;

        // Color dot
        fill(guides[i].color[0], guides[i].color[1], guides[i].color[2]);
        noStroke();
        circle(x - 30, y, 8);

        // Label
        fill(60);
        textAlign(LEFT, CENTER);
        text(guides[i].label, x - 22, y);
    }
}

function mousePressed() {
    checkSlider();
}

function mouseDragged() {
    if (isDragging) {
        updateSliderValue();
    }
}

function mouseReleased() {
    isDragging = false;
}

function checkSlider() {
    let handleX = map(sliderValue, sliderMin, sliderMax, sliderX, sliderX + sliderWidth);

    // Check if clicking on or near the handle
    if (dist(mouseX, mouseY, handleX, sliderY) < 15) {
        isDragging = true;
        updateSliderValue();
    }
    // Check if clicking on the track
    else if (mouseX >= sliderX && mouseX <= sliderX + sliderWidth &&
             mouseY >= sliderY - 10 && mouseY <= sliderY + 10) {
        isDragging = true;
        updateSliderValue();
    }
}

function updateSliderValue() {
    let newValue = map(mouseX, sliderX, sliderX + sliderWidth, sliderMin, sliderMax);
    sliderValue = constrain(newValue, sliderMin, sliderMax);
    // Round to 0.1
    sliderValue = round(sliderValue * 10) / 10;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    updateLayout();
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = min(containerWidth, 800);
    if (canvasWidth < 600) canvasWidth = 600;
}
