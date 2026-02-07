import argparse
from pathlib import Path

from _task_graph import dependency_depths, ensure_path, load_graph


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="List remaining tasks in the task graph.")
    parser.add_argument(
        "--tasks",
        default="docs/learning-graph/tasks.json",
        help="Path to tasks.json",
    )
    parser.add_argument(
        "--status",
        default=None,
        help="Filter by status (e.g., todo, in_progress, blocked)",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    tasks_path = ensure_path(args.tasks)
    graph, _ = load_graph(tasks_path)
    depths = dependency_depths(graph)

    remaining = []
    for node_id, attrs in graph.nodes(data=True):
        status = attrs.get("status", "todo")
        if status == "done":
            continue
        if args.status and status != args.status:
            continue
        remaining.append((depths.get(node_id, 0), node_id, attrs))

    remaining.sort(key=lambda item: (item[0], item[2].get("label", "")))

    if not remaining:
        print("All tasks are marked done.")
        return

    for depth, node_id, attrs in remaining:
        label = attrs.get("label", node_id)
        status = attrs.get("status", "todo")
        task_type = attrs.get("type", "task")
        print(f"[{depth}] {label} ({node_id}) - {task_type} - {status}")


if __name__ == "__main__":
    main()
