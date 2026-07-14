## Overview

Operating systems are classified by **how they schedule work and interact with users**. Understanding each type and its trade-offs is a common exam question.

## Batch OS
- Jobs with similar needs are grouped into **batches** and executed sequentially without user interaction.
- An **operator** collects jobs; the OS runs them one after another.
- **Pros**: good throughput, no idle waiting for user input.
- **Cons**: no interaction, hard to debug, long turnaround time.
- Example: early IBM mainframe systems.

## Multiprogramming / Multitasking OS
- Keeps **several jobs in memory**; when one waits for I/O, the CPU switches to another, maximizing CPU utilization.
- **Multitasking** is the interactive extension where a single user runs many programs.

## Time-sharing (multi-user) OS
- CPU time is divided into small **time slices (quanta)** and rotated among many users/processes.
- Gives each user the illusion of a dedicated machine; optimized for **fast response time**.
- Example: UNIX.

## Distributed OS
- Manages a **collection of independent computers** connected by a network, presenting them as a single system.
- Resources are shared across nodes; benefits include resource sharing, reliability, and speedup.
- Example: Amoeba, LOCUS.

## Real-Time OS (RTOS)
- Produces results within strict **time (deadline) constraints**.
- **Hard RTOS**: missing a deadline is catastrophic (pacemakers, flight control).
- **Soft RTOS**: deadlines important but occasional misses tolerable (streaming, gaming).
- Example: VxWorks, FreeRTOS.

## Comparison

| Type | Interaction | Key goal | Example |
|------|------------|----------|---------|
| Batch | None | Throughput | IBM mainframe |
| Time-sharing | High (many users) | Response time | UNIX |
| Distributed | Networked nodes | Resource sharing | Amoeba |
| RTOS | Deterministic | Meet deadlines | VxWorks |

```text
Batch:        [job1][job2][job3]  (one after another)
Time-share:   |u1|u2|u3|u1|u2|u3| (rotating slices)
Distributed:  Node A <-> Node B <-> Node C  (one logical system)
RTOS:         task ---deadline---> result (guaranteed in time)
```

## Key points

- **Batch** = no interaction, sequential; **time-sharing** = many users, quick response.
- **Distributed** = many networked machines act as one; **RTOS** = deadline-driven (hard vs soft).
- Multiprogramming underlies most modern systems to keep the CPU busy during I/O.
