## Definition

In the ER model, **structural constraints** describe how entities in one set can be associated with entities in another through a relationship. They come in two parts: **cardinality ratio** (how many) and **participation** (whether every entity must take part).

## Cardinality Ratio

The cardinality ratio specifies the maximum number of relationship instances an entity can participate in.

| Type | Meaning | Example |
|------|---------|---------|
| **One-to-One (1:1)** | Each A relates to at most one B and vice-versa | Person — Passport |
| **One-to-Many (1:N)** | One A relates to many B; each B to one A | Department — Employees |
| **Many-to-One (N:1)** | Many A relate to one B | Employees — Department |
| **Many-to-Many (M:N)** | Each A relates to many B and vice-versa | Student — Course |

## Participation Constraints

Participation defines the **minimum** number of relationship instances (0 or 1).

- **Total participation** — every entity in the set MUST participate (shown by a **double line**). Example: every Loan must be linked to a Borrower.
- **Partial participation** — an entity may or may not participate (single line). Example: not every Employee manages a department.

```text
   Employee ====== works_for ------ Department
            (total)            (partial)

  double line = total participation
  single line = partial participation
  1 : N cardinality written above the diamond
```

## Combined Notation Example

```text
        1                 N
Department ---< manages >--- Employee
   (partial)              (total, ==)
```
Meaning: one department manages many employees; every employee must belong to a department (total), but a department need not manage anyone (partial).

## Key points

- **Cardinality** = maximum count; **participation** = minimum count (0 = partial, 1 = total).
- Four cardinality ratios: 1:1, 1:N, N:1, M:N.
- Total participation is drawn with a **double line**; partial with a single line.
- Constraints guide how relationships map to tables and where foreign keys / NOT NULL go.
- A weak entity always has **total participation** in its identifying relationship.
