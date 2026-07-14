## Problem

Sort an array of `n` integers in ascending order using **Merge Sort**, a divide-and-conquer sorting algorithm that guarantees `O(n log n)` time in all cases.

## Intuition

Merge Sort works on a simple idea: a single element is already sorted. So we keep **dividing** the array into halves until each subarray has one element, then **merge** the sorted halves back together in order. The heavy lifting happens in the merge step, where two already-sorted arrays are combined by comparing their front elements.

## Approach — Divide and Conquer

- **Divide:** find `mid = low + (high - low) / 2`, recursively sort `[low..mid]` and `[mid+1..high]`.
- **Conquer (merge):** use two pointers over the two sorted halves, always picking the smaller front element into a temporary array.
- Copy the merged temp array back into the original range.

```java
class Solution {
    static void merge(int[] a, int low, int mid, int high) {
        int[] temp = new int[high - low + 1];
        int left = low, right = mid + 1, k = 0;
        while (left <= mid && right <= high) {
            if (a[left] <= a[right]) temp[k++] = a[left++];
            else temp[k++] = a[right++];
        }
        while (left <= mid)  temp[k++] = a[left++];
        while (right <= high) temp[k++] = a[right++];
        for (int i = 0; i < temp.length; i++) a[low + i] = temp[i];
    }

    static void mergeSort(int[] a, int low, int high) {
        if (low >= high) return;          // one element: sorted
        int mid = low + (high - low) / 2;
        mergeSort(a, low, mid);
        mergeSort(a, mid + 1, high);
        merge(a, low, mid, high);
    }
}
```

**Time:** O(n log n) · **Space:** O(n)

## Dry Run

```text
[3, 1, 2]
  divide -> [3] | [1, 2]
                    divide -> [1] | [2]
                    merge  -> [1, 2]
  merge [3] + [1,2]:
    3 vs 1 -> 1 | 3 vs 2 -> 2 | left [3] -> 3
  result -> [1, 2, 3]
```

## Key points

- **Time:** `O(n log n)` best, average and worst — `log n` levels of division, `O(n)` merge work per level.
- **Space:** `O(n)` for the temp array (plus `O(log n)` recursion stack).
- **Stable** sort (uses `<=` in merge, keeping equal elements' order).
- **Not in-place** due to the auxiliary array; preferred for linked lists and external sorting where random access is costly.
