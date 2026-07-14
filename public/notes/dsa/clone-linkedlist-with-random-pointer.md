## Problem

Given a linked list where each node has a `next` pointer and a `random` pointer (pointing to any node in the list or `null`), return a **deep copy** of the list. The cloned nodes must not reference any original node.

```text
node.val, node.next, node.random
```

## Intuition

The `next` pointers are easy to copy in one pass. The hard part is `random`: when you create a clone you may not yet have created the node its `random` points to. You need a way to map "original node → its clone" so you can resolve randoms afterward.

## Approach 1 — HashMap (better)

Two passes with a map `original -> clone`.

```java
class Solution {
    public Node copyRandomList(Node head) {
        Map<Node, Node> map = new HashMap<>();
        for (Node cur = head; cur != null; cur = cur.next)
            map.put(cur, new Node(cur.val));
        for (Node cur = head; cur != null; cur = cur.next) {
            map.get(cur).next   = map.get(cur.next);
            map.get(cur).random = map.get(cur.random);
        }
        return map.get(head);
    }
}
```

**Time:** O(n) · **Space:** O(n)

## Approach 2 — Interweaving clones (optimal, O(1) extra)

Insert each clone right after its original, so `orig.next` is its own clone. This encodes the mapping in the list structure itself.

```java
class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;

        // 1. clone A -> A' -> B -> B' ...
        for (Node cur = head; cur != null; cur = cur.next.next) {
            Node copy = new Node(cur.val);
            copy.next = cur.next;
            cur.next  = copy;
        }
        // 2. assign randoms: clone.random = cur.random.next
        for (Node cur = head; cur != null; cur = cur.next.next)
            if (cur.random != null) cur.next.random = cur.random.next;

        // 3. detach the two interleaved lists
        Node dummy = new Node(0), copyTail = dummy;
        for (Node cur = head; cur != null; cur = cur.next) {
            copyTail.next = cur.next;
            copyTail = copyTail.next;
            cur.next = cur.next.next;   // restore original
        }
        return dummy.next;
    }
}
```

**Time:** O(n) · **Space:** O(1) extra (ignoring output)

### Diagram (step 1 & 2)

```text
orig:  A -> B -> C
inter: A -> A' -> B -> B' -> C -> C'
random of A' = A.random.next  (clone of whatever A pointed to)
step 3 splits into A->B->C and A'->B'->C'
```

## Key points

- `random` needs an original→clone lookup; a HashMap gives it in O(n) space.
- The **interweaving trick** removes the map by storing the clone at `orig.next`.
- Set randoms via `cur.next.random = cur.random.next`.
- Remember to **restore** the original list's `next` pointers while detaching.
