#!/usr/bin/env python3
"""
generate-tasks-json.py - Create an initial tasks.json for the task graph.

This script inspects the current repository state and produces a medium-grain
set of tasks in docs/learning-graph/tasks.json. It checks for chapter content
and MicroSim artifacts to mark tasks as done or todo.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate docs/learning-graph/tasks.json from repo state."
    )
    parser.add_argument(
        "--book",
        default=".",
        help="Path to the book repository root (default: current directory)",
    )
    parser.add_argument(
        "--tasks",
        default="docs/learning-graph/tasks.json",
        help="Output path for tasks.json",
    )
    return parser.parse_args()


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def count_words_without_frontmatter(path: Path) -> int:
    try:
        content = read_text(path)
    except FileNotFoundError:
        return 0

    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            content = parts[2]

    words = re.findall(r"\b\w+\b", content)
    return len(words)


def chapter_title(index_path: Path) -> str:
    try:
        content = read_text(index_path)
    except FileNotFoundError:
        return index_path.parent.name

    for line in content.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return index_path.parent.name


def chapter_number(dirname: str) -> str:
    match = re.match(r"^(\d+)", dirname)
    return match.group(1) if match else dirname


def microsims_in_chapter(index_path: Path) -> list[str]:
    try:
        content = read_text(index_path)
    except FileNotFoundError:
        return []

    sims = set(re.findall(r"sims/([a-z0-9-]+)/", content))
    return sorted(sims)


def microsim_done(sims_root: Path, name: str) -> bool:
    sim_dir = sims_root / name
    if not sim_dir.exists():
        return False
    main_html = sim_dir / "main.html"
    index_md = sim_dir / "index.md"
    image = sim_dir / f"{name}.png"
    return main_html.exists() and index_md.exists() and image.exists()


def status_for_chapter_content(index_path: Path) -> str:
    return "done" if count_words_without_frontmatter(index_path) >= 500 else "todo"


def status_for_chapter_microsims(sims: list[str], sims_root: Path) -> str:
    if not sims:
        return "todo"
    all_done = all(microsim_done(sims_root, name) for name in sims)
    return "done" if all_done else "todo"


def derive_chapter_status(content_status: str, microsim_status: str) -> str:
    if content_status == "done" and microsim_status == "done":
        return "done"
    if content_status == "done" or microsim_status == "done":
        return "in_progress"
    return "todo"


def main() -> int:
    args = parse_args()
    book_root = Path(args.book).resolve()
    docs_root = book_root / "docs"
    learning_graph_dir = docs_root / "learning-graph"
    learning_graph_dir.mkdir(parents=True, exist_ok=True)

    tasks_path = (book_root / args.tasks).resolve()

    nodes = []
    edges = []

    def add_node(node_id: str, label: str, type_name: str, status: str, **extra) -> None:
        payload = {"id": node_id, "label": label, "type": type_name, "status": status}
        payload.update(extra)
        nodes.append(payload)

    def add_edge(source: str, target: str) -> None:
        edges.append({"from": source, "to": target})

    course_desc = docs_root / "course-description.md"
    course_status = "done" if course_desc.exists() else "todo"
    add_node("t-course-description", "Create Course Description", "root", course_status)

    lg_csv = learning_graph_dir / "learning-graph.csv"
    lg_status = "done" if lg_csv.exists() else "todo"
    add_node("t-learning-graph", "Generate Learning Graph", "system", lg_status)

    chapters_dir = docs_root / "chapters"
    book_structure_status = "done" if chapters_dir.exists() else "todo"
    add_node("t-book-structure", "Generate Book Chapter Structure", "system", book_structure_status)

    add_edge("t-course-description", "t-learning-graph")
    add_edge("t-learning-graph", "t-book-structure")

    sims_root = docs_root / "sims"

    if chapters_dir.exists():
        chapter_dirs = sorted(
            [p for p in chapters_dir.iterdir() if p.is_dir() and not p.name.startswith(".")]
        )

        for chapter in chapter_dirs:
            number = chapter_number(chapter.name)
            index_md = chapter / "index.md"
            chapter_label = chapter_title(index_md)

            content_status = status_for_chapter_content(index_md)
            microsims = microsims_in_chapter(index_md)
            microsim_status = status_for_chapter_microsims(microsims, sims_root)
            chapter_status = derive_chapter_status(content_status, microsim_status)

            chapter_id = f"t-ch-{number}"
            add_node(
                chapter_id,
                chapter_label,
                "chapter",
                chapter_status,
                chapter=int(number) if number.isdigit() else number,
            )
            add_edge("t-book-structure", chapter_id)

            content_id = f"{chapter_id}-content"
            add_node(
                content_id,
                f"Generate {chapter_label} Content",
                "chapter-content",
                content_status,
                chapter=int(number) if number.isdigit() else number,
            )
            add_edge(chapter_id, content_id)

            microsims_id = f"{chapter_id}-microsims"
            add_node(
                microsims_id,
                f"Generate {chapter_label} MicroSims",
                "chapter-microsims",
                microsim_status,
                chapter=int(number) if number.isdigit() else number,
            )
            add_edge(chapter_id, microsims_id)

            for sim_name in microsims:
                sim_status = "done" if microsim_done(sims_root, sim_name) else "todo"
                sim_id = f"{chapter_id}-ms-{sim_name}"
                add_node(
                    sim_id,
                    f"MicroSim: {sim_name}",
                    "microsim",
                    sim_status,
                    chapter=int(number) if number.isdigit() else number,
                    microsim=sim_name,
                )
                add_edge(microsims_id, sim_id)

    data = {
        "meta": {"version": "1.0"},
        "nodes": nodes,
        "edges": edges,
    }

    tasks_path.parent.mkdir(parents=True, exist_ok=True)
    tasks_path.write_text(json.dumps(data, indent=2), encoding="utf-8")
    print(f"Wrote task graph to {tasks_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
