## Definition

An iterator's behaviour when the underlying collection is **structurally modified** during iteration defines whether it is **fail-fast** or **fail-safe**.

- **Fail-fast**: throws `ConcurrentModificationException` (CME) immediately if the collection is modified after the iterator is created (except via the iterator's own `remove()`).
- **Fail-safe** (a.k.a. weakly consistent): does **not** throw; it iterates over a snapshot or tolerates concurrent changes, so modifications may not be reflected.

## How fail-fast detects change

Collections like `ArrayList` and `HashMap` keep an internal `modCount`. The iterator stores an `expectedModCount` at creation. On each `next()` it checks `modCount == expectedModCount`; a mismatch throws CME.

```java
import java.util.*;

List<String> list = new ArrayList<>(List.of("a", "b", "c"));
for (String s : list) {          // uses iterator internally
    if (s.equals("b"))
        list.remove(s);          // modifies structure -> CME on next()
}
```

The safe way to remove during iteration is the iterator's own method:

```java
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    if (it.next().equals("b")) it.remove();  // no exception
}
```

## Fail-safe example

```java
import java.util.concurrent.*;

ConcurrentHashMap<String,Integer> m = new ConcurrentHashMap<>();
m.put("x", 1); m.put("y", 2);
for (String k : m.keySet()) {
    m.put("z", 3);   // no ConcurrentModificationException
}
```

## Comparison

| Aspect | Fail-fast | Fail-safe |
|--------|-----------|-----------|
| On modification | Throws `ConcurrentModificationException` | No exception |
| Works on | Original collection | Clone / snapshot or weakly consistent view |
| Memory | Low | Higher (may copy) |
| Sees concurrent updates | N/A (fails) | May not reflect them |
| Examples | `ArrayList`, `HashMap`, `HashSet`, `Vector` iterators | `CopyOnWriteArrayList`, `ConcurrentHashMap` iterators |

## Key points

- Fail-fast is a **best-effort** detection (not guaranteed) — never rely on CME for program logic.
- Use `Iterator.remove()` to safely mutate a fail-fast collection while iterating.
- Fail-safe iterators come from `java.util.concurrent` collections and are weakly consistent.
- Trade-off: fail-fast = fast + low memory but fragile; fail-safe = robust for concurrency but may miss recent updates.
