## Problem

Given an integer `n`, determine if it is **prime** — a natural number greater than 1 whose only divisors are 1 and itself.

- `7` -> prime (divisors: 1, 7)
- `12` -> not prime (`12 = 2 x 6`)
- `1` and `0` -> **not** prime by definition.

## Intuition

A number is prime if it has **no divisor** in the range `2 .. n-1`. But we do not need to check that far: if `n` has a divisor `d > sqrt(n)`, it must pair with a divisor `< sqrt(n)`. So checking up to `sqrt(n)` is sufficient.

## Approach 1: Trial division to n-1 (brute force)

```java
boolean isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i < n; i++) {
        if (n % i == 0) return false;   // found a divisor
    }
    return true;
}
```

**Time:** O(n) · **Space:** O(1)

## Approach 2: Trial division to sqrt(n) (optimal for single check)

Count divisors up to `sqrt(n)`; if any found, not prime.

```java
boolean isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {  // i <= sqrt(n)
        if (n % i == 0) return false;
    }
    return true;
}
```

**Time:** O(sqrt(n)) · **Space:** O(1)

## Approach 3: Sieve of Eratosthenes (many queries)

When you must test primality for **many** numbers up to `N`, precompute a boolean sieve once.

```java
boolean[] sieve(int N) {
    boolean[] isPrime = new boolean[N + 1];
    Arrays.fill(isPrime, true);
    isPrime[0] = isPrime[1] = false;
    for (int p = 2; p * p <= N; p++)
        if (isPrime[p])
            for (int m = p * p; m <= N; m += p) // mark multiples
                isPrime[m] = false;
    return isPrime;
}
```

**Time:** O(N log log N) to build, O(1) per query · **Space:** O(N)

## Dry run

```text
n = 29, check i where i*i <= 29 (i = 2..5)
  29 % 2 = 1  (odd)
  29 % 3 = 2
  29 % 4 = 1
  29 % 5 = 4
no divisor found -> PRIME
```

## Key points

- `n <= 1` is never prime; `2` is the only even prime.
- Loop condition `i * i <= n` (integer-safe) beats `i <= Math.sqrt(n)`.
- Single check -> `O(sqrt(n))`; bulk checks up to `N` -> **Sieve of Eratosthenes**.
- Divisors pairing around `sqrt(n)` is the same insight used in "print all divisors".
