// Undercoverage Visualization MicroSim
// Demonstrates how incomplete sampling frames lead to biased estimates
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 600;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 15;
let defaultTextSize = 14;

// Population data
let populationSize = 100;
let population = []; // Array of {covered: boolean, value: number}
let sample = [];

// Parameters controlled by sliders
let undercoveragePercent = 20; // Percentage of population that is undercovered
let valueDifference = 30; // Difference in mean value between covered and undercovered groups

// True values
let truePopulationMean = 0;
let coveredMean = 0;
let undercoveredMean = 0;
let sampleMean = 0;
let bias = 0;

// Visual layout
let populationAreaX, populationAreaWidth;
let sampleAreaX, sampleAreaWidth;
let dotRadius = 6;

// UI state
let samplingDone = false;

// Control positions
let undercoverageSliderX, undercoverageSliderY, sliderWidth;
let differenceSliderX, differenceSliderY;
let sampleButtonX, sampleButtonY, buttonWidth, buttonHeight;

// Slider interaction
let draggingUndercoverage = false;
let draggingDifference = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    // Generate initial population
    generatePopulation();

    describe('Interactive visualization showing how undercoverage in sampling frames leads to biased estimates. Students adjust the percentage of undercovered population and see the resulting bias.', LABEL);
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
    text('Undercoverage and Sampling Bias', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Draw population visualization
    drawPopulation();

    // Draw sample visualization
    drawSample();

    // Draw statistics panel
    drawStatistics();

    // Draw controls
    drawControls();
}

function generatePopulation() {
    population = [];
    let numUndercovered = floor(populationSize * undercoveragePercent / 100);
    let numCovered = populationSize - numUndercovered;

    // Covered population: values centered around 50
    coveredMean = 50;
    for (let i = 0; i < numCovered; i++) {
        population.push({
            covered: true,
            value: randomGaussian(coveredMean, 10),
            x: 0,
            y: 0
        });
    }

    // Undercovered population: values differ by the specified amount
    undercoveredMean = coveredMean + valueDifference;
    for (let i = 0; i < numUndercovered; i++) {
        population.push({
            covered: false,
            value: randomGaussian(undercoveredMean, 10),
            x: 0,
            y: 0
        });
    }

    // Calculate true population mean
    truePopulationMean = population.reduce((sum, p) => sum + p.value, 0) / population.length;

    // Shuffle population for random positioning
    shuffleArray(population);

    // Assign positions
    assignPositions();

    sample = [];
    samplingDone = false;
    sampleMean = 0;
    bias = 0;
}

function assignPositions() {
    populationAreaX = margin;
    populationAreaWidth = (canvasWidth - margin * 3) / 2;

    let areaTop = 60;
    let areaHeight = 180;

    let cols = 10;
    let rows = ceil(populationSize / cols);
    let cellWidth = populationAreaWidth / cols;
    let cellHeight = areaHeight / rows;

    for (let i = 0; i < population.length; i++) {
        let col = i % cols;
        let row = floor(i / cols);
        population[i].x = populationAreaX + col * cellWidth + cellWidth / 2;
        population[i].y = areaTop + row * cellHeight + cellHeight / 2;
    }
}

