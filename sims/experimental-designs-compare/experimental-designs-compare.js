// Experimental Design Types Comparison MicroSim
// Interactive comparison of completely randomized, randomized block, and matched pairs designs
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 750;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 15;
let defaultTextSize = 12;

// Design types
let designTypes = [
    {
        name: 'Completely Randomized',
        description: 'Random assignment of all units to treatments',
        bestFor: 'Homogeneous experimental units',
        color: '#1976D2'
    },
    {
        name: 'Randomized Block',
        description: 'Group by characteristic, randomize within blocks',
        bestFor: 'Known source of variability',
        color: '#2E7D32'
    },
    {
        name: 'Matched Pairs',
        description: 'Pair similar units, randomize within pairs',
        bestFor: 'Two treatments with high individual variation',
        color: '#B5651D'
    }
];

// State
let selectedDesign = 0;
let isAnimating = false;
let animationProgress = 0;
let animationSpeed = 0.02;
let showAdvantages = false;

// Experimental units
let units = [];
let numUnits = 20;

// Button positions
let tabPositions = [];
let animateButtonX, advantagesButtonX;
let buttonWidth = 110;
let buttonHeight = 28;

// Treatment colors
let treatmentA = '#2E7D32';
let treatmentB = '#B5651D';
let unassigned = '#9E9E9E';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    initializeUnits();
    updateLayout();

    describe('Interactive comparison of three experimental design types: completely randomized, randomized block, and matched pairs with animated assignment process.', LABEL);
}

function updateLayout() {
    tabPositions = [];
    let tabWidth = (canvasWidth - margin * 2 - 20) / 3;

    for (let i = 0; i < designTypes.length; i++) {
        tabPositions.push({
            x: margin + i * (tabWidth + 10),
            y: 45,
            width: tabWidth,
            height: 35
        });
    }
}

function initializeUnits() {
    units = [];
    // Create units with blocking variable (ability: high, medium, low)
    let abilities = ['High', 'Medium', 'Low'];

    for (let i = 0; i < numUnits; i++) {
        units.push({
            id: i + 1,
            ability: abilities[floor(i / (numUnits / 3))],
            abilityIndex: floor(i / (numUnits / 3)),
            treatment: null,
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0
        });
    }

    resetAssignment();
}

function resetAssignment() {
    for (let unit of units) {
        unit.treatment = null;
    }
    animationProgress = 0;
    isAnimating = false;
}

function draw() {
    updateCanvasSize();
    updateLayout();

    // Drawing area background
    fill(252, 252, 255);
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
    textSize(16);
    textStyle(BOLD);
    text('Experimental Design Types', canvasWidth / 2, 10);
    textStyle(NORMAL);

    // Draw design tabs
    drawDesignTabs();

    // Draw main visualization area
    drawVisualization();

    // Draw info panel
    drawInfoPanel();

    // Update animation
    if (isAnimating) {
        animationProgress += animationSpeed;
        if (animationProgress >= 1) {
            animationProgress = 1;
            isAnimating = false;
            performAssignment();
        }
    }

    // Draw controls
    drawControls();
}

function drawDesignTabs() {
    for (let i = 0; i < designTypes.length; i++) {
        let tab = tabPositions[i];
        let design = designTypes[i];
        let isSelected = (selectedDesign === i);

        // Tab background
        if (isSelected) {
            fill(design.color);
            stroke(design.color);
        } else {
            fill(240);
            stroke(200);
        }
        strokeWeight(isSelected ? 2 : 1);
        rect(tab.x, tab.y, tab.width, tab.height, 5, 5, 0, 0);

        // Tab text
        fill(isSelected ? 255 : 80);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(11);
        textStyle(BOLD);
        text(design.name, tab.x + tab.width / 2, tab.y + tab.height / 2);
        textStyle(NORMAL);
    }
}

