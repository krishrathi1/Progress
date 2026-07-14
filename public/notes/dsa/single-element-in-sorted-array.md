## Problem

In a sorted array every element appears **exactly twice** except one that appears **once**. Find that single element in `O(log n)` time and `O(1)` space.

Example: `[1,1,2,3,3,4,4,8,8]` → `2`.

## Intuition

Pairs sit at indices `(0,1), (2,3), (4,5)…`. Before the single element, the first of each pair is at an **even** index and its twin at the next odd index. After the single element, this parity flips. So we binary-search on this parity property: check `mid`'s partner to decide which side the single element lies on.

## Brute force

XOR everything — pairs cancel, leaving the single element.

```java
int single(int[] a) {
    int x = 0;
    for (int v : a) x ^= v;   // works, but O(n)
    return x;
}
```

**Time:** O(n) · **Space:** O(1)

## Optimal — Binary search on parity

```java
int single(int[] a) {
    int n = a.length;
    if (n == 1) return a[0];
    int low = 0, high = n - 2;          // search on [0, n-2]
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if ((mid % 2) == 0) {           // even index: partner is mid+1
            if (a[mid] == a[mid + 1]) low = mid + 2;  // single is to the right
            else high = mid - 1;                       // single at/left of mid
        } else {                        // odd index: partner is mid-1
            if (a[mid] == a[mid - 1]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return a[low];
}
```

**Time:** O(log n) · **Space:** O(1)

## Dry run

```text
a = [1,1,2,3,3,4,4,8,8]  (single = 2 at index 2)
low=0 high=7 mid=3 (odd): a[3]=3 == a[2]=2? no -> high=2
low=0 high=2 mid=1 (odd): a[1]=1 == a[0]=1? yes -> low=2
low=2 high=2 mid=2 (even): a[2]=2 == a[3]=3? no -> high=1
loop ends -> a[low] = a[2] = 2
```

## Key points

- Left of the single: pattern is `(even, odd)` equal pairs. Right of it: the pattern shifts by one.
- Search space is `[0, n-2]` so `mid+1` never goes out of bounds.
- A neat variant: `mid = mid ^ 1` gives the partner index directly; if `a[mid] == a[mid^1]`, go right.
- XOR is elegant but O(n); binary search is the asked-for O(log n) solution.
