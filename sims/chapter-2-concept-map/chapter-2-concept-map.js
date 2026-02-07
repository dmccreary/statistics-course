// Chapter 2 Concept Map: Displaying Categorical Data
// Interactive hierarchical concept map showing key concepts and relationships
// Bloom Level: Remember (L1) - Recognize, identify
// MicroSim template version 2026.02

// Global variables for responsive sizing
let containerWidth;
let canvasWidth = 800;
let drawHeight = 520;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 14;

// Node data structure
let nodes = [];
let selectedNode = null;
let hoveredNode = null;
let showDefinitions = false;

// Colors for different theme branches
const colors = {
  root: '#6366F1',           // Indigo/purple for root
  organization: '#3B82F6',   // Blue for Organizing Data
  displays: '#10B981',       // Green for Single Variable Displays
  twoVariable: '#F59E0B',    // Orange for Two Variable Analysis
  association: '#8B5CF6',    // Purple for Association
  dimmed: '#E5E7EB'          // Gray for dimmed nodes
};

// Node definitions with parent relationships
const nodeData = [
  // Root node
  {
    id: 'root',
    label: 'Displaying\nCategorical Data',
    parent: null,
    color: colors.root,
    definition: 'Methods and techniques for organizing, visualizing, and analyzing categorical (qualitative) data.',
    level: 0
  },

  // Level 1 - Main branches
  {
    id: 'organizing',
    label: 'Organizing\nData',
    parent: 'root',
    color: colors.organization,
    definition: 'Systematic methods for arranging and summarizing raw categorical data into structured formats.',
    level: 1
  },
  {
    id: 'single-displays',
    label: 'Single Variable\nDisplays',
    parent: 'root',
    color: colors.displays,
    definition: 'Visual representations that show the distribution of one categorical variable.',
    level: 1
  },
  {
    id: 'two-variable',
    label: 'Two Variable\nAnalysis',
    parent: 'root',
    color: colors.twoVariable,
    definition: 'Methods for examining the relationship between two categorical variables.',
    level: 1
  },
  {
    id: 'association',
    label: 'Association',
    parent: 'root',
    color: colors.association,
    definition: 'A relationship between two variables where knowing one helps predict the other.',
    level: 1
  },

  // Level 2 - Organizing Data branch
  {
    id: 'frequency-table',
    label: 'Frequency\nTable',
    parent: 'organizing',
    color: colors.organization,
    definition: 'A table showing the count of observations in each category.',
    level: 2
  },
  {
    id: 'relative-freq',
    label: 'Relative\nFrequency',
    parent: 'organizing',
    color: colors.organization,
    definition: 'The proportion or percentage of observations in each category (frequency / total).',
    level: 2
  },
  {
    id: 'cumulative-freq',
    label: 'Cumulative\nFrequency',
    parent: 'organizing',
    color: colors.organization,
    definition: 'The running total of frequencies, showing how many observations fall at or below each category.',
    level: 2
  },

  // Level 2 - Single Variable Displays branch
  {
    id: 'bar-graph',
    label: 'Bar Graph',
    parent: 'single-displays',
    color: colors.displays,
    definition: 'A chart with rectangular bars where length represents frequency or relative frequency of each category.',
    level: 2
  },
  {
    id: 'pie-chart',
    label: 'Pie Chart',
    parent: 'single-displays',
    color: colors.displays,
    definition: 'A circular chart divided into slices where each slice represents a category\'s proportion of the whole.',
    level: 2
  },

  // Level 2 - Two Variable Analysis branch
  {
    id: 'two-way-table',
    label: 'Two-Way\nTable',
    parent: 'two-variable',
    color: colors.twoVariable,
    definition: 'A table that displays frequencies for combinations of two categorical variables (also called contingency table).',
    level: 2
  },

  // Level 3 - Two-Way Table children
  {
    id: 'marginal-dist',
    label: 'Marginal\nDistribution',
    parent: 'two-way-table',
    color: colors.twoVariable,
    definition: 'The distribution of one variable ignoring the other; found in the row/column totals (margins) of a two-way table.',
    level: 3
  },
  {
    id: 'conditional-dist',
    label: 'Conditional\nDistribution',
    parent: 'two-way-table',
    color: colors.twoVariable,
    definition: 'The distribution of one variable within a specific category of the other variable.',
    level: 3
  },

  // Level 2 - Association branch
  {
    id: 'direction',
    label: 'Direction',
    parent: 'association',
    color: colors.association,
    definition: 'Whether the association is positive (variables increase together) or negative (one increases as other decreases).',
    level: 2
  },
  {
    id: 'strength',
    label: 'Strength',
    parent: 'association',
    color: colors.association,
    definition: 'How strongly the variables are related; ranges from weak to strong.',
    level: 2
  },

  // Level 3 - Direction children
  {
    id: 'positive',
    label: 'Positive',
    parent: 'direction',
    color: colors.association,
    definition: 'Categories of one variable tend to occur with certain categories of the other in a consistent pattern.',
    level: 3
  },
  {
    id: 'negative',
    label: 'Negative',
    parent: 'direction',
    color: colors.association,
    definition: 'Higher categories of one variable tend to occur with lower categories of the other variable.',
    level: 3
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

  describe('Interactive concept map for Chapter 2: Displaying Categorical Data. Shows hierarchical relationships between concepts like Organizing Data, Single Variable Displays, Two Variable Analysis, and Association. Hover over nodes to see definitions, click to highlight connections.', LABEL);
}

function calculateNodePositions() {
  nodes = [];

  const centerX = canvasWidth / 2;
  const level0Y = 50;
  const level1Y = 140;
  const level2Y = 260;
  const level3Y = 380;

  // Calculate horizontal positions based on canvas width
  const spreadWidth = Math.min(canvasWidth * 0.92, 750);

  // Level 1 positions (4 main branches)
  const level1Positions = {
    'organizing': centerX - spreadWidth * 0.38,
    'single-displays': centerX - spreadWidth * 0.13,
    'two-variable': centerX + spreadWidth * 0.13,
    'association': centerX + spreadWidth * 0.38
  };

  for (let data of nodeData) {
    let x, y, w, h;

    // Default node dimensions based on level
    if (data.level === 0) {
      w = 130;
      h = 50;
    } else if (data.level === 1) {
      w = 100;
      h = 45;
    } else if (data.level === 2) {
      w = 90;
      h = 40;
    } else {
      w = 85;
      h = 36;
    }

    switch (data.id) {
      // Root
      case 'root':
        x = centerX;
        y = level0Y;
        w = 140;
        h = 55;
        break;

      // Level 1 main branches
      case 'organizing':
      case 'single-displays':
      case 'two-variable':
      case 'association':
        x = level1Positions[data.id];
        y = level1Y;
        break;

      // Level 2 - Organizing Data children
      case 'frequency-table':
        x = level1Positions['organizing'] - 70;
        y = level2Y;
        break;
      case 'relative-freq':
        x = level1Positions['organizing'];
        y = level2Y;
        break;
      case 'cumulative-freq':
        x = level1Positions['organizing'] + 70;
        y = level2Y;
        break;

      // Level 2 - Single Variable Displays children
      case 'bar-graph':
        x = level1Positions['single-displays'] - 50;
        y = level2Y;
        break;
      case 'pie-chart':
        x = level1Positions['single-displays'] + 50;
        y = level2Y;
        break;

      // Level 2 - Two Variable Analysis children
      case 'two-way-table':
        x = level1Positions['two-variable'];
        y = level2Y;
        break;

      // Level 3 - Two-Way Table children
      case 'marginal-dist':
        x = level1Positions['two-variable'] - 55;
        y = level3Y;
        break;
      case 'conditional-dist':
        x = level1Positions['two-variable'] + 55;
        y = level3Y;
        break;

      // Level 2 - Association children
      case 'direction':
        x = level1Positions['association'] - 50;
        y = level2Y;
        break;
      case 'strength':
        x = level1Positions['association'] + 50;
        y = level2Y;
        break;

      // Level 3 - Direction children
      case 'positive':
        x = level1Positions['association'] - 80;
        y = level3Y;
        break;
      case 'negative':
        x = level1Positions['association'] - 20;
        y = level3Y;
        break;
    }

    nodes.push({
      ...data,
      x: x,
      y: y,
      w: w,
      h: h
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
  textSize(18);
  textStyle(BOLD);
  text('Chapter 2 Concept Map: Displaying Categorical Data', canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Draw legend
  drawLegend();

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

  // Draw control area
  drawControls();
}

function drawLegend() {
  const legendX = 15;
  const legendY = 35;
  const boxSize = 12;
  const spacing = 18;

  textSize(11);
  textAlign(LEFT, CENTER);

  const legendItems = [
    { color: colors.organization, label: 'Organization' },
    { color: colors.displays, label: 'Displays' },
    { color: colors.twoVariable, label: 'Two Variable' },
    { color: colors.association, label: 'Association' }
  ];

  // Background
  fill(255, 255, 255, 230);
  stroke('#ccc');
  strokeWeight(1);
  rect(legendX - 5, legendY - 5, 105, legendItems.length * spacing + 10, 5);

  for (let i = 0; i < legendItems.length; i++) {
    const item = legendItems[i];
    const y = legendY + i * spacing;

    fill(item.color);
    stroke(darkenColor(item.color));
    strokeWeight(1);
    rect(legendX, y, boxSize, boxSize, 3);

    fill('#333');
    noStroke();
    text(item.label, legendX + boxSize + 6, y + boxSize / 2);
  }
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
        strokeWeight(2);

        // Draw curved edge with arrow
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

        // Draw arrow head
        if (!isDimmed) {
          drawArrowHead(endX, endY, node.color);
        }
      }
    }
  }
}

function drawArrowHead(x, y, col) {
  fill(col);
  stroke(col);
  strokeWeight(1);
  const size = 6;
  triangle(x - size, y - size, x + size, y - size, x, y);
}

function drawNode(node) {
  let isHovered = hoveredNode === node;
  let isHighlighted = isInSelectedBranch(node);
  let isDimmed = selectedNode && !isHighlighted;

  // Calculate position
  let x = node.x - node.w / 2;
  let y = node.y - node.h / 2;

  // Node background with shadow
  if (!isDimmed) {
    fill(200, 200, 200, 100);
    noStroke();
    rect(x + 3, y + 3, node.w, node.h, 10);
  }

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

  // Adjust text size based on node level
  let fontSize = node.level === 0 ? 14 : (node.level === 1 ? 12 : 11);
  textSize(fontSize);
  textStyle(BOLD);

  // Handle multi-line labels
  const lines = node.label.split('\n');
  const lineHeight = fontSize + 2;
  const startY = node.y - (lines.length - 1) * lineHeight / 2;

  for (let i = 0; i < lines.length; i++) {
    text(lines[i], node.x, startY + i * lineHeight);
  }

  textStyle(NORMAL);
}

function drawTooltip(node) {
  let tooltipWidth = Math.min(280, canvasWidth - 40);
  let lineHeight = 16;
  let padding = 12;

  // Calculate tooltip content height
  textSize(12);
  let definitionLines = wrapText(node.definition, tooltipWidth - padding * 2);
  let totalLines = definitionLines.length + 1; // +1 for title
  let tooltipHeight = totalLines * lineHeight + padding * 2 + 10;

  // Position tooltip - try to place below the node, but adjust if needed
  let tooltipX = constrain(node.x - tooltipWidth / 2, 10, canvasWidth - tooltipWidth - 10);
  let tooltipY = node.y + node.h / 2 + 10;

  // If tooltip would go below drawing area, place it above the node
  if (tooltipY + tooltipHeight > drawHeight - 10) {
    tooltipY = node.y - node.h / 2 - tooltipHeight - 10;
  }

  // Draw tooltip background with shadow
  fill(0, 0, 0, 30);
  noStroke();
  rect(tooltipX + 3, tooltipY + 3, tooltipWidth, tooltipHeight, 8);

  fill(255, 255, 255, 250);
  stroke('#374151');
  strokeWeight(1);
  rectMode(CORNER);
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);

  // Draw tooltip content
  let currentY = tooltipY + padding;

  // Title
  fill(node.color);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  textStyle(BOLD);
  text(node.label.replace('\n', ' '), tooltipX + padding, currentY);
  currentY += lineHeight + 6;
  textStyle(NORMAL);

  // Definition
  fill('#1F2937');
  textSize(12);
  for (let line of definitionLines) {
    text(line, tooltipX + padding, currentY);
    currentY += lineHeight;
  }
}

function drawControls() {
  // Toggle definitions button
  const btnX = canvasWidth / 2 - 80;
  const btnY = drawHeight + 10;
  const btnW = 160;
  const btnH = 30;

  // Button background
  if (isMouseOverButton(btnX, btnY, btnW, btnH)) {
    fill('#4B5563');
  } else {
    fill('#6B7280');
  }
  stroke('#374151');
  strokeWeight(1);
  rect(btnX, btnY, btnW, btnH, 6);

  // Button text
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text('Hover for Definitions', btnX + btnW / 2, btnY + btnH / 2);

  // Instructions
  fill('#666');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Click nodes to highlight branches', 15, drawHeight + controlHeight / 2);

  textAlign(RIGHT, CENTER);
  text('Click again to clear', canvasWidth - 15, drawHeight + controlHeight / 2);
}

function isMouseOverButton(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

function wrapText(txt, maxWidth) {
  let words = txt.split(' ');
  let lines = [];
  let currentLine = '';

  textSize(12);

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

  // Check if this node is a descendant of selected node
  let descendants = getDescendants(selectedNode);
  if (descendants.includes(node.id)) return true;

  // Check if selected node is an ancestor of this node
  let ancestors = getAncestors(node);
  if (ancestors.includes(selectedNode.id)) return true;

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
  return color(red(c) * 0.75, green(c) * 0.75, blue(c) * 0.75);
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
  // Check if clicking on a node
  for (let node of nodes) {
    if (isMouseOverNode(node)) {
      // Toggle selection
      if (selectedNode === node) {
        selectedNode = null;
      } else {
        selectedNode = node;
      }
      return;
    }
  }

  // If clicking elsewhere in the drawing area, clear selection
  if (mouseY < drawHeight) {
    selectedNode = null;
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
