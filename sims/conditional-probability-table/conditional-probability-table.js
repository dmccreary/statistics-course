// Conditional Probability Two-Way Table Explorer MicroSim
// CANVAS_HEIGHT: 490
// Students pick a "given" condition (a row or column) and an outcome in a
// two-way table and see the conditional probability built from the counts.
// Bloom Level: Apply (L3) - calculate
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 440;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let margin = 20;
let defaultTextSize = 14;

// Sylvia theme colors
const sylviaGreen = '#2E7D32';
const sylviaGreenDark = '#1B5E20';
const sylviaAuburn = '#B5651D';
const sylviaCream = '#FFF8E1';
const condBlue = '#BBDEFB';      // condition (given) highlight
const condBlueDark = '#1565C0';
const outcomeOrange = '#FF9800'; // outcome cell highlight
const outcomeOrangeDark = '#E65100';
const calcGreen = '#2E7D32';     // calculation text
const neutralColor = '#546E7A';

// Example datasets. counts[row][col]
const datasets = [
    {
        name: 'Breakfast & Alertness (chapter)', who: 'students',
        rows: ['Ate Breakfast', 'No Breakfast'], cols: ['Alert', 'Not Alert'],
        counts: [[72, 18], [33, 77]]
    },
    {
        name: 'Medical Test (chapter)', who: 'people',
        rows: ['Tests Positive', 'Tests Negative'], cols: ['Has Disease', 'No Disease'],
        counts: [[190, 980], [10, 8820]]
    },
    {
        name: 'Rain & Commute (chapter)', who: 'days',
        rows: ['Rain', 'No Rain'], cols: ['On Time', 'Late'],
        counts: [[15, 45], [180, 60]]
    },
    {
        name: 'Sports & Honor Roll (made-up data)', who: 'students',
        rows: ['Plays a Sport', 'No Sport'], cols: ['Honor Roll', 'Not Honor Roll'],
        counts: [[48, 72], [32, 48]]
    }
];

// State
let dataIndex = 0;
let cond = null;      // { type: 'row' | 'col', index: 0 | 1 }
let outcome = null;   // index in the other dimension
let hint = '';        // short message after an invalid click
let hintFrames = 0;

// canvas UI state
let uiButtons = [];
let uiHover = false;
let dropdown = null;
let dropdownOpen = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textSize(defaultTextSize);
    describe('A two-way table of counts. Clicking a row or column label chooses the given condition ' +
        'and highlights it; clicking an outcome highlights one cell. The conditional probability is ' +
        'shown as a fraction, as shaded bars, and as a step-by-step calculation compared with the ' +
        'unconditional probability.', LABEL);
}

// ---------- Table arithmetic ----------
function rowTotal(i) {
    const c = datasets[dataIndex].counts;
    return c[i][0] + c[i][1];
}

function colTotal(j) {
    const c = datasets[dataIndex].counts;
    return c[0][j] + c[1][j];
}

function grandTotal() {
    return rowTotal(0) + rowTotal(1);
}

// Everything needed to display P(outcome | condition)
function currentCalc() {
    if (!cond) return null;
    const d = datasets[dataIndex];
    const isRow = cond.type === 'row';
    const r = {
        condName: isRow ? d.rows[cond.index] : d.cols[cond.index],
        denom: isRow ? rowTotal(cond.index) : colTotal(cond.index),
        total: grandTotal()
    };
    if (outcome !== null) {
        r.outName = isRow ? d.cols[outcome] : d.rows[outcome];
        r.numer = isRow ? d.counts[cond.index][outcome] : d.counts[outcome][cond.index];
        r.outTotal = isRow ? colTotal(outcome) : rowTotal(outcome);
        r.pCond = r.numer / r.denom;      // P(outcome | condition)
        r.pMarg = r.outTotal / r.total;   // P(outcome)
    }
    return r;
}

