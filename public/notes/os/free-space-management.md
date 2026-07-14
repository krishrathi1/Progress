## Definition

**Free space management** is how the file system tracks which disk blocks are unused, so it can allocate them to new/growing files and reclaim them on deletion. The goal is fast allocation, fast deallocation, and low bookkeeping overhead.

## Techniques

### 1. Bit Vector (Bitmap)

- One bit per block: `1` = free, `0` = allocated (conventions vary).
- Finding the first free block = finding the first `1` bit; hardware often has a "find-first-set" instruction.

```text
Blocks:   0  1  2  3  4  5  6  7
State:    A  A  F  F  A  F  A  F     (A=allocated, F=free)
Bitmap:   0  0  1  1  0  1  0  1
```

- **Pro:** simple, easy to find contiguous runs of free blocks.
- **Con:** the whole bitmap must be kept in memory for speed; large disks need large bitmaps (a 1 TB disk with 4 KB blocks needs ~32 MB bitmap).

### 2. Linked List (Free List)

- Each free block stores a pointer to the next free block; a head pointer sits in a known location.
- **Pro:** no wasted space (uses the free blocks themselves).
- **Con:** cannot easily get contiguous space; traversing to find many blocks needs many disk I/Os.

### 3. Grouping

- The first free block stores addresses of the next *n* free blocks. The last of those points to another block holding *n* more addresses.
- Fetches many free-block addresses in a single read.

### 4. Counting

- Store `(first free block, count of contiguous free blocks)` pairs.
- Great when free space is clustered (as after contiguous allocation).

## Comparison

| Method | Space overhead | Contiguous search | Memory need |
|--------|---------------|-------------------|-------------|
| Bitmap | 1 bit/block | Easy | Whole map in RAM |
| Linked list | ~0 (in free blocks) | Hard | 1 pointer |
| Grouping | Low | Moderate | 1 block |
| Counting | Low (clustered) | Easy | Small table |

## Key points

- Bitmap is common because free-run detection is simple and CPU-supported.
- Linked list wastes no space but is I/O-heavy and poor for contiguous allocation.
- The free-space structure must stay consistent with allocation metadata; a crash mid-update can corrupt it, so journaling/careful ordering is used.
- Deallocation just marks blocks free — it does not physically erase data.
