## Problem

Given an array `arr` and target `k`, **return the count** of subsequences whose sum equals `k`. We only need the number, not the actual subsequences.

## Intuition

Same take / not-take recursion as printing subsequences, but instead of collecting lists we **return integers and add them up**. A helper returns *how many valid subsequences exist from index `i` onward given the remaining target*. The answer at each node is `count(pick) + count(notPick)`.

## Approach 1 — Plain Recursion

- Return `1` when the target hits `0` at the base, `0` otherwise.

```java
int count(int i, int[] arr, int n, int target) {
    if (i == n) return target == 0 ? 1 : 0;
    int pick = 0;
    if (arr[i] <= target)                 // prune when possible
        pick = count(i + 1, arr, n, target - arr[i]);
    int notPick = count(i + 1, arr, n, target);
    return pick + notPick;
}
```

**Time:** O(2^n) · **Space:** O(n) recursion stack.

## Approach 2 — Memoization (optimal for non-negative values)

- State is `(i, target)`. Memoize to collapse overlapping subproblems into a DP table.

```java
int count(int i, int target, int[] arr, Integer[][] dp) {
    if (target == 0) return 1;
    if (i == arr.length) return 0;
    if (dp[i][target] != null) return dp[i][target];
    int pick = arr[i] <= target ? count(i + 1, target - arr[i], arr, dp) : 0;
    int notPick = count(i + 1, target, arr, dp);
    return dp[i][target] = pick + notPick;
}
```

**Time:** O(n · k) · **Space:** O(n · k) table + O(n) stack.

### Dry run

```text
arr = [1, 2, 1], k = 2
subsequences summing to 2: {1,1}, {2}  -> count = 2
```

## Key points

- Return **counts** up the tree instead of collecting lists — no backtracking list needed.
- Base case for counting is `target == 0` returning `1` (this variant is the count-subsets DP).
- Memoization on `(i, target)` works only when values are **non-negative** (target used as a table index).
- This is the bridge from raw recursion to the classic **subset-sum count** DP.
