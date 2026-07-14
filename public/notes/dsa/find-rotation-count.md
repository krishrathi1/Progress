## Problem

A sorted ascending array of distinct integers is rotated `k` times to the right. Find **how many times it was rotated** (`k`), in `O(log n)`.

The rotation count equals the **index of the minimum element**. Example: `[4,5,6,7,0,1,2]` → min `0` is at index `4`, so it was rotated `4` times.

## Intuition

Rotating a sorted array `k` times moves the original first element to index `k`, and the smallest element ends up at index `k`. So *finding the rotation count* is exactly *finding the index of the minimum*. We reuse the "one half is always sorted" binary-search idea, but track the **index** of the smallest candidate, not its value.

## Brute force

Linear scan for the position of the minimum.

```java
int rotations(int[] a) {
    int idx = 0;
    for (int i = 1; i < a.length; i++)
        if (a[i] < a[idx]) idx = i;
    return idx;
}
```

**Time:** O(n) · **Space:** O(1)

## Optimal — Binary search for the min's index

```java
int rotations(int[] a) {
    int low = 0, high = a.length - 1;
    int ans = Integer.MAX_VALUE, idx = 0;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (a[low] <= a[mid]) {            // left half sorted
            if (a[low] < ans) { ans = a[low]; idx = low; }
            low = mid + 1;
        } else {                            // right half sorted
            if (a[mid] < ans) { ans = a[mid]; idx = mid; }
            high = mid - 1;
        }
    }
    return idx;
}
```

**Time:** O(log n) · **Space:** O(1)

## Dry run

```text
a = [7,0,1,2,4,5,6]  (rotated 1 time; min 0 at index 1)
low=0 high=6 mid=3 -> a[0]=7 > a[3]=2 : right sorted, ans=2 idx=3, high=2
low=0 high=2 mid=1 -> a[0]=7 > a[1]=0 : right sorted, ans=0 idx=1, high=0
low=0 high=0 mid=0 -> a[0]=7 <= a[0]=7 : left sorted, ans stays 0, low=1
loop ends -> idx = 1
```

## Key points

- **Rotation count = index of minimum element.** Solve the min-index problem.
- Always update the candidate from the sorted half's boundary (`a[low]` when left is sorted, else `a[mid]`).
- If `a[low] <= a[high]` the array is not rotated in this window → answer index is `low`.
- Duplicates make it O(n) worst case (shrink with `low++`).
