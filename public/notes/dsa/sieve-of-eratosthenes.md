## Problem

Given an integer `n`, print all prime numbers from `1` to `n` (or answer many "is prime" queries efficiently). A number is **prime** if it has exactly two divisors: `1` and itself.

## Intuition

Instead of testing each number for primality independently, we **eliminate composites**. If `p` is prime, then every multiple of `p` (`2p, 3p, 4p, …`) is composite. By crossing out all multiples of each prime we discover, only primes survive.

## Approach 1 — Brute force (trial division)

Check each number by testing divisibility up to its square root.

```java
boolean isPrime(int x) {
    if (x < 2) return false;
    for (int i = 2; i * i <= x; i++)
        if (x % i == 0) return false;
    return true;
}
void primesTill(int n) {
    for (int i = 2; i <= n; i++)
        if (isPrime(i)) System.out.print(i + " ");
}
```

**Time:** O(n·√n) · **Space:** O(1)

## Approach 2 — Sieve of Eratosthenes (optimal)

Mark a boolean array; for each prime `p` start crossing multiples from `p*p` (smaller multiples already crossed by smaller primes), stepping by `p`.

```java
List<Integer> sieve(int n) {
    boolean[] notPrime = new boolean[n + 1];
    List<Integer> primes = new ArrayList<>();
    for (int p = 2; (long)p * p <= n; p++) {
        if (!notPrime[p])
            for (int j = p * p; j <= n; j += p)
                notPrime[j] = true;
    }
    for (int i = 2; i <= n; i++)
        if (!notPrime[i]) primes.add(i);
    return primes;
}
```

**Time:** O(n·log log n) · **Space:** O(n)

```text
n = 12  (start crossing from p*p)
p=2: cross 4 6 8 10 12
p=3: cross 9 (6,12 already done)
p>√12: stop crossing
survivors -> 2 3 5 7 11
```

## Key points

- Start inner loop at `p*p`, not `2p` — smaller multiples are already marked.
- Outer loop runs only while `p*p <= n`.
- Use `long` for `p*p` to avoid overflow when `n` is large.
- Precomputing the sieve answers many primality queries in O(1) each.
- Segmented sieve handles ranges too large to fit one array.
