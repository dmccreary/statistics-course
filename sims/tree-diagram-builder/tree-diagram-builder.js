// Interactive Tree Diagram Builder MicroSim
// CANVAS_HEIGHT: 530
// Students build a probability tree by editing branch probabilities, then
// multiply along paths for joint probabilities and reverse the condition.
// Bloom Level: Apply (L3) - construct
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 750;
let drawHeight = 480;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let margin = 20;
let defaultTextSize = 14;

// Sylvia theme colors
const sylviaGreen = '#2E7D32';
const sylviaGreenDark = '#1B5E20';
const sylviaAuburn = '#B5651D';
const sylviaCream = '#FFF8E1';
const neutralColor = '#546E7A';
const errorRed = '#C62828';
const highlightYellow = '#FFEB3B';
// first-level branch colors: blue, green, teal, indigo
const firstColors = ['#1565C0', '#2E7D32', '#00838F', '#4527A0'];
// second-level branch colors: orange, purple
const secondColors = ['#D84315', '#7B1FA2'];

// Preset examples from the chapter. Probabilities are kept as typed strings.
const presets = [
    {
        name: 'Medical Test',
        first: [['Disease', '0.02', ['0.95', '0.05']], ['No Disease', '0.98', ['0.10', '0.90']]],
        outcomes: ['Positive', 'Negative']
    },
    {
        name: 'Rain & Commute',
        first: [['Rain', '0.20', ['0.25', '0.75']], ['No Rain', '0.80', ['0.75', '0.25']]],
        outcomes: ['On Time', 'Late']
    },
    {
        name: 'Defective Products',
        first: [['Machine A', '0.60', ['0.03', '0.97']], ['Machine B', '0.40', ['0.05', '0.95']]],
        outcomes: ['Defective', 'Good']
    }
];

// State
let presetIndex = 0;
let branches = [];        // [{ name, p, kids: [p, p] }] with probabilities as strings
let outcomes = [];
let secondLevel = true;
let calculated = true;    // are the results (joint probabilities) showing?
let active = null;        // chip being edited: { i, j }  (j = -1 for a first-level branch)
let buffer = '';
let fresh = false;        // first keystroke replaces the old value
let notice = '';          // short message after a rejected entry
let noticeFrames = 0;
let chips = [];           // clickable probability chips, rebuilt each frame
let leaves = [];          // leaf rows for hover detection

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
    loadPreset(0);
    describe('A probability tree that grows from left to right. The first set of branches shows the ' +
        'first event, the second set shows conditional probabilities, and each end point shows the ' +
        'joint probability found by multiplying along its path. Branch probabilities can be edited.', LABEL);
}

function loadPreset(i) {
    presetIndex = i;
    const p = presets[i];
    branches = p.first.map(b => ({ name: b[0], p: b[1], kids: b[2].slice() }));
    outcomes = p.outcomes.slice();
    secondLevel = true;
    calculated = true;
    active = null;
}

// ---------- Tree arithmetic ----------
function num(s) {
    const v = Number(s);
    return (s === '' || isNaN(v)) ? NaN : v;
}

function closeToOne(v) {
    return Math.abs(v - 1) < 1e-6;
}

function firstSum() {
    let s = 0;
    for (const b of branches) s += num(b.p);
    return s;
}

function kidSum(i) {
    return num(branches[i].kids[0]) + num(branches[i].kids[1]);
}

function treeValid() {
    if (!closeToOne(firstSum())) return false;
    if (secondLevel) {
        for (let i = 0; i < branches.length; i++) if (!closeToOne(kidSum(i))) return false;
    }
    return true;
}

// Joint probability of a path: P(first) x P(second | first)
function joint(i, j) {
    return num(branches[i].p) * num(branches[i].kids[j]);
}

// Total probability of an outcome: add the paths that end in that outcome
function outcomeTotal(j) {
    let s = 0;
    for (let i = 0; i < branches.length; i++) s += joint(i, j);
    return s;
}

// Up to 4 decimal places, without trailing zeros
function fmt(v) {
    let s = v.toFixed(4).replace(/0+$/, '');
    if (s.endsWith('.')) s += '0';
    return s;
}

