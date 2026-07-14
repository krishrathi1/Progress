## Problem

Given the head of a singly linked list that may contain a cycle, return the **number of nodes in the loop**. If there is no loop, return `0`.

## Intuition

Once Floyd's fast/slow pointers collide, we are guaranteed to be *inside* the loop. From that meeting node, keep one pointer fixed and walk another around the loop counting steps until it returns — that count is the loop length.

## Approach 1: Hashing (Brute Force)

Record each node with the step index at which it was first seen. When a node repeats, the loop length is `currentStep - firstSeenStep`.

```java
public int lengthOfLoop(ListNode head) {
    Map<ListNode, Integer> pos = new HashMap<>();
    int step = 0;
    while (head != null) {
        if (pos.containsKey(head))
            return step - pos.get(head); // difference = loop size
        pos.put(head, step++);
        head = head.next;
    }
    return 0;
}
```

**Time:** O(n) · **Space:** O(n)

## Approach 2: Floyd's Algorithm (Optimal)

Detect the collision, then count nodes in one full lap from the meeting point.

```java
public int lengthOfLoop(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast)              // collision inside loop
            return countLoop(slow);
    }
    return 0;
}

private int countLoop(ListNode meet) {
    int count = 1;
    ListNode cur = meet.next;
    while (cur != meet) {              // walk until back to start
        count++;
        cur = cur.next;
    }
    return count;
}
```

**Time:** O(n) · **Space:** O(1)

### Dry run

```text
1 -> 2 -> 3 -> 4 -> 5 -> (back to 3)   loop = {3,4,5}, length 3

slow/fast meet at some node, say 4.
count from 4: 4(1) -> 5(2) -> 3(3) -> 4  stop.  length = 3
```

## Key points

- The meeting point from Floyd's is always inside the loop, so counting a full lap is safe.
- Optimal solution uses **O(1)** space; hashing costs O(n).
- Handle the no-loop case (`fast` reaches `null`) by returning 0.
