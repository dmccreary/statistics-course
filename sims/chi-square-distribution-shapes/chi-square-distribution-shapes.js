// Chi-Square Distribution Shapes MicroSim
// Compare how the chi-square distribution changes with different degrees of freedom
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 380;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let margin = 25;
let defaultTextSize = 16;

// Distribution parameters
let selectedDf = 5;
let showMultiple = true;
let showCritical = true;
let alpha = 0.05;

// Fixed df values for multiple display
let dfValues = [2, 5, 10, 15, 20];
let dfColors = ['#E53935', '#FB8C00', '#2E7D32', '#1976D2', '#7B1FA2'];

// Sylvia theme
let sylviaGreen = '#2E7D32';
let sylviaAuburn = '#B5651D';

// UI state
let draggingDf = false;

// Precomputed gamma values for common df
let gammaCache = {};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    // Precompute gamma values
    for (let df = 1; df <= 35; df++) {
        gammaCache[df] = gamma(df / 2);
    }

    describe('Interactive visualization showing how chi-square distribution shape changes with degrees of freedom', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area
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
    textSize(18);
    text('Chi-Square Distribution Shapes', canvasWidth / 2, 8);

    // Graph area
    let graphLeft = margin + 40;
    let graphRight = canvasWidth - margin - 20;
    let graphTop = 50;
    let graphBottom = drawHeight - 60;

    drawAxes(graphLeft, graphRight, graphTop, graphBottom);

    if (showMultiple) {
        // Draw all comparison curves
        for (let i = 0; i < dfValues.length; i++) {
            drawChiSquareCurve(graphLeft, graphRight, graphTop, graphBottom, dfValues[i], dfColors[i], false);
        }
        drawLegend(graphRight);
    } else {
        // Draw single curve with selected df
        drawChiSquareCurve(graphLeft, graphRight, graphTop, graphBottom, selectedDf, sylviaGreen, showCritical);
    }

    // Draw mean marker for selected df (dashed line)
    if (!showMultiple) {
        let meanX = map(selectedDf, 0, 30, graphLeft, graphRight);
        if (meanX >= graphLeft && meanX <= graphRight) {
            stroke(sylviaAuburn);
            strokeWeight(2);
            drawingContext.setLineDash([5, 5]);
            line(meanX, graphTop, meanX, graphBottom);
            drawingContext.setLineDash([]);

            fill(sylviaAuburn);
            noStroke();
            textAlign(CENTER, TOP);
            textSize(11);
            text('mean = ' + selectedDf, meanX, graphBottom + 20);
        }
    }

    drawControls();
    drawStatistics();
}

