## Definition

A **deadlock** in a DBMS is a situation where two or more transactions are each **waiting indefinitely** for a lock held by another, so **none can proceed**. It arises with lock-based protocols (like 2PL) where transactions hold some resources while requesting others.

## Classic example

```text
T1: lock-X(A)  ...              lock-X(B)  <- waits for T2
T2: lock-X(B)  ...              lock-X(A)  <- waits for T1

T1 holds A, wants B ; T2 holds B, wants A  =>  circular wait
```

## Coffman conditions (all four must hold)

- **Mutual exclusion** — a resource (lock) is held in a non-shareable mode.
- **Hold and wait** — a transaction holds locks while waiting for others.
- **No preemption** — a lock cannot be forcibly taken away.
- **Circular wait** — a closed chain of transactions each waiting for the next.

## Wait-for graph (WFG)

The DBMS models waiting as a directed graph: node per transaction, edge **Ti → Tj** if Ti waits for a lock held by Tj.

```text
   T1 ───► T2
    ▲       │
    └───────┘        A cycle  =>  DEADLOCK
```

A **cycle** in the wait-for graph means a deadlock exists.

## Handling strategies (overview)

| Strategy | Idea |
|----------|------|
| **Prevention** | Design so a deadlock can never occur (e.g. wait-die, wound-wait) |
| **Avoidance** | Grant a lock only if it keeps the system in a safe state |
| **Detection & recovery** | Allow deadlocks, detect via WFG cycle, abort a **victim** |
| **Ignore (Ostrich)** | Assume rare; restart manually — used by some systems |

## Recovery: victim selection

When detected, the DBMS **rolls back** one transaction (the **victim**) to break the cycle. The victim is chosen by least cost — fewest changes, shortest running time, fewest locks — and care is taken to avoid **starvation** (same transaction repeatedly chosen).

## Key points

- Deadlock = **circular waiting** among transactions holding locks.
- Requires all **four Coffman conditions** simultaneously.
- Detected by finding a **cycle in the wait-for graph**.
- Resolved by **aborting a victim transaction** and rolling it back.
- Timestamp-based protocols (wait-die / wound-wait) can **prevent** it by design.
