## Problem

Given an array (or stream) of elements, count how many times each distinct element appears. Support fast lookup of any element's frequency.

## Intuition

We need a mapping from **value -> count**. A hash map gives average O(1) insert and lookup, letting us build all frequencies in a single pass.

## Approach 1: Nested Loop (Brute Force)

For each element, scan the whole array and count matches.

```java
void countFreq(int[] a) {
    boolean[] visited = new boolean[a.length];
    for (int i = 0; i < a.length; i++) {
        if (visited[i]) continue;
        int count = 1;
        for (int j = i + 1; j < a.length; j++) {
            if (a[j] == a[i]) { count++; visited[j] = true; }
        }
        System.out.println(a[i] + " -> " + count);
    }
}
```

**Time:** O(n^2) · **Space:** O(n) for visited

## Approach 2: Hash Map (Optimal)

Iterate once, incrementing the count for each key.

```java
Map<Integer, Integer> countFreq(int[] a) {
    Map<Integer, Integer> freq = new HashMap<>();
    for (int x : a) {
        freq.put(x, freq.getOrDefault(x, 0) + 1);
    }
    return freq;
}
```

**Time:** O(n) average · **Space:** O(n)

```text
array: [10, 5, 10, 15, 10, 5]

step-by-step map:
 10 -> {10:1}
  5 -> {10:1, 5:1}
 10 -> {10:2, 5:1}
 15 -> {10:2, 5:1, 15:1}
 10 -> {10:3, 5:1, 15:1}
  5 -> {10:3, 5:2, 15:1}
```

## Approach 3: Array Hashing (When Values Are Small)

If elements lie in a small known range `[0, N)`, an int array beats a hash map.

```java
int[] freq = new int[N];
for (int x : a) freq[x]++;   // O(1) exact, cache-friendly
```

**Time:** O(n) · **Space:** O(N)

## Key points

- Hash map: works for any keys, O(1) average but O(n) worst case on collisions.
- Array hashing: fastest when values are small non-negative integers or characters.
- For characters, use `int[26]` (lowercase) or `int[256]` (ASCII).
- Frequency counting underlies many problems: majority element, anagrams, top-K, first unique.
