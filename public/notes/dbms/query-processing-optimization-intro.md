## Definition

**Query processing** is the sequence of steps the DBMS follows to translate a high-level SQL query into an efficient low-level execution that retrieves data. **Query optimization** is the sub-step that chooses the **cheapest execution plan** among many equivalent ones, minimizing cost (disk I/O, CPU, memory).

## Stages of Query Processing

```text
SQL Query
   |
[1] Parsing & Translation  -> parse tree -> relational algebra
   |
[2] Optimization           -> pick best execution plan
   |
[3] Evaluation / Execution -> run plan, return result
```

1. **Parsing & Translation**: check syntax and semantics (do tables/columns exist?), then convert SQL into a **relational algebra** expression / query tree.
2. **Optimization**: generate equivalent plans, estimate each one's **cost**, and select the cheapest.
3. **Evaluation**: the execution engine runs the chosen plan using access methods (index scan, table scan, joins).

## Example

```sql
SELECT name FROM Student
WHERE age > 20;
```

Two equivalent relational-algebra forms:

```text
π_name ( σ_age>20 (Student) )     -- filter first, then project  (cheaper)
σ_age>20 ( π_name,age (Student) ) -- less useful ordering
```

**Pushing the selection (σ) down** before projection reduces the number of rows processed early — a classic optimization heuristic.

## Types of Optimization

| Type | Basis | Description |
|------|-------|-------------|
| **Heuristic (rule-based)** | Transformation rules | Push selections/projections down, do restrictive joins first — no cost numbers |
| **Cost-based** | Statistics | Estimate I/O & CPU cost from table sizes, indexes, selectivity; pick minimum-cost plan |

## Common Optimization Techniques

- **Selection pushdown**: apply `σ` (WHERE filters) as early as possible.
- **Projection pushdown**: drop unneeded columns early.
- **Join ordering**: perform the most selective / smallest joins first.
- **Use of indexes**: replace full table scans with index scans.
- **Choosing join algorithms**: nested-loop vs hash join vs sort-merge join.

## Key points

- Processing order: **Parse -> Optimize -> Execute**.
- Optimizer relies on **statistics** (row counts, index selectivity) stored in the data dictionary.
- **Cost-based** optimization is more accurate than pure heuristics but needs up-to-date stats.
- Multiple query plans are **logically equivalent** but differ hugely in cost; the goal is the plan with least estimated cost.
- `EXPLAIN` in SQL shows the chosen execution plan.
