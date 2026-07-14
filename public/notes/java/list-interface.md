## Definition

The **`List<E>`** interface (in `java.util`) is an ordered collection — also called a **sequence**. It stores elements by **insertion order**, allows **duplicates**, and supports **positional (index-based) access** starting at 0.

It extends `Collection<E>` and adds index-related operations.

## Key characteristics

- **Ordered**: elements keep the order in which they were added.
- **Indexed**: access, insert, or remove by position `[0..size-1]`.
- **Duplicates allowed**: the same value can appear multiple times.
- **Nulls allowed** (in most implementations).

## Implementations

| Class | Backing structure | Best for | Thread-safe |
|-------|-------------------|----------|-------------|
| `ArrayList` | Dynamic array | Random access, iteration | No |
| `LinkedList` | Doubly linked list | Frequent insert/delete at ends | No |
| `Vector` | Dynamic array | Legacy code | Yes (synchronized) |
| `Stack` | Extends Vector | LIFO stack | Yes |

## Important methods

```java
List<String> list = new ArrayList<>();
list.add("A");            // append
list.add(0, "X");         // insert at index
list.get(1);              // read by index
list.set(1, "B");         // replace
list.remove(0);           // remove by index
list.indexOf("B");        // first position, -1 if absent
list.subList(0, 2);       // view of a range
Collections.sort(list);   // sort in place
```

## Traversal

```java
for (String s : list) System.out.println(s);   // for-each
ListIterator<String> it = list.listIterator();  // bidirectional
while (it.hasNext()) System.out.println(it.next());
```

```text
Index:   0    1    2
Value:  "X"  "B"  "A"
        ^ get(0)   ^ get(2)
```

## Key points

- `List` = ordered + indexed + duplicates allowed.
- Prefer `ArrayList` for reads/iteration; `LinkedList` for many head/tail edits.
- Use `List<E>` as the declared type; swap implementations freely.
- `ListIterator` allows forward and backward traversal plus in-place edits.
- `Vector`/`Stack` are legacy and synchronized — prefer `ArrayList`/`ArrayDeque`.
