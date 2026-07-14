## Problem

Given two sorted arrays `a` (size `n`) and `b` (size `m`), rearrange them **in place** so that `a` holds the smallest `n` elements and `b` holds the largest `m`, both sorted — using **O(1) extra space**.

## Intuition

The only cross-array disorder is when some element at the **end of `a`** is larger than some element at the **start of `b`**. If we swap those out-of-order pairs and then sort each array, both become globally sorted. The **Gap method (Shell-sort style)** does this without a final sort.

## Brute Force — Merge with Extra Array

Standard two-pointer merge into a temp array of size `n+m`, then copy back.

**Time:** O(n + m) · **Space:** O(n + m) — violates the no-extra-space constraint.

## Better — Swap-and-Sort

Point `i` at the last of `a`, `j` at the first of `b`. While `a[i] > b[j]`, swap them and move inward. Then sort both arrays.

```java
void merge(int[] a, int[] b) {
    int i = a.length - 1, j = 0;
    while (i >= 0 && j < b.length && a[i] > b[j]) {
        int t = a[i]; a[i] = b[j]; b[j] = t;
        i--; j++;
    }
    Arrays.sort(a);
    Arrays.sort(b);
}
```

**Time:** O(n log n + m log m) · **Space:** O(1)

## Optimal — Gap Method

Use a shrinking gap. Compare elements `gap` apart across the conceptual combined array; swap if out of order. Gap starts at `ceil((n+m)/2)` and halves each round.

```java
void merge(int[] a, int[] b) {
    int n = a.length, m = b.length, len = n + m;
    int gap = (len + 1) / 2;
    while (gap > 0) {
        int l = 0, r = gap;
        while (r < len) {
            int left  = (l < n) ? a[l] : b[l - n];
            int right = (r < n) ? a[r] : b[r - n];
            if (left > right) {                // swap using virtual indices
                if (l < n && r < n)       { int t=a[l]; a[l]=a[r]; a[r]=t; }
                else if (l < n)           { int t=a[l]; a[l]=b[r-n]; b[r-n]=t; }
                else                      { int t=b[l-n]; b[l-n]=b[r-n]; b[r-n]=t; }
            }
            l++; r++;
        }
        gap = (gap == 1) ? 0 : (gap + 1) / 2;
    }
}
```

**Time:** O((n+m) log(n+m)) · **Space:** O(1)

```text
a=[1,4,7,8,10]  b=[2,3,9]   len=8  gap=4
compare pairs 4 apart across virtual [1,4,7,8,10,2,3,9]:
  (1,10)(4,2->swap)(7,3->swap)(8,9)  -> a=[1,2,3,8,10] b=[4,7,9]
gap=2, then 1 -> fully sorted: a=[1,2,3,4,7] b=[8,9,10]
```

## Key points

- Gap method treats `a` and `b` as one **virtual array** of length `n+m`; index `k` maps to `a[k]` if `k<n` else `b[k-n]`.
- Gap sequence: `gap = ceil(gap/2)`, stop after processing `gap == 1`.
- Swap-and-sort is simpler to code and fine for interviews unless strict O(1) space with no `sort` is required.
