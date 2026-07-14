## Problem

Given a **strictly increasing** array `arr[]` of positive integers, find the `k`-th **missing** positive number.

Example: `arr = [2, 3, 4, 7, 11]`, `k = 5`. Missing positives are `1, 5, 6, 8, 9, 10, 12, ...` -> the 5th missing is `9`.

## Intuition

At index `i`, if no numbers were missing, we would expect `arr[i] = i + 1`. The count of **missing positives up to `arr[i]`** is therefore:

```text
missing(i) = arr[i] - (i + 1)
```

This value is **non-decreasing** as `i` grows, which enables binary search.

### Brute force

Walk numbers, subtracting `k` as you skip past present values.

```java
class Solution {
    public int findKthPositive(int[] arr, int k) {
        for (int x : arr) {
            if (x <= k) k++;   // this value is present, shift target up
            else break;
        }
        return k;
    }
}
```

**Time:** O(n) · **Space:** O(1) — simple and often enough.

### Optimal — binary search

Find the first index where `missing(i) >= k`. Everything left of index `lo` has fewer than `k` missing. The answer is: last "in-range" element `arr[lo-1]` plus the remaining shortfall, which simplifies to `k + lo`.

```cpp
class Solution {
public:
    int findKthPositive(vector<int>& arr, int k) {
        int lo = 0, hi = arr.size();          // search in [0, n]
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            int missing = arr[mid] - (mid + 1);
            if (missing < k) lo = mid + 1;     // not enough missing yet
            else hi = mid;                     // enough, go left
        }
        // after loop, lo = number of elements before the answer
        return k + lo;
    }
};
```

**Time:** O(log n) · **Space:** O(1)

```text
arr=[2,3,4,7,11], k=5
missing(i) = arr[i]-(i+1):  0, 0, 0, 3, 6
first index with missing>=5 is i=4 -> lo=4
answer = k + lo = 5 + 4 = 9
```

## Key points

- Core identity: numbers missing before `arr[i]` equals `arr[i] - (i + 1)`.
- Binary-search the boundary `lo` = count of array elements that come before the answer.
- Final answer is `k + lo`; no need to touch `arr` after the search.
- Brute force is O(n) and totally acceptable; binary search gives O(log n).
