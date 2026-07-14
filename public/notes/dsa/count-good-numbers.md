## Problem

A digit string of length `n` (0-indexed) is **good** if:

- Digits at **even** indices are **even** (0, 2, 4, 6, 8) → 5 choices.
- Digits at **odd** indices are **prime** (2, 3, 5, 7) → 4 choices.

Count the total number of good strings of length `n`. Since the answer can be huge, return it **modulo 1e9 + 7**.

## Intuition

The positions are independent. For length `n`:

- Even indices: `0, 2, 4, ...` → there are `ceil(n/2)` of them, each with **5** options.
- Odd indices: `1, 3, 5, ...` → there are `floor(n/2)` of them, each with **4** options.

So the answer is:

```text
answer = 5^(ceil(n/2)) * 4^(floor(n/2))  mod M
```

The only real work is computing large powers under a modulus fast.

## Brute Force — Linear Power

Multiply the base `exp` times.

```java
class Solution {
    static final int M = 1_000_000_007;
    public int countGoodNumbers(long n) {
        long even = (n + 1) / 2;   // ceil(n/2)
        long odd  = n / 2;         // floor(n/2)
        long ans = 1;
        for (long i = 0; i < even; i++) ans = ans * 5 % M;
        for (long i = 0; i < odd;  i++) ans = ans * 4 % M;
        return (int) ans;
    }
}
```

**Time:** O(n) · **Space:** O(1)

Too slow because `n` can be up to 1e15.

## Optimal — Binary (Fast) Exponentiation

Recursion halves the exponent each step: `a^b = (a^(b/2))^2`, times `a` if `b` is odd.

```java
class Solution {
    static final int M = 1_000_000_007;

    long power(long base, long exp) {
        if (exp == 0) return 1;
        long half = power(base, exp / 2);
        long res = half * half % M;
        if ((exp & 1) == 1) res = res * base % M;
        return res;
    }

    public int countGoodNumbers(long n) {
        long even = (n + 1) / 2;
        long odd  = n / 2;
        return (int) (power(5, even) * power(4, odd) % M);
    }
}
```

**Time:** O(log n) · **Space:** O(log n) recursion stack

## Dry Run

```text
n = 4  ->  indices 0,1,2,3
even indices {0,2}: ceil(4/2)=2  -> 5^2 = 25
odd  indices {1,3}: floor(4/2)=2 -> 4^2 = 16
answer = 25 * 16 = 400
```

## Key points

- Even-index count = `(n+1)/2`, odd-index count = `n/2` (integer division).
- Use `long` for `n` and all intermediate products to avoid overflow before `% M`.
- Fast exponentiation is the crux — O(log n) beats the O(n) loop for huge `n`.
- Multiply `base * base` (not `half * base`) after recursing; apply `% M` after every multiply.
