## Problem

Given two sorted arrays `a` (size `m`) and `b` (size `n`), return the **median** of the combined sorted array. Target complexity is `O(log(min(m, n)))`.

- If total length `m + n` is **odd**, the median is the middle element.
- If **even**, it is the average of the two middle elements.

## Intuition

The median splits the merged array into a **left half** and **right half** of equal size, where every left element ≤ every right element. We don't need to build the merged array — we only need a valid partition.

Pick `cut1` elements from `a` for the left half; then `cut2 = leftHalfSize - cut1` come from `b`. A partition is valid when:

```
l1 = a[cut1-1], r1 = a[cut1]
l2 = b[cut2-1], r2 = b[cut2]
valid when l1 <= r2 AND l2 <= r1
```

Binary search `cut1` over the **smaller** array to keep it `O(log(min(m,n)))`.

## Brute force — merge

Merge both arrays and index the middle. Simple but not log time.

```java
double bruteMedian(int[] a, int[] b) {
    int[] c = new int[a.length + b.length];
    int i = 0, j = 0, k = 0;
    while (i < a.length && j < b.length)
        c[k++] = (a[i] <= b[j]) ? a[i++] : b[j++];
    while (i < a.length) c[k++] = a[i++];
    while (j < b.length) c[k++] = b[j++];
    int n = c.length;
    return (n % 2 == 1) ? c[n/2]
                        : (c[n/2 - 1] + c[n/2]) / 2.0;
}
```

**Time:** O(m + n) · **Space:** O(m + n)

## Optimal — binary search on partition

```java
double findMedian(int[] a, int[] b) {
    if (a.length > b.length) return findMedian(b, a); // a is smaller
    int m = a.length, n = b.length, total = m + n;
    int left = (total + 1) / 2;          // size of left half
    int lo = 0, hi = m;
    while (lo <= hi) {
        int cut1 = (lo + hi) / 2, cut2 = left - cut1;
        int l1 = (cut1 == 0) ? Integer.MIN_VALUE : a[cut1 - 1];
        int r1 = (cut1 == m) ? Integer.MAX_VALUE : a[cut1];
        int l2 = (cut2 == 0) ? Integer.MIN_VALUE : b[cut2 - 1];
        int r2 = (cut2 == n) ? Integer.MAX_VALUE : b[cut2];
        if (l1 <= r2 && l2 <= r1) {
            if (total % 2 == 1) return Math.max(l1, l2);
            return (Math.max(l1, l2) + Math.min(r1, r2)) / 2.0;
        } else if (l1 > r2) hi = cut1 - 1; // took too many from a
        else lo = cut1 + 1;                // took too few from a
    }
    return 0.0;
}
```

**Time:** O(log(min(m, n))) · **Space:** O(1)

```text
a = [1,3,8], b = [7,9,10,11], total=7, left=4
cut1=1 -> cut2=3 : l1=1,r1=3 | l2=10,r2=11 -> l2(10)>r1(3) -> lo=2
cut1=2 -> cut2=2 : l1=3,r1=8 | l2=9,r2=10 -> l2(9)>r1(8) -> lo=3
cut1=3 -> cut2=1 : l1=8,r1=INF | l2=7,r2=9 -> valid
odd -> median = max(l1,l2) = max(8,7) = 8
```

## Key points

- Always binary search over the **smaller** array to bound the log factor.
- Use `+/- INFINITY` sentinels for empty partition edges — avoids messy boundary checks.
- Left-half size `= (m+n+1)/2` works for both odd and even totals.
- Odd → `max(l1, l2)`; even → average of `max(l1,l2)` and `min(r1,r2)`.
