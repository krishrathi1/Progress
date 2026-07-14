## Definition

A relation is in **First Normal Form (1NF)** if **every attribute holds only atomic (indivisible) single values** — no multi-valued attributes, no repeating groups, and no nested relations. Each cell contains one value, and each row is unique. 1NF is the baseline every relational table must satisfy.

## Rules for 1NF

- Each column contains **atomic** values (not lists or sets).
- Each column has a **single value** per row (no multiple phone numbers in one cell).
- No **repeating groups** of columns (e.g. `Phone1, Phone2, Phone3`).
- Each row is uniquely identifiable (a primary key exists).

## Violating Example

`Student` with a multi-valued `Courses` column:

| RollNo | Name | Courses |
|--------|------|---------|
| 1 | Asha | DBMS, OS |
| 2 | Ravi | CN |

The `Courses` cell holds multiple values ⇒ **not in 1NF**.

## Converting to 1NF

Make each course value occupy its own row (one atomic value per cell):

| RollNo | Name | Course |
|--------|------|--------|
| 1 | Asha | DBMS |
| 1 | Asha | OS |
| 2 | Ravi | CN |

Primary key becomes `{RollNo, Course}`.

```text
BEFORE (non-atomic)             AFTER (1NF)
┌────┬──────┬──────────┐        ┌────┬──────┬────────┐
│ 1  │ Asha │ DBMS, OS │  ───►  │ 1  │ Asha │ DBMS   │
└────┴──────┴──────────┘        │ 1  │ Asha │ OS     │
                                └────┴──────┴────────┘
```

## Why Not Just Add Columns?

Adding `Course1, Course2, ...` (a repeating group) also violates 1NF and is worse: it wastes space, caps the number of courses, and makes queries like "who takes OS?" awkward. Splitting into rows is the correct approach.

## SQL Illustration

```sql
CREATE TABLE StudentCourse (
    RollNo INT,
    Name   VARCHAR(50),
    Course VARCHAR(20),
    PRIMARY KEY (RollNo, Course)   -- each atomic (RollNo, Course) row is unique
);
```

## Key points

- 1NF ⇒ **atomic values only**, no repeating groups or multi-valued cells.
- Fix violations by putting each value in its **own row**, not extra columns.
- 1NF is the **prerequisite** for 2NF, 3NF, and BCNF.
- It removes structural (non-relational) redundancy but not yet the redundancy caused by partial/transitive dependencies — that is what higher normal forms address.
