## Definition

**Armstrong's axioms** are a set of inference rules used to derive all functional dependencies (FDs) that are logically implied by a given set of FDs. They are **sound** (they never derive a wrong FD) and **complete** (they can derive every valid FD). The full set of FDs derivable is called the **closure of F**, written **F⁺**.

## The Three Primary (Axiomatic) Rules

| Rule | Statement | Meaning |
|------|-----------|---------|
| **Reflexivity** | If Y ⊆ X, then X → Y | A set determines any of its subsets (trivial FD) |
| **Augmentation** | If X → Y, then XZ → YZ | Add the same attributes to both sides |
| **Transitivity** | If X → Y and Y → Z, then X → Z | Chain dependencies together |

These three are enough to derive everything; the rest are convenient shortcuts.

## Secondary (Derived) Rules

| Rule | Statement |
|------|-----------|
| **Union** | If X → Y and X → Z, then X → YZ |
| **Decomposition** | If X → YZ, then X → Y and X → Z |
| **Pseudo-transitivity** | If X → Y and WY → Z, then WX → Z |

## Worked Example

Given `F = { A → B, B → C }` on relation R(A, B, C):

```text
1. A → B            (given)
2. B → C            (given)
3. A → C            (transitivity of 1 and 2)
4. A → AB           (augmentation of 1 with A)  since A → B ⇒ A A → B A
5. A → ABC          (union of A→A, A→B, A→C)
```

So `A` determines every attribute ⇒ **A is a candidate key** of R.

## Soundness vs Completeness

- **Sound**: every FD derived actually holds in every relation satisfying F. No false positives.
- **Complete**: every FD that logically follows from F can be derived using the axioms. Nothing valid is missed.

## Key points

- Three core rules: **Reflexivity, Augmentation, Transitivity**.
- Derived rules (union, decomposition, pseudo-transitivity) speed up proofs but add no power.
- Used to compute **F⁺** and, more practically, **attribute closure X⁺** to find candidate keys.
- Sound + complete ⇒ they generate exactly the set of implied FDs, no more, no less.
