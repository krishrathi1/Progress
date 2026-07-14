## Problem

Given an integer array `nums` of size `n`, return **all elements that appear more than `⌊n/3⌋` times**. There can be **at most two** such elements (two elements each needing > n/3 already exceeds n).

## Intuition

At most 2 candidates can exceed n/3 occurrences. The Boyer-Moore majority vote extends to two counters: we track (up to) two potential majorities and their counts, then verify.

## Approach 1 — Brute Force

Count occurrences of each element by scanning the whole array for it.

```java
List<Integer> majority(int[] a) {
    List<Integer> res = new ArrayList<>();
    int n = a.length;
    for (int i = 0; i < n; i++) {
        if (res.contains(a[i])) continue;
        int cnt = 0;
        for (int x : a) if (x == a[i]) cnt++;
        if (cnt > n / 3) res.add(a[i]);
    }
    return res;
}
```

**Time:** O(n²) · **Space:** O(1)

## Approach 2 — Better (hashmap)

Count in a map, then collect keys with count > n/3.

```java
List<Integer> majority(int[] a) {
    Map<Integer,Integer> m = new HashMap<>();
    List<Integer> res = new ArrayList<>();
    int n = a.length;
    for (int x : a) {
        m.merge(x, 1, Integer::sum);
        if (m.get(x) == n / 3 + 1) res.add(x);   // add exactly once
    }
    return res;
}
```

**Time:** O(n) · **Space:** O(n)

## Approach 3 — Optimal (Extended Boyer-Moore)

Two candidates `c1, c2` with counts `n1, n2`. If current matches a candidate, bump it; else if a count is 0, adopt the current as that candidate; else decrement both. Finally **re-verify** the two candidates (voting alone doesn't guarantee validity).

```java
List<Integer> majority(int[] a) {
    int c1 = Integer.MIN_VALUE, c2 = Integer.MIN_VALUE, n1 = 0, n2 = 0;
    for (int x : a) {
        if (x == c1) n1++;
        else if (x == c2) n2++;
        else if (n1 == 0) { c1 = x; n1 = 1; }
        else if (n2 == 0) { c2 = x; n2 = 1; }
        else { n1--; n2--; }
    }
    n1 = 0; n2 = 0;
    for (int x : a) { if (x == c1) n1++; else if (x == c2) n2++; }
    List<Integer> res = new ArrayList<>();
    int t = a.length / 3;
    if (n1 > t) res.add(c1);
    if (n2 > t) res.add(c2);
    return res;
}
```

**Time:** O(n) · **Space:** O(1)

```text
a = [1,1,1,3,3,2,2,2]  n/3 = 2
scan -> candidates settle to c1=1, c2=2
verify: count(1)=3>2 ✓  count(2)=3>2 ✓  -> [1, 2]
```

## Key points

- Order of the `else if` chain matters: check "equals existing candidate" **before** the zero-count adoption, else you overwrite a live candidate.
- Ensure `c1 != c2` by initializing to different sentinels (or guarding adoption) so both counters don't lock onto the same value.
- The verification pass is mandatory — the voting phase only produces *candidates*, not guaranteed answers.
- Generalizes: majority > n/k uses k-1 counters (Misra-Gries).
