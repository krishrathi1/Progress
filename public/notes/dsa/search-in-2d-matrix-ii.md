## Problem

Given an `m x n` matrix where **each row is sorted left to right** and **each column is sorted top to bottom**, decide if a `target` exists. Unlike "Search in a 2D Matrix", rows do **not** continue from one another, so you cannot treat it as one flat sorted array.

```text
matrix = [[ 1, 4, 7,11,15],
          [ 2, 5, 8,12,19],
          [ 3, 6, 9,16,22],
          [10,13,14,17,24],
          [18,21,23,26,30]]
target = 5  -> true
```

## Intuition

Start from a **corner where one direction increases and the other decreases** — the top-right (or bottom-left). At top-right, moving left decreases the value, moving down increases it. So each comparison eliminates an entire row or column, giving a staircase search.

## Approach 1 — Brute force

Scan all cells.

```java
boolean brute(int[][] mat, int t) {
    for (int[] r : mat) for (int v : r) if (v == t) return true;
    return false;
}
```

**Time:** O(m·n) · **Space:** O(1)

## Approach 2 — Better (binary search each row)

Each row is sorted, so binary search all `m` rows.

**Time:** O(m·log n) · **Space:** O(1)

## Approach 3 — Optimal (staircase / top-right elimination)

```java
boolean search(int[][] mat, int target) {
    int row = 0, col = mat[0].length - 1;   // top-right
    while (row < mat.length && col >= 0) {
        int val = mat[row][col];
        if (val == target) return true;
        else if (val > target) col--;       // drop the column
        else row++;                         // drop the row
    }
    return false;
}
```

**Time:** O(m + n) · **Space:** O(1)

```text
target = 5, start top-right mat[0][4]=15
15 > 5 -> col-- ... 11>5, 7>5, 4<5 -> row++
mat[1][2]=8 > 5 -> col-- -> mat[1][1]=5 == target -> true
```

## Key points

- The corner choice matters: use **top-right** or **bottom-left**, never top-left/bottom-right (both directions move the same way there).
- Each step removes one full row or column, so at most `m + n` steps.
- Distinguish from "Search in a 2D Matrix" (fully sorted, `O(log mn)` possible).
