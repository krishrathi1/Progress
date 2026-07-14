## Definition

An **Entity-Relationship (ER) diagram** is a graphical representation of a database's conceptual schema. It uses a standard set of shapes and lines (Chen notation) to depict entities, their attributes, and the relationships among them.

## Standard Symbols

| Symbol | Meaning |
|--------|---------|
| **Rectangle** | Entity set |
| **Double rectangle** | Weak entity set |
| **Ellipse (oval)** | Attribute |
| **Double ellipse** | Multivalued attribute |
| **Dashed ellipse** | Derived attribute |
| **Ellipse with underline** | Key (primary) attribute |
| **Diamond** | Relationship set |
| **Double diamond** | Identifying relationship (for weak entity) |
| **Line** | Links attributes/entities to relationships |
| **Double line** | Total participation |

## Attribute Variants

```text
   (name)          simple attribute
  ( name )         key attribute (underlined text)
  ((phone))        multivalued  (double ellipse)
  (- age -)        derived      (dashed ellipse)
  (address)
    ├ street       composite attribute
    ├ city
    └ zip
```

## Example ER Diagram

```text
 ┌────────┐   1        N   ┌──────────┐
 │ Course │───◇ enrolls ◇──│ Student  │
 └────────┘                └──────────┘
     │                          │
  (CourseID)                (StudentID)
  (title)                   (name)((phone))

 ◇ = relationship diamond
 double line under Student—enrolls = total participation
```

## Cardinality Marking

- Ratios (1:1, 1:N, M:N) are written **near the diamond** on the connecting lines.
- Participation shown by single line (partial) or double line (total).

## Key points

- **Rectangle = entity, ellipse = attribute, diamond = relationship** — the three core shapes.
- Double shapes denote the "weak/identifying" variants; dashed shapes denote derived/partial.
- **Primary key attributes are underlined**; multivalued use double ellipses; derived use dashed ellipses.
- Cardinality and participation constraints are annotated on the lines.
- ER diagrams model the **conceptual level**, later mapped to relational tables.
