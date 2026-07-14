## Definition

A **key** is an attribute (or set of attributes) used to **uniquely identify** tuples in a relation and to establish relationships between relations. Keys enforce integrity and enable efficient access.

## Types of Keys

- **Super key** — any set of attributes that uniquely identifies a tuple. May contain extra (redundant) attributes.
- **Candidate key** — a *minimal* super key; no attribute can be removed without losing uniqueness. A relation can have several candidate keys.
- **Primary key** — the candidate key chosen by the designer as the main identifier. Cannot be NULL and must be unique.
- **Alternate key** — candidate keys **not** selected as the primary key.
- **Composite key** — a key made of **two or more** attributes together (needed when no single column is unique).
- **Foreign key** — an attribute in one relation that **references the primary key** of another (or same) relation, enforcing referential integrity.

```text
Super keys ⊇ Candidate keys ⊇ { Primary key }
                                └ remaining candidates = Alternate keys
```

## Example

```sql
CREATE TABLE Student (
    RollNo   INT,
    Email    VARCHAR(50) UNIQUE,   -- alternate (candidate) key
    Name     VARCHAR(50),
    DeptID   INT,
    PRIMARY KEY (RollNo),          -- primary key
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

-- Composite key example: a student can enrol in a course once
CREATE TABLE Enrollment (
    RollNo   INT,
    CourseID INT,
    Grade    CHAR(2),
    PRIMARY KEY (RollNo, CourseID) -- composite primary key
);
```

Here `{RollNo}` and `{Email}` are candidate keys; `RollNo` is primary, `Email` is alternate. `{RollNo, Name}` is a super key (not minimal).

## Comparison

| Key | Unique? | Minimal? | NULL allowed? | Multiple per table? |
|-----|---------|----------|---------------|---------------------|
| Super key | Yes | No | Depends | Many |
| Candidate key | Yes | Yes | No | Several |
| Primary key | Yes | Yes | No | Exactly one |
| Alternate key | Yes | Yes | No | Zero or more |
| Foreign key | No | — | Usually yes | Several |

## Key points

- Every **candidate key** is a super key; the reverse is not true.
- One candidate key becomes the **primary key**; the rest are **alternate keys**.
- **Composite key** = multiple attributes forming one key.
- **Foreign keys** enforce referential integrity across tables and may be NULL.
- Primary key values must be **unique and non-NULL** (entity integrity).
