## Definition

- **Schema** — the **overall logical design/structure** of a database: the tables, columns, data types, and constraints. It is defined at design time and changes **rarely**. Think of it as the *blueprint*.
- **Instance (state)** — the **actual data** stored in the database at a **particular moment in time**. It changes **frequently** with every insert/update/delete. Think of it as a *snapshot*.

An analogy: a **schema** is like a class/type definition; an **instance** is like the objects/values held right now.

## Illustration

```text
SCHEMA (structure, fixed)              INSTANCE (data at time T)
--------------------------             --------------------------
Student(                               id | name  | age
  id   INT PRIMARY KEY,                ---+-------+----
  name VARCHAR(50),                     1 | Ann   | 20
  age  INT                              2 | Ravi  | 22
)                                       3 | Meera | 21
```

The schema above stays constant; the three rows form one instance. Deleting a row produces a **new instance** but the **same schema**.

## Types of Schema

- **Physical schema** — design at the physical/internal level (storage).
- **Logical schema** — design at the conceptual level (tables, relationships).
- **View schema** — design at the external/view level.

## Comparison

| Aspect | Schema | Instance |
|--------|--------|----------|
| Represents | Structure / design | Actual data |
| Changes | Rarely (design time) | Frequently (runtime) |
| Analogy | Blueprint / class | Snapshot / object |
| Defined by | DDL (`CREATE TABLE`) | DML (`INSERT`, `UPDATE`) |
| Time-dependent | No | Yes (a moment in time) |

## Example in SQL

```sql
-- Schema definition (structure)
CREATE TABLE Student (
  id   INT PRIMARY KEY,
  name VARCHAR(50),
  age  INT
);

-- Instance manipulation (data at some time)
INSERT INTO Student VALUES (1, 'Ann', 20);
DELETE FROM Student WHERE id = 1;  -- new instance, same schema
```

## Key points

- **Schema** = structure/blueprint, set at design time, changes rarely.
- **Instance** = actual data at a specific moment, changes constantly.
- One schema, but infinitely many possible instances over time.
- Schema is defined with **DDL**; instances change via **DML**.
