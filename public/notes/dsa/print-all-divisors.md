## Problem

Given an integer `n`, print all its **divisors** (numbers that divide `n` with zero remainder) in ascending order.

- `n = 36` -> `1 2 3 4 6 9 12 18 36`
- `n = 7` -> `1 7` (prime, only two divisors)

## Intuition

A brute force checks every `i` from 1 to `n`. But divisors come in **pairs**: if `i` divides `n`, then `n / i` also divides `n`. So we only need to iterate up to `sqrt(n)` and record both members of each pair. This cuts the work dramatically.

## Approach 1: Linear scan (brute force)

```java
void printDivisors(int n) {
    for (int i = 1; i <= n; i++) {
        if (n % i == 0) System.out.print(i + " ");
    }
}
```

**Time:** O(n) · **Space:** O(1)

## Approach 2: Iterate to sqrt(n) and collect pairs (optimal)

For each `i` up to `sqrt(n)` that divides `n`, both `i` and `n/i` are divisors. Sort at the end for ascending order (or store the two halves separately).

```java
void printDivisors(int n) {
    List<Integer> divisors = new ArrayList<>();
    for (int i = 1; i * i <= n; i++) {   // i <= sqrt(n)
        if (n % i == 0) {
            divisors.add(i);
            if (i != n / i)              // avoid dup for perfect squares
                divisors.add(n / i);
        }
    }
    Collections.sort(divisors);
    for (int d : divisors) System.out.print(d + " ");
}
```

**Time:** O(sqrt(n) + k log k), k = divisor count · **Space:** O(k)

## Dry run

```text
n = 36, loop i from 1 while i*i <= 36 (i <= 6)
  i=1 -> 36%1=0 -> add 1, add 36
  i=2 -> 36%2=0 -> add 2, add 18
  i=3 -> 36%3=0 -> add 3, add 12
  i=4 -> 36%4=0 -> add 4, add 9
  i=5 -> 36%5!=0 -> skip
  i=6 -> 36%6=0 -> 6 == 36/6 -> add 6 only (perfect square pair)
sorted: 1 2 3 4 6 9 12 18 36
```

## Key points

- Divisors pair as `(i, n/i)` around `sqrt(n)` — iterate only to `sqrt(n)`.
- Guard `i != n / i` so perfect-square roots (like `6` for `36`) are not added twice.
- Use `i * i <= n` instead of `i <= Math.sqrt(n)` to avoid floating-point error.
- Total divisor count of `n` is `O(sqrt(n))` — the sort cost is minor.
