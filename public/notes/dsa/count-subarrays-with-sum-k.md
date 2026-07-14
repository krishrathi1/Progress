## Problem

Given an integer array `nums` and an integer `k`, count the number of **contiguous subarrays** whose elements sum to exactly `k`. Elements may be negative.

## Intuition

A subarray sum `sum(i..j)` equals `prefix[j] - prefix[i-1]`. If the running prefix sum up to index `j` is `s`, then a subarray ending at `j` sums to `k` whenever some earlier prefix equals `s - k`. Count how many earlier prefixes had that value.

## Approach 1 — Brute Force

Try every `(start, end)` pair and sum.

```java
int count(int[] a, int k) {
    int n = a.length, cnt = 0;
    for (int i = 0; i < n; i++) {
        int sum = 0;
        for (int j = i; j < n; j++) {
            sum += a[j];
            if (sum == k) cnt++;
        }
    }
    return cnt;
}
```

**Time:** O(n²) · **Space:** O(1)

## Approach 2 — Optimal (prefix sum + hashmap)

Keep a running `sum` and a map `count[prefix] = how many times seen`. At each index, the number of valid subarrays ending here is `map.get(sum - k)`.

```java
int count(int[] a, int k) {
    Map<Integer,Integer> map = new HashMap<>();
    map.put(0, 1);                 // empty prefix, enables subarrays from index 0
    int sum = 0, cnt = 0;
    for (int x : a) {
        sum += x;
        cnt += map.getOrDefault(sum - k, 0);
        map.merge(sum, 1, Integer::sum);
    }
    return cnt;
}
```

**Time:** O(n) · **Space:** O(n)

```text
a = [1, 2, 3], k = 3
sum=1  need -2 -> 0   map{0:1,1:1}
sum=3  need  0 -> +1  map{0:1,1:1,3:1}   ([1,2])
sum=6  need  3 -> +1  map{...,6:1}       ([3])
total = 2
```

## Key points

- Seed the map with `{0: 1}` so a prefix that itself equals `k` is counted (subarray starting at index 0).
- The sliding-window trick does **not** work here because negative numbers break the monotonic-sum assumption — the hashmap prefix method is the correct optimal.
- Same pattern generalizes: count subarrays with sum divisible by `k` (store `prefix % k`), or with a given XOR (store prefix XOR).
