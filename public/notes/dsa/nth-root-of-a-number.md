## Problem

Given integers `n` and `m`, find the integer `x` such that `x^n == m`. If no such integer exists, return `-1`. Do it in `O(n · log m)`.

Example: `n = 3, m = 27` → `3` (since `3^3 = 27`). `n = 4, m = 69` → `-1`.

## Intuition

The answer lies in `[1, m]`, and `x^n` grows **monotonically** with `x`. So binary-search the value of `x`: compute `mid^n` and compare to `m`. If it equals `m` we found it; if it's smaller, search the upper half; if larger, the lower half. The only subtlety is that `mid^n` overflows quickly, so we compute it with early cut-off.

## Brute force

Try every candidate from `1` upward.

```java
int nthRoot(int n, long m) {
    for (long x = 1; x <= m; x++) {
        long p = 1;
        for (int i = 0; i < n; i++) p *= x;
        if (p == m) return (int) x;
        if (p > m) break;
    }
    return -1;
}
```

**Time:** O(m · n) · **Space:** O(1)

## Optimal — Binary search on x with capped power

```java
// returns 0 if mid^n < m, 1 if ==, 2 if > m  (avoids overflow)
int compare(long mid, int n, long m) {
    long prod = 1;
    for (int i = 0; i < n; i++) {
        prod *= mid;
        if (prod > m) return 2;   // cut off early, no overflow
    }
    return prod == m ? 1 : 0;
}

int nthRoot(int n, long m) {
    long low = 1, high = m;
    while (low <= high) {
        long mid = low + (high - low) / 2;
        int c = compare(mid, n, m);
        if (c == 1) return (int) mid;
        else if (c == 0) low = mid + 1;   // mid^n too small
        else high = mid - 1;              // mid^n too big
    }
    return -1;
}
```

**Time:** O(n · log m) · **Space:** O(1)

## Dry run

```text
n = 3, m = 27   (expected 3)
low=1 high=27 mid=14 -> 14^3 huge (>27) : c=2, high=13
low=1 high=13 mid=7  -> 7^3=343 (>27)   : c=2, high=6
low=1 high=6  mid=3  -> 3^3=27  (==27)  : c=1, return 3
```

## Key points

- **Binary search on the answer** in `[1, m]`; `x^n` is monotonic so the boundary is well defined.
- Compute the power with an **early cut-off** (`prod > m`) to avoid overflow instead of squaring blindly.
- Each `compare` costs `O(n)` multiplications, giving overall `O(n · log m)`.
- Same pattern as integer square root — just a general exponent `n` instead of 2.
