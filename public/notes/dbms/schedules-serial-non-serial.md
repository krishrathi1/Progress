## Definition

A **schedule** is a chronological ordering of the operations (read, write, commit, abort) of one or more transactions, preserving the relative order of operations **within** each individual transaction.

## Types of schedules

- **Serial schedule** — transactions execute one after another with **no interleaving**; a transaction finishes completely before the next begins. Always **correct/consistent**, but low concurrency (poor CPU/disk utilization).
- **Non-serial (concurrent) schedule** — operations of different transactions are **interleaved**. Improves throughput and resource use, but may produce inconsistency unless controlled (must be *serializable*).

## Classification tree

```text
                 Schedule
                    |
        +-----------+-----------+
        |                       |
     Serial               Non-serial
 (no interleaving)       (interleaved)
   always safe                |
                    +---------+---------+
                    |                   |
              Serializable      Non-serializable
              (equiv. to a         (may violate
               serial one)         consistency)
```

## Example

```text
T1: R(A) W(A) R(B) W(B)
T2: R(A) W(A)

Serial (T1 then T2):
  R1(A) W1(A) R1(B) W1(B) R2(A) W2(A)

Non-serial (interleaved):
  R1(A) W1(A) R2(A) W2(A) R1(B) W1(B)
```

## Comparison

| Aspect | Serial | Non-serial |
|---|---|---|
| Interleaving | none | yes |
| Concurrency | low | high |
| Consistency | always | only if serializable |
| Resource use | poor | efficient |
| Throughput | low | high |

## Why non-serial schedules are used

- A serial schedule wastes resources: while `T1` waits on a disk read, `T2` could use the CPU.
- Concurrency control (locking, timestamps) ensures the interleaved schedule is **equivalent to some serial schedule** (serializable), giving both speed and correctness.

## Key points

- A schedule must preserve each transaction's internal operation order.
- Serial schedules are inherently consistent but non-concurrent.
- The goal of concurrency control is to allow **non-serial but serializable** schedules.
- `n` transactions can form `n!` different serial schedules.
