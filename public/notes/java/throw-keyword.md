## Definition

The **`throw`** keyword is used to **explicitly throw a single exception object** from within a method or block. It hands control to the nearest matching `catch` block (or propagates up the call stack if none is found). You throw an *instance* of `Throwable` (usually an `Exception` or a subclass).

```java
throw new IllegalArgumentException("age cannot be negative");
```

## Syntax rules

- You throw an **object**, not a class: `throw new X()`, never `throw X`.
- The object must be a `Throwable` or subclass; otherwise it is a compile error.
- Any statement after `throw` in the same block is **unreachable** (compile error).

## Example: validation

```java
public class ThrowDemo {
    static void setAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("Age must be >= 0, got " + age);
        }
        System.out.println("Age set to " + age);
    }
    public static void main(String[] args) {
        try {
            setAge(-5);
        } catch (IllegalArgumentException e) {
            System.out.println("Caught: " + e.getMessage());
        }
    }
}
```

Output:

```text
Caught: Age must be >= 0, got -5
```

## Flow

```text
throw new X()
     │
     ▼
matching catch in current method? ── yes ──► handle
     │ no
     ▼
propagate up call stack ──► main ──► JVM prints stack trace, thread ends
```

## Throwing checked vs unchecked

- Throwing an **unchecked** exception (`RuntimeException` and subclasses) needs no declaration.
- Throwing a **checked** exception requires the method to declare it with `throws`, or wrap it in a try-catch.

```java
static void read() throws IOException {   // checked -> must declare
    throw new IOException("disk error");
}
```

## throw vs throws

| | `throw` | `throws` |
|---|---------|----------|
| Purpose | Actually raises an exception | Declares exceptions a method may raise |
| Location | Inside method body | In method signature |
| Followed by | An exception **object** | Exception **class** name(s) |
| Count | One exception at a time | Can list multiple, comma-separated |

## Key points

- `throw` raises exactly one exception object at runtime.
- Re-throwing is allowed: `catch (E e) { throw e; }` or wrap-and-rethrow.
- Custom exceptions are thrown the same way: `throw new MyException(...)`.
- Checked exceptions thrown must be declared or handled.
