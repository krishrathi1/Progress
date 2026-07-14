## Problem

Given an array `arr` of size `n`, reverse it **in place** using recursion (no extra array, no loop).

## Intuition

Reversing means swapping the first and last elements, then reversing everything in between. That "in between" is a smaller subproblem of the same shape — perfect for recursion. Use **two pointers** (`left`, `right`) that move toward each other, or a single index `i` mirrored to `n-1-i`.

## Approach 1: Two-pointer recursion

Swap the ends, then recurse inward until the pointers meet or cross.

```java
class Solution {
    void reverse(int[] a, int l, int r) {
        if (l >= r) return;          // base: pointers met/crossed
        int t = a[l]; a[l] = a[r]; a[r] = t; // swap ends
        reverse(a, l + 1, r - 1);    // shrink toward middle
    }
    public void solve(int[] a) { reverse(a, 0, a.length - 1); }
}
```

**Time:** O(N) · **Space:** O(N/2) recursion stack

## Approach 2: Single-index recursion

Swap `a[i]` with `a[n-1-i]`, stopping at the midpoint.

```java
void reverse(int[] a, int i, int n) {
    if (i >= n / 2) return;
    int t = a[i]; a[i] = a[n-1-i]; a[n-1-i] = t;
    reverse(a, i + 1, n);
}
// call: reverse(a, 0, a.length);
```

**Time:** O(N) · **Space:** O(N/2)

## Dry run

```text
[1, 2, 3, 4, 5]   l=0 r=4  swap 1<->5
[5, 2, 3, 4, 1]   l=1 r=3  swap 2<->4
[5, 4, 3, 2, 1]   l=2 r=2  l>=r, stop
Result: [5, 4, 3, 2, 1]
```

## Key points

- Base case: `l >= r` (or `i >= n/2`) — handles both even and odd lengths.
- Only ~N/2 swaps are needed; recursion depth is ~N/2 → O(N) stack space.
- In-place: no auxiliary array, so extra data space (excluding stack) is O(1).
- Iterative two-pointer loop is O(1) space and preferred in production.
