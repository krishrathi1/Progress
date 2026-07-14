## Definition

**Relational algebra** is a **procedural** query language for the relational model. It takes one or two relations as input and produces a new relation as output. Because operations can be chained, it forms the theoretical basis of SQL query execution and optimisation.

## Fundamental (Primitive) Operators

| Operator | Symbol | Purpose |
|----------|--------|---------|
| Selection | σ (sigma) | Choose **rows** matching a predicate |
| Projection | π (pi) | Choose **columns** (removes duplicates) |
| Union | ∪ | Rows in R **or** S |
| Set difference | − | Rows in R but **not** in S |
| Cartesian product | × | Every row of R paired with every row of S |
| Rename | ρ (rho) | Rename a relation/attributes |

## Derived Operators

- **Intersection** (∩): `R ∩ S = R − (R − S)`
- **Join** (⋈): combine `×` + `σ` on a matching condition.
- **Division** (÷): tuples in R associated with *all* tuples of S.

## Examples

Given `Student(RollNo, Name, Age, Dept)`:

```text
-- Names of students older than 20
π Name ( σ Age > 20 (Student) )

-- Students in CSE or ECE
σ Dept = 'CSE' ∨ Dept = 'ECE' (Student)

-- Join students with their department details
Student ⋈ (Student.Dept = Dept.DName) Department
```

```text
σ Age>20 (Student)          then   π Name (...)
┌──────┬──────┬─────┐              ┌──────┐
│ 102  │ Ravi │ 22  │   ───────►   │ Ravi │
│ 105  │ Sana │ 25  │              │ Sana │
└──────┴──────┴─────┘              └──────┘
   rows filtered                 columns projected
```

## Selection vs Projection

| Feature | Selection σ | Projection π |
|---------|-------------|--------------|
| Acts on | Rows (horizontal) | Columns (vertical) |
| Condition | Boolean predicate | List of attributes |
| Duplicates | Preserved | **Removed** |
| Degree of result | Same | Reduced |

## Set-Operation Requirement

`∪`, `∩`, and `−` require the two relations to be **union-compatible**: same number of attributes with matching domains.

## Key points

- Relational algebra is **procedural** — it specifies *how* to obtain the result step by step.
- Six primitives: **σ, π, ∪, −, ×, ρ**; others (∩, ⋈, ÷) are derived.
- **σ selects rows**, **π selects columns** (and removes duplicates).
- Set operators need **union-compatible** relations.
- It underpins SQL and query-optimisation in real DBMS engines.
