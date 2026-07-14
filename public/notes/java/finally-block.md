## Definition

The **`finally`** block is a section attached to a `try` (with or without `catch`) whose code is **always executed** after the `try` block completes — whether an exception was thrown or not, and whether it was caught or not. It is the standard place to put **cleanup code** (closing files, releasing locks, closing DB connections).

## Execution guarantee

```text
try  ──► finally            (no exception)
try  ──► catch ──► finally   (exception caught)
try  ──► finally ──► propagate  (exception NOT caught, still runs finally)
```

`finally` runs even if `try`/`catch` contains a `return`, `break`, or `continue`.

## Example

```java
public class FinallyDemo {
    static int test() {
        try {
            System.out.println("try");
            return 1;                 // return is held...
        } catch (Exception e) {
            return 2;
        } finally {
            System.out.println("finally always runs");  // ...runs before return
        }
    }
    public static void main(String[] args) {
        System.out.println("returned " + test());
    }
}
```

Output:

```text
try
finally always runs
returned 1
```

## When finally does NOT run

- `System.exit(0)` is called inside `try`/`catch`.
- The JVM crashes or the thread is killed.
- An infinite loop / power failure prevents completion.

## Caution: return in finally

A `return` (or `throw`) inside `finally` **overrides** any value or exception from `try`/`catch` — this silently swallows exceptions and is considered bad practice.

```java
try { return 1; }
finally { return 9; }   // method returns 9, hides the 1 — avoid this
```

## finally vs try-with-resources

| Aspect | Manual `finally` | try-with-resources |
|--------|------------------|--------------------|
| Closing resources | Explicit code needed | Automatic via `AutoCloseable` |
| Boilerplate | High, error-prone | Minimal |
| Suppressed exceptions | Manual handling | Handled automatically |

## Key points

- `finally` **always executes** except for `System.exit()` / JVM abort.
- Ideal for releasing resources and cleanup, not business logic.
- Never `return` or `throw` from `finally` — it masks the real result/exception.
- With Java 7+, prefer **try-with-resources** for closeable resources.
