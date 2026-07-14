## Problem

A **Doubly Linked List (DLL)** is a linear data structure where each node holds a value and **two** pointers: one to the **next** node and one to the **previous** node. Unlike a singly linked list, a DLL can be traversed in **both directions**.

## Intuition

In a singly linked list you can only move forward. By adding a `prev` pointer to every node, you gain O(1) backward movement and O(1) deletion when you already hold a node reference (no need to find the predecessor). The cost is one extra pointer per node.

```text
 null <- [ 10 ] <-> [ 20 ] <-> [ 30 ] -> null
 head          prev/next            tail
```

## Node Definition and Construction

```java
class Node {
    int val;
    Node next;
    Node prev;
    Node(int val) { this.val = val; }
    Node(int val, Node next, Node prev) {
        this.val = val; this.next = next; this.prev = prev;
    }
}

// Build a DLL from an array
Node constructDLL(int[] arr) {
    Node head = new Node(arr[0]);
    Node prev = head;
    for (int i = 1; i < arr.length; i++) {
        Node cur = new Node(arr[i], null, prev);
        prev.next = cur;   // link forward
        prev = cur;        // advance
    }
    return head;
}
```

**Time:** O(n) to build · **Space:** O(n) for n nodes

### Dry run

```text
arr = [3, 4, 5]
head=3
  new 4: 4.prev=3, 3.next=4
  new 5: 5.prev=4, 4.next=5
Result: null<-3<->4<->5->null
```

## DLL vs Singly Linked List

| Feature | Singly LL | Doubly LL |
|---|---|---|
| Pointers per node | 1 (next) | 2 (next, prev) |
| Traversal | Forward only | Both directions |
| Delete given node | O(n) find prev | O(1) |
| Extra memory | Low | Higher |

## Key points

- Each node stores `val`, `next`, and `prev`.
- `head.prev == null` and `tail.next == null`.
- Bidirectional traversal enables O(1) deletion and easy backward iteration.
- Trade-off: one extra pointer per node and careful maintenance of two links on every insert/delete.
