## Definition

A **page table** is a per-process data structure that maps each **page number** to its **frame number** in physical memory. A **Translation Lookaside Buffer (TLB)** is a small, fast hardware cache that stores recently used page-table entries to speed up address translation.

## Page Table

- One entry per page; the page number indexes the table to yield a frame number.
- Stored in main memory; the **Page Table Base Register (PTBR)** points to it.
- Each entry also holds control bits:

| Bit | Meaning |
|---|---|
| **Valid/Invalid** | Is the page in memory / legal? |
| **Protection** | Read/write/execute permissions |
| **Dirty (modified)** | Was the page written to? |
| **Reference** | Was the page recently used? (for replacement) |

**Problem:** with the page table in RAM, every memory reference needs **two** accesses — one to read the table, one for the actual data. This doubles memory access time.

## TLB (Translation Lookaside Buffer)

The TLB caches recent (page → frame) mappings in fast associative memory, avoiding the extra RAM lookup.

```text
 Logical address (p, d)
        |
        v
   +---------+  hit -> frame f  --> physical = f*size + d
   |  TLB    |
   +---------+  miss
        |
        v
   Page Table in RAM -> frame f (also loaded into TLB)
```

- **TLB hit**: mapping found in TLB → fast (one memory access for data).
- **TLB miss**: not in TLB → look up page table in RAM, then cache it.

## Effective Access Time (EAT)

```text
 EAT = hit_ratio * (TLB_time + mem_time)
     + miss_ratio * (TLB_time + 2*mem_time)
```

Example: TLB = 20 ns, memory = 100 ns, hit ratio = 80%:
EAT = 0.8×(120) + 0.2×(220) = 96 + 44 = **140 ns**.

## Comparison

| Feature | Page Table | TLB |
|---|---|---|
| Location | Main memory | CPU (fast cache) |
| Size | Large (all pages) | Small (few entries) |
| Speed | Slower | Very fast |
| Purpose | Full mapping | Cache recent mappings |

## Key points

- The page table gives the complete page→frame mapping plus protection/valid/dirty bits.
- Without a TLB, paging doubles memory access time.
- The TLB is a hardware cache exploiting locality; a high hit ratio keeps EAT close to a single memory access.
- On a context switch the TLB is usually flushed (or uses ASIDs to tag entries).
