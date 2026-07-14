## Problem

You are given an array `a[]` of size `n` containing numbers from `1` to `n`. One number appears **twice** (repeating = `X`) and one number is **missing** (`Y`). Find both `X` and `Y`.

## Intuition

Everything hinges on comparing what the array *actually* contains against what a perfect `1..n` array *should* contain. Counting occurrences, hashing, or clever math on sums all exploit this difference.

## Brute force — count each value

For every value `1..n`, scan the array and count how many times it appears. The value seen twice is `X`; the value seen zero times is `Y`.

```java
int[] find(int[] a, int n) {
    int repeating = -1, missing = -1;
    for (int v = 1; v <= n; v++) {
        int c = 0;
        for (int x : a) if (x == v) c++;
        if (c == 2) repeating = v;
        else if (c == 0) missing = v;
        if (repeating != -1 && missing != -1) break;
    }
    return new int[]{repeating, missing};
}
```

**Time:** O(n^2) · **Space:** O(1)

## Better — hashing / frequency array

Count frequency in one pass, then read it off.

```java
int[] find(int[] a, int n) {
    int[] freq = new int[n + 1];
    for (int x : a) freq[x]++;
    int rep = -1, miss = -1;
    for (int v = 1; v <= n; v++) {
        if (freq[v] == 2) rep = v;
        if (freq[v] == 0) miss = v;
    }
    return new int[]{rep, miss};
}
```

**Time:** O(n) · **Space:** O(n)

## Optimal — math (two equations)

Let `S = sum(a) - sum(1..n)` and `P = sum(a^2) - sum(1..n squared)`.

- `S = X - Y`
- `P = X^2 - Y^2 = (X - Y)(X + Y)` so `X + Y = P / S`.

Solve the two linear equations.

```java
int[] find(int[] a, int n) {
    long Sn = (long) n * (n + 1) / 2;
    long S2n = (long) n * (n + 1) * (2L * n + 1) / 6;
    long S = 0, S2 = 0;
    for (int x : a) { S += x; S2 += (long) x * x; }
    long val1 = S - Sn;            // X - Y
    long val2 = (S2 - S2n) / val1; // X + Y
    long X = (val1 + val2) / 2, Y = X - val1;
    return new int[]{(int) X, (int) Y};
}
```

**Time:** O(n) · **Space:** O(1)

```text
n=5, a=[3,1,2,5,3]  (X=3 repeats, Y=4 missing)
sum   = 14, expected 15 -> S  = X-Y = -1  (3-4)
sqSum = 48, expected 55 -> S2 = -7
X+Y = -7 / -1 = 7 ;  X-Y = -1  ->  X=3, Y=4
```

## Key points

- Math approach is O(1) space but `sum of squares` can overflow `int` — use `long`.
- XOR method is another O(1)-space route that avoids overflow entirely.
- Frequency array is the simplest and safest for interviews under time pressure.
