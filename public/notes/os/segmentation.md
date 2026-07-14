## Definition

**Segmentation** is a memory-management scheme that divides a process's logical address space into **variable-sized** logical units called **segments**, each corresponding to a meaningful part of the program — code, stack, heap, global data, or a function/module. Unlike paging (fixed-size pages that ignore program structure), segmentation matches the programmer's view of memory.

## Logical Address

A segmented logical address has two parts:

```text
Logical address = < segment number (s) , offset (d) >

  s  ->  index into the Segment Table
  d  ->  displacement within that segment
```

## Segment Table

Each process has a **segment table**. Every entry stores:

- **Base** — starting physical address of the segment.
- **Limit** — length (size) of the segment.

Address translation:

```text
if (d < Limit[s])
    physical_address = Base[s] + d
else
    trap -> "segmentation fault"   (invalid offset)
```

```text
 Logical (s=2, d=100)
        |
        v
  +-----------------+          Physical Memory
  | Segment Table   |          +--------------+
  | 0 | base | lim  |          |  ...         |
  | 1 | base | lim  |    +---->| Segment 2    |
  | 2 |1400 |1000  |----+     | base=1400    |
  +-----------------+          | 1400+100=1500|
                               +--------------+
```

## Advantages

- Matches the **logical/modular structure** of programs.
- Segments can be **shared** (e.g., shared library code) and **protected** individually (read/write/execute bits per segment).
- Easier separate compilation and dynamic growth of segments.

## Disadvantages

- Suffers from **external fragmentation** (variable-size holes) — needs compaction.
- Allocation requires searching for a suitable free hole (first/best fit).

## Key points

- Segments are **variable-sized** and **logical/meaningful**; pages are fixed-size and arbitrary.
- Address = (segment number, offset); translated via base + limit check.
- Offset ≥ limit → **segmentation fault** (protection).
- Main drawback: **external fragmentation**.
- Segmented paging combines both to remove external fragmentation while keeping logical division.
