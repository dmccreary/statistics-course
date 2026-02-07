// Generalizability Target Diagram MicroSim
// Visualizes levels of generalizability from sample to broader populations
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 380;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 20;
let defaultTextSize = 14;

// Target center
let centerX, centerY;
let maxRadius = 150;

// Ring data
let rings = [
    {
        name: 'Your Sample',
        example: '50 students in Mr. Johnson\'s AP Stats class',
        color: [46, 125, 50], // Green - strong
        detail: 'This is where your data comes from. You can describe this group with certainty because you observed them directly.',
        radius: 0.15
    },
    {
        name: 'Sampling Frame',
        example: 'Students in local school district',
        color: [129, 199, 132], // Light green
        detail: 'If you used random sampling from this frame, you can generalize to this population. Check: Did every member have an equal chance of selection?',
        radius: 0.35
    },
    {
        name: 'Target Population',
        example: 'All AP Statistics students',
        color: [255, 193, 7], // Yellow - moderate
        detail: 'This is who you wanted to study. If your sampling frame matched this perfectly AND you used random sampling, you can generalize here.',
        radius: 0.55
    },
    {
        name: 'Broader Population',
        example: 'All high school students',
        color: [255, 152, 0], // Orange - weak
        detail: 'Generalizing this far requires careful justification. AP students may differ systematically from other students.',
        radius: 0.75
    },
    {
        name: 'Universal Claims',
        example: 'All students everywhere',
        color: [244, 67, 54], // Red - very weak
        detail: 'Almost never justified from a single study! Cultural, temporal, and contextual factors likely limit generalizability.',
        radius: 1.0
    }
];

// Scenarios
let scenarios = [
    {
        name: 'Random Sample from District',
        description: 'Randomly selected 200 students from all district schools',
        reachable: 2, // Can reach up to index 2 (Target Population)
        arrows: [0, 1, 2]
    },
    {
        name: 'Convenience Sample',
        description: 'Surveyed students in your own classroom',
        reachable: 0, // Can only describe the sample
        arrows: [0]
    },
    {
        name: 'National Random Sample',
        description: 'SRS of 1500 high school students nationwide',
        reachable: 3, // Can reach Broader Population
        arrows: [0, 1, 2, 3]
    }
];

let currentScenario = 0;
let selectedRing = null;
let hoveredRing = null;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    centerX = canvasWidth * 0.35;
    centerY = drawHeight / 2 + 20;

    describe('Interactive target diagram showing levels of generalizability from sample to universal claims. Click rings to see explanations and toggle scenarios to see how sampling method affects generalization.', LABEL);
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

    // Update center position
    centerX = min(canvasWidth * 0.35, 280);

    // Title
    fill(30, 60, 100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    textStyle(BOLD);
    text('Generalizability: How Far Can You Reach?', canvasWidth / 2, 10);
    textStyle(NORMAL);

    // Check for hover
    checkHover();

    // Draw the target rings
    drawRings();

    // Draw arrows for current scenario
    drawArrows();

    // Draw legend/info panel
    drawInfoPanel();

    // Draw scenario buttons
    drawControls();
}

function checkHover() {
    hoveredRing = null;
    let dist = sqrt(pow(mouseX - centerX, 2) + pow(mouseY - centerY, 2));

    // Check from outermost to innermost
    for (let i = rings.length - 1; i >= 0; i--) {
        let outerR = rings[i].radius * maxRadius;
        let innerR = i > 0 ? rings[i - 1].radius * maxRadius : 0;

        if (dist <= outerR && dist > innerR) {
            hoveredRing = i;
            break;
        }
    }
}

