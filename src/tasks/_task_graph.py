import json
from pathlib import Path

import networkx as nx


def load_graph(tasks_path: Path) -> tuple[nx.DiGraph, dict]:
    data = json.loads(tasks_path.read_text(encoding="utf-8"))
    graph = nx.DiGraph()
    node_index = {}

    for node in data.get("nodes", []):
        node_id = node.get("id")
        if not node_id:
            continue
        graph.add_node(node_id, **node)
        node_index[node_id] = node

    for edge in data.get("edges", []):
        source = edge.get("from")
        target = edge.get("to")
        if not source or not target:
            continue
        graph.add_edge(source, target, **edge)

    return graph, node_index


def ensure_path(path_str: str) -> Path:
    path = Path(path_str)
    if not path.exists():
        raise FileNotFoundError(f"tasks.json not found: {path}")
    return path


def dependency_depths(graph: nx.DiGraph) -> dict[str, int]:
    depths: dict[str, int] = {}
    for node in nx.topological_sort(graph):
        predecessors = list(graph.predecessors(node))
        if not predecessors:
            depths[node] = 0
        else:
            depths[node] = max(depths[p] for p in predecessors) + 1
    return depths
