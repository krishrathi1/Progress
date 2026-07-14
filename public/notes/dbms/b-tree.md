## Definition

A **B-Tree** and its variant **B+ Tree** are self-balancing, multi-way search trees used to implement **database indexes** on disk. They keep data sorted and guarantee logarithmic-time search, insert, and delete while minimizing the number of **disk I/O operations** by storing many keys per node (one node ≈ one disk block/page).

- **Order (m)**: maximum number of children a node can have.
- A node holds up to `m-1` keys and `m` child pointers.
- The tree stays **balanced**: every leaf is at the same depth, so height stays low (`O(log_m N)`).

## Why not a Binary Search Tree?

A BST has fan-out 2, so its height is `log₂ N`. Each node visit = one disk seek, which is expensive (~ms). A B-Tree of order 100+ has height `log₁₀₀ N`, dramatically cutting disk reads.

## B-Tree Properties (order m)

- Every node has at most `m` children and at least `⌈m/2⌉` children (root ≥ 2).
- Keys inside a node are sorted; subtree between two keys holds values between them.
- **Data/record pointers can live in internal nodes AND leaves.**
- All leaves appear at the same level.

```text
        [ 30 | 60 ]
       /     |     \
  [10 20] [40 50] [70 80]     (order-3 B-Tree)
```

## B+ Tree

A refinement of the B-Tree, and the structure most RDBMS (MySQL InnoDB, Oracle) actually use for indexes.

- **All actual data/record pointers are stored only in leaf nodes.**
- Internal nodes store **only keys** to guide the search (act as an index).
- **Leaf nodes are linked** in a sorted linked list -> excellent for **range queries** and ordered scans.

```text
Internal:        [ 30 | 60 ]
                /     |     \
Leaves:  [10 20]->[30 40 50]->[60 70 80]   (linked left-to-right)
```

## B-Tree vs B+ Tree

| Aspect | B-Tree | B+ Tree |
|--------|--------|---------|
| Data pointers | In internal + leaf nodes | Only in leaf nodes |
| Leaf linkage | Not linked | Linked list of leaves |
| Range / sequential scan | Slower (must traverse) | Very fast (follow leaf links) |
| Fan-out (keys per internal node) | Lower | Higher (keys only) -> shorter tree |
| Search cost | May stop early at internal node | Always reaches a leaf |
| Redundancy | No key duplication | Keys duplicated in leaves |

## Key points

- Both keep height low to reduce **disk I/O**; complexity for search/insert/delete is `O(log N)`.
- **B+ Tree is preferred for databases** due to linked leaves (range scans) and higher fan-out.
- A node maps to a **disk block**; more keys per block = fewer block reads.
- Root is always in memory; only ~2-4 disk reads reach any record in huge tables.
- Insertions may cause a node to **split** and propagate up; deletions may cause **merge/borrow**.
