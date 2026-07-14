## Definition

A **Resource Allocation Graph (RAG)** is a directed graph used to describe the state of resource allocation in a system and to **detect deadlocks**. It has two kinds of vertices and two kinds of edges.

- **Process vertices** `P1, P2, …` — drawn as **circles**.
- **Resource vertices** `R1, R2, …` — drawn as **rectangles**, with **dots** inside representing the number of identical instances.

## Edge Types

| Edge | Notation | Meaning |
|------|----------|---------|
| **Request edge** | `Pi → Rj` | Process Pi has *requested* an instance of Rj and is waiting. |
| **Assignment edge** | `Rj → Pi` | An instance of Rj has been *allocated* to Pi. |

## Deadlock Detection Rules

- **No cycle** in the graph ⇒ **no deadlock**.
- **Cycle exists**:
  - If every resource has **exactly one instance** ⇒ cycle **guarantees** deadlock.
  - If resources have **multiple instances** ⇒ cycle is only a **necessary**, not sufficient, condition (deadlock **may or may not** exist).

## ASCII Diagram

```text
   +----+   request    +--------+
   | P1 | -----------> |  R2 •  |
   +----+              +--------+
     ^                     |
     | assign             | assign
     |                     v
   +--------+          +----+
   |  R1 •  | <------- | P2 |
   +--------+  request +----+

Cycle: P1 -> R2 -> P2 -> R1 -> P1   (single instances => DEADLOCK)
```

## Single vs Multiple Instances

| Case | Cycle present | Conclusion |
|------|---------------|------------|
| Single instance per resource | Yes | Deadlock certain |
| Multiple instances | Yes | Deadlock possible (check further) |
| Any | No | No deadlock |

## Key points

- RAG vertices: **processes (circles)** and **resources (rectangles with instance dots)**.
- Edges: **request (P→R)** and **assignment (R→P)**.
- **No cycle → safe.** Cycle with single-instance resources → deadlock.
- With multiple instances, a cycle needs the **detection algorithm** (matrix-based) to confirm deadlock.
- RAG is the visual foundation for **Banker's algorithm** and deadlock detection.
