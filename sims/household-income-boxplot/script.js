const householdCountInput = document.getElementById("householdCount");
const medianIncomeInput = document.getElementById("medianIncome");
const inequalityInput = document.getElementById("inequality");
const addHighOutlierInput = document.getElementById("addHighOutlier");
const showPointsInput = document.getElementById("showPoints");
const showMeanInput = document.getElementById("showMean");
const regenerateButton = document.getElementById("regenerate");

const householdCountValue = document.getElementById("householdCountValue");
const medianIncomeValue = document.getElementById("medianIncomeValue");
const inequalityValue = document.getElementById("inequalityValue");

const summary = document.getElementById("summary");
const center = document.getElementById("center");

let cachedIncomes = [];

function logNormalSample(median, sigma) {
    let u = 0;
    let v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    const mu = Math.log(median);
    return Math.exp(mu + sigma * z);
}

function clampIncome(value) {
    return Math.min(400, Math.max(15, Math.round(value)));
}

function generateIncomes(count, median, sigma, addOutlier) {
    const incomes = [];
    for (let i = 0; i < count; i += 1) {
        incomes.push(clampIncome(logNormalSample(median, sigma)));
    }

    if (addOutlier && incomes.length > 0) {
        const top = clampIncome(median * (6 + sigma * 2));
        incomes[0] = top;
    }

    return incomes;
}

function quantile(sorted, q) {
    if (sorted.length === 1) return sorted[0];
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] === undefined) return sorted[base];
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
}

function mean(values) {
    return values.reduce((total, value) => total + value, 0) / values.length;
}

function summarize(values) {
    const sorted = [...values].sort((a, b) => a - b);
    return {
        min: sorted[0],
        q1: quantile(sorted, 0.25),
        median: quantile(sorted, 0.5),
        q3: quantile(sorted, 0.75),
        max: sorted[sorted.length - 1]
    };
}

function updateControls() {
    householdCountValue.textContent = householdCountInput.value;
    medianIncomeValue.textContent = medianIncomeInput.value;
    inequalityValue.textContent = inequalityInput.value;
}

function updatePlot() {
    const count = Number(householdCountInput.value);
    const median = Number(medianIncomeInput.value);
    const sigma = Number(inequalityInput.value);
    const addOutlier = addHighOutlierInput.checked;
    const showPoints = showPointsInput.checked;

    cachedIncomes = generateIncomes(count, median, sigma, addOutlier);

    const traces = [
        {
            y: cachedIncomes,
            type: "box",
            name: "City",
            boxpoints: showPoints ? "all" : false,
            jitter: 0.35,
            pointpos: -1.6,
            marker: { color: "#2E7D32" },
            line: { color: "#1B5E20" }
        }
    ];

    const avg = mean(cachedIncomes);
    if (showMeanInput.checked) {
        traces.push({
            x: ["City"],
            y: [avg],
            type: "scatter",
            mode: "markers",
            name: "Mean",
            marker: { color: "#B5651D", size: 10, symbol: "diamond" },
            hovertemplate: "Mean: %{y:.1f}k<extra></extra>"
        });
    }

    const layout = {
        title: "Household Incomes (thousands of $)",
        margin: { t: 50, l: 60, r: 20, b: 40 },
        yaxis: {
            range: [0, 420],
            title: "Income (thousands)"
        },
        xaxis: {
            title: "City"
        },
        paper_bgcolor: "#fffef7",
        plot_bgcolor: "#fffef7",
        showlegend: showMeanInput.checked
    };

    Plotly.react("plot", traces, layout, { displayModeBar: false, responsive: true });

    const summaryStats = summarize(cachedIncomes);
    summary.textContent = `Min ${summaryStats.min}k, Q1 ${summaryStats.q1.toFixed(1)}k, Median ${summaryStats.median.toFixed(1)}k, Q3 ${summaryStats.q3.toFixed(1)}k, Max ${summaryStats.max}k`;

    const meanValue = avg.toFixed(1);
    const medianValue = summaryStats.median.toFixed(1);
    center.textContent = `Mean ≈ ${meanValue}k vs Median ≈ ${medianValue}k (right-skewed ⇒ mean > median).`;
}

function regenerate() {
    updatePlot();
}

function bindEvents() {
    const inputs = [
        householdCountInput,
        medianIncomeInput,
        inequalityInput,
        addHighOutlierInput,
        showPointsInput,
        showMeanInput
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
