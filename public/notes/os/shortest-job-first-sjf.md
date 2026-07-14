## Definition

**Shortest Job First (SJF)** is a CPU scheduling algorithm that selects the ready process with the **smallest CPU burst time** to execute next. In its classic form it is **non-preemptive**: once a process starts, it runs to completion. SJF is provably **optimal** — it gives the **minimum average waiting time** among all scheduling algorithms for a given set of processes.

## How it works

- Whenever the CPU is free, look at all processes that have **arrived** and are ready.
- Pick the one with the **shortest burst time** (ties broken by arrival order/FCFS).
- Run it to completion (non-preemptive), then repeat.

## Example

Processes (all arrive at t = 0):

| Process | Burst | Waiting | Turnaround |
|---------|-------|---------|------------|
| P1      | 6     | 3       | 9          |
| P2      | 8     | 16      | 24         |
| P3      | 7     | 9       | 16         |
| P4      | 3     | 0       | 3          |

Execution order by shortest burst: **P4, P1, P3, P2**.

```text
Gantt chart:
| P4  | P1     | P3      | P2       |
0     3        9         16         24
```

- Average waiting time = (3 + 16 + 9 + 0) / 4 = **7 ms**
- FCFS on the same set gives avg waiting ≈ 10.25 ms, so SJF is better.

## Advantages and drawbacks

| Aspect | Detail |
|--------|--------|
| Pros | Minimum average waiting time; good throughput |
| Cons | Requires knowing burst time **in advance** (usually predicted) |
| Cons | **Starvation** — long jobs may wait forever if short jobs keep arriving |
| Type | Non-preemptive (preemptive version = SRTF) |

## Predicting burst time

Burst length is estimated using an **exponential average** of past bursts:

```text
tau(n+1) = alpha * t(n) + (1 - alpha) * tau(n)
```

where `t(n)` is the actual last burst and `alpha` (0..1) weights recent history.

## Key points

- SJF picks the **shortest next CPU burst**; optimal for average waiting time.
- Non-preemptive; the preemptive variant is **SRTF**.
- Main problems: **starvation** of long jobs and **not knowing burst time** ahead of time.
- Aging can be added to mitigate starvation.
