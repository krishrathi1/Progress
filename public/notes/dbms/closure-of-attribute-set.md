## Definition

The **closure of an attribute set X**, written **X⁺**, is the set of all attributes that can be functionally determined by X, given a set of functional dependencies F. Formally:

```text
X⁺ = { A : X → A can be derived from F using Armstrong's axioms }
```

Attribute closure is the single most useful practical tool in normalization: it tells you whether X is a **superkey** (X⁺ = all attributes) and lets you test whether any FD X → Y holds (check if Y ⊆ X⁺).

## Algorithm

```text
computeClosure(X, F):
    result = X                       # start with X itself (reflexivity)
    repeat:
        for each FD  A → B  in F:
            if A ⊆ result:
                result = result ∪ B  # transitivity/augmentation
    until result stops changing
    return result
```

## Worked Example

Relation R(A, B, C, D, E) with `F = { A → B, B → C, CD → E }`.
Compute **A⁺**:

```text
Start:  result = {A}
A → B   : A ⊆ {A}      ⇒ result = {A, B}
B → C   : B ⊆ {A,B}    ⇒ result = {A, B, C}
CD → E  : CD ⊄ {A,B,C} ⇒ no change (D missing)
No more changes.
A⁺ = {A, B, C}
```

Now compute **(AD)⁺**:

```text
result = {A, D}
A → B   ⇒ {A, D, B}
B → C   ⇒ {A, D, B, C}
CD → E  : CD ⊆ {A,D,B,C} ⇒ {A, B, C, D, E}
(AD)⁺ = {A,B,C,D,E} = R  ⇒ AD is a superkey (in fact a candidate key)
```

## Uses of Attribute Closure

| Goal | How closure answers it |
|------|------------------------|
| Is X a superkey? | X⁺ = all attributes of R |
| Does X → Y hold? | Check Y ⊆ X⁺ |
| Find candidate keys | Minimal X with X⁺ = R |
| Compute F⁺ indirectly | Test candidate FDs via closures |

## Key points

- **X⁺** = everything X can determine, computed iteratively until a fixed point.
- Always start the result with X itself (reflexivity).
- `X⁺ = R` ⇒ X is a superkey; if no proper subset also gives R, X is a **candidate key**.
- Testing `Y ⊆ X⁺` is far cheaper than computing the entire F⁺.