function fmtN(n) {
    return n.toLocaleString('en-US');
}

function fmtP(p) {
    return p.toFixed(3);
}

function fmtPct(p) {
    return (100 * p).toFixed(1) + '%';
}

function draw() {
    updateCanvasSize();
    uiButtons = [];
    uiHover = false;
    if (hintFrames > 0) hintFrames--;

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);
    // Control area
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    noStroke();
    fill(sylviaGreenDark);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    textSize(canvasWidth < 560 ? 16 : 20);
    text('Conditional Probability: Two-Way Table Explorer', canvasWidth / 2, 10);
    textStyle(NORMAL);

    drawStepBanner();
    const split = canvasWidth * 0.56;
    drawTable(margin, 78, split - margin - 6, 218);
    drawFractionPanel(split + 6, 78, canvasWidth - margin - split - 6, 218);
    drawCalculation(margin, 304, canvasWidth - 2 * margin, 128);
    drawControls();
    drawDropdownList();
    cursor(uiHover ? HAND : ARROW);
}

function drawStepBanner() {
    let msg, col;
    if (hintFrames > 0) {
        msg = hint;
        col = '#C62828';
    } else if (!cond) {
        msg = 'Step 1: Click a row or column label to choose the GIVEN condition.';
        col = condBlueDark;
    } else if (outcome === null) {
        msg = 'Step 2: Click an outcome inside the highlighted ' + (cond.type === 'row' ? 'row' : 'column') + '.';
        col = outcomeOrangeDark;
    } else {
        msg = 'Step 3: Read the calculation. Click another outcome or label to try again.';
        col = calcGreen;
    }
    fill(255);
    stroke(col);
    strokeWeight(2);
    rect(margin, 40, canvasWidth - 2 * margin, 30, 8);
    noStroke();
    fill(col);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    let ts = 15;
    textSize(ts);
    while (textWidth(msg) > canvasWidth - 2 * margin - 20 && ts > 10) { ts--; textSize(ts); }
    text(msg, margin + 10, 56);
    textStyle(NORMAL);
}

