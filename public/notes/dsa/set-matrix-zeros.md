## Problem

Given an `n x m` integer matrix, if an element is `0`, set its **entire row and column** to `0`. Do it **in place**.

The trap: if you zero a cell immediately, you can't tell later whether that `0` was original or freshly written. You must first *mark* which rows/columns to clear, then clear them.

## Intuition

We only need to know **which rows** and **which columns** contain at least one zero. Then any cell `(i, j)` becomes `0` if its row `i` or column `j` is marked.

## Approach 1 — Brute Force (marker value)

Walk the matrix; for every `0`, mark all non-zero cells in that row and column with a sentinel (`-1`). In a second pass turn every sentinel into `0`. Fails if the matrix can contain `-1`.

```java
void setZeroes(int[][] m) {
    int n = m.length, c = m[0].length;
    for (int i = 0; i < n; i++)
      for (int j = 0; j < c; j++)
        if (m[i][j] == 0) {
          for (int k = 0; k < c; k++) if (m[i][k] != 0) m[i][k] = -1;
          for (int k = 0; k < n; k++) if (m[k][j] != 0) m[k][j] = -1;
        }
    for (int i = 0; i < n; i++)
      for (int j = 0; j < c; j++) if (m[i][j] == -1) m[i][j] = 0;
}
```

**Time:** O((n·m)·(n+m)) · **Space:** O(1)

## Approach 2 — Better (two marker arrays)

Keep `row[]` and `col[]` boolean arrays. First pass sets flags; second pass zeros cell `(i,j)` if `row[i]` or `col[j]`.

```java
void setZeroes(int[][] m) {
    int n = m.length, c = m[0].length;
    boolean[] row = new boolean[n], col = new boolean[c];
    for (int i = 0; i < n; i++)
      for (int j = 0; j < c; j++)
        if (m[i][j] == 0) { row[i] = true; col[j] = true; }
    for (int i = 0; i < n; i++)
      for (int j = 0; j < c; j++)
        if (row[i] || col[j]) m[i][j] = 0;
}
```

**Time:** O(n·m) · **Space:** O(n + m)

## Approach 3 — Optimal (matrix itself as markers)

Use the **first row** and **first column** as the marker arrays. A separate `col0` flag handles column 0 (which overlaps cell `(0,0)`).

```java
void setZeroes(int[][] m) {
    int n = m.length, c = m[0].length, col0 = 1;
    for (int i = 0; i < n; i++) {
      if (m[i][0] == 0) col0 = 0;
      for (int j = 1; j < c; j++)
        if (m[i][j] == 0) { m[i][0] = 0; m[0][j] = 0; }
    }
    for (int i = n - 1; i >= 0; i--) {       // bottom-up so row0/col0 read last
      for (int j = c - 1; j >= 1; j--)
        if (m[i][0] == 0 || m[0][j] == 0) m[i][j] = 0;
      if (col0 == 0) m[i][0] = 0;
    }
}
```

**Time:** O(n·m) · **Space:** O(1)

```text
Input          markers set          result
1 1 1          1 1 1   col0=1       1 0 1
1 0 1   ->     1 0 0    (m[1][0],   0 0 0
1 1 1          1 1 1     m[0][1]=0) 1 0 1
```

## Key points

- Never zero a cell before recording all markers, or you lose the "was it original?" information.
- Optimal trick: reuse row 0 and column 0 as marker storage; guard column 0 with a separate `col0` flag because `(0,0)` is shared.
- Iterate the write pass **bottom-up / right-to-left** so the first row/column markers survive until every dependent cell is written.
