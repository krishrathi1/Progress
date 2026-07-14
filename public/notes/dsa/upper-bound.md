## Problem

Given a **sorted** array `a[]` and a target `x`, return the **upper bound**: the index of the first element that is **strictly greater** than `x` (`> x`). If no such element exists, return `n` (the array length).

## Intuition

Upper bound is the position just past the last occurrence of `x` — the rightmost spot where `x` could be inserted while keeping the array sorted. The predicate "`a[mid] > x`" is monotonic, so binary search finds the first `true`.

## Brute force — linear scan

```java
int upperBound(int[] a, int x) {
    for (int i = 0; i < a.length; i++)
        if (a[i] > x) return i;
    return a.length;
}
```

**Time:** O(n) · **Space:** O(1)

## Optimal — binary search

Keep `ans = n`. When `a[mid] > x`, this index is a candidate; record it and keep searching left for an even earlier one. Otherwise search right.

```java
int upperBound(int[] a, int x) {
    int low = 0, high = a.length - 1, ans = a.length;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (a[mid] > x) {    // strictly greater -> candidate
            ans = mid;
            high = mid - 1;  // look for an earlier one
        } else {
            low = mid + 1;
        }
    }
    return ans;
}
```

**Time:** O(log n) · **Space:** O(1)

```text
a = [1, 2, 4, 4, 6],  x = 4   (want first index with a[i] > 4)
low=0 high=4 mid=2 a=4 not>4 low=3
low=3 high=4 mid=3 a=4 not>4 low=4
low=4 high=4 mid=4 a=6>4 ans=4 high=3
low>high -> answer index 4  (points to 6)
```

## Comparison

| Query | Formula |
|-------|---------|
| count of x | upperBound(x) - lowerBound(x) |
| last index of x | upperBound(x) - 1 (if x present) |
| first index > x | upperBound(x) |

## Key points

- Only difference from lower bound: the comparison is `>` (strict) instead of `>=`.
- Returns `n` when every element is `<= x`.
- `upperBound - lowerBound` gives the frequency of `x` in O(log n); the pair underpins floor/ceil and range-count problems.
