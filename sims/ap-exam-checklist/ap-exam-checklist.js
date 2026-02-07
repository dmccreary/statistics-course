// AP Exam Preparation Checklist MicroSim
// Interactive checklist for essential formulas, concepts, and strategies
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 750;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 20;
let defaultTextSize = 14;

// Categories
let categories = [
    {
        name: 'Essential Formulas',
        color: [46, 125, 50], // Green
        expanded: true,
        items: [
            { text: 'Mean: x̄ = Σxᵢ/n', checked: false },
            { text: 'Standard deviation: s = √[Σ(xᵢ-x̄)²/(n-1)]', checked: false },
            { text: 'z-score: z = (x - μ)/σ', checked: false },
            { text: 'Confidence interval: estimate ± (critical value)(SE)', checked: false },
            { text: 'Margin of error for proportion: z*√[p̂(1-p̂)/n]', checked: false },
            { text: 'Test statistic: z or t = (statistic - parameter)/SE', checked: false }
        ]
    },
    {
        name: 'Condition Checks',
        color: [25, 118, 210], // Blue
        expanded: false,
        items: [
            { text: 'Random: Data from random sample or experiment', checked: false },
            { text: 'Independent: n < 10% of population (10% rule)', checked: false },
            { text: 'Normal (proportions): np ≥ 10 AND n(1-p) ≥ 10', checked: false },
            { text: 'Normal (means): n ≥ 30 OR population is normal', checked: false },
            { text: 'Large Counts (chi-square): All expected counts ≥ 5', checked: false }
        ]
    },
    {
        name: 'Key Phrases',
        color: [245, 124, 0], // Orange
        expanded: false,
        items: [
            { text: '"We are X% confident that the true [parameter] is between..."', checked: false },
            { text: '"There is (not) convincing evidence that..."', checked: false },
            { text: '"Since p-value < α, we reject H₀"', checked: false },
            { text: '"Fail to reject" NOT "accept the null hypothesis"', checked: false },
            { text: '"Association" NOT "correlation" for categorical data', checked: false }
        ]
    },
    {
        name: 'Calculator Skills',
        color: [123, 31, 162], // Purple
        expanded: false,
        items: [
            { text: '1-PropZTest, 2-PropZTest, 1-PropZInt, 2-PropZInt', checked: false },
            { text: 'T-Test, 2-SampTTest, TInterval, 2-SampTInt', checked: false },
            { text: 'LinRegTTest for slope inference', checked: false },
            { text: 'χ²-Test for chi-square procedures', checked: false },
            { text: 'normalcdf(lower, upper, μ, σ), invNorm(area, μ, σ)', checked: false },
            { text: 'tcdf(lower, upper, df), invT(area, df)', checked: false }
        ]
    },
    {
        name: 'Common Mistakes to Avoid',
        color: [244, 67, 54], // Red
        expanded: false,
        items: [
            { text: 'Never say "accept H₀" - say "fail to reject H₀"', checked: false },
            { text: 'Always check conditions before doing inference', checked: false },
            { text: 'Always conclude in CONTEXT of the problem', checked: false },
            { text: 'p-value is NOT P(H₀ is true)', checked: false },
            { text: 'Correlation ≠ causation (observational studies)', checked: false },
            { text: 'Always include units when interpreting in context', checked: false }
        ]
    }
];

// State
let scrollY = 0;
let maxScroll = 0;
let totalChecked = 0;
let totalItems = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);
    textFont('Arial');

    // Count total items
    for (let cat of categories) {
        totalItems += cat.items.length;
    }

    // Load saved state from localStorage if available
    loadProgress();

    describe('Interactive AP Statistics exam preparation checklist with categories for essential formulas, condition checks, key phrases, calculator skills, and common mistakes. Track your readiness with checkboxes and progress bar.', LABEL);
}

function draw() {
    updateCanvasSize();
    calculateLayout();

    // Drawing area background
    fill(250, 250, 255);
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
    text('AP Statistics Exam Preparation Checklist', canvasWidth / 2, 10);
    textStyle(NORMAL);

    // Progress bar
    drawProgressBar();

    // Draw categories (with clipping)
    push();
    // Create clipping region
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(0, 65, canvasWidth, drawHeight - 65);
    drawingContext.clip();

    drawCategories();

    drawingContext.restore();
    pop();

    // Draw scroll indicator if needed
    if (maxScroll > 0) {
        drawScrollIndicator();
    }

    // Draw controls
    drawControls();
}

