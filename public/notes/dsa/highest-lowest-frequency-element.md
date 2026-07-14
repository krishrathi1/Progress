## Problem

Given an array, find the element with the **highest frequency** (most occurrences) and the element with the **lowest frequency** (fewest occurrences).

## Intuition

Once we know each element's count, the answer is just the max-count and min-count keys. Building a frequency map first turns the problem into a simple scan.

## Approach 1: Nested Loop (Brute Force)

For every element, count its occurrences by scanning the array, tracking the best so far.

```java
void highLow(int[] a) {
    int n = a.length, maxCnt = 0, minCnt = n + 1, maxEl = a[0], minEl = a[0];
    for (int i = 0; i < n; i++) {
        int cnt = 0;
        for (int j = 0; j < n; j++) if (a[j] == a[i]) cnt++;
        if (cnt > maxCnt) { maxCnt = cnt; maxEl = a[i]; }
        if (cnt < minCnt) { minCnt = cnt; minEl = a[i]; }
    }
    System.out.println("high=" + maxEl + " low=" + minEl);
}
```

**Time:** O(n^2) · **Space:** O(1)

## Approach 2: Hash Map (Optimal)

Build frequencies in one pass, then pick extremes in a second pass.

```java
void highLow(int[] a) {
    Map<Integer, Integer> freq = new HashMap<>();
    for (int x : a) freq.put(x, freq.getOrDefault(x, 0) + 1);

    int maxEl = a[0], minEl = a[0];
    int maxCnt = 0, minCnt = Integer.MAX_VALUE;
    for (Map.Entry<Integer, Integer> e : freq.entrySet()) {
        if (e.getValue() > maxCnt) { maxCnt = e.getValue(); maxEl = e.getKey(); }
        if (e.getValue() < minCnt) { minCnt = e.getValue(); minEl = e.getKey(); }
    }
    System.out.println("high=" + maxEl + " low=" + minEl);
}
```

**Time:** O(n) · **Space:** O(n)

```text
array: [1, 2, 2, 3, 3, 3, 4]
freq : {1:1, 2:2, 3:3, 4:1}
             low^        high^
highest frequency element = 3  (appears 3 times)
lowest  frequency element = 1  (appears 1 time; ties resolved by first seen)
```

## Key points

- The two-pass hash-map solution is the standard interview answer: O(n) time.
- On ties, the returned element depends on iteration order — clarify the tie-break rule.
- Initialize `minCnt` to a large value and `maxCnt` to 0 to compare correctly.
- Same map can also answer "top-K frequent" via a heap or bucket sort.
