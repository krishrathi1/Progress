## Definition

A **page fault** is a trap (interrupt) raised by the hardware **MMU** when a running process references a page whose **valid/present bit is not set** — i.e., the page is not currently in a physical frame (it is on disk or not yet loaded). Control transfers to the OS, which brings the page into RAM and resumes the instruction.

A page fault is **not necessarily an error**; in demand paging it is the normal mechanism to load pages lazily. Only a reference to an address **outside** the process's legal space is a genuine fault (→ segmentation fault / SIGSEGV).

## Page-Fault Handling Steps

```text
1. MMU checks page-table entry -> valid bit = 0 -> trap to OS
2. OS checks the reference:
     - illegal address -> terminate process (real fault)
     - legal but not in memory -> continue
3. Find a FREE frame (free list)
     - if none, run page-replacement to pick a VICTIM
     - if victim is dirty, write it back to disk
4. Schedule disk read: load desired page into the frame
5. Update page table: set frame no., valid bit = 1
6. RESTART the instruction that caused the fault
```

```text
 Reference page 5 (valid=0)
        |
        v
   +------------------+
   |   PAGE FAULT     |----> OS: load page 5 from disk
   +------------------+           |
        ^                         v
        |                 update page table (valid=1)
        +----- restart instruction <---+
```

## Minor vs Major Faults

| Type | Description | Cost |
|------|-------------|------|
| **Minor (soft)** | Page already in RAM (e.g., in another process / free list, or just needs table update) | Fast — no disk I/O |
| **Major (hard)** | Page must be read from disk/swap | Slow — disk I/O (ms) |

## Effect on Performance

```text
EAT = (1 - p) * memory_access + p * page_fault_service_time
```

With `p` = page-fault rate. Since servicing a major fault (disk, ~ms) is millions of times slower than a memory access (~ns), keeping `p` extremely small is essential; **locality of reference** naturally does this.

## Key points

- Triggered by the **valid/invalid bit** = 0 during address translation.
- Handler: locate frame (evict if needed) → load page → update table → **restart instruction**.
- **Minor** faults avoid disk; **major** faults require disk I/O and dominate cost.
- Excessive page faults cause **thrashing**, where the CPU spends most time paging.
- Distinct from a **protection/segmentation fault**, which is an illegal access, not a load-on-demand event.
