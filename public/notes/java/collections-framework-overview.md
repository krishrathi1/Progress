## Definition

The **Java Collections Framework (JCF)** is a unified architecture in `java.util` for storing and manipulating groups of objects. It provides a set of **interfaces** (contracts), **implementations** (concrete data structures), and **algorithms** (utility methods for sorting, searching, etc.), all working together through common interfaces.

## Three parts

- **Interfaces** — abstract types: `Collection`, `List`, `Set`, `Queue`, `Deque`, `Map`.
- **Implementations** — `ArrayList`, `LinkedList`, `HashSet`, `TreeSet`, `HashMap`, `PriorityQueue`, etc.
- **Algorithms** — static methods in `Collections` (sort, reverse, binarySearch, max) and `Arrays`.

## Hierarchy

```text
            Iterable
               |
          Collection ................... Map (separate root)
          /    |     \                    |
        List  Set   Queue         HashMap TreeMap LinkedHashMap
         |     |      |
   ArrayList HashSet Deque
  LinkedList TreeSet  |
             LinkedHashSet  ArrayDeque, PriorityQueue
```

Note: **`Map` is NOT a `Collection`** — it stores key-value pairs and has its own hierarchy.

## Core interfaces compared

| Interface | Order | Duplicates | Key trait |
|-----------|-------|-----------|-----------|
| `List` | Indexed, insertion order | Allowed | Positional access |
| `Set` | Depends (Hash/Tree) | Not allowed | Uniqueness |
| `Queue` | FIFO (usually) | Allowed | Head processing |
| `Deque` | Both ends | Allowed | Stack + Queue |
| `Map` | Depends | Unique keys | Key → value |

## Example

```java
import java.util.*;

public class Demo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(List.of("b", "a", "c"));
        Collections.sort(list);              // algorithm
        System.out.println(list);            // [a, b, c]

        Set<Integer> set = new HashSet<>(List.of(1, 2, 2, 3));
        System.out.println(set.size());      // 3 (no duplicates)

        Map<String, Integer> map = new HashMap<>();
        map.put("apple", 3);
        map.merge("apple", 1, Integer::sum); // 4
        System.out.println(map);
    }
}
```

## Benefits

- **Reusable** data structures — no reinventing lists/maps.
- **Interoperable** via common interfaces (program to `List`, not `ArrayList`).
- **Reduced effort** — ready algorithms, generics for type safety.
- Consistent, well-tested performance characteristics.

## Key points

- Root interface is `Collection` (extends `Iterable`); `Map` is separate.
- Choose implementation by need: `ArrayList` (random access), `LinkedList` (frequent insert/delete), `HashSet` (uniqueness, no order), `TreeSet`/`TreeMap` (sorted), `HashMap` (fast key lookup).
- Use generics (`List<String>`) for compile-time type safety.
- Legacy classes (`Vector`, `Hashtable`, `Stack`) predate JCF and are synchronized/slower.
