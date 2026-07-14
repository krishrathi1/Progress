## Problem

Given the heads of two singly linked lists, return the **node where they intersect** (the first shared node by reference), or `null` if they never merge. After the intersection the lists share all remaining nodes (Y-shape).

```text
A: a1 -> a2 \
             c1 -> c2 -> c3
B: b1 -> b2 -> b3 /
intersection = c1
```

## Intuition

The lists may have different lengths before the junction, but the **tails are identical**. If we can align the two pointers so they have the same number of steps left to travel, they will meet exactly at the intersection.

## Approach 1: Hash set (brute force)

Store every node of list A, then walk B looking for the first node already seen.

```java
ListNode getIntersection(ListNode a, ListNode b) {
    Set<ListNode> seen = new HashSet<>();
    for (ListNode t = a; t != null; t = t.next) seen.add(t);
    for (ListNode t = b; t != null; t = t.next)
        if (seen.contains(t)) return t;
    return null;
}
```

**Time:** O(n + m) · **Space:** O(n)

## Approach 2: Length difference

Compute both lengths, advance the longer list's pointer by the difference, then move together until they match.

```java
ListNode getIntersection(ListNode a, ListNode b) {
    int la = len(a), lb = len(b);
    while (la > lb) { a = a.next; la--; }
    while (lb > la) { b = b.next; lb--; }
    while (a != b) { a = a.next; b = b.next; }
    return a;
}
int len(ListNode h){ int n=0; while(h!=null){n++; h=h.next;} return n; }
```

**Time:** O(n + m) · **Space:** O(1)

## Approach 3: Two-pointer switch (optimal)

Each pointer walks its own list, then switches to the other head. After at most `n + m` steps both have traveled `la + lb` and meet at the junction (or both hit `null`).

```java
ListNode getIntersection(ListNode a, ListNode b) {
    ListNode p = a, q = b;
    while (p != q) {
        p = (p == null) ? b : p.next;
        q = (q == null) ? a : q.next;
    }
    return p; // intersection node or null
}
```

**Time:** O(n + m) · **Space:** O(1)

```text
p: a1 a2 c1 c2 c3 |b1 b2 b3 c1  <- meet
q: b1 b2 b3 c1 c2 c3 |a1 a2 c1  <- meet
both reach c1 after la+lb steps
```

## Key points

- Compare by **reference** (`==`), not by value — two nodes can share a value without being the same node.
- The switch trick works because `la + (lb - overlap)` equals `lb + (la - overlap)`; if no intersection, both become `null` simultaneously and the loop ends.
- Prefer approach 3: O(1) space and no explicit length computation.
