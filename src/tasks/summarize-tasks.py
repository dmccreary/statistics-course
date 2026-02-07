import argparse
from collections import Counter

from _task_graph import ensure_path, load_graph


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Summarize tasks by status and type.")
    parser.add_argument(
        "--tasks",
        default="docs/learning-graph/tasks.json",
        help="Path to tasks.json",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    tasks_path = ensure_path(args.tasks)
    graph, _ = load_graph(tasks_path)

    status_counts = Counter()
    type_counts = Counter()

    for _, attrs in graph.nodes(data=True):
        status_counts[attrs.get("status", "todo")] += 1
        type_counts[attrs.get("type", "task")] += 1

    print("Status counts:")
    for status, count in status_counts.most_common():
        print(f"  {status}: {count}")

    print("\nType counts:")
    for task_type, count in type_counts.most_common():
        print(f"  {task_type}: {count}")


if __name__ == "__main__":
    main()
