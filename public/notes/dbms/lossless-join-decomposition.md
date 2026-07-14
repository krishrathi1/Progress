## Definition

A decomposition of a relation `R` into `R1` and `R2` is a **lossless-join (non-additive) decomposition** if joining `R1` and `R2` back together produces **exactly** the original relation `R` — no more, no fewer tuples.

```text
R1 ⋈ R2 = R        (lossless - correct)
R1 ⋈ R2 ⊃ R        (lossy - extra "spurious" tuples appear)
```

If the join introduces **spurious tuples**, the decomposition is **lossy** and loses information.

## The test (for R → R1, R2)

A decomposition into two relations is lossless **if and only if** the common attributes form a superkey of at least one of them:

```text
(R1 ∩ R2) → R1     OR     (R1 ∩ R2) → R2
```

In words: the shared column(s) must be a **candidate key** of R1 or of R2.

## Example

`EMP(EmpID, Name, DeptID, DeptName)` with `EmpID → Name, DeptID` and `DeptID → DeptName`.

### Lossless decomposition

```text
R1(EmpID, Name, DeptID)     R2(DeptID, DeptName)
Common attribute = DeptID
DeptID -> DeptName, so DeptID is the KEY of R2  ==> LOSSLESS
```

### Lossy decomposition (bad)

```text
R1(EmpID, Name)   R2(DeptName, DeptID)
Common attribute = (none meaningful) / EmpID vs DeptName
No shared key ==> joining mixes rows ==> SPURIOUS TUPLES
```

## Spurious tuples illustration

```text
R1            R2
A  B          B  C
1  x          x  p
2  x          x  q

R1 ⋈ R2 on B:
1 x p   1 x q   2 x p   2 x q   <- extra (spurious) rows not in original R
```

## Comparison

| Property | Lossless | Lossy |
|----------|----------|-------|
| R1 ⋈ R2 | Equals R | Superset of R |
| Spurious tuples | None | Present |
| Information | Preserved | Lost/corrupted |
| Common attrs | Superkey of R1 or R2 | Not a key |

## Key points

- Lossless join = ability to **perfectly reconstruct** R by natural join.
- Two-way test: the **common attributes must be a superkey** of one relation.
- Every good decomposition (2NF, 3NF, BCNF) must be lossless — this is **mandatory**.
- 3NF gives lossless **and** dependency-preserving; BCNF guarantees lossless but not always dependency-preserving.
