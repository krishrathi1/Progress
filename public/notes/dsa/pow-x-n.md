## Problem

Implement `pow(x, n)` which computes `x` raised to the power `n` (where `x` is a `double` and `n` is a signed integer), efficiently.

- `pow(2.0, 10) = 1024.0`
- `pow(2.0, -2) = 0.25`

## Intuition

Multiplying `x` by itself `n` times is O(n). But exponentiation has a doubling structure: `x^n = (x^{n/2})^2`. Halving the exponent each step gives O(log n) — this is **binary exponentiation** (exponentiation by squaring). Negative powers are handled by taking the reciprocal.

## Approach 1 — Brute force

```java
double ans = 1;
for (int i = 0; i < Math.abs((long) n); i++) ans *= x;
return n < 0 ? 1 / ans : ans;
```

**Time:** O(n) · **Space:** O(1) — too slow for large `n`.

## Approach 2 — Binary exponentiation (optimal)

Square `x` and halve `n`; whenever the current bit of `n` is set, multiply it into the answer.

```java
class Solution {
    public double myPow(double x, int n) {
        long nn = n;               // widen to avoid overflow of -2^31
        if (nn < 0) { x = 1 / x; nn = -nn; }

        double ans = 1.0;
        while (nn > 0) {
            if ((nn & 1) == 1) ans *= x;   // odd bit -> take this factor
            x *= x;                        // square the base
            nn >>= 1;                      // move to next bit
        }
        return ans;
    }
}
```

**Time:** O(log n) · **Space:** O(1)

### Recursive variant

```java
double f(double x, long n) {
    if (n == 0) return 1;
    double half = f(x, n / 2);
    return (n % 2 == 0) ? half * half : half * half * x;
}
```

### Dry run: `x=2, n=10` (binary 1010)

```text
n=10 bit0=0: ans=1,   x=4,  n=5
n=5  bit0=1: ans=4,   x=16, n=2
n=2  bit0=0: ans=4,   x=256,n=1
n=1  bit0=1: ans=1024,x=..., n=0  -> stop
Result: 1024
```

## Key points

- Cast `n` to `long` **before** negating — `-Integer.MIN_VALUE` overflows an `int`.
- For `n < 0`, use `x = 1/x` and treat the exponent as positive.
- Each iteration squares the base and consumes one bit of `n`, giving O(log n).
- The set bits of `n` pick exactly which squared powers multiply into the result.
