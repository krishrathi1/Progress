## Problem

Given an `m × n` binary matrix where **each row is sorted** (all `0`s come before all `1`s), find the index of the row containing the **maximum number of 1s**. If several rows tie, return the **smallest** index. If there are no 1s at all, return `-1`.

## Intuition

Because each row is sorted, the number of 1s in a row equals `n - (index of first 1)`. Finding the first `1` in a sorted row is a classic **lower-bound binary search** — O(log n) per row instead of scanning all n columns.

Track the row whose first-`1` position is the smallest (that row has the most 1s). Update only on a strictly smaller position so ties keep the earliest row.

## Brute force — count every cell

```java
int[] brute(int[][] mat) {
    int best = -1, maxOnes = 0;
    for (int i = 0; i < mat.length; i++) {
        int ones = 0;
        for (int v : mat[i]) ones += v;
        if (ones > maxOnes) { maxOnes = ones; best = i; }
    }
    return new int[]{best, maxOnes};
}
```

**Time:** O(m × n) · **Space:** O(1)

## Optimal — binary search each row for first 1

```java
// lower bound: index of first element >= 1, i.e. first 1
int firstOne(int[] row) {
    int lo = 0, hi = row.length - 1, idx = row.length;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (row[mid] >= 1) { idx = mid; hi = mid - 1; }
        else lo = mid + 1;
    }
    return idx;             // n if the row is all zeros
}
int rowWithMaxOnes(int[][] mat) {
    int n = mat[0].length, bestRow = -1, minIdx = n;
    for (int i = 0; i < mat.length; i++) {
        int idx = firstOne(mat[i]);
        if (idx < minIdx) { minIdx = idx; bestRow = i; }
    }
    return bestRow;         // -1 if no row has any 1
}
```

**Time:** O(m × log n) · **Space:** O(1)

## Even better — staircase walk (O(m + n))

Start at the **top-right**. Move left while you see a `1` (this row has more 1s); move down when you hit a `0`.

```java
int staircase(int[][] mat) {
    int m = mat.length, n = mat[0].length;
    int i = 0, j = n - 1, bestRow = -1;
    while (i < m && j >= 0) {
        if (mat[i][j] == 1) { bestRow = i; j--; }
        else i++;
    }
    return bestRow;
}
```

**Time:** O(m + n) · **Space:** O(1)

```text
mat = 0 0 1 1
      0 0 0 1
      0 1 1 1   <- most 1s
      0 0 0 0
firstOne per row: 2, 3, 1, 4(=n) -> min index = 1 at row 2
Answer = 2
```

## Key points

- Sorted rows let you count 1s via the **first-1 position**: `ones = n - firstOne`.
- Binary-search version is O(m log n); the top-right staircase walk is O(m + n).
- Keep the **smallest row index** on ties by updating only when strictly better.
- Return `-1` when every row is all zeros (`firstOne == n` everywhere).
