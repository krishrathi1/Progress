## Problem

Given an array (or string), print/generate **all subsequences** — every subset formed by keeping elements in their original order. An array of size `n` has **2^n** subsequences (including the empty one).

## Intuition

For each index there are exactly **two choices**: *include* the element in the current subsequence, or *exclude* it. Recursing on `include` vs `exclude` down all `n` indices enumerates every subset. This "pick / not-pick" pattern is the foundation for subsets, combinations, and subset-sum problems.

## Approach 1 — Pick / Not-Pick Recursion

```java
import java.util.*;

class Solution {
    public void solve(int i, int[] arr, List<Integer> cur, List<List<Integer>> res) {
        if (i == arr.length) {
            res.add(new ArrayList<>(cur));  // one complete subsequence
            return;
        }
        // include arr[i]
        cur.add(arr[i]);
        solve(i + 1, arr, cur, res);
        cur.remove(cur.size() - 1);         // backtrack

        // exclude arr[i]
        solve(i + 1, arr, cur, res);
    }
}
```

**Time:** O(2^n · n) — 2^n subsequences, O(n) to copy each.
**Space:** O(n) recursion depth (excluding output).

## Approach 2 — Bitmask Iteration

Each integer `mask` from `0` to `2^n - 1` encodes one subset: bit `j` set means include `arr[j]`.

```java
List<List<Integer>> subsequences(int[] arr) {
    int n = arr.length;
    List<List<Integer>> res = new ArrayList<>();
    for (int mask = 0; mask < (1 << n); mask++) {
        List<Integer> sub = new ArrayList<>();
        for (int j = 0; j < n; j++)
            if ((mask & (1 << j)) != 0) sub.add(arr[j]);
        res.add(sub);
    }
    return res;
}
```

**Time:** O(2^n · n) · **Space:** O(1) auxiliary (no recursion stack)

## Dry Run

```text
arr = [1, 2]

pick/not-pick tree:
             i=0
      pick1 /     \ skip1
        i=1         i=1
     p2/  \s2     p2/  \s2
   [1,2] [1]    [2]   []

Output: [1,2], [1], [2], []   (2^2 = 4 subsequences)
```

## Key points

- Every element has **2 choices**: include or exclude → 2^n total.
- Recursive pick/not-pick is the standard template; **backtrack** (remove) after the include branch.
- Bitmask version is iterative and stack-free; bit `j` ↔ element `j`.
- **Subsequence** keeps relative order (unlike a subset's set semantics) and need not be contiguous (unlike a substring).
- Add a sum/target check at the base case to adapt this for subset-sum style problems.
