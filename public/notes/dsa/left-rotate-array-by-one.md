## Problem

Given an array `nums`, rotate it **left by one position** in-place. Every element moves one slot to the left, and the first element wraps around to the end.

- Example: `[1, 2, 3, 4, 5]` → `[2, 3, 4, 5, 1]`.

## Intuition

Only one element is "displaced" — the first one. If we stash `nums[0]`, we can shift everything else one step left, then drop the saved value into the last slot. No extra array needed.

## Brute force — extra array

```java
void rotateLeftByOne(int[] nums) {
    int n = nums.length;
    int[] temp = new int[n];
    for (int i = 0; i < n; i++)
        temp[i] = nums[(i + 1) % n];
    for (int i = 0; i < n; i++)
        nums[i] = temp[i];
}
```

**Time:** O(n) · **Space:** O(n)

## Optimal — save first, shift, place last

```java
void rotateLeftByOne(int[] nums) {
    int n = nums.length;
    int first = nums[0];
    for (int i = 1; i < n; i++)
        nums[i - 1] = nums[i];   // slide each element left
    nums[n - 1] = first;         // wrap the saved element around
}
```

**Time:** O(n) · **Space:** O(1)

```text
nums = [1, 2, 3, 4, 5]     first = 1
shift: nums[0]=2, nums[1]=3, nums[2]=4, nums[3]=5
        -> [2, 3, 4, 5, 5]
place: nums[4] = first(1)
        -> [2, 3, 4, 5, 1]
```

## Key points

- Save `nums[0]` **before** overwriting it, or it's lost.
- Shifting runs from index 1 upward, writing to `i - 1`.
- Right rotate by one is the mirror: save `nums[n-1]`, shift right, place at index 0.
- Foundation for the general "rotate by D places" problem.
