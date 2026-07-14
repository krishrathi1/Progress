## Definition

A **Database** is an organized, persistent collection of related data. A **Database Management System (DBMS)** is the software that lets users **define, create, store, query, update, and administer** databases while controlling concurrent access, security, and integrity.

- **Database** = the data itself (tables, records, indexes).
- **DBMS** = the software layer (MySQL, PostgreSQL, Oracle, MongoDB) sitting between users/applications and the raw data.

## Why DBMS Exists

Before DBMS, applications stored data in flat files, which caused redundancy, inconsistency, and no concurrency control. A DBMS solves these by acting as a controlled gateway.

```text
   Users / Applications
          |
       [ DBMS ]  <- security, concurrency, integrity, queries
          |
    +-----+-----+
    | Database  |  (tables, indexes, metadata)
    +-----------+
```

## Key Functions

- **Data definition** — describe structure via DDL (`CREATE`, `ALTER`).
- **Data manipulation** — insert/query/update via DML (`SELECT`, `INSERT`).
- **Concurrency control** — many users access data safely at once.
- **Integrity** — enforce constraints (primary keys, foreign keys, checks).
- **Security** — authentication and authorization (grant/revoke).
- **Recovery & backup** — restore consistent state after failures.
- **Transactions** — group operations with ACID guarantees.

## Characteristics

| Property | Meaning |
|----------|---------|
| Self-describing | Metadata (catalog) stored alongside data |
| Data independence | Change storage without changing programs |
| Reduced redundancy | Data stored once, shared by many apps |
| Concurrent access | Multiple users via locking/MVCC |
| Data integrity | Constraints keep data valid |

## Types of DBMS

- **Relational (RDBMS)** — data in tables; SQL; e.g. MySQL, PostgreSQL.
- **Hierarchical** — tree structure; e.g. IBM IMS.
- **Network** — graph of records; e.g. IDMS.
- **Object-oriented** — stores objects; e.g. db4o.
- **NoSQL** — document/key-value/graph; e.g. MongoDB, Redis.

## Key points

- DBMS manages data; the database is the data itself.
- Core goals: minimize redundancy, ensure integrity, enable concurrency and security.
- Provides **data abstraction** and **data independence** so apps are decoupled from storage.
- Supports **transactions** with ACID properties.
- RDBMS (SQL-based) is the most common category in exams and interviews.
