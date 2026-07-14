## Definition

**Synchronization** is the mechanism that controls access to a shared resource by multiple threads so that only **one thread at a time** can execute a critical section. In Java it is built on an intrinsic **monitor lock** (every object has one) and the `synchronized` keyword.

## Why It Is Needed

Without synchronization, concurrent read-modify-write operations interleave and produce a **race condition**:

```text
count = 0
Thread A reads 0 ─┐
Thread B reads 0 ─┤ both see 0
A writes 1        │
B writes 1        │  → final = 1 (should be 2!)  LOST UPDATE
```

## Two Forms

| Form | Lock acquired on | Scope |
|------|-----------------|-------|
| Synchronized **method** | `this` (instance) or `Class` object (static) | Whole method |
| Synchronized **block** | Any specified object | Only the enclosed statements |

### Synchronized method
```java
class Counter {
    private int count = 0;
    public synchronized void increment() { count++; }  // locks 'this'
    public synchronized int get() { return count; }
}
```

### Synchronized block (finer-grained, better performance)
```java
class Counter {
    private int count = 0;
    private final Object lock = new Object();
    public void increment() {
        // only this section is locked
        synchronized (lock) { count++; }
    }
}
```

- A synchronized **static** method locks the `Class` object, not an instance.
- Locks are **reentrant**: a thread already holding a lock can re-acquire it.

## Full Example

```java
public class SyncDemo {
    public static void main(String[] args) throws InterruptedException {
        Counter c = new Counter();
        Runnable job = () -> { for (int i = 0; i < 1000; i++) c.increment(); };
        Thread t1 = new Thread(job), t2 = new Thread(job);
        t1.start(); t2.start();
        t1.join();  t2.join();
        System.out.println(c.get());  // reliably 2000
    }
}
```

## Key points

- `synchronized` guarantees **mutual exclusion** and **visibility** (flushes to main memory).
- A synchronized block is preferred — it locks a **smaller** region, improving concurrency.
- Instance methods lock `this`; static methods lock the `Class` object.
- Intrinsic locks are **reentrant**, avoiding self-deadlock.
- Over-synchronizing hurts performance and can cause **deadlock**; lock only what is shared.
