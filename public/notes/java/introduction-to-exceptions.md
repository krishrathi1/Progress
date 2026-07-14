## Definition

An **exception** is an event that disrupts the normal flow of a program during execution. In Java an exception is an **object** (a subclass of `java.lang.Throwable`) that is *thrown* at the point of error and can be *caught* and handled elsewhere. Exception handling separates error-handling code from normal logic, making programs robust and readable.

## Why exceptions?

- Return codes are easily ignored; exceptions **cannot be silently overlooked** — an unhandled one crashes the thread.
- They carry rich information: type, message, and a **stack trace**.
- They let a low-level method signal a problem that a higher-level method decides how to handle.

## What happens when an exception occurs

```text
method reads array[10] on a length-5 array
        |
        v
JVM creates an ArrayIndexOutOfBoundsException object
        |
        v
Searches the call stack for a matching catch block
        |
   found? -- yes --> run catch, continue after try
        |
        no --> propagate up ... reach main ...
        |
        v
default handler prints stack trace, terminates thread
```

## The five keywords

| Keyword | Role |
|---------|------|
| `try` | Wraps code that might throw |
| `catch` | Handles a matching exception |
| `finally` | Always runs (cleanup) |
| `throw` | Explicitly throws an exception object |
| `throws` | Declares that a method may throw |

## Example

```java
public class Demo {
    public static void main(String[] args) {
        int[] a = {1, 2, 3};
        try {
            int x = 10 / 0;              // ArithmeticException
            System.out.println(a[5]);    // never reached
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero: " + e.getMessage());
        } finally {
            System.out.println("Cleanup always runs");
        }
        System.out.println("Program continues normally");
    }
}
```

Output:

```text
Cannot divide by zero: / by zero
Cleanup always runs
Program continues normally
```

## Key points

- Every exception is a subclass of `Throwable` (branches: `Error` and `Exception`).
- A thrown exception **propagates up the call stack** until caught or the thread ends.
- Handling exceptions prevents abrupt termination and lets the program recover.
- Handle only what you can meaningfully recover from; otherwise let it propagate.
