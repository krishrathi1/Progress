## Definition

These are the most important **relational algebra operations** used to retrieve and combine data. **Selection** and **Projection** are unary (one relation); **Join** and **Division** are binary (two relations).

## 1. Selection (σ)

Filters **rows** that satisfy a predicate. Degree unchanged; cardinality may shrink.

```text
σ Age > 20 (Student)     -- keep rows where Age > 20
σ Dept='CSE' ∧ Age<25 (Student)
```
SQL equivalent: `SELECT * FROM Student WHERE Age > 20;`

## 2. Projection (π)

Selects specific **columns** and **removes duplicate** rows.

```text
π Name, Dept (Student)
```
SQL equivalent: `SELECT DISTINCT Name, Dept FROM Student;`

## 3. Join (⋈)

Combines related tuples from two relations based on a condition.

- **Theta join** `⋈θ` — any comparison condition.
- **Equi join** — condition uses only `=`.
- **Natural join** `⋈` — auto-matches columns of the same name and keeps one copy.
- **Outer joins** — keep unmatched rows (left ⟕, right ⟖, full ⟗) padding with NULLs.

```text
Student(RollNo,Name,DeptID) ⋈ Department(DeptID,DName)

RollNo Name  DeptID      DeptID DName          Result
  1    Asha   10          10    Sales     ->  (1, Asha, 10, Sales)
  2    Ravi   20          20    IT             (2, Ravi, 20, IT)
```
SQL: `SELECT * FROM Student NATURAL JOIN Department;`

## 4. Division (÷)

Returns tuples from R associated with **all** tuples in S. Answers "**for all**" queries, e.g. *students who took every course*.

```text
Enroll(RollNo, CourseID)  ÷  Course(CourseID)  =  { RollNo who took ALL courses }
```

```text
Enroll                 Course        Result (÷)
Roll  Course           Course
 1     C1               C1     ->    Roll = 1
 1     C2               C2           (student 1 took both C1 and C2)
 2     C1
```
Student 2 took only C1, so is excluded.

## Summary Table

| Operation | Symbol | Arity | Acts on | SQL analogue |
|-----------|--------|-------|---------|--------------|
| Selection | σ | Unary | Rows | `WHERE` |
| Projection | π | Unary | Columns | `SELECT DISTINCT` |
| Join | ⋈ | Binary | Two tables | `JOIN ... ON` |
| Division | ÷ | Binary | Two tables | "for all" (no direct keyword) |

## Key points

- **σ = rows, π = columns**; projection removes duplicates, selection does not.
- **Join** merges related tuples; natural join matches same-named columns and drops the duplicate.
- **Outer joins** preserve unmatched rows using NULLs.
- **Division** implements "for **all**" queries — the counterpart of the `∀` quantifier.
- All four map closely to everyday **SQL** query patterns.
