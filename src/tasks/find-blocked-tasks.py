import argparse

from _task_graph import ensure_path, load_graph


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Find tasks blocked by incomplete prerequisites.")
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

    blocked = []
    for node_id, attrs in graph.nodes(data=True):
        status = attrs.get("status", "todo")
        if status == "done":
            continue
        predecessors = list(graph.predecessors(node_id))
        if not predecessors:
            continue
        unmet = [p for p in predecessors if graph.nodes[p].get("status") != "done"]
        if unmet:
            blocked.append((node_id, attrs, unmet))

    if not blocked:
        print("No blocked tasks found.")
        return

    for node_id, attrs, unmet in blocked:
        label = attrs.get("label", node_id)
        unmet_labels = [graph.nodes[p].get("label", p) for p in unmet]
        print(f"{label} ({node_id}) blocked by: {', '.join(unmet_labels)}")


if __name__ == "__main__":
    main()
