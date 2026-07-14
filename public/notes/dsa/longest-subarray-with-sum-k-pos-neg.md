## Problem

Given an array `nums` that may contain **positive, negative, and zero** values, and a target `k`, return the length of the **longest contiguous subarray** summing to exactly `k`.

- Example: `nums = [-1, 1, 1, -1, 2, 3], k = 3` → longest is `[-1, 1, 1, -1, 2, 3]`? sum = 5, no. `[1, 1, -1, 2]` sums to 3 → length **4**.

## Intuition

With negatives, the running sum is **not monotonic**, so the sliding window breaks (shrinking the window might be exactly wrong). Instead use **prefix sums**: if `prefixSum[j] - prefixSum[i] = k`, then the subarray `(i, j]` sums to `k`. Rearranged: we need an earlier prefix equal to `prefix - k`. Store the **earliest** index of each prefix sum so the resulting subarray is as long as possible.

## Brute force — check all subarrays

Fix a start, extend the end, accumulate the sum.

```java
int longestBrute(int[] nums, int k) {
    int best = 0;
    for (int i = 0; i < nums.length; i++) {
        long sum = 0;
        for (int j = i; j < nums.length; j++) {
            sum += nums[j];
            if (sum == k) best = Math.max(best, j - i + 1);
        }
    }
    return best;
}
```

**Time:** O(n^2) · **Space:** O(1)

## Optimal — prefix sum + hash map

Track `sum` while iterating. If `sum == k`, the whole prefix qualifies. If `sum - k` was seen before, use its earliest index. Store each prefix sum **only the first time** (earliest index → longest subarray).

```java
int longestOptimal(int[] nums, int k) {
    Map<Long,Integer> firstIdx = new HashMap<>();
    long sum = 0; int best = 0;
    for (int i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (sum == k) best = i + 1;
        Long need = sum - k;
        if (firstIdx.containsKey(need))
            best = Math.max(best, i - firstIdx.get(need));
        firstIdx.putIfAbsent(sum, i);   // keep earliest only
    }
    return best;
}
```

**Time:** O(n) · **Space:** O(n)

```text
nums = [1, 1, -1, 2], k = 3
i=0 sum=1  store {1:0}
i=1 sum=2  store {2:1}
i=2 sum=1  already stored (keep earliest)
i=3 sum=3  == k -> best = 4  (whole array)
```

## Key points

- **Sliding window fails** with negatives — use prefix sum + hash map.
- Use `putIfAbsent` so only the **earliest** index of each prefix is kept.
- Handle the `sum == k` case (subarray starts at index 0) explicitly, or seed the map with `{0: -1}`.
- Same technique counts subarrays summing to `k` (store frequencies instead of first index).
