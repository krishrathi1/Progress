## Problem

The Fibonacci sequence is defined as **F(0) = 0**, **F(1) = 1**, and **F(n) = F(n-1) + F(n-2)** for n >= 2. Given `n`, return the n-th Fibonacci number.

## Intuition

Each term is the sum of the two before it. Recursion mirrors this definition directly, but naive recursion recomputes the same subproblems many times. We progressively remove that redundancy.

## Approach 1: Naive Recursion (Brute Force)

Translate the math definition literally.

```java
int fib(int n) {
    if (n <= 1) return n;          // base cases F(0)=0, F(1)=1
    return fib(n - 1) + fib(n - 2);
}
```

**Time:** O(2^n) · **Space:** O(n) recursion stack

The call tree branches twice at every node, so work grows exponentially.

```text
              fib(4)
           /          \
       fib(3)        fib(2)
       /    \        /    \
   fib(2) fib(1)  fib(1) fib(0)   <- fib(2) computed twice
```

## Approach 2: Memoized Recursion (Better)

Cache each result so every state is solved once.

```java
int fib(int n, int[] memo) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
}
```

**Time:** O(n) · **Space:** O(n) for memo + stack

## Approach 3: Iterative Two Variables (Optimal)

Only the last two values are ever needed.

```java
int fib(int n) {
    if (n <= 1) return n;
    int prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        int cur = prev1 + prev2;
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
}
```

**Time:** O(n) · **Space:** O(1)

```text
n:    0  1  2  3  4  5  6
fib:  0  1  1  2  3  5  8
```

## Key points

- Naive recursion is O(2^n) due to overlapping subproblems — classic DP motivation.
- Memoization (top-down) and tabulation (bottom-up) both reduce it to O(n).
- The iterative form drops space to O(1) by keeping only two variables.
- For very large n, a matrix-exponentiation or fast-doubling method gives O(log n).
