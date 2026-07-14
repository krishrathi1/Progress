## Definition

**`Hashtable<K, V>`** is a **legacy** (JDK 1.0) `Map` implementation that stores key-value pairs in a hash table and is **synchronized** — every public method is thread-safe. It predates the Collections Framework but was retrofitted to implement `Map`.

- Thread-safe: all methods hold the object's intrinsic lock.
- **Does not permit `null` keys or `null` values** (throws `NullPointerException`).
- No guaranteed iteration order.

## How It Works

```text
Synchronized bucket array; chaining on collision.
Every put/get acquires the whole-table lock:

Thread-1 put("x") ─┐
                   ├─ serialized on one lock ──> table
Thread-2 get("y") ─┘   (coarse-grained locking)
```

Because a single lock guards the entire table, concurrent throughput is poor under contention.

## Example

```java
import java.util.*;

Hashtable<String,Integer> ht = new Hashtable<>();
ht.put("a", 1);
ht.put("b", 2);
System.out.println(ht.get("a")); // 1

// ht.put(null, 5);  // throws NullPointerException
// ht.put("c", null); // throws NullPointerException

Enumeration<String> keys = ht.keys(); // legacy iteration
while (keys.hasMoreElements())
    System.out.println(keys.nextElement());
```

## Hashtable vs HashMap vs ConcurrentHashMap

| Feature | Hashtable | HashMap | ConcurrentHashMap |
|---------|-----------|---------|-------------------|
| Thread-safe | Yes (full lock) | No | Yes (fine-grained) |
| Null key/value | No / No | 1 / yes | No / No |
| Performance | slow (contended) | fast | fast & concurrent |
| Since | JDK 1.0 | JDK 1.2 | JDK 1.5 |
| Iterator | fail-safe-ish (Enumeration) | fail-fast | weakly consistent |

## Key points

- Considered **obsolete** — for single-threaded code use `HashMap`; for concurrency use `ConcurrentHashMap`.
- Whole-table locking makes it a **bottleneck** at scale; `ConcurrentHashMap` locks only segments/bins.
- Rejecting `null` can be a subtle source of `NullPointerException` during migration.
- Still appears in old APIs (e.g., `Properties` extends `Hashtable`), so recognizing it matters for interviews and maintenance.
