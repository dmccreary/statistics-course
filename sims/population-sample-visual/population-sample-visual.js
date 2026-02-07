// Population and Sample Visualization MicroSim
// Demonstrates the relationship between a population and a sample
// Students click individuals to select/deselect them or use random sampling
// MicroSim template version 2026.02

// ===== CANVAS DIMENSIONS =====
let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 340;
let defaultTextSize = 16;

// ===== LAYOUT CONSTANTS =====
// Population area (left side)
let popAreaX = 15;
let popAreaY = 45;
let popAreaWidth;
let popAreaHeight = 320;

// Sample display panel (right side)
let samplePanelWidth = 160;
let samplePanelX;
let samplePanelY = 45;
let samplePanelHeight = 320;

// ===== POPULATION DATA =====
let population = [];
let populationSize = 90;

// Person icon dimensions
let personWidth = 14;
let personHeight = 28;

// Colors for unselected people (muted blues/grays)
let unselectedColors = [
  '#6B7B8C', '#7A8A9A', '#8899A8', '#5C6C7C', '#6D7D8D',
  '#7E8E9E', '#5A6A7A', '#6C7C8C', '#7B8B9B', '#8A9AAA'
];

// Height variations (scale factors)
let heightVariations = [0.85, 0.90, 0.95, 1.0, 1.05, 1.10];

// ===== UI ELEMENTS =====
let randomSampleBtn;
let clearSampleBtn;
let sampleSizeSlider;
let sampleSize = 10;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Calculate dynamic layout
  updateLayout();

  // Create population
  createPopulation();

  // Create UI controls
  randomSampleBtn = createButton('Random Sample');
  randomSampleBtn.position(10, drawHeight + 10);
  randomSampleBtn.mousePressed(selectRandomSample);

  clearSampleBtn = createButton('Clear Sample');
  clearSampleBtn.position(120, drawHeight + 10);
  clearSampleBtn.mousePressed(clearSample);

  sampleSizeSlider = createSlider(5, 25, sampleSize, 1);
  sampleSizeSlider.position(sliderLeftMargin, drawHeight + 10);
  sampleSizeSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Interactive visualization showing population of 90 students at Lincoln High School. Click individuals to add or remove them from your sample. Use buttons to randomly select a sample or clear your selection.', LABEL);
}

function updateLayout() {
  samplePanelX = canvasWidth - samplePanelWidth - 15;
  popAreaWidth = samplePanelX - popAreaX - 20;
}

function createPopulation() {
  population = [];

  // Calculate grid layout for population
  let cols = 10;
  let rows = 9;
  let cellWidth = popAreaWidth / cols;
  let cellHeight = popAreaHeight / rows;

  for (let i = 0; i < populationSize; i++) {
    let col = i % cols;
    let row = floor(i / cols);

    // Add some randomness to positions within cells
    let jitterX = random(-cellWidth * 0.2, cellWidth * 0.2);
    let jitterY = random(-cellHeight * 0.15, cellHeight * 0.15);

    let x = popAreaX + col * cellWidth + cellWidth / 2 + jitterX;
    let y = popAreaY + row * cellHeight + cellHeight / 2 + jitterY;

    // Random shirt color (unselected state uses muted colors)
    let shirtColor = random(unselectedColors);

    // Random height variation
    let heightScale = random(heightVariations);

    population.push({
      x: x,
      y: y,
      shirtColor: shirtColor,
      heightScale: heightScale,
      selected: false,
      id: i + 1
    });
  }
}

function draw() {
  updateCanvasSize();
  updateLayout();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Population and Sample Visualization', canvasWidth / 2 - samplePanelWidth / 2, 10);

  // Draw population area
  drawPopulationArea();

  // Draw sample panel
  drawSamplePanel();

  // Draw stats
  drawStats();

  // Update sample size from slider
  sampleSize = sampleSizeSlider.value();

  // Draw control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Sample Size: ' + sampleSize, 230, drawHeight + 25);
}

function drawPopulationArea() {
  // Population area background
  fill(220, 235, 250); // Light blue
  stroke(180, 200, 220);
  strokeWeight(2);
  rect(popAreaX, popAreaY, popAreaWidth, popAreaHeight, 8);

  // Population label
  fill(60, 80, 100);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Population: All Students at Lincoln High School', popAreaX + popAreaWidth / 2, popAreaY + 5);

  // Draw all people
  for (let person of population) {
    drawPerson(person);
  }
}

