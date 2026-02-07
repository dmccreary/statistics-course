// Three Principles of Experimental Design MicroSim
// Interactive infographic showing Control, Randomization, and Replication
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 15;
let defaultTextSize = 12;

// Principle cards
let principles = [
    {
        name: 'Control',
        icon: 'lock',
        definition: 'Hold variables constant',
        color: '#1976D2',
        lightColor: '#BBDEFB',
        details: [
            'Same study time',
            'Same test conditions',
            'Same instructions',
            'Same environment'
        ],
        problem: 'Without control, you cannot tell if differences are due to the treatment or other factors.'
    },
    {
        name: 'Randomization',
        icon: 'dice',
        definition: 'Use chance to assign treatments',
        color: '#2E7D32',
        lightColor: '#C8E6C9',
        details: [
            'Balances known variables',
            'Balances unknown variables',
            'Prevents selection bias',
            'Uses chance mechanism'
        ],
        problem: 'Without randomization, groups may differ systematically, confounding results.'
    },
    {
        name: 'Replication',
        icon: 'people',
        definition: 'Use enough experimental units',
        color: '#B5651D',
        lightColor: '#FFE0B2',
        details: [
            'Reduces individual variation',
            'Increases precision',
            'Improves power',
            'Makes patterns visible'
        ],
        problem: 'Without replication, individual differences can overwhelm the treatment effect.'
    }
];

// State
let selectedPrinciple = -1;
let hoveredPrinciple = -1;
let showProblems = false;

// Card positions (calculated in updateLayout)
let cardWidth = 220;
let cardHeight = 280;
let cardY = 80;
let cardPositions = [];

// Demo area
let demoY = 60;
let demoHeight = 200;

// Button
let toggleButtonX, toggleButtonY;
let buttonWidth = 160;
let buttonHeight = 28;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    updateLayout();

    describe('Interactive infographic showing the three principles of experimental design: Control, Randomization, and Replication with visual demonstrations.', LABEL);
}

function updateLayout() {
    cardPositions = [];
    let totalWidth = principles.length * cardWidth + (principles.length - 1) * 20;
    let startX = (canvasWidth - totalWidth) / 2;

    for (let i = 0; i < principles.length; i++) {
        cardPositions.push({
            x: startX + i * (cardWidth + 20),
            y: cardY
        });
    }
}

