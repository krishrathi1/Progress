## Definition

A Java thread moves through a well-defined set of **states** during its life, from creation to termination. These states are captured by the enum **`Thread.State`**, returned by `thread.getState()`. Understanding them is essential for reasoning about scheduling, blocking, and concurrency bugs.

## The six states

| State | Meaning | How reached |
|-------|---------|-------------|
| **NEW** | Created but not started | `new Thread()` |
| **RUNNABLE** | Ready or running (JVM/OS schedules it) | `start()` called |
| **BLOCKED** | Waiting to acquire a monitor lock | contending for `synchronized` |
| **WAITING** | Waiting indefinitely for another thread | `wait()`, `join()`, `park()` |
| **TIMED_WAITING** | Waiting for a bounded time | `sleep(t)`, `wait(t)`, `join(t)` |
| **TERMINATED** | `run()` finished or threw | task completed |

## State transition diagram

```text
        start()              scheduler picks
 NEW ----------> RUNNABLE <-------------------> (running)
                   |  ^  ^
     wait()/join() |  |  | notify()/timeout/lock acquired
                   v  |  |
   WAITING / TIMED_WAITING / BLOCKED
                   |
        run() ends v
              TERMINATED
```

## Notes on RUNNABLE

Java does **not** distinguish "ready" from "actually running" — both are **RUNNABLE**. The OS thread scheduler decides which runnable thread gets the CPU. A thread doing blocking I/O may still report RUNNABLE.

## Triggering transitions

- `Object.wait()` -> WAITING; `wait(1000)` -> TIMED_WAITING.
- `Thread.sleep(500)` -> TIMED_WAITING (keeps any held locks!).
- Entering a `synchronized` block whose lock is held -> BLOCKED.
- `notify()`/`notifyAll()` or timeout -> back to RUNNABLE.
- Return from `run()` -> TERMINATED (cannot be restarted).

## Key points

- Six states: **NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED**.
- Query with `getState()`; states live in `Thread.State`.
- **BLOCKED** = waiting for a lock; **WAITING/TIMED_WAITING** = waiting for a signal/time.
- `sleep()` does **not** release locks; `wait()` does.
- A **TERMINATED** thread cannot be started again — calling `start()` twice throws `IllegalThreadStateException`.
