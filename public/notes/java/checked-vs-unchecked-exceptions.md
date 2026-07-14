## Definition

Java exceptions split into two families based on **when they are checked** and whether the compiler forces you to handle them:

- **Checked exceptions** — verified at **compile time**. The compiler enforces the "catch or specify" rule: you must either wrap them in try-catch or declare them with `throws`. They extend `Exception` (but **not** `RuntimeException`).
- **Unchecked exceptions** — checked only at **runtime**. The compiler does not force handling. They extend `RuntimeException` (or `Error`).

## Hierarchy

```text
                Throwable
                /       \
           Exception    Error   (unchecked: OutOfMemoryError, ...)
           /       \
   (checked)   RuntimeException   (unchecked)
   IOException   ├─ NullPointerException
   SQLException  ├─ ArithmeticException
   ...           ├─ ArrayIndexOutOfBoundsException
                 └─ IllegalArgumentException
```

Everything under `RuntimeException` and everything under `Error` is **unchecked**. Other `Exception` subclasses are **checked**.

## Comparison

| Aspect | Checked | Unchecked |
|--------|---------|-----------|
| Checked at | Compile time | Runtime |
| Must handle/declare? | Yes | No |
| Base class | `Exception` (not RuntimeException) | `RuntimeException` / `Error` |
| Typical cause | External/recoverable (I/O, DB) | Programming bugs |
| Examples | `IOException`, `SQLException`, `ClassNotFoundException` | `NullPointerException`, `ArithmeticException`, `ArrayIndexOutOfBoundsException` |

## Example

```java
import java.io.*;

public class CheckedUncheckedDemo {
    // CHECKED: must declare throws or catch
    static void readFile() throws IOException {
        throw new IOException("io failure");
    }

    // UNCHECKED: no declaration required
    static int divide(int a, int b) {
        return a / b;                 // may throw ArithmeticException at runtime
    }

    public static void main(String[] args) {
        try {
            readFile();
        } catch (IOException e) {
            System.out.println("Checked handled: " + e.getMessage());
        }
        System.out.println(divide(10, 0)); // ArithmeticException, uncaught -> crash
    }
}
```

## When to use which

- Use **checked** for **recoverable** conditions the caller should anticipate (missing file, network down).
- Use **unchecked** for **programming errors** that should be fixed in code (null misuse, bad index, invalid argument).

## Key points

- Compiler enforces handling only for **checked** exceptions.
- `RuntimeException` and its subclasses are **unchecked**.
- `Error` (e.g., `StackOverflowError`) is unchecked and generally not meant to be caught.
- Unchecked exceptions usually signal bugs — fix the code rather than catching them defensively.
