## Overview

Java provides built-in support for **sorting** and **searching** arrays through `java.util.Arrays`, plus manual algorithms you should understand for interviews. Sorting arranges elements in order; searching locates a target element.

## Sorting Arrays

```java
int[] a = {5, 2, 8, 1, 9};
Arrays.sort(a);                 // ascending: [1, 2, 5, 8, 9]
Arrays.sort(a, 1, 4);           // sort sub-range [1,4): partial

// Descending needs Integer[] (Comparator not allowed on primitives)
Integer[] b = {5, 2, 8, 1};
Arrays.sort(b, Collections.reverseOrder());  // [8, 5, 2, 1]

// Custom order for objects
Student[] s = ...;
Arrays.sort(s, (x, y) -> x.marks - y.marks);
```

- Primitives: **dual-pivot quicksort**, average O(n log n).
- Objects: **TimSort** (stable merge sort), O(n log n) worst case.

## Searching Arrays

### Linear Search — O(n), works on any array

```java
int linear(int[] a, int key) {
    for (int i = 0; i < a.length; i++)
        if (a[i] == key) return i;
    return -1;
}
```

### Binary Search — O(log n), array MUST be sorted

```java
int[] a = {1, 2, 5, 8, 9};
int idx = Arrays.binarySearch(a, 8);   // 3
```

```text
Manual binary search on [1, 2, 5, 8, 9], key = 8
lo=0 hi=4 mid=2 -> a[2]=5 < 8 -> lo=3
lo=3 hi=4 mid=3 -> a[3]=8 == 8 -> found at index 3
```

```java
int binary(int[] a, int key) {
    int lo = 0, hi = a.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;   // avoids overflow
        if (a[mid] == key) return mid;
        else if (a[mid] < key) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
```

## Comparison

| Method | Precondition | Time | Space |
|--------|--------------|------|-------|
| Linear search | none | O(n) | O(1) |
| Binary search | sorted | O(log n) | O(1) |
| `Arrays.sort` (primitive) | none | O(n log n) | O(log n) |
| `Arrays.sort` (object, TimSort) | none | O(n log n) | O(n) |

## Key points

- `Arrays.binarySearch` gives an undefined result if the array is not sorted.
- Use `lo + (hi - lo) / 2` for mid to avoid integer overflow.
- Primitive arrays cannot take a `Comparator`; box to `Integer[]` for custom/descending order.
- Object sort (TimSort) is **stable**; primitive quicksort is not stable (but stability is irrelevant for primitives).
- A negative return from `binarySearch` is `-(insertionPoint) - 1`.
