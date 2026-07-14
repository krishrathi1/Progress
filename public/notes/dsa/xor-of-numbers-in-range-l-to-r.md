## Problem

Compute the XOR of all integers in the inclusive range `[L, R]`, i.e. `L ^ (L+1) ^ ... ^ R`.

- Example: `L = 4, R = 7` → `4 ^ 5 ^ 6 ^ 7 = 0`.
- We want an **O(1)** solution, not an O(R − L) loop.

## Intuition

Define `f(n) = 0 ^ 1 ^ 2 ^ ... ^ n` (prefix XOR from 0). Then by the cancellation property of XOR:

```
XOR(L..R) = f(R) ^ f(L-1)
```

because `f(L-1)` cancels the `0..L-1` prefix inside `f(R)`. The remaining trick is computing `f(n)` in O(1).

## Brute force — loop

```java
int rangeXor(int L, int R) {
    int ans = 0;
    for (int i = L; i <= R; i++) ans ^= i;
    return ans;
}
```

**Time:** O(R − L) · **Space:** O(1)

## Optimal — closed form for prefix XOR

`f(n)` follows a period-4 pattern based on `n % 4`:

| n % 4 | f(n) = 0^...^n |
|-------|----------------|
| 0     | n              |
| 1     | 1              |
| 2     | n + 1          |
| 3     | 0              |

```java
int f(int n) {                 // XOR of 0..n
    switch (n % 4) {
        case 0: return n;
        case 1: return 1;
        case 2: return n + 1;
        default: return 0;     // n % 4 == 3
    }
}
int rangeXor(int L, int R) {
    return f(R) ^ f(L - 1);
}
```

**Time:** O(1) · **Space:** O(1)

```text
Why period 4? Consecutive pairs (2k, 2k+1) differ only in bit0,
so 0..(4m+3) XORs to 0. Verify:
f(0)=0, f(1)=1, f(2)=3, f(3)=0, f(4)=4, f(5)=1, f(6)=7, f(7)=0 ...

Range 4..7 = f(7) ^ f(3) = 0 ^ 0 = 0  ✓
```

## Key points

- Core identity: **prefix XOR** turns any range query into two O(1) lookups, mirroring prefix sums.
- Guard `L = 0`: then `f(L-1) = f(-1)` — handle by treating the range as just `f(R)` (or define `f(-1) = 0`).
- The 4-case table is worth memorizing; it also solves "XOR of 1..n" instantly.
- Same idea generalizes to counting set bits or other associative, invertible operations.
