## Problem

Given an array `nums` of size `n` and an integer `d`, rotate the array **left by `d` places** in-place.

- Example: `nums = [1, 2, 3, 4, 5, 6, 7]`, `d = 2` → `[3, 4, 5, 6, 7, 1, 2]`.
- Note: rotating by `d` and by `d % n` give the same result, so reduce `d` first.

## Intuition

The first `d` elements move to the back; the remaining `n - d` move to the front. The **reversal algorithm** achieves this with O(1) space: reverse the two blocks separately, then reverse the whole array.

## Brute force — temp array

Copy the first `d` into a buffer, shift the rest forward, append the buffer.

```java
void rotate(int[] a, int d) {
    int n = a.length; d %= n;
    int[] temp = new int[d];
    for (int i = 0; i < d; i++) temp[i] = a[i];
    for (int i = d; i < n; i++) a[i - d] = a[i];
    for (int i = 0; i < d; i++) a[n - d + i] = temp[i];
}
```

**Time:** O(n) · **Space:** O(d)

## Optimal — reversal algorithm

```java
void reverse(int[] a, int l, int r) {
    while (l < r) { int t = a[l]; a[l] = a[r]; a[r] = t; l++; r--; }
}
void rotate(int[] a, int d) {
    int n = a.length; d %= n;
    reverse(a, 0, d - 1);      // reverse first block
    reverse(a, d, n - 1);      // reverse second block
    reverse(a, 0, n - 1);      // reverse whole array
}
```

**Time:** O(n) · **Space:** O(1)

```text
a = [1,2,3,4,5,6,7], d = 2
reverse(0,1): [2,1,3,4,5,6,7]
reverse(2,6): [2,1,7,6,5,4,3]
reverse(0,6): [3,4,5,6,7,1,2]   <- rotated left by 2
```

## Key points

- Always do `d %= n` — avoids out-of-bounds when `d >= n`.
- **Left** rotate: reverse `[0..d-1]`, `[d..n-1]`, then all. **Right** rotate by d: reverse whole first, or reverse `[0..n-d-1]`, `[n-d..n-1]`, then all.
- Reversal trick is the interview-preferred O(1)-space answer (LeetCode 189).
