## Definition

In the **Entity-Relationship (ER) model**, the real world is described using **entities**, **entity sets**, and **attributes**. These are the basic building blocks used to design a database before it is converted into relational tables.

- **Entity** — a real-world object or thing that is distinguishable from other objects. It can be tangible (a *Student*, a *Car*) or conceptual (a *Course*, a *Loan*).
- **Entity set** — a collection of entities of the **same type** that share the same attributes (e.g., all *Students*). It maps to a **table** in the relational model.
- **Attribute** — a property or characteristic that describes an entity (e.g., a Student's `roll_no`, `name`, `age`). It maps to a **column**.

## Mapping to Relational Terms

| ER concept | Relational term | Example |
|------------|-----------------|---------|
| Entity | Row / Tuple | One student: (12, "Asha", 20) |
| Entity set | Table / Relation | STUDENT table |
| Attribute | Column / Field | roll_no, name, age |

## ER Diagram Notation

```text
        ┌──────────┐
        │ roll_no  │  (key attribute is underlined)
        └────┬─────┘
   ( name )──┤ STUDENT ├──( age )
        ┌────┴─────┐
        │  Entity  │
        │   set    │
        └──────────┘

Rectangle = Entity set
Ellipse   = Attribute
Underline = Key attribute
```

## Example

An entity set **STUDENT** with attributes `roll_no` (key), `name`, `age`:

| roll_no | name | age |
|---------|------|-----|
| 12 | Asha | 20 |
| 13 | Ravi | 21 |

Each **row is one entity**; the **whole table is the entity set**; each **column is an attribute**.

## Strong vs Weak Entity Set (brief)
- **Strong entity set** — has its own **primary key** (drawn as a single rectangle).
- **Weak entity set** — has no key of its own; depends on a strong "owner" entity (drawn as a double rectangle) and uses a **partial key** + owner's key.

## Key points
- **Entity** = one object; **entity set** = collection of same-type entities → becomes a **table**.
- **Attributes** describe entities and become **columns**; a **key attribute** uniquely identifies each entity and is underlined.
- ER model is a **conceptual design** tool, later mapped to relational schema.
- Distinguish **strong** (own key) from **weak** (partial key + owner) entity sets.
