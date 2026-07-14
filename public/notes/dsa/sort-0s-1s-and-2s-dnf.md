## Problem
Sort an array containing only 0s, 1s and 2s, in place.

## Approach 1 — Counting sort
Count how many 0/1/2, then overwrite.
~~~cpp
int c0=0,c1=0,c2=0;
for (int v : a) (v==0?c0:v==1?c1:c2)++;
int i=0;
while (c0--) a[i++]=0;
while (c1--) a[i++]=1;
while (c2--) a[i++]=2;
~~~
- **Time:** O(2n) · **Space:** O(1) · two passes

## Approach 2 — Dutch National Flag (optimal, one pass)
Three pointers partition the array into [0s | 1s | unknown | 2s].
~~~cpp
int low=0, mid=0, high=n-1;
while (mid <= high) {
    if (a[mid]==0)      swap(a[low++], a[mid++]);
    else if (a[mid]==1) mid++;
    else                swap(a[mid], a[high--]);
}
~~~
- **Time:** O(n) · **Space:** O(1) · single pass

## Invariant (why it works)
~~~
[0 .. low-1]  = 0s
[low .. mid-1]= 1s
[mid .. high] = unknown
[high+1 .. n-1]= 2s
~~~
When a[mid]==2 we swap it to the back but do **not** advance mid (the swapped-in value is still unknown).

## Key points
- DNF is the go-to for 3-way partitioning (also used in quicksort with duplicate pivots).
