/* Study Design Concept Map
 * ========================
 * Interactive visualization showing how foundational statistics concepts
 * connect in the context of a real research study (sleep and GPA study).
 *
 * Features:
 * - Click nodes to see definitions and examples
 * - Related nodes highlight when one is selected
 * - Sequential animation on load
 * - Hub-and-spoke layout with Study at center
 */

// ===========================================
// CONFIGURATION - Node colors by category
// ===========================================
const colors = {
    study: {
        background: '#1e293b',
        border: '#0f172a',
        font: '#ffffff',
        highlight: { background: '#334155', border: '#1e293b' }
    },
    population: {
        background: '#3b82f6',
        border: '#2563eb',
        font: '#ffffff',
        highlight: { background: '#60a5fa', border: '#3b82f6' }
    },
    sample: {
        background: '#f97316',
        border: '#ea580c',
        font: '#ffffff',
        highlight: { background: '#fb923c', border: '#f97316' }
    },
    variable: {
        background: '#22c55e',
        border: '#16a34a',
        font: '#ffffff',
        highlight: { background: '#4ade80', border: '#22c55e' }
    },
    relationship: {
        background: '#a855f7',
        border: '#9333ea',
        font: '#ffffff',
        highlight: { background: '#c084fc', border: '#a855f7' }
    },
    dim: {
        background: '#e2e8f0',
        border: '#cbd5e1',
        font: '#94a3b8'
    }
};

// Edge colors
const edgeColors = {
    normal: '#94a3b8',
    highlighted: '#3b82f6',
    dim: '#e2e8f0'
};

// ===========================================
// NODE DATA with definitions and examples
// ===========================================
const conceptData = {
    study: {
        id: 'study',
        label: 'Sleep Study',
        category: 'study',
        x: 0,
        y: 10,
        definition: 'A research investigation designed to answer a specific question using data.',
        example: 'Research Question: Does sleep duration affect academic performance in high school students?'
    },
    population: {
        id: 'population',
        label: 'Population',
        category: 'population',
        x: -280,
        y: -120,
        definition: 'The entire group of individuals we want to study and draw conclusions about.',
        example: 'All U.S. high school students (approximately 15 million students)'
    },
    sample: {
        id: 'sample',
        label: 'Sample',
        category: 'sample',
        x: -280,
        y: 120,
        definition: 'A subset of the population that we actually collect data from.',
        example: '500 randomly selected students from 25 high schools across 5 states'
    },
    parameter: {
        id: 'parameter',
        label: 'Parameter',
        category: 'population',
        x: -450,
        y: -120,
        definition: 'A numerical value that describes some characteristic of the entire population. Usually unknown.',
        example: 'True average sleep hours for ALL U.S. high school students = ? (unknown)'
    },
    statistic: {
        id: 'statistic',
        label: 'Statistic',
        category: 'sample',
        x: -450,
        y: 120,
        definition: 'A numerical value calculated from sample data. Used to estimate the parameter.',
        example: 'Sample average sleep = 6.8 hours (calculated from our 500 students)'
    },
    variables: {
        id: 'variables',
        label: 'Variables',
        category: 'variable',
        x: 200,
        y: -50,
        definition: 'Characteristics or quantities that can vary among individuals in a study.',
        example: 'In our study: sleep hours, GPA, grade level, gender, extracurricular activities'
    },
    quantitative: {
        id: 'quantitative',
        label: 'Quantitative',
        category: 'variable',
        x: 380,
        y: -140,
        definition: 'Variables measured with numbers that have meaningful mathematical operations.',
        example: 'Sleep hours (6.5, 7.2, 8.0), GPA (3.2, 3.8, 2.9), Age (14, 15, 16, 17, 18)'
    },
    categorical: {
        id: 'categorical',
        label: 'Categorical',
        category: 'variable',
        x: 380,
        y: 40,
        definition: 'Variables that place individuals into groups or categories.',
        example: 'Grade level (9th, 10th, 11th, 12th), Gender, School type (public/private)'
    },
    continuous: {
        id: 'continuous',
        label: 'Continuous',
        category: 'variable',
        x: 520,
        y: -200,
        definition: 'Quantitative variables that can take any value within a range.',
        example: 'Sleep hours: 6.5, 7.25, 8.0 (any decimal value is possible)'
    },
    discrete: {
        id: 'discrete',
        label: 'Discrete',
        category: 'variable',
        x: 520,
        y: -80,
        definition: 'Quantitative variables that can only take specific, countable values.',
        example: 'Number of AP classes: 0, 1, 2, 3, 4, 5 (whole numbers only)'
    },
    distribution: {
        id: 'distribution',
        label: 'Distribution',
        category: 'sample',
        x: -100,
        y: 200,
        definition: 'The pattern of how values are spread across a variable. Shows shape, center, and spread.',
        example: 'Sleep hours distribution: bell-shaped, centered around 6.8 hours, spread from 4 to 10 hours'
    },
    explanatory: {
        id: 'explanatory',
        label: 'Explanatory\nVariable',
        category: 'relationship',
        x: 150,
        y: 170,
        definition: 'The variable we think might influence or explain changes in another variable (the "cause").',
        example: 'Sleep hours - we hypothesize more sleep leads to better academic performance'
    },
    response: {
        id: 'response',
        label: 'Response\nVariable',
        category: 'relationship',
        x: 350,
        y: 170,
        definition: 'The variable we think is being influenced or affected (the "effect" we measure).',
        example: 'GPA - the outcome we think might change based on sleep habits'
    }
};

