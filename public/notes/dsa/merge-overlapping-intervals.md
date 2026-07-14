## Problem

Given a list of intervals `[start, end]`, **merge all overlapping intervals** and return the non-overlapping intervals that cover exactly the same ranges.

## Intuition

If intervals are **sorted by start**, then any interval that overlaps an already-placed one must overlap the **last** merged interval. So a single pass suffices: either extend the last interval's end, or start a new one.

## Brute Force — Sort then Nested Merge

Sort, then for each interval scan forward absorbing everything that overlaps.

**Time:** O(n log n + n^2) · **Space:** O(n)

## Optimal — Sort + Linear Sweep

Sort by start. Keep a result list; compare each interval to the last added.

```java
int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> res = new ArrayList<>();
    for (int[] cur : intervals) {
        if (res.isEmpty() || cur[0] > res.get(res.size() - 1)[1]) {
            res.add(cur);                                  // no overlap: new interval
        } else {
            int[] last = res.get(res.size() - 1);
            last[1] = Math.max(last[1], cur[1]);           // overlap: extend end
        }
    }
    return res.toArray(new int[res.size()][]);
}
```

**Time:** O(n log n) — dominated by the sort · **Space:** O(n) for output (O(1) auxiliary)

```text
input  [[1,3],[2,6],[8,10],[15,18]]  (already sorted by start)
[1,3]                      res=[[1,3]]
[2,6]  2<=3 overlap        res=[[1,6]]     (max end 6)
[8,10] 8>6  no overlap     res=[[1,6],[8,10]]
[15,18]15>10 no overlap    res=[[1,6],[8,10],[15,18]]
```

## Key points

- **Sort by start first** — this is the whole trick; without it a linear sweep is unsound.
- Overlap test: `cur.start <= last.end`. Touching endpoints (e.g. `[1,4]` and `[4,5]`) are usually treated as overlapping — use `>` for "new interval".
- On merge, always take `max(last.end, cur.end)` — a later interval may end earlier (nested).
