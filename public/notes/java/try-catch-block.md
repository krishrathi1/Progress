## Definition

A **try-catch block** is the core construct for handling exceptions in Java. Code that might throw is placed inside `try`; if an exception occurs, control jumps to a matching `catch` block, which handles it so the program can continue instead of crashing.

## Syntax

```java
try {
    // code that may throw an exception
} catch (ExceptionType e) {
    // handling code
}
```

## How control flows

```text
        enter try
           |
   exception thrown? --- no --> skip catch, continue after block
           | yes
           v
   find matching catch (by type)
           |
     match? -- yes --> run catch body --> continue after block
           |
           no --> propagate to caller (may crash)
```

- Once an exception is thrown, the **rest of the `try` body is skipped** immediately.
- After the `catch` finishes, execution resumes **after** the whole try-catch, not where the exception occurred.

## Example

```java
import java.util.Scanner;

public class Divide {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int a = sc.nextInt();
            int b = sc.nextInt();
            int result = a / b;          // may throw ArithmeticException
            System.out.println("Result = " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: division by zero");
        }
        System.out.println("Program ends gracefully");
    }
}
```

Dry run with input `10 0`:

```text
a = 10, b = 0
a / b  -> throws ArithmeticException ("/ by zero")
try body abandoned
catch runs -> prints "Error: division by zero"
after block -> prints "Program ends gracefully"
```

## Common pitfalls

- The `catch` type must match (be a superclass of) the thrown exception, else it is not caught.
- Variables declared **inside** `try` are not visible in `catch` — declare them before if needed.
- Avoid an empty catch block (swallowing exceptions hides bugs); at least log `e`.
- Use `e.getMessage()` or `e.printStackTrace()` to inspect the cause.

## Key points

- `try` must be paired with at least one `catch` **or** a `finally`.
- On an exception, the try body stops at the failing statement; a matching catch handles it.
- Uncaught exceptions propagate up the call stack and may terminate the thread.
- Catch specific exceptions rather than a broad `Exception` when possible.
