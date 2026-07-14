## Definition

**Partitioning** divides main memory into regions (partitions) so multiple processes can reside in memory at once (multiprogramming). Two schemes exist: **fixed (static)** partitioning and **dynamic (variable)** partitioning.

## Fixed (Static) Partitioning

Memory is divided into a **fixed number of partitions of predetermined size** at boot time. Each partition holds exactly one process.

```text
 +----------+  OS
 +----------+  Partition 1 (4 MB)  <- Process A (2 MB) [2 MB wasted]
 +----------+  Partition 2 (4 MB)  <- Process B (4 MB)
 +----------+  Partition 3 (8 MB)  <- free
 +----------+  Partition 4 (8 MB)  <- free
```

- Partition sizes are set in advance and do not change.
- A process is loaded into any partition big enough.
- Causes **internal fragmentation**: unused space inside a partition (e.g., 2 MB process in a 4 MB partition wastes 2 MB).
- Degree of multiprogramming is limited by the number of partitions.

## Dynamic (Variable) Partitioning

Partitions are **created at runtime**, each exactly the size the process requests.

```text
 +----------+  OS
 +----------+  Process A (2 MB)
 +----------+  Process B (4 MB)
 +----------+  Process C (1 MB)
 +----------+  free space (grows/shrinks)
```

- No fixed partitions; memory is allocated as processes arrive.
- **No internal fragmentation** (exact fit).
- Suffers **external fragmentation**: free memory becomes scattered small holes.
- More complex bookkeeping (must track holes) and may need **compaction**.

## Comparison

| Feature | Fixed Partitioning | Dynamic Partitioning |
|---|---|---|
| Partition size | Fixed at boot | Decided at runtime |
| Number of partitions | Fixed | Variable |
| Internal fragmentation | Yes | No |
| External fragmentation | Yes (limited) | Yes |
| Implementation | Simple | Complex |
| Multiprogramming degree | Fixed limit | Flexible |

## Key points

- Fixed partitioning is simple but wastes memory via **internal fragmentation**.
- Dynamic partitioning eliminates internal fragmentation but introduces **external fragmentation**.
- Both use allocation strategies (first/best/worst fit) to choose a partition or hole.
- Compaction addresses external fragmentation in the dynamic scheme.
