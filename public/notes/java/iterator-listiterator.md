## Definition

An **`Iterator<E>`** is an object that provides a uniform way to traverse the elements of a collection **one at a time**, independent of the collection's internal structure. **`ListIterator<E>`** is a specialized sub-interface (available only for `List`) that adds **bidirectional** traversal and in-place modification.

## Iterator

Obtained via `collection.iterator()`. Core methods:

| Method | Purpose |
|--------|---------|
| `hasNext()` | true if more elements remain |
| `next()` | return next element, advance cursor |
| `remove()` | remove last returned element (safe removal) |

```java
import java.util.*;

List<String> list = new ArrayList<>(List.of("a","b","c"));
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String s = it.next();
    if (s.equals("b")) it.remove(); // safe structural removal
}
System.out.println(list); // [a, c]
```

Removing during a plain for-each loop throws `ConcurrentModificationException`; `Iterator.remove()` is the correct way.

## ListIterator

Obtained via `list.listIterator()`. Adds backward movement, index access, `set`, and `add`:

| Method | Purpose |
|--------|---------|
| `hasPrevious()` / `previous()` | traverse backward |
| `nextIndex()` / `previousIndex()` | cursor positions |
| `set(E)` | replace last returned element |
| `add(E)` | insert before the cursor |

```java
List<Integer> nums = new ArrayList<>(List.of(1,2,3));
ListIterator<Integer> lit = nums.listIterator();
while (lit.hasNext()) {
    int v = lit.next();
    lit.set(v * 10);      // replace in place
}
System.out.println(nums); // [10, 20, 30]

// Reverse walk
while (lit.hasPrevious())
    System.out.print(lit.previous() + " "); // 30 20 10
```

## Comparison

| Feature | Iterator | ListIterator |
|---------|----------|--------------|
| Applies to | any Collection | List only |
| Direction | forward only | forward + backward |
| Add element | no | `add()` |
| Replace element | no | `set()` |
| Index access | no | `nextIndex()/previousIndex()` |

```text
   previous() <---- cursor ----> next()
        [ a ][ b ][ c ][ d ]
              ^cursor between b and c
```

## Key points

- Use `Iterator.remove()` (not `List.remove`) to delete safely mid-iteration and avoid `ConcurrentModificationException`.
- `ListIterator` is the only standard way to **modify a list in place** while iterating.
- Both are **fail-fast** on hash/array collections; concurrent collections give weakly-consistent iterators.
- The enhanced for-loop uses an `Iterator` under the hood but exposes no `remove`/`set`.
