## Definition

`HashSet<E>` is a class in `java.util` that implements the `Set` interface. It stores **unique elements** with **no guaranteed order** and permits **one `null`** element. Internally it is backed by a `HashMap`, where each element is stored as a key and a shared dummy `PRESENT` object is the value.

## Key characteristics

- **No duplicates** — `add()` returns `false` if the element already exists.
- **Unordered** — iteration order is not predictable and may change over time.
- **Not synchronized** — wrap with `Collections.synchronizedSet(...)` for thread safety.
- **O(1) average** for `add`, `remove`, `contains` (assuming good hashing).

## How it works internally

```text
HashSet.add("A")  ->  backingMap.put("A", PRESENT)

buckets (array of nodes)
 index = hash("A") & (capacity - 1)
 ┌───┬───┬───┬───┐
 │   │ A │   │ C │   collisions form a linked list / tree (Java 8+)
 └───┴───┴───┴───┘
```

Uniqueness relies on `hashCode()` to pick the bucket and `equals()` to compare within it. Custom objects **must override both** or duplicates may sneak in.

## Example

```java
import java.util.HashSet;
import java.util.Set;

public class Demo {
    public static void main(String[] args) {
        Set<String> s = new HashSet<>();
        s.add("apple");
        s.add("banana");
        System.out.println(s.add("apple")); // false (duplicate)
        s.add(null);                          // allowed once

        System.out.println(s.contains("banana")); // true
        System.out.println(s.size());              // 3
        s.remove("apple");
        System.out.println(s); // order not guaranteed, e.g. [null, banana]
    }
}
```

## Set implementations compared

| Class | Ordering | Null | Performance | Backed by |
|-------|----------|------|-------------|-----------|
| `HashSet` | None | 1 null | O(1) avg | HashMap |
| `LinkedHashSet` | Insertion order | 1 null | O(1) avg | LinkedHashMap |
| `TreeSet` | Sorted | No null | O(log n) | TreeMap |

## Key points

- Use `HashSet` when you need **fast membership tests** and order does not matter.
- Always override `hashCode()` **and** `equals()` together for custom element types.
- Initial capacity (default 16) and load factor (0.75) affect rehashing cost.
- Iteration is O(capacity + size), so avoid a huge capacity for a tiny set.
