## Problem

Sort an array in ascending order using **Insertion Sort**: grow a sorted prefix by inserting each new element into its correct position among the already-sorted ones.

## Intuition

Like arranging playing cards in hand: pick the next card and slide it left past all larger cards until it fits. Elements `[0..i-1]` stay sorted; we insert `a[i]` into that region by shifting.

## Approach: Shift and Insert (Standard)

```java
void insertionSort(int[] a) {
    int n = a.length;
    for (int i = 1; i < n; i++) {
        int key = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > key) {   // shift larger elements right
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;                  // drop key into the gap
    }
}
```

**Time:** O(n) best (sorted), O(n^2) avg/worst · **Space:** O(1)

## Dry Run

```text
start: [9, 5, 1, 4, 3]   sorted-prefix shown in [ ]

i=1 key=5: [9] | 5   -> shift 9 -> [5, 9] 1 4 3
i=2 key=1: [5,9] | 1 -> shift 9,5 -> [1, 5, 9] 4 3
i=3 key=4: [1,5,9]|4 -> shift 9,5 -> [1, 4, 5, 9] 3
i=4 key=3: shift 9,5,4 -> [1, 3, 4, 5, 9]
sorted: [1, 3, 4, 5, 9]
```

## Comparison

| Property         | Insertion Sort                    |
|------------------|-----------------------------------|
| Best time        | O(n) on nearly-sorted input       |
| Avg / Worst time | O(n^2)                            |
| Space            | O(1) in-place                     |
| Stable           | Yes (uses strict `>` in shift)    |
| Adaptive         | Yes (fast on almost-sorted data)  |

## Key points

- Best-in-class among O(n^2) sorts for **small or nearly-sorted** arrays.
- Adaptive: only O(n) work when input is already ordered.
- Stable and in-place; often used as the base case inside quicksort/timsort.
- Shifts (not swaps) mean fewer writes than bubble sort on average.
