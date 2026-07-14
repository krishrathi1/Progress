## Definition

**Disk scheduling** is the OS activity of deciding the order in which pending disk I/O requests are served, so as to minimize total **seek time** (the time the read/write head takes to move to the required track/cylinder). Because seek is the slowest part of a disk access, a good schedule directly improves throughput and average response time.

Each request targets a **cylinder number**. The scheduler reorders the queue of requested cylinders to reduce head travel.

## Key metric

- **Seek distance** = |current head position − target cylinder|.
- **Total head movement** = sum of seek distances across the served order. Lower is better.

## FCFS (First-Come, First-Served)

- Requests are served strictly in arrival order.
- **Fair** (no starvation) and simple, but ignores head position, so it can cause large, wasteful back-and-forth swings.

## SSTF (Shortest Seek Time First)

- Always serve the request **closest** to the current head position next.
- Much less total movement than FCFS, but can cause **starvation**: a request far from the head may wait indefinitely if closer requests keep arriving.

```text
Queue: 98 183 37 122 14 124 65 67   | head starts at 53

FCFS order (arrival): 53->98->183->37->122->14->124->65->67
Total movement = 45+85+146+85+108+110+59+2 = 640

SSTF (nearest each step): 53->65->67->37->14->98->122->124->183
Total movement = 12+2+30+23+84+24+2+59 = 236
```

## Comparison

| Feature        | FCFS            | SSTF                  |
|----------------|-----------------|-----------------------|
| Selection rule | Arrival order   | Nearest cylinder      |
| Total seek     | High            | Low                   |
| Starvation     | None            | Possible (far reqs)   |
| Fairness       | High            | Low                   |
| Overhead       | Minimal         | Must scan queue       |

## Key points

- Goal of disk scheduling: minimize total seek time / head movement.
- FCFS is fair but inefficient; SSTF is efficient but can starve distant requests.
- SSTF is a **greedy** local choice — not guaranteed globally optimal.
- SSTF may also cause the head to reverse direction frequently, unlike SCAN-family algorithms.
