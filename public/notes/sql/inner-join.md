## INNER JOIN
Combines rows from two tables where the **join condition matches** in both. Non-matching rows are dropped.

~~~sql
SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d
  ON e.dept_id = d.id;
~~~

## Visual (set intersection)
~~~
employees        departments        INNER JOIN keeps only
   A (d=1)          1 Sales          rows present in BOTH
   B (d=2)          2 Eng            -> A-Sales, B-Eng
   C (d=9)          3 HR             (C dropped: no dept 9,
                                       HR dropped: no employee)
~~~

## The JOIN family

| Join | Keeps |
|---|---|
| INNER | only matching rows in both |
| LEFT | all left rows + matches (NULLs on right) |
| RIGHT | all right rows + matches (NULLs on left) |
| FULL OUTER | all rows from both sides |
| CROSS | every combination (Cartesian product) |

## Tips
- Always qualify columns (**e.id** vs **d.id**) to avoid ambiguity.
- Join on **indexed** keys (usually PK ↔ FK) for performance.
- INNER JOIN is commutative: the table order doesn't change the result set.

## Key point
Use **LEFT JOIN** when you must keep unmatched left rows (e.g., "employees even if they have no department"); INNER silently discards them.
