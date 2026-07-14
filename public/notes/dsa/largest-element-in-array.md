## Problem
Given an array, return its **largest** element.

## Intuition
Walk once through the array, remembering the biggest value seen so far. There is nothing to "look back" on, so a single pass is enough.

## Approach 1 — Sorting (naive)
Sort ascending; the last element is the largest.

~~~cpp
sort(a.begin(), a.end());
return a[n - 1];
~~~
- **Time:** O(n log n) · **Space:** O(1)

## Approach 2 — Single scan (optimal)
Keep a running maximum.

~~~cpp
int maxi = a[0];
for (int i = 1; i < n; i++)
    maxi = max(maxi, a[i]);
return maxi;
~~~
- **Time:** O(n) · **Space:** O(1)

## Dry run
a = [3, 7, 1, 9, 2] → maxi: 3 → 7 → 7 → 9 → 9 → **9**

## Key points
- The optimal is a textbook "running aggregate" pattern (also used for min, sum, count).
- Initialise **maxi** with a[0] (or INT_MIN), never 0 — arrays can be all-negative.
