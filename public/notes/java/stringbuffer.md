## Definition

`StringBuffer` is a **mutable**, **thread-safe** sequence of characters in `java.lang`. Unlike `String`, its contents can be modified in place (append, insert, delete, reverse) without creating a new object each time. Every public method is **synchronized**, making it safe to use from multiple threads at the cost of some performance.

## Why use it?

Repeated `String` concatenation creates a new object on every step (O(n²) work and lots of garbage). `StringBuffer` maintains an internal, resizable `char[]` buffer and mutates it, giving amortized O(1) appends.

```java
StringBuffer sb = new StringBuffer("Hello");
sb.append(" World");      // Hello World
sb.insert(5, ",");        // Hello, World
sb.replace(0, 5, "Hi");   // Hi, World
sb.reverse();             // dlroW ,iH
sb.delete(0, 3);          // oW ,iH  (example)
System.out.println(sb.length());
String result = sb.toString();  // convert back to String
```

## Common methods

| Method | Effect |
|--------|--------|
| `append(x)` | Add to end (any type) |
| `insert(i, x)` | Insert at index |
| `replace(s, e, str)` | Replace range [s, e) |
| `delete(s, e)` | Remove range [s, e) |
| `deleteCharAt(i)` | Remove one char |
| `reverse()` | Reverse in place |
| `capacity()` | Current buffer size |
| `toString()` | Convert to `String` |

## Capacity growth

```text
new StringBuffer()  -> capacity 16 (default)
append past capacity -> new capacity = (old * 2) + 2
[ H e l l o _ _ ... ]   len=5, cap=16
```

## Comparison

| Feature | String | StringBuffer | StringBuilder |
|---------|--------|--------------|----------------|
| Mutable | No | Yes | Yes |
| Thread-safe | Yes (immutable) | **Yes (synchronized)** | No |
| Speed | Slow for edits | Slower (locking) | Fastest |
| Since | 1.0 | 1.0 | 1.5 |

## Key points

- Use `StringBuffer` when a mutable string is shared across **multiple threads**.
- For single-threaded code prefer `StringBuilder` — same API, no locking overhead, faster.
- Default initial capacity is 16; it grows as `(oldCapacity * 2) + 2` when exceeded. Pre-size via `new StringBuffer(n)` if you know the length.
- Call `toString()` to get an immutable `String` from the buffer.
