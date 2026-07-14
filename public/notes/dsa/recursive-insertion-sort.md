## Problem

Sort an array in ascending order using **Insertion Sort written recursively** rather than with the standard outer loop.

## Intuition

Insertion sort builds a sorted prefix one element at a time: assuming `[0..i-1]` is already sorted, we **insert element `i` into its correct spot** within that prefix. The recursive view is: "first sort the first `i` elements, then insert element `i`." Recursion handles the outer index; an inner loop (or nested recursion) shifts elements to make room.

## Approach — Recurse on the prefix length

- Base case: a prefix of size `i = 0` or `1` is already sorted.
- Recursively sort `[0..i-1]` first.
- Then insert `a[i]` into the sorted prefix by shifting larger elements one step right.

```java
class Solution {
    static void insertionSort(int[] a, int i, int n) {
        if (i == n) return;               // whole array processed

        int key = a[i], j = i - 1;
        while (j >= 0 && a[j] > key) {     // shift bigger elements right
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;                   // place key in its slot

        insertionSort(a, i + 1, n);       // recurse on next element
    }
    // initial call: insertionSort(arr, 1, arr.length);
}
```

**Time:** O(n^2) worst/avg, O(n) best (already sorted) · **Space:** O(n) recursion stack

## Dry Run

```text
[3, 1, 2]  start i=1
 i=1 key=1: 3>1 shift -> [3,3,2] place -> [1,3,2]
 i=2 key=2: 3>2 shift -> [1,3,3] then 1<2 stop, place -> [1,2,3]
 i=3 == n -> return
result -> [1, 2, 3]
```

## Key points

- Only the **outer loop over `i` becomes recursion**; the inner shifting stays a loop.
- **Best case `O(n)`**: when already sorted, the inner `while` never shifts — great for nearly-sorted data.
- **Stable** and **in-place** (`O(1)` data), with `O(n)` recursion-stack space.
- Efficient for small `n`; hybrid sorts (e.g. TimSort, IntroSort) switch to insertion sort for tiny subarrays.
