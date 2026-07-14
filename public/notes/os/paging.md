## Definition

**Paging** is a non-contiguous memory-management scheme that divides logical memory into fixed-size blocks called **pages** and physical memory into blocks of the same size called **frames**. Any page can be loaded into any free frame, so a process need not occupy contiguous physical memory.

## Core Idea

- **Page** = fixed-size block of a process's logical address space.
- **Frame** = fixed-size block of physical memory (same size as a page).
- The OS maintains a **page table** per process mapping page number → frame number.

```text
 Logical Memory        Page Table         Physical Memory
 +--------+ page0      page | frame        +--------+ frame0
 | page0  |----------->  0  |  3  ------->  |        |
 +--------+             1  |  1            +--------+ frame1
 | page1  |----------->  2  |  4    +-----> | page1  |
 +--------+             ...                 +--------+
 | page2  |----------------------->        | ...    |
 +--------+                                 +--------+
```

## Address Translation

A logical address is split into two parts:

```text
 Logical address = | page number (p) | page offset (d) |

 1. Use p to index the page table  -> get frame number f
 2. Physical address = f * page_size + d
```

- If page size = 2^n, the low **n** bits are the offset and the rest are the page number.

## Example

- Page size = 1 KB (offset = 10 bits). Logical address 2500.
- Page number = 2500 / 1024 = 2, offset = 2500 % 1024 = 452.
- If page table says page 2 → frame 5, physical = 5 × 1024 + 452 = **5572**.

## Advantages & Disadvantages

| Advantages | Disadvantages |
|---|---|
| No external fragmentation | Small internal fragmentation (last page) |
| Non-contiguous allocation | Page table consumes memory |
| Easy swapping of pages | Extra memory access for translation (mitigated by TLB) |

## Key points

- Pages and frames are equal fixed size; page number indexes the page table.
- Eliminates external fragmentation; last page may cause slight internal fragmentation.
- Every logical address = page number + offset.
- A **TLB** caches recent page-table entries to speed up translation.
- Page size is a power of two so splitting an address needs no division.
