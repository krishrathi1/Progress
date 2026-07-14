## Problem

Given an undirected graph with `V` vertices (as an adjacency matrix `graph[V][V]`) and an integer `m`, determine whether the graph's vertices can be colored using **at most `m` colors** such that **no two adjacent vertices share the same color**. Return `true` if a valid coloring exists, else `false`.

## Intuition

This is a classic **constraint-satisfaction / backtracking** problem. We assign colors to vertices one at a time. Before assigning a color to a vertex, we check that none of its already-colored neighbours has that color. If we get stuck (no color fits), we backtrack and try a different color for the previous vertex.

## Approach: Backtracking

Process vertices `0..V-1`. For each vertex try colors `1..m`; if a color is *safe*, assign it and recurse on the next vertex. If the recursion fails, undo (backtrack) and try the next color.

```java
class Solution {
    private boolean isSafe(int node, int[] color, boolean[][] graph, int col, int V) {
        for (int k = 0; k < V; k++) {
            if (graph[node][k] && color[k] == col) return false;
        }
        return true;
    }

    private boolean solve(int node, boolean[][] graph, int m, int V, int[] color) {
        if (node == V) return true;              // all vertices colored
        for (int col = 1; col <= m; col++) {
            if (isSafe(node, color, graph, col, V)) {
                color[node] = col;               // choose
                if (solve(node + 1, graph, m, V, color)) return true;
                color[node] = 0;                 // backtrack
            }
        }
        return false;
    }

    public boolean graphColoring(boolean[][] graph, int m, int V) {
        int[] color = new int[V];                // 0 = uncolored
        return solve(0, graph, m, V, color);
    }
}
```

**Time:** O(m^V) · **Space:** O(V) for the color array plus O(V) recursion stack.

```text
Triangle graph (0-1, 1-2, 0-2), m = 3
node0 -> color1
node1 -> color1? adjacent to 0 -> unsafe -> color2 OK
node2 -> adjacent to 0(1) and 1(2) -> color3 OK
All colored -> return true
With m = 2 no third color exists -> backtrack exhausts -> false
```

## Key points

- Adjacency check `isSafe` costs O(V); pruning early keeps the exponential worst case small in practice.
- Coloring a vertex only requires checking **already-assigned** neighbours.
- Deciding if `m` colors suffice is **NP-complete**; backtracking is the standard exact approach.
- The **chromatic number** is the smallest `m` for which the answer is `true`.
