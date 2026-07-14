## Problem

Given the head of a singly linked list, return the **middle node**. If there are two middle nodes (even length), return the **second** one.

```text
1->2->3->4->5        middle = 3
1->2->3->4->5->6     middle = 4  (second of the two)
```

## Intuition

We could count the length then walk halfway, but that's two passes. The **tortoise and hare** (Floyd's slow/fast pointers) finds the middle in a **single pass**: move `slow` by 1 and `fast` by 2. When `fast` reaches the end, `slow` sits exactly at the middle.

## Approach 1 — Count length (brute force)

```java
Node middleBrute(Node head) {
    int n = 0;
    for (Node t = head; t != null; t = t.next) n++;
    Node t = head;
    for (int i = 0; i < n / 2; i++) t = t.next;
    return t;
}
```

**Time:** O(n) + O(n/2), two passes · **Space:** O(1)

## Approach 2 — Tortoise & Hare (optimal)

```java
Node middleNode(Node head) {
    Node slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;        // +1
        fast = fast.next.next;   // +2
    }
    return slow;                 // second middle for even length
}
```

**Time:** O(n), single pass · **Space:** O(1)

### Dry run — even length

```text
List: 1->2->3->4->5->6
start: slow=1, fast=1
step1: slow=2, fast=3
step2: slow=3, fast=5
step3: slow=4, fast=null  -> loop stops
return slow = 4   (second middle) ✔
```

### Why the loop condition matters

| Condition | Returns for even length |
|---|---|
| `fast != null && fast.next != null` | Second middle (LeetCode 876) |
| `fast.next != null && fast.next.next != null` | First middle |

## Key points

- Slow moves 1, fast moves 2; when fast hits the end, slow is the middle.
- Loop guard `fast != null && fast.next != null` returns the **second** middle on even length.
- Single pass, O(1) space — strictly better than length-counting.
- The same slow/fast pattern powers cycle detection and finding the nth-from-end node.
