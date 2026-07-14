## Problem
Reverse a singly linked list and return the new head.

## Intuition
Re-point each node's **next** to the node before it. Keep three pointers so you never lose the rest of the list while flipping a link.

## Approach 1 — Iterative (optimal)
~~~java
ListNode prev = null, curr = head;
while (curr != null) {
    ListNode next = curr.next; // save
    curr.next = prev;          // flip
    prev = curr;               // advance
    curr = next;
}
return prev;                   // new head
~~~
- **Time:** O(n) · **Space:** O(1)

## Approach 2 — Recursive
~~~java
ListNode reverse(ListNode head) {
    if (head == null || head.next == null) return head;
    ListNode newHead = reverse(head.next);
    head.next.next = head;  // make next node point back
    head.next = null;
    return newHead;
}
~~~
- **Time:** O(n) · **Space:** O(n) recursion stack

## Visual
~~~
null <- 1    2 -> 3 -> null      (mid-flip)
        prev curr
~~~

## Key points
- Always cache **curr.next** before overwriting it.
- Iterative is preferred in interviews for O(1) space.
