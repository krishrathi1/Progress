## Problem

Insert a new node into a **Doubly Linked List** at a required position: at the **head**, at the **tail**, or **before/after a given node**. Each insertion must correctly rewire up to four pointers.

## Intuition

Insertion in a DLL is about **surgically splicing** a node between two existing neighbours `left` and `right`. The new node's `prev` points to `left`, its `next` points to `right`, and both neighbours are updated to point back to the new node. Handle `null` neighbours (ends of the list) carefully.

```text
Before:  left <-> right
Insert X between them:
         left <-> X <-> right
```

## Approach: The four splice operations

```java
// Insert at head
Node insertHead(Node head, int val) {
    Node nn = new Node(val);
    nn.next = head;
    if (head != null) head.prev = nn;
    return nn; // new head
}

// Insert at tail
Node insertTail(Node head, int val) {
    Node nn = new Node(val);
    if (head == null) return nn;
    Node tail = head;
    while (tail.next != null) tail = tail.next;
    tail.next = nn;
    nn.prev = tail;
    return head;
}

// Insert AFTER a given node `p` (p != null)
void insertAfter(Node p, int val) {
    Node nn = new Node(val);
    nn.prev = p;
    nn.next = p.next;
    if (p.next != null) p.next.prev = nn;
    p.next = nn;
}

// Insert BEFORE a given node `p`
void insertBefore(Node p, int val) {
    Node nn = new Node(val);
    nn.next = p;
    nn.prev = p.prev;
    if (p.prev != null) p.prev.next = nn;
    p.prev = nn;
}
```

**Time:** O(1) if position/node known (O(n) if you must search for it) · **Space:** O(1)

### Dry run — insertAfter(node 20, 25)

```text
List:  10 <-> 20 <-> 30
p = 20
  nn.prev = 20
  nn.next = 30
  30.prev = 25
  20.next = 25
Result: 10 <-> 20 <-> 25 <-> 30
```

## Order of pointer updates matters

| Rule | Why |
|---|---|
| Set new node's links first | Don't lose the reference to `right` |
| Update neighbour `.prev` before overwriting `p.next` | Avoid dangling pointer |
| Guard `if (neighbour != null)` | Head/tail have a null side |

## Key points

- Every insert touches up to **4 pointers**: `nn.prev`, `nn.next`, `left.next`, `right.prev`.
- Always null-check the neighbour on the boundary side (head/tail).
- Set the new node's pointers before rewiring neighbours to avoid losing links.
- Insertion is O(1) when you already hold the reference node.
