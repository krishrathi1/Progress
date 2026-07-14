## Definition

A **deadlock** is a state in which a set of processes are permanently blocked because each holds a resource the others need. In 1971, **Edward G. Coffman** identified **four conditions** that must hold **simultaneously** for a deadlock to be possible. These are called the **Coffman conditions**.

## The Four Conditions

| # | Condition | Meaning |
|---|-----------|---------|
| 1 | **Mutual Exclusion** | At least one resource is held in a non-sharable mode; only one process can use it at a time. |
| 2 | **Hold and Wait** | A process holding at least one resource is waiting to acquire additional resources held by others. |
| 3 | **No Preemption** | A resource cannot be forcibly taken; it is released only voluntarily by the holding process. |
| 4 | **Circular Wait** | A closed chain of processes exists, each waiting for a resource held by the next in the chain. |

## Why All Four Matter

- The four conditions are **necessary** — a deadlock **cannot** occur unless **all four** hold at once.
- They are **not sufficient** individually: having them possible does not guarantee deadlock, but breaking **any one** guarantees deadlock is **impossible**.
- Deadlock **prevention** works by structurally denying one of these four conditions.

## ASCII Diagram — Circular Wait

```text
   P1 --holds--> R1        R2 <--holds-- P2
    ^                                    |
    |                                    v
    +---------- waits for --------------+
        (P1 wants R2, P2 wants R1)
```

Here P1 holds R1 and waits for R2, while P2 holds R2 and waits for R1: a cycle of length 2.

## Key points

- Coffman conditions: **Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait**.
- All four are **necessary**; deadlock is impossible if any one is broken.
- **Circular wait** implies **hold and wait**, but they are listed separately because prevention strategies attack them differently.
- Prevention techniques each target exactly one condition (e.g., resource ordering breaks circular wait).
- Memory aid: **"MHNC"** or "My Hold Never Circles".