// ---------- Two-way table ----------
function drawTable(x, y, w, h) {
    const d = datasets[dataIndex];
    const colW = [w * 0.32, w * 0.24, w * 0.24, w * 0.20];
    const rowH = h / 4;
    const cx = [x, x + colW[0], x + colW[0] + colW[1], x + colW[0] + colW[1] + colW[2]];
    const small = w < 340;

    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            const cellX = cx[c], cellY = y + r * rowH, cw = colW[c];
            const isRowHead = c === 0 && (r === 1 || r === 2);
            const isColHead = r === 0 && (c === 1 || c === 2);
            const isData = (r === 1 || r === 2) && (c === 1 || c === 2);
            const isTotal = r === 3 || c === 3;
            const ri = r - 1, ci = c - 1;

            // Is this cell part of the restricted sample space?
            let inCond = false, isDenom = false, isOutcome = false, isOutHead = false;
            if (cond) {
                if (cond.type === 'row') {
                    inCond = r === cond.index + 1;
                    isDenom = inCond && c === 3;
                    if (outcome !== null) {
                        isOutcome = inCond && c === outcome + 1;
                        isOutHead = r === 0 && c === outcome + 1;
                    }
                } else {
                    inCond = c === cond.index + 1;
                    isDenom = inCond && r === 3;
                    if (outcome !== null) {
                        isOutcome = inCond && r === outcome + 1;
                        isOutHead = c === 0 && r === outcome + 1;
                    }
                }
            }
            const dim = cond && !inCond && !isOutHead;

            // Which cells respond to a click?
            let clickable = false;
            if (isRowHead || isColHead) clickable = true;
            if (isData && cond) clickable = inCond;
            const hover = clickable && !dropdownOpen && overRect(cellX, cellY, cw, rowH);
            if (hover) uiHover = true;

            // background
            let bg = color(238);                                  // unselected: light gray
            if (isRowHead || isColHead || (r === 0 && c === 0)) bg = color(224, 231, 236);
            if (isTotal) bg = color(228);
            if (inCond) bg = color(condBlue);                     // condition: light blue
            if (isOutcome && isData) bg = color(outcomeOrange);   // outcome: bright orange
            if (hover && !isOutcome) bg = lerpColor(bg, color('#90CAF9'), 0.45);
            fill(bg);
            stroke(isDenom ? condBlueDark : 170);
            strokeWeight(isDenom ? 3 : 1);
            rect(cellX, cellY, cw, rowH);

            // text
            let label = '';
            if (r === 0 && c === 0) label = '';
            else if (r === 0) label = c === 3 ? 'Total' : d.cols[ci];
            else if (c === 0) label = r === 3 ? 'Total' : d.rows[ri];
            else if (r === 3 && c === 3) label = fmtN(grandTotal());
            else if (r === 3) label = fmtN(colTotal(ci));
            else if (c === 3) label = fmtN(rowTotal(ri));
            else label = fmtN(d.counts[ri][ci]);

            noStroke();
            const isHeadText = r === 0 || c === 0;
            fill(dim ? 165 : 25);
            if (isOutHead) fill(outcomeOrangeDark);
            textStyle(isHeadText || inCond || isTotal ? BOLD : NORMAL);
            textAlign(CENTER, CENTER);
            let ts = isHeadText ? (small ? 12 : 14) : (small ? 15 : 18);
            textSize(ts);
            const lines = isHeadText ? wrapLines(label, cw - 8) : [label];
            while (isHeadText && lines.length > 2 && ts > 9) {
                ts--;
                textSize(ts);
                lines.length = 0;
                for (const ln of wrapLines(label, cw - 8)) lines.push(ln);
            }
            const lh = ts + 2;
            for (let i = 0; i < lines.length; i++) {
                text(lines[i], cellX + cw / 2, cellY + rowH / 2 + (i - (lines.length - 1) / 2) * lh + 1);
            }
            textStyle(NORMAL);

            if (isRowHead) uiButtons.push({ id: 'rowhead-' + ri, x: cellX, y: cellY, w: cw, h: rowH, enabled: true });
            else if (isColHead) uiButtons.push({ id: 'colhead-' + ci, x: cellX, y: cellY, w: cw, h: rowH, enabled: true });
            else if (isData) uiButtons.push({ id: 'cell-' + ri + '-' + ci, x: cellX, y: cellY, w: cw, h: rowH, enabled: true });
        }
    }
}

