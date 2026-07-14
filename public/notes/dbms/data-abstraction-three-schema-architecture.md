## Definition

**Data abstraction** hides the complex details of *how* data is stored and lets users work with data at higher, simpler levels. The **ANSI/SPARC three-schema architecture** formalizes this into three levels of abstraction, achieving **data independence**.

## Three Levels of Abstraction

- **Physical (Internal) level** — the *lowest*: describes **how** data is physically stored (files, indexes, compression, blocks). Concerns DBAs.
- **Logical (Conceptual) level** — describes **what** data is stored and the relationships among it (tables, columns, constraints). The community/whole-DB view.
- **View (External) level** — the *highest*: describes **how individual users** see data; each user/app sees only a relevant subset, hiding the rest for simplicity and security.

```text
        +---------------------------+
 View   | External schema(s)        |  <- per-user views
 level  |  (Student view, HR view)  |
        +------------ | ------------+
                 logical/external mapping
        +------------ v ------------+
Logical | Conceptual schema         |  <- tables, relationships
 level  |  (whole database design)  |
        +------------ | ------------+
                 physical mapping
        +------------ v ------------+
Physical| Internal schema           |  <- storage, indexes, files
 level  +---------------------------+
```

## Data Independence

The mappings between levels give **data independence** — the ability to change one level without altering the one above.

| Type | Meaning |
|------|---------|
| **Logical data independence** | Change the conceptual schema (add a column, split a table) without changing external views/apps. Harder to achieve. |
| **Physical data independence** | Change physical storage (add an index, change file layout) without changing the conceptual schema. Easier to achieve. |

## Why It Matters

- Users query data without knowing storage format.
- DBAs tune performance without breaking applications.
- Views provide **security** (hide sensitive columns) and **simplicity**.

## Key points

- Three levels: **physical** (how stored) → **logical** (what stored) → **view** (per-user).
- Abstraction hides complexity and enforces security via external views.
- **Physical data independence**: change storage without touching conceptual schema.
- **Logical data independence**: change conceptual schema without touching views/apps (harder).
- Proposed by **ANSI/SPARC**; the foundation of data independence in DBMS.
