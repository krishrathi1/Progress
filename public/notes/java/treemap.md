## Definition

**`TreeMap<K, V>`** is a `Map` implementation backed by a **Red-Black tree** (a self-balancing binary search tree). It keeps keys in **sorted order** — natural ordering (`Comparable`) or a supplied `Comparator`. It implements the **`NavigableMap`** (and `SortedMap`) interface, adding range and navigation queries.

- Keys are always sorted; iteration yields ascending key order.
- `get`, `put`, `remove`, `containsKey` are **O(log n)**.
- **No `null` keys** (comparison would throw `NullPointerException`); null values allowed.

## Internal Structure

```text
Red-Black tree keeps height ~ log n, so ordered
operations stay balanced:

           30(B)
          /     \
       20(R)    40(R)
       /  \        \
    10(B) 25(B)   50(B)

In-order traversal -> 10,20,25,30,40,50 (sorted)
```

## Navigation Methods

| Method | Returns |
|--------|---------|
| `firstKey()` / `lastKey()` | smallest / largest key |
| `floorKey(k)` | greatest key ≤ k |
| `ceilingKey(k)` | smallest key ≥ k |
| `lowerKey(k)` / `higherKey(k)` | strictly < / > k |
| `headMap(k)` / `tailMap(k)` | view below / from k |
| `subMap(a, b)` | keys in [a, b) |
| `descendingMap()` | reversed view |

## Example

```java
import java.util.*;

TreeMap<Integer,String> tm = new TreeMap<>();
tm.put(30,"c"); tm.put(10,"a"); tm.put(20,"b");

System.out.println(tm);            // {10=a, 20=b, 30=c}
System.out.println(tm.firstKey()); // 10
System.out.println(tm.ceilingKey(15)); // 20
System.out.println(tm.floorKey(25));   // 20
System.out.println(tm.subMap(10,30));  // {10=a, 20=b}

// Custom order via Comparator
TreeMap<String,Integer> desc =
    new TreeMap<>(Comparator.reverseOrder());
```

## Comparison

| Feature | HashMap | TreeMap |
|---------|---------|---------|
| Ordering | none | sorted keys |
| get/put | O(1) avg | O(log n) |
| Null key | 1 allowed | not allowed |
| Range queries | no | yes (NavigableMap) |

## Key points

- Choose `TreeMap` when you need **sorted keys** or **range/nearest-key** queries.
- Keys must be mutually `Comparable`, or you must pass a `Comparator`.
- Ordering must be **consistent with `equals`** to behave correctly as a `Map`.
- For sorted concurrent access, use `ConcurrentSkipListMap` instead.
