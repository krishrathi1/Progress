## Problem

Given the head of a singly linked list that may contain a cycle, return the **node where the cycle begins**. If there is no cycle, return `null`.

## Intuition

First detect the loop with Floyd's fast/slow pointers. The clever part is *why* resetting one pointer to head and moving both one step at a time lands exactly on the loop's entry node.

## Approach 1: Hashing (Brute Force)

Traverse and record visited nodes. The first node seen twice is the loop start.

```java
public ListNode detectCycle(ListNode head) {
    Set<ListNode> seen = new HashSet<>();
    while (head != null) {
        if (!seen.add(head)) return head; // add returns false if already present
        head = head.next;
    }
    return null;
}
```

**Time:** O(n) · **Space:** O(n)

## Approach 2: Floyd's Algorithm (Optimal)

Detect the collision, then reset `slow` to head. Advance `slow` and `fast` one step each; they meet at the cycle entry.

```java
public ListNode detectCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {            // loop confirmed
            slow = head;
            while (slow != fast) {     // walk both by 1
                slow = slow.next;
                fast = fast.next;
            }
            return slow;               // entry point
        }
    }
    return null;
}
```

**Time:** O(n) · **Space:** O(1)

### Why it works

```text
L = distance head -> loop start
C = loop length,  d = distance loop start -> meeting point

When they meet: slow travelled  L + d
                fast travelled  L + d + n*C  = 2(L + d)
=> L + d = n*C  =>  L = n*C - d
So a pointer from head (L steps) and a pointer from meeting
point both reach the loop start together.
```

## Key points

- Two phases: detect collision, then find entry.
- The equality `L = n*C - d` is the core proof — worth remembering.
- After reset, both pointers move at the **same** speed (1 step).
- Still O(1) extra space, unlike the hashing approach.
