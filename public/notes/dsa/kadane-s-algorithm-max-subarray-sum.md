## Problem
Find the maximum sum of a **contiguous** subarray.

## Intuition
Scan left to right holding the best subarray sum ending *here*. If the running sum ever goes negative it can only hurt what comes next, so drop it and restart from the current element.

## Approach 1 — Brute force
Sum every subarray.
~~~cpp
int best = INT_MIN;
for (int i = 0; i < n; i++) {
    int sum = 0;
    for (int j = i; j < n; j++) {
        sum += a[j];
        best = max(best, sum);
    }
}
~~~
- **Time:** O(n²) · **Space:** O(1)

## Approach 2 — Kadane (optimal)
~~~cpp
int sum = 0, best = INT_MIN;
for (int i = 0; i < n; i++) {
    sum += a[i];
    best = max(best, sum);
    if (sum < 0) sum = 0;   // drop a negative prefix
}
~~~
- **Time:** O(n) · **Space:** O(1)

## Visual
~~~
a =  [-2,  1, -3,  4, -1,  2,  1, -5,  4]
sum:  -2  1  -2   4   3   5   6   1   5
             ^reset       ^best = 6  (subarray [4,-1,2,1])
~~~

## Key points
- Initialise **best = INT_MIN** (not 0) so all-negative arrays return the largest single element.
- To also print the subarray, remember the start index whenever you reset, and the end when you update **best**.
