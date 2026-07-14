## Definition

A **deadlock** is a situation where two or more threads are **blocked forever**, each waiting for a resource (lock) that another holds. No thread can proceed, so the program hangs.

## Four Coffman Conditions

All four must hold simultaneously for a deadlock to occur:

| Condition | Meaning |
|-----------|---------|
| **Mutual exclusion** | A resource is held in a non-shareable mode |
| **Hold and wait** | A thread holds one lock while waiting for another |
| **No preemption** | Locks cannot be forcibly taken away |
| **Circular wait** | A cycle of threads each waiting on the next |

Breaking **any one** condition prevents deadlock.

## Classic Example

```java
public class DeadlockDemo {
    static final Object A = new Object(), B = new Object();
    public static void main(String[] args) {
        new Thread(() -> {
            synchronized (A) {
                sleep();
                synchronized (B) { System.out.println("T1 done"); }
            }
        }).start();
        new Thread(() -> {
            synchronized (B) {                 // opposite order!
                sleep();
                synchronized (A) { System.out.println("T2 done"); }
            }
        }).start();
    }
    static void sleep() { try { Thread.sleep(50);} catch(Exception e){} }
}
```

## Circular Wait Diagram

```text
   Thread 1 holds A, wants B
        A ◄──────── T1
        │            ▲
     wants B      holds B
        ▼            │
        T2 ───────► B
   Thread 2 holds B, wants A   → CYCLE = deadlock
```

## Prevention Techniques

- **Lock ordering**: always acquire locks in the same global order (e.g., A then B).
- **Lock timeout**: use `tryLock(timeout)` from `ReentrantLock` and back off on failure.
- **Avoid hold-and-wait**: acquire all needed locks at once, or none.
- **Reduce lock scope**: hold locks for the shortest time possible.

## Key points

- Deadlock requires **all four** Coffman conditions; break one to prevent it.
- The most practical fix is **consistent lock ordering**.
- `jstack` / thread dumps report deadlocks ("Found one Java-level deadlock").
- `ReentrantLock.tryLock()` allows deadlock-free acquisition with timeouts.
- Related hazards: **livelock** (threads keep reacting but make no progress) and **starvation**.
