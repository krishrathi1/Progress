## Problem

Sort an array in ascending order using **Selection Sort**: repeatedly select the minimum from the unsorted portion and place it at the front.

## Intuition

The array is split into a sorted prefix and an unsorted suffix. In each round we find the smallest element of the suffix and swap it into the next sorted position. After `i` rounds, the first `i` elements are final.

## Approach: Select the Minimum (Standard)

```java
void selectionSort(int[] a) {
    int n = a.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[minIdx]) minIdx = j;
        }
        int tmp = a[i];         // swap min into position i
        a[i] = a[minIdx];
        a[minIdx] = tmp;
    }
}
```

**Time:** O(n^2) all cases · **Space:** O(1)

## Dry Run

```text
start: [64, 25, 12, 22, 11]

i=0  min of [64,25,12,22,11] = 11  -> [11, 25, 12, 22, 64]
i=1  min of [25,12,22,64]    = 12  -> [11, 12, 25, 22, 64]
i=2  min of [25,22,64]       = 22  -> [11, 12, 22, 25, 64]
i=3  min of [25,64]          = 25  -> [11, 12, 22, 25, 64]
sorted: [11, 12, 22, 25, 64]
```

## Comparison

| Property        | Selection Sort            |
|-----------------|---------------------------|
| Best / Avg / Worst time | O(n^2) / O(n^2) / O(n^2) |
| Space           | O(1) in-place             |
| Stable          | No (swaps can reorder equals) |
| Swaps           | O(n) — at most n-1        |
| Adaptive        | No                        |

## Key points

- Always does O(n^2) comparisons even on a sorted array — not adaptive.
- Makes the **fewest swaps** (at most n-1), useful when writes are expensive.
- Not stable by default because a long-range swap can jump a duplicate past another.
- Simple to reason about; in practice insertion sort or O(n log n) sorts are preferred.
