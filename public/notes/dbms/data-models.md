## Definition

A **data model** is a conceptual framework that defines **how data is structured, related, constrained, and manipulated** in a database. It provides the abstract blueprint used to design the logical schema before physical implementation.

## Major Data Models

- **Hierarchical model** — data organized as a **tree**; each child has exactly one parent (1:N). Fast for tree-like data but rigid; no many-to-many. Example: IBM IMS.
- **Network model** — data as a **graph**; a record can have multiple parents (M:N) via "sets". More flexible than hierarchical but complex pointers. Example: IDMS.
- **Relational model** — data in **tables (relations)** of rows and columns, linked by keys. Uses SQL. Dominant model today. Example: MySQL, PostgreSQL, Oracle.
- **Entity-Relationship (ER) model** — a **design/diagram** model using entities, attributes, and relationships; used to plan a database, then converted to relational tables.
- **Object-oriented model** — data as **objects** (data + methods), supporting inheritance and encapsulation; suits complex data. Example: db4o.
- **Object-relational model** — relational tables extended with object features (custom types). Example: PostgreSQL types.

```text
Hierarchical (tree)      Network (graph)        Relational (tables)
     A                    A     B                 +----+------+
    / \                    \   /                  | id | name |
   B   C                    \ /                   +----+------+
  / \                        C                    |  1 | Ann  |
 D   E                                            +----+------+
```

## Comparison

| Model | Structure | Relationship | Query | Status |
|-------|-----------|--------------|-------|--------|
| Hierarchical | Tree | 1:N only | Navigational | Legacy |
| Network | Graph | M:N | Navigational | Legacy |
| Relational | Tables | Via keys | SQL (declarative) | Dominant |
| ER | Diagram | Entities/relations | Design tool | Design phase |
| Object-oriented | Objects | Inheritance | OQL | Niche |

## Key points

- A data model defines structure, relationships, constraints, and operations.
- **Relational model** (tables + keys + SQL) dominates modern databases.
- **ER model** is a *design* model, later mapped to relational tables.
- Hierarchical (tree) and network (graph) are older, navigational models.
- Object-oriented/object-relational models handle complex, rich data types.
