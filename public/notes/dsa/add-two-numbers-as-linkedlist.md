## Problem

Two non-negative numbers are stored as linked lists with digits in **reverse order** (head = least significant digit). Add them and return the sum as a linked list in the same reversed format.

```text
l1: 2 -> 4 -> 3   (342)
l2: 5 -> 6 -> 4   (465)
sum: 7 -> 0 -> 8  (807)
```

## Intuition

Because the least significant digits sit at the heads, we can walk both lists **front to back in lockstep**, adding corresponding digits plus a running carry — exactly like grade-school column addition. No reversal needed.

## Approach: Simulate digit-by-digit addition (optimal)

Use a dummy head to build the result. Continue while either list has digits or a carry remains.

```java
ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0), tail = dummy;
    int carry = 0;
    while (l1 != null || l2 != null || carry != 0) {
        int sum = carry;
        if (l1 != null) { sum += l1.val; l1 = l1.next; }
        if (l2 != null) { sum += l2.val; l2 = l2.next; }
        carry = sum / 10;
        tail.next = new ListNode(sum % 10);
        tail = tail.next;
    }
    return dummy.next;
}
```

**Time:** O(max(n, m)) · **Space:** O(max(n, m)) for the output list

```text
   2 4 3   (l1, reversed)
 + 5 6 4   (l2, reversed)
digit0: 2+5      =7  carry 0 -> 7
digit1: 4+6      =10 carry 1 -> 0
digit2: 3+4+1    =8  carry 0 -> 8
result: 7 -> 0 -> 8
```

## Why the carry condition matters

If the final column produces a carry (e.g. `5 + 5 = 10`), the `carry != 0` term in the loop condition creates the extra leading node:

```text
l1: 5      l2: 5
digit0: 5+5=10 carry 1 -> 0
loop again (carry): 0+1=1 -> 1
result: 0 -> 1   (represents 10)
```

## Key points

- Reversed storage is what lets addition proceed straight from the heads.
- A dummy head removes special-casing for the first result node.
- Keep looping while `l1 || l2 || carry` so unequal lengths and a trailing carry are all handled.
- If digits were most-significant-first instead, you would reverse both inputs (or use two stacks) before applying this same logic.
