## Definition

A **thread pool** is a collection of pre-created, reusable worker threads that execute submitted tasks. Instead of creating a new `Thread` per task (expensive: stack allocation, OS scheduling, context switches), tasks are queued and picked up by idle workers. Java's `java.util.concurrent.ExecutorService` is the high-level API that manages such pools.

## Why use a pool?

- **Reuse** threads → avoids repeated create/destroy cost.
- **Throttling** → bounds the number of concurrent threads, preventing resource exhaustion.
- **Decoupling** → separates task *submission* from task *execution*.
- **Lifecycle & queue management** handled for you.

## Creating pools via `Executors`

| Factory method | Behavior |
|----------------|----------|
| `newFixedThreadPool(n)` | Exactly `n` threads; extra tasks wait in an unbounded queue. |
| `newCachedThreadPool()` | Creates threads on demand, reuses idle ones, reclaims after 60s. |
| `newSingleThreadExecutor()` | One worker; tasks run sequentially in order. |
| `newScheduledThreadPool(n)` | Runs tasks after a delay or periodically. |
| `newVirtualThreadPerTaskExecutor()` | (Java 21+) one virtual thread per task. |

## Core methods

- `submit(task)` → returns a `Future`.
- `execute(runnable)` → fire-and-forget.
- `shutdown()` → graceful; no new tasks, finishes queued ones.
- `shutdownNow()` → attempts to stop running tasks immediately.
- `awaitTermination(timeout, unit)` → blocks until done.

## Example

```java
import java.util.concurrent.*;

public class PoolDemo {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService pool = Executors.newFixedThreadPool(3);
        for (int i = 1; i <= 5; i++) {
            int id = i;
            pool.execute(() ->
                System.out.println("Task " + id + " on " +
                    Thread.currentThread().getName()));
        }
        pool.shutdown();                       // no new tasks accepted
        pool.awaitTermination(1, TimeUnit.MINUTES);
        System.out.println("All done");
    }
}
```

## ASCII: how it works

```text
 submit()          Task Queue            Worker Threads
  T1 T2 T3 T4 T5 ->  [T4][T5]  ->  ( W1:T1 )( W2:T2 )( W3:T3 )
                     (waiting)         reuse when free
```

For fine control use `ThreadPoolExecutor(core, max, keepAlive, unit, queue)` directly.

## Key points

- Prefer `ExecutorService` over manual `new Thread()` for scalable code.
- Always call `shutdown()` — non-daemon pool threads keep the JVM alive.
- `newFixedThreadPool` uses an **unbounded** queue → risk of OOM under load; use a bounded queue via `ThreadPoolExecutor` in production.
- Size CPU-bound pools ≈ number of cores; I/O-bound pools can be larger.
