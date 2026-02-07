// Variable Types Concept Map
// Interactive hierarchical concept map showing variable classification
// Bloom Level: Understand (L2) - Classify
// MicroSim template version 2026.02

// Global variables for responsive sizing
let containerWidth;
let canvasWidth = 600;
let drawHeight = 360;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// Node data structure
let nodes = [];
let selectedNode = null;
let hoveredNode = null;

// Colors for branches
const colors = {
  root: '#6366F1',       // Indigo/purple for root
  categorical: '#10B981', // Green for categorical
  quantitative: '#F59E0B', // Orange for quantitative
  discrete: '#F97316',    // Darker orange for discrete
  continuous: '#FBBF24',  // Lighter orange/yellow for continuous
  dimmed: '#E5E7EB'       // Gray for dimmed nodes
};

// Node definitions with positions (will be calculated dynamically)
const nodeData = [
  {
    id: 'variable',
    label: 'Variable',
    parent: null,
    color: colors.root,
    definition: 'A characteristic or attribute that can take different values.',
    examples: ['Age', 'Eye color', 'Test score', 'City of birth']
  },
  {
    id: 'categorical',
    label: 'Categorical',
    parent: 'variable',
    color: colors.categorical,
    definition: 'A variable that names categories or groups. Values are labels, not numbers.',
    examples: ['Gender (male/female)', 'Blood type (A, B, AB, O)', 'Zip code', 'Favorite color']
  },
  {
    id: 'quantitative',
    label: 'Quantitative',
    parent: 'variable',
    color: colors.quantitative,
    definition: 'A variable with numerical values that represent quantities or amounts.',
    examples: ['Height in inches', 'Temperature', 'Number of pets', 'Income']
  },
  {
    id: 'discrete',
    label: 'Discrete',
    parent: 'quantitative',
    color: colors.discrete,
    definition: 'A quantitative variable that can only take specific, countable values (often integers).',
    examples: ['Number of children', 'Cars owned', 'Students in class', 'Shoe size (whole/half)']
  },
  {
    id: 'continuous',
    label: 'Continuous',
    parent: 'quantitative',
    color: colors.continuous,
    definition: 'A quantitative variable that can take any value within a range, including decimals.',
    examples: ['Height (5.75 feet)', 'Weight', 'Time to finish race', 'Temperature']
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textFont('Arial');

  // Initialize nodes with calculated positions
  calculateNodePositions();

  describe('Interactive concept map showing variable types hierarchy: Variable branches into Categorical and Quantitative, with Quantitative further divided into Discrete and Continuous. Hover to see definitions and examples, click to highlight branches.', LABEL);
}

function calculateNodePositions() {
  nodes = [];

  const centerX = canvasWidth / 2;
  const level1Y = 60;
  const level2Y = 160;
  const level3Y = 280;

  // Calculate horizontal spacing based on canvas width
  const spreadWidth = Math.min(canvasWidth * 0.8, 500);
  const level2Spacing = spreadWidth / 2;
  const level3Spacing = spreadWidth / 4;

  for (let data of nodeData) {
    let x, y, w, h;

    switch (data.id) {
      case 'variable':
        x = centerX;
        y = level1Y;
        w = 100;
        h = 40;
        break;
      case 'categorical':
        x = centerX - level2Spacing / 2;
        y = level2Y;
        w = 110;
        h = 40;
        break;
      case 'quantitative':
        x = centerX + level2Spacing / 2;
        y = level2Y;
        w = 120;
        h = 40;
        break;
      case 'discrete':
        x = centerX + level2Spacing / 2 - level3Spacing / 2;
        y = level3Y;
        w = 90;
        h = 40;
        break;
      case 'continuous':
        x = centerX + level2Spacing / 2 + level3Spacing / 2;
        y = level3Y;
        w = 100;
        h = 40;
        break;
    }

    nodes.push({
      ...data,
      x: x,
      y: y,
      w: w,
      h: h,
      expanded: true
    });
  }
}

function draw() {
  updateCanvasSize();

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
  text('Variable Types Concept Map', canvasWidth / 2, 10);

  // Draw edges first (behind nodes)
  drawEdges();

  // Draw nodes
  for (let node of nodes) {
    drawNode(node);
  }

  // Draw tooltip if hovering
  if (hoveredNode) {
    drawTooltip(hoveredNode);
  }

  // Draw instructions in control area
  fill('#666');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text('Hover over nodes to see definitions and examples. Click to highlight branches.', canvasWidth / 2, drawHeight + controlHeight / 2);
}

function drawEdges() {
  for (let node of nodes) {
    if (node.parent) {
      let parentNode = nodes.find(n => n.id === node.parent);
      if (parentNode) {
        // Determine if this edge is in the selected branch
        let isHighlighted = isInSelectedBranch(node) && isInSelectedBranch(parentNode);
        let isDimmed = selectedNode && !isHighlighted;

        if (isDimmed) {
          stroke(colors.dimmed);
        } else {
          stroke(node.color);
        }
        strokeWeight(3);

        // Draw curved edge
        noFill();
        let startX = parentNode.x;
        let startY = parentNode.y + parentNode.h / 2;
        let endX = node.x;
        let endY = node.y - node.h / 2;

        // Simple bezier curve
        let midY = (startY + endY) / 2;
        beginShape();
        vertex(startX, startY);
        bezierVertex(startX, midY, endX, midY, endX, endY);
        endShape();
      }
    }
  }
}

function drawNode(node) {
  let isHovered = hoveredNode === node;
  let isHighlighted = isInSelectedBranch(node);
  let isDimmed = selectedNode && !isHighlighted;

  // Calculate position
  let x = node.x - node.w / 2;
  let y = node.y - node.h / 2;

  // Node background
  if (isDimmed) {
    fill(colors.dimmed);
    stroke('#D1D5DB');
  } else {
    fill(node.color);
    stroke(isHovered ? '#1F2937' : darkenColor(node.color));
  }
  strokeWeight(isHovered ? 3 : 2);

  // Draw rounded rectangle
  rectMode(CORNER);
  rect(x, y, node.w, node.h, 10);

  // Node label
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(defaultTextSize);
  textStyle(BOLD);
  text(node.label, node.x, node.y);
  textStyle(NORMAL);
}

function drawTooltip(node) {
  let tooltipWidth = Math.min(280, canvasWidth - 40);
  let lineHeight = 18;
  let padding = 12;

  // Calculate tooltip content height
  let definitionLines = wrapText(node.definition, tooltipWidth - padding * 2);
  let examplesText = 'Examples: ' + node.examples.join(', ');
  let exampleLines = wrapText(examplesText, tooltipWidth - padding * 2);

  let totalLines = definitionLines.length + exampleLines.length + 1; // +1 for spacing
  let tooltipHeight = totalLines * lineHeight + padding * 2;

  // Position tooltip - try to place below the node, but adjust if needed
  let tooltipX = constrain(node.x - tooltipWidth / 2, 10, canvasWidth - tooltipWidth - 10);
  let tooltipY = node.y + node.h / 2 + 10;

  // If tooltip would go below drawing area, place it above the node
  if (tooltipY + tooltipHeight > drawHeight - 10) {
    tooltipY = node.y - node.h / 2 - tooltipHeight - 10;
  }

  // Draw tooltip background
  fill(255, 255, 255, 245);
  stroke('#374151');
  strokeWeight(1);
  rectMode(CORNER);
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);

  // Draw tooltip content
  fill('#1F2937');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);

  let currentY = tooltipY + padding;

  // Definition
  textStyle(NORMAL);
  for (let line of definitionLines) {
    text(line, tooltipX + padding, currentY);
    currentY += lineHeight;
  }

  currentY += lineHeight * 0.5; // spacing

  // Examples
  fill('#6B7280');
  textStyle(ITALIC);
  for (let line of exampleLines) {
    text(line, tooltipX + padding, currentY);
    currentY += lineHeight;
  }
  textStyle(NORMAL);
}

