## Definition

**Recoverability** concerns whether a schedule can correctly recover from transaction failures **without violating atomicity or durability**. Even a serializable schedule can be dangerous if a transaction commits after reading data written by another transaction that later **aborts**.

## The core problem

If `Tj` reads a value written by `Ti`, then `Tj` **depends on** `Ti`. If `Ti` later aborts, `Tj` must also roll back. But if `Tj` has **already committed**, we cannot undo it — the database is left inconsistent.

## Types of schedules by recoverability

- **Irrecoverable schedule** — a transaction commits *before* the transaction it read from commits, and the latter then aborts. Recovery is impossible.
- **Recoverable schedule** — for every pair where `Tj` reads from `Ti`, the **commit of `Tj` occurs after the commit of `Ti`**. Safe.
- **Cascadeless / Cascading** — subtypes discussed separately, but both are recoverable.

## Rule

```text
Recoverable  <=>  For every Tj that reads a value written by Ti,
                  Commit(Ti)  must come BEFORE  Commit(Tj).
```

## Examples

```text
IRRECOVERABLE:
  T1: W(A)
  T2:        R(A) W(A) Commit
  T1:                          Abort   <-- too late! T2 already committed

RECOVERABLE:
  T1: W(A)                     Commit
  T2:        R(A) W(A)                Commit  <-- commits AFTER T1
  If T1 aborts before its commit, T2 can still be rolled back safely.
```

## Comparison

| Schedule type | Reads uncommitted data? | Commit order enforced? | Safe recovery? |
|---|---|---|---|
| Irrecoverable | yes | no | no |
| Recoverable | yes | yes (Ti before Tj) | yes |

## Cascading rollback

In a recoverable schedule, an abort may still force a chain of rollbacks of dependent transactions (**cascading rollback**), which is expensive. This motivates **cascadeless** and **strict** schedules.

## Key points

- Serializability ensures **consistency**; recoverability ensures safe **failure handling** — both are needed.
- A schedule is recoverable iff each transaction commits only after every transaction it read from has committed.
- Irrecoverable schedules must be avoided by the concurrency controller.
- Recoverable schedules may still suffer cascading rollbacks.
