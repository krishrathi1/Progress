## Problem

Given an `m x n` matrix where **no two adjacent cells are equal**, find any **peak element** — a cell strictly greater than its up, down, left, and right neighbours. Cells outside the grid are treated as `-∞`. Return the peak's coordinates. A peak is guaranteed to exist.

```text
[[1, 4],
 [3, 2]]   ->  peak = 4 at (0,1)  (or any valid peak)
```

## Intuition

A brute scan is `O(m·n)`. We can do better by binary searching on **columns**. Pick the middle column, find the row with its **maximum element** in that column. Compare that max with its left and right neighbours:

- If greater than both -> it is a peak.
- Otherwise move toward the larger neighbour's half — a peak is guaranteed to lie there, because the maximum of a column always leads "uphill".

## Approach 1 — Brute force

Check every cell against its 4 neighbours.

```java
int[] brute(int[][] m) {
    for (int i = 0; i < m.length; i++)
        for (int j = 0; j < m[0].length; j++)
            if (ok(m, i, j)) return new int[]{i, j};
    return new int[]{-1, -1};
}
```

**Time:** O(m·n) · **Space:** O(1)

## Approach 2 — Optimal (binary search on columns)

```java
int[] findPeakGrid(int[][] mat) {
    int lo = 0, hi = mat[0].length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        int row = maxRowInCol(mat, mid);           // row of column-max
        int left  = mid - 1 >= 0 ? mat[row][mid-1] : -1;
        int right = mid + 1 < mat[0].length ? mat[row][mid+1] : -1;
        if (mat[row][mid] > left && mat[row][mid] > right)
            return new int[]{row, mid};
        else if (left > mat[row][mid]) hi = mid - 1;
        else lo = mid + 1;
    }
    return new int[]{-1, -1};
}
int maxRowInCol(int[][] mat, int col) {
    int idx = 0;
    for (int i = 1; i < mat.length; i++)
        if (mat[i][col] > mat[idx][col]) idx = i;
    return idx;
}
```

**Time:** O(m·log n) · **Space:** O(1)

```text
mid column chosen -> scan m rows for its max (O(m))
larger side keeps a peak -> discard half the columns
log n columns visited => O(m log n)
```

## Key points

- Binary search on the **column index**; within a column, take the maximum element (`O(m)` scan).
- Move toward the larger horizontal neighbour — the guarantee is that a peak exists in that direction.
- Cannot flatten this like a fully sorted matrix; the greater-neighbour argument is what makes it correct.
