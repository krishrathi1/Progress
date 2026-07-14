## Problem

Given a **sorted** array `nums` and a value `x`, find:

- **Floor** = the largest element `<= x` (greatest value not exceeding `x`).
- **Ceil**  = the smallest element `>= x` (least value at least `x`).

Return `-1` for either when it does not exist.

- Example: `nums = [3,4,4,7,8,10]`, `x = 5` → floor `4`, ceil `7`.
- Example: `x = 8` → floor `8`, ceil `8`.

## Intuition

**Ceil** is exactly the **lower bound** — the first element `>= x`. **Floor** is its mirror: the last element `<= x`. Each is a single binary search, so both together are O(log n). Note these return the **values**, not merely their indices.

## Brute force — linear scan

```java
int[] floorCeil(int[] a, int x) {
    int floor = -1, ceil = -1;
    for (int v : a) {
        if (v <= x) floor = v;          // keeps growing while v<=x
        if (v >= x) { ceil = v; break; } // first v>=x is the ceil
    }
    return new int[]{floor, ceil};
}
```

**Time:** O(n) · **Space:** O(1)

## Optimal — two binary searches

```java
int findFloor(int[] a, int x) {
    int lo = 0, hi = a.length - 1, ans = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] <= x) { ans = a[mid]; lo = mid + 1; } // go right for larger
        else hi = mid - 1;
    }
    return ans;
}
int findCeil(int[] a, int x) {
    int lo = 0, hi = a.length - 1, ans = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] >= x) { ans = a[mid]; hi = mid - 1; } // go left for smaller
        else lo = mid + 1;
    }
    return ans;
}
```

**Time:** O(log n) · **Space:** O(1)

```text
a = [3,4,4,7,8,10], x = 5
floor: last value <= 5  -> 4
ceil : first value >= 5 -> 7
```

## Key points

- **Ceil = lower bound** (first `>= x`); **Floor = last `<= x`**.
- If `x` is present, floor == ceil == x.
- Floor is `-1` when `x` is below every element; ceil is `-1` when above every element.
- Return values, not indices — a common exam slip.
