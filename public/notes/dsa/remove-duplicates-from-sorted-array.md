## Problem

Given a **sorted** integer array `nums`, remove the duplicates **in-place** so that each unique element appears only once. The relative order must be preserved. Return `k`, the number of unique elements; the first `k` slots of `nums` must hold those unique values.

- Example: `nums = [1, 1, 2, 2, 2, 3]` → `k = 3`, `nums = [1, 2, 3, _, _, _]`.

## Intuition

Because the array is sorted, **all duplicates of a value are adjacent**. So an element is "new" only when it differs from the last element we already kept. That single comparison lets us do the whole job with two pointers and no extra memory.

## Brute force — use a Set

Insert every element into an ordered set, then copy it back.

```java
int removeDuplicates(int[] nums) {
    TreeSet<Integer> set = new TreeSet<>();
    for (int x : nums) set.add(x);
    int i = 0;
    for (int x : set) nums[i++] = x;
    return set.size();
}
```

**Time:** O(n log n) · **Space:** O(n)

## Optimal — two pointers

Pointer `i` marks the last unique element's index. Scan `j` forward; whenever `nums[j] != nums[i]`, we found a new unique value, so advance `i` and copy it.

```java
int removeDuplicates(int[] nums) {
    int i = 0;
    for (int j = 1; j < nums.length; j++) {
        if (nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;          // count = last index + 1
}
```

**Time:** O(n) · **Space:** O(1)

```text
nums = [1, 1, 2, 3, 3]
i=0 j=1  1==1 skip
i=0 j=2  2!=1 -> i=1, nums=[1,2,2,3,3]
i=1 j=3  3!=2 -> i=2, nums=[1,2,3,3,3]
i=2 j=4  3==3 skip
return i+1 = 3   -> unique prefix [1,2,3]
```

## Key points

- Works only because the array is **sorted**; duplicates are contiguous.
- `i` is both the write cursor and the index of the last kept element.
- Return value is `i + 1`, not `i`.
- In-place, O(1) extra space — the classic LeetCode 26.