function gamma(z) {
    // Lanczos approximation for gamma function
    if (z < 0.5) {
        return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    }
    z -= 1;
    let g = 7;
    let c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
             771.32342877765313, -176.61502916214059, 12.507343278686905,
             -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    let x = c[0];
    for (let i = 1; i < g + 2; i++) {
        x += c[i] / (z + i);
    }
    let t = z + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

function chiSquarePDF(x, df) {
    if (x <= 0) return 0;
    let k = df / 2;
    let gammaK = gammaCache[df] || gamma(k);
    let coefficient = 1 / (Math.pow(2, k) * gammaK);
    let pdf = coefficient * Math.pow(x, k - 1) * Math.exp(-x / 2);
    return pdf;
}

function chiSquareCritical(df, alpha) {
    // Approximation for chi-square critical values
    // Wilson-Hilferty approximation
    let zAlpha = 1.645; // for alpha = 0.05
    if (alpha === 0.01) zAlpha = 2.326;
    if (alpha === 0.10) zAlpha = 1.282;

    let h = 2 / (9 * df);
    let critical = df * Math.pow(1 - h + zAlpha * Math.sqrt(h), 3);
    return critical;
}

function drawChiSquareCurve(left, right, top, bottom, df, col, showShading) {
    // Find max density for scaling
    let maxDensity = 0;
    for (let x = 0.1; x <= 30; x += 0.1) {
        let d = chiSquarePDF(x, df);
        if (d > maxDensity) maxDensity = d;
    }

    let criticalValue = chiSquareCritical(df, alpha);

    // Draw shaded critical region
    if (showShading && showCritical) {
        fill(red(color(col)), green(color(col)), blue(color(col)), 80);
        noStroke();
        beginShape();
        let critX = map(criticalValue, 0, 30, left, right);
        vertex(critX, bottom);
        for (let px = critX; px <= right; px++) {
            let x = map(px, left, right, 0, 30);
            let density = chiSquarePDF(x, df);
            let y = map(density, 0, maxDensity * 1.2, bottom, top);
            y = constrain(y, top, bottom);
            vertex(px, y);
        }
        vertex(right, bottom);
        endShape(CLOSE);
    }

    // Draw curve
    stroke(col);
    strokeWeight(showMultiple ? 2.5 : 3);
    noFill();
    beginShape();
    for (let px = left; px <= right; px++) {
        let x = map(px, left, right, 0, 30);
        let density = chiSquarePDF(x, df);
        let y = map(density, 0, maxDensity * 1.2, bottom, top);
        y = constrain(y, top, bottom);
        vertex(px, y);
    }
    endShape();

    // Draw critical value marker
    if (showShading && showCritical) {
        let critX = map(criticalValue, 0, 30, left, right);
        stroke(col);
        strokeWeight(1);
        drawingContext.setLineDash([3, 3]);
        line(critX, top, critX, bottom);
        drawingContext.setLineDash([]);

        fill(col);
        noStroke();
        textAlign(CENTER, BOTTOM);
        textSize(10);
        text('crit=' + criticalValue.toFixed(2), critX, top - 2);
    }
}

function drawAxes(left, right, top, bottom) {
    // X-axis
    stroke(100);
    strokeWeight(2);
    line(left, bottom, right, bottom);

    // Y-axis
    line(left, top, left, bottom);

    // X-axis labels
    textAlign(CENTER, TOP);
    textSize(10);
    fill(100);
    noStroke();

    for (let val = 0; val <= 30; val += 5) {
        let x = map(val, 0, 30, left, right);
        stroke(100);
        strokeWeight(1);
        line(x, bottom, x, bottom + 5);
        noStroke();
        text(val, x, bottom + 8);
    }

    // Axis label
    textAlign(CENTER, TOP);
    textSize(12);
    fill(80);
    text('Chi-Square Value (x)', (left + right) / 2, bottom + 25);

    // Y-axis label
    push();
    translate(15, (top + bottom) / 2);
    rotate(-PI / 2);
    textAlign(CENTER, CENTER);
    text('Probability Density', 0, 0);
    pop();
}

function drawLegend(rightEdge) {
    let legendX = rightEdge - 100;
    let legendY = 55;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(legendX, legendY, 95, 110, 5);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    text('Degrees of Freedom', legendX + 5, legendY + 5);

    for (let i = 0; i < dfValues.length; i++) {
        let y = legendY + 25 + i * 16;
        stroke(dfColors[i]);
        strokeWeight(3);
        line(legendX + 10, y + 5, legendX + 30, y + 5);

        fill(dfColors[i]);
        noStroke();
        textSize(11);
        text('df = ' + dfValues[i], legendX + 38, y);
    }
}

function drawStatistics() {
    if (showMultiple) return;

    let statsX = canvasWidth - 180;
    let statsY = 55;

    fill(255, 255, 255, 230);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(statsX, statsY, 160, 70, 5);

    fill(sylviaGreen);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text('df = ' + selectedDf, statsX + 10, statsY + 8);

    textSize(11);
    fill(80);
    text('Mean = ' + selectedDf.toFixed(1), statsX + 10, statsY + 28);
    text('Variance = ' + (2 * selectedDf).toFixed(1), statsX + 10, statsY + 44);

    if (showCritical) {
        let crit = chiSquareCritical(selectedDf, alpha);
        fill(sylviaAuburn);
        text('Critical (' + (alpha*100) + '%) = ' + crit.toFixed(2), statsX + 10, statsY + 60);
    }
}

function drawControls() {
    let y = drawHeight + 10;

    // Degrees of freedom slider (single mode)
    textSize(11);
    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    text('Degrees of Freedom:', 10, y + 12);

    // Slider track
    let sliderLeft = 140;
    let sliderRight = 280;
    fill(220);
    rect(sliderLeft, y + 6, sliderRight - sliderLeft, 12, 3);

    // Slider handle
    let dfPos = map(selectedDf, 1, 30, sliderLeft, sliderRight);
    fill(sylviaGreen);
    ellipse(dfPos, y + 12, 16, 16);

    // Current value display
    fill(sylviaGreen);
    textAlign(LEFT, CENTER);
    textSize(12);
    text(selectedDf, sliderRight + 10, y + 12);

    // Toggle: Show multiple curves
    let toggleX = 340;
    fill(showMultiple ? sylviaGreen : '#ccc');
    rect(toggleX, y + 2, 100, 22, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(10);
    text(showMultiple ? 'Multiple DFs' : 'Single DF', toggleX + 50, y + 13);

    // Toggle: Show critical region
    let critToggleX = 450;
    fill(showCritical ? sylviaAuburn : '#ccc');
    rect(critToggleX, y + 2, 90, 22, 4);
    fill('white');
    text(showCritical ? 'Critical: ON' : 'Critical: OFF', critToggleX + 45, y + 13);

    // Reset button
    let resetX = canvasWidth - 70;
    fill(100);
    rect(resetX, y + 2, 60, 22, 4);
    fill('white');
    text('Reset', resetX + 30, y + 13);

    // Second row - alpha selector
    let y2 = y + 32;
    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Significance level (alpha):', 10, y2 + 10);

    // Alpha buttons
    let alphas = [0.10, 0.05, 0.01];
    let alphaLabels = ['0.10', '0.05', '0.01'];
    for (let i = 0; i < alphas.length; i++) {
        let bx = 150 + i * 55;
        fill(alpha === alphas[i] ? sylviaAuburn : '#ddd');
        rect(bx, y2 + 2, 50, 18, 3);
        fill(alpha === alphas[i] ? 'white' : 'black');
        textAlign(CENTER, CENTER);
        text(alphaLabels[i], bx + 25, y2 + 11);
    }

    // Instructions
    fill(100);
    textAlign(LEFT, CENTER);
    textSize(9);
    text('Tip: Chi-square is always right-skewed and becomes more symmetric as df increases', 340, y2 + 10);
}

function mousePressed() {
    let y = drawHeight + 10;

    // Check slider
    let sliderLeft = 140;
    let sliderRight = 280;
    if (mouseY >= y && mouseY <= y + 24) {
        if (mouseX >= sliderLeft - 10 && mouseX <= sliderRight + 10) {
            draggingDf = true;
            updateDfFromMouse();
            return;
        }
    }

    // Toggle multiple curves
    let toggleX = 340;
    if (mouseX >= toggleX && mouseX <= toggleX + 100 && mouseY >= y + 2 && mouseY <= y + 24) {
        showMultiple = !showMultiple;
        return;
    }

    // Toggle critical region
    let critToggleX = 450;
    if (mouseX >= critToggleX && mouseX <= critToggleX + 90 && mouseY >= y + 2 && mouseY <= y + 24) {
        showCritical = !showCritical;
        return;
    }

    // Reset button
    let resetX = canvasWidth - 70;
    if (mouseX >= resetX && mouseX <= resetX + 60 && mouseY >= y + 2 && mouseY <= y + 24) {
        selectedDf = 5;
        showMultiple = true;
        showCritical = true;
        alpha = 0.05;
        return;
    }

    // Alpha buttons
    let y2 = y + 32;
    let alphas = [0.10, 0.05, 0.01];
    for (let i = 0; i < alphas.length; i++) {
        let bx = 150 + i * 55;
        if (mouseX >= bx && mouseX <= bx + 50 && mouseY >= y2 + 2 && mouseY <= y2 + 20) {
            alpha = alphas[i];
            return;
        }
    }
}

function updateDfFromMouse() {
    let sliderLeft = 140;
    let sliderRight = 280;
    selectedDf = Math.round(map(mouseX, sliderLeft, sliderRight, 1, 30));
    selectedDf = constrain(selectedDf, 1, 30);
}

function mouseDragged() {
    if (draggingDf) {
        updateDfFromMouse();
    }
}

function mouseReleased() {
    draggingDf = false;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
