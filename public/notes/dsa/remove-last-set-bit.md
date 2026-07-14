## Problem

Given an integer `n`, remove (clear) its **lowest / rightmost set bit** and return the result.

Example: `n = 12 = 1100` -> remove lowest set bit (at position 2) -> `1000 = 8`.

## Intuition

Consider what `n - 1` does to the binary form: it flips the lowest set bit to 0 and turns every 0 below it into 1.

```text
n     = ...1 0 0 0   (lowest set bit, then zeros)
n - 1 = ...0 1 1 1   (that bit becomes 0, trailing bits become 1)
```

The bits **above** the lowest set bit are unchanged. So `n & (n - 1)` keeps the high bits, zeroes the lowest set bit, and zeroes the (already-zero) trailing bits — exactly removing the last set bit.

## Approach: n & (n - 1)

```java
int removeLastSetBit(int n) {
    return n & (n - 1);
}
```

**Time:** O(1) · **Space:** O(1)

### Dry run

```text
n = 12   -> 1100
n-1 = 11 -> 1011
n & (n-1) -> 1000 = 8   (lowest set bit at pos 2 removed)

n = 40   -> 101000
n-1 = 39 -> 100111
n & (n-1) -> 100000 = 32
```

## Contrast: isolate vs remove the last set bit

| Goal | Expression | On n = 12 (1100) |
|------|-----------|------------------|
| Remove last set bit | `n & (n - 1)` | 1000 = 8 |
| Isolate last set bit | `n & (-n)` | 0100 = 4 |

`-n` is two's complement (`~n + 1`), which is why `n & -n` leaves only the lowest set bit.

## Key points

- `n & (n - 1)` clears the lowest set bit — the core primitive behind counting set bits (Brian Kernighan) and the power-of-two check.
- If `n == 0`, the result is `0` (nothing to remove).
- Sibling trick: `n & (-n)` **isolates** the lowest set bit instead of removing it.
- Repeatedly applying `n & (n-1)` walks through every set bit exactly once.
