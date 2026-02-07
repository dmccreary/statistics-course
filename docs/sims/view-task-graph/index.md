---
title: Task Graph Viewer
description: Interactive MicroSim that visualizes the book task graph and highlights remaining work.
quality_score: 92
image: /sims/view-task-graph/view-task-graph.png
og:image: /sims/view-task-graph/view-task-graph.png
twitter:image: /sims/view-task-graph/view-task-graph.png
social:
   cards: false
---
# Task Graph Viewer

<iframe src="main.html" height="600px" scrolling="no"></iframe>

[Run the Task Graph Viewer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## Iframe Embed Code

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/statistics-course/sims/view-task-graph/main.html" height="600px" scrolling="no"></iframe>
```

## About This MicroSim

Sylvia says: "This graph is my acorn map! It shows which tasks are done, which ones are still waiting, and how everything depends on everything else."

This MicroSim visualizes the book’s task graph from `docs/learning-graph/tasks.json`. Each node is a task, and arrows show prerequisites. Colors represent task status, so you can spot what’s done, what’s in progress, and what remains.

**Key features:**

- **Search** for tasks by name
- **Filter by status** (To Do, In Progress, Done, Blocked)
- **Live stats** for visible tasks and remaining work
- **Interactive navigation** with zoom, pan, and node highlighting

## Lesson Plan

### Learning Objective

Students (or authors) will interpret a task dependency graph by identifying prerequisites, current progress, and remaining tasks.

**Bloom's Taxonomy Level**: Analyze (L4)

**Bloom's Verb**: Interpret

### Prerequisites

- Understanding of directed graphs and dependencies
- Familiarity with project workflows

### Suggested Duration

5-10 minutes for a status review

### Classroom Activities

#### Activity 1: Find the Bottleneck (3 minutes)

1. Search for a task labeled "Generate Learning Graph."
2. Highlight its prerequisites.
3. Ask: "What blocks this task from being completed?"

#### Activity 2: Status Scan (3 minutes)

1. Turn off "Done" tasks using the status filter.
2. Discuss: "Which tasks remain and where are they clustered?"

### Discussion Questions

1. Which tasks are foundational for the rest of the work?
2. How do prerequisites shape the order of the book build?
3. What happens if a key node is delayed?

### Assessment Opportunities

- Have learners describe the next three tasks they would complete and why.
- Identify a critical path through the graph.

### Common Misconceptions to Address

- **All nodes are independent**: Emphasize dependency arrows.
- **Done tasks don’t matter**: Show how they unlock future work.

## Technical Notes

- Built with vis-network.js
- Loads data from `docs/learning-graph/tasks.json`
- Responsive layout for iframe embedding

---

**Reminder**: Create a screenshot named `view-task-graph.png` for social media previews.
