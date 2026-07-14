## Definition

**Hashing** is an indexing technique that maps a **search key** to the address of a **bucket** (disk block) using a **hash function** `h(key)`. It gives near **O(1)** lookup for equality searches (`WHERE id = 42`), avoiding the tree traversal that B+ Trees need. It is poor for range queries because hashing destroys key ordering.

- **Bucket**: unit of storage (a disk block) holding one or more records.
- **Collision**: two keys hash to the same bucket.
- **Overflow**: a bucket becomes full and needs an extra chained bucket.

## Static Hashing

The number of buckets `B` is **fixed** at design time. Address = `h(key) mod B`.

```text
h(key) mod 4
key=112 -> bucket 0
key=113 -> bucket 1
key=114 -> bucket 2
key=115 -> bucket 3
key=116 -> bucket 0  (collision -> overflow chain)
```

- **Problem**: if the database grows, buckets overflow -> long overflow chains -> performance degrades. If it shrinks, buckets waste space.
- Overflow handled by **chaining** (linked overflow buckets) or **open addressing**.

## Dynamic Hashing

The bucket count **grows and shrinks** with the data, avoiding overflow degradation. Two main schemes:

- **Extendible hashing**: uses a **directory** of `2^d` pointers (d = global depth). Only the first `d` bits of the hash are used. When a bucket overflows, it **splits** and the directory may **double**. Each bucket has a **local depth**.
- **Linear hashing**: splits buckets one at a time in a round-robin order using a split pointer; no directory needed.

```text
Extendible hashing (global depth d=2)
Directory        Buckets
  00 --> [ A ]  (local depth 1)
  01 --> [ A ]
  10 --> [ B ]  (local depth 2)
  11 --> [ C ]
Overflow -> split target bucket, maybe double directory
```

## Comparison

| Aspect | Static Hashing | Dynamic Hashing |
|--------|----------------|-----------------|
| Bucket count | Fixed | Grows/shrinks |
| Overflow handling | Overflow chains | Bucket split |
| Space efficiency | Poor if data varies | Good |
| Complexity | Simple | More complex (directory/pointer) |
| Performance under growth | Degrades | Stays near O(1) |

## Hashing vs B+ Tree Index

| Query type | Hash index | B+ Tree index |
|-----------|-----------|---------------|
| Equality (`=`) | Excellent O(1) | Good O(log N) |
| Range (`<`, `BETWEEN`) | Not supported | Excellent |
| Ordered scan | No | Yes |

## Key points

- Hashing excels at **equality lookups**, not ranges.
- **Static** hashing is simple but suffers overflow as data grows.
- **Dynamic** hashing (extendible / linear) adapts bucket count to keep constant-time access.
- A good hash function distributes keys **uniformly** to minimize collisions.
