## Definition

The **`throws`** keyword appears in a **method signature** to declare that the method *might* throw one or more (usually **checked**) exceptions. It shifts the responsibility of handling those exceptions to the **caller**, which must either catch them or declare `throws` in turn.

```java
void readFile(String path) throws IOException, FileNotFoundException {
    // ...
}
```

## Why it exists

Java's **checked exceptions** must be either caught or declared (the "catch or specify" rule). `throws` is the *specify* option — it documents the failure modes as part of the API contract, so callers know what can go wrong.

## Example

```java
import java.io.*;

public class ThrowsDemo {
    // declares it may throw a checked exception
    static void openFile() throws IOException {
        throw new IOException("file missing");
    }

    // caller must handle or re-declare
    public static void main(String[] args) {
        try {
            openFile();
        } catch (IOException e) {
            System.out.println("Handled: " + e.getMessage());
        }
    }
}
```

Output:

```text
Handled: file missing
```

## Propagation chain

```text
openFile() throws IOException
        │ (not handled here)
        ▼
   caller must:  try-catch   OR   also declare throws IOException
```

## Checked vs unchecked in throws

- **Checked** (e.g., `IOException`, `SQLException`): declaration is *mandatory* if you don't catch them.
- **Unchecked** (`RuntimeException`, `Error`): you *may* declare them for documentation, but it is **not required**.

## throws vs throw

| | `throws` | `throw` |
|---|----------|---------|
| Where | Method signature | Inside method body |
| Role | Declares possible exceptions | Actually raises one |
| Operand | Exception class name(s) | Exception object |
| Multiple | Yes, comma-separated | One at a time |

## Overriding note

An overriding method may declare **fewer or narrower** checked exceptions than the parent, but **not broader** ones.

## Key points

- `throws` delegates handling to the caller; it does not itself handle anything.
- Required only for **checked** exceptions that are not caught locally.
- Multiple exceptions are comma-separated: `throws IOException, SQLException`.
- Good API design: declare specific exceptions, not just `throws Exception`.
