## Definition

**File organization** is the method of arranging records (rows) physically inside data blocks on disk. The choice determines how fast records can be **inserted, searched, deleted, and scanned**, and how much storage is wasted. A database maps logical tables to physical files made of fixed-size **blocks/pages**, each holding several records.

## Main Techniques

### 1. Heap (Unordered) File

Records are stored in **insertion order** — appended wherever free space exists.

- Insert: very fast (append at end) — `O(1)`.
- Search: must do a full **linear scan** — `O(N)`.
- Best for small tables or bulk loading.

### 2. Sequential (Ordered) File

Records kept **sorted** on a key field.

- Search: **binary search** possible — `O(log N)`.
- Range queries efficient (contiguous, ordered).
- Insert/delete costly — may need to shift records or use an **overflow area**.

### 3. Hash File

Bucket address computed by a **hash function** `h(key)`.

- Equality search: near `O(1)`.
- No support for range queries; ordering is lost.

### 4. Clustered / Cluster File

Records from one or more related tables that are **frequently joined** are stored together in the same block to speed up joins.

### 5. B+ Tree File (Indexed)

Records organized via a B+ Tree index — balanced, good for both equality and range queries.

```text
Heap:       | R3 | R1 | R5 | R2 |   (any order, append)
Sequential: | R1 | R2 | R3 | R5 |   (sorted by key)
Hash:       h(key) -> bucket 2 -> | R5 |
```

## Comparison

| Organization | Insert | Equality Search | Range Query | Ordered Scan |
|--------------|--------|-----------------|-------------|--------------|
| Heap | O(1) fast | O(N) scan | O(N) | No |
| Sequential | Slow (shift) | O(log N) | Good | Yes |
| Hash | Fast | O(1) | Not supported | No |
| B+ Tree | O(log N) | O(log N) | Excellent | Yes |

## Key points

- **Heap** = fastest insert, slowest search; good for bulk loads and full scans.
- **Sequential** = great for ordered/range access but expensive updates.
- **Hash** = best for exact-match; useless for ranges.
- **B+ Tree** = balanced all-rounder, the default for indexed tables.
- Choice depends on the dominant **query workload** (point lookups vs ranges vs scans).