function draw() {
    updateCanvasSize();
    uiButtons = [];
    chips = [];
    leaves = [];
    uiHover = false;
    if (noticeFrames > 0) noticeFrames--;

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
    textSize(canvasWidth < 520 ? 17 : 20);
    text('Interactive Tree Diagram Builder', canvasWidth / 2, 10);
    textStyle(NORMAL);

    drawTree();
    drawSummary(margin, 372, canvasWidth - 2 * margin, 100);
    drawControls();
    drawDropdownList();
    cursor(uiHover ? HAND : ARROW);
}

// ---------- Tree ----------
function drawTree() {
    const small = canvasWidth < 640;
    const top = 62, bottom = 362;
    const xRoot = margin + 16;
    const x1 = canvasWidth * (small ? 0.27 : 0.29);
    const x2 = canvasWidth * (small ? 0.53 : 0.56);
    const k = branches.length;
    const showResults = calculated && treeValid();

    // column headings
    noStroke();
    fill(neutralColor);
    textStyle(BOLD);
    textSize(small ? 11 : 13);
    textAlign(CENTER, TOP);
    text('First event', (xRoot + x1) / 2, 40);
    if (secondLevel) text('Second event (given the first)', (x1 + x2) / 2 + 10, 40);
    textAlign(RIGHT, TOP);
    text(secondLevel ? 'Multiply along each path' : 'End points', canvasWidth - margin, 40);
    textStyle(NORMAL);

    // positions
    const leafCount = secondLevel ? 2 * k : k;
    const spacing = (bottom - top) / leafCount;
    const y1 = [], yLeaf = [];
    for (let i = 0; i < k; i++) {
        if (secondLevel) {
            yLeaf.push([top + spacing * (2 * i + 0.5), top + spacing * (2 * i + 1.5)]);
            y1.push(top + spacing * (2 * i + 1));
        } else {
            y1.push(top + spacing * (i + 0.5));
        }
    }
    const yRoot = (top + bottom) / 2;

    // which leaf is the mouse over?
    let hot = null;
    if (!dropdownOpen && mouseX > x1 + 30 && mouseX < canvasWidth - margin && mouseY > top && mouseY < bottom) {
        for (let i = 0; i < k; i++) {
            if (secondLevel) {
                for (let j = 0; j < 2; j++) {
                    if (Math.abs(mouseY - yLeaf[i][j]) < spacing / 2 && mouseX > x2 - 40) hot = { i: i, j: j };
                }
            }
        }
    }
    hotLeaf = showResults ? hot : null;

    // path highlight (drawn first, underneath)
    if (hotLeaf) {
        stroke(highlightYellow);
        strokeWeight(14);
        line(xRoot, yRoot, x1, y1[hotLeaf.i]);
        line(x1, y1[hotLeaf.i], x2, yLeaf[hotLeaf.i][hotLeaf.j]);
    }

    // first-level branches
    for (let i = 0; i < k; i++) {
        const col = firstColors[i % firstColors.length];
        stroke(col);
        strokeWeight(3);
        line(xRoot, yRoot, x1, y1[i]);
    }
    // second-level branches
    if (secondLevel) {
        for (let i = 0; i < k; i++) {
            for (let j = 0; j < 2; j++) {
                stroke(secondColors[j]);
                strokeWeight(3);
                line(x1, y1[i], x2, yLeaf[i][j]);
            }
        }
    }

    // root node
    fill(255);
    stroke(80);
    strokeWeight(2);
    ellipse(xRoot, yRoot, 18, 18);
    noStroke();
    fill(60);
    textAlign(CENTER, TOP);
    textSize(small ? 10 : 12);
    text('Start', xRoot, yRoot + 12);

    // first-level nodes, names, and probability chips
    const firstOK = closeToOne(firstSum());
    for (let i = 0; i < k; i++) {
        const col = firstColors[i % firstColors.length];
        fill(col);
        stroke(255);
        strokeWeight(2);
        ellipse(x1, y1[i], 16, 16);

        noStroke();
        fill(col);
        textStyle(BOLD);
        textSize(small ? 11 : 14);
        if (secondLevel) {
            // keep the name clear of the incoming branch: above it for upper nodes, below for lower ones
            if (y1[i] <= yRoot + 1) {
                textAlign(CENTER, BOTTOM);
                text(branches[i].name, x1 - 6, y1[i] - 10);
            } else {
                textAlign(CENTER, TOP);
                text(branches[i].name, x1 - 10, y1[i] + 12);
            }
        } else {
            textAlign(LEFT, CENTER);
            text(branches[i].name + (firstOK ? ':  P = ' + fmt(num(branches[i].p)) : ''), x1 + 14, y1[i]);
        }
        textStyle(NORMAL);

        const t = 0.72;
        drawChip(lerp(xRoot, x1, t), lerp(yRoot, y1[i], t), i, -1, col, firstOK);
    }
    if (!firstOK) {
        noStroke();
        fill(errorRed);
        textAlign(LEFT, TOP);
        textStyle(BOLD);
        textSize(small ? 10 : 12);
        const s = firstSum();
        text('Sum = ' + (isNaN(s) ? '?' : fmt(s)), margin, top - 2);
        text('(must be 1)', margin, top + 12);
        textStyle(NORMAL);
    }

    // leaves
    if (secondLevel) {
        for (let i = 0; i < k; i++) {
            const pairOK = closeToOne(kidSum(i));
            for (let j = 0; j < 2; j++) {
                const y = yLeaf[i][j];
                const isHot = hotLeaf && hotLeaf.i === i && hotLeaf.j === j;
                fill(secondColors[j]);
                stroke(255);
                strokeWeight(2);
                ellipse(x2, y, 14, 14);

                // with four branches the leaves are close together, so the labels sit nearer the leaf
                const t2 = k >= 4 ? 0.8 : 0.56;
                drawChip(lerp(x1, x2, t2), lerp(y1[i], y, t2), i, j, secondColors[j], pairOK);

                // leaf label and joint probability
                noStroke();
                textAlign(LEFT, CENTER);
                let ts = small ? 11 : 14;
                textSize(ts);
                textStyle(BOLD);
                const name = outcomes[j];
                let rest = '';
                if (showResults) {
                    rest = ':  ' + branches[i].p + ' × ' + branches[i].kids[j] + ' = ' + fmt(joint(i, j));
                }
                const room = canvasWidth - margin - (x2 + 12);
                while (textWidth(name + rest) > room && ts > 9) { ts--; textSize(ts); }
                if (isHot) {
                    fill(highlightYellow);
                    rect(x2 + 9, y - 11, textWidth(name + rest) + 8, 22, 4);
                }
                fill(secondColors[j]);
                text(name, x2 + 12, y + 1);
                fill(30);
                text(rest, x2 + 12 + textWidth(name), y + 1);
                textStyle(NORMAL);

                leaves.push({ i: i, j: j, y: y });
            }
            if (!pairOK) {
                noStroke();
                fill(errorRed);
                textAlign(LEFT, CENTER);
                textStyle(BOLD);
                textSize(small ? 10 : 12);
                const s = kidSum(i);
                // to the right of the outcome names (results are hidden while a sum is wrong)
                text('Sum = ' + (isNaN(s) ? '?' : fmt(s)) + ' (must be 1)', x2 + (small ? 78 : 100), y1[i]);
                textStyle(NORMAL);
            }
        }
    }
}

