## Problem

Given a **sorted** array of distinct integers `nums` and a target `x`, return the index where `x` is found. If `x` is not present, return the index where it **would be inserted** to keep the array sorted.

- Example: `nums = [1,3,5,6]`, `x = 4` → `2` (insert between 3 and 5).
- Example: `nums = [1,3,5,6]`, `x = 7` → `4` (append at end).

## Intuition

The answer is the count of elements `<= x` when found, otherwise the position of the **first element greater than or equal to `x`**. That is exactly the **lower bound**: the smallest index `i` such that `nums[i] >= x`. If every element is smaller, the lower bound is `n`, which is where `x` would be appended.

## Brute force — linear scan

Walk left to right and return the first index whose value is `>= x`.

```java
int searchInsert(int[] nums, int x) {
    for (int i = 0; i < nums.length; i++)
        if (nums[i] >= x) return i;
    return nums.length;
}
```

**Time:** O(n) · **Space:** O(1)

## Optimal — binary search (lower bound)

The array is sorted, so binary-search for the first index with `nums[mid] >= x`. Whenever `nums[mid] >= x`, record `mid` as a candidate and move left; otherwise move right.

```java
int searchInsert(int[] nums, int x) {
    int lo = 0, hi = nums.length - 1, ans = nums.length;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] >= x) {   // candidate, look for earlier one
            ans = mid;
            hi = mid - 1;
        } else {
            lo = mid + 1;
        }
    }
    return ans;
}
```

**Time:** O(log n) · **Space:** O(1)

```text
nums = [1,3,5,6], x = 4
lo hi mid nums[mid]  action
0  3   1    3(<4)    lo=2
2  3   2    5(>=4)   ans=2, hi=1
loop ends -> answer 2
```

## Key points

- Insert position == **lower bound** of `x`.
- Initialise `ans = n` so a target larger than all elements returns `n`.
- Use `mid = lo + (hi - lo)/2` to avoid integer overflow.
- Works identically whether or not `x` already exists (distinct elements).
