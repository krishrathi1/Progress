## Problem

Given `stalls[]` positions along a line and `k` cows, place the cows in stalls so that the **minimum distance between any two cows is as large as possible**. Return that maximized minimum distance.

This is a "maximize the minimum" placement problem — the mirror image of "minimize the maximum".

## Intuition

Sort the stalls. For a candidate distance `d`, greedily place cows: put the first cow in the leftmost stall, then place each next cow in the first stall at least `d` away from the last placed cow. If we manage to place all `k` cows, `d` is **feasible**.

Feasibility is **monotonic**: if distance `d` works, any smaller distance also works. So we binary-search `d` for the **largest** feasible value.

- Search space: `1 .. (stalls[n-1] - stalls[0])`.

### Brute force

Try every distance from `1` up to the range; keep the largest feasible one.

```cpp
for (int d = 1; d <= maxRange; d++)
    if (canPlace(stalls, k, d)) ans = d;   // returns last feasible
```

**Time:** O(range · n) · **Space:** O(1)

### Optimal — binary search on the distance

```cpp
class Solution {
public:
    bool canPlace(vector<int>& s, int k, int d) {
        int count = 1, last = s[0];        // first cow at leftmost stall
        for (int i = 1; i < s.size(); i++) {
            if (s[i] - last >= d) { count++; last = s[i]; }
            if (count >= k) return true;
        }
        return false;
    }
    int aggressiveCows(vector<int>& stalls, int k) {
        sort(stalls.begin(), stalls.end());
        int lo = 1, hi = stalls.back() - stalls.front(), ans = 0;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (canPlace(stalls, k, mid)) { ans = mid; lo = mid + 1; } // try bigger
            else hi = mid - 1;                                          // shrink
        }
        return ans;
    }
};
```

**Time:** O(n log n + n · log(range)) · **Space:** O(1)

```text
stalls=[0,3,4,7,10,9], k=4  -> sorted [0,3,4,7,9,10]
d=3: place 0,(3),(7),(10) -> 4 cows  feasible, go higher
d=4: place 0,4,9 -> only 3 cows      not feasible, go lower
answer = 3
```

## Key points

- **Sort first** — greedy placement relies on ordered positions.
- "Maximize the minimum": on feasible `mid`, record it and search **right** (`lo = mid + 1`).
- Greedy check is optimal here because placing each cow as early as possible leaves the most room.
- Bounds: `1` to `stalls[max] - stalls[min]`; sibling of the "book allocation / painter's partition" family.
