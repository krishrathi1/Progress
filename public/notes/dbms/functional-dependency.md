## Definition

A **functional dependency (FD)** is a constraint between two sets of attributes in a relation. We write:

```text
X → Y   (read: "X functionally determines Y")
```

It means: **whenever two tuples agree on all attributes of X, they must also agree on all attributes of Y.** X is the *determinant*, Y is the *dependent*.

FDs are the foundation of normalization — they capture the real-world business rules that a schema must obey.

## Example

Consider `Student(RollNo, Name, Dept, DeptHead)`:

| RollNo | Name | Dept | DeptHead |
|--------|------|------|----------|
| 1 | Asha | CS | Dr. Rao |
| 2 | Bela | CS | Dr. Rao |
| 3 | Ravi | EE | Dr. Sen |

- `RollNo → Name, Dept, DeptHead` (roll number uniquely identifies a student)
- `Dept → DeptHead` (each department has exactly one head)

Notice rows 1 and 2 agree on `Dept = CS`, so they must agree on `DeptHead` — they do.

## Types of Functional Dependencies

- **Trivial FD**: X → Y where Y ⊆ X (e.g. `{RollNo, Name} → Name`). Always holds.
- **Non-trivial FD**: X → Y where Y ⊄ X (e.g. `RollNo → Name`).
- **Fully functional dependency**: Y depends on the whole of X, not any proper subset.
- **Partial dependency**: Y depends on part of a composite key (violates 2NF).
- **Transitive dependency**: X → Y and Y → Z imply X → Z (violates 3NF).

```text
RollNo ──► Dept ──► DeptHead
   └──────── transitive ───────► DeptHead
```

## Why FDs Matter

- Used to identify **candidate keys** (an attribute set whose closure is all attributes).
- Drive **normalization** (2NF removes partial FDs, 3NF/BCNF remove transitive/bad FDs).
- Help detect **redundancy** and update anomalies before they occur.

## Key points

- `X → Y`: equal X-values force equal Y-values.
- Determined by the *meaning* of data, not by a sample instance (a sample can only disprove an FD, never prove it).
- Trivial FDs always hold; normalization targets non-trivial ones.
- Partial and transitive dependencies are the enemies removed by 2NF and 3NF.