function drawPopulation() {
    populationAreaX = margin;
    populationAreaWidth = (canvasWidth - margin * 3) / 2;

    let areaTop = 35;
    let areaHeight = 200;

    // Population area background
    fill(255, 255, 255, 200);
    stroke(150);
    strokeWeight(1);
    rect(populationAreaX, areaTop, populationAreaWidth, areaHeight, 5);

    // Title
    fill(30, 60, 100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Population (N=' + populationSize + ')', populationAreaX + populationAreaWidth / 2, areaTop + 5);
    textStyle(NORMAL);

    // Legend
    textSize(10);
    textAlign(LEFT, CENTER);

    // Covered legend
    fill(70, 150, 130);
    noStroke();
    circle(populationAreaX + 15, areaTop + 30, 10);
    fill(60);
    text('Covered (' + (100 - undercoveragePercent) + '%)', populationAreaX + 25, areaTop + 30);

    // Undercovered legend
    fill(180, 100, 100, 150);
    stroke(180, 100, 100);
    strokeWeight(1);
    circle(populationAreaX + 120, areaTop + 30, 10);
    fill(60);
    noStroke();
    text('Undercovered (' + undercoveragePercent + '%)', populationAreaX + 130, areaTop + 30);

    // Draw population dots
    let dotAreaTop = areaTop + 45;
    let cols = 10;
    let cellWidth = populationAreaWidth / cols;
    let cellHeight = 15;

    for (let i = 0; i < population.length; i++) {
        let col = i % cols;
        let row = floor(i / cols);
        let x = populationAreaX + col * cellWidth + cellWidth / 2;
        let y = dotAreaTop + row * cellHeight + cellHeight / 2;

        let p = population[i];

        if (p.covered) {
            // Covered - solid color
            fill(70, 150, 130);
            noStroke();
        } else {
            // Undercovered - faded with X
            fill(180, 100, 100, 100);
            stroke(180, 100, 100);
            strokeWeight(1);
        }

        circle(x, y, dotRadius * 2);

        // Draw X over undercovered
        if (!p.covered) {
            stroke(150, 70, 70);
            strokeWeight(1.5);
            let s = dotRadius * 0.6;
            line(x - s, y - s, x + s, y + s);
            line(x - s, y + s, x + s, y - s);
        }

        // Update stored position for sampling animation
        population[i].x = x;
        population[i].y = y;
    }
}

function drawSample() {
    sampleAreaX = margin * 2 + populationAreaWidth;
    sampleAreaWidth = populationAreaWidth;

    let areaTop = 35;
    let areaHeight = 200;

    // Sample area background
    fill(255, 255, 255, 200);
    stroke(150);
    strokeWeight(1);
    rect(sampleAreaX, areaTop, sampleAreaWidth, areaHeight, 5);

    // Title
    fill(30, 100, 60);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Sample (from covered only)', sampleAreaX + sampleAreaWidth / 2, areaTop + 5);
    textStyle(NORMAL);

    if (!samplingDone) {
        fill(120);
        textSize(11);
        textAlign(CENTER, CENTER);
        text('Click "Take Sample" to\nselect from covered population', sampleAreaX + sampleAreaWidth / 2, areaTop + areaHeight / 2);
        return;
    }

    // Draw sample dots
    let dotAreaTop = areaTop + 30;
    let cols = 5;
    let cellWidth = sampleAreaWidth / cols;
    let cellHeight = 25;

    for (let i = 0; i < sample.length; i++) {
        let col = i % cols;
        let row = floor(i / cols);
        let x = sampleAreaX + col * cellWidth + cellWidth / 2;
        let y = dotAreaTop + row * cellHeight + cellHeight / 2;

        fill(70, 150, 130);
        noStroke();
        circle(x, y, dotRadius * 2);
    }

    // Sample info
    fill(60);
    textSize(10);
    textAlign(LEFT, TOP);
    text('n = ' + sample.length, sampleAreaX + 10, areaTop + areaHeight - 25);
}

function drawStatistics() {
    let statsX = margin;
    let statsY = 245;
    let statsWidth = canvasWidth - margin * 2;
    let statsHeight = drawHeight - statsY - 10;

    // Stats background
    fill(255, 255, 255, 240);
    stroke(150);
    strokeWeight(1);
    rect(statsX, statsY, statsWidth, statsHeight, 5);

    // Title
    fill(30, 60, 100);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Results', statsX + 10, statsY + 8);
    textStyle(NORMAL);

    // Column positions
    let col1 = statsX + 15;
    let col2 = statsX + statsWidth / 3;
    let col3 = statsX + statsWidth * 2 / 3;

    textSize(11);

    // Row 1: Group means
    fill(80);
    textAlign(LEFT, TOP);
    text('Covered mean:', col1, statsY + 28);
    text(coveredMean.toFixed(1), col1 + 95, statsY + 28);

    text('Undercovered mean:', col2, statsY + 28);
    fill(valueDifference > 0 ? [180, 100, 100] : [100, 150, 100]);
    text(undercoveredMean.toFixed(1), col2 + 125, statsY + 28);

    // Row 2: True vs Sample
    fill(80);
    text('True population mean:', col1, statsY + 48);
    fill(30, 80, 150);
    textStyle(BOLD);
    text(truePopulationMean.toFixed(1), col1 + 135, statsY + 48);
    textStyle(NORMAL);

    if (samplingDone) {
        fill(80);
        text('Sample mean:', col2, statsY + 48);
        fill(30, 130, 80);
        textStyle(BOLD);
        text(sampleMean.toFixed(1), col2 + 85, statsY + 48);
        textStyle(NORMAL);

        // Bias calculation
        fill(80);
        text('Bias (sample - true):', col3, statsY + 48);

        let biasColor = abs(bias) < 2 ? [60, 140, 60] : (abs(bias) < 5 ? [180, 140, 40] : [180, 60, 60]);
        fill(biasColor);
        textStyle(BOLD);
        text((bias >= 0 ? '+' : '') + bias.toFixed(1), col3 + 130, statsY + 48);
        textStyle(NORMAL);
    }

    // Explanation
    fill(100);
    textSize(10);
    textAlign(LEFT, TOP);

    if (samplingDone) {
        let explanation = '';
        if (valueDifference > 0) {
            explanation = 'The undercovered group has higher values. Since they\'re excluded, the sample UNDERestimates the true mean.';
        } else if (valueDifference < 0) {
            explanation = 'The undercovered group has lower values. Since they\'re excluded, the sample OVERestimates the true mean.';
        } else {
            explanation = 'The groups have equal means, so undercoverage doesn\'t cause bias in this case.';
        }
        text(explanation, col1, statsY + 75, statsWidth - 30, 40);
    } else {
        text('Adjust the sliders below, then click "Take Sample" to see how undercoverage affects estimates.', col1, statsY + 75, statsWidth - 30, 40);
    }

    // Historical example callout
    fill(60, 60, 100);
    textSize(9);
    textAlign(LEFT, TOP);
    text('Example: 1936 Literary Digest poll used phone/car registrations, missing lower-income FDR supporters', col1, statsY + 110);
}

function drawControls() {
    buttonHeight = 28;
    buttonWidth = 100;

    // Slider dimensions
    sliderWidth = 150;
    let sliderHeight = 8;
    let knobRadius = 10;

    // Undercoverage slider
    undercoverageSliderX = margin + 140;
    undercoverageSliderY = drawHeight + 12;

    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Undercovered: ' + undercoveragePercent + '%', margin, drawHeight + 25);

    // Slider track
    fill(200);
    noStroke();
    rect(undercoverageSliderX, undercoverageSliderY + 5, sliderWidth, sliderHeight, 4);

    // Slider knob
    let undercoverageKnobX = map(undercoveragePercent, 0, 50, undercoverageSliderX, undercoverageSliderX + sliderWidth);
    fill(draggingUndercoverage ? 100 : 70, 130, 180);
    stroke(50, 100, 150);
    strokeWeight(1);
    circle(undercoverageKnobX, undercoverageSliderY + 9, knobRadius * 2);

    // Difference slider
    differenceSliderX = margin + 140;
    differenceSliderY = drawHeight + 32;

    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Value difference: ' + (valueDifference >= 0 ? '+' : '') + valueDifference, margin, drawHeight + 45);

    // Slider track
    fill(200);
    noStroke();
    rect(differenceSliderX, differenceSliderY + 5, sliderWidth, sliderHeight, 4);

    // Slider knob
    let differenceKnobX = map(valueDifference, -30, 30, differenceSliderX, differenceSliderX + sliderWidth);
    fill(draggingDifference ? 180 : 150, 100, 100);
    stroke(120, 70, 70);
    strokeWeight(1);
    circle(differenceKnobX, differenceSliderY + 9, knobRadius * 2);

    // Take Sample button
    sampleButtonX = undercoverageSliderX + sliderWidth + 40;
    sampleButtonY = drawHeight + 11;

    fill(80, 150, 80);
    stroke(60, 120, 60);
    strokeWeight(1);
    rect(sampleButtonX, sampleButtonY, buttonWidth, buttonHeight, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text('Take Sample', sampleButtonX + buttonWidth / 2, sampleButtonY + buttonHeight / 2);

    // Reset button
    let resetButtonX = sampleButtonX + buttonWidth + 10;

    fill(180, 100, 80);
    stroke(150, 80, 60);
    strokeWeight(1);
    rect(resetButtonX, sampleButtonY, 70, buttonHeight, 5);

    fill(255);
    noStroke();
    text('Reset', resetButtonX + 35, sampleButtonY + buttonHeight / 2);
}

function mousePressed() {
    let knobRadius = 10;

    // Check undercoverage slider
    let undercoverageKnobX = map(undercoveragePercent, 0, 50, undercoverageSliderX, undercoverageSliderX + sliderWidth);
    if (dist(mouseX, mouseY, undercoverageKnobX, undercoverageSliderY + 9) < knobRadius + 5) {
        draggingUndercoverage = true;
        return;
    }

    // Check difference slider
    let differenceKnobX = map(valueDifference, -30, 30, differenceSliderX, differenceSliderX + sliderWidth);
    if (dist(mouseX, mouseY, differenceKnobX, differenceSliderY + 9) < knobRadius + 5) {
        draggingDifference = true;
        return;
    }

    // Check Take Sample button
    if (mouseX >= sampleButtonX && mouseX <= sampleButtonX + buttonWidth &&
        mouseY >= sampleButtonY && mouseY <= sampleButtonY + buttonHeight) {
        takeSample();
        return;
    }

    // Check Reset button
    let resetButtonX = sampleButtonX + buttonWidth + 10;
    if (mouseX >= resetButtonX && mouseX <= resetButtonX + 70 &&
        mouseY >= sampleButtonY && mouseY <= sampleButtonY + buttonHeight) {
        generatePopulation();
        return;
    }
}

function mouseDragged() {
    if (draggingUndercoverage) {
        let newValue = map(mouseX, undercoverageSliderX, undercoverageSliderX + sliderWidth, 0, 50);
        undercoveragePercent = round(constrain(newValue, 0, 50));
        generatePopulation();
    }

    if (draggingDifference) {
        let newValue = map(mouseX, differenceSliderX, differenceSliderX + sliderWidth, -30, 30);
        valueDifference = round(constrain(newValue, -30, 30));
        generatePopulation();
    }
}

function mouseReleased() {
    draggingUndercoverage = false;
    draggingDifference = false;
}

function takeSample() {
    // Sample only from covered population
    let covered = population.filter(p => p.covered);
    let sampleSize = min(20, covered.length);

    // Random sample
    shuffleArray(covered);
    sample = covered.slice(0, sampleSize);

    // Calculate sample mean
    sampleMean = sample.reduce((sum, s) => sum + s.value, 0) / sample.length;

    // Calculate bias
    bias = sampleMean - truePopulationMean;

    samplingDone = true;
}

function randomGaussian(mean, sd) {
    let u1 = random();
    let u2 = random();
    let z = sqrt(-2 * log(u1)) * cos(TWO_PI * u2);
    return mean + z * sd;
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
    assignPositions();
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = min(containerWidth, 750);
    if (canvasWidth < 600) canvasWidth = 600;
}
