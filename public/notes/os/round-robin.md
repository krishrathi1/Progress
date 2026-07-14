## Round Robin (RR) scheduling
A **preemptive** CPU-scheduling algorithm designed for time-sharing. Each process runs for at most a fixed **time quantum**, then goes to the back of the ready queue.

## How it works
1. Ready queue is FIFO.
2. Give the front process the CPU for one **quantum (q)**.
3. If it finishes early → leave. If not → preempt and enqueue at the back.

## Example (quantum = 2)
~~~
Process  Burst
  P1       5
  P2       3
  P3       1

Gantt: | P1 | P2 | P3 | P1 | P2 | P1 |
        0    2    4    5    7    8    9
~~~

## Properties
- **Fair:** every process gets the CPU regularly → good response time.
- **No starvation.**
- Higher **context-switch** overhead than FCFS.

## Choosing the quantum
- Too large → behaves like **FCFS** (poor responsiveness).
- Too small → too many context switches (overhead dominates).
- Rule of thumb: 80% of CPU bursts should be shorter than the quantum.

## Key point
RR optimises **response time**, not average waiting/turnaround time (SJF is optimal for those).
