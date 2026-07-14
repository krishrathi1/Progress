## Problem

A non-negative number is stored as a singly linked list where the **head is the most significant digit** (each node holds one digit 0-9). Add `1` to the number and return the head of the resulting list.

```text
input:  1 -> 5 -> 9      (159)
output: 1 -> 6 -> 0      (160)

input:  9 -> 9 -> 9      (999)
output: 1 -> 0 -> 0 -> 0 (1000)
```

## Intuition

Addition carries from the **least significant digit**, which is the *tail*. But the list only points forward from the head. Two ways around this: physically reverse the list, or use recursion whose unwinding visits nodes tail-first for free.

## Approach 1: Reverse, add, reverse (intuitive)

Reverse so the tail becomes the head, add 1 with carry, reverse back.

```java
ListNode addOne(ListNode head) {
    head = reverse(head);
    ListNode t = head; int carry = 1;
    while (t != null) {
        int sum = t.val + carry;
        t.val = sum % 10; carry = sum / 10;
        if (carry == 0) break;
        if (t.next == null && carry > 0) { t.next = new ListNode(carry); carry = 0; break; }
        t = t.next;
    }
    return reverse(head);
}
ListNode reverse(ListNode h){ ListNode p=null; while(h!=null){ListNode n=h.next; h.next=p; p=h; h=n;} return p; }
```

**Time:** O(n) · **Space:** O(1)

## Approach 2: Recursion returns carry (optimal, no reversal)

Recurse to the tail; each call adds the incoming carry and returns the outgoing carry. If the head still carries, prepend a new leading `1`.

```java
ListNode addOne(ListNode head) {
    int carry = helper(head);
    if (carry == 1) {
        ListNode newHead = new ListNode(1);
        newHead.next = head;
        return newHead;
    }
    return head;
}
int helper(ListNode node) {
    if (node == null) return 1;          // the +1 seed
    int sum = node.val + helper(node.next);
    node.val = sum % 10;
    return sum / 10;                     // carry to previous node
}
```

**Time:** O(n) · **Space:** O(n) recursion stack

```text
9 -> 9 -> 9
helper(null)=1
node3: 9+1=10 -> val 0, carry 1
node2: 9+1=10 -> val 0, carry 1
node1: 9+1=10 -> val 0, carry 1
head carry=1 => prepend 1
result: 1 -> 0 -> 0 -> 0
```

## Key points

- The all-9s case grows the list by one node — handle the final carry after processing the head.
- Recursion elegantly walks tail-first without mutating link direction.
- The reverse-based version keeps `O(1)` space if recursion depth is a concern.
