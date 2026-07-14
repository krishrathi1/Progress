## Problem

Given an integer `n`, count the number of `1`s (set bits) in its binary representation. This is also called the **Hamming weight** or population count.

Example: `n = 13` -> binary `1101` -> answer `3`.

## Intuition

We need to inspect the bits of `n`. We can look at them one at a time (check the last bit, shift right), or we can jump directly from one set bit to the next using the `n & (n-1)` trick.

## Approach 1: Brute force (shift and check each bit)

Check the last bit with `n & 1`, then right-shift. Runs once per bit (32 for an int).

```java
int countSetBits(int n) {
    int count = 0;
    while (n != 0) {
        count += (n & 1);
        n >>>= 1;          // unsigned shift to handle negatives
    }
    return count;
}
```

**Time:** O(number of bits) = O(32) · **Space:** O(1)

## Approach 2: Optimal (Brian Kernighan's algorithm)

`n & (n - 1)` removes the **lowest set bit**. Loop until `n` becomes 0; the loop runs exactly once per set bit.

```java
int countSetBits(int n) {
    int count = 0;
    while (n != 0) {
        n = n & (n - 1);   // drop the lowest set bit
        count++;
    }
    return count;
}
```

**Time:** O(number of set bits) · **Space:** O(1)

### Dry run

```text
n = 13 = 1101
step 1: 1101 & 1100 = 1100   count=1
step 2: 1100 & 1011 = 1000   count=2
step 3: 1000 & 0111 = 0000   count=3
n == 0 -> answer = 3
```

## Key points

- Brian Kernighan's loop iterates only as many times as there are set bits, so it beats bit-by-bit scanning on sparse numbers.
- Use unsigned shift `>>>` in Java when scanning bits so negative numbers don't loop forever (sign bit fills in).
- Built-ins: `Integer.bitCount(n)` in Java, `__builtin_popcount(n)` in C++.
- To count set bits from `1..n` (a common variant), use DP: `dp[i] = dp[i >> 1] + (i & 1)`.