// ---------- Fraction and bar visuals ----------
function drawFractionPanel(x, y, w, h) {
    const d = datasets[dataIndex];
    const k = currentCalc();
    fill(255);
    stroke(210);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    noStroke();
    if (!k) {
        fill(neutralColor);
        textAlign(CENTER, CENTER);
        textSize(14);
        const lines = wrapLines('Choose a condition to shrink the sample space. Only the highlighted ' +
            d.who + ' will count.', w - 30);
        for (let i = 0; i < lines.length; i++) text(lines[i], x + w / 2, y + h / 2 + (i - (lines.length - 1) / 2) * 19);
        return;
    }

    // fraction
    const fx = x + w * 0.27, fy = y + 50;
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(26);
    fill(outcomeOrangeDark);
    text(outcome !== null ? fmtN(k.numer) : '?', fx, fy - 20);
    fill(condBlueDark);
    text(fmtN(k.denom), fx, fy + 22);
    stroke(60);
    strokeWeight(2);
    const lineW = max(textWidth(fmtN(k.denom)), 44) + 14;
    line(fx - lineW / 2, fy + 1, fx + lineW / 2, fy + 1);
    noStroke();
    fill(calcGreen);
    textAlign(LEFT, CENTER);
    textSize(w < 280 ? 18 : 22);
    text(outcome !== null ? '= ' + fmtP(k.pCond) : '= ?', fx + lineW / 2 + 10, fy + 1);
    textStyle(NORMAL);

    // bar for the restricted sample space
    const bx = x + 12, bw = w - 24, bh = 18;
    let by = y + 112;
    fill(40);
    textAlign(LEFT, BOTTOM);
    let ts = w < 280 ? 11 : 13;
    textSize(ts);
    let cap = 'Given ' + k.condName + ': ' + fmtN(k.denom) + ' ' + d.who;
    while (textWidth(cap) > bw && ts > 9) { ts--; textSize(ts); }
    text(cap, bx, by - 3);
    fill(condBlue);
    stroke(condBlueDark);
    strokeWeight(1.5);
    rect(bx, by, bw, bh, 3);
    if (outcome !== null) {
        noStroke();
        fill(outcomeOrange);
        rect(bx + 1, by + 1, max(1, (bw - 2) * k.pCond), bh - 2, 2);
        fill(40);
        textAlign(LEFT, TOP);
        textSize(w < 280 ? 10 : 12);
        text(fmtN(k.numer) + ' of them: ' + k.outName + ' (' + fmtPct(k.pCond) + ')', bx, by + bh + 3);
    }

    // bar for the whole table (no condition)
    by = y + 178;
    fill(40);
    noStroke();
    textAlign(LEFT, BOTTOM);
    textSize(w < 280 ? 11 : 13);
    text('Everyone: ' + fmtN(k.total) + ' ' + d.who, bx, by - 3);
    fill(238);
    stroke(150);
    strokeWeight(1);
    rect(bx, by, bw, bh, 3);
    if (outcome !== null) {
        noStroke();
        fill('#FFCC80');
        rect(bx + 1, by + 1, max(1, (bw - 2) * k.pMarg), bh - 2, 2);
        fill(40);
        textAlign(LEFT, TOP);
        textSize(w < 280 ? 10 : 12);
        text(fmtN(k.outTotal) + ' of them: ' + k.outName + ' (' + fmtPct(k.pMarg) + ')', bx, by + bh + 3);
    }
}

// ---------- Step-by-step calculation ----------
function drawCalculation(x, y, w, h) {
    const k = currentCalc();
    fill(255, 255, 255, 235);
    stroke(k && outcome !== null ? calcGreen : 200);
    strokeWeight(k && outcome !== null ? 2 : 1);
    rect(x, y, w, h, 10);
    noStroke();

    if (!k) {
        fill(40);
        textAlign(LEFT, TOP);
        textSize(15);
        const lines = wrapLines('A conditional probability P(A | B) only looks at the cases where B ' +
            'happened. In a two-way table, that means one row or one column becomes the whole ' +
            'sample space, and its total becomes the denominator.', w - 28);
        for (let i = 0; i < lines.length; i++) text(lines[i], x + 14, y + 14 + i * 21);
        return;
    }

    if (outcome === null) {
        fill(40);
        textAlign(LEFT, TOP);
        textSize(15);
        const lines = wrapLines('Given "' + k.condName + '": the sample space shrinks from ' + fmtN(k.total) +
            ' to ' + fmtN(k.denom) + '. That total (outlined in blue) is the denominator. Now pick the ' +
            'outcome you want the probability of.', w - 28);
        for (let i = 0; i < lines.length; i++) text(lines[i], x + 14, y + 14 + i * 21);
        return;
    }

    // Line 1: the conditional probability, in green
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    let ts = canvasWidth < 600 ? 15 : 18;
    textSize(ts);
    const line1 = 'P(' + k.outName + ' | ' + k.condName + ') = ' + fmtN(k.numer) + ' / ' + fmtN(k.denom) +
        ' = ' + fmtP(k.pCond) + ' = ' + fmtPct(k.pCond);
    while (textWidth(line1) > w - 28 && ts > 10) { ts--; textSize(ts); }
    fill(calcGreen);
    text(line1, x + 14, y + 12);
    textStyle(NORMAL);

    // Line 2: comparison with the unconditional probability
    ts = canvasWidth < 600 ? 13 : 15;
    textSize(ts);
    const line2 = 'Without the condition: P(' + k.outName + ') = ' + fmtN(k.outTotal) + ' / ' + fmtN(k.total) +
        ' = ' + fmtP(k.pMarg) + ' = ' + fmtPct(k.pMarg);
    while (textWidth(line2) > w - 28 && ts > 10) { ts--; textSize(ts); }
    fill(60);
    text(line2, x + 14, y + 42);

    // Line 3: interpretation
    let msg;
    const diff = k.pCond - k.pMarg;
    if (Math.abs(diff) < 1e-9) {
        msg = 'Knowing "' + k.condName + '" does not change the probability of "' + k.outName +
            '" at all. In this table the two events are independent.';
    } else {
        msg = 'Knowing "' + k.condName + '" ' + (diff > 0 ? 'raises' : 'lowers') + ' the probability of "' +
            k.outName + '" from ' + fmtPct(k.pMarg) + ' to ' + fmtPct(k.pCond) + '. The condition changes what we expect.';
    }
    fill(sylviaAuburn);
    textStyle(BOLD);
    textSize(canvasWidth < 600 ? 12 : 14);
    const lines = wrapLines(msg, w - 28);
    for (let i = 0; i < lines.length && i < 3; i++) text(lines[i], x + 14, y + 70 + i * 18);
    textStyle(NORMAL);
}

