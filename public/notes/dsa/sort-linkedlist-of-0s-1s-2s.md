## Problem

Given the `head` of a linked list whose node values are only **0, 1, or 2**, sort it in ascending order.

```text
input:  1 -> 2 -> 0 -> 2 -> 0 -> 1
output: 0 -> 0 -> 1 -> 1 -> 2 -> 2
```

## Intuition

Only three distinct values exist, so a comparison sort is overkill. Either **count** how many of each and rewrite, or **partition** the original nodes into three chains and stitch them together — the linked-list analogue of the Dutch National Flag idea.

## Approach 1: Counting (brute force)

Count 0s, 1s, 2s, then overwrite node values in order.

```java
ListNode sortList(ListNode head) {
    int[] c = new int[3];
    for (ListNode t = head; t != null; t = t.next) c[t.val]++;
    ListNode t = head;
    for (int v = 0; v < 3; v++)
        while (c[v]-- > 0) { t.val = v; t = t.next; }
    return head;
}
```

**Time:** O(n) (two passes) · **Space:** O(1)

## Approach 2: Relink into three lists (optimal)

Build separate 0/1/2 chains with dummy heads, then connect them. Rearranges links instead of touching values — works even if node data must be preserved.

```java
ListNode sortList(ListNode head) {
    ListNode zeroD = new ListNode(0), oneD = new ListNode(0), twoD = new ListNode(0);
    ListNode zero = zeroD, one = oneD, two = twoD;
    for (ListNode t = head; t != null; t = t.next) {
        if (t.val == 0)      { zero.next = t; zero = zero.next; }
        else if (t.val == 1) { one.next  = t; one  = one.next;  }
        else                 { two.next  = t; two  = two.next;  }
    }
    zero.next = (oneD.next != null) ? oneD.next : twoD.next; // join 0s -> 1s
    one.next  = twoD.next;                                   // join 1s -> 2s
    two.next  = null;                                        // terminate
    return zeroD.next;
}
```

**Time:** O(n) (single pass) · **Space:** O(1)

```text
1 2 0 2 0 1
zeros: 0 -> 0
ones:  1 -> 1
twos:  2 -> 2
join:  0 -> 0 -> 1 -> 1 -> 2 -> 2
```

## Key points

- Counting is simplest but mutates values; relinking is the "true" sort of nodes.
- Set `two.next = null` at the end, otherwise the last 2 may point back into the old list and create a cycle.
- Handle the case where the 1s chain is empty by connecting the 0s directly to the 2s.
