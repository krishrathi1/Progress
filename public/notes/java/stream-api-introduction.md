## Definition

The **Stream API** (`java.util.stream`, Java 8) is a functional-style abstraction for processing sequences of elements. A **stream** is *not* a data structure — it is a **pipeline** of operations over a source (collection, array, I/O channel) that produces a result. It does not store elements and does not modify the source.

## Core properties

- **No storage** — data lives in the source; the stream just describes computation.
- **Lazy** — intermediate operations run only when a terminal operation is invoked.
- **Single-use** — a stream can be traversed **once**; reusing it throws `IllegalStateException`.
- **Possibly infinite** — e.g. `Stream.iterate`, `Stream.generate`.

## Anatomy of a pipeline

```text
 SOURCE  -->  INTERMEDIATE ops  -->  TERMINAL op
 (list)      filter / map / sorted    collect / forEach / count
             (lazy, return Stream)     (eager, produces result)
```

| Stage | Returns | Eager/Lazy | Examples |
|-------|---------|-----------|----------|
| Source | Stream | — | `list.stream()`, `Arrays.stream(arr)` |
| Intermediate | Stream | Lazy | `filter`, `map`, `sorted`, `distinct`, `limit` |
| Terminal | Result/void | Eager | `collect`, `forEach`, `count`, `reduce`, `anyMatch` |

## Creating streams

```java
List<String> list = List.of("a", "bb", "ccc");

Stream<String> s1 = list.stream();
Stream<Integer> s2 = Stream.of(1, 2, 3);
IntStream s3 = IntStream.rangeClosed(1, 5);      // 1..5
Stream<Integer> s4 = Stream.iterate(1, n -> n*2).limit(4); // 1,2,4,8
```

## Example pipeline

```java
import java.util.*;
import java.util.stream.*;

public class Demo {
    public static void main(String[] args) {
        List<String> names = List.of("Alice", "Bob", "Charlie", "Dave");

        List<String> result = names.stream()          // source
            .filter(n -> n.length() > 3)               // intermediate
            .map(String::toUpperCase)                  // intermediate
            .sorted()                                  // intermediate
            .collect(Collectors.toList());             // terminal

        System.out.println(result); // [ALICE, CHARLIE, DAVE]
    }
}
```

## Key points

- Streams describe **what** to compute, not **how** — declarative style.
- Intermediate ops are **lazy** and chainable; nothing runs until a terminal op.
- A stream is **consumed once** — create a new one to iterate again.
- Use primitive streams (`IntStream`, `LongStream`, `DoubleStream`) to avoid boxing overhead.
- Streams do **not** mutate the underlying source.
