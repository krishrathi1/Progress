## Definition

**Deadlock detection** allows deadlocks to occur, then periodically runs an algorithm to discover them; **recovery** breaks the deadlock afterward. This is the opposite philosophy to prevention/avoidance — it is optimistic and favors higher resource utilization.

## Detection

### Single Instance per Resource

- Maintain a **wait-for graph** (RAG collapsed by removing resource nodes: `Pi → Pj` means Pi waits for a resource held by Pj).
- A **cycle** in the wait-for graph ⇒ **deadlock**.

```text
Wait-for graph:   P1 -> P2 -> P3
                   ^           |
                   +-----------+
Cycle P1->P2->P3->P1  =>  DEADLOCK
```

### Multiple Instances

Use a **detection algorithm** similar to Banker's safety check with `Available`, `Allocation`, and `Request` matrices. Any process that **cannot finish** is deadlocked.

```text
1. Work = Available; Finish[i]=false if Allocation[i]!=0 else true
2. Find i: Finish[i]==false AND Request[i] <= Work
3. Work += Allocation[i]; Finish[i]=true; repeat
4. Any Finish[i]==false  =>  Pi is deadlocked
```

## When to Run Detection

- **Every request** — fast detection, high overhead.
- **Periodically** or when **CPU utilization drops** below a threshold — lower overhead, coarser.

## Recovery Strategies

| Method | Description | Issue |
|--------|-------------|-------|
| **Process termination (abort all)** | Kill every deadlocked process | Expensive; loses much work |
| **Process termination (one at a time)** | Abort victims until cycle breaks; re-run detection each time | Overhead of repeated detection |
| **Resource preemption** | Take resources from a process and give to others | Needs victim selection + **rollback** |

### Choosing a Victim (minimize cost)

- Process priority, CPU time consumed, resources held, resources needed to finish.
- **Rollback** the victim to a safe checkpoint rather than killing it entirely.
- **Starvation**: ensure the same process isn't always chosen (include rollback count in cost).

## Key points

- Detection permits deadlock, then finds it via **wait-for graph cycle** (single instance) or **matrix algorithm** (multi-instance).
- Detection frequency trades **overhead vs response time**.
- Recovery = **abort processes** or **preempt resources** (with rollback).
- Victim selection minimizes cost; guard against **starvation**.
- Used by systems that expect deadlocks to be **rare** (e.g., many databases).
