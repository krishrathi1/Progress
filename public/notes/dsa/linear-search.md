## Problem

Given an array `nums` and a target value `key`, return the **index of the first occurrence** of `key`, or `-1` if it is not present.

- Example: `nums = [4, 2, 7, 1, 9]`, `key = 7` → `2`. `key = 5` → `-1`.

## Intuition

With no assumptions about order, the only guaranteed way to know an element is absent is to inspect **every** element. Scan left to right and return as soon as you hit the target.

## Approach — sequential scan

```java
int linearSearch(int[] nums, int key) {
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] == key)
            return i;          // first match wins
    }
    return -1;                 // not found
}
```

**Time:** O(n) · **Space:** O(1)

```text
nums = [4, 2, 7, 1, 9], key = 7
i=0  4 == 7 ? no
i=1  2 == 7 ? no
i=2  7 == 7 ? YES -> return 2
```

## Complexity breakdown

| Case | When | Comparisons | Time |
|------|------|-------------|------|
| Best | key at index 0 | 1 | O(1) |
| Worst | key absent / at end | n | O(n) |
| Average | key in the middle | n/2 | O(n) |

## Linear vs Binary search

| | Linear search | Binary search |
|---|---|---|
| Array must be sorted | No | Yes |
| Time | O(n) | O(log n) |
| Extra work | None | Keep it sorted |
| Use when | Small / unsorted data | Large sorted data |

## Key points

- Works on **any** array — sorted or unsorted, any data type.
- Returning early on the first match gives the first occurrence.
- Simple and cache-friendly; fine for small `n`, but O(n) makes it a poor choice for large sorted datasets where binary search wins.
