## Problem

Given an integer `n`, determine whether it is **odd** or **even** — ideally using bit manipulation rather than the modulo operator.

## Intuition

In binary, a number is **even** exactly when its least-significant bit (bit 0) is `0`, and **odd** when bit 0 is `1`. This is because every bit except bit 0 represents a power of two that is itself even; only the `2^0 = 1` place can make a number odd. So we just inspect the last bit with `n & 1`.

## Approach 1: Bitwise AND (optimal)

```java
class Solution {
    public String oddEven(int n) {
        return (n & 1) == 1 ? "Odd" : "Even";
    }
}
```

**Time:** O(1) · **Space:** O(1)

`n & 1` extracts the last bit: it is `1` for odd numbers and `0` for even numbers. This works for negative numbers too because two's-complement representation preserves the parity of bit 0.

## Approach 2: Modulo (readable, but slower conceptually)

```java
boolean isEven = (n % 2 == 0);
```

For negatives, `%` in Java can yield `-1` (e.g. `-3 % 2 == -1`), so a safe check is `n % 2 != 0` for odd. The bitwise `& 1` avoids this pitfall entirely.

```text
 6 = 1 1 0  -> 110 & 001 = 000 -> Even
 7 = 1 1 1  -> 111 & 001 = 001 -> Odd
-3 = ...1 1 1 0 1 (two's complement) -> last bit 1 -> Odd
```

## Key points

- **Even iff bit 0 is 0**; test with `(n & 1) == 0`.
- `n & 1` is faster and safer than `n % 2` for negative numbers.
- It is a constant-time, single-instruction check.
- Same idea generalizes: `n & (2^k - 1)` gives `n mod 2^k`.
