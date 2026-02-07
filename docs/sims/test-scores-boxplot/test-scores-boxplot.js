const classSizeInput = document.getElementById("classSize");
const meanScoreInput = document.getElementById("meanScore");
const spreadInput = document.getElementById("spread");
const lowOutlierInput = document.getElementById("lowOutlier");
const showPointsInput = document.getElementById("showPoints");
const compareSectionsInput = document.getElementById("compareSections");
const meanScoreBInput = document.getElementById("meanScoreB");
const spreadBInput = document.getElementById("spreadB");
const regenerateButton = document.getElementById("regenerate");

const classSizeValue = document.getElementById("classSizeValue");
const meanScoreValue = document.getElementById("meanScoreValue");
const spreadValue = document.getElementById("spreadValue");
const meanScoreBValue = document.getElementById("meanScoreBValue");
const spreadBValue = document.getElementById("spreadBValue");

const statsA = document.getElementById("statsA");
const statsB = document.getElementById("statsB");

let cachedScoresA = [];
let cachedScoresB = [];

function normalSample(mean, sd) {
    let u = 0;
    let v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return mean + sd * z;
}

function clampScore(score) {
    return Math.min(100, Math.max(0, Math.round(score)));
}

function generateScores(n, mean, sd, addOutlier) {
    const scores = [];
    for (let i = 0; i < n; i += 1) {
        scores.push(clampScore(normalSample(mean, sd)));
    }

    if (addOutlier && scores.length > 0) {
        const low = clampScore(mean - 3 * sd - 8);
        scores[0] = low;
    }

    return scores;
}

function quantile(sorted, q) {
    if (sorted.length === 1) return sorted[0];
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] === undefined) return sorted[base];
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
}

function summarize(scores) {
    const sorted = [...scores].sort((a, b) => a - b);
    return {
        min: sorted[0],
        q1: quantile(sorted, 0.25),
        median: quantile(sorted, 0.5),
        q3: quantile(sorted, 0.75),
        max: sorted[sorted.length - 1]
    };
}

function formatSummary(summary) {
    return `Min ${summary.min}, Q1 ${summary.q1.toFixed(1)}, Median ${summary.median.toFixed(1)}, Q3 ${summary.q3.toFixed(1)}, Max ${summary.max}`;
}

function updateControls() {
    classSizeValue.textContent = classSizeInput.value;
    meanScoreValue.textContent = meanScoreInput.value;
    spreadValue.textContent = spreadInput.value;
    meanScoreBValue.textContent = meanScoreBInput.value;
    spreadBValue.textContent = spreadBInput.value;

    const compareEnabled = compareSectionsInput.checked;
    meanScoreBInput.disabled = !compareEnabled;
    spreadBInput.disabled = !compareEnabled;
}

function updatePlot() {
    const n = Number(classSizeInput.value);
    const meanA = Number(meanScoreInput.value);
    const sdA = Number(spreadInput.value);
    const addOutlier = lowOutlierInput.checked;
    const showPoints = showPointsInput.checked;

    cachedScoresA = generateScores(n, meanA, sdA, addOutlier);

    const traces = [
        {
            y: cachedScoresA,
            type: "box",
            name: "Section A",
            boxpoints: showPoints ? "all" : false,
            jitter: 0.35,
            pointpos: -1.6,
            marker: { color: "#2E7D32" },
            line: { color: "#1B5E20" }
        }
    ];

    if (compareSectionsInput.checked) {
        const meanB = Number(meanScoreBInput.value);
        const sdB = Number(spreadBInput.value);
        cachedScoresB = generateScores(n, meanB, sdB, addOutlier);
        traces.push({
            y: cachedScoresB,
            type: "box",
            name: "Section B",
            boxpoints: showPoints ? "all" : false,
            jitter: 0.35,
            pointpos: -1.6,
            marker: { color: "#B5651D" },
            line: { color: "#8B4513" }
        });
    } else {
        cachedScoresB = [];
    }

    const layout = {
        title: "Test Scores (0-100)",
        margin: { t: 50, l: 50, r: 20, b: 40 },
        yaxis: {
            range: [0, 100],
            title: "Score"
        },
        xaxis: {
            title: compareSectionsInput.checked ? "Class Sections" : "Class"
        },
        paper_bgcolor: "#fffef7",
        plot_bgcolor: "#fffef7",
        showlegend: compareSectionsInput.checked
    };

    Plotly.react("plot", traces, layout, { displayModeBar: false, responsive: true });

    const summaryA = summarize(cachedScoresA);
    statsA.textContent = formatSummary(summaryA);

    if (cachedScoresB.length > 0) {
        const summaryB = summarize(cachedScoresB);
        statsB.textContent = formatSummary(summaryB);
    } else {
        statsB.textContent = "Enable comparison to see Section B.";
    }
}

function regenerate() {
    updatePlot();
}

function bindEvents() {
    const inputs = [
        classSizeInput,
        meanScoreInput,
        spreadInput,
        lowOutlierInput,
        showPointsInput,
        compareSectionsInput,
        meanScoreBInput,
        spreadBInput
    ];

    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            updateControls();
            updatePlot();
        });
    });

    regenerateButton.addEventListener("click", regenerate);
}

bindEvents();
updateControls();
updatePlot();
