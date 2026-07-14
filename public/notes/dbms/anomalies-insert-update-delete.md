## Definition

**Anomalies** are problems that arise when a poorly designed (un-normalized, redundant) relation is modified. Because the same fact is stored in many rows, `INSERT`, `UPDATE`, and `DELETE` operations can produce inconsistent or lost data. Removing these anomalies is the primary motivation for **normalization**.

## The Problem Table

Consider a single table storing student + course + instructor data:

| StudentID | Course | Instructor | InstrPhone |
|-----------|--------|------------|-----------|
| S1 | DBMS | Rao | 111 |
| S1 | OS | Sen | 222 |
| S2 | DBMS | Rao | 111 |

`Instructor → InstrPhone`, but the phone is repeated on every enrollment row — the source of all three anomalies.

## The Three Anomalies

- **Insertion anomaly**: You cannot add a fact without unrelated data. To record a new instructor "Iyer" and her phone, you *must* also have a student enrolled in her course — otherwise StudentID/Course are null.

- **Update anomaly**: A single fact is stored redundantly, so an update must touch many rows. If Rao's phone changes to 999, every row with Rao must be updated; miss one and the data is inconsistent.

- **Deletion anomaly**: Deleting one fact accidentally destroys another. If S1 drops OS and that is the only OS row, we lose the fact that **Sen teaches OS** and Sen's phone entirely.

```text
Redundancy (Rao|111 stored twice)
        │
        ├── UPDATE must change every copy   → inconsistency risk
        ├── INSERT needs a full row          → can't store a lone fact
        └── DELETE last row                  → unrelated fact vanishes
```

## The Fix: Decomposition

Split into two relations so each fact lives in exactly one place:

```text
Enrollment(StudentID, Course)          -- who takes what
Teaches(Course, Instructor)            -- who teaches what
Instructor(Instructor, InstrPhone)     -- instructor's phone (once)
```

Now the instructor's phone is stored a single time, and each anomaly disappears.

## Anomaly Summary

| Anomaly | Trigger | Consequence |
|---------|---------|-------------|
| Insertion | Adding data needing absent unrelated data | Cannot store isolated fact |
| Update | Redundant copies of one fact | Partial updates cause inconsistency |
| Deletion | Removing a row that co-stores another fact | Unintended loss of data |

## Key points

- Anomalies stem from **data redundancy** caused by bad functional-dependency design.
- Three kinds: **insert, update, delete**.
- Cured by **normalization** — decomposing so every fact is stored exactly once.
- Good decomposition must be **lossless** and ideally **dependency-preserving**.
