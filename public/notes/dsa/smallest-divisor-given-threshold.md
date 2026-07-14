## Problem

Given an array `nums[]` and an integer `threshold`, choose a positive integer divisor `d`. Divide every element by `d`, taking the **ceiling** of each result, and sum them. Return the **smallest divisor `d`** such that this sum is `<= threshold`.

It is guaranteed the answer exists (using `d = max(nums)` gives sum `= n <= threshold` when `threshold >= n`).

## Intuition

Define `sum(d) = sum(ceil(nums[i] / d))`. As `d` grows, each ceiled term shrinks, so `sum(d)` is **monotonically decreasing**. We want the smallest `d` with `sum(d) <= threshold` — a textbook binary search on the answer.

- Divisor range: `1 .. max(nums)` (a divisor beyond `max` still yields sum `= n`, never smaller).

### Brute force

Scan `d = 1, 2, 3, ...` and return the first feasible one.

```java
for (int d = 1; d <= max; d++)
    if (sum(nums, d) <= threshold) return d;
```

**Time:** O(max(nums) · n) · **Space:** O(1)

### Optimal — binary search on the divisor

```java
class Solution {
    public int smallestDivisor(int[] nums, int threshold) {
        int lo = 1, hi = 0;
        for (int x : nums) hi = Math.max(hi, x);
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (sum(nums, mid) <= threshold) hi = mid;   // feasible, try smaller
            else lo = mid + 1;                            // too big, need larger d
        }
        return lo;
    }
    private int sum(int[] nums, int d) {
        int total = 0;
        for (int x : nums) total += (x + d - 1) / d;      // ceil(x/d)
        return total;
    }
}
```

**Time:** O(n · log(max(nums))) · **Space:** O(1)

```text
nums=[1,2,5,9], threshold=6     d in [1,9]
d=5 -> 1+1+1+2 = 5 <= 6  ok, go left
d=3 -> 1+1+2+3 = 7 >  6  go right
d=4 -> 1+1+2+3 = 7 >  6  go right
-> converges to d=5
```

## Key points

- `sum(d)` is monotonic decreasing -> binary search for the smallest feasible divisor.
- Compute ceiling with integer math: `(x + d - 1) / d` (avoids floating point).
- Bounds: `lo = 1`, `hi = max(nums)`; answer never exceeds `max(nums)`.
- Same feasibility-on-answer pattern as Koko eating bananas.
