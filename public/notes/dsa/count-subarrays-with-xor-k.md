## Problem

Given an array of integers and an integer `K`, count the number of **contiguous subarrays** whose elements **XOR** to exactly `K`.

## Intuition

Let `xr` be the prefix XOR up to index `i`. A subarray `(j+1 .. i)` has XOR `K` when:

```
prefixXor(i) XOR prefixXor(j) = K
=> prefixXor(j) = prefixXor(i) XOR K
```

So for each `i` we need how many earlier prefixes equal `xr XOR K`. XOR is its own inverse, which makes this the XOR analogue of "subarray sum equals K".

## Brute Force — All Subarrays

```java
int cnt = 0;
for (int i = 0; i < n; i++) {
    int x = 0;
    for (int j = i; j < n; j++) {
        x ^= a[j];
        if (x == K) cnt++;
    }
}
```

**Time:** O(n^2) · **Space:** O(1)

## Optimal — Prefix XOR + HashMap

Keep a map from prefix-XOR value to how many times it has occurred. For each index, the number of valid subarrays ending here equals the count of `xr XOR K` seen so far.

```java
long subarraysWithXorK(int[] a, int K) {
    Map<Integer, Integer> freq = new HashMap<>();
    freq.put(0, 1);           // empty prefix
    int xr = 0;
    long count = 0;
    for (int val : a) {
        xr ^= val;
        int need = xr ^ K;    // prefix we want to have seen before
        count += freq.getOrDefault(need, 0);
        freq.merge(xr, 1, Integer::sum);
    }
    return count;
}
```

**Time:** O(n) · **Space:** O(n)

```text
a = [4, 2, 2, 6, 4], K = 6
xr trace: 4, 6, 4, 2, 6
i=0 xr=4 need 4^6=2  freq{0:1} -> +0 ; put 4
i=1 xr=6 need 0      -> +1 ([4,2])   ; put 6
i=2 xr=4 need 2      -> +0            ; put 4->2
i=3 xr=2 need 4      -> +2 (two 4s)   ; put 2
i=4 xr=6 need 0      -> +1            ; total = 4
```

## Key points

- **Seed the map with `{0: 1}`** so subarrays starting at index 0 are counted.
- Add to the answer **before** inserting the current prefix XOR (prevents zero-length matches).
- Directly mirrors the prefix-sum "count subarrays sum = K" pattern — swap `+`/`-` for `^`.