// ===========================================
// EDGE DATA - connections between concepts
// ===========================================
const edgeData = [
    // Study connections
    { from: 'study', to: 'population', label: 'defines' },
    { from: 'study', to: 'sample', label: 'collects' },
    { from: 'study', to: 'variables', label: 'measures' },

    // Population-Sample relationship
    { from: 'population', to: 'sample', label: 'sampled from' },
    { from: 'population', to: 'parameter', label: 'characterized by' },
    { from: 'sample', to: 'statistic', label: 'calculated from' },
    { from: 'statistic', to: 'parameter', label: 'estimates', dashed: true },

    // Variable hierarchy
    { from: 'variables', to: 'quantitative', label: '' },
    { from: 'variables', to: 'categorical', label: '' },
    { from: 'quantitative', to: 'continuous', label: '' },
    { from: 'quantitative', to: 'discrete', label: '' },

    // Distribution and relationships
    { from: 'sample', to: 'distribution', label: 'shows pattern' },
    { from: 'study', to: 'explanatory', label: '' },
    { from: 'explanatory', to: 'response', label: 'may affect', dashed: true }
];

// ===========================================
// STATE VARIABLES
// ===========================================
let nodes, edges, network;
let selectedNode = null;
let animationComplete = false;

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

function isSaveEnabled() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('enable-save') === 'true';
}

function getConnectedNodes(nodeId) {
    const connected = new Set();
    edgeData.forEach(edge => {
        if (edge.from === nodeId) connected.add(edge.to);
        if (edge.to === nodeId) connected.add(edge.from);
    });
    return connected;
}

function getNodeCategory(nodeId) {
    const concept = conceptData[nodeId];
    return concept ? concept.category : 'study';
}

function getCategoryColor(category) {
    return colors[category] || colors.study;
}

// ===========================================
// VIEW POSITIONING
// ===========================================

function positionView() {
    if (network) {
        network.once('afterDrawing', function() {
            const currentPosition = network.getViewPosition();
            network.moveTo({
                position: {
                    x: currentPosition.x + 60,
                    y: currentPosition.y + 20
                },
                animation: false
            });
        });
    }
}

// ===========================================
// NETWORK INITIALIZATION
// ===========================================

