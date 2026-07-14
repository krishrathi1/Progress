## Definition

The `for-each` loop (enhanced `for`, added in Java 5) iterates over **every element of an array or any `Iterable`** without an explicit index or iterator. It reads as "for each element in collection."

## Syntax

```java
for (Type element : arrayOrCollection) {
    // use element
}
```

```java
int[] nums = {10, 20, 30};
for (int n : nums) {
    System.out.print(n + " ");   // 10 20 30
}

List<String> names = List.of("Ann", "Bob");
for (String name : names) {
    System.out.println(name);
}
```

## How it works

For collections it is compiled into an `Iterator` loop:

```text
for (String s : names)  ⇄  Iterator<String> it = names.iterator();
                            while (it.hasNext()) {
                                String s = it.next();
                                ...
                            }
```

For arrays it becomes an indexed loop internally. This is why the class must implement `Iterable` to be used in a for-each.

## Limitations

- **No index available** — cannot easily know the position.
- **Read-only traversal** — you cannot replace array/collection elements through the loop variable (it is a copy of the reference/value).
- Cannot iterate **two structures in parallel** or go backwards.
- Modifying the collection during iteration throws `ConcurrentModificationException` (fail-fast).

## for vs for-each

| Aspect | Classic `for` | `for-each` |
|--------|--------------|-----------|
| Index access | Yes | No |
| Modify elements | Yes | No (safely) |
| Reverse / step | Yes | No |
| Readability | Lower | Higher |
| Works on | Arrays, ranges | Arrays + `Iterable` |

## Key points

- Cleaner and less error-prone for **read-only** traversal; no off-by-one or bounds bugs.
- Use a classic `for` when you need the **index**, to **modify** elements, or to iterate in reverse.
- Target must be an array or implement `Iterable`.
- Do not add/remove from the collection inside a for-each — use an explicit `Iterator.remove()` instead.
