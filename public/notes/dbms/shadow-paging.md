## Definition

**Shadow paging** is a **log-free recovery** technique. Instead of recording undo/redo logs, it maintains **two page tables** — the *current* page table and a *shadow* (saved) page table. Updates are written to **new copies** of pages, leaving the original ("shadow") pages untouched, so recovery is simply a matter of pointing back to the shadow table.

## How It Works

The database is divided into fixed-size **pages**. A **page table** maps logical page numbers to physical disk locations.

```text
                 SHADOW page table        CURRENT page table
 Page 1  ------> block 100  <-----------  block 100   (unchanged)
 Page 2  ------> block 205                block 305   (new copy!)
                    ^                          ^
              old (safe) data            modified data
```

When a transaction modifies **Page 2**:

1. A **free block** is allocated (block 305).
2. The new content is written there — the old block 205 is never overwritten.
3. Only the **current** page table entry is updated to point at block 305.

## Commit

```text
1. Flush all modified data pages to disk.
2. Flush the current page table to disk.
3. Atomically switch the disk pointer:
      shadow table  <--  current table
```

The single-pointer switch is the **atomic commit point**. If a crash occurs before it, the on-disk shadow table still points to old pages — the transaction simply vanishes with **no undo needed**.

## Recovery

- On crash before commit: reload the **shadow page table** → old consistent state is instantly restored.
- No log scan, no undo, no redo.

## Advantages vs Disadvantages

| Advantages | Disadvantages |
|------------|---------------|
| No log overhead | **Data fragmentation** (pages scattered) |
| Fast, simple recovery | Garbage collection of old pages needed |
| No undo/redo | Hard to support **concurrent** transactions |
| Atomic commit via pointer swap | Commit overhead (flush page tables) |

## Key points

- Uses **two page tables**: shadow (committed) and current (in-progress).
- Commit = **atomic pointer switch**; recovery = revert to shadow table.
- **No logging** required — but causes fragmentation and poor concurrency support.
