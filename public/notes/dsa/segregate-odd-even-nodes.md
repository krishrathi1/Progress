## Problem

Given the head of a singly linked list, group all nodes at **odd positions** together followed by nodes at **even positions** (1-indexed by position, *not* by value). Relative order within each group must be preserved. Solve in O(1) extra space.

Example: `1 -> 2 -> 3 -> 4 -> 5` becomes `1 -> 3 -> 5 -> 2 -> 4`.

## Intuition

Weave two sub-lists as you scan once: an odd chain and an even chain. Keep a pointer to the head of the even chain so you can stitch it onto the tail of the odd chain at the end.

## Approach 1: Value Copy (Brute Force)

Collect odd-position values, then even-position values, and rewrite the nodes.

```java
public ListNode oddEvenList(ListNode head) {
    List<Integer> vals = new ArrayList<>();
    int idx = 1;
    for (ListNode n = head; n != null; n = n.next, idx++)
        if (idx % 2 == 1) vals.add(n.val);
    idx = 1;
    for (ListNode n = head; n != null; n = n.next, idx++)
        if (idx % 2 == 0) vals.add(n.val);
    ListNode n = head;
    for (int v : vals) { n.val = v; n = n.next; }
    return head;
}
```

**Time:** O(n) · **Space:** O(n)

## Approach 2: Pointer Rewiring (Optimal)

```java
public ListNode oddEvenList(ListNode head) {
    if (head == null || head.next == null) return head;
    ListNode odd = head;
    ListNode even = head.next;
    ListNode evenHead = even;      // remember start of even chain
    while (even != null && even.next != null) {
        odd.next = even.next;      // link odd to next odd
        odd = odd.next;
        even.next = odd.next;      // link even to next even
        even = even.next;
    }
    odd.next = evenHead;           // attach evens after odds
    return head;
}
```

**Time:** O(n) · **Space:** O(1)

### Diagram

```text
1 -> 2 -> 3 -> 4 -> 5
odd:  1 -> 3 -> 5
even: 2 -> 4
join: 1 -> 3 -> 5 -> 2 -> 4
```

## Key points

- "Odd/even" refers to **node position**, not the stored value.
- The optimal version rewires pointers only — O(1) space, single pass.
- Save `evenHead` before the loop; you lose it otherwise.
- Loop guard `even != null && even.next != null` handles both even and odd length lists.
