## Definition

These are two **log-based recovery strategies** that differ in *when* a transaction's changes are actually written to the physical database on disk.

- **Deferred update** — changes are recorded only in the log; the database is updated **after** the transaction commits.
- **Immediate update** — changes are written to the database **while the transaction is still executing** (before commit), so the log must also store old values for undo.

## Deferred Update (NO-UNDO / REDO)

- During execution, updates go **only to the log** (and a local buffer), not to the real database.
- On `commit`, the log is used to actually apply (`redo`) the changes to disk.
- If a crash happens **before** commit, nothing reached the database → nothing to undo.

```text
Log needs only: <T, X, new_value>   (no old value required)
Crash before commit  -> ignore T (no changes on disk)
Crash after  commit  -> redo T
```

## Immediate Update (UNDO / REDO)

- Updates may be flushed to the database **before** the transaction commits (must obey **write-ahead logging**).
- The log stores **both** old and new values so incomplete transactions can be rolled back.

```text
Log needs: <T, X, old_value, new_value>
Crash before commit -> undo T (restore old_value)
Crash after  commit -> redo T (ensure new_value on disk)
```

## Comparison

| Aspect | Deferred update | Immediate update |
|--------|-----------------|------------------|
| DB write timing | After commit | During execution |
| Log record | new value only | old + new value |
| Recovery ops | **REDO only** | **UNDO + REDO** |
| Undo needed? | No | Yes |
| Buffer pressure | High (holds changes) | Lower |
| WAL required? | For redo durability | Yes, strictly |

## Recovery Summary

```text
DEFERRED:  committed -> REDO ;  uncommitted -> ignore
IMMEDIATE: committed -> REDO ;  uncommitted -> UNDO
```

## Key points

- **Deferred = NO-UNDO/REDO**; **Immediate = UNDO/REDO**.
- Immediate update needs **old values** in the log and strict **write-ahead logging**.
- Deferred avoids undo but holds changes in buffers longer.
- Both rely on **idempotent** redo/undo operations.
