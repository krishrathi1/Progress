## Problem

Reverse a **Doubly Linked List** so that the last node becomes the head and the first node becomes the tail. Return the new head.

```text
Input:   1 <-> 2 <-> 3 <-> 4
Output:  4 <-> 3 <-> 2 <-> 1
```

## Intuition

In a DLL, reversing is beautifully simple: for **every** node just **swap its `prev` and `next` pointers**. After all swaps, the node that used to be the tail becomes the head. No value copying, no new nodes.

## Approach 1 — Swap data using a stack (brute force)

Push all values onto a stack, then pop them back into nodes front-to-back.

```java
Node reverseBrute(Node head) {
    Deque<Integer> st = new ArrayDeque<>();
    for (Node t = head; t != null; t = t.next) st.push(t.val);
    for (Node t = head; t != null; t = t.next) t.val = st.pop();
    return head;
}
```

**Time:** O(n) · **Space:** O(n)

## Approach 2 — Swap pointers in place (optimal)

Walk the list; for each node swap `prev`/`next`. Track the last processed node to return the new head.

```java
Node reverseDLL(Node head) {
    if (head == null || head.next == null) return head;
    Node cur = head, last = null;
    while (cur != null) {
        Node prev = cur.prev;
        // swap the two links
        cur.prev = cur.next;
        cur.next = prev;
        last = cur;            // remember node before moving on
        cur = cur.prev;        // this is the ORIGINAL next
    }
    return last;               // old tail = new head
}
```

**Time:** O(n) · **Space:** O(1)

### Dry run

```text
List: 1 <-> 2 <-> 3
cur=1: swap -> 1.next=null, 1.prev=2; cur = original next = 2
cur=2: swap -> 2.next=1,    2.prev=3; cur = 3
cur=3: swap -> 3.next=2,    3.prev=null; cur = null
last = 3  ->  new head
Result: 3 <-> 2 <-> 1
```

## Comparison

| Approach | Time | Space | Notes |
|---|---|---|---|
| Stack (swap data) | O(n) | O(n) | Simple, extra memory |
| Pointer swap | O(n) | O(1) | Preferred, in place |

## Key points

- Reversing a DLL = swapping `prev` and `next` on every node.
- After the swap, advance via `cur.prev` (which holds the **original** next).
- The last node visited (old tail) is the **new head** — return it.
- Handle empty and single-node lists as no-ops.
