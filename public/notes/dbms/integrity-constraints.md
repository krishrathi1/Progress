## Definition

**Integrity constraints** are rules enforced by the DBMS to guarantee that data remains **accurate, consistent and valid** at all times. Any operation (insert/update/delete) that violates a constraint is rejected, preserving the correctness of the database.

## Categories of Constraints

### 1. Domain constraint
Every value of an attribute must belong to its declared **domain** (data type + allowed range).
- Example: `Age INT CHECK (Age >= 0)`.

### 2. Entity integrity constraint
The **primary key** of a relation cannot be **NULL** (and must be unique). Ensures every tuple is identifiable.

### 3. Referential integrity constraint
A **foreign key** must either match an existing primary key value in the referenced relation or be **NULL**. Prevents "dangling" references.

### 4. Key constraint
Values of a **candidate/primary key** must be **unique** across all tuples.

```text
        DEPARTMENT                 EMPLOYEE
   ┌────────┬──────────┐     ┌───────┬───────┬────────┐
   │ DeptID │ DName    │     │ EmpID │ Name  │ DeptID │
   ├────────┼──────────┤     ├───────┼───────┼────────┤
   │  10    │ Sales    │◄────┤  1    │ Asha  │  10    │  ✔ valid FK
   │  20    │ IT       │◄────┤  2    │ Ravi  │  20    │
   └────────┴──────────┘     │  3    │ Kiran │  99    │  X REJECTED (no Dept 99)
                             └───────┴───────┴────────┘
```

## Referential Actions

When a referenced (parent) row changes, the DBMS applies a rule to child rows:

| Action | On DELETE / UPDATE of parent |
|--------|------------------------------|
| `CASCADE` | Delete/update matching child rows too |
| `SET NULL` | Set child foreign key to NULL |
| `SET DEFAULT` | Set child FK to its default value |
| `RESTRICT` / `NO ACTION` | Reject the operation if children exist |

## SQL Example

```sql
CREATE TABLE Employee (
    EmpID  INT PRIMARY KEY,               -- entity + key constraint
    Name   VARCHAR(50) NOT NULL,          -- NOT NULL constraint
    Age    INT CHECK (Age BETWEEN 18 AND 65),  -- domain constraint
    Email  VARCHAR(50) UNIQUE,            -- unique constraint
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
        ON DELETE SET NULL ON UPDATE CASCADE   -- referential integrity
);
```

## Key points

- Constraints keep data **valid automatically** — the DBMS enforces them, not the application.
- **Entity integrity**: primary key ≠ NULL. **Referential integrity**: FK matches a PK or is NULL.
- **Domain** and **CHECK** constraints restrict allowable values.
- Referential actions (`CASCADE`, `SET NULL`, `RESTRICT`) control behaviour on parent changes.
- Violating any constraint causes the transaction to be **rejected/rolled back**.
