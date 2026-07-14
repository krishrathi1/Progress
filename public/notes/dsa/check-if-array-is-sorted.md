## Problem

Given an array of `n` integers, determine whether it is sorted in **non-decreasing** order (each element is `>=` the one before it). Return `true` if sorted, else `false`.

Example: `[1, 2, 2, 3]` -> `true`; `[1, 3, 2]` -> `false`.

## Intuition

An array is sorted if and only if **every adjacent pair is in order**. If even one pair violates `a[i-1] <= a[i]`, the whole array is unsorted, so we can stop early. A single linear scan comparing neighbours answers the question — no need to compare all pairs.

## Approach 1 — Compare all pairs (brute force)

Check every `i < j` pair — correct but wasteful.

```java
static boolean isSortedBrute(int[] a) {
    for (int i = 0; i < a.length; i++)
        for (int j = i + 1; j < a.length; j++)
            if (a[i] > a[j]) return false;
    return true;
}
```

**Time:** O(n^2) · **Space:** O(1)

## Approach 2 — Adjacent scan (optimal)

Compare only consecutive elements; return `false` on the first inversion.

```java
static boolean isSorted(int[] a) {
    for (int i = 1; i < a.length; i++)
        if (a[i - 1] > a[i]) return false;   // strict > breaks non-decreasing
    return true;                             // empty / single element -> true
}
```

**Time:** O(n) · **Space:** O(1)

## Dry Run

```text
a = [1, 2, 2, 3]
i=1: 1<=2 ok
i=2: 2<=2 ok  (equal allowed for non-decreasing)
i=3: 2<=3 ok
no violation -> true

a = [1, 3, 2]
i=1: 1<=3 ok
i=2: 3>2  -> return false
```

## Key points

- **Optimal: single pass, `O(n)` time, `O(1)` space.**
- Use `a[i-1] > a[i]` for **non-decreasing** (allows equal neighbours). Use `>=` if you need **strictly increasing** (no duplicates allowed).
- Empty arrays and single elements are trivially sorted -> `true`.
- Variant (circular/rotated-sorted check): count how many times `a[i-1] > a[i]` including the wrap-around pair; if that count is `<= 1`, the array is a rotation of a sorted array.
