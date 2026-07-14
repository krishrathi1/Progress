## Definition

**Data independence** is the capacity to change the schema at one level of a database system **without having to alter the schema at the next higher level**. It is a direct benefit of the **three-schema architecture** (external, conceptual, internal) proposed by ANSI/SPARC.

The goal is to insulate applications and users from low-level storage details, so the database can evolve (new indexes, reorganized files, added columns) without breaking existing programs.

## The Three-Schema Architecture

```text
   External Level   →  User Views (View 1, View 2, ...)
        │  ← Logical Data Independence
   Conceptual Level →  Logical schema (tables, relationships, constraints)
        │  ← Physical Data Independence
   Internal Level   →  Physical storage (files, indexes, blocks)
```

## Two Types

### 1. Logical Data Independence
- Ability to change the **conceptual (logical) schema** without changing **external schemas / application programs**.
- Examples: adding a new column/table, merging or splitting tables, changing relationships.
- **Harder to achieve** because applications depend heavily on the logical structure they query.

### 2. Physical Data Independence
- Ability to change the **internal (physical) schema** without changing the **conceptual schema**.
- Examples: adding an index, switching file organization (heap → hash), moving to a different disk, compression.
- **Easier to achieve** since queries are written against logical structures, not physical layout.

## Comparison

| Aspect | Logical Data Independence | Physical Data Independence |
|--------|---------------------------|----------------------------|
| Levels involved | External ↔ Conceptual | Conceptual ↔ Internal |
| Insulates | Applications/user views | Logical schema |
| Change example | Add column, split table | Add index, change storage |
| Difficulty | Difficult | Easier |

## Key points
- Data independence = change one schema level without disturbing the level above it.
- Enabled by the **three-schema (ANSI/SPARC) architecture**.
- **Physical** independence is easier; **logical** independence is harder because apps are tightly coupled to the logical schema.
- Mappings between levels are what make independence possible; more mappings mean higher maintenance cost.
