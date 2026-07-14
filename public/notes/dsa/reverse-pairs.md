## Problem

Given an integer array `nums`, count the number of **reverse pairs**: pairs `(i, j)` where `i < j` and `nums[i] > 2 * nums[j]` (LeetCode 493).

## Intuition

Like counting inversions, but the condition `a[i] > 2*a[j]` is not the same as the merge comparison, so we cannot count during the merge itself. Instead we add a **separate counting pass** over the two sorted halves *before* merging them normally.

## Brute force — all pairs

```java
int reversePairs(int[] nums) {
    int count = 0;
    for (int i = 0; i < nums.length; i++)
        for (int j = i + 1; j < nums.length; j++)
            if ((long) nums[i] > 2L * nums[j]) count++;
    return count;
}
```

**Time:** O(n^2) · **Space:** O(1)

## Optimal — merge sort with a counting pass

Both halves are sorted. For each `i` in the left half, advance a pointer `j` in the right half while `nums[i] > 2 * nums[j]`. Because both are sorted, `j` only moves forward across the whole left loop.

```java
void merge(int[] a, int low, int mid, int high) {
    List<Integer> tmp = new ArrayList<>();
    int l = low, r = mid + 1;
    while (l <= mid && r <= high) {
        if (a[l] <= a[r]) tmp.add(a[l++]);
        else tmp.add(a[r++]);
    }
    while (l <= mid) tmp.add(a[l++]);
    while (r <= high) tmp.add(a[r++]);
    for (int k = low; k <= high; k++) a[k] = tmp.get(k - low);
}
int countPairs(int[] a, int low, int mid, int high) {
    int cnt = 0, r = mid + 1;
    for (int i = low; i <= mid; i++) {
        while (r <= high && a[i] > 2L * a[r]) r++;
        cnt += (r - (mid + 1));
    }
    return cnt;
}
int sort(int[] a, int low, int high) {
    if (low >= high) return 0;
    int mid = (low + high) / 2;
    int c = sort(a, low, mid) + sort(a, mid + 1, high);
    c += countPairs(a, low, mid, high);
    merge(a, low, mid, high);
    return c;
}
int reversePairs(int[] nums) { return sort(nums, 0, nums.length - 1); }
```

**Time:** O(n log n) · **Space:** O(n)

```text
left=[6,9]  right=[1,3]   condition a[i] > 2*a[j]
 i=6: 6 > 2*1(=2) yes; 6 > 2*3(=6) no  -> 1
 i=9: 9 > 2*1 yes;      9 > 2*3=6 yes  -> 2
 total for this merge = 3
```

## Key points

- Count pairs **before** merging, while both halves are still independently sorted.
- Use `2L * a[r]` (long) — `2 * Integer.MIN/MAX` overflows `int`.
- The `r` pointer never resets inside `countPairs`, keeping the pass O(n).
