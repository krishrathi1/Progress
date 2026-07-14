## Definition

A single `try` block can be followed by **multiple `catch` blocks**, each handling a different exception type. When an exception is thrown, the JVM checks the catch blocks **top to bottom** and executes the **first one whose type matches**; the rest are skipped.

## Syntax

```java
try {
    // risky code
} catch (ArithmeticException e) {
    // handle divide-by-zero
} catch (ArrayIndexOutOfBoundsException e) {
    // handle bad index
} catch (Exception e) {
    // catch-all: must be LAST
}
```

## The ordering rule

Catch blocks must go from **most specific to most general**. A subclass exception must be caught before its superclass, otherwise the specific block is unreachable and you get a **compile-time error**.

```text
   Exception thrown
        |
        v
  catch #1 (ArithmeticException)?  -- match --> run, done
        | no match
        v
  catch #2 (ArrayIndex...)?        -- match --> run, done
        | no match
        v
  catch #3 (Exception)  <- general, catches the rest
```

## Example

```java
public class MultiCatch {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3};
        try {
            int idx = Integer.parseInt(args[0]); // NumberFormatException?
            System.out.println(arr[idx] / 0);    // ArithmeticException?
        } catch (ArithmeticException e) {
            System.out.println("Math error: " + e.getMessage());
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Bad array index");
        } catch (Exception e) {
            System.out.println("Other: " + e.getClass().getSimpleName());
        }
    }
}
```

## Multi-catch (Java 7+)

Combine unrelated exceptions with the same handling using `|`:

```java
try {
    // ...
} catch (IOException | SQLException e) {
    System.out.println("I/O or DB failure: " + e.getMessage());
}
```

- The types in a multi-catch must **not** be subclasses of one another.
- The variable `e` is implicitly `final`.

| Style | Use when |
|-------|----------|
| Separate catches | Each exception needs different handling |
| Multi-catch (`\|`) | Same handling for several unrelated types |

## Key points

- Only **one** catch block executes per thrown exception.
- Order from **specific to general**; putting `Exception` first is a compile error.
- Multi-catch (`A | B`) reduces duplication for identical handling.
- After any catch runs, execution continues after the whole try-catch (or into `finally` first).
