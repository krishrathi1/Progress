## Problem

Given an integer array `nums`, find the contiguous subarray (at least one element) that has the **largest product**, and return that product (LeetCode 152).

## Intuition

Unlike max-sum, negatives flip everything: two negatives make a positive, so the smallest (most negative) running product can suddenly become the largest. So we track **both** the current maximum and minimum product ending at each index. A zero resets both.

## Brute force — all subarrays

```java
int maxProduct(int[] nums) {
    int best = Integer.MIN_VALUE;
    for (int i = 0; i < nums.length; i++) {
        int prod = 1;
        for (int j = i; j < nums.length; j++) {
            prod *= nums[j];
            best = Math.max(best, prod);
        }
    }
    return best;
}
```

**Time:** O(n^2) · **Space:** O(1)

## Optimal — track max and min (Kadane variant)

At each element, the new max/min is chosen from: the number alone, number * prevMax, or number * prevMin. Swap max/min when the number is negative.

```java
int maxProduct(int[] nums) {
    int max = nums[0], min = nums[0], ans = nums[0];
    for (int i = 1; i < nums.length; i++) {
        int n = nums[i];
        if (n < 0) { int t = max; max = min; min = t; }
        max = Math.max(n, max * n);
        min = Math.min(n, min * n);
        ans = Math.max(ans, max);
    }
    return ans;
}
```

**Time:** O(n) · **Space:** O(1)

## Optimal — prefix / suffix products

A zero-free run's max product is at one of its ends. Sweep prefix and suffix products, resetting to 1 after a zero.

```java
int maxProduct(int[] nums) {
    int n = nums.length, pre = 1, suf = 1, ans = Integer.MIN_VALUE;
    for (int i = 0; i < n; i++) {
        if (pre == 0) pre = 1;
        if (suf == 0) suf = 1;
        pre *= nums[i];
        suf *= nums[n - 1 - i];
        ans = Math.max(ans, Math.max(pre, suf));
    }
    return ans;
}
```

**Time:** O(n) · **Space:** O(1)

```text
nums = [2, 3, -2, 4]
i=0 max=2  min=2  ans=2
i=1 max=6  min=3  ans=6
i=2 (-2, swap) max=-2 min=-12 ans=6
i=3 max=4  min=-48 ans=6   -> answer 6  (subarray [2,3])
```

## Key points

- Track min too — a negative times the min can become the new max.
- On a negative number, swap max and min *before* multiplying.
- Zeros break the array into independent segments; both methods handle them naturally.
