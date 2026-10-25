# AP Statistics

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/statistics-course/)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![Claude Skills](https://img.shields.io/badge/Uses-Claude%20Skills-DA7857?logo=anthropic)](https://github.com/dmccreary/ibook-skills)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## View the Live Site

Visit the interactive textbook at: [https://dmccreary.github.io/statistics-course/](https://dmccreary.github.io/statistics-course/)

## Overview

An interactive intelligent textbook for AP statistics designed for college credit.

This is an interactive, AI-assisted intelligent textbook built with MkDocs and the Material theme. It is organized around a learning graph of **300 concepts** with explicit prerequisite dependencies, so that no chapter relies on a concept that has not yet been introduced. Content is organized into **19 chapters** and uses Bloom's Taxonomy (2001 revision) to target learning outcomes from remembering through creating.

The book includes **120 interactive MicroSims**, a glossary of 295 terms, 80 FAQ entries and 190 quiz questions. Whether you are a student, an educator, or a self-learner, everything runs directly in your browser.

## Site Status and Metrics

| Metric | Count |
|--------|-------|
| Concepts in Learning Graph | 300 |
| Chapters | 19 |
| MicroSims | 120 |
| Glossary Terms | 295 |
| FAQ Questions | 80 |
| Quiz Questions | 190 |
| Diagrams | 96 |
| Equations | 1,064 |
| Total Words | 228,477 |
| Links | 742 |
| Equivalent Pages | 997 |

**Development Stage:** Not specified

Metrics are generated from `docs/learning-graph/book-metrics.json`.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/dmccreary/statistics-course.git
cd statistics-course
```

### Install Dependencies

```bash
pip install mkdocs mkdocs-material
```

### Build and Serve Locally

```bash
mkdocs build
mkdocs serve
```

Open your browser to `http://localhost:8000`.

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

## Repository Structure

```
statistics-course/
├── docs/                          # MkDocs documentation source
│   ├── chapters/                  # Chapter content (index.md per chapter)
│   ├── sims/                      # Interactive MicroSims (main.html, script.js, index.md)
│   ├── learning-graph/            # Learning graph CSV/JSON and quality reports
│   │   ├── learning-graph.csv     # Concept dependencies
│   │   ├── learning-graph.json    # vis-network format
│   │   └── book-metrics.json      # Canonical book metrics
│   ├── glossary.md                # ISO 11179-style definitions
│   └── faq.md                     # Frequently asked questions
├── mkdocs.yml                     # MkDocs configuration
└── README.md                      # This file
```

## Reporting Issues

Found a bug, typo, or have a suggestion? Please report it at [GitHub Issues](https://github.com/dmccreary/statistics-course/issues).

Include a description of the problem, steps to reproduce, expected vs. actual behavior, and browser details for MicroSim problems.

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

- **Attribution** — Give appropriate credit with a link to the original
- **NonCommercial** — No commercial use without permission
- **ShareAlike** — Distribute contributions under the same license

## Acknowledgements

- **[MkDocs](https://www.mkdocs.org/)** and **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** - Static site generator and theme
- **[vis-network](https://visjs.org/)** - Learning graph visualization
- **[Claude AI](https://claude.ai)** by Anthropic - AI-assisted content generation
- **[GitHub Pages](https://pages.github.com/)** - Free hosting

## Contact

**Dan McCreary**

- LinkedIn: [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- GitHub: [@dmccreary](https://github.com/dmccreary)

Questions or suggestions? Connect on LinkedIn or open an issue on [GitHub](https://github.com/dmccreary/statistics-course/issues).
