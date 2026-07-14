## Definition

A **transaction** is a logical unit of work that accesses/modifies the database as a single, indivisible operation. During its lifetime a transaction passes through a well-defined set of **states** tracked by the DBMS recovery manager.

## The five states

- **Active** — the initial state; the transaction stays here while executing its read/write operations.
- **Partially Committed** — the final statement has executed, but changes are still in buffers/logs and not yet permanently on disk.
- **Committed** — changes are permanently written; the transaction completes successfully and cannot be rolled back.
- **Failed** — a check (system error, constraint violation, deadlock) determines normal execution can no longer proceed.
- **Aborted (Terminated)** — the transaction is rolled back, the database restored to its state before the transaction began.

## State diagram

```text
                 read/write
                    |
        +--------[ ACTIVE ]---------+
        |            |              |
        | success    | failure      |
        v            v              |
[ PARTIALLY ]    [ FAILED ]         |
[ COMMITTED ]        |              |
        |            v              |
        |        [ ABORTED ] <------+ (rollback)
        v            |
  [ COMMITTED ]   restart / kill
        |
     <end>
```

- Active -> Partially Committed -> Committed (success path)
- Active -> Failed -> Aborted (failure path)
- Partially Committed can also -> Failed (e.g., disk write error before durability)

## After abort

The system does one of two things:

- **Restart** the transaction (fresh, if failure was due to hardware/software, not internal logic).
- **Kill** the transaction (if failure was due to bad logic or invalid input).

## Comparison

| State | Work done? | On disk? | Reversible? |
|---|---|---|---|
| Active | in progress | no | yes |
| Partially Committed | all statements ran | not yet | yes |
| Committed | complete | yes | no |
| Failed | halted | no | yes |
| Aborted | rolled back | undone | — |

## Key points

- Only the **Committed** and **Aborted** states are terminal.
- **Commit** guarantees **durability** (Atomicity + Durability of ACID).
- A transaction reaching **Committed** can never be undone; a rollback happens only from Active/Partially Committed via Failed -> Aborted.
- The log records these transitions to support recovery after crashes.
