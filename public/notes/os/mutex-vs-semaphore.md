## Definition

Both **mutex** and **semaphore** are synchronization primitives, but they solve different problems.

- A **mutex** (mutual exclusion lock) is a locking mechanism: only the thread that **locked** it can **unlock** it. It enforces exclusive ownership of a resource.
- A **semaphore** is a signaling mechanism: an integer counter with atomic `wait`/`signal`. Any thread can signal it, and it can allow multiple threads in at once.

## Comparison

| Aspect | Mutex | Semaphore |
|--------|-------|-----------|
| Purpose | Locking (mutual exclusion) | Signaling / resource counting |
| Value | Locked / unlocked (binary) | Integer (0..N) |
| Ownership | Owned by locking thread | No ownership |
| Who releases | Only the owner | Any thread can signal |
| Allows N threads | No (exactly 1) | Yes (counting semaphore) |
| Use case | Protect one critical section | Manage N resources, order events |

## Key distinction: ownership

The core difference is **ownership**. With a mutex, the same thread must lock and unlock — this makes priority inheritance and error checking possible. A binary semaphore looks like a mutex but has **no owner**, so any thread can release it.

```text
Mutex:      Thread A locks --> only A can unlock
Semaphore:  Thread A waits  --> Thread B may signal
```

## Example

```java
// Mutex — ownership enforced
Lock mutex = new ReentrantLock();
mutex.lock();
try { /* critical section */ }
finally { mutex.unlock(); }   // must be same thread

// Semaphore — signaling between threads
Semaphore items = new Semaphore(0);
// Producer thread:
items.release();              // signal an item is ready
// Consumer thread:
items.acquire();              // wait for an item
```

## When to use which

- Use a **mutex** to protect a shared resource that only one thread may touch at a time.
- Use a **counting semaphore** to manage a pool of N identical resources.
- Use a **binary semaphore** for signaling between threads (e.g., producer notifying consumer).

## Key points

- Mutex = ownership + locking; semaphore = counting + signaling.
- Only the owner unlocks a mutex; any thread can signal a semaphore.
- Binary semaphore != mutex (no ownership).
- Mutex for exclusive access; counting semaphore for N resources.
