## Overview

4NF and 5NF are **higher normal forms** that deal with dependencies BCNF cannot handle: **multivalued dependencies** and **join dependencies**.

## Fourth Normal Form (4NF)

A relation is in 4NF if it is in **BCNF** and has **no non-trivial multivalued dependency (MVD)** unless the determinant is a superkey.

A **multivalued dependency** `X ↠ Y` means: for a given value of `X`, there is a *set* of values of `Y` independent of the other attributes. MVDs cause redundancy when two independent multivalued facts sit in one table.

### Example

`FACULTY(Name, Course, Hobby)` — a person teaches many courses AND has many hobbies, and the two are independent.

```text
Name  ↠ Course
Name  ↠ Hobby      (independent of Course)

Redundant rows (cartesian product):
  Ravi | DBMS | Chess
  Ravi | DBMS | Music
  Ravi | OS   | Chess
  Ravi | OS   | Music
```

**Fix — split the independent MVDs:**

```sql
CREATE TABLE FACULTY_COURSE (Name VARCHAR(50), Course VARCHAR(50),
    PRIMARY KEY (Name, Course));
CREATE TABLE FACULTY_HOBBY  (Name VARCHAR(50), Hobby  VARCHAR(50),
    PRIMARY KEY (Name, Hobby));
```

## Fifth Normal Form (5NF / PJNF)

Also called **Project-Join Normal Form**. A relation is in 5NF if it is in 4NF and every **join dependency** is implied by its candidate keys — i.e., the table **cannot be decomposed** into smaller tables and losslessly reconstructed by joining them, unless those pieces share a candidate key.

5NF removes redundancy caused by relationships that only exist as a **three-way (or n-way)** fact.

### Example

`SUPPLY(Supplier, Part, Project)` — a supplier supplies a part to a project only under a cyclic constraint. It may need to be split into three binary tables `SP`, `PJ`, `SJ` whose join reconstructs the original without spurious tuples.

## Comparison

| Normal Form | Eliminates | Based on |
|-------------|-----------|----------|
| BCNF | Functional-dependency anomalies | FDs |
| 4NF | Multivalued dependency redundancy | MVDs |
| 5NF | Join-dependency redundancy | Join dependencies |

## Key points

- **4NF** removes independent **multivalued dependencies** — split them into separate tables.
- **5NF** removes **join dependencies** not implied by candidate keys — the ultimate lossless decomposition.
- Both are rare in practice; most designs stop at 3NF/BCNF.
- Over-normalizing (4NF/5NF) can hurt performance by requiring more joins.
