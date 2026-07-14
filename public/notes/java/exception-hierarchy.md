## Definition

Every error condition in Java is represented by an object whose class descends from **`java.lang.Throwable`**. The **exception hierarchy** is the inheritance tree rooted at `Throwable`, split into two main branches — **`Error`** and **`Exception`** — which in turn determine whether an exception is *checked* or *unchecked*.

## The hierarchy

```text
                 Throwable
                /         \
           Error           Exception
          /  |  \          /        \
 OutOfMemory  ...     IOException   RuntimeException
 StackOverflow      (checked)      /   |    |    \
 (unchecked,        SQLException  Null  Arithmetic  ...
  do NOT catch)     (checked)     Pointer  IndexOutOfBounds
                                  ClassCast  IllegalArgument
                                  (all UNCHECKED)
```

## Three categories

| Category | Root | Checked? | Recover? | Examples |
|----------|------|----------|----------|----------|
| **Error** | `Error` | No | Usually no | `OutOfMemoryError`, `StackOverflowError` |
| **Checked exception** | `Exception` (not `RuntimeException`) | Yes | Yes | `IOException`, `SQLException`, `FileNotFoundException` |
| **Unchecked exception** | `RuntimeException` | No | Sometimes | `NullPointerException`, `ArrayIndexOutOfBoundsException`, `ArithmeticException` |

- **Checked**: compiler forces you to either `catch` or declare with `throws`.
- **Unchecked** (`RuntimeException` and its subclasses): not enforced at compile time; usually caused by programming bugs.
- **Error**: serious JVM-level problems your code normally should not try to handle.

## Example

```java
public class HierarchyDemo {
    public static void main(String[] args) {
        try {
            String s = null;
            System.out.println(s.length());  // NullPointerException (unchecked)
        } catch (RuntimeException e) {
            // A broad catch: RuntimeException is a superclass of NPE
            System.out.println("Caught: " + e.getClass().getSimpleName());
        } catch (Exception e) {
            System.out.println("Any other checked exception");
        }
    }
}
// Output: Caught: NullPointerException
```

- **Order matters**: a subclass `catch` must come *before* its superclass, else you get an "already caught" compile error.

## Key points

- `Throwable` is the root of ALL exceptions and errors; only `Throwable` (or subclasses) can be thrown/caught.
- `Exception` minus `RuntimeException` = **checked**; `RuntimeException` subtree = **unchecked**.
- `Error` = unrecoverable JVM problems — do not catch in normal code.
- Catching `Exception` catches all unchecked and checked exceptions but **not** `Error`; catching `Throwable` catches everything (rarely advisable).