function drawVisualization() {
    let vizTop = 90;
    let vizHeight = 280;
    let vizBottom = vizTop + vizHeight;

    // Visualization container
    fill(255);
    stroke(designTypes[selectedDesign].color);
    strokeWeight(2);
    rect(margin, vizTop, canvasWidth - margin * 2, vizHeight, 0, 0, 8, 8);

    // Draw based on design type
    if (selectedDesign === 0) {
        drawCompletelyRandomized(margin + 10, vizTop + 10, canvasWidth - margin * 2 - 20, vizHeight - 20);
    } else if (selectedDesign === 1) {
        drawRandomizedBlock(margin + 10, vizTop + 10, canvasWidth - margin * 2 - 20, vizHeight - 20);
    } else {
        drawMatchedPairs(margin + 10, vizTop + 10, canvasWidth - margin * 2 - 20, vizHeight - 20);
    }
}

function drawCompletelyRandomized(x, y, w, h) {
    // Pool area
    let poolWidth = w * 0.35;
    let poolHeight = h - 30;

    fill(245);
    stroke(200);
    strokeWeight(1);
    rect(x, y + 15, poolWidth, poolHeight, 5);

    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    textStyle(BOLD);
    text('All Units (Pool)', x + poolWidth / 2, y);
    textStyle(NORMAL);

    // Draw units in pool or assigned
    let unitsPerRow = 5;
    let unitSize = 22;
    let unitSpacing = 8;

    // Pool units (unassigned)
    let poolUnits = units.filter(u => u.treatment === null);
    for (let i = 0; i < poolUnits.length; i++) {
        let ux = x + 15 + (i % unitsPerRow) * (unitSize + unitSpacing);
        let uy = y + 35 + floor(i / unitsPerRow) * (unitSize + unitSpacing);
        drawUnit(ux, uy, unitSize, poolUnits[i], false);
    }

    // Arrow
    let arrowX = x + poolWidth + 30;
    stroke(100);
    strokeWeight(2);
    line(arrowX, y + h / 2, arrowX + 50, y + h / 2);
    // Arrowhead
    line(arrowX + 40, y + h / 2 - 8, arrowX + 50, y + h / 2);
    line(arrowX + 40, y + h / 2 + 8, arrowX + 50, y + h / 2);

    // Random assignment indicator
    if (isAnimating) {
        fill(255, 200, 100, 200);
        noStroke();
        ellipse(arrowX + 25, y + h / 2, 30, 30);
        fill(80);
        textAlign(CENTER, CENTER);
        textSize(16);
        text('?', arrowX + 25, y + h / 2);
    }

    // Treatment groups
    let groupX = x + poolWidth + 100;
    let groupWidth = w - poolWidth - 120;
    let groupHeight = (poolHeight - 20) / 2;

    // Treatment A
    fill(color(treatmentA + '30'));
    stroke(treatmentA);
    strokeWeight(1);
    rect(groupX, y + 15, groupWidth, groupHeight, 5);

    fill(treatmentA);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    textStyle(BOLD);
    text('Treatment A', groupX + groupWidth / 2, y);
    textStyle(NORMAL);

    // Treatment B
    fill(color(treatmentB + '30'));
    stroke(treatmentB);
    rect(groupX, y + 25 + groupHeight, groupWidth, groupHeight, 5);

    fill(treatmentB);
    noStroke();
    text('Treatment B', groupX + groupWidth / 2, y + 10 + groupHeight);

    // Draw assigned units
    let treatmentAUnits = units.filter(u => u.treatment === 'A');
    let treatmentBUnits = units.filter(u => u.treatment === 'B');

    for (let i = 0; i < treatmentAUnits.length; i++) {
        let ux = groupX + 15 + (i % 5) * (unitSize + 5);
        let uy = y + 35 + floor(i / 5) * (unitSize + 5);
        drawUnit(ux, uy, unitSize, treatmentAUnits[i], true);
    }

    for (let i = 0; i < treatmentBUnits.length; i++) {
        let ux = groupX + 15 + (i % 5) * (unitSize + 5);
        let uy = y + 45 + groupHeight + floor(i / 5) * (unitSize + 5);
        drawUnit(ux, uy, unitSize, treatmentBUnits[i], true);
    }
}

