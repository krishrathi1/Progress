## Definition

**try-with-resources** is a Java 7 feature that automatically closes resources (files, sockets, DB connections) at the end of a `try` block. Any object declared in the `try(...)` parentheses that implements **`AutoCloseable`** (or its subinterface `Closeable`) is closed automatically — even if an exception is thrown — removing the need for an explicit `finally` block.

## Syntax

```java
try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
    return br.readLine();
}   // br.close() is called automatically here
catch (IOException e) {
    e.printStackTrace();
}
```

- You may declare **multiple** resources separated by `;`.
- Resources are closed in **reverse order** of declaration (last opened, first closed).
- Since Java 9, an already-declared `final` (or effectively final) variable can be used directly inside the parentheses.

## Why it matters

The old approach was verbose and error-prone: forgetting `close()`, or an exception inside `finally` masking the original exception.

```text
Old way:                       try-with-resources:
try {                          try (Resource r = open()) {
   r = open();                     use(r);
   use(r);                     }   // auto-close, order guaranteed
} finally {
   if (r != null) r.close();   // boilerplate + can throw
}
```

## Suppressed exceptions

If both the `try` body **and** `close()` throw, the body's exception propagates and the `close()` exception is **suppressed** (attached, retrievable via `Throwable.getSuppressed()`). In the old `finally` pattern the close exception would instead hide the original — a key advantage of this construct.

## Comparison

| Aspect | finally | try-with-resources |
|--------|---------|--------------------|
| Close call | Manual | Automatic |
| Boilerplate | High | Low |
| Close order | Manual | Reverse of declaration |
| Original exception | Can be masked | Preserved (others suppressed) |
| Requirement | none | resource must be `AutoCloseable` |

## Key points

- Resource type must implement `AutoCloseable`; `close()` is invoked automatically.
- Multiple resources allowed; closed in **reverse** declaration order.
- Exceptions from `close()` are **suppressed**, not lost.
- Reduces boilerplate and prevents resource leaks — always prefer it for I/O and JDBC.
