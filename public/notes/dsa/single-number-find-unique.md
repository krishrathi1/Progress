## Problem

Given a non-empty array `nums` where **every element appears exactly twice except one** element that appears once, find that single element.

- Example: `nums = [4, 1, 2, 1, 2]` → **4**.
- Constraint: solve in O(n) time and O(1) extra space.

## Intuition

Every duplicated value cancels itself out under some pairing operation. XOR is perfect: `a ^ a = 0` and `x ^ 0 = x`. XOR the whole array and all pairs vanish, leaving only the unique element.

## Brute force — count occurrences

For each element, scan the array and count how many times it appears; return the one with count 1.

```java
int singleBrute(int[] nums) {
    for (int i = 0; i < nums.length; i++) {
        int cnt = 0;
        for (int j = 0; j < nums.length; j++)
            if (nums[j] == nums[i]) cnt++;
        if (cnt == 1) return nums[i];
    }
    return -1;
}
```

**Time:** O(n^2) · **Space:** O(1)

## Better — hash map frequency

Count frequencies in a map, then return the key with value 1.

```java
int singleHash(int[] nums) {
    Map<Integer,Integer> freq = new HashMap<>();
    for (int x : nums) freq.merge(x, 1, Integer::sum);
    for (var e : freq.entrySet())
        if (e.getValue() == 1) return e.getKey();
    return -1;
}
```

**Time:** O(n) · **Space:** O(n)

## Optimal — XOR all elements

XOR every element together. Paired values cancel to 0; the unique survivor remains.

```java
int singleXor(int[] nums) {
    int xr = 0;
    for (int x : nums) xr ^= x;
    return xr;
}
```

**Time:** O(n) · **Space:** O(1)

```text
nums = [4, 1, 2, 1, 2]
4        = 0100
^1       = 0101
^2       = 0111
^1       = 0110
^2       = 0100  -> 4  (the unique number)
```

## Key points

- **XOR** gives O(n) time and O(1) space — the ideal answer.
- Works because XOR is commutative and associative, so order does not matter.
- Variants: *Single Number II* (every element thrice except one) needs bit-count-mod-3; *Single Number III* (two uniques) uses XOR plus a distinguishing bit.
