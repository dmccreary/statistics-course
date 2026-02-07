// Random Assignment Simulator MicroSim
// Practice random assignment by simulating the process of assigning units to groups
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 15;
let defaultTextSize = 12;

// Simulation parameters
let numUnits = 20;
let numGroups = 2;
let units = [];

// State
let currentUnitIndex = 0;
let isComplete = false;
let isAnimating = false;
let animationPhase = 0;
let animationProgress = 0;
let animationSpeed = 0.08;

// Random number display
let currentRandomNumber = null;

// Group containers
let groups = [];

// Colors
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';
let groupColors = ['#2E7D32', '#B5651D', '#1976D2'];
let unassignedColor = '#9E9E9E';

// Input areas
let unitsInputActive = false;
let groupsInputActive = false;
let unitsInputValue = '20';
let groupsInputValue = '2';

// Button positions
let assignOneButtonX, assignAllButtonX, resetButtonX;
let buttonWidth = 100;
let buttonHeight = 28;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    initializeSimulation();

    describe('Random assignment simulator for practicing the process of assigning experimental units to treatment groups using chance mechanisms.', LABEL);
}

function initializeSimulation() {
    units = [];
    groups = [];
    currentUnitIndex = 0;
    isComplete = false;
    currentRandomNumber = null;

    // Create units
    for (let i = 0; i < numUnits; i++) {
        units.push({
            id: i + 1,
            group: null,
            x: 0,
            y: 0
        });
    }

    // Create groups
    for (let i = 0; i < numGroups; i++) {
        groups.push({
            name: numGroups === 2 ? (i === 0 ? 'Treatment' : 'Control') : 'Group ' + String.fromCharCode(65 + i),
            units: [],
            color: groupColors[i % groupColors.length]
        });
    }
}

