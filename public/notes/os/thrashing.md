## Definition

**Thrashing** is a state in which a system spends **more time swapping pages in and out of memory (paging) than executing useful work**. CPU utilization collapses because processes are constantly blocked on page faults.

It occurs when the **total memory demand of active processes exceeds available physical frames**, so each process has too few frames to hold its working set.

## How it develops

```text
CPU util
   |        ____
   |      /      \  <- thrashing begins
   |     /        \
   |    /          \____
   |   /                 
   +--------------------------> degree of multiprogramming
```

- OS sees low CPU utilization → schedules **more** processes to raise it.
- More processes → even fewer frames each → **more page faults**.
- Page faults dominate → CPU utilization drops further → OS adds still more processes.
- This positive feedback loop crashes performance.

## Causes

- Too high a **degree of multiprogramming**.
- Insufficient **physical memory** for the combined working sets.
- Poor page-replacement decisions (global replacement stealing frames across processes).

## Detection and prevention

| Technique | Idea |
|-----------|------|
| **Working Set Model** | Give each process enough frames for its recent working set; suspend a process if the sum of working sets exceeds memory |
| **Page-Fault Frequency (PFF)** | Monitor each process's fault rate; if too high, allocate more frames; if too low, remove frames |
| **Local replacement** | A process can only steal its own frames, limiting cascade to other processes |
| **Load control / swapping** | Suspend (swap out) whole processes to reduce demand |
| **Add RAM** | Increase available physical frames |

## Key points

- Thrashing = **high paging activity, near-zero useful throughput**.
- Root cause: **working set sum > available frames**.
- Counter-intuitive trigger: the scheduler raising multiprogramming to fix low CPU actually **worsens** it.
- Two main remedies: **Working Set model** and **Page-Fault Frequency (PFF)** control.
- Prevented structurally by ensuring each process holds its full working set in memory.
