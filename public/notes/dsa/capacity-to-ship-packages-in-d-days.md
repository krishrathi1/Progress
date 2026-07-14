## Problem

Packages on a conveyor belt must be shipped **in order** within `days` days. Package `i` has weight `weights[i]`. Each day the ship loads packages in order without exceeding its capacity `C`. Return the **least capacity `C`** that ships everything within `days` days.

Packages cannot be reordered — this is the key constraint that makes a greedy check work.

## Intuition

For a candidate capacity `C`:
- `C` must be at least `max(weights)` (otherwise the heaviest package never fits).
- With capacity `sum(weights)` everything ships in 1 day.

Greedily count days needed for a given `C`: walk the weights, keep a running load; when adding the next weight would exceed `C`, start a new day. Days needed **decreases** as `C` increases -> binary search on `C`.

- Search space: `[max(weights), sum(weights)]`.
- Find smallest `C` where `daysNeeded(C) <= days`.

### Brute force

Try `C` from `max(weights)` upward; first that fits wins.

```java
for (int C = max; C <= sum; C++)
    if (daysNeeded(weights, C) <= days) return C;
```

**Time:** O((sum-max) · n) · **Space:** O(1)

### Optimal — binary search on capacity

```java
class Solution {
    public int shipWithinDays(int[] w, int days) {
        int lo = 0, hi = 0;
        for (int x : w) { lo = Math.max(lo, x); hi += x; }
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (daysNeeded(w, mid) <= days) hi = mid;   // fits, try smaller cap
            else lo = mid + 1;                          // too small, grow cap
        }
        return lo;
    }
    private int daysNeeded(int[] w, int cap) {
        int days = 1, load = 0;
        for (int x : w) {
            if (load + x > cap) { days++; load = 0; }   // new day
            load += x;
        }
        return days;
    }
}
```

**Time:** O(n · log(sum(weights))) · **Space:** O(1)

```text
w=[1,2,3,4,5,6,7,8,9,10], days=5   C in [10,55]
C=32 -> [1..7]=28,[8,9,10]=27 -> 2 days <=5  go left
C=15 -> [1..5]=15,[6,7]=13,[8],[9],[10] -> 5 days <=5  ok, go left
C=14 -> needs 6 days > 5  go right -> answer 15
```

## Key points

- Lower bound is `max(weights)` (heaviest must fit), upper bound is `sum(weights)` (one day).
- Order is fixed — no sorting; greedy day-count is a simple linear scan.
- `daysNeeded` starts at `1`; open a new day only when the next package overflows.
- Identical "binary search on answer + greedy feasibility" pattern as split-array / book-allocation.
