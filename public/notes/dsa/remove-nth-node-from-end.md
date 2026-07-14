## Problem

Given the head of a singly linked list and an integer `n`, **remove the nth node from the end** and return the head. Assume `1 <= n <= length`.

Example: `1 -> 2 -> 3 -> 4 -> 5`, `n = 2` → `1 -> 2 -> 3 -> 5`.

## Intuition

To delete a node you need its **predecessor**. Finding the nth node from the end normally needs the length, requiring two passes. A gap-based two-pointer trick does it in one pass.

## Approach 1: Two Pass (Brute Force)

Count length `L`, then walk `L - n` steps to reach the predecessor.

```java
public ListNode removeNthFromEnd(ListNode head, int n) {
    int len = 0;
    for (ListNode c = head; c != null; c = c.next) len++;
    if (n == len) return head.next;      // removing the head
    ListNode cur = head;
    for (int i = 1; i < len - n; i++) cur = cur.next; // stop at predecessor
    cur.next = cur.next.next;
    return head;
}
```

**Time:** O(n) (two passes) · **Space:** O(1)

## Approach 2: One Pass, Two Pointers (Optimal)

Use a dummy node. Advance `fast` by `n` steps, then move `fast` and `slow` together until `fast` hits the end — `slow` lands on the predecessor.

```java
public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode fast = dummy, slow = dummy;
    for (int i = 0; i < n; i++) fast = fast.next; // create gap of n
    while (fast.next != null) {                    // move together
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;   // unlink nth-from-end
    return dummy.next;
}
```

**Time:** O(n) (single pass) · **Space:** O(1)

### Dry run

```text
dummy -> 1 -> 2 -> 3 -> 4 -> 5,  n = 2
advance fast 2 steps: fast at node 2
move together until fast.next == null:
  slow: dummy->1->2->3   fast: 2->3->4->5
slow=3, slow.next=4 removed -> 1 2 3 5
```

## Key points

- The **dummy node** elegantly handles removing the head (n == length) without a special case.
- The gap between `fast` and `slow` stays exactly `n`, so `slow` stops one before the target.
- One-pass solution is preferred in interviews over the two-pass length approach.
