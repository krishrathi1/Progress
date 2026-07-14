## Problem

Given the `head` of a singly linked list, **delete the middle node** and return the head of the modified list.

- The middle of a list with `n` nodes is the node at 0-indexed position `floor(n / 2)`.
- If the list has only one node, deletion leaves an empty list, so return `null`.

```text
1 -> 2 -> 3 -> 4 -> 5      n=5, mid index=2 (node 3)
result: 1 -> 2 -> 4 -> 5

1 -> 2 -> 3 -> 4           n=4, mid index=2 (node 3)
result: 1 -> 2 -> 4
```

## Intuition

To delete a node from a singly linked list we need a pointer to the node **before** it. The middle is found with the classic slow/fast technique. The trick is to stop `slow` at the node just before the middle so we can relink around it.

## Approach 1: Count length (brute force)

Traverse once to count `n`, then walk `n/2 - 1` steps to reach the node before the middle and unlink.

```java
ListNode deleteMiddle(ListNode head) {
    if (head == null || head.next == null) return null;
    int n = 0;
    for (ListNode t = head; t != null; t = t.next) n++;
    int prevIdx = n / 2 - 1;
    ListNode prev = head;
    for (int i = 0; i < prevIdx; i++) prev = prev.next;
    prev.next = prev.next.next;
    return head;
}
```

**Time:** O(n) (two passes) · **Space:** O(1)

## Approach 2: Slow/fast, one pass (optimal)

Advance `fast` by two before the loop so `slow` lands on the node *before* the middle. Then skip the middle.

```java
ListNode deleteMiddle(ListNode head) {
    if (head == null || head.next == null) return null;
    ListNode slow = head, fast = head.next.next;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    slow.next = slow.next.next; // unlink middle
    return head;
}
```

**Time:** O(n) (single pass) · **Space:** O(1)

```text
1 -> 2 -> 3 -> 4 -> 5
slow=1, fast=3
step: slow=2, fast=5
loop ends (fast.next == null)
slow(2).next = node4  =>  1 -> 2 -> 4 -> 5
```

## Key points

- Middle index = `floor(n/2)`; offsetting `fast` by two nodes makes `slow` stop just before it.
- Always guard the single-node case, which must return `null`.
- No extra space; the one-pass version avoids a separate length count.