function draw() {
    updateCanvasSize();

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
    text('Random Assignment Simulator', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Draw parameter inputs
    drawParameterInputs();

    // Draw pool of units
    drawUnitPool();

    // Draw random number generator
    drawRandomGenerator();

    // Draw group containers
    drawGroupContainers();

    // Draw statistics
    drawStatistics();

    // Update animation
    if (isAnimating) {
        animationProgress += animationSpeed;
        if (animationProgress >= 1) {
            animationProgress = 0;
            animationPhase++;

            if (animationPhase >= 3) {
                // Complete assignment
                completeAssignment();
                isAnimating = false;
                animationPhase = 0;
            }
        }
    }

    // Draw controls
    drawControls();
}

function drawParameterInputs() {
    let inputY = 35;
    let inputWidth = 40;
    let inputHeight = 22;

    textAlign(LEFT, CENTER);
    textSize(12);

    // Number of units
    fill(60);
    noStroke();
    text('Units (1-30):', margin, inputY + inputHeight / 2);

    fill(unitsInputActive ? 255 : 245);
    stroke(unitsInputActive ? 'steelblue' : 150);
    strokeWeight(1);
    rect(margin + 85, inputY, inputWidth, inputHeight, 3);

    fill(30);
    noStroke();
    textAlign(CENTER, CENTER);
    text(unitsInputValue, margin + 85 + inputWidth / 2, inputY + inputHeight / 2);

    // Number of groups
    fill(60);
    textAlign(LEFT, CENTER);
    text('Groups (2-3):', margin + 145, inputY + inputHeight / 2);

    fill(groupsInputActive ? 255 : 245);
    stroke(groupsInputActive ? 'steelblue' : 150);
    strokeWeight(1);
    rect(margin + 230, inputY, inputWidth, inputHeight, 3);

    fill(30);
    noStroke();
    textAlign(CENTER, CENTER);
    text(groupsInputValue, margin + 230 + inputWidth / 2, inputY + inputHeight / 2);

    // Status
    fill(100);
    textAlign(LEFT, CENTER);
    textSize(11);
    let status = isComplete ? 'Assignment Complete!' : 'Assigned: ' + currentUnitIndex + ' / ' + numUnits;
    text(status, margin + 290, inputY + inputHeight / 2);
}

function drawUnitPool() {
    let poolX = margin;
    let poolY = 70;
    let poolWidth = 160;
    let poolHeight = 180;

    // Pool container
    fill(245);
    stroke(180);
    strokeWeight(1);
    rect(poolX, poolY, poolWidth, poolHeight, 5);

    // Pool label
    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Unassigned Units', poolX + poolWidth / 2, poolY + 5);
    textStyle(NORMAL);

    // Draw unassigned units
    let unassignedUnits = units.filter(u => u.group === null && units.indexOf(u) !== currentUnitIndex);
    let unitSize = 22;
    let unitsPerRow = 5;
    let spacing = 6;

    for (let i = 0; i < unassignedUnits.length; i++) {
        let ux = poolX + 20 + (i % unitsPerRow) * (unitSize + spacing);
        let uy = poolY + 28 + floor(i / unitsPerRow) * (unitSize + spacing);

        fill(unassignedColor);
        stroke(120);
        strokeWeight(1);
        ellipse(ux + unitSize / 2, uy + unitSize / 2, unitSize, unitSize);

        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(9);
        text(unassignedUnits[i].id, ux + unitSize / 2, uy + unitSize / 2);
    }

    // Highlight current unit being assigned
    if (!isComplete && currentUnitIndex < units.length) {
        let currentUnit = units[currentUnitIndex];
        if (currentUnit.group === null) {
            // Show in transit
            if (isAnimating && animationPhase >= 1) {
                // Unit is moving
            } else {
                // Unit waiting
                let highlightX = poolX + poolWidth / 2;
                let highlightY = poolY + poolHeight - 35;

                fill(255, 220, 100);
                stroke(200, 150, 0);
                strokeWeight(2);
                ellipse(highlightX, highlightY, 30, 30);

                fill(30);
                noStroke();
                textAlign(CENTER, CENTER);
                textSize(11);
                textStyle(BOLD);
                text(currentUnit.id, highlightX, highlightY);
                textStyle(NORMAL);

                fill(80);
                textSize(9);
                text('Next', highlightX, highlightY + 22);
            }
        }
    }
}

function drawRandomGenerator() {
    let genX = 190;
    let genY = 140;
    let genWidth = 130;
    let genHeight = 80;

    // Generator box
    fill(255);
    stroke(100);
    strokeWeight(2);
    rect(genX, genY, genWidth, genHeight, 8);

    // Title
    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    textStyle(BOLD);
    text('Random Generator', genX + genWidth / 2, genY + 5);
    textStyle(NORMAL);

    // Random number display
    fill(isAnimating && animationPhase === 0 ? color(255, 220, 100) : 240);
    stroke(150);
    strokeWeight(1);
    rect(genX + 20, genY + 25, genWidth - 40, 35, 5);

    if (currentRandomNumber !== null || (isAnimating && animationPhase >= 1)) {
        fill(30);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(20);
        textStyle(BOLD);

        if (isAnimating && animationPhase === 0) {
            // Show spinning numbers
            text(floor(random(numGroups)) + 1, genX + genWidth / 2, genY + 42);
        } else {
            text(currentRandomNumber, genX + genWidth / 2, genY + 42);
        }
        textStyle(NORMAL);
    } else {
        fill(150);
        textAlign(CENTER, CENTER);
        textSize(12);
        text('---', genX + genWidth / 2, genY + 42);
    }

    // Arrow to groups
    if (isAnimating && animationPhase >= 1) {
        stroke(sylviaGreen);
        strokeWeight(3);
        let arrowX = genX + genWidth;
        let arrowY = genY + genHeight / 2;

        let targetGroup = groups[currentRandomNumber - 1];
        let targetY = 70 + (groups.indexOf(targetGroup)) * 95 + 50;

        // Animated arrow
        let progress = animationPhase === 1 ? animationProgress : 1;
        let endX = arrowX + (340 - arrowX) * progress;

        line(arrowX, arrowY, endX, arrowY + (targetY - arrowY) * progress);

        // Arrowhead
        if (progress > 0.5) {
            fill(sylviaGreen);
            noStroke();
            triangle(endX, arrowY + (targetY - arrowY) * progress,
                endX - 10, arrowY + (targetY - arrowY) * progress - 5,
                endX - 10, arrowY + (targetY - arrowY) * progress + 5);
        }
    }
}

function drawGroupContainers() {
    let containerX = 340;
    let containerY = 70;
    let containerWidth = canvasWidth - containerX - margin;
    let containerHeight = 85;

    for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        let cy = containerY + i * (containerHeight + 10);

        // Highlight if this is the target
        let isTarget = isAnimating && animationPhase >= 1 && currentRandomNumber === i + 1;

        // Container
        fill(isTarget ? color(group.color + '40') : 255);
        stroke(group.color);
        strokeWeight(isTarget ? 3 : 2);
        rect(containerX, cy, containerWidth, containerHeight, 5);

        // Group label
        fill(group.color);
        noStroke();
        textAlign(LEFT, TOP);
        textSize(11);
        textStyle(BOLD);
        text(group.name + ' (n=' + group.units.length + ')', containerX + 10, cy + 5);
        textStyle(NORMAL);

        // Draw assigned units
        let unitSize = 20;
        let spacing = 5;
        let unitsPerRow = floor((containerWidth - 20) / (unitSize + spacing));

        for (let j = 0; j < group.units.length; j++) {
            let unit = group.units[j];
            let ux = containerX + 10 + (j % unitsPerRow) * (unitSize + spacing);
            let uy = cy + 25 + floor(j / unitsPerRow) * (unitSize + spacing);

            fill(group.color);
            stroke(red(color(group.color)) * 0.7, green(color(group.color)) * 0.7, blue(color(group.color)) * 0.7);
            strokeWeight(1);
            ellipse(ux + unitSize / 2, uy + unitSize / 2, unitSize, unitSize);

            fill(255);
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(9);
            text(unit.id, ux + unitSize / 2, uy + unitSize / 2);
        }
    }
}

