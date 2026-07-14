## Definition

The **Optimal page-replacement algorithm** (also called **OPT**, **MIN**, or **Belady's algorithm**) replaces the page that **will not be used for the longest time in the future**. It produces the **lowest possible page-fault rate** of any algorithm for a given reference string.

Because it requires knowledge of **future** references, it **cannot be implemented** in a real OS. Instead it serves as a **theoretical benchmark** to measure how close practical algorithms (FIFO, LRU) come to the best case.

## Rule

```text
On a page fault with no free frame:
   For each page currently in memory,
     find the NEXT time it will be referenced.
   Evict the page whose next use is FARTHEST in the future
   (or never used again).
```

## Dry Run

Reference string: `7 0 1 2 0 3 0 4 2 3` with **3 frames**.

```text
Ref | Frames        | Action                         | Fault?
----+---------------+--------------------------------+-------
 7  | 7             | load                           | F
 0  | 7 0           | load                           | F
 1  | 7 0 1         | load                           | F
 2  | 2 0 1         | 7 used farthest -> evict 7     | F
 0  | 2 0 1         | already in                     | hit
 3  | 2 0 3         | 1 used farthest -> evict 1     | F
 0  | 2 0 3         | already in                     | hit
 4  | 4 0 3         | 2 next@? , evict farthest      | F
 2  | 2 0 3 ...     | evict 4 (not used again)       | F
 3  | 2 0 3         | already in                     | hit
----+---------------+--------------------------------+-------
Optimal gives the minimum faults for this string.
```

The key decision: at each fault, look ahead and drop the page referenced **latest** (or never again).

## Comparison

| Algorithm | Basis | Faults | Implementable | Belady's anomaly |
|-----------|-------|--------|---------------|------------------|
| **Optimal** | Farthest **future** use | Minimum (lower bound) | **No** | No |
| LRU | Farthest **past** use | Near-optimal | Yes | No |
| FIFO | Oldest loaded | Higher | Yes | Yes |

## Key points

- Optimal evicts the page **needed farthest in the future** → provably fewest faults.
- **Not realizable** — needs future knowledge; used only as a **baseline** for comparison.
- **LRU** approximates Optimal by using the **past** as a predictor of the future (locality).
- Being a **stack algorithm**, Optimal never suffers **Belady's anomaly**.
