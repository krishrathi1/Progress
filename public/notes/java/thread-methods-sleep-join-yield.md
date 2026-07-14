## Definition

The `Thread` class provides methods to control **timing, ordering, and scheduling** of threads. `sleep()`, `join()`, and `yield()` are the three most commonly asked static/instance methods that influence how threads share CPU time.

## The Three Methods

| Method | Type | Effect | Releases lock? |
|--------|------|--------|----------------|
| `sleep(ms)` | static | Pauses **current** thread for at least `ms` milliseconds | No |
| `join()` | instance | Makes caller **wait** until the target thread finishes | No (waits) |
| `yield()` | static | Hints scheduler to let other **same-priority** threads run | No |

### sleep(long millis)
- Puts the currently executing thread into the **TIMED_WAITING** state.
- Throws `InterruptedException` (checked) — must be handled.
- Keeps any monitors/locks it holds; only pauses execution.

### join()
- Called on a thread object; the **calling** thread blocks until that thread dies.
- `join(ms)` waits at most `ms` milliseconds, then continues regardless.
- Essential for guaranteeing results are ready before the main thread reads them.

### yield()
- A **hint** to the scheduler that the current thread is willing to pause.
- No guarantee — the same thread may be rescheduled immediately. Platform-dependent.

## Example

```java
public class ThreadMethods {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            for (int i = 0; i < 3; i++) {
                System.out.println("Worker: " + i);
                Thread.yield();               // hint: let others run
                try { Thread.sleep(100); }    // pause 100 ms
                catch (InterruptedException e) { }
            }
        });
        worker.start();
        worker.join();                        // main waits for worker
        System.out.println("Worker finished, main continues");
    }
}
```

## Timeline Diagram

```text
main:    start()---- join() [BLOCKED] ----------> "main continues"
worker:        run 0 --sleep-- run 1 --sleep-- run 2 --DEAD--^
```

## Key points

- `sleep()` and `yield()` are **static** — they always act on the current thread.
- Neither `sleep()` nor `join()` releases held locks (unlike `wait()`).
- `sleep()` guarantees a **minimum** pause, not exact timing.
- `join()` is the standard way to wait for another thread's completion.
- `yield()` is only a scheduling hint and is rarely used in production code.
