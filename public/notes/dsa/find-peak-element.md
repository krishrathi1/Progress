## Problem

An element is a **peak** if it is strictly greater than both neighbours. Given an array where `a[-1] = a[n] = -∞`, return the index of **any** peak in `O(log n)`.

Example: `[1,2,1,3,5,6,4]` → index `5` (value 6) or index `1` (value 2) are both valid.

## Intuition

Look at `a[mid]` vs `a[mid+1]`. If we are on an **ascending** slope (`a[mid] < a[mid+1]`), a peak must exist to the right (the array must eventually come down, since the boundary is `-∞`). If we are on a **descending** slope, a peak exists at `mid` or to its left. Because the virtual boundaries are `-∞`, a peak always exists, so we can always move "uphill".

## Brute force

Scan and check each element against its neighbours.

```java
int peak(int[] a) {
    int n = a.length;
    for (int i = 0; i < n; i++) {
        boolean l = (i == 0)     || a[i] > a[i - 1];
        boolean r = (i == n - 1) || a[i] > a[i + 1];
        if (l && r) return i;
    }
    return -1;
}
```

**Time:** O(n) · **Space:** O(1)

## Optimal — Binary search uphill

```java
int peak(int[] a) {
    int n = a.length;
    if (n == 1) return 0;
    if (a[0] > a[1]) return 0;
    if (a[n - 1] > a[n - 2]) return n - 1;
    int low = 1, high = n - 2;          // interior only
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (a[mid] > a[mid - 1] && a[mid] > a[mid + 1]) return mid;
        else if (a[mid] < a[mid + 1]) low = mid + 1;  // ascending -> go right
        else high = mid - 1;                          // descending -> go left
    }
    return -1;
}
```

**Time:** O(log n) · **Space:** O(1)

## Dry run

```text
a = [1,2,1,3,5,6,4]   (n=7)
edges: a[0]=1 !> a[1]=2 ; a[6]=4 !> a[5]=6  -> search [1..5]
low=1 high=5 mid=3 : a[3]=3, a[2]=1<3 but a[4]=5>3 -> ascending, low=4
low=4 high=5 mid=4 : a[4]=5, a[3]=3<5, a[5]=6>5 -> ascending, low=5
low=5 high=5 mid=5 : a[5]=6 > a[4]=5 and > a[6]=4 -> peak, return 5
```

## Key points

- Move toward the higher neighbour; the `-∞` boundaries guarantee a peak in that direction.
- Handle the two ends first, then binary-search the interior `[1, n-2]` so `mid-1`/`mid+1` stay in range.
- Any peak is acceptable — no need to find the global maximum.
- For arrays with equal adjacent values the "strictly greater" definition can break the log-time guarantee.
