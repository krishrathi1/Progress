## Problem

Given an array `nums` that **may contain duplicates**, return **all unique subsets** (the power set without duplicate subsets). Order of subsets does not matter, but no two subsets may be identical.

## Intuition

Generating the power set is easy; the challenge is duplicates. `[1,2]` from indices 0,2 and 1,2 of `[1,1,2]` would be identical. As in Combination Sum II, we **sort** so equal values are adjacent, then within one recursion level skip a value equal to its previous sibling. Every subset (each partial `cur`) is recorded, not just those meeting a target.

## Approach — Sort + For-loop Backtracking, record every node

```java
void solve(int start, int[] nums, List<Integer> cur,
           List<List<Integer>> ans) {
    ans.add(new ArrayList<>(cur));           // record subset at every node
    for (int i = start; i < nums.length; i++) {
        if (i > start && nums[i] == nums[i - 1]) continue; // skip duplicate sibling
        cur.add(nums[i]);
        solve(i + 1, nums, cur, ans);
        cur.remove(cur.size() - 1);           // backtrack
    }
}
// call: Arrays.sort(nums); solve(0, nums, new ArrayList<>(), ans);
```

**Time:** O(2^n · n) (each of up to 2^n subsets copied) · **Space:** O(n) recursion depth.

### Dry run

```text
nums = [1, 2, 2]  (sorted)
[]              -> add
 pick1: [1]     -> add
   pick2: [1,2] -> add
     pick2: [1,2,2] -> add
   second 2 at same level: i>start & equal -> skip
 pick2: [2]     -> add
   pick2: [2,2] -> add
 second 2 (i>start) skipped
Result: [[],[1],[1,2],[1,2,2],[2],[2,2]]
```

## Key points

- **Add `cur` at every node** (top of the call) — every prefix is itself a valid subset.
- **Sort first**, then skip with `i > start && nums[i] == nums[i-1]` to drop duplicate subsets.
- Move to `i + 1` — each element used at most once per subset.
- Skipping only *siblings* (not the first occurrence) is what keeps every distinct subset exactly once.
