## Definition

A **thread** is the smallest unit of execution within a process. A Java program starts with a single **main thread**, but you can spawn additional threads to run tasks **concurrently**. **Multithreading** allows several parts of a program to execute simultaneously, improving responsiveness and CPU utilization — especially on multi-core hardware.

## Process vs Thread

| Aspect | Process | Thread |
|--------|---------|--------|
| Memory | Separate address space | Shares process memory (heap) |
| Creation cost | Heavy | Lightweight |
| Communication | IPC (costly) | Shared variables (fast) |
| Isolation | Strong | Weak (needs synchronization) |
| Own stack/PC | Yes | Yes (each thread) |

Threads within a process share the **heap** (objects, static fields) but each has its **own stack** and program counter.

## Creating a thread

```java
class Task extends Thread {
    public void run() {
        System.out.println("Running: " + Thread.currentThread().getName());
    }
}

public class Demo {
    public static void main(String[] args) {
        Task t = new Task();
        t.start();          // starts a NEW thread -> calls run()
        System.out.println("Main continues: " + Thread.currentThread().getName());
    }
}
```

**Note:** calling `run()` directly runs it on the *current* thread; only `start()` creates a new thread.

## Concurrent execution

```text
 Single thread          Multithread
 [-- task A --]         [-- task A --]
 [-- task B --]         [-- task B --]   (overlapping / parallel on cores)
 time --->              time --->  (finishes sooner)
```

## Benefits and costs

- **Benefits:** responsiveness (UI stays live), parallelism, better resource use, simpler modeling of independent tasks.
- **Costs:** race conditions, deadlocks, harder debugging, synchronization overhead.

## Key points

- A thread is the smallest schedulable unit; every Java app has a **main thread**.
- Threads share heap memory but have **independent stacks**.
- Use **`start()`**, never `run()`, to launch a new thread.
- Multithreading boosts throughput and responsiveness but introduces concurrency hazards needing synchronization.
- `Thread.currentThread().getName()` identifies the executing thread.
