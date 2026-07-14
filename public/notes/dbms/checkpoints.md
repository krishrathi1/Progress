## Definition

A **checkpoint** is a point in the transaction log where the DBMS forces all buffered log records and modified data pages to disk, then writes a special `<checkpoint>` record. It **bounds recovery work**: after a crash, the recovery manager need not scan the entire log — only the portion from the last checkpoint onward.

## Why Checkpoints Are Needed

Without them, redo/undo would have to reprocess the **whole log** since the database was created — impractical for long-running systems.

## Steps Taken at a Checkpoint

```text
1. Suspend accepting new updates momentarily.
2. Flush all log records in memory to stable storage.
3. Flush all modified (dirty) buffer pages to disk.
4. Write a <checkpoint L> record (L = list of active transactions).
5. Resume normal operation.
```

## Recovery Using Checkpoints

- Scan the log **backward** to the most recent `<checkpoint>`.
- Transactions committed **before** the checkpoint are already safely on disk → ignore.
- Build REDO and UNDO lists only from the checkpoint onward.

```text
Log:  ... <ckpt {T2}> <T2,commit> <T3,start> <T3,..> CRASH
                  |
         start recovery here
UNDO = {T3}   (started, never committed)
REDO = {T2}   (committed after checkpoint)
```

## Fuzzy Checkpoints

A simple checkpoint stalls the whole system while flushing dirty pages. A **fuzzy checkpoint** writes the `<checkpoint>` record immediately and flushes dirty pages **in the background**, so transactions keep running. ARIES-style recovery uses fuzzy checkpoints with a Dirty Page Table.

## Comparison

| Type | System stalls? | Complexity | Used by |
|------|----------------|------------|---------|
| Simple / consistent | Yes (brief) | Low | Textbook recovery |
| Fuzzy | No | Higher | ARIES, real DBMS |

## Key points

- Checkpoints **limit the log region** that recovery must scan.
- Enforce **write-ahead logging** before flushing pages.
- Transactions committed before a checkpoint need no redo.
- **Fuzzy checkpoints** avoid halting the database.
