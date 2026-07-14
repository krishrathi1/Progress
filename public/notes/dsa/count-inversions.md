## Problem

Given an array `a[]`, count the number of **inversions**: pairs `(i, j)` such that `i < j` and `a[i] > a[j]`. Inversion count measures how far the array is from being sorted.

## Intuition

A brute force checks every pair. The optimal trick: during **merge sort**, when we merge two sorted halves and pick an element from the right half before some remaining elements of the left half, every one of those remaining left elements forms an inversion with it — counted in bulk.

## Brute force — check all pairs

```java
long countInversions(int[] a) {
    long count = 0;
    for (int i = 0; i < a.length; i++)
        for (int j = i + 1; j < a.length; j++)
            if (a[i] > a[j]) count++;
    return count;
}
```

**Time:** O(n^2) · **Space:** O(1)

## Optimal — merge sort

While merging sorted halves `left` and `right`, if `left[i] > right[j]`, then `left[i], left[i+1], ... left[mid]` are all greater than `right[j]`. Add `(mid - i + 1)` to the count.

```java
long merge(int[] a, int low, int mid, int high) {
    List<Integer> tmp = new ArrayList<>();
    int i = low, j = mid + 1; long cnt = 0;
    while (i <= mid && j <= high) {
        if (a[i] <= a[j]) tmp.add(a[i++]);
        else { cnt += (mid - i + 1); tmp.add(a[j++]); }
    }
    while (i <= mid) tmp.add(a[i++]);
    while (j <= high) tmp.add(a[j++]);
    for (int k = low; k <= high; k++) a[k] = tmp.get(k - low);
    return cnt;
}
long sort(int[] a, int low, int high) {
    if (low >= high) return 0;
    int mid = (low + high) / 2;
    long c = sort(a, low, mid) + sort(a, mid + 1, high);
    return c + merge(a, low, mid, high);
}
long countInversions(int[] a) { return sort(a, 0, a.length - 1); }
```

**Time:** O(n log n) · **Space:** O(n)

```text
a = [5, 3, 2, 4, 1]
merge left=[3,5] right=[1,2,4] :
  5 > 1 -> +2 (both 3,5 > 1)
  ... total inversions = 8
brute-force pairs > : (5,3)(5,2)(5,4)(5,1)(3,2)(3,1)(2,1)(4,1) = 8
```

## Key points

- Use `long` for the count — it can reach n(n-1)/2 which overflows `int` for large n.
- The merge step counts inversions **across** halves; recursion counts those within each half.
- Same template answers "count reverse pairs" style problems with a modified comparison.
