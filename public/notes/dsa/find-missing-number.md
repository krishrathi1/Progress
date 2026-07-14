## Problem

Given an array `nums` of size `n` containing `n` distinct numbers taken from the range `[0, n]` (or `[1, n]`), exactly one number in that range is missing. Return the missing number.

- Example: `nums = [0, 1, 3, 4]`, `n = 4`, range `[0, 4]` → missing = **2**.

## Intuition

We know the *complete* set of numbers that should be present. If we can summarize the full range and the actual array with a reversible operation (sum or XOR), the difference reveals the missing element.

## Brute force — linear search each value

For every value `i` in `[0, n]`, scan the array to check if it exists.

```java
int missingBrute(int[] nums, int n) {
    for (int i = 0; i <= n; i++) {
        boolean found = false;
        for (int x : nums) if (x == i) { found = true; break; }
        if (!found) return i;
    }
    return -1;
}
```

**Time:** O(n^2) · **Space:** O(1)

## Better — sum formula

Sum of `0..n` is `n*(n+1)/2`. Subtract the actual array sum; the remainder is the missing number. Watch for overflow on large `n` (use `long`).

```java
int missingSum(int[] nums, int n) {
    long total = (long) n * (n + 1) / 2;
    long sum = 0;
    for (int x : nums) sum += x;
    return (int) (total - sum);
}
```

**Time:** O(n) · **Space:** O(1)

## Optimal — XOR (no overflow)

XOR of a number with itself is 0. XOR all indices `0..n` and all array elements together; pairs cancel, leaving the missing number. No overflow risk.

```java
int missingXor(int[] nums, int n) {
    int xr = 0;
    for (int i = 0; i <= n; i++) xr ^= i;      // XOR of full range
    for (int x : nums) xr ^= x;                // XOR of array
    return xr;
}
```

**Time:** O(n) · **Space:** O(1)

```text
nums = [0,1,3,4], n=4
range XOR: 0^1^2^3^4 = 4
array XOR: 0^1^3^4   = 6
4 ^ 6 = 2   ->  missing = 2
```

## Key points

- **Sum** is simplest but can overflow — cast to `long`.
- **XOR** avoids overflow entirely; preferred in interviews.
- Both optimal approaches are single-pass, O(1) space.
- Clarify the range: `[0, n]` vs `[1, n]` changes the loop bounds.
