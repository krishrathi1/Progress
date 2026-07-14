## Definition

The **Collection interface hierarchy** is the set of interfaces in `java.util` that define the contracts for Java's data-structure classes. At the root sits `Iterable<T>`, extended by `Collection<E>`, which is the common super-interface for all groups of objects (except maps).

`Map` is **not** part of the `Collection` hierarchy — it models key-value pairs and forms a parallel branch.

## The hierarchy

```text
              Iterable
                 |
             Collection
        _________|_________________
       |         |                 |
      List      Set              Queue
       |       __|____             |
  ArrayList   |      |          Deque
  LinkedList Set   SortedSet      |
  Vector    HashSet   |        ArrayDeque
  Stack     Linked  NavigableSet LinkedList
            HashSet    |
                    TreeSet

   Map  (separate root)
    |________________
    |       |        |
 HashMap  SortedMap  Hashtable
 Linked      |
 HashMap  NavigableMap
             |
          TreeMap
```

## Core interfaces

| Interface | Order | Duplicates | Key implementations |
|-----------|-------|------------|---------------------|
| `List` | Insertion, indexed | Allowed | ArrayList, LinkedList, Vector |
| `Set` | Depends | Not allowed | HashSet, LinkedHashSet, TreeSet |
| `Queue` | FIFO / priority | Allowed | LinkedList, PriorityQueue |
| `Deque` | Both ends | Allowed | ArrayDeque, LinkedList |
| `Map` | Depends | Unique keys | HashMap, TreeMap, Hashtable |

## Common Collection methods

```java
Collection<String> c = new ArrayList<>();
c.add("a");          // insert
c.remove("a");       // delete
c.contains("a");     // membership
c.size();            // count
c.isEmpty();         // empty check
c.iterator();        // traversal
```

Because these methods are declared in `Collection`, code written against the interface works with any implementation (polymorphism).

## Key points

- Root of the hierarchy is `Iterable`, enabling the for-each loop.
- `Collection` unifies `List`, `Set`, and `Queue`; `Map` is separate.
- Program to the **interface** (`List<String> l = new ArrayList<>()`) for flexibility.
- `SortedSet`/`NavigableSet` and `SortedMap`/`NavigableMap` add ordering/navigation.
- Choosing the right interface first, then the implementation, is a common interview theme.
