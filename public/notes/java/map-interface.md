## Definition

The **`Map<K, V>`** interface (in `java.util`) models a collection of **key-value pairs** where every key is unique and maps to exactly one value. Unlike `List` or `Set`, `Map` does **not** extend the `Collection` interface — it is a separate top-level hierarchy.

- Keys form a **Set** (no duplicates); values may repeat.
- A key can map to at most one value; putting an existing key **replaces** the old value.
- Allows fast lookup, insertion, and deletion by key.

## Hierarchy

```text
              Map (interface)
             /    |        \
      HashMap  LinkedHashMap  SortedMap (interface)
                                  |
                               TreeMap
   Hashtable (legacy) also implements Map
```

## Core Methods

| Method | Purpose |
|--------|---------|
| `put(K,V)` | Insert/replace a mapping; returns old value or null |
| `get(Object k)` | Return value for key, or null |
| `getOrDefault(k, def)` | Return value or a fallback |
| `containsKey(k)` / `containsValue(v)` | Membership checks |
| `remove(k)` | Delete a mapping |
| `putIfAbsent(k,v)` | Insert only if key absent |
| `keySet()` / `values()` / `entrySet()` | Views for iteration |
| `size()` / `isEmpty()` | Cardinality |

## Example

```java
import java.util.*;

Map<String, Integer> stock = new HashMap<>();
stock.put("apple", 50);
stock.put("banana", 30);
stock.put("apple", 75);           // replaces 50

stock.putIfAbsent("cherry", 10);
int m = stock.getOrDefault("mango", 0); // 0

for (Map.Entry<String, Integer> e : stock.entrySet()) {
    System.out.println(e.getKey() + " -> " + e.getValue());
}
```

## Implementation Comparison

| Implementation | Order | Null key | Thread-safe | Get/Put |
|----------------|-------|----------|-------------|---------|
| `HashMap` | none | 1 allowed | No | O(1) avg |
| `LinkedHashMap` | insertion/access | 1 allowed | No | O(1) avg |
| `TreeMap` | sorted by key | No | No | O(log n) |
| `Hashtable` | none | No | Yes | O(1) avg |

## Key points

- `Map` is **not** a `Collection`; iterate via `entrySet()` (most efficient), `keySet()`, or `values()`.
- Keys must have consistent `hashCode()` and `equals()` for hash-based maps.
- Prefer `HashMap` for general use, `TreeMap` when ordering matters, `ConcurrentHashMap` for concurrency.
- Since Java 8: `compute`, `merge`, and `forEach` simplify aggregation logic.
