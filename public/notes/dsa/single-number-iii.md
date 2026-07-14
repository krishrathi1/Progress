## Problem

Given an integer array `nums` in which **exactly two elements appear only once** and **all other elements appear exactly twice**, return the two single elements in any order.

- Required: linear time, constant extra space.
- Example: `nums = [1, 2, 1, 3, 2, 5]` → `[3, 5]`.

## Intuition

If only one number were unique, XOR of the whole array would give it directly (pairs cancel). Here XOR of everything gives `a ^ b` where `a`, `b` are the two uniques. Since `a != b`, `a ^ b != 0`, so it has at least one set bit. That bit **differs** between `a` and `b`. Partition all numbers by that bit into two groups — each unique lands in a different group, and XORing each group isolates it.

## Brute force — HashMap

Count occurrences, collect the two keys with count 1.

```java
int[] singleNumber(int[] nums) {
    Map<Integer,Integer> f = new HashMap<>();
    for (int x : nums) f.merge(x, 1, Integer::sum);
    int[] res = new int[2]; int i = 0;
    for (var e : f.entrySet())
        if (e.getValue() == 1) res[i++] = e.getKey();
    return res;
}
```

**Time:** O(n) · **Space:** O(n)

## Optimal — XOR + differentiating bit

```java
int[] singleNumber(int[] nums) {
    int xorAll = 0;
    for (int x : nums) xorAll ^= x;
    // lowest set bit that differs between a and b
    int diff = xorAll & (-xorAll);
    int a = 0, b = 0;
    for (int x : nums) {
        if ((x & diff) != 0) a ^= x;
        else                 b ^= x;
    }
    return new int[]{a, b};
}
```

**Time:** O(n) · **Space:** O(1)

```text
nums = [1,2,1,3,2,5]
xorAll = 3 ^ 5 = 011 ^ 101 = 110
diff = xorAll & -xorAll = lowest set bit = 010

Group with bit1 set : 2,3,2  -> XOR = 3
Group with bit1 unset: 1,1,5  -> XOR = 5
Answer = [3, 5]
```

## Key points

- `x & (-x)` isolates the **lowest set bit** (two's complement trick).
- Any set bit of `xorAll` works; the lowest is simplest to compute.
- Duplicates always fall into the *same* group (identical bits), so they cancel within their group — correctness preserved.
- Extends the classic "XOR to find one unique" idea by adding a partition step.
