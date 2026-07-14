## Definition

**Deadlock prevention** is a set of techniques that ensure a deadlock can **never** occur by structurally **denying at least one of the four Coffman conditions**. Because all four conditions are *necessary*, breaking any single one makes deadlock impossible.

## Attacking Each Coffman Condition

| Condition | Prevention Strategy | Drawback |
|-----------|--------------------|----------|
| **Mutual Exclusion** | Make resources sharable (e.g., read-only files); use spooling | Many resources are inherently non-sharable (printer, CPU register) |
| **Hold and Wait** | Require a process to request **all** resources at once, or release all before requesting more | Low utilization; possible starvation |
| **No Preemption** | If a process requests a resource it can't get, **preempt** its currently held resources | Only feasible for state-savable resources (CPU, memory), not printers |
| **Circular Wait** | Impose a **total ordering** on resources; each process requests them in increasing order | Restricts flexibility of request patterns |

## Circular-Wait Prevention (most practical)

Assign each resource type a unique number `F(Ri)`. A process may request `Rj` only if `F(Rj) > F(Ri)` for every `Ri` it currently holds.

```text
Ordering:  F(tape)=1  F(disk)=5  F(printer)=12

Legal:   request tape(1) -> disk(5) -> printer(12)   (increasing)
Illegal: hold printer(12) then request disk(5)       (decreasing -> denied)

No cycle can form because a cycle would require
some resource to be both lower and higher numbered.
```

## Prevention vs Avoidance

| Aspect | Prevention | Avoidance |
|--------|-----------|-----------|
| Approach | Break a necessary condition | Grant only if state stays *safe* |
| Info needed | None about future | Max resource claims in advance |
| Utilization | Often lower | Higher |
| Example | Resource ordering | Banker's algorithm |

## Key points

- Prevention = deny one of **Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait**.
- **Circular-wait ordering** is the most widely used and practical technique.
- Trade-off: prevention is **conservative**, often causing **low resource utilization** and possible **starvation**.
- Unlike avoidance, prevention needs **no advance knowledge** of future requests.
