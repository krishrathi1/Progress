## Definition

**`ReentrantLock`** (in `java.util.concurrent.locks`) is an explicit, object-based mutual-exclusion lock that is a more flexible alternative to the `synchronized` keyword. **Reentrant** means the thread holding the lock can acquire it again without deadlocking (a hold count is tracked); it must `unlock()` the same number of times.

## Why over `synchronized`?

- **Try-lock** with timeout: `tryLock(2, TimeUnit.SECONDS)` — avoid indefinite blocking.
- **Interruptible** acquisition: `lockInterruptibly()`.
- **Fairness** option: FIFO ordering of waiting threads.
- Multiple **`Condition`** objects per lock (finer wait/notify than one monitor).
- Lock/unlock can span methods (not block-structured).

## Canonical usage

```java
import java.util.concurrent.locks.*;

class Counter {
    private final ReentrantLock lock = new ReentrantLock();
    private int count = 0;

    public void increment() {
        lock.lock();               // acquire
        try {
            count++;               // critical section
        } finally {
            lock.unlock();         // ALWAYS release in finally
        }
    }
}
```

The `try/finally` is essential — unlike `synchronized`, the lock is **not** auto-released on exception or return.

## tryLock example

```text
if (lock.tryLock()) {
    try { /* got it, do work */ }
    finally { lock.unlock(); }
} else {
    // couldn't acquire -> do something else, no blocking
}
```

## synchronized vs ReentrantLock

| Aspect | `synchronized` | `ReentrantLock` |
|--------|----------------|-----------------|
| Acquire/release | Implicit (block) | Explicit lock/unlock |
| Try / timeout | No | `tryLock()` |
| Interruptible | No | `lockInterruptibly()` |
| Fairness | No | Optional (`new ReentrantLock(true)`) |
| Conditions | One (wait/notify) | Many (`newCondition()`) |
| Release on exception | Automatic | Must use `finally` |

## Related locks

- **`ReentrantReadWriteLock`** — separate read (shared) and write (exclusive) locks; many concurrent readers, one writer. Great for read-heavy data.
- **`Condition`** — `await()` / `signal()` replaces `wait()` / `notify()`.

## Key points

- Always `unlock()` in a `finally` block.
- Reentrant: same thread can re-lock; hold count must reach zero to release.
- Prefer `synchronized` for simple cases; use `ReentrantLock` when you need tryLock, timeout, fairness, interruptibility, or multiple conditions.
- Use `ReentrantReadWriteLock` to maximize concurrency on read-mostly structures.
