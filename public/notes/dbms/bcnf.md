## Definition

**Boyce-Codd Normal Form (BCNF)** is a stricter version of 3NF, sometimes called **3.5NF**.

A relation is in BCNF if it is in 3NF and, for **every** non-trivial functional dependency `X → Y`, `X` is a **superkey**.

The difference from 3NF: 3NF permits `X → Y` when `Y` is a prime attribute even if `X` is not a superkey. BCNF removes that exception — the determinant `X` must **always** be a superkey.

## When 3NF fails BCNF

This happens when a table has **overlapping candidate keys** and a prime attribute is determined by a non-superkey.

### Example

`CLASS(Student, Course, Instructor)`:
- A student takes many courses; each course-student pair has one instructor.
- Each instructor teaches exactly **one** course.

```text
Candidate keys: {Student, Course}  and  {Student, Instructor}
FDs:
  {Student, Course}  -> Instructor   (LHS is a key - OK)
  Instructor         -> Course        (Instructor is NOT a superkey!)
```

`Instructor → Course` violates BCNF because `Instructor` is not a superkey (yet `Course` is prime, so 3NF is satisfied).

### Decomposition into BCNF

```sql
-- Which instructor teaches which course
CREATE TABLE INSTRUCTOR_COURSE (
    Instructor VARCHAR(50) PRIMARY KEY,
    Course     VARCHAR(50)
);

-- Which student is taught by which instructor
CREATE TABLE STUDENT_INSTRUCTOR (
    Student    VARCHAR(50),
    Instructor VARCHAR(50),
    PRIMARY KEY (Student, Instructor),
    FOREIGN KEY (Instructor) REFERENCES INSTRUCTOR_COURSE(Instructor)
);
```

## 3NF vs BCNF

| Feature | 3NF | BCNF |
|---------|-----|------|
| For every FD `X→Y` | X is superkey OR Y is prime | X must be superkey |
| Strictness | Weaker | Stronger |
| Lossless decomposition | Guaranteed | Guaranteed |
| Dependency preserving | Guaranteed | **Not always** |

## Key points

- BCNF: **every determinant is a superkey** — no exceptions.
- Every BCNF relation is in 3NF, but not every 3NF relation is in BCNF.
- BCNF decomposition is always **lossless** but may **not preserve all dependencies** — this is the trade-off vs 3NF.
- Problems appear mainly with **multiple overlapping composite candidate keys**.
