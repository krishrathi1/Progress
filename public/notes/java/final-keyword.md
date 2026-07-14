## Definition

`final` is a non-access modifier that makes something **unchangeable**. Its exact meaning depends on where it is applied — to a variable, a method, or a class.

## The three uses

| Applied to | Effect |
|-----------|--------|
| Variable | Value can be assigned **once**; cannot be reassigned (a constant) |
| Method | Cannot be **overridden** by a subclass |
| Class | Cannot be **extended** (no subclasses) |

## Example

```java
final class MathUtil {                 // cannot be subclassed
    static final double PI = 3.14159;  // constant

    final int compute(int x) {         // cannot be overridden
        int y = x * 2;                 // local final possible too
        return y;
    }
}

class Circle {
    final double radius;               // blank final

    Circle(double r) {
        radius = r;                    // must be set in constructor
    }
}

public class Main {
    public static void main(String[] args) {
        final int LIMIT = 10;
        // LIMIT = 20;   // compile error: cannot reassign
        System.out.println(MathUtil.PI + " " + new Circle(5).radius);
    }
}
```

## final reference vs final object

```text
final int[] arr = {1, 2, 3};
   arr = new int[5];   // ERROR: reference is final
   arr[0] = 99;        // OK: the OBJECT it points to can change
```

A `final` **reference** cannot point to a different object, but the object's internal state may still be mutable.

## Related distinctions

| Keyword | Meaning |
|---------|---------|
| `final` | Cannot change / override / extend |
| `finally` | Block that always runs after try-catch |
| `finalize()` | Deprecated GC callback before object is reclaimed |

## Key points

- **final variable**: assign once; a **blank final** must be assigned exactly once in the constructor (or initializer).
- **final method**: locks behavior — no overriding — helping preserve invariants (e.g., in security-sensitive code).
- **final class**: no inheritance; examples include `String`, `Integer`.
- `static final` = compile-time constant, conventionally `UPPER_SNAKE_CASE`.
- `final` on a reference freezes the reference, **not** the referenced object's contents.
- final method arguments cannot be reassigned inside the method.
