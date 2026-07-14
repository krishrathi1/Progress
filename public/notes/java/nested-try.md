## Definition

A **nested try** is a `try` block placed inside another `try` (or inside a `catch`/`finally`) block. It lets you handle exceptions at different granularities: an inner block deals with a specific risky operation, while the outer block acts as a safety net for anything the inner block does not (or cannot) handle.

## Why use it

- Different statements can throw different exceptions that need **separate handling logic**.
- If the inner `catch` cannot handle an exception, it **propagates outward** to the enclosing `try`'s catch.
- Common in code where one resource is opened inside another (e.g., iterating an array while parsing each element).

## How propagation works

```text
        outer try
        ┌─────────────────────────────┐
        │  stmtA                       │
        │  inner try ───────────┐      │
        │    risky();           │      │
        │  inner catch (E1)     │      │
        │    handle E1          │      │
        │  ────────────────────-┘      │
        │  stmtB                       │
        └─────────────────────────────┘
        outer catch (E2)  ← catches E2 from stmtA/stmtB
                          ← also catches anything inner
                            catch did NOT match
```

If the inner `catch` does not match the thrown type, the JVM searches the **outer** `catch` chain.

## Example

```java
public class NestedTryDemo {
    public static void main(String[] args) {
        int[] arr = {10, 5, 0};
        try {
            for (int i = 0; i < arr.length; i++) {
                try {
                    int r = 100 / arr[i];        // may throw ArithmeticException
                    System.out.println("100/" + arr[i] + " = " + r);
                } catch (ArithmeticException e) {
                    System.out.println("Inner: divide by zero at index " + i);
                }
            }
            System.out.println(arr[5]);          // ArrayIndexOutOfBounds -> outer
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Outer: bad array index");
        }
    }
}
```

Output:

```text
100/10 = 10
100/5 = 20
Inner: divide by zero at index 2
Outer: bad array index
```

## Key points

- Inner exceptions handled by an inner `catch` do **not** reach the outer block.
- Unhandled inner exceptions **propagate** to the outer `catch`.
- Each block can have its own `finally`; inner `finally` runs before control leaves the inner block.
- Avoid deep nesting — it hurts readability; prefer multiple `catch` clauses or method extraction where possible.
