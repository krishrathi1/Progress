## Definition

A **candidate key** is a **minimal superkey** — a minimal set of attributes whose closure yields all attributes of the relation. "Minimal" means no proper subset is itself a superkey. A relation may have several candidate keys; one is chosen as the **primary key**.

- **Superkey**: any attribute set X with X⁺ = R.
- **Candidate key**: a superkey with no redundant attribute.

## Systematic Procedure

1. **Classify attributes** by where they appear in the FDs:
   - Only on the **left** (or in no FD): must be in every candidate key.
   - Only on the **right**: never part of a candidate key.
   - On **both sides**: may or may not be included — test them.
2. Compute the closure of the essential (left-only) attributes.
3. If it already equals R, that set is the sole candidate key.
4. Otherwise, add "both-side" attributes one at a time and recompute closures until R is reached; keep only minimal combinations.

```text
Attribute buckets
┌────────────┬───────────────┬─────────────────────┐
│ LEFT-only  │ BOTH sides    │ RIGHT-only          │
│ (in key)   │ (test these)  │ (not in any key)    │
└────────────┴───────────────┴─────────────────────┘
```

## Worked Example

R(A, B, C, D) with `F = { A → B, B → C, C → D }`.

- `A` appears only on the left ⇒ must be in the key.
- Compute **A⁺**:

```text
A⁺ = {A}
A → B ⇒ {A,B}
B → C ⇒ {A,B,C}
C → D ⇒ {A,B,C,D} = R
```

`A⁺ = R` and A is minimal ⇒ **A is the only candidate key.** B, C, D each appear on a right side, so none can start a key.

## Example With Two Candidate Keys

R(A, B, C) with `F = { AB → C, C → A }`.
- B appears only on the left ⇒ in every key.
- `(AB)⁺ = {A,B,C} = R` ⇒ **AB** is a candidate key.
- `(BC)⁺`: C → A gives {A,B,C} = R ⇒ **BC** is also a candidate key.

**Prime attributes** (A, B, C) are those appearing in *some* candidate key; here all three are prime.

## Key points

- Candidate key = **minimal** superkey (closure = R, no removable attribute).
- Attributes appearing only on FD left sides are **always** in every candidate key.
- Attributes appearing only on right sides are **never** in a candidate key.
- Attributes in candidate keys are **prime**; the rest are **non-prime** — a distinction 2NF/3NF rely on.
