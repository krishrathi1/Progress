## Definition

The **relational model** (proposed by E. F. Codd, 1970) organises data as a collection of **relations** (tables). Each relation is a set of rows, and every value is atomic. It is the theoretical foundation of relational databases like MySQL, PostgreSQL and Oracle.

## Core Terminology

- **Relation** — a table; a set of tuples sharing the same attributes.
- **Tuple** — a single row of the table (one real-world record).
- **Attribute** — a named column of the relation.
- **Domain** — the set of allowed atomic values for an attribute (e.g., `Age` → non-negative integers).
- **Degree (arity)** — number of attributes (columns).
- **Cardinality** — number of tuples (rows).
- **Relation schema** — the structure: `Student(RollNo, Name, Age)`.
- **Relation instance** — the actual set of tuples at a moment in time.

```text
             Attributes / columns
        ┌─────────┬────────┬──────┐
        │ RollNo  │ Name   │ Age  │   <- Relation schema (header)
        ├─────────┼────────┼──────┤
Tuple → │  101    │ Asha   │  20  │
        │  102    │ Ravi   │  22  │
        └─────────┴────────┴──────┘
 Degree = 3 (columns), Cardinality = 2 (rows)
```

## Key Properties of a Relation

- **Atomic values** — every cell holds a single indivisible value (First Normal Form).
- **No duplicate tuples** — a relation is a *set*, so all rows are distinct.
- **Order is irrelevant** — rows and columns have no inherent ordering.
- **Unique attribute names** — no two columns share a name within a relation.
- **Each attribute drawn from one domain** — type consistency per column.

## Relational Model vs Older Models

| Feature | Relational | Hierarchical | Network |
|---------|-----------|--------------|---------|
| Structure | Tables | Tree | Graph |
| Relationships | Via keys / joins | Parent-child links | Pointers |
| Data access | Declarative (SQL) | Navigational | Navigational |
| Flexibility | High | Low | Medium |

## Key points

- Data is stored as relations (tables) of tuples over attribute domains.
- **Degree** = column count; **cardinality** = row count.
- Relations are sets: no duplicate rows, no guaranteed order.
- Every value must be **atomic** (satisfies 1NF).
- Relationships are expressed through **keys**, not physical pointers — enabling declarative querying with SQL.
