## Definition

A **weak entity set** is an entity set that does **not have a key attribute of its own** to uniquely identify its entities. It depends on another entity, called the **owner** (or identifying/strong) entity, for its identification and existence.

## Key Characteristics

- Has no sufficient primary key on its own.
- Identified by combining the owner's primary key with its own **partial key** (discriminator).
- Connected to the owner through an **identifying relationship**.
- Has **total participation** in the identifying relationship (it cannot exist without an owner).

## ER Notation

```text
  Employee ==== has ==== Dependent
  (strong)   (identifying)  (weak)

  ┌────────┐  ╔════════╗  ╔══════════╗
  │Employee│──║  has   ║──║ Dependent║
  └────────┘  ╚════════╝  ╚══════════╝
   rectangle  double        double
              diamond       rectangle
```

- **Weak entity** → drawn with a **double rectangle**.
- **Identifying relationship** → drawn with a **double diamond**.
- **Partial key** → drawn with a **dashed underline**.
- Double line between weak entity and relationship → **total participation**.

## Example

A **Dependent** (of an employee) has attributes `name`, `age`, `relationship`. Two employees may each have a dependent named "Sam", so `name` alone is not unique. The dependent is identified as:

```text
Dependent key = EmpID (owner PK) + name (partial key)
```

## Weak vs Strong Entity

| Aspect | Strong entity | Weak entity |
|--------|--------------|-------------|
| Primary key | Has its own | Owner PK + partial key |
| Existence | Independent | Depends on owner |
| Symbol | Single rectangle | Double rectangle |
| Participation | May be partial | Total in identifying rel. |

## Key points

- A weak entity **cannot be uniquely identified** by its own attributes alone.
- Its full key = **owner's primary key + partial (discriminator) key**.
- Always drawn with **double rectangle**, connected via a **double-diamond identifying relationship**.
- Exhibits **total participation** in that relationship.
- When mapped to a relation, the owner's primary key becomes a **foreign key** and part of the weak entity's composite primary key.
