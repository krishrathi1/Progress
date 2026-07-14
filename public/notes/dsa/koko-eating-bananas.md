## Problem

Koko has `n` piles of bananas; `piles[i]` is the count in pile `i`. The guards leave for `h` hours. Each hour Koko picks one pile and eats up to `k` bananas from it; if the pile has fewer than `k`, she eats it all and stops for that hour (she cannot switch piles within an hour).

Find the **minimum integer eating speed `k`** so she finishes all bananas within `h` hours.

## Intuition

For a fixed speed `k`, the hours needed for a pile of size `p` is `ceil(p / k)`. Total hours is `sum(ceil(piles[i] / k))`. As `k` increases, total hours **monotonically decreases**. This monotonic (sorted-like) property is the hook for binary search on the **answer**.

- Search space of `k`: `1 .. max(piles)` (speed above the max pile never helps).
- We want the smallest `k` whose total hours `<= h`.

### Brute force

Try every speed from `1` upward, return the first that fits.

```java
class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int max = 0;
        for (int p : piles) max = Math.max(max, p);
        for (int k = 1; k <= max; k++) {
            if (hours(piles, k) <= h) return k;
        }
        return max;
    }
    private long hours(int[] piles, int k) {
        long total = 0;
        for (int p : piles) total += (p + k - 1) / k; // ceil
        return total;
    }
}
```

**Time:** O(max(piles) · n) · **Space:** O(1)

### Optimal — binary search on answer

Binary-search `k` in `[1, max]`. If hours fit, the answer could be `k` or smaller, move left; else move right.

```java
class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int lo = 1, hi = 0;
        for (int p : piles) hi = Math.max(hi, p);
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (hours(piles, mid) <= h) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }
    private long hours(int[] piles, int k) {
        long total = 0;
        for (int p : piles) total += (p + k - 1) / k;
        return total;
    }
}
```

**Time:** O(n · log(max(piles))) · **Space:** O(1)

```text
piles=[3,6,7,11], h=8   search k in [1,11]
k=6 -> ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6)=1+1+2+2=6 <=8  ok, go left
k=3 -> 1+2+3+4=10 > 8  too slow, go right
k=4 -> 1+2+2+3=8 <=8  ok, go left ... converges to k=4
```

## Key points

- Classic "binary search on the answer" — feasibility function is monotonic.
- Use ceil via `(p + k - 1) / k`; accumulate hours in a `long` to avoid overflow.
- Lower bound `1`, upper bound `max(piles)`; answer is the smallest feasible speed.
