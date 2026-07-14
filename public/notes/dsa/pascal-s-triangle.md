## Problem

Pascal's triangle has three common variants asked in interviews:

1. Given row `r` and column `c` (1-indexed), find the **single element**.
2. Given a row number `r`, print the **entire row**.
3. Given `n`, print the **whole triangle** (first `n` rows).

Each cell equals the sum of the two cells above it; the value at row `r`, column `c` is the binomial coefficient `C(r-1, c-1)`.

## Intuition

The `(r, c)` element is `C(r-1, c-1)`. The key optimization is computing a binomial coefficient in **O(c)** without factorials, and building each row from the previous element using the ratio.

## Variant 1 — Single element `C(n, r)`

```java
long nCr(int n, int r) {
    long res = 1;
    for (int i = 0; i < r; i++) {
        res = res * (n - i);
        res = res / (i + 1);
    }
    return res;                // element at (row, col) = nCr(row-1, col-1)
}
```

**Time:** O(r) · **Space:** O(1)

## Variant 2 — Print a full row

Generate each term from the previous using `term_next = term * (row - i) / (i + 1)`.

```java
List<Integer> row(int r) {           // r is 1-indexed
    List<Integer> res = new ArrayList<>();
    long ans = 1; res.add(1);
    for (int i = 1; i < r; i++) {
        ans = ans * (r - i);
        ans = ans / i;
        res.add((int) ans);
    }
    return res;
}
```

**Time:** O(r) · **Space:** O(r)

## Variant 3 — Whole triangle (optimal)

Reuse variant 2 for each row → O(n²) total, avoiding per-cell recomputation.

```java
List<List<Integer>> generate(int n) {
    List<List<Integer>> t = new ArrayList<>();
    for (int r = 1; r <= n; r++) t.add(row(r));
    return t;
}
```

**Time:** O(n²) · **Space:** O(n²) for output

```text
row: 1
     1 1
     1 2 1
     1 3 3 1
     1 4 6 4 1
each cell = sum of two above; row r term i = C(r-1, i-1)
```

## Key points

- Element formula: `(r, c)` 1-indexed = `C(r-1, c-1)`.
- Compute `nCr` iteratively as `res *= (n-i); res /= (i+1)` — never full factorials (overflow + slower). Multiply before dividing keeps intermediate values integral.
- Building a row from the previous term (`* (r-i) / i`) gives O(r) instead of calling `nCr` per cell (O(r²)).
- Watch for overflow on large rows — use `long`.
