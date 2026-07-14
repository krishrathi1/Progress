## Definition

**Shortest Remaining Time First (SRTF)** is the **preemptive** version of Shortest Job First. The scheduler always runs the process whose **remaining burst time** is the smallest. Whenever a new process arrives, its burst is compared against the remaining time of the running process; if the newcomer is shorter, the CPU **preempts** the current process and switches.

## How it works

- Maintain the **remaining time** of every ready process.
- At every scheduling event (a process arrives or the running one finishes), pick the process with the **least remaining time**.
- Preempt the running process if a newly arrived one has a smaller remaining burst.

## Example

| Process | Arrival | Burst |
|---------|---------|-------|
| P1      | 0       | 8     |
| P2      | 1       | 4     |
| P3      | 2       | 9     |
| P4      | 3       | 5     |

```text
Gantt chart:
| P1 | P2      | P4      | P1        | P3        |
0    1         5         10          17          26

t=1: P2 (4) < P1 remaining (7) -> preempt P1
t=5: P2 done; remaining P1=7, P4=5 -> run P4
t=10: run P1 (7), then P3 (9)
```

Turnaround / waiting:

| Process | Turnaround | Waiting |
|---------|------------|---------|
| P1      | 17         | 9       |
| P2      | 4          | 0       |
| P3      | 24         | 15      |
| P4      | 7          | 2       |

- Average waiting time = (9 + 0 + 15 + 2) / 4 = **6.5 ms**.

## SRTF vs SJF

| Feature | SJF | SRTF |
|---------|-----|------|
| Preemption | No | Yes |
| Reacts to new short jobs | No | Yes |
| Avg waiting time | Low | Even lower |
| Context switches | Fewer | More overhead |
| Starvation | Possible | Possible (worse) |

## Key points

- SRTF = **preemptive SJF**, keyed on **remaining** (not total) burst time.
- Gives the **lowest average waiting time** but with more context-switch overhead.
- Still needs burst-time estimates and can **starve** long processes.
- Scheduling decisions happen on **arrival** and on **completion** events.
