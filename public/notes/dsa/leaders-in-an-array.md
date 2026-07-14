## Problem

An element is a **leader** if it is **strictly greater than all elements to its right**. The rightmost element is always a leader. Return all leaders in their original left-to-right order.

- Example: `[10, 22, 12, 3, 0, 6]` → leaders `[22, 12, 6]`.

## Intuition

Whether an element is a leader depends only on the **maximum to its right**. Scanning from the right and keeping a running suffix-maximum lets us decide each element in O(1). Because we scan right to left, we collect leaders in reverse and flip at the end (or prepend).

## Brute force — check each rightward

```java
List<Integer> leadersBrute(int[] a) {
    List<Integer> res = new ArrayList<>();
    for (int i = 0; i < a.length; i++) {
        boolean leader = true;
        for (int j = i + 1; j < a.length; j++)
            if (a[j] >= a[i]) { leader = false; break; }
        if (leader) res.add(a[i]);
    }
    return res;
}
```

**Time:** O(n²) · **Space:** O(1)

## Optimal — suffix maximum from right

```java
List<Integer> leaders(int[] a) {
    List<Integer> res = new ArrayList<>();
    int maxRight = Integer.MIN_VALUE;
    for (int i = a.length - 1; i >= 0; i--) {
        if (a[i] > maxRight) {      // strictly greater than everything right
            res.add(a[i]);
            maxRight = a[i];
        }
    }
    Collections.reverse(res);       // restore original order
    return res;
}
```

**Time:** O(n) · **Space:** O(1) (excluding output)

## Dry run

```text
a = [10, 22, 12, 3, 0, 6]     maxRight = -inf
i=5  6 > -inf  -> leader, maxRight=6   res=[6]
i=4  0 > 6? no
i=3  3 > 6? no
i=2 12 > 6  -> leader, maxRight=12     res=[6,12]
i=1 22 > 12 -> leader, maxRight=22     res=[6,12,22]
i=0 10 > 22? no
reverse -> [22, 12, 6]
```

## Key points

- Traverse **right to left** so the "max to the right" is available in O(1).
- Use strict `>`; if the definition allows equals-as-leader, change to `>=`.
- The last element is always a leader (nothing to its right).
- Reverse at the end to recover left-to-right order; total O(n) time, O(1) extra space.
