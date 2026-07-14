## Problem

Given two sorted arrays `a` (size `m`) and `b` (size `n`) and an integer `k` (1-indexed), return the **k-th smallest** element of the union of both arrays. Aim for `O(log(min(m, n)))`.

Example: `a = [2,3,6,7,9]`, `b = [1,4,8,10]`, `k = 5` → merged `[1,2,3,4,6,7,8,9,10]` → 5th = `6`.

## Intuition

This generalises the "median of two sorted arrays" partition idea. We want a partition placing exactly `k` elements in the **left half**. Take `cut1` from `a` and `cut2 = k - cut1` from `b`. A partition is valid when the largest left element ≤ smallest right element on both sides:

```
l1 = a[cut1-1], r1 = a[cut1]
l2 = b[cut2-1], r2 = b[cut2]
valid when l1 <= r2 AND l2 <= r1
```

Then the k-th element is `max(l1, l2)`. Binary search `cut1` on the smaller array, but constrain its range so `cut2` stays within `[0, n]`.

## Brute force — merge until k

Merge with two pointers and stop after `k` elements.

```java
int brute(int[] a, int[] b, int k) {
    int i = 0, j = 0, count = 0, ans = 0;
    while (i < a.length || j < b.length) {
        if (j >= b.length || (i < a.length && a[i] <= b[j])) ans = a[i++];
        else ans = b[j++];
        if (++count == k) return ans;
    }
    return ans;
}
```

**Time:** O(k) · **Space:** O(1)

## Optimal — binary search on partition

```java
int kthElement(int[] a, int[] b, int k) {
    if (a.length > b.length) return kthElement(b, a, k);
    int m = a.length, n = b.length;
    // cut1 must keep cut2 = k - cut1 within [0, n]
    int lo = Math.max(0, k - n), hi = Math.min(k, m);
    while (lo <= hi) {
        int cut1 = (lo + hi) / 2, cut2 = k - cut1;
        int l1 = (cut1 == 0) ? Integer.MIN_VALUE : a[cut1 - 1];
        int r1 = (cut1 == m) ? Integer.MAX_VALUE : a[cut1];
        int l2 = (cut2 == 0) ? Integer.MIN_VALUE : b[cut2 - 1];
        int r2 = (cut2 == n) ? Integer.MAX_VALUE : b[cut2];
        if (l1 <= r2 && l2 <= r1) return Math.max(l1, l2);
        else if (l1 > r2) hi = cut1 - 1;   // too many from a
        else lo = cut1 + 1;                // too few from a
    }
    return -1;
}
```

**Time:** O(log(min(m, n))) · **Space:** O(1)

```text
a = [2,3,6,7,9], b = [1,4,8,10], k = 5
lo = max(0,5-4)=1, hi = min(5,5)=5
cut1=3 -> cut2=2 : l1=6,r1=7 | l2=4,r2=8 -> 6<=8 && 4<=7 valid
answer = max(l1,l2) = max(6,4) = 6
```

## Key points

- Same partition trick as median; the k-th element is `max(l1, l2)`.
- Critical range fix: `lo = max(0, k - n)`, `hi = min(k, m)` so `cut2` never goes out of bounds.
- Sentinels `MIN/MAX_VALUE` cleanly handle empty-side edges.
- Median is just this with `k = (m+n+1)/2` (and averaging for even totals).