let hotLeaf = null;

// Editable probability label on a branch
function drawChip(cx, cy, i, j, col, ok) {
    const isActive = active && active.i === i && active.j === j;
    const value = j < 0 ? branches[i].p : branches[i].kids[j];
    const shown = isActive ? buffer : value;
    const w = 54, h = 24;
    const x = cx - w / 2, y = cy - h / 2;
    const hover = !dropdownOpen && overRect(x, y, w, h);
    if (hover) uiHover = true;

    fill(isActive ? '#FFFDE7' : (hover ? '#F1F8E9' : 255));
    stroke(ok ? (isActive ? sylviaGreenDark : col) : errorRed);
    strokeWeight(isActive || !ok ? 3 : 1.5);
    rect(x, y, w, h, 6);

    noStroke();
    fill(isActive && fresh ? 130 : 20);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(14);
    text(shown, cx, cy + 1);
    if (isActive && frameCount % 60 < 32) {
        stroke(20);
        strokeWeight(1.5);
        const tx = cx + textWidth(shown) / 2 + 2;
        line(tx, y + 5, tx, y + h - 5);
    }
    textStyle(NORMAL);
    chips.push({ i: i, j: j, x: x, y: y, w: w, h: h });
}

// ---------- Summary panel ----------
function drawSummary(x, y, w, h) {
    const valid = treeValid();
    fill(255, 255, 255, 235);
    stroke(!valid ? errorRed : (calculated && secondLevel ? sylviaGreen : 200));
    strokeWeight(!valid || (calculated && secondLevel) ? 2 : 1);
    rect(x, y, w, h, 10);

    noStroke();
    textAlign(LEFT, TOP);
    const small = canvasWidth < 640;
    let ts = small ? 12 : 14;
    textSize(ts);
    const lh = ts + 6;
    const lx = x + 12;
    let ly = y + 9;

    if (noticeFrames > 0) {
        fill(errorRed);
        textStyle(BOLD);
        text(notice, lx, ly);
        textStyle(NORMAL);
        return;
    }
    if (!valid) {
        fill(errorRed);
        textStyle(BOLD);
        const lines = wrapLines('The probabilities leaving each branch point must add up to 1. Fix the ' +
            'values outlined in red, then click Calculate.', w - 24);
        for (let i = 0; i < lines.length; i++) text(lines[i], lx, ly + i * lh);
        textStyle(NORMAL);
        return;
    }
    if (!secondLevel) {
        fill(40);
        const lines = wrapLines('One level: the branch probabilities add to ' + fmt(firstSum()) +
            '. Turn on the second level to add conditional probabilities and multiply along paths.', w - 24);
        for (let i = 0; i < lines.length; i++) text(lines[i], lx, ly + i * lh);
        return;
    }
    if (!calculated) {
        fill(40);
        const lines = wrapLines('Probabilities changed. Predict each joint probability by multiplying ' +
            'along its path, then click Calculate to check.', w - 24);
        for (let i = 0; i < lines.length; i++) text(lines[i], lx, ly + i * lh);
        return;
    }

    // totals for each outcome: add the paths that lead to the same outcome
    for (let j = 0; j < 2; j++) {
        const parts = branches.map((b, i) => fmt(joint(i, j)));
        let line1 = 'P(' + outcomes[j] + ') = ' + parts.join(' + ') + ' = ' + fmt(outcomeTotal(j));
        textStyle(BOLD);
        let s = ts;
        textSize(s);
        while (textWidth(line1) > w - 24 && s > 9) { s--; textSize(s); }
        fill(secondColors[j]);
        text(line1, lx, ly);
        textStyle(NORMAL);
        textSize(ts);
        ly += lh;
    }

    // hovered path: joint probability and the reversed conditional probability
    ly += 2;
    if (hotLeaf) {
        const i = hotLeaf.i, j = hotLeaf.j;
        const tot = outcomeTotal(j);
        const jp = joint(i, j);
        const a = branches[i].name, o = outcomes[j];
        fill(30);
        textStyle(BOLD);
        let l1 = 'P(' + a + ' AND ' + o + ') = ' + fmt(jp) + '.  ';
        let l2 = tot > 0
            ? 'Reverse it: P(' + a + ' | ' + o + ') = ' + fmt(jp) + ' / ' + fmt(tot) + ' = ' + (jp / tot).toFixed(3)
            : 'P(' + o + ') = 0, so P(' + a + ' | ' + o + ') is undefined.';
        let s = ts;
        textSize(s);
        if (textWidth(l1 + l2) <= w - 24) {
            text(l1 + l2, lx, ly);
        } else {
            while (textWidth(l2) > w - 24 && s > 9) { s--; textSize(s); }
            text(l1, lx, ly);
            text(l2, lx, ly + lh - 2);
        }
        textStyle(NORMAL);
    } else {
        fill(neutralColor);
        text('Hover over an end point to highlight its path and reverse the condition.', lx, ly);
    }
}

