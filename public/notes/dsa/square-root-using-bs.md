## Problem

Given a non-negative integer `n`, return `floor(sqrt(n))` — the largest integer `x` such that `x * x <= n` — without using the built-in `sqrt`. Do it in `O(log n)`.

Example: `n = 28` → `5` (since `5*5=25 <= 28 < 36 = 6*6`).

## Intuition

The answer lies in `[1, n]` and the predicate "`x*x <= n`" is **monotonic**: true for small `x`, false once `x` is too large. That monotonic boundary is exactly what binary search finds. We keep shrinking the range, remembering the largest `x` whose square still fits.

## Brute force

Linear scan upward until the square exceeds `n`.

```java
long mySqrt(long n) {
    long ans = 0;
    for (long i = 1; i * i <= n; i++) ans = i;
    return ans;
}
```

**Time:** O(√n) · **Space:** O(1)

## Optimal — Binary search on the answer

```java
long mySqrt(long n) {
    long low = 1, high = n, ans = 0;
    while (low <= high) {
        long mid = low + (high - low) / 2;
        if (mid * mid <= n) {   // mid could be the answer, try larger
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;     // too big, go smaller
        }
    }
    return ans;                 // returns floor(sqrt(n)); handles n=0 -> 0
}
```

**Time:** O(log n) · **Space:** O(1)

## Dry run

```text
n = 28   (expected 5)
low=1 high=28 mid=14 -> 14*14=196 > 28 : high=13
low=1 high=13 mid=7  -> 7*7=49   > 28 : high=6
low=1 high=6  mid=3  -> 3*3=9   <= 28 : ans=3, low=4
low=4 high=6  mid=5  -> 5*5=25  <= 28 : ans=5, low=6
low=6 high=6  mid=6  -> 6*6=36   > 28 : high=5
loop ends -> ans = 5
```

## Key points

- **Binary search on the answer space** `[1, n]`, using predicate `mid*mid <= n`.
- Use `long` (or compare as `mid <= n / mid`) to avoid `int` overflow when squaring.
- The invariant `ans` always holds the best valid `x`, so it equals the floor at the end.
- Same template extends to Nth root and other "find largest/smallest value satisfying a monotonic condition" problems.
