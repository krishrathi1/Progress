## Problem

Given a partially filled `9x9` Sudoku board (empty cells marked `'.'`), fill it so that every **row**, every **column**, and each of the nine `3x3` **sub-boxes** contains the digits `1-9` exactly once. A valid solution is guaranteed to exist and is unique.

## Intuition

Every empty cell must hold one of the digits `1-9`. We try digits one by one; a digit is valid only if it does not already appear in the same row, column, or `3x3` box. This is a **backtracking** search: place a digit, recurse to solve the rest, and if the rest fails, undo the placement and try the next digit.

## Approach: Backtracking with validity check

Scan the board for the first empty cell. Try digits `1..9`; if valid, place it and recurse. Return `true` on the first fully-solved board. If no digit fits, backtrack.

```java
class Solution {
    public void solveSudoku(char[][] board) {
        solve(board);
    }

    private boolean solve(char[][] board) {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    for (char d = '1'; d <= '9'; d++) {
                        if (isValid(board, r, c, d)) {
                            board[r][c] = d;              // choose
                            if (solve(board)) return true;
                            board[r][c] = '.';            // backtrack
                        }
                    }
                    return false;                          // no digit works here
                }
            }
        }
        return true;                                       // no empty cell left
    }

    private boolean isValid(char[][] b, int row, int col, char d) {
        for (int i = 0; i < 9; i++) {
            if (b[row][i] == d) return false;              // row
            if (b[i][col] == d) return false;              // column
            int br = 3 * (row / 3) + i / 3;
            int bc = 3 * (col / 3) + i % 3;
            if (b[br][bc] == d) return false;              // 3x3 box
        }
        return true;
    }
}
```

**Time:** O(9^(empty cells)) worst case · **Space:** O(1) extra (recursion depth <= 81).

```text
Box index math for cell (row=4, col=7):
  box top-left row = 3*(4/3) = 3
  box top-left col = 3*(7/3) = 6
  -> checks the 3x3 block spanning rows 3-5, cols 6-8
```

## Key points

- The single trick is the **box-start formula** `3*(x/3)`, which snaps any cell to its `3x3` block origin.
- One combined loop checks row, column, and box in `O(9)` per candidate.
- Backtracking naturally prunes: an invalid partial board is abandoned immediately.
- Optimizations: track used digits per row/col/box in bitmasks, or pick the empty cell with the **fewest candidates** (MRV heuristic) to cut the search tree.
