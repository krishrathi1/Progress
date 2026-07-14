## Problem

Given an array with an **equal number of positive and negative** integers, rearrange it so signs **alternate**, starting with a positive, while preserving the relative order within positives and within negatives.

- Example: `[3, 1, -2, -5, 2, -4]` → `[3, -2, 1, -5, 2, -4]`.

**Variant:** counts are unequal — place alternating first, then append the leftover majority sign at the end.

## Intuition

Positives must land at even indices `0, 2, 4, …` and negatives at odd indices `1, 3, 5, …`. Keep two independent write pointers stepping by 2. One pass fills both in original order.

## Brute force — two lists

```java
int[] rearrangeBrute(int[] a) {
    List<Integer> pos = new ArrayList<>(), neg = new ArrayList<>();
    for (int x : a) (x >= 0 ? pos : neg).add(x);
    int[] r = new int[a.length];
    for (int i = 0; i < a.length / 2; i++) {
        r[2 * i]     = pos.get(i);
        r[2 * i + 1] = neg.get(i);
    }
    return r;
}
```

**Time:** O(n) · **Space:** O(n)

## Optimal — direct placement (equal counts)

```java
int[] rearrange(int[] a) {
    int[] r = new int[a.length];
    int pos = 0, neg = 1;              // even / odd write pointers
    for (int x : a) {
        if (x >= 0) { r[pos] = x; pos += 2; }
        else        { r[neg] = x; neg += 2; }
    }
    return r;
}
```

**Time:** O(n) · **Space:** O(n) for output (O(1) extra)

## Dry run

```text
a = [3, 1, -2, -5, 2, -4]     pos=0 neg=1
 3 -> r[0]=3   pos=2
 1 -> r[2]=1   pos=4
-2 -> r[1]=-2  neg=3
-5 -> r[3]=-5  neg=5
 2 -> r[4]=2   pos=6
-4 -> r[5]=-4  neg=7
r = [3, -2, 1, -5, 2, -4]
```

## Key points

- Positives → even indices, negatives → odd; each pointer advances by 2.
- Relative order is preserved automatically because we scan left to right.
- The extra array is required to keep O(n); an in-place alternation with preserved order needs O(n) rotations, so the aux-array approach is standard.
- For **unequal** counts: fill alternately until one sign runs out, then dump the remaining elements in order.
