## Definition

- **`volatile`** is a field modifier guaranteeing **visibility** and **ordering**: a write to a volatile variable is immediately visible to all threads, and reads always fetch from main memory (not a CPU cache/register). It does **not** provide atomicity for compound actions.
- **Atomic variables** (`java.util.concurrent.atomic`, e.g. `AtomicInteger`) provide **lock-free**, thread-safe compound operations using **CAS** (compare-and-swap) hardware instructions.

## The visibility problem

```text
Thread A: running = false   (writes to its cached copy)
Thread B: while(running){}   (reads stale cached true -> infinite loop!)
```

Marking `running` as `volatile` forces reads/writes through main memory, so B sees the update.

## volatile: what it does and does NOT do

| Guarantee | volatile | synchronized/atomic |
|-----------|----------|---------------------|
| Visibility | Yes | Yes |
| Ordering (happens-before) | Yes | Yes |
| Atomic compound ops (i++) | **No** | Yes |
| Mutual exclusion | No | Yes (synchronized) |

`count++` is read-modify-write (3 steps). Even if `count` is volatile, two threads can interleave and lose an update.

## Example: volatile flag

```java
class Worker implements Runnable {
    private volatile boolean stop = false;   // visible to all threads
    public void stop() { stop = true; }
    public void run() {
        while (!stop) { /* work */ }
        System.out.println("Stopped cleanly");
    }
}
```

## Example: atomic counter

```java
import java.util.concurrent.atomic.AtomicInteger;

AtomicInteger counter = new AtomicInteger(0);
// safe across threads, no lock:
counter.incrementAndGet();          // atomic i++
counter.addAndGet(5);
boolean ok = counter.compareAndSet(6, 10); // set to 10 only if currently 6
```

## Common atomic classes

- `AtomicInteger`, `AtomicLong`, `AtomicBoolean`, `AtomicReference<T>`.
- Key method: `compareAndSet(expected, new)` → the CAS primitive.
- `LongAdder` scales better than `AtomicLong` under very high contention.

## Key points

- Use **`volatile`** for a simple flag/state read-write with no dependency on its previous value.
- Use **atomic classes** when you need atomic increment/compare-and-set without locks.
- Use **`synchronized`/locks** when multiple fields must change together as one invariant.
- `volatile` fixes visibility, not atomicity; CAS-based atomics fix both for a single variable.
