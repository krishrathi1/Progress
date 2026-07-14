## Definition

CPU scheduling algorithms fall into two categories based on **whether the OS can forcibly take the CPU away** from a running process:

- **Preemptive scheduling** — the OS can interrupt a running process and move it back to the ready queue before it finishes its burst.
- **Non-preemptive (cooperative) scheduling** — once a process gets the CPU, it keeps it until it terminates or voluntarily blocks (e.g. for I/O).

## When Scheduling Decisions Happen

A process can transition on four occasions:

```text
1. Running -> Waiting   (I/O request)      <- non-preemptive point
2. Running -> Ready     (interrupt/quantum) <- PREEMPTION
3. Waiting -> Ready     (I/O completes)     <- PREEMPTION opportunity
4. Running -> Terminated                    <- non-preemptive point
```

- **Non-preemptive** schedules only at points **1** and **4**.
- **Preemptive** additionally schedules at **2** and **3**.

## Comparison

| Aspect | Preemptive | Non-preemptive |
|--------|-----------|----------------|
| CPU taken forcibly? | Yes | No |
| Trigger | Timer interrupt, higher-priority arrival | Only voluntary release / termination |
| Response time | Better (interactive-friendly) | Worse |
| Overhead | Higher (frequent context switches) | Lower |
| Starvation | Possible (low priority) | Possible (long job blocks all) |
| Race conditions | Possible on shared data → need synchronization | Rare |
| Examples | Round Robin, SRTF, Preemptive Priority | FCFS, SJF, Non-preemptive Priority |

## Illustration

```text
Preemptive (Round Robin, quantum=2):
P1 P2 P1 P2 P1 ...     -> processes interleave

Non-preemptive (FCFS):
P1 P1 P1 P1 | P2 P2    -> P1 runs to completion first
```

## Trade-offs

- **Preemptive** gives responsiveness and fairness for interactive/real-time systems, at the cost of context-switch overhead and the need to protect shared data (mutexes, disabling interrupts in kernel).
- **Non-preemptive** is simple and low-overhead but a long CPU-bound job can make short jobs wait (the **convoy effect**).

## Key Points

- Preemptive = OS **can** interrupt; non-preemptive = process **runs to completion/block**.
- Preemption improves **response time** but adds **context-switch overhead** and **synchronization** needs.
- **FCFS, SJF, non-preemptive Priority** are non-preemptive; **RR, SRTF, preemptive Priority** are preemptive.
- Preemptive scheduling is essential for **time-sharing** and **real-time** systems.
