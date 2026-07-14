## Definition

A **parallel stream** splits its elements into multiple chunks, processes them **concurrently** on several threads, and combines the partial results. It lets you exploit multi-core CPUs with almost no code change, using the **common ForkJoinPool** under the hood.

```java
long count = list.parallelStream()          // from a collection
    .filter(x -> x > 100)
    .count();

int sum = IntStream.rangeClosed(1, 1_000_000)
    .parallel()                             // convert sequential -> parallel
    .sum();
```

## How it works

```text
             [ 1 .. 8 ]  source
                 |  spliterator splits
        ┌────────┴────────┐
     [1..4]            [5..8]     run on different threads
     map/filter        map/filter
        └────────┬────────┘
              combine (reduce)  -> final result
```

Work is divided by a **Spliterator**, executed on the shared `ForkJoinPool.commonPool()` (default size = number of CPU cores − 1), then merged.

## When it helps vs hurts

| Favors parallel | Favors sequential |
|-----------------|-------------------|
| Large data sets (10k+ elements) | Small collections |
| CPU-intensive, independent work | Cheap per-element work |
| Splittable sources (`ArrayList`, arrays, `IntStream.range`) | `LinkedList`, I/O-bound tasks |
| Stateless, associative operations | Ordered / stateful operations |

## Correctness rules

- Operations must be **stateless** and **non-interfering** (don't modify the source).
- Reduction functions must be **associative** — `reduce`/`collect` merge partial results in arbitrary order.
- **Never** mutate shared state from a lambda; use a proper `Collector` or `reduce` instead.

```java
// WRONG: shared mutable list -> race condition
List<Integer> out = new ArrayList<>();
nums.parallelStream().forEach(out::add);   // not thread-safe!

// RIGHT
List<Integer> out2 = nums.parallelStream()
    .collect(Collectors.toList());
```

## Ordering note

Use `forEachOrdered` if encounter order matters; plain `forEach` gives no ordering guarantee in parallel.

## Key points

- Create via `collection.parallelStream()` or `stream.parallel()`.
- Runs on the shared `ForkJoinPool.commonPool()` — sized to available cores.
- Only pays off for **large, CPU-bound** workloads with splittable sources; measure before assuming a speedup.
- Requires **stateless, associative, non-interfering** operations to be correct.
- Avoid shared mutable state; prefer `collect`/`reduce`. Use `forEachOrdered` when order matters.
