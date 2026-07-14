## Problem

Compute the sum `1 + 2 + 3 + ... + N` for a given non-negative integer `N` using **recursion**.

## Intuition

The sum of the first `N` numbers can be defined in terms of a smaller sum:

`sum(N) = N + sum(N-1)`, with `sum(0) = 0`.

This is the classic **parameterized / functional recursion** pattern. There are two flavors: return the value up the stack (functional), or carry an accumulator (parameterized).

## Approach 1: Functional recursion (return value)

```java
class Solution {
    int sum(int n) {
        if (n == 0) return 0;      // base case
        return n + sum(n - 1);     // combine current with smaller subproblem
    }
}
```

**Time:** O(N) · **Space:** O(N) recursion stack

## Approach 2: Parameterized recursion (accumulator)

Carry a running total; return it at the base case. This is **tail-recursive** in form.

```java
int sum(int i, int acc) {
    if (i < 1) return acc;         // base case: total ready
    return sum(i - 1, acc + i);    // accumulate and recurse
}
// call: sum(N, 0);
```

**Time:** O(N) · **Space:** O(N)

## Optimal: Closed-form formula (O(1))

For interviews, note the math shortcut using Gauss's formula.

```java
long sum(long n) { return n * (n + 1) / 2; }
```

**Time:** O(1) · **Space:** O(1)

## Dry run

```text
sum(3)
= 3 + sum(2)
= 3 + (2 + sum(1))
= 3 + (2 + (1 + sum(0)))
= 3 + (2 + (1 + 0)) = 6
```

## Key points

- Recurrence: `sum(N) = N + sum(N-1)`, base `sum(0) = 0`.
- Functional recursion returns values; parameterized recursion threads an **accumulator**.
- Use `long` to avoid integer overflow for large `N` (`N*(N+1)/2` overflows `int` near N ≈ 46340).
- The formula `N(N+1)/2` is the truly optimal answer — mention it in interviews.
