## Problem

Given the head of a singly linked list, reverse the nodes of the list **k at a time** and return the modified list. Nodes in a leftover group (fewer than `k`) are left **as-is**.

- `1 -> 2 -> 3 -> 4 -> 5`, `k = 2` → `2 -> 1 -> 4 -> 3 -> 5`
- `1 -> 2 -> 3 -> 4 -> 5`, `k = 3` → `3 -> 2 -> 1 -> 4 -> 5`

## Intuition

The list is broken into consecutive blocks of size `k`. Each full block is reversed independently, and the reversed blocks are stitched together in order. The two tricky parts are: (1) detecting whether a block has at least `k` nodes before touching it, and (2) reconnecting the tail of one reversed block to the head of the next.

## Approach 1 — Iterative, group by group (optimal)

- Walk `k` nodes ahead to confirm a full group exists; if not, stop.
- Reverse exactly those `k` nodes.
- Connect the previous group's tail to the new head, and remember the current group's tail (its old head) for the next round.

```java
class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode groupPrev = dummy;

        while (true) {
            // find the k-th node from groupPrev
            ListNode kth = groupPrev;
            for (int i = 0; i < k && kth != null; i++) kth = kth.next;
            if (kth == null) break;            // fewer than k left

            ListNode groupNext = kth.next;
            // reverse the group [groupPrev.next .. kth]
            ListNode prev = groupNext, cur = groupPrev.next;
            while (cur != groupNext) {
                ListNode nxt = cur.next;
                cur.next = prev;
                prev = cur;
                cur = nxt;
            }
            ListNode newTail = groupPrev.next; // old head becomes tail
            groupPrev.next = kth;              // link prev group to new head
            groupPrev = newTail;               // advance
        }
        return dummy.next;
    }
}
```

**Time:** O(n) · **Space:** O(1)

### Dry run (k = 2)

```text
dummy -> 1 -> 2 -> 3 -> 4 -> 5
kth=2, reverse [1,2]:  dummy -> 2 -> 1 -> 3 -> 4 -> 5
groupPrev = node(1)
kth=4, reverse [3,4]:  ... 1 -> 4 -> 3 -> 5
groupPrev = node(3)
only node 5 left (<k) -> stop
Result: 2 -> 1 -> 4 -> 3 -> 5
```

## Key points

- Use a **dummy node** so the first group's re-link is uniform.
- Always **verify k nodes exist** before reversing, else the last partial group would be wrongly flipped.
- Track `groupPrev` (link-in point) and the old head (becomes the tail / next `groupPrev`).
- Iterative O(1) space beats the recursive version, which costs O(n/k) stack depth.
