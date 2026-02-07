# Task Graph Analysis Tools

This directory contains Python utilities for analyzing the task graph stored at `docs/learning-graph/tasks.json`.
Each script uses graph libraries (NetworkX) to load the task graph and answer specific questions about progress.

## Setup

Install dependencies:

```bash
python -m pip install networkx
```

## Task Graph Schema Assumptions

The scripts expect the task graph JSON to include:

- `nodes`: list of task objects with `id`, `label`, `type`, `status`
- `edges`: list of dependency objects with `from`, `to`
- `meta`: optional metadata

Example:

```json
{
  "meta": {"version": "1.0"},
  "nodes": [{"id": "t-course-description", "label": "Create Course Description", "status": "done"}],
  "edges": []
}
```

## Scripts

### 0) Generate tasks.json
```bash
python src/tasks/generate-tasks-json.py
```

Creates (or overwrites) `docs/learning-graph/tasks.json` by inspecting chapter
content and MicroSim artifacts. Marks tasks as `done` when content is present.
### 1) List Remaining Tasks

```bash
python src/tasks/list-remaining-tasks.py
```

Outputs tasks with status not equal to `done`, ordered by dependency depth.

### 2) Summarize Task Status

```bash
python src/tasks/summarize-tasks.py
```

Prints counts by status and by type.

### 3) Find Blocked Tasks

```bash
python src/tasks/find-blocked-tasks.py
```

Finds tasks that cannot be completed because at least one prerequisite is not done.

## Common Options

All scripts accept:

- `--tasks PATH` to specify a different `tasks.json` file.
- `--status` filters to a specific status for list scripts.

Example:

```bash
python src/tasks/list-remaining-tasks.py --tasks docs/learning-graph/tasks.json --status todo
```
