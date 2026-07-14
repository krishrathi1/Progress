## Definition

`Deque<E>` ("double-ended queue", pronounced *deck*) is a `Queue` sub-interface allowing **insertion and removal at both ends**. `ArrayDeque<E>` is its resizable-array implementation — the recommended choice for both **stack** and **queue** use cases, faster than `Stack` and `LinkedList`.

## Deque method pairs

| Purpose | Head (first) | Tail (last) |
|---------|--------------|-------------|
| Insert (throws) | `addFirst(e)` | `addLast(e)` |
| Insert (special) | `offerFirst(e)` | `offerLast(e)` |
| Remove (throws) | `removeFirst()` | `removeLast()` |
| Remove (special) | `pollFirst()` | `pollLast()` |
| Examine | `peekFirst()` | `peekLast()` |

Stack aliases: `push` = `addFirst`, `pop` = `removeFirst`, `peek` = `peekFirst`.

## As queue vs as stack

```text
As FIFO Queue (offer tail, poll head):
   offerLast(A) offerLast(B)  ->  [A, B]
   pollFirst() -> A

As LIFO Stack (push/pop at head):
   push(A) push(B)            ->  [B, A]
   pop() -> B
```

## Example

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Demo {
    public static void main(String[] args) {
        Deque<Integer> dq = new ArrayDeque<>();

        // Use as a queue (FIFO)
        dq.offerLast(1);
        dq.offerLast(2);
        System.out.println(dq.pollFirst()); // 1

        // Use as a stack (LIFO)
        dq.push(10);   // addFirst
        dq.push(20);
        System.out.println(dq.pop()); // 20

        // Both ends
        dq.addFirst(0);
        dq.addLast(99);
        System.out.println(dq.peekFirst() + " " + dq.peekLast());
    }
}
```

## Comparison

| Class | Best for | Notes |
|-------|----------|-------|
| `ArrayDeque` | Stack & queue | No nulls; fast; not thread-safe |
| `LinkedList` | List + deque | Higher memory (node pointers) |
| `Stack` (legacy) | — | Synchronized, discouraged |

## Key points

- `ArrayDeque` **does not allow `null`** — `null` is used as an empty-return sentinel by `poll`/`peek`.
- Prefer `ArrayDeque` over the legacy `Stack` class for LIFO behaviour.
- Amortized O(1) for adds/removes at both ends; grows automatically by doubling.
- Not synchronized — use `ConcurrentLinkedDeque` or external locking for concurrent access.
