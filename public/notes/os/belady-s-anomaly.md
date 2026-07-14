## Definition

**Belady's anomaly** is the counter-intuitive phenomenon in which **increasing the number of page frames causes an increase (not a decrease) in the number of page faults** for certain page-replacement algorithms and reference strings.

Normally we expect: *more memory → fewer faults*. Belady's anomaly shows this is **not guaranteed** for algorithms like **FIFO**.

## Which algorithms are affected

- **Suffer the anomaly:** FIFO, and some others (e.g., Second-Chance in specific cases).
- **Immune (stack algorithms):** LRU, Optimal (OPT/MIN). A **stack algorithm** guarantees that the set of pages in memory with `n` frames is always a **subset** of the pages with `n+1` frames, so faults can never increase with more frames.

## Classic example (FIFO)

Reference string: `1 2 3 4 1 2 5 1 2 3 4 5`

```text
With 3 frames  -> 9 page faults
With 4 frames  -> 10 page faults   <-- MORE frames, MORE faults!
```

FIFO with 4 frames retains pages that will not be reused soon while evicting ones needed next, producing extra faults.

## Why it happens

FIFO evicts by **arrival order**, ignoring **usage**. Adding a frame changes the eviction timeline and can push out a page that is about to be referenced, so the fault pattern is not monotonic.

```text
Faults
  |        FIFO (may rise)
  |       /\
  |      /  \___
  |____ /        LRU/OPT (never rises)
  +-----------------> #frames
```

## Comparison

| Algorithm | Stack algorithm? | Belady's anomaly? |
|-----------|------------------|-------------------|
| FIFO | No | Yes |
| LRU | Yes | No |
| Optimal (OPT) | Yes | No |
| LFU | No | Possible |

## Key points

- Anomaly = more frames can mean **more** faults; violates the natural monotonic expectation.
- Only **non-stack** algorithms (chiefly **FIFO**) exhibit it.
- Discovered by **László Bélády** (1969).
- A favorite exam/interview question: *"Which replacement algorithm suffers Belady's anomaly and why doesn't LRU?"* — Answer: FIFO; LRU is a stack algorithm.
