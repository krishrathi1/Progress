## Problem

Given a non-negative integer `n` and a position `k` (0-indexed from the least-significant bit), determine whether the **k-th bit** of `n` is **set** (equal to 1). Return `true`/`false`.

## Intuition

A single bit at position `k` can be isolated using a **mask** — a number that has exactly one 1, at position `k`, produced by `1 << k`. AND-ing `n` with this mask keeps only that bit; the result is non-zero **iff** the bit was set.

## Approach 1: Left-shift the mask

Build the mask `1 << k` and AND it with `n`.

```java
class Solution {
    public boolean isKthBitSet(int n, int k) {
        return (n & (1 << k)) != 0;
    }
}
```

**Time:** O(1) · **Space:** O(1)

## Approach 2: Right-shift the number

Shift `n` right by `k` so the target bit lands at position 0, then check the last bit with `& 1`.

```java
class Solution {
    public boolean isKthBitSet(int n, int k) {
        return ((n >> k) & 1) == 1;
    }
}
```

**Time:** O(1) · **Space:** O(1)

Both are equivalent; approach 2 avoids overflow of the mask when `k` is large relative to the type width and is often preferred.

```text
n = 13 = 1 1 0 1  (bits indexed 3 2 1 0)
Check k = 2:
  1 << 2 = 0 1 0 0
  n & mask = 1101 & 0100 = 0100 = 4 (non-zero) -> bit set -> true

Check k = 1:
  1 << 1 = 0 0 1 0
  n & mask = 1101 & 0010 = 0000 -> bit NOT set -> false
```

## Key points

- Mask for bit `k` is `1 << k` (exactly one 1 at position `k`).
- `(n & (1 << k)) != 0` is the canonical set-bit test.
- Equivalent form: `(n >> k) & 1`.
- For `k >= 31` on `int`, use `1L << k` (long) to avoid overflow of the mask.
- Related tricks: **set** a bit `n | (1<<k)`, **clear** `n & ~(1<<k)`, **toggle** `n ^ (1<<k)`.
