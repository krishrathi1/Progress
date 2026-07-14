## Problem

Given an array of **distinct** integers `candidates` and a `target`, return all **unique combinations** that sum to `target`. **Each number may be reused unlimited times.** Combinations (not permutations) — order does not matter.

## Intuition

Reuse allowed means when we pick `candidates[i]` we stay at index `i` (can pick it again). To avoid duplicate combinations like `[2,3]` and `[3,2]`, we never move backward — recursion only advances the start index when we choose *not* to use the current element.

## Approach — Pick (stay) / Not-Pick (advance)

- At index `i`: if `candidates[i] <= target`, pick it and recurse **on the same `i`** with reduced target; then backtrack and move to `i+1` without picking.
- Base: `i == n` -> add the list if `target == 0`.

```java
void solve(int i, int[] c, int target, List<Integer> cur,
           List<List<Integer>> ans) {
    if (i == c.length) {
        if (target == 0) ans.add(new ArrayList<>(cur));
        return;
    }
    if (c[i] <= target) {           // pick, reuse allowed -> stay at i
        cur.add(c[i]);
        solve(i, c, target - c[i], cur, ans);
        cur.remove(cur.size() - 1); // backtrack
    }
    solve(i + 1, c, target, cur, ans); // not pick -> move on
}
```

**Time:** O(2^t · k) where `t = target/min` (tree depth), `k` = avg combination length · **Space:** O(target/min) recursion depth.

### Dry run

```text
candidates = [2,3,6,7], target = 7
pick 2 -> pick 2 -> pick 3 -> [2,2,3]=7  ok
skip to 7 -> [7]=7  ok
Result: [[2,2,3], [7]]
```

## Key points

- **Stay at index `i`** after picking = unlimited reuse of that element.
- Advancing the start index on not-pick prevents permutation duplicates.
- Distinct candidates + this structure guarantees unique combinations automatically.
- Prune with `if (c[i] <= target)` to cut impossible branches early; sorting first improves pruning.
