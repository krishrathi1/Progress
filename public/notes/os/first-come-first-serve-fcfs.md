## Definition

**First Come First Serve (FCFS)** is the simplest CPU scheduling algorithm. The process that **requests the CPU first is allocated the CPU first** — it is essentially a **FIFO queue**. FCFS is **non-preemptive**: once a process starts, it runs to completion.

## How It Works

- Ready queue is managed as a **FIFO** queue.
- New processes join the **tail**; the CPU is given to the process at the **head**.
- No priorities, no preemption.

```text
Ready Queue (FIFO):
  head -> [P1] [P2] [P3] <- tail
  CPU serves P1 fully, then P2, then P3
```

## Worked Example

Processes arrive at t=0 in order P1, P2, P3:

| Process | Burst | Completion | Turnaround | Waiting |
|---------|-------|-----------|-----------|---------|
| P1 | 24 | 24 | 24 | 0 |
| P2 | 3 | 27 | 27 | 24 |
| P3 | 3 | 30 | 30 | 27 |

```text
Gantt Chart:
| P1 (24)               | P2 (3) | P3 (3) |
0                       24       27       30
```

- Average waiting time = (0 + 24 + 27) / 3 = **17 ms**
- If order were P2, P3, P1: avg WT = (0 + 3 + 6)/3 = **3 ms** — order matters a lot!

## The Convoy Effect

```text
One long CPU-bound process holds the CPU while
many short processes wait behind it:

[==== long P1 ====][P2][P3][P4]
Short jobs queue up -> low CPU & device utilization
```

The **convoy effect** is FCFS's main weakness: a single long job forces all others to wait, inflating average waiting time.

## Characteristics

| Property | Value |
|----------|-------|
| Type | Non-preemptive |
| Data structure | FIFO queue |
| Starvation | No (everyone eventually runs) |
| Average waiting time | Often high |
| Convoy effect | Yes |
| Implementation | Very simple |

## Key Points

- **Simplest** and fairest-by-arrival scheduling, but **not optimal** for average waiting time.
- **Non-preemptive** — a process holds the CPU until it finishes.
- Suffers the **convoy effect**: long jobs delay short ones.
- **No starvation** since every process is eventually served in arrival order.
- Poor for **interactive/time-sharing** systems due to high response time.
