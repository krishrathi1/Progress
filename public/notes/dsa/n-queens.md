## Problem

Place **N queens** on an `N × N` chessboard so that no two queens attack each other (no shared row, column, or diagonal). Return **all distinct** board configurations.

**Example:** `N = 4` → 2 solutions.

## Intuition

Place **one queen per column** (or per row), left to right. For each column, try every row; if the cell is not attacked by an already-placed queen, place it and recurse to the next column. If no row works, **backtrack**. Placing one per column guarantees no two share a column automatically.

## Attack checks

For a queen at `(row, col)`, three lines must be free:
- **Row** — track used rows.
- **Diagonal** `↘` — cells share `row - col` (offset by N-1 to index an array).
- **Anti-diagonal** `↙` — cells share `row + col`.

## Optimal — backtracking with O(1) safety check

```java
class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');
        boolean[] cols = new boolean[n];
        boolean[] diag = new boolean[2 * n - 1];   // row + col
        boolean[] anti = new boolean[2 * n - 1];   // row - col + n - 1
        solve(0, n, board, cols, diag, anti, res);
        return res;
    }

    private void solve(int col, int n, char[][] board, boolean[] cols,
                       boolean[] diag, boolean[] anti, List<List<String>> res) {
        if (col == n) {
            List<String> b = new ArrayList<>();
            for (char[] row : board) b.add(new String(row));
            res.add(b);
            return;
        }
        for (int row = 0; row < n; row++) {
            int d = row + col, a = row - col + n - 1;
            if (cols[row] || diag[d] || anti[a]) continue;   // attacked
            board[row][col] = 'Q';
            cols[row] = diag[d] = anti[a] = true;            // place
            solve(col + 1, n, board, cols, diag, anti, res);
            board[row][col] = '.';
            cols[row] = diag[d] = anti[a] = false;           // undo
        }
    }
}
```

**Time:** O(N!) — the branching narrows as constraints fill up · **Space:** O(N^2) board + O(N) markers

### One 4-Queens solution

```text
. Q . .
. . . Q
Q . . .
. . Q .
```

## Key points

- One queen per column reduces the search and removes column conflicts by construction.
- Diagonals map to constant indices: `row+col` (main) and `row-col+n-1` (anti) — enables O(1) attack checks instead of scanning.
- Reset all three marker arrays plus the board cell when backtracking.
- N! is far better than the naive C(N², N) placement of queens on any squares.