function drawRings() {
    let scenario = scenarios[currentScenario];

    // Draw rings from outside in
    for (let i = rings.length - 1; i >= 0; i--) {
        let ring = rings[i];
        let radius = ring.radius * maxRadius;

        // Determine if this ring is reachable
        let isReachable = i <= scenario.reachable;
        let isSelected = selectedRing === i;
        let isHovered = hoveredRing === i;

        // Ring color with transparency based on reachability
        let c = ring.color;
        if (!isReachable) {
            // Gray out unreachable rings
            fill(180, 180, 180, 150);
            stroke(150);
        } else if (isSelected) {
            fill(c[0], c[1], c[2], 255);
            stroke(c[0] * 0.7, c[1] * 0.7, c[2] * 0.7);
        } else if (isHovered) {
            fill(c[0], c[1], c[2], 200);
            stroke(c[0] * 0.8, c[1] * 0.8, c[2] * 0.8);
        } else {
            fill(c[0], c[1], c[2], 150);
            stroke(c[0] * 0.7, c[1] * 0.7, c[2] * 0.7);
        }

        strokeWeight(isSelected ? 3 : 1);
        circle(centerX, centerY, radius * 2);

        // Warning icon for unreachable rings
        if (!isReachable && i === scenario.reachable + 1) {
            fill(150);
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(16);
            let angle = -PI / 4;
            let r = (rings[i].radius + (i > 0 ? rings[i - 1].radius : 0)) / 2 * maxRadius;
            text('⚠', centerX + cos(angle) * r, centerY + sin(angle) * r);
        }
    }

    // Draw ring labels
    textAlign(LEFT, CENTER);
    textSize(10);

    for (let i = 0; i < rings.length; i++) {
        let ring = rings[i];
        let isReachable = i <= scenario.reachable;

        // Position labels on the right side
        let y = centerY - maxRadius + (i + 0.5) * (maxRadius * 2 / rings.length) * 0.5;
        let labelX = centerX + maxRadius + 20;

        fill(isReachable ? 60 : 150);
        textStyle(BOLD);
        text(ring.name, labelX, centerY - maxRadius * 0.8 + i * 35);
        textStyle(NORMAL);

        // Dashed line to ring (for unreachable)
        if (!isReachable) {
            stroke(180);
            strokeWeight(1);
            drawingContext.setLineDash([3, 3]);
            let ringEdge = centerX + ring.radius * maxRadius;
            line(ringEdge, centerY - maxRadius * 0.8 + i * 35, labelX - 5, centerY - maxRadius * 0.8 + i * 35);
            drawingContext.setLineDash([]);
        }
    }
}

function drawArrows() {
    let scenario = scenarios[currentScenario];

    // Draw arrows from center outward to reachable rings
    if (scenario.reachable >= 0) {
        stroke(46, 125, 50);
        strokeWeight(2);
        fill(46, 125, 50);

        // Arrow from center
        let arrowEnd = rings[scenario.reachable].radius * maxRadius * 0.9;
        line(centerX, centerY, centerX, centerY - arrowEnd + 10);

        // Arrowhead
        triangle(
            centerX, centerY - arrowEnd,
            centerX - 6, centerY - arrowEnd + 12,
            centerX + 6, centerY - arrowEnd + 12
        );

        // Label
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        text('Can generalize', centerX, centerY - arrowEnd - 12);
    }

    // Dashed line for can't generalize further
    if (scenario.reachable < rings.length - 1) {
        stroke(244, 67, 54);
        strokeWeight(1);
        drawingContext.setLineDash([4, 4]);

        let start = rings[scenario.reachable].radius * maxRadius;
        let end = maxRadius;
        line(centerX + start * 0.7, centerY - start * 0.7,
             centerX + end * 0.7, centerY - end * 0.7);

        drawingContext.setLineDash([]);

        // X mark
        fill(244, 67, 54);
        noStroke();
        textSize(14);
        text('✗', centerX + end * 0.75, centerY - end * 0.75);
    }
}

