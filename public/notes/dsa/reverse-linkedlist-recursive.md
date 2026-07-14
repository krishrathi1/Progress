## Problem

Reverse a **singly linked list** using **recursion** and return the new head.

```text
Input:   1 -> 2 -> 3 -> 4 -> 5 -> null
Output:  5 -> 4 -> 3 -> 2 -> 1 -> null
```

## Intuition

Trust the recursion: assume `reverse(head.next)` already reversed the rest of the list and returned its new head. The current node `head` is now the **tail** of that reversed part. So make `head.next.next = head` (the node in front points back to us) and set `head.next = null`. The new head bubbles up unchanged from the deepest call.

## Approach 1 — Iterative (baseline for comparison)

```java
Node reverseIter(Node head) {
    Node prev = null, cur = head;
    while (cur != null) {
        Node nxt = cur.next;
        cur.next = prev;
        prev = cur;
        cur = nxt;
    }
    return prev;
}
```

**Time:** O(n) · **Space:** O(1)

## Approach 2 — Recursive (target)

```java
Node reverseRec(Node head) {
    // base case: empty or single node
    if (head == null || head.next == null) return head;

    Node newHead = reverseRec(head.next); // reverse the rest
    Node front = head.next;               // node right after head
    front.next = head;                    // point it back to head
    head.next = null;                     // head becomes new tail
    return newHead;                       // unchanged all the way up
}
```

**Time:** O(n) · **Space:** O(n) recursion call stack

### Dry run

```text
reverseRec(1->2->3):
  reverseRec(2->3):
    reverseRec(3): base -> returns 3, newHead=3
    front = 2.next = 3;  3.next = 2;  2.next = null   => 3->2
    returns 3
  back in top call: newHead=3
  front = 1.next = 2;  2.next = 1;  1.next = null      => 3->2->1
  returns 3
Result: 3 -> 2 -> 1 -> null
```

## Iterative vs Recursive

| Aspect | Iterative | Recursive |
|---|---|---|
| Time | O(n) | O(n) |
| Space | O(1) | O(n) stack |
| Risk | None | Stack overflow on huge lists |
| Readability | Explicit | Elegant, concise |

## Key points

- Base case: `head == null || head.next == null` returns `head`.
- Core rewire: `head.next.next = head; head.next = null;`.
- The new head is returned **unchanged** through every level of recursion.
- Uses O(n) stack space — prefer the iterative version for very long lists.
