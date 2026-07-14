## Definition

Java prints to the console through `System.out`, an instance of `PrintStream`. Its three core methods — **`print`**, **`println`**, and **`printf`** — differ in line handling and formatting.

## The Three Methods

| Method | Behavior |
|--------|----------|
| `print(x)` | Prints `x`, cursor stays on the same line |
| `println(x)` | Prints `x`, then moves to a new line |
| `printf(fmt, args)` | Prints formatted output using a format string (no auto newline) |

```java
public class OutputDemo {
    public static void main(String[] args) {
        System.out.print("Hello ");     // no newline
        System.out.print("World");      // same line
        System.out.println();           // moves to next line
        System.out.println("Next line");

        int age = 25;
        double pi = 3.14159;
        System.out.printf("Age=%d, Pi=%.2f%n", age, pi);
    }
}
```

Output:
```text
Hello World
Next line
Age=25, Pi=3.14
```

## Common printf Format Specifiers

| Specifier | Meaning | Example |
|-----------|---------|---------|
| `%d` | integer | `42` |
| `%f` | float/double | `3.140000` |
| `%.2f` | 2 decimal places | `3.14` |
| `%s` | string | `hi` |
| `%c` | character | `A` |
| `%b` | boolean | `true` |
| `%n` | platform newline | — |
| `%5d` | width 5, right-aligned | `   42` |
| `%-5d` | width 5, left-aligned | `42   ` |

## Newline: %n vs \n

```text
\n  -> always the LF character (0x0A)
%n  -> platform-specific line separator (\r\n on Windows, \n on Unix)
```

Prefer `%n` inside `printf` for portable output.

## Key points

- `print` = no newline; `println` = adds newline; `printf` = formatted, no auto newline.
- `printf` returns a `PrintStream`, enabling chaining; it uses `Formatter` internally.
- String concatenation (`+`) works with `print`/`println` but `printf` is cleaner for alignment and precision.
- Use `%n` for portable newlines inside format strings.
- A mismatched specifier and argument type throws an `IllegalFormatConversionException`.
- `System.err` is a separate stream for error output.
