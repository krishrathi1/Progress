## Problem

Sort an array of `n` integers in ascending order using **Quick Sort**, an in-place divide-and-conquer algorithm built around a *partition* step.

## Intuition

Pick one element as a **pivot** and rearrange the array so that everything smaller sits to its left and everything larger to its right. After this **partition**, the pivot is in its final sorted position. Recursively apply the same to the left and right sides. Unlike merge sort, the sorting work happens *before* recursion (in partition), and no extra array is needed.

## Approach — Partition around a pivot (Lomuto-style, first element)

- Choose pivot = `a[low]`.
- Move a pointer `i` from the left seeking elements `> pivot`, and `j` from the right seeking elements `<= pivot`; swap them while `i < j`.
- Finally swap the pivot into position `j`; return `j` as the partition index.

```java
class Solution {
    static int partition(int[] a, int low, int high) {
        int pivot = a[low], i = low, j = high;
        while (i < j) {
            while (a[i] <= pivot && i <= high - 1) i++;
            while (a[j] >  pivot && j >= low + 1)  j--;
            if (i < j) swap(a, i, j);
        }
        swap(a, low, j);                  // pivot to its final place
        return j;
    }

    static void quickSort(int[] a, int low, int high) {
        if (low >= high) return;
        int p = partition(a, low, high);
        quickSort(a, low, p - 1);         // left of pivot
        quickSort(a, p + 1, high);        // right of pivot
    }

    static void swap(int[] a, int i, int j) { int t = a[i]; a[i] = a[j]; a[j] = t; }
}
```

**Time:** O(n log n) average, O(n^2) worst · **Space:** O(log n) avg recursion stack

## Dry Run

```text
[4, 2, 6, 1]  pivot=4 (low)
 i finds 6(>4), j finds 1(<=4) -> swap -> [4, 2, 1, 6]
 i passes 6, j lands on 1 -> i>=j stop; swap pivot with a[j=2] -> [1, 2, 4, 6]
 partition index = 2 (4 is fixed)
 recurse [1,2] and [6] -> already sorted
result -> [1, 2, 4, 6]
```

## Key points

- **Worst case `O(n^2)`** occurs on already-sorted input with a first/last-element pivot. Mitigate with a **random or median-of-three pivot**.
- **In-place**: `O(1)` extra data, only `O(log n)` average stack (`O(n)` worst).
- **Not stable** (partition swaps can reorder equal elements).
- Usually faster than merge sort in practice due to good cache locality and no extra array; it is the basis of many library `sort()` implementations (IntroSort).
