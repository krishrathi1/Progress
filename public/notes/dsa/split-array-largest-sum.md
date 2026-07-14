## Problem

Given an integer array `nums` and an integer `k`, split `nums` into `k` **non-empty contiguous** subarrays. Minimise the **largest** subarray sum among the `k` parts, and return that minimised value.

Example: `nums = [7,2,5,10,8]`, `k = 2` → split as `[7,2,5]` and `[10,8]`; largest sum = `18`, which is the answer.

## Intuition

This is identical to the Book Allocation problem: "books" become array elements and "students" become the `k` subarrays. Instead of guessing the split, we **binary search on the answer** — the largest allowed subarray sum.

- Smallest possible answer = `max(nums)` (one element must sit somewhere).
- Largest possible answer = `sum(nums)` (all in one part, i.e. `k = 1`).

For a candidate cap `mid`, greedily count the minimum number of subarrays whose sums stay ≤ `mid`. Fewer parts are needed as `mid` grows — a monotonic predicate, perfect for binary search.

## Brute force — try every cap

```java
int partsNeeded(int[] a, long cap) {
    int parts = 1; long cur = 0;
    for (int x : a) {
        if (cur + x > cap) { parts++; cur = x; }
        else cur += x;
    }
    return parts;
}
int brute(int[] a, int k) {
    long lo = 0, hi = 0;
    for (int x : a) { lo = Math.max(lo, x); hi += x; }
    for (long cap = lo; cap <= hi; cap++)
        if (partsNeeded(a, cap) <= k) return (int) cap;
    return (int) hi;
}
```

**Time:** O(sum × n) · **Space:** O(1)

## Optimal — binary search on answer

```java
int splitArray(int[] nums, int k) {
    long lo = 0, hi = 0;
    for (int x : nums) { lo = Math.max(lo, x); hi += x; }
    while (lo < hi) {
        long mid = lo + (hi - lo) / 2;
        if (partsNeeded(nums, mid) <= k) hi = mid;  // feasible, tighten
        else lo = mid + 1;                          // need larger cap
    }
    return (int) lo;
}
```

**Time:** O(n × log(sum)) · **Space:** O(1)

```text
nums = [7,2,5,10,8], k = 2
lo = 10 (max), hi = 32 (sum)
mid=21 -> [7,2,5]=14,[10,8]=18 -> 2 parts OK -> hi=21
mid=15 -> [7,2,5]=14,[10]=10,[8] -> 3 parts -> lo=16
mid=18 -> [7,2,5],[10,8] -> 2 parts OK -> hi=18
mid=17 -> [7,2,5],[10],[8] -> 3 parts -> lo=18 == hi -> stop
Answer = 18
```

## Key points

- Search space is the **answer** `[max, sum]`, not array indices.
- `partsNeeded(cap) <= k` is monotone non-increasing in `cap`, enabling binary search.
- Using `lo < hi` with `hi = mid` converges to the smallest feasible cap without a `-1` case (a valid split always exists when `k ≤ n`).
- One template = Book Allocation = Painter's Partition = Split Array Largest Sum.
