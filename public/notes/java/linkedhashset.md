## Definition

`LinkedHashSet<E>` is a `Set` implementation that extends `HashSet` and maintains a **doubly-linked list** running through all entries. This gives it the uniqueness and near-O(1) speed of a hash set **plus predictable insertion-order iteration**.

## Key characteristics

- **Unique elements** — no duplicates, like any `Set`.
- **Insertion order preserved** — iterating returns elements in the order they were first added.
- Allows a single `null` element.
- Backed internally by a `LinkedHashMap`.
- Not synchronized.

## How it works

```text
HashSet buckets provide O(1) lookup.
A separate linked list threads entries in insertion order:

 head -> [C] <-> [A] <-> [B] <-> [D] <- tail
           (iteration follows this chain, not bucket order)
```

Re-inserting an existing element does **not** change its position (unlike access-order in `LinkedHashMap`).

## Example

```java
import java.util.LinkedHashSet;
import java.util.Set;

public class Demo {
    public static void main(String[] args) {
        Set<String> s = new LinkedHashSet<>();
        s.add("charlie");
        s.add("alpha");
        s.add("bravo");
        s.add("charlie"); // duplicate ignored, position unchanged

        System.out.println(s); // [charlie, alpha, bravo]
    }
}
```

## Comparison

| Feature | `HashSet` | `LinkedHashSet` | `TreeSet` |
|---------|-----------|-----------------|-----------|
| Order | None | Insertion | Sorted |
| Speed | O(1) | O(1) | O(log n) |
| Memory | Lowest | Higher (link pointers) | Higher |
| Null | 1 | 1 | 0 |

## Key points

- Choose `LinkedHashSet` when you need **unique elements in a repeatable order** — e.g. removing duplicates while keeping original sequence.
- Slightly more memory than `HashSet` due to the linked list, but iteration is faster and predictable.
- Like `HashSet`, override `hashCode()` and `equals()` for custom types.
- Common idiom: `new LinkedHashSet<>(list)` deduplicates a list while preserving order.
