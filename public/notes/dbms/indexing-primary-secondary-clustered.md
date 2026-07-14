## Definition

**Indexing** is a data-structure technique to speed up retrieval of records from a table without scanning every row. An index stores **search-key values** together with **pointers** to the corresponding disk records, much like the index at the back of a book. Indexes trade extra storage and slower writes for much faster reads.

Every index entry is a pair: `<search-key, pointer-to-record>`.

## Primary Index

- Built on the **ordering key** of a file whose records are **physically sorted** on that key.
- Usually the **primary key**; the file is sorted by it.
- Typically **sparse** — one entry per data **block** (points to the first record of each block).

## Clustered (Clustering) Index

- Defined on a **non-key** ordering field where many records share the same value, and the file is **physically ordered** on that field.
- One index entry per **distinct value** of the clustering field.
- Only **one** clustered index per table (data can be physically sorted only one way).

## Secondary Index

- Built on a field that is **not** the physical ordering field (a candidate key or non-key).
- Because data is not sorted on this field, it must be **dense** (an entry for every record or every distinct value) and uses pointers/buckets.
- A table can have **many** secondary indexes.

## Comparison

| Feature | Primary | Clustered | Secondary |
|---------|---------|-----------|-----------|
| File physically sorted on field? | Yes | Yes | No |
| Field type | Key (ordering) | Non-key (ordering) | Key or non-key |
| Entries | Sparse | One per distinct value | Dense |
| How many per table | One | One | Many |

## Diagram

```text
PRIMARY (sparse, sorted file)      SECONDARY (dense, unsorted field)
 key   -> block                     key   -> record
 10 ---------> [10,14,17]            Ana ---------> row 8
 22 ---------> [22,25,29]            Ben ---------> row 3
 40 ---------> [40,46,51]            Cal ---------> row 5
```

## Key points

- Primary & clustered require the file to be **physically ordered**; secondary does not.
- **Sparse** = one entry per block (only for ordered files); **dense** = one entry per record.
- Only **one** primary/clustered index but **many** secondary indexes.
- Indexes speed up `SELECT`/`WHERE`/joins but slow down `INSERT`/`UPDATE`/`DELETE`.
