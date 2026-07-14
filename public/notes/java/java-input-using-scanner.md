## Definition

The **`Scanner`** class (in `java.util`) reads formatted input from a source — most commonly `System.in` (the keyboard). It parses the input stream into primitive types and strings using whitespace as the default delimiter.

## Basic Usage

```java
import java.util.Scanner;

public class InputDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter name: ");
        String name = sc.nextLine();

        System.out.print("Enter age: ");
        int age = sc.nextInt();

        System.out.println(name + " is " + age);
        sc.close(); // release the resource
    }
}
```

## Common Scanner Methods

| Method | Reads | Returns |
|--------|-------|---------|
| `nextInt()` | next token | `int` |
| `nextDouble()` | next token | `double` |
| `nextLong()` | next token | `long` |
| `next()` | single token (no spaces) | `String` |
| `nextLine()` | rest of the line | `String` |
| `nextBoolean()` | next token | `boolean` |
| `hasNext()` / `hasNextInt()` | peek | `boolean` |

## The nextInt() then nextLine() Trap

```text
Input buffer:  4 2 \n A l i c e \n

sc.nextInt();    -> reads "42", leaves the \n
sc.nextLine();   -> reads EMPTY string (consumes leftover \n)
sc.nextLine();   -> now reads "Alice"
```

`nextInt()` / `next()` consume the token but **not** the trailing newline. A following `nextLine()` then returns an empty string. Fix: add an extra `sc.nextLine()` to consume the leftover newline before reading a full line.

## Key points

- Always `import java.util.Scanner;`.
- Token methods (`nextInt`, `next`) stop at whitespace; `nextLine` reads to end of line.
- Mixing `nextInt()` and `nextLine()` needs a buffer-clearing `nextLine()`.
- `nextInt()` throws `InputMismatchException` if the input is not a valid integer.
- Use `hasNextInt()` to validate before reading and avoid exceptions.
- Call `sc.close()` when done to free the underlying stream.
