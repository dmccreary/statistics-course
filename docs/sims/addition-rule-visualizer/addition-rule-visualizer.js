// Addition Rule Visualizer MicroSim
// Students apply the addition rule to calculate P(A or B)
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 750;
let drawHeight = 350;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 100;
let defaultTextSize = 16;

// Probability values
let pA = 0.5;
let pB = 0.4;
let pAandB = 0.15;

// Sliders
let sliderPA, sliderPB, sliderPAB;
let mutuallyExclusiveCheckbox;
let showStepsCheckbox;

// Animation
let animationStep = 0;
let animating = false;
let animStartTime = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Create sliders
  sliderPA = createSlider(0, 1, pA, 0.01);
  sliderPA.position(sliderLeftMargin, drawHeight + 5);
  sliderPA.size(150);
  sliderPA.input(updateFromSliders);

  sliderPB = createSlider(0, 1, pB, 0.01);
  sliderPB.position(sliderLeftMargin + 200, drawHeight + 5);
  sliderPB.size(150);
  sliderPB.input(updateFromSliders);

  sliderPAB = createSlider(0, 0.5, pAandB, 0.01);
  sliderPAB.position(sliderLeftMargin + 400, drawHeight + 5);
  sliderPAB.size(150);
  sliderPAB.input(updateFromSliders);

  // Checkboxes
  mutuallyExclusiveCheckbox = createCheckbox('Mutually Exclusive', false);
  mutuallyExclusiveCheckbox.position(10, drawHeight + 40);
  mutuallyExclusiveCheckbox.changed(toggleMutuallyExclusive);

  showStepsCheckbox = createCheckbox('Show Steps', true);
  showStepsCheckbox.position(170, drawHeight + 40);

  describe('Interactive Venn diagram showing the addition rule for probability', LABEL);
}

function draw() {
  updateCanvasSize();

  // Draw background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(24);
  text('Addition Rule: P(A or B)', canvasWidth / 2, 10);

  // Update values from sliders
  pA = sliderPA.value();
  pB = sliderPB.value();
  pAandB = sliderPAB.value();

  // Validate intersection
  let maxIntersection = min(pA, pB);
  if (pAandB > maxIntersection) {
    pAandB = maxIntersection;
    sliderPAB.value(pAandB);
  }
  sliderPAB.elt.max = maxIntersection;

  // Draw Venn diagram
  drawVennDiagram();

  // Draw formula and calculation
  drawCalculation();

  // Draw slider labels
  drawSliderLabels();
}

function drawVennDiagram() {
  let centerY = 170;
  let radius = 100;
  let separation = mutuallyExclusiveCheckbox.checked() ? 220 : 80;

  let leftX = canvasWidth / 2 - separation / 2;
  let rightX = canvasWidth / 2 + separation / 2;

  // Draw circles with transparency
  noStroke();

  // Circle A
  fill(100, 150, 255, 150);
  ellipse(leftX, centerY, radius * 2, radius * 2);

  // Circle B
  fill(255, 150, 100, 150);
  ellipse(rightX, centerY, radius * 2, radius * 2);

  // Highlight intersection if not mutually exclusive
  if (!mutuallyExclusiveCheckbox.checked() && pAandB > 0) {
    // The intersection appears purple due to color blending
    fill(180, 100, 180, 200);

    // Draw intersection using clip (simplified visual)
    push();
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.arc(leftX, centerY, radius, 0, TWO_PI);
    drawingContext.clip();
    fill(180, 100, 180, 150);
    ellipse(rightX, centerY, radius * 2, radius * 2);
    drawingContext.restore();
    pop();
  }

  // Labels
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(20);
  text('A', leftX - 50, centerY);
  text('B', rightX + 50, centerY);

  // Probability labels
  textSize(14);
  let aOnlyX = mutuallyExclusiveCheckbox.checked() ? leftX : leftX - 40;
  let bOnlyX = mutuallyExclusiveCheckbox.checked() ? rightX : rightX + 40;

  text('P(A)=' + pA.toFixed(2), aOnlyX, centerY + 30);
  text('P(B)=' + pB.toFixed(2), bOnlyX, centerY + 30);

  if (!mutuallyExclusiveCheckbox.checked()) {
    text('P(A∩B)=' + pAandB.toFixed(2), (leftX + rightX) / 2, centerY);
  }
}

function drawCalculation() {
  let boxX = 20;
  let boxY = 280;
  let boxWidth = canvasWidth - 40;
  let boxHeight = 60;

  fill(255, 255, 255, 230);
  stroke(100);
  strokeWeight(1);
  rect(boxX, boxY, boxWidth, boxHeight, 10);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);

  let pAorB = pA + pB - pAandB;

  if (showStepsCheckbox.checked()) {
    if (mutuallyExclusiveCheckbox.checked()) {
      text('Since A and B are mutually exclusive: P(A or B) = P(A) + P(B)', boxX + 15, boxY + 10);
      text('P(A or B) = ' + pA.toFixed(2) + ' + ' + pB.toFixed(2) + ' = ' + pAorB.toFixed(4), boxX + 15, boxY + 35);
    } else {
      text('General Addition Rule: P(A or B) = P(A) + P(B) - P(A and B)', boxX + 15, boxY + 10);
      text('P(A or B) = ' + pA.toFixed(2) + ' + ' + pB.toFixed(2) + ' - ' + pAandB.toFixed(2) + ' = ' + pAorB.toFixed(4), boxX + 15, boxY + 35);
    }
  } else {
    textSize(20);
    textAlign(CENTER, CENTER);
    text('P(A or B) = ' + pAorB.toFixed(4) + ' = ' + (pAorB * 100).toFixed(1) + '%', canvasWidth / 2, boxY + 30);
  }

  // Warning if invalid
  if (pAorB > 1) {
    fill(255, 0, 0);
    textAlign(CENTER, TOP);
    textSize(14);
    text('⚠ Invalid: P(A or B) cannot exceed 1. Reduce P(A∩B).', canvasWidth / 2, boxY - 20);
  }
}

function drawSliderLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);

  text('P(A): ' + pA.toFixed(2), 10, drawHeight + 15);
  text('P(B): ' + pB.toFixed(2), sliderLeftMargin + 155, drawHeight + 15);
  text('P(A∩B): ' + pAandB.toFixed(2), sliderLeftMargin + 355, drawHeight + 15);
}

function updateFromSliders() {
  pA = sliderPA.value();
  pB = sliderPB.value();
  pAandB = sliderPAB.value();
}

function toggleMutuallyExclusive() {
  if (mutuallyExclusiveCheckbox.checked()) {
    pAandB = 0;
    sliderPAB.value(0);
    sliderPAB.attribute('disabled', '');
  } else {
    sliderPAB.removeAttribute('disabled');
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  sliderPA.size(min(150, (canvasWidth - 300) / 3));
  sliderPB.size(min(150, (canvasWidth - 300) / 3));
  sliderPAB.size(min(150, (canvasWidth - 300) / 3));
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
