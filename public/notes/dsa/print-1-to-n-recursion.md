## Problem

Given an integer `N`, print all numbers from `1` to `N` in increasing order using **recursion** (no loops).

## Intuition

Recursion solves a problem by expressing it in terms of a smaller version of itself. To print `1..N`, notice that printing `1..N` is the same as "print `1..N-1`, then print `N`". This naturally suggests moving **downward** in the recursion but printing on the way. The trick for ascending order is *when* we print relative to the recursive call.

## Approach 1: Backtracking (count down, print while unwinding)

Call from `N` down to `1`, but print **after** the recursive call so the deepest call (1) prints first.

```java
class Solution {
    void print(int n) {
        if (n == 0) return;      // base case
        print(n - 1);            // go deeper first
        System.out.print(n + " "); // print while unwinding
    }
    public void solve(int N) { print(N); }
}
```

**Time:** O(N) · **Space:** O(N) recursion stack

## Approach 2: Forward parameter (idiomatic)

Carry the current value `i`; print first, then recurse toward `N`.

```java
void print(int i, int n) {
    if (i > n) return;           // base case
    System.out.print(i + " ");   // print on the way down
    print(i + 1, n);             // increment toward n
}
// call: print(1, N);
```

**Time:** O(N) · **Space:** O(N)

## Dry run

```text
solve(3) -> print(3)
print(3): print(2)
  print(2): print(1)
    print(1): print(0) returns
    prints 1
  prints 2
prints 3
Output: 1 2 3
```

## Key points

- Two placements of the print statement give the same output but different mental models.
- The **base case** (`n == 0` or `i > n`) prevents infinite recursion.
- Every recursive call adds a stack frame, so space is **O(N)** even though no extra data structure is used.
- Converting to a loop makes space **O(1)** — recursion here is for practice, not efficiency.