function drawPerson(person) {
  push();
  translate(person.x, person.y);
  scale(person.heightScale);

  let w = personWidth;
  let h = personHeight;

  if (person.selected) {
    // Glow effect for selected
    noStroke();
    fill(255, 180, 100, 80);
    ellipse(0, 0, w * 2.5, h * 1.5);

    // Orange highlight circle
    stroke(255, 140, 0);
    strokeWeight(2);
    noFill();
    ellipse(0, 0, w * 2, h * 1.3);
  }

  // Head
  if (person.selected) {
    fill(255, 200, 150); // Warm skin tone when selected
  } else {
    fill(180, 180, 190); // Muted gray when not selected
  }
  noStroke();
  ellipse(0, -h * 0.3, w * 0.7, w * 0.7);

  // Body/shirt
  if (person.selected) {
    fill(255, 140, 0); // Bright orange when selected
  } else {
    fill(person.shirtColor);
  }

  // Simple body shape
  beginShape();
  vertex(-w * 0.4, -h * 0.1);
  vertex(-w * 0.45, h * 0.35);
  vertex(w * 0.45, h * 0.35);
  vertex(w * 0.4, -h * 0.1);
  endShape(CLOSE);

  pop();
}

function drawSamplePanel() {
  // Sample panel background
  fill(255, 240, 220); // Light orange
  stroke(230, 180, 130);
  strokeWeight(2);
  rect(samplePanelX, samplePanelY, samplePanelWidth, samplePanelHeight, 8);

  // Sample panel label
  fill(150, 100, 50);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text('Your Sample', samplePanelX + samplePanelWidth / 2, samplePanelY + 8);

  // Draw selected individuals in the sample panel
  let selectedPeople = population.filter(p => p.selected);
  let startY = samplePanelY + 35;
  let iconSize = 20;
  let cols = 4;
  let spacing = samplePanelWidth / (cols + 1);

  for (let i = 0; i < selectedPeople.length; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    let x = samplePanelX + spacing * (col + 1);
    let y = startY + row * (iconSize + 12);

    // Mini person icon
    push();
    translate(x, y);
    scale(0.6);

    // Head
    fill(255, 200, 150);
    noStroke();
    ellipse(0, -8, 10, 10);

    // Body (orange)
    fill(255, 140, 0);
    beginShape();
    vertex(-5, -3);
    vertex(-6, 10);
    vertex(6, 10);
    vertex(5, -3);
    endShape(CLOSE);

    pop();
  }

  // Show message if no one selected
  if (selectedPeople.length === 0) {
    fill(150, 120, 80);
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Click on individuals\nto select them\nfor your sample', samplePanelX + samplePanelWidth / 2, samplePanelY + samplePanelHeight / 2);
  }
}

function drawStats() {
  let selectedCount = population.filter(p => p.selected).length;
  let percentage = (selectedCount / populationSize * 100).toFixed(1);

  // Stats display in the sample panel
  fill(100, 70, 40);
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(12);

  let statsY = samplePanelY + samplePanelHeight - 10;
  text('Population: ' + populationSize, samplePanelX + samplePanelWidth / 2, statsY - 28);
  text('Sample: ' + selectedCount, samplePanelX + samplePanelWidth / 2, statsY - 14);
  text('(' + percentage + '%)', samplePanelX + samplePanelWidth / 2, statsY);
}

function mousePressed() {
  // Check if click is in the population area
  if (mouseX > popAreaX && mouseX < popAreaX + popAreaWidth &&
      mouseY > popAreaY + 20 && mouseY < popAreaY + popAreaHeight) {

    // Find clicked person
    for (let person of population) {
      let d = dist(mouseX, mouseY, person.x, person.y);
      if (d < personWidth * person.heightScale) {
        person.selected = !person.selected;
        break;
      }
    }
  }
}

function selectRandomSample() {
  // Clear current selection
  for (let person of population) {
    person.selected = false;
  }

  // Get sample size from slider
  let n = sampleSizeSlider.value();

  // Create array of indices and shuffle
  let indices = [];
  for (let i = 0; i < populationSize; i++) {
    indices.push(i);
  }

  // Fisher-Yates shuffle
  for (let i = indices.length - 1; i > 0; i--) {
    let j = floor(random(i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Select first n individuals
  for (let i = 0; i < n; i++) {
    population[indices[i]].selected = true;
  }
}

function clearSample() {
  for (let person of population) {
    person.selected = false;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  sampleSizeSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Recreate population with new layout
  updateLayout();
  createPopulation();

  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
