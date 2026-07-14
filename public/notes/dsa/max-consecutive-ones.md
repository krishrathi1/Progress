## Problem

Given a binary array `nums` (only `0`s and `1`s), return the maximum number of consecutive `1`s.

- Example: `nums = [1, 1, 0, 1, 1, 1]` → **3**.
- Example: `nums = [1, 0, 1, 1, 0, 1]` → **2**.

## Intuition

Walk through the array keeping a running count of the current streak of `1`s. Every time we hit a `0`, the streak breaks and resets to `0`. Track the largest streak seen so far.

## Optimal — single pass counter

Maintain `count` (current run) and `maxCount` (best run). On a `1`, increment `count` and update `maxCount`; on a `0`, reset `count` to `0`.

```java
int findMaxConsecutiveOnes(int[] nums) {
    int count = 0, maxCount = 0;
    for (int x : nums) {
        if (x == 1) {
            count++;
            maxCount = Math.max(maxCount, count);
        } else {
            count = 0;   // streak broken
        }
    }
    return maxCount;
}
```

**Time:** O(n) · **Space:** O(1)

This is already optimal — every element must be inspected at least once, so O(n) is the lower bound, and we use only two integer variables.

```text
nums = [1, 1, 0, 1, 1, 1]
idx : val -> count / max
 0  :  1  ->   1  / 1
 1  :  1  ->   2  / 2
 2  :  0  ->   0  / 2   (reset)
 3  :  1  ->   1  / 2
 4  :  1  ->   2  / 2
 5  :  1  ->   3  / 3   <- answer
```

## Key points

- Reset `count` to `0` on every `0` — a common bug is forgetting the reset.
- Update `maxCount` only when incrementing (or after the loop); updating on reset is harmless but unnecessary.
- Single pass, constant space — no extra data structures needed.
- Related follow-up: **Max Consecutive Ones III** allows flipping up to `k` zeros, which requires a sliding-window approach instead.
