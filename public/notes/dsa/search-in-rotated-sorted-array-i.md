## Problem

A sorted array of **distinct** integers is rotated at an unknown pivot (e.g. `[0,1,2,4,5,6,7]` → `[4,5,6,7,0,1,2]`). Given the rotated array `nums` and a target `x`, return its index, or `-1` if absent. Must run in **O(log n)**.

## Intuition

At any `mid`, **at least one half `[lo..mid]` or `[mid..hi]` is sorted** (because there is only one rotation point). Identify the sorted half, check whether `x` lies inside its range, and discard the other half. This preserves the O(log n) shape of binary search.

## Brute force — linear scan

```java
int search(int[] a, int x) {
    for (int i = 0; i < a.length; i++)
        if (a[i] == x) return i;
    return -1;
}
```

**Time:** O(n) · **Space:** O(1)

## Optimal — modified binary search

```java
int search(int[] a, int x) {
    int lo = 0, hi = a.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] == x) return mid;
        if (a[lo] <= a[mid]) {                 // left half sorted
            if (a[lo] <= x && x < a[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else {                               // right half sorted
            if (a[mid] < x && x <= a[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}
```

**Time:** O(log n) · **Space:** O(1)

```text
a = [4,5,6,7,0,1,2], x = 0
lo hi mid a[mid]  sorted half   decision
0  6  3   7       left [4..7]   0 not in [4,7) -> lo=4
4  6  5   1       left [0..1]   0 in [0,1)     -> hi=4
4  4  4   0       found -> 4
```

## Key points

- Use `a[lo] <= a[mid]` (with `=`) so a two-element window is handled correctly.
- Exactly one half is always sorted; test `x` against that half's inclusive bounds.
- Works because elements are **distinct** — duplicates break the `a[lo] <= a[mid]` test (see version II).
- Still one comparison per level ⇒ O(log n).
