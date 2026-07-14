## Definition

**Fragmentation** is the wasting of memory that occurs when free or allocated memory is broken into small pieces that cannot be used effectively. There are two types: **internal** and **external**.

## Internal Fragmentation

Memory wasted **inside** an allocated block because the block is larger than the process actually needs.

- Happens with **fixed-size** allocation (fixed partitions, paging).
- Example: a process needs 18 KB but is given a 20 KB partition → **2 KB wasted** inside.

```text
 Partition = 20 KB
 +-----------------------------+
 | Used 18 KB | Wasted 2 KB    |  <- internal fragmentation
 +-----------------------------+
```

## External Fragmentation

Enough **total** free memory exists to satisfy a request, but it is **scattered** in non-contiguous holes, so no single hole is large enough.

- Happens with **variable-size** allocation (dynamic partitioning, segmentation).
- Example: two 10 KB holes exist (20 KB free) but a 15 KB process cannot fit either.

```text
 +------+ P1 +------+ P2 +------+
 | 10KB |    | 10KB |    | free |
 | free |    | free |    |      |
 +------+----+------+----+------+
 Total free = 20KB, but not contiguous -> 15KB process fails
```

## Comparison

| Aspect | Internal | External |
|---|---|---|
| Cause | Fixed-size blocks larger than needed | Scattered variable-size holes |
| Waste location | Inside allocated block | Between allocated blocks |
| Occurs in | Fixed partitioning, paging | Dynamic partitioning, segmentation |
| Solution | Smaller/variable block sizes | Compaction, paging |

## Solutions

- **Compaction**: shuffle allocated memory to one end, merging free holes into one large block (fixes external fragmentation; costly).
- **Paging**: non-contiguous allocation eliminates external fragmentation (but has small internal fragmentation in the last page).
- **Best-fit / worst-fit** tuning can reduce, not eliminate, external fragmentation.

## Key points

- Internal fragmentation = wasted space **within** an allocation; external = wasted space **between** allocations.
- Paging removes external fragmentation but can cause minor internal fragmentation in the final page.
- Compaction cures external fragmentation but requires processes to be relocatable and pauses execution.
