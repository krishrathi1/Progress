## Problem

Given an integer `N`, print all numbers from `N` down to `1` in decreasing order using **recursion** (no loops).

## Intuition

This is the mirror of "print 1 to N". By swapping *when* we print relative to the recursive call, the same recursion structure produces descending order. The key idea: **print before recursing** to emit the largest value first.

## Approach 1: Forward count-down (print then recurse)

```java
class Solution {
    void print(int n) {
        if (n == 0) return;          // base case
        System.out.print(n + " ");   // print first (head recursion)
        print(n - 1);                // then go smaller
    }
    public void solve(int N) { print(N); }
}
```

**Time:** O(N) · **Space:** O(N) recursion stack

## Approach 2: Print while unwinding (count up)

Recurse up to `N` first, print on the way back so `N` prints before `N-1`.

```java
void print(int i, int n) {
    if (i > n) return;
    print(i + 1, n);             // go deeper first
    System.out.print(i + " ");   // print while unwinding
}
// call: print(1, N);
```

**Time:** O(N) · **Space:** O(N)

## Dry run

```text
solve(3) -> print(3)
print(3): prints 3, calls print(2)
  print(2): prints 2, calls print(1)
    print(1): prints 1, calls print(0)
      print(0): base case, returns
Output: 3 2 1
```

## Key points

- **Head recursion** (work before the call) gives descending order directly.
- Swapping the print position vs. "1 to N" flips the order — same skeleton, opposite result.
- Space is **O(N)** due to the call stack; an iterative loop would be O(1).
- Always verify the base case is reached to avoid `StackOverflowError`.
