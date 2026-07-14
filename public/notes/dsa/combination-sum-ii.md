## Problem

Given a collection `candidates` (**may contain duplicates**) and a `target`, return all **unique combinations** summing to `target`. **Each number may be used at most once.** The solution set must not contain duplicate combinations.

## Intuition

Two twists vs Combination Sum I: (1) each element used once, so after picking index `i` we move to `i+1`; (2) duplicates in the input can create duplicate combinations, so we **sort** and skip equal siblings at the same recursion level.

The rule: within a single `for` loop (one level), if `candidates[i] == candidates[i-1]` and `i > start`, skip — the first occurrence already covered every combination starting with that value.

## Approach — Sort + Skip Duplicates (for-loop backtracking)

```java
void solve(int start, int[] c, int target, List<Integer> cur,
           List<List<Integer>> ans) {
    if (target == 0) { ans.add(new ArrayList<>(cur)); return; }
    for (int i = start; i < c.length; i++) {
        if (i > start && c[i] == c[i - 1]) continue;  // skip duplicate at this level
        if (c[i] > target) break;                     // sorted -> no point continuing
        cur.add(c[i]);
        solve(i + 1, c, target - c[i], cur, ans);     // i+1 -> use once
        cur.remove(cur.size() - 1);                    // backtrack
    }
}
// call: Arrays.sort(candidates); solve(0, candidates, target, new ArrayList<>(), ans);
```

**Time:** O(2^n · k) worst case · **Space:** O(n) recursion depth.

### Dry run

```text
candidates = [1,1,1,2,2], target = 4  (sorted)
start=0: pick 1 -> pick 1 -> pick 2 -> [1,1,2]=4 ok
         pick 1 -> pick 2 -> ... -> [1,1,2] would repeat -> skipped by i>start check
pick 2 -> pick 2 -> [2,2]=4 ok
Result: [[1,1,2], [2,2]]
```

## Key points

- **Sort first** — required so duplicates are adjacent and `break` pruning works.
- Skip condition is `i > start && c[i] == c[i-1]` — skip only *siblings*, never the first pick of a value.
- Move to `i + 1` (not `i`) because each element is used at most once.
- `if (c[i] > target) break;` prunes the rest of a sorted level in one shot.
