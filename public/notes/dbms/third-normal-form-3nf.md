## Definition

A relation is in **Third Normal Form (3NF)** if:

1. It is already in **Second Normal Form (2NF)**.
2. It has **no transitive dependency** — no non-prime attribute depends on another non-prime attribute.

**Formal (Codd) rule:** For every functional dependency `X → Y`, at least one of the following holds:
- `X` is a **superkey**, OR
- `Y` is a **prime attribute** (part of some candidate key).

A **transitive dependency** is `A → B → C`, where a non-key attribute `C` depends on another non-key attribute `B`.

## Example

`STUDENT(StudentID, Name, ZIP, City)` with key `StudentID`.

```text
FDs:
  StudentID -> ZIP        (OK, key determines it)
  ZIP       -> City       (TRANSITIVE: non-key -> non-key)
So: StudentID -> ZIP -> City
```

`City` transitively depends on `StudentID` through `ZIP` → violates 3NF. City is repeated for every student in the same ZIP.

### Decomposition into 3NF

```sql
CREATE TABLE STUDENT (
    StudentID INT PRIMARY KEY,
    Name      VARCHAR(50),
    ZIP       VARCHAR(10),
    FOREIGN KEY (ZIP) REFERENCES ZIPCODE(ZIP)
);

CREATE TABLE ZIPCODE (
    ZIP  VARCHAR(10) PRIMARY KEY,
    City VARCHAR(50)
);
```

```text
Dependency flow after decomposition:

  STUDENT: StudentID -> Name, ZIP
  ZIPCODE: ZIP -> City         (ZIP is now a key -> allowed)
```

## Comparison

| Normal Form | Removes | Condition |
|-------------|---------|-----------|
| 1NF | Repeating groups | Atomic values |
| 2NF | Partial dependency | No non-prime depends on part of key |
| 3NF | Transitive dependency | Every FD: LHS is superkey or RHS is prime |

## Key points

- 3NF = 2NF + **no transitive dependency** of non-prime attributes.
- "The key, the whole key, and nothing but the key."
- 3NF is **always achievable** while being both **lossless** and **dependency-preserving** (Bernstein's synthesis algorithm).
- Most practical schemas are normalized up to 3NF; it balances redundancy removal with query performance.
