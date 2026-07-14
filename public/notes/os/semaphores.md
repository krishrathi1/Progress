## Definition

A **semaphore** is an integer variable used for process synchronization, accessed only through two **atomic** operations: `wait()` (also called P or down) and `signal()` (V or up). It solves the critical-section problem and coordinates access to shared resources among concurrent processes.

## Types

| Type | Value range | Use |
|------|-------------|-----|
| **Binary semaphore** | 0 or 1 | Acts like a lock (mutual exclusion) |
| **Counting semaphore** | 0 to N | Controls access to N identical resources |

## The Operations

```text
wait(S):                 signal(S):
  while S <= 0: wait       S = S + 1
  S = S - 1
```

Both must be **atomic** — no two processes may execute `wait`/`signal` on the same semaphore simultaneously.

- `wait(S)`: decrements; if the value goes below 0 the process **blocks**.
- `signal(S)`: increments; if a process is waiting, it is **woken up**.

## Busy-wait vs Blocking

- **Spinlock semaphore**: loops (busy-waiting) — wastes CPU but avoids context-switch cost; fine for short waits.
- **Blocking semaphore**: keeps a queue of waiting processes; the process sleeps and is woken by `signal`. Preferred for longer waits.

```java
// Binary semaphore protecting a critical section
Semaphore sem = new Semaphore(1);

sem.acquire();      // wait
// --- critical section ---
sem.release();      // signal
```

## Example: limiting connections

```java
// Counting semaphore: allow max 3 concurrent users
Semaphore pool = new Semaphore(3);
pool.acquire();   // blocks if 3 already inside
useResource();
pool.release();
```

## Advantages and problems

- **Advantages**: flexible, works for N resources, avoids busy-wait in blocking form.
- **Problems**: incorrect ordering of `wait`/`signal` causes **deadlock** or **starvation**; a missed `signal` blocks forever. Programming errors are hard to debug because semaphores are unstructured.

## Key points

- Semaphore = integer + atomic `wait`/`signal`.
- Binary (0/1) for mutual exclusion; counting (0..N) for resource pools.
- `wait` decrements and may block; `signal` increments and may wake a waiter.
- Operations must be atomic to be correct.
- Misuse leads to deadlock or starvation.
