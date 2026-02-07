// Stratified vs. Cluster Sampling Comparison MicroSim
// Visual comparison of two probability sampling methods
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 650;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 15;
let defaultTextSize = 14;

// Population grid
let gridRows = 8;
let gridCols = 10;
let population = []; // 2D array of individuals
let cellSize;
let gridLeft, gridTop;

// Groups (strata for stratified, clusters for cluster sampling)
let numGroups = 4;
let groupColors = [
    [70, 130, 180],   // Steel blue
    [180, 100, 140],  // Mauve
    [100, 160, 100],  // Green
    [200, 150, 80]    // Gold
];

// Sampling mode
let samplingMode = 'stratified'; // 'stratified' or 'cluster'
let selectedIndividuals = [];
let selectedClusters = [];
let samplingComplete = false;

// Animation
let animationStep = 0;
let maxAnimationSteps = 20;
let isAnimating = false;

// Button positions
let buttonY;
let stratButtonX, clusterButtonX, sampleButtonX, resetButtonX;
let buttonWidth = 100;
let buttonHeight = 30;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    // Initialize population
    initializePopulation();

    describe('Interactive comparison of stratified and cluster sampling methods. Students toggle between methods and observe how each selects individuals from groups differently.', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area background
    fill(250, 252, 255);
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
    text('Stratified vs. Cluster Sampling', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Draw mode description
    drawModeDescription();

    // Draw population grid
    drawPopulationGrid();

    // Draw group legend
    drawGroupLegend();

    // Draw selection summary
    drawSelectionSummary();

    // Draw comparison table
    drawComparisonTable();

    // Draw controls
    drawControls();

    // Handle animation
    if (isAnimating) {
        animationStep++;
        if (animationStep >= maxAnimationSteps) {
            isAnimating = false;
            animationStep = 0;
        }
    }
}

function initializePopulation() {
    population = [];

    if (samplingMode === 'stratified') {
        // For stratified: groups are horizontal rows (strata)
        for (let r = 0; r < gridRows; r++) {
            let row = [];
            let group = floor(r / (gridRows / numGroups));
            for (let c = 0; c < gridCols; c++) {
                row.push({
                    group: group,
                    id: r * gridCols + c + 1
                });
            }
            population.push(row);
        }
    } else {
        // For cluster: groups are vertical columns (clusters)
        for (let r = 0; r < gridRows; r++) {
            let row = [];
            for (let c = 0; c < gridCols; c++) {
                let group = floor(c / (gridCols / numGroups));
                row.push({
                    group: group,
                    id: r * gridCols + c + 1
                });
            }
            population.push(row);
        }
    }

    selectedIndividuals = [];
    selectedClusters = [];
    samplingComplete = false;
}

function drawModeDescription() {
    let descY = 30;

    fill(30, 60, 100);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);

    if (samplingMode === 'stratified') {
        text('Stratified Sampling: Sample FROM each stratum', margin, descY);
        textStyle(NORMAL);
        fill(60);
        textSize(11);
        text('• Divide population into non-overlapping groups (strata)', margin, descY + 18);
        text('• Take a random sample from EACH stratum', margin, descY + 32);
        text('• Guarantees representation of all groups', margin, descY + 46);
    } else {
        text('Cluster Sampling: Select entire clusters', margin, descY);
        textStyle(NORMAL);
        fill(60);
        textSize(11);
        text('• Divide population into groups (clusters)', margin, descY + 18);
        text('• Randomly select SOME clusters', margin, descY + 32);
        text('• Include everyone in selected clusters', margin, descY + 46);
    }
}

