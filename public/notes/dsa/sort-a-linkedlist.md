## Problem

Given the `head` of a singly linked list, **sort it in ascending order** and return the new head. Aim for `O(n log n)` time.

```text
input:  4 -> 2 -> 1 -> 3
output: 1 -> 2 -> 3 -> 4
```

## Intuition

Random access is `O(n)` in a linked list, so array-style quicksort partitioning is awkward. **Merge sort** fits perfectly: splitting a list at its middle and merging two sorted lists are both natural `O(n)` linked-list operations, and merging needs no extra array.

## Approach 1: Copy to array (brute force)

Dump values into an array, sort, write them back.

```java
ListNode sortList(ListNode head) {
    List<Integer> v = new ArrayList<>();
    for (ListNode t = head; t != null; t = t.next) v.add(t.val);
    Collections.sort(v);
    int i = 0;
    for (ListNode t = head; t != null; t = t.next) t.val = v.get(i++);
    return head;
}
```

**Time:** O(n log n) · **Space:** O(n)

## Approach 2: Merge sort on the list (optimal)

Split into halves with slow/fast, sort each recursively, then merge.

```java
ListNode sortList(ListNode head) {
    if (head == null || head.next == null) return head;
    ListNode slow = head, fast = head.next;
    while (fast != null && fast.next != null) {
        slow = slow.next; fast = fast.next.next;
    }
    ListNode mid = slow.next;
    slow.next = null;                 // cut list into two halves
    ListNode left = sortList(head);
    ListNode right = sortList(mid);
    return merge(left, right);
}

ListNode merge(ListNode a, ListNode b) {
    ListNode dummy = new ListNode(0), tail = dummy;
    while (a != null && b != null) {
        if (a.val <= b.val) { tail.next = a; a = a.next; }
        else                { tail.next = b; b = b.next; }
        tail = tail.next;
    }
    tail.next = (a != null) ? a : b;
    return dummy.next;
}
```

**Time:** O(n log n) · **Space:** O(log n) recursion stack

```text
4 2 1 3
split -> [4 2] [1 3]
split -> [4][2] [1][3]
merge -> [2 4] [1 3]
merge -> [1 2 3 4]
```

## Key points

- Merge sort is preferred over quicksort for lists: stable, guaranteed `O(n log n)`, no random access needed.
- Use `fast = head.next` when splitting so the left half is never larger than the right (prevents infinite recursion on 2-node lists).
- A dummy node simplifies the merge by removing head special-casing.
