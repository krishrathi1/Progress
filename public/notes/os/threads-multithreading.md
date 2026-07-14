## Definition

A **thread** is the smallest unit of execution within a process. It has its own program counter, register set, and stack, but **shares** the process's code, data (heap), and open files with sibling threads.

**Multithreading** is the ability of a single process to run multiple threads concurrently, allowing several tasks to progress at the same time within one address space.

## Process vs Thread

| Aspect | Process | Thread |
|--------|---------|--------|
| Address space | Own, isolated | Shared with peers |
| Creation cost | High | Low |
| Context switch | Slow (TLB/page tables flushed) | Fast |
| Communication | IPC (pipes, sockets) | Shared memory (direct) |
| Fault isolation | One crash doesn't kill others | One thread crash can kill process |

## What a thread owns vs shares

```text
Process
+-----------------------------+
|  Code | Data(heap) | Files  |  <- SHARED by all threads
+-----------------------------+
|  T1        T2        T3      |
| [PC]      [PC]      [PC]     |  <- PER-THREAD
| [regs]    [regs]    [regs]   |
| [stack]   [stack]   [stack]  |
+-----------------------------+
```

## Benefits

- **Responsiveness** — UI stays live while a worker thread does heavy work.
- **Resource sharing** — threads share memory, no costly IPC.
- **Economy** — cheaper to create/switch than processes.
- **Scalability** — threads run in parallel on multiple CPU cores.

## Concurrency vs Parallelism

- **Concurrency**: multiple threads make progress by interleaving on one core (time-slicing).
- **Parallelism**: threads truly run at the same instant on different cores.

## Challenges

- **Race conditions** when threads access shared data without synchronization.
- **Deadlocks** from improper lock ordering.
- Harder to debug due to non-deterministic scheduling.

## Key points

- Threads share code/data/heap but have private PC, registers, and stack.
- Multithreading improves responsiveness, throughput, and CPU utilization.
- Threads are lighter than processes; context switching is cheaper.
- Shared memory brings synchronization hazards (races, deadlocks).
- A multithreaded process needs at least one thread (the main thread).