function drawPopulationGrid() {
    gridLeft = margin;
    gridTop = 90;
    cellSize = min((canvasWidth - 250 - margin * 2) / gridCols, (drawHeight - gridTop - 80) / gridRows);

    // Draw grid labels
    fill(80);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(10);

    if (samplingMode === 'stratified') {
        // Label strata on the left
        for (let g = 0; g < numGroups; g++) {
            let startRow = g * (gridRows / numGroups);
            let endRow = (g + 1) * (gridRows / numGroups);
            let midY = gridTop + ((startRow + endRow) / 2) * cellSize;

            fill(groupColors[g][0], groupColors[g][1], groupColors[g][2]);
            textAlign(RIGHT, CENTER);
            text('Stratum ' + (g + 1), gridLeft - 5, midY);
        }
    } else {
        // Label clusters at the bottom
        for (let g = 0; g < numGroups; g++) {
            let startCol = g * (gridCols / numGroups);
            let endCol = (g + 1) * (gridCols / numGroups);
            let midX = gridLeft + ((startCol + endCol) / 2) * cellSize;

            fill(groupColors[g][0], groupColors[g][1], groupColors[g][2]);
            textAlign(CENTER, TOP);
            text('Cluster ' + (g + 1), midX, gridTop + gridRows * cellSize + 5);
        }
    }

    // Draw individuals
    for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
            let individual = population[r][c];
            let x = gridLeft + c * cellSize + cellSize / 2;
            let y = gridTop + r * cellSize + cellSize / 2;
            let radius = cellSize * 0.35;

            // Check if selected
            let isSelected = selectedIndividuals.includes(individual.id);

            // Check if in selected cluster
            let inSelectedCluster = selectedClusters.includes(individual.group);

            // Determine appearance
            if (isSelected) {
                // Selected individual
                fill(groupColors[individual.group][0],
                     groupColors[individual.group][1],
                     groupColors[individual.group][2]);
                stroke(30);
                strokeWeight(2);
                circle(x, y, radius * 2.2);

                // Checkmark
                stroke(255);
                strokeWeight(2);
                line(x - radius * 0.4, y, x - radius * 0.1, y + radius * 0.3);
                line(x - radius * 0.1, y + radius * 0.3, x + radius * 0.4, y - radius * 0.3);
            } else if (samplingMode === 'cluster' && inSelectedCluster && samplingComplete) {
                // In selected cluster but not yet animated
                let alpha = 255;
                fill(groupColors[individual.group][0],
                     groupColors[individual.group][1],
                     groupColors[individual.group][2], alpha);
                stroke(100);
                strokeWeight(1);
                circle(x, y, radius * 2);
            } else {
                // Not selected
                fill(groupColors[individual.group][0],
                     groupColors[individual.group][1],
                     groupColors[individual.group][2], 100);
                stroke(150);
                strokeWeight(1);
                circle(x, y, radius * 2);
            }
        }
    }

    // Draw stratum/cluster boundaries
    stroke(100);
    strokeWeight(2);
    noFill();

    if (samplingMode === 'stratified') {
        // Horizontal boundaries between strata
        for (let g = 1; g < numGroups; g++) {
            let y = gridTop + g * (gridRows / numGroups) * cellSize;
            line(gridLeft, y, gridLeft + gridCols * cellSize, y);
        }
    } else {
        // Vertical boundaries between clusters
        for (let g = 1; g < numGroups; g++) {
            let x = gridLeft + g * (gridCols / numGroups) * cellSize;
            line(x, gridTop, x, gridTop + gridRows * cellSize);
        }

        // Highlight selected clusters
        for (let cluster of selectedClusters) {
            let startCol = cluster * (gridCols / numGroups);
            let clusterWidth = (gridCols / numGroups) * cellSize;
            let x = gridLeft + startCol * cellSize;

            fill(groupColors[cluster][0], groupColors[cluster][1], groupColors[cluster][2], 30);
            stroke(groupColors[cluster][0], groupColors[cluster][1], groupColors[cluster][2]);
            strokeWeight(3);
            rect(x, gridTop, clusterWidth, gridRows * cellSize);
        }
    }
}

function drawGroupLegend() {
    let legendX = canvasWidth - 220;
    let legendY = 90;
    let legendWidth = 210;
    let legendHeight = 100;

    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(legendX, legendY, legendWidth, legendHeight, 5);

    fill(30, 60, 100);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text(samplingMode === 'stratified' ? 'Strata (Groups)' : 'Clusters (Groups)', legendX + 10, legendY + 8);
    textStyle(NORMAL);

    for (let g = 0; g < numGroups; g++) {
        let y = legendY + 28 + g * 18;

        fill(groupColors[g][0], groupColors[g][1], groupColors[g][2]);
        noStroke();
        circle(legendX + 20, y, 12);

        fill(60);
        textAlign(LEFT, CENTER);
        textSize(10);
        let label = samplingMode === 'stratified' ? 'Stratum ' : 'Cluster ';
        text(label + (g + 1) + ' (n=' + (gridRows * gridCols / numGroups) + ')', legendX + 35, y);
    }
}

function drawSelectionSummary() {
    let summaryX = canvasWidth - 220;
    let summaryY = 200;
    let summaryWidth = 210;
    let summaryHeight = 120;

    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(summaryX, summaryY, summaryWidth, summaryHeight, 5);

    fill(30, 100, 60);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Selection Summary', summaryX + 10, summaryY + 8);
    textStyle(NORMAL);

    fill(60);
    textSize(10);

    if (samplingComplete) {
        // Count by group
        let countByGroup = [0, 0, 0, 0];
        for (let r = 0; r < gridRows; r++) {
            for (let c = 0; c < gridCols; c++) {
                if (selectedIndividuals.includes(population[r][c].id)) {
                    countByGroup[population[r][c].group]++;
                }
            }
        }

        text('Total selected: ' + selectedIndividuals.length, summaryX + 10, summaryY + 28);

        for (let g = 0; g < numGroups; g++) {
            let label = samplingMode === 'stratified' ? 'Stratum ' : 'Cluster ';
            text(label + (g + 1) + ': ' + countByGroup[g] + ' selected', summaryX + 10, summaryY + 45 + g * 15);
        }

        if (samplingMode === 'cluster') {
            text('Clusters sampled: ' + selectedClusters.length + ' of ' + numGroups, summaryX + 10, summaryY + 100);
        }
    } else {
        text('Click "Select Sample" to run', summaryX + 10, summaryY + 28);
        text('the sampling process.', summaryX + 10, summaryY + 42);
    }
}

