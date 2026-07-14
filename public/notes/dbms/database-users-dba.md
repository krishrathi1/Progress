## Definition

A **database system** serves many kinds of people who interact with it at different levels of abstraction. These range from casual end users who never see SQL, to the **Database Administrator (DBA)** who controls the entire system. Understanding these roles is a common DBMS interview and exam topic.

## Categories of Database Users

- **Naive / End users** — interact through forms, apps, or menus (e.g., a bank teller, an ATM user). They never write queries directly.
- **Application programmers** — write application programs (Java, Python) that access the database via APIs like JDBC/ODBC and embedded SQL.
- **Sophisticated users** — analysts, scientists, and engineers who write **ad-hoc queries** directly (SQL, OLAP tools) without writing full programs.
- **Specialized users** — build complex applications such as CAD, GIS, or expert systems that don't fit the traditional data-processing model.
- **Database Administrator (DBA)** — has central control over data and the programs that access it.

## The Database Administrator (DBA)

The DBA is the person (or team) responsible for the overall management of the database.

```text
              ┌──────────────┐
   Users ───► │     DBA      │ ───► Schema, Security,
              │  (central    │       Tuning, Backup,
              │   control)   │       Recovery
              └──────────────┘
```

### DBA Responsibilities

| Responsibility | Description |
|----------------|-------------|
| Schema definition | Defines conceptual schema using DDL |
| Storage & access method | Chooses file organization, indexes |
| Security & authorization | Grants/revokes privileges (GRANT/REVOKE) |
| Backup & recovery | Ensures data survives failures |
| Performance tuning | Monitors and optimizes queries |
| Integrity constraints | Enforces valid data rules |

```sql
-- DBA granting privileges to an application user
GRANT SELECT, INSERT ON employees TO app_user;
REVOKE INSERT ON employees FROM app_user;
```

## Key points
- Users span **naive, application programmers, sophisticated, specialized, and DBA**.
- The **DBA** has central authority: schema, security, tuning, backup/recovery, and constraints.
- The DBA uses **DDL** for schema and **DCL** (GRANT/REVOKE) for authorization.
- Separating roles supports security and the principle of least privilege.