// ---------- Controls (drawn on the canvas) ----------
function drawControls() {
    const y1 = drawHeight + 10, h1 = 30, gap = 10;
    let x = margin;
    if (canvasWidth >= 600) {
        noStroke();
        fill(40);
        textAlign(LEFT, CENTER);
        textStyle(BOLD);
        textSize(14);
        text('Dataset:', x, y1 + h1 / 2);
        textStyle(NORMAL);
        x += 68;
    }
    const wReset = canvasWidth < 600 ? 120 : 140;
    uiDropdown(x, y1, canvasWidth - margin - x - wReset - gap, h1);
    uiButton('reset', canvasWidth - margin - wReset, y1, wReset, h1, 'Reset Selection', { fill: neutralColor });
}

function uiButton(id, x, y, w, h, label, opts) {
    opts = opts || {};
    const enabled = opts.enabled !== false;
    const hover = enabled && !dropdownOpen && overRect(x, y, w, h);
    const base = color(opts.fill || sylviaGreen);

    if (!enabled) { fill(228); stroke(200); }
    else {
        fill(hover ? lerpColor(base, color(255), 0.22) : base);
        stroke(lerpColor(base, color(0), 0.3));
    }
    strokeWeight(1);
    rect(x, y, w, h, 6);

    noStroke();
    fill(enabled ? 255 : 150);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    let ts = 14;
    textSize(ts);
    while (textWidth(label) > w - 8 && ts > 9) { ts--; textSize(ts); }
    text(label, x + w / 2, y + h / 2 + 1);
    textStyle(NORMAL);

    uiButtons.push({ id: id, x: x, y: y, w: w, h: h, enabled: enabled });
    if (hover) uiHover = true;
}

// Dataset selector drawn on the canvas; the option list opens upward
function uiDropdown(x, y, w, h) {
    const hover = overRect(x, y, w, h);
    fill(255);
    stroke(dropdownOpen || hover ? sylviaGreen : 150);
    strokeWeight(dropdownOpen ? 2 : 1);
    rect(x, y, w, h, 6);
    noStroke();
    fill(30);
    textAlign(LEFT, CENTER);
    let ts = 14;
    textSize(ts);
    const label = datasets[dataIndex].name;
    while (textWidth(label) > w - 30 && ts > 9) { ts--; textSize(ts); }
    text(label, x + 8, y + h / 2 + 1);
    fill(80);
    triangle(x + w - 18, y + h / 2 - 3, x + w - 8, y + h / 2 - 3, x + w - 13, y + h / 2 + 4);
    dropdown = { x: x, y: y, w: w, h: h, itemH: 28, listW: max(w, 280) };
    if (hover) uiHover = true;
}