// ---------- Controls (drawn on the canvas) ----------
function drawControls() {
    const y1 = drawHeight + 10, h1 = 30, gap = 8;
    const small = canvasWidth < 680;
    const wReset = small ? 52 : 62, wCalc = small ? 76 : 90, wLevel = small ? 104 : 128;
    const wStep = 26, wCount = 20;
    textSize(small ? 12 : 14);
    textStyle(BOLD);
    const labelW = small ? 0 : textWidth('Branches:') + 6;
    textStyle(NORMAL);
    const fixed = labelW + 2 * wStep + wCount + wLevel + wCalc + wReset + 5 * gap;
    const wDrop = max(110, canvasWidth - 2 * margin - fixed);

    let x = margin;
    uiDropdown(x, y1, wDrop, h1);
    x += wDrop + gap;

    if (!small) {
        noStroke();
        fill(40);
        textAlign(LEFT, CENTER);
        textStyle(BOLD);
        textSize(14);
        text('Branches:', x, y1 + h1 / 2);
        textStyle(NORMAL);
        x += labelW;
    }
    uiButton('fewer', x, y1, wStep, h1, '−', { enabled: branches.length > 2, fill: neutralColor });
    x += wStep;
    noStroke();
    fill(30);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(15);
    text(branches.length, x + wCount / 2, y1 + h1 / 2 + 1);
    textStyle(NORMAL);
    x += wCount;
    uiButton('more', x, y1, wStep, h1, '+', { enabled: branches.length < 4, fill: neutralColor });
    x += wStep + gap;

    uiButton('level', x, y1, wLevel, h1, secondLevel ? 'Second Level: On' : 'Second Level: Off',
        { fill: secondLevel ? secondColors[0] : neutralColor });
    x += wLevel + gap;
    uiButton('calc', x, y1, wCalc, h1, 'Calculate', { fill: sylviaGreen, pulse: !calculated && secondLevel, enabled: secondLevel });
    x += wCalc + gap;
    uiButton('reset', x, y1, wReset, h1, 'Reset', { fill: neutralColor });
}

