## Definition

These are **abstraction mechanisms** in the Enhanced ER (EER) model used to manage complexity by grouping or relating entities in higher-level structures.

## Generalization

Combining two or more lower-level entity sets that share common attributes into a single **higher-level (superclass) entity**. It is a **bottom-up** approach.

```text
   Car        Truck        (subclasses)
     \         /
      \       /   ISA
       Vehicle              (superclass)
```
- Example: `Car` and `Truck` → generalized into `Vehicle`.
- Common attributes move up to the superclass.

## Specialization

The **top-down** opposite of generalization: a higher-level entity is split into lower-level subclasses based on distinguishing characteristics.

```text
        Account            (superclass)
        /     \    ISA
  Savings    Current       (subclasses)
```
- Example: `Account` specialized into `Savings` and `Current`, each with extra attributes (`interest_rate`, `overdraft_limit`).

## Aggregation

Treats a **relationship set as a higher-level entity** so it can participate in another relationship. It solves the problem that ER models cannot express a relationship among relationships.

```text
  ┌ Employee ─ works_on ─ Project ┐
  │        (aggregated as one)    │
  └──────────── manages ──────────┘
                  │
               Manager
```
- Example: the `works_on` relationship (Employee–Project) is aggregated, and a `Manager` supervises that whole relationship.

## Comparison

| Concept | Direction | Purpose |
|---------|-----------|---------|
| Generalization | Bottom-up | Merge common entities into a superclass |
| Specialization | Top-down | Split entity into specialized subclasses |
| Aggregation | — | Treat a relationship as an entity |

## Key points

- **Generalization = bottom-up**, **Specialization = top-down**; they are inverse processes using an **ISA** hierarchy.
- Subclasses **inherit** attributes and relationships of the superclass.
- Constraints on specialization: **disjoint vs overlapping**, and **total vs partial**.
- **Aggregation** models a relationship-among-relationships by abstracting a relationship set into an entity.
- All three are **EER (Enhanced ER)** features that reduce redundancy and improve clarity.
