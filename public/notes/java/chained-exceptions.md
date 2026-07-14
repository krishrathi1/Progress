## Definition

**Chained exceptions** let one exception carry a reference to the exception that **caused** it. This preserves the original low-level failure while letting you throw a more meaningful high-level exception. The linked cause is called the **root cause**, and the mechanism is central to producing readable stack traces.

## How to chain

Two standard ways, both backed by `Throwable`:

```java
// 1. Constructor that accepts a cause
try {
    readConfig();
} catch (IOException e) {
    throw new ConfigException("Cannot load config", e); // e = cause
}

// 2. initCause() for exceptions lacking a cause-constructor
SQLException se = new SQLException("query failed");
se.initCause(new IOException("socket closed"));
throw se;
```

## Relevant Throwable API

| Method | Purpose |
|--------|---------|
| `Throwable(String msg, Throwable cause)` | constructor storing the cause |
| `Throwable(Throwable cause)` | cause-only constructor |
| `getCause()` | returns the linked cause (or `null`) |
| `initCause(Throwable)` | sets cause once, if not already set |

## Why chain instead of swallow

Rethrowing without the cause loses the origin. Chaining keeps the full trail so logs show *what* failed and *why*.

```text
ConfigException: Cannot load config
    at App.start(App.java:12)
Caused by: java.io.IOException: config.properties not found
    at App.readConfig(App.java:20)
```

The `Caused by:` line is produced automatically by the JVM when a cause is attached.

## Common pitfall

```java
catch (IOException e) {
    throw new ConfigException("failed");   // BAD: loses e, no root cause
}
```

Always pass `e` as the cause so the original stack trace survives.

## Key points

- Chaining links a high-level exception to its underlying **cause** via `getCause()`.
- Set the cause with a cause-accepting **constructor** or **`initCause()`** (callable only once).
- The JVM prints the chain with **`Caused by:`** in the stack trace.
- Enables **exception abstraction/translation** — hide low-level details while preserving diagnostics.
- Never discard the original exception when rethrowing.