function uiButton(id, x, y, w, h, label, opts) {
    opts = opts || {};
    const enabled = opts.enabled !== false;
    const hover = enabled && !dropdownOpen && overRect(x, y, w, h);
    const base = color(opts.fill || sylviaGreen);

    if (!enabled) { fill(228); stroke(200); }
    else {
        fill(hover ? lerpColor(base, color(255), 0.22) : base);
        stroke(opts.pulse ? color(highlightYellow) : lerpColor(base, color(0), 0.3));
    }
    strokeWeight(opts.pulse ? 3 : 1);
    rect(x, y, w, h, 6);

    noStroke();
    fill(enabled ? 255 : 150);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    let ts = 14;
    textSize(ts);
    while (textWidth(label) > w - 6 && ts > 9) { ts--; textSize(ts); }
    text(label, x + w / 2, y + h / 2 + 1);
    textStyle(NORMAL);

    uiButtons.push({ id: id, x: x, y: y, w: w, h: h, enabled: enabled });
    if (hover) uiHover = true;
}

// Preset selector drawn on the canvas; the option list opens upward
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
    const label = presets[presetIndex].name;
    while (textWidth(label) > w - 30 && ts > 9) { ts--; textSize(ts); }
    text(label, x + 8, y + h / 2 + 1);
    fill(80);
    triangle(x + w - 18, y + h / 2 - 3, x + w - 8, y + h / 2 - 3, x + w - 13, y + h / 2 + 4);
    dropdown = { x: x, y: y, w: w, h: h, itemH: 28, listW: max(w, 190) };
    if (hover) uiHover = true;
}

