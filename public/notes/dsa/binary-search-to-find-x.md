## Problem
Find the index of **x** in a **sorted** array (or −1 if absent).

## Intuition
Each comparison at the middle throws away half the search space — the array is sorted, so you always know which half to keep.

## Approach 1 — Iterative
~~~java
int lo = 0, hi = n - 1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;   // avoids overflow
    if (a[mid] == x) return mid;
    else if (a[mid] < x) lo = mid + 1;
    else hi = mid - 1;
}
return -1;
~~~
- **Time:** O(log n) · **Space:** O(1)

## Approach 2 — Recursive
~~~java
int bs(int[] a, int lo, int hi, int x) {
    if (lo > hi) return -1;
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == x) return mid;
    return a[mid] < x ? bs(a, mid + 1, hi, x)
                      : bs(a, lo, mid - 1, x);
}
~~~
- **Time:** O(log n) · **Space:** O(log n) recursion stack

## Common bugs
- Use **lo + (hi - lo) / 2**, not (lo + hi) / 2, to avoid integer overflow.
- Loop condition is **lo <= hi** (not <), otherwise you miss single-element ranges.

## Key points
- Binary search generalises to "search on answer" problems (Koko bananas, Aggressive cows) — find the smallest/largest value satisfying a monotonic predicate.
