## Definition

**Dense** and **sparse** indexes are two ways of deciding **how many entries** an index keeps relative to the data records.

- **Dense index** — contains an index entry for **every search-key value** (i.e., every record, or every distinct key).
- **Sparse index** — contains an entry only for **some** keys, typically **one per data block**. To find a record, you locate the largest key ≤ target, then scan within the block.

A sparse index only works when the data file is **physically sorted** on the search key, because it relies on sequential scanning inside a block.

## How Each Search Works

```text
DENSE INDEX                     SPARSE INDEX (one entry / block)
key -> record                   key -> block
10  --------> rec 10            10  --------> Block1 [10,13,17]
13  --------> rec 13            30  --------> Block2 [30,34,38]
17  --------> rec 17            55  --------> Block3 [55,60,66]
30  --------> rec 30
...                             Find 34: pick 30 (<=34), go to
                                Block2, scan -> 30,34 found.
```

## Comparison

| Aspect | Dense index | Sparse index |
|--------|-------------|--------------|
| Entries | One per record/key | One per block |
| Index size | Larger | Smaller (fits in memory) |
| Lookup speed | Faster (direct) | Slightly slower (scan block) |
| Requires sorted file? | No | Yes |
| Works on unsorted / secondary field? | Yes | No |
| Maintenance on insert/delete | Costly | Cheaper |

## Trade-off Summary

- **Dense** favors **fast lookups** and works even when data is unsorted (needed for secondary indexes), at the cost of a bigger index.
- **Sparse** favors a **compact index** that may fit entirely in memory, reducing disk I/O for the index itself, but needs a sorted file and one extra block scan.

## Key points

- Dense = entry per record; Sparse = entry per block.
- Sparse index **requires the file to be ordered** on the key; dense does not.
- Secondary indexes are almost always **dense**; primary indexes are often **sparse**.
- Sparse indexes save space (can stay in RAM); dense indexes give quicker direct access.
