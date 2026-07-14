## Problem

Given a **sorted** array `nums` (duplicates allowed) and a target `x`, count how many times `x` appears.

- Example: `nums = [1,2,2,2,3,4]`, `x = 2` → `3`.
- Example: `x = 5` → `0`.

## Intuition

In a sorted array all copies of `x` are contiguous. If we know the index of the **first** and **last** occurrence, the count is simply `last - first + 1`. Each boundary is a binary search, so the total is O(log n) — far better than counting linearly.

## Brute force — linear scan

```java
int count(int[] a, int x) {
    int c = 0;
    for (int v : a) if (v == x) c++;
    return c;
}
```

**Time:** O(n) · **Space:** O(1)

## Optimal — first & last via binary search

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
int count(int[] a, int x) {
    int first = lowerBound(a, x);
    if (first == a.length || a[first] != x) return 0;
    int last = lowerBound(a, x + 1) - 1;   // upperBound(x) - 1
    return last - first + 1;
}
```

**Time:** O(log n) · **Space:** O(1)

```text
a = [1,2,2,2,3,4], x = 2
first = lowerBound(2)   = 1
last  = lowerBound(3)-1 = 4-1 = 3
count = 3 - 1 + 1 = 3
```

## Key points

- Count = `lastOccurrence - firstOccurrence + 1`.
- Guard the absent case: if `first` is out of range or `a[first] != x`, return `0`.
- Uses the identity `upperBound(x) = lowerBound(x + 1)` for integers.
- Two O(log n) searches beat an O(n) scan on large arrays.
