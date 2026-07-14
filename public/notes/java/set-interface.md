## Definition

The **`Set<E>`** interface (in `java.util`) models a collection that contains **no duplicate elements**. It extends `Collection<E>` but adds no new methods — instead it strengthens the contract: adding an element already present has no effect and `add` returns `false`.

Uniqueness is decided by `equals()` (and `hashCode()` for hash-based sets).

## Implementations

| Class | Backing structure | Order | `null` allowed | Extra cost |
|-------|-------------------|-------|----------------|-----------|
| `HashSet` | Hash table | None (unordered) | One null | O(1) ops |
| `LinkedHashSet` | Hash table + linked list | Insertion order | One null | Slightly more memory |
| `TreeSet` | Red-black tree | Sorted order | No null | O(log n) ops |

## Usage

```java
Set<String> set = new HashSet<>();
set.add("apple");
set.add("banana");
set.add("apple");        // duplicate ignored, returns false
System.out.println(set.size());       // 2
System.out.println(set.contains("banana")); // true

// Ordered / sorted variants
Set<String> ordered = new LinkedHashSet<>(); // keeps insertion order
Set<Integer> sorted = new TreeSet<>();       // ascending order
```

```text
add("apple"), add("banana"), add("apple")
   HashSet -> { apple, banana }   (duplicate rejected)
```

## Set algebra

```java
Set<Integer> a = new HashSet<>(List.of(1, 2, 3));
Set<Integer> b = new HashSet<>(List.of(2, 3, 4));
a.retainAll(b);   // intersection -> {2, 3}
// a.addAll(b);   // union
// a.removeAll(b);// difference
```

## equals/hashCode contract

For custom objects in a `HashSet`, override **both** `equals()` and `hashCode()` — otherwise two "equal" objects may both be stored.

## Key points

- `Set` = **no duplicates**; uniqueness via `equals`/`hashCode`.
- `HashSet` — fastest, unordered; `LinkedHashSet` — insertion order; `TreeSet` — sorted.
- No index-based access (`get(i)` does not exist) — iterate or use `contains`.
- `SortedSet`/`NavigableSet` (implemented by `TreeSet`) add `first`, `last`, `ceiling`, `floor`, range views.
- Ideal for membership tests, de-duplication, and set operations.