function wrapText(txt, maxWidth) {
  let words = txt.split(' ');
  let lines = [];
  let currentLine = '';

  textSize(13);

  for (let word of words) {
    let testLine = currentLine + (currentLine ? ' ' : '') + word;
    if (textWidth(testLine) > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function isInSelectedBranch(node) {
  if (!selectedNode) return true;

  // Check if node is the selected node
  if (node.id === selectedNode.id) return true;

  // Check if node is an ancestor of selected node
  let current = selectedNode;
  while (current.parent) {
    if (current.parent === node.id) return true;
    current = nodes.find(n => n.id === current.parent);
    if (!current) break;
  }

  // Check if node is a descendant of selected node
  current = node;
  while (current.parent) {
    if (current.parent === selectedNode.id) return true;
    current = nodes.find(n => n.id === current.parent);
    if (!current) break;
  }

  // Check if selected node is an ancestor of this node
  let ancestors = getAncestors(selectedNode);
  if (ancestors.includes(node.id)) return true;

  // Check if this node is a descendant of selected node
  let descendants = getDescendants(selectedNode);
  if (descendants.includes(node.id)) return true;

  return false;
}

function getAncestors(node) {
  let ancestors = [];
  let current = node;
  while (current.parent) {
    ancestors.push(current.parent);
    current = nodes.find(n => n.id === current.parent);
    if (!current) break;
  }
  return ancestors;
}

function getDescendants(node) {
  let descendants = [];
  for (let n of nodes) {
    if (n.parent === node.id) {
      descendants.push(n.id);
      descendants = descendants.concat(getDescendants(n));
    }
  }
  return descendants;
}

function darkenColor(hexColor) {
  // Simple color darkening
  let c = color(hexColor);
  return color(red(c) * 0.8, green(c) * 0.8, blue(c) * 0.8);
}

function mouseMoved() {
  hoveredNode = null;
  for (let node of nodes) {
    if (isMouseOverNode(node)) {
      hoveredNode = node;
      break;
    }
  }
}

function mousePressed() {
  for (let node of nodes) {
    if (isMouseOverNode(node)) {
      // Toggle selection
      if (selectedNode === node) {
        selectedNode = null;
      } else {
        selectedNode = node;
      }
      break;
    }
  }
}

function isMouseOverNode(node) {
  let x = node.x - node.w / 2;
  let y = node.y - node.h / 2;
  return mouseX >= x && mouseX <= x + node.w &&
         mouseY >= y && mouseY <= y + node.h;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  calculateNodePositions();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
