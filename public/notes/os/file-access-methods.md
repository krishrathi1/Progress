## Definition

A **file access method** defines how the bytes/records of a file are read and written — i.e., in what order the file's data can be reached. The OS/file system may support one or several methods; the choice affects performance for a given workload.

## 1. Sequential access

- Data is processed **in order**, from start to end. A read advances the file pointer; a write appends at the end.
- Operations: `read_next`, `write_next`, `rewind`.
- Best for: text files, log files, tape media, streaming — anything read front to back.

## 2. Direct (relative / random) access

- The file is viewed as numbered **fixed-length logical records (blocks)**. Any block can be read/written directly by its number, in any order.
- Operations: `read(n)`, `write(n)`, `seek(n)` where `n` is a block index.
- Best for: databases, where a query jumps straight to a specific record without scanning.

## 3. Indexed access

- An **index** (like a book's table of contents) maps keys to block locations. To find a record: search the index, get the block pointer, then do a direct access.
- Large files use **multi-level indexes** (index of indexes).
- Built on top of direct access; ideal for fast key-based lookup.

```text
Sequential:   [R0]->[R1]->[R2]->[R3]->...   (must pass through in order)

Direct:       seek(2)
              [R0][R1][R2][R3]   -----> jump straight to R2

Indexed:      key "smith" --index--> block 57 --direct--> record
```

## Comparison

| Method     | Order of access | Speed for random record | Typical use          |
|------------|-----------------|-------------------------|----------------------|
| Sequential | Front to back   | Slow (scan)             | Logs, text, tapes    |
| Direct     | Any block by #  | Fast                    | Databases, disks     |
| Indexed    | Via key lookup  | Fast (after index read) | Large keyed datasets |

## Key points

- **Sequential** is simplest and matches magnetic tape's physical nature.
- **Direct access** exploits disks being random-access devices; needed for O(1) record retrieval.
- **Indexed access** is built on direct access plus an index structure; enables fast search by key at the cost of extra index storage.
- The access method is distinct from the **allocation method** (how blocks are physically laid out on disk).
