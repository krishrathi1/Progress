## Definition

**Cascadeless** and **strict** schedules are stronger classes of **recoverable** schedules that limit the damage caused by a transaction abort. They control *when* a transaction may read or write data that another (still uncommitted) transaction has written.

## Cascading rollback (the problem)

If transactions read data written by an uncommitted transaction and that transaction aborts, **all dependent transactions must also roll back** — a chain reaction called **cascading rollback**. It is costly and wastes work.

```text
T1: W(A)                Abort
T2:      R(A) W(B)      -> must abort
T3:            R(B)     -> must abort   (cascade!)
```

## Cascadeless schedule

- **Rule:** a transaction may **read** a value only **after** the transaction that wrote it has **committed**.
- Eliminates cascading rollbacks (no dirty reads).
- Also called **Avoids Cascading Aborts (ACA)**.

```text
Cascadeless:
  T1: W(A) Commit
  T2:            R(A) ...    <-- reads only AFTER T1 commits
```

## Strict schedule

- **Rule:** a transaction may **read or write** a data item only **after** the last transaction that wrote it has committed or aborted.
- Guarantees that undo during rollback simply restores the **before-image** (no need to cascade or track intermediate writes) — simplest recovery.

```text
Strict:
  T1: W(A) Commit
  T2:            W(A) ...    <-- neither reads NOR writes A until T1 ends
```

## Hierarchy

```text
   Serial  ⊂  Strict  ⊂  Cascadeless  ⊂  Recoverable  ⊂  All schedules
   (most restrictive)                              (least restrictive)
```

Every serial schedule is strict; every strict schedule is cascadeless; every cascadeless schedule is recoverable.

## Comparison

| Property | Recoverable | Cascadeless | Strict |
|---|---|---|---|
| Commit order (read-from) | enforced | enforced | enforced |
| Dirty reads allowed | yes | no | no |
| Dirty writes allowed | yes | yes | no |
| Cascading rollback | possible | none | none |
| Recovery ease | hard | medium | easiest |

## Key points

- **Cascadeless** forbids reading uncommitted (dirty) data -> no cascading aborts.
- **Strict** forbids both reading and writing uncommitted data -> simplest, before-image rollback.
- Containment: **Strict ⊂ Cascadeless ⊂ Recoverable**.
- **Strict Two-Phase Locking (Strict 2PL)** produces strict schedules and is used in most real DBMSs.
