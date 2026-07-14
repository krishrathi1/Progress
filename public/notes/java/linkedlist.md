## Definition

**`LinkedList<E>`** is a **doubly linked list** implementation of the `List`, `Deque`, and `Queue` interfaces in `java.util`. Each element (node) holds the data plus references to the **previous** and **next** nodes, so it can act as a list, stack, queue, or deque.

## Structure

```text
null <- [prev|A|next] <-> [prev|B|next] <-> [prev|C|next] -> null
        ^head                                        tail^
```

Each node = data + two pointers. There is **no backing array**, so no resizing and no index arithmetic — traversal walks node by node.

## Time complexity

| Operation | Complexity |
|-----------|------------|
| `addFirst` / `addLast` | O(1) |
| `removeFirst` / `removeLast` | O(1) |
| `get(i)` / `set(i)` | O(n) (must walk) |
| `add(i, e)` / `remove(i)` | O(n) to find + O(1) to relink |
| `contains` | O(n) |

## Usage as List, Queue and Deque

```java
LinkedList<String> ll = new LinkedList<>();
ll.add("B");
ll.addFirst("A");     // [A, B]
ll.addLast("C");      // [A, B, C]

// Queue (FIFO)
ll.offer("D");        // enqueue at tail
ll.poll();            // dequeue from head -> "A"

// Deque / Stack
ll.push("X");         // add at head
ll.pop();             // remove from head
ll.peekFirst();       // view head
```

## ArrayList vs LinkedList

| Feature | ArrayList | LinkedList |
|---------|-----------|-----------|
| Backing | Dynamic array | Doubly linked nodes |
| Random access `get(i)` | O(1) | O(n) |
| Insert/remove at ends | O(n) at front | O(1) |
| Memory per element | Low | Higher (2 pointers) |
| Cache locality | Good | Poor |

## Key points

- Choose `LinkedList` when you frequently add/remove at the **head or tail** (queue/deque use).
- Choose `ArrayList` when you need **fast index access** or iterate a lot.
- Implements `Deque`, so it's a natural stack/queue replacement (prefer `ArrayDeque` for pure stacks/queues — faster, less memory).
- Not synchronized; iterators are fail-fast.
