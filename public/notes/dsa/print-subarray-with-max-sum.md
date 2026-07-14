## Problem

Given an integer array `nums` (may contain negatives), find the contiguous subarray with the **largest sum** and **print the subarray itself** (not just the sum).

- Example: `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]` → max sum `6`, subarray `[4, -1, 2, 1]`.

## Intuition

This extends **Kadane's algorithm**. Kadane tracks a running sum and resets it to the current element whenever the running sum drops below zero (a negative prefix can never help a future subarray). To recover the actual subarray, we remember the **start index** of the current run and lock in `[start, end]` every time we beat the best sum.

## Brute force — all subarrays

```java
int[] maxSubArrayBrute(int[] a) {
    int n = a.length, best = Integer.MIN_VALUE, bs = 0, be = 0;
    for (int i = 0; i < n; i++) {
        int sum = 0;
        for (int j = i; j < n; j++) {
            sum += a[j];
            if (sum > best) { best = sum; bs = i; be = j; }
        }
    }
    return java.util.Arrays.copyOfRange(a, bs, be + 1);
}
```

**Time:** O(n²) · **Space:** O(1)

## Optimal — Kadane with index tracking

```java
int[] maxSubArray(int[] a) {
    int n = a.length, sum = 0, best = Integer.MIN_VALUE;
    int start = 0, bs = 0, be = 0;
    for (int i = 0; i < n; i++) {
        if (sum == 0) start = i;   // begin a fresh run
        sum += a[i];
        if (sum > best) { best = sum; bs = start; be = i; }
        if (sum < 0) sum = 0;      // reset
    }
    return java.util.Arrays.copyOfRange(a, bs, be + 1);
}
```

**Time:** O(n) · **Space:** O(1)

## Dry run

```text
a = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
i=0 sum=-2 -> best=-2 [0,0], reset sum=0
i=1 start=1 sum=1  -> best=1  [1,1]
i=2 sum=-2 (>best? no), reset sum=0
i=3 start=3 sum=4  -> best=4  [3,3]
i=4 sum=3
i=5 sum=5  -> best=5  [3,5]
i=6 sum=6  -> best=6  [3,6]  <-- answer [4,-1,2,1]
```

## Key points

- Record `start` only when `sum == 0` (start of a new candidate run).
- Update `[bs, be]` **before** resetting so an all-negative array still returns its single largest element.
- Reset happens after comparison, never before.
- O(n) single pass; the index bookkeeping adds no extra asymptotic cost.
