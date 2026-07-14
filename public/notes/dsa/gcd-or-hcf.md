## Problem

Given two integers `a` and `b`, find their **GCD (Greatest Common Divisor)**, also called **HCF (Highest Common Factor)** — the largest positive integer that divides both without a remainder.

- `gcd(12, 18) = 6`
- `gcd(17, 5) = 1` (coprime)
- `gcd(n, 0) = n`

## Intuition

Every common divisor of `a` and `b` also divides `a - b` (and `a % b`). This lets us shrink the problem repeatedly until one number becomes 0 — the other is then the GCD. This is **Euclid's algorithm**.

## Approach 1: Check every candidate (brute force)

Try every number from `min(a,b)` down to 1; the first that divides both is the GCD.

```java
int gcd(int a, int b) {
    int g = 1;
    for (int i = Math.min(a, b); i >= 1; i--) {
        if (a % i == 0 && b % i == 0) { g = i; break; }
    }
    return g;
}
```

**Time:** O(min(a, b)) · **Space:** O(1)

## Approach 2: Euclidean algorithm — subtraction

Repeatedly subtract the smaller from the larger.

```java
int gcd(int a, int b) {
    while (a > 0 && b > 0) {
        if (a > b) a = a - b;
        else b = b - a;
    }
    return a == 0 ? b : a;
}
```

**Time:** O(max(a, b)) worst case · **Space:** O(1)

## Approach 3: Euclidean algorithm — modulo (optimal)

Replace `a` with `a % b` each step; far fewer iterations than subtraction.

```java
int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;               // when b == 0, a is the GCD
}
```

**Time:** O(log(min(a, b))) · **Space:** O(1)

## Dry run

```text
gcd(48, 18):
  a=48, b=18 -> 48 % 18 = 12  -> a=18, b=12
  a=18, b=12 -> 18 % 12 = 6   -> a=12, b=6
  a=12, b=6  -> 12 % 6  = 0    -> a=6,  b=0
  b == 0 -> answer = 6
```

## Key points

- **GCD == HCF** — same concept, different names.
- Modulo-based Euclid is the go-to: `O(log)` time, no recursion needed.
- `LCM(a, b) = (a * b) / gcd(a, b)` — use `long` for the product to avoid overflow.
- `gcd(a, 0) = a`; recursive one-liner: `return b == 0 ? a : gcd(b, a % b);`
