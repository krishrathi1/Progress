## Definition

A **key** is an attribute (or set of attributes) that uniquely identifies an entity within an entity set. Keys are the foundation for enforcing uniqueness and for linking entities through relationships in the ER model.

## Types of Keys

| Key | Description |
|-----|-------------|
| **Super key** | Any set of attributes that uniquely identifies a tuple (may have extra attributes). |
| **Candidate key** | A minimal super key — no attribute can be removed without losing uniqueness. |
| **Primary key** | The candidate key chosen by the designer to identify entities; underlined in ER diagrams. |
| **Alternate key** | Candidate keys not chosen as the primary key. |
| **Composite key** | A key made of two or more attributes. |
| **Partial (discriminator) key** | Attribute of a weak entity that distinguishes entities sharing the same owner; drawn with a **dashed underline**. |
| **Foreign key** | Attribute referencing the primary key of another entity (appears when mapping to relations). |

## Relationship of Key Types

```text
        Super keys
       ┌───────────┐
       │ Candidate │   <- minimal super keys
       │  keys     │
       │  ┌─────┐  │
       │  │ PK  │  │   <- one candidate key chosen
       │  └─────┘  │
       └───────────┘
```

## ER Diagram Notation

```text
  Student( StudentID , name, email )
            ‾‾‾‾‾‾‾‾‾
   underline = primary key attribute

  Dependent( .name. )   <- dashed underline = partial key (weak entity)
```

## Example

- `Employee(EmpID, SSN, name, dept)` — both `EmpID` and `SSN` are candidate keys; `{EmpID, name}` is a super key; choose `EmpID` as the primary key, making `SSN` an alternate key.

## Key points

- **Super key ⊇ Candidate key ⊇ Primary key** — each is a stricter form.
- Candidate keys are **minimal**; a super key may carry redundant attributes.
- The chosen primary key is **underlined**; a weak entity's partial key uses a **dashed underline**.
- Primary keys must be unique and non-null.
- Foreign keys appear during ER-to-relational mapping, not in the pure ER diagram.
