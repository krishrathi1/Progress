## Problem

Given the head of a singly linked list, determine whether the list contains a **cycle** (a node whose `next` pointer points back to an earlier node). Return `true` if a loop exists, otherwise `false`.

## Intuition

A list without a loop simply ends at `null`. A list with a loop never reaches `null` while traversing. We need a way to detect that we are revisiting nodes without extra memory blowup.

## Approach 1: Hashing (Brute Force)

Store every visited node reference in a hash set. If we ever meet a node already in the set, there is a loop.

```java
public boolean hasCycle(ListNode head) {
    Set<ListNode> seen = new HashSet<>();
    while (head != null) {
        if (seen.contains(head)) return true; // revisited node
        seen.add(head);
        head = head.next;
    }
    return false; // reached null -> no loop
}
```

**Time:** O(n) · **Space:** O(n)

## Approach 2: Floyd's Cycle Detection (Optimal)

Use two pointers. `slow` moves one step, `fast` moves two. If there is a loop, `fast` eventually laps and meets `slow` inside the cycle. If `fast` hits `null`, the list ends — no loop.

```java
public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;        // +1
        fast = fast.next.next;   // +2
        if (slow == fast) return true; // pointers collide
    }
    return false;
}
```

**Time:** O(n) · **Space:** O(1)

### Dry run

```text
List: 1 -> 2 -> 3 -> 4 -> (back to 2)

step  slow  fast
0      1     1
1      2     3
2      3     5=... wraps: fast at 2 again
...    they meet inside cycle -> return true
```

Because the gap between the two pointers shrinks by 1 each step inside the cycle, they are guaranteed to collide.

## Key points

- Floyd's algorithm gives **O(1)** space vs O(n) for hashing.
- Loop condition must check both `fast != null` and `fast.next != null` to avoid NPE.
- Meeting point is somewhere inside the loop, not necessarily the loop start.
- This is the foundation for finding the loop's starting node and length.
