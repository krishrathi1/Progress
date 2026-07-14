## Definition

**Serializability** is the criterion that decides whether a concurrent (non-serial) schedule is **correct**. A schedule is serializable if it produces the **same result as some serial schedule** of the same transactions. Two main forms exist: **conflict serializability** and **view serializability**.

## Conflicting operations

Two operations conflict if they:

- belong to **different transactions**,
- access the **same data item**, and
- **at least one** is a **write**.

Conflict pairs: `W-W`, `R-W`, `W-R` (not `R-R`).

## Conflict serializability

A schedule is **conflict serializable** if it can be transformed into a serial schedule by swapping **non-conflicting** adjacent operations.

**Test — Precedence (Serialization) Graph:**

```text
1. One node per transaction.
2. Draw edge Ti -> Tj if an operation of Ti
   conflicts with and comes BEFORE an operation of Tj
   on the same data item.
3. Schedule is conflict serializable  <=>  graph is ACYCLIC.
   A topological sort gives the equivalent serial order.
```

```text
Example:  T1: W(A)      T2: R(A) ... W(B)     T3: R(B)
Edges:    T1 -> T2  (W then R on A)
          T2 -> T3  (W then R on B)
Graph: T1 -> T2 -> T3   (no cycle)  => serializable
Serial order: T1, T2, T3
```

## View serializability

A schedule is **view serializable** if it is *view equivalent* to a serial schedule. Two schedules are view equivalent when, for every data item:

- **Initial read** — same transaction reads the initial value.
- **Read-from (dependent read)** — if Ti reads a value written by Tj in one schedule, the same holds in the other.
- **Final write** — the same transaction performs the last write.

View serializability captures **blind writes** (a write not preceded by a read) that conflict serializability misses.

## Comparison

| Property | Conflict Serializable | View Serializable |
|---|---|---|
| Test method | precedence graph (polynomial) | NP-complete in general |
| Handles blind writes | no | yes |
| Scope | subset | superset |
| Practical use | widely used | mostly theoretical |

- **Every conflict-serializable schedule is view-serializable, but not vice versa.**

## Key points

- Serializability = correctness benchmark for concurrent execution.
- Conflict serializability is tested efficiently via an **acyclic precedence graph**.
- View serializability is more general (allows blind writes) but is **NP-complete** to test.
- Conflict serializable ⊂ View serializable.
