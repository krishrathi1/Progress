## Problem

Given an `n x m` matrix, return all elements in **spiral order**: left→right across the top, top→bottom down the right, right→left across the bottom, bottom→top up the left, then spiral inward.

## Intuition

Maintain four boundaries — `top`, `bottom`, `left`, `right`. Traverse the current outer ring in the four directions, shrinking the relevant boundary after each side. Stop when the boundaries cross.

## Approach — Boundary Shrinking (optimal)

```java
List<Integer> spiralOrder(int[][] m) {
    List<Integer> res = new ArrayList<>();
    int top = 0, bottom = m.length - 1;
    int left = 0, right = m[0].length - 1;
    while (top <= bottom && left <= right) {
        for (int j = left; j <= right; j++) res.add(m[top][j]);      // →
        top++;
        for (int i = top; i <= bottom; i++) res.add(m[i][right]);    // ↓
        right--;
        if (top <= bottom) {                                        // ←
            for (int j = right; j >= left; j--) res.add(m[bottom][j]);
            bottom--;
        }
        if (left <= right) {                                        // ↑
            for (int i = bottom; i >= top; i--) res.add(m[i][left]);
            left++;
        }
    }
    return res;
}
```

**Time:** O(n·m) — each cell visited once · **Space:** O(1) extra (output not counted)

```text
1  2  3  4        Order of visit:
5  6  7  8   ->   1 2 3 4  (top row)
9 10 11 12        8 12     (right col)
                  11 10 9  (bottom row)
                  5        (left col)
                  6 7      (inner top)
result: 1 2 3 4 8 12 11 10 9 5 6 7
```

## Key points

- The two guards `if (top <= bottom)` and `if (left <= right)` are **essential** for non-square or single-row/column matrices — they prevent re-printing a row/column that was already consumed.
- Update each boundary immediately after traversing its side so the next direction starts fresh.
- Loop condition `top <= bottom && left <= right` naturally terminates when the spiral reaches the centre.
- Total elements emitted equals `n·m`, a handy correctness check.
