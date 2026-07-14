## Definition

A relation is in **Second Normal Form (2NF)** if:

1. It is already in **First Normal Form (1NF)** — all attributes are atomic.
2. It has **no partial dependency** — no non-prime attribute depends on only *part* of a candidate (composite) key.

A **non-prime attribute** is any attribute that is not part of any candidate key. A **partial dependency** occurs when a non-prime attribute is functionally dependent on a proper subset of a candidate key.

> 2NF only becomes an issue when a table has a **composite primary key**. If the primary key is a single column, a 1NF table is automatically in 2NF.

## Why it matters

Partial dependencies cause redundancy and update/insert/delete anomalies.

## Example

Consider `SCORES(StudentID, CourseID, StudentName, Marks)` with composite key `{StudentID, CourseID}`.

```text
Functional dependencies:
  {StudentID, CourseID} -> Marks        (full dependency - OK)
  StudentID             -> StudentName  (PARTIAL - depends on part of key)
```

`StudentName` depends only on `StudentID`, a subset of the key → violates 2NF. `StudentName` is repeated for every course the student takes.

### Decomposition into 2NF

```sql
-- Table 1: student details
CREATE TABLE STUDENT (
    StudentID   INT PRIMARY KEY,
    StudentName VARCHAR(50)
);

-- Table 2: enrollment / scores
CREATE TABLE SCORES (
    StudentID INT,
    CourseID  INT,
    Marks     INT,
    PRIMARY KEY (StudentID, CourseID),
    FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID)
);
```

Now every non-prime attribute depends on the **whole** key of its table.

## Comparison

| Aspect | Before 2NF | After 2NF |
|--------|-----------|-----------|
| Redundancy | StudentName repeated | Stored once |
| Update anomaly | Rename student in many rows | Update one row |
| Partial dependency | Present | Removed |

## Key points

- 2NF = 1NF + **no partial dependency** on a candidate key.
- Only relevant for **composite keys**; single-column-key tables in 1NF are already in 2NF.
- Fix by moving partially dependent attributes into a new table keyed on the subset they depend on.
- 2NF still allows **transitive dependencies** (removed later in 3NF).
