## Definition

**Concurrency control** is the set of techniques a DBMS uses to manage the **simultaneous execution** of multiple transactions so that the database stays **consistent** and the execution remains **serializable** (equivalent to some serial order), while still allowing high throughput.

When transactions interleave without control, they produce **anomalies**.

## Why it is needed — concurrency anomalies

- **Lost Update** — Two transactions read the same value, both update it; one overwrite is lost.
- **Dirty Read** — T2 reads uncommitted data written by T1, then T1 aborts.
- **Unrepeatable Read** — T1 reads a row twice and gets different values because T2 updated it in between.
- **Phantom Read** — T1 re-runs a range query and sees new rows inserted by T2.

## Serial vs Concurrent execution

```text
Serial (safe, slow):     T1 -----> T2 ----->
Concurrent (fast):       T1 --.  .--.  .-->
                         T2   '--'  '--'
   Goal: interleave but stay equivalent to some serial order
```

## Categories of concurrency control

| Approach | Idea | Example protocols |
|----------|------|-------------------|
| **Pessimistic (lock-based)** | Block conflicting access before it happens | 2PL, strict 2PL |
| **Timestamp-based** | Order transactions by timestamps | Timestamp ordering, Thomas' write rule |
| **Optimistic (validation)** | Run freely, validate before commit | OCC (read–validate–write phases) |
| **Multiversion (MVCC)** | Keep multiple versions of data | Used by PostgreSQL, Oracle |

## Goal: Serializability

A concurrent schedule is **correct** if it is **conflict-serializable** — its precedence (conflict) graph is **acyclic**. Concurrency-control protocols enforce this without needing to test each schedule.

## Key points

- Concurrency control balances **consistency** and **performance/throughput**.
- It prevents lost update, dirty read, unrepeatable read, and phantom anomalies.
- Correctness criterion is **serializability** (usually conflict-serializability).
- Main families: **lock-based**, **timestamp-based**, **optimistic**, and **multiversion (MVCC)**.
- It enforces the **Isolation** property of ACID.
