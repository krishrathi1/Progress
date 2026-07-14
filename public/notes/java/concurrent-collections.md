## Definition

**Concurrent collections** (in `java.util.concurrent`) are thread-safe data structures designed for high-concurrency access **without** the coarse-grained locking of legacy synchronized collections (`Vector`, `Hashtable`, `Collections.synchronizedMap`). They use techniques like **lock striping**, **CAS** (compare-and-swap), and **copy-on-write** so multiple threads can operate mostly in parallel.

## Why not synchronized collections?

- `Collections.synchronizedMap` locks the **whole** map per operation → contention.
- Iterating them requires manual external synchronization, else `ConcurrentModificationException`.
- Concurrent collections offer **fail-safe** iterators (weakly consistent) that never throw CME.

## Main classes

| Class | Replaces | Technique |
|-------|----------|-----------|
| `ConcurrentHashMap` | `Hashtable` | Bucket/bin-level CAS + fine locks |
| `CopyOnWriteArrayList` | `synchronizedList` | Copies array on each write |
| `CopyOnWriteArraySet` | `synchronizedSet` | Backed by COW array |
| `ConcurrentLinkedQueue` | — | Lock-free (CAS) FIFO queue |
| `LinkedBlockingQueue` / `ArrayBlockingQueue` | — | Blocking producer-consumer |
| `ConcurrentSkipListMap` | `TreeMap` (sorted) | Lock-free skip list |

## Example: ConcurrentHashMap

```java
import java.util.concurrent.*;

public class CountWords {
    public static void main(String[] args) throws InterruptedException {
        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
        ExecutorService pool = Executors.newFixedThreadPool(4);

        for (int i = 0; i < 1000; i++)
            pool.execute(() -> map.merge("hits", 1, Integer::sum)); // atomic

        pool.shutdown();
        pool.awaitTermination(1, TimeUnit.MINUTES);
        System.out.println(map.get("hits"));   // 1000, no lost updates
    }
}
```

`merge`, `compute`, `putIfAbsent` are **atomic** — safe read-modify-write.

## When to use CopyOnWriteArrayList

```text
Reads: many, fast, lock-free (iterate a snapshot)
Writes: rare, expensive (whole array copied)
Ideal: listener lists, config that seldom changes
```

## Key points

- `ConcurrentHashMap` allows concurrent reads and segmented concurrent writes; **null keys/values not allowed**.
- Iterators are **weakly consistent** (fail-safe): reflect some but not necessarily all updates; never throw `ConcurrentModificationException`.
- Use compound atomic methods (`merge`, `computeIfAbsent`) instead of `get`-then-`put`.
- `CopyOnWriteArrayList` = read-heavy, write-rare workloads only.
- `BlockingQueue` implementations underpin producer-consumer patterns and thread pools.
