## Definition

When a **page fault** occurs and there is **no free frame**, the OS must choose a **victim page** to evict so the requested page can be loaded. The rule that selects the victim is a **page-replacement algorithm**. Its goal is to **minimize the number of page faults**.

## FIFO (First-In, First-Out)

FIFO replaces the page that has been in memory the **longest** — the one that entered first. It is implemented with a simple **queue**: new pages are added at the tail; the victim is taken from the head.

- Simple and low-overhead (just a queue / circular pointer).
- Ignores how frequently or recently a page is used, so it can evict a hot page.

## Dry Run

Reference string: `7 0 1 2 0 3 0 4` with **3 frames**.

```text
Ref | Frames (oldest -> newest) | Fault?
----+---------------------------+-------
 7  | 7                         | F
 0  | 7 0                       | F
 1  | 7 0 1                     | F
 2  | 0 1 2   (evict 7)         | F
 0  | 0 1 2   (already in)      | hit
 3  | 1 2 3   (evict 0)         | F
 0  | 2 3 0   (evict 1)         | F
 4  | 3 0 4   (evict 2)         | F
----+---------------------------+-------
Total page faults = 7
```

## Belady's Anomaly

FIFO can exhibit **Belady's anomaly**: increasing the number of frames can **increase** the number of page faults — counter-intuitive and undesirable. (Stack algorithms like LRU and Optimal never suffer this.)

```text
Reference: 1 2 3 4 1 2 5 1 2 3 4 5
  3 frames -> 9 faults
  4 frames -> 10 faults   (more frames, MORE faults!)
```

## Comparison

| Algorithm | Victim chosen | Belady's anomaly | Overhead |
|-----------|---------------|------------------|----------|
| **FIFO** | Oldest loaded | **Yes** | Low |
| LRU | Least recently used | No | High (tracking) |
| Optimal | Used farthest in future | No | Not implementable (needs future) |

## Key points

- FIFO evicts the **oldest-loaded** page using a simple queue.
- Easy to implement but performs poorly — it can discard frequently used pages.
- Notorious for **Belady's anomaly** (more frames → more faults).
- Serves as the baseline; LRU and Optimal generally give fewer faults.
