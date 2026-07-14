## Definition

**Lock-based protocols** achieve concurrency control by requiring a transaction to acquire a **lock** on a data item before accessing it. Locks synchronize access so that conflicting operations cannot run at the same time, guaranteeing serializable schedules.

## Types of locks

| Lock mode | Symbol | Purpose | Compatible with |
|-----------|--------|---------|-----------------|
| **Shared (read)** | S | Allows reading only | other **S** locks |
| **Exclusive (write)** | X | Allows read + write | **nothing** |

### Lock compatibility matrix

```text
          Requested
          S      X
held S    yes    no
held X    no     no
```

Many transactions may hold **S** on the same item; only one may hold **X**, and only if no one else holds any lock.

## Lock operations

- `lock-S(A)` — request a shared lock on A
- `lock-X(A)` — request an exclusive lock on A
- `unlock(A)` — release the lock

## Simple example

```text
T1: lock-X(A); read(A); A=A-50; write(A); unlock(A)
T2: lock-S(A); read(A); unlock(A)   -- must wait until T1 unlocks A
```

## Problems with naive locking

- **Inconsistency / non-serializable schedules** if locks are released too early (before the transaction is done reading everything it needs).
- **Deadlock** — two transactions each wait for a lock the other holds.
- **Starvation** — a transaction repeatedly waits while others get the lock.

The **Two-Phase Locking (2PL)** protocol adds a rule (all locks acquired before any is released) to *guarantee* conflict-serializability.

## Types of lock-based protocols

- **Simplistic locking** — lock before every operation.
- **Pre-claiming (conservative)** — request all locks up front; deadlock-free.
- **Two-Phase Locking (2PL)** — growing then shrinking phase; ensures serializability.
- **Strict / Rigorous 2PL** — hold exclusive/all locks until commit; also ensures recoverability.

## Key points

- A transaction must **lock** an item before accessing it; **S** for read, **X** for write.
- **S** locks are shareable; **X** locks are exclusive.
- Locking alone does not guarantee serializability — **2PL** adds the ordering rule that does.
- Lock-based protocols can cause **deadlock** and **starvation**, which need separate handling.