function drawDropdownList() {
    if (!dropdownOpen || !dropdown) return;
    const d = dropdown;
    const listH = presets.length * d.itemH;
    const ly = d.y - listH - 2;
    fill(255);
    stroke(sylviaGreen);
    strokeWeight(2);
    rect(d.x, ly, d.listW, listH, 6);
    for (let i = 0; i < presets.length; i++) {
        const iy = ly + i * d.itemH;
        const hover = overRect(d.x, iy, d.listW, d.itemH);
        noStroke();
        if (hover || i === presetIndex) {
            fill(hover ? '#C8E6C9' : '#E8F5E9');
            rect(d.x + 2, iy + 2, d.listW - 4, d.itemH - 4, 4);
        }
        if (hover) uiHover = true;
        fill(30);
        textAlign(LEFT, CENTER);
        textSize(14);
        text(presets[i].name, d.x + 10, iy + d.itemH / 2 + 1);
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

// ---------- Editing ----------
function startEdit(i, j) {
    commitEdit();
    active = { i: i, j: j };
    buffer = j < 0 ? branches[i].p : branches[i].kids[j];
    fresh = true;
}

function commitEdit() {
    if (!active) return;
    const v = Number(buffer);
    if (buffer === '' || buffer === '.' || isNaN(v) || v < 0 || v > 1) {
        if (!fresh) {
            notice = 'A probability must be a number from 0 to 1. The old value was kept.';
            noticeFrames = 180;
        }
    } else {
        let s = buffer;
        if (s.startsWith('.')) s = '0' + s;
        if (s.endsWith('.')) s = s.slice(0, -1);
        const old = active.j < 0 ? branches[active.i].p : branches[active.i].kids[active.j];
        if (s !== old) {
            if (active.j < 0) branches[active.i].p = s;
            else branches[active.i].kids[active.j] = s;
            calculated = false;   // results are hidden until Calculate is clicked again
        }
    }
    active = null;
}

function nextChip(step) {
    // order: each first-level chip followed by its two second-level chips
    const order = [];
    for (let i = 0; i < branches.length; i++) {
        order.push({ i: i, j: -1 });
        if (secondLevel) { order.push({ i: i, j: 0 }); order.push({ i: i, j: 1 }); }
    }
    let idx = order.findIndex(c => c.i === active.i && c.j === active.j);
    idx = (idx + step + order.length) % order.length;
    startEdit(order[idx].i, order[idx].j);
}

// ---------- Interaction ----------
function mousePressed() {
    if (dropdownOpen) {
        const d = dropdown;
        const listH = presets.length * d.itemH;
        const ly = d.y - listH - 2;
        if (overRect(d.x, ly, d.listW, listH)) {
            loadPreset(constrain(floor((mouseY - ly) / d.itemH), 0, presets.length - 1));
        }
        dropdownOpen = false;
        return;
    }
    for (const c of chips) {
        if (overRect(c.x, c.y, c.w, c.h)) {
            startEdit(c.i, c.j);
            return;
        }
    }
    commitEdit();
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

function handleButton(id) {
    if (id === 'calc') {
        calculated = true;
    } else if (id === 'reset') {
        loadPreset(presetIndex);
    } else if (id === 'level') {
        secondLevel = !secondLevel;
        calculated = false;
    } else if (id === 'more' && branches.length < 4) {
        // a new branch starts at 0 so the student must rebalance the probabilities
        branches.push({ name: 'Branch ' + (branches.length + 1), p: '0', kids: ['0.5', '0.5'] });
        calculated = false;
    } else if (id === 'fewer' && branches.length > 2) {
        branches.pop();
        calculated = false;
    }
}

function keyPressed() {
    if (!active) return;
    if (keyCode === BACKSPACE || keyCode === DELETE) {
        buffer = fresh ? '' : buffer.slice(0, -1);
        fresh = false;
    } else if (keyCode === ENTER) {
        commitEdit();
    } else if (keyCode === ESCAPE) {
        active = null;
    } else if (keyCode === TAB) {
        nextChip(keyIsDown(SHIFT) ? -1 : 1);
    } else if ((key >= '0' && key <= '9') || key === '.') {
        if (fresh) { buffer = ''; fresh = false; }
        if (key === '.' && buffer.includes('.')) return false;
        if (buffer.length < 6) buffer += key;
    } else {
        return;
    }
    return false;
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
