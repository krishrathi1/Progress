## Problem

Sort an array in ascending order using **Bubble Sort implemented recursively** instead of with the usual nested loops.

## Intuition

In one full pass of bubble sort, the **largest unsorted element "bubbles" to its correct position at the end**. So after fixing the last element, the same job remains for the first `n-1` elements — a naturally recursive structure. We replace the outer loop with recursion: each call performs one pass and then recurses on a shrunk array.

## Approach — Recurse on the outer pass

- Base case: if the size to sort (`n`) is `1` or `0`, the array is sorted — return.
- Do **one inner pass**: for `j` from `0` to `n-2`, swap adjacent elements if out of order. This places the max of the first `n` elements at index `n-1`.
- Recurse with `n - 1`.

```java
class Solution {
    static void bubbleSort(int[] a, int n) {
        if (n == 1) return;               // base case: single element sorted

        boolean swapped = false;
        for (int j = 0; j <= n - 2; j++) {
            if (a[j] > a[j + 1]) {
                int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
                swapped = true;
            }
        }
        if (!swapped) return;             // already sorted, early exit
        bubbleSort(a, n - 1);             // fix the rest
    }
    // initial call: bubbleSort(arr, arr.length);
}
```

**Time:** O(n^2) worst/avg, O(n) best (already sorted) · **Space:** O(n) recursion stack

## Dry Run

```text
[4, 3, 2]  n=3
 pass: 4>3 swap -> [3,4,2] | 4>2 swap -> [3,2,4]   (4 fixed at end)
[3, 2, 4]  n=2
 pass: 3>2 swap -> [2,3,4]                          (3 fixed)
[2, 3, 4]  n=1 -> return
result -> [2, 3, 4]
```

## Key points

- Logic is identical to iterative bubble sort; only the **outer loop becomes recursion**.
- The `swapped` flag gives the `O(n)` best case and can short-circuit the recursion.
- **Stable** and **in-place** (`O(1)` extra data), but uses `O(n)` stack depth from recursion.
- Mainly an academic exercise to practice converting iteration to recursion; real code prefers the iterative form.