function drawRandomizedBlock(x, y, w, h) {
    let blockHeight = (h - 40) / 3;
    let abilities = ['High Ability', 'Medium Ability', 'Low Ability'];
    let blockColors = ['#BBDEFB', '#C8E6C9', '#FFE0B2'];

    for (let b = 0; b < 3; b++) {
        let by = y + 20 + b * (blockHeight + 5);

        // Block background
        fill(blockColors[b]);
        stroke(150);
        strokeWeight(1);
        rect(x, by, w, blockHeight, 5);

        // Block label
        fill(80);
        noStroke();
        textAlign(LEFT, TOP);
        textSize(10);
        textStyle(BOLD);
        text('Block: ' + abilities[b], x + 10, by + 5);
        textStyle(NORMAL);

        // Divider
        stroke(150);
        strokeWeight(1);
        drawingContext.setLineDash([4, 4]);
        line(x + w / 2, by + 20, x + w / 2, by + blockHeight - 5);
        drawingContext.setLineDash([]);

        // Treatment labels
        textAlign(CENTER, TOP);
        textSize(9);
        fill(treatmentA);
        text('Treatment A', x + w * 0.25, by + 22);
        fill(treatmentB);
        text('Treatment B', x + w * 0.75, by + 22);

        // Units in this block
        let blockUnits = units.filter(u => u.abilityIndex === b);
        let treatmentAUnits = blockUnits.filter(u => u.treatment === 'A');
        let treatmentBUnits = blockUnits.filter(u => u.treatment === 'B');
        let unassignedUnits = blockUnits.filter(u => u.treatment === null);

        let unitSize = 20;

        // Draw assigned to A
        for (let i = 0; i < treatmentAUnits.length; i++) {
            let ux = x + 40 + i * 28;
            let uy = by + 40;
            drawUnit(ux, uy, unitSize, treatmentAUnits[i], true);
        }

        // Draw assigned to B
        for (let i = 0; i < treatmentBUnits.length; i++) {
            let ux = x + w / 2 + 40 + i * 28;
            let uy = by + 40;
            drawUnit(ux, uy, unitSize, treatmentBUnits[i], true);
        }

        // Draw unassigned (in center during animation)
        for (let i = 0; i < unassignedUnits.length; i++) {
            let ux = x + w / 2 - 30 + (i % 2) * 28;
            let uy = by + 40;
            drawUnit(ux, uy, unitSize, unassignedUnits[i], false);
        }
    }

    // Title
    fill(30, 60, 100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Random Assignment Within Each Block', x + w / 2, y);
    textStyle(NORMAL);
}

function drawMatchedPairs(x, y, w, h) {
    let pairWidth = w / 5 - 10;
    let pairHeight = h - 50;

    fill(30, 60, 100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Matched Pairs (Similar Units Paired Together)', x + w / 2, y);
    textStyle(NORMAL);

    // Create pairs from units
    let pairs = [];
    for (let i = 0; i < units.length; i += 2) {
        if (i + 1 < units.length) {
            pairs.push([units[i], units[i + 1]]);
        }
    }

    // Draw pairs (show first 5 pairs)
    for (let p = 0; p < min(pairs.length, 5); p++) {
        let px = x + 10 + p * (pairWidth + 15);
        let py = y + 30;

        // Pair container
        fill(240);
        stroke(150);
        strokeWeight(1);
        rect(px, py, pairWidth, pairHeight, 5);

        // Pair label
        fill(80);
        noStroke();
        textAlign(CENTER, TOP);
        textSize(9);
        textStyle(BOLD);
        text('Pair ' + (p + 1), px + pairWidth / 2, py + 5);
        textStyle(NORMAL);

        // Matching indicator
        textSize(8);
        fill(100);
        text('Same ability', px + pairWidth / 2, py + 18);

        // Connection line
        stroke(180);
        strokeWeight(2);
        line(px + pairWidth / 2, py + 50, px + pairWidth / 2, py + 100);

        // Random assignment symbol
        if (isAnimating) {
            fill(255, 200, 100);
            noStroke();
            ellipse(px + pairWidth / 2, py + 75, 20, 20);
            fill(80);
            textAlign(CENTER, CENTER);
            textSize(12);
            text('?', px + pairWidth / 2, py + 75);
        }

        // Unit positions
        let unitSize = 28;
        let unit1 = pairs[p][0];
        let unit2 = pairs[p][1];

        // Treatment labels
        textAlign(CENTER, TOP);
        textSize(8);
        if (unit1.treatment) {
            fill(unit1.treatment === 'A' ? treatmentA : treatmentB);
            text('Treatment ' + unit1.treatment, px + pairWidth / 2, py + 100);
        }
        if (unit2.treatment) {
            fill(unit2.treatment === 'A' ? treatmentA : treatmentB);
            text('Treatment ' + unit2.treatment, px + pairWidth / 2, py + 175);
        }

        // Draw units
        drawUnit(px + pairWidth / 2 - unitSize / 2, py + 38, unitSize, unit1, unit1.treatment !== null);
        drawUnit(px + pairWidth / 2 - unitSize / 2, py + 140, unitSize, unit2, unit2.treatment !== null);
    }

    // Show "more pairs" indicator
    if (pairs.length > 5) {
        fill(100);
        textAlign(CENTER, CENTER);
        textSize(10);
        text('... and ' + (pairs.length - 5) + ' more pairs', x + w - 60, y + pairHeight / 2 + 30);
    }
}

function drawUnit(x, y, size, unit, showTreatment) {
    let fillColor;
    if (unit.treatment === 'A') {
        fillColor = color(treatmentA);
    } else if (unit.treatment === 'B') {
        fillColor = color(treatmentB);
    } else {
        fillColor = color(unassigned);
    }

    fill(fillColor);
    stroke(red(fillColor) * 0.7, green(fillColor) * 0.7, blue(fillColor) * 0.7);
    strokeWeight(1);
    ellipse(x + size / 2, y + size / 2, size, size);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(size > 24 ? 10 : 8);
    text(unit.id, x + size / 2, y + size / 2);
}

function drawInfoPanel() {
    let panelY = 380;
    let panelHeight = 110;

    fill(255);
    stroke(designTypes[selectedDesign].color);
    strokeWeight(1);
    rect(margin, panelY, canvasWidth - margin * 2, panelHeight, 5);

    let design = designTypes[selectedDesign];

    fill(design.color);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text(design.name + ' Design', margin + 15, panelY + 10);
    textStyle(NORMAL);

    fill(60);
    textSize(11);
    text('Description: ' + design.description, margin + 15, panelY + 30);
    text('Best for: ' + design.bestFor, margin + 15, panelY + 48);

    if (showAdvantages) {
        let advantages = getAdvantages(selectedDesign);
        textSize(10);
        text('Key Advantage: ' + advantages, margin + 15, panelY + 70, canvasWidth - margin * 2 - 30, 40);
    }
}

function getAdvantages(designIndex) {
    let advantages = [
        'Simple to implement. Works well when experimental units are similar to each other.',
        'Controls for a known source of variability. Increases precision by comparing within homogeneous blocks.',
        'Eliminates individual differences by using each subject as their own control (or very similar subjects).'
    ];
    return advantages[designIndex];
}

function drawControls() {
    animateButtonX = margin;
    advantagesButtonX = margin + buttonWidth + 15;
    let buttonY = drawHeight + 11;

    // Animate button
    if (isAnimating) {
        fill(180);
        stroke(150);
    } else {
        fill(80, 150, 80);
        stroke(60, 120, 60);
    }
    strokeWeight(1);
    rect(animateButtonX, buttonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(isAnimating ? 'Assigning...' : 'Animate Assignment', animateButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);

    // Advantages toggle
    if (showAdvantages) {
        fill(181, 101, 29);
        stroke(139, 69, 19);
    } else {
        fill(100, 130, 180);
        stroke(70, 100, 150);
    }
    strokeWeight(1);
    rect(advantagesButtonX, buttonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    text(showAdvantages ? 'Hide Advantages' : 'Show Advantages', advantagesButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);

    // Reset button
    let resetX = advantagesButtonX + buttonWidth + 15;
    fill(180, 100, 80);
    stroke(150, 80, 60);
    strokeWeight(1);
    rect(resetX, buttonY, 70, buttonHeight, 5);

    fill(255);
    noStroke();
    text('Reset', resetX + 35, buttonY + buttonHeight / 2);

    // Legend
    let legendX = canvasWidth - 200;
    fill(80);
    textSize(10);
    textAlign(LEFT, CENTER);

    fill(treatmentA);
    noStroke();
    ellipse(legendX, buttonY + buttonHeight / 2, 12, 12);
    fill(80);
    text('Treatment A', legendX + 12, buttonY + buttonHeight / 2);

    fill(treatmentB);
    ellipse(legendX + 90, buttonY + buttonHeight / 2, 12, 12);
    fill(80);
    text('Treatment B', legendX + 102, buttonY + buttonHeight / 2);
}

function performAssignment() {
    // Assign treatments based on design
    if (selectedDesign === 0) {
        // Completely randomized - randomly assign each unit
        let shuffled = [...units];
        shuffleArray(shuffled);
        for (let i = 0; i < shuffled.length; i++) {
            shuffled[i].treatment = i < shuffled.length / 2 ? 'A' : 'B';
        }
    } else if (selectedDesign === 1) {
        // Randomized block - assign within each block
        for (let b = 0; b < 3; b++) {
            let blockUnits = units.filter(u => u.abilityIndex === b);
            shuffleArray(blockUnits);
            for (let i = 0; i < blockUnits.length; i++) {
                blockUnits[i].treatment = i < blockUnits.length / 2 ? 'A' : 'B';
            }
        }
    } else {
        // Matched pairs - assign within each pair
        for (let i = 0; i < units.length; i += 2) {
            if (i + 1 < units.length) {
                if (random() < 0.5) {
                    units[i].treatment = 'A';
                    units[i + 1].treatment = 'B';
                } else {
                    units[i].treatment = 'B';
                    units[i + 1].treatment = 'A';
                }
            }
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = floor(random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function mousePressed() {
    // Check tab clicks
    for (let i = 0; i < tabPositions.length; i++) {
        let tab = tabPositions[i];
        if (mouseX >= tab.x && mouseX <= tab.x + tab.width &&
            mouseY >= tab.y && mouseY <= tab.y + tab.height) {
            selectedDesign = i;
            resetAssignment();
            return;
        }
    }

    let buttonY = drawHeight + 11;

    // Animate button
    if (mouseX >= animateButtonX && mouseX <= animateButtonX + buttonWidth &&
        mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
        if (!isAnimating) {
            resetAssignment();
            isAnimating = true;
        }
        return;
    }

    // Advantages button
    if (mouseX >= advantagesButtonX && mouseX <= advantagesButtonX + buttonWidth &&
        mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
        showAdvantages = !showAdvantages;
        return;
    }

    // Reset button
    let resetX = advantagesButtonX + buttonWidth + 15;
    if (mouseX >= resetX && mouseX <= resetX + 70 &&
        mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
        resetAssignment();
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
    canvasWidth = min(containerWidth, 800);
    if (canvasWidth < 650) canvasWidth = 650;
}
