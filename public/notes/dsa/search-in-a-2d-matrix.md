## Problem

Given an `m x n` matrix where **each row is sorted** and the **first element of each row is greater than the last element of the previous row** (i.e. the whole matrix is sorted if flattened), determine whether a `target` value exists. Return `true` or `false`.

```text
matrix = [[1, 3, 5, 7],
          [10,11,16,20],
          [23,30,34,60]]
target = 16  ->  true
target = 13  ->  false
```

## Intuition

Because rows join end-to-end in sorted order, the matrix behaves like **one sorted 1D array of size `m*n`**. Any position in that virtual array maps back to `(row, col)` via integer division and modulo. This lets us run a single binary search over the whole matrix.

## Approach 1 — Brute force (linear scan)

Check every cell.

```java
boolean searchBrute(int[][] mat, int target) {
    for (int[] row : mat)
        for (int v : row)
            if (v == target) return true;
    return false;
}
```

**Time:** O(m·n) · **Space:** O(1)

## Approach 2 — Better (row-locate + binary search)

Find the candidate row (target between its first and last), then binary search that row.

**Time:** O(m + log n) · **Space:** O(1)

## Approach 3 — Optimal (treat as 1D binary search)

Map index `mid` to `mat[mid / n][mid % n]`.

```java
boolean search(int[][] mat, int target) {
    int m = mat.length, n = mat[0].length;
    int lo = 0, hi = m * n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        int val = mat[mid / n][mid % n];
        if (val == target) return true;
        else if (val < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return false;
}
```

**Time:** O(log(m·n)) · **Space:** O(1)

```text
n = 4, target = 16
lo=0 hi=11 mid=5  -> mat[1][1]=11 < 16 -> lo=6
lo=6 hi=11 mid=8  -> mat[2][0]=23 > 16 -> hi=7
lo=6 hi=7  mid=6  -> mat[1][2]=16 == target -> true
```

## Key points

- Works only when the matrix is fully sorted (row-joined). Use Search-in-2D-Matrix-II for the weaker "sorted rows and columns" variant.
- Index mapping: `row = mid / n`, `col = mid % n` where `n` = number of columns.
- Use `lo + (hi - lo) / 2` to avoid overflow.
