## Definition

Java offers three classes for handling text. The key difference is **mutability** (can the object be changed after creation?) and **thread-safety**.

- **String** — immutable. Every "modification" creates a brand-new object.
- **StringBuffer** — mutable and **synchronized** (thread-safe), so slower.
- **StringBuilder** — mutable and **not synchronized**, so fastest in single-threaded code.

## Comparison Table

| Feature | String | StringBuffer | StringBuilder |
|---------|--------|--------------|---------------|
| Mutable | No | Yes | Yes |
| Thread-safe | Yes (immutable) | Yes (synchronized) | No |
| Performance | Slow for edits | Slower (locking) | Fastest |
| Introduced | JDK 1.0 | JDK 1.0 | JDK 1.5 |
| Stored in | String pool / heap | Heap | Heap |

## Why String Is Slow for Edits

```java
String s = "";
for (int i = 0; i < 3; i++) s += i;   // creates a new object each time
// "" -> "0" -> "01" -> "012"  (3 discarded objects)

StringBuilder sb = new StringBuilder();
for (int i = 0; i < 3; i++) sb.append(i);  // edits same buffer
System.out.println(sb.toString());          // 012
```

## Internal Buffer

```text
StringBuilder("abc"), default capacity 16
[ a | b | c |   |   | ... ]   length=3, capacity=16
append("d") -> writes in place, no new object
[ a | b | c | d |   | ... ]   length=4
```

## When to Use Which

- **String** — fixed text, keys, constants, values used as map keys.
- **StringBuilder** — heavy string building in a single thread (loops, parsers).
- **StringBuffer** — same as StringBuilder but when multiple threads share the buffer.

## Key points

- Immutability makes String safe to share and cache but costly to modify.
- Prefer **StringBuilder** for concatenation in loops; avoid `+=` on String there.
- StringBuffer's methods are `synchronized`; that lock overhead is the only real difference from StringBuilder.
- Both StringBuffer and StringBuilder expose `append`, `insert`, `reverse`, `delete`, `toString`.
- String literals live in the string pool; buffer/builder objects always live on the heap.