function drawDropdownList() {
    if (!dropdownOpen || !dropdown) return;
    const d = dropdown;
    const listH = datasets.length * d.itemH;
    const ly = d.y - listH - 2;
    fill(255);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(d.x, ly, d.listW, listH, 6);
    for (let i = 0; i < datasets.length; i++) {
        const iy = ly + i * d.itemH;
        const hover = overRect(d.x, iy, d.listW, d.itemH);
        noStroke();
        if (hover || i === dataIndex) {
            fill(hover ? '#C8E6C9' : '#E8F5E9');
            rect(d.x + 2, iy + 2, d.listW - 4, d.itemH - 4, 4);
        }
        if (hover) uiHover = true;
        fill(30);
        textAlign(LEFT, CENTER);
        textSize(14);
        text(datasets[i].name, d.x + 10, iy + d.itemH / 2 + 1);
    }
}

function overRect(x, y, w, h) {
    return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

function wrapLines(str, maxW) {
    const words = str.split(' ');
    const lines = [];
    let cur = '';
    for (const wd of words) {
        const test = cur ? cur + ' ' + wd : wd;
        if (cur && textWidth(test) > maxW) { lines.push(cur); cur = wd; }
        else cur = test;
    }
    if (cur) lines.push(cur);
    return lines;
}

// ---------- Interaction ----------
function mousePressed() {
    if (dropdownOpen) {
        const d = dropdown;
        const listH = datasets.length * d.itemH;
        const ly = d.y - listH - 2;
        if (overRect(d.x, ly, d.listW, listH)) {
            dataIndex = constrain(floor((mouseY - ly) / d.itemH), 0, datasets.length - 1);
            cond = null;
            outcome = null;
        }
        dropdownOpen = false;
        return;
    }
    if (dropdown && overRect(dropdown.x, dropdown.y, dropdown.w, dropdown.h)) {
        dropdownOpen = true;
        return;
    }
    for (const b of uiButtons) {
        if (b.enabled && overRect(b.x, b.y, b.w, b.h)) {
            handleButton(b.id);
            return;
        }
    }
}

function showHint(msg) {
    hint = msg;
    hintFrames = 150;
}

function handleButton(id) {
    hintFrames = 0;
    if (id === 'reset') {
        cond = null;
        outcome = null;
        return;
    }
    const parts = id.split('-');
    if (parts[0] === 'rowhead' || parts[0] === 'colhead') {
        const type = parts[0] === 'rowhead' ? 'row' : 'col';
        const i = int(parts[1]);
        if (!cond) {
            cond = { type: type, index: i };          // Step 1: choose the condition
            outcome = null;
        } else if (cond.type === type) {
            if (cond.index === i) { cond = null; outcome = null; }   // click again to clear
            else { cond = { type: type, index: i }; outcome = null; } // switch condition
        } else {
            outcome = i;                              // Step 2: a label from the other variable is the outcome
        }
    } else if (parts[0] === 'cell') {
        const ri = int(parts[1]), ci = int(parts[2]);
        if (!cond) {
            showHint('Choose the GIVEN condition first: click a row or column label.');
        } else if (cond.type === 'row') {
            if (ri === cond.index) outcome = ci;
            else showHint('That cell is outside the given row. Pick a cell in the highlighted row.');
        } else {
            if (ci === cond.index) outcome = ri;
            else showHint('That cell is outside the given column. Pick a cell in the highlighted column.');
        }
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = max(containerWidth, 360);
}
