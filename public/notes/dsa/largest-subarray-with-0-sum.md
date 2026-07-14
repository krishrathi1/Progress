## Problem

Given an array of integers (positive, negative, and zero), find the **length of the longest contiguous subarray** whose elements sum to `0`.

## Intuition

Track a running **prefix sum**. If the same prefix sum value appears at two indices `i` and `j` (with `i < j`), then the elements between them (`i+1 .. j`) sum to `0`. So we want the **earliest** occurrence of each prefix sum, and the largest gap to a later occurrence.

## Brute Force — All Subarrays

For every start `i`, extend `j` and track the running sum; record max length when sum hits 0.

```java
int maxLen(int[] a) {
    int n = a.length, best = 0;
    for (int i = 0; i < n; i++) {
        int sum = 0;
        for (int j = i; j < n; j++) {
            sum += a[j];
            if (sum == 0) best = Math.max(best, j - i + 1);
        }
    }
    return best;
}
```

**Time:** O(n^2) · **Space:** O(1)

## Optimal — Prefix Sum + HashMap

Store the **first index** at which each prefix sum occurs. A prefix sum of `0` at index `i` means the subarray `0..i` sums to zero (length `i+1`).

```java
int maxLen(int[] a) {
    Map<Integer, Integer> firstIdx = new HashMap<>();
    int sum = 0, best = 0;
    for (int i = 0; i < a.length; i++) {
        sum += a[i];
        if (sum == 0) {
            best = i + 1;                     // whole prefix sums to 0
        } else if (firstIdx.containsKey(sum)) {
            best = Math.max(best, i - firstIdx.get(sum));
        } else {
            firstIdx.put(sum, i);             // store FIRST occurrence only
        }
    }
    return best;
}
```

**Time:** O(n) · **Space:** O(n)

```text
a = [9, -3, 3, -3, ...]  index: 0  1  2  3
prefix:                          9  6  9  6
sum 9 seen at i=0, repeats i=2 -> len 2-0 = 2
sum 6 seen at i=1, repeats i=3 -> len 3-1 = 2
```

## Key points

- Only store the **first** index of a prefix sum — never overwrite — to maximize length.
- Handle prefix sum `== 0` as a special case giving length `i + 1`.
- Same prefix-sum idea powers "subarray sum equals K" (store `sum - K`) and XOR problems.
