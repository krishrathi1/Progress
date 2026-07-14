## Definition

A decomposition of relation `R` into `R1, R2, …, Rn` is **dependency-preserving** if the set of functional dependencies that can be enforced on the individual decomposed tables (without performing a join) is **equivalent** to the original set of FDs `F`.

Formally, let `Fi` be the projection of `F` onto `Ri`. The decomposition preserves dependencies if:

```text
(F1 ∪ F2 ∪ ... ∪ Fn)+  =  F+
```

That is, the **closure** of the union of the projected FDs equals the closure of the original FD set.

## Why it matters

If a dependency is *not* preserved, the DBMS cannot check that constraint on a single table. It would have to **join** tables on every insert/update to validate the FD — expensive and often impractical. Dependency preservation lets each constraint be enforced **locally**.

## Example

`R(A, B, C)` with FDs `A → B` and `B → C`.

### Preserving decomposition

```text
R1(A, B):  enforces A -> B
R2(B, C):  enforces B -> C
Union = {A->B, B->C} = original F   ==> PRESERVED
```

### Non-preserving decomposition

```text
R1(A, B):  enforces A -> B
R2(A, C):  enforces A -> C
B -> C cannot be checked on either table without a join  ==> NOT preserved
```

## Checking algorithm

```text
For each FD  X -> Y  in F:
    result = X
    repeat:
        for each Ri:
            t = (result ∩ Ri)+  restricted to Ri's attributes
            result = result ∪ t
    until no change
    if Y ⊆ result  -> this FD is preserved
If all FDs preserved -> decomposition is dependency-preserving
```

## Lossless vs Dependency-Preserving

| Property | Lossless Join | Dependency Preserving |
|----------|---------------|------------------------|
| Goal | Reconstruct R exactly by join | Enforce all FDs without join |
| Mandatory? | **Yes**, always required | Desirable, not always possible |
| 3NF | Guaranteed | Guaranteed |
| BCNF | Guaranteed | **Not always** |

## Key points

- Dependency preservation = all original FDs enforceable **table-locally**, no joins needed.
- Test using the FD-projection closure algorithm above.
- **3NF** decomposition can always be both lossless and dependency-preserving.
- **BCNF** may sacrifice dependency preservation to achieve stricter normalization — the classic 3NF-vs-BCNF trade-off.
