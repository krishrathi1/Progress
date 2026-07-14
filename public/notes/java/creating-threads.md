## Overview

Java provides several ways to create and run threads. The classic two are **extending `Thread`** and **implementing `Runnable`**; modern code favors **`ExecutorService`** and **`Callable`** for managed, pooled execution.

## 1. Extending Thread

```java
class Worker extends Thread {
    public void run() { System.out.println("running: " + getName()); }
}
new Worker().start();
```

## 2. Implementing Runnable (preferred)

```java
Runnable task = () -> System.out.println("task on " + Thread.currentThread().getName());
Thread t = new Thread(task);
t.start();
```

Keeps your class free to extend something else and lets the task be reused or pooled.

## 3. Callable + ExecutorService (returns a result)

```java
import java.util.concurrent.*;

ExecutorService pool = Executors.newFixedThreadPool(2);
Future<Integer> f = pool.submit(() -> 2 + 3);   // Callable<Integer>
System.out.println(f.get());                    // 5, blocks until ready
pool.shutdown();
```

`Callable` can **return a value** and **throw checked exceptions**; `Runnable` cannot.

## start() vs run()

```text
t.start()  ->  JVM creates new thread  ->  new thread calls run()
t.run()    ->  runs on CURRENT thread (no concurrency!)  <- common mistake
```

## Comparison

| Approach | Returns value | Reusable | Thread management |
|----------|---------------|----------|-------------------|
| extends Thread | No | No | Manual |
| implements Runnable | No | Yes | Manual |
| Callable + Executor | Yes (`Future`) | Yes | Pooled/automatic |

## Key points

- Always launch with **`start()`**, not `run()`.
- Prefer **`Runnable`** over extending `Thread` (single inheritance, decoupling).
- Use **`ExecutorService`** to pool and manage threads instead of creating them by hand.
- Use **`Callable`** + **`Future`** when the task must return a result or throw checked exceptions.
- A thread can be started **only once**; re-calling `start()` throws `IllegalThreadStateException`.
