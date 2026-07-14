## Definition

**LFU (Least Frequently Used)** and **MFU (Most Frequently Used)** are page/cache-replacement algorithms based on a **frequency count** of how many times each page has been referenced.

- **LFU** evicts the page with the **smallest** reference count — assumes a rarely used page will stay rarely used.
- **MFU** evicts the page with the **largest** reference count — assumes a page with a high count has "already been used enough" and a low-count page was just brought in and will be needed soon.

## How they work

- Every page keeps a **counter**, incremented on each reference.
- On a fault with full memory:
  - **LFU** → remove the page with the minimum counter.
  - **MFU** → remove the page with the maximum counter.
- Ties are broken by another policy (often FIFO or LRU).

## Dry run (LFU)

Reference string `1 1 2 3 1 4`, **3 frames**:

```text
After 1 1 2 3 : frames {1(c=2), 2(c=1), 3(c=1)}
Ref 1  -> hit, 1 count=3
Ref 4  -> fault, full. Min count = 2 or 3 (both c=1).
          Evict 2 (tie broken FIFO) -> {1,3,4}
```

## Comparison

| Aspect | LFU | MFU |
|--------|-----|-----|
| Evicts | Least frequently used | Most frequently used |
| Assumption | Low count = not needed | High count = done being used |
| Common use | Caches with stable hot set | Rare; specific scan patterns |
| Weakness | Old popular pages "stick" forever (stale counts) | Often counter-intuitive, poor in practice |

## Key points

- **LFU's main flaw:** a page heavily used early keeps a high count and resists eviction long after it stops being needed (**cache pollution**). Fixed by **aging** counts (periodic decay) → "LFU with dynamic aging".
- Neither is a **stack algorithm**; both can suffer **Belady's anomaly**.
- Both need extra storage for counters and O(n) or heap-based selection of the min/max.
- LFU is used in real caches (e.g., Redis `allkeys-lfu`); MFU is mostly of theoretical interest.
