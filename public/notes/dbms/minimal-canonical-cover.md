## Definition

A **canonical (minimal) cover** `Fc` of a set of functional dependencies `F` is an equivalent set of FDs that is as small and simplified as possible, while preserving the exact same closure (`F+ = Fc+`).

A minimal cover satisfies **three conditions**:

- **Singleton RHS** — every FD has exactly one attribute on the right side.
- **No redundant FD** — removing any FD changes the closure.
- **No extraneous LHS attribute** — no attribute on the left side can be removed without changing the closure.

## Why it matters

- Removes redundancy before normalization (used in **3NF synthesis** to build minimal, lossless, dependency-preserving decompositions).
- A relation can have **more than one** valid minimal cover.

## Algorithm (step by step)

```text
1. Split RHS   : A -> BC   becomes   A -> B,  A -> C
2. Remove extraneous LHS attributes:
      For AB -> C, check if A alone or B alone still derives C
      using the rest of F. If yes, drop the extra attribute.
3. Remove redundant FDs:
      For each FD X -> Y, compute X+ using F minus that FD.
      If Y is in X+, the FD is redundant -> delete it.
```

## Worked example

```text
F = { A -> BC,  B -> C,  A -> B,  AB -> C }

Step 1 (split RHS):
   A -> B, A -> C, B -> C, A -> B, AB -> C
   => { A -> B, A -> C, B -> C, AB -> C }

Step 2 (extraneous LHS in AB -> C):
   A+ under F = {A,B,C} contains C  => B is extraneous
   AB -> C  becomes  A -> C  (already present)

Step 3 (redundant FDs):
   A -> C : A+ without it = {A,B,C} (via A->B, B->C) contains C -> redundant, drop
   Remaining: { A -> B, B -> C }

Fc = { A -> B,  B -> C }
```

## Extraneous attribute test

| Attribute location | Test to remove attribute a from X -> A |
|---|---|
| On RHS (A in Y) | Is A in `(X)+` computed under `F - {X->Y} + {X -> Y-A}` ? |
| On LHS (a in X) | Is A in `(X - a)+` computed under full `F` ? |

## Key points

- Minimal cover = smallest equivalent FD set with singleton RHS, no redundant FDs, no extraneous LHS attributes.
- Order of removal matters; a different order may yield a different (still valid) cover.
- Always check LHS reduction **before** removing redundant FDs.
- Foundation for **3NF decomposition** (dependency-preserving, lossless).
