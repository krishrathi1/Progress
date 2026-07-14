## Definition

The **Timestamp Ordering (TO) Protocol** is a **non-lock** concurrency-control method. Each transaction gets a unique **timestamp `TS(Ti)`** when it starts (usually the system clock or a counter). The protocol ensures the schedule is **conflict-equivalent to the serial order of the timestamps** — the older transaction (smaller TS) always appears to run first.

## Data-item timestamps

For each data item **X** the DBMS keeps:

- **W-timestamp(X)** — largest timestamp of any transaction that **wrote** X.
- **R-timestamp(X)** — largest timestamp of any transaction that **read** X.

## The rules

### When Ti issues `read(X)`

```text
if TS(Ti) < W-timestamp(X):
    ABORT Ti          # X was already written by a younger txn -> too late
else:
    execute read
    R-timestamp(X) = max(R-timestamp(X), TS(Ti))
```

### When Ti issues `write(X)`

```text
if TS(Ti) < R-timestamp(X):      # someone younger already read X
    ABORT Ti
elif TS(Ti) < W-timestamp(X):    # someone younger already wrote X
    ABORT Ti (or ignore -> Thomas' Write Rule)
else:
    execute write
    W-timestamp(X) = TS(Ti)
```

An aborted transaction is **restarted with a new (larger) timestamp**.

## Thomas' Write Rule (optimization)

If `TS(Ti) < W-timestamp(X)` on a **write**, the write is **obsolete** and can simply be **ignored** instead of aborting Ti. This allows more concurrency (produces view-serializable, not just conflict-serializable, schedules).

## Diagram

```text
TS:   T1=10        T2=20
X:    read/write ordered so that T1 "logically" precedes T2
      Any operation violating this order  =>  ABORT + restart
```

## Timestamp Ordering vs 2PL

| Feature | Timestamp Ordering | Two-Phase Locking |
|---------|-------------------|-------------------|
| Mechanism | Timestamps | Locks |
| Deadlock | **None** (no waiting) | Possible |
| Starvation | Possible (repeated restarts) | Possible |
| Overhead | Restarts (rollbacks) | Lock management |
| Serial order | By timestamp | By lock point |

## Key points

- Each transaction has a unique **timestamp**; conflicts are resolved by comparing timestamps.
- Ensures **conflict-serializability** in **timestamp order**.
- **Deadlock-free** because transactions never wait — they abort and restart.
- Can suffer **starvation / cascading rollbacks**; may produce non-recoverable schedules unless combined with commit ordering.
- **Thomas' Write Rule** ignores obsolete writes to boost concurrency.
