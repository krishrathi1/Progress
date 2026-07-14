## Overview

Both **paging** and **segmentation** are non-contiguous memory-allocation schemes that map a logical address space to physical memory, but they differ in how they divide memory and what problems they solve.

- **Paging** splits memory into **fixed-size** blocks (pages/frames). The division is purely physical and invisible to the programmer.
- **Segmentation** splits memory into **variable-size**, logically meaningful units (code, stack, heap). It reflects the programmer's view.

## Address Format

```text
Paging:        Logical address = < page number , offset >
Segmentation:  Logical address = < segment number , offset >

Paging offset size is FIXED (= page size).
Segmentation offset is bounded by the segment's LIMIT (variable).
```

## Comparison Table

| Aspect | Paging | Segmentation |
|--------|--------|--------------|
| Block size | Fixed (page = frame) | Variable (per segment) |
| Divided by | OS / hardware | Programmer / compiler |
| Programmer visibility | Invisible | Visible, logical |
| Fragmentation | **Internal** (last page partly used) | **External** (variable holes) |
| Mapping table | Page table | Segment table (base + limit) |
| Address parts | page no. + offset | seg no. + offset |
| Protection/Sharing | Per page (coarser) | Per segment (natural, logical) |
| Compaction needed | No | Yes (to remove holes) |

## Fragmentation Illustration

```text
Paging (internal): a 4KB page holding 3KB of data
   [DATA DATA DATA | wasted ]   <- 1KB wasted inside page

Segmentation (external): free holes between segments
   [Seg A][free 2KB][Seg B][free 5KB]  <- can't place a 6KB seg
```

## Key points

- Paging → **internal** fragmentation; Segmentation → **external** fragmentation.
- Paging uses a **page table**; segmentation uses a **segment table** (base + limit, with a limit check for protection).
- Segmentation aligns with logical program units, giving natural **sharing/protection**; paging is simpler and needs no compaction.
- **Segmented paging** (paging within segments) is used in practice (e.g., x86) to gain both logical division and no external fragmentation.
