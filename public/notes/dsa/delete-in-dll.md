## Problem

Delete a node from a **Doubly Linked List**: remove the **head**, the **tail**, or a **given/arbitrary node**. The key advantage of a DLL is that deleting a node you already hold is O(1) because you can reach its predecessor via `prev`.

## Intuition

Deleting node `X` means **bypassing** it: make `X.prev` point forward to `X.next`, and `X.next` point back to `X.prev`. The two neighbours "shake hands" over the removed node. Boundary cases arise when `X` is the head (no prev) or tail (no next).

```text
Before:  A <-> X <-> B
After:   A <----> B      (X unlinked)
```

## Approach: unlink the target

```java
// Delete head, return new head
Node deleteHead(Node head) {
    if (head == null || head.next == null) return null;
    Node newHead = head.next;
    newHead.prev = null;
    head.next = null;      // help GC / avoid stray link
    return newHead;
}

// Delete tail, return head
Node deleteTail(Node head) {
    if (head == null || head.next == null) return null;
    Node tail = head;
    while (tail.next != null) tail = tail.next;
    tail.prev.next = null;
    tail.prev = null;
    return head;
}

// Delete an arbitrary node `X` (guaranteed non-null)
Node deleteNode(Node head, Node X) {
    Node before = X.prev;
    Node after  = X.next;
    if (before != null) before.next = after;
    else head = after;              // X was head
    if (after != null)  after.prev = before;
    X.prev = X.next = null;         // detach
    return head;
}
```

**Time:** O(1) when the node is given (O(n) if searching by value) · **Space:** O(1)

### Dry run — deleteNode(X = 20)

```text
List:  10 <-> 20 <-> 30
before = 10, after = 30
  10.next = 30
  30.prev = 10
  detach 20
Result: 10 <-> 30
```

## Boundary cases

| Case | Special handling |
|---|---|
| Delete head | `after.prev = null`; return `after` as new head |
| Delete tail | `before.next = null` |
| Single node | Return `null` (list becomes empty) |
| Middle node | Standard two-pointer rewire |

## Key points

- Deletion of a known node is **O(1)** in a DLL vs O(n) in a singly list.
- Update **both** `before.next` and `after.prev`, guarding each for null.
- Reassign `head` if the deleted node was the head.
- Null out the removed node's links to avoid dangling references.