function drawInfoPanel() {
    // Info panel on the right
    let panelX = canvasWidth - margin - 220;
    let panelY = 50;
    let panelWidth = 210;
    let panelHeight = 160;

    fill(255, 255, 255, 240);
    stroke(150);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 5);

    // Scenario info
    let scenario = scenarios[currentScenario];

    fill(30, 60, 100);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Current Scenario:', panelX + 10, panelY + 10);
    textStyle(NORMAL);

    fill(70, 130, 180);
    textSize(12);
    text(scenario.name, panelX + 10, panelY + 28);

    fill(80);
    textSize(10);
    let wrapped = wrapText(scenario.description, panelWidth - 20);
    text(wrapped, panelX + 10, panelY + 48);

    // Ring detail if selected
    if (selectedRing !== null) {
        let ring = rings[selectedRing];
        let isReachable = selectedRing <= scenario.reachable;

        fill(ring.color[0], ring.color[1], ring.color[2]);
        textSize(11);
        textStyle(BOLD);
        text(ring.name, panelX + 10, panelY + 80);
        textStyle(NORMAL);

        fill(60);
        textSize(9);
        let detail = wrapText(ring.detail, panelWidth - 20);
        text(detail, panelX + 10, panelY + 98);
    } else {
        fill(100);
        textSize(10);
        textStyle(ITALIC);
        text('Click a ring for details', panelX + 10, panelY + 85);
        textStyle(NORMAL);
    }

    // Example panel below
    let exPanelY = panelY + panelHeight + 10;

    fill(255, 255, 255, 240);
    stroke(150);
    rect(panelX, exPanelY, panelWidth, 120, 5);

    fill(30, 60, 100);
    noStroke();
    textSize(10);
    textStyle(BOLD);
    text('Example (from center out):', panelX + 10, exPanelY + 10);
    textStyle(NORMAL);

    textSize(9);
    for (let i = 0; i < rings.length; i++) {
        let isReachable = i <= scenario.reachable;
        fill(isReachable ? rings[i].color : [150, 150, 150]);
        let symbol = isReachable ? '✓' : '✗';
        text(symbol + ' ' + rings[i].example, panelX + 10, exPanelY + 28 + i * 18);
    }
}

function wrapText(txt, maxWidth) {
    let words = txt.split(' ');
    let lines = [];
    let currentLine = '';

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

    return lines.slice(0, 4).join('\n');
}

function drawControls() {
    // Scenario toggle buttons
    let btnY = drawHeight + 25;
    let btnWidth = 180;
    let btnHeight = 35;
    let startX = (canvasWidth - (btnWidth * 3 + 20)) / 2;

    fill(60);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Select Scenario:', canvasWidth / 2, drawHeight + 10);

    for (let i = 0; i < scenarios.length; i++) {
        let x = startX + i * (btnWidth + 10);
        let isSelected = i === currentScenario;
        let isHover = mouseX >= x && mouseX <= x + btnWidth &&
                      mouseY >= btnY && mouseY <= btnY + btnHeight;

        if (isSelected) {
            fill(70, 130, 180);
        } else if (isHover) {
            fill(150, 180, 200);
        } else {
            fill(200, 210, 220);
        }

        stroke(100);
        strokeWeight(1);
        rect(x, btnY, btnWidth, btnHeight, 5);

        fill(isSelected ? 255 : 50);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        text(scenarios[i].name, x + btnWidth / 2, btnY + btnHeight / 2);
    }
}

function mousePressed() {
    // Check ring clicks
    let dist = sqrt(pow(mouseX - centerX, 2) + pow(mouseY - centerY, 2));

    for (let i = rings.length - 1; i >= 0; i--) {
        let outerR = rings[i].radius * maxRadius;
        let innerR = i > 0 ? rings[i - 1].radius * maxRadius : 0;

        if (dist <= outerR && dist > innerR) {
            selectedRing = (selectedRing === i) ? null : i;
            return;
        }
    }

    // Check scenario buttons
    let btnY = drawHeight + 25;
    let btnWidth = 180;
    let btnHeight = 35;
    let startX = (canvasWidth - (btnWidth * 3 + 20)) / 2;

    for (let i = 0; i < scenarios.length; i++) {
        let x = startX + i * (btnWidth + 10);
        if (mouseX >= x && mouseX <= x + btnWidth &&
            mouseY >= btnY && mouseY <= btnY + btnHeight) {
            currentScenario = i;
            selectedRing = null;
            return;
        }
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = min(containerWidth, 800);
    if (canvasWidth < 650) canvasWidth = 650;
}
