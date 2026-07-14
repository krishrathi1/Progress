## Problem

Given an integer `n` and a bit position `k` (0-indexed from the right), perform three standard single-bit operations:

- **Set** the k-th bit (force it to 1)
- **Clear** the k-th bit (force it to 0)
- **Toggle** the k-th bit (flip it)

Also support **checking** whether the k-th bit is 1.

## Intuition

The building block is a **mask** `1 << k`, which is a number with a single 1 at position `k`:

```text
k = 2  ->  1 << 2 = 00000100
```

Combining this mask with `n` using OR, AND-NOT, and XOR gives the three operations.

## Approach: bitmask operations

```java
// mask has a single 1 at position k
int mask = 1 << k;

int setKthBit(int n, int k)    { return n | (1 << k); }   // OR
int clearKthBit(int n, int k)  { return n & ~(1 << k); }  // AND with inverted mask
int toggleKthBit(int n, int k) { return n ^ (1 << k); }   // XOR
boolean isKthBitSet(int n, int k) { return ((n >> k) & 1) == 1; }
```

**Time:** O(1) · **Space:** O(1)

### Why each works

| Op | Expression | Reason |
|----|-----------|--------|
| Set | `n \| (1<<k)` | OR with 1 forces a 1; OR with 0 keeps other bits |
| Clear | `n & ~(1<<k)` | `~mask` is all 1s except position k; AND with 0 forces that bit to 0 |
| Toggle | `n ^ (1<<k)` | XOR with 1 flips; XOR with 0 keeps |
| Check | `(n>>k) & 1` | shift bit k to position 0, mask it |

### Dry run

```text
n = 5 = 0101, k = 1
set:    0101 | 0010 = 0111 = 7
clear:  0101 & 1101 = 0101 = 5  (already 0, unchanged)
toggle: 0101 ^ 0010 = 0111 = 7
check bit 0: (0101 >> 0) & 1 = 1  -> set
```

## Key points

- `1 << k` is the fundamental single-bit mask; everything derives from it.
- **OR** sets, **AND with ~mask** clears, **XOR** toggles.
- These are all O(1) and are the backbone of bitmasking / subset-DP.
- Be careful with `k >= 31` for `int` in Java/C++ (undefined/overflow); use `1L << k` for large `k`.