function initializeNetwork() {
    selectedNode = null;
    animationComplete = false;

    // Create nodes from concept data
    const visNodes = Object.values(conceptData).map(concept => {
        const colorSet = getCategoryColor(concept.category);
        return {
            id: concept.id,
            label: concept.label,
            x: concept.x,
            y: concept.y,
            color: {
                background: colorSet.background,
                border: colorSet.border,
                highlight: colorSet.highlight
            },
            font: {
                color: colorSet.font,
                size: concept.id === 'study' ? 16 : 14,
                face: 'Arial',
                multi: true
            },
            borderWidth: concept.id === 'study' ? 4 : 3,
            size: concept.id === 'study' ? 35 : 25,
            shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.15)',
                size: 8,
                x: 2,
                y: 2
            }
        };
    });

    // Create edges
    const visEdges = edgeData.map((edge, index) => ({
        id: index,
        from: edge.from,
        to: edge.to,
        label: edge.label || '',
        color: { color: edgeColors.normal, highlight: edgeColors.highlighted },
        width: 2,
        dashes: edge.dashed || false,
        font: {
            size: 10,
            color: '#64748b',
            strokeWidth: 3,
            strokeColor: '#f8fafc'
        },
        arrows: {
            to: { enabled: true, scaleFactor: 0.8 }
        }
    }));

    nodes = new vis.DataSet(visNodes);
    edges = new vis.DataSet(visEdges);

    // Configure vis-network options
    const saveEnabled = isSaveEnabled();

    const options = {
        layout: {
            improvedLayout: false
        },
        physics: {
            enabled: false
        },
        interaction: {
            selectConnectedEdges: true,
            zoomView: saveEnabled,
            dragView: saveEnabled,
            dragNodes: saveEnabled,
            navigationButtons: saveEnabled,
            keyboard: saveEnabled,
            hover: true,
            tooltipDelay: 200
        },
        nodes: {
            shape: 'box',
            margin: 12,
            borderWidth: 3,
            borderWidthSelected: 4
        },
        edges: {
            smooth: {
                type: 'curvedCW',
                roundness: 0.15
            },
            selectionWidth: 2
        }
    };

    // Create the network
    const container = document.getElementById('network');
    const data = { nodes: nodes, edges: edges };
    network = new vis.Network(container, data, options);

    // Set up event handlers
    network.on('click', handleNodeClick);
    network.on('hoverNode', handleNodeHover);
    network.on('blurNode', handleNodeBlur);

    // Track node position changes for save functionality
    if (saveEnabled) {
        network.on('dragEnd', handleDragEnd);
    }

    // Position the view
    positionView();

    // Start entrance animation
    setTimeout(runEntranceAnimation, 300);

    // Reset info panel
    resetInfoPanel();
}

// ===========================================
// ENTRANCE ANIMATION
// ===========================================

function runEntranceAnimation() {
    // Animation order: study first, then outward
    const animationOrder = [
        'study',
        'population', 'sample', 'variables',
        'parameter', 'statistic', 'distribution', 'explanatory',
        'quantitative', 'categorical', 'response',
        'continuous', 'discrete'
    ];

    // Start all nodes invisible
    animationOrder.forEach(nodeId => {
        nodes.update({
            id: nodeId,
            hidden: true
        });
    });

    // Hide all edges initially
    edges.forEach(edge => {
        edges.update({
            id: edge.id,
            hidden: true
        });
    });

    // Reveal nodes sequentially
    let delay = 0;
    animationOrder.forEach((nodeId, index) => {
        setTimeout(() => {
            nodes.update({
                id: nodeId,
                hidden: false
            });

            // Reveal edges connected to this node
            edges.forEach(edge => {
                const edgeFrom = edgeData[edge.id].from;
                const edgeTo = edgeData[edge.id].to;

                // Show edge if both endpoints are now visible
                const fromVisible = !nodes.get(edgeFrom).hidden;
                const toVisible = !nodes.get(edgeTo).hidden;

                if (fromVisible && toVisible) {
                    edges.update({
                        id: edge.id,
                        hidden: false
                    });
                }
            });
        }, delay);
        delay += 120;
    });

    // Mark animation complete
    setTimeout(() => {
        animationComplete = true;
    }, delay + 200);
}

// ===========================================
// EVENT HANDLERS
// ===========================================

function handleNodeClick(params) {
    if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        selectNode(nodeId);
    } else {
        // Clicked on empty space
        clearSelection();
    }
}

function handleNodeHover(params) {
    if (!animationComplete) return;
    document.body.style.cursor = 'pointer';
}

function handleNodeBlur(params) {
    document.body.style.cursor = 'default';
}

function selectNode(nodeId) {
    selectedNode = nodeId;
    const concept = conceptData[nodeId];

    // Update info panel
    updateInfoPanel(concept);

    // Highlight related nodes
    highlightRelated(nodeId);

    // Show related concepts
    showRelatedConcepts(nodeId);

    // Update info panel border color based on category
    const infoPanel = document.getElementById('info-panel');
    const categoryColor = getCategoryColor(concept.category);
    infoPanel.style.borderLeftColor = categoryColor.background;
}

function clearSelection() {
    selectedNode = null;
    resetInfoPanel();
    resetHighlighting();
    hideRelatedPanel();
}

