## Definition

Both interfaces define how objects are **ordered**, but differ in where the logic lives:

- **`Comparable<T>`** (`java.lang`) — a class implements it to define its **natural ordering** via a single method `compareTo(T o)`. It is the object's "default" sort.
- **`Comparator<T>`** (`java.util`) — an **external** object that defines a custom ordering via `compare(T a, T b)`, without modifying the class. You can define many comparators for one class.

Each method returns a negative int (`this`/`a` first), zero (equal), or positive (`this`/`a` after).

## Comparable Example

```java
class Student implements Comparable<Student> {
    String name; int marks;
    Student(String n, int m){ name = n; marks = m; }
    public int compareTo(Student o){
        return Integer.compare(this.marks, o.marks); // by marks asc
    }
}

List<Student> s = new ArrayList<>(...);
Collections.sort(s); // uses compareTo
```

## Comparator Example

```java
// Sort by name, then by marks descending — no class change needed
Comparator<Student> byName =
    Comparator.comparing((Student x) -> x.name)
              .thenComparing(x -> x.marks, Comparator.reverseOrder());

s.sort(byName);
s.sort(Comparator.comparingInt(x -> x.marks)); // ad-hoc ordering
```

## Comparison

| Aspect | Comparable | Comparator |
|--------|------------|------------|
| Package | `java.lang` | `java.util` |
| Method | `compareTo(T)` | `compare(T, T)` |
| Ordering | single, natural | many, custom |
| Modifies class? | yes (implemented by class) | no (separate object) |
| Sort call | `Collections.sort(list)` | `list.sort(cmp)` |
| Used by | `TreeSet`/`TreeMap` default | passed to their constructor |

## Diagram

```text
Comparable: object knows how to compare ITSELF
   student.compareTo(other)

Comparator: a JUDGE compares TWO objects
   comparator.compare(a, b)
```

## Key points

- Use **`Comparable`** for the one obvious natural order (e.g., numeric id); use **`Comparator`** for alternative or multiple sort orders.
- Prefer `Integer.compare(a,b)` over `a - b` to avoid integer overflow bugs.
- Java 8+ combinators — `comparing`, `thenComparing`, `reversed`, `naturalOrder` — build complex orderings cleanly.
- Keep ordering **consistent with `equals`** for correct behavior in `TreeSet`/`TreeMap`.
- Both are functional interfaces at heart (`Comparator` is `@FunctionalInterface`), so lambdas work directly.
