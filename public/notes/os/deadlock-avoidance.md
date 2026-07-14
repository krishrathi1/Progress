## Definition

**Deadlock avoidance** requires the OS to have **advance information** about the **maximum** resources each process may request. Before granting any request, the system checks whether doing so leaves it in a **safe state**. If not, the process **waits**, even if the resource is free.

## Safe State

A state is **safe** if there exists a **safe sequence** `<P1, P2, …, Pn>` such that each `Pi`'s remaining needs can be satisfied using currently available resources **plus** resources held by all `Pj` (j < i) that finish before it.

- **Safe state** ⇒ no deadlock possible.
- **Unsafe state** ⇒ deadlock *may* occur (not guaranteed, but the system refuses to enter it).

```text
   All states
  +---------------------------+
  |        Unsafe             |
  |   +-------------------+   |
  |   |      Deadlock     |   |
  |   +-------------------+   |
  |   Safe (avoidance keeps   |
  |         us here)          |
  +---------------------------+
Avoidance never lets the system cross from Safe into Unsafe.
```

## Algorithms

| Scenario | Algorithm |
|----------|-----------|
| Single instance per resource | **Resource-Allocation-Graph algorithm** (adds *claim edges*) |
| Multiple instances per resource | **Banker's algorithm** |

### RAG with Claim Edges

- A **claim edge** `Pi ⇢ Rj` (dashed) means Pi *may* request Rj in the future.
- A request is granted only if converting the claim edge to an assignment edge creates **no cycle**.

## Avoidance vs Prevention

| Aspect | Avoidance | Prevention |
|--------|-----------|-----------|
| Future info | Requires max claims | None |
| Utilization | Higher | Lower |
| Decision | Dynamic (per request) | Static (structural) |
| Tool | Banker's / claim-edge RAG | Resource ordering |

## Key points

- Avoidance keeps the system in a **safe state** by inspecting each request dynamically.
- Needs each process's **maximum demand** declared in advance.
- **Safe ⇒ no deadlock; unsafe ⇒ possible deadlock** (avoided by refusal).
- Uses **Banker's algorithm** (multi-instance) or **claim-edge RAG** (single-instance).
- More permissive (better utilization) than prevention but has runtime overhead.
