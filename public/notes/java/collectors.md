## Definition

A **`Collector`** describes how to accumulate the elements of a stream into a final result — a `List`, `Set`, `Map`, a joined `String`, a sum, groups, etc. It is used with the terminal operation `stream.collect(...)`. The utility class **`java.util.stream.Collectors`** provides ready-made factory methods.

```java
List<String> list = stream.collect(Collectors.toList());
```

## Common collectors

| Collector | Purpose |
|-----------|---------|
| `toList()`, `toSet()` | Collect into a `List` / `Set` |
| `toMap(k, v)` | Build a `Map` from key/value functions |
| `joining(sep, pre, post)` | Concatenate into one `String` |
| `counting()` | Count elements |
| `summingInt` / `averagingInt` | Numeric aggregation |
| `groupingBy(fn)` | Group into `Map<K, List<T>>` |
| `partitioningBy(pred)` | Split into `Map<Boolean, List<T>>` |
| `mapping`, `reducing` | Downstream transformations |

## Examples

```java
import java.util.*;
import java.util.stream.*;

record Person(String name, String city, int age) {}

List<Person> people = List.of(
    new Person("Al", "NYC", 30),
    new Person("Bo", "LA", 25),
    new Person("Cy", "NYC", 40));

// 1. Collect names into a list
List<String> names = people.stream()
    .map(Person::name)
    .collect(Collectors.toList());          // [Al, Bo, Cy]

// 2. Join into a string
String csv = people.stream()
    .map(Person::name)
    .collect(Collectors.joining(", ", "[", "]")); // [Al, Bo, Cy]

// 3. Group by city
Map<String, List<Person>> byCity = people.stream()
    .collect(Collectors.groupingBy(Person::city));

// 4. Group + downstream: average age per city
Map<String, Double> avgAge = people.stream()
    .collect(Collectors.groupingBy(
        Person::city, Collectors.averagingInt(Person::age)));

// 5. Partition adults vs minors
Map<Boolean, List<Person>> parts = people.stream()
    .collect(Collectors.partitioningBy(p -> p.age() >= 30));
```

## groupingBy visualized

```text
people ──groupingBy(city)──►  { "NYC": [Al, Cy],
                                "LA":  [Bo]        }
        + averagingInt(age) ►  { "NYC": 35.0, "LA": 25.0 }
```

## Key points

- `collect()` is a **terminal** operation; `Collectors` supplies the recipe.
- `toMap` throws on **duplicate keys** — pass a merge function `toMap(k, v, (a,b)->a)`.
- `groupingBy` accepts a **downstream collector** for nested aggregation (count, average, mapping).
- `partitioningBy` always yields exactly two keys: `true` and `false`.
- `Collectors.joining` is the idiomatic way to build delimited strings.
