## Definition

**String formatting** builds a string by substituting values into a template of **format specifiers**. In Java this is done with `String.format()`, `System.out.printf()`, or `Formatter`. It gives precise control over width, precision, alignment, and number/date representation.

## Format Specifier Anatomy

```text
%[argument_index$][flags][width][.precision]conversion
   e.g.  %-10.2f
   %      -> starts a specifier
   -      -> left-justify
   10     -> minimum field width
   .2     -> 2 digits after decimal
   f      -> floating-point conversion
```

## Common Conversions

| Specifier | Meaning | Example output |
|-----------|---------|----------------|
| `%d` | decimal integer | `42` |
| `%f` | floating-point | `3.140000` |
| `%.2f` | float, 2 decimals | `3.14` |
| `%s` | string | `hello` |
| `%c` | character | `A` |
| `%b` | boolean | `true` |
| `%x` | hexadecimal | `ff` |
| `%e` | scientific notation | `3.14e+00` |
| `%n` | platform newline | (line break) |
| `%%` | literal percent | `%` |

## Examples

```java
String s = String.format("Name: %-8s Age: %3d", "Ann", 5);
// "Name: Ann      Age:   5"

System.out.printf("Price: $%,.2f%n", 12345.6);   // Price: $12,345.60
System.out.printf("Hex: %08x%n", 255);           // Hex: 000000ff

// argument index reuse
System.out.printf("%1$s is %1$s%n", "AI");        // AI is AI
```

## Flags Quick Reference

| Flag | Effect |
|------|--------|
| `-` | left-justify |
| `0` | pad with zeros |
| `+` | always show sign |
| `,` | grouping separator |
| `(` | negatives in parentheses |

## Key points

- `String.format(...)` returns a string; `printf(...)` prints directly to the stream.
- **Width** sets a minimum size; **precision** (`.n`) limits decimals for floats or characters for strings.
- Use `%n` rather than `\n` for a portable line separator.
- Argument index `n$` lets you reuse or reorder arguments.
- A mismatch between specifier and argument type throws `IllegalFormatConversionException` at runtime.
