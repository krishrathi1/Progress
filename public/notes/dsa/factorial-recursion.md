## Problem

Compute `N! = N × (N-1) × (N-2) × ... × 1` for a non-negative integer `N` using **recursion**. By definition `0! = 1`.

## Intuition

Factorial has a natural recursive definition:

`fact(N) = N × fact(N-1)`, with base case `fact(0) = 1`.

Each call reduces the problem size by one until it hits the base case, then multiplies results back up the stack.

## Approach 1: Functional recursion

```java
class Solution {
    long fact(int n) {
        if (n <= 1) return 1;        // base: 0! = 1! = 1
        return (long) n * fact(n - 1); // combine
    }
}
```

**Time:** O(N) · **Space:** O(N) recursion stack

## Approach 2: Parameterized (accumulator, tail form)

```java
long fact(int i, long acc) {
    if (i <= 1) return acc;
    return fact(i - 1, acc * i);
}
// call: fact(N, 1);
```

**Time:** O(N) · **Space:** O(N)

## Approach 3: Iterative (optimal space)

```java
long fact(int n) {
    long res = 1;
    for (int i = 2; i <= n; i++) res *= i;
    return res;
}
```

**Time:** O(N) · **Space:** O(1)

## Dry run

```text
fact(4)
= 4 * fact(3)
= 4 * (3 * fact(2))
= 4 * (3 * (2 * fact(1)))
= 4 * (3 * (2 * 1)) = 24
```

## Key points

- Recurrence: `fact(N) = N × fact(N-1)`, base `fact(0) = 1`.
- Factorials grow explosively: `13!` overflows `int`, `21!` overflows `long`. Use `BigInteger` for large `N`.
- Recursive and iterative versions are both O(N) time; iterative is O(1) space.
- Always guard the base case (`n <= 1`) to include `0!` and `1!`.