function draw() {
    updateCanvasSize();
    updateLayout();

    // Drawing area background
    fill('#FFF8E1');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill(245, 245, 250);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill(30, 60, 100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    textStyle(BOLD);
    text('Three Principles of Experimental Design', canvasWidth / 2, 12);
    textStyle(NORMAL);

    textSize(12);
    fill(100);
    text('Click a principle to learn more', canvasWidth / 2, 38);

    // Draw principle cards
    drawPrincipleCards();

    // Draw demo area if principle selected
    if (selectedPrinciple >= 0) {
        drawDemoArea();
    }

    // Draw controls
    drawControls();
}

function drawPrincipleCards() {
    for (let i = 0; i < principles.length; i++) {
        let p = principles[i];
        let pos = cardPositions[i];
        let isSelected = (selectedPrinciple === i);
        let isHovered = (hoveredPrinciple === i);

        // Card shadow
        if (isSelected || isHovered) {
            fill(0, 0, 0, 30);
            noStroke();
            rect(pos.x + 4, pos.y + 4, cardWidth, cardHeight, 10);
        }

        // Card background
        fill(isSelected ? p.lightColor : (isHovered ? '#FAFAFA' : 255));
        stroke(isSelected ? p.color : (isHovered ? p.color : '#DDD'));
        strokeWeight(isSelected ? 3 : (isHovered ? 2 : 1));
        rect(pos.x, pos.y, cardWidth, cardHeight, 10);

        // Icon area
        fill(p.color);
        noStroke();
        ellipse(pos.x + cardWidth / 2, pos.y + 50, 60, 60);

        // Draw icon
        fill(255);
        drawIcon(p.icon, pos.x + cardWidth / 2, pos.y + 50);

        // Principle name
        fill(p.color);
        noStroke();
        textAlign(CENTER, TOP);
        textSize(16);
        textStyle(BOLD);
        text(p.name, pos.x + cardWidth / 2, pos.y + 90);
        textStyle(NORMAL);

        // Definition
        textSize(12);
        fill(60);
        text(p.definition, pos.x + cardWidth / 2, pos.y + 115);

        // Details or Problem
        textAlign(LEFT, TOP);
        textSize(11);

        if (showProblems) {
            fill(180, 50, 50);
            textStyle(BOLD);
            text('Without this:', pos.x + 15, pos.y + 145);
            textStyle(NORMAL);
            fill(100);
            text(p.problem, pos.x + 15, pos.y + 165, cardWidth - 30, 100);
        } else {
            fill(80);
            for (let j = 0; j < p.details.length; j++) {
                text('- ' + p.details[j], pos.x + 15, pos.y + 145 + j * 22);
            }
        }

        // Selection indicator
        if (isSelected) {
            fill(p.color);
            noStroke();
            triangle(
                pos.x + cardWidth / 2 - 10, pos.y + cardHeight,
                pos.x + cardWidth / 2 + 10, pos.y + cardHeight,
                pos.x + cardWidth / 2, pos.y + cardHeight + 10
            );
        }
    }
}

function drawIcon(iconType, x, y) {
    textAlign(CENTER, CENTER);

    if (iconType === 'lock') {
        // Lock icon
        strokeWeight(3);
        stroke(255);
        noFill();
        arc(x, y - 8, 18, 18, PI, TWO_PI);
        fill(255);
        noStroke();
        rect(x - 12, y - 2, 24, 18, 3);
        fill(100);
        ellipse(x, y + 4, 6, 6);
    } else if (iconType === 'dice') {
        // Dice icon
        fill(255);
        noStroke();
        rect(x - 12, y - 12, 24, 24, 4);
        fill(100);
        ellipse(x - 6, y - 6, 5, 5);
        ellipse(x + 6, y - 6, 5, 5);
        ellipse(x, y, 5, 5);
        ellipse(x - 6, y + 6, 5, 5);
        ellipse(x + 6, y + 6, 5, 5);
    } else if (iconType === 'people') {
        // Multiple people icon
        fill(255);
        noStroke();
        // Center person
        ellipse(x, y - 8, 12, 12);
        rect(x - 6, y, 12, 14, 3);
        // Left person
        ellipse(x - 16, y - 4, 10, 10);
        rect(x - 21, y + 4, 10, 12, 3);
        // Right person
        ellipse(x + 16, y - 4, 10, 10);
        rect(x + 11, y + 4, 10, 12, 3);
    }
}

function drawDemoArea() {
    let p = principles[selectedPrinciple];
    let demoAreaY = cardY + cardHeight + 20;
    let demoAreaHeight = drawHeight - demoAreaY - 10;

    // Demo container
    fill(255);
    stroke(p.color);
    strokeWeight(2);
    rect(margin, demoAreaY, canvasWidth - margin * 2, demoAreaHeight, 8);

    // Demo title
    fill(p.color);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text(p.name + ' in Action', margin + 15, demoAreaY + 10);
    textStyle(NORMAL);

    // Draw specific demo based on principle
    if (selectedPrinciple === 0) {
        drawControlDemo(margin + 15, demoAreaY + 35, canvasWidth - margin * 2 - 30, demoAreaHeight - 45);
    } else if (selectedPrinciple === 1) {
        drawRandomizationDemo(margin + 15, demoAreaY + 35, canvasWidth - margin * 2 - 30, demoAreaHeight - 45);
    } else if (selectedPrinciple === 2) {
        drawReplicationDemo(margin + 15, demoAreaY + 35, canvasWidth - margin * 2 - 30, demoAreaHeight - 45);
    }
}

function drawControlDemo(x, y, w, h) {
    // Show two groups with identical conditions except treatment
    let groupWidth = w / 2 - 20;

    // Treatment group
    fill(principles[0].lightColor);
    stroke(principles[0].color);
    strokeWeight(1);
    rect(x, y, groupWidth, h - 10, 5);

    fill(principles[0].color);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Treatment Group', x + groupWidth / 2, y + 5);
    textStyle(NORMAL);

    // Controlled variables
    textSize(10);
    fill(60);
    textAlign(LEFT, TOP);
    let vars = ['Time: 30 min', 'Room: Lab A', 'Test: Version 1', 'Instructor: Dr. S'];
    for (let i = 0; i < vars.length; i++) {
        text('= ' + vars[i], x + 10, y + 25 + i * 14);
    }
    fill(46, 125, 50);
    textStyle(BOLD);
    text('+ Treatment', x + 10, y + 25 + vars.length * 14 + 5);
    textStyle(NORMAL);

    // Control group
    let cx = x + groupWidth + 40;
    fill(220);
    stroke(150);
    rect(cx, y, groupWidth, h - 10, 5);

    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Control Group', cx + groupWidth / 2, y + 5);
    textStyle(NORMAL);

    textSize(10);
    fill(60);
    textAlign(LEFT, TOP);
    for (let i = 0; i < vars.length; i++) {
        text('= ' + vars[i], cx + 10, y + 25 + i * 14);
    }
    fill(150);
    text('(No treatment)', cx + 10, y + 25 + vars.length * 14 + 5);

    // Equal sign between groups
    fill(principles[0].color);
    textAlign(CENTER, CENTER);
    textSize(24);
    textStyle(BOLD);
    text('=', x + groupWidth + 20, y + h / 2 - 5);
    textStyle(NORMAL);
    textSize(10);
    text('except', x + groupWidth + 20, y + h / 2 + 15);
    text('treatment', x + groupWidth + 20, y + h / 2 + 27);
}

function drawRandomizationDemo(x, y, w, h) {
    // Show random assignment animation concept
    let poolX = x + 40;
    let poolY = y + 10;
    let poolWidth = 100;

    // Pool of subjects
    fill(220);
    stroke(150);
    strokeWeight(1);
    rect(poolX, poolY, poolWidth, h - 20, 5);

    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    textStyle(BOLD);
    text('All Subjects', poolX + poolWidth / 2, poolY + 5);
    textStyle(NORMAL);

    // Draw dots in pool
    for (let i = 0; i < 12; i++) {
        let dx = poolX + 15 + (i % 4) * 22;
        let dy = poolY + 25 + floor(i / 4) * 18;
        fill(100);
        noStroke();
        ellipse(dx, dy, 12, 12);
    }

    // Random assignment arrow
    let arrowX = poolX + poolWidth + 20;
    stroke(principles[1].color);
    strokeWeight(2);
    line(arrowX, y + h / 2, arrowX + 60, y + h / 2);
    // Dice on arrow
    fill(255);
    stroke(principles[1].color);
    rect(arrowX + 20, y + h / 2 - 12, 24, 24, 4);
    fill(principles[1].color);
    noStroke();
    textAlign(CENTER, CENTER);
    text('?', arrowX + 32, y + h / 2);

    // Two groups after randomization
    let group1X = arrowX + 80;
    let group2X = group1X + 120;
    let groupW = 100;

    // Group A
    fill(principles[1].lightColor);
    stroke(principles[1].color);
    strokeWeight(1);
    rect(group1X, poolY, groupW, h - 20, 5);

    fill(principles[1].color);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    textStyle(BOLD);
    text('Group A', group1X + groupW / 2, poolY + 5);
    textStyle(NORMAL);

    // Dots in Group A
    for (let i = 0; i < 6; i++) {
        let dx = group1X + 15 + (i % 3) * 28;
        let dy = poolY + 25 + floor(i / 3) * 22;
        fill(46, 125, 50);
        noStroke();
        ellipse(dx, dy, 12, 12);
    }

    // Group B
    fill('#FFE0B2');
    stroke('#B5651D');
    rect(group2X, poolY, groupW, h - 20, 5);

    fill('#B5651D');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    textStyle(BOLD);
    text('Group B', group2X + groupW / 2, poolY + 5);
    textStyle(NORMAL);

    // Dots in Group B
    for (let i = 0; i < 6; i++) {
        let dx = group2X + 15 + (i % 3) * 28;
        let dy = poolY + 25 + floor(i / 3) * 22;
        fill(181, 101, 29);
        noStroke();
        ellipse(dx, dy, 12, 12);
    }

    // Explanation
    fill(60);
    textSize(10);
    textAlign(CENTER, TOP);
    text('Chance mechanism balances both known and unknown variables', x + w / 2, y + h - 18);
}

function drawReplicationDemo(x, y, w, h) {
    // Show small vs large sample
    let smallX = x + 30;
    let largeX = x + w / 2 + 30;
    let areaWidth = w / 2 - 60;

    // Small sample
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(smallX, y, areaWidth, h - 25, 5);

    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    textStyle(BOLD);
    text('n = 3', smallX + areaWidth / 2, y + 5);
    textStyle(NORMAL);

    // Draw small sample
    for (let i = 0; i < 3; i++) {
        let dx = smallX + 30 + i * 45;
        fill(principles[2].color);
        noStroke();
        ellipse(dx, y + 40, 20, 20);
    }

    // Result bar - high variability
    fill(255);
    stroke(principles[2].color);
    rect(smallX + 20, y + 65, areaWidth - 40, 25, 3);
    fill(principles[2].lightColor);
    noStroke();
    rect(smallX + 25, y + 70, areaWidth - 50, 15, 2);

    textSize(9);
    fill(100);
    textAlign(CENTER, CENTER);
    text('High variability', smallX + areaWidth / 2, y + 77);

    // Large sample
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(largeX, y, areaWidth, h - 25, 5);

    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    textStyle(BOLD);
    text('n = 30', largeX + areaWidth / 2, y + 5);
    textStyle(NORMAL);

    // Draw large sample
    for (let i = 0; i < 30; i++) {
        let dx = largeX + 12 + (i % 10) * 15;
        let dy = y + 28 + floor(i / 10) * 12;
        fill(principles[2].color);
        noStroke();
        ellipse(dx, dy, 8, 8);
    }

    // Result bar - low variability
    fill(255);
    stroke(principles[2].color);
    rect(largeX + 20, y + 65, areaWidth - 40, 25, 3);
    fill(principles[2].color);
    noStroke();
    let resultWidth = (areaWidth - 50) * 0.4;
    rect(largeX + 25 + (areaWidth - 50 - resultWidth) / 2, y + 70, resultWidth, 15, 2);

    textSize(9);
    fill(255);
    textAlign(CENTER, CENTER);
    text('Low variability', largeX + areaWidth / 2, y + 77);

    // Bottom label
    fill(60);
    textSize(10);
    textAlign(CENTER, TOP);
    text('More subjects = More precise estimates of treatment effect', x + w / 2, y + h - 18);
}

function drawControls() {
    toggleButtonX = canvasWidth / 2 - buttonWidth / 2;
    toggleButtonY = drawHeight + 11;

    // Toggle button
    if (showProblems) {
        fill(180, 80, 80);
        stroke(150, 60, 60);
    } else {
        fill(100, 130, 180);
        stroke(70, 100, 150);
    }
    strokeWeight(1);
    rect(toggleButtonX, toggleButtonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(showProblems ? 'Show Details' : 'Show Problems Without', toggleButtonX + buttonWidth / 2, toggleButtonY + buttonHeight / 2);

    // Instructions
    fill(80);
    textSize(10);
    textAlign(LEFT, CENTER);
    text('Click cards to see demonstrations', margin, toggleButtonY + buttonHeight / 2);
}

function mouseMoved() {
    hoveredPrinciple = -1;

    for (let i = 0; i < cardPositions.length; i++) {
        let pos = cardPositions[i];
        if (mouseX >= pos.x && mouseX <= pos.x + cardWidth &&
            mouseY >= pos.y && mouseY <= pos.y + cardHeight) {
            hoveredPrinciple = i;
            break;
        }
    }
}

function mousePressed() {
    // Check card clicks
    for (let i = 0; i < cardPositions.length; i++) {
        let pos = cardPositions[i];
        if (mouseX >= pos.x && mouseX <= pos.x + cardWidth &&
            mouseY >= pos.y && mouseY <= pos.y + cardHeight) {
            selectedPrinciple = (selectedPrinciple === i) ? -1 : i;
            return;
        }
    }

    // Check toggle button
    if (mouseX >= toggleButtonX && mouseX <= toggleButtonX + buttonWidth &&
        mouseY >= toggleButtonY && mouseY <= toggleButtonY + buttonHeight) {
        showProblems = !showProblems;
    }
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
    canvasWidth = min(containerWidth, 850);
    if (canvasWidth < 720) canvasWidth = 720;
}
