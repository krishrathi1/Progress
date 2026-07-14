## Definition

A **File System** stores data in isolated OS files (text, binary) that applications read/write directly. A **DBMS** manages data through a controlled software layer providing querying, integrity, concurrency, and security. Understanding the gap between them explains *why* DBMS was invented.

## Problems with File-Based Systems

- **Data redundancy** — the same data (e.g. a customer address) copied across many files.
- **Data inconsistency** — updating one copy but not others leaves conflicting values.
- **Difficult access** — no query language; every new request needs custom code.
- **No concurrency control** — two users writing the same file corrupt it.
- **Poor security** — file-level permissions only, not per-record/field.
- **No integrity enforcement** — nothing stops invalid data (age = -5).
- **No recovery** — a crash mid-write can leave files half-updated.

```text
File System                 DBMS
-----------                 ----
App1 -> customers.txt       App1 --\
App2 -> customers.txt              +--> [ DBMS ] --> single DB
App3 -> orders.dat          App2 --/     (shared, controlled)
(redundant copies)          App3 --/
```

## Comparison

| Aspect | File System | DBMS |
|--------|-------------|------|
| Redundancy | High, uncontrolled | Minimized (normalization) |
| Consistency | Hard to maintain | Enforced by constraints |
| Query | Custom code per task | Declarative SQL |
| Concurrency | None / manual locks | Built-in locking/MVCC |
| Integrity | Application's job | DB constraints |
| Security | File-level only | User/role, row, column |
| Recovery | Manual | Automatic (logs, backups) |
| Data independence | None | Logical & physical |

## When File Systems Still Suffice

- Small, single-user apps; config files; logs; media storage.
- DBMS adds overhead (setup, memory) not worth it for trivial data.

## Key points

- File systems suffer redundancy, inconsistency, no concurrency, weak security.
- DBMS centralizes data, enforces integrity, and offers declarative querying.
- **Data independence** is a key DBMS advantage absent in file systems.
- DBMS provides ACID transactions and automatic recovery; file systems do not.