function drawProgressBar() {
    let barX = margin + 60;
    let barY = 40;
    let barWidth = canvasWidth - margin * 2 - 120;
    let barHeight = 20;

    // Count checked items
    totalChecked = 0;
    for (let cat of categories) {
        for (let item of cat.items) {
            if (item.checked) totalChecked++;
        }
    }

    let progress = totalItems > 0 ? totalChecked / totalItems : 0;

    // Background
    fill(220, 220, 220);
    noStroke();
    rect(barX, barY, barWidth, barHeight, 10);

    // Progress fill
    if (progress > 0) {
        // Gradient color based on progress
        let r = lerp(244, 76, progress);
        let g = lerp(67, 175, progress);
        let b = lerp(54, 80, progress);
        fill(r, g, b);
        rect(barX, barY, barWidth * progress, barHeight, 10, progress >= 0.99 ? 10 : 0, progress >= 0.99 ? 10 : 0, 10);
    }

    // Label
    fill(60);
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Progress:', margin, barY + barHeight / 2);

    // Percentage
    textAlign(RIGHT, CENTER);
    text(totalChecked + '/' + totalItems + ' (' + (progress * 100).toFixed(0) + '%)', canvasWidth - margin, barY + barHeight / 2);
}

function calculateLayout() {
    // Calculate total height needed
    let y = 70;
    for (let cat of categories) {
        y += 40; // Category header
        if (cat.expanded) {
            y += cat.items.length * 30 + 10;
        }
    }
    maxScroll = max(0, y - drawHeight + 20);
    scrollY = constrain(scrollY, 0, maxScroll);
}

function drawCategories() {
    let y = 70 - scrollY;
    let contentWidth = canvasWidth - margin * 2 - 40;

    for (let i = 0; i < categories.length; i++) {
        let cat = categories[i];

        // Skip if not visible
        if (y + 40 < 65 || y > drawHeight) {
            y += 40;
            if (cat.expanded) {
                y += cat.items.length * 30 + 10;
            }
            continue;
        }

        // Category header
        let headerX = margin + 20;
        let headerWidth = contentWidth;
        let headerHeight = 35;

        // Header background
        fill(cat.color[0], cat.color[1], cat.color[2], 30);
        stroke(cat.color[0], cat.color[1], cat.color[2]);
        strokeWeight(1);
        rect(headerX, y, headerWidth, headerHeight, 5);

        // Expand/collapse arrow
        fill(cat.color[0], cat.color[1], cat.color[2]);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(14);
        text(cat.expanded ? '▼' : '▶', headerX + 10, y + headerHeight / 2);

        // Category name
        textStyle(BOLD);
        text(cat.name, headerX + 30, y + headerHeight / 2);
        textStyle(NORMAL);

        // Item count
        let catChecked = cat.items.filter(item => item.checked).length;
        textAlign(RIGHT, CENTER);
        textSize(11);
        fill(100);
        text(catChecked + '/' + cat.items.length, headerX + headerWidth - 10, y + headerHeight / 2);

        y += 40;

        // Items if expanded
        if (cat.expanded) {
            for (let j = 0; j < cat.items.length; j++) {
                let item = cat.items[j];

                if (y >= 65 && y < drawHeight) {
                    // Checkbox
                    let cbX = headerX + 20;
                    let cbY = y + 5;
                    let cbSize = 18;

                    if (item.checked) {
                        fill(cat.color[0], cat.color[1], cat.color[2]);
                        stroke(cat.color[0] * 0.7, cat.color[1] * 0.7, cat.color[2] * 0.7);
                    } else {
                        fill(255);
                        stroke(180);
                    }
                    strokeWeight(1);
                    rect(cbX, cbY, cbSize, cbSize, 3);

                    // Checkmark
                    if (item.checked) {
                        stroke(255);
                        strokeWeight(2);
                        line(cbX + 4, cbY + 10, cbX + 8, cbY + 14);
                        line(cbX + 8, cbY + 14, cbX + 14, cbY + 5);
                    }

                    // Item text
                    fill(item.checked ? 100 : 50);
                    noStroke();
                    textAlign(LEFT, CENTER);
                    textSize(11);
                    if (item.checked) {
                        textStyle(ITALIC);
                    }
                    text(item.text, cbX + 28, cbY + cbSize / 2);
                    textStyle(NORMAL);
                }

                y += 30;
            }
            y += 10;
        }
    }
}

function drawScrollIndicator() {
    let indicatorHeight = 60;
    let indicatorX = canvasWidth - 15;
    let indicatorY = 70;
    let trackHeight = drawHeight - 85;

    // Track
    fill(220);
    noStroke();
    rect(indicatorX, indicatorY, 8, trackHeight, 4);

    // Thumb
    let thumbPos = map(scrollY, 0, maxScroll, indicatorY, indicatorY + trackHeight - indicatorHeight);
    fill(150);
    rect(indicatorX, thumbPos, 8, indicatorHeight, 4);
}

