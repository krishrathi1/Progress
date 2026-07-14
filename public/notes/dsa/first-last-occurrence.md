## Problem

Given a **sorted** array `nums` (duplicates allowed) and a target `x`, return `[first, last]` — the indices of the **first** and **last** occurrence of `x`. Return `[-1, -1]` if `x` is absent.

- Example: `nums = [2,4,4,4,6,8]`, `x = 4` → `[1, 3]`.
- Example: `x = 5` → `[-1, -1]`.

## Intuition

Two boundary searches:

- **First occurrence** = **lower bound** of `x` (first index with `nums[i] >= x`), valid only if `nums[i] == x`.
- **Last occurrence** = **upper bound** of `x`, minus one. Upper bound is the first index with `nums[i] > x`; the element just before it is the last `x`.

## Brute force — linear scan

```java
int[] search(int[] a, int x) {
    int first = -1, last = -1;
    for (int i = 0; i < a.length; i++) {
        if (a[i] == x) { if (first == -1) first = i; last = i; }
    }
    return new int[]{first, last};
}
```

**Time:** O(n) · **Space:** O(1)

## Optimal — two binary searches

```java
int lowerBound(int[] a, int x) {          // first index a[i] >= x
    int lo = 0, hi = a.length - 1, ans = a.length;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] >= x) { ans = mid; hi = mid - 1; }
        else lo = mid + 1;
    }
    return ans;
}
int[] searchRange(int[] a, int x) {
    int first = lowerBound(a, x);
    if (first == a.length || a[first] != x) return new int[]{-1, -1};
    int last = lowerBound(a, x + 1) - 1;   // upperBound(x) - 1
    return new int[]{first, last};
}
```

**Time:** O(log n) · **Space:** O(1)

```text
a = [2,4,4,4,6,8], x = 4
lowerBound(4)   -> index 1   (first)
lowerBound(5)-1 -> 4 - 1 = 3 (last)
result [1,3]
```

## Key points

- `first == n` or `a[first] != x` ⇒ target absent ⇒ `[-1,-1]`.
- `upperBound(x) == lowerBound(x+1)` for integer arrays — handy trick.
- Both boundaries in O(log n); never scan after finding one match.
- Foundation for the "count occurrences" problem: `last - first + 1`.
