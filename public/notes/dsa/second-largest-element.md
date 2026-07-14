## Problem

Given an array of `n` integers, find the **second largest** element. If no such element exists (all elements equal, or `n < 2`), return `-1`. The second largest must be *strictly* smaller than the largest (distinct value).

Example: `[1, 2, 4, 7, 7, 5]` -> largest = `7`, second largest = `5`.

## Intuition

The naive idea is to sort and pick the value just below the maximum, but we can do it in a **single pass** by tracking the two best values seen so far. The key subtlety is handling duplicates of the maximum: a value equal to the current largest should **not** become the second largest.

## Approach 1 — Sort then scan (brute/better)

Sort ascending, then walk from the end to find the first value strictly less than the last.

```java
static int secondLargest(int[] a) {
    java.util.Arrays.sort(a);
    int n = a.length, largest = a[n - 1];
    for (int i = n - 2; i >= 0; i--)
        if (a[i] != largest) return a[i];
    return -1;
}
```

**Time:** O(n log n) · **Space:** O(1)

## Approach 2 — Single pass, two trackers (optimal)

Keep `largest` and `secondLargest`. For each element:
- if it beats `largest`, the old largest becomes second, and it becomes largest;
- else if it is strictly between `secondLargest` and `largest`, update second.

```java
static int secondLargest(int[] a) {
    int largest = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
    for (int x : a) {
        if (x > largest) { second = largest; largest = x; }
        else if (x < largest && x > second) { second = x; }
    }
    return second == Integer.MIN_VALUE ? -1 : second;
}
```

**Time:** O(n) · **Space:** O(1)

## Dry Run

```text
a = [1, 2, 4, 7, 7, 5]     largest=-inf second=-inf
1 -> largest=1
2 -> second=1  largest=2
4 -> second=2  largest=4
7 -> second=4  largest=7
7 -> 7==largest, skip (not > , not < largest)
5 -> 5<7 and 5>4 -> second=5
answer = 5
```

## Key points

- **Optimal is one pass, `O(n)` time, `O(1)` space** — no sorting needed.
- The `x < largest` guard is what makes **duplicates of the max** ignored.
- Initialize trackers to `Integer.MIN_VALUE` (or `-1` for known non-negative inputs) and translate "unchanged" back to `-1`.
- The same two-tracker pattern extends to k-th largest for small fixed `k`.
