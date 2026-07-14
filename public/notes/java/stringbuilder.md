## Definition

`StringBuilder` (added in Java 5) is a **mutable**, **non-synchronized** sequence of characters in `java.lang`. It has the same API as `StringBuffer` but its methods are **not thread-safe**, which removes locking overhead and makes it the **fastest** choice for building strings in single-threaded code — the default recommendation for most string-building tasks.

## Basic usage

```java
StringBuilder sb = new StringBuilder();   // capacity 16
sb.append("Hello");
sb.append(' ').append("World").append(42);  // method chaining
sb.insert(0, ">> ");
sb.reverse();
System.out.println(sb.toString());
```

## Building efficiently in a loop

```java
// BAD: O(n^2), creates a new String each iteration
String out = "";
for (int i = 0; i < 1000; i++) out += i + ",";

// GOOD: O(n), one mutable buffer
StringBuilder b = new StringBuilder();
for (int i = 0; i < 1000; i++) b.append(i).append(',');
String result = b.toString();
```

## Common methods

| Method | Effect |
|--------|--------|
| `append(x)` | Add to end; returns `this` (chainable) |
| `insert(i, x)` | Insert at index |
| `delete(s, e)` / `deleteCharAt(i)` | Remove chars |
| `replace(s, e, str)` | Replace range [s, e) |
| `reverse()` | Reverse in place |
| `setCharAt(i, c)` | Overwrite one char |
| `toString()` | Produce final `String` |

## StringBuilder vs StringBuffer

```text
Both mutable, same methods.
StringBuilder ── no synchronization ── FAST ── single thread
StringBuffer  ── synchronized       ── SAFE ── shared threads
```

| | StringBuilder | StringBuffer |
|--|---------------|--------------|
| Thread-safe | No | Yes |
| Performance | Faster | Slower (locks) |
| Since | Java 5 | Java 1.0 |

## Key points

- Prefer `StringBuilder` over `StringBuffer` unless the buffer is genuinely shared across threads.
- `append()` returns the same builder, enabling fluent **method chaining**.
- The Java compiler already rewrites simple `a + b` concatenation using `StringBuilder`, but explicit use is essential inside **loops**.
- Default capacity is 16, growing as `(old * 2) + 2`; pre-size with `new StringBuilder(n)` to avoid reallocations.
- Call `toString()` once at the end to get the immutable result.
