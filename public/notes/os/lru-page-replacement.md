## Definition

**LRU (Least Recently Used)** is a page-replacement algorithm. When a page fault occurs and memory (frames) is full, it evicts the page that has **not been used for the longest time**. The intuition: recently used pages are likely to be used again soon (temporal locality).

LRU is a good approximation of the theoretically optimal (Belady/OPT) algorithm and, unlike OPT, is realizable because it looks only at the **past**, not the future.

## How it works

- Maintain the order in which pages were last referenced.
- On a **hit**: mark the page as most recently used.
- On a **fault with a free frame**: load the page.
- On a **fault with full memory**: evict the least recently used page, then load the new one.

## Dry run

Reference string `7 0 1 2 0 3 0 4`, **3 frames**:

```text
Ref: 7   0   1   2   0   3   0   4
     ---------------------------------
F1:  7   7   7   2   2   2   2   4
F2:  -   0   0   0   0   3   3   3
F3:  -   -   1   1   1   1   0   0
     F   F   F   F   H   F   F   F
                   (evict 7:LRU)
Page faults = 7, Hits = 1
```

At ref `2`, page 7 was used longest ago (used only at time 0), so it is evicted.

## Implementation approaches

| Method | Idea | Cost |
|--------|------|------|
| Counters | Each page stores time of last use; scan for minimum | O(n) per replace |
| Stack (doubly linked list) | Move referenced page to top; bottom = LRU | O(1) per access |
| HashMap + Doubly linked list | O(1) lookup and update (used in LeetCode LRU Cache) | O(1) |
| Aging (approx) | Shift reference bits periodically | Cheap hardware approx |

## Key points

- LRU **never suffers Belady's anomaly** (it is a *stack algorithm*): more frames never increase faults.
- Exact LRU is expensive in hardware, so OSes use approximations: the **clock (second-chance)** algorithm and **aging** with reference bits.
- Exploits **temporal locality**; performs poorly on cyclic access patterns larger than the frame count.
- Related interview problem: design an LRU Cache with O(1) get/put using a hashmap + doubly linked list.
