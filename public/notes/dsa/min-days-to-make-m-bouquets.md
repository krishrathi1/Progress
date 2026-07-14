## Problem

Given `bloomDay[]` (day on which each flower blooms), make `m` bouquets, each needing `k` **adjacent** flowers. Return the **minimum number of days** to wait so you can make all `m` bouquets, or `-1` if impossible.

On a given day `d`, a flower is usable if `bloomDay[i] <= d`. Bouquets consume `k` consecutive usable flowers; a flower belongs to at most one bouquet.

## Intuition

If total flowers `n < m * k`, it is impossible -> return `-1`.

For a fixed day `d`, we can **greedily** count how many bouquets are possible: scan left to right, grow a run of usable flowers, and every time the run reaches `k`, form a bouquet and reset the run. This count is **monotonic** in `d` (more days -> more blooms -> more bouquets). So binary-search the day.

- Search space: `min(bloomDay) .. max(bloomDay)`.
- Find the smallest `d` where `bouquets(d) >= m`.

### Brute force

Try each day from `min` to `max`, first feasible day wins.

```cpp
// feasibility check reused below; brute force just loops d = min..max
```

**Time:** O((max-min) · n) · **Space:** O(1)

### Optimal — binary search on the day

```cpp
class Solution {
public:
    bool can(vector<int>& b, int d, int m, int k) {
        long long count = 0, run = 0;
        for (int x : b) {
            if (x <= d) { run++; if (run == k) { count++; run = 0; } }
            else run = 0;                 // bloom breaks adjacency
        }
        return count >= m;
    }
    int minDays(vector<int>& b, int m, int k) {
        long long need = (long long)m * k;
        if ((long long)b.size() < need) return -1;
        int lo = *min_element(b.begin(), b.end());
        int hi = *max_element(b.begin(), b.end());
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (can(b, mid, m, k)) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }
};
```

**Time:** O(n · log(max(bloomDay))) · **Space:** O(1)

```text
bloom=[1,10,3,10,2], m=3, k=1   (each bouquet = 1 flower)
d=3 -> usable: 1,3,2 -> 3 bouquets >= 3  ok, go left
d=2 -> usable: 1,2   -> 2 bouquets <  3  go right
answer = 3
```

## Key points

- Impossible check first: `n < m*k` -> `-1` (guard against overflow with `long long`).
- Adjacency: reset the run counter whenever a flower is not yet bloomed.
- Feasibility (bouquets makeable) is monotonic in the day -> binary search on answer.
- Bounds: `min(bloomDay)` to `max(bloomDay)`.
