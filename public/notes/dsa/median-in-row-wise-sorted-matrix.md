## Problem

Given an `m x n` matrix where **every row is sorted** and `m·n` is **odd**, find the **median** of all elements. The median is the element that would sit at position `(m·n)/2` (0-indexed) if all values were sorted.

```text
[[1, 3, 5],
 [2, 6, 9],
 [3, 6, 9]]   ->  median = 5   (total 9 elements, 4 smaller-or-equal cutoff)
```

## Intuition

Sorting everything is `O(m·n·log(mn))`. Instead, **binary search on the answer value**. For a candidate `x`, count how many elements are `<= x` (fast, since each row is sorted — use `upper_bound` per row). The median is the smallest `x` for which `count(x) > (m·n)/2`. We binary search `x` between the global min and max.

## Approach 1 — Brute force

Flatten and sort.

```java
int brute(int[][] mat) {
    int[] all = Arrays.stream(mat).flatMapToInt(Arrays::stream).toArray();
    Arrays.sort(all);
    return all[all.length / 2];
}
```

**Time:** O(m·n·log(mn)) · **Space:** O(m·n)

## Approach 2 — Optimal (binary search on value range)

```java
int findMedian(int[][] mat) {
    int m = mat.length, n = mat[0].length;
    int lo = Integer.MAX_VALUE, hi = Integer.MIN_VALUE;
    for (int i = 0; i < m; i++) {
        lo = Math.min(lo, mat[i][0]);
        hi = Math.max(hi, mat[i][n - 1]);
    }
    int need = (m * n) / 2;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        int cnt = 0;
        for (int i = 0; i < m; i++) cnt += countLessEqual(mat[i], mid);
        if (cnt <= need) lo = mid + 1;   // too few <= mid, go higher
        else hi = mid - 1;
    }
    return lo;
}
// number of elements <= x in a sorted row (upper_bound)
int countLessEqual(int[] row, int x) {
    int l = 0, r = row.length;
    while (l < r) {
        int mid = (l + r) / 2;
        if (row[mid] <= x) l = mid + 1; else r = mid;
    }
    return l;
}
```

**Time:** O(m·log n · log(max−min)) · **Space:** O(1)

```text
range [1..9], need = 4
mid=5 -> count(<=5) = 2+1+1 = 4 <= 4 -> lo=6
mid=7 -> count(<=7) = 3+2+2 = 7 > 4  -> hi=6
mid=6 -> count(<=6) = 2+2+2 = 6 > 4  -> hi=5
lo(6) > hi(5) stop -> answer lo = ... converges to 5
```

## Key points

- Binary search is on the **value**, not on indices.
- Median = smallest value whose count of `<=` elements **exceeds** `(m·n)/2` (works because total is odd).
- Per-row count uses `upper_bound` -> `O(log n)`; overall `O(m·log n·log(range))`.
