## Problem

A rat starts at the top-left `(0,0)` of an `N × N` grid and must reach the bottom-right `(N-1, N-1)`. Cells with `1` are open, `0` are blocked. The rat can move **D**own, **L**eft, **R**ight, **U**p. Return **all paths** as strings, sorted lexicographically. A cell can be used **once per path**.

**Example:** a 4×4 open maze may yield paths like `"DDRDRR"`, `"DRDDRR"`.

## Intuition

Classic **backtracking**: from the current cell, try each direction in lexical order (D, L, R, U). If the neighbor is inside the grid, open, and not yet visited, move there, append the direction, and recurse. On reaching the destination, record the path string. Then **undo** the visit so other paths can reuse the cell.

## Backtracking solution

```java
class Solution {
    public ArrayList<String> findPath(int[][] m, int n) {
        ArrayList<String> res = new ArrayList<>();
        if (m[0][0] == 0) return res;                 // start blocked
        boolean[][] vis = new boolean[n][n];
        solve(0, 0, m, n, vis, "", res);
        return res;
    }

    // directions in lexicographic order: D, L, R, U
    private static final int[] dr = { 1, 0, 0, -1 };
    private static final int[] dc = { 0, -1, 1, 0 };
    private static final char[] dir = { 'D', 'L', 'R', 'U' };

    private void solve(int r, int c, int[][] m, int n,
                       boolean[][] vis, String path, ArrayList<String> res) {
        if (r == n - 1 && c == n - 1) {
            res.add(path);
            return;
        }
        vis[r][c] = true;                             // mark
        for (int k = 0; k < 4; k++) {
            int nr = r + dr[k], nc = c + dc[k];
            if (nr >= 0 && nc >= 0 && nr < n && nc < n
                    && !vis[nr][nc] && m[nr][nc] == 1) {
                solve(nr, nc, m, n, vis, path + dir[k], res);
            }
        }
        vis[r][c] = false;                            // undo (backtrack)
    }
}
```

**Time:** O(4^(N²)) worst case — up to 4 choices per cell · **Space:** O(N²) visited + recursion depth

### Trace idea

```text
maze (1=open):        try order D,L,R,U at each cell
1 0 0 0
1 1 0 1               (0,0)→D→(1,0)→R→(1,1)→D→(2,1)...
1 1 0 0               record string when (3,3) reached
0 1 1 1
```

## Key points

- Iterating directions in **D, L, R, U** order yields lexicographically sorted paths for free.
- Guard the start/end cells: if `maze[0][0] == 0` there is no path.
- The `vis[r][c] = false` after the loop is the essential backtracking step — without it you'd block valid alternate paths.
- Build the path by string concatenation (`path + dir[k]`) so each branch keeps its own copy; a shared `StringBuilder` also works if you delete the last char on undo.
