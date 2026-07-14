## Problem

Given the head of a singly linked list, rotate the list to the **right** by `k` places.

- `1 -> 2 -> 3 -> 4 -> 5`, `k = 2` → `4 -> 5 -> 1 -> 2 -> 3`
- `k` can be larger than the list length.

## Intuition

Rotating right by `k` means the last `k` nodes move to the front. Since rotating by the full length returns the original list, the effective shift is `k % len`. The clean trick is to join the list into a **circle**, then break it at the correct point.

## Approach 1 — Brute force (move one node k times)

Repeatedly detach the tail node and put it at the front, `k` times.

```java
for (int i = 0; i < k % len; i++) {
    // find node before tail, move tail to head
    ListNode prev = head;
    while (prev.next.next != null) prev = prev.next;
    ListNode tail = prev.next;
    prev.next = null;
    tail.next = head;
    head = tail;
}
```

**Time:** O(k · n) · **Space:** O(1) — too slow when k is large.

## Approach 2 — Make it circular then cut (optimal)

- Count length `len` and find the tail.
- Connect `tail.next = head` to form a ring.
- The new tail is at position `len - k % len` (1-indexed from start). Walk there, and the node after it is the new head.

```java
class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) return head;

        // length + tail
        int len = 1;
        ListNode tail = head;
        while (tail.next != null) { tail = tail.next; len++; }

        k %= len;
        if (k == 0) return head;

        tail.next = head;                 // close the ring
        int stepsToNewTail = len - k;     // walk to new tail
        ListNode newTail = head;
        for (int i = 1; i < stepsToNewTail; i++) newTail = newTail.next;

        ListNode newHead = newTail.next;
        newTail.next = null;              // break the ring
        return newHead;
    }
}
```

**Time:** O(n) · **Space:** O(1)

### Dry run (k = 2, len = 5)

```text
list: 1 2 3 4 5, close ring -> 5 points to 1
k % len = 2, stepsToNewTail = 5 - 2 = 3
walk 3 nodes -> newTail = node(3), newHead = node(4)
cut after 3:  4 -> 5 -> 1 -> 2 -> 3
```

## Key points

- Reduce `k` with `k % len` first — the single biggest speedup.
- Forming a ring avoids null-handling of separate segments.
- New tail index = `len - k`; the node after it is the new head.
- Handle edge cases: empty list, single node, or `k % len == 0` (no change).
