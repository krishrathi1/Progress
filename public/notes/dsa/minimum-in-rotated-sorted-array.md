## Problem

Given a sorted array of distinct integers that has been rotated at some unknown pivot, find the **minimum element**. Do it in `O(log n)`.

Example: `[4,5,6,7,0,1,2]` → minimum is `0`.

## Intuition

A rotation splits the array into two sorted halves. The minimum is the only element smaller than its neighbour — the pivot. Binary search can locate the unsorted "break" without scanning everything: at each step, one half `[low..mid]` is guaranteed sorted; if it is, its leftmost value is a candidate minimum, and we can discard it and search the other half.

## Brute force

Scan every element, track the smallest.

```java
int findMin(int[] a) {
    int min = Integer.MAX_VALUE;
    for (int x : a) min = Math.min(min, x);
    return min;
}
```

**Time:** O(n) · **Space:** O(1)

## Optimal — Binary search on the sorted half

```java
int findMin(int[] a) {
    int low = 0, high = a.length - 1, ans = Integer.MAX_VALUE;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (a[low] <= a[mid]) {        // left half sorted
            ans = Math.min(ans, a[low]); // its smallest is a[low]
            low = mid + 1;               // discard left half
        } else {                        // right half sorted
            ans = Math.min(ans, a[mid]);
            high = mid - 1;              // discard right half
        }
    }
    return ans;
}
```

**Time:** O(log n) · **Space:** O(1)

## Dry run

```text
a = [4,5,6,7,0,1,2]
low=0 high=6 mid=3 -> a[0]=4 <= a[3]=7 : left sorted, ans=min(INF,4)=4, low=4
low=4 high=6 mid=5 -> a[4]=0 <= a[5]=1 : left sorted, ans=min(4,0)=0, low=6
low=6 high=6 mid=6 -> a[6]=2 <= a[6]=2 : ans=min(0,2)=0, low=7
loop ends -> answer 0
```

## Key points

- If the whole search space is already sorted (`a[low] <= a[high]`), `a[low]` is the answer — an early-exit optimisation.
- Works because at least one half is always sorted; take that half's boundary as a candidate, then eliminate it.
- With **duplicates**, `a[low] == a[mid]` becomes ambiguous; shrink with `low++`, degrading worst case to O(n).
