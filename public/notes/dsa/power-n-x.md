## Problem

Implement `pow(x, n)` — compute `x` raised to the power `n`. Here `x` is a double and `n` is an integer that may be **negative**. Return the result efficiently.

## Intuition

Naively multiplying `x` by itself `n` times is O(n). But exponentiation has structure:
`x^n = (x^2)^(n/2)` when `n` is even, and `x^n = x · x^(n-1)` when `n` is odd. This halves the exponent repeatedly, giving **binary exponentiation** in O(log n).

## Approach 1 — Brute force (linear)

Multiply in a loop; handle negative `n` by inverting.

```java
double myPow(double x, int n) {
    long nn = n;                 // widen to avoid overflow of -n
    if (nn < 0) { x = 1 / x; nn = -nn; }
    double ans = 1.0;
    for (long i = 0; i < nn; i++) ans *= x;
    return ans;
}
```

**Time:** O(n) · **Space:** O(1)

## Approach 2 — Binary (fast) exponentiation, optimal

Look at bits of the exponent. Square the base each step; multiply into the answer only when the current bit is set.

```java
double myPow(double x, int n) {
    long nn = n;
    if (nn < 0) { x = 1 / x; nn = -nn; }
    double ans = 1.0;
    while (nn > 0) {
        if ((nn & 1) == 1) ans *= x;  // odd -> take this power of x
        x *= x;                       // square the base
        nn >>= 1;                     // move to next bit
    }
    return ans;
}
```

**Time:** O(log n) · **Space:** O(1)

```text
x=2, n=10  (binary 1010)
bit 0: nn=1010 even -> ans=1 ; x=4
bit 1: nn=101  odd  -> ans=4 ; x=16
bit 2: nn=10   even -> ans=4 ; x=256
bit 3: nn=1    odd  -> ans=1024 ; x=65536
result = 1024 = 2^10  ✅
```

## Key points

- Widen `n` to `long` before negating: `-Integer.MIN_VALUE` overflows an int.
- Negative exponent: replace `x` with `1/x` and use `|n|`.
- Each step squares the base and consumes one bit of the exponent.
- Recursive variant: `pow(x,n)=pow(x*x,n/2)`; iterative avoids stack overhead.
