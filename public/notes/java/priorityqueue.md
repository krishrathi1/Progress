## Definition

`PriorityQueue<E>` is an **unbounded queue backed by a binary min-heap**. Instead of FIFO order, the element retrieved by `peek()`/`poll()` is always the **smallest** according to natural ordering (`Comparable`) or a supplied `Comparator`.

## Key characteristics

- **Not FIFO** — order is by priority.
- `offer`/`add` and `poll`/`remove` are **O(log n)**; `peek` is **O(1)**.
- **No `null`** elements; elements must be comparable.
- **Not sorted internally** — only the head is guaranteed minimal; iteration order is arbitrary.
- Not thread-safe (use `PriorityBlockingQueue` for concurrency).

## Heap structure

```text
Min-heap after offering 5, 1, 8, 3:

        1            array: [1, 3, 8, 5]
       / \
      3   8          parent(i) = (i-1)/2
     /                child(i)  = 2i+1, 2i+2
    5

poll() -> 1, heap re-balances so 3 becomes the new root.
```

## Example

```java
import java.util.PriorityQueue;
import java.util.Collections;

public class Demo {
    public static void main(String[] args) {
        // Min-heap (default)
        PriorityQueue<Integer> min = new PriorityQueue<>();
        min.offer(5); min.offer(1); min.offer(8); min.offer(3);
        System.out.println(min.poll()); // 1
        System.out.println(min.poll()); // 3

        // Max-heap via reverse comparator
        PriorityQueue<Integer> max =
            new PriorityQueue<>(Collections.reverseOrder());
        max.offer(5); max.offer(1); max.offer(8);
        System.out.println(max.poll()); // 8

        // Custom priority: shortest string first
        PriorityQueue<String> byLen =
            new PriorityQueue<>((a, b) -> a.length() - b.length());
        byLen.offer("ccc"); byLen.offer("a"); byLen.offer("bb");
        System.out.println(byLen.poll()); // a
    }
}
```

## Key points

- Default is a **min-heap**; use `Collections.reverseOrder()` or a custom `Comparator` for a **max-heap**.
- Only the **head** is ordered — never rely on iteration or `toString()` for sorted output; drain via repeated `poll()`.
- Ideal for Dijkstra, Huffman coding, top-K, and task scheduling problems.
- Adding a non-comparable type without a comparator throws `ClassCastException` at runtime.
