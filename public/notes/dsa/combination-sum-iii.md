## Problem

Find all valid combinations of **k numbers** that sum up to **n**, where:

- Only numbers **1 to 9** are used.
- Each number is used **at most once**.

Return all unique combinations (order of numbers inside a combination does not matter).

**Example:** `k = 3, n = 7` → `[[1,2,4]]`

## Intuition

This is a classic **backtracking** problem. We walk through digits 1..9 in increasing order and decide whether to *pick* the current digit. Choosing numbers in strictly increasing order automatically prevents duplicate combinations like `[1,2,4]` and `[2,1,4]`.

We stop a path when:
- The combination has `k` numbers **and** the remaining sum is 0 → record it.
- We overshoot the sum or use too many numbers → prune.

## Brute force idea

Generate every subset of `{1..9}` (2^9 = 512 subsets), then keep those with size `k` and sum `n`. Works, but explores many useless subsets.

**Time:** O(2^9 · 9) · **Space:** O(9)

## Optimal — Backtracking with pruning

```java
class Solution {
    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(1, k, n, new ArrayList<>(), res);
        return res;
    }

    private void backtrack(int start, int k, int rem,
                           List<Integer> cur, List<List<Integer>> res) {
        if (cur.size() == k) {
            if (rem == 0) res.add(new ArrayList<>(cur));
            return;
        }
        for (int d = start; d <= 9; d++) {
            if (d > rem) break;           // pruning: increasing order
            cur.add(d);
            backtrack(d + 1, k, rem - d, cur, res);
            cur.remove(cur.size() - 1);   // undo choice
        }
    }
}
```

**Time:** O(C(9,k) · k) · **Space:** O(k) recursion depth

### Dry run (k=3, n=7)

```text
pick 1 → rem 6, [1]
  pick 2 → rem 4, [1,2]
    pick 4 → rem 0, size 3 OK → [1,2,4]
    pick 5 → 5 > 4 break
  pick 3 → rem 3, [1,3]
    pick 4 → 4 > 3 break  (no valid completion)
...
Result: [[1,2,4]]
```

## Key points

- Pass a `start` index so each number is used at most once and combos stay sorted (no duplicates).
- Two prunes: `d > rem` breaks the loop; size/sum check ends the path early.
- The `remove` after recursion is the **backtracking undo** step.
- Complexity is bounded by C(9,k) since we choose k of 9 digits.
