## Problem

Given an integer `n`, return `true` if it is a power of two, otherwise `false`. A number is a power of two if it can be written as `2^x` for some integer `x >= 0` (1, 2, 4, 8, 16, ...).

## Intuition

Every power of two has **exactly one set bit** in its binary representation:

```text
1  = 0001
2  = 0010
4  = 0100
8  = 1000
```

So the problem reduces to: "does `n` have exactly one set bit and is `n > 0`?"

## Approach 1: Brute force (repeated division)

Keep dividing by 2 while the number is even. If we reach 1, it was a power of two.

```java
boolean isPowerOfTwo(int n) {
    if (n <= 0) return false;
    while (n % 2 == 0) n /= 2;
    return n == 1;
}
```

**Time:** O(log n) · **Space:** O(1)

## Approach 2: Optimal (n & (n-1) trick)

For any number, `n & (n - 1)` clears the **lowest set bit**. If `n` is a power of two it has only one set bit, so clearing it gives `0`.

```java
boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}
```

**Time:** O(1) · **Space:** O(1)

### Dry run

```text
n = 8   -> 1000
n-1 = 7 -> 0111
n & (n-1) = 0000  -> true  (power of two)

n = 6   -> 0110
n-1 = 5 -> 0101
n & (n-1) = 0100  -> non-zero -> false
```

## Key points

- A positive power of two has exactly one set bit.
- `n & (n - 1) == 0` (with `n > 0`) is the O(1) check.
- The `n > 0` guard is essential: `n = 0` gives `0 & -1 == 0` (false positive), and negatives are never powers of two.
- Related: `n & (n - 1)` also counts set bits (Brian Kernighan) and clears the last set bit.
