## Definition

A **race condition** occurs when two or more threads/processes access **shared data concurrently**, and the final result depends on the **order (timing) of execution**. Because scheduling is non-deterministic, the outcome varies between runs, producing incorrect or inconsistent results.

## Classic example: lost update

Two threads both run `count++`, which is really three machine steps: read, increment, write.

```text
Initial: count = 5

Thread A            Thread B            count
read 5                                    5
                    read 5                5
inc -> 6                                  5
                    inc -> 6              5
write 6                                   6
                    write 6              6   <-- should be 7!
```

Both increments should give 7, but interleaving loses one update -> final value is 6.

## Code that races

```java
class Counter {
    int count = 0;
    void increment() { count++; }        // NOT atomic
}
```

If many threads call `increment()`, the stored value is often less than the number of calls.

## Conditions needed for a race

- **Shared resource** accessed by multiple threads.
- At least one access is a **write**.
- No **synchronization** ordering the accesses.

## Fix: synchronization

```java
class Counter {
    private int count = 0;
    synchronized void increment() { count++; }  // mutual exclusion
}
```

Other fixes: mutex locks, semaphores, atomic variables (e.g., `AtomicInteger`), or lock-free CAS instructions.

## Race condition vs deadlock

| Race condition | Deadlock |
|----------------|----------|
| Wrong result from bad timing | Threads stuck forever waiting |
| Caused by missing sync | Caused by circular lock waiting |
| Fix: add synchronization | Fix: order/limit locks |

## Key points

- A race condition = outcome depends on execution timing of shared access.
- Needs a shared resource, a write, and no synchronization.
- Classic symptom: lost updates in `count++`.
- Prevent with mutual exclusion: locks, semaphores, atomics.
- Non-deterministic and hard to reproduce, making it a subtle bug.
