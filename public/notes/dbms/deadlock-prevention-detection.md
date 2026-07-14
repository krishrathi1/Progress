## Overview

There are two broad ways to deal with deadlocks in a DBMS: stop them from ever happening (**prevention**), or let them happen and clean up (**detection & recovery**). Both aim to break at least one of the four **Coffman conditions** (mutual exclusion, hold-and-wait, no preemption, circular wait).

## Deadlock Prevention

Prevention schemes ensure the system **never** enters a deadlock. The most common are **timestamp-based** schemes that decide whether a waiting transaction should wait, die, or preempt another.

### Wait-Die vs Wound-Wait

Assume Ti requests a lock held by Tj. `TS` = timestamp (smaller = older).

| Scheme | If Ti is **older** (TS(Ti) < TS(Tj)) | If Ti is **younger** | Nature |
|--------|--------------------------------------|----------------------|--------|
| **Wait-Die** | Ti **waits** | Ti **dies** (rolls back, restarts) | Non-preemptive |
| **Wound-Wait** | Ti **wounds** Tj (Tj rolls back) | Ti **waits** | Preemptive |

```text
Wait-Die  : old waits, young dies       (older never preempts)
Wound-Wait: old wounds young, young waits (older preempts younger)
```

Both use the **same timestamp** on restart, so a repeatedly rolled-back transaction eventually becomes the oldest and is guaranteed to finish — **no starvation**.

### Other prevention approaches

- **Conservative 2PL / pre-claiming** — acquire **all** locks before starting (removes *hold-and-wait*).
- **Ordering resources** — lock items in a fixed global order (removes *circular wait*).

## Deadlock Detection

Used when deadlocks are rare. The DBMS lets them happen, then periodically checks.

- Maintain a **Wait-For Graph (WFG)**: edge Ti → Tj if Ti waits for Tj.
- Run a **cycle-detection** algorithm. A cycle ⇒ deadlock.

```text
   T1 ──► T2 ──► T3
    ▲              │
    └──────────────┘     cycle => deadlock detected
```

When to run: after a timeout, at fixed intervals, or when wait count crosses a threshold.

## Deadlock Recovery

Once detected, break the cycle:

- **Victim selection** — choose the transaction cheapest to abort (fewest updates, least work done, fewest locks held).
- **Rollback** — total (restart fully) or partial (roll back just enough to release the needed lock).
- **Starvation avoidance** — include the number of rollbacks in the cost so the same transaction is not always the victim.

## Prevention vs Detection

| Aspect | Prevention | Detection & Recovery |
|--------|-----------|----------------------|
| Deadlock occurs? | Never | Yes, then resolved |
| Overhead | Extra aborts / restrictions upfront | Cost of running WFG checks |
| Best when | Deadlocks frequent | Deadlocks rare |

## Key points

- **Prevention** breaks a Coffman condition in advance; **Wait-Die** (non-preemptive) and **Wound-Wait** (preemptive) are the classic timestamp schemes.
- Both keep the **original timestamp** on restart to avoid starvation.
- **Detection** builds a **wait-for graph** and searches for a **cycle**.
- **Recovery** aborts a **victim** (least-cost) and rolls it back.
- Choose prevention when deadlocks are common, detection when they are rare.
