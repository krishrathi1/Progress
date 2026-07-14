## Problem

Given an `m × n` grid of characters and a `word`, return `true` if the word exists in the grid. The word is formed from **sequentially adjacent** cells (horizontal/vertical neighbors). The **same cell may not be reused** within one word.

**Example:** grid `[[A,B,C],[S,F,C],[A,D,E]]`, `word = "ABCCED"` → `true`

## Intuition

From every cell that matches `word[0]`, launch a **DFS + backtracking** search. At each step, if the current cell matches the current character, mark it visited and try all four neighbors for the next character. If a branch fails, **unmark** the cell so other paths can use it.

## DFS backtracking solution

```java
class Solution {
    public boolean exist(char[][] board, String word) {
        int m = board.length, n = board[0].length;
        for (int r = 0; r < m; r++)
            for (int c = 0; c < n; c++)
                if (dfs(board, word, r, c, 0)) return true;
        return false;
    }

    private boolean dfs(char[][] b, String w, int r, int c, int i) {
        if (i == w.length()) return true;                 // matched all chars
        if (r < 0 || c < 0 || r >= b.length || c >= b[0].length
                || b[r][c] != w.charAt(i)) return false;

        char tmp = b[r][c];
        b[r][c] = '#';                                     // mark visited
        boolean found = dfs(b, w, r + 1, c, i + 1)
                     || dfs(b, w, r - 1, c, i + 1)
                     || dfs(b, w, r, c + 1, i + 1)
                     || dfs(b, w, r, c - 1, i + 1);
        b[r][c] = tmp;                                     // undo (backtrack)
        return found;
    }
}
```

**Time:** O(m · n · 4^L) where L = word length (4 directions per step) · **Space:** O(L) recursion depth

### Path for "ABCCED"

```text
A(0,0) → B(0,1) → C(0,2) → C(1,2) → E(2,2) → D(2,1)   ✓ found
grid:  A  B  C
       S  F  C
       A  D  E
```

## Key points

- Overwrite the visited cell in-place (e.g. `'#'`) to avoid a separate `visited[][]` array, then restore it — this is the backtracking undo.
- Short-circuit with `||`: the first successful direction stops further exploration.
- The bounds/mismatch checks at the top of `dfs` keep the recursion clean (check *before* accessing).
- Worst case is exponential in word length; an early char-frequency check (word chars must exist in the board) is a cheap practical prune.
