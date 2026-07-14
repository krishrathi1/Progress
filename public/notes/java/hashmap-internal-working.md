## What is a HashMap?
A **HashMap** stores key→value pairs and gives average **O(1)** get/put by turning the key into an array index via a hash function.

## Internal structure
An array of **buckets** (Node[] table). Each bucket holds a linked list (or a balanced tree when it gets large).

~~~
index = (n - 1) & hash(key)      // n = table size (power of 2)

table
 0 -> null
 1 -> (k1,v1) -> (k5,v5)         // collision chain
 2 -> null
 3 -> (k2,v2)
~~~

## put(key, value) — step by step
1. Compute **hash(key)** (Java also spreads high bits: h ^ (h >>> 16)).
2. Find bucket index with **(n-1) & hash**.
3. If bucket empty → insert node.
4. Else walk the chain: if a key **equals()** an existing one → overwrite value; otherwise append.
5. If size > capacity × **load factor (0.75)** → **resize** (double capacity, rehash).

## Collisions & treeification
- Multiple keys landing in one bucket form a chain (O(k)).
- Since Java 8, a chain longer than **8** (with table ≥ 64) becomes a **red-black tree**, so worst case is **O(log n)** instead of O(n).

## Key points
- **equals()** and **hashCode()** must be consistent — unequal hashCodes for equal objects breaks lookups.
- Iteration order is **not** guaranteed (use LinkedHashMap for insertion order, TreeMap for sorted).
- Not thread-safe → use ConcurrentHashMap for concurrency.
