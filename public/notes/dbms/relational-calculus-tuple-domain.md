## Definition

**Relational calculus** is a **non-procedural** (declarative) query language: you specify **what** result you want, not **how** to compute it. It is based on **first-order predicate logic**. There are two forms — **Tuple Relational Calculus (TRC)** and **Domain Relational Calculus (DRC)**.

## Tuple Relational Calculus (TRC)

Variables range over **tuples** (rows). General form:

```text
{ t | P(t) }
```

Read as: "the set of all tuples `t` for which predicate `P(t)` is true."

Example — names and ages of students older than 20:

```text
{ t.Name, t.Age | t ∈ Student ∧ t.Age > 20 }
```

Uses quantifiers `∃` (there exists) and `∀` (for all):

```text
-- Students who enrolled in at least one course
{ t | ∃ e ∈ Enroll ( e.RollNo = t.RollNo ) ∧ t ∈ Student }
```

## Domain Relational Calculus (DRC)

Variables range over **domains** (individual attribute values). General form:

```text
{ <x1, x2, ..., xn> | P(x1, x2, ..., xn) }
```

Example — names of students older than 20:

```text
{ <N> | ∃ R, A ( <R, N, A> ∈ Student ∧ A > 20 ) }
```

```text
TRC : one variable  t  = whole row      { t | ... }
DRC : one variable per column (R,N,A)    { <N> | ... }
      ┌───────────────┐
      │ Student(R,N,A)│  ──►  both return { Ravi, Sana }
      └───────────────┘
```

## Safety

A calculus expression must be **safe** — it must produce a **finite** relation. For example `{ t | ¬(t ∈ Student) }` is *unsafe* because it yields infinitely many tuples not in Student. DBMSs only allow safe expressions.

## Comparison

| Feature | Tuple RC | Domain RC |
|---------|----------|-----------|
| Variable ranges over | Tuples (rows) | Domain values (columns) |
| Notation | `{ t | P(t) }` | `{ <x,y> | P(x,y) }` |
| Basis | Predicate logic | Predicate logic |
| Both are | Non-procedural / declarative | Non-procedural / declarative |

## Relational Algebra vs Calculus

| Aspect | Relational Algebra | Relational Calculus |
|--------|--------------------|---------------------|
| Nature | Procedural (how) | Declarative (what) |
| Result | Sequence of operations | Set defined by a predicate |
| Expressive power | **Equivalent** (Codd's theorem) | Equivalent |

## Key points

- Relational calculus is **declarative** — describe the result, not the steps.
- **TRC** variables denote whole tuples; **DRC** variables denote individual attribute values.
- Uses predicate logic with `∃` and `∀` quantifiers.
- Expressions must be **safe** (finite output).
- By **Codd's theorem**, relational algebra and (safe) relational calculus have **equal expressive power**.
