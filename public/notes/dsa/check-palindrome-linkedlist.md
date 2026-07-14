## Problem

Given the head of a singly linked list, return `true` if the sequence of node values reads the same **forwards and backwards** (a palindrome), otherwise `false`.

Example: `1 -> 2 -> 2 -> 1` is a palindrome; `1 -> 2 -> 3` is not.

## Intuition

A singly list can only be traversed forward, so comparing "ends" is awkward. Either copy values into an array (easy) or, better, reverse the second half in place and compare the two halves.

## Approach 1: Array Copy (Brute Force)

Copy values into a list, then use two indices from both ends.

```java
public boolean isPalindrome(ListNode head) {
    List<Integer> vals = new ArrayList<>();
    for (ListNode n = head; n != null; n = n.next) vals.add(n.val);
    int i = 0, j = vals.size() - 1;
    while (i < j)
        if (!vals.get(i++).equals(vals.get(j--))) return false;
    return true;
}
```

**Time:** O(n) · **Space:** O(n)

## Approach 2: Reverse Second Half (Optimal)

Find the middle with slow/fast, reverse the second half, then compare node by node.

```java
public boolean isPalindrome(ListNode head) {
    if (head == null || head.next == null) return true;
    ListNode slow = head, fast = head;
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;      // slow ends at middle
    }
    slow.next = reverse(slow.next); // reverse 2nd half
    ListNode first = head, second = slow.next;
    while (second != null) {
        if (first.val != second.val) return false;
        first = first.next;
        second = second.next;
    }
    return true;
}

private ListNode reverse(ListNode head) {
    ListNode prev = null;
    while (head != null) {
        ListNode nxt = head.next;
        head.next = prev;
        prev = head;
        head = nxt;
    }
    return prev;
}
```

**Time:** O(n) · **Space:** O(1)

### Dry run

```text
1 -> 2 -> 2 -> 1
mid at first 2; reverse tail 2->1  =>  1
compare: 1==1, 2==2  -> true
```

## Key points

- Optimal method mutates the list; restore it afterward if the caller needs the original order.
- Middle-finding condition `fast.next && fast.next.next` places `slow` at the end of the first half.
- Array approach is simpler but costs O(n) space — mention the trade-off in interviews.