function drawStatistics() {
    let statsX = margin;
    let statsY = 260;
    let statsWidth = 160;
    let statsHeight = 90;

    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(statsX, statsY, statsWidth, statsHeight, 5);

    fill(30, 60, 100);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Group Statistics', statsX + 10, statsY + 8);
    textStyle(NORMAL);

    textSize(10);
    let yOffset = 28;

    for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        let percentage = numUnits > 0 ? (group.units.length / numUnits * 100).toFixed(1) : 0;

        fill(group.color);
        text(group.name + ':', statsX + 10, statsY + yOffset + i * 16);

        fill(60);
        text(group.units.length + ' units (' + percentage + '%)', statsX + 75, statsY + yOffset + i * 16);
    }

    // Balance indicator
    if (isComplete && numGroups === 2) {
        let diff = abs(groups[0].units.length - groups[1].units.length);
        let balanced = diff <= 2;

        fill(balanced ? '#2E7D32' : '#FB8C00');
        textSize(10);
        text(balanced ? 'Well balanced!' : 'Slight imbalance', statsX + 10, statsY + statsHeight - 15);
    }
}

function drawControls() {
    assignOneButtonX = margin;
    assignAllButtonX = margin + buttonWidth + 10;
    resetButtonX = margin + (buttonWidth + 10) * 2;

    let buttonY = drawHeight + 11;

    // Assign One button
    if (isComplete || isAnimating) {
        fill(180);
        stroke(150);
    } else {
        fill(80, 150, 80);
        stroke(60, 120, 60);
    }
    strokeWeight(1);
    rect(assignOneButtonX, buttonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Assign One', assignOneButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);

    // Assign All button
    if (isComplete || isAnimating) {
        fill(180);
        stroke(150);
    } else {
        fill(100, 130, 180);
        stroke(70, 100, 150);
    }
    strokeWeight(1);
    rect(assignAllButtonX, buttonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    text('Assign All', assignAllButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);

    // Reset button
    fill(180, 100, 80);
    stroke(150, 80, 60);
    strokeWeight(1);
    rect(resetButtonX, buttonY, 70, buttonHeight, 5);

    fill(255);
    noStroke();
    text('Reset', resetButtonX + 35, buttonY + buttonHeight / 2);

    // Instructions
    fill(80);
    textSize(10);
    textAlign(LEFT, CENTER);
    text('Press SPACE to assign one unit', resetButtonX + 85, buttonY + buttonHeight / 2);
}

function assignOneUnit() {
    if (isComplete || isAnimating || currentUnitIndex >= units.length) return;

    // Generate random group
    currentRandomNumber = floor(random(numGroups)) + 1;

    // Start animation
    isAnimating = true;
    animationPhase = 0;
    animationProgress = 0;
}

function completeAssignment() {
    if (currentUnitIndex >= units.length) {
        isComplete = true;
        return;
    }

    let unit = units[currentUnitIndex];
    let groupIndex = currentRandomNumber - 1;

    unit.group = groupIndex;
    groups[groupIndex].units.push(unit);

    currentUnitIndex++;

    if (currentUnitIndex >= units.length) {
        isComplete = true;
    }
}

function assignAllUnits() {
    if (isComplete || isAnimating) return;

    while (currentUnitIndex < units.length) {
        let randomGroup = floor(random(numGroups));
        units[currentUnitIndex].group = randomGroup;
        groups[randomGroup].units.push(units[currentUnitIndex]);
        currentUnitIndex++;
    }

    isComplete = true;
    currentRandomNumber = null;
}

function updateParameters() {
    let newUnits = parseInt(unitsInputValue) || 20;
    let newGroups = parseInt(groupsInputValue) || 2;

    numUnits = constrain(newUnits, 1, 30);
    numGroups = constrain(newGroups, 2, 3);

    unitsInputValue = numUnits.toString();
    groupsInputValue = numGroups.toString();

    initializeSimulation();
}

function mousePressed() {
    // Check input clicks
    let inputY = 35;
    let inputWidth = 40;
    let inputHeight = 22;

    // Units input
    if (mouseX >= margin + 85 && mouseX <= margin + 85 + inputWidth &&
        mouseY >= inputY && mouseY <= inputY + inputHeight) {
        unitsInputActive = true;
        groupsInputActive = false;
        return;
    }

    // Groups input
    if (mouseX >= margin + 230 && mouseX <= margin + 230 + inputWidth &&
        mouseY >= inputY && mouseY <= inputY + inputHeight) {
        groupsInputActive = true;
        unitsInputActive = false;
        return;
    }

    // Deactivate inputs
    if (unitsInputActive || groupsInputActive) {
        unitsInputActive = false;
        groupsInputActive = false;
        updateParameters();
    }

    let buttonY = drawHeight + 11;

    // Assign One button
    if (mouseX >= assignOneButtonX && mouseX <= assignOneButtonX + buttonWidth &&
        mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
        assignOneUnit();
        return;
    }

    // Assign All button
    if (mouseX >= assignAllButtonX && mouseX <= assignAllButtonX + buttonWidth &&
        mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
        assignAllUnits();
        return;
    }

    // Reset button
    if (mouseX >= resetButtonX && mouseX <= resetButtonX + 70 &&
        mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
        initializeSimulation();
        return;
    }
}

function keyPressed() {
    if (unitsInputActive) {
        if (key >= '0' && key <= '9' && unitsInputValue.length < 2) {
            unitsInputValue += key;
        } else if (keyCode === BACKSPACE && unitsInputValue.length > 0) {
            unitsInputValue = unitsInputValue.slice(0, -1);
        } else if (keyCode === ENTER) {
            unitsInputActive = false;
            updateParameters();
        }
        return false;
    }

    if (groupsInputActive) {
        if (key >= '2' && key <= '3') {
            groupsInputValue = key;
        } else if (keyCode === ENTER) {
            groupsInputActive = false;
            updateParameters();
        }
        return false;
    }

    // Spacebar to assign one
    if (key === ' ') {
        assignOneUnit();
        return false;
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
    canvasWidth = min(containerWidth, 750);
    if (canvasWidth < 600) canvasWidth = 600;
}
