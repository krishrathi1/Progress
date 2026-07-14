## Problem

Given an integer array `nums` where **every element appears exactly three times except one element** which appears exactly **once**, find and return that single element.

- Constraints demand a solution in **linear time** and ideally **constant extra space**.
- Example: `nums = [2, 2, 3, 2]` → answer `3`. `nums = [0, 1, 0, 1, 0, 1, 99]` → answer `99`.

## Intuition

XOR (used for Single Number I) fails here because XOR cancels pairs, but every element appears **three** times. We need a way to count bits **modulo 3**: for each bit position, sum the set bits across all numbers; the bits that are *not* a multiple of 3 belong to the unique number.

## Brute force — HashMap of counts

Count frequencies, then return the key with count 1.

```java
int singleNumber(int[] nums) {
    Map<Integer,Integer> freq = new HashMap<>();
    for (int x : nums) freq.merge(x, 1, Integer::sum);
    for (var e : freq.entrySet())
        if (e.getValue() == 1) return e.getKey();
    return -1;
}
```

**Time:** O(n) · **Space:** O(n)

## Better — Count bits per position

For each of 32 bit positions, count how many numbers have that bit set. `count % 3` reveals the unique number's bit.

```java
int singleNumber(int[] nums) {
    int ans = 0;
    for (int b = 0; b < 32; b++) {
        int cnt = 0;
        for (int x : nums) cnt += (x >> b) & 1;
        if (cnt % 3 != 0) ans |= (1 << b);
    }
    return ans;
}
```

**Time:** O(32n) · **Space:** O(1)

## Optimal — Bitmask state machine (ones / twos)

Track bits seen once (`ones`) and twice (`twos`). On the third appearance both reset.

```java
int singleNumber(int[] nums) {
    int ones = 0, twos = 0;
    for (int x : nums) {
        ones = (ones ^ x) & ~twos;
        twos = (twos ^ x) & ~ones;
    }
    return ones;
}
```

**Time:** O(n) · **Space:** O(1)

```text
x=2 (10): ones=10 twos=00
x=2 (10): ones=00 twos=10
x=3 (11): ones=01 twos=10 -> masking clears bit1 of ones, keeps twos
x=2 (10): ones=01 twos=00  -> third 2 cancels
Result ones = 01 = 3
```

## Key points

- Generalizes: for "every element k times except one", use bit counting `% k`.
- The `ones/twos` trick works only for **k = 3, single unique**; bit-count method is safer to reason about in interviews.
- Handles negatives correctly because the 32-bit sign bit is included in the loop.