function highlightRelated(nodeId) {
    const connected = getConnectedNodes(nodeId);
    connected.add(nodeId);

    // Dim non-connected nodes
    Object.keys(conceptData).forEach(id => {
        if (connected.has(id)) {
            const colorSet = getCategoryColor(conceptData[id].category);
            nodes.update({
                id: id,
                color: {
                    background: colorSet.highlight.background,
                    border: colorSet.highlight.border
                },
                font: { color: colorSet.font }
            });
        } else {
            nodes.update({
                id: id,
                color: {
                    background: colors.dim.background,
                    border: colors.dim.border
                },
                font: { color: colors.dim.font }
            });
        }
    });

    // Highlight connected edges
    edges.forEach(edge => {
        const edgeFrom = edgeData[edge.id].from;
        const edgeTo = edgeData[edge.id].to;

        if (edgeFrom === nodeId || edgeTo === nodeId) {
            edges.update({
                id: edge.id,
                color: { color: edgeColors.highlighted },
                width: 3
            });
        } else {
            edges.update({
                id: edge.id,
                color: { color: edgeColors.dim },
                width: 1
            });
        }
    });
}

function resetHighlighting() {
    // Reset all nodes to their original colors
    Object.values(conceptData).forEach(concept => {
        const colorSet = getCategoryColor(concept.category);
        nodes.update({
            id: concept.id,
            color: {
                background: colorSet.background,
                border: colorSet.border
            },
            font: { color: colorSet.font }
        });
    });

    // Reset all edges
    edges.forEach(edge => {
        edges.update({
            id: edge.id,
            color: { color: edgeColors.normal },
            width: 2
        });
    });
}

// ===========================================
// UI UPDATES
// ===========================================

function updateInfoPanel(concept) {
    const titleEl = document.getElementById('info-title');
    const contentEl = document.getElementById('info-content');

    titleEl.textContent = concept.label.replace('\n', ' ');

    contentEl.innerHTML = `
        <p>${concept.definition}</p>
        <div class="info-example">
            <div class="info-example-label">Sleep Study Example</div>
            ${concept.example}
        </div>
    `;
}

function resetInfoPanel() {
    const titleEl = document.getElementById('info-title');
    const contentEl = document.getElementById('info-content');
    const infoPanel = document.getElementById('info-panel');

    titleEl.textContent = 'Click a Concept';
    contentEl.innerHTML = '<p class="info-placeholder">Click on any node to learn about that concept and see how it relates to the sleep study example.</p>';
    infoPanel.style.borderLeftColor = '#3b82f6';
}

function showRelatedConcepts(nodeId) {
    const connected = getConnectedNodes(nodeId);
    const relatedPanel = document.getElementById('related-panel');
    const relatedList = document.getElementById('related-list');

    if (connected.size > 0) {
        const tags = Array.from(connected).map(id => {
            const label = conceptData[id].label.replace('\n', ' ');
            return `<span class="related-tag">${label}</span>`;
        }).join('');

        relatedList.innerHTML = tags;
        relatedPanel.style.display = 'block';
    } else {
        relatedPanel.style.display = 'none';
    }
}

function hideRelatedPanel() {
    const relatedPanel = document.getElementById('related-panel');
    relatedPanel.style.display = 'none';
}

// ===========================================
// NODE POSITION SAVING (Editor Mode)
// ===========================================

function handleDragEnd(params) {
    if (params.nodes.length > 0) {
        params.nodes.forEach(nodeId => {
            const position = network.getPositions([nodeId])[nodeId];
            if (conceptData[nodeId]) {
                conceptData[nodeId].x = Math.round(position.x);
                conceptData[nodeId].y = Math.round(position.y);
            }
        });
    }
}

function saveNodePositions() {
    // Create data.json format
    const exportData = {
        metadata: {
            title: "Study Design Concept Map",
            description: "Interactive concept map showing foundational statistics concepts",
            lastUpdated: new Date().toISOString().split('T')[0]
        },
        nodes: Object.values(conceptData).map(concept => ({
            id: concept.id,
            label: concept.label,
            category: concept.category,
            x: concept.x,
            y: concept.y,
            definition: concept.definition,
            example: concept.example
        })),
        edges: edgeData
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('Node positions saved. Replace data.json with the downloaded file.');
}

function reset() {
    initializeNetwork();
}

// ===========================================
// INITIALIZATION
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the network
    initializeNetwork();

    // Set up button handlers
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', reset);
    }

    // Show save button if save mode is enabled
    if (isSaveEnabled()) {
        const saveBtn = document.getElementById('save-btn');
        if (saveBtn) {
            saveBtn.style.display = 'block';
            saveBtn.addEventListener('click', saveNodePositions);
        }
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (network) {
            network.fit();
        }
    });
});
