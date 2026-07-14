## Problem

Given a **sorted** array `a[]` and a target `x`, return the **lower bound**: the index of the first element that is `>= x`. If no such element exists, return `n` (the array length).

## Intuition

Lower bound is the leftmost position where `x` could be inserted while keeping the array sorted. Because the array is sorted, the predicate "`a[mid] >= x`" is **monotonic** (false...false, true...true), so binary search finds the first `true`.

## Brute force — linear scan

```java
int lowerBound(int[] a, int x) {
    for (int i = 0; i < a.length; i++)
        if (a[i] >= x) return i;
    return a.length;
}
```

**Time:** O(n) · **Space:** O(1)

## Optimal — binary search

Keep a candidate `ans = n`. Whenever `a[mid] >= x`, record `mid` and search the left half for something even earlier; otherwise go right.

```java
int lowerBound(int[] a, int x) {
    int low = 0, high = a.length - 1, ans = a.length;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (a[mid] >= x) {   // a[mid] could be the answer
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
a = [1, 2, 4, 4, 6],  x = 4   (want first index with a[i] >= 4)
low=0 high=4 mid=2 a=4>=4 ans=2 high=1
low=0 high=1 mid=0 a=1<4  low=1
low=1 high=1 mid=1 a=2<4  low=2
low>high -> answer index 2
```

## Comparison

| Concept | Condition | Returns |
|---------|-----------|---------|
| lower_bound | first `a[i] >= x` | insert position of x (left) |
| upper_bound | first `a[i] > x` | insert position of x (right) |

## Key points

- Return value ranges in `[0, n]`; `n` means all elements are `< x`.
- Use `mid = low + (high - low) / 2` to avoid integer overflow.
- Equivalent to C++ `std::lower_bound(a, a+n, x) - a` and Java `Arrays`-style search; foundation for count/floor/ceil queries.
