## Definition

**Virtual memory** is a technique that lets a process execute even when it is **not fully loaded** in physical memory (RAM). The OS gives each process the illusion of a large, contiguous address space by keeping only the currently needed pages in RAM and the rest on secondary storage (disk/swap).

- Enables programs **larger than physical RAM** to run.
- Increases **multiprogramming** degree (more processes fit).
- Provides isolation and protection between processes.

## Demand Paging

**Demand paging** is the most common way to implement virtual memory: a page is loaded into RAM **only when it is referenced** ("on demand"), never in advance. This is a form of **lazy loading**.

Each page-table entry has a **valid/invalid (present) bit**:

- **valid** → page is in a physical frame.
- **invalid** → page is on disk (or illegal). Accessing it triggers a **page fault**.

## Demand Paging Flow

```text
CPU references page P
        |
        v
  Valid bit set? ---- yes ---> access frame (normal)
        |
        no
        v
  PAGE FAULT (trap to OS)
        |
        v
  1. Find free frame (or evict a victim page)
  2. Read page P from disk into the frame
  3. Update page table: set valid bit, frame no.
  4. Restart the faulting instruction
```

## Key Terms

| Term | Meaning |
|------|---------|
| Page fault | Trap when referenced page is not in RAM |
| Backing store | Disk/swap area holding pages |
| Pure demand paging | Start process with **zero** pages loaded |
| Effective Access Time | EAT = (1−p)·mem + p·page_fault_time |

**Effective Access Time (EAT):** with page-fault rate `p`, memory access `ma`, and fault service time `pf`:

```text
EAT = (1 - p) * ma + p * pf
```

Because `pf` (ms, disk) ≫ `ma` (ns), even a tiny `p` hugely raises EAT — so low fault rates are critical.

## Key points

- Virtual memory decouples logical address space from physical RAM size.
- Demand paging loads pages **lazily**, only on reference, via the valid/invalid bit.
- A **page fault** is not an error here — it is the mechanism to fetch the page.
- **Locality of reference** keeps the page-fault rate low, making the scheme efficient.
- Too much paging activity leads to **thrashing** (see page-replacement topics).
