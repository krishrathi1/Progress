## Problem

You are given a linked list where every node has two pointers:

- `next` — points to the next node in the main (horizontal) list.
- `bottom` (or `child`) — points to a **sorted** sub-linked-list.

Each `bottom` sub-list is itself sorted. Flatten the structure into a **single sorted list** using only the `bottom` pointer.

```text
5 -> 10 -> 19 -> 28
|     |     |     |
7    20    22    35
|           |     |
8          50    40
|                 |
30               45
Flatten -> 5 7 8 10 19 20 22 28 30 35 40 45 50
```

## Intuition

Each vertical `bottom` list is already sorted. Flattening is repeatedly **merging two sorted lists**. If we merge from the rightmost column toward the left, at each step we merge one already-flattened accumulator with the next column.

## Approach 1 — Collect all, then sort

Traverse every node, push values into an array, sort, rebuild a `bottom`-linked list.

```java
// gather values, Collections.sort, rebuild
```

**Time:** O(N log N) · **Space:** O(N) — ignores the sorted property; not ideal.

## Approach 2 — Merge column by column (optimal)

Recurse to flatten `head.next` first, then merge the current column with that flattened result.

```java
class Solution {
    Node merge(Node a, Node b) {
        Node dummy = new Node(0), tail = dummy;
        while (a != null && b != null) {
            if (a.data <= b.data) { tail.bottom = a; a = a.bottom; }
            else                  { tail.bottom = b; b = b.bottom; }
            tail = tail.bottom;
            tail.next = null;
        }
        tail.bottom = (a != null) ? a : b;
        return dummy.bottom;
    }

    Node flatten(Node root) {
        if (root == null || root.next == null) return root;
        root.next = flatten(root.next);       // flatten rest first
        root = merge(root, root.next);        // merge this column in
        return root;
    }
}
```

**Time:** O(N × M) total node moves (N columns, M avg column length) · **Space:** O(N) recursion stack for the `next` chain.

### Dry run

```text
flatten reaches last column (28-22-35-... etc.), returns it
merge column(19,22,50) with flattened(28-35-40-45) -> sorted bottom list
keep merging leftward until single sorted bottom list remains
```

## Key points

- The core operation is the classic **merge two sorted lists**; reuse it.
- Always null out `tail.next` while merging so the result uses only `bottom`.
- Recurse on `next` **before** merging so you fold from right to left.
- Merging is stable and preserves sorted order because every sub-list is pre-sorted.
