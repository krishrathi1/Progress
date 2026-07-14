## Definition

**Inter-thread communication** lets cooperating threads coordinate by signaling each other instead of busy-waiting. Java provides three `Object` methods — `wait()`, `notify()`, and `notifyAll()` — that must be called **inside a synchronized block** while holding the object's monitor.

## The Three Methods

| Method | Effect |
|--------|--------|
| `wait()` | Releases the lock and puts the thread in **WAITING** until notified |
| `notify()` | Wakes **one** arbitrary waiting thread on that object |
| `notifyAll()` | Wakes **all** threads waiting on that object |

- Unlike `sleep()`, `wait()` **releases** the monitor lock so others can proceed.
- The awakened thread must **re-acquire** the lock before continuing.
- Always call `wait()` inside a `while` loop that checks the condition (guards against **spurious wakeups**).

## Producer–Consumer Example

```java
class Buffer {
    private int data;
    private boolean full = false;

    public synchronized void produce(int v) throws InterruptedException {
        while (full) wait();          // wait until consumed
        data = v; full = true;
        System.out.println("Produced " + v);
        notify();                     // signal consumer
    }
    public synchronized int consume() throws InterruptedException {
        while (!full) wait();         // wait until produced
        full = false;
        System.out.println("Consumed " + data);
        notify();                     // signal producer
        return data;
    }
}
```

## State Diagram

```text
Consumer: acquires lock -> full? no -> wait() [releases lock, WAITING]
Producer: acquires lock -> produce -> notify() -> releases lock
Consumer: re-acquires lock -> full? yes -> consume -> notify()
```

## Key points

- `wait()`, `notify()`, `notifyAll()` belong to **`Object`**, not `Thread`.
- They must be called while **holding the monitor** (inside `synchronized`), else `IllegalMonitorStateException`.
- `wait()` **releases** the lock; `sleep()` does not.
- Always re-check the condition in a **`while`** loop, never a single `if`.
- Prefer `notifyAll()` when multiple threads wait on different conditions to avoid missed signals.
- Higher-level tools (`BlockingQueue`, `Condition`, `Semaphore`) are usually safer than raw wait/notify.
