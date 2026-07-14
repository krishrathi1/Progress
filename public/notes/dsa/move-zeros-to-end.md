## Problem

Given an array `nums`, move all `0`s to the **end** while keeping the relative order of the non-zero elements. Do it **in-place**.

- Example: `[0, 1, 0, 3, 12]` → `[1, 3, 12, 0, 0]`.

## Intuition

We want the non-zero elements packed to the front in order, with zeros filling the tail. A single write pointer `j` tracks where the next non-zero should land. Everything after `j` becomes zero.

## Brute force — extra array

Collect non-zeros, then pad with zeros.

```java
void moveZeroes(int[] nums) {
    int n = nums.length;
    int[] temp = new int[n];
    int k = 0;
    for (int x : nums) if (x != 0) temp[k++] = x;
    for (int i = 0; i < n; i++) nums[i] = temp[i]; // rest already 0
}
```

**Time:** O(n) · **Space:** O(n)

## Optimal — two pointers with swap

`j` points to the first zero (the next write slot). When `i` finds a non-zero, swap it into position `j` and advance `j`.

```java
void moveZeroes(int[] nums) {
    int j = 0;
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            int t = nums[i]; nums[i] = nums[j]; nums[j] = t;
            j++;
        }
    }
}
```

**Time:** O(n) · **Space:** O(1)

```text
nums = [0, 1, 0, 3, 12]   j=0
i=0 nums[0]=0  skip
i=1 nums[1]=1  swap(1,0) -> [1,0,0,3,12] j=1
i=2 nums[2]=0  skip
i=3 nums[3]=3  swap(3,1) -> [1,3,0,0,12] j=2
i=4 nums[4]=12 swap(4,2) -> [1,3,12,0,0] j=3
```

## Key points

- `j` = index where the next non-zero must go = count of non-zeros seen.
- Swapping preserves the order of non-zero elements (stable).
- Single pass, O(1) extra space (LeetCode 283).
- If `i == j`, the swap is a harmless no-op.
