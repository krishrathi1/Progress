## Problem

Given an `n x n` matrix, rotate it **90 degrees clockwise**, in place (no extra matrix).

## Intuition

For a clockwise rotation, element at `(i, j)` moves to `(j, n-1-i)`. Two clean ways exist: use an auxiliary matrix (easy), or observe that **transpose + reverse each row = clockwise rotation** (in place).

## Approach 1 — Brute Force (extra matrix)

Allocate a fresh `res` and place each element at its rotated position. Column `j` of the original becomes row `j` (reversed) of the result.

```java
int[][] rotate(int[][] m) {
    int n = m.length;
    int[][] res = new int[n][n];
    for (int i = 0; i < n; i++)
      for (int j = 0; j < n; j++)
        res[j][n - 1 - i] = m[i][j];
    return res;
}
```

**Time:** O(n²) · **Space:** O(n²)

## Approach 2 — Optimal (transpose then reverse rows)

1. **Transpose**: swap `m[i][j]` with `m[j][i]` for `j > i` (mirror across the main diagonal).
2. **Reverse each row**.

```java
void rotate(int[][] m) {
    int n = m.length;
    for (int i = 0; i < n; i++)              // transpose
      for (int j = i + 1; j < n; j++) {
        int t = m[i][j]; m[i][j] = m[j][i]; m[j][i] = t;
      }
    for (int i = 0; i < n; i++) {            // reverse each row
      int l = 0, r = n - 1;
      while (l < r) { int t = m[i][l]; m[i][l] = m[i][r]; m[i][r] = t; l++; r--; }
    }
}
```

**Time:** O(n²) · **Space:** O(1)

```text
original      transpose      reverse rows (clockwise 90)
1 2 3         1 4 7          7 4 1
4 5 6   ->    2 5 8    ->    8 5 2
7 8 9         3 6 9          9 6 3
```

**Note:** start the transpose inner loop at `j = i + 1`; using `j = 0` swaps every pair twice and undoes the transpose. For **counter-clockwise**, transpose then reverse each *column* (or reverse rows first, then transpose).

## Key points

- Clockwise = transpose + reverse each row; both are O(1) extra space.
- Transpose swaps only the upper triangle (`j > i`) to avoid double-swapping.
- Direct mapping formula: clockwise `(i,j) -> (j, n-1-i)`; counter-clockwise `(i,j) -> (n-1-j, i)`.
