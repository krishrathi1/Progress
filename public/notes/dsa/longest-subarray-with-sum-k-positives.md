## Problem

Given an array of **positive integers** `nums` and a target `k`, find the length of the **longest contiguous subarray** whose elements sum to exactly `k`.

- Example: `nums = [1, 2, 3, 1, 1, 1, 1], k = 3` → longest is `[1,1,1]` (from index 3) → length **3**. `[3]` also sums to 3 but is shorter; `[1,2]` too.

## Intuition

Because all numbers are **positive**, the running sum is strictly increasing as the window grows. This monotonicity lets a **two-pointer / sliding window** work: if the window sum exceeds `k`, shrinking from the left is guaranteed to reduce it — no need to reconsider those left elements later.

## Better — prefix sum + hash map

Store the earliest index where each prefix sum occurs. For each `i`, if `prefix - k` was seen, the subarray after it sums to `k`. This works even with zeros but uses O(n) space.

```java
int longestHash(int[] nums, int k) {
    Map<Long,Integer> firstIdx = new HashMap<>();
    long sum = 0; int best = 0;
    for (int i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (sum == k) best = i + 1;
        if (firstIdx.containsKey(sum - k))
            best = Math.max(best, i - firstIdx.get(sum - k));
        firstIdx.putIfAbsent(sum, i);
    }
    return best;
}
```

**Time:** O(n) · **Space:** O(n)

## Optimal — sliding window (positives only)

Expand `right`, adding to `sum`. While `sum > k`, shrink from `left`. When `sum == k`, record the window length.

```java
int longestWindow(int[] nums, int k) {
    int left = 0, best = 0;
    long sum = 0;
    for (int right = 0; right < nums.length; right++) {
        sum += nums[right];
        while (sum > k && left <= right) sum -= nums[left++];
        if (sum == k) best = Math.max(best, right - left + 1);
    }
    return best;
}
```

**Time:** O(n) (each index enters/leaves the window once) · **Space:** O(1)

```text
nums = [1,2,3,1,1,1,1], k=3
r=0 sum=1
r=1 sum=3  == k  len 2
r=2 sum=6  > k  shrink: -1 ->5, -2 ->3  window[2..2] len1
r=3 sum=4  > k  shrink -3 ->1  window[3..3]
r=4 sum=2
r=5 sum=3  == k  window[3..5] len 3  <- best
```

## Key points

- Sliding window is O(1) space but **only valid for non-negative** values.
- If zeros are present, the window still works; negatives break the monotonicity.
- The prefix-sum + hash map approach is the general solution — use it when negatives are allowed.