function drawComparisonTable() {
    let tableX = canvasWidth - 220;
    let tableY = 330;
    let tableWidth = 210;
    let tableHeight = 100;

    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(tableX, tableY, tableWidth, tableHeight, 5);

    fill(80, 60, 100);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(10);
    textStyle(BOLD);
    text('Key Differences', tableX + 10, tableY + 8);
    textStyle(NORMAL);

    fill(60);
    textSize(9);

    if (samplingMode === 'stratified') {
        text('✓ Uses ALL strata', tableX + 10, tableY + 25);
        text('✓ Samples FROM each', tableX + 10, tableY + 38);
        text('✓ Strata are homogeneous', tableX + 10, tableY + 51);
        text('✓ Goal: reduce variability', tableX + 10, tableY + 64);
        text('✓ Guarantees representation', tableX + 10, tableY + 77);
    } else {
        text('✓ Uses SOME clusters', tableX + 10, tableY + 25);
        text('✓ Takes everyone IN selected', tableX + 10, tableY + 38);
        text('✓ Clusters are heterogeneous', tableX + 10, tableY + 51);
        text('✓ Goal: reduce cost', tableX + 10, tableY + 64);
        text('✓ May miss some groups', tableX + 10, tableY + 77);
    }
}

function drawControls() {
    buttonY = drawHeight + 10;

    stratButtonX = margin;
    clusterButtonX = margin + buttonWidth + 10;
    sampleButtonX = margin + (buttonWidth + 10) * 2;
    resetButtonX = margin + (buttonWidth + 10) * 3;

    // Stratified button
    if (samplingMode === 'stratified') {
        fill(70, 130, 180);
        stroke(50, 100, 150);
    } else {
        fill(180, 180, 180);
        stroke(150);
    }
    strokeWeight(1);
    rect(stratButtonX, buttonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Stratified', stratButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);

    // Cluster button
    if (samplingMode === 'cluster') {
        fill(70, 130, 180);
        stroke(50, 100, 150);
    } else {
        fill(180, 180, 180);
        stroke(150);
    }
    strokeWeight(1);
    rect(clusterButtonX, buttonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    text('Cluster', clusterButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);

    // Select Sample button
    fill(80, 150, 80);
    stroke(60, 120, 60);
    strokeWeight(1);
    rect(sampleButtonX, buttonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    text('Select Sample', sampleButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);

    // Reset button
    fill(180, 100, 80);
    stroke(150, 80, 60);
    strokeWeight(1);
    rect(resetButtonX, buttonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    text('Reset', resetButtonX + buttonWidth / 2, buttonY + buttonHeight / 2);
}

function mousePressed() {
    // Check control button clicks
    if (mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
        // Stratified button
        if (mouseX >= stratButtonX && mouseX <= stratButtonX + buttonWidth) {
            if (samplingMode !== 'stratified') {
                samplingMode = 'stratified';
                initializePopulation();
            }
            return;
        }

        // Cluster button
        if (mouseX >= clusterButtonX && mouseX <= clusterButtonX + buttonWidth) {
            if (samplingMode !== 'cluster') {
                samplingMode = 'cluster';
                initializePopulation();
            }
            return;
        }

        // Select Sample button
        if (mouseX >= sampleButtonX && mouseX <= sampleButtonX + buttonWidth) {
            performSampling();
            return;
        }

        // Reset button
        if (mouseX >= resetButtonX && mouseX <= resetButtonX + buttonWidth) {
            initializePopulation();
            return;
        }
    }
}

function performSampling() {
    selectedIndividuals = [];
    selectedClusters = [];

    if (samplingMode === 'stratified') {
        // Select 2 individuals from each stratum
        for (let g = 0; g < numGroups; g++) {
            let stratumMembers = [];
            for (let r = 0; r < gridRows; r++) {
                for (let c = 0; c < gridCols; c++) {
                    if (population[r][c].group === g) {
                        stratumMembers.push(population[r][c].id);
                    }
                }
            }

            // Random selection from this stratum
            shuffleArray(stratumMembers);
            let selectCount = 2; // Select 2 from each stratum
            for (let i = 0; i < selectCount && i < stratumMembers.length; i++) {
                selectedIndividuals.push(stratumMembers[i]);
            }
        }
    } else {
        // Cluster sampling: select 2 entire clusters
        let clusterIndices = [0, 1, 2, 3];
        shuffleArray(clusterIndices);
        selectedClusters = clusterIndices.slice(0, 2); // Select 2 clusters

        // Include everyone in selected clusters
        for (let r = 0; r < gridRows; r++) {
            for (let c = 0; c < gridCols; c++) {
                if (selectedClusters.includes(population[r][c].group)) {
                    selectedIndividuals.push(population[r][c].id);
                }
            }
        }
    }

    samplingComplete = true;
    isAnimating = true;
    animationStep = 0;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = floor(random(i + 1));
        [array[i], array[j]] = [array[j], array[i]];
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
