## Definition

**Log-based recovery** is a technique that restores the database to a consistent state after a failure by using a **transaction log** — a sequential, append-only record of every update performed by transactions. The log is stored in **stable storage** so it survives crashes.

## The Log Record

Each update generates a log record. The common formats are:

- `<T, start>` — transaction T begins
- `<T, X, old_value, new_value>` — T changed data item X from old to new
- `<T, commit>` — T finished successfully
- `<T, abort>` — T was rolled back

## Write-Ahead Logging (WAL)

The golden rule that makes recovery possible:

- The **log record** for a change must reach stable storage **before** the changed data page is written to disk.
- A transaction's `<T, commit>` must be on disk **before** it is declared committed.

This guarantees enough information exists to `undo` uncommitted work and `redo` committed work.

## Recovery Operations

- **undo(T)** — restore each item changed by T to its `old_value` (used for transactions with no commit).
- **redo(T)** — set each item to its `new_value` (used for committed transactions whose pages may not have reached disk).

Both operations are **idempotent** — re-applying them any number of times yields the same result, so recovery can safely restart after a crash-during-recovery.

## Recovery Procedure (deferred vs immediate)

```text
Scan log backward, build two lists:
  REDO  = transactions with <T, commit>
  UNDO  = transactions with <T, start> but no commit/abort

Then:
  undo each transaction in UNDO (reverse order)
  redo each transaction in REDO (forward order)
```

## Diagram

```text
Time --->
T1: start ...... commit            (REDO T1)
T2: start ............. CRASH      (UNDO T2)

Log (stable storage):
<T1,start> <T1,A,10,20> <T1,commit> <T2,start> <T2,B,5,9> ||CRASH
```

## Key points

- Log lives in **stable storage**; WAL rule is mandatory.
- **Immediate update** may need both undo and redo; **deferred update** needs only redo.
- undo/redo must be **idempotent** for crash-safe restarts.
- Combined with **checkpoints**, log scanning is bounded so recovery stays fast.
