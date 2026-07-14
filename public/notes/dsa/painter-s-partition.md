## Problem

There are `n` boards of given lengths in array `boards[]`, and `k` painters. Each painter takes `time` units to paint 1 unit of board length. A painter can only paint **contiguous** boards, and one board cannot be split between painters. Find the **minimum time** to paint all boards if all painters work simultaneously.

Since total time is bounded by the busiest painter, this reduces to: partition `boards` into ≤ `k` contiguous groups, minimising the maximum group sum, then multiply by `time`.

## Intuition

Same family as Book Allocation and Split Array Largest Sum. Binary search on the **maximum length any single painter handles**:

- **low** = `max(boards)` — the longest board must go to some painter.
- **high** = `sum(boards)` — one painter paints everything.

For a candidate `mid`, greedily count painters needed so no painter's total exceeds `mid`. Fewer painters are needed as `mid` grows → monotonic → binary search. Multiply the found length by `time` at the end.

## Brute force

Linearly test each candidate length from `max` to `sum`.

```java
int paintersNeeded(int[] b, long limit) {
    int cnt = 1; long cur = 0;
    for (int len : b) {
        if (cur + len > limit) { cnt++; cur = len; }
        else cur += len;
    }
    return cnt;
}
long brute(int[] b, int k, int time) {
    long lo = 0, hi = 0;
    for (int len : b) { lo = Math.max(lo, len); hi += len; }
    for (long lim = lo; lim <= hi; lim++)
        if (paintersNeeded(b, lim) <= k) return lim * time;
    return hi * time;
}
```

**Time:** O(sum × n) · **Space:** O(1)

## Optimal — binary search on answer

```java
long painterPartition(int[] boards, int k, int time) {
    long lo = 0, hi = 0;
    for (int len : boards) { lo = Math.max(lo, len); hi += len; }
    while (lo < hi) {
        long mid = lo + (hi - lo) / 2;
        if (paintersNeeded(boards, mid) <= k) hi = mid;
        else lo = mid + 1;
    }
    return lo * time;   // minimum max-length × time per unit
}
```

**Time:** O(n × log(sum)) · **Space:** O(1)

```text
boards = [10, 20, 30, 40], k = 2, time = 1
lo = 40 (max), hi = 100 (sum)
mid=70 -> [10,20,30]=60,[40]=40 -> 2 painters OK -> hi=70
mid=55 -> [10,20]=30,[30]=30,[40] -> 3 painters -> lo=56
mid=63 -> [10,20,30]=60,[40] -> 2 painters OK -> hi=63
... converges to 60
Answer = 60 × time = 60
```

## Key points

- Reduces to "minimise the maximum contiguous partition sum," identical to Book Allocation / Split Array.
- Remember to multiply the minimised length by `time`.
- Greedy feasibility check is O(n); overall O(n log(sum)).
- Contiguity is essential — a painter's boards must be consecutive, so a simple prefix-style greedy works.
