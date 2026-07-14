## Definition

**`LinkedHashMap<K, V>`** is a `HashMap` subclass that maintains a **doubly-linked list** running through all its entries. This preserves a **predictable iteration order** — by default the **insertion order**, or optionally the **access order** — which a plain `HashMap` does not guarantee.

- Extends `HashMap`, implements `Map`.
- O(1) average `get`/`put` like `HashMap`, with slightly higher memory (extra before/after pointers per node).
- Allows one `null` key and multiple `null` values.

## Internal Structure

```text
Hash buckets (fast lookup)        Linked list (ordering)
[0] -> nodeA                      head -> A -> B -> C -> tail
[1] -> nodeC                      (each node keeps before/after refs)
[2] -> nodeB
```

Each entry lives in a hash bucket AND in the ordering list, so lookup stays O(1) while iteration follows the list.

## Insertion vs Access Order

```java
import java.util.*;

// Insertion order (default)
LinkedHashMap<String,Integer> ins = new LinkedHashMap<>();
ins.put("a",1); ins.put("b",2); ins.put("c",3);
ins.get("a");
System.out.println(ins); // {a=1, b=2, c=3}

// Access order: recently accessed moves to the end
LinkedHashMap<String,Integer> acc =
    new LinkedHashMap<>(16, 0.75f, true); // accessOrder = true
acc.put("a",1); acc.put("b",2); acc.put("c",3);
acc.get("a");
System.out.println(acc); // {b=2, c=3, a=1}
```

## Building an LRU Cache

Override `removeEldestEntry` to evict the least-recently-used entry:

```java
class LRU<K,V> extends LinkedHashMap<K,V> {
    private final int cap;
    LRU(int cap){ super(16, 0.75f, true); this.cap = cap; }
    protected boolean removeEldestEntry(Map.Entry<K,V> e){
        return size() > cap;
    }
}
```

## Comparison

| Feature | HashMap | LinkedHashMap | TreeMap |
|---------|---------|---------------|---------|
| Iteration order | undefined | insertion/access | sorted |
| get/put | O(1) | O(1) | O(log n) |
| Extra memory | low | higher (links) | moderate |

## Key points

- Use when you need **consistent, reproducible iteration order** without sorting cost.
- Access-order mode + `removeEldestEntry` gives a simple **LRU cache** in a few lines.
- Iteration is O(size) regardless of capacity (unlike `HashMap`, which scans buckets).
- Not synchronized; wrap with `Collections.synchronizedMap(...)` if shared across threads.
