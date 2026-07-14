## Problem

Given an unsorted array `nums`, return the length of the **longest run of consecutive integers** (values differing by 1), regardless of their positions in the array. Target complexity: **O(n)**.

- Example: `[100, 4, 200, 1, 3, 2]` → `[1, 2, 3, 4]` → length `4`.

## Intuition

Consecutive means value+1 exists. Put everything in a hash set for O(1) lookups. The trick to stay O(n): only start counting a streak from a number that is a **sequence start**, i.e. `x-1` is not in the set. Each element is then visited by at most one streak walk.

## Brute force — sort

```java
int longestSorted(int[] a) {
    if (a.length == 0) return 0;
    Arrays.sort(a);
    int best = 1, cur = 1;
    for (int i = 1; i < a.length; i++) {
        if (a[i] == a[i - 1]) continue;          // skip duplicates
        if (a[i] == a[i - 1] + 1) cur++;
        else cur = 1;
        best = Math.max(best, cur);
    }
    return best;
}
```

**Time:** O(n log n) · **Space:** O(1)

## Optimal — hash set, count from starts

```java
int longestConsecutive(int[] a) {
    Set<Integer> set = new HashSet<>();
    for (int x : a) set.add(x);
    int best = 0;
    for (int x : set) {
        if (!set.contains(x - 1)) {              // x is a streak start
            int len = 1, cur = x;
            while (set.contains(cur + 1)) { cur++; len++; }
            best = Math.max(best, len);
        }
    }
    return best;
}
```

**Time:** O(n) · **Space:** O(n)

## Dry run

```text
set = {100, 4, 200, 1, 3, 2}
x=100: 99 not in set -> start; 101? no -> len 1
x=4:   3 in set  -> skip (not a start)
x=200: 199 not in set -> start; 201? no -> len 1
x=1:   0 not in set -> start; 2,3,4 in set -> len 4  <-- best
x=3,2: predecessor in set -> skipped
answer = 4
```

## Key points

- The `!set.contains(x-1)` guard makes it O(n): inner `while` only runs for true starts, so total inner steps ≤ n.
- Using a **set** deduplicates automatically, unlike the sort approach which needs an explicit duplicate skip.
- Do not sort — that gives O(n log n); the set trick is the intended optimal.
- Handles negatives and gaps naturally; empty input returns 0.
