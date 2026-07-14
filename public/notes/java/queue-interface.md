## Definition

`Queue<E>` (in `java.util`) is a sub-interface of `Collection` that models a collection designed to **hold elements prior to processing**, typically in **FIFO (first-in, first-out)** order. The head is the element that has been in the queue the longest.

## Core methods (two flavours)

| Operation | Throws exception | Returns special value |
|-----------|------------------|-----------------------|
| Insert | `add(e)` | `offer(e)` → `false` if full |
| Remove | `remove()` | `poll()` → `null` if empty |
| Examine | `element()` | `peek()` → `null` if empty |

Prefer `offer`/`poll`/`peek` in production — they signal failure via return value instead of throwing, which matters for capacity-bounded queues.

## Common implementations

- **`LinkedList`** — unbounded FIFO queue (also a `Deque`).
- **`ArrayDeque`** — fast, resizable, the recommended general-purpose queue/stack.
- **`PriorityQueue`** — orders by priority (heap), not FIFO.
- **`ConcurrentLinkedQueue`, `ArrayBlockingQueue`** — thread-safe variants.

## FIFO behaviour

```text
offer(A) offer(B) offer(C)

 front                back
  [A] -> [B] -> [C]
   ^ peek() returns A
poll() removes A  ->  [B] -> [C]
```

## Example

```java
import java.util.Queue;
import java.util.LinkedList;

public class Demo {
    public static void main(String[] args) {
        Queue<String> q = new LinkedList<>();
        q.offer("A");
        q.offer("B");
        q.offer("C");

        System.out.println(q.peek()); // A (head, not removed)
        System.out.println(q.poll()); // A (removed)
        System.out.println(q.poll()); // B
        System.out.println(q);        // [C]
        System.out.println(q.poll()); // C
        System.out.println(q.poll()); // null (empty, no exception)
    }
}
```

## Key points

- `Queue` is FIFO by default; `PriorityQueue` and `Deque`-as-stack are exceptions.
- Use `offer/poll/peek` (safe) over `add/remove/element` (throwing) unless you want the exception.
- `Deque` extends `Queue` and supports insertion/removal at **both ends**.
- For blocking producer-consumer scenarios, use `BlockingQueue` implementations.
