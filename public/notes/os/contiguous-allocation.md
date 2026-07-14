## Definition

**Contiguous memory allocation** is a technique where each process is placed in a **single continuous block** of physical memory. All the addresses of a process lie next to each other, from a starting (base) address up to a limit.

## How It Works

- Main memory is typically split into two parts: one for the **OS** (usually low memory) and one for **user processes**.
- When a process arrives, the OS finds a hole large enough and assigns it a contiguous region.
- A **base (relocation) register** holds the process's start address; a **limit register** holds its size.

```text
 +------------------+ 0
 |   Operating      |
 |    System        |
 +------------------+ 
 |   Process P1     |  base=400  limit=200
 +------------------+
 |   Process P2     |
 +------------------+
 |     (hole)       |  free space
 +------------------+
```

## Address Protection

Every logical address is checked and translated by hardware:

```text
 if (logical < limit)
      physical = base + logical
 else
      trap -> addressing error
```

This guarantees a process cannot touch memory outside its region.

## Allocation Strategies

When a process needs memory, the OS picks a free hole using:

| Strategy | Rule | Note |
|---|---|---|
| **First Fit** | First hole big enough | Fast, common |
| **Best Fit** | Smallest hole that fits | Least leftover, more search |
| **Worst Fit** | Largest hole | Leaves big usable holes |

## Advantages & Disadvantages

| Advantages | Disadvantages |
|---|---|
| Simple to implement | Suffers **external fragmentation** |
| Fast access (no extra translation table) | Hard to grow a process |
| Low overhead | May need compaction |

## Key points

- Each process occupies one contiguous block bounded by base and limit registers.
- Hardware compares against the limit register for protection.
- Main drawback is **external fragmentation** — free memory scattered in small holes.
- **Compaction** can consolidate free space but is expensive.
- Paging and segmentation were introduced to overcome its limitations.