function drawControls() {
    let btnY = drawHeight + 20;
    let btnWidth = 120;
    let btnHeight = 35;

    // Reset All button
    let resetX = canvasWidth / 2 - btnWidth - 10;
    let resetHover = mouseX >= resetX && mouseX <= resetX + btnWidth &&
                     mouseY >= btnY && mouseY <= btnY + btnHeight;

    fill(resetHover ? [200, 80, 80] : [244, 67, 54]);
    stroke([180, 50, 50]);
    strokeWeight(1);
    rect(resetX, btnY, btnWidth, btnHeight, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text('Reset All', resetX + btnWidth / 2, btnY + btnHeight / 2);

    // Check All button
    let checkX = canvasWidth / 2 + 10;
    let checkHover = mouseX >= checkX && mouseX <= checkX + btnWidth &&
                     mouseY >= btnY && mouseY <= btnY + btnHeight;

    fill(checkHover ? [60, 140, 60] : [76, 175, 80]);
    stroke([50, 120, 50]);
    rect(checkX, btnY, btnWidth, btnHeight, 5);

    fill(255);
    text('Check All', checkX + btnWidth / 2, btnY + btnHeight / 2);

    // Sylvia quote
    fill(100);
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(ITALIC);
    text('"Time to squirrel away this knowledge!" - Sylvia', canvasWidth / 2, btnY + btnHeight + 18);
    textStyle(NORMAL);
}

function mousePressed() {
    // Check category headers and items
    let y = 70 - scrollY;
    let contentWidth = canvasWidth - margin * 2 - 40;
    let headerX = margin + 20;

    for (let i = 0; i < categories.length; i++) {
        let cat = categories[i];
        let headerHeight = 35;

        // Check header click (expand/collapse)
        if (mouseX >= headerX && mouseX <= headerX + contentWidth &&
            mouseY >= y && mouseY <= y + headerHeight && mouseY >= 65 && mouseY < drawHeight) {
            cat.expanded = !cat.expanded;
            saveProgress();
            return;
        }

        y += 40;

        // Check item clicks if expanded
        if (cat.expanded) {
            for (let j = 0; j < cat.items.length; j++) {
                let cbX = headerX + 20;
                let cbY = y + 5;
                let cbSize = 18;

                if (mouseX >= cbX && mouseX <= cbX + cbSize + textWidth(cat.items[j].text) + 30 &&
                    mouseY >= cbY && mouseY <= cbY + cbSize && mouseY >= 65 && mouseY < drawHeight) {
                    cat.items[j].checked = !cat.items[j].checked;
                    saveProgress();
                    return;
                }

                y += 30;
            }
            y += 10;
        }
    }

    // Check control buttons
    let btnY = drawHeight + 20;
    let btnWidth = 120;
    let btnHeight = 35;

    // Reset All
    let resetX = canvasWidth / 2 - btnWidth - 10;
    if (mouseX >= resetX && mouseX <= resetX + btnWidth &&
        mouseY >= btnY && mouseY <= btnY + btnHeight) {
        for (let cat of categories) {
            for (let item of cat.items) {
                item.checked = false;
            }
        }
        saveProgress();
        return;
    }

    // Check All
    let checkX = canvasWidth / 2 + 10;
    if (mouseX >= checkX && mouseX <= checkX + btnWidth &&
        mouseY >= btnY && mouseY <= btnY + btnHeight) {
        for (let cat of categories) {
            for (let item of cat.items) {
                item.checked = true;
            }
        }
        saveProgress();
        return;
    }
}

function mouseWheel(event) {
    if (mouseY >= 65 && mouseY < drawHeight) {
        scrollY += event.delta * 0.5;
        scrollY = constrain(scrollY, 0, maxScroll);
        return false;
    }
}

function saveProgress() {
    try {
        let state = {
            categories: categories.map(cat => ({
                expanded: cat.expanded,
                items: cat.items.map(item => item.checked)
            }))
        };
        localStorage.setItem('ap-exam-checklist', JSON.stringify(state));
    } catch (e) {
        // localStorage not available
    }
}

function loadProgress() {
    try {
        let saved = localStorage.getItem('ap-exam-checklist');
        if (saved) {
            let state = JSON.parse(saved);
            for (let i = 0; i < categories.length && i < state.categories.length; i++) {
                categories[i].expanded = state.categories[i].expanded;
                for (let j = 0; j < categories[i].items.length && j < state.categories[i].items.length; j++) {
                    categories[i].items[j].checked = state.categories[i].items[j];
                }
            }
        }
    } catch (e) {
        // localStorage not available or corrupted
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
    canvasWidth = min(containerWidth, 850);
    if (canvasWidth < 650) canvasWidth = 650;
}
