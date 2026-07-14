## Problem

Sort an array in ascending order using **Bubble Sort**: repeatedly swap adjacent out-of-order elements so the largest "bubbles" to the end each pass.

## Intuition

In one pass we compare each adjacent pair and swap if they are out of order. After the first pass the largest element sits at the end; after `k` passes the last `k` elements are sorted. An early-exit flag makes it adaptive.

## Approach: Adjacent Swaps with Early Exit (Optimal Form)

```java
void bubbleSort(int[] a) {
    int n = a.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {   // last i already sorted
            if (a[j] > a[j + 1]) {
                int tmp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = tmp;
                swapped = true;
            }
        }
        if (!swapped) break;   // already sorted -> stop early
    }
}
```

**Time:** O(n) best (sorted), O(n^2) avg/worst · **Space:** O(1)

## Dry Run

```text
start: [5, 1, 4, 2, 8]

pass 1: (5>1)swap ->1,5,4,2,8 ; (5>4)swap ->1,4,5,2,8 ;
        (5>2)swap ->1,4,2,5,8 ; (5<8)ok   -> [1,4,2,5,8]  8 fixed
pass 2: (1<4)ok ; (4>2)swap ->1,2,4,5,8 ; (4<5)ok        -> [1,2,4,5,8]  5 fixed
pass 3: no swaps -> swapped=false -> early exit
sorted: [1, 2, 4, 5, 8]
```

## Comparison

| Property         | Bubble Sort                       |
|------------------|-----------------------------------|
| Best time        | O(n) with swapped flag            |
| Avg / Worst time | O(n^2)                            |
| Space            | O(1) in-place                     |
| Stable           | Yes (only swaps strict `>`)       |
| Adaptive         | Yes (early exit on sorted input)  |

## Key points

- The `swapped` flag gives O(n) on already-sorted data — the key optimization.
- Inner loop shrinks by `i` each pass since the tail is already sorted.
- Stable: equal elements never swap, preserving original order.
- Mainly educational; still O(n^2) on average, so unused for large real data.
