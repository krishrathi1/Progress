## Definition

**Two-Phase Locking (2PL)** is a lock-based protocol that guarantees **conflict-serializable** schedules. Each transaction obtains and releases locks in **two distinct phases**, and once it releases *any* lock it may never acquire another.

## The two phases

```text
 #locks
   |        _______ (lock point)
   |       /       \
   |      / Growing \  Shrinking
   |     /  (acquire)\ (release)
   |____/____________\___________ time
        no unlocks    no locks
                      acquired
```

- **Growing phase** — the transaction may **acquire** locks but may **not release** any.
- **Shrinking phase** — the transaction may **release** locks but may **not acquire** any.
- The moment it releases the first lock is the **lock point**; the serialization order follows the order of lock points.

## Example

```text
T1: lock-X(A) ... lock-X(B) | unlock(A) ... unlock(B)
         \___ growing ___/     \___ shrinking ___/
Legal 2PL: all locks obtained before any is released.
```

## Variants of 2PL

| Variant | Rule | Guarantees |
|---------|------|-----------|
| **Basic 2PL** | Growing then shrinking | Conflict-serializability |
| **Conservative (static) 2PL** | Acquire **all** locks before starting | Serializable + **deadlock-free** |
| **Strict 2PL** | Hold all **exclusive (X)** locks until commit/abort | Serializable + **cascadeless (recoverable)** |
| **Rigorous 2PL** | Hold **all** locks (S and X) until commit/abort | Serializable + recoverable; easy to implement |

## What 2PL guarantees and what it does not

- **Guarantees:** every 2PL schedule is conflict-serializable.
- **Does NOT prevent:** **deadlocks** (basic and strict 2PL can deadlock).
- **Does NOT by itself prevent cascading rollback** — that needs **strict/rigorous** 2PL.

## Key points

- Two phases: **growing** (only acquire) and **shrinking** (only release).
- The **lock point** determines the equivalent serial order.
- Basic 2PL ⇒ conflict-serializable but **deadlock possible**.
- **Strict 2PL** holds X-locks till commit ⇒ **cascadeless & recoverable**; most commercial DBMSs use it.
- **Conservative 2PL** is the only variant that is **deadlock-free** (but hard to predict all locks).
