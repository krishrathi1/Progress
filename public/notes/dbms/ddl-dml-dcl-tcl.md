## Definition

SQL commands are grouped into **sub-languages** by purpose. The four most-tested categories are **DDL** (structure), **DML** (data), **DCL** (permissions), and **TCL** (transactions). Some texts add **DQL** for `SELECT`.

## The Four Categories

| Category | Full form | Purpose | Common commands | Auto-commit? |
|----------|-----------|---------|-----------------|--------------|
| **DDL** | Data Definition Language | Define/modify schema | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` | Yes (implicit) |
| **DML** | Data Manipulation Language | Manipulate rows | `INSERT`, `UPDATE`, `DELETE`, (`SELECT`) | No |
| **DCL** | Data Control Language | Permissions | `GRANT`, `REVOKE` | Yes |
| **TCL** | Transaction Control Language | Manage transactions | `COMMIT`, `ROLLBACK`, `SAVEPOINT` | — |

## DDL — Data Definition Language
Defines the database structure. DDL statements **auto-commit** (cannot be rolled back in most RDBMS).

```sql
CREATE TABLE student (
  id   INT PRIMARY KEY,
  name VARCHAR(50)
);
ALTER TABLE student ADD COLUMN age INT;
TRUNCATE TABLE student;   -- removes all rows, keeps structure (DDL)
DROP TABLE student;       -- removes table entirely
```

## DML — Data Manipulation Language
Works on the data inside tables. Changes are **not permanent** until a `COMMIT`.

```sql
INSERT INTO student (id, name) VALUES (1, 'Asha');
UPDATE student SET name = 'Asha K' WHERE id = 1;
DELETE FROM student WHERE id = 1;   -- can be rolled back
```

## DCL — Data Control Language
Controls access rights and privileges.

```sql
GRANT SELECT, INSERT ON student TO clerk;
REVOKE INSERT ON student FROM clerk;
```

## TCL — Transaction Control Language
Manages the transactions made by DML.

```sql
INSERT INTO student VALUES (2, 'Ravi');
SAVEPOINT s1;
UPDATE student SET name = 'Ravi K' WHERE id = 2;
ROLLBACK TO s1;   -- undo update, keep insert
COMMIT;           -- make remaining changes permanent
```

## DELETE vs TRUNCATE vs DROP

| | DELETE (DML) | TRUNCATE (DDL) | DROP (DDL) |
|-|--------------|----------------|------------|
| Removes | Selected rows | All rows | Whole table |
| WHERE | Yes | No | No |
| Rollback | Yes | No (auto-commit) | No |
| Structure kept | Yes | Yes | No |

## Key points
- **DDL** = structure, **DML** = data, **DCL** = permissions, **TCL** = transactions.
- DDL and DCL **auto-commit**; DML can be rolled back via TCL.
- `TRUNCATE` is DDL (fast, no WHERE, no rollback); `DELETE` is DML (row-by-row, rollback-able).
- `SELECT` is sometimes classified separately as **DQL**.
